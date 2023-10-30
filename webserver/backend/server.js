const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

let formData = {};

const wss = new WebSocket.Server({port: 8083});

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
app.listen(port, () => {
  console.log(`HTTPS Server listening at https://localhost:${port}`);
});
