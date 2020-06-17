import React, { Component } from 'react';
import './Archivos.css';

export default class RowComponent extends Component {
  constructor(props){
    super(props);
    this.state = {
      done: false,
      item: 'Atendido',
    };
  }

  render() {

    var lol = this.props.item.image
    return (
      <div className='archivos-container-row'>
        <div className='table-left'>
        </div>
        <div className='table-archivos'>
          <p
            onClick={()=> window.open(
              lol, "_blank")}
            className='p-archivos-row-url'>
            Presupuesto2020
          </p>
        </div>
        <div className='table-archivos'>
          <p className='p-archivos-row'>{this.props.item.displayName}</p>
        </div>
        <div className='table-archivos'>
          <p className='p-archivos-row'></p>
        </div>
        <div className='table-archivos'>
          <p className='p-archivos-row'>Excel</p>
        </div>
        <div className='table-right'>
        </div>
      </div>
    );
  }
}
