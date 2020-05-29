import React, { Component } from 'react';
import firebase from '../../../Firebase';
import './Cheques.css';
import ListComponent from './ListComponent';
import CurrencyFormat from 'react-currency-format';
import Dropzone from 'react-dropzone';

export default class Cheques extends Component {
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
      contadorCheques: {}
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
    this.consumob();
    this.consumoc();
  }

  consumob = () => {
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

  consumoc = () => {
    const ref = firebase.firestore().collection('cheques').doc('--stats--');
    ref.get().then((doc) => {
      if (doc.exists) {
        this.setState({
          contadorCheques: doc.data(),
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

  handleUpload (event) {
    const file = event.target.files[0];
    const storageRef = firebase.storage().ref(`cheques/${file.name}`);
    const task = storageRef.put(file);
    task.on('state_changed', snapshot => {
      let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      this.setState({
        uploadValue: percentage
      })
    }, error => {
      console.error(error.message);
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
      batch.set(storyRef, { title: 'Se Genero Cheque', cantidad: '-'+f });
      batch.set(statsRef, { storyCount: increment }, { merge: true });
      batch.commit();
      const statsRefT = firebase.firestore().collection('caja').doc('--stats--');
      const increments = firebase.firestore.FieldValue.increment(f);
      const batchs = firebase.firestore().batch();
      const storyRefs = firebase.firestore().collection('caja').doc(`${Math.random()}`);
      batchs.set(storyRefs, { title: 'Aumento Caja!', cantidad: '+'+f });
      batchs.set(statsRefT, { storyCount: increments }, { merge: true });
      batchs.commit();
      const statsRefc = firebase.firestore().collection('cheques').doc('--stats--');
      const incrementc = firebase.firestore.FieldValue.increment(1);
      const batchc = firebase.firestore().batch();
      const storyRefc = firebase.firestore().collection('cheques').doc(`${Math.random()}`);
      batchc.set(storyRefc, { title: 'Caja + y Banco -' });
      batchc.set(statsRefc, { storyCount: incrementc }, { merge: true });
      batchc.commit();
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

  render() {
    return (
      <div class='container-back-cheques'>
        <div class='site-cheques'>
          <p class='site-s-cheques'><b>Cheques</b></p>
        </div>
        <div>
          <form class='cheques-container' onSubmit={this.sendMessage.bind(this)} ref='contactForm'>
            <div class='cheques-inputs'>
              <div class='cheques-inputs-c'>
                <div class='input-row-cheque'>
                  <p class='p-cheque'><b># Cheque</b></p>
                  <input
                    class='input-sc-cheque'
                    id='numCheque'
                    required
                    ref={numCheque => this.inputCheque = numCheque}
                    value={this.state.contadorCheques.storyCount}
                  />
                </div>
                <div class='input-row-cheque'>
                  <p class='p-cheque'><b>Importe</b></p>
                  <input
                    class='input-sc-cheque'
                    id='importe'
                    required
                    ref={importe => this.inputImporte = importe}
                  />
                </div>
                <div class='input-row-cheque'>
                  <p class='p-cheque'><b>Fecha de Emisión</b></p>
                  <input
                    class='input-sc-cheque'
                    id='fechaE'
                    required
                    ref={fechaE => this.inputFechaE = fechaE}
                  />
                </div>
                <div class='input-row-cheque'>
                  <p class='p-cheque'><b>Fecha de Cobro</b></p>
                  <input
                    class='input-sc-cheque'
                    id='fechaC'
                    required
                    ref={fechaC => this.inputFechaC = fechaC}
                  />
                </div>
              </div>
              <div class='disponible-cheque'>
                <div>
                  <p class='p-cheque-dis'><b>DINERO DISPONIBLE</b></p>
                  <p class='cantidad-cheque'>
                    MXN
                    <CurrencyFormat
                      value={this.state.contador.storyCount}
                      displayType={'text'}
                      thousandSeparator={true}
                      prefix={' $'}
                      decimalSeparator={'.'} />
                    .00
                  </p>
                </div>
              </div>
            </div>
            <div class='cheque-inputs'>
              <div class='cheques-inputs-c'>
                <div class='input-row-cheque'>
                  <p class='p-cheque'><b>Archivo</b></p>
                  <Dropzone
                    style={{
                      position: 'ab',
                      width: '100%',
                      height: '29px',
                      borderWidth: '1px',
                      borderColor: '#a9a9a9',
                      borderStyle: 'solid',
                      background: 'white',
                    }}
                    accept=".pdf" onChange={this.handleUpload.bind(this)}>
                  </Dropzone>
                </div>
                <div class='input-row-cheque'>
                </div>
                <div class='input-row-cheque'>
                </div>
                <div class='input-row-cheque'>
                </div>
              </div>
              <div class='disponible-cheque'>
                <div>
                  <div class='input-row-2-cheque'>
                    <button type='submit' class='input-sc-cheque boton-g-cheque'>Guardar</button>
                  </div>
                </div>
              </div>
            </div>
          </form>
          <div class='cheques-w'>
            <div class='cheques-col'>
              <ListComponent
                lista={this.state.lista}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}
