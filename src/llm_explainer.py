import os
from groq import Groq

def get_client():
    from groq import Groq
    import os
    return Groq(api_key=os.getenv("GROQ_API_KEY"))


def generate_explanation(prediction, confidence, uncertainty):
    
    client = get_client()
    
    prompt = f"""
You are a medical AI assistant.

A brain MRI has been analyzed by a deep learning model.

Prediction: {prediction}
Confidence: {confidence:.2f}
Uncertainty: {uncertainty:.2f}

Explain this result in a clinical, human-friendly way.

Include:
- What this condition means
- How confident the model is
- Whether the result should be trusted
- When a doctor should be consulted

Keep it simple but professional.
"""

    response = client.chat.completions.create(
        model="llama-3.1-8b-instant",
        messages=[{"role": "user", "content": prompt}],
        temperature=0.4
    )

    return response.choices[0].message.content