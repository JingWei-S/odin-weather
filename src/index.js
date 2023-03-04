console.log('test');

const content = document.querySelector('.content');
const main_content = document.querySelector('.main-content');


const city = document.createElement('div');
city.textContent = 'Melbourne';
main_content.appendChild(city);

const date_content = document.createElement('div');
const date = new Date();
const options = { month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
const formattedDate = date.toLocaleString('en-US', options);
date_content.textContent = formattedDate;
main_content.appendChild(date_content);

const main_temp = document.createElement('div');
main_temp.textContent = '31';
main_temp.classList.add('main-temp');
main_content.appendChild(main_temp);

const weather_desc = document.createElement('div');
weather_desc.textContent = 'Cloudy';
const icon_span = document.createElement('span');
icon_span.textContent = '☁️';
weather_desc.appendChild(icon_span);
main_content.appendChild(weather_desc);

const feel_temp = document.createElement('div');
feel_temp.textContent = '35';
main_content.appendChild(feel_temp);

const bi_temp = document.createElement('div');
bi_temp.classList.add('bi-temp');
const lo_temp = document.createElement('div');
const hi_temp = document.createElement('div');
bi_temp.appendChild(lo_temp);
bi_temp.appendChild(hi_temp);
lo_temp.textContent = 'L: 12';
hi_temp.textContent = 'H: 33';
main_content.appendChild(bi_temp);


// async function getWeather() {
//     const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=Melbourne,au&appid=7af91279945244b1cdc0b4f0fe9999aa&units=metric`, {mode: 'cors'});
//     const weather_content = await response.json();
//     console.log(weather_content);
//     const weather_details = `The current temperature is ${weather_content.main.temp}`;
//     display.textContent = weather_details;
// }

// getWeather();