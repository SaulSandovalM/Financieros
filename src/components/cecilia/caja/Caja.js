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
      numero: '',
      monto: '',
      fechaC: '',
      fechaE: '',
      estatus: '',
      usuario: '',
      banco: '',
      contador: {},
    };
  }

  listenForItems = (itemsRef) => {
    itemsRef.on('value', (snap) => {
      var lista = [];
      snap.forEach((child) => {
        lista.push({
          numero: child.val().numero,
          monto: child.val().monto,
          fechaC: child.val().fechaC,
          fechaE: child.val().fechaE,
          estatus: child.val().estatus,
          usuario: child.val().usuario,
          banco: child.val().banco,
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

  componentWillMount() {
    let formRef = firebase.database().ref('Caja').orderByKey().limitToLast(6);
    formRef.on('child_added', snapshot => {
      const { numero, monto, fechaC, fechaE, estatus, usuario, banco } = snapshot.val();
      const data = { numero, monto, fechaC, fechaE, estatus, usuario, banco };
      this.setState({ form: [data].concat(this.state.form) });
    });
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
        <div class='caja-container'>
          <div class='caja-inputs'>
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