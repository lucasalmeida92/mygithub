import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import PageContent from './components/PageContent';
import HomePage from './containers/HomePage';
import RepositoriesPage from './containers/RepositoriesPage';
import CommitsPage from './containers/CommitsPage';
import styles from './App.scss';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className={styles.app}>
          <Header />
          <PageContent>
            <Switch>
              <Route exact path="/" component={HomePage} />
              <Route exact path="/:username" component={RepositoriesPage} />
              <Route exact path="/:username/:repoName" component={CommitsPage} />
              <Route component={HomePage} />
            </Switch>
          </PageContent>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
