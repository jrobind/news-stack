import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import iconCodes from '../utils/iconCodes';
import ForecastSelect from './ForecastSelect';
import Loading from '../components/Loading';
import styles from '../styles/components/Forecast.scss';

class Forecast extends Component {
    constructor(props) {
        super(props);
        this.state = {
            defaultForecast: null,
        }

        this.updateForecast = this.updateForecast.bind(this);
    }

    componentDidMount() {
        const { forecast } = this.props;
        // by default we render 3pm forecasts (excluding the current day's forecast)
        const defaultForecast = forecast.filter((day, i) => {
            return i && day.dt_txt.split(' ')[1] === '15:00:00';
        });
        // if date of first forecast is the same as second then we do not prepend current forecast
        this.setState(() => ({defaultForecast: forecast[0].dt_txt ===  forecast[1].dt_txt ? defaultForecast : [forecast[0]].concat(defaultForecast)}));
    }

    updateForecast({ date, value }) {
        const { forecast } = this.props;
        const { defaultForecast } = this.state;
        let timeOfDay;

        switch(value) {
            case 'Morning':
                timeOfDay = '09:00:00';
                break;
            case 'Afternoon':
                timeOfDay = '15:00:00';
                break;
            case 'Evening':
                timeOfDay = '21:00:00';
                break;
        }

        const dateMatch = `${date.split(' ')[0]} ${timeOfDay}`;
        const newForecast = forecast.filter((day) => day.dt_txt === dateMatch);
        // replace old forecast with new one
        const i = defaultForecast.indexOf(defaultForecast.filter((day) => day.dt_txt === date)[0]);

        defaultForecast[i] = newForecast[0];
        this.setState(() => (defaultForecast));
    }

    render() {
        const { defaultForecast } = this.state;

        if (defaultForecast) {
            return (
                <div 
                    className={styles.container}
                    data-testid='container'   
                >
                    { defaultForecast.map((day, i) => (
                        <div 
                            key={i} 
                            className={styles.forecastWrapper}
                            data-testid='forecast-wrapper'
                            data={day.dt_txt}    
                        >
                            <div className={styles.date}>
                                <div>
                                    <Moment format='dddd, Do'>{day.dt_txt}</Moment>
                                </div>
                            </div>

                            <div className={styles.iconContainer}>
                                <img src={require(`../images/weatherIcons/${iconCodes[day.weather[0].icon]}`)} />
                            </div>

                            <div 
                                className={styles.description}
                                data-testid='description'
                            >
                                {day.weather[0].description}
                            </div>

                            <div 
                                className={styles.temperature}
                                data-testid='temperature'    
                            >
                                <span>{Math.round(day.main.temp - 273.15)}</span>
                                <span className={styles.symbol}>&#8451;</span>
                            </div>

                            {false ? 
                                <ForecastSelect updateForecast={this.updateForecast}/> 
                                : 
                                <span className={styles.currently}>Currently</span>}
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
    forecast: PropTypes.array.isRequired
}

export default Forecast;