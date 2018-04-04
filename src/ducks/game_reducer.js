const UPDATE_FIRST = 'UPDATE_FIRST'
    , UPDATE_LAST = 'UPDATE_LAST'
    , RESET_PROLOGUE = 'RESET_PROLOGUE'
    , RESET_GAME = 'RESET_GAME'
    , UPDATE_GENDER = 'UPDATE_GENDER'
    , UPDATE_STATE = 'UPDATE_STATE'
    , UPDATE_MUSIC_VOL = 'UPDATE_MUSIC_VOL'
    , UPDATE_BGM_VOL = 'UPDATE_BGM_VOL'
    , UPDATE_TEXT_SPEED = 'UPDATE_TEXT_SPEED'
    , UPDATE_MUSIC_MUTE = 'UPDATE_MUSIC_MUTE'
    , UPDATE_BGM_MUTE = 'UPDATE_BGM_MUTE'
    , UPDATE_CHOICES = 'UPDATE_CHOICES'
    , UPDATE_GRID = 'UPDATE_GRID';

export default function reducer(state = initialState, action){
    switch(action.type){
        case UPDATE_FIRST:
            return Object.assign({}, state, {firstName: action.payload});

        case UPDATE_LAST:
            return Object.assign({}, state, {lastName: action.payload});

        case RESET_GAME:
                return Object.assign({}, state, initialState)

        case UPDATE_GENDER: 
                return Object.assign({}, state, {gender: action.payload});
        
        case UPDATE_STATE:
            return Object.assign({}, state, action.payload);

        case UPDATE_MUSIC_VOL:
            return Object.assign({}, state, {musicVolume: action.payload});

        case UPDATE_BGM_VOL:
            return Object.assign({}, state, {bgmVolume: action.payload});

        case UPDATE_TEXT_SPEED: 
            return Object.assign({}, state, {textSpeed: action.payload});

        case UPDATE_MUSIC_MUTE:
            return Object.assign({}, state, {musicMute: action.payload});
        
        case UPDATE_BGM_MUTE:
            return Object.assign({}, state, {bgmMute: action.payload});
        
        case UPDATE_CHOICES:
            return Object.assign({}, state, {choices: action.payload});

        case UPDATE_GRID:
            return Object.assign({}, state, {gridArea: action.payload})

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

export function updateMusicVol(volume){
    return {
        type: UPDATE_MUSIC_VOL,
        payload: volume
    }
}
export function updateBGMVol(volume){
    return {
        type: UPDATE_BGM_VOL,
        payload: volume
    }
}
export function updateTextSpeed(speed){
    return {
        type: UPDATE_TEXT_SPEED,
        payload: speed
    }
}
export function updateMusicMute(bool){
    return {
        type: UPDATE_MUSIC_MUTE,
        payload: bool
    }
}
export function updateBgmMute(bool){
    return {
        type: UPDATE_BGM_MUTE,
        payload: bool
    }
}
export function updateChoices(float){
    return {
        type: UPDATE_CHOICES,
        payload: float,
    }
}
export function updateGrid(newGrid){
    return {
        type: UPDATE_GRID,
        payload: newGrid
    }
}

const initialState = {
     choices: 0,
     gender: '',
     firstName: '',
     lastName: '',
     musicVolume: 5,
     bgmVolume: 5,
     bgmMute: false,
     musicMute: false,
     textSpeed: 20,
     gridArea:
         [{position: 'aa', name: 'Miya'} ,{position: 'ff', name: ''} 
        , {position: 'bb', name: ''} ,{position: 'gg', name: 'MainCharacter'} 
        , {position: 'cc', name: 'unknown'} ,{position: 'hh', name: ''} 
        , {position: 'dd', name: ''} ,{position: 'ii', name: ''} 
        , {position: 'ee', name: ''} ,{position: 'jj', name: ''}
    ]
}

//props.history.push() inside componentl