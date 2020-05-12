import React, { Component } from 'react';
import './Altas.css';
import RowComponent from './RowComponet';
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
          <div class='tabla-p1-banco'>
            <b>UP</b>
          </div>
          <div class='tabla-p2-banco'>
            <b>PROYECTO</b>
          </div>
          <div class='tabla-p3-banco'>
            <b>DESCRIPCIÓN</b>
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
