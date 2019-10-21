import React,{ Component } from 'react';
import styles from '../styles/components/heading.scss';

const Heading = () => (
    <div 
        className={styles.headingWrapper}
        data-testid='heading-wrapper'
    >
        <div 
            className={styles.headingLinks}
            data-testid='heading-links'    
        >
            <a href="https://github.com/jrobind/weather-101">
                <img src="./app/images/github-logo.png"/>
            </a>
            <a href="https://darksky.net/poweredby/">
                <img src="https://darksky.net/dev/img/attribution/poweredby-oneline.png"/>
            </a>
        </div>
    </div>
)

export default Heading;