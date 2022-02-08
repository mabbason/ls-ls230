"use strict";

async function getStaffRoster() {
  let getStaff = new Promise((resolve, reject) => {
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
  let allStaff;
  try {
    allStaff = await getStaff;
    return allStaff;
  } catch(errorMsg) {
    return errorMsg;
  }
};

function addScheduleBlock(schedNum, staffList) {
  let form = document.querySelector('form');

  let block = document.createElement('div');
  let blockTitle = document.createElement('legend');
  blockTitle.textContent = `Schedule ${schedNum}`;
  block.appendChild(blockTitle);
  
  let formList = document.createElement('ul');

  let itemStaff = document.createElement('li');
  let staffLabel = document.createElement('label');
  staffLabel.setAttribute('for', `sched_${schedNum}_staff`);
  staffLabel.textContent = 'Staff Name:';
  let staffDropdown = document.createElement('select');
  staffDropdown.setAttribute('id', `sched_${schedNum}_staff`);
  staffList.forEach((staff, idx) => {
    let option = document.createElement('option');
    option.setAttribute('value', `staff_${idx + 1}`);
    option.textContent = staff.name;
    staffDropdown.appendChild(option);
  });

  itemStaff.appendChild(staffLabel);
  itemStaff.appendChild(staffDropdown);

  formList.appendChild(itemStaff);
  block.appendChild(formList);
  form.insertAdjacentElement('afterbegin', block);



  // staffLabel.textContent = 'Staff Name:';

  // let itemDate = document.createElement('li');

  // let itemTime = document.createElement('li');

};


document.addEventListener('DOMContentLoaded', async () => {
  let allStaff = await getStaffRoster();
  let scheduleCount = 1;
    
  addScheduleBlock(scheduleCount, allStaff);

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