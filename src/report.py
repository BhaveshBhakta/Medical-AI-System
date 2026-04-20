def generate_report(prediction, confidence, uncertainty):
    
    if uncertainty < 0.5:
        reliability = "LOW uncertainty (Reliable)"
    elif uncertainty < 1.0:
        reliability = "MODERATE uncertainty"
    else:
        reliability = "HIGH uncertainty (Needs review)"

    report = f"""
Prediction: {prediction}
Confidence: {confidence:.2f}

Interpretation:
The model predicts {prediction} with a confidence of {confidence:.2f}.
The uncertainty level is {reliability}.
"""

    return report