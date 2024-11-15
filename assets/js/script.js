let icon = document.getElementById('icon');
let btnEle = document.getElementById('btn');
let weatherDescEle = document.getElementById('weather-desc');
let locEle = document.getElementById('location');
let tempEle = document.getElementById('temp-value');
let inputEle = document.getElementById('location-input');

const apiKey = 'beb0b19afb95c7c29f3a66e9e62e70af';

btnEle.onclick = function () {
    if (inputEle.value == "") {
        alert('Please enter a location');
    } else {
        let loc = inputEle.value;
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${loc}&appid=${apiKey}`;
        
        fetch(url)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                const { name } = data;
                const { feels_like } = data.main;
                const { description, icon: iconCode } = data.weather[0];

                // Set weather information
                tempEle.innerText = `${Math.floor(feels_like - 273.15)}`; // Convert from Kelvin to Celsius
                locEle.innerText = `Location: ${name}`;
                weatherDescEle.innerText = `Description: ${description}`;

                // Set icon using OpenWeather API icon code
                icon.src = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;
            })
            .catch(() => {
                alert('Unable to find location');
            });
        
        inputEle.value = '';
    }
};
