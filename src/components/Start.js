import React, {Component} from 'react';
import 'glamor/reset';
import {css} from 'glamor';
import glamorous from 'glamorous';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {getMostRecent, getSaves} from '../ducks/save_reducer.js';
import {withRouter} from 'react-router-dom';


class Start extends Component{
    constructor(){
        super()

        this.state = {
            menuItemColor: ['black', 'black', 'black', 'black', 'black']
        }
    }

    componentWillMount(){
        this.props.getSaves(this.props.user.id)
    }

    menuItemWhite(index){
        let newColor = this.state.menuItemColor;
        newColor[index] = 'white';
        this.setState({
            menuItemColor: newColor
        })
    }
    menuItemBlack(index){
        let newColor = this.state.menuItemColor;
        newColor[index]= 'black';
        this.setState({
            menuItemColor: newColor
        })
    }

    render(){
        const {getMostRecent, user} = this.props;
        const flexCenter = css({
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
        })
        const Background = glamorous.div({
            backgroundColor: 'black',
            height: '100vh',
            width: '100%',
        })

        const MenuOptions = glamorous.div({
            height: 'calc(90% - 200px)',
            width: '45%',
            backgroundColor: 'red',
            fontSize: '50px',
            fontWeight: 'bold',
            display: 'flex',
            borderRadius: '25px',
        })
        const Logo = glamorous.div({
            width: '45%',
            height: '150px',
            backgroundColor: 'gray',
            borderRadius: '10px',
            marginBottom: '25px',
            fontSize: '100px',
        })

        const MenuItem = glamorous.li({
            listStyle: 'none',
            marginBottom: '20px',
            cursor: 'pointer',
            userSelect: 'none',
        })
        return(
            <Background className={`${flexCenter}`}>
                    <Logo className={`${flexCenter}`} >LOGO</Logo>
                    <MenuOptions className={`${flexCenter}`}>
                            {typeof this.props.saves !== 'undefined' && this.props.saves.length > 0 ?
                            <MenuItem onMouseUp={() => { getMostRecent(user.id).then(res => this.props.history.push('/map'))}} >Continue</MenuItem>
                            : null}
                            
                            <MenuItem style={{color: this.state.menuItemColor[1]}} onMouseDown={() => this.menuItemWhite(1)} onMouseLeave={()=>this.menuItemBlack(1)} onMouseUp={() => {this.menuItemBlack(1); this.props.history.push('/prologue')}} >New Game</MenuItem>

                            {typeof this.props.saves !=='undefined' && this.props.saves.length > 0 ? 
                            <MenuItem>Load</MenuItem>
                            : null}

                            <MenuItem>Options</MenuItem>

                            <a style={{textDecoration: 'none', color: 'black'}} href='http://localhost:9000/auth/logout' ><MenuItem>Exit</MenuItem></a>
                    </MenuOptions>
                    {console.log(this.props.user, this.props.saves)}
            </Background>
        )
    }
}
let actions = {
    getMostRecent,
    getSaves
}
function mapStateToProps(state){
     return {
         user: state.save.user,
         saves: state.save.saves
     }
}

export default connect(mapStateToProps, actions)(withRouter(Start))