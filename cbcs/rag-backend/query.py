import os
from dotenv import load_dotenv
from langchain_community.vectorstores import Chroma
from langchain_google_genai import GoogleGenerativeAIEmbeddings
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain.chains import RetrievalQA
from project_variables import model_name as model_name

# Load environment variables
load_dotenv()
os.environ['GOOGLE_API_KEY'] = os.getenv("GEMINI_API_KEY")

# Define where the vector store is saved
persist_directory = "db"

def answer_question(question):
    """
    Loads the vector database and uses it to answer a question.
    If local data is not relevant, it uses general knowledge.
    """
    # ----------------------------------------------------
    # Add the persona prompt here
    # ----------------------------------------------------
    expert_prompt = (
        "You are an expert quantity surveyor and construction professional. "
        "Provide accurate, commercially astute, and concise answers. "
        "Use the provided context for project-specific questions. "
        "If the context does not contain the answer, use your general knowledge to respond. "
        "Do not invent information.  If you don't know the answer, just say so." 
        "If you are asked questions about things that do not relate to construction, construction law or compass, gently remind user of you specific purpose."
    )
    
    # Create the embedding model and vector store
    embeddings = GoogleGenerativeAIEmbeddings(model="models/embedding-001")
    vectorstore = Chroma(persist_directory=persist_directory, embedding_function=embeddings)
    
    # Create the retrieval chain
    llm = ChatGoogleGenerativeAI(model=model_name, temperature=0.3)
    qa_chain = RetrievalQA.from_chain_type(
        llm=llm,
        chain_type="stuff",
        retriever=vectorstore.as_retriever()
    )
    
    # Combine the expert prompt with the user's question
    full_query = f"{expert_prompt}\n\nQuestion: {question}"

    result = qa_chain.invoke({"query": full_query})
    
    # Check if the retrieved context is relevant
    # The `RetrievalQA` chain might not have this feature directly, so we rely on the prompt.
    # The prompt instructs the model to use general knowledge if the context is not helpful.

    return result['result']

if __name__ == "__main__":
    import sys
    # The first command-line argument is the question
    if len(sys.argv) > 1:
        user_query = sys.argv[1]
        answer = answer_question(user_query)
        print(answer)
    else:
        print("Error: No query provided.")