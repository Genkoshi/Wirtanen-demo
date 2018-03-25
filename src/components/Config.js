import React from 'react';
import 'glamor/reset';
import glamorous from 'glamorous';
import {connect} from 'react-redux';
import {css} from 'glamor';
import {updateMusicVol, updateBGMVol, updateTextSpeed, updateMusicMute, updateBgmMute} from '../ducks/game_reducer';


class Config extends React.Component{
    sliderStyle = (toggled) => {
        let slider = css({
            appearance: 'none',
            width: '75%',
            height: '10px',
            backgroundColor: 'black',
            borderRadius:'25%',
            outline: 'none',
            opacity: 0.7,
            cursor: 'pointer',
            transition: '0.4s',
            filter: toggled ? 'brightness(50%)': 'brightness(1)',
            '::-webkit-slider-thumb':{
                appearance: 'none',
                width: '25px',
                height: '25px',
                borderRadius: '50%',
                backgroundColor: 'gold',
            },
            ':hover': {
                opacity: toggled ? 0.7 : 1
            },
            ':active': {
                opacity: toggled ? 0.7 : 1                
            }
        })
    return slider
}

    render(){
        const MuteButton = glamorous.div({
            padding: '5px',
            maxWidth: '10%',
            transition: '0.4s',
            display: 'inline-block',
            marginLeft: '5px',
            borderRadius: '10px',
            transition: '0.4s',
            ':hover': {
                filter: 'brightness(1.2)',
                cursor: 'pointer'
            }
        },
        ({toggled}) => ({
            backgroundColor: toggled ? 'gold' : 'black',
            color: toggled ? 'black' : 'gold',
        })
    ),
            wrapper = css({
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                height: '100%',
                justifyContent: 'space-between',
                alignItems: 'center',
                '& > div':{
                    width: '100%',
                    display: 'inline-block'
                }
            })
            const {musicVolume, bgmVolume, textSpeed, 
                   updateTextSpeed, updateBGMVol, updateMusicVol,
                   musicMute, bgmMute, updateMusicMute, updateBgmMute} = this.props

        return (
            <div className={`${wrapper}`}>
                <div>
                    <h3>Music</h3>
                    <input className={`${this.sliderStyle(musicMute)}`} onChange={(e) => musicMute ? null : updateMusicVol(e.target.value)} type='range' min='1' max='10' value={musicVolume} step='1' ></input>
                    <MuteButton onClick={() => updateMusicMute(!musicMute)} toggled={musicMute}>Mute</MuteButton>
                </div>
                <div>
                    <h3>BGM</h3>
                    <input className={`${this.sliderStyle(bgmMute)}`} onChange={(e) => bgmMute ? null : updateBGMVol(e.target.value)} type='range' min='1' max='10' value={bgmVolume} step='1' ></input>
                    <MuteButton onClick={() => updateBgmMute(!bgmMute)} toggled={bgmMute}>Mute</MuteButton>
                </div>
                <div>
                    <h3>Text Speed</h3> 
                    <input className={`${this.sliderStyle(false)}`} onChange={(e) => updateTextSpeed(e.target.value)} type='range' min='0' max='50' value={textSpeed} step='5' style={{direction: 'rtl'}} ></input>
                </div>
                {console.log(musicVolume/10)}
                {console.log(bgmVolume/10)}
                {console.log(textSpeed)}
                {console.log(this.props.musicMute)}
                {console.log(this.props.bgmMute)}
            </div>
        )
    }
}

let actions = {
    updateMusicVol,
    updateBGMVol, 
    updateTextSpeed,
    updateMusicMute,
    updateBgmMute
}

function mapStateToProps(state){
    return {
        musicVolume: state.game.musicVolume,
        musicMute: state.game.musicMute,
        bgmVolume: state.game.bgmVolume,
        bgmMute: state.game.bgmMute,
        textSpeed: state.game.textSpeed,

    }
}

export default connect(mapStateToProps, actions)(Config)