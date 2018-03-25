import React, {Component} from 'react';
import 'glamor/reset';
import glamorous, {Div} from 'glamorous';
import {connect} from 'react-redux';
import MainCharacter from './MainCharacter';
import Navbar from './Navbar';
import {css} from 'glamor';
import map from './art/map-no-back.png';
import {withRouter} from 'react-router-dom';
import {getSaves} from '../ducks/save_reducer';
import mapMusic from './music/map-theme.mp3';
import maleChar from './art/male-protag.png';
import femaleChar from './art/female-protag.png';
//replace this later:
import charPlaceholder from './art/female-protag.png';

class GameMap extends Component{

    constructor(props){
        super(props)

        this.mapTheme = new Audio(mapMusic);
        this.mapTheme.loop = true;
        this.mapTheme.currentTime = 11.5;
        this.mapTheme.autoplay = true;
    }

    componentWillMount(){
        this.props.getSaves(this.props.user.id);
    }

    componentWillUnmount(){
        this.mapTheme.pause();
    }
    
    componentSelect = (name) => {
        let character = {
                    background: 'red',
                    backgroundSize: 'contain',
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '70px',
                    height: '120px', 
                    ':hover':{
                        cursor: 'pointer',
                    }
                }
        switch(name){
            case 'MainCharacter':
                return this.props.gender === 'male'
                            ? Object.assign({}, character, {background: `url(${maleChar}) no-repeat center`})
                            : Object.assign({}, character, {background: `url(${femaleChar}) no-repeat center`})

            case 'unknown':
                return this.props.gender !== 'male'
                            ? Object.assign({}, character, {background: `url(${maleChar}) no-repeat center`})
                            : Object.assign({}, character, {background: `url(${femaleChar}) no-repeat center`})

            case 'Miya':
                return Object.assign({}, character, {background: `url(${charPlaceholder}) no-repeat center`})
            
            default: return {};
        }       
    }
        
    render(){
        this.mapTheme.muted = this.props.musicMute;
        this.mapTheme.volume = (this.props.musicVol/10); 
        let {gridArea} = this.props
        const backMap = css({
            height: '655px',
            width: '100vw',
            zIndex: '-20',
            position: 'absolute',
            top:'79px',            
            backgroundImage: `url(${map})`,
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            display: 'inline-block',
        })
        const MapGrid = glamorous.div({
            height: '645px',
            color: 'white',
            width: '860px',
            display: 'grid',
            zIndex: '-10',
            gridTemplateAreas:`
            ".. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .."
            ".. aa aa aa aa aa .. .. dd dd .. .. .. .. .. .. .."
            ".. aa aa aa aa aa .. .. dd dd .. .. .. .. .. .. .."
            ".. aa aa aa aa aa .. .. dd dd .. .. .. .. .. .. .."
            ".. aa aa aa aa aa ee ee ee .. .. .. .. ii ii ii ii"
            ".. aa aa aa aa aa ee ee ee gg gg gg gg ii ii ii ii"
            ".. .. .. bb bb bb bb ff ff gg gg gg gg ii ii ii ii"
            ".. .. .. bb bb bb bb ff ff gg gg gg gg ii ii ii ii"
            ".. .. .. bb bb bb bb ff ff gg gg gg gg .. .. .. .."
            ".. .. .. cc cc cc cc .. .. .. .. hh hh jj jj .. .."
            ".. .. .. cc cc cc cc .. .. .. .. hh hh jj jj .. .."            
            ".. .. .. cc cc cc cc .. .. .. .. hh hh jj jj .. .."            
            ".. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .."                        
            `,
        })
        const center = css({
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        })

        
        return (
            <div className={`${backMap} ${center}`} >
                <Navbar style={{zIndex: '10'}} />
            <MapGrid>
                {
                    gridArea.map((area, index) => {
                        let character = this.componentSelect(area.name);
                        return (
                            <Div key={index} className={`${center}`} css={{position: 'relative', gridArea: area.position}}>
                                <Div onClick={() => this.props.history.push(`/scene/${area.name}`)} css={character} />
                                {console.log(area.name)}
                            </Div>
                        )
                    })
                }
            </MapGrid>
            {/* <div className={backMap} />needs to be H:655 W:1520 */}
            {console.log(this.props.name)}
            {console.log(this.props.gender)}
            </div>
        )
    }
}


function mapStateToProps(state){
    return {
        gridArea: state.game.gridArea,
        user: state.save.user,
        gender: state.game.gender,
        musicVol: state.game.musicVolume, 
        musicMute: state.game.musicMute,
        name: `${state.game.firstName} ${state.game.lastName}`
    };
}

export default connect(mapStateToProps, {getSaves})(withRouter(GameMap))