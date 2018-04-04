import React, {Component} from 'react';
import 'glamor/reset';
import glamorous from 'glamorous';
import {connect} from 'react-redux';
import {getUser} from '../ducks/save_reducer';
import {Redirect} from 'react-router-dom';

class Loading extends Component{


    componentWillMount(){
        this.props.getUser()
}

    render(){
    let {user} = this.props;
    const Default = glamorous.div({
        backgroundColor: 'black',
        width: '100%',
        height: '100vh'
    })
    const {component: Component, ...rest} = this.props
    let afterAuthDone = () => {
        switch(true){
            case user === undefined:
                 return <Redirect to='/'/>;
            case user === null: 
                return <Default />;
            case !!user:
                 return <Component {...this.props}/> ;
            default: return <Redirect to='/' />;
            
        }
    }

    return (
        <div>
            {afterAuthDone()}
        </div>
    )
}
}

let actions = {
    getUser,
}

function mapStateToProps(state){
    return {
        user: state.save.user,
        gender: state.game.gender
    }
}

export default connect(mapStateToProps, actions)(Loading);