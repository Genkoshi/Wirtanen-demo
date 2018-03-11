import React, {Component} from 'react';
import 'glamor/reset';
import glamorous from 'glamorous';
import {connect} from 'react-redux';
import MainCharacter from './MainCharacter';
import Navbar from './Navbar';
import {css} from 'glamor';
import map from './art/Map.png';
import {withRouter} from 'react-router-dom';

class GameMap extends Component{

    componentWillMount(){
        document.body.style.cursor='default'
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
            height: 'calc(100vh - 80px)',
            width: '100%',
            zIndex: '-10',
            position: 'absolute',
            top:'80px',            
            backgroundImage: `url(${map})`,
            backgroundPosition: 'center',
            backgroundSize: 'auto',
            backgroundRepeat: 'no-repeat',
            backgroundColor: 'black',
        })
        const MyMapGrid = glamorous.div({
            height: 'calc(100vh - 100px)',
            color: 'white',
            boxSizing: 'border-box',
            padding: '20px',
            width: '40%',
            marginLeft: '20%',
            display: 'grid',
            marginTop: '100px',
            // transform: 'rotate(-6deg)',
            gridTemplateAreas:`
            "aa ab ac ad"
            "ba bb bc bd"
            "ca cb cc cd"
            `,
            '& > div':{
                backgroundColor: 'purple',
                height: '100px',
                width: '100px',
            },
        })
        return (
            <div>
                <Navbar />
            <MyMapGrid>
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
            </MyMapGrid>
            <div className={backMap} />{/*needs to be H:655 W:1520*/}
            {console.log(this.props.gender)}
            </div>

        )
    }
}


function mapStateToProps(state){
    return {
        gridArea: state.gridArea,
        user: state.user,
        gender: state.gender
    };
}

export default connect(mapStateToProps)(withRouter(GameMap))