let now = new Date();
let currentTime = document.querySelector("h2");

let hour = now.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];

currentTime.innerHTML = `${day}, ${hour}:${minutes}`;

function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let weatherToday = document.querySelector("h3");
  weatherToday.innerHTML = `${temperature}℃`;
  place.innerHTML = response.data.name;
  let temperatureComment = document.querySelector("#temp-comment");
  if (temperature <= 5) {
    temperatureComment.innerHTML = "⛄️Make sure you wrap up warm!⛄️";
  }
}

function weatherLocation(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input");
  place.innerHTML = `${city.value}`;
  let units = "metric";
  let apiKey = "2236c7e355f68293390c37c68fbd7525";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
}

function currentLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let location = position.coords.name;
  place.innerHTML = `${location}`;
  let apiKey = "2236c7e355f68293390c37c68fbd7525";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}
let myLocationData = () => {
  navigator.geolocation.getCurrentPosition(currentLocation);
};
let locationButton = document.querySelector("#current-location");
locationButton.addEventListener("click", myLocationData);

let form = document.querySelector("#city-search");
form.addEventListener("submit", weatherLocation);
let place = document.querySelector("h1");
