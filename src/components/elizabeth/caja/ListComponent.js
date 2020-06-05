import React, { Component } from 'react';
import './Caja.css';
import RowComponent from './RowComponent';
import firebase from '../../../Firebase';

export default class ListComponent extends Component {
  constructor (props) {
   super(props);
   this.state = {
     cheques: [],
   };
 }

  componentWillMount () {
    firebase.database().ref('cheques/').on('child_added', snapshot => {
      this.setState({
        cheques: this.state.cheques.concat(snapshot.val())
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
            <b>#</b>
          </div>
          <div className='table-c-importe'>
            <b>IMPORTE</b>
          </div>
          <div className='table-c-fechae'>
            <b>FECHA DE EMISION</b>
          </div>
          <div className='table-c-fechae'>
            <b>FECHA DE COBRO</b>
          </div>
          <div className='table-right'>
          </div>
        </div>
        {
          this.props.lista.map(item =>
            <RowComponent
              key={item.id}
              item={item}
            />
          )
        }
      </div>
    );
  }
}
