import React, { Component } from 'react';
import './Altas.css';

export default class RowComponent extends Component {
  constructor(props){
     super(props);
     this.state = {
       done: false,
       item: 'Atendido',
     };
   }

  render() {
    return (
      <div class='caja-inputs'>
        <div class='tabla-pp'>
        </div>
        <div class='tabla-p'>
          <p>{this.props.item.numero}</p>
        </div>
        <div class='tabla-p1'>
          <p>{this.props.item.nombre}</p>
        </div>
        <div class='tabla-p2'>
          <p></p>
        </div>
        <div class='tabla-p3'>
          <p></p>
        </div>
        <div class='tabla-p4'>
          <p></p>
        </div>
        <div class='tabla-p5'>
          <p></p>
        </div>
        <div class='tabla-p6'>
          <p></p>
        </div>
        <div class='tabla-pp2'>
        </div>
      </div>
    );
  }
}
