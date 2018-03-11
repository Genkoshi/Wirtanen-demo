import axios from 'axios';

const GET_USER = 'GET_USER'
    , _FULFILLED = '_FULFILLED'
    , UPDATE_FIRST = 'UPDATE_FIRST'
    , UPDATE_LAST = 'UPDATE_LAST'
    , GET_SAVES = 'GET_SAVES'
    , GET_MOST_RECENT = 'GET_MOST_RECENT'
    , RESET_PROLOGUE = 'RESET_PROLOGUE'
    , RESET_GAME = 'RESET_GAME';

export function updateFirst(name){
    return {
        type: UPDATE_FIRST,
        payload: name
    }
}
export function updateLast(name){
    return {
        type: UPDATE_LAST,
        payload: name
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
export function resetPrologue(){
    return {
        type: RESET_PROLOGUE,
        payload: false
    }
}
export function resetGame(){
    return {
        type:RESET_GAME,
    }
}

export default function reducer(state = initialState, action){
    switch(action.type){
        case GET_USER + _FULFILLED:
            return Object.assign({}, state, {user: action.payload});
        case UPDATE_FIRST:
            return Object.assign({}, state, {firstName: action.payload});
        case UPDATE_LAST:
            return Object.assign({}, state, {lastName: action.payload});
        case GET_SAVES + _FULFILLED:
            return Object.assign({}, state, {saveLoadFiles: action.payload});
        case GET_MOST_RECENT + _FULFILLED:
            if(action.payload){
            return Object.assign({}, state, action.payload.save_load);}
            break;
        case RESET_PROLOGUE:
            return Object.assign({}, state, {prologue: action.payload});
        case RESET_GAME:
                return Object.assign({}, state, initialState, {user: state.user}); 
        default: return state;
    }
}
const initialState = {
     user: null,
     choicesCounter: 0,
     gender: '',
     firstName: '',
     lastName: '',
     dialoguePage: 0,
     clues: [],
     saveLoadFiles: [],
     prologue: true,
     gridArea:
         [{position: 'aa', name: ''} ,{position: 'ab', name: ''} 
        , {position: 'ac', name: ''} ,{position: 'ad', name: ''} 
        , {position: 'ba', name: ''} ,{position: 'bb', name: ''} 
        , {position: 'bc', name: ''} ,{position: 'bd', name: ''} 
        , {position: 'ca', name: ''} ,{position: 'cb', name: ''} 
        , {position: 'cc', name: ''} ,{position: 'cd', name: ''} ]
}

//props.history.push() inside componentl