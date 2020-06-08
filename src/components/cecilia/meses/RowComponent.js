import React, { Component } from 'react';
import './Meses.css';

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
      <div className='meses-container-row'>
        <div className='table-left'>
        </div>
        <div className='table-meses'>
          <p className='p-meses-row'>UNIDAD</p>
        </div>
        <div className='table-meses'>
          <p className='p-meses-row'>PROYECTO</p>
        </div>
        <div className='table-meses'>
          <p className='p-meses-row'>PARTIDA</p>
        </div>
        <div className='table-meses'>
          <p className='p-meses-row'>CONCEPTO</p>
        </div>
        <div className='table-meses'>
          <p className='p-meses-row'>MES</p>
        </div>
        <div className='table-meses'>
          <p className='p-meses-row'>ASIGNADO</p>
        </div>
        <div className='table-meses'>
          <p className='p-meses-row'>GASTO</p>
        </div>
        <div className='table-meses'>
          <p className='p-meses-row'>SALDO</p>
        </div>
        <div className='table-meses'>
          <p className='p-meses-row'>DISPONIBILIDAD</p>
        </div>
        <div className='table-right'>
        </div>
      </div>
    );
  }
}
