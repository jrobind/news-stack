import React,{ Component } from 'react';
import styles from '../styles/components/Loading.scss';

const Loading = ({ addClass }) => (
    <div className={addClass ? styles.container : null} >
        <div className={styles.loading}></div>
    </div>
)

export default Loading;