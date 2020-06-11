import React, { Component } from 'react';
import './Registro.css';
import ListComponent from './ListComponent';
import firebase from '../../../Firebase';

export default class Registro extends Component {
  constructor () {
    super()
    this.state = {
      lista: [
        {
          id: 1,
          name: 'preuba',
          done: false
        },
      ],
      up: '',
      proy: '',
      ogasto: '',
      np: '',
      ene: '',
    }
  }

  componentDidMount() {
    const itemsRef = firebase.database().ref('presupuesto/');
    this.listenForItems(itemsRef);
  }

  listenForItems = (itemsRef) => {
    itemsRef.on('value', (snap) => {
      var lista = [];
      snap.forEach((child) => {
        lista.push({
          up: child.val().up,
          proy: child.val().proy,
          ogasto: child.val().ogasto,
          np: child.val().np,
          ene: child.val().ene,
          done: child.val().done,
          id: child.key
        });
      });
      this.setState({
        lista: lista
      });
    });
  }

  render() {
    return (
      <div className='pf-container'>
        <div className='site-pf'>
          <p className='site-pf-s'><b>Registro de Fondos 2020</b></p>
        </div>
        <div className='date-container'>
          <p className='p-title-size'><b>- Seleccione el mes para buscar</b></p>
        </div>
        <div>
          <ListComponent
            lista={this.state.lista}
          />
        </div>
      </div>
    )
  }
}
