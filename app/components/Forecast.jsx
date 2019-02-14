import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import api, { fetchLastWeekForecast } from '../utils/api';
import ForecastSelect from './ForecastSelect';
import Loading from '../components/Loading';
import styles from '../styles/components/Forecast.scss';

class Forecast extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentDate: null,
        }

        this.updateForecast = this.updateForecast.bind(this);
    }

    componentDidMount() {
        const d = new Date();
        const month = d.getMonth() + 1; // months run 0-11 in JS, with 0 representing January
        const formattedDate = `${d.getFullYear()}-${month < 10 ? `0${month}`: month}-${d.getDate()}`;

        this.setState(() => ({currentDate: formattedDate}));
    }

    updateForecast(forecast) {
    }

    render() {
        const { forecast, coord } = this.props;
        const { currentDate } = this.state;

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

                            {currentDay.date !== currentDate ? 
                                <ForecastSelect 
                                    updateForecast={this.updateForecast}
                                    coord={coord}
                                /> 
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
    forecast: PropTypes.array.isRequired,
    coord: PropTypes.obj.isRequired
}

export default Forecast;