import {createStore, applyMiddleware, combineReducers} from 'redux';
import game from './ducks/game_reducer';
import save from './ducks/save_reducer';
import promiseMiddleware from 'redux-promise-middleware';

const middleware = applyMiddleware(promiseMiddleware());

const reducer = combineReducers({
    game,
    save
})

export default createStore(reducer, middleware);