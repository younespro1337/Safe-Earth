const app = require('./app');
const express = require('express')
const path = require('path');
const connectDatabase = require('./config/database');
const cloudinary = require('cloudinary');
const PORT = process.env.PORT || 4000;
const fs = require('fs');

// UncaughtException Error
process.on('uncaughtException', (err) => {
    console.log(`Error: ${err.message}`);
    process.exit(1);
});

connectDatabase();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const server = app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
});

 
// Unhandled Promise Rejection
process.on('unhandledRejection', (err) => {
    console.log(`Error: ${err.message}`);
    server.close(() => {
        process.exit(1);
    });
});

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));
// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});










  





const performOCR = async () => {
    const directoryPath = './accenture-company';
    const startImage = 44;
    const endImage = 45;

    for (let i = startImage; i <= endImage; i++) {
        try {
            const imagePath = path.join(directoryPath, `IMG_${i.toString().padStart(4, '0')}.jpg`);

            // Perform OCR on the image
            const { data: { text } } = await Tesseract.recognize(imagePath, 'eng');

            console.log(`Recognized Text for ${imagePath}:`, text);

            // Save the recognized text to a .txt file
            const outputPath = path.join('./templates', `test_${i.toString().padStart(4, '0')}.txt`);
            fs.writeFileSync(outputPath, text);

            console.log(`Text saved at: ${outputPath}`);
        } catch (error) {
            console.error('Error:', error.message);
        }
    }
};



// // Call the performOCR function
// performOCR();







const sendEmailsCampaign = async (emailArray) => {
    console.log('email array after sendemailcampaign run ', emailArray);

    const batchSize = 20; // Set the batch size
    const pauseBetweenBatches = 30 * 1000; // Set the pause duration between batches in milliseconds
    const pauseAfterBatches = 3 * 60 * 1000; // Set the pause duration after sending a certain number of batches

    const gmailTransporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'raymondyounes2@gmail.com',
            pass: process.env.PASSWORD_APP
        },
        tls: {
          rejectUnauthorized: false
        }
    });

    let emailLog = []; // Initialize email log
    let emailCounter = 0; // Initialize email counter for the current batch
    let batchCounter = 0; // Initialize batch counter

    // Loop through each email in the array
    for (const companyEmail of emailArray) {
        console.log('Company email:', companyEmail);

        // Validate the email address before sending
        let res = await validate({
            email: companyEmail,
            sender: 'raymondyounes2@gmail.com',
            validateRegex: true,
            validateMx: true,
            validateTypo: true,
            validateDisposable: true,
            validateSMTP: false,
        });

        console.log('res valid:', res.valid);

        if (!res.valid) {
            console.error(`Invalid email address: ${companyEmail}`);
            continue; // Skip sending the email if the address is invalid
        }

        // Send the email
        const transporter = gmailTransporter;
        await sendEmail(companyEmail, transporter);
        emailLog.push({ company: companyEmail, success: true });

        emailCounter++; // Increment email counter

        // Pause after sending a batch of emails
        if (emailCounter === batchSize) {
            console.log(`Pausing for ${pauseBetweenBatches / 1000} seconds between batches...`);
            await new Promise(resolve => setTimeout(resolve, pauseBetweenBatches));
            emailCounter = 0; // Reset the email counter
            batchCounter++; // Increment batch counter

            // Pause after sending a certain number of batches
            if (batchCounter === 1) {
                console.log(`Pausing for ${pauseAfterBatches / 1000 / 60} minutes after ${batchCounter} batch(es)...`);
                await new Promise(resolve => setTimeout(resolve, pauseAfterBatches));
                batchCounter = 0; // Reset the batch counter
            }
        }
    }

    const logDirectory = './jsonLogs'; // Define the directory where log files will be stored

    // Ensure that the log directory exists, if not, create it
    if (!fs.existsSync(logDirectory)) {
        fs.mkdirSync(logDirectory, { recursive: true });
    }
    
    // Save email log to file
    const now = new Date();
    const formattedDate = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
    const formattedTime = `${now.getHours()}-${now.getMinutes()}`;
    const logFileName = `${logDirectory}/emailLog_${formattedDate}_${formattedTime}.json`;
    
    fs.writeFileSync(logFileName, JSON.stringify(emailLog, null, 2));
    console.log(`Email log saved to ${logFileName}`);
};


const sendEmail = async (companyEmail, transporter) => {
    // Set up your email transporter and mail options here
    const mailOptions = {
        from: 'raymondyounes2@gmail.com',
        to: companyEmail,
        subject: 'Working Closely: Invitation to Code Your Future Event',
        attachments: [
            {
                filename: 'CodeYourFutureEvent.pdf',
                path: "./CodeYourFuture's Festival of Diverse Talent Ldn10.pdf"
            }
        ],
        html:`<html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Code Your Future Event Invitation</title>
            <style>
                /* Resetting default styles */
                body, html {
                    margin: 0;
                    padding: 0;
                }
        
            
                .container {
                    max-width: 600px;
                    margin: 20px auto;
                    padding: 20px;
                    background-color: #ffffff; 
                    border-radius: 8px;
                    font-family: Arial, sans-serif;
                    color: #333333; 
                }
        
               
                .button {
                    display: inline-block;
                    background-color: #007bff; 
                    color: #ffffff; 
                    text-decoration: none;
                    padding: 10px 20px;
                    border-radius: 5px;
                }
        
                /* Image styles */
                .product-image {
                    width: 100%; 
                    max-width: 400px;
                    height: auto; 
                    margin-bottom: 20px; 
                    border-radius: 8px; 
                }
        
                /* Link styles */
                .button:hover {
                    background-color: #0056b3; 
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h2>Code Your Future Event Invitation</h2>
                <p>Hello!</p>
                <p>We are excited to invite you to our upcoming Festival of Diverse Talent event on March 22nd!</p>
                <p>This event celebrates diversity and inclusion in the tech community. It's an opportunity for companies like yours to showcase job opportunities, provide workshops, and connect with our talented graduates.</p>
                <p>We would be delighted to have your participation and support. Please let us know if you're interested in joining us!</p>
                <p>Best regards,</p>
                <p>Your Name</p>
                <p>Code Your Future</p>
                <a href="https://codeyourfuture.io/meet-the-team/" ><img src="https://codeyourfuture.io/wp-content/uploads/2020/08/Hero-Volunteer.jpg" alt="Code Your Future" class="product-image"></a>
                <img src="https://ajial.onrender.com/api/v1/track?id=${companyEmail}" width="1" height="1" style="display:none;">
            </div>
        </body>
        </html>
        `
    };

    await transporter.sendMail(mailOptions);
};

const csvFilePath = './testEmail.csv';


const getEmailArraysFromCSV = async (csvFilePath) => {
    let emailArrays = [];

    // Read the CSV file and extract email addresses
    fs.createReadStream(csvFilePath)
      .pipe(csvParser())
      .on('data', (row) => {
        console.log('row:',row);
        const emails = Object.values(row);
        emailArrays.push(...emails);
      })
      .on('end', () => {
        console.log('CSV file processed successfully.');
        console.log('Email arrays:', emailArrays);
        sendEmailsCampaign(emailArrays);
        // Call your email campaign function here with emailArrays
      })
      .on('error', (error) => {
        console.error('Error reading CSV file:', error);
      });
};

// Call the function to read email addresses from the CSV file
// getEmailArraysFromCSV(csvFilePath);







