import torch
import torch.nn as nn
import torch.optim as optim
import numpy as np
import cv2
import os

from src.grad_cam import GradCAM, overlay_heatmap
from src.uncertainty import mc_dropout_predict, compute_entropy
from src.data_loader import get_dataloaders
from src.model import get_model
from src.metrics import get_metrics, print_confusion_matrix
from src.report import generate_report  
from src.error_analysis import analyze_errors
from src.save_failures import save_misclassified


TRAIN_MODEL = False

TRAIN_DIR = "data/train"
TEST_DIR = "data/test"
EPOCHS = 5
LR = 0.001


def train(model, train_loader, criterion, optimizer, device):
    model.train()
    total_loss = 0

    for images, labels in train_loader:
        images, labels = images.to(device), labels.to(device)

        optimizer.zero_grad()
        outputs = model(images)
        loss = criterion(outputs, labels)
        loss.backward()
        optimizer.step()

        total_loss += loss.item()

    return total_loss / len(train_loader)


def evaluate(model, test_loader, device, class_names):
    model.eval()
    
    all_preds = []
    all_labels = []

    with torch.no_grad():
        for images, labels in test_loader:
            images, labels = images.to(device), labels.to(device)

            outputs = model(images)
            _, predicted = torch.max(outputs, 1)

            all_preds.extend(predicted.cpu().numpy())
            all_labels.extend(labels.cpu().numpy())

    all_preds = np.array(all_preds)
    all_labels = np.array(all_labels)

    accuracy = (all_preds == all_labels).mean()

    report, cm = get_metrics(all_labels, all_preds, class_names)

    return accuracy, report, cm, all_labels, all_preds


def main():
    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    print("Using device:", device)

    train_loader, test_loader, classes = get_dataloaders(TRAIN_DIR, TEST_DIR)

    model = get_model(num_classes=len(classes)).to(device)

    criterion = nn.CrossEntropyLoss()
    optimizer = optim.Adam(model.fc.parameters(), lr=LR)

    # =========================
    # TRAIN OR LOAD MODEL
    # =========================
    if TRAIN_MODEL:
        for epoch in range(EPOCHS):
            train_loss = train(model, train_loader, criterion, optimizer, device)
            accuracy, report, cm, y_true, y_pred = evaluate(model, test_loader, device, classes)

            print(f"Epoch {epoch+1}/{EPOCHS}")
            print(f"Loss: {train_loss:.4f} | Accuracy: {accuracy:.4f}")
            print(report)
            print_confusion_matrix(cm, classes)
            
            analyze_errors(y_true, y_pred, classes)

        torch.save(model.state_dict(), "model.pth")
        print("Model saved!")

    else:
        model.load_state_dict(torch.load("model.pth", map_location=device))
        model.eval()
        print("Loaded saved model!")
        
        
        # ----- SAVE MISCLASSIFIED CASES -----
        print("\nSaving misclassified Grad-CAM images...")
        save_misclassified(model, test_loader, device, classes)
        print("Saved in outputs/failures/")
        
        # RUN evaluation for analysis
        accuracy, report, cm, y_true, y_pred = evaluate(model, test_loader, device, classes)

        print("\n--- Evaluation on Loaded Model ---")
        print(report)
        print_confusion_matrix(cm, classes)

        # ADD THIS LINE HERE
        analyze_errors(y_true, y_pred, classes)
                
    # =========================
    # GRAD-CAM
    # =========================
    sample_image, label = next(iter(test_loader))
    sample_image = sample_image[0].unsqueeze(0).to(device)
    sample_image.requires_grad = True

    target_layer = model.layer4[-1]
    grad_cam = GradCAM(model, target_layer)

    cam = grad_cam.generate(sample_image)

    # Convert image
    img = sample_image.squeeze().permute(1, 2, 0).detach().cpu().numpy()
    img = (img * 255).astype("uint8")

    overlay = overlay_heatmap(img, cam)

    # Save image instead of showing
    os.makedirs("outputs", exist_ok=True)
    cv2.imwrite("outputs/gradcam.jpg", overlay)

    # =========================
    # PREDICTION
    # =========================
    with torch.no_grad():
        output = model(sample_image)
        pred = output.argmax(dim=1).item()

    # =========================
    # UNCERTAINTY
    # =========================
    mean_pred, var_pred = mc_dropout_predict(model, sample_image)

    pred_class = np.argmax(mean_pred)
    confidence = np.max(mean_pred)
    uncertainty = compute_entropy(mean_pred[0])

    print("\n--- Uncertainty Output ---")
    print(f"Prediction: {classes[pred_class]}")
    print(f"Confidence: {confidence:.4f}")
    print(f"Uncertainty (Entropy): {uncertainty:.4f}")

    # =========================
    # CLINICAL REPORT
    # =========================
    report_text = generate_report(classes[pred_class], confidence, uncertainty)

    print("\n--- Clinical Report ---")
    print(report_text)

    # Save report
    with open("outputs/report.txt", "w") as f:
        f.write(report_text)

    print("\n✅ Outputs saved in 'outputs/' folder")


if __name__ == "__main__":
    main()