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
          <p class='site-s'><b>Vales</b></p>
        </div>
        <form>
          <div className='form-container'>
            <div className='vale-content'>
              <p class='p-caja'><b># Vale</b></p>
              <input
                class='input-sc'
                id='partida'
                required
                ref={partida => this.inputPartida = partida}
              />
            </div>
            <div className='vale-content'>
              <p class='p-caja'><b># Cheque</b></p>
              <input
                class='input-sc'
                id='partida'
                required
                ref={partida => this.inputPartida = partida}
              />
            </div>
            <div className='vale-content'>
              <p class='p-caja'><b>Cantidad</b></p>
              <input
                class='input-sc'
                id='partida'
                required
                ref={partida => this.inputPartida = partida}
              />
            </div>
            <div className='vale-content'>
              <p class='p-caja'><b>Concepto</b></p>
              <input
                class='input-sc'
                id='partida'
                required
                ref={partida => this.inputPartida = partida}
              />
            </div>
            <div className='vale-content'>
              <p class='p-caja'><b>Oficio de Solicitud</b></p>
              <input
                class='input-sc'
                id='partida'
                required
                ref={partida => this.inputPartida = partida}
              />
            </div>
          </div>
          <div className='form-container-2'>
            <div className='vale-content'>
              <p class='p-caja'><b>Turno</b></p>
              <input
                class='input-sc'
                id='partida'
                required
                ref={partida => this.inputPartida = partida}
              />
            </div>
            <div className='vale-content'>
              <p class='p-caja'><b>Recibo Simple</b></p>
              <input
                class='input-sc'
                id='partida'
                required
                ref={partida => this.inputPartida = partida}
              />
            </div>
            <div className='vale-content'>
              <p class='p-caja'><b>Reintegro Total</b></p>
              <input
                class='input-sc'
                id='partida'
                required
                ref={partida => this.inputPartida = partida}
              />
            </div>
            <div className='vale-content'>
              <p class='p-caja'><b>Fecha Creación</b></p>
              <input
                class='input-sc'
                id='partida'
                required
                ref={partida => this.inputPartida = partida}
              />
            </div>
            <div className='vale-content'>
              <p class='p-caja'><b>Fecha Edición</b></p>
              <input
                class='input-sc'
                id='partida'
                required
                ref={partida => this.inputPartida = partida}
              />
            </div>
          </div>
          <div className='form-container-2'>
            <div className='vale-content'>
              <p class='p-caja'><b>Comprobado</b></p>
              <input
                class='input-sc'
                id='partida'
                required
                ref={partida => this.inputPartida = partida}
              />
            </div>
            <div className='vale-content'>
              <p class='p-caja'><b>Estatus</b></p>
              <input
                class='input-sc'
                id='partida'
                required
                ref={partida => this.inputPartida = partida}
              />
            </div>
            <div className='vale-content'>
              <p class='p-caja'><b>Factura</b></p>
              <input
                class='input-sc'
                id='partida'
                required
                ref={partida => this.inputPartida = partida}
              />
            </div>
            <div className='vale-content'>
              <p class='p-caja'><b>Dirección</b></p>
              <input
                class='input-sc'
                id='partida'
                required
                ref={partida => this.inputPartida = partida}
              />
            </div>
            <div className='vale-content'>
              <p class='p-caja'><b>Movimientos</b></p>
              <input
                class='input-sc'
                id='partida'
                required
                ref={partida => this.inputPartida = partida}
              />
            </div>
          </div>
          <div className='form-container-2'>
            <div className='vale-content'>
              <p class='p-caja'><b>Valida</b></p>
              <input
                class='input-sc'
                id='partida'
                required
                ref={partida => this.inputPartida = partida}
              />
            </div>
            <div className='vale-content'>
              <p class='p-caja'><b>Persona que Recibe</b></p>
              <input
                class='input-sc'
                id='partida'
                required
                ref={partida => this.inputPartida = partida}
              />
            </div>
            <div className='vale-content'>
              <p class='p-caja'><b>Proveedor</b></p>
              <input
                class='input-sc'
                id='partida'
                required
                ref={partida => this.inputPartida = partida}
              />
            </div>
            <div className='vale-content'>
              <p class='p-caja'><b>Usuario</b></p>
              <input
                class='input-sc'
                id='partida'
                required
                ref={partida => this.inputPartida = partida}
              />
            </div>
            <div className='vale-content'>
              <p class='p-caja'><b>Autoriza</b></p>
              <input
                class='input-sc'
                id='partida'
                required
                ref={partida => this.inputPartida = partida}
              />
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
    )
  }
}
