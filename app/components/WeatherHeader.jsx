import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/components/WeatherHeader.scss';

const WeatherHeader = ({ currentWeather, country, name, coord }) => (
    <div className={styles.container}>
        <p>{country}</p>
    </div>
)


WeatherHeader.propTypes = {
    currentWeather: PropTypes.object.isRequired,
    country: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
}

export default WeatherHeader;