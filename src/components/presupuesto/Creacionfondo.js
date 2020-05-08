import React, { Component } from 'react';
import './Presupuesto.css';

class Creacionfondo extends Component {
  render() {
    return (
      <div className='pcontainer'>
        <div className='p-t'>
          <h1>Creacion de Partida 2020</h1>
        </div>

        <div>
              <label> Numero de Partida<input type="text" name="name" /></label>
              <button>Buscar</button>
              </div>



        <div style={{flexDirection: 'column', display: 'flex', width: '800rem'}}>
            <div className='content'>
              <p className='need '><b>Unidad Presupuestal</b></p>
              <p className='need '><b>Proyecto</b></p>
              <p className='need '><b>Partida</b></p>
              <p className='need '><b>Concepto</b></p>
              <p className='need '><b>Asignado</b></p>
              <p className='need'><b>Gasto</b></p>
              <p className='need'><b>Saldo</b></p>
              <p className='need'><b>Observaciones</b></p>
              <p className='need'><b>Seleccionar </b></p>

            </div>
            </div>


        <div>
        <button>Cargar </button>
        </div>

        <div>
        </div>

  </div>
    );
  }
}

export default Creacionfondo;
