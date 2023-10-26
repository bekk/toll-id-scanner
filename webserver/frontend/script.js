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
setInterval(() => {
  fetchData(formId), 1000;
});
window.addEventListener('load', () => fetchData(formId));
window.openApp = function () {
  window.open('toll-id-scanner://main/formId=' + formId, '_blank').focus();
};

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
    document.getElementById('fetchedData').innerText = responseText;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}
