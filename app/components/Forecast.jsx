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

        const { forecast } = storage.getStorage('weather');

        // state wether history will always be the source of truth for original avgtemp data
        this.state = { 
            forecast: this.props.forecast,
            tempToChange: 'avgtemp_c',
            id: null,
            weatherHistory: [
                {temp: +forecast.forecastday[0].day['avgtemp_c']},
                {temp: +forecast.forecastday[1].day['avgtemp_c']},
                {temp: +forecast.forecastday[2].day['avgtemp_c']},
                {temp: +forecast.forecastday[3].day['avgtemp_c']},
                {temp: +forecast.forecastday[4].day['avgtemp_c']}
            ]
         };

        this.renderTemp = this.renderTemp.bind(this);
        this.updateForecast = this.updateForecast.bind(this);
    }

    renderTemp(i) {
        const { day } = storage.getStorage('weather').forecast.forecastday[i];
        const { tempToChange } = this.state;

        return +day[tempToChange];
    }

    updateForecast(type, id) {
        const idNum = Number(id);

        switch(type) {
            case 'avg-temp':
                this.setState(() => ({
                    tempToChange: 'avgtemp_c',
                     id: idNum,
                     weatherHistory: weatherHistory.push({id: idNum, temp: this.renderTemp(idNum)})
                }));
                break;
            case 'min-temp':
                this.setState(() => ({
                    tempToChange: 'mintemp_c',
                    id: idNum,
                    weatherHistory: weatherHistory.push({id: idNum, temp: this.renderTemp(idNum)})
                }));
                break;
            case 'max-temp':
                this.setState(() => ({
                    tempToChange: 'maxtemp_c',
                     id: idNum,
                     weatherHistory: weatherHistory.push({id: idNum, temp: this.renderTemp(idNum)})
                }));
                break;
        }
    }

    render() {
        const { coord } = this.props;
        const { forecast, id, weatherHistory } = this.state;
        console.log(weatherHistory)

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
                                <span>{Math.round(currentDay.day.avgtemp_c)}</span>
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