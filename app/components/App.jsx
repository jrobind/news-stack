import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import styles from '../styles/components/App.scss';

class App extends Component {
    render() {
        return <p className={styles.test}>Hello world!</p>
    }
}

export default App;