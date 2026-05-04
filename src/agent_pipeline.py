from groq import Groq
import os
from src.rag import retrieve

client = Groq(api_key=os.getenv("GROQ_API_KEY"))


# =========================
# LABEL HELPERS
# =========================
def get_confidence_label(confidence):
    if confidence > 0.7:
        return "High"
    elif confidence > 0.5:
        return "Moderate"
    else:
        return "Low"


def get_uncertainty_label(uncertainty):
    if uncertainty > 0.8:
        return "High"
    elif uncertainty > 0.4:
        return "Moderate"
    else:
        return "Low"


# =========================
# AGENTS
# =========================
def diagnosis_agent(prediction, confidence, uncertainty):
    return f"""
Prediction: {prediction}
Confidence Score: {confidence:.2f}
Uncertainty Score: {uncertainty:.2f}
"""


def knowledge_agent(prediction):
    context = retrieve(prediction)
    return f"""
Relevant Context:
{context}
"""


def risk_agent(confidence, uncertainty):
    # Reliability ONLY depends on uncertainty
    if uncertainty > 0.8:
        reliability = "LOW"
    elif uncertainty > 0.4:
        reliability = "MODERATE"
    else:
        reliability = "HIGH"

    return f"""
Reliability Level: {reliability}
"""


# =========================
# FINAL AGENT (LLM)
# =========================
def final_agent(prediction, confidence, uncertainty):

    # Labels
    conf_label = get_confidence_label(confidence)
    unc_label = get_uncertainty_label(uncertainty)

    # Clean structured input
    diag = f"""
Prediction: {prediction}
Confidence Level: {conf_label}
Uncertainty Level: {unc_label}
Confidence Score: {confidence:.2f}
Uncertainty Score: {uncertainty:.2f}
"""

    knowledge = knowledge_agent(prediction)
    risk = risk_agent(confidence, uncertainty)

    # 🔥 FINAL CONTROLLED PROMPT
    prompt = f"""
You are a clinical AI assistant.

STRICT RULES:
- Max 60 words
- ONLY use information from INPUT
- Do NOT add new symptoms, conditions, or medical details
- Do NOT speculate beyond the given prediction
- Be concise and factual

INPUT:
{diag}
{knowledge}
{risk}

OUTPUT FORMAT:

Diagnosis: <condition>

Confidence: <Low/Moderate/High>
Uncertainty: <Low/Moderate/High>

Interpretation:
- Must connect prediction with uncertainty
- Do NOT overstate confidence when uncertainty is not low
- Avoid phrases like "strong likelihood" unless uncertainty is low
- Avoid repeating the same idea
- Use natural phrasing like:
  "the result should be interpreted with caution" for moderate uncertainty
  "may not be reliable" for high uncertainty

Recommendation:
- Use safe phrasing:
  "Further clinical evaluation and confirmatory imaging are advised"
"""

    response = client.chat.completions.create(
        model="llama-3.1-8b-instant",
        messages=[{"role": "user", "content": prompt}],
        temperature=0.2
    )

    return response.choices[0].message.content