import React, { Component } from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Login from './components/Login';
import GameMap from './components/GameMap';
import Prologue from './components/Prologue';
import Start from './components/Start';
import Scene from './components/Scene';
import Authorize from './components/Authorize';


class App extends Component {
  render() {
   
    return (
      <div>
        <BrowserRouter >
        <Switch>
            <Route exact path='/' component={Login} />
            <Authorize path='/map' component={GameMap} />
            <Authorize exact path='/scene' component={GameMap} />
            <Authorize path='/prologue' component={Prologue} />
            <Authorize path='/start' component={Start} />
            <Route path='/scene/:character' component={Scene} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
