/** Calendar

var date = new Date(),
    currYear = date.getFullYear(),
    currMonth = date.getMonth(),
    lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate();

// storing full name of all months in array
const months = [
    "January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December"
];

// real-time clock

setInterval(() => {
    var currentTime = new Date();

    // getting new date, current year and month
    var date = new Date(),
        currYear = date.getFullYear(),
        currMonth = date.getMonth(),
        currDate = date.getDate();

    // time
    var cHrs = currentTime.getHours(),
        cMin = currentTime.getMinutes(),
        cSec = currentTime.getSeconds();

    var hrs = document.getElementById("hrs"),
        min = document.getElementById("min"),
        sec = document.getElementById("sec");

    var dd = document.getElementById("dd"),
        mm = document.getElementById("mm"),
        yyyy = document.getElementById("yyyy");

    if (cHrs < 10) {
        cHrs = "0" + cHrs;
    }

    if (cMin < 10) {
        cMin = "0" + cMin;
    }

    if (cSec < 10) {
        cSec = "0" + cSec;
    }

    hrs.innerHTML = cHrs;
    min.innerHTML = cMin;
    sec.innerHTML = cSec;

    dd.innerHTML = currDate;
    mm.innerHTML = months[currMonth];
    yyyy.innerHTML = currYear;

}, 1000)
**/


/** END real-time clock **/


/** Discord Login **/

const clientId = '864432311004823583';
const clientSecret = 'ckU_4eItB0rdBUd30sOHOaxVGci_igW-';
const redirectUri = 'https://jaml2151.github.io/watersidecrp/intra/dashboard/home.html'; // Update with your GitHub Pages URL

function signInWithDiscord() {

    window.location = `https://discord.com/oauth2/authorize?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}&scope=identify+guilds.join`;
}

// Add code to handle OAuth callback on the /callback route
// For demonstration purposes, you can handle the callback in a simple way using JavaScript

// Parse the authorization code from the query parameters
const urlParams = new URLSearchParams(window.location.search);
const code = urlParams.get('code');

if (code) {
    fetch('https://discord.com/api/oauth2/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `client_id=${clientId}&client_secret=${clientSecret}&grant_type=authorization_code&code=${code}&redirect_uri=${encodeURIComponent(redirectUri)}`
    })
    .then(response => response.json())
    .then(data => {
        const accessToken = data.access_token;

        fetch('https://discord.com/api/users/@me', {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        .then(response => response.json())
        .then(userData => {
            const username = document.querySelector('.username');
            const avatar = document.querySelector('.avatar');

            // Display username, avatar, and banner
            username.textContent = `${userData.username}`;
            avatar.src = `https://cdn.discordapp.com/avatars/${userData.id}/${userData.avatar}.png`;
        })
        .catch(error => console.error('Error fetching user data:', error));
    })
    .catch(error => console.error('Error exchanging code for token:', error));
}

/** Random Background Image */

var bg = document.querySelector("#blkPhoto");
var bgPath = "../media/image/background/";
var format = ".jpg";
var backgrounds = [
    `url('${bgPath}bg_main1${format}')`,
    `url('${bgPath}bg_main2${format}')`,
    `url('${bgPath}bg_main3${format}')`,
    `url('${bgPath}bg_main4${format}')`,
    `url('${bgPath}bg_main5${format}')`,
    `url('${bgPath}bg_main6${format}')`,
    `url('${bgPath}bg_main7${format}')`,
    `url('${bgPath}bg_main8${format}')`,
    `url('${bgPath}bg_main9${format}')`,
    `url('${bgPath}bg_main10${format}')`,
    `url('${bgPath}bg_main11${format}')`,
    `url('${bgPath}bg_main12${format}')`,
];
var randomNum = Math.floor(Math.random() * backgrounds.length);
console.log(`Selected Num: ${randomNum + 1}`);
console.log(`Selected BG: ${backgrounds[randomNum]}`);

bg.style.backgroundImage = backgrounds[randomNum];

// Get the current date and time in the user's local timezone
var now = new Date();

// Calculate the timezone offset in minutes
var timezoneOffset = now.getTimezoneOffset();

// Adjust the offset to be positive
timezoneOffset = -timezoneOffset;

// Create a hidden input field in the login form
var input = document.createElement("input");
input.type = "hidden";
input.name = "timezoneOffset";
input.value = timezoneOffset;
document.getElementById("loginForm").appendChild(input);