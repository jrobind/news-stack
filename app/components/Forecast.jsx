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

        this.state = { forecast: this.props.forecast };

        this.updateForecast = this.updateForecast.bind(this);
    }

    updateForecast(type, id) {
        const idNum = Number(id);
        const weather = storage.getStorage('weather');

        switch(type) {
            case 'avg-temp':
                // update localstorage data
                weather.forecast.forecastday[idNum].tempState = 'avgtemp_c';
                weather.forecast.forecastday[idNum].tempStateVal = weather.forecast.forecastday[idNum].day.avgtemp_c;

                storage.setStorage(weather, 'weather');
                this.setState(() => this.state);
                break;
            case 'min-temp':
                weather.forecast.forecastday[idNum].tempState = 'mintemp_c';
                weather.forecast.forecastday[idNum].tempStateVal = weather.forecast.forecastday[idNum].day.mintemp_c;

                storage.setStorage(weather, 'weather');
                this.setState(() => this.state);
                break;
            case 'max-temp':
                weather.forecast.forecastday[idNum].tempState = 'maxtemp_c';
                weather.forecast.forecastday[idNum].tempStateVal = weather.forecast.forecastday[idNum].day.maxtemp_c;

                storage.setStorage(weather, 'weather');
                this.setState(() => this.state);
                break;
        }
    }

    render() {
        const { coord } = this.props;
        const { forecast } = this.state;
        const { forecast: { forecastday } } = storage.getStorage('weather');

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
                                <span>{Math.round(forecastday[i].tempStateVal)}</span>
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