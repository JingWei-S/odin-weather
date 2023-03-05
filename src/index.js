console.log("test");
// weather icon

const ICONS = {
  "clear sky": "./images/01d.png",
  clouds: "./images/02d.png",
  "few clouds": "./images/03d.png",
  "scattered clouds": "./images/03d.png",
  "broken clouds": "./images/04d.png",
  "shower rain": "./images/09d.png",
  rain: "./images/10d.png",
  thunderstorm: "./images/11d.png",
  snow: "./images/13d.png",
  mist: "./images/01d.png",
};

const UNITS = {
  metric: "°C",
  imperial: "°F",
};

const content = document.querySelector(".content");
const main_content = document.querySelector(".main-content");

const city = document.createElement("div");
main_content.appendChild(city);

const date_content = document.createElement("div");
main_content.appendChild(date_content);

const main_temp = document.createElement("div");
main_temp.classList.add("main-temp");
main_content.appendChild(main_temp);

const weather_desc = document.createElement("div");
weather_desc.classList.add("description");
const icon_img = document.createElement("img");
main_content.appendChild(weather_desc);

const feel_temp = document.createElement("div");
main_content.appendChild(feel_temp);

const bi_temp = document.createElement("div");
bi_temp.classList.add("bi-temp");
const lo_temp = document.createElement("div");
const hi_temp = document.createElement("div");
bi_temp.appendChild(lo_temp);
bi_temp.appendChild(hi_temp);
main_content.appendChild(bi_temp);

// set up the search bar
const search_div = document.querySelector(".search");
const search_input = document.createElement("input");
search_input.classList.add("search_input");
search_input.setAttribute("placeholder", "Melbourne");
search_input.setAttribute("type", "text");
search_div.appendChild(search_input);
// add an error message display
const error_msg = document.createElement("span");
error_msg.classList.add("error-message");
search_div.appendChild(error_msg);

// set up the event listener for search input
search_input.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    if (search_input.value === "") {
      error_msg.textContent = "Enter a city that is cool 🙂";
    } else {
      const curMetric =
        changeMetrics.textContent.substr(-2) === "°C" ? "imperial" : "metric";
      getWeather(search_input.value, curMetric);
      search_input.value = "";
      error_msg.textContent = "";
    }
  }
});

async function getWeather(c, metric) {
  try {
    console.log(metric);
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${c}&appid=7af91279945244b1cdc0b4f0fe9999aa&units=${metric}`,
      { mode: "cors" }
    );
    const weather_content = await response.json();
    // console.log(weather_content);
    city.textContent =
      weather_content.name + ", " + weather_content.sys.country;
    const date = new Date(Date.now() + weather_content.timezone * 1000);
    // console.log(date);
    const options = {
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
      hourCycle: "h12",
      separator: ":",
    };
    date_content.textContent = date.toUTCString().slice(0, -7);
    main_temp.textContent = `${convertStringToRoundedInteger(
      weather_content.main.temp
    )}${UNITS[metric]}`;
    weather_desc.textContent = `${weather_content.weather[0].main} `;
    if (ICONS[weather_content.weather[0].description]) {
      icon_img.src = ICONS[weather_content.weather[0].description];
    } else {
      icon_img.src = ICONS["clouds"];
    }
    console.log(weather_content.weather[0].description);
    weather_desc.appendChild(icon_img);
    feel_temp.textContent = `Feels like ${convertStringToRoundedInteger(
      weather_content.main.feels_like
    )}${UNITS[metric]}`;
    lo_temp.textContent = `L: ${convertStringToRoundedInteger(
      weather_content.main.temp_min
    )}${UNITS[metric]}`;
    hi_temp.textContent = `H: ${convertStringToRoundedInteger(
      weather_content.main.temp_max
    )}${UNITS[metric]}`;
  } catch (error) {
    console.log("wrong city");
    error_msg.textContent = "Enter a valid city 🙂";
  }
}

getWeather("Melbourne,au", "metric");
// new Date(obj.dt*1000+(obj.timezone*1000))

// helper function
const convertStringToRoundedInteger = (str) => {
  const floatNum = parseFloat(str);
  const integerNum = Math.round(floatNum);
  const integerStr = integerNum.toString();
  return integerStr;
};

// change metrics
const changeMetrics = document.querySelector(".change-metric");
changeMetrics.addEventListener("click", () => {
  // first get the city
  const curCity = city.textContent;
  // get current metric
  const curMetric =
    changeMetrics.textContent.substr(-2) === "°C" ? "imperial" : "metric";

  if (curMetric === "metric") {
    getWeather(curCity, "imperial");
    changeMetrics.textContent = `Change to ${UNITS["metric"]}`;
  } else {
    getWeather(curCity, "metric");
    changeMetrics.textContent = `Change to ${UNITS["imperial"]}`;
  }

  //   console.log(changeMetrics.textContent);
});
