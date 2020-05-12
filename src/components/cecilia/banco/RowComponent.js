import React, { Component } from 'react';
import './Banco.css';

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
        <div class='tabla-p1-banco'>
          <p>{this.props.item.monto}</p>
        </div>
        <div class='tabla-p2-banco'>
          <p>{this.props.item.fechaC}</p>
        </div>
        <div class='tabla-p3-banco'>
          <p>{this.props.item.fechaE}</p>
        </div>
        <div class='tabla-p4'>
          <p>{this.props.item.estatus}</p>
        </div>
        <div class='tabla-p5'>
          <p>{this.props.item.usuario}</p>
        </div>
        <div class='tabla-pp2'>
        </div>
      </div>
    );
  }
}
