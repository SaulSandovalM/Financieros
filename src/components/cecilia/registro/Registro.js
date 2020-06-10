import React, { Component } from 'react';
import './Registro.css';
import ListComponent from './ListComponent';

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
      fileName: '',
      oficioS: '',
      oficioA: '',
      excel: '',
    }
  }

  listenForItems = (itemsRef) => {
    itemsRef.on('value', (snap) => {
      var lista = [];
      snap.forEach((child) => {
        lista.push({
          fileName: child.val().fileName,
          oficioS: child.val().oficioS,
          oficioA: child.val().oficioA,
          excel: child.val().excel,
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
          <p className='site-pf-s'><b>Meses</b></p>
        </div>
        <div className='date-container'>
          <p><b>Seleccione el rango de fechas a buscar</b></p>
        </div>
        <div className='date-container'>
          <input type='date' className='margin-input'/>
          <input type='date' className='margin-input'/>
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
