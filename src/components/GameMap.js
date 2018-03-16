import React, {Component} from 'react';
import 'glamor/reset';
import glamorous from 'glamorous';
import {connect} from 'react-redux';
import MainCharacter from './MainCharacter';
import Navbar from './Navbar';
import {css} from 'glamor';
import map from './art/map.png';
import {withRouter} from 'react-router-dom';

class GameMap extends Component{
    
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
            width: '1520px',
            zIndex: '-10',
            position: 'absolute',
            top:'79px',            
            backgroundImage: `url(${map})`,
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundColor: 'black',
        })
        const MapGrid = glamorous.div({
            height: '655px',
            color: 'white',
            boxSizing: 'border-box',
            // padding: '20px',
            width: '40%',
            // marginLeft: '20%',
            display: 'grid',
            // marginTop: '100px',
            // transform: 'rotate(-6deg)',
            gridTemplateAreas:`
            "aa ab ac ad"
            "ba bb bc bd"
            "ca cb cc cd"
            `,
            '& > div':{
                backgroundColor: 'purple',
                height: '50px',
                width: '100px',
            },
        })
        return (
            <div className={`${backMap}`} >
                <Navbar />
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

export default connect(mapStateToProps)(withRouter(GameMap))