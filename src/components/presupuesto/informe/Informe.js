import React, { Component } from 'react'

export default class Informe extends Component {
  constructor() {
    super()
    this.state = {

    }
  }

  render () {
    return (
      <div style={{ marginTop: '80px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
          <div>Mes</div>
          <div>Año</div>
          <div>Rm</div>
          <div>Ur</div>
          <div>Up</div>
          <div>Rubro</div>
          <div>Ogasto</div>
          <div>Prog</div>
          <div>Proy</div>
          <div>Obra</div>
          <div>Num. Contrarecibo</div>
          <div>Num. Cuenta por pagar</div>
          <div>Fecha de Contrarecibo</div>
          <div>Num. de Sujeto Contable</div>
          <div>Cuenta por pagar para</div>
          <div>Tipo de Beneficiario</div>
          <div>Nombre Beneficiario</div>
          <div>Total de recurso</div>
          <div>Tipo de Proveedor</div>
          <div>Nombre de la persona</div>
          <div>RFC</div>
          <div>Fecha de CFDI</div>
          <div>Folio</div>
          <div>Importe de CFDI</div>
          <div>Tipo de pago</div>
          <div>Numero de fondo</div>
        </div>
      </div>
    )
  }
}
