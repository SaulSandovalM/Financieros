import React, { Component } from 'react';
import firebase from '../../Firebase';
import { Link } from 'react-router-dom';
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
      numero: '',
      num_conver: '',
    };
  }

  componentDidMount() {
    const ref = firebase.firestore().collection('fondos').doc(this.props.match.params.id);
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
          realizo: fondos.realizo,
          numero: fondos.numero,
          num_conver: fondos.num_conver,
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

    const { fondo, fecha, tipo_doc, oficio_aut, no_oficio, no_aut, no_lici, importe, desc, importe_l, beneficiario, realizo, numero, num_conver } = this.state;

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
      realizo,
      numero,
      num_conver
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
        realizo: '',
        numero: '',
        num_conver: '',
      });
      this.props.history.push("/")
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
  }

  render() {
    return (
      <div class="container">
        <div className="edit-container">
          <form onSubmit={this.onSubmit}>
          <div className="edit-com">
            <div>
              Comprometidos 2020
            </div>
            <div className="edit-row">
              <label for="fondo">Fondos:</label>
              <input name="fondo" value={this.state.fondo} onChange={this.onChange}/>
            </div>
            <div className="edit-row">
              <label for="fecha">Fecha:</label>
              <input name="fecha" value={this.state.fecha} onChange={this.onChange}/>
            </div>
            <div className="edit-row">
              <label for="realizo">Nombre Realizo:</label>
              <input name="realizo" value={this.state.realizo} onChange={this.onChange}/>
            </div>
            <div className="edit-row">
              <label for="tipo_doc">Tipo de Documento:</label>
              <input name="tipo_doc" value={this.state.tipo_doc} onChange={this.onChange}/>
            </div>
            <div className="edit-row">
              <label for="importe">Importe:</label>
              <input name="importe" value={this.state.importe} onChange={this.onChange}/>
            </div>
          </div>

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
            <div className="tabla-edit">
              Aplicación
            </div>
          </div>
          <button type="submit" class="btn btn-success">Submit</button>
          </form>
        </div>

      </div>
    );
  }
}

export default Edit;
