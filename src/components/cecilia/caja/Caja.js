import React, { Component } from 'react';
import firebase from '../../../Firebase';
import './Caja.css';
import ListComponent from './ListComponent';
import CurrencyFormat from 'react-currency-format';

export default class Caja extends Component {
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
      partida: '',
      up: '',
      proyecto: '',
      np: '',
      monto: '',
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
    const itemsRef = firebase.database().ref('caja/');
    this.listenForItems(itemsRef);
    this.consumo();
  }

  consumo = () => {
    const ref = firebase.firestore().collection('caja').doc('--stats--');
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
      const { partida, up, proyecto, np, monto } = snapshot.val();
      const data = { partida, up, proyecto, np, monto };
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
      monto: this.inputMonto.value
   };
   this.setState({
     partida: this.inputPartida.value,
     up: this.inputUp.value,
     proyecto: this.inputProyecto.value,
     np: this.inputNp.value,
     monto: this.inputMonto.value
   })

   if ( params.partida && params.up && params.proyecto && params.np && params.monto ) {
     var f = parseInt(params.monto);
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
     firebase.database().ref('caja').push(params).then(() => {
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
          <p class='site-s'><b>Caja</b></p>
        </div>
        <div>
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
                  <p class='p-caja-dis'><b>DINERO EN CAJA</b></p>
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
                  <p class='p-caja'><b>Monto</b></p>
                  <input
                    class='input-sc'
                    id='monto'
                    required
                    ref={monto => this.inputMonto = monto}
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
