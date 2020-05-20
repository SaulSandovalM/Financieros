import React, { Component } from 'react';
import './Vales.css';
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
        <div class='caja-inputs'>
          <div class='tabla-pp'>
          </div>
          <div class='tabla-p'>
            <b>UP</b>
          </div>
          <div class='tabla-p1-banco'>
            <b>PARTIDA</b>
          </div>
          <div class='tabla-p2-select'>
            <b>PROYECTO</b>
          </div>
          <div class='tabla-p3-select'>
            <b>NOMBRE DEL PROYECTO</b>
          </div>
          <div class='tabla-p4'>
            <b>MONTO</b>
          </div>
          <div class='tabla-p5'>
            <b>PORCENTAJE</b>
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
