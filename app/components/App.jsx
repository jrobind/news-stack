import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import DashboardContainer from '../containers/DashboardContainer';
import Search from './Search';
import '../styles/utils/reset.scss';
import styles from '../styles/components/App.scss';

class App extends Component {
    render() {
        return (
            <Router>
                <div className={styles.appContainer}>
                    <Switch>
                        <Route exact path='/' component={Search} />
                        <Route exact path='/weather' component={DashboardContainer} />
                        <Route render={() => (<Redirect to="/" />)} />
                    </Switch>
                </div>
            </Router>
        )
    }
}

export default App;