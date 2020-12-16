let apiKey = "b44354c0e29f4b84640f0747a154bc34";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=New York&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(displayTempperature);

function displayTempperature(response) {
    console.log(response.data);
    let temperatureElement = document.querySelector("#real-time-temp");
    let cityElement = document.querySelector("#city");
    let statusElement = document.querySelector("#weather-status");
    let humidityElement = document.querySelector("#humidity");
    let speedElement = document.querySelector("#wind-speed");
    temperatureElement.innerHTML = Math.round(response.data.main.temp);
    cityElement.innerHTML = response.data.name;
    statusElement.innerHTML = response.data.weather[0].description;
    humidityElement.innerHTML = response.data.main.humidity;
    speedElement.innerHTML = Math.round(response.data.wind.speed);
}