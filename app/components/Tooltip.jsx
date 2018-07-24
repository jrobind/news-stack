import React,{ Component } from 'react';
import styles from '../styles/components/Tooltip.scss';


class Tooltip extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div className={styles.toolTip}>
                <p>VERY HIGH</p>
                <div className={styles.tail}></div>
            </div>
        )
    }

}

export default Tooltip;