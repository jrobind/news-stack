export const geocodeByAddressData = [{
    address_components: [{
        short_name: 'London'
    }]
}];

export const getLatLngData = {
    lat: 51.7355868,
    lng: -0.12775829999998223
};

export const apiFakeData = {
    city: { 
        name:'London',
        country: 'GB',
        coord: {lat: 51.5752, lon: 0.1858}
    },
    list: [{
        weather: [{
            description: 'clear sky',
            icon: '01d',
            id: 800,
            main: 'Clear'
        }],
        wind: {speed: 1.72},
        dt_txt: "2018-06-28 15:00:00",
        main: {
           temp: 300,
           humidity: 49
        }
    },
    {
        weather: [{
            description: 'scattered clouds',
            icon: '01d',
            id: 800,
            main: 'Clouds'
        }],
        wind: {speed: 1.82},
        dt_txt: "2018-06-29 15:00:00",
        main: {
           temp: 310,
           humidity: 59
        }
    }]
}