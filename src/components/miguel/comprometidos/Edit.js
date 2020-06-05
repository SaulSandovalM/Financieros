import React, { Component } from 'react';
import firebase from '../../../Firebase';
import './Comprometidos.css';
import Dropzone from 'react-dropzone';

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
        console.log('No se encuentra documento');
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
      console.error('Error adding document: ', error);
    });
  }

  handleUpload (event) {
    for(let i = 0; i < event.target.files.length; i++)
    {
      if (event.target.files[i].type === 'application/pdf') {
        //Se envia el archivo sin procesar;
        //firebase.database().ref('xml').push(NewXml)
      }
      const file = event.target.files[i]
      const storageRef = firebase.storage().ref(`comprobacion/${file.name}`)
      const task = storageRef.put(file)
      task.on('state_changed', (snapshot) => {
        let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        this.setState({
          pdf1: percentage
        })
      }, (error) => {
        console.error(error.message)
      })
    }
  }

  render() {

    const { importe_comp, isr } = this.state;
    var impo = parseInt(importe_comp);
    var isri = parseInt(isr);
    var tot = impo + isri;

    return (
      <div class='container-edit' style={{marginTop: '50px'}}>
        <div className='comp-container'>
          <div className='edit-com-comp'>
            <div className='App-edit'>
              <h1 style={{margin: '0px'}}>Comprometidos</h1>
              <div className='facxml-row'>
                <p>Agrega facturas/xml</p>
                <Dropzone
                  style={{
                    position: 'ab',
                    width: '100px',
                    height: '30px',
                    borderWidth: '1px',
                    borderColor: '#a9a9a9',
                    borderStyle: 'solid',
                    background: 'white',
                  }}
                  onChange={this.handleUpload.bind(this)}>
                </Dropzone>
              </div>
            </div>
            <div className='edit-row' style={{marginTop: '30px'}}>
              <label for='fondo' className='tipo-tw'>Fondos:</label>
              <input name='fondo' value={this.state.fondo} onChange={this.onChange} className='height-ct' disabled/>
            </div>
            <div className='edit-row'>
              <label for='fecha' className='tipo-tw'>Fecha:</label>
              <input name='fecha' value={this.state.fecha} onChange={this.onChange} className='height-ct' disabled/>
            </div>
            <div className='edit-row'>
              <label for='realizo' className='tipo-tw'>Nombre Realizo:</label>
              <input name='realizo' value={this.state.realizo} onChange={this.onChange} className='height-ct' disabled/>
            </div>
            <div className='edit-row'>
              <label for='tipo_doc' className='tipo-tw'>Tipo de Documento:</label>
              <input name='tipo_doc' value={this.state.tipo_doc} onChange={this.onChange} className='height-ct' disabled/>
            </div>
            <div className='edit-row'>
              <label for='importe' className='tipo-tw'>Importe:</label>
              <input name='importe' value={'$'+this.state.importe} onChange={this.onChange} className='height-ct' disabled/>
            </div>
          </div>
          <div className='table-ed-2'>
            <form onSubmit={this.onSubmit} style={{width: '100%'}}>
              <div className='edit-tab-row-t'>
                <div className='tabla-edit-l' style={{color: '#FFF'}}>
                  Partida
                </div>
                <div className='tabla-edit-l' style={{color: '#FFF'}}>
                  U. Presupuestal
                </div>
                <div className='tabla-edit-l' style={{color: '#FFF'}}>
                  No. de Proyecto
                </div>
                <div className='tabla-edit-l' style={{color: '#FFF'}}>
                  Importe
                </div>
                <div className='tabla-edit-l' style={{color: '#FFF'}}>
                  ISR
                </div>
                <div className='tabla-edit-l' style={{color: '#FFF'}}>
                  Total
                </div>
                <div className='tabla-edit-l' style={{color: '#FFF'}}>
                  Fecha
                </div>
              </div>
              <div>
                {this.state.comprometidos.map(comprometidos =>
                  <div>
                    <div className='products-al'>
                      <div className='tabla-edit-c'>{comprometidos.partida}</div>
                      <div className='tabla-edit-c'>{comprometidos.presupuestal}</div>
                      <div className='tabla-edit-c'>{comprometidos.no_proyecto}</div>
                      <div className='tabla-edit-c'>{'$'+comprometidos.importe_comp}</div>
                      <div className='tabla-edit-c'>{'$'+comprometidos.isr}</div>
                      <div className='tabla-edit-c'>{'$'+comprometidos.total}</div>
                      <div className='tabla-edit-c'>{comprometidos.fecha_comp}</div>
                    </div>
                  </div>
                )}
              </div>
              <div className='edit-tab-row-2'>
                <div className='tabla-edit-c'>
                  <select name='partida' onChange={this.onChange} ref='partida' className='input-edi'>
                    <option name='partida'></option>
                    <option name='partida'>211001</option>
                    <option name='partida'>211002</option>
                    <option name='partida'>212001</option>
                    <option name='partida'>212002</option>
                    <option name='partida'>214001</option>
                    <option name='partida'>214002</option>
                    <option name='partida'>215001</option>
                    <option name='partida'>216001</option>
                    <option name='partida'>217001</option>
                    <option name='partida'>221001</option>
                    <option name='partida'>221002</option>
                    <option name='partida'>246001</option>
                    <option name='partida'>251001</option>
                    <option name='partida'>253001</option>
                    <option name='partida'>254001</option>
                    <option name='partida'>255001</option>
                    <option name='partida'>261001</option>
                    <option name='partida'>271001</option>
                    <option name='partida'>272001</option>
                    <option name='partida'>291001</option>
                    <option name='partida'>292001</option>
                    <option name='partida'>311001</option>
                    <option name='partida'>313001</option>
                    <option name='partida'>318001</option>
                    <option name='partida'>323002</option>
                    <option name='partida'>334001</option>
                    <option name='partida'>338001</option>
                    <option name='partida'>341001</option>
                    <option name='partida'>351001</option>
                    <option name='partida'>352001</option>
                    <option name='partida'>353001</option>
                    <option name='partida'>355001</option>
                    <option name='partida'>357001</option>
                    <option name='partida'>358001</option>
                    <option name='partida'>361002</option>
                    <option name='partida'>372001</option>
                    <option name='partida'>375001</option>
                    <option name='partida'>381001</option>
                    <option name='partida'>392006</option>
                    <option name='partida'>394001</option>
                    <option name='partida'>218002</option>
                    <option name='partida'>312001</option>
                    <option name='partida'>371001</option>
                    <option name='partida'>247001</option>
                    <option name='partida'>249001</option>
                    <option name='partida'>359001</option>
                    <option name='partida'>336001</option>
                    <option name='partida'>275001</option>
                    <option name='partida'>211003</option>
                    <option name='partida'>541001</option>
                    <option name='partida'>515001</option>
                    <option name='partida'>339001</option>

                  </select>
                </div>
                <div className='tabla-edit-c'>
                  <select name='presupuestal' onChange={this.onChange} ref='presupuestal' className='input-edi'>
                    <option name='presupuestal'></option>
                    <option name='presupuestal'>2</option>
                    <option name='presupuestal'>3</option>
                    <option name='presupuestal'>4</option>
                    <option name='presupuestal'>5</option>
                    <option name='presupuestal'>6</option>
                    <option name='presupuestal'>7</option>
                    <option name='presupuestal'>8</option>
                    <option name='presupuestal'>9</option>
                    <option name='presupuestal'>10</option>
                    <option name='presupuestal'>11</option>
                    <option name='presupuestal'>12</option>
                    <option name='presupuestal'>13</option>
                    <option name='presupuestal'>14</option>
                    <option name='presupuestal'>15</option>
                    <option name='presupuestal'>16</option>
                    <option name='presupuestal'>17</option>
                    <option name='presupuestal'>18</option>
                    <option name='presupuestal'>20</option>
                    <option name='presupuestal'>21</option>
                    <option name='presupuestal'>22</option>
                    <option name='presupuestal'>23</option>
                    <option name='presupuestal'>24</option>
                  </select>
                </div>
                <div className='tabla-edit-c'>
                  <select name='no_proyecto' onChange={this.onChange} ref='no_proyecto' className='input-edi'>
                    <option name='no_proyecto'></option>
                    <option name='no_proyecto'>U027 425</option>
                    <option name='no_proyecto'>U029 425</option>
                    <option name='no_proyecto'>U027 1208</option>
                    <option name='no_proyecto'>U029 1208</option>
                    <option name='no_proyecto'>U027 1860</option>
                    <option name='no_proyecto'>U029 1860</option>
                    <option name='no_proyecto'>centralizada</option>
                    <option name='no_proyecto'>U024 2686</option>
                    <option name='no_proyecto'>U027 2686</option>
                    <option name='no_proyecto'>U029 2686</option>
                    <option name='no_proyecto'>U038 2514</option>
                  </select>
                </div>
                <div className='tabla-edit-c'>
                  <input type='number' name='importe_comp' onChange={this.onChange} ref='importe_comp' className='input-edi' />
                </div>
                <div className='tabla-edit-c'>
                  <input type='number' name='isr' onChange={this.onChange} ref='isr' className='input-edi'/>
                </div>
                <div className='tabla-edit-c'>
                  <input name='total' onChange={this.onChange} value={tot} ref='total' className='input-edi'/>
                </div>
                <div className='tabla-edit-c'>
                  <input type='date' min='2020-01-01' max='2020-12-31' name='fecha_comp' onChange={this.onChange} ref='fecha_comp' className='input-edi'/>
                </div>
              </div>
              <div className='form-container-last'>
                <div className='botones'>
                  <button
                    className='bt-s2'
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
