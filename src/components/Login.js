import React, { Component } from 'react';
import 'glamor/reset';
import glamorous from 'glamorous';
import logo from './art/logo.png'

export default class Login extends Component {

    componentWillMount(){
    }

    render() {
        const flexCenter = {display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'};

        const Background = glamorous.div({
                width: '100%',
                height: '100vh',
                backgroundImage: 'radial-gradient(rgb(168, 1, 1), rgb(0, 0, 0) 90%)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                '& div': flexCenter,
                '& a': flexCenter
                
        })
            , Logo = glamorous.div({
                minWidth: '700px',
                minHeight: '400px',
                backgroundImage: `url(${logo})`,
                backgroundSize: 'cover',
                borderRadius: '25px', 
                boxShadow: '0 14px 28px 0 rgba(0, 0, 0, 0.25), 0 10px 10px 0 rgba(0, 0, 0, 0.26)'
            })
            , LoginButton = glamorous.a({
                height: '10vh',
                width: '15%',
                borderRadius: '10px',
                backgroundColor: 'black',
                marginTop: '100px',
                boxShadow: '0 10px 20px 0 rgba(0,0,0,0.1), 0 6px 6px 0 rgba(0,0,0,0.2)',
                cursor: 'pointer',
                textDecoration: 'none',
                color: 'white'
            })
        return (
            <Background>
                <Logo >
                </Logo>

                <LoginButton href='http://localhost:9000/auth/'>
                    Log in button
                </LoginButton>
            </Background>
        )
    }
}

