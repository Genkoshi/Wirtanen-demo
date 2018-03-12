import React from 'react';
import 'glamor/reset';
import glamorous from 'glamorous';
import {connect} from 'react-redux';
import {resetGame} from '../ducks/game_reducer.js';
import {withRouter, Link} from 'react-router-dom';
import {css} from 'glamor';

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
        transition: '.7s',
        ':hover':{
            fontSize: '70px',
            color: 'gold'
        }
    })

    return (
        <Wrapper>
            <MenuItem><Link onClick={props.resetGame} className={`${resetLink} ${hoverChange}`} to='/prologue'>New Game</Link></MenuItem>
            <MenuItem className={`${hoverChange}`}>Load</MenuItem>
            <MenuItem className={`${hoverChange}`}>Config</MenuItem>
            <MenuItem onClick={() => this.props.history.push('/start')} className={`${hoverChange}`} >Main Menu</MenuItem>
            <MenuItem><a className={`${resetLink} ${hoverChange}`} href='http://localhost:9000/auth/logout' >Logout</a></MenuItem>
        </Wrapper>
    )
}

function mapStateToProps(state){
    return {}
}

export default connect(mapStateToProps, {resetGame})(withRouter(Menu))