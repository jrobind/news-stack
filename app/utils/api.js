export default ({ lat, lng }) => {
   return fetch(`https://api.apixu.com/v1/forecast.json?key=945662b0093f46b9a3f212001191102&q=${lat}=${lng}&days=6`)
        .then((response) => response.json())
        .then((data) => data)
        .catch((error) => console.log(error));
}

export const fetchLastWeekForecast = ({ lat, lon, date }) => {
        return fetch(`https://api.apixu.com/v1/history.json?key=945662b0093f46b9a3f212001191102&q=${lat}=${lon}&dt=${date}`)
             .then((response) => response.json())
             .then((data) => data)
             .catch((error) => console.log(error));
     }

export const fetchUVIndex = ({ lat, lon }) => {
   return fetch(`https://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${lon}&appid=63a86f0f410d1650aed27460d8b457a4`)
        .then((response) => response.json())
        .then((data) => data)
        .catch((error) => console.log(error));
}

export const fetchPollutionIndex = ({ lat, lon }) => {
   return fetch(`https://api.airvisual.com/v2/nearest_city?lat=${lat}&lon=${lon}&key=NQWFi7DBJzeXq6m3t`)
        .then((response) => response.json())
        .then((data) => data)
        .catch((error) => console.log(error));
}