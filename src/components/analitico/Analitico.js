import React from 'react';
import './Analitico.css';

function Analitico() {
  return (
    <div className="a-container">
      <h2 className="title">Analitico de Fondos</h2>
      <div className="row-a">
        <div className="col-a">
          <p>Mostrar</p>
          <input />
          <p>registros</p>
        </div>
        <div className="col-a">
          <p>Buscar</p>
          <input />
        </div>
      </div>
      {/*tabla*/}
      <div className="row-aa">
        <div className="a-14">
          Fondos
        </div>
        <div className="a-14">
          Fondos
        </div>
        <div className="a-14">
          Fondos
        </div>
        <div className="a-14">
          Fondos
        </div>
        <div className="a-14">
          Fondos
        </div>
        <div className="a-14">
          Fondos
        </div>
        <div className="a-14">
          Fondos
        </div>
      </div>
      {/**/}
      <div className="row-a">
        <div className="col-a">
          <p>Mostrando 0a0 de 0 coincidencias</p>
        </div>
        <div className="col-a">
          <button style={{height: '30px', marginRight: '10px'}}>Anterior</button>
          <button style={{height: '30px', marginRight: '10px'}}>Siguiente</button>
        </div>
      </div>

    </div>
  );
}

export default Analitico;
