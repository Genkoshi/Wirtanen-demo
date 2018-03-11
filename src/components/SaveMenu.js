import React from 'react';
import 'glamor/reset';
import glamorous from 'glamorous';

export default function SaveMenu(){
    const Wrapper = glamorous.div({
        visibility: 'hidden',
        opacity: 0,
        backgroundColor: '#db1e1e',
        height: '450px',
        width: '360px',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        borderRadius: '20px',
        borderTopRightRadius: '0',
        position: 'absolute',
        transition: 'visibility .4s linear, opacity .4s linear',
        top: '60px',
        right: '20px',
        cursor: 'default'
    })
    return (
        <Wrapper>

        </Wrapper>
    )
}