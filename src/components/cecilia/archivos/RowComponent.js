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
    return (
      <div className='archivos-container-row'>
        <div className='table-left'>
        </div>
        <div className='table-archivos'>
          <p
            onClick={()=> window.open(
              "https://firebasestorage.googleapis.com/v0/b/financieros-78cb0.appspot.com/o/pdfs%2FFinancieros.pdf?alt=media&token=c34be6d6-aeb3-46d3-bfd2-f6d9ea360ee5", "_blank")}
            className='p-archivos-row-url'>
            Presupuesto2020
          </p>
        </div>
        <div className='table-archivos'>
          <p className='p-archivos-row'>Oficio Solicitud</p>
        </div>
        <div className='table-archivos'>
          <p className='p-archivos-row'>Oficio Autroización</p>
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
