const _FULFILLED = '_FULFILLED'
    , UPDATE_FIRST = 'UPDATE_FIRST'
    , UPDATE_LAST = 'UPDATE_LAST'
    , RESET_PROLOGUE = 'RESET_PROLOGUE'
    , RESET_GAME = 'RESET_GAME'
    , UPDATE_GENDER = 'UPDATE_GENDER'
    , UPDATE_STATE = 'UPDATE_STATE';

export default function reducer(state = initialState, action){
    switch(action.type){
        case UPDATE_FIRST:
            return Object.assign({}, state, {firstName: action.payload});

        case UPDATE_LAST:
            return Object.assign({}, state, {lastName: action.payload});

        case RESET_PROLOGUE:
            return Object.assign({}, state, {prologue: action.payload});

        case RESET_GAME:
                return Object.assign({}, state, initialState)

        case UPDATE_GENDER: 
                return Object.assign({}, state, {gender: action.payload});
        
        case UPDATE_STATE:
            return Object.assign({}, state, action.payload);

        default: return state;
    }
}
export function updateState(state){
    return {
        type: UPDATE_STATE,
        payload: state
    }
}

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

export function updateGender(gender){
    return {
        type: UPDATE_GENDER,
        payload: gender
    }
}

const initialState = {
     choicesCounter: 0,
     gender: '',
     firstName: '',
     lastName: '',
     clues: [],
     gridArea:
         [{position: 'aa', name: ''} ,{position: 'ab', name: ''} 
        , {position: 'ac', name: ''} ,{position: 'ad', name: ''} 
        , {position: 'ba', name: ''} ,{position: 'bb', name: ''} 
        , {position: 'bc', name: ''} ,{position: 'bd', name: ''} 
        , {position: 'ca', name: ''} ,{position: 'cb', name: ''} 
        , {position: 'cc', name: ''} ,{position: 'cd', name: ''} ]
}

//props.history.push() inside componentl