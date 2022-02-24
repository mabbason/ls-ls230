function lookUpStaffNames() {
  return new Promise((resolve, reject) => {
    let request = new XMLHttpRequest();
    request.open('GET', 'http://localhost:3000/api/staff_members');
    request.responseType = 'json';
    request.timeout = 5000;
    request.send();

    request.addEventListener('load', (event) => {
      if (request.status === 200) {
        resolve(request.response);
      } else {
        reject("Something went wrong fetching staff info...");
      }
    });

    request.addEventListener('timeout', () => {
      alert("the server is taking longer than usual. Please try again later.")
    });
  });
}

function getOpenSchedules() {
  return new Promise((resolve, reject) => {
    let request = new XMLHttpRequest();
    request.open('GET', 'http://localhost:3000/api/schedules');
    request.responseType = 'json';
    request.timeout = 5000;
    request.send();

    request.addEventListener('load', event => {
      if (request.status === 200) {
        let openSchedules = request.response.filter(schedule => schedule.student_email === null);
        resolve(openSchedules);
      } else {
        reject("Something went wrong fetching schedule info...");
      }
    });

    request.addEventListener('timeout', () => {
      alert("the server is taking longer than usual. Please try again later.")
    });
  });
}

async function renderSchedules() {
  let schedules = document.querySelector('#available');
  try {
    let scheduleData = await getOpenSchedules();
    let staffInfo = await lookUpStaffNames();

    scheduleData.forEach(schedule => {
      let staffName = staffInfo.find(record => record.id === schedule.staff_id).name;
      let newOptionElement = document.createElement('option');
      newOptionElement.innerHTML = `${staffName} | ${schedule.date} | ${schedule.time}`;
      newOptionElement.setAttribute('value', schedule.id);
      schedules.appendChild(newOptionElement);
    });
  } catch (error) {
    console.log(error);
  };
}

document.addEventListener('DOMContentLoaded', () => {
  let formContainer = document.getElementById('forms-container');
  let form = document.querySelector('.form-schedule');
  let newStudentForm = document.querySelector('.student-form')
  form.reset();
  newStudentForm.reset();
  renderSchedules();

  formContainer.addEventListener('submit', (event) => {
    event.preventDefault();
    let data = new FormData(form);
    let request = new XMLHttpRequest();
    request.open('POST', 'http://localhost:3000/api/bookings');

    request.addEventListener('load', () => {
      if (request.status === 204) {
        alert("Schedule Booked Successfully");
        location.reload();

      } else if (request.status === 404) {
        alert(request.response);
        let sequence = request.responseText.split(':')[1].trim();
        document.querySelector('#new-student-div').classList.toggle('hidden');
        document.querySelector('#booking_sequence').value = sequence;
      }
    });
    request.send(data);
  });

  newStudentForm.addEventListener('submit', (event) => {
    event.preventDefault();
    let newStudentData = new FormData(newStudentForm);
    let request = new XMLHttpRequest();
    request.open('POST', 'http://localhost:3000/api/students');
    
    request.addEventListener('load', () => {
      if (request.status === 201) {
        alert("New Student Record Created Successfully");
      } else if (String(request.status)[0] === '4') {
        alert(request.response);
      }
    });

    request.send(newStudentData);
  });
});