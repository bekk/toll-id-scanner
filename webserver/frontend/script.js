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

let interval;

async function getIP() {
  let globalIP = await fetch('/ip.txt')
    .then(response => response.text())
    .then(ip => {
      return ip;
    })
    .catch(error => console.error('Error fetching IP:', error.message));

  const formId = generateFormId();

  if (!interval) {
    interval = setInterval(() => {
      fetchData(formId, globalIP);
    }, 1000);
  }
  window.openApp = function () {
    window.open('toll-id-scanner://main/formId=' + formId, '_blank').focus();
  };
}

async function fetchData(formId, ip) {
  try {
    const response = await fetch(`http://${ip.trim()}:8082/data/${formId}`, {
      method: 'GET',
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const responseText = await response.text(); // Retrieve the response body as text
    document.getElementById('fetchedData').innerText = responseText;
  } catch (error) {
    console.error('Error fetching data:', error.message);
  }
}

getIP();
