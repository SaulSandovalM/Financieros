import React, { Component } from 'react';
import firebase from '../../Firebase';
import './Comprometidos.css';

class Comprometido extends Component {
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
      partida: '',
      no_oficio: '',
      no_proyecto: '',
      importe_comp: '',
      isr: '',
      total: '',
      fecha_comp: '',
      comprometidos: []
    };
  }

  onCollectionUpdate = (querySnapshot) => {
    const comprometidos = [];
    querySnapshot.forEach((doc) => {
      const { partida, presupuestal, no_proyecto, importe_comp, isr, total, fecha_comp } = doc.data();
      comprometidos.push({
        key: doc.id,
        doc, // DocumentSnapshot
        partida,
        presupuestal,
        no_proyecto,
        importe_comp,
        isr,
        total,
        fecha_comp
      });
    });
    this.setState({
      comprometidos
   });
  }

  componentDidMount() {
    const ref = firebase.firestore().collection('fondos').doc(this.props.match.params.id);
    const updateRef = firebase.firestore().collection('fondos').doc(this.props.match.params.id).collection('comprometidos');
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
          partida: fondos.partida,
          presupuestal: fondos.presupuestal,
          no_proyecto: fondos.no_proyecto,
          importe_comp: fondos.importe_comp,
          isr: fondos.isr,
          total: fondos.total,
          fecha_comp: fondos.fecha_comp
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

    const { partida, presupuestal, no_proyecto, importe_comp, isr, total, fecha_comp } = this.state;

    const updateRef = firebase.firestore().collection('fondos').doc(this.props.match.params.id).collection('comprometidos').doc();
    updateRef.set({
      partida,
      presupuestal,
      no_proyecto,
      importe_comp,
      isr,
      total,
      fecha_comp
    }).then((docRef) => {
      this.setState({
        partida: '',
        presupuestal: '',
        no_proyecto: '',
        importe_comp: '',
        isr: '',
        total: '',
        fecha_comp: ''
      });
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
  }

  render() {

    const { importe_comp, isr } = this.state;
    var impo = parseInt(importe_comp);
    var isri = parseInt(isr);
    var tot = impo + isri;

    return (
      <div class="container-edit" style={{marginTop: '50px'}}>
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
              <input name="importe" value={'$'+this.state.importe} onChange={this.onChange} className="height-ct" disabled/>
            </div>
          </div>
          <div className="table-ed-2">
            <form onSubmit={this.onSubmit} style={{width: '100%'}}>
              <div className="edit-tab-row-t">
                <div className="tabla-edit-l" style={{fontFamily: 'Arial', color: '#FFF'}}> {/*select*/}
                  Partida
                </div>
                <div className="tabla-edit-l" style={{fontFamily: 'Arial', color: '#FFF'}}> {/*select*/}
                  U. Presupuestal
                </div>
                <div className="tabla-edit-l" style={{fontFamily: 'Arial', color: '#FFF'}}> {/*select*/}
                  No. de Proyecto
                </div>
                <div className="tabla-edit-l" style={{fontFamily: 'Arial', color: '#FFF'}}>
                  Importe
                </div>
                <div className="tabla-edit-l" style={{fontFamily: 'Arial', color: '#FFF'}}>
                  ISR
                </div>
                <div className="tabla-edit-l" style={{fontFamily: 'Arial', color: '#FFF'}}>
                  Total
                </div>
                <div className="tabla-edit-l" style={{fontFamily: 'Arial', color: '#FFF'}}>
                  Fecha
                </div>
              </div>
              <div>
                {this.state.comprometidos.map(comprometidos =>
                  <div>
                    <div className="products-al">
                      <div className="tabla-edit-c">{comprometidos.partida}</div>
                      <div className="tabla-edit-c">{comprometidos.presupuestal}</div>
                      <div className="tabla-edit-c">{comprometidos.no_proyecto}</div>
                      <div className="tabla-edit-c">{'$'+comprometidos.importe_comp}</div>
                      <div className="tabla-edit-c">{'$'+comprometidos.isr}</div>
                      <div className="tabla-edit-c">{'$'+comprometidos.total}</div>
                      <div className="tabla-edit-c">{comprometidos.fecha_comp}</div>
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
                <div className="tabla-edit-c"> {/*select*/}
                  <select name="partida" onChange={this.onChange} ref="partida" className="input-edi">
                    <option name="partida"></option>
                    <option name="partida">147</option>
                  </select>
                </div>
                <div className="tabla-edit-c"> {/*select*/}
                  <select name="presupuestal" onChange={this.onChange} ref="presupuestal" className="input-edi">
                    <option name="presupuestal"></option>
                    <option name="presupuestal">2</option>
                    <option name="presupuestal">3</option>
                    <option name="presupuestal">4</option>
                    <option name="presupuestal">5</option>
                    <option name="presupuestal">6</option>
                    <option name="presupuestal">7</option>
                    <option name="presupuestal">8</option>
                    <option name="presupuestal">9</option>
                    <option name="presupuestal">10</option>
                    <option name="presupuestal">11</option>
                    <option name="presupuestal">12</option>
                    <option name="presupuestal">13</option>
                    <option name="presupuestal">14</option>
                    <option name="presupuestal">15</option>
                    <option name="presupuestal">16</option>
                    <option name="presupuestal">17</option>
                    <option name="presupuestal">18</option>
                    <option name="presupuestal">20</option>
                    <option name="presupuestal">21</option>
                    <option name="presupuestal">22</option>
                    <option name="presupuestal">23</option>
                    <option name="presupuestal">24</option>
                  </select>
                </div>
                <div className="tabla-edit-c"> {/*select*/}
                  <select name="no_proyecto" onChange={this.onChange} ref="no_proyecto" className="input-edi">
                    <option name="no_proyecto"></option>
                    <option name="no_proyecto">U027 425</option>
                    <option name="no_proyecto">U029 425</option>
                    <option name="no_proyecto">U027 1208</option>
                    <option name="no_proyecto">U029 1208</option>
                    <option name="no_proyecto">U027 1860</option>
                    <option name="no_proyecto">U029 1860</option>
                    <option name="no_proyecto">centralizada</option>
                    <option name="no_proyecto">U024 2686</option>
                    <option name="no_proyecto">U027 2686</option>
                    <option name="no_proyecto">U029 2686</option>
                    <option name="no_proyecto">U038 2514</option>
                  </select>
                </div>
                <div className="tabla-edit-c">
                  <input type="number" name="importe_comp" onChange={this.onChange} ref="importe_comp" className="input-edi" />
                </div>
                <div className="tabla-edit-c">
                  <input type="number" name="isr" onChange={this.onChange} ref="isr" className="input-edi"/>
                </div>
                <div className="tabla-edit-c">
                  <input name="total" onChange={this.onChange} value={tot} ref="total" className="input-edi"/>
                </div>
                <div className="tabla-edit-c">
                  <input type="date" min="2020-01-01" max="2020-12-31" name="fecha_comp" onChange={this.onChange} ref="fecha_comp" className="input-edi"/>
                </div>
              </div>
              <div className="form-container-last">
                <div className="botones">
                  <button
                    className="bt-s2"
                    type='submit'
                    style={{fontFamily: 'Arial'}}
                    onClick={() => this.setState({ total: this.state.total = tot })}>
                      Guadar
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Comprometido;
