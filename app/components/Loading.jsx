import React,{ Component } from 'react';
import styles from '../styles/components/Loading.scss';

class Loading extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={styles.container}>
                <div className={styles.loading}></div>
            </div>
        )
    }
}

export default Loading;