"use strict";

document.addEventListener('DOMContentLoaded', event => {
  function getSchedules() {
    let request = new XMLHttpRequest();
    request.open('GET', '/api/schedules');
    request.responseType = 'json';
    request.timeout = 5000;
    request.ontimeout = () => alert(`Timeout: Please try again`);
    request.addEventListener('load', event => {

      request.response.forEach(schedule => console.log(schedule));

      // console.log(typeof request.response);
      alert('data loaded');
    });
    request.send();
  };

  getSchedules();

});