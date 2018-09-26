import React,{ Component } from 'react';
import styles from '../styles/components/Loading.scss';

const Loading = () => (
    <div className={styles.loadingWrapper}>
        <div className={styles.loading}></div>
    </div>
)

export default Loading;