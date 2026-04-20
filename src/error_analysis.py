import numpy as np


def analyze_errors(y_true, y_pred, class_names):
    errors = []

    for i in range(len(y_true)):
        if y_true[i] != y_pred[i]:
            errors.append((y_true[i], y_pred[i]))

    print("\n--- Error Analysis ---")
    print(f"Total Errors: {len(errors)}")

    # Count misclassification patterns
    error_dict = {}

    for true, pred in errors:
        key = f"{class_names[true]} -> {class_names[pred]}"
        error_dict[key] = error_dict.get(key, 0) + 1

    for k, v in error_dict.items():
        print(f"{k}: {v}")

    return errors