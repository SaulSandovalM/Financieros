import React, { Component } from 'react';
import firebase from '../../../Firebase';
import './Seleccion.css';
import ListComponent from './ListComponent';

export default class Seleccion extends Component {
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
      partida: '',
      up: '',
      proyecto: '',
      np: '',
      monto: '',
      porcentaje: '',
      contador: {},
    };
  }

  listenForItems = (itemsRef) => {
    itemsRef.on('value', (snap) => {
      var lista = [];
      snap.forEach((child) => {
        lista.push({
          partida: child.val().partida,
          up: child.val().up,
          proyecto: child.val().proyecto,
          np: child.val().np,
          monto: child.val().monto,
          porcentaje: child.val().porcentaje,
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
    const itemsRef = firebase.database().ref('banco/');
    this.listenForItems(itemsRef);
    this.consumo();
    setInterval(this.consumo, 5000);
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
    let formRef = firebase.database().ref('banco').orderByKey().limitToLast(1);
    formRef.on('child_added', snapshot => {
      const { partida, up, proyecto, np, monto, porcentaje } = snapshot.val();
      const data = { partida, up, proyecto, np, monto, porcentaje };
      this.setState({ form: [data].concat(this.state.form) });
    });
  }

  sendMessage(e) {
    e.preventDefault();

    const params = {
      partida: this.inputPartida.value,
      up: this.inputUp.value,
      proyecto: this.inputProyecto.value,
      np: this.inputNp.value,
      monto: this.inputMonto.value,
      porcentaje: this.inputPorcentaje.value
   };
   this.setState({
     partida: this.inputPartida.value,
     up: this.inputUp.value,
     proyecto: this.inputProyecto.value,
     np: this.inputNp.value,
     monto: this.inputMonto.value,
     porcentaje: this.inputPorcentaje.value
   })

   if ( params.partida && params.up && params.proyecto && params.np && params.monto && params.porcentaje ) {
     var f = parseInt(params.monto);
     console.log(f);

     const statsRef = firebase.firestore().collection('banco').doc('--stats--');

     const increment = firebase.firestore.FieldValue.increment(f);

     const batch = firebase.firestore().batch();
     const storyRef = firebase.firestore().collection('banco').doc(`${Math.random()}`);
     batch.set(storyRef, { title: 'Nuevo Fondo!' });
     batch.set(statsRef, { storyCount: increment }, { merge: true });
     batch.commit();

     firebase.database().ref('banco').push(params).then(() => {
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

    const { partida, up, proyecto, np, monto, porcentaje } = this.state;

    return (
      <div class='container-back'>
        <div class='site'>
          <p class='site-s'><b>Selección</b></p>
        </div>
        <form class='caja-container' onSubmit={this.sendMessage.bind(this)} ref='contactForm'>
          <div class='caja-inputs'>
            <div class='caja-inputs-c'>
              <div class='input-row'>
                <p class='p-caja'><b>UP</b></p>
                <input
                  class='input-sc'
                  id='partida'
                  required
                  ref={partida => this.inputPartida = partida}
                />
              </div>
              <div class='input-row'>
                <p class='p-caja'><b>Partida</b></p>
                <input
                  class='input-sc'
                  id='up'
                  required
                  ref={up => this.inputUp = up}
                />
              </div>
              <div class='input-row'>
                <p class='p-caja'><b>Proyecto</b></p>
                <input
                  class='input-sc'
                  id='proyecto'
                  required
                  ref={proyecto => this.inputProyecto = proyecto}
                />
              </div>
              <div class='input-row'>
                <p class='p-caja'><b>Nombre del Proyecto</b></p>
                <input
                  class='input-sc'
                  id='np'
                  required
                  ref={np => this.inputNp = np}
                />
              </div>
            </div>
            <div class='disponible'>
              <div>
                <p class='p-caja-dis'><b>SALDO SELECCIONADO</b></p>
                <p class='cantidad-caja'>MXN $0.00</p>
              </div>
            </div>
          </div>

          <div class='caja-inputs' style={{marginTop: '40px', marginBottom: '40px'}}>
            <div class='caja-inputs-c'>
              <div class='input-row'>
                <p class='p-caja'><b>Monto</b></p>
                <input
                  class='input-sc'
                  id='monto'
                  required
                  ref={monto => this.inputMonto = monto}
                />
              </div>
              <div class='input-row'>
                <p class='p-caja'><b>Porcentaje</b></p>
                <input
                  class='input-sc'
                  id='porcentaje'
                  required
                  ref={porcentaje => this.inputPorcentaje = porcentaje}
                />
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

          {/*<div class=''>
            <div class='caja-inputs'>
              <div class='tabla-pp'>
              </div>
              <div class='tabla-p'>
                <b>UP</b>
              </div>
              <div class='tabla-p1-banco'>
                <b>PROYECTO</b>
              </div>
              <div class='tabla-p2-select'>
                <b>NOMPRE DEL PROYECTO</b>
              </div>
              <div class='tabla-p4'>
                <b>MONTO</b>
              </div>
              <div class='tabla-p5'>
                <b>PORCENTAJE</b>
              </div>
              <div class='tabla-pp2'>
              </div>
            </div>
          </div>*/}

        </form>
      </div>
    )
  }
}