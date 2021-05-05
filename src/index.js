let now = new Date();

let h3 = document.querySelector("h3");

let date = now.getDate();
let hours = now.getHours();
if (hours < 10) {
    hours = `0${hours}`;
}
let month = now.getMonth();
let minutes = now.getMinutes();
if (minutes < 10) {
    minutes = `0${minutes}`;
}
let year = now.getFullYear();

let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
let day = days[now.getDay()];

let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
let monthy = months[now.getMonth()];


h3.innerHTML = `Current Weather for ${day}, ${monthy} ${date} at ${hours}:${minutes}`;

let form = document.querySelector("#city-input");
let submitButton = document.querySelector(".btn");
form.addEventListener("submit", citySearch);
submitButton.addEventListener("click", citySearch);

function citySearch(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#city-search").value;
  findCity(searchInput);
  let mainCity = document.querySelector("#city-search");
  mainCity.innerHTML = `${searchInput.value}`;
  }

function showWeather(response) {
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${response.data.name}`;
  let currentTemp = document.querySelector("#current-temp");
  currentTemp.innerHTML = Math.round(response.data.main.temp);
  let conditions = document.querySelector("#currently-in");
  conditions.innerHTML = `${response.data.weather[0].description}`
  let highTemp = document.querySelector("#todaysHigh");
  highTemp.innerHTML = Math.round(response.data.main.temp_max);
  let lowTemp = document.querySelector("#todaysLow");
  lowTemp.innerHTML = Math.round(response.data.main.temp_min);
  let humid = document.querySelector("#todaysHumidity");
  humid.innerHTML = Math.round(response.data.main.humidity);
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute("fas",`http://openweathermap.org/img/wn/10d@2x.png`);
  }

function findCity(city) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(showWeather);
  }

function retrievePosition(position) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let units = "imperial";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${apiKey}`;
  axios.get(apiUrl).then(showWeather);
  }

  navigator.geolocation.getCurrentPosition(retrievePosition);