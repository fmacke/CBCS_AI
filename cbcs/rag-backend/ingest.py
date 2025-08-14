import os
from dotenv import load_dotenv
from langchain_community.document_loaders import PyPDFLoader, TextLoader, CSVLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_google_genai import GoogleGenerativeAIEmbeddings
from langchain_community.vectorstores import Chroma

# Load environment variables
load_dotenv()
# Ensure your API key is available
os.environ['GOOGLE_API_KEY'] = os.getenv("GEMINI_API_KEY")

def ingest_folder_data(folder_path, persist_directory):
    """
    Iterates through a folder, ingests all PDF, TXT, and CSV files, and stores their
    vector embeddings in a ChromaDB vector store.

    Args:
        folder_path (str): The path to the folder containing the documents.
        persist_directory (str): The directory to save the ChromaDB vector store.
    """
    if not os.path.isdir(folder_path):
        print(f"Error: The provided path '{folder_path}' is not a valid directory.")
        return

    print(f"Starting data ingestion for folder: {folder_path}")

    # Initialize components once for all files
    text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200)
    embeddings = GoogleGenerativeAIEmbeddings(model="models/embedding-001")

    # This list will hold documents from all files
    all_documents = []
    
    # Iterate through all files in the specified folder
    for filename in os.listdir(folder_path):
        file_path = os.path.join(folder_path, filename)
        
        # Check if it's a file and not a directory
        if os.path.isfile(file_path):
            file_extension = os.path.splitext(filename)[1].lower()
            
            # Use the correct loader based on file extension
            if file_extension == ".pdf":
                print(f"  - Loading PDF file: {filename}")
                loader = PyPDFLoader(file_path)
                documents = loader.load()
                all_documents.extend(documents)
            elif file_extension == ".txt":
                print(f"  - Loading text file: {filename}")
                loader = TextLoader(file_path)
                documents = loader.load()
                all_documents.extend(documents)
            elif file_extension == ".csv":
                print(f"  - Loading CSV file: {filename}")
                loader = CSVLoader(file_path)
                documents = loader.load()
                all_documents.extend(documents)
            else:
                print(f"  - Skipping file with unsupported extension: {filename}")

    if not all_documents:
        print("No PDF, TXT, or CSV files found in the folder. Exiting.")
        return

    # Split all documents into chunks
    docs = text_splitter.split_documents(all_documents)
    print(f"Split all documents into a total of {len(docs)} chunks.")

    # Create and persist the vector store
    print("Creating and saving the vector store...")
    vectorstore = Chroma.from_documents(
        documents=docs, 
        embedding=embeddings, 
        persist_directory=persist_directory
    )
    vectorstore.persist()
    print(f"Data ingestion complete. Vector store saved to '{persist_directory}'.")


if __name__ == "__main__":
    # --- Example Usage ---
    # Define the folder path and persistence directory
    # NOTE: Change 'path/to/your/documents' to the actual path of your folder
    folder_to_ingest = "C:\\Users\\finn\\OneDrive\\Documents\\Compass\\AI_Ingest\\20227 - GURCA\\suckit"
    persist_directory = "db"

    # Call the main ingestion function
    ingest_folder_data(folder_to_ingest, persist_directory)