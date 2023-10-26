const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const WebSocket = require('ws');

const app = express();
const port = 3000;

let formData = {};

app.use(cors());
app.use(bodyParser.json());

app.use(express.static(__dirname));

app.post('/data', (req, res) => {
  const {formId, data} = req.body;
  formData[formId] = data;
  res.send('Data received');
});

app.get('/data/:formId', (req, res) => {
  const {formId} = req.params;
  res.json(formData[formId] || {});
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
