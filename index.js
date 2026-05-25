const fs = require('fs')
const path = require('path')

const express = require('express')
const multer = require('multer')
const pdfParse = require('pdf-parse')

const { Document, Packer, Paragraph, TextRun } = require('docx')

const app = express()

// Static files
app.use(express.static('public'))

// Multer setup
const upload = multer({
    dest: 'uploads/'
})

// Homepage route (FIXED)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

// Upload + Convert route
app.post('/upload', upload.single('pdf'), async (req, res) => {
    try {

        // Validate file
        if (!req.file) {
            return res.status(400).send('No file uploaded')
        }

        // Read PDF file
        const pdfBuffer = fs.readFileSync(req.file.path)

        // Extract text
        const data = await pdfParse(pdfBuffer)

        // Create Word document
        const doc = new Document({
            sections: [
                {
                    children: [
                        new Paragraph({
                            children: [
                                new TextRun(data.text || '')
                            ]
                        })
                    ]
                }
            ]
        })

        // Convert to DOCX buffer
        const docBuffer = await Packer.toBuffer(doc)

        // Create unique output file
        const outputPath = `output-${Date.now()}.docx`

        // Save DOCX file
        fs.writeFileSync(outputPath, docBuffer)

        // Send file + delete after download
        res.download(outputPath, (err) => {
            if (err) {
                console.log('Download error:', err)
            }

            // Cleanup files
            fs.unlink(outputPath, () => {})
            fs.unlink(req.file.path, () => {})
        })

    } catch (error) {
        console.log(error)

        // Cleanup uploaded file if error happens
        if (req.file) {
            fs.unlink(req.file.path, () => {})
        }

        res.status(500).send('Error converting PDF')
    }
})

// Start server
app.listen(3000, () => {
    console.log('Server running on port 3000')
})