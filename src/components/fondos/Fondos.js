import React, { Component } from 'react';
import firebase from '../../Firebase';
import './Fondos.css';

class Create extends Component {
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
      beneficiario: '',
      realizo: '',
      numero: '',
      num_conver: ''
    };
  }
  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState(state);
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { fondo, fecha, tipo_doc, oficio_aut, no_oficio, no_aut, no_lici, importe, desc, importe_l, beneficiario, realizo, numero, num_conver } = this.state;

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
      realizo,
      numero,
      num_conver
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
        realizo: '',
        numero: '',
        num_conver: ''
      });
      this.props.history.push("/")
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
  }

  render() {
    const { fondo, fecha, tipo_doc, oficio_aut, no_oficio, no_aut, no_lici, importe, desc, importe_l, beneficiario, realizo, numero, num_conver } = this.state;
    return (
      <div>
        <h2 className="title">Registro de fondos 2020</h2>
        <form className="fondos-back" onSubmit={this.onSubmit}>
          <div className="fondos-container">
            <div className="form-container">
              <div className="form-content">
                <label for="fondo">Fondo:</label>
                <input name="fondo" value={fondo} onChange={this.onChange} />
              </div>
              <div className="form-content">
                <label for="fecha">Fecha:</label>
                <input name="fecha" value={fecha} onChange={this.onChange} />
              </div>
              <div className="form-content">
                <label for="tipo_doc">Tipo de documento:</label>
                <input name="tipo_doc" value={tipo_doc} onChange={this.onChange} />
              </div>
              <div className="form-content">
                <label for="oficio_aut">Oficio de Autorizacion:</label>
                <input name="oficio_aut" value={oficio_aut} onChange={this.onChange} />
              </div>
            </div>
            {/*seccion 2*/}
            <div className="form-container">
              <div className="form-content">
                <label for="no_oficio">No. de Oficio:</label>
                <input name="no_oficio" value={no_oficio} onChange={this.onChange} />
              </div>
              <div className="form-content">
                <label for="no_aut">No. de Autorizacion:</label>
                <input name="no_aut" value={no_aut} onChange={this.onChange} />
              </div>
              <div className="form-content">
                <label for="no_lici">No. de Licitacion:</label>
                <input name="no_lici" value={no_lici} onChange={this.onChange} />
              </div>
              <div className="form-content hide">
                <p>Fondos</p>
                <input/>
              </div>
            </div>
            {/*seccion 3*/}
            <div className="form-container">
              <div className="form-content-100">
                <label for="importe">Importe:</label>
                <input name="importe" value={importe} onChange={this.onChange} />
              </div>
            </div>
            {/*seccion 4*/}
            <div className="form-container">
              <div className="form-content-50">
                <label for="desc">Descripcion:</label>
                <input name="desc" value={desc} onChange={this.onChange} />
              </div>
            </div>
            {/*seccion 5*/}
            <div className="form-container">
              <div className="form-content-100">
                <label for="importe_l">Importe letra:</label>
                <input name="importe_l" value={importe_l} onChange={this.onChange} />
              </div>
            </div>
            {/*seccion 6*/}
            <div className="form-container">
              <div className="form-content-100">
                <label for="beneficiario">Beneficiario:</label>
                <input name="beneficiario" value={beneficiario} onChange={this.onChange} />
              </div>
            </div>
            {/*seccion 7*/}
            <div className="form-container">
              <div className="form-content-50">
                <label for="realizo">Realizo:</label>
                <input name="realizo" value={realizo} onChange={this.onChange} />
              </div>
            </div>
            {/*Seccion 8 numero*/}
            <div className="form-container">
              <div className="form-content-100">
                <label for="numero">Numero:</label>
                <input name="numero" value={numero} onChange={this.onChange} />
              </div>
            </div>
            {/*Seccion 9*/}
            <div className="form-container">
              <div className="form-content-100">
                <h3>Convertidor de números a letras</h3>
                <div className="conver">
                  <label for="num_conver">Converteir:</label>
                  <input name="num_conver" value={num_conver} onChange={this.onChange} />
                </div>
              </div>
            </div>
            {/*Seccion 10 botones*/}
            <div className="form-container">
              <div className="botones">
                <button style={{height: '30px', marginRight: '10px'}} type='submit'>+</button>
                <button style={{height: '30px', marginRight: '10px'}} type='submit'>Guadar</button>
                <button style={{height: '30px', marginRight: '10px'}}>Cancelar</button>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default Create;
