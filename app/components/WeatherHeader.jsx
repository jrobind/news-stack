import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/components/WeatherHeader.scss';
import Moment from 'react-moment';

const WeatherHeader = ({ currentWeather, country, name, coord }) => (
    <div className={styles.container}>
        <div className={styles.placeInfo}>
            <p>{name}, {country}</p>
            <p>
                <Moment format='LL'>{currentWeather.dt_txt}</Moment>
            </p>
        </div>
    </div>
)


WeatherHeader.propTypes = {
    currentWeather: PropTypes.object.isRequired,
    country: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
}

export default WeatherHeader;