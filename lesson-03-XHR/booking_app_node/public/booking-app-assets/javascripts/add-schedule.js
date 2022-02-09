"use strict";

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

function addFormStaffDropdown(schedNum, staffList) {
  let itemStaff = document.createElement('li');

  let labelStaff = document.createElement('label');
  labelStaff.setAttribute('for', `sched_${schedNum}_staff`);
  labelStaff.textContent = 'Staff Name:';

  let dropdownStaff = document.createElement('select');
  dropdownStaff.setAttribute('id', `sched_${schedNum}_staff`);
  dropdownStaff.setAttribute('name', `staff${schedNum}`);
  staffList.forEach(staff => {
    let option = document.createElement('option');
    option.textContent = staff.name;
    dropdownStaff.appendChild(option);
  });

  itemStaff.appendChild(labelStaff);
  itemStaff.appendChild(dropdownStaff);

  return itemStaff;
}

function addFormItemDate(schedNum) {
  let itemDate = document.createElement('li');

  let labelDate = document.createElement('label');
  labelDate.setAttribute('for', `sched_${schedNum}_date`);
  labelDate.textContent = 'Date:';

  let inputDate = document.createElement('input');
  inputDate.setAttribute('type', 'text');
  inputDate.setAttribute('id', `sched_${schedNum}_date`);
  inputDate.setAttribute('name', `date${schedNum}`);
  inputDate.setAttribute('placeholder', 'mm-dd-yy');
  // inputDate.setAttribute('onfocus', "if (this.value=='mm-dd-yy') this.value='';");

  itemDate.appendChild(labelDate);
  itemDate.appendChild(inputDate);

  return itemDate;
};

function addFormItemTime(schedNum) {
  let itemTime = document.createElement('li');

  let labelTime = document.createElement('label');
  labelTime.setAttribute('for', `sched_${schedNum}_time`);
  labelTime.textContent = 'Time:';

  let inputTime = document.createElement('input');
  inputTime.setAttribute('type', 'text');
  inputTime.setAttribute('id', `sched_${schedNum}_time`);
  inputTime.setAttribute('name', `time${schedNum}`);
  inputTime.setAttribute('placeholder', 'hh:mm');
  // inputTime.setAttribute('onfocus', "if (this.value=='hh:mm') this.value='';");

  itemTime.appendChild(labelTime);
  itemTime.appendChild(inputTime);

  return itemTime;
};

function addScheduleBlock(schedNum, staffList) {
  let formSubmitButton = document.querySelector('form button');
  
  let block = document.createElement('div');
  let blockTitle = document.createElement('legend');
  blockTitle.textContent = `Schedule ${schedNum}`;
  block.appendChild(blockTitle);
  
  let formList = document.createElement('ul');
  let itemStaff = addFormStaffDropdown(schedNum, staffList);
  let itemDate = addFormItemDate(schedNum);
  let itemTime = addFormItemTime(schedNum);
  

  formList.appendChild(itemStaff);
  formList.appendChild(itemDate);
  formList.appendChild(itemTime);
  block.appendChild(formList);
  formSubmitButton.insertAdjacentElement('beforebegin', block);
};

function serializeFormData(rawData, staffList) {
  let newData = { "schedules": [] };
  let entries = [];
  for (const data of rawData.entries()) {
    entries.push(data[0], data[1]);
  }
  for (let i = 0; i < entries.length; i += 6) {
    let schedObj = {
      "staff_id": getStaffId(entries[i + 1], staffList),
      "date": entries[i + 3],
      "time": entries[i + 5]
    };
    newData.schedules.push(schedObj);
  }
  return JSON.stringify(newData);
};

function getStaffId(name, staffList) {
  return staffList.find(staff => staff.name === name).id;
};

document.addEventListener('DOMContentLoaded', async () => {
  let allStaff = await getStaffRoster();
  let scheduleCount = 0;
      
  addScheduleBlock((scheduleCount += 1), allStaff);

  let addSchedButton = document.getElementById('add_button');
  addSchedButton.addEventListener('click', () => {
    addScheduleBlock((scheduleCount += 1), allStaff);
  });

  let form = document.querySelector('form');
  form.addEventListener('submit', event => {
    event.preventDefault();

    let rawFormData = new FormData(form);
    let reqFormData = serializeFormData(rawFormData, allStaff);

    let request = new XMLHttpRequest();
    request.open('POST', '/api/schedules');
    request.setRequestHeader('Content-Type', 'application/json; charset=utf-8');   
    request.send(reqFormData);

    request.addEventListener('load', () => {
      if (request.status === 201) form.reset();
      alert(request.response);
    })
  });
});

// function getSchedules() {
//   let request = new XMLHttpRequest();
//   request.open('GET', '/api/schedules');
//   request.responseType = 'json';
//   request.timeout = 5000;

//   request.ontimeout = () => alert(`Timeout: Please try again later`);

//   request.addEventListener('load', event => {
//     let schedules = request.response;

//     if (schedules.length > 0) {
//       let staffSchedCount = {};
//       schedules.forEach(schedule => {
//         let staff = `staff ${schedule.staff_id}`;
//         staffSchedCount[staff] = (staffSchedCount[staff] += 1) || 1;
//       });
      
//       let schedOutput = '';
//       for (let staff in staffSchedCount) {
//         schedOutput += `${staff}: ${staffSchedCount[staff]} \n`;
//       }

//       alert(schedOutput);
//     } else {
//       alert('There are currently no schedules available for booking');
//     }        
//   });

//   request.addEventListener('loadend', event => {
//     alert('The request has completed.');
//   });
  
//   request.send();
// };