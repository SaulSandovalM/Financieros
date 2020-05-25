import React, { Component } from 'react';
import firebase from '../../../Firebase';
import './Cheques.css';
import ReactToPrint from 'react-to-print';
import ListComponent from './ListComponent';
import CurrencyFormat from 'react-currency-format';

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
      numCheque: '',
      importe: '',
      fechaE: '',
      fechaC: '',
      contador: {},
      
    };
  }

  listenForItems = (itemsRef) => {
    itemsRef.on('value', (snap) => {
      var lista = [];
      snap.forEach((child) => {
        lista.push({
          numCheque: child.val().numCheque,
          importe: child.val().importe,
          fechaE: child.val().fechaE,
          fechaC: child.val().fechaC,
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
    const itemsRef = firebase.database().ref('cheques/');
    this.listenForItems(itemsRef);
    this.consumo();
  }

  consumo = () => {
    const ref = firebase.firestore().collection('banco').doc('--stats--');
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
    let formRef = firebase.database().ref('cheques').orderByKey().limitToLast(1);
    formRef.on('child_added', snapshot => {
      const { numCheque, importe, fechaE, fechaC } = snapshot.val();
      const data = { numCheque, importe, fechaE, fechaC };
      this.setState({ form: [data].concat(this.state.form) });
    });
  }

  sendMessage(e) {
    e.preventDefault();
    const params = {
      numCheque: this.inputCheque.value,
      importe: this.inputImporte.value,
      fechaE: this.inputFechaE.value,
      fechaC: this.inputFechaC.value
    };
    this.setState({
      numCheque: this.inputCheque.value,
      importe: this.inputImporte.value,
      fechaE: this.inputFechaE.value,
      fechaC: this.inputFechaC.value
    })

    if ( params.numCheque && params.importe && params.fechaE && params.fechaC ) {
      var f = parseInt(params.importe);
      const statsRef = firebase.firestore().collection('banco').doc('--stats--');
      const increment = firebase.firestore.FieldValue.increment(-f);
      const batch = firebase.firestore().batch();
      const storyRef = firebase.firestore().collection('banco').doc(`${Math.random()}`);
      batch.set(storyRef, { title: 'Retiro Caja' });
      batch.set(statsRef, { storyCount: increment }, { merge: true });
      batch.commit();
      const statsRefT = firebase.firestore().collection('caja').doc('--stats--');
      const increments = firebase.firestore.FieldValue.increment(f);
      const batchs = firebase.firestore().batch();
      const storyRefs = firebase.firestore().collection('caja').doc(`${Math.random()}`);
      batchs.set(storyRefs, { title: 'Aumento Caja!' });
      batchs.set(statsRefT, { storyCount: increments }, { merge: true });
      batchs.commit();
      firebase.database().ref('cheques').push(params).then(() => {
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
                      <div class='no-texto'>
                      <p>No. Oficio</p>
                      <p>No. Vale</p>
                      </div>
                  </div>


                  <div>
                  <div class='vale'>
                        <p>
                        VALE PROVISIONAL DE CAJA
                        </p>
                  </div>

                  <div class='tabla'>
                          <table>
                              <tr><th>MOVIMIENTO</th></tr>
                              <tr><td  class='tabla-a'>Autorizado</td></tr>
                              <tr><td  class='tabla-a'>Comprobacion</td></tr>
                              <tr><td  class='tabla-a'>Reintrego/Rembolso</td></tr>
                          </table>
                          <table>
                              <tr><th>CANTIDAD</th></tr>
                              <tr><td><input class='input' /></td></tr>
                              <tr><td><input class='input' /></td></tr>
                              <tr><td><input class='input' /></td></tr>
                          </table>
                          <div class='concepto-1'>
                              <div>
                          <table class='tab-c'>
                              <tr><th>CONCEPTO</th></tr>
                              <tr><td><input class='input-c' /></td></tr>
                          </table>
                            </div>




                      <div class="combo">

                        <table class='tab-d'>
                            <tr><th>Oficio Solicitud</th></tr>
                            <tr><td><input class='input-d' /></td></tr>
                        </table>


                      <table class='tab-d'>
                          <tr><th>Area</th></tr>
                          <tr><td><input class='input-d' /></td></tr>
                      </table>


                    <table class='tab-d'>
                        <tr><th>Turno</th></tr>
                        <tr><td><input class='input-d' /></td></tr>
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
                  <tr><th>S/C</th></tr>
                </table>
                </div>

                <div>
                  <p>L.C. Nayra Ruiz Laguna<br/></p>
                  <p class="firmas-t">Autorizo</p>
                </div>
                <div>
                  <p>OK<br/></p>
                  <p class="firmas-t">Validado (NRL)</p>
                </div>
                <div>
                  <p>xxxx xxxx xxxx xxxx<br/></p>
                  <p class="firmas-t">Recibio</p>
                </div>
              </div>


              <div class='comprometo-1'>
              <p class='comprometo'>Me comprometo a entregar la comprobación que ampara el presente vale en un plazo no mayor  a 5 dias habiles posteriores a la fecha de recibido, de lo contrario reintegraré </p>
              </div>

              <ReactToPrint
                trigger={() => <buttom class="bont_imprimir">Imprimir</buttom>}
                content={()=> this.holi}
              />
              </div>
      )
  }

}
