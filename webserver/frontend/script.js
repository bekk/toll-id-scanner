const urlParams = new URLSearchParams(window.location.search);
if (urlParams.has('formId')) {
  formId = urlParams.get('formId');
} else {
  formId =
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15);
}

window.addEventListener(
  'message',
  function (event) {
    document.getElementById('data').innerText = event.data;
  },
  false,
);

async function fetchData(formId) {
  console.log('formId', formId);

  const response = await fetch(`http://${ip.trim()}:8082/data/${formId}`);
  console.log('response ', response);
  const data = await response.json();
  document.getElementById('fetchedData').innerText = JSON.stringify(data);
}

fetch('/ip.txt')
  .then(response => response.text())
  .then(ip => {
    console.log('ip', ip);

    let ws;
    function establishWebSocket() {
      ws = new WebSocket(`ws://${ip.trim()}:8083`);
      console.log('readystate', ws.readyState);

      ws.addEventListener('open', () => {
        console.log('readystate', ws.readyState);
        fetchData(formId);
      });

      ws.addEventListener('message', event => {
        console.log('readystate', ws.readyState);
        const receivedData = JSON.parse(event.data);
        if (receivedData.formId === formId) {
          document.getElementById('fetchedData').innerText = JSON.stringify(
            receivedData.data,
          );
        }
      });

      ws.addEventListener('close', () => {
        console.log('readystate', ws.readyState);
        establishWebSocket();
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
