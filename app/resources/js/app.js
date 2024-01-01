import Calendar from 'js-year-calendar';
import './customLocale.js';
import 'bootstrap';
import axios from 'axios';

const months = [
    "january",
    "february",
    "march",
    "april",
    "may",
    "june",
    "july",
    "august",
    "september",
    "october",
    "november",
    "december",
];
const typeToLabel = {
    'webinar': 'Webinar',
    'meeting': "Meeting with an expert",
    'question-answer': 'Question-answer',
    'conference': 'Conference',
};
const calendar = new Calendar('#calendar', {
    displayHeader: false,
    numberMonthsDisplayed: 6,
    style: 'custom',
    language: 'custom',
    startDate: new Date(),
    clickDay: (e) => {
        const date = e.date.getFullYear() + '-' + (e.date.getMonth() + 1) + '-' + e.date.getDate();
        document.getElementById('dateModal').innerHTML = e.date.getDate() + '&nbsp;' + months[e.date.getMonth()] + '&nbsp;at';
        getEventsByDate(date);
    },
    customDataSourceRenderer: (el, date, events) => {
        let eventTypes = [];
        let div;
        events.forEach((event) => {
            if (eventTypes.indexOf(event.type) === -1) {
                eventTypes.push(event.type);
            }
        })
        if (eventTypes.length) {
            div = document.createElement('div');
            div.classList.add('events-wrapper');
            el.appendChild(div);
        }
        eventTypes.forEach((eventType) => {
            div = document.createElement('div');
            div.classList.add(eventType);
            el.firstElementChild.appendChild(div);
        })
    },
    renderEnd: (e) => {
        const div1 = document.createElement("div");
        div1.classList.add('div-right');
        const div2 = document.createElement("div");
        div2.classList.add('div-left');
        document.querySelector('[data-month-id="4"]').appendChild(div1);
        document.querySelector('[data-month-id="4"]').appendChild(div2);
    }
});

function getCalendarEvents(){
    axios.get('/api/v1/events').then((response) => {
        let dataSource = [];
        let el;
        for (let i = 0; i < response.data.length; i++) {
            el = response.data[i];
            el.endDate = new Date(el.endDate);
            el.startDate = new Date(el.startDate);
            dataSource.push(el);
        }
        calendar.setDataSource(dataSource);
    });
}

function handleSaveBtn() {
    const formData = new FormData(document.getElementById('modalForm'));
    const data = Object.fromEntries(formData.entries());
    const id = document.getElementById('id').value;
    axios.post('/api/v1/events' + (id ? '/' + id : ''), data).then((response) => {
        document.getElementById('hideModal').click();
        getEventsByDate(data.date);
        getCalendarEvents();
    }).catch((error) => {
        for (const [key, errors] of Object.entries(error.response.data.errors)) {
            document.querySelector('#errorFor-' + key).classList.remove('d-none');
            errors.forEach((error) => {
                document.querySelector('#errorFor-' + key).innerHTML = error;
            })
        }
    });
}


function handleDeleteBtn(){
    const id = document.getElementById('id').value;
    const date = document.getElementById('date').value;
    axios.delete('/api/v1/events/' + id).then((response) => {
        document.getElementById('hideModal').click();
        getEventsByDate(date);
        getCalendarEvents();
    });
}

addEventListener("DOMContentLoaded", (event) => {
    getCalendarEvents();
    const el = document.getElementById('time');
    let opt;
    let min;
    let hour;
    for (let i = 0; i < 24; i++) {
        for (let j = 0; j < 60; j++) {
            opt = document.createElement('option');
            if (i < 10) {
                hour = '0' + i.toString();
            } else {
                hour = i;
            }
            if (j < 10) {
                min = '0' + j.toString();
            } else {
                min = j;
            }
            opt.value = hour + ':' + min;
            opt.textContent = hour + ':' + min;
            el.appendChild(opt);
        }
    }
    document.getElementById('calendarPopupCloseBtn').addEventListener('click', () => {
        document.getElementById('calendarPopup').classList.add('d-none');
    })
    document.querySelectorAll('.calendar-filter span').forEach((el) => {
        el.addEventListener('click', (e) => {
            e.target.classList.toggle('active');
            const eventType = e.target.dataset.eventType;
            document.querySelectorAll('.events-wrapper .' + eventType).forEach((el) => {
                el.classList.toggle('d-none');
            });
        })
    })
    document.getElementById('saveBtn').addEventListener('click', handleSaveBtn);
    document.getElementById('addEventBtn').addEventListener('click', handleModalWindow);
    document.getElementById('deleteBtn').addEventListener('click', handleDeleteBtn);
});

function renderEvent(event) {
    const popupEventsEl = document.querySelector('#popupEvents');
    let html = '<div class="event-title">' + event.title +
        '<svg data-event-id="' + event.id + '" id="svgEdit' + event.id + '" width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg" data-bs-toggle="modal" data-bs-target="#eventModal">' +
        '<path data-event-id="' + event.id + '" fill-rule="evenodd" clip-rule="evenodd" d="M2.53999 19.0469C1.92999 19.0469 1.35999 18.8369 0.949987 18.4469C0.429987 17.9569 0.179987 17.2169 0.269986 16.4169L0.639987 13.1769C0.709987 12.5669 1.07999 11.7569 1.50999 11.3169L8.34205 4.08541C8.3534 4.07256 8.36519 4.06008 8.37741 4.04799L9.71999 2.62692C11.77 0.45692 13.91 0.39692 16.08 2.44692C18.25 4.49692 18.31 6.63692 16.26 8.80692L8.04999 17.4969C7.62999 17.9469 6.84999 18.3669 6.23999 18.4669L3.01999 19.0169C2.95895 19.0205 2.9005 19.0254 2.84324 19.0302C2.74099 19.0387 2.64254 19.0469 2.53999 19.0469ZM2.59999 12.3369L8.51838 6.0653C9.25799 8.03436 10.8657 9.55618 12.8709 10.1898L6.94999 16.4569C6.74999 16.6669 6.26999 16.9269 5.97999 16.9769L2.75999 17.5269C2.42999 17.5769 2.15999 17.5169 1.97999 17.3469C1.79999 17.1769 1.71999 16.9069 1.75999 16.5769L2.12999 13.3369C2.16999 13.0469 2.39999 12.5469 2.59999 12.3369ZM15.16 7.76692L14.055 8.93656C11.9019 8.57138 10.1855 6.93318 9.71286 4.79952L10.81 3.63692C11.49 2.91692 12.16 2.43692 12.93 2.43692C13.55 2.43692 14.24 2.75692 15.04 3.52692C16.85 5.22692 16.4 6.44692 15.16 7.76692Z" fill="#797979"/>' +
        '</svg>' +
        '</div>';
    html += '<div class="event-description">' + event.description + '</div>';
    html += '<div class="event-location">' + event.location + '</div>';
    html += '<div class="event-time ' + event.type + '">' + event.time + '<span>' + typeToLabel[event.type] + '</span></div>';
    popupEventsEl.insertAdjacentHTML('beforeend', html);
    document.getElementById("svgEdit" + event.id).addEventListener('click', handleModalWindow);
}

function handleModalWindow(e) {
    document.querySelectorAll('[id^=errorFor-]').forEach((el) => {
        el.classList.add('d-none');
    });
    if (e.target.dataset.eventId) {
        document.getElementById('eventModalLabel').innerHTML = 'Edit event';
        document.getElementById('deleteBtn').classList.remove('d-none');
        axios.get('/api/v1/events/' + e.target.dataset.eventId).then((response) => {
            let el;
            for (const [key, value] of Object.entries(response.data)) {
                el = document.getElementById(key);
                if (el) {
                    el.value = value;
                }
            }
        });
    } else {
        document.getElementById('deleteBtn').classList.add('d-none');
        document.getElementById('eventModalLabel').innerHTML = 'Add event';
        document.getElementById('deleteBtn').classList.add('d-none');
        document.getElementById('id').value = '';
        document.getElementById('title').value = '';
        document.getElementById('description').value = '';
        document.getElementById('location').value = '';
        document.getElementById('time').value = '00:00';
        document.getElementById('type').value = 'meet';
    }
}

function getEventsByDate(date){
    document.getElementById('popupEvents').innerHTML = '';
    axios.get('/api/v1/events', {
        params: {
            'date': date,
        }
    }).then((response) => {
        response.data.forEach((event) => {
            renderEvent(event);
        });
        document.getElementById('date').value =date;
        document.getElementById('calendarPopup').classList.remove('d-none');
    });
}
