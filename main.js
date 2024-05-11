const apiKey = "bd5e378503939ddaee76f12ad7a97608";
const apiURL =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const searchIcon = document.querySelector(".search-icon");

async function checkWeather(city) {
  const response = await fetch(apiURL + city + `&appid=${apiKey}`);

    if(response.status == 404) {
        document.querySelector(".error").style.display = 'block';
    } else {
        document.querySelector(".error").style.display = 'none';
    }

    var data = await response.json();

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + "km/h";

    if (data.weather[0].main == "Clouds") {
        weatherIcon.src = "./assets/img/clouds.png";
    } else if (data.weather[0].main == "Clear") {
        weatherIcon.src = "./assets/img/clear.png";
    } else if (data.weather[0].main == "Rain") {
        weatherIcon.src = "./assets/img/rain.png";
    } else if (data.weather[0].main == "Drizzle") {
        weatherIcon.src = "./assets/img/drizzle.png";
    } else if (data.weather[0].main == "Mist") {
        weatherIcon.src = "./assets/img/mist.png";
    }
}

searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value);
});

// Execute a function when the user presses a key on the keyboard
searchBox.addEventListener("keypress", function(event) {
  // If the user presses the "Enter" key on the keyboard
  if (event.key === "Enter") {
    // Cancel the default action, if needed
    event.preventDefault();
    // Trigger the button element with a click
    searchBtn.click();
  }
});