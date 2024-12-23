const clientId = '864432311004823583';
const clientSecret = 'ckU_4eItB0rdBUd30sOHOaxVGci_igW-';
const redirectUri = 'https://jaml2151.github.io/watersidecrp/intra/dashboard'; // Update with your GitHub Pages URL

function saveUserDataToLocalStorage(userData) {
    localStorage.setItem('discordUserData', JSON.stringify(userData));
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

                    // Start the session timeout countdown
                    startSessionTimeout();
                })
                .catch(error => console.error('Error fetching user data:', error));
        })
        .catch(error => console.error('Error exchanging code for token:', error));
}

// Function to save user data to localStorage
function saveUserDataToLocalStorage(userData) {
    localStorage.setItem('discordUserData', JSON.stringify(userData));
}

// Start the session timeout countdown
function startSessionTimeout() {
    let timeLeft = 1800; // 30 minutes countdown (30 minutes * 60 seconds)
    const countdown = setInterval(() => {
        if (timeLeft <= 0) {
            clearInterval(countdown);
            window.location.href = '../../intra';
        } else {
            console.log(`Session will expire in ${Math.floor(timeLeft / 60)} minutes and ${timeLeft % 60} seconds.`);
            timeLeft--;
        }
    }, 1000); // 1 second interval

    // Create a popup for extending session
    const createPopup = () => {
        const popup = document.createElement('div');
        popup.style.position = 'fixed';
        popup.style.top = '50%';
        popup.style.left = '50%';
        popup.style.transform = 'translate(-50%, -50%)';
        popup.style.backgroundColor = 'white';
        popup.style.padding = '20px';
        popup.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.5)';
        popup.style.zIndex = '1000';

        const message = document.createElement('p');
        message.textContent = 'Your session is about to expire. Do you want to extend your session?';
        popup.appendChild(message);

        const extendButton = document.createElement('button');
        extendButton.textContent = 'Extend Session';
        extendButton.onclick = () => {
            timeLeft = 1800; // Reset the countdown timer on user confirmation
            document.body.removeChild(popup);
        };
        popup.appendChild(extendButton);

        const logoutButton = document.createElement('button');
        logoutButton.textContent = 'Logout';
        logoutButton.onclick = () => {
            clearInterval(countdown);
            window.location.href = '../../intra';
        };
        popup.appendChild(logoutButton);

        document.body.appendChild(popup);
    };

    // Show the popup 1 minute before session expires
    const promptTimeout = setTimeout(() => {
        createPopup();
    }, 1740000); // 29 minutes (1740 seconds)

    // Ensure the prompt timeout does not interfere with the countdown
    countdown;
}