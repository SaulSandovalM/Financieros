import React, { Component } from 'react';
import firebase from '../../../Firebase';
import './Cheques.css';

class Cheques extends  Component {



  render (){
    return (

      <div>
      <div>
      <h1>Cheques</h1>
      </div>

        <div>
        <label>Numero de Cheque</label>
        <input></input>
        <label>Importe</label>
        <input></input>
        <label>Fecha de Emisión</label>
        <input></input>
        <label>Fecha de Cobro</label>
        <input></input>
        </div>

        <div>
        <h3> Ingrese Comprobantes</h3>
        <label>Cheque</label>
        <input></input>
        <button>Selecionar Archivo</button>
        </div>
        



      </div>
    );
  }
}
export default Cheques;
