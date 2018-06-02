import React, { Component } from 'react';
import { HashRouter,  Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import PageContent from './components/PageContent';
import HomePage from './containers/HomePage';
import RepositoriesPage from './containers/RepositoriesPage';
import CommitsPage from './containers/CommitsPage';
import './App.scss';

class App extends Component {
  render() {
    return (
      <HashRouter>
        <div className="App">
          <Header />
          <PageContent>
            <Switch>
              <Route exact path="/" component={HomePage} />
              <Route exact path="/:username" component={RepositoriesPage} />
              <Route exact path="/:username/:repoName" component={CommitsPage} />
              <Route component={RepositoriesPage} />
            </Switch>
          </PageContent>
        </div>
      </HashRouter>
    );
  }
}

export default App;
