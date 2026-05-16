# **Explainable and Uncertainty-Aware AI System for Brain Tumor Classification**

An AI-powered medical imaging system for brain tumor classification and clinical decision support.

This system analyzes MRI images and predicts tumor types using deep learning, while enhancing reliability through explainability and uncertainty estimation. It integrates **Grad-CAM** for visual interpretation, **Monte Carlo Dropout** for uncertainty quantification, and an **LLM-based agent pipeline** to generate structured clinical reports. Designed as a full-stack AI application, it bridges model predictions with interpretable and user-friendly outputs.

---

## Overview

The project is a complete end-to-end medical AI system that combines:

*   **Deep Learning:** MRI image classification.
*   **Explainable AI:** Interpretability using Grad-CAM.
*   **Uncertainty Estimation:** Reliability scoring via Monte Carlo Dropout.
*   **Agentic Reasoning:** LLM-powered clinical reporting.
*   **Full-Stack Architecture:** React frontend with a Flask backend.

---

## Key Features

### Medical Image Classification
*   Classifies MRI scans into four categories: **Glioma, Meningioma, Pituitary Tumor, and No Tumor.**
*   Built using a pretrained CNN (ResNet-based architecture).

### Explainable AI (Grad-CAM)
*   Generates heatmaps highlighting regions influencing model decisions.
*   Provides visual interpretability for medical validation.

### Uncertainty Estimation
*   Uses **Monte Carlo Dropout** for predictive uncertainty.
*   Computes entropy-based uncertainty scores to assess reliability.

### Agentic Clinical Report Generation
Multi-step reasoning pipeline including:
*   **Diagnosis Agent**
*   **Knowledge Retrieval (RAG-based)**
*   **Risk Assessment Agent**
*   Generates structured reports with confidence levels and safe medical recommendations.

### User Interface & Integration
*   **Dashboard:** Upload MRI scans directly.
*   **Visualizations:** View original MRI alongside Grad-CAM heatmaps.
*   **Real-time Metrics:** Prediction results, confidence scores, and full clinical reports.

---

## Technology Stack

| Category | Tools & Libraries |
| :--- | :--- |
| **Deep Learning** | `PyTorch`, `Torchvision` |
| **Computer Vision** | `OpenCV`, `PIL`, `Grad-CAM` |
| **Uncertainty** | Monte Carlo Dropout, Entropy |
| **Backend** | `Flask`, `Flask-CORS` |
| **Frontend** | `React`, `Vite`, `Tailwind CSS`, `Framer Motion` |
| **LLM Integration** | `Groq API` (LLaMA-based models) |
| **Data Processing** | `NumPy` |

---

## Website Overview

<img width="1897" height="979" alt="health1" src="https://github.com/user-attachments/assets/1fb52ea5-0f66-4e9a-9a40-6632c8afa2aa" />
<img width="1899" height="974" alt="health2" src="https://github.com/user-attachments/assets/eb65e577-e8f1-41e8-8811-73ebbfc52bb1" />
<img width="1335" height="956" alt="health3" src="https://github.com/user-attachments/assets/1b2eb0ea-1f22-4b3d-a936-c59e2a58144e" />

---

## Quick Start

### 1. Clone the repository
```bash
git clone https://github.com/BhaveshBhakta/Explainable-and-Uncertainty-Aware-AI-System-for-Brain-Tumor-Classification.git
cd Explainable-and-Uncertainty-Aware-AI-System-for-Brain-Tumor-Classification
```

### 2. Set up backend environment
```bash
cd app_flask
pip install -r requirements.txt
```

### 3. Set environment variables
Create a `.env` file in the root directory:
```env
GROQ_API_KEY=your_key_here
```

### 4. Run the backend
```bash
cd ..
PYTHONPATH=. python app_flask/app.py
```

### 5. Set up frontend
```bash
cd frontend
npm install
npm run dev
```

### 6. Open the application
Navigate to: `http://localhost:5173`

---

## Roadmap & Future Work

### **Model Improvements**
*   Integrate advanced architectures (EfficientNet, Vision Transformers).
*   Improve accuracy using better augmentation and fine-tuning.

### **Multimodal AI**
*   Combine MRI images with patient symptoms for enhanced diagnosis.

### **Agentic AI Expansion**
*   Add conversational medical assistant.
*   Integrate follow-up question answering using RAG.

### **Clinical Reliability**
*   Add calibration techniques for better uncertainty estimation.
*   Include out-of-distribution detection.
