import React,{ Component } from 'react';
import styles from '../styles/components/Loading.scss';

const Loading = ({ addClass }) => (
    <div className={addClass ? styles.search : styles.dash} >
        <div className={styles.loading}></div>
    </div>
)

export default Loading;