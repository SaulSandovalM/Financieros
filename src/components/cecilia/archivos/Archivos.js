import React, { Component } from 'react';
import './Archivos.css';
import firebase from '../../../Firebase';
import ListComponent from './ListComponent';

export default class Archivos extends Component {
  constructor () {
    super()
    this.state = {
      lista: [
        {
          id: 1,
          name: 'prueba',
          done: false
        },
      ],
      oficioSname: '',
      oficioS: '',
      oficioAname: '',
      oficioA: '',
      excelName: '',
      excel: '',
    }
  }

  listenForItems = (itemsRef) => {
    itemsRef.on('value', (snap) => {
      var lista = [];
      snap.forEach((child) => {
        lista.push({
          oficioSname: child.val().oficioSname,
          oficioS: child.val().oficioS,
          oficioAname: child.val().oficioAname,
          oficioA: child.val().oficioA,
          excelName: child.val().excelName,
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

  componentDidMount() {
    const itemsRef = firebase.database().ref('presupuesto-inicial/');
    this.listenForItems(itemsRef);
  }

  render() {
    return (
      <div className='pf-container'>
        <div className='site-pf'>
          <p className='site-pf-s'><b>Archivos</b></p>
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
