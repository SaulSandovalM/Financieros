import React, { Component } from 'react';
import firebase from '../../../Firebase';
import './Banco.css';
import CurrencyFormat from 'react-currency-format';

export default class Banco extends Component {
  constructor(props) {
    super(props);
    this.ref = firebase.firestore().collection('banco').orderBy('no');
    this.unsubscribe = null;
    this.state = {
      contador: {},
      title: '',
      no: '',
      dirigido: '',
      cantidad: '',
      movimientos: [],
      buscador: ''
    };
  }

  onCollectionUpdate = (querySnapshot) => {
    const movimientos = [];
    querySnapshot.forEach((doc) => {
      const { title, no, dirigido, cantidad } = doc.data();
      movimientos.push({
        key: doc.id,
        doc,
        title,
        no,
        dirigido,
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

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value})
  }

  render() {

    // var today = new Date();
    // var dd = today.getDate();
    // var mm = today.getMonth()+1;
    // var yyyy = today.getFullYear();
    // if (dd < 10) {
    //   dd = '0' + dd
    // }
    // if(mm < 10){
    //   mm = '0' + mm
    // }
    //
    // today = yyyy + '-' + mm + '-' + dd;
    // const fechaM = '2020-06-08'

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
                   />
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
            <div className='table-banco-title'>
              <div className='table-no-row'>
                <b className='p-banco-map'>MOVIMIENTO REALIZADO</b>
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
          <div>
            {this.state.movimientos.map(movimientos =>
              <div>
                {this.state.buscador === movimientos.dirigido &&
                  <div className='banco-inputs-list'>
                    <div className='table-left'>
                    </div>
                    <div className='table-banco-title'>
                      <div className='table-no-row'>
                        <p className='p-banco-map'>{movimientos.title}</p>
                        <p className='p-banco-map'>{movimientos.no}</p>
                        <p className='p-banco-map'> -{movimientos.dirigido}</p>
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
