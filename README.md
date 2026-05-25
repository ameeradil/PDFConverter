# PDF to Word Converter

A lightweight web application that converts PDF documents to Word (.docx) format with a simple, intuitive interface.

## Features

- 📄 **Easy PDF Upload** - Simple drag-and-drop or file selection interface
- 🔄 **Instant Conversion** - Convert PDFs to Word documents in seconds
- 📝 **Text Extraction** - Automatically extracts all text from your PDF
- 💾 **Direct Download** - Get your converted Word file immediately
- 🛡️ **Clean & Secure** - Automatic cleanup of temporary files

## User Interface

![PDF to Word Converter UI](screenshots/ui.png)

## Tech Stack

- **Backend**: Node.js with Express.js
- **File Handling**: Multer for PDF uploads
- **PDF Processing**: pdf-parse for text extraction
- **Document Generation**: docx library for .docx file creation
- **Frontend**: HTML/CSS

## Requirements

- Node.js (v14 or higher)
- npm

## Installation

1. Clone or download this project
2. Navigate to the project directory:
   ```bash
   cd PdftoWord
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

## Usage

1. Start the server:
   ```bash
   node index.js
   ```
2. Open your browser and go to:
   ```
   http://localhost:3000
   ```
3. Upload your PDF file using the upload button
4. Click "Convert to Word"
5. Your Word document will download automatically

## File Structure

```
PdftoWord/
├── index.js           # Main server file
├── package.json       # Project dependencies
├── public/            # Frontend files
│   ├── index.html     # Web interface
│   └── app.css        # Styling
└── uploads/           # Temporary upload directory
```

## How It Works

1. User uploads a PDF file through the web interface
2. Server processes the file using pdf-parse
3. Text content is extracted from the PDF
4. A new Word document (.docx) is created with the extracted text
5. File is sent to user for download
6. Temporary files are automatically cleaned up

## License

ISC

---

**Note**: This converter extracts text from PDFs. Complex layouts, images, and formatting may not be preserved exactly as in the original PDF.
