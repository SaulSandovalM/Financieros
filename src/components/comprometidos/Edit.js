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
      importe_l: '',
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
        importe_l: '',
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
              <input name="importe" value={'$'+this.state.importe} onChange={this.onChange} className="height-ct" disabled/>
            </div>
          </div>
          <div className="table-ed-2">
            <form onSubmit={this.onSubmit} style={{width: '100%'}}>
              <div className="edit-tab-row-t">
                <div className="tabla-edit-c" style={{fontFamily: 'Arial', color: '#FFF'}}> {/*select*/}
                  Partida
                </div>
                <div className="tabla-edit-c" style={{fontFamily: 'Arial', color: '#FFF'}}> {/*select*/}
                  U. Presupuestal
                </div>
                <div className="tabla-edit-c" style={{fontFamily: 'Arial', color: '#FFF'}}> {/*select*/}
                  No. de Proyecto
                </div>
                <div className="tabla-edit-c" style={{fontFamily: 'Arial', color: '#FFF'}}>
                  Importe
                </div>
                <div className="tabla-edit-c" style={{fontFamily: 'Arial', color: '#FFF'}}>
                  ISR
                </div>
                <div className="tabla-edit-c" style={{fontFamily: 'Arial', color: '#FFF'}}>
                  Total
                </div>
                <div className="tabla-edit-c" style={{fontFamily: 'Arial', color: '#FFF'}}>
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
                      <div className="tabla-edit-c">{comprometidos.importe_comp}</div>
                      <div className="tabla-edit-c">{comprometidos.isr}</div>
                      <div className="tabla-edit-c">{comprometidos.total}</div>
                      <div className="tabla-edit-c">{comprometidos.fecha_comp}</div>
                    </div>
                  </div>
                )}
              </div>
              <div className="edit-tab-row-2">
                <div className="tabla-edit-c"> {/*select*/}
                  <input name="partida" onChange={this.onChange} ref="partida" className="input-edi"/>
                </div>
                <div className="tabla-edit-c"> {/*select*/}
                  <input name="presupuestal" onChange={this.onChange} ref="presupuestal" className="input-edi"/>
                </div>
                <div className="tabla-edit-c"> {/*select*/}
                  <input name="no_proyecto" onChange={this.onChange} ref="no_proyecto" className="input-edi"/>
                </div>
                <div className="tabla-edit-c">
                  <input name="importe_comp" onChange={this.onChange} ref="importe_comp" className="input-edi"/>
                </div>
                <div className="tabla-edit-c">
                  <input name="isr" ref="isr" className="input-edi" id="spTotal"/>
                </div>
                <div className="tabla-edit-c">
                  <input name="total" onChange={this.onChange} ref="total" className="input-edi"/>
                </div>
                <div className="tabla-edit-c">
                  <input name="fecha_comp" onChange={this.onChange} ref="fecha_comp" className="input-edi"/>
                </div>
              </div>
              <div className="edit-tab-row-2">
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
