import React from 'react';
import 'glamor/reset';
import glamorous from 'glamorous';
import {connect} from 'react-redux';
import {css} from 'glamor';
import {addSave, replaceSave} from '../ducks/save_reducer';
import axios from 'axios';
import svSound from './sounds/select.mp3';
import delSaveSound from './sounds/logout.mp3';
import hvrSound from './sounds/hover2.mp3';

const oldSave = css({
    backgroundColor: 'rgb(232, 193, 0)',
})

const DeleteButton = glamorous.div({
    backgroundColor: 'black',
    color: 'white',
    position: 'absolute',
    top: 5,
    right: 5,
    padding: '5px',
    borderRadius: '5px',
    zIndex: '25',
    ':hover':{
        color: 'red'
    }
})

const SaveBox = glamorous.div({
    minHeight: '110px',
    width: '350px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '20px',
    cursor: 'pointer',
    position: 'relative',
    transition: '.5s',
    fontSize: 'initial',
    borderRadius: '5px',
    ':hover':{
        filter: 'brightness(120%)'
    }
})

export var saveList = (props, saving) => {

    const {saves, gameState, getSaves, user, replaceSave, updateState, bgmVol, bgmMute} = props;    
    
    let saveSound = new Audio(svSound);
    saveSound.volume = (bgmVol/10) || 0.5 ;
    saveSound.muted = bgmMute || false;

    let deleteSound = new Audio(delSaveSound);
    deleteSound.volume = (bgmVol/10) || 0.5 ;
    deleteSound.muted = bgmMute || false;

    return (saves.map((save, index) => {
        let timeStamp = new Date(save.time_stamped);
        let {firstName, lastName} = save.save_load

        return (
            <SaveBox 
                onClick={() => 
                            { 
                                if(saving){updateSave(save.id, user.id, gameState, replaceSave)}
                                else{updateState(save.save_load); props.history.push('/map') }
                            }
                        } 
                className={`${oldSave}`} 
                key={index}
                onMouseUp={() => saveSound.play()}
                onMouseEnter={() => {
                    let hoverSound = new Audio(hvrSound);
                    hoverSound.volume = (bgmVol/10) || 0.5;
                    hoverSound.muted = bgmMute || false;
                    hoverSound.play();
                }}
            >
                    <div style={{marginBottom: '10px'}}>Save {index +1}</div>
                    <div>{firstName} {lastName} {timeStamp.toLocaleString()}</div>
                    <DeleteButton onMouseUp={(e) => {e.stopPropagation();deleteSound.play()}} onClick={(e) => deleteSave(user, save.id, getSaves, replaceSave, e)} >X</DeleteButton>
            </SaveBox>)
}))}


function SaveMenu(props){
    const Wrapper = glamorous.div({
        opacity: 0,
        backgroundColor: '#db1e1e',
        height: '450px',
        width: '360px',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '20px',
        borderTopRightRadius: '0',
        position: 'absolute',
        transition: 'opacity .4s linear',
        top: '60px',
        right: '20px',
        cursor: 'default',
        overflowY: 'scroll'
    })

    const newSave = css({
        fontSize: '40px',
        backgroundColor: '#FAB4B4',
        color: '#FF6666'
    })

    const { gameState, user, bgmVol, bgmMute, addSave} = props;
    
    return (
        <Wrapper>
            {saveList(props, true)}
            <SaveBox onClick={() => {
                    let saveSound = new Audio(svSound);
                    saveSound.play();
                    createSave(user.id, gameState, addSave)}} 
                className={`${newSave}`}
                onMouseEnter={() => {
                    let hoverSound = new Audio(hvrSound);
                    hoverSound.volume = (bgmVol/10) || 0.5;
                    hoverSound.muted = bgmMute || false
                    hoverSound.play();
                }} >New Save</SaveBox>
        </Wrapper>
    )
}

const actions = {
    addSave,
    replaceSave
}

function createSave(id, state, addSave){
    axios.post(`/api/save/${id}`, state)
     .then(res => {
        addSave(res.data[0])
     })
 }
 function updateSave(saveID, userID, state, replaceSave){
     axios.put(`/api/updateSave/${saveID}/${userID}`, state)
     .then(res => {
         replaceSave(res.data)
     })
 }

 function deleteSave(user, saveID, getSaves, replaceSave, e){
    e.stopPropagation();
    axios.delete(`/api/deleteSave/${saveID}/${user.id}`)
    .then(res => {
        replaceSave(res.data)
    })
 }

function mapStateToProps(state){
    return {
        user: state.save.user,
        saves: state.save.saves,
        gameState: state.game,
        bgmVol: state.game.bgmVolume,
        bgmMute: state.game.bgmMute
    }
}

export default connect(mapStateToProps, actions)(SaveMenu)