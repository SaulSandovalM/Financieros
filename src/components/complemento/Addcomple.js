import React, { Component } from 'react'
import firebase from '../../Firebase'
import './Complemento.css'

class Addcomple extends Component {
  constructor(props) {
    super(props)
    this.unsubscribe = null
    this.state = {
      key: '',
      fondo: '',
      fecha: '',
      realizo: '',
      tipo_doc: '',
      importe: '',
      fecha_actual: '',
      folio_ing: '',
      contrarecibo: '',
      fecha_contra: '',
      poliza: '',
      fecha_deposito: '',
      mes_pago: '',
      complemento: []
    }
  }

  onCollectionUpdate = (querySnapshot) => {
    const complemento = []
    querySnapshot.forEach((doc) => {
      const { fecha_actual, folio_ing, contrarecibo, fecha_contra, poliza, fecha_deposito, mes_pago } = doc.data()
      complemento.push({
        key: doc.id,
        doc,
        fecha_actual,
        folio_ing,
        contrarecibo,
        fecha_contra,
        poliza,
        fecha_deposito,
        mes_pago
      })
    })
    this.setState({
      complemento
   })
  }

  componentDidMount() {
    const ref = firebase.firestore().collection('fondos').doc(this.props.match.params.id)
    const updateRef = firebase.firestore().collection('fondos').doc(this.props.match.params.id).collection('complemento')
    this.unsubscribe = updateRef.onSnapshot(this.onCollectionUpdate)
    ref.get().then((doc) => {
      if (doc.exists) {
        const fondos = doc.data()
        this.setState({
          key: doc.id,
          fondo: fondos.fondo,
          fecha: fondos.fecha,
          realizo: fondos.realizo,
          tipo_doc: fondos.tipo_doc,
          importe: fondos.importe,
          fecha_actual: fondos.fecha_actual,
          folio_ing: fondos.folio_ing,
          contrarecibo: fondos.contrarecibo,
          fecha_contra: fondos.fecha_contra,
          poliza: fondos.poliza,
          fecha_deposito: fondos.fecha_deposito,
          mes_pago: fondos.mes_pago
        })
      } else {
        console.log("No se encuentra documento")
      }
    })
  }

  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value
    this.setState({fondos:state})
  }

  onSubmit = (e) => {
    e.preventDefault()

    const { fecha_actual, folio_ing, contrarecibo, fecha_contra, poliza, fecha_deposito, mes_pago } = this.state

    const updateRef = firebase.firestore().collection('fondos').doc(this.props.match.params.id).collection('complemento').doc()
    updateRef.set({
      fecha_actual,
      folio_ing,
      contrarecibo,
      fecha_contra,
      poliza,
      fecha_deposito,
      mes_pago
    }).then((docRef) => {
      this.setState({
        fecha_actual: '',
        folio_ing: '',
        contrarecibo: '',
        fecha_contra: '',
        poliza: '',
        fecha_deposito: '',
        mes_pago: ''
      })
    })
    .catch((error) => {
      console.error("Error adding document: ", error)
    })
  }

  render() {

    var today = new Date()
    var dd = today.getDate()
    var mm = today.getMonth()+1
    var yyyy = today.getFullYear()
    if ( dd < 10 ){
      dd = '0' + dd
    }
    if ( mm < 10 ){
      mm = '0' + mm
    }
    today = yyyy + '-' + mm + '-' + dd

    const { fecha_actual, folio_ing, contrarecibo, fecha_contra, poliza, fecha_deposito } = this.state

    return (
      <div class="container-edit" style={{marginTop: '50px'}}>
        <div className="comp-container">
          <div className="edit-com-comp">
            <div className="App-edit">
              <h1 style={{fontFamily: 'Arial'}}>Complemento de Pago</h1>
            </div>
            <div className="edit-row">
              <label for="fondo" className="tipo-tw" style={{fontFamily: 'Arial'}}>Fondo:</label>
              <input name="fondo" value={this.state.fondo} onChange={this.onChange} className="height-ct" disabled/>
            </div>
            <div className="edit-row">
              <label for="fecha" className="tipo-tw" style={{fontFamily: 'Arial'}}>Fecha:</label>
              <input name="fecha" value={this.state.fecha} onChange={this.onChange} className="height-ct" disabled/>
            </div>
            <div className="edit-row">
              <label for="realizo" className="tipo-tw" style={{fontFamily: 'Arial'}}>Nombre Realizo:</label>
              <input name="realizo" value={this.state.realizo} onChange={this.onChange} className="height-ct" disabled/>
            </div>
            <div className="edit-row">
              <label for="tipo_doc" className="tipo-tw" style={{fontFamily: 'Arial'}}>Tipo de Documento:</label>
              <input name="tipo_doc" value={this.state.tipo_doc} onChange={this.onChange} className="height-ct" disabled/>
            </div>
            <div className="edit-row">
              <label for="importe" className="tipo-tw" style={{fontFamily: 'Arial'}}>Importe:</label>
              <input name="importe" value={'$'+this.state.importe} onChange={this.onChange} className="height-ct" disabled/>
            </div>
          </div>
          <div className="table-ed-2">
            <form onSubmit={this.onSubmit} style={{width: '100%'}}>
              <div className="edit-tab-row-t">
                <div className="tabla-edit-l" style={{fontFamily: 'Arial', color: '#FFF'}}> {/*select*/}
                  Fecha Actual
                </div>
                <div className="tabla-edit-l" style={{fontFamily: 'Arial', color: '#FFF'}}> {/*select*/}
                  Folio de ing contra
                </div>
                <div className="tabla-edit-l" style={{fontFamily: 'Arial', color: '#FFF'}}> {/*select*/}
                  Contra-Recibo
                </div>
                <div className="tabla-edit-l" style={{fontFamily: 'Arial', color: '#FFF'}}>
                  Fecha de Contrarecibo
                </div>
                <div className="tabla-edit-l" style={{fontFamily: 'Arial', color: '#FFF'}}>
                  Numero de Poliza
                </div>
                <div className="tabla-edit-l" style={{fontFamily: 'Arial', color: '#FFF'}}>
                  Fecha de Deposito
                </div>
                <div className="tabla-edit-l" style={{fontFamily: 'Arial', color: '#FFF'}}>
                  Mes de Pago
                </div>
              </div>
              <div>
                {this.state.complemento.map(complemento =>
                  <div>
                    <div className="products-al">
                      <div className="tabla-edit-c">{complemento.fecha_actual}</div>
                      <div className="tabla-edit-c">{complemento.folio_ing}</div>
                      <div className="tabla-edit-c">{complemento.contrarecibo}</div>
                      <div className="tabla-edit-c">{complemento.fecha_contra}</div>
                      <div className="tabla-edit-c">{complemento.poliza}</div>
                      <div className="tabla-edit-c">{complemento.fecha_deposito}</div>
                      <div className="tabla-edit-c">{complemento.mes_pago}</div>
                    </div>
                  </div>
                )}
              </div>
            {/*<div className="edit-tab-row-2">
                <div className="tabla-edit-c">
                  Total
                </div>
                <div className="tabla-edit-c">
                </div>
                <div className="tabla-edit-c">
                </div>
                <div className="tabla-edit-c">
                  <input name="importe" value={this.state.importe} onChange={this.onChange} className="input-edi" disabled/>
                </div>
                <div className="tabla-edit-c">
                  0
                </div>
                <div className="tabla-edit-c">
                  <input name="importe" value={this.state.importe} onChange={this.onChange} className="input-edi" disabled/>
                </div>
                <div className="tabla-edit-c">
                </div>
              </div>*/}
              <div className="edit-tab-row-2">
                <div className="tabla-edit-c">
                  <input type="date" className="input-edi" min={today} max={today} name="fecha_actual" value={fecha_actual} onChange={this.onChange} ref="fecha_actual" required/>
                </div>
                <div className="tabla-edit-c">
                  <input className="input-edi" name="folio_ing" value={folio_ing} onChange={this.onChange} ref="folio_ing" required/>
                </div>
                <div className="tabla-edit-c">
                  <input className="input-edi" name="contrarecibo" value={contrarecibo} onChange={this.onChange} ref="contrarecibo" required/>
                </div>
                <div className="tabla-edit-c">
                  <input type="date" className="input-edi" min={today} max={today} name="fecha_contra" value={fecha_contra} onChange={this.onChange} ref="fecha_contra" required/>
                </div>
                <div className="tabla-edit-c">
                  <input type="number" name="poliza" onChange={this.onChange} value={poliza} ref="poliza" className="input-edi"/>
                </div>
                <div className="tabla-edit-c">
                  <input type="date" className="input-edi" min={today} max={today} name="fecha_deposito" value={fecha_deposito} onChange={this.onChange} ref="fecha_deposito" required/>
                </div>
                <div className="tabla-edit-c">
                  <select name="mes_pago" onChange={this.onChange} ref="mes_pago" className="input-edi">
                    <option name="mes_pago"></option>
                    <option name="mes_pago">Enero</option>
                    <option name="mes_pago">Febrero</option>
                    <option name="mes_pago">Marzo</option>
                    <option name="mes_pago">Abril</option>
                    <option name="mes_pago">Mayo</option>
                    <option name="mes_pago">Junio</option>
                    <option name="mes_pago">Julio</option>
                    <option name="mes_pago">Agosto</option>
                    <option name="mes_pago">Septiembre</option>
                    <option name="mes_pago">Octubre</option>
                    <option name="mes_pago">Noviembre</option>
                    <option name="mes_pago">Diciembre</option>
                  </select>
                </div>
              </div>
              <div className="form-container-last">
                <div className="botones">
                  <button
                    className="bt-s2"
                    type='submit'
                    style={{fontFamily: 'Arial'}}
                    >
                      Guadar
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default Addcomple
