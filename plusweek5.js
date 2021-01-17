let now = new Date();

function formatDate() {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let currentFullYear = now.getFullYear();
  let currentDay = days[now.getDay()];
  let currentMonth = months[now.getMonth()];
  let currentDate = now.getDate();
  let currentHour = now.getHours();
  if (currentHour < 10) {
    currentHour = `0${currentHour}`;
  }
  let currentMinute = now.getMinutes();
  if (currentMinute < 10) {
    currentMinute = `0${currentMinute}`;
  }

  let todayDay = document.querySelector("#todayDay");
  todayDay.innerHTML = `${currentDay}, ${currentMonth} ${currentDate} ${currentFullYear}, ${currentHour}:${currentMinute}`;
}

formatDate();

function convertToFahrenheit(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#temp");
  tempElement.innerHTML = 66;
}

function convertToCelsius(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#temp");
  tempElement.innerHTML = 22;
}

let fahreneitlink = document.querySelector("#fahrenheit-link");
fahreneitlink.addEventListener("click", convertToFahrenheit);

let celsiuslink = document.querySelector("#celsius-link");
celsiuslink.addEventListener("click", convertToCelsius);

function searchLocation(position) {
  let apiKey = "f6b05703004145fac5fd3f7a96bd1a10";
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiUrl = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function showTemperature(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = Math.round(
    response.data.main.humidity
  );
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
}

function searchCity(city) {
  let apiKey = "f6b05703004145fac5fd3f7a96bd1a10";
  let units = "metric";
  let apiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
}

function handleSubmit(event) {
  //debugger;
  event.preventDefault();
  let city = document.querySelector("#cityInput").value;
  searchCity(city);
}

let formHeader = document.querySelector("#formHeader");
formHeader.addEventListener("submit", handleSubmit);

let currentLocationButton = document.querySelector("#btnCurrentlocation");
currentLocationButton.addEventListener("click", getCurrentLocation);

searchCity("New York");
