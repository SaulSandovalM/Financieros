import React, { Component } from 'react';
import './Presupuesto.css';

class Presupuesto extends Component {
  render() {
    return (
      <div className='pcontainer'>
        <div className='p-t'>
          <h1>Carga De Presupusto 2020</h1>
        </div>
        <div>
        <button>DERCARGAR</button>
        </div>

        <div>
              <label>Archivo<input type="text" name="name" /></label>
              <button>Buscar</button>

        </div>

        <div>
              <label>Presupusto (PDF)<input type="text" name="name" /></label>
              <button>Buscar </button>
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

export default Presupuesto;
