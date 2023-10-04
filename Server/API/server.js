const express = require('express');
const fs = require('fs');
const app = express();
const port = 5000;
const cors = require('cors');
const { CourierClient } = require("@trycourier/courier");
const courier = CourierClient({ authorizationToken: "pk_prod_6SK6BV4FM1MAVEGCKXAH95TGPWNG" });

app.use(cors());
app.use(express.json());
// let matlabData = null;
const exceljs = require('exceljs');
app.get('/excelcell', (req, res) => {
  // Define the path to your local Excel file
  const excelFilePath = './allenexcel.xlsx';

  // Create a new instance of exceljs workbook
  const workbook = new exceljs.Workbook();

  // Load the Excel file
  workbook.xlsx.readFile(excelFilePath)
      .then(() => {
          // Select the worksheet you want to read (e.g., the first worksheet)
          const worksheet = workbook.getWorksheet(1);

          // Define the cell address you want to retrieve (e.g., A1)

          // Get the cell by address and retrieve its value
          const humidity = worksheet.getCell('A5');
          const tempc = worksheet.getCell('B5');
          const tempf = worksheet.getCell('C5');
          const gassensor = worksheet.getCell('D5');
          const pirsensor = worksheet.getCell('E5');

          const flamesensor = worksheet.getCell('F5');
          const ultrasonic = worksheet.getCell('G5');  
          
          
          const humiditydata = humidity.value;
          const tempcdata = tempc.value;
          const tempfdata = tempf.value;
          const gassensordata = gassensor.value;
          const pirsensordata = pirsensor.value;
          const flamesensordata = flamesensor.value;
          const ultrasonicdata = ultrasonic.value;


          // Send the cell value as the response
          res.json({
            humiditydata,
            tempcdata,
            tempfdata,
            gassensordata,
            pirsensordata,
            flamesensordata,
            ultrasonicdata

            
          });
      })
      .catch(err => {
          console.error(err);
          res.status(500).send('Error reading the Excel file.');
      });
});

app.post('/send-courier-message', async (req, res) => {
  try {
    const { requestId } = await courier.send({
      message: {
        to: {
          email: "agrochain.sih@gmail.com",
        },
        template: "FT0VS9003CMDN9MDZVE4VTVD8Q57",
        data: {
          username: "AgroChain",
          param_name: "Temperature",
          param_value: "30",
        },
      },
    });

    // Respond with the request ID or any other response as needed
    res.json({ requestId });
  } catch (error) {
    console.error('Error sending Courier message:', error);
    res.status(500).json({ error: 'Error sending Courier message.' });
  }
});


// Initial read of the JSON file
function readJSONFile() {
  
  try {
    const data = fs.readFileSync('../../Client/src/matlabData.json', 'utf8');
    matlabData = JSON.parse(data);
  } catch (err) {
    console.error('Error reading JSON file:', err);
  }
}

// Watch for changes to the JSON file
const a = require('../../Client/src/matlabData.json')
fs.watch('../../Client/src/matlabData.json', (event, filename) => {
  if (event === 'change') {
    console.log('File changed:', filename);
    readJSONFile();
  }
});

// Serve the JSON data via an API endpoint
app.get('/api1', (req, res) => {
  if (matlabData !== null) {
    res.json(matlabData);
  } else {
    res.status(500).json({ error: 'Unable to fetch data.' });
  }
});

// Start the Express server

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Read the JSON file on startup
readJSONFile();
