let formId;
let ws;

// Check if a formId parameter exists in the URL
const urlParams = new URLSearchParams(window.location.search);
if (urlParams.has('formId')) {
  formId = urlParams.get('formId');
} else {
  formId =
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15);
}
console.log('formId', formId);

window.addEventListener(
  'message',
  function (event) {
    document.getElementById('data').innerText = event.data;
  },
  false,
);

fetch('/ip.txt')
  .then(response => response.text())
  .then(ip => {
    console.log('ip', ip);

    async function fetchData(formId) {
      const response = await fetch(`http://${ip.trim()}:8082/data/${formId}`);
      const data = await response.json();
      console.log('fetch', data);
      document.getElementById('fetchedData').innerText = JSON.stringify(data);
    }

    fetchData(formId);
    setInterval(() => {
      console.log('This happens too often');
      fetchData(formId);
    }, 1000);

    function establishWebSocket() {
      ws = new WebSocket(`ws://${ip.trim()}:8083`);
      ws.addEventListener('message', event => {
        const receivedData = JSON.parse(event.data);
        if (receivedData.formId === formId) {
          document.getElementById('fetchedData').innerText = JSON.stringify(
            receivedData.data,
          );
        }
      });

      ws.addEventListener('close', () => {
        setTimeout(establishWebSocket, 3000);
      });
      ws.addEventListener('open', () => {
        console.log('Connected to WebSocket server');
      });
      ws.addEventListener('error', () => {
        console.log('error');
      });
    }

    establishWebSocket();
    window.addEventListener('load', () => fetchData(formId));

    window.openApp = function () {
      window.open('toll-id-scanner://main/formId=' + formId, '_blank').focus();
      if (!ws || ws.readyState !== WebSocket.OPEN) {
        fetchData(formId);
      }
    };
  })
  .catch(error => console.error('Error fetching IP:', error));
