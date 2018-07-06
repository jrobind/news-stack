import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import iconCodes from '../utils/iconCodes';
import Loading from '../components/Loading';
import styles from '../styles/components/Forecast.scss';

class Forecast extends Component {
    constructor(props) {
        super(props);
        this.state = {
            defaultForecast: null,
            updatedForecast: null,
        }
    }

    componentDidMount() {
        const { forecast } = this.props;
        // by default we render 3pm forecasts (excluding the current day's forecast)
        const defaultForecast = forecast.filter((day, i) => {
            return i && day.dt_txt.split(' ')[1] === '15:00:00';
        });

        this.setState(() => ({defaultForecast: [forecast[0]].concat(defaultForecast)}));

        console.log([forecast[0]].concat(defaultForecast))
    }

    render() {
        const { defaultForecast } = this.state;

        if (defaultForecast) {
            return (
                <div className={styles.container}>
                    {defaultForecast.map((day, i) => (
                        <div key={i} className={styles.forecastWrapper}>
                            <div className={styles.date}>
                                <div>
                                    <Moment format='dddd, Do'>{day.dt_txt}</Moment>
                                </div>
                            </div>

                            <div className={styles.iconContainer}>
                                <img src={require(`../images/weatherIcons/${iconCodes[day.weather[0].icon]}`)} />
                            </div>

                            <div className={styles.description}>{day.weather[0].description}</div>

                            <div className={styles.temperature}>
                                {Math.round(day.main.temp - 273.15)}
                                <span className={styles.symbol}>&#8451;</span>
                            </div>

                            <form className={styles.timeOfDay}>
                                <select>  
                                    <option selected="selected">Afternoon</option>
                                    <option>Morning</option>
                                    <option>Evening</option>
                                </select>
                            </form>
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