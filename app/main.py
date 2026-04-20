import torch
import numpy as np
import cv2
import os
from fastapi import FastAPI, File, UploadFile
from fastapi.responses import FileResponse, JSONResponse

from src.model import get_model
from src.grad_cam import GradCAM, overlay_heatmap
from src.uncertainty import mc_dropout_predict, compute_entropy
from src.report import generate_report

from torchvision import transforms
from PIL import Image
import io

app = FastAPI()

# ===== LOAD MODEL =====
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

classes = ['glioma', 'meningioma', 'notumor', 'pituitary']

model = get_model(num_classes=len(classes)).to(device)
model.load_state_dict(torch.load("model.pth", map_location=device))
model.eval()

target_layer = model.layer4[-1]
grad_cam = GradCAM(model, target_layer)

# ===== TRANSFORM =====
transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
])


@app.post("/predict/")
async def predict(file: UploadFile = File(...)):

    # Read image
    contents = await file.read()
    image = Image.open(io.BytesIO(contents)).convert("RGB")

    input_tensor = transform(image).unsqueeze(0).to(device)
    input_tensor.requires_grad = True

    # ===== Prediction =====
    with torch.no_grad():
        output = model(input_tensor)
        pred = output.argmax(dim=1).item()

    # ===== Grad-CAM =====
    cam = grad_cam.generate(input_tensor)

    img_np = np.array(image.resize((224, 224)))
    overlay = overlay_heatmap(img_np, cam)

    os.makedirs("outputs", exist_ok=True)
    gradcam_path = "outputs/api_gradcam.jpg"
    cv2.imwrite(gradcam_path, overlay)

    # ===== Uncertainty =====
    mean_pred, var_pred = mc_dropout_predict(model, input_tensor)

    pred_class = np.argmax(mean_pred)
    confidence = float(np.max(mean_pred))
    uncertainty = float(compute_entropy(mean_pred[0]))

    # ===== Report =====
    report = generate_report(classes[pred_class], confidence, uncertainty)

    return JSONResponse({
        "prediction": classes[pred_class],
        "confidence": confidence,
        "uncertainty": uncertainty,
        "report": report,
        "gradcam_image": gradcam_path
    })