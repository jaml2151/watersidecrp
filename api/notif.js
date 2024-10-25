const Webhook = "https://discord.com/api/webhooks/1299454788387471422/UKid-KF3evbGPHjTDdvXQdWwIlYt1eZKwg3UvcoWpjrlqyfYsjW7AazKt7UlOH86rEk4"; // Replace this with your actual Discord webhook URL

const JSON = {
    "warning": "https://data.weather.gov.hk/weatherAPI/opendata/weather.php?dataType=warnsum&lang=en",
    "holiday": "https://www.1823.gov.hk/common/ical/en.json",
};

const orgIcons = {
    "hko": "https://www.hko.gov.hk/cwsrc/src/res/hk-warning/HKOLogo-color-symbol.png",
    "gov": "https://upload.wikimedia.org/wikipedia/commons/9/90/Regional_Emblem_of_Hong_Kong.svg",
};

let latestWarningData = {};

function checkForWarningUpdates() {
    fetch(JSON.warning)
        .then(response => response.json())
        .then(data => {
            const warningSignals = Object.keys(data);
            warningSignals.forEach(signal => {
                if (!latestWarningData[signal] || data[signal].updateTime > latestWarningData[signal].updateTime) {
                    latestWarningData[signal] = data[signal];
                    sendWarningNotification(data[signal]);
                }
            });
        })
        .catch(error => console.error('Error fetching weather warning JSON:', error));
}

function sendWarningNotification(warning) {
    const data = {
        embeds: [
            {
                title: warning.name,
                description: `Type: ${warning.type}`,
                thumbnail: {
                    url: orgIcons.hko // Replace this with the URL of the organization's icon
                },
                color: 16711680 // Color for the embed (you can customize this)
            }
        ]
    };

    fetch(Webhook, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to send message');
        }
        console.log('Weather warning notification sent successfully');
    })
    .catch(error => {
        console.error('Error sending weather warning notification:', error);
    });
}

function sendTestMessage() {
    sendWarningNotification({
        name: "Test Warning",
        type: "Test Type"
    });
}

// Test sending a message
sendTestMessage();

// Check for warning updates every 1 hour (you can adjust the interval as needed)
setInterval(checkForWarningUpdates, 3600000); // 1 hour in milliseconds