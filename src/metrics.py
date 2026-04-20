from sklearn.metrics import classification_report, confusion_matrix
import numpy as np


def get_metrics(y_true, y_pred, class_names):
    report = classification_report(y_true, y_pred, target_names=class_names)
    cm = confusion_matrix(y_true, y_pred)

    return report, cm


def print_confusion_matrix(cm, class_names):
    print("\nConfusion Matrix:")
    print("Labels:", class_names)
    print(cm)