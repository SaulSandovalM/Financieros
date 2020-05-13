import React, { Component } from 'react';
import firebase from '../../../Firebase';
import './Banco.css';
import ListComponent from './ListComponent';

export default class Banco extends Component {
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
      partida: '',
      up: '',
      proyecto: '',
      np: '',
      monto: '',
      porcentaje: ''
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
  }

  componentWillMount() {
    let formRef = firebase.database().ref('banco').orderByKey().limitToLast(6);
    formRef.on('child_added', snapshot => {
      const { partida, up, proyecto, np, monto, porcentaje } = snapshot.val();
      const data = { partida, up, proyecto, np, monto, porcentaje };
      this.setState({ form: [data].concat(this.state.form) });
    });
  }

  calcula(){
    var numero = document.getElementById('numero').value;
    var numerodecimal = parseFloat(numero);
    var subtotal = 0;
    subtotal += numerodecimal + numerodecimal ;
    document.getElementById('total').value = subtotal;
    }

  render() {
    return (
      <div class='container-back'>
        <div class='site'>
          <p class='site-s'><b>Banco</b></p>
        </div>
        <div class='caja-container'>
          <div class='caja-inputs'>
            <div class='caja-inputs-c'>
              <div class='input-row'>
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
                <p class='p-caja-dis'><b>SALDO DISPONIBLE</b></p>
                <p class='cantidad-caja' id='total'>MXN $1,000,000.00</p>
              </div>
            </div>
          </div>

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
