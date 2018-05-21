export default (search) => {
   return fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${search}&appid=63a86f0f410d1650aed27460d8b457a4`)
        .then((response) => response.json())
        .then((data) => data)
        .catch((error) => console.log(error));
}