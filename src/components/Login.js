import React, { Component } from 'react';
import 'glamor/reset';
import glamorous from 'glamorous';
import logo from './art/logo.png'
import pressSound from './sounds/login.mp3';
import {css} from 'glamor';

export default class Login extends Component {
    constructor(){
        super()


        this.state = {
                // purple: null,
            
        }
    }

    componentDidMount(){
        // {console.log(ReactDOM.findDOMNode(this).querySelectorAll('#purple'))}
        // this.setState({
        //     purple: ReactDOM.findDOMNode(this).querySelectorAll('#purple')
        // })
        // console.log(this)
    }

    render() {
        const flexCenter = {display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexDirection: 'column',
                        };

        const Background = glamorous.div({
                width: '100%',
                height: '100vh',
                backgroundImage: 'radial-gradient(rgb(168, 1, 1), rgb(0, 0, 0) 90%)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                '& > div': flexCenter,
                '& a': flexCenter
                
        })
            , Logo = glamorous.div({
                minWidth: '700px',
                minHeight: '400px',
                backgroundImage: `url(${logo})`,
                backgroundSize: 'cover',
                borderRadius: '25px', 
                boxShadow: '0 14px 28px 0 rgba(0, 0, 0, 0.25), 0 10px 10px 0 rgba(0, 0, 0, 0.26)',
                marginBottom: '100px',
            })
            , loginButton = css({
                height: '100px',
                width: '200px',
                borderRadius: '10px',
                backgroundColor: 'rgb(20, 20, 20)',
                position: 'absolute',
                boxShadow: '0px 15px 0px 0px rgba(0, 0, 0)',
                textDecoration: 'none',
                top: '75%',
                color: 'white',
                fontWeight: 'bold',
                fontSize: '30px',
                transition: '.2s',
                ':hover':{color: 'red'},
                ':active': {
                    boxShadow: '0px 7px 0px rgba(0, 0, 0)',
                    top: 'calc(75% + 8px)',
                }
            })
            // var purple = anime({
            //     targets: this.state.purple,
            //     translateX: '250px',
            //     duration: 3000,
            //     loop: false
            // })
            // const purpleColor = css({
            //     backgroundColor: 'purple',
            //     height: '50px',
            //     width: '50px',
            //     display: 'block',
            // })

            // const isPurple = ReactDOM.findDOMNode(this).querySelectorAll(`${purpleColor}`)
        return (
                    // <div>
            <Background>
                <div>
                    <Logo >
                    </Logo>
                </div>

                <a className={`${loginButton}`} id='purple' onMouseDown={() => {
                    let pressed = new Audio(pressSound)
                    pressed.currentTime = 0.2;
                    pressed.play();
                }} href={process.env.REACT_APP_LOGIN}>
                    LOGIN
                </a>
            </Background>
                /* <div id='purple' className={`${purpleColor}`}></div>
                <div id='purple' className={`${purpleColor}`}></div>
                </div> */
        )
    }
}