import React, {Component} from 'react';
import 'glamor/reset';
import {css} from 'glamor';
import glamorous from 'glamorous';
import {connect} from 'react-redux';
import {getSaves, replaceSave} from '../ducks/save_reducer.js';
import {updateState, resetGame} from '../ducks/game_reducer';
import {withRouter} from 'react-router-dom';
import axios from 'axios';
import logo from './art/logo.png';
import hvrSound from './sounds/hover2.mp3';
import mainMenuTheme from './music/elevator.mp3';
import {saveList} from './SaveMenu';

class Start extends Component{
    constructor(){
        super()

        this.state = {
            load: false
        }
        this.startTheme = new Audio(mainMenuTheme);
        this.startTheme.loop = true;
        this.startTheme.volume = 0.2;
    }

    componentWillMount(){
        this.props.getSaves(this.props.user.id);
        this.startTheme.play();
        
    }
    componentWillUnmount(){
        this.startTheme.pause();
    }

    menuItemWhite(index){
        let newColor = this.state.menuItemColor;
        newColor[index] = 'red';
        this.setState({
            menuItemColor: newColor
        })
    }
    menuItemBlack(index){
        let newColor = this.state.menuItemColor;
        newColor[index]= 'black';
        this.setState({
            menuItemColor: newColor
        })
    }

    getMostRecent(){
        let mostRecent = this.props.saves.sort((saveA, saveB) => {
                    let dateA = new Date(saveA.time_stamped);
                    let dateB = new Date(saveB.time_stamped);
                    return dateA - dateB
                }).pop();

        this.props.updateState(mostRecent.save_load);
    }
    
    render(){
        const {user} = this.props;
        const flexCenter = css({
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
        })
        const Background = glamorous.div({
            backgroundColor: 'black',
            backgroundImage: 'radial-gradient(rgb(168, 1, 1), rgb(0, 0, 0) 90%)',            
            height: '100vh',
            width: '100%',
        })

        const MenuContainer = glamorous.div({
            minWidth: '500px',
            minHeight: typeof this.props.saves !=='undefined' && this.props.saves.length > 0 ?  '330px' : '200px',
            maxHeight: '330px',
            paddingTop: '20px',
            paddingBottom: '20px',
            backgroundColor: 'black',
            color: 'white',
            fontSize: '50px',
            fontWeight: 'bold',
            borderRadius: '25px',
            overflow: 'auto',
            boxShadow: '0 14px 28px 0 rgba(0, 0, 0, 0.25), 0 10px 10px 0 rgba(0, 0, 0, 0.26)'            
        })
        const Logo = glamorous.div({
            minWidth: '500px',
            minHeight: '250px',
            backgroundImage: `url(${logo})`,      
            backgroundSize: 'cover',                  
            borderRadius: '10px',
            marginBottom: '25px',
            boxShadow: '0 14px 28px 0 rgba(0, 0, 0, 0.25), 0 10px 10px 0 rgba(0, 0, 0, 0.26)'            
        })

        const MenuItem = glamorous.li({
            listStyle: 'none',
            marginBottom: '20px',
            cursor: 'pointer',
            userSelect: 'none',
            transition: '.5s',
            ':hover':{
                color: 'red',
                fontSize: !this.state.load ? '65px' : 'inherit'
            }
        })

        const loadOption = 
            <MenuItem onClick={() => this.setState({load: !this.state.load})} onMouseEnter={() => {
                let hoverSound = new Audio();
                    hoverSound.src = hvrSound;
                    hoverSound.volume = 0.5;
                hoverSound.play()
            }}>Load</MenuItem>

        const menuOptions = 
            <MenuContainer className={`${flexCenter}`}>
                {typeof this.props.saves !== 'undefined' && this.props.saves.length > 0 ?
                <MenuItem onMouseEnter={() => {
                    let hoverSound = new Audio();
                        hoverSound.src = hvrSound;
                        hoverSound.volume = 0.5;
                    hoverSound.play()
                }} onMouseUp={() => { this.getMostRecent(); this.props.history.push('/map') }} >Continue</MenuItem>
                : null}
                
                <MenuItem onMouseEnter={() =>{
                    let hoverSound = new Audio();
                    hoverSound.src = hvrSound;
                    hoverSound.volume = 0.5;
                    hoverSound.play()}
                    } onMouseUp={() => { this.props.resetGame();this.props.history.push('/prologue')}} >New Game</MenuItem>

                {typeof this.props.saves !=='undefined' && this.props.saves.length > 0 ? 
                loadOption
                : null}

                <a style={{textDecoration: 'none', color: 'white'}} href={process.env.REACT_APP_LOGOUT} >
                    <MenuItem onMouseEnter={() =>{
                        let hoverSound = new Audio();
                        hoverSound.src = hvrSound;
                        hoverSound.volume = 0.5;
                        hoverSound.play()
                        }}>Exit</MenuItem>
                </a>
            </MenuContainer>

        return(
            <Background className={`${flexCenter}`}>
                    <Logo></Logo>
                    {!this.state.load ? menuOptions : 
                        <MenuContainer style={{justifyContent: 'flex-start'}} className={`${flexCenter}`} >
                            {loadOption}
                            {saveList(this.props)}
                        </MenuContainer>}
            </Background>
        )
    }
}
let actions = {
    updateState,
    getSaves,
    resetGame,
    replaceSave
}
function mapStateToProps(state){
     return {
         user: state.save.user,
         saves: state.save.saves,
         gameState: state.game,
     }
}

export default connect(mapStateToProps, actions)(withRouter(Start))