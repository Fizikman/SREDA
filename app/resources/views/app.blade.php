<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Sreda</title>

        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Lexend:wght@200;300;400;600&display=swap" rel="stylesheet">
        @vite(['resources/scss/app.scss', 'resources/js/app.js'])
    </head>
    <body>
        <header>
            <div class="logo">LOGO</div>
            <nav>
                <ul>
                    <li><a href="#">Main</a></li>
                    <li><a href="#">Events</a></li>
                    <li><a class="active" href="#">Calendar</a></li>
                    <li><a href="#">FAQ</a></li>
                </ul>
            </nav>
        </header>
        <section>
            <div class="calendar-title">
                Calendar
            </div>
            <div class="calendar-filter">
                <span class="label meet active" data-event-type="meet">Meeting with an expert</span>
                <span class="label question-answer active" data-event-type="question-answer">Question-answer</span>
                <span class="label conference active" data-event-type="conference">Conference</span>
                <span class="label webinar active" data-event-type="webinar">Webinar</span>
            </div>
            <div id="calendar">

            </div>
            <div class="d-none" id="calendarPopup">
                <div class="popup-title">
                    Events
                    <button type="button" class="btn-close" id="calendarPopupCloseBtn"></button>
                </div>
                <div id="popupEvents">

                </div>
                <button data-bs-toggle="modal" data-bs-target="#eventModal" id="addEventBtn">Add event</button>
            </div>
        </section>
        <footer>
            <div class="logo">LOGO</div>
            <nav>
                <ul>
                    <li><a href="#">Main</a></li>
                    <li><a href="#">Events</a></li>
                    <li><a href="#">Calendar</a></li>
                    <li><a href="#">FAQ</a></li>
                </ul>
            </nav>
            <div class="copyrights">
                © {{ date("Y") }} All rights reserved
            </div>
        </footer>
        <div class="modal fade" id="eventModal" tabindex="-1" aria-labelledby="eventModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="eventModalLabel">Modal title</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" id="hideModal"></button>
                    </div>
                    <div class="modal-body">
                        <form id="modalForm">
                            <input type="hidden" name="date" id="date">
                            <input type="hidden" name="id" id="id">
                            <div id="errorFor-title" class="d-none error-text"></div>
                            <input class="modal-input" placeholder="Event name..." name="title" id="title">
                            <div id="errorFor-description" class="d-none error-text"></div>
                            <textarea class="modal-input" placeholder="Event description..." name="description" id="description"></textarea>
                            <div id="errorFor-location" class="d-none error-text"></div>
                            <input class="modal-input" placeholder="Location..." name="location" id="location">
                            <div class="time-wrapper">
                                <span id="dateModal"></span>
                                <select class="modal-select" id="time" name="time">
                                </select>
                            </div>
                            <select class="modal-select" name="type" id="type">
                                <option value="meet">Meeting with an expert</option>
                                <option value="question-answer">Question-answer</option>
                                <option value="conference">Conference</option>
                                <option value="webinar">Webinar</option>
                            </select>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn-modal btn-modal-secondary" data-bs-dismiss="modal">Cancel</button>
                        <button type="button" class="btn-modal btn-modal-secondary" id="deleteBtn">Delete</button>
                        <button type="button" class="btn-modal btn-save" id="saveBtn">Save</button>
                    </div>
                </div>
            </div>
    </div>
    </body>
</html>
