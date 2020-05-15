import React, { Component } from 'react';
import firebase from '../../../Firebase';
import './Cheques.css';

class Cheques extends  Component {



  render (){
    return (

      <div class='container-back'>
      <div class='site'>
      <p class='site-s'>Cheques</p>
      </div>

      <div class='caja-container'>
        <div class='caja-inputs'>
        <div class='caja-inputs-c'>
          <div class='input-row'>

        <p class='p-caja'>Numero de Cheque</p>
        <input></input>

        </div>

        <div>
        <label class='input-row' >Importe</label>
        <input></input>
        </div>





        <div>
        <label>Fecha de Emisión</label>
        <input></input>
        </div>

        <div>
        <label>Fecha de Cobro</label>
        <input></input>
        </div>
        </div>
        </div>
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
