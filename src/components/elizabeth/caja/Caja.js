import React, { Component } from 'react';
import firebase from '../../../Firebase';
import './Caja.css';
import ListComponent from './ListComponent';
import CurrencyFormat from 'react-currency-format';

export default class Caja extends Component {
  constructor(props) {
    super(props);
    this.ref = firebase.firestore().collection('caja');
    this.unsubscribe = null;
    this.state = {
      contador: {},
      title: '',
      no: '',
      personaR: '',
      cantidad: '',
      movimientos: []
    };
  }

  onCollectionUpdate = (querySnapshot) => {
    const movimientos = [];
    querySnapshot.forEach((doc) => {
      const { title, no, personaR, cantidad } = doc.data();
      movimientos.push({
        key: doc.id,
        doc,
        title,
        no,
        personaR,
        cantidad
      });
    });
    this.setState({
      movimientos
   });
  }

  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
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
        console.log("No hay nada!");
      }
    })
  }

  render() {
    return (
      <div class='container-back'>
        <div class='site'>
          <p class='site-s'><b>Caja</b></p>
        </div>
        <div>
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
          </div>
          <div>
            {this.state.movimientos.map(movimientos =>
              <div className='banco-inputs-list'>
                <div className='table-left'>
                </div>
                <div className='table-banco-title'>
                  <div className='table-caja-row'>
                    <p className='p-banco-map'>{movimientos.title}</p>
                    <p className='p-banco-map'>{movimientos.no}</p>
                    <p className='p-banco-map'>{movimientos.personaR}</p>
                  </div>
                </div>
                <div className='table-banco-mov'>
                  <div>
                    <CurrencyFormat
                      value={movimientos.cantidad}
                      displayType={'text'}
                      thousandSeparator={true}
                      prefix={' $'}
                    />
                  </div>
                </div>
                <div className='table-right'>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }
}
