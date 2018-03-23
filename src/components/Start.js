import React, {Component} from 'react';
import 'glamor/reset';
import {css} from 'glamor';
import glamorous from 'glamorous';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {getSaves} from '../ducks/save_reducer.js';
import {updateState, resetGame} from '../ducks/game_reducer';
import {withRouter} from 'react-router-dom';
import axios from 'axios';
import logo from './art/logo.png';
import hvrSound from './sounds/hover2.mp3';
import mainMenuTheme from './music/elevator.mp3';

class Start extends Component{
    constructor(){
        super()

        this.state = {
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

    getMostRecent(userID){
        return axios.get(`/api/mostRecentSave/${userID}`).then(res =>{
            this.props.updateState(res.data[0].save_load);
        })
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

        const MenuOptions = glamorous.div({
            minWidth: '500px',
            minHeight: '405px',
            paddingTop: '20px',
            paddingBottom: '20px',
            backgroundColor: 'black',
            color: 'white',
            fontSize: '50px',
            fontWeight: 'bold',
            display: 'flex',
            borderRadius: '25px',
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
                fontSize: '65px'
            }
        })
        return(
            <Background className={`${flexCenter}`}>
                    <Logo></Logo>
                    <MenuOptions className={`${flexCenter}`}>
                            {typeof this.props.saves !== 'undefined' && this.props.saves.length > 0 ?
                            <MenuItem onMouseEnter={() => {
                                let hoverSound = new Audio();
                                    hoverSound.src = hvrSound;
                                    hoverSound.volume = 0.5;
                                hoverSound.play()
                            }} onMouseUp={() => { this.getMostRecent(user.id).then(res => this.props.history.push('/map'))}} >Continue</MenuItem>
                            : null}
                            
                            <MenuItem onMouseEnter={() =>{
                                let hoverSound = new Audio();
                                hoverSound.src = hvrSound;
                                hoverSound.volume = 0.5;
                                 hoverSound.play()}
                                } onMouseUp={() => { this.props.resetGame();this.props.history.push('/prologue')}} >New Game</MenuItem>

                            {typeof this.props.saves !=='undefined' && this.props.saves.length > 0 ? 
                            <MenuItem onMouseEnter={() => {
                                let hoverSound = new Audio();
                                    hoverSound.src = hvrSound;
                                    hoverSound.volume = 0.5;
                                hoverSound.play()
                            }}>Load</MenuItem>
                            : null}

                            <MenuItem onMouseEnter={() => {
                                let hoverSound = new Audio();
                                    hoverSound.src = hvrSound;
                                    hoverSound.volume = 0.5;
                                hoverSound.play()
                            }}>Options</MenuItem>

                            <a style={{textDecoration: 'none', color: 'white'}} href={process.env.REACT_APP_LOGOUT} >
                                <MenuItem onMouseEnter={() =>{
                                    let hoverSound = new Audio();
                                    hoverSound.src = hvrSound;
                                    hoverSound.volume = 0.5;
                                     hoverSound.play()
                                     }}>Exit</MenuItem>
                            </a>
                    </MenuOptions>
                    {console.log(this.props.user, this.props.saves)}
            </Background>
        )
    }
}
let actions = {
    updateState,
    getSaves,
    resetGame
}
function mapStateToProps(state){
     return {
         user: state.save.user,
         saves: state.save.saves
     }
}

export default connect(mapStateToProps, actions)(withRouter(Start))