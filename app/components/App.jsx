import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Search from './Search';
import styles from '../styles/components/App.scss';

class App extends Component {
    render() {
        return (
            <Router>
                <div className={styles.appContainer}>
                    <Switch>
                        <Route exact path='/' component={Search} />
                        <Route render={() => (<p>Path not Found!</p>)} />
                    </Switch>
                </div>
            </Router>
        )
    }
}

export default App;