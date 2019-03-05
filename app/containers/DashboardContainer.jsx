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
            lat: null,
            lon: null,
            country: '',
            name: ''
        }

        this.formatForecastData = this.formatForecastData.bind(this);
    }

    componentDidMount() {
        this.formatForecastData();
        const { location: { name, country, lat, lon }, forecast } = storage.getStorage('weather');
        const weather = storage.getStorage('weather');
        const placeName = storage.getStorage('placeName');

        console.log(weather);

        this.setState(() => ({
            currentWeather: weather.current,
            forecast,
            lat, 
            lon,
            country,
            name: placeName === name ? name : placeName // check whether placename returned from api matches placename search
        }));
    }

    formatForecastData() {
        const weather = storage.getStorage('weather');
        // remove current day from forecast array
        weather.forecast.forecastday = weather.forecast.forecastday.slice(1);

        storage.setStorage(weather, 'weather');
    }

    render() {
        const { currentWeather, country, name, forecast, lat, lon } = this.state;
        const coord = {lat, lon};

        if (currentWeather) {
            return (
                <div 
                    className={styles.dashContainer}
                    data-testid = 'dashboard-container'
                >
                    <WeatherHeader 
                        currentWeather={currentWeather}
                        country={country}
                        coord={coord}
                        name={name}
                    /> 
                    <div className={styles.forecastDataWrapper}>
                        <div className={styles.uvPolContainer}>
                            <UVandPollution title='UV' />
                            <UVandPollution title='Pollution' />
                        </div>
                        <Forecast
                            forecast={forecast.forecastday}
                            coord={coord}
                        />
                    </div>
                </div>
            )
        } else {
            return <Loading />;
        }
    }
}

export default DashboardContainer;