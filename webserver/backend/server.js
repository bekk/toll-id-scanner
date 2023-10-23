const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const WebSocket = require('ws');
const https = require('https');
const fs = require('fs');

const app = express();
const port = 3000;

// Load your key and certificate
const privateKey = fs.readFileSync('path_to_private_key.pem', 'utf8');
const certificate = fs.readFileSync('path_to_certificate.pem', 'utf8');
const ca = fs.readFileSync('path_to_ca.pem', 'utf8');

const credentials = {
  key: privateKey,
  cert: certificate,
  ca: ca,
};

const httpsServer = https.createServer(credentials, app);

let formData = {};

// Attach WebSocket Server to your HTTPS server
const wss = new WebSocket.Server({server: httpsServer});

wss.on('connection', ws => {
  ws.on('message', message => {
    console.log('received:', message);
  });
});

app.use(cors());
app.use(bodyParser.json());

app.use(express.static(__dirname));

app.post('/data', (req, res) => {
  const {formId, data} = req.body;
  formData[formId] = data;

  wss.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify({formId, data: formData[formId]}));
    }
  });

  res.send('Data received');
});

app.get('/data/:formId', (req, res) => {
  const {formId} = req.params;
  res.json(formData[formId] || {});
});

// Use httpsServer.listen instead of app.listen for HTTPS
httpsServer.listen(port, () => {
  console.log(`HTTPS Server listening at https://localhost:${port}`);
});
