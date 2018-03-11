import React from 'react';
import {connect} from 'react-redux';
import 'glamor/reset';
import {css} from 'glamor';
import {updateFirst, updateLast} from '../ducks/game_reducer';

function CharacterName(props){
    const {updateFirst, updateLast} = props;
    const label = css({
        marginRight: '10px'
    })
    const wrapper = css({
        display: 'flex',
    })
    const flex = css({
        display: 'flex',
        flexDirection: 'column',
    })
    const fRow = {
        flexDirection: 'row',
        marginLeft: '20px'
    }
    const inputStyle = css({
        border: 0,
        outline: 0,
        background: 'transparent',
        borderBottom: '2px solid white',
        color: 'white',
        background: 'none',
        textAlign: 'center'
    })
    return (
        <div className={`${flex}`} >
        <section style={{fontSize: '100px', marginBottom: '50px'}} >Name</section>
        <div className={`${wrapper}`}>
            <div className={`${flex}` } style={fRow} >
                <section className={`${label}`} >First:</section>
                <input className={`${inputStyle}`} size='10' maxLength='10' value={props.firstName} onChange={e =>  updateFirst(e.target.value)} type='text'></input>
           </div>
           <div className={`${flex}`} style={fRow} >
                <section className={`${label}`  } >Last:</section>
                <input className={`${inputStyle}`} size='10' maxLength='10' value={props.lastName} onChange={e => updateLast(e.target.value)} type='text'></input>
            </div>
        </div>
        </div>
    )
}

let actions = {
    updateFirst,
    updateLast
}

function mapStateToProps(state){
    return {
        firstName: state.firstName,
        lastName: state.lastName
    }
}

export default connect(mapStateToProps, actions)(CharacterName);