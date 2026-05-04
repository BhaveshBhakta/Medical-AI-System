import torch
import numpy as np
import cv2
import os

from dotenv import load_dotenv
load_dotenv()

from flask import Flask, render_template, request
from PIL import Image
from torchvision import transforms

from src.model import get_model
from src.grad_cam import GradCAM, overlay_heatmap
from src.uncertainty import mc_dropout_predict, compute_entropy
from src.report import generate_report
from src.llm_explainer import generate_explanation
from src.agent_pipeline import final_agent

app = Flask(__name__)

# ===== LOAD MODEL =====
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

classes = ['glioma', 'meningioma', 'notumor', 'pituitary']

model = get_model(num_classes=len(classes)).to(device)
model.load_state_dict(torch.load("model.pth", map_location=device))
model.eval()

target_layer = model.layer4[-1]
grad_cam = GradCAM(model, target_layer)

transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
])


@app.route("/", methods=["GET", "POST"])
def index():
    result = None
    image_path = None

    if request.method == "POST":
        file = request.files["file"]

        if file:
            os.makedirs("app_flask/static", exist_ok=True)

            filepath = os.path.join("app_flask/static", file.filename)
            file.save(filepath)

            image = Image.open(filepath).convert("RGB")

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

            gradcam_path = os.path.join("app_flask/static", "gradcam.jpg")
            cv2.imwrite(gradcam_path, overlay)

            # ===== Uncertainty =====
            mean_pred, var_pred = mc_dropout_predict(model, input_tensor)

            pred_class = np.argmax(mean_pred)
            confidence = float(np.max(mean_pred))
            uncertainty = float(compute_entropy(mean_pred[0]))

            # ===== Report =====
            report = final_agent(
                classes[pred_class],
                confidence,
                uncertainty
            )

            result = {
                "prediction": classes[pred_class],
                "confidence": round(confidence, 3),
                "uncertainty": round(uncertainty, 3),
                "report": report
            }

            image_path = "static/gradcam.jpg"

    return render_template("index.html", result=result, image_path=image_path)


if __name__ == "__main__":
    app.run(debug=True)