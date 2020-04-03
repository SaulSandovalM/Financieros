import React, { Component } from 'react';
import firebase from '../../Firebase';
import CurrencyFormat from 'react-currency-format';
import './Fondos.css';

class Fondos extends Component {
  constructor() {
    super();
    this.ref = firebase.firestore().collection('fondos');
    this.state = {
      fondo: '',
      fecha: '',
      tipo_doc: '',
      oficio_aut: '',
      no_oficio: '',
      no_aut: '',
      no_lici: '',
      importe: '',
      desc: '',
      importe_l: '',
      beneficiario: 'Mtro. León Maximiliano Hernández Valdez',
      realizo: '',
    };
  }

  cancelCourse(){
    this.refs.fondo.value="";
    this.refs.fecha.value="";
    this.refs.tipo_doc.value="";
    this.refs.oficio_aut.value="";
    this.refs.no_oficio.value="";
    this.refs.no_aut.value="";
    this.refs.no_lici.value="";
    this.refs.importe.value="";
    this.refs.desc.value="";
    this.refs.importe_l.value="";
    this.refs.beneficiario.value="";
    this.refs.realizo.value="";
  }

  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState(state);
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { fondo, fecha, tipo_doc, oficio_aut, no_oficio, no_aut, no_lici, importe, desc, importe_l, beneficiario, realizo } = this.state;

    this.ref.add({
      fondo,
      fecha,
      tipo_doc,
      oficio_aut,
      no_oficio,
      no_aut,
      no_lici,
      importe,
      desc,
      importe_l,
      beneficiario,
      realizo
    }).then((docRef) => {
      this.setState({
        fondo: '',
        fecha: '',
        tipo_doc: '',
        oficio_aut: '',
        no_oficio: '',
        no_aut: '',
        no_lici: '',
        importe: '',
        desc: '',
        importe_l: '',
        beneficiario: '',
        realizo: ''
      });
      this.props.history.push("/")
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
  }

  render() {
    const { fondo, fecha, tipo_doc, oficio_aut, no_oficio, no_aut, no_lici, importe, desc, importe_l, beneficiario, realizo } = this.state;
    return (
      <div className="space-nav">
        <h2 className="title">Registro de fondos</h2>
        <form className="fondos-back" onSubmit={this.onSubmit}>
          <div className="fondos-container">
            <div className="form-container">
              <div className="form-content">
                <label for="fondo" className="itc">Fondo:</label>
                <input type="number" className="border-m" name="fondo" value={fondo} onChange={this.onChange} ref="fondo" required/>
              </div>
              <div className="form-content">
                <label for="fecha" className="itc">Fecha:</label>
                <input type="date" className="border-m" name="fecha" value={fecha} onChange={this.onChange} ref="fecha" required/>
              </div>
              <div className="form-content">
                <label for="tipo_doc" className="itc">Tipo de documento:</label>
                <select name="tipo_doc" className="border-m" value={tipo_doc} onChange={this.onChange} ref="tipo_doc" required>
                  <option name="tipo_doc"></option>
                  <option name="tipo_doc">Pago Directo</option>
                  <option name="tipo_doc">Fondo Revolvente</option>
                  <option name="tipo_doc">Gasto a Comprobar</option>
                  <option name="tipo_doc">Reembolso de Gastos</option>
                  <option name="tipo_doc">Cancelado</option>
                </select>
              </div>
              <div className="form-content">
                <label for="oficio_aut" className="itc">Oficio de Autorizacion:</label>
                <select name="oficio_aut" className="border-m" value={oficio_aut} onChange={this.onChange} ref="oficio_aut" required>
                  <option name="oficio_aut"></option>
                  <option name="oficio_aut">SFP-CPF-01-0020/2020</option>
                  <option name="oficio_aut">SFP-CPF-01-0010/2020</option>
                  <option name="oficio_aut">SFP-CPF-01-0724/2020</option>
                  <option name="oficio_aut">SFP-CPF-01-0681/2020</option>
                  <option name="oficio_aut">SFP-CPF-01-DFDP-0949/2020</option>
                </select>
              </div>
            </div>
            {/*seccion 2*/}
            <div className="form-container">
              <div className="form-content">
                <label for="no_oficio" className="itc">No. de Oficio:</label>
                <input type="number" className="border-m" name="no_oficio" value={no_oficio} onChange={this.onChange} ref="no_oficio" required/>
              </div>
              <div className="form-content">
                <label for="no_aut" className="itc">No. de Autorizacion:</label>
                <input type="number" className="border-m" name="no_aut" value={no_aut} onChange={this.onChange} ref="no_aut" required/>
              </div>
              <div className="form-content">
                <label for="no_lici" className="itc">No. de Licitacion:</label>
                <input type="number" className="border-m" name="no_lici" value={no_lici} onChange={this.onChange} ref="no_lici" required/>
              </div>
              <div className="form-content hide">
                <p>Fondos</p>
                <input type=""/>
              </div>
            </div>
            {/*seccion 3*/}
            <div className="form-container">
              <div className="form-content-5">
                <label for="importe" className="itc">Importe:</label>
                <CurrencyFormat thousandSeparator={true} prefix={'$'} className="border-m" name="importe" value={importe} onChange={this.onChange} ref="importe" required />
              </div>
              <div className="form-content-5">
                <label for="importe_l" className="itc">Importe letra:</label>
                <input className="input-b" name="importe_l" value={importe_l} onChange={this.onChange} required ref="importe_l"/>
              </div>
            </div>
            {/*seccion 4*/}
            <div className="form-container">
              <div className="form-content-5">
                <label for="beneficiario" className="itc">Beneficiario:</label>
                <input type="text" className="border-m" name="beneficiario" value={beneficiario} onChange={this.onChange} required ref="beneficiario"/>
              </div>
              <div className="form-content-5">
                <label for="realizo" className="itc">Realizo:</label>
                <select className="border-m" name="realizo" value={realizo} onChange={this.onChange} required ref="realizo">
                  <option name="realizo"></option>
                  <option name="realizo">ELOY</option>
                  <option name="realizo">HECTOR</option>
                  <option name="realizo">LILIANA</option>
                  <option name="realizo">MIGUEL</option>
                  <option name="realizo">TERISITA</option>
                </select>
              </div>
            </div>
            {/*seccion 5*/}
            <div className="form-container">
              <div className="form-content-desc">
                <label for="desc" className="itc">Descripcion:</label>
                <textarea type="text" className="border-m" name="desc" value={desc} onChange={this.onChange} required ref="desc"/>
              </div>
            </div>
            <div className="form-container-last">
              <div className="botones">
                <button className="bt-s1" type='submit'>+</button>
                <button className="bt-s2" type='submit'>Guadar</button>
                <button className="bt-s3" onClick={this.cancelCourse.bind(this)}>Cancelar</button>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default Fondos;
