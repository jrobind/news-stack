import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import iconCodes from '../utils/iconCodes';
import styles from '../styles/components/WeatherHeader.scss';

const WeatherHeader = ({ currentWeather, country, name, coord }) => (
    <div className={styles.container}>
        <div className={styles.placeInfo}>
            <h2>{name}, {country}</h2>
            <p>
                <Moment format='LL'>{currentWeather.dt_txt}</Moment>
            </p>
            <div className={styles.linkHome}>
                <Link to='/'>Back to Search</Link>
            </div>
        </div>

        <div className={styles.currently}>
            <h2>Current Weather</h2>
            <p>{currentWeather.weather[0].description}</p>
            <div className={styles.iconContainer}>
                <img src={require(`../images/weatherIcons/${iconCodes[currentWeather.weather[0].icon]}`)} />
            </div>
        </div>

        <div className={styles.currently}>
            <h2>Temperature</h2>
        </div>
    </div>
)


WeatherHeader.propTypes = {
    currentWeather: PropTypes.object.isRequired,
    country: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
}

export default WeatherHeader;