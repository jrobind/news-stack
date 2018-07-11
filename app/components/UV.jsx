import React, { Component } from 'react';
import { fetchUVIndex } from '../utils/api';
import storage from '../utils/storage';
import styles from '../styles/components/UV.scss'; 

class UV extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true
        }
    }

    componentDidMount() {
        const { city: { coord } } = storage.getStorage('weather');
        console.log(coord);
    }

    render() {
        return (
            <div className={styles.container}>
                <h3>UV index</h3>
            </div>
        )
    }
}

export default UV;