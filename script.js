const apikey = '3265874a2c77ae4a04bb96236a642d2f';
// https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}
// <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" /> ${temp}Â°C <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" />
const form = document.getElementById('form');
const loader = document.getElementById('loader');

loader.style.display = 'none';
const formSubmit = (e) => {
	loader.style.display = 'inline-block';
	e.preventDefault();
	const input = document.getElementById('inputSearch');
	let inputValue = input.value;
	if (inputValue) {
		getWeatherData(inputValue);
	}
};
async function getWeatherData(locationName) {
	const response = await fetch(
		`https://api.weatherapi.com/v1/current.json?key=61f576cfbcfc42d99a7111115202411&q=${locationName}&aqi=yes&units=metric`,
		{
			origin: 'cors',
		}
	);
	const weatherData = await response.json();
	renderWeatherData(weatherData);
	loader.style.display = 'none';
}

const renderWeatherData = (data) => {
	let weatherDataContainer = document.getElementById('weatherDataContainer');
	weatherDataContainer.innerHTML = `
		<div class="location-data"><a href="http://maps.google.co.uk/maps?q=${data.location.lat},${data.location.lon}" target="_blank">lat: <span id="lat">${data.location.lat}</span> lon: <span id="lon">${data.location.lon}</span></a></div>
		<div class="weather-data">
			<div class="weather-temp"><span class="temp">${data.current.temp_c}</span>°C</div>
			<span id="weatherText" class="weather-name">${data.current.condition.text}</span>
			<img src="${data.current.condition.icon}" alt="${data.current.condition.text}"/>
		</div>
	`;
};
form.addEventListener('submit', formSubmit);
