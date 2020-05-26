import React, { Component } from 'react';
import firebase from '../../../Firebase';
import ListComponent from './ListComponent';
import './Vales.css';
import ReactToPrint from 'react-to-print';

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
      movimiento: '',
      cantidad: '',
      concepto: '',
      oficioS: '',
      area: '',
      turno: '',
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
      const { vale, cheque, movimiento, cantidad, concepto, oficioS, area, turno, personaR, proveedor } = snapshot.val();
      const data = { vale, cheque, movimiento, cantidad, concepto, oficioS, area, turno, personaR, proveedor };
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
      personaR: this.inputPersona.value,
      proveedor: this.inputProveedor.value
    })
    if ( params.vale && params.cheque && params.movimiento && params.cantidad && params.concepto && params.oficioS && params.area && params.turno && params.personaR && params.proveedor ) {
      var f = parseInt(params.cantidad);
      const statsRef = firebase.firestore().collection('caja').doc('--stats--');
      const increment = firebase.firestore.FieldValue.increment(-f);
      const batch = firebase.firestore().batch();
      const storyRef = firebase.firestore().collection('caja').doc(`${Math.random()}`);
      batch.set(storyRef, { title: 'Se Genero Un Vale', cantidad: '-'+f });
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
                value={this.state.contador.storyCount}
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
              <p class='p-caja'><b>Movimiento</b></p>
              <input
                class='input-sc'
                id='movimiento'
                required
                ref={movimiento => this.inputMovimiento = movimiento}
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
          </div>
          <div className='form-container-2'>
            <div className='vale-content'>
              <p class='p-caja'><b>Oficio Solicitud</b></p>
              <input
                class='input-sc'
                id='oficioS'
                required
                ref={oficioS => this.inputOficio = oficioS}
              />
            </div>
            <div className='vale-content'>
              <p class='p-caja'><b>Area</b></p>
              <input
                class='input-sc'
                id='area'
                required
                ref={area => this.inputArea = area}
              />
            </div>
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
                type="checkbox"
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
