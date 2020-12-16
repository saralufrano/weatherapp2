let apiKey = "b44354c0e29f4b84640f0747a154bc34";
let city = "Seattle"
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;

axios.get(apiUrl).then(displayTempperature);

function formatDate(timestamp) {
    let date = new Date(timestamp);
    let hours = date.getHours();
        if (hours < 10) {
            hours = `0${hours}`;
        }
    let minutes = date.getMinutes();
         if (minutes < 10) {
            minutes = `0${minutes}`;
         }
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let day = days[date.getDay()];
    return `${day} ${hours}:${minutes}`;
}

function displayTempperature(response) {
    console.log(response.data);
    let temperatureElement = document.querySelector("#real-time-temp");
    let cityElement = document.querySelector("#city");
    let statusElement = document.querySelector("#weather-status");
    let humidityElement = document.querySelector("#humidity");
    let speedElement = document.querySelector("#wind-speed");
    let dateElement = document.querySelector("#date-time");
    let iconElement = document.querySelector("#icon");

    temperatureElement.innerHTML = Math.round(response.data.main.temp);
    cityElement.innerHTML = response.data.name;
    statusElement.innerHTML = response.data.weather[0].description;
    humidityElement.innerHTML = response.data.main.humidity;
    speedElement.innerHTML = Math.round(response.data.wind.speed);
    dateElement.innerHTML = formatDate(response.data.dt * 1000);
    iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
    iconElement.setAttribute("alt", response.data.weather[0].description);
}

