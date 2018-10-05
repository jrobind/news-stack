import React,{ Component } from 'react';
import styles from '../styles/components/Loading.scss';

const Loading = () => (
    <div 
        className={styles.loadingWrapper}
        data-testid='loading-wrapper'
    >
        <div 
            className={styles.loading}
            data-testid='loading'    
        ></div>
    </div>
)

export default Loading;