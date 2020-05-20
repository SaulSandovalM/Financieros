import React, { Component } from 'react';
import './Cheques.css';
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
    firebase.database().ref('Caja/').on('child_added', snapshot => {
      this.setState({
        caja: this.state.caja.concat(snapshot.val())
      });
    });
  }

  render() {
    return (
      <div>
        <div class='caja-inputs'>
          <div class='tabla-pp'>
          </div>
          <div class='tabla-p'>
            <b>#</b>
          </div>
          <div class='tabla-p1'>
            <b>MONTO</b>
          </div>
          <div class='tabla-p2'>
            <b>FECHA CREACIÓN</b>
          </div>
          <div class='tabla-p3'>
            <b>FECHA EDICIÓN</b>
          </div>
          <div class='tabla-p4'>
            <b>ESTATUS</b>
          </div>
          <div class='tabla-p5'>
            <b>USUARIO</b>
          </div>
          <div class='tabla-p6'>
            <b>BANCO</b>
          </div>
          <div class='tabla-pp2'>
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
