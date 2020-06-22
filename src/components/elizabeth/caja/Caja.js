import React, { Component } from 'react';
import firebase from '../../../Firebase';
import './Caja.css';
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
      movimientos: [],
      buscador: ''
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

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value})
  }

  render() {
    return (
      <div className='container-back'>
        <div className='site'>
          <p className='site-s'><b>Caja</b></p>
        </div>
        <div>
          <div className='caja-container'>
            <div className='caja-inputs'>
              <div className='disponible-banco'>
                <div>
                  <p className='cantidad-banco'>
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
            <div className='p-container-banco'>
              <p className='p-title-margin-ba'>BUSCADOR</p>
              <input
                className='input-style-banco'
                value={this.state.buscador}
                name='buscador'
                onChange={this.handleChange.bind(this)}
              />
            </div>
            <div className='banco-inputs-list2'>
              <div className='table-left'>
              </div>
              <div className='table-caja-title'>
                <div className='table-no-row'>
                  <b className='p-banco-map'>MOVIMIENTO REALIZADO</b>
                </div>
              </div>
              <div className='table-caja-fecha'>
                <div className='table-no-row'>
                  <b className='p-banco-map'>FECHA</b>
                </div>
              </div>
              <div className='table-banco-mov'>
                <div className='table-no-row'>
                  <b className='p-banco-map'>CANTIDAD</b>
                </div>
              </div>
              <div className='table-right'>
              </div>
            </div>
          </div>
          <div>
            {this.state.movimientos.map(movimientos =>
              <div>
                {this.state.buscador === movimientos.personaR &&
                  <div className='banco-inputs-list'>
                    <div className='table-left'>
                    </div>
                    <div className='table-caja-title'>
                      <div className='table-caja-row'>
                        <p className='p-banco-map'>{movimientos.title}</p>
                        <p className='p-banco-map'>{movimientos.no}</p>
                        <p className='p-banco-map'>{movimientos.personaR}</p>
                      </div>
                    </div>
                    <div className='table-caja-fecha'>
                      <div className='table-no-row'>
                        <b className='p-banco-map'>{movimientos.fecha}</b>
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
                }
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }
}
