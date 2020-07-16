import React, { Component } from 'react';
import './Disponible.css';

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
        <div className='table-dis-up'>
          <p className='p-meses-row'>{this.props.item.up}</p>
        </div>
        <div className='table-dis-up'>
          <p className='p-meses-row'>{this.props.item.rubro}</p>
        </div>
        <div className='table-dis-up'>
          <p className='p-meses-row'>{this.props.item.par}</p>
        </div>
        <div className='table-dis-up'>
          <p className='p-meses-row'>{this.props.item.abr}</p>
        </div>
        <div className='table-right'>
        </div>
      </div>
    );
  }
}
