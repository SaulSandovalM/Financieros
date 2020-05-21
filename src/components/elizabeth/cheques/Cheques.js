import React, { Component } from 'react';
import firebase from '../../../Firebase';
import './Cheques.css';
import ListComponent from './ListComponent';
import CurrencyFormat from 'react-currency-format';

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

  render() {

    const { numCheque, importe, fechaE, fechaC } = this.state;

    return (
      <div class='container-back'>
        <div class='site'>
          <p class='site-s'><b>Cheques</b></p>
        </div>
        <div>
          <form class='caja-container' onSubmit={this.sendMessage.bind(this)} ref='contactForm'>
            <div class='caja-inputs'>
              <div class='caja-inputs-c'>
                <div class='input-row'>
                  <p class='p-caja'><b># Cheque</b></p>
                  <input
                    class='input-sc'
                    id='numCheque'
                    required
                    ref={numCheque => this.inputCheque = numCheque}
                  />
                </div>
                <div class='input-row'>
                  <p class='p-caja'><b>Importe</b></p>
                  <input
                    class='input-sc'
                    id='importe'
                    required
                    ref={importe => this.inputImporte = importe}
                  />
                </div>
                <div class='input-row'>
                  <p class='p-caja'><b>Fecha de Emisión</b></p>
                  <input
                    class='input-sc'
                    id='fechaE'
                    required
                    ref={fechaE => this.inputFechaE = fechaE}
                  />
                </div>
                <div class='input-row'>
                  <p class='p-caja'><b>Fecha de Cobro</b></p>
                  <input
                    class='input-sc'
                    id='fechaC'
                    required
                    ref={fechaC => this.inputFechaC = fechaC}
                  />
                </div>
              </div>
              <div class='disponible'>
                <div>
                  <p class='p-caja-dis'><b>DINERO DISPONIBLE</b></p>
                  <p class='cantidad-caja'>
                    MXN
                    <CurrencyFormat
                      value={this.state.contador.storyCount}
                      displayType={'text'}
                      thousandSeparator={true}
                      prefix={' $'}
                      decimalSeparator={'.'} />
                    .00<
                  /p>
                </div>
              </div>
            </div>

            <div class='caja-inputs' style={{marginTop: '40px', marginBottom: '40px'}}>
              <div class='caja-inputs-c'>
                <div class='input-row'>
                  <p class='p-caja'><b>Archivo</b></p>
                  <input
                    class='input-sc'
                  />
                </div>
                <div class='input-row'>
                </div>
                <div class='input-row'>
                </div>
                <div class='input-row'>
                </div>
              </div>
              <div class='disponible'>
                <div>
                  <div class='input-row-2'>
                    <p style={{marginTop: '4px'}}></p>
                    <button type='submit' class='input-sc boton-g'>Guardar</button>
                  </div>
                </div>
              </div>
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
      </div>
    )
  }
}
