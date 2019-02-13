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
    }

    render() {
        const { forecast } = this.props;
        console.log(forecast)
        if (forecast) {
            return (
                <div 
                    className={styles.container}
                    data-testid='container'   
                >
                    {forecast.map((day, i) => (
                        <div 
                            key={i} 
                            className={styles.forecastWrapper}
                            data-testid='forecast-wrapper'
                            data={day.date}    
                        >
                            <div className={styles.date}>
                                <div>
                                    <Moment format='dddd, Do'>{day.date}</Moment>
                                </div>
                            </div>

                            <div className={styles.iconContainer}>
                                <img src={day.day.condition.icon} />
                            </div>

                            <div 
                                className={styles.description}
                                data-testid='description'
                            >
                                {day.day.condition.text}
                            </div>

                            <div 
                                className={styles.temperature}
                                data-testid='temperature'    
                            >
                                <span>{day.temp_c}</span>
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