let weather = {
  apiKey: 'a13ac26a83707dbc0a1f0a4bccf011f3',
  fetchWeather: function () {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${this.apiKey}`
    )
      .then((response) => response.json())
      .then((data) => console.log(data));
  },
};
