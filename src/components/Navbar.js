import React from 'react';
import 'glamor/reset';
import glamorous from 'glamorous';
import {css} from 'glamor';
import Menu from './Menu';
import SaveMenu from './SaveMenu';

export default class Navbar extends React.Component{
    
    render(){
    const center = css({
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    })
    const Navbar = glamorous.div({
        width: '100%',
        height: '80px',
        backgroundColor: '#ce42f4',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        paddingLeft: '20px',
        paddingRight: '20px',
        boxSizing: 'border-box'
    })
    const Logo = glamorous.img({
        height: '80px',
        width: '20%',
        backgroundColor: '#000',
    })
    const MenuButton = glamorous.div({
        height: '40px',
        width: '80px',
        backgroundColor: '#ff2828', 
        borderRadius: '10px',
        fontWeight: 'bold',
        cursor: 'pointer',
        userSelect: 'none',
        ':hover > div': {
            visibility: 'visible',
            opacity: 1,
        },
        ':hover':{
            borderRadius: '10px 10px 0 0',
        },
        transition: '.4s',
    })
    return (
        <Navbar>
            <div style={{display: 'inline-block', felxDirection: 'column'}} >
            <MenuButton className={`${center}`} >
                Menu
             <Menu />
            </MenuButton>
            </div>
            <Logo />
            <MenuButton className={`${center}`} >
                Save
                <SaveMenu />
            </MenuButton>
        </Navbar>
    )
}
}