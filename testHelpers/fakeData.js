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
        main: {
           temp: 300 
        }
    }]
}