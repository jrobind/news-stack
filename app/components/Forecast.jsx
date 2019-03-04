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
            tempToChange: null
         };

        this.updateForecast = this.updateForecast.bind(this);
    }

    updateForecast(type, id) {
        const weather = storage.getStorage('weather');
        console.log(weather.current.default, id)
        // current case
        if (!Number(id)) {
            if (weather.current.default) {
                // switch to 'feels like' temp
                weather.current.default = false;
                storage.setStorage(weather, 'weather');
                this.setState(() => ({tempToChange: weather.current.feelslike_c}));
            } else {
                // switch back to default
                console.log('reach')
                weather.current.default = true;
                storage.setStorage(weather, 'weather');
                this.setState(() => ({tempToChange: weather.current.temp_c}));
            }
        }

        // update tempChange status
        this.setState((prevState) => ({tempChange: !prevState.tempChange}));
    }

    render() {
        const { coord } = this.props;
        const { forecast, tempToChange } = this.state;

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
                                <span>{tempToChange ? Math.round(tempToChange) : Math.round(currentDay.day.maxtemp_c)}</span>
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