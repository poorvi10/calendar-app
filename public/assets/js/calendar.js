// Client ID and API key from the Developer Console
var CLIENT_ID = '1078031504858-hkj464s7kmq3kbku9bn1pjcteehatkui.apps.googleusercontent.com';
var API_KEY = 'AIzaSyCqPwCVt-_Y5BuQsEf9Zst5ZlpDO7wXNSY';

// Array of API discovery doc URLs for APIs used by the quickstart
var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
var SCOPES = "https://www.googleapis.com/auth/calendar.readonly";

var authorizeButton = document.getElementById('authorize-button');
var signoutButton = document.getElementById('signout-button');
var signinButton = document.getElementById('googlebutton');
var fullcalendar = document.getElementById('calendar');
var eventsArray = document.getElementById('eventsArray');
authorizeButton.style.display = 'none';

/**
 *  On load, called to load the auth2 library and API client library.
 */
function handleClientLoad() {
    gapi.load('client:auth2', initClient);
}

/**
 *  Initializes the API client library and sets up sign-in state
 *  listeners.
 */
function initClient() {
    gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES
    }).then(function () {
        // Listen for sign-in state changes.
        gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

        // Handle the initial sign-in state.
        updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
        authorizeButton.onclick = handleAuthClick;
        signoutButton.onclick = handleSignoutClick;
    });
}

/**
 *  Called when the signed in status changes, to update the UI
 *  appropriately. After a sign-in, the API is called.
 */
function updateSigninStatus(isSignedIn) {
    if (isSignedIn) {
        authorizeButton.style.display = 'none';
        signoutButton.style.display = 'block';
        signinButton.style.display = 'none';
        fullcalendar.style.display = 'block';
        document.getElementById('greeting').style.display = 'block';        
        
        listUpcomingEvents();
    } else {
        signoutButton.style.display = 'none';
        signinButton.style.display = 'block';
    }
}

/**
 *  Sign in the user upon button click.
 */
function handleAuthClick(event) {
    gapi.auth2.getAuthInstance().signIn();
}

/**
 *  Sign out the user upon button click.
 */
function handleSignoutClick(event) {
    gapi.auth2.getAuthInstance().signOut();
    authorizeButton.style.display = 'none';
    signoutButton.style.display = 'none';
    document.getElementById('greeting').style.display = 'none';
    fullcalendar.style.display = 'none';
    signinButton.style.display = 'block';
}

function listUpcomingEvents() {
    gapi.client.calendar.events.list({
        'calendarId': 'primary',
        'showDeleted': false,
        'singleEvents': true,
        'orderBy': 'startTime'
    }).then(function(response) {
        var events = response.result.items;
        var eventsArr = [];
        if (events.length > 0) {
            for (i = 0; i < events.length; i++) {
              var event = events[i];
              var when = event.start.dateTime;
              if (!when) {
                when = event.start.date;
              }
              var id = event.id;
              var message = event.summary;
              var eventObject = {
                  'id': id,
                  'title': message,
                  'start': when
                }
              eventsArr.push(eventObject);
            }
          }
        eventsArray.innerHTML = JSON.stringify(eventsArr);
    });
}