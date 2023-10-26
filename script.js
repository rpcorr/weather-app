let weather = {
  apiKey: 'a13ac26a83707dbc0a1f0a4bccf011f3',
  fetchWeather: function (city) {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${this.apiKey}`
    )
      .then((response) => response.json())
      .then((data) => this.displayWeather(data));
  },
  displayWeather: function (data) {
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;
    document.querySelector('.city').innerText = `Weather in ${name}`;
    document.querySelector(
      '.icon'
    ).src = `https://openweathermap.org/img/wn/${icon}.png`;
    document.querySelector('.description').innerText = description;
    document.querySelector('.temp').innerText = `${Math.trunc(temp)} °C`;
    document.querySelector('.humidity').innerText = `Humidity: ${humidity}%`;
    document.querySelector('.wind').innerText = `Wind speed: ${speed} km/h`;
    document.querySelector('.weather').classList.remove('loading');
    document.body.style.backgroundImage = `url("https://source.unsplash.com/1600x900/?${name}")`;
  },
  search: function () {
    this.fetchWeather(document.querySelector('.search-bar').value);
  },
};

document.querySelector('.search button').addEventListener('click', function () {
  weather.search();
});

document.querySelector('.search-bar').addEventListener('keyup', function (e) {
  if (e.key == 'Enter') weather.search();
});

// Get city base on Geolocation
const getPosition = function () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

const whereAmI = async function () {
  try {
    // Geolocation
    const pos = await getPosition();
    const { latitude: lat, longitude: lng } = pos.coords;

    // Reverse Geolocation
    const resGeo = await fetch(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`
    );
    const dataGeo = await resGeo.json();

    if (!resGeo.ok) throw new Error('Problem getting location data');

    return dataGeo.city;
  } catch (err) {
    renderError(`💥 ${err.message}`);

    // Reject promise returned fron async function
    throw err;
  }
};

(async function () {
  try {
    const city = await whereAmI();
    weather.fetchWeather(city);
  } catch (err) {
    console.error(`${err.message} 💥`);
  }
})();

const windowSize = () => {
  if (window.innerWidth < 400) {
    document.querySelector('.search-bar').placeholder = 'Search city';
  } else {
    document.querySelector('.search-bar').placeholder = 'Search for a city';
  }
};

window.addEventListener('load', windowSize);
window.addEventListener('resize', windowSize);
