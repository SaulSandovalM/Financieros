import React, { Component } from 'react'
import firebase from '../../../Firebase'

export default class Informe extends Component {
  constructor () {
    super()
    this.state = {
      fondos: []
    }
  }

  componentDidMount () {
    const itemsRefFondos = firebase.database().ref('fondos/').orderByChild('fondo').limitToLast(5)
    this.listenFondos(itemsRefFondos)
  }

  listenFondos = (itemsRefFondos) => {
    itemsRefFondos.on('value', (snap) => {
      var lista = []
      snap.forEach((child) => {
        lista.push({
          fondo: child.val().fondo,
          tipo_doc: child.val().tipo_doc,
          no_lici: child.val().no_lici,
          importe: child.val().importe,
          beneficiario: child.val().beneficiario,
          realizo: child.val().realizo,
          numCheque: child.val().numCheque,
          fechaContra: child.val().fechaContra,
          fechaDepo: child.val().fechaDepo,
          numContra: child.val().numContra,
          cuentaPagar: child.val().cuentaPagar,
          cuentaPagarPara: child.val().cuentaPagarPara,
          comprometido: child.val().comprometido,
          id: child.key
        })
      })
      this.setState({
        fondos: lista
      })
    })
  }

  render () {
    console.log(this.state.fondos.map(item => item.comprometido))
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
          <div>Beneficiario</div>
          <div>Total Recurso</div>
          <div>Tipo de Proveedor</div>
          <div>Nombre de la Persona</div>
          <div>RFC</div>
          <div>Fecha de CFDI</div>
          <div>Folio</div>
          <div>Importe de CFDI</div>
          <div>Tipo de Pago</div>
          <div>Fondo</div>
        </div>
        <div>
          {this.state.fondos.map(fondos =>
            fondos.comprometido.length &&
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
              <div>Mes</div>
              <div>2021</div>
              <div>Rm</div>
              <div>Ur</div>
              <div>Up</div>
              <div>Rubro</div>
              <div>Ogasto</div>
              <div>Prog</div>
              <div>Proy</div>
              <div>Obra</div>
              <div>{fondos.numContra}</div>
              <div>{fondos.cuentaPagar}</div>
              <div>Fecha de Contrarecibo</div>
              <div>Num. de Sujeto Contable</div>
              <div>{fondos.cuentaPagarPara}</div>
              <div>F/M</div>
              <div>Beneficiario</div>
              <div>Total Recurso</div>
              <div>F/M</div>
              <div>{fondos.beneficiario}</div>
              <div>RFC</div>
              <div>Fecha de CFDI</div>
              <div>Folio</div>
              <div>Importe de CFDI</div>
              <div>{fondos.tipo_doc}</div>
              <div>{fondos.fondo}</div>
            </div>
          )}
        </div>
      </div>
    )
  }
}
