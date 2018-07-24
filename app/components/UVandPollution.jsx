import React, { Component } from 'react';
import { fetchUVIndex, fetchPollutionIndex } from '../utils/api';
import storage from '../utils/storage';
import PropTypes from 'prop-types';
import Loading from '../components/Loading';
import { Line } from 'rc-progress';
import styles from '../styles/components/UV.scss'; 

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

    handleClick() {
        const { title } = this.props;
        const { city: { coord } } = storage.getStorage('weather');
        
        // set loading state to true while retrieving uv/pollution api data
        this.setState(() => ({clicked: true, loading: true}));

        if (title === 'Pollution') {
            fetchPollutionIndex(coord)
            .then(({ data: { current: { pollution } }}) => {
                let aqius = Math.floor(pollution.aqius);
                this.setState({max: Math.round(aqius / 3), index: aqius, loading: false},() => this.addValue(aqius));
            })
            .catch((error) => console.log(error));

        } else {
            fetchUVIndex(coord)
                .then(({ value }) => {
                    value = value > 12 ? 12 : Math.floor(value);
                    this.setState({max: Math.round(value * 8.3), index: value, loading: false},() => this.addValue(value));
                })
                .catch((error) => console.log(error));
            }
    }

    render() {
        const { clicked, index, value, showIndex, loading } = this.state;
        const { info, title } = this.props;

        return (
            <div className={styles.container}>     
                <div className={styles.uv}>
                    <h2>{title} Index</h2>
                    <hr/>

                    {clicked ?  
                        loading ? 
                            <Loading /> 
                            : 
                            <div className={styles.uvAnimationContainer}>
                                <p className={showIndex ? styles.show : styles.index}>
                                    {showIndex && Math.round(index)}
                                </p>
                                <Line 
                                    className={styles.progress}
                                    percent={value} 
                                    strokeLinecap='butt'
                                    strokeWidth="1.5"
                                    trailWidth="1.5"
                                    strokeColor="#19315b"
                                />
                            </div> : null
                    }

                    {!clicked && 
                        <button 
                            className={styles.seeIndex}
                            onClick={this.handleClick}
                        >
                            See current index
                        </button>
                    }

                    <p className={styles.info}>{info}</p>
                </div>
            </div>
        )
    }
}

UVandPollution.propTypes = {
    title: PropTypes.string.isRequired,
    info: PropTypes.string.isRequired 
}

export default UVandPollution;