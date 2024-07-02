import React, { useState, useEffect } from 'react';
import jsPDF from 'jspdf';
import { TextField, Button, Grid, Typography, Input, Paper , Box} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import img1 from './images/01.jpg' 
import img2 from './images/02.jpg' 
import img3 from './images/03.jpg' 
import img4 from './images/04.jpg' 
function PdfGenerator() {
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [fontSize, setFontSize] = useState(12);
    const [leftMargin, setLeftMargin] = useState(38.1);
    const [topMargin, setTopMargin] = useState(38.1);
    const [bottomMargin, setBottomMargin] = useState(25.4);
    const [rightMargin, setRightMargin] = useState(25.4);
    const [currentImage, setCurrentImage] = useState(1);

    const handleFileInputChange = (event) => {
        setSelectedFiles([...event.target.files]);
    };

    React.useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImage((prevImage) => (prevImage === 4 ? 1 : prevImage + 1));
        }, 1000);

        return () => clearInterval(interval);
    }, []);

  


    const generatePdf = async () => {
        try {
            
            // Define margins and font settings
            // const leftMargin = 38.1; // 1.5 inches to mm
            // const topMargin = 38.1; // 1.5 inches to mm
            // const bottomMargin = 25.4; // 1 inch to mm
            // const rightMargin = 25.4; // 1 inch to mm
            // const fontSize = 12;
     
            // Create a new jsPDF instance for the entire document
            const doc = new jsPDF({
                unit: 'mm',
                format: 'legal',
                orientation: 'portrait',
                marginLeft: leftMargin,
                marginRight: rightMargin,
                marginTop: topMargin,
                marginBottom: bottomMargin
            });
    
            // Loop through selected files
            for (let i = 0; i < selectedFiles.length; i++) {
                const file = selectedFiles[i];
                const fileContent = await readFile(file);
                console.log('File content:', fileContent);
    
                // Add text content to the PDF
                if (i !== 0) {
                    // Add a new page for each file except the first one
                    doc.addPage();
                }
                doc.setFont('times', 'normal');
                doc.setFontSize(fontSize);
                doc.text(fileContent, leftMargin, topMargin);
            }
    
            // Save the PDF with a unique name
            const fileName = 'GeneratedDocument.pdf';
            doc.save(fileName);
        } catch (error) {
            console.error('Error generating PDF:', error);
        }
    };
    
    


    const readFile = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (event) => {
                resolve(event.target.result);
            };
            reader.onerror = (error) => {
                reject(error);
            };
            reader.readAsText(file);
        });
    };



    
    return (

        <Paper style={{ margin: '10%', width: '80%', height: 100 }}>
        <Typography variant="h5" gutterBottom>
            Customize PDF Settings
        </Typography>
        <Grid container spacing={2}>
            <Grid item xs={6}>
                <TextField
                    label="Font Size"
                    type="number"
                    value={fontSize}
                    onChange={(e) => setFontSize(e.target.value)}
                />
            </Grid>
            <Grid item xs={6}>
                <TextField
                    label="Left Margin"
                    type="number"
                    value={leftMargin}
                    onChange={(e) => setLeftMargin(e.target.value)}
                />
            </Grid>
            <Grid item xs={6}>
                <TextField
                    label="Top Margin"
                    type="number"
                    value={topMargin}
                    onChange={(e) => setTopMargin(e.target.value)}
                />
            </Grid>
            <Grid item xs={6}>
                <TextField
                    label="Bottom Margin"
                    type="number"
                    value={bottomMargin}
                    onChange={(e) => setBottomMargin(e.target.value)}
                />
            </Grid>
            <Grid item xs={6}>
                <TextField
                    label="Right Margin"
                    type="number"
                    value={rightMargin}
                    onChange={(e) => setRightMargin(e.target.value)}
                />
            </Grid>
            <Grid item xs={12}>
                <Typography variant="body1" gutterBottom>
                    Upload your text files and adjust the settings below to create your customized PDF documents.
                </Typography>
            </Grid>
            <Grid item xs={6}>
                <Input
                    type="file"
                    accept=".txt"
                    multiple
                    onChange={handleFileInputChange}
                    style={{ display: 'none' }}
                    id="fileInput"
                />
                <label htmlFor="fileInput">
                    <Button
                        variant="outlined"
                        component="span"
                        startIcon={<CloudUploadIcon />}
                    >
                        Choose Files
                    </Button>
                </label>
            </Grid>
            <Grid item xs={12}>
                <Button variant="contained" onClick={generatePdf}>Generate PDF</Button>
            </Grid>
        </Grid>
        <Typography variant="body2" gutterBottom>
            🚀 Upload your text files and transform them into professionally formatted PDF documents!
        </Typography>
        <Box style={{ width: '100px', height: '100px', margin: '10px', border: '1px solid #ccc', position: 'relative' }}>
                {currentImage === 1 && <img src={img1} alt="Rocket Icon" style={{ width: '100%', height: '100%' }} />}
                {currentImage === 2 && <img src={img2} alt="Camera Icon" style={{ width: '100%', height: '100%' }} />}
                {currentImage === 3 && <img src={img3} alt="Document Icon" style={{ width: '100%', height: '100%' }} />}
                {currentImage === 4 && <img src={img4} alt="Smile Icon" style={{ width: '100%', height: '100%' }} />}
            </Box>
        <Typography variant="body2" gutterBottom>
            😊 Feel free to adjust the settings to meet your document preferences!
        </Typography>
    </Paper>
    );

}

export default PdfGenerator;
