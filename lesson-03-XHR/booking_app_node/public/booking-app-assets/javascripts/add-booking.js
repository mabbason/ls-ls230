"use strict";

function getSchedsRequest() {
  return new Promise((resolve, reject) => {
    let request = new XMLHttpRequest();
    request.open('GET', '/api/schedules');
    request.responseType = 'json';
    request.timeout = 8000;
    request.send();

    request.addEventListener('load', () => {
      let schedules = request.response;
      if (request.status === 200 && schedules.length > 0) {
        resolve(schedules)
      } else {
        reject('Failed to load schedules. Please try again.')
      }
    });

    request.addEventListener('timeout', () => {
      reject('Timeout... trying again');
    });
  });
}

async function getAllSchedules() {
  try {
    let allScheds = await getSchedsRequest();
    return allScheds;
  } catch(failMsg) {
    console.log(failMsg);
    return null;
  }
};

function getStaffRequest() {
  return new Promise((resolve, reject) => {
    let request = new XMLHttpRequest();
    request.open('GET', '/api/staff_members');
    request.responseType = 'json';
    request.addEventListener('load', () => {
      if (request.status === 200) {
        resolve(request.response)
      } else {
        reject('Failed to retrieve list of staff members')
      }
    });
    request.send();
  });
}

async function getStaffRoster() {
  try {
    let allStaff = await getStaffRequest();
    return allStaff;
  } catch(errorMsg) {
    console.log('Failed to retrieve list of staff members');
    return null;
  }
};

function addFormScheduleDropdown(allScheds, allStaff) {
  let itemSchedules = document.createElement('li');

  let labelStaff = document.createElement('label');
  labelStaff.setAttribute('for', 'sched_dropdown');
  labelStaff.textContent = 'Please select one schedule';

  let dropdownSchedules = document.createElement('select');
  dropdownSchedules.setAttribute('id', `sched_dropdown`);
  dropdownSchedules.setAttribute('name', `id`);
  allScheds.forEach(schedule => {
    let option = document.createElement('option');
    option.setAttribute('value', `${schedule.id}`);
    let { staff_id, date, time } = schedule;
    option.textContent = `${getStaffName(staff_id, allStaff)} | ${date} | ${time}`;
    dropdownSchedules.appendChild(option);
  });

  itemSchedules.appendChild(labelStaff);
  itemSchedules.appendChild(dropdownSchedules);

  return itemSchedules;
}

function addFormItemEmail(email) {
  let itemEmail = document.createElement('li');

  let labelEmail = document.createElement('label');
  labelEmail.setAttribute('for', `student_email`);
  labelEmail.textContent = 'Email:';

  let inputEmail = document.createElement('input');
  inputEmail.setAttribute('type', 'text');
  inputEmail.setAttribute('id', `student_email`);
  inputEmail.setAttribute('name', `student_email`);
  if (email) inputEmail.setAttribute('value', email);
  
  itemEmail.appendChild(labelEmail);
  itemEmail.appendChild(inputEmail);

  return itemEmail;
};

function addFormSubmitBtn(btnId) {
  let button = document.createElement('button');
  button.setAttribute('type', 'submit');
  button.setAttribute('id', `${btnId}_submit`);
  button.textContent = 'Submit';
  return button;
};

function addBookingForm(allScheds, allStaff) {
  let form = document.querySelector('form');
  
  let formList = document.createElement('ul');
  let itemSchedules = addFormScheduleDropdown(allScheds, allStaff);
  let itemEmail = addFormItemEmail();
  let submitButton = addFormSubmitBtn('booking');
  
  itemEmail.insertAdjacentElement('beforeend', submitButton)
  formList.appendChild(itemSchedules);
  formList.appendChild(itemEmail);
    
  form.appendChild(formList);
};

function addFormItemName() {
  let itemName = document.createElement('li');

  let labelName = document.createElement('label');
  labelName.setAttribute('for', `student_name`);
  labelName.textContent = 'Name:';

  let inputName = document.createElement('input');
  inputName.setAttribute('type', 'text');
  inputName.setAttribute('id', `student_name`);
  inputName.setAttribute('name', 'name');
    
  itemName.appendChild(labelName);
  itemName.appendChild(inputName);

  return itemName;
};

function addFormItemBookSeq(bookSeq) {
  let itemBookSeq = document.createElement('li');

  let labelBookSeq = document.createElement('label');
  labelBookSeq.setAttribute('for', `booking_seq`);
  labelBookSeq.textContent = 'Booking Sequence:';

  let inputBookSeq = document.createElement('input');
  inputBookSeq.setAttribute('type', 'text');
  inputBookSeq.setAttribute('id', `booking_seq`);
  inputBookSeq.setAttribute('name', `booking_sequence`);
  if (bookSeq) inputBookSeq.setAttribute('value', bookSeq);
  
  itemBookSeq.appendChild(labelBookSeq);
  itemBookSeq.appendChild(inputBookSeq);

  return itemBookSeq;
};

function addStudentForm(email, bookSeq) {
  let form = document.createElement('form');
  form.setAttribute('id', 'add_student_form');
  let heading = document.createElement('h1');
  heading.textContent = 'Please provide new student details';
  form.appendChild(heading);

  let formList = document.createElement('ul');
  let itemEmail = addFormItemEmail(email);
  let itemName = addFormItemName();
  let itemBookingSeq = addFormItemBookSeq(bookSeq);
  let itemSubmitBtn = document.createElement('li');
  itemSubmitBtn.appendChild(addFormSubmitBtn('student'));
  
  formList.appendChild(itemEmail);
  formList.appendChild(itemName);
  formList.appendChild(itemBookingSeq);
  formList.appendChild(itemSubmitBtn);
    
  form.appendChild(formList);
  document.body.appendChild(form);
};

function serializeFormData(rawData) {
  let newData = {};

  for (const data of rawData.entries()) {
    newData[data[0]] = data[1];
  }
  
  return JSON.stringify(newData);
};

function getStaffId(name, staffList) {
  return staffList.find(staff => staff.name === name).id;
};

function getStaffName(id, staffList) {
  return staffList.find(staff => staff.id === id).name;
};

document.addEventListener('DOMContentLoaded', async () => {
  let form = document.querySelector('form');
  form.textContent = 'Loading all available schedules...';
  let allStaff = await getStaffRoster();
  let allScheds = await getAllSchedules();
  let availScheds = allScheds.filter(sched => !sched.student_email);
  form.textContent = '';
  
  addBookingForm(availScheds, allStaff);
        
  form.addEventListener('submit', event => {
    event.preventDefault();

    let rawFormData = new FormData(form);
    let reqFormData = serializeFormData(rawFormData);

    let request = new XMLHttpRequest();
    request.open('POST', '/api/bookings');
    request.setRequestHeader('Content-Type', 'application/json; charset=utf-8');   
    request.send(reqFormData);

    request.addEventListener('load', () => {
      if (request.status === 204) {
        form.reset();
        alert('Booked');
      } else {
        alert(request.response);
        let bookSeq = request.response.replace(/[^0-9]/g, '');
        let email = JSON.parse(reqFormData).student_email;
        let schedId = JSON.parse(reqFormData).id;
        
        addStudentForm(email, bookSeq);
        let studentForm = document.getElementById('add_student_form');
        studentForm.addEventListener('submit', event => {
          event.preventDefault();

          let rawFormData = new FormData(studentForm);
          let reqFormData = serializeFormData(rawFormData);
          reqFormData = reqFormData.replace('student_email', 'email');
          
          let request = new XMLHttpRequest();
          request.open('POST', '/api/students');
          request.setRequestHeader('Content-Type', 'application/json; charset=utf-8');   
          request.send(reqFormData);

          request.addEventListener('load', event => {
            event.preventDefault();
            if (request.status === 201) {
              alert(request.response);

              let bookingData = {
                "id": schedId,
                "student_email": email
              };

              let bookingReq = new XMLHttpRequest();
              bookingReq.open('POST', '/api/bookings');
              bookingReq.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
              bookingReq.send(JSON.stringify(bookingData));
              
              bookingReq.addEventListener('load', () => {
                console.log(bookingReq.status);
                if (bookingReq.status === 204) {
                  alert('Booked');
                  form.reset();
                  studentForm.remove();
                } else {
                  alert(bookingReq.response);
                }
              });
            }
          })
        });
      }
    });
  });
});
