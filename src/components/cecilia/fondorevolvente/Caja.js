import React, { Component } from 'react';
import firebase from '../../../Firebase';
import './Altas.css';
import ListComponent from './ListComponent';

export default class Caja extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nuevo: '',
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
      nombre: '',
      numero: '',
      contador: {},
    };
  }

  listenForItems = (itemsRef) => {
    itemsRef.on('value', (snap) => {
      var lista = [];
      snap.forEach((child) => {
        lista.push({
          nombre: child.val().nombre,
          numero: child.val().numero,
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
    const itemsRef = firebase.database().ref('Caja/');
    this.listenForItems(itemsRef);
    this.consumo();
    setInterval(this.consumo, 500);
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
    let formRef = firebase.database().ref('Caja').orderByKey().limitToLast(6);
    formRef.on('child_added', snapshot => {
      const { nombre, numero } = snapshot.val();
      const data = { nombre, numero };
      this.setState({ form: [data].concat(this.state.form) });
    });
  }

 sendMessage(e) {
   e.preventDefault();
   const params = {
     nombre: this.inputNombre.value,
     numero: this.inputNumero.value
   };
   this.setState({
     nombre: this.inputNombre.value,
     numero: this.inputNumero.value
   })
   if ( params.nombre && params.numero) {
     firebase.database().ref('Caja').push(params).then(() => {
       this.showAlert('success', 'Tu solicitud fue enviada.');
     }).catch(() => {
       this.showAlert('danger', 'Tu solicitud no puede ser enviada');
     });
     const statsRef = firebase.firestore().collection('Caja').doc('--stats--');
     const increment = firebase.firestore.FieldValue.increment(1);
     const batch = firebase.firestore().batch();
     const storyRef = firebase.firestore().collection('Caja').doc(`${Math.random()}`);
     batch.set(storyRef, { title: 'Caja' });
     batch.set(statsRef, { storyCount: increment }, { merge: true });
     batch.commit();
     this.resetForm();
   } else {
     this.showAlert('warning', 'Por favor llene el formulario');
   };
 }

  consumo = () => {
    const ref = firebase.firestore().collection('Caja').doc('--stats--');
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

  render() {
    return (
      <div class='container-back'>
        <div class='site'>
          <p class='site-s'><b>Caja</b></p>
        </div>
        <form class='caja-container' onSubmit={this.sendMessage.bind(this)} ref='contactForm'>
          <div class='caja-inputs'>
            <div class='caja-inputs-c'>
              <div class='input-row'>
                <p class='p-caja'><b>Nombre</b></p>
                <input
                  class='input-sc'
                  id='numero'
                  placeholder='Nombre(s)'
                  required
                  ref={numero => this.inputNumero = numero}
                  value={this.state.contador.storyCount}
                />
              </div>
              <div class='input-row'>
                <p class='p-caja'><b>Nombre</b></p>
                <input
                  class='input-sc'
                  placeholder='Nombre'
                  id='nombre'
                  placeholder='Nombre(s)'
                  required
                  ref={nombre => this.inputNombre = nombre}
                />
              </div>
              <div class='input-row'>
                <p class='p-caja'><b>Nombre</b></p>
                <input class='input-sc' placeholder='Nombre'/>
              </div>
              <div class='input-row'>
                <p class='p-caja'><b>Nombre</b></p>
                <input class='input-sc' placeholder='Nombre'/>
              </div>
            </div>
            <div class='disponible'>
              <div>
                <p class='p-caja-dis'><b>SALDO DISPONIBLE</b></p>
                <p class='cantidad-caja'>MXN $0.00</p>
              </div>
            </div>
          </div>

          <div class='caja-inputs' style={{marginTop: '40px', marginBottom: '40px'}}>
            <div class='caja-inputs-c'>
              <div class='input-row'>
                <p class='p-caja'><b>Nombre</b></p>
                <input class='input-sc' placeholder='Nombre'/>
              </div>
              <div class='input-row'>
                <p class='p-caja'><b>Nombre</b></p>
                <input class='input-sc' placeholder='Nombre'/>
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

          <div class='caja-w'>
            <div class='caja-col'>
              <ListComponent
                lista={this.state.lista}
              />
            </div>
          </div>

          <div class='caja-w'>
            <div class='caja-col' style={{marginTop: '0px'}}>
              <div class='caja-inputs'>
                <div class='final-start'>
                </div>
                <div class='final-start-2'>
                  <div class='final-col'>
                    <div class='final-he'>
                      <b>Total</b>
                      <b>0.00</b>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </form>
      </div>
    )
  }
}
