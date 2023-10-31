let manualOverrides = {
  firstName: false,
  lastName: false,
  docNr: false,
  gender: false,
  dob: false,
  nationality: false,
};

document.querySelectorAll('input').forEach(input => {
  input.addEventListener('input', function () {
    const warningDiv = document.getElementById(input.id + 'Warning');

    if (this.value !== this.defaultValue) {
      manualOverrides[input.id] = true;
      if (warningDiv) warningDiv.style.display = 'block';
    } else {
      manualOverrides[input.id] = false;
      if (warningDiv) warningDiv.style.display = 'none';
    }
  });
});

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

function resetField(fieldId) {
  manualOverrides[fieldId] = false;
  document.getElementById(fieldId).value =
    document.getElementById(fieldId).defaultValue;
  const warningDiv = document.getElementById(fieldId + 'Warning');
  if (warningDiv) warningDiv.style.display = 'none';
}

async function fetchData(formId, ip) {
  try {
    const response = await fetch(`http://${ip.trim()}:8082/data/${formId}`, {
      method: 'GET',
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const responseData = await response.json();

    const fields = {
      firstName: responseData.firstName,
      lastName: responseData.lastName,
      docNr: responseData.documentNumber,
      gender: responseData.gender,
      nationality: responseData.nationality,
    };

    if (responseData.dateOfBirth) {
      const [day, month, year] = responseData.dateOfBirth.split('/');
      const formattedDay = day.padStart(2, '0');
      const formattedMonth = month.padStart(2, '0');
      fields.dob = `${year}-${formattedMonth}-${formattedDay}`;
    }

    Object.entries(fields).forEach(([field, value]) => {
      if (!manualOverrides[field]) {
        const inputElem = document.getElementById(field);
        inputElem.value = value || '';
        inputElem.defaultValue = value || '';
      }
    });
  } catch (error) {
    console.error('Error fetching data:', error.message);
  }
}

getIP();
