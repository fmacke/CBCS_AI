# First, you need to install the PyPDF2 library. You can do this by running
# the following command in your terminal:
# pip install PyPDF2

import PyPDF2

def convert_pdf_to_text(pdf_path, txt_path):
    """
    Converts the text content of a PDF file to a TXT file.

    Args:
        pdf_path (str): The file path of the input PDF file.
        txt_path (str): The file path for the output TXT file.
    """
    try:
        # Open the PDF file in read-binary mode
        with open(pdf_path, 'rb') as pdf_file:
            # Create a PdfReader object
            pdf_reader = PyPDF2.PdfReader(pdf_file)

            # Initialize an empty string to store the text
            text = ""

            # Loop through each page in the PDF
            for page in pdf_reader.pages:
                # Extract the text from the page and append it to our text string
                text += page.extract_text() + "\n"

        # Open the TXT file in write mode
        with open(txt_path, 'w', encoding='utf-8') as txt_file:
            # Write the extracted text to the file
            txt_file.write(text)

        print(f"Successfully converted '{pdf_path}' to '{txt_path}'")

    except FileNotFoundError:
        print(f"Error: The file '{pdf_path}' was not found.")
    except Exception as e:
        print(f"An error occurred: {e}")


# --- Example Usage ---
# Replace 'example.pdf' with the path to your PDF file.
# Replace 'output.txt' with your desired output text file name.

# Create a dummy PDF for demonstration
# Note: In a real scenario, you would have your own PDF file.
with open('example.pdf', 'wb') as f:
    writer = PyPDF2.PdfWriter()
    writer.add_blank_page(width=72, height=72)
    writer.add_page(writer.add_page(writer.add_page(writer.add_blank_page(width=72, height=72))))
    writer.write(f)

# Now, let's convert it
pdf_file_path = 'D&D 5E - Tomb of Annihilation.pdf'
txt_file_path = 'output.txt'

convert_pdf_to_text(pdf_file_path, txt_file_path)