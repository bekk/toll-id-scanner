// Generate a random 'formId' if not provided in URL
function generateFormId() {
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.has('formId')) {
    return urlParams.get('formId');
  } else {
    return (
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15)
    );
  }
}

// Fetch the IP address from '/ip.txt' and initialize WebSocket
fetch('/ip.txt')
  .then(response => response.text())
  .then(ip => {
    console.log('ip', ip);
    initializeWebSocket(ip);
  })
  .catch(error => console.error('Error fetching IP:', error));

// Initialize formId and open the application
const formId = generateFormId();
window.addEventListener('load', () => fetchData(formId));
window.openApp = function () {
  window.open('toll-id-scanner://main/formId=' + formId, '_blank').focus();
};

// Handle incoming messages
function handleMessage(event) {
  document.getElementById('data').innerText = event.data;
}

// Fetch data from a URL and update the DOM
async function fetchData(formId) {
  console.log('formId', formId);
  try {
    const response = await fetch(`http://10.0.20.84:8082/data/${formId}`, {
      method: 'GET',
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const responseText = await response.text(); // Retrieve the response body as text
    console.log(
      'Response:',
      response.status,
      response.statusText,
      '. Data:',
      responseText,
    );
    // const data = await response.json();
    document.getElementById('fetchedData').innerText = JSON.stringify(data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

let ws; // Declare WebSocket outside of the initializeWebSocket function

// Initialize WebSocket and set up event listeners
function initializeWebSocket(ip) {
  ws = new WebSocket(`ws://${ip.trim()}:8083`);
  console.log('WebSocket readyState', ws.readyState);

  ws.addEventListener('open', () => {
    console.log('WebSocket readyState', ws.readyState);
    fetchData(formId);
  });

  ws.addEventListener('message', event => {
    console.log('WebSocket readyState', ws.readyState);
    const receivedData = JSON.parse(event.data);
    if (receivedData.formId === formId) {
      document.getElementById('fetchedData').innerText = JSON.stringify(
        receivedData.data,
      );
    }
  });

  ws.addEventListener('close', () => {
    console.log('WebSocket readyState', ws.readyState);
    // Re-establishing the WebSocket is not necessary here
    // You can remove the recursive call: initializeWebSocket(ip);
  });
}
