import React, { Component } from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Login from './components/Login';
import GameMap from './components/GameMap';
import Prologue from './components/Prologue';
import Authorize from './components/Authorize';
import Start from './components/Start';

class App extends Component {
  render() {
   
    return (
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route exact path='/' component={Login} />
            <Authorize path='/map' component={GameMap} />
            <Authorize path='/prologue' component={Prologue} />
            <Authorize path='/start' component={Start} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
