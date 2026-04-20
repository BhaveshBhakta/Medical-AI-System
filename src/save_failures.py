import os
import cv2
import numpy as np
import torch

from src.grad_cam import GradCAM, overlay_heatmap


def save_misclassified(model, dataloader, device, class_names):
    
    model.eval()
    os.makedirs("outputs/failures", exist_ok=True)

    target_layer = model.layer4[-1]
    grad_cam = GradCAM(model, target_layer)

    count = 0

    for images, labels in dataloader:
        images, labels = images.to(device), labels.to(device)

        for i in range(len(images)):
            img = images[i].unsqueeze(0)
            img.requires_grad = True

            output = model(img)
            pred = output.argmax(dim=1).item()
            true = labels[i].item()

            if pred != true:
                cam = grad_cam.generate(img)

                # Convert image
                img_np = img.squeeze().permute(1, 2, 0).detach().cpu().numpy()
                img_np = (img_np * 255).astype("uint8")

                overlay = overlay_heatmap(img_np, cam)

                filename = f"{class_names[true]}_as_{class_names[pred]}_{count}.jpg"
                path = os.path.join("outputs/failures", filename)

                cv2.imwrite(path, overlay)

                count += 1

            if count >= 20:  # limit (important)
                return