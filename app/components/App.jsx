import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SearchContainer from '../containers/SearchContainer';
import styles from '../styles/components/App.scss';

class App extends Component {
    render() {
        return <SearchContainer />;
    }
}

export default App;