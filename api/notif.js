const Webhook = "https://discord.com/api/webhooks/1194668220272091326/I9LlnnZnS8O4X0coHOY3JnXP3xr3T7EKA5o3Oj4WF-T5sPFQHn2AL7OPaN60KM_0GvWI"; // Replace this with your actual Discord webhook URL

const jsonData = {
    "warning": "https://data.weather.gov.hk/weatherAPI/opendata/weather.php?dataType=warnsum&lang=en",
    "holiday": "https://www.1823.gov.hk/common/ical/en.json",
};

const orgIcons = {
    "hko": "https://www.hko.gov.hk/cwsrc/src/res/hk-warning/HKOLogo-color-symbol.png",
    "gov": "https://upload.wikimedia.org/wikipedia/commons/9/90/Regional_Emblem_of_Hong_Kong.svg",
};

const orgName = {
    "hko": "Hong Kong Obervatory",
    "gov": "Government of the Hong Kong Special Administrative Region",
}

const orgURL = {
    "hko": "https://www.hko.gov.hk/en/index.html",
    "gov": "https://www.gov.hk/en/residents/",
}

let latestWarningData = {};

function checkForWarningUpdates() {
    fetch(jsonData.warning)
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
    const currentTime = new Date().toLocaleString(); // Get the current time in a readable format

    const data = {
        content: "",
        tts: false,
        embeds: [
            {
                id: 10674342,
                title: "Adverse Weather Notification",
                color: 2326507,
                fields: [
                    {
                        id: 608893643,
                        name: "Warning #1",
                        value: `**${warning.name}** - ${warning.type} was issued at ${warning.issueTime}`
                    }
                ],
                author: {
                    name: "Hong Kong Observatory",
                    icon_url: orgIcons.hko,
                    url: "https://www.hko.gov.hk/en/index.html"
                },
                thumbnail: {
                    url: orgIcons.hko
                },
                footer: {
                    text: `Adverse weather notification issued from the Hong Kong Observatory • Last Update at ${currentTime}`
                },
            }
        ],
        components: [],
        actions: {}
    };

    fetch(Webhook, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: window.JSON.stringify(data)
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
    fetch(jsonData.warning)
        .then(response => response.json())
        .then(data => {
            const currentWarning = Object.values(data)[0]; // Get the first warning signal for testing
            sendWarningNotification(currentWarning);
        })
        .catch(error => console.error('Error fetching current warning data:', error));
}

// Test sending a message
sendTestMessage();

// Check for warning updates every 1 hour (you can adjust the interval as needed)
setInterval(checkForWarningUpdates, 3600000); // 1 hour in milliseconds