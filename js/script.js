const form = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');

const updateInterface = (data) => {

    const cityDetails = data.cityDetails;
    const weatherDetails = data.weatherDetails;

    details.innerHTML = `
        <h3>${cityDetails.EnglishName}</h3>
        <h2>${weatherDetails.WeatherText}</h2>
        <div class="details-sub">
            <span>${weatherDetails.Temperature.Metric.Value}</span>
            <span>&deg;C</span>
        </div>
    `;

        // remove no display class if present
    if (card.classList.contains('no-display')) {
        card.classList.remove('no-display');
    }

};


const updateCity = async (city) => {
        // insert user input city into getCity function from forecast.js
    const cityDetails = await getCity(city);
        // insert cityDetails.key into getWeather function from forecast.js
    const weatherDetails = await getWeather(cityDetails.Key);
    console.log(cityDetails, weatherDetails);
        // return city details and weather details
    return {
        cityDetails: cityDetails,
        weatherDetails: weatherDetails
    };

    
        // shorthand object notation
    // return { cityDetails, weatherDetails };
};


form.addEventListener('submit', e => {
    // prevent default action of submit when the enter key is pressed
    e.preventDefault();

    // get user input city details 
    const city = form.city.value.trim();
    // form.reset();
    // console.log(city);

    // input into function to update city
    updateCity(city)
        .then(data => updateInterface(data))
        .catch(error => console.log(error));

});