from sentence_transformers import SentenceTransformer
import faiss
import numpy as np

# Load embedding model
model = SentenceTransformer("all-MiniLM-L6-v2")

# Simple medical knowledge base (we’ll expand later)
documents = [
    "Glioma is a type of tumor that occurs in the brain and spinal cord.",
    "Meningioma arises from the meninges and is often benign.",
    "Pituitary tumors affect hormone regulation and can cause vision issues.",
    "No tumor indicates normal brain MRI with no abnormal growth."
]

# Create embeddings
embeddings = model.encode(documents)
dimension = embeddings.shape[1]

index = faiss.IndexFlatL2(dimension)
index.add(np.array(embeddings))


def retrieve(query, k=2):
    query_embedding = model.encode([query])
    distances, indices = index.search(query_embedding, k)

    results = [documents[i] for i in indices[0]]
    return results