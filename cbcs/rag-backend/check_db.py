import os
from langchain_community.vectorstores import Chroma
from langchain_google_genai import GoogleGenerativeAIEmbeddings
from dotenv import load_dotenv

# Load environment variables
load_dotenv()
os.environ['GOOGLE_API_KEY'] = os.getenv("GEMINI_API_KEY")

# Define where the vector store is saved
persist_directory = "db"

def check_vector_database():
    """Loads the vector database and performs a simple check."""
    print("Loading vector database from disk...")
    
    # Create the embedding model
    embeddings = GoogleGenerativeAIEmbeddings(model="models/embedding-001")
    
    # Load the vector store from the specified directory
    try:
        vectorstore = Chroma(
            persist_directory=persist_directory, 
            embedding_function=embeddings
        )
        print("Vector database loaded successfully.")
    except Exception as e:
        print(f"Error loading the vector database: {e}")
        return

    # Check the number of documents in the collection
    collection_count = vectorstore._collection.count()
    print(f"Number of documents in the collection: {collection_count}")

    if collection_count > 0:
        # Perform a simple retrieval to show what's in the database
        print("\nPerforming a sample retrieval to show documents:")
        sample_query = "What is the name of the project?"
        retrieved_docs = vectorstore.similarity_search(sample_query, k=2)

        for i, doc in enumerate(retrieved_docs):
            print(f"--- Document {i + 1} ---")
            print(f"Source: {doc.metadata.get('source', 'N/A')}")
            print(f"Content: {doc.page_content[:100]}...") # Print first 200 characters
            print("-" * 20)
    else:
        print("The database is empty. Please run ingest.py first.")

if __name__ == "__main__":
    check_vector_database()