import React, {Component} from 'react';
import 'glamor/reset';
import {css} from 'glamor';
import glamorous from 'glamorous';
import CharacterName from './CharacterName';
import CharSelect from './CharSelect';
import {connect} from 'react-redux';


class Prologue extends Component{
    constructor(){
        super()

        this.state = {
            dialoguePlace: 0,
            dialogue : [
                <div>This is the prologue...</div>,
                <div>Some more text goes here...</div>,
                <div>End of testing exposition!</div>,
                <CharacterName></CharacterName>,
                <CharSelect></CharSelect>

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
    onMouseDown = (event) => {
        if (this.state.dialoguePlace < 3){
            this.dialogueInc();
        }
    }
    canSubmit = (firstName, lastName) => {
        if(firstName.replace(/\s/g, '').length && lastName.replace(/\s/g, '').length){
        return {
            filter: 'brightness(100%)',
            width: '200px',
            height: '80px',
            fontSize: '45px',
            marginTop: '50px',
            cursor: 'pointer',
        }
    }else return {}
    }

    componentDidMount() {
        document.addEventListener("keydown", this.onKeyPress, false);
        document.addEventListener("mousedown", this.onMouseDown, false);
      }
      componentWillUnmount() {
        document.removeEventListener("keydown", this.onKeyPress, false);
        document.removeEventListener("mousedown", this.onMouseDown, false);
      }
    

    render(){
        const {firstName, lastName} = this.props;
        const {dialoguePlace, dialogue} = this.state;
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
        })

        const vignette = css({
            position:'absolute',
            width:'100%', 
            height:'100%',
            boxShadow:'inset 0px 0px 150px 40px black',
            mixBlendMode: 'multiply',
            animation: `${vignetteAnim} 4s infinite`, /* IE 10+, Fx 29+ */

        })
        const render = css({
            display: 'flex',
            zIndex: 10,
            alignItems: 'center',
            flexDirection: 'column',
            jutifyContent: 'center',
        })
        const SubmitButton = glamorous.div({
            width: '170px',
            height: '72px',
            backgroundColor: 'white',
            color: 'black',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: '40px',
            borderRadius: '20px',
            marginTop: '58px',
            filter: 'brightness(50%)',
            transition: '.5s',
            ':hover': this.canSubmit(firstName, lastName)
        })
        return (
            <main /*tabIndex='0' onKeyDown={this.onKeyPress}*/ className={`${mainContent}`}>

                <div className={`${render}`}>
                {dialogue[dialoguePlace]}
                {dialoguePlace === 3 ? 
                    <SubmitButton onClick={() => {
                        if(firstName.replace(/\s/g, '').length && lastName.replace(/\s/g, '').length){
                            this.dialogueInc()
                            }
                        }
                    } >SUBMIT</SubmitButton> : null }
                </div>

                <div className={`${vignette}`} ></div>
            </main>
        )
    }
}

function mapStateToProps(state){
    return {
        firstName: state.game.firstName,
        lastName: state.game.lastName
    }
}

export default connect(mapStateToProps)(Prologue)