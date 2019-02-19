import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import ForecastSelect from './ForecastSelect';
import storage from '../utils/storage';
import Loading from '../components/Loading';
import styles from '../styles/components/Forecast.scss';

class Forecast extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentDate: null,
            forecast: this.props.forecast
        }

        this.updateForecast = this.updateForecast.bind(this);
    }

    componentDidMount() {
        const d = new Date();
        const month = d.getMonth() + 1; // months run 0-11 in JS, with 0 representing January
        const formattedDate = `${d.getFullYear()}-${month < 10 ? `0${month}`: month}-${d.getDate()}`;

        this.setState(() => ({currentDate: formattedDate}));
    }

    updateForecast(newForecast, date) {
        const { forecast } = this.state;
        const weather = storage.getStorage('weather');

        if (newForecast) {
            const forecastToUpdateWith = newForecast.forecast.forecastday[0];
            // update current forecast with historical forecast
            const updatedForecast = forecast.map(day => {
                if (day.date === date) {
                    return forecastToUpdateWith;
                }
                return day;
            });
    
            this.setState(() => ({forecast: updatedForecast}));
            // update local storage 
            weather.forecast = updatedForecast;
            storage.setStorage(weather, 'forecast-histoy-updated');

        } else {
            const { forecast } = storage.getStorage('forecast-histoy-updated');
            // replace old forecast with most recent forecast
            console.log(forecast);

            // this.setState(() => ({forecast: newForecast.forecastday}));
        }
    }

    render() {
        const { coord } = this.props;
        const { forecast } = this.state;

        if (forecast) {
            return (
                <div 
                    className={styles.container}
                    data-testid='container'   
                >
                    {forecast.map((currentDay, i) => (
                        <div 
                            key={i} 
                            className={styles.forecastWrapper}
                            data-testid='forecast-wrapper'
                            date={currentDay.date}    
                        >
                            <div className={styles.date}>
                                <div>
                                    <Moment format='dddd, Do'>{currentDay.date}</Moment>
                                </div>
                            </div>

                            <div className={styles.iconContainer}>
                                <img src={currentDay.day.condition.icon} />
                            </div>

                            <div 
                                className={styles.description}
                                data-testid='description'
                            >
                                {currentDay.day.condition.text}
                            </div>

                            <div 
                                className={styles.temperature}
                                data-testid='temperature'    
                            >
                                <span>{Math.round(currentDay.day.avgtemp_c)}</span>
                                <span className={styles.symbol}>&#8451;</span>
                            </div>

                            <ForecastSelect 
                                updateForecast={this.updateForecast}
                                coord={coord}
                            /> 
                        </div>
                    ))}
                </div>
            )
        } else {
            return <Loading />;
        }
    }
}

Forecast.propTypes = {
    forecast: PropTypes.array.isRequired,
    coord: PropTypes.object.isRequired
}

export default Forecast;