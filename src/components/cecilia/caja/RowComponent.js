import React, { Component } from 'react';
import './Caja.css';

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
      <div class='cheques-inputs'>
        <div class='table-left'>
        </div>
        <div class='table-c-num'>
          <p>{this.props.item.numCheque}</p>
        </div>
        <div class='table-c-importe'>
          <p>{this.props.item.importe}</p>
        </div>
        <div class='table-c-fechae'>
          <p>{this.props.item.fechaE}</p>
        </div>
        <div class='table-c-fechae'>
          <p>{this.props.item.fechaC}</p>
        </div>
        <div class='table-right'>
        </div>
      </div>
    );
  }
}
