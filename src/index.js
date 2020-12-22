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
    let temperatureElement = document.querySelector("#real-time-temp");
    let cityElement = document.querySelector("#city");
    let statusElement = document.querySelector("#weather-status");
    let humidityElement = document.querySelector("#humidity");
    let speedElement = document.querySelector("#wind-speed");
    let dateElement = document.querySelector("#date-time");
    let iconElement = document.querySelector("#icon");

    fahrenheitTempertature = response.data.main.temp;

    temperatureElement.innerHTML = Math.round(fahrenheitTempertature);
    cityElement.innerHTML = response.data.name;
    statusElement.innerHTML = response.data.weather[0].description;
    humidityElement.innerHTML = response.data.main.humidity;
    speedElement.innerHTML = Math.round(response.data.wind.speed);
    dateElement.innerHTML = formatDate(response.data.dt * 1000);
    iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
    iconElement.setAttribute("alt", response.data.weather[0].description);
}

function formatHours(timestamp) {
    let date = new Date(timestamp);
    let hours = date.getHours();
        if (hours < 10) {
            hours = `0${hours}`;
        }
    let minutes = date.getMinutes();
         if (minutes < 10) {
            minutes = `0${minutes}`;
         }
         
    return `${hours}:${minutes}`;
}

function displayHourlyTemperature(response) {
    let forecastElement = document.querySelector("#hourly-forecast");
    let forecast = response.data.list[0];
    forecastElement.innerHTML = `
            <div class="col-2">
                <ul>
                    <li>
                        ${formatHours(forecast.dt * 1000)}
                    </li>
                    <li>
                        <img src="http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png" />
                    </li>
                    <li class="hourly-temp">
                        ${Math.round(forecast.main.temp)}°F
                    </li>
                </ul>
            </div>
        `;

    forecast = response.data.list[1];
    forecastElement.innerHTML += `
            <div class="col-2">
                <ul>
                    <li>
                        ${formatHours(forecast.dt * 1000)}
                    </li>
                    <li>
                        <img src="http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png" />
                    </li>
                    <li class="hourly-temp">
                        ${Math.round(forecast.main.temp)}°F
                    </li>
                </ul>
            </div>
        `;
    forecast = response.data.list[2];
    forecastElement.innerHTML += `
            <div class="col-2">
                <ul>
                    <li>
                        ${formatHours(forecast.dt * 1000)}
                    </li>
                    <li>
                        <img src="http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png" />
                    </li>
                    <li class="hourly-temp">
                        ${Math.round(forecast.main.temp)}°F
                    </li>
                </ul>
            </div>
        `;
    forecast = response.data.list[3];
    forecastElement.innerHTML += `
            <div class="col-2">
                <ul>
                    <li>
                        ${formatHours(forecast.dt * 1000)}
                    </li>
                    <li>
                        <img src="http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png" />
                    </li>
                    <li class="hourly-temp">
                        ${Math.round(forecast.main.temp)}°F
                    </li>
                </ul>
            </div>
        `;
    forecast = response.data.list[4];
    forecastElement.innerHTML += `
            <div class="col-2">
                <ul>
                    <li>
                        ${formatHours(forecast.dt * 1000)}
                    </li>
                    <li>
                        <img src="http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png" />
                    </li>
                    <li class="hourly-temp">
                        ${Math.round(forecast.main.temp)}°F
                    </li>
                </ul>
            </div>
        `;
    forecast = response.data.list[5];
    forecastElement.innerHTML += `
            <div class="col-2">
                <ul>
                    <li>
                        ${formatHours(forecast.dt * 1000)}
                    </li>
                    <li>
                        <img src="http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png" />
                    </li>
                    <li class="hourly-temp">
                        ${Math.round(forecast.main.temp)}°F
                    </li>
                </ul>
            </div>
        `;
}

function search(city) {
    let apiKey = "b44354c0e29f4b84640f0747a154bc34";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
    axios.get(apiUrl).then(displayTempperature);

    apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=imperial`;
    axios.get(apiUrl).then(displayHourlyTemperature);
}

function handleSubmit(event) {
    event.preventDefault();
    let cityInputElement = document.querySelector("#city-input");
    search(cityInputElement.value);
}

function showCelciusTemp(event){
    event.preventDefault();
    let celciusTemperConvertion = (fahrenheitTempertature - 32) * 5 / 9;
    let temperatureElement = document.querySelector("#real-time-temp");
    temperatureElement.innerHTML = Math.round(celciusTemperConvertion);
}

function showFahrenheitTemp(event){
    event.preventDefault();
    let temperatureElement = document.querySelector("#real-time-temp");
    temperatureElement.innerHTML = Math.round(fahrenheitTempertature);
}

let fahrenheitTempertature = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let celciusLink = document.querySelector("#celcius-link");
celciusLink.addEventListener("click", showCelciusTemp);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheitTemp);

search("Seattle");