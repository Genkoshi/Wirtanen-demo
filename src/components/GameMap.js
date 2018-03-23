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

class GameMap extends Component{

    constructor(){
        super()

        this.mapTheme = new Audio(mapMusic);
        this.mapTheme.loop = true;
        this.mapTheme.volume = 0.2;
        this.mapTheme.currentTime = 11.5;
    }

    componentWillMount(){
        
        this.props.getSaves(this.props.user.id);
        this.mapTheme.play()
    }

    componentWillUnmount(){
        this.mapTheme.pause();
    }
    
    componentSelect = (name) => {
        switch(name){
            case 'MainCharacter':
                return MainCharacter
            case 'Miya':
                return {
                    backgroundColor: 'pink',
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
            default: return {};
        }       
    }
        
    render(){
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
            // backgroundColor: 'black',
        })
        const MapGrid = glamorous.div({
            height: '645px',
            color: 'white',
            // padding: '20px',
            width: '860px',
            // marginLeft: '20%',
            display: 'grid',
            // marginTop: '100px',
            // transform: 'rotate(-6deg)',
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
                {/* <Div css={{opacity: '.5', gridArea: 'aa', backgroundColor: 'blue'}}></Div>
                <Div css={{opacity: '.5', gridArea: 'bb', backgroundColor: 'purple'}}></Div>
                <Div css={{opacity: '.5', gridArea: 'cc', backgroundColor: 'green'}}></Div>
                <Div css={{opacity: '.5', gridArea: 'dd', backgroundColor: 'yellow'}}></Div>
                <Div css={{opacity: '.5', gridArea: 'ee', backgroundColor: 'pink'}}></Div>
                <Div css={{opacity: '.5', gridArea: 'ff', backgroundColor: 'orange'}}></Div>
                <Div css={{opacity: '.5', gridArea: 'gg', backgroundColor: 'brown'}}></Div>
                <Div css={{opacity: '.5', gridArea: 'hh', backgroundColor: 'black'}}></Div>
                <Div css={{opacity: '.5', gridArea: 'ii', backgroundColor: 'gray'}}></Div>
                <Div css={{opacity: '.5', gridArea: 'jj', backgroundColor: 'lime'}}></Div>                                */}
                {console.log(this.props)}
            </MapGrid>
            {/* <div className={backMap} />needs to be H:655 W:1520 */}
            {console.log(this.props.gender)}
            </div>
        )
    }
}


function mapStateToProps(state){
    return {
        gridArea: state.game.gridArea,
        user: state.save.user,
        gender: state.game.gender
    };
}

export default connect(mapStateToProps, {getSaves})(withRouter(GameMap))