"use strict";

async function getAllBookings() {
  let allBookings =  await (() => {
    return new Promise((resolve, reject) => {
      let request = new XMLHttpRequest();
      request.open('GET', '/api/bookings');
      request.responseType = 'json';
      request.addEventListener('load', () => {
        if (request.status === 200) {
          resolve(request.response)
        } else {
          reject('Failed to retrieve list of bookings')
        }
      });
      request.send();
    });
  })();
  try {
    return allBookings;
  } catch(errMsg) {
    console.log(errMsg);
    return null;
  }
};

async function getBookingsForDate(date) {
  let bookings = await (() => {
    return new Promise((resolve, reject) => {
      let request = new XMLHttpRequest();
      request.open('GET', `/api/bookings/${date}`);
      request.responseType = 'json';
      request.send();

      request.addEventListener('load', () => {
        if (request.status === 200) {
          resolve(request.response);
        } else {
          reject();
        }
      });
    });
  })();
  try {
    return bookings;
  } catch {
    alert('Failed to retrieve bookings for that date');
    return null;
  }
};


function cancelBooking(bookingId) {
  let request = new XMLHttpRequest();
  request.open('PUT', `/api/bookings/${bookingId}`);
  request.send();

  request.addEventListener('load', () => {
    if (request.status === 204) {
      alert('Booking has been canceled');
    } else {
      alert(request.response);
    }
  });
};

function cancelSchedule(scheduleId) {
  let request = new XMLHttpRequest();
  request.open('DELETE', `/api/schedules/${scheduleId}`);
  request.send();

  request.addEventListener('load', () => {
    if (request.status === 204) {
      alert('Schedule has been canceled');
    } else {
      alert(request.response);
    }
  });
};

function renderAllDates(bookings) {
  let bookingsList = document.querySelector('ul');
  bookings.forEach( date => {
    let itemDate = document.createElement('li');
    itemDate.id = date;
    itemDate.textContent = date;
    bookingsList.appendChild(itemDate);
  });
}

function renderBookingsDetail(parentDate, detailsArr) {
  let list = document.createElement('ul');
  detailsArr.forEach(appt => {
    let detail = appt.join(' | ');
    let item = document.createElement('li');
    item.textContent = detail;
    list.appendChild(item);
  });
  parentDate.appendChild(list);
};

document.addEventListener('DOMContentLoaded', async () => {
  let allBookings = await getAllBookings();
  renderAllDates(allBookings);

  let bookingsList = document.querySelector('ul');
  bookingsList.addEventListener('click', async event => {
    let bookingDate = event.target;
    let allDates = Array.from(bookingsList.children);

    if (allDates.includes(bookingDate)) {
      if (bookingDate.children.length === 0) {
        let allDateBookings = await getBookingsForDate(bookingDate.id);
        renderBookingsDetail(bookingDate, allDateBookings);
      } else {
        let existing = bookingDate.children[0];
        existing.remove();
      }
    }

  });

});
