import React, { Component } from 'react';
import firebase from '../../../Firebase';
import './Banco.css';
import ListComponent from './ListComponent';
import CurrencyFormat from 'react-currency-format';

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
    const itemsRef = firebase.database().ref('caja/');
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
        console.log("No hay nada!");
      }
    })
  }

  componentWillMount() {
    let formRef = firebase.database().ref('caja').orderByKey().limitToLast(6);
    formRef.on('child_added', snapshot => {
      const { partida, up, proyecto, np, monto, porcentaje } = snapshot.val();
      const data = { partida, up, proyecto, np, monto, porcentaje };
      this.setState({ form: [data].concat(this.state.form) });
    });
  }

  render() {
    return (
      <div class='banco-back'>
        <div class='site-banco'>
          <p class='site-banco-s'><b>Banco</b></p>
        </div>
        <div class='banco-container'>
          <div class='banco-inputs'>
            <div class='disponible-banco'>
              <div>
                <p class='cantidad-banco'>
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
          <div class='banco-w'>
            <div class='banco-col'>
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
