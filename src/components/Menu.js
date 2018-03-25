import React, {Component} from 'react';
import 'glamor/reset';
import {connect} from 'react-redux';
import {resetGame, updateState} from '../ducks/game_reducer.js';
import {replaceSave} from '../ducks/save_reducer.js';
import {withRouter} from 'react-router-dom';
import {css} from 'glamor';
import hvrSound from './sounds/hover2.mp3';
import {Motion, spring} from 'react-motion';
import {saveList} from './SaveMenu';
import Config from './Config';

class Menu extends Component{
    constructor(){
        super()

        this.state = {
            direction: '',
            selected: '',

        }
    }
    componentDidMount(){
        
    }
    render(){
    const {bgmVol, bgmMute, saves, gameState} = this.props;
    const wrapper = css({
        opacity: 0,
        backgroundColor: '#db1e1e',
        height: '450px',
        width: '380px',
        padding: '20px 0 20px 20px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: this.state.selected === 'load' ? 'flex-Start': 'space-between',
        alignItems: 'flex-start',
        borderRadius: '20px',
        borderTopLeftRadius: '0',
        position: 'absolute',
        transition: 'opacity .4s linear',
        top: '60px',
        left: '20px',
        cursor: 'default',
        overflow: 'auto',
    })
    const menuItem = css({
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
            fontSize: !this.state.selected ? '65px' : '50px',
            color: 'gold'
        }
    })
    let menu = [
        <div id='load' onMouseEnter={() => {
            let hoverSound = new Audio(hvrSound);
            hoverSound.volume = (bgmVol/10);
            hoverSound.muted = bgmMute;
            hoverSound.play();
        }} 
        onClick={() => {!this.state.selected ? this.setState({selected: 'load'}) : this.setState({selected: ''})}}
        className={`${menuItem} ${hoverChange}`}>{this.state.selected ? 'Back' : 'Load'}</div>,

        <div id={'config'} onMouseEnter={() => {
            let hoverSound = new Audio(hvrSound);
            hoverSound.volume = (bgmVol/10);
            hoverSound.muted = bgmMute;
            hoverSound.play();
        }} 
        onClick={() => {!this.state.selected ? this.setState({selected: 'config'}) : this.setState({selected: ''})}}
        className={`${menuItem} ${hoverChange}`}>{this.state.selected ? 'Back' : 'Config'}</div>,

        <div id={'mainMenu'} onMouseEnter={() => {
            let hoverSound = new Audio(hvrSound);
            hoverSound.volume = (bgmVol/10);
            hoverSound.muted = bgmMute;            
            hoverSound.play();
        }} onClick={() => this.props.history.push('/start')} className={`${menuItem} ${hoverChange}`} >Main Menu</div>,
        
        <div id={'logout'} onMouseEnter={() => {
            let hoverSound = new Audio(hvrSound);
            hoverSound.volume = (bgmVol/10);
            hoverSound.muted = bgmMute;            
            hoverSound.play();
        }} className={`${menuItem}`}>
            <a className={`${resetLink} ${hoverChange}`} href={process.env.REACT_APP_LOGOUT} >Logout</a>
        </div>
    ]
    let filtered = menu.filter((item) => item.props.id === this.state.selected)
                                        //   .map(item => !this.state.load && !this.state.config ? item : null);}

    return (
        <div className={ `${wrapper}` }>
            {this.state.selected ? filtered : menu}
            {this.state.selected === 'load' ? saveList(this.props, false) : null}
            {this.state.selected === 'config' ? <Config></Config> : null}
        </div>
    )
}
}

function mapStateToProps(state){
    return {
        bgmVol: state.game.bgmVolume,
        bgmMute: state.game.bgmMute,
        user: state.save.user,
        saves: state.save.saves,
        gameState: state.game,
    }
}

export default connect(mapStateToProps, {resetGame, replaceSave, updateState})(withRouter(Menu))