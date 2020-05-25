import React, { Component } from 'react';
import './Banco.css';
import RowComponent from './RowComponent';
import firebase from '../../../Firebase';

export default class ListComponent extends Component {
  constructor (props) {
   super(props);
   this.state = {
     caja: [],
   };
 }

  componentWillMount () {
    firebase.database().ref('caja/').on('child_added', snapshot => {
      this.setState({
        caja: this.state.caja.concat(snapshot.val())
      });
    });
  }

  render() {
    return (
      <div>
        <div className='banco-inputs-list'>
          <div className='table-left'>
          </div>
          <div className='table-banco-up'>
            <b>UP</b>
          </div>
          <div className='table-banco-partida'>
            <b>PARTIDA</b>
          </div>
          <div className='table-banco-proyecto'>
            <b>PROYECTO</b>
          </div>
          <div className='table-banco-nombre'>
            <b>NOMBRE DEL PROYECTO</b>
          </div>
          <div className='table-banco-monto'>
            <b>MONTO</b>
          </div>
          <div className='table-banco-porcentaje'>
            <b>PORCENTAJE</b>
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
