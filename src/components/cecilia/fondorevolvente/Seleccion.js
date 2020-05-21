import React, { Component } from 'react';
import firebase from '../../../Firebase';
import './Seleccion.css';
import ListComponent from './ListComponent';
import CurrencyFormat from 'react-currency-format';

export default class Seleccion extends Component {
  constructor () {
    super();
    this.state = {
      buscador: [],
      lista: [
        {
          id: 1,
          name: 'preuba',
          done: false
        },
      ],
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
          porcentajeB: child.val().porcentajeB,
          done: child.val().done,
          id: child.key
        });
      });
      this.setState({
        lista: lista
      });
    });
  }

  componentWillMount () {
    firebase.database().ref('presupuesto').on('child_added', snapshot => {
      this.setState({
        buscador: this.state.buscador.concat(snapshot.val())
      });
    });
  }

  componentDidMount() {
    const itemsRef = firebase.database().ref('banco/');
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
        console.log("No hay nada");
      }
    })
  }

  updateSearch(event) {
    this.setState({search: event.target.value.substr(0,20)});
  }

  render() {

    let filterData = this.state.buscador.filter(
      (buscador) => {
        return buscador.par.indexOf(this.state.search) !== -1;
      }
    );

    return (
      <div class='container-back'>
        <div class='site'>
          <p class='site-s'><b>Selección</b></p>
        </div>
        <div class='caja-container'>
          <div class='caja-inputs'>
            <div class='caja-inputs-c'>
              <div class='input-row'>
                <p class='p-caja'><b>PARTIDA</b></p>
                  <input
                    class='input-sc'
                    value={this.state.search}
                    onChange={this.updateSearch.bind(this)}
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
                <p class='p-caja-dis'><b>PORCENTAJE AGREGADO</b></p>
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
          <div class='caja-w-selec'>
            <div class='caja-col'>
            <div>
              <div class='caja-inputs'>
                <div class='tabla-pp'>
                </div>
                <div class='tabla-p'>
                  <b>UP</b>
                </div>
                <div class='tabla-p1-banco'>
                  <b>PARTIDA</b>
                </div>
                <div class='tabla-p2-select'>
                  <b>PROYECTO</b>
                </div>
                <div class='tabla-p3-select'>
                  <b>NOMBRE DEL PROYECTO</b>
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
              {
                filterData.map(buscador => (
                  <div class='caja-inputs'>
                    <div class='tabla-pp'>
                    </div>
                    <div class='tabla-p'>
                      <p>{buscador.up}</p>
                    </div>
                    <div class='tabla-p1-banco'>
                      <p>{buscador.par}</p>
                    </div>
                    <div class='tabla-p2-select'>
                      <p>{buscador.proy}</p>
                    </div>
                    <div class='tabla-p3-select'>
                      <p>{buscador.np}</p>
                    </div>
                    <div class='tabla-p4'>
                      <p>{buscador.dic}</p>
                    </div>
                    <div class='tabla-p5'>
                      <b></b>
                    </div>
                    <div class='tabla-pp2'>
                    </div>
                  </div>
                )).reverse()
              }
            </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
