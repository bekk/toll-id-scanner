const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const WebSocket = require('ws');

const app = express();
const port = 3000;

// In-memory storage
let formData = {};

// Initialize WebSocket server
const wss = new WebSocket.Server({port: 8083});

wss.on('connection', ws => {
  ws.on('message', message => {
    console.log('received:', message);
  });
});

app.use(cors());
app.use(bodyParser.json());

// Serve your existing index.html file
app.use(express.static(__dirname));

// Receive data
app.post('/data', (req, res) => {
  const {formId, data} = req.body;
  formData[formId] = data;

  // Send data to all WebSocket clients
  wss.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify({formId, data: formData[formId]}));
    }
  });

  res.send('Data received');
});

// Retrieve data
app.get('/data/:formId', (req, res) => {
  const {formId} = req.params;
  res.json(formData[formId] || {});
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
