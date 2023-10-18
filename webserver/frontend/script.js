const formId =
  Math.random().toString(36).substring(2, 15) +
  Math.random().toString(36).substring(2, 15);

window.addEventListener(
  'message',
  function (event) {
    document.getElementById('data').innerText = event.data;
  },
  false,
);

function openApp() {
  window.open('toll-id-scanner://main/formId=' + formId, '_blank').focus();
}

fetch('/ip.txt')
  .then(response => response.text())
  .then(ip => {
    console.log('ip', ip);
    const ws = new WebSocket(`ws://${ip.trim()}:8083`);

    ws.addEventListener('message', event => {
      const receivedData = JSON.parse(event.data);

      if (receivedData.formId === formId) {
        document.getElementById('fetchedData').innerText = JSON.stringify(
          receivedData.data,
        );
      }
    });

    async function fetchData(formId) {
      const response = await fetch(`http://${ip.trim()}:8082/data/${formId}`);
      const data = await response.json();
      document.getElementById('fetchedData').innerText = JSON.stringify(data);
    }

    window.addEventListener('load', () => fetchData(formId));
  })
  .catch(error => console.error('Error fetching IP:', error));
