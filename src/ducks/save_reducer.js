import axios from 'axios';
import {updateState} from './game_reducer';

const GET_SAVES = 'GET_SAVES'
    , GET_MOST_RECENT = 'GET_MOST_RECENT'
    , GET_USER = 'GET_USER'
    , _FULFILLED = '_FULFILLED';



export default function reducer(state = initialState, action){
    switch (action.type){
        case GET_SAVES + _FULFILLED:
            return Object.assign({}, state, {saves: action.payload});

        case GET_MOST_RECENT + _FULFILLED:
            updateState(action.payload.save_load);

        case GET_USER + _FULFILLED:
            return Object.assign({}, state, {user: action.payload});

        default: return state;
    }
}

export function getUser(){
    let userData=axios.get('/auth/me').then(res => {
        return typeof res.data === 'object' ? res.data : null ;
    })
    return {
        type: GET_USER,
        payload: userData
    }
}
export function getMostRecent(userID){
    let mostRecent = axios.get(`/api/mostRecentSave/${userID}`).then(res =>{
        return res.data[0];
    })
    if (mostRecent){
        return {
            type:GET_MOST_RECENT,
            payload: mostRecent
        }
    }
}
export function getSaves(userID){
    let saves = axios.get(`/api/saves/${userID}`).then(res => {
        return res.data
    })
    return {
        type: GET_SAVES,
        payload: saves
    }
}


const initialState = {
    user: null,
    saves: [],
}