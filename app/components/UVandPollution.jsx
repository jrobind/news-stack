import React, { Component } from 'react';
import { fetchUVIndex, fetchPollutionIndex } from '../utils/api';
import storage from '../utils/storage';
import PropTypes from 'prop-types';
import Loading from './Loading';
import Tooltip from './Tooltip';
import { Line } from 'rc-progress';
import classification from '../utils/UVPollutionClassification';
import styles from '../styles/components/UVandPollution.scss'; 

class UVandPollution extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0,
            index: null,
            clicked: false,
            loading: false,
            max: null,
            showIndex: false
        }

        this.handleClick = this.handleClick.bind(this);
        this.addValue = this.addValue.bind(this);
        this.changeValue = this.changeValue.bind(this);
    }

    addValue() {
        const self = this;

        this.setState(() => ({value: this.state.value + 1}));
        setTimeout(() => { self.changeValue() }, 20);
    }

    changeValue() {
        const { value, max } = this.state;

        value < max ? this.addValue() : this.setState(() => ({showIndex: true}));
    }

    async handleClick() {
        const { title } = this.props;
        const { location: { lat, lon } } = storage.getStorage('weather');
        const coord = {lat, lon};
        
        // set loading state to true while retrieving uv/pollution api data
        this.setState(() => ({clicked: true, loading: true}));

        if (title === 'Pollution') {
            try {
                const { data } = await fetchPollutionIndex(coord);
                const { current: { pollution }} = data;

                let aqius = Math.floor(pollution.aqius);

                this.setState({ max: Math.round(aqius / 3), index: aqius, loading: false },() => this.addValue(aqius));

            } catch(e) {
                this.setState(() => ({ value: false, loading: false }));
            }
        } else {
            try {
                let { value } = await fetchUVIndex(coord);

                value = value > 12 ? 12 : Math.floor(value);
                this.setState({ max: Math.round(value * 8.3), index: value, loading: false },() => this.addValue());

            } catch(e) {
                this.setState(() => ({ value: false, loading: false }));
            }
        }
    }

    render() {
        const { clicked, index, value, showIndex, loading } = this.state;
        const { title } = this.props;

        return (
            <div 
                className={styles.container}
                data-testid='container'
            >     
                <div 
                    className={styles.uvPollutionWrapper}
                    data-testid='uv-pollution-wrapper'
                >
                    <h2>{title} Index</h2>
                    <hr/>

                    {clicked ?  
                        loading ? 
                            <Loading /> 
                            : 
                            value !== false ? 
                                <div 
                                    className={styles.uvAnimationContainer}
                                    style={{margin: 'auto'}}
                                    data-testid='uv-animation-container'
                                >
                                    <div className={showIndex ? styles.show : styles.index}>
                                        {showIndex && Math.round(index)}
                                        {showIndex && <Tooltip data={classification(title, index)}/>}
                                    </div>
                                    <Line 
                                        className={styles.progress}
                                        percent={value} 
                                        strokeLinecap='butt'
                                        strokeWidth="1.7"
                                        trailWidth="1.7"
                                        strokeColor="#6c8790"
                                    />
                                </div> 
                            : <div 
                                className={styles.noData}
                                data-testid='no-data-message'
                              >
                                No data available
                              </div> : null
                    }

                    {!clicked && 
                        <button
                            style={{margin: 'auto'}}
                            className={styles.seeIndex}
                            data-testid='see-index'
                            onClick={this.handleClick}
                        >
                            See current index
                        </button>
                    }
                </div>
            </div>
        )
    }
}

UVandPollution.propTypes = {
    title: PropTypes.string.isRequired
}

export default UVandPollution;