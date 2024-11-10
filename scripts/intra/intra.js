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
                    // Check if the user exists in the local user database
                    fetch('../api/user.json')
                        .then(response => response.json())
                        .then(localData => {
                            const userExists = localData.users.some(user => user.discord === userData.username);
                            if (userExists) {
                                const username = document.querySelector('.username');
                                const avatar = document.querySelector('.avatar');

                                // Display username and avatar
                                username.textContent = userData.username;
                                avatar.src = `https://cdn.discordapp.com/avatars/${userData.id}/${userData.avatar}.png`;

                                // Save user data to localStorage
                                saveUserDataToLocalStorage(userData);

                                // Start the session timeout countdown
                                startSessionTimeout();
                            } else {
                                alert('Access Denied: You do not have an account.');
                            }
                        })
                        .catch(error => console.error('Error fetching local user data:', error));
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
            window.location.href = 'https://discord.com/oauth2/authorize?client_id=YOUR_CLIENT_ID&redirect_uri=YOUR_REDIRECT_URI&response_type=code&scope=identify';
        } else {
            console.log(`Session will expire in ${Math.floor(timeLeft / 60)} minutes and ${timeLeft % 60} seconds. Click OK to extend your session.`);
            timeLeft--;
        }
    }, 1000); // 1 second interval

    // Prompt user to extend session
    setTimeout(() => {
        if (confirm('Your session is about to expire. Click OK to extend your session.')) {
            timeLeft = 1800; // Reset the countdown timer on user confirmation
        } else {
            clearInterval(countdown);
            window.location.href = 'https://discord.com/oauth2/authorize?client_id=YOUR_CLIENT_ID&redirect_uri=YOUR_REDIRECT_URI&response_type=code&scope=identify';
        }
    }, 1740000); // 29 minutes (1740 seconds)
}