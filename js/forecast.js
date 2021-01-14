    // expressing code in a class

class Forecast {

    constructor() {
        this.key = 'XE5ZN9oN8SWr5MHctHcIZIfmIs4NFG0u';
        this.cityURI = 'https://dataservice.accuweather.com/locations/v1/cities/search';
        this.weatherURI = 'https://dataservice.accuweather.com/currentconditions/v1/';
    }
    async updateCity(city) {
           // insert user input city into getCity function from forecast.js
        const cityDetails = await this.getCity(city);

            // insert cityDetails.key into getWeather function from forecast.js
        const weatherDetails = await this.getWeather(cityDetails.Key);

            // return city details and weather details
        return {
            cityDetails: cityDetails,
            weatherDetails: weatherDetails
        };
    }
    async getCity(city) {
        const query = `?apikey=${this.key}&q=${city}`;
        const response = await fetch(this.cityURI + query); 
        const data = await response.json();
    
        return data[0];
    }
    async getWeather(id) {
        const query = `${id}?apikey=${this.key}`;
        const response = await fetch(this.weatherURI + query);
        const data = await response.json();
    
        return data[0];
    }

}

    // no-class code

// const key = 'XE5ZN9oN8SWr5MHctHcIZIfmIs4NFG0u';

// // getting weather data
// const getWeather = async (id) => {

//     const base = 'http://dataservice.accuweather.com/currentconditions/v1/';
//     const query = `${id}?apikey=${key}`;

//     const response = await fetch(base + query);
//     const data = await response.json();

//     return data[0];
// };


// // getting city data
// const getCity = async (city) => {
//         // declaring values for city search
//     const base = 'http://dataservice.accuweather.com/locations/v1/cities/search';
//     const query = `?apikey=${key}&q=${city}`;
//         // fetch data for city search
//     const response = await fetch(base + query); 
//     const data = await response.json();

//     return data[0];

// }; 
