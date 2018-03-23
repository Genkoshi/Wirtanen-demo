import React from 'react';
import {TransitionGroup, CSSTransition} from 'react-transition-group';
import {Switch, Route} from 'react-router-dom';
import Authorize from './components/Authorize';
import {css} from 'glamor';
import Login from './components/Login';
import GameMap from './components/GameMap';
import Prologue from './components/Prologue';
import Start from './components/Start';
import Scene from './components/Scene';

export default function router(){
    const fadeEnter = css({
        opacity: 0
      }),
      fadeEnterActive = css({
        opacity: 1,
        transition: 'opacity 5000ms ease-in'
      }),
      fadeExit = css({
        opacity: 1
      }),
      fadeExitActive = css({
        opacity: 0,
        transition: 'opacity 800ms ease-in'
      })
    return (
        <TransitionGroup>
          <CSSTransition  timeout={5000} classNames={{enter: `${fadeEnter}`, enterActive: `${fadeEnterActive}`, exit: `${fadeExit}`, exitActive: `${fadeExitActive}`}} mountOnEnter={true} unmountOnExit={true} >
          <div>
              {console.log()}
          <Switch>
            <Route exact path='/' component={Login} />
            <Authorize path='/map' component={GameMap} />
            <Authorize exact path='/scene' component={GameMap} />
            <Authorize path='/prologue' component={Prologue} />
            <Authorize path='/start' component={Start} />
            <Route path='/scene/:character' component={Scene} />
          </Switch>
          </div>
          </CSSTransition>
        </TransitionGroup>
    )
}