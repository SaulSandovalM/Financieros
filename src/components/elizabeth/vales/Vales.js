import React, { Component } from 'react';
import firebase from '../../../Firebase';
import ListComponent from './ListComponent';
import './Vales.css';

export default class Vales extends Component {
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
      cantidad: '',
      concepto: '',
      oficioS: '',
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
          cantidad: child.val().cantidad,
          concepto: child.val().concepto,
          oficioS: child.val().oficioS,
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
      const { vale, cheque, cantidad, concepto, oficioS, turno, reintegroT, estatus, personaR, proveedor } = snapshot.val();
      const data = { vale, cheque, cantidad, concepto, oficioS, turno, reintegroT, estatus, personaR, proveedor };
      this.setState({ form: [data].concat(this.state.form) });
    });
  }

  sendMessage(e) {
    e.preventDefault();
    const params = {
      vale: this.inputVale.value,
      cheque: this.inputCheque.value,
      cantidad: this.inputCantidad.value,
      concepto: this.inputConcepto.value,
      oficioS: this.inputOficio.value,
      turno: this.inputTurno.value,
      reintegroT: this.inputReintegro.value,
      estatus: this.inputEstatus.value,
      personaR: this.inputPersona.value,
      proveedor: this.inputProveedor.value
    };
    this.setState({
      vale: this.inputVale.value,
      cheque: this.inputCheque.value,
      cantidad: this.inputCantidad.value,
      concepto: this.inputConcepto.value,
      oficioS: this.inputOficio.value,
      turno: this.inputTurno.value,
      reintegroT: this.inputReintegro.value,
      estatus: this.inputEstatus.value,
      personaR: this.inputPersona.value,
      proveedor: this.inputProveedor.value
    })
    if ( params.vale && params.cheque && params.cantidad && params.concepto && params.oficioS && params.turno && params.reintegroT && params.estatus && params.personaR && params.proveedor ) {
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

  render() {

    const { vale, cheque, cantidad, concepto, oficioS, turno, reintegroT, estatus, personaR, proveedor } = this.state;

    return (
      <div class='container-back'>
        <div class='site'>
          <p class='site-s'><b>Vales</b></p>
        </div>
        <form onSubmit={this.sendMessage.bind(this)} ref='contactForm'>
          <div className='form-container'>
            <div className='vale-content'>
              <p class='p-caja'><b># Vale</b></p>
              <input
                class='input-sc'
                id='vale'
                required
                ref={vale => this.inputVale = vale}
              />
            </div>
            <div className='vale-content'>
              <p class='p-caja'><b># Cheque</b></p>
              <input
                class='input-sc'
                id='cheque'
                required
                ref={cheque => this.inputCheque = cheque}
              />
            </div>
            <div className='vale-content'>
              <p class='p-caja'><b>Cantidad</b></p>
              <input
                class='input-sc'
                id='cantidad'
                required
                ref={cantidad => this.inputCantidad = cantidad}
              />
            </div>
            <div className='vale-content'>
              <p class='p-caja'><b>Concepto</b></p>
              <input
                class='input-sc'
                id='concepto'
                required
                ref={concepto => this.inputConcepto = concepto}
              />
            </div>
            <div className='vale-content'>
              <p class='p-caja'><b>Oficio de Solicitud</b></p>
              <input
                class='input-sc'
                id='oficioS'
                required
                ref={oficioS => this.inputOficio = oficioS}
              />
            </div>
          </div>
          <div className='form-container-2'>
            <div className='vale-content'>
              <p class='p-caja'><b>Turno</b></p>
              <input
                class='input-sc'
                id='turno'
                required
                ref={turno => this.inputTurno = turno}
              />
            </div>
            <div className='vale-content'>
              <p class='p-caja'><b>Reintegro Total</b></p>
              <input
                class='input-sc'
                id='reintegroT'
                required
                ref={reintegroT => this.inputReintegro = reintegroT}
              />
            </div>
            <div className='vale-content'>
              <p class='p-caja'><b>Estatus</b></p>
              <input
                class='input-sc'
                id='estatus'
                required
                ref={estatus => this.inputEstatus = estatus}
              />
            </div>
            <div className='vale-content'>
              <p class='p-caja'><b>Persona que recibe</b></p>
              <input
                class='input-sc'
                id='personaR'
                required
                ref={personaR => this.inputPersona = personaR}
              />
            </div>
            <div className='vale-content'>
              <p class='p-caja'><b>Proveedor</b></p>
              <input
                class='input-sc'
                id='proveedor'
                required
                ref={proveedor => this.inputProveedor = proveedor}
              />
            </div>
          </div>
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
