import React, { Component } from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Login from './components/Login';
import GameMap from './components/GameMap';
import Prologue from './components/Prologue';
import Authorize from './components/Authorize';
import Start from './components/Start';
import Scene from './components/Scene';
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import {css} from 'glamor';

class App extends Component {
  render() {
     const enter = css({
       opacity: 0
     }),
     enterActive = css({
       opacity: 1,
       transition: 'opacity 1000ms ease-in'
     }),
     exit = css({
       opacity: 1
     }),
     exitActive = css({
       opacity: 0,
       transition: 'opacity 800ms ease-in'
     })
   
    return (
      <div className="App">
        <BrowserRouter>
        <TransitionGroup>
          <CSSTransition  timeout={1000}
              classNames={{
                enter: `${enter}`,
                enterActive: `${enterActive}`,
                exit: `${exit}`,
                exitActive: `${exitActive}`,
              }} mountOnEnter={true} unmountOnExit={true}>
          <Switch>
            <Route exact path='/' component={Login} />
            <Authorize path='/map' component={GameMap} />
            <Authorize exact path='/scene' component={GameMap} />
            <Authorize path='/prologue' component={Prologue} />
            <Authorize path='/start' component={Start} />
            <Route path='/scene/:character' component={Scene} />
          </Switch>
          </CSSTransition>
          </TransitionGroup>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
