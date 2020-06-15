import React, { Component } from 'react';
import './Registro.css';

export default class RowNoviembre extends Component {
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
        <div className='table-meses-up'>
          <p className='p-meses-row'>{this.props.item.up}</p>
        </div>
        <div className='table-meses-proy'>
          <p className='p-meses-row'>{this.props.item.proy}</p>
        </div>
        <div className='table-meses-par'>
          <p className='p-meses-row'>{this.props.item.ogasto}</p>
        </div>
        <div className='table-meses-con'>
          <p className='p-meses-row-con'>{this.props.item.np}</p>
        </div>
        <div className='table-meses-mes'>
          <p className='p-meses-row'>Noviembre</p>
        </div>
        <div className='table-meses-asig'>
          <p className='p-meses-row'>{this.props.item.nov}</p>
        </div>
        <div className='table-meses-gas'>
          <p className='p-meses-row'>{this.props.item.nov}</p>
        </div>
        <div className='table-meses-saldo'>
          <p className='p-meses-row'>{this.props.item.nov}</p>
        </div>
        <div className='table-meses-dis'>
          <p className='p-meses-row'>{this.props.item.nov}</p>
        </div>
        <div className='table-right'>
        </div>
      </div>
    );
  }
}
