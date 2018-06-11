import React, { Component } from 'react';
import WeatherHeader from '../components/WeatherHeader';

class DashboardContainer extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <WeatherHeader />
        )
    }
}

export default DashboardContainer;