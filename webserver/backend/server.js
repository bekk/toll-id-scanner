const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const WebSocket = require('ws');
const http = require('http');

const app = express();
const port = process.env.PORT || 8080;
const server = http.createServer(app);

let formData = {};

const wss = new WebSocket.Server({server});

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

server.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
