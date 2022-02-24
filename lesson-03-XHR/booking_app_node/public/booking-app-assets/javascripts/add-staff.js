"use strict";

document.addEventListener('DOMContentLoaded', () => {
  let form = document.querySelector('form');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let data = new FormData(e.target);
    
    let request = new XMLHttpRequest();
    request.open('POST', '/api/staff_members');
    request.send(data);

    request.addEventListener('load', event => {
      if (request.status === 400) {
        alert(request.response);
      } else if (request.status === 201) {
        form.reset();
        let newStaffId = JSON.parse(request.response).id;
        alert(`Successfully created staff with id: ${newStaffId}`);
      }
    });
  });

  function getSchedules() {
    let request = new XMLHttpRequest();
    request.open('GET', '/api/schedules');
    request.responseType = 'json';
    request.timeout = 5000;

    request.ontimeout = () => alert(`Timeout: Please try again later`);

    request.addEventListener('load', event => {
      let schedules = request.response;

      if (schedules.length > 0) {
        let staffSchedCount = {};
        schedules.forEach(schedule => {
          let staff = `staff ${schedule.staff_id}`;
          staffSchedCount[staff] = (staffSchedCount[staff] += 1) || 1;
        });
        
        let schedOutput = '';
        for (let staff in staffSchedCount) {
          schedOutput += `${staff}: ${staffSchedCount[staff]} \n`;
        }

        alert(schedOutput);
      } else {
        alert('There are currently no schedules available for booking');
      }        
    });

    request.addEventListener('loadend', event => {
      alert('The request has completed.');
    });
    
    request.send();
  };
});