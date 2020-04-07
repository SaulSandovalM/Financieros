import React, { Component } from 'react';
import firebase from '../../Firebase';
import './Comprometidos.css';

class Edit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      key: '',
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
    };
  }

  componentDidMount() {
    const ref = firebase.firestore().collection('fondos').doc(this.props.match.params.id);
    console.log(ref)
    ref.get().then((doc) => {
      if (doc.exists) {
        const fondos = doc.data();
        this.setState({
          key: doc.id,
          fondo: fondos.fondo,
          fecha: fondos.fecha,
          tipo_doc: fondos.tipo_doc,
          oficio_aut: fondos.oficio_aut,
          no_oficio: fondos.no_oficio,
          no_aut: fondos.no_aut,
          no_lici: fondos.no_lici,
          importe: fondos.importe,
          desc: fondos.desc,
          importe_l: fondos.importe_l,
          beneficiario: fondos.beneficiario,
          realizo: fondos.realizo
        });
      } else {
        console.log("No such document!");
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

    const { fondo, fecha, tipo_doc, oficio_aut, no_oficio, no_aut, no_lici, importe, desc, importe_l, beneficiario, realizo } = this.state;

    const updateRef = firebase.firestore().collection('fondos').doc(this.state.key);
    updateRef.set({
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
        key: '',
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
    return (
      <div class="container-edit">
        <div className="edit-container">
          <div className="edit-com">
            <div className="App-edit">
              <h1>Comprometidos</h1>
            </div>
            <div className="edit-row">
              <label for="fondo" className="tipo-tw">Fondos:</label>
              <input name="fondo" value={this.state.fondo} onChange={this.onChange} className="height-ct" disabled/>
            </div>
            <div className="edit-row">
              <label for="fecha" className="tipo-tw">Fecha:</label>
              <input name="fecha" value={this.state.fecha} onChange={this.onChange} className="height-ct" disabled/>
            </div>
            <div className="edit-row">
              <label for="realizo" className="tipo-tw">Nombre Realizo:</label>
              <input name="realizo" value={this.state.realizo} onChange={this.onChange} className="height-ct" disabled/>
            </div>
            <div className="edit-row">
              <label for="tipo_doc" className="tipo-tw">Tipo de Documento:</label>
              <input name="tipo_doc" value={this.state.tipo_doc} onChange={this.onChange} className="height-ct" disabled/>
            </div>
            <div className="edit-row">
              <label for="importe" className="tipo-tw">Importe:</label>
              <input name="importe" value={this.state.importe} onChange={this.onChange} className="height-ct" disabled/>
            </div>
          </div>


          <div className="table-ed-2">
            <form onSubmit={this.onSubmit} style={{width: '90%'}}>
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
              </div>
              <div className="edit-tab-row-2">
                <div className="tabla-edit"> {/*select*/}
                  <input className="input-edi"/>
                </div>
                <div className="tabla-edit"> {/*select*/}
                  <input className="input-edi" />
                </div>
                <div className="tabla-edit"> {/*select*/}
                  <input className="input-edi" />
                </div>
                <div className="tabla-edit">
                  <input className="input-edi" />
                </div>
                <div className="tabla-edit">
                  <input className="input-edi" />
                </div>
                <div className="tabla-edit">
                  <input className="input-edi" />
                </div>
                <div className="tabla-edit">
                  <input className="input-edi" />
                </div>
              </div>
              <div className="edit-tab-row-2">
                <div className="tabla-edit-b"> {/*select*/}
                  Total
                </div>
                <div className="tabla-edit-b"> {/*select*/}
                </div>
                <div className="tabla-edit-b"> {/*select*/}
                </div>
                <div className="tabla-edit-b">
                  <input name="importe" value={this.state.importe} onChange={this.onChange} className="height-ct-tt" disabled/>
                </div>
                <div className="tabla-edit-b">
                  0
                </div>
                <div className="tabla-edit-b">
                  <input name="importe" value={this.state.importe} onChange={this.onChange} className="height-ct-tt" disabled/>
                </div>
                <div className="tabla-edit-b">
                </div>
              </div>
              <button type="submit" class="btn btn-success">Submit</button>
            </form>
          </div>
        </div>

      </div>
    );
  }
}

export default Edit;
