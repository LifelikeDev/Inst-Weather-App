
const key = 'XcEWC75KS12lrzlcYstsYGcv6JQHEgJz';

// getting weather data
const getWeather = async (id) => {

    const base = 'http://dataservice.accuweather.com/currentconditions/v1/';
    const query = `${id}?apikey=${key}`;

    const response = await fetch(base + query);
    const data = await response.json();

    return data[0];
};


// getting city data
const getCity = async (city) => {
        // declaring values for city search
    const base = 'http://dataservice.accuweather.com/locations/v1/cities/search';
    const query = `?apikey=${key}&q=${city}`;
        // fetch data for city search
    const response = await fetch(base + query); 
    const data = await response.json();

    return data[0];

}; 
