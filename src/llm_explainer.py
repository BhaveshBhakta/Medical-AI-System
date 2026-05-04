import os
from groq import Groq
from src.rag import retrieve

def get_client():
    from groq import Groq
    import os
    return Groq(api_key=os.getenv("GROQ_API_KEY"))


def generate_explanation(prediction, confidence, uncertainty):
    
    client = get_client()
    
    context = retrieve(prediction)

    prompt = f"""
    You are a medical AI assistant.

    Model Output:
    - Prediction: {prediction}
    - Confidence: {confidence:.2f}
    - Uncertainty: {uncertainty:.2f}

    Relevant Medical Knowledge:
    {context}

    Using BOTH the model output and medical knowledge, generate a clinical explanation.

    Include:
    - Explanation of condition
    - Interpretation of confidence and uncertainty
    - Whether result is reliable
    - Recommendation for next steps

    Keep it clear and professional.
"""

    response = client.chat.completions.create(
        model="llama-3.1-8b-instant",
        messages=[{"role": "user", "content": prompt}],
        temperature=0.4
    )

    return response.choices[0].message.content