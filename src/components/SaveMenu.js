import React from 'react';
import 'glamor/reset';
import glamorous from 'glamorous';
import {connect} from 'react-redux';
import {css} from 'glamor';

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
        alignItems: 'center'
    })

    const SaveBox = glamorous.div({
        height: '110px',
        width: '350px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: '20px',
        cursor: 'pointer',
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

    const {saves} = props;

    let saveList = saves.map((save, index) => {
        let timeStamp = save.time_stamped;
        let convertTime = timeStamp.replace('T', ' ').slice(0, 19).split(' ');
        return (
            <SaveBox className={`${oldSave}`} key={index} >
                <p>Save {index +1} - Date: {convertTime[0]} Time: {convertTime[1]}</p>
            </SaveBox>)
    })
    
    return (
        <Wrapper>
            {saveList}
            <SaveBox className={`${newSave}`} >New Save</SaveBox>
        </Wrapper>
    )
}

function mapStateToProps(state){
    return {
        saves: state.save.saves
    }
}

export default connect(mapStateToProps)(SaveMenu)