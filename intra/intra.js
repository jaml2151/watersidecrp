const clientId = '864432311004823583';
const clientSecret = 'ckU_4eItB0rdBUd30sOHOaxVGci_igW-';
const redirectUri = 'https://jaml2151.github.io/watersidecrp/intra/dashboard/home.html'; // Update with your GitHub Pages URL

function saveUserDataToLocalStorage(userData) {
    localStorage.setItem('discordUserData', JSON.stringify(userData));
}

function signInWithDiscord() {
    window.location = `https://discord.com/oauth2/authorize?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}&scope=identify+guilds.join`;
}

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

                    // Display username and avatar
                    username.textContent = userData.username;
                    avatar.src = `https://cdn.discordapp.com/avatars/${userData.id}/${userData.avatar}.png`;

                    // Save user data to localStorage
                    saveUserDataToLocalStorage(userData);
                })
                .catch(error => console.error('Error fetching user data:', error));
        })
        .catch(error => console.error('Error exchanging code for token:', error));
}

// Function to save user data to localStorage
function saveUserDataToLocalStorage(userData) {
    localStorage.setItem('discordUserData', JSON.stringify(userData));
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