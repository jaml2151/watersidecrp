//      - API Name: Hong Kong Weather Forecast                                                          //
//      - Author: Hong Kong Observatory (HKO)                                                           //
//      - Usage: Get Hong Kong's weather                                                                //
//      - User Manual (All Languages)                                                                   //
//        > EN: https://data.weather.gov.hk/weatherAPI/doc/HKO_Open_Data_API_Documentation.pdf          //
//        > TC: https://data.weather.gov.hk/weatherAPI/doc/HKO_Open_Data_API_Documentation_tc.pdf       //
//        > SC: https://data.weather.gov.hk/weatherAPI/doc/HKO_Open_Data_API_Documentation_sc.pdf       //

var defaultTitle = document.querySelector("#news-header");
var pinnedMessage = [
    `Welcome to Waterside Cafe Official Website.`,
    `Please make sure to follow our Social Media.`,
    `The website is still under development. We will be working on expanding the features of this website soon.`,
];
var messsages = "";

function updateMessage() {
    for (var h = 0; h <= pinnedMessage.length - 1; h++) {
        defaultTitle.innerHTML = "NEWS";
    
        var active = "";
    
        if (h == 0) {
            active = "active";
        }
    
        messsages += `<div class="latest_news notification ${active}">
        <div class="message_content">${pinnedMessage[h]}</div>
        </div>`;
    }
    ticking();
}


// HKO - Warning API
fetch('https://data.weather.gov.hk/weatherAPI/opendata/weather.php?dataType=rhrread')
    .then(res => {
        return res.json();
    })
    .then(fore => {
        const details = fore;
        const dist = fore.temperature.data[0];
        const dist_name = dist.place;
        const temp = dist.value;
        const unit = dist.unit;
        const alert = fore.specialWxTips;
        const icon = fore.icon[0];
        const img = `https://www.hko.gov.hk/images/HKOWxIconOutline/pic${icon}.png`;
        const deg = `${temp}°${unit}`;

        // Add dist_name to the pinnedMessage array
        pinnedMessage.push(`Apologies for the inconvenience. We're currently providing weather information only for ${dist_name}, Hong Kong.
        <br>
        We are working on expanding our coverage to include your location soon.`);
        updateMessage();

        messsages += `
            <div class="latest_news weather_forecast">
                <div class="message_content">
                    <img class="signal_image" src="${img}">
                    <span class="degree">${deg}</span>
                </div>
            </div>`;
        document.querySelector("#news").innerHTML = messsages;
        ticking();
    })
    .catch(error => console.log(error));

fetch('https://data.weather.gov.hk/weatherAPI/opendata/weather.php?dataType=warningInfo')
    .then(res => {
        return res.json();
    })
    .then(data => {
        const details = data.details;

        fetch('https://data.weather.gov.hk/weatherAPI/opendata/weather.php?dataType=warnsum')
            .then(res => {
                return res.json();
            })
            .then(warn => {
                if (details) {
                    for (var i = 0; i <= details.length - 1; i++) {
                        const stype = data.details[i].warningStatementCode;
                        const sname = warn[stype].type;
                        const signal = warn[stype].code;
                        const img = `../media/warn/${stype}/${signal}.png`;
                        const warnStatus = `${warn[stype].actionCode}`;
                        const statusMessage = "";

                        if (!sname) {
                            const fname = warn[stype].name;

                            // if (warnStatus == "ISSUE") {
                            //     statusMessage = "is now in force";
                            // }
                            // else if (warnStatus == "CANCEL") {
                            //     statusMessage = "has been cancelled";
                            // }

                            messsages += `
                            <div class="latest_news issue_warning">
                                <a href="https://www.hko.gov.hk/en/detail.htm" style="color: #FFF">    
                                    <div class="message_content">
                                        <img src="${img}" height="50" alt="${fname}" title="${fname}">
                                        <span class="signal name">${fname} ${statusMessage}</span>
                                    </div>
                                </a>
                            </div>
                            `;
                        }
                        else {

                            // if (warnStatus.toString == "ISSUE") {
                            //     statusMessage = "is now in force";
                            //     console.log("tes");
                            // }
                            // else if (warnStatus == "CANCEL") {
                            //     statusMessage = "has been cancelled";
                            // }

                            messsages += `
                            <div class="latest_news issue_warning">
                                <div class="message_content">
                                    <img src="${img}" height="50" alt="${sname} ${warn[stype].name}" title="${sname} ${warn[stype].name}">
                                    <span class="signal name">${sname}<br>${warn[stype].name} ${statusMessage}</span>
                                </div>
                            </div>
                            `;
                        }
                        document.querySelector("#news").innerHTML = messsages;
                        ticking();
                    }
                }
                else {
                    ticking();
                }
            })
            .catch(error => {
                console.log(error);
            });
    })
    .catch(error => console.log(error));
// END-HKO - Warning API

function ticking() {
    var newsSingleAll = document.querySelectorAll(".latest_news");

    var currentActive = 0;
    var totalNews = newsSingleAll.length;
    var duration = 10000;

    const removeAllActive = () => {
        newsSingleAll.forEach((n) => {
            n.classList.remove("active");
        });
    };

    const changeNews = () => {
        if (currentActive >= totalNews - 1) {
            currentActive = 0;
        } else {
            currentActive += 1;
        }

        removeAllActive();

        const cActive = newsSingleAll[currentActive];

        if (cActive) {
            cActive.classList.add("active");

            if (cActive.classList.contains("notification")) {
                defaultTitle.innerHTML = "NEWS";
            } else if (cActive.classList.contains("issue_warning")) {
                defaultTitle.innerHTML = "WEATHER<br>WARNING";
            } else if (cActive.classList.contains("weather_forecast")) {
                defaultTitle.innerHTML = "CURRENT<br>WEATHER";
            } else if (cActive.classList.contains("breaking")) {
                defaultTitle.innerHTML = "BREAKING NEWS";
            }
        }
    };

    setInterval(changeNews, duration);
}