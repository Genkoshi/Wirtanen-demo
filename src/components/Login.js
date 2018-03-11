import React, { Component } from 'react';
import 'glamor/reset';
import glamorous from 'glamorous';

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
                backgroundImage: 'radial-gradient(rgb(16, 152, 206), rgb(0, 0, 0) 90%)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                '& div': flexCenter,
                '& a': flexCenter
                
        })
            , Logo = glamorous.div({
                width: '40%',
                height: '20vh',
                backgroundColor: 'grey',
                borderRadius: '25px', 
                boxShadow: '0 14px 28px 0 rgba(0, 0, 0, 0.25), 0 10px 10px 0 rgba(0, 0, 0, 0.26)'
            })
            , LoginButton = glamorous.a({
                height: '10vh',
                width: '15%',
                borderRadius: '10px',
                backgroundColor: 'blue',
                marginTop: '200px',
                boxShadow: '0 10px 20px 0 rgba(0,0,0,0.1), 0 6px 6px 0 rgba(0,0,0,0.2)',
                cursor: 'pointer',
                textDecoration: 'none',
                color: 'black'
            })
        return (
            <Background>
                <Logo >
                    This is the Logo
                </Logo>

                <LoginButton href='http://localhost:9000/auth/'>
                    Log in button
                </LoginButton>
            </Background>
        )
    }
}

