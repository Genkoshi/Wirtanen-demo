import React, {Component} from 'react';
import 'glamor/reset';
import {css} from 'glamor';
import CharacterName from './CharacterName';

export default class Prologue extends Component{
    constructor(){
        super()

        this.state = {
            dialoguePlace: 0,
            dialogue : [
                <div>This is the prologue...</div>,
                <div>Some more text goes here...</div>,
                <div>End of testing exposition!</div>,
                <CharacterName></CharacterName>
            ]
        }
    }
    dialogueInc = () => {
            this.setState({
                dialoguePlace: this.state.dialoguePlace + 1
            })
    }

    onKeyPress = (event) => {
            if((event.key === 'Enter' || event.keyCode === 32) && this.state.dialoguePlace < 3){
                this.dialogueInc();
            }
    }

    render(){
        const continueAnim = css.keyframes({
            '0%': {opacity: 0},
            '50%': {opacity: 1},
            '100%': {opacity: 0}
        })
        const bcontinue = css({
            height: '35px',
            width: '35px',
            backgroundColor: 'darkblue',
            borderRadius: '25px',
            cursor: 'pointer',
            animation: `${continueAnim} 1.8s infinite`, /* IE 10+, Fx 29+ */            
        })

        const vignetteAnim = css.keyframes({
            '0% , 100%':   { opacity: 1 },
            '50%': { opacity: 0.7 },
        })

        const mainContent = css({
            overflow:'hidden',
            outline: 'none',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            userSelect: 'none',
            justifyContent: 'center',
            flexFlow: 'column',
            height: '100vh',
            background: 'linear-gradient(90deg, rgba(36,31,31,1) 0%, rgba(36,31,31,1) 32%, rgba(74,71,70,1) 100%)',
            color: '#fff',
            textAlign: 'center',
            fontSize: '50px',
            fontFamily: 'Bellefair',
            ':focus': 'none'
        })

        const vignette = css({
            position:'absolute',
            width:'100%', 
            height:'100%',
            boxShadow:'inset 0px 0px 150px 40px black',
            mixBlendMode: 'multiply',
            animation: `${vignetteAnim} 4s infinite`, /* IE 10+, Fx 29+ */

        })
        return (
            <main autoFocus tabIndex='0' onKeyDown={this.onKeyPress} className={`${mainContent}`}>

                <div style={{
                    display: 'flex',
                    zIndex: 10,
                    alignItems: 'flex-end'
                }}>
                {this.state.dialogue[this.state.dialoguePlace]}
                { this.state.dialoguePlace < 3 ? 
                <section className={`${bcontinue}`} onClick={this.dialogueInc} ></section> : null}
                </div>

                <div className={`${vignette}`} ></div>
            </main>
        )
    }
}