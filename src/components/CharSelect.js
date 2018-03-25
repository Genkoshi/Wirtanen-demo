import React from 'react';
import 'glamor/reset';
import {connect} from 'react-redux';
import {updateGender} from '../ducks/game_reducer';
import glamorous from 'glamorous';
import {withRouter} from 'react-router-dom';
import male from './art/male-protag.png';
import female from './art/female-protag.png';

function CharSelect(props){
    let {history,updateGender} = props;
    const Wrapper = glamorous.div({
        height: '850px',
        width: '1350px',
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
        justifyContent: 'space-around',
    })
    const Char = glamorous.div({
        height: '85%',
        width: '30%',
        display: 'flex',
        justifyContent: 'center',
        '& img':{
            transition: '0.7s',
            cursor: 'pointer',
            maxWidth: '430px',
            maxHeight: '600px',
            filter: 'brightness(20%)',
            ':hover':{
            filter: 'brightness(100%)',
            bottom: '50px',
            }
        },
    }, gender => {
        if(gender.male){
            return {
                // background: `url(${male}) no-repeat`,
                backgroundSize: 'contain',
            }
        }else{
            return {
                // background: `url(${female}) no-repeat`,
                backgroundSize: 'contain',
            }
        }
    })
    return (
        <Wrapper>
            <Title>Select Your Character</Title>
            <CharHolder>
                <Char male onClick={() => {updateGender('male'); history.push('/map')}}>
                    <img src={male} />
                </Char>
                <Char onClick={() => {updateGender('female'); history.push('/map')}} >
                    <img src={female} /> 
                </Char>
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