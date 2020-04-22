import React, { Component } from 'react';
import firebase from '../../Firebase';
import './Control.css';

class Add extends Component {
  constructor(props) {
    super(props);
    this.unsubscribe = null;
    this.state = {
      key: '',
      fondo: '',
      fecha: '',
      realizo: '',
      tipo_doc: '',
      importe: '',
      beneficiario: '',
      fecha_contra: '',
      no_contra: '',
      fecha_deposito: '',
      mes_pago: '',
      control: []
    };
  }

  onCollectionUpdate = (querySnapshot) => {
    const control = [];
    querySnapshot.forEach((doc) => {
      const { fecha_contra, no_contra, fecha_deposito, mes_pago } = doc.data();
      control.push({
        key: doc.id,
        doc, // DocumentSnapshot
        fecha_contra,
        no_contra,
        fecha_deposito,
        mes_pago,
      });
    });
    this.setState({
      control
   });
  }

  componentDidMount() {
    const ref = firebase.firestore().collection('fondos').doc(this.props.match.params.id);
    const updateRef = firebase.firestore().collection('fondos').doc(this.props.match.params.id).collection('control');
    this.unsubscribe = updateRef.onSnapshot(this.onCollectionUpdate);
    ref.get().then((doc) => {
      if (doc.exists) {
        const fondos = doc.data();
        this.setState({
          key: doc.id,
          fondo: fondos.fondo,
          fecha: fondos.fecha,
          realizo: fondos.realizo,
          tipo_doc: fondos.tipo_doc,
          importe: fondos.importe,
          beneficiario: fondos.beneficiario,
          fecha_contra: fondos.fecha_contra,
          no_contra: fondos.no_contra,
          fecha_deposito: fondos.fecha_deposito,
          mes_pago: fondos.mes_pago,
        });
      } else {
        console.log("No se encuentra documento");
      }
    });
  }

  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState({fondos:state});
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { fecha_contra, no_contra, fecha_deposito, mes_pago } = this.state;

    const updateRef = firebase.firestore().collection('fondos').doc(this.props.match.params.id).collection('control').doc();
    updateRef.set({
      fecha_contra,
      no_contra,
      fecha_deposito,
      mes_pago,
    }).then((docRef) => {
      this.setState({
        fecha_contra: '',
        no_contra: '',
        fecha_deposito: '',
        mes_pago: '',
      });
    })
    .catch((error) => {
      console.error("Error Agregando el documento: ", error);
    });
  }

  render() {
    return (
      <div class="container-edit" style={{marginTop: '50px'}}>
        <div className="comp-container">
          <div className="edit-com-comp">
            <div className="App-edit">
              <h1 style={{fontFamily: 'Arial'}}>Agregar Control Presupuestal</h1>
            </div>
            <div className="edit-row">
              <label for="fondo" className="tipo-tw" style={{fontFamily: 'Arial'}}>Fondos:</label>
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
            <div className="edit-row">
              <label for="importe" className="tipo-tw" style={{fontFamily: 'Arial'}}>Beneficiario:</label>
              <input name="importe" value={this.state.beneficiario} onChange={this.onChange} className="height-ct" disabled/>
            </div>
          </div>
          <div className="table-ed-2">
            <form onSubmit={this.onSubmit} style={{width: '60%'}}>
              <div className="edit-tab-row-c">
                <div className="tabla-edit-c" style={{fontFamily: 'Arial', color: '#FFF'}}>
                  Fecha Contrarecibo
                </div>
                <div className="tabla-edit-c" style={{fontFamily: 'Arial', color: '#FFF'}}>
                  No de Contrarecibo
                </div>
                <div className="tabla-edit-c" style={{fontFamily: 'Arial', color: '#FFF'}}>
                  Fecha Deposito
                </div>
                <div className="tabla-edit-c" style={{fontFamily: 'Arial', color: '#FFF'}}>
                  Mes de Pago
                </div>
              </div>
              <div>
                {this.state.control.map(control =>
                  <div>
                    <div className="products-al">
                      <div className="tabla-edit-c">{control.fecha_contra}</div>
                      <div className="tabla-edit-c">{control.no_contra}</div>
                      <div className="tabla-edit-c">{control.fecha_deposito}</div>
                      <div className="tabla-edit-c">{control.mes_pago}</div>
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
              <div className="edit-tab-rowc">
                <div className="tabla-edit-control">
                  <input type="date" name="fecha_contra" onChange={this.onChange} ref="fecha_contra" className="input-edi"/>
                </div>
                <div className="tabla-edit-control">
                  <input name="no_contra" onChange={this.onChange} ref="no_contra" className="input-edi"/>
                </div>
                <div className="tabla-edit-control">
                  <input type="date" min="2020-01-01" max="2020-12-31" name="fecha_deposito" onChange={this.onChange} ref="fecha_deposito" className="input-edi"/>
                </div>
                <div className="tabla-edit-control">
                  <input name="mes_pago" onChange={this.onChange} ref="mes_pago" className="input-edi"/>
                </div>
              </div>
              <div className="form-container-last">
                <div className="botones">
                  <button className="bt-s2" type='submit' style={{fontFamily: 'Arial'}}>Guadar</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Add;
