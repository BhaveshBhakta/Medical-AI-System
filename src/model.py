import torch
import torch.nn as nn
from torchvision import models


def get_model(num_classes):
    from torchvision.models import resnet18, ResNet18_Weights
    model = resnet18(weights=ResNet18_Weights.DEFAULT)

    # Freeze base layers (important for transfer learning)
    for param in model.parameters():
        param.requires_grad = False

    # Replace final layer
    in_features = model.fc.in_features
    model.fc = nn.Sequential(
        nn.Dropout(p=0.5),
        nn.Linear(in_features, num_classes)
    )

    return model