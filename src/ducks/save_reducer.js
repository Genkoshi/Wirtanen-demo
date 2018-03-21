import axios from 'axios';
import {updateState} from './game_reducer';

const GET_SAVES = 'GET_SAVES'
    , GET_USER = 'GET_USER'
    , ADD_SAVE = 'ADD_SAVE'
    , REPLACE_SAVE = 'REPLACE_SAVE'
    , _FULFILLED = '_FULFILLED';



export default function reducer(state = initialState, action){
    switch (action.type){
        case GET_SAVES + _FULFILLED:
            return Object.assign({}, state, {saves: action.payload});

        case GET_USER + _FULFILLED:
            return Object.assign({}, state, {user: action.payload});

        case ADD_SAVE:
            return Object.assign({}, state, {saves: [...state.saves, action.payload]})

        case REPLACE_SAVE:
            return Object.assign({}, state, {saves: action.payload})

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

export function getSaves(userID){
    let saves = axios.get(`/api/saves/${userID}`).then(res => {
        return res.data
    })
    return {
        type: GET_SAVES,
        payload: saves
    }
}

export function addSave(save){
    return {
        type: ADD_SAVE,
        payload: save
    }
}

export function replaceSave(saves){

    return {
        type: REPLACE_SAVE,
        payload: saves
    }
}


const initialState = {
    user: null,
    saves: [],
}