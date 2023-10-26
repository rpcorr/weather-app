let weather = {
  apiKey: 'f1531ba5fe0b2f22181cd69d12f04f04',
  fetchWeather: function () {
    fetch(
      'https://api.openweathermap.org/data/2.5/weather?q=toronto&units=metric&appid=a13ac26a83707dbc0a1f0a4bccf011f3'
    )
      .then((response) => response.json())
      .then((data) => console.log(data));
  },
};
