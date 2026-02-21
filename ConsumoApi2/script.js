const inputBox = document.querySelector('.search-bar input');
const searchBtn = document.querySelector('#search-button');
const wheatherIcon = document.querySelector('.icono-clima');
const clima = document.querySelector('.clima');
const errorMsg = document.querySelector('.error');

async function checkwheater(city) {

    try {
        const apiKey = `e224a666b3b3b1157f4256e0fe3c608d`;
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

        const response = await fetch(apiUrl);

        if(!response.ok){
            throw new Error('Ciudad no encontrada');
        }

        const data = await response.json();

        console.log(data);

        updateWeatherUI(data);
    } catch (error) {
        console.error(error.message);
        clima.style.display = 'none';
        errorMsg.style.display = 'block'
    }
    
}

function updateWeatherUI (data) {
    document.querySelector('.temp').innerHTML= `
        ${Math.round(data.main.temp)}&deg;C
    `;
    document.querySelector('.ciudad').innerHTML= data.name;
    document.querySelector('.humidity').innerHTML= `${data.main.humidity}%`;
    document.querySelector('.wind').innerHTML= `${data.wind.speed} km/h`;
    

    const weatherIcons = {
        Clear: 'images/images/clear.png',
        Snow: 'images/images/snow.png',
        Rain: 'images/images/rain.png',
        Clouds : 'images/images/clouds.png'
    }

    document.querySelector('.icono-clima').src = weatherIcons[data.weather[0].main] || 'images/images/rain.png';
    
    clima.style.display = 'block';
    errorMsg.style.display = 'none';
}

searchBtn.addEventListener('click', () => {
    checkwheater(inputBox.value);
});

window.onload = () => {
    checkwheater('Medellin');
}