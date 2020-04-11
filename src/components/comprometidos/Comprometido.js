import React, { Component } from 'react';
import firebase from '../../Firebase';
import './Comprometidos.css';

class Comprometido extends Component {
  constructor(props) {
    super(props);
    this.state = {
      key: '',
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
      prueba: ''
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
          no_lici: fondos.no_lici,
          importe: fondos.importe,
          desc: fondos.desc,
          importe_l: fondos.importe_l,
          beneficiario: fondos.beneficiario,
          realizo: fondos.realizo,
          prueba: fondos.prueba
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

    const { fondo, fecha, tipo_doc, oficio_aut, no_oficio, no_lici, importe, desc, importe_l, beneficiario, realizo, prueba } = this.state;

    const updateRef = firebase.firestore().collection('fondos').doc(this.state.key).collection('comproemtidos').doc();
    updateRef.set({
      fondo,
      fecha,
      tipo_doc,
      oficio_aut,
      no_oficio,
      no_lici,
      importe,
      desc,
      importe_l,
      beneficiario,
      realizo,
      prueba
    }).then((docRef) => {
      this.setState({
        key: '',
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
        prueba: ''
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
        <div className="comp-container">
          <div className="edit-com-comp">
            <div className="App-edit">
              <h1 style={{fontFamily: 'Arial'}}>Comprometidos</h1>
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
              <input name="importe" value={this.state.importe} onChange={this.onChange} className="height-ct" disabled/>
            </div>
          </div>


          <div className="table-ed-2">
            <form onSubmit={this.onSubmit} style={{width: '90%'}}>
              <div className="edit-tab-row">
                <div className="tabla-edit-c" style={{fontFamily: 'Arial'}}> {/*select*/}
                  Partida
                </div>
                <div className="tabla-edit-c" style={{fontFamily: 'Arial'}}> {/*select*/}
                  U. Presupuestal
                </div>
                <div className="tabla-edit-c" style={{fontFamily: 'Arial'}}> {/*select*/}
                  No. de Proyecto
                </div>
                <div className="tabla-edit-c" style={{fontFamily: 'Arial'}}>
                  Importe
                </div>
                <div className="tabla-edit-c" style={{fontFamily: 'Arial'}}>
                  ISR
                </div>
                <div className="tabla-edit-c" style={{fontFamily: 'Arial'}}>
                  Total
                </div>
                <div className="tabla-edit-c" style={{fontFamily: 'Arial'}}>
                  Fecha
                </div>
              </div>
              <div className="edit-tab-row-2">
                <div className="tabla-edit-c"> {/*select*/}
                  <input name="prueba" value={this.state.prueba} onChange={this.onChange} ref="prueba" className="input-edi"/>
                </div>
                <div className="tabla-edit-c"> {/*select*/}
                  <input className="input-edi" />
                </div>
                <div className="tabla-edit-c"> {/*select*/}
                  <input className="input-edi" />
                </div>
                <div className="tabla-edit-c">
                  <input className="input-edi" />
                </div>
                <div className="tabla-edit-c">
                  <input className="input-edi" />
                </div>
                <div className="tabla-edit-c">
                  <input className="input-edi" />
                </div>
                <div className="tabla-edit-c">
                  <input className="input-edi" />
                </div>
              </div>
              <div className="edit-tab-row-2">
                <div className="tabla-edit-c"> {/*select*/}
                  Total
                </div>
                <div className="tabla-edit-c"> {/*select*/}
                </div>
                <div className="tabla-edit-c"> {/*select*/}
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
              </div>
              <div style={{display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'flex-end', marginTop: '20px'}}>
                <button type="submit" class="btn btn-success">Guardar</button>
              </div>
            </form>
          </div>
        </div>

      </div>
    );
  }
}

export default Comprometido;
