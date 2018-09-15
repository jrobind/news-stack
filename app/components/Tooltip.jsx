import React,{ Component } from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/components/Tooltip.scss';

const Tooltip = ({ data: { color, text }}) => (
    <div className={styles.toolTip} style={{backgroundColor: color}}>
        <p>{text}</p>
        <div 
            className={styles.tail} 
            style={{borderTop: `10px solid ${color}`}}
        ></div>
    </div>
)

Tooltip.propTypes = {
    data: PropTypes.object.isRequired,
    infoTxt: PropTypes.bool.isRequired
}

export default Tooltip;