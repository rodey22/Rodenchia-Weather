function updateWeather(response) {
  let temperature = document.querySelector("#current-temperature");
  let condition = document.querySelector("#condition");
  let humidity = document.querySelector("#humidity");
  let windSpeed = document.querySelector("#wind");
  let city = document.querySelector("#city");
  let time = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);
  let icon = document.querySelector("#icon");

  icon.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-app-icon"/>`;

  temperature.innerHTML = Math.round(response.data.temperature.current);
  condition.innerHTML = response.data.condition.description;
  humidity.innerHTML = `${response.data.temperature.humidity}%`;
  windSpeed.innerHTML = `${response.data.wind.speed}km/h`;
  time.innerHTML = formatDate(date);
  city.innerHTML = response.data.city;

  getForecast(response.data.city);
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[date.getDay()];
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${day} ${date.getHours()}:${date.getMinutes()}`;
}

function searchCity(city) {
  let apiKey = "139b40ot4a6f049b43d36c5c3b5ea2ff";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(updateWeather);
}

function searchCityFunction(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");
  let city = document.querySelector("#city");
  city.innerHTML = searchInput.value;
  searchCity(searchInput.value);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", searchCityFunction);

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[date.getDay()];
}
 
function getForecast(city) {
  let apiKey = "139b40ot4a6f049b43d36c5c3b5ea2ff";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  console.log(response.data);
  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml =
        forecastHtml +
        `
        <div class="weather-forecast-day">
      <div class="weather-forecast-date">${formatDay(day.time)}</div>
      <div>
      <img src="${day.condition.icon_url}"  class="weather-forecast-icon"/>
      </div>
      <div class="weather-forecast-temperatures">
   <div class="weather-forecast-temperature"><strong class="strong">${Math.round(
     day.temperature.maximum
   )}°C </strong> </div>
   <div class="weather-forecast-temperature">${Math.round(
     day.temperature.minimum
   )}°C</div>
    </div>
    </div>
    `;
    }
  });

  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}