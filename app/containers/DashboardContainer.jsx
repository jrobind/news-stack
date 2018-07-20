import React, { Component } from 'react';
import storage from '../utils/storage';
import Loading from '../components/Loading';
import WeatherHeader from '../components/WeatherHeader';
import Forecast from '../components/Forecast';
import UVandPollution from '../components/UVandPollution';
import styles from '../styles/components/DashboardContainer.scss';

class DashboardContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentWeather: null,
            forecast: null,
            coord: null,
            country: '',
            name: ''
        }
    }

    componentDidMount() {
        const { city: { name, country, coord }, list } = storage.getStorage('weather');
        const weather = storage.getStorage('weather');
        const  placeName = storage.getStorage('placeName');
        const times = ['09:00:00', '15:00:00', '21:00:00'];

        // format forecast data for Forecast component i.e. weather data for 9am, 3pm and 9pm
        const formattedForecast = weather.list.filter((day) => {
            const dateToday = new Date();
            const dateToCheck = new Date(day.dt_txt);

            return dateToday.getDate() !== dateToCheck.getDate();

        }).filter((day) => times.includes(day.dt_txt.split(' ')[1]));

        this.setState(() => ({
            currentWeather: list[0],
            forecast: formattedForecast.slice(0, formattedForecast.length -1),
            coord,
            country,
            name: placeName === name ? name : placeName
        }));
    }

    render() {
        const { currentWeather, country, name, forecast, coord } = this.state;
        
        if (currentWeather) {
            return (
                <div className={styles.dashContainer}>
                    <WeatherHeader 
                        currentWeather={currentWeather}
                        country={country}
                        coord={coord}
                        name={name}
                    /> 
                    <Forecast
                        forecast={[currentWeather].concat(forecast)}
                    />
                    <UVandPollution 
                        title='UV'
                        info='The UV index identifies the strength of the ultraviolet radiation from the sun. Large amounts of UV exposure at a high index can lead to serious health issues. Take necessary precautions to ensure you stay safe in the sun.'
                    />
                    <UVandPollution 
                        title='Pollution'
                        info='The Air Pollution index indicates the levels of pollition in the surrounding air. Air with high levels of pollutants - such as in large, built up, heavily industrialised cities - can have severe adverse health effects.'
                    />
                </div>
            )
        } else {
            return <Loading />;
        }
    }
}

export default DashboardContainer;