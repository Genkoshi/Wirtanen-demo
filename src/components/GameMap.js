import React, {Component} from 'react';
import 'glamor/reset';
import glamorous, {Div} from 'glamorous';
import {connect} from 'react-redux';
import MainCharacter from './MainCharacter';
import Navbar from './Navbar';
import {css} from 'glamor';
import map from './art/map-no-back.png';
import {withRouter} from 'react-router-dom';
import {getSaves} from '../ducks/save_reducer'

class GameMap extends Component{

    componentWillMount(){
        this.props.getSaves(this.props.user.id)
    }
    
    componentSelect = (name) => {
        switch(name){
            case 'MainCharacter':
                return MainCharacter
            default: return 'div';
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
                    // gridArea.map((area, index) => {
                    //     let ConComp = this.componentSelect(area.name)
                    //     return (
                    //         <Div key={index} css={{opacity: .5, gridArea: area.position}}>
                    //             <ConComp />
                    //         </Div>
                    //     )
                    // })
                }
                <Div css={{opacity: '.5', gridArea: 'aa', backgroundColor: 'blue'}}></Div>
                <Div css={{opacity: '.5', gridArea: 'bb', backgroundColor: 'purple'}}></Div>
                <Div css={{opacity: '.5', gridArea: 'cc', backgroundColor: 'green'}}></Div>
                <Div css={{opacity: '.5', gridArea: 'dd', backgroundColor: 'yellow'}}></Div>
                <Div css={{opacity: '.5', gridArea: 'ee', backgroundColor: 'pink'}}></Div>
                <Div css={{opacity: '.5', gridArea: 'ff', backgroundColor: 'orange'}}></Div>
                <Div css={{opacity: '.5', gridArea: 'gg', backgroundColor: 'brown'}}></Div>
                <Div css={{opacity: '.5', gridArea: 'hh', backgroundColor: 'black'}}></Div>
                <Div css={{opacity: '.5', gridArea: 'ii', backgroundColor: 'gray'}}></Div>
                <Div css={{opacity: '.5', gridArea: 'jj', backgroundColor: 'lime'}}></Div>                               

            </MapGrid>
            {/* <div className={backMap} />needs to be H:655 W:1520 */}
            {console.log(this.props.gender)}
            </div>
        )
    }
}


function mapStateToProps(state){
    return {
        gridArea: state.gridArea,
        user: state.save.user,
        gender: state.game.gender
    };
}

export default connect(mapStateToProps, {getSaves})(withRouter(GameMap))