import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import ForecastSelect from './ForecastSelect';
import storage from '../utils/storage';
import Loading from './Loading';
import styles from '../styles/components/Forecast.scss';

class Forecast extends Component {
    constructor(props) {
        super(props);

        this.state = { 
            forecast: this.props.forecast,
            tempChange: false, // false is the default temp state for each individual forecast
            id: null // id of forecast to change
         };

        this.updateForecast = this.updateForecast.bind(this);
    }

    updateForecast(type, id) {
        const { forecast } = this.state;
        const { current } = storage.getStorage('weather');

        console.log(current);

        // update tempChange status
        this.setState(() => ({tempChange: true, id}));
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
                            data-id={i}
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
                                <span>{Math.round(currentDay.day.maxtemp_c)}</span>
                                <span className={styles.symbol}>&#8451;</span>
                            </div>

                            <ForecastSelect 
                                updateForecast={this.updateForecast}
                                coord={coord}
                                id={i}
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