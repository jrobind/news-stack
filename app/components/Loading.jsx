import React,{ Component } from 'react';
import styles from '../styles/components/Loading.scss';

const Loading = () => (
    <div className={styles.container}>
        <div className={styles.loading}></div>
    </div>
)

export default Loading;