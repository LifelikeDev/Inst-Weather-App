const form = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const cardImage = document.querySelector('.time-img');
const weatherImage = document.querySelector('.weather-icon');
const forecast = new Forecast();

const updateInterface = (data) => {

    const cityDetails = data.cityDetails;
    const weatherDetails = data.weatherDetails;

    // destructured properties
// const { cityDetails, weatherDetails } = data ;

    details.innerHTML = `
        <h3>${cityDetails.EnglishName}</h3>
        <h2>${weatherDetails.WeatherText}</h2>
        <div class="details-sub">
            <span>${weatherDetails.Temperature.Metric.Value}</span>
            <span>&deg;C</span>
        </div>
    `;

    const weatherIcon = `imgs/icons/${weatherDetails.WeatherIcon}.svg`;
    weatherImage.setAttribute('src', weatherIcon);
    
    let timeSource = null;

    if (weatherDetails.IsDayTime === true) {
        timeSource = 'imgs/day.svg';
        // cardImage.setAttribute('src', `imgs/day.svg`);
    } else {
        timeSource = 'imgs/night.svg';
        // cardImage.setAttribute('src', `imgs/night.svg`);
    }
    cardImage.setAttribute('src', timeSource);

        // remove no display class if present
    if (card.classList.contains('no-display')) {
        card.classList.remove('no-display');
    }

};


// const updateCity = async (city) => {
//         // insert user input city into getCity function from forecast.js
//     const cityDetails = await getCity(city);

//         // insert cityDetails.key into getWeather function from forecast.js

//     const weatherDetails = await getWeather(cityDetails.Key);
//     // console.log(cityDetails, weatherDetails);

//         // return city details and weather details
//     return {
//         cityDetails: cityDetails,
//         weatherDetails: weatherDetails
//     };

//         // shorthand object notation
//     // return { cityDetails, weatherDetails };
// };


form.addEventListener('submit', e => {
    // prevent default action of submit when the enter key is pressed
    e.preventDefault();

    // get user input city details 
    const city = form.city.value.trim();
    // form.reset();

    // alert user if no input is recorded and delete previous weather information
    if (city === '' && card.classList.contains('no-display') === false) {
        alert('You did not enter any city. Please enter the name of a city');
        card.classList.add('no-display');
    }

    // input into function to update city
    forecast.updateCity(city)
        .then(data => updateInterface(data))
        .catch(error => console.log(error));

    // store user input value in local storage
    localStorage.setItem('city', city);

});

    // check for existing local storage of city and use it to make an API call if present
if(localStorage.getItem('city')) {

    forecast.updateCity(localStorage.getItem('city'))
        .then(data => updateInterface(data))
        .catch(error => console.log(error));
}