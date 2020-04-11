import React, { Component } from 'react';
import firebase from '../../Firebase';
import './Fondos.css';
import { AutoComplete } from '@progress/kendo-react-dropdowns';
import { NumericTextBox, Input } from '@progress/kendo-react-inputs';
import '@progress/kendo-theme-material/dist/all.css';
import { NumberAsString } from './NumerosLetras.js';

class Fondos extends Component {

  nombres = ["ELOY", "HECTOR", "LILIANA", "MIGUEL", "TERESITA"];
  beneficiario = ["Mtro.León Maximiliano Hernández Valdés", "Operadora Omx Sa De C.V.", "Aasi Innovaciones S.A De C.V.", "Abigail Santillán Moreno", "Abraham Andrade Ortiz", "Abraham Peña Pérez", "Acabados Decorativos De La Huasteca S.A. De C.V.",];
  oficio_aut = ["SFP-CPF-01-0020/2020", "SFP-CPF-01-0010/2020", "SFP-CPF-01-0724/2020", "SFP-CPF-01-0681/2020", "SFP-CPF-01-DFDP-0949/2020"];
  tipo_doc = ["Pago Directo", "Fondo Revolvente", "Gasto a Comprobar", "Reembolso de Gastos", "Cancelado"];

  constructor(props) {
    super(props);
    this.ref = firebase.firestore().collection('fondos');
    this.unsubscribe = null;
    this.state = {
      fondo: '',
      fecha: '',
      tipo_doc: '',
      oficio_aut: '',
      no_oficio: '',
      no_lici: '',
      importe: '',
      desc: '',
      importe_l: '',
      beneficiario: '',
      realizo: '',
      fondos: [],
      allowCustom: true,
      value: '',
      suggest: '',
      key: ''
    };
  }

  cancelCourse(){
    this.refs.fondo.value="";
    this.refs.fecha.value="";
    this.refs.tipo_doc.value="";
    this.refs.oficio_aut.value="";
    this.refs.no_oficio.value="";
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

    const { fondo, fecha, tipo_doc, oficio_aut, no_oficio, no_lici, importe, desc, importe_l, beneficiario, realizo } = this.state;

    this.ref.add({
      fondo,
      fecha,
      tipo_doc,
      oficio_aut,
      no_oficio,
      no_lici,
      importe,
      desc,
      importe_l ,
      beneficiario,
      realizo
    }).then((docRef) => {
      this.setState({
        fondo: '',
        fecha: '',
        tipo_doc: '',
        oficio_aut: '',
        no_oficio: '',
        no_lici: '',
        importe: '',
        desc: '',
        importe_l: '',
        beneficiario: '',
        realizo: '',
      });
      this.props.history.push(`/edit/${this.state.fondos.key}`)
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
  }

  handleChange = (event) => {
    this.setState({
      value: event.target.value,
      suggest: event.suggestion ? event.suggestion.value : ''
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

    const { fondo, fecha, tipo_doc, oficio_aut, no_oficio, no_lici, importe, desc, importe_l, beneficiario, realizo } = this.state;

    const allowCustom = this.state.allowCustom;

    return (
      <div className="space-nav">
        <div>
        <h2 className="title" style={{fontFamily: 'Arial'}}>Registro de fondos</h2>
        <form className="fondos-back" onSubmit={this.onSubmit}>
          <div className="fondos-container">
          {/*seccion 1*/}
            <div className="form-container">
              <div className="form-content">
                <label for="fondo" className="itc" style={{fontFamily: 'Arial'}}>Fondo:</label>
                <Input style={{width: '100%', borderColor: 'rgba(0,0,0,0.42)'}} type="number" name="fondo" value={fondo} onChange={this.onChange} ref="fondo" required  />
              </div>
              <div className="form-content">
                <label for="fecha" className="itc" style={{fontFamily: 'Arial'}}>Fecha:</label>
                <input type="date" className="border-m" min={today} max={today} name="fecha" value={fecha} onChange={this.onChange} ref="fecha" required/>
              </div>
            </div>
            {/*seccion 2*/}
            <div className="form-container">
              <div className="form-content">
                <label for="tipo_doc" className="itc" style={{fontFamily: 'Arial'}}>Tipo de documento:</label>
                <AutoComplete suggest={true} style={{width: '100%', borderColor: 'rgba(0,0,0,0.42)'}} data={this.tipo_doc} allowCustom={allowCustom} name="tipo_doc" value={tipo_doc} onChange={this.onChange} required ref="tipo_doc" />
              </div>
              <div className="form-content">

                <label for="oficio_aut" className="itc" style={{fontFamily: 'Arial'}}>Oficio de Autorizacion:</label>
                <AutoComplete suggest={true} style={{width: '100%', borderColor: 'rgba(0,0,0,0.42)'}} data={this.oficio_aut} allowCustom={allowCustom} name="oficio_aut" value={oficio_aut} onChange={this.onChange} required ref="oficio_aut" />
              </div>
            </div>
            {/*seccion 3*/}
            <div className="form-container">
              <div className="form-content">
                <label for="no_oficio" className="itc" style={{fontFamily: 'Arial'}}>No. de Oficio:</label>
                <Input style={{width: '100%', borderColor: 'rgba(0,0,0,0.42)'}} type="number" data={this.no_oficio} allowCustom={allowCustom} name="no_oficio" value={no_oficio} onChange={this.onChange} required ref="no_oficio"/>
              </div>
              <div className="form-content">
                <label for="no_lici" className="itc" style={{fontFamily: 'Arial'}}>No. de Licitacion:</label>
                <Input style={{width: '100%', borderColor: 'rgba(0,0,0,0.42)'}} type="number" allowCustom={allowCustom} name="no_lici" value={no_lici} onChange={this.onChange} required ref="no_lici"/>
              </div>
            </div>
            {/*seccion 4*/}
            <div className="form-container">
              <div className="form-content-5">
                <label for="importe" className="itc" style={{fontFamily: 'Arial'}}>Importe:</label>
                <NumericTextBox format="c2" min={0} width="100%" borderColor="rgba(0,0,0,0.42)" name="importe" value={importe} onChange={this.onChange} ref="importe" required/>
              </div>
              <div className="form-content-5">
                <label for="importe_l" className="itc" style={{fontFamily: 'Arial'}}>Importe letra:</label>
                <input className="border-m" style={{borderColor: 'rgba(0,0,0,0.42)'}} name="importe_l" value={(NumberAsString(importe))} onChange={this.onChange} required ref="importe_l"/>
              </div>
            </div>
            {/*seccion 5*/}
            <div className="form-container">
              <div className="form-content-5">
                <label for="beneficiario" className="itc" style={{fontFamily: 'Arial'}}>Beneficiario:</label>
                <AutoComplete style={{width: '100%', borderColor: 'rgba(0,0,0,0.42)'}} data={this.beneficiario} allowCustom={allowCustom} name="beneficiario" value={beneficiario} onChange={this.onChange} required ref="beneficiario"/>
              </div>
              <div className="form-content-5">
                <label for="realizo" className="itc" style={{fontFamily: 'Arial'}}>Realizo:</label>
                <AutoComplete style={{width: '100%', borderColor: 'rgba(0,0,0,0.42)'}} data={this.nombres} allowCustom={allowCustom} name="realizo" value={realizo} onChange={this.onChange} required ref="realizo"/>
              </div>
            </div>
            {/*seccion 6*/}
            <div className="form-container">
              <div className="form-content-desc">
                <label for="desc" className="itc" style={{fontFamily: 'Arial'}}>Descripcion:</label>
                <Input style={{width: '100%', borderColor: 'rgba(0,0,0,0.42)'}} className="border-m" type="text" name="desc" value={desc} onChange={this.onChange} required ref="desc"/>
              </div>
            </div>
            <div className="form-container-last">
              <div className="botones">
                <button className="bt-s2" type='submit'onClick={this.props.nextPath}  style={{fontFamily: 'Arial'}}>Guadar</button>
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

export default Fondos;
