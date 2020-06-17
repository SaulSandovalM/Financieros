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

    var oficioA = this.props.item.oficioA;
    var oficioS = this.props.item.oficioS;
    var excel = this.props.item.excel;

    return (
      <div className='archivos-container-row'>
        <div className='table-left'>
        </div>
        <div className='table-archivos'>
          <p onClick={()=> window.open(oficioS, "_blank")}
            className='p-archivos-row-url'>
            {this.props.item.oficioSname}
          </p>
        </div>
        <div className='table-archivos'>
          <p onClick={()=> window.open(oficioA, "_blank")}
            className='p-archivos-row-url'>
            {this.props.item.oficioAname}
          </p>
        </div>
        <div className='table-archivos'>
          <p onClick={()=> window.open(excel, "_blank")}
            className='p-archivos-row-url'>
            {this.props.item.excelName}
          </p>
        </div>
        <div className='table-right'>
        </div>
      </div>
    );
  }
}
