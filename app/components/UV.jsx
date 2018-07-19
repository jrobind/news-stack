import React, { Component } from 'react';
import { fetchUVIndex } from '../utils/api';
import storage from '../utils/storage';
import { Line } from 'rc-progress';
import styles from '../styles/components/UV.scss'; 

class UV extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0,
            index: null,
            clicked: false,
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
        const { city: { coord } } = storage.getStorage('weather');

        // set loading state to true while retrieving uv api data
        this.setState(() => ({clicked: true}));

        fetchUVIndex(coord)
            .then(({ value }) => this.setState({max: value * 8.3, index: value},() => this.addValue(value)))
            .catch((error) => console.log(error))

    }

    render() {
        const { clicked, index, value, showIndex } = this.state;

        return (
            <div className={styles.container}>     
                <div className={styles.uv}>
                    <h2>UV Index</h2>
                    <hr/>

                    {clicked && 
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
                        </div>
                    }

                    {!clicked && 
                        <button 
                            className={styles.seeIndex}
                            onClick={this.handleClick}
                        >
                            See current index
                        </button>
                    }

                    <p className={styles.info}>The UV index identifies the strength of the ultraviolet radiation from the sun. Large amounts of UV exposure at a high index can lead to serious health issues. Take necessary precautions to ensure you stay safe in the sun.</p>
                </div>
            </div>

        )

        if (loading) {
            return (
                <div className={styles.container}> 
                    <Loading addClass={false} />
                </div>
            )    
        } 
    }
}

export default UV;