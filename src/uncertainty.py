import torch
import torch.nn.functional as F
import numpy as np


def enable_dropout(model):
    """
    Enable dropout layers during inference
    """
    for module in model.modules():
        if module.__class__.__name__.startswith('Dropout'):
            module.train()


def mc_dropout_predict(model, input_tensor, n_samples=20):
    """
    Perform Monte Carlo Dropout
    """
    model.eval()
    enable_dropout(model)

    predictions = []

    for _ in range(n_samples):
        output = model(input_tensor)
        probs = F.softmax(output, dim=1)
        predictions.append(probs.detach().cpu().numpy())

    predictions = np.array(predictions)

    mean_prediction = np.mean(predictions, axis=0)
    variance = np.var(predictions, axis=0)

    return mean_prediction, variance


def compute_entropy(probs):
    """
    Entropy-based uncertainty
    """
    return -np.sum(probs * np.log(probs + 1e-8))