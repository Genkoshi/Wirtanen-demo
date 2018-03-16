import React from 'react';
import 'glamor/reset';
import {connect} from 'react-redux';
import {updateGender} from '../ducks/game_reducer';
import glamorous from 'glamorous';
import {withRouter} from 'react-router-dom';

function CharSelect(props){
    let {history,updateGender} = props;
    const Wrapper = glamorous.div({
        height: '750px',
        width: '1350px',
        marginTop: '100px',
    })
    const Title = glamorous.div({
        width: '100%',
        textAlign: 'center',
        color: 'white',
        fontSize: '75px',
        fontFamily: 'Bellefair',
        marginBottom: '50px'
    })
    const CharHolder = glamorous.div({
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'space-between',
    })
    const Char = glamorous.div({
        height: '85%',
        width: '30%',
        transition: '0.7s',
        cursor: 'pointer',
        filter: 'brightness(50%)',
        ':hover':{
            filter: 'brightness(100%)'
        },
    }, gender => {
        if(gender.male){
            return {
                backgroundColor: 'red'
            }
        }else{
            return {
                backgroundColor: 'pink'
            }
        }
    })
    return (
        <Wrapper>
            <Title>Select Your Character</Title>
            <CharHolder>
                <Char male onClick={() => {updateGender('male'); history.push('/map')}}></Char>
                <Char onClick={() => {updateGender('female'); history.push('/map')}} ></Char>
                {console.log(props.gender, props.firstName, props.lastName)}
            </CharHolder>
        </Wrapper>
    )
}

function mapStateToProps(state){
    return {
        gender: state.game.gender,
        firstName: state.game.firstName,
        lastName: state.game.lastName
    }
}

export default connect(mapStateToProps, {updateGender})(withRouter(CharSelect))