import React from 'react';
import 'glamor/reset';
import glamorous from 'glamorous';
import {connect} from 'react-redux';
import {resetGame} from '../ducks/game_reducer.js';
import {withRouter, Link} from 'react-router-dom';
import {css} from 'glamor';
import hvrSound from './sounds/hover2.mp3';

function Menu(props){
    const Wrapper = glamorous.div({
        visibility: 'hidden',
        opacity: 0,
        backgroundColor: '#db1e1e',
        height: '450px',
        width: '380px',
        padding: '20px 0 20px 20px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        borderRadius: '20px',
        borderTopLeftRadius: '0',
        position: 'absolute',
        transition: 'visibility .4s linear, opacity .4s linear',
        top: '60px',
        left: '20px',
        cursor: 'default'
    })
    const MenuItem = glamorous.div({
        userSelect: 'none',
        color: 'black',
        display: 'inline-block',
        fontSize: '50px',
        fontFamily: 'Bellefair',
        fontWeight: 'bold',
        borderRadius: '15px',
        cursor: 'pointer',
    })
    const resetLink = css({
        textDecoration: 'none',
        color: 'black',
        display: 'inline-block',
    })
    const hoverChange = css({
        transition: '.5s',
        ':hover':{
            fontSize: '65px',
            color: 'gold'
        }
    })

    return (
        <Wrapper>
            <MenuItem onMouseEnter={() => {
                let hoverSound = new Audio(hvrSound);
                hoverSound.volume = 0.5;
                hoverSound.play();
            }}>
                <Link onClick={props.resetGame} className={`${resetLink} ${hoverChange}`} to='/prologue'>New Game</Link>
            </MenuItem>

            <MenuItem onMouseEnter={() => {
                let hoverSound = new Audio(hvrSound);
                hoverSound.volume = 0.5;
                hoverSound.play();
            }} className={`${hoverChange}`}>Load</MenuItem>

            <MenuItem onMouseEnter={() => {
                let hoverSound = new Audio(hvrSound);
                hoverSound.volume = 0.5;
                hoverSound.play();
            }} className={`${hoverChange}`}>Config</MenuItem>

            <MenuItem onMouseEnter={() => {
                let hoverSound = new Audio(hvrSound);
                hoverSound.volume = 0.5;
                hoverSound.play();
            }} onClick={() => props.history.push('/start')} className={`${hoverChange}`} >Main Menu</MenuItem>
            
            <MenuItem onMouseEnter={() => {
                let hoverSound = new Audio(hvrSound);
                hoverSound.volume = 0.5;
                hoverSound.play();
            }}>
                <a className={`${resetLink} ${hoverChange}`} href={process.env.REACT_APP_LOGOUT} >Logout</a>
            </MenuItem>
        </Wrapper>
    )
}

function mapStateToProps(state){
    return {}
}

export default connect(mapStateToProps, {resetGame})(withRouter(Menu))