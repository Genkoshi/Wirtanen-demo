import React from 'react';
import 'glamor/reset';
import glamorous from 'glamorous';
import {connect} from 'react-redux';
import {css} from 'glamor';
import {getSaves, addSave, replaceSave} from '../ducks/save_reducer';
import axios from 'axios';

function SaveMenu(props){
    const Wrapper = glamorous.div({
        visibility: 'hidden',
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
        transition: 'visibility .4s linear, opacity .4s linear',
        top: '60px',
        right: '20px',
        cursor: 'default',
        overflowY: 'scroll'
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
        ':hover':{
            filter: 'brightness(120%)'
        }
    })

    const oldSave = css({
        backgroundColor: '#C4C4C4',
    })

    const newSave = css({
        fontSize: '40px',
        backgroundColor: '#FAB4B4',
        color: '#FF6666'
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

    const {saves, gameState, getSaves, addSave, user, replaceSave} = props;

    let saveList = saves.map((save, index) => {
        let timeStamp = new Date(save.time_stamped);
        let {firstName, lastName} = save.save_load
        return (
            <SaveBox onClick={() => updateSave(save.id, user.id, gameState, replaceSave)} className={`${oldSave}`} key={index} >
                <div style={{marginBottom: '10px'}}>Save {index +1}</div>
                <div>{firstName} {lastName} {timeStamp.toLocaleString()}</div>
                <DeleteButton onClick={(e) => deleteSave(user, save.id, getSaves, e)} >X</DeleteButton>
                {console.log(save)}
            </SaveBox>)
    })
    
    return (
        <Wrapper>
            {saveList}
            <SaveBox onClick={() => createSave(user.id, gameState, addSave)} className={`${newSave}`} >New Save</SaveBox>
        </Wrapper>
    )
}

const actions = {
    getSaves,
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

 function deleteSave(user, saveID, getSaves, e){
    e.stopPropagation();
    axios.delete(`/api/deleteSave/${saveID}`)
    .then(res => {
        getSaves(user.id)
    })
 }

function mapStateToProps(state){
    return {
        user: state.save.user,
        saves: state.save.saves,
        gameState: state.game
    }
}

export default connect(mapStateToProps, actions)(SaveMenu)