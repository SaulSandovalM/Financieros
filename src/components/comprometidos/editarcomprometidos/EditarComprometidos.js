import React, { Component } from 'react';
import '../Comprometidos.css';

class EditarComprometidos extends Component {
  render() {
    return (
      <div className="edit-container">
        <div className="edit-com">
          <div>
            Comprometidos 2020
          </div>
          <div className="edit-row">
            <div>
              Fondos
            </div>
            <div>
              <input/>
            </div>
          </div>
          <div className="edit-row">
            <div>
              Fecha
            </div>
            <div>
              <input/>
            </div>
          </div>
          <div className="edit-row">
            <div>
              Nombre realizo
            </div>
            <div>
              <input/>
            </div>
          </div>
          <div className="edit-row">
            <div>
              Tipo de documento
            </div>
            <div>
              <input/>
            </div>
          </div>
          <div className="edit-row">
            <div>
              Importe
            </div>
            <div>
              <input/>
            </div>
          </div>
        </div>

        <div className="edit-tab-row">
          <div className="tabla-edit"> {/*select*/}
            Partida
          </div>
          <div className="tabla-edit"> {/*select*/}
            Unidad Presupuestal
          </div>
          <div className="tabla-edit"> {/*select*/}
            No. de Proyecto
          </div>
          <div className="tabla-edit">
            Importe
          </div>
          <div className="tabla-edit">
            ISR
          </div>
          <div className="tabla-edit">
            Total
          </div>
          <div className="tabla-edit">
            Fecha
          </div>
          <div className="tabla-edit">
            Aplicación
          </div>
        </div>
      </div>
    );
  }
}

export default EditarComprometidos;
