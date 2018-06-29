import React, { Component } from 'react';
import storage from '../utils/storage';
import WeatherHeader from '../components/WeatherHeader';
import styles from '../styles/components/DashboardContainer.scss';

class DashboardContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            weather: null,
            currentWeather: null,
            coord: null,
            country: '',
            name: ''
        }
    }

    componentDidMount() {
       const { city: { name, country, coord }, list } = storage.getStorage('weather');
       const  placeName = storage.getStorage('placeName');
       
        this.setState(() => ({
            currentWeather: list[0],
            weather: storage.getStorage('weather'),
            coord,
            country,
            name: placeName === name ? name : placeName
        }));
    }

    render() {
        const { currentWeather, country, name, weather, coord } = this.state;
        
        return (
            <div className={styles.dashContainer}>
                {currentWeather ? 
                    <WeatherHeader 
                        currentWeather={currentWeather}
                        country={country}
                        coord={coord}
                        name={name}
                    /> : 
                null}
            </div>
        )
    }
}

export default DashboardContainer;