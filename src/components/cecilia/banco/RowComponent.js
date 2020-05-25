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
      <div className='banco-inputs-list'>
        <div className='table-left'>
        </div>
        <div className='table-banco-up'>
          <p>{this.props.item.up}</p>
        </div>
        <div className='table-banco-partida'>
          <p>{this.props.item.partida}</p>
        </div>
        <div className='table-banco-proyecto'>
          <p>{this.props.item.proyecto}</p>
        </div>
        <div className='table-banco-nombre'>
          <p>{this.props.item.np}</p>
        </div>
        <div className='table-banco-monto'>
          <p>{this.props.item.monto}</p>
        </div>
        <div className='table-banco-porcentaje'>
          <p>{this.props.item.porcentaje}</p>
        </div>
        <div className='table-right'>
        </div>
      </div>
    );
  }
}
