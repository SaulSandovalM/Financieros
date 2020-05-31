import React, { Component } from 'react';
import './Presupuesto.css';
import RowFondo from './RowFondo';
import firebase from '../../../Firebase';

export default class ListFondo extends Component {
  constructor (props) {
   super(props);
   this.state = {
     banco: [],
   };
 }

  componentWillMount () {
    firebase.database().ref('banco/').on('child_added', snapshot => {
      this.setState({
        banco: this.state.banco.concat(snapshot.val())
      });
    });
  }

  render() {
    return (
      <div>
        <div className='cheques-inputs'>
          <div className='table-left'>
          </div>
          <div className='table-c-num'>
            <b>UP</b>
          </div>
          <div className='table-c-importe'>
            <b>PARTIDA</b>
          </div>
          <div className='table-c-fechae'>
            <b>PROYECTO</b>
          </div>
          <div className='table-c-fechae'>
            <b>IMPORTE</b>
          </div>
          <div className='table-right'>
          </div>
        </div>
        {
          this.props.listafondo.map(item =>
            <RowFondo
              key={item.id}
              item={item}
            />
          )
        }
      </div>
    );
  }
}
