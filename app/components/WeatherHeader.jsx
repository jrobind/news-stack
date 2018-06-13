import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/components/WeatherHeader.scss';
import Moment from 'react-moment';
import iconCodes from '../utils/iconCodes';

const WeatherHeader = ({ currentWeather, country, name, coord }) => (
    <div className={styles.container}>
        <div className={styles.placeInfo}>
            <p>{name}, {country}</p>
            <p>
                <Moment format='LL'>{currentWeather.dt_txt}</Moment>
            </p>
        </div>

        <div className={styles.currently}>
            <h2>Current Weather</h2>
            <p>{currentWeather.weather[0].description}</p>
            <div className={styles.iconContainer}>
                <img src={require(`../images/weatherIcons/${iconCodes[currentWeather.weather[0].icon]}`)} />
            </div>
        </div>
    </div>
)


WeatherHeader.propTypes = {
    currentWeather: PropTypes.object.isRequired,
    country: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
}

export default WeatherHeader;