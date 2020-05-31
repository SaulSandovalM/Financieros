import React, { Component } from 'react';
import firebase from '../../../Firebase';
import './Cheques.css';
import ReactToPrint from 'react-to-print';
import ListComponent from './ListComponent';
import CurrencyFormat from 'react-currency-format';
import Dropzone from 'react-dropzone';

import lpgjh from '../../../img/logo-PGJH.jpg';
import programa from '../../../img/logo.jpg';






export default class Nuvale extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lista: [
        {
          id: 1,
          name: 'preuba',
          done: false
        },
      ],
      form: [],
      alert: false,
      alertData: {},
      vale: '',
      cheque: '',
      movimiento: '',
      cantidad: '',
      concepto: '',
      oficioS: '',
      area: '',
      turno: '',
      reintegroT: '',
      estatus: '',
      personaR: '',
      proveedor: '',
      contador: {},
    };
  }

  listenForItems = (itemsRef) => {
    itemsRef.on('value', (snap) => {
      var lista = [];
      snap.forEach((child) => {
        lista.push({
          vale: child.val().vale,
          cheque: child.val().cheque,
          movimiento: child.val().movimiento,
          cantidad: child.val().cantidad,
          concepto: child.val().concepto,
          oficioS: child.val().oficioS,
          area: child.val().area,
          turno: child.val().turno,
          reintegroT: child.val().reintegroT,
          estatus: child.val().estatus,
          personaR: child.val().personaR,
          proveedor: child.val().proveedor,
          done: child.val().done,
          id: child.key
        });
      });
      this.setState({
        lista: lista
      });
    });
  }

  componentDidMount() {
    const itemsRef = firebase.database().ref('vales/');
    this.listenForItems(itemsRef);
    this.consumo();
  }

  consumo = () => {
    const ref = firebase.firestore().collection('vales').doc('--stats--');
    ref.get().then((doc) => {
      if (doc.exists) {
        this.setState({
          contador: doc.data(),
          key: doc.id,
          isLoading: false
        });
      } else {
        console.log("No such document!");
      }
    })
  }

  showAlert(type, message) {
    this.setState({
      alert: true,
      alertData: {type, message}
    });
    setTimeout(() => {
      this.setState({alert: false});
    }, 6000);
  }

  resetForm() {
    this.refs.contactForm.reset();
  }

  componentWillMount() {
    let formRef = firebase.database().ref('vales').orderByKey().limitToLast(1);
    formRef.on('child_added', snapshot => {
      const { vale, cheque, movimiento, cantidad, concepto, oficioS, area, turno, reintegroT, estatus, personaR, proveedor } = snapshot.val();
      const data = { vale, cheque, movimiento, cantidad, concepto, oficioS, area, turno, reintegroT, estatus, personaR, proveedor };
      this.setState({ form: [data].concat(this.state.form) });
    });
  }

  sendMessage(e) {
    e.preventDefault();
    const params = {
      vale: this.inputVale.value,
      cheque: this.inputCheque.value,
      movimiento: this.inputMovimiento.value,
      cantidad: this.inputCantidad.value,
      concepto: this.inputConcepto.value,
      oficioS: this.inputOficio.value,
      area: this.inputArea.value,
      turno: this.inputTurno.value,
      reintegroT: this.inputReintegro.value,
      estatus: this.inputEstatus.value,
      personaR: this.inputPersona.value,
      proveedor: this.inputProveedor.value
    };
    this.setState({
      vale: this.inputVale.value,
      cheque: this.inputCheque.value,
      movimiento: this.inputMovimiento.value,
      cantidad: this.inputCantidad.value,
      concepto: this.inputConcepto.value,
      oficioS: this.inputOficio.value,
      area: this.inputArea.value,
      turno: this.inputTurno.value,
      reintegroT: this.inputReintegro.value,
      estatus: this.inputEstatus.value,
      personaR: this.inputPersona.value,
      proveedor: this.inputProveedor.value
    })
    if ( params.vale && params.cheque && params.movimiento && params.cantidad && params.concepto && params.oficioS && params.area && params.turno && params.reintegroT && params.estatus && params.personaR && params.proveedor ) {
      var f = parseInt(params.cantidad);
      const statsRef = firebase.firestore().collection('caja').doc('--stats--');
      const increment = firebase.firestore.FieldValue.increment(-f);
      const batch = firebase.firestore().batch();
      const storyRef = firebase.firestore().collection('caja').doc(`${Math.random()}`);
      batch.set(storyRef, { title: 'Se genero un vale' });
      batch.set(statsRef, { storyCount: increment }, { merge: true });
      batch.commit();
      const statsRefs = firebase.firestore().collection('vales').doc('--stats--');
      const increments = firebase.firestore.FieldValue.increment(1);
      const batchs = firebase.firestore().batch();
      const storyRefs = firebase.firestore().collection('vales').doc(`${Math.random()}`);
      batchs.set(storyRefs, { title: 'Se genero un vale' });
      batchs.set(statsRefs, { storyCount: increments }, { merge: true });
      batchs.commit();
      firebase.database().ref('vales').push(params).then(() => {
        this.showAlert('success', 'Tu solicitud fue enviada.');
      }).catch(() => {
        this.showAlert('danger', 'Tu solicitud no puede ser enviada');
      });
        this.resetForm();
      } else {
        this.showAlert('warning', 'Por favor llene el formulario');
      };
    }

  render(){
      return(


              <div class='fader'>

                  <div class='inicio'>
                      <div class='titulos'>

                      <img class="pgjh" src={lpgjh} alt=''/>
                      <p class='titulo-p'>PROCURADURÍA GENERAL DE JUSTICIA <br/>
                      DIRECCION GENERAL DE ADMINISTRACION Y FINANZAS</p>
                      <img class="ims" src={programa} alt=''/>
                      </div>

                      <div >
                      <div class='no-texto'>
                              <p class='pp'>No. Cheque:</p>

                              <input
                              class='input-c1he'
                              id='cheque'
                              required
                              ref={cheque => this.inputCheque = cheque} />
                              </div>

                      <div class='no-texto2'>
                        <p class='pp'>No. Vale</p>
                      <input
                        class='input-c1he'
                        id='concepto'
                        required
                        ref={concepto => this.inputConcepto = concepto}
                      />
                      </div>

                  </div>
                  </div>


                  <div>
                  <div class='vale'>
                        <p>
                        VALE PROVISIONAL DE CAJA
                        </p>
                  </div>

                  <div class='tabla'>
                          <table class='tabla1'>
                              <tr><th>MOVIMIENTO</th></tr>
                              <tr><td  class='tabla-a'>Autorizado</td></tr>
                              <tr><td  class='tabla-a'>Comprobacion</td></tr>
                              <tr><td  class='tabla-a'>Reintrego/Rembolso</td></tr>
                          </table>
                          <table class='tabla1'>
                              <tr><th>CANTIDAD</th></tr>
                              <tr><td><input class='input-0'
                                            id='movimiento'
                                            required
                                            ref={movimiento => this.inputMovimiento = movimiento}
                              /></td></tr>
                              <tr><td><input class='input-0'
                                              id='movimiento'
                                              required
                                              ref={movimiento => this.inputMovimiento = movimiento}
                               /></td></tr>
                              <tr><td><input class='input-0'
                                              id='movimiento'
                                              required
                                              ref={movimiento => this.inputMovimiento = movimiento}
                               /></td></tr>
                          </table>


                          <div class='concepto-1'>

                          <table class='tab-c'>
                              <tr><th>CONCEPTO</th></tr>
                              <tr><td><input class='input-c'
                                            id='concepto'
                                            required
                                            ref={concepto => this.inputConcepto = concepto}/></td></tr>
                          </table>


</div>
<div>


                      <div class="combo">

                        <table class='tab-d'>
                            <tr><th>Oficio Solicitud</th></tr>
                            <tr><td><input class='input-d'
                            id='oficioS'
                            required
                            ref={oficioS => this.inputOficio = oficioS}
                            /></td></tr>
                        </table>


                      <table class='tab-d'>
                          <tr><th>Area</th></tr>
                          <tr><td><input class='input-d'
                          id='area'
                          required
                          ref={area => this.inputArea = area}
                          /></td></tr>
                      </table>


                    <table class='tab-d'>
                        <tr><th>Turno</th></tr>
                        <tr><td><input class='input-d'
                        id='turno'
                        required
                        ref={turno => this.inputTurno = turno}
                        /></td></tr>
                    </table>

                      </div>

                          </div>
                  </div>
                  </div>

              <div class="combo-2">


                        <table>
                            <tr><th>Factura</th></tr>
                            <tr><td><input class='input-e' /></td></tr>
                      </table>
                      <table>
                            <tr><th>Recibos</th></tr>
                            <tr><td><input class='input-e' /></td></tr>
                      </table>


                      <table>
                        <tr><th>S/C</th></tr>
                        <tr><td><input class='input-e' /></td></tr>
                      </table>
                      <table>
                        <tr><th>Reintrego Total</th></tr>
                        <tr><td><input class='input-e' /></td></tr>
                        </table>
              </div>
              <div class='firmas'>
              <div>
                <table>
                  <input class='input-e' />
                  <tr><th>Fecha</th></tr>
                </table>
                </div>

                <div>
                  <p>L.C. Nayra Ruiz Laguna<br/></p>
                  <p class="firmas-t">Autorizo</p>
                </div>
                <div>
                  <p align="center">OK<br/></p>
                  <p class="firmas-t">Validado (NRL)</p>
                </div>
                <div>
                  <input
                  id='personaR'
                  required
                  ref={personaR => this.inputPersona = personaR}
                  />
                  <p class="firmas-t">Recibio</p>
                </div>
              </div>


              <div class='comprometo-1'>
              <p class='comprometo'>Me comprometo a entregar la comprobación que ampara el presente vale en un plazo no mayor  a 5 dias habiles posteriores a la fecha de recibido, de lo contrario reintegraré </p>
              </div>

              <div>
              <ReactToPrint
                trigger={() => <buttom class="bont_imprimir">Imprimir</buttom>}
                content={()=> this.holi}
              />
              </div>

                <form onSubmit={this.sendMessage.bind(this)} ref='contactForm'>
                    <div className='boton-v'>
                            <button type='submit' className='input-sc boton-g'>Guardar</button>
                    </div>
                </form>

                <div class='caja-w' style={{marginTop: '40px', marginBottom: '40px'}}>
                              <div class='caja-col'>
                              <ListComponent
                              lista={this.state.lista}
                              />
                              </div>
                </div>

              </div>

      )
  }

}
