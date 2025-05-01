document.addEventListener('DOMContentLoaded', function() {
    const apiKey = '27db28df2a9a3983c0d2faaf527c21fe';
    const searchBar = document.getElementById('search-bar');
    const searchBtn = document.getElementById('search-btn');
    const locationElement = document.getElementById('location');
    const temperatureElement = document.getElementById('temperature');
    const conditionsElement = document.getElementById('conditions');
    const forecastContainer = document.getElementById('forecast-container');

    if (searchBtn) {
        searchBtn.addEventListener('click', getWeather);
    } else {
        console.error('Search button element not found');
    }

    function getWeather() {
        const location = searchBar.value;
        const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;
        const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${apiKey}&units=metric`;

        // Fetch current weather
        fetch(weatherUrl)
            .then(response => response.json())
            .then(data => {
                const temperature = data.main.temp;
                const conditions = data.weather[0].description;
                const locationName = data.name;

                locationElement.textContent = locationName;
                temperatureElement.textContent = `Temperature: ${temperature}°C`;
                conditionsElement.textContent = `Conditions: ${conditions}`;
            })
            .catch(error => console.error('Error fetching current weather:', error));

        // Fetch 5-day forecast
        fetch(forecastUrl)
            .then(response => response.json())
            .then(data => {
                // Clear previous forecast
                forecastContainer.innerHTML = '';

                // Loop through the forecast data
                data.list.forEach(item => {
                    const date = new Date(item.dt * 1000); // Convert timestamp to date
                    const temperature = item.main.temp;
                    const conditions = item.weather[0].description;

                    // Create a forecast element
                    const forecastElement = document.createElement('div');
                    forecastElement.classList.add('forecast-item');
                    forecastElement.innerHTML = `
                        <h3>${date.toLocaleDateString()}</h3>
                        <p>Temperature: ${temperature}°C</p>
                        <p>Conditions: ${conditions}</p>
                    `;

                    // Append to the forecast container
                    forecastContainer.appendChild(forecastElement);
                });
            })
            .catch(error => console.error('Error fetching forecast:', error));
    }
});