import React, { Component } from 'react';
import firebase from '../../Firebase';
import CurrencyFormat from 'react-currency-format';
import './Analitico.css';

class Analitico extends Component {
  constructor() {
    super();
    this.ref = firebase.firestore().collection('Analitico');
    this.state = {
      nfactura: '',
      fecha: '',
      proveedor: '',
      partida: '',
      importe: '',
      isr: '',
      iva: '',
      total: '',
      municipio: '',
      area: '',
      fondos: [],
    };
  }

  cancelCourse(){
    this.refs.nfactura.value="";
    this.refs.fecha.value="";
    this.refs.proveedor.value="";
    this.refs.partida.value="";
    this.refs.importe.value="";
    this.refs.isr.value="";
    this.refs.iva.value="";
    this.refs.total.value="";
    this.refs.municipio.value="";
    this.refs.area.value="";
  }

  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState(state);
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { nfactura, fecha, proveedor, partida, importe, isr, iva, total, municipio, area } = this.state;

    this.ref.add({
      nfactura,
      fecha,
      proveedor,
      partida,
      importe,
      isr,
      iva,
      total,
      municipio,
      area
    }).then((docRef) => {
      this.setState({
        nfactura: '',
        fecha: '',
        proveedor: '',
        partida: '',
        importe: '',
        isr: '',
        iva: '',
        total: '',
        municipio: '',
        area: ''
      });
      this.props.history.push("/Analitico")
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
  }

  render() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1;
    var yyyy = today.getFullYear();
    if ( dd < 10 ){
      dd = '0' + dd
    }
    if ( mm < 10 ){
      mm = '0' + mm
    }
    today = yyyy + '-' + mm + '-' + dd;
    const { nfactura, fecha, proveedor, partida, importe, isr, iva, total, municipio, area } = this.state;
    return (
      <div className="space-nav">
        <div>
        <h2 className="title" style={{fontFamily: 'Arial'}}>Analitico de Fondos</h2>
        <div className="edit-row-a title p-top">
          <label for="fondo" className="tipo-tw" style={{fontFamily: 'Arial'}}>Fondos:</label>
          <input name="fondo" value={this.state.fondo} onChange={this.onChange} className="height-ct" disabled/>
        </div>
        <div className="edit-row-a title">
          <label for="fecha" className="tipo-tw" style={{fontFamily: 'Arial'}}>Fecha:</label>
          <input name="fecha" value={this.state.fecha} onChange={this.onChange} className="height-ct" disabled/>
        </div>
        <div className="edit-row-a title">
          <label for="realizo" className="tipo-tw" style={{fontFamily: 'Arial'}}>Nombre Realizo:</label>
          <input name="realizo" value={this.state.realizo} onChange={this.onChange} className="height-ct" disabled/>
        </div>
        <div className="edit-row-a title">
          <label for="tipo_doc" className="tipo-tw" style={{fontFamily: 'Arial'}}>Tipo de Documento:</label>
          <input name="tipo_doc" value={this.state.tipo_doc} onChange={this.onChange} className="height-ct" disabled/>
        </div>
        <div className="edit-row-a title">
          <label for="importe" className="tipo-tw" style={{fontFamily: 'Arial'}}>Importe:</label>
          <input name="importe" value={this.state.importe} onChange={this.onChange} className="height-ct" disabled/>
        </div>

        <form className="fondos-back p-top" onSubmit={this.onSubmit}>
          <div className="fondos-container">
          {/*seccion 1*/}
            <div className="form-container">
              <div className="form-content">
                <label for="nfactura" className="itc" style={{fontFamily: 'Arial'}}>N. de Factura:</label>
                <input type="text" className="border-m" name="nfactura" value={nfactura} onChange={this.onChange} ref="nfactura" required/>
              </div>
              <div className="form-content">
                <label for="fecha" className="itc" style={{fontFamily: 'Arial'}}>Fecha:</label>
                <input type="date" className="border-m" name="fecha" value={fecha} onChange={this.onChange} ref="fecha" required/>
              </div>
            </div>
            {/*seccion 2*/}
            <div className="form-container">
              <div className="form-content">
                <label for="proveedor" className="itc" style={{fontFamily: 'Arial'}}>Proveedor:</label>
                <select name="proveedor" className="border-m" value={proveedor} onChange={this.onChange} ref="proveedor" required>
                  <option name="tipo_doc"></option>
                  <option name="tipo_doc">Pago Directo</option>
                  <option name="tipo_doc">Fondo Revolvente</option>
                  <option name="tipo_doc">Gasto a Comprobar</option>
                  <option name="tipo_doc">Reembolso de Gastos</option>
                  <option name="tipo_doc">Cancelado</option>
                </select>
              </div>
              <div className="form-content">
                <label for="partida" className="itc" style={{fontFamily: 'Arial'}}>Partida:</label>
                <select name="partida" className="border-m" value={partida} onChange={this.onChange} ref="partida" required>
                  <option name="partida"></option>
                  <option name="partida">SFP-CPF-01-0020/2020</option>
                  <option name="partida">SFP-CPF-01-0010/2020</option>
                  <option name="partida">SFP-CPF-01-0724/2020</option>
                  <option name="partida">SFP-CPF-01-0681/2020</option>
                  <option name="partida">SFP-CPF-01-DFDP-0949/2020</option>
                </select>
              </div>
            </div>
            {/*seccion 3*/}
            <div className="form-container">
              <div className="form-content">
                <label for="importe" className="itc" style={{fontFamily: 'Arial'}}>Importe:</label>
                <CurrencyFormat thousandSeparator={true} prefix={'$'} className="border-m" name="importe" value={importe} onChange={this.onChange} ref="importe" required />
              </div>
              <div className="form-content">
                <label for="isr" className="itc" style={{fontFamily: 'Arial'}}>Isr:</label>
                <CurrencyFormat thousandSeparator={true} prefix={'$'} className="border-m" name="isr" value={isr} onChange={this.onChange} ref="isr" required />
              </div>
            </div>
            {/*seccion 4*/}
            <div className="form-container">
              <div className="form-content-5">
                <label for="iva" className="itc" style={{fontFamily: 'Arial'}}>Iva:</label>
                <CurrencyFormat thousandSeparator={true} prefix={'$'} className="border-m" name="iva" value={iva} onChange={this.onChange} ref="iva" required />
              </div>
              <div className="form-content-5">
                <label for="total" className="itc" style={{fontFamily: 'Arial'}}>Total:</label>
                <input className="input-b" name="total" value={total} onChange={this.onChange} required ref="total"/>
              </div>
            </div>
            {/*seccion 5*/}
            <div className="form-container">
              <div className="form-content-5">
                <label for="municipio" className="itc" style={{fontFamily: 'Arial'}}>Municipio:</label>
                <select className="border-m" name="municipio" value={municipio} onChange={this.onChange} required ref="municipio">
                  <option name="municipio"></option>
                  <option name="municipio">Pachuca</option>
                </select>
              </div>
              <div className="form-content-5">
                <label for="area" className="itc" style={{fontFamily: 'Arial'}}>Area:</label>
                <select className="border-m" name="area" value={area} onChange={this.onChange} required ref="area">
                  <option name="area"></option>
                  <option name="area">Area 1</option>
                </select>
              </div>
            </div>
            <div className="form-container-last">
              <div className="botones">
                <button className="bt-s2" type='submit' style={{fontFamily: 'Arial'}}>Guadar</button>
                <button className="bt-s3" onClick={this.cancelCourse.bind(this)}>Cancelar</button>
              </div>
            </div>
          </div>
        </form>
        </div>
      </div>
    );
  }
}

export default Analitico;
