export const geocodeByAddressData = [{
    address_components: [{
        short_name: 'London'
    }]
}];

export const getLatLngData = {
    lat: 51.7355868,
    lng: -0.12775829999998223
};

export const apiMockUVData = {
    value: 6
}

export const apiMockPollutionData = {
    data: {
        current: {
            pollution: {
                aqius: 111
            }
        }
    }
}

export const apiMockData = {
    current: { 
        condition: { text: 'Sunny', icon: "//cdn.apixu.com/weather/64x64/day/113.png" },
        humidity: 50,
        wind_mph: 3.8,
        temp_c: 10,
        last_updated: "2019-04-04 20:30"
    },
    location: {
        country: 'Poland',
        name: 'Lodz',
        lat: 51.76,
        lon: 19.46
    },
    forecast: {
        forecastday: [{
            date: '2019-02-24',
            day: {
                condition: { text: "Partly cloudy", icon: "//cdn.apixu.com/weather/64x64/day/116.png" },
                humidity: 40,
                wind_mph: 4,
                maxtemp_c: 8,
                mintemp_c: 2,
                avgtemp_c: 5
            },
            tempState: "avgtemp_c",
            tempStateVal: 5
        }, 
        {
            date: '2019-02-25',
            day: {
                condition: { text: "Moderate rain at times", icon: "//cdn.apixu.com/weather/64x64/day/299.png" },
                humidity: 48,
                wind_mph: 4.5,
                maxtemp_c: 10,
                mintemp_c: 3,
                avgtemp_c: 6
            },
            tempState: "avgtemp_c",
            tempStateVal: 6
        }, 
        {
            date: '2019-02-26',
            day: {
                condition: { text: "Partly cloudy", icon: "//cdn.apixu.com/weather/64x64/day/116.png" },
                humidity: 45,
                wind_mph: 9.4,
                maxtemp_c: 13,
                mintemp_c: 9,
                avgtemp_c: 11
            },
            tempState: "avgtemp_c",
            tempStateVal: 11
        }]
    }
}