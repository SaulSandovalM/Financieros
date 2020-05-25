import React, { Component } from 'react';
import './Cheques.css';

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
          <b>{this.props.item.numCheque}</b>
        </div>
        <div class='table-c-importe'>
          <b>{this.props.item.importe}</b>
        </div>
        <div class='table-c-fechae'>
          <b>{this.props.item.fechaE}</b>
        </div>
        <div class='table-c-fechae'>
          <b>{this.props.item.fechaC}</b>
        </div>
        <div class='table-right'>
        </div>
      </div>
    );
  }
}
