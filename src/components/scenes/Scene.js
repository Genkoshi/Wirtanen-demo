import React, { Component } from 'react';
import 'glamor/reset';
import glamorous, { Div } from 'glamorous';
import { connect } from 'react-redux';
import library from '../pics/library-2.jpg';
import Typed from 'react-typed';
import male from '../art/male-protag.png';
import female from '../art/female-protag.png';
import miya from '../art/miya.png';
import {updateChoices, updateGrid} from '../../ducks/game_reducer';
import sadMusic from '../music/sad-event.mp3';
import hvrSound from '../sounds/hover2.mp3';
import selected from '../sounds/select.mp3';
import {withRouter} from 'react-router-dom';




class Scene extends Component {
    constructor(props) {
        super(props)

        this.state = {
            dialoguePlace: 0,
            next: false,
            character: '',
            choice: 0,
        }
        
        this.choiceConfirm = new Audio(selected);
        this.choiceConfirm.volume = (this.props.state.bgmVolume/10);
        this.choiceConfirm.muted = this.props.state.bgmMute;
    }

    componentWillMount() {
        this.setState({
            dialoguePlace: 0,
            character: this.props.match.params.character,
        })
    }
    componentWillUnmount(){
    }

    dialogueInc = () => {
        this.setState({
            dialoguePlace: this.state.dialoguePlace + 1
        })
    }
    makeTrue = (event) => {
        if (event.key === 'Enter' || event.keyCode === 32) {
            this.setState({
                next: true
            })
            console.log(this.state.next)
        }
    }

    onKeyPress = (event) => {
        if (event.key === 'Enter' || event.keyCode === 32) {
            this.dialogueInc();
        }
    }
    removeKeyPress = () => {
        document.removeEventListener("keydown", this.onKeyPress, false);
    }
    addKeyPress = () => {
        document.addEventListener("keydown", this.onKeyPress, false);
    }

    practiceScene = (choices, character/*needs to be replaced with url param*/) => {
        let { firstName, lastName } = this.props.state;
        let removeListener = (dialoguePlace) => {
            if (this.state.dialoguePlace === dialoguePlace) {
                this.removeKeyPress();
            }
        }
        let TextBox = glamorous.div({
            width: '80%',
            position: 'absolute',
            bottom: '20px',
            height: '200px',
            backgroundColor: 'white',
            left: '50%',
            transform: 'translateX(-50%)',
            borderRadius: '10px',
            zIndex: '5',
            opacity: '.92',
            padding: '30px',
            fontSize: '30px',
            overflow: 'auto',
        });
        switch (choices) {
            case 0:
                switch (character) {
                    case 'Miya':
                        let optionOne = () => {
                            if (this.state.dialoguePlace === 3 ) {
                                document.addEventListener("keydown", this.makeTrue, false)
                                return(this.state.next ?
                                <div style={{zIndex: 10, position: 'absolute', top: 0, left: 0, height: '100vh', width: '100%'}} >
                                    <Div css={{
                                        zIndex: '20',
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        width: '100%',
                                        height: '100%',
                                        backgroundColor: 'black',
                                        opacity: '.5',
                                    }}></Div>
                                    <Div css={{
                                        position: 'absolute',
                                        zIndex: '30',
                                        padding: '50px',
                                        top: '50%',
                                        left: '50%',
                                        transform: 'translate(-50%, -50%)',
                                    }}>
                                        <Div onClick={() => {
                                                        this.setState({choice: 0.1});
                                                        this.props.updateGrid(
                                                        [{position: 'aa', name: 'MainCharacter'} ,{position: 'ff', name: ''} 
                                                        , {position: 'bb', name: ''} ,{position: 'gg', name: ''} 
                                                        , {position: 'cc', name: ''} ,{position: 'hh', name: ''} 
                                                        , {position: 'dd', name: ''} ,{position: 'ii', name: 'Miya'} 
                                                        , {position: 'ee', name: ''} ,{position: 'jj', name: ''}
                                                    ]); 
                                                        document.removeEventListener("keydown", this.makeTrue, false); 
                                                        this.addKeyPress(); 
                                                        this.dialogueInc();
                                                        this.choiceConfirm.play()
                                                    }} 
                                            onMouseEnter={() => {
                                                let hoverSound = new Audio(hvrSound);
                                                hoverSound.volume = (this.props.state.bgmVolume/10);
                                                hoverSound.muted = this.props.state.bgmMute;
                                                hoverSound.play();
                                            }}
                                            css={{
                                            marginBottom: '20px',
                                            backgroundColor: 'white',
                                            color: 'black',
                                            width: '600px',
                                            height: '60px',
                                            fontSize: '30px',
                                            borderRadius: '10px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            ':hover':{
                                                color: 'red',
                                                cursor: 'pointer',
                                            }
                                        }}>Choice 1</Div>
                                        <Div onClick={() => {
                                                    this.setState({choice: 0.2});                                                    
                                                    this.props.updateGrid(
                                                     [{position: 'aa', name: 'MainCharacter'} ,{position: 'ff', name: ''} 
                                                    , {position: 'bb', name: ''} ,{position: 'gg', name: ''} 
                                                    , {position: 'cc', name: ''} ,{position: 'hh', name: 'unknown'} 
                                                    , {position: 'dd', name: ''} ,{position: 'ii', name: ''} 
                                                    , {position: 'ee', name: ''} ,{position: 'jj', name: ''}
                                                ]); 
                                                    document.removeEventListener("keydown", this.makeTrue, false); 
                                                    this.addKeyPress(); 
                                                    this.dialogueInc();
                                                    this.choiceConfirm.play()
                                                }} 
                                                    onMouseEnter={() => {
                                                        let hoverSound = new Audio(hvrSound);
                                                        hoverSound.volume = (this.props.state.bgmVolume/10);
                                                        hoverSound.muted = this.props.state.bgmMute;
                                                        hoverSound.play();
                                                    }}
                                            css={{
                                            marginBottom: '20px',
                                            backgroundColor: 'white',
                                            color: 'black',
                                            width: '600px',
                                            height: '60px',
                                            fontSize: '30px',
                                            borderRadius: '10px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            ':hover':{
                                                color: 'red',
                                                cursor: 'pointer',
                                            }
                                        }}>Choice 2</Div>
                                    </Div>
                                </div>: null)
                            }
                        }
                        let miyaDialogue = [
                            <Typed
                                onStringTyped={() => {
                                    if (this.state.dialoguePlace) {
                                    } else { this.dialogueInc() }
                                }}
                                strings={[`some dialogue here involving ${firstName} ${lastName}`]}
                                typeSpeed={this.props.state.textSpeed}
                                showCursor={false}
                                startDelay={1000}
                            />,
                            `some dialogue here involving ${firstName} ${lastName}`,
                            <Typed
                                onStringTyped={() => {
                                    if (this.state.dialoguePlace === 2) {
                                        this.dialogueInc();

                                    }
                                }}
                                strings={[`This should probably be in it's own component per character...`]}
                                typeSpeed={this.props.state.textSpeed}
                                showCursor={false}
                            />,
                            `This should probably be in it's own component per character...`,
                            <Typed
                                onStringTyped={() => {
                                    if (this.state.dialoguePlace === 2) {
                                        this.dialogueInc();

                                    }
                                }}
                                strings={[`A choice has been made!`]}
                                typeSpeed={this.props.state.textSpeed}
                                showCursor={false}
                            />,
                            `A choice has been made!`,
                        ]; return (
                            <div>
                            {optionOne()}
                            {removeListener(3)}
                            {removeListener(6)}
                            <TextBox>
                                <div style={{ marginBottom: '15px', color: 'red' }} >{this.state.character}</div>
                                {miyaDialogue[this.state.dialoguePlace]}
                                {this.state.dialoguePlace === 6 ? this.props.history.push('/map') : null}
                            </TextBox>
                            </div>
                        )
                    default: return this.props.history.push('/map');
                }
            default: return this.props.history.push('/map');
        }
    }

    componentDidMount() {
        this.addKeyPress();
    }
    componentWillUnmount() {
        this.removeKeyPress();
        this.props.updateChoices(this.state.choice || this.props.state.choices)
    }

    render() {
        let try1 = this.practiceScene(this.props.state.choices, this.props.match.params.character);
        const Background = glamorous.div({
            backgroundImage: `url(${library})`,
            backgroundSize: 'cover',
            width: '100%',
            height: '100vh',
            position: 'relative',
            overflow: 'hidden',
        })
            , MainCharacter = glamorous.div({
                minHeight: '950px',
                minWidth: '800px',
                background: `url(${this.props.state.gender === 'male' ? male : female}) no-repeat center`,
                backgroundSize: 'contain',
                position: 'absolute',
                left: '-100px',
                bottom: '-210px'
            })
            , Suspect = glamorous.div({
                minHeight: '950px',
                minWidth: '800px',
                background: `url(${miya}) no-repeat center`,
                backgroundSize: 'contain',
                position: 'absolute',
                right: '-100',
                bottom: '-210px',
            });

        return (
            <Background>
                <MainCharacter></MainCharacter>
                <Suspect></Suspect>
                {try1}
            </Background>
        )
    }
}

let actions = {
    updateChoices,
    updateGrid
}

function mapStateToProps(state) {
    return {
        state: state.game
    }
}

export default connect(mapStateToProps, actions)(withRouter(Scene));