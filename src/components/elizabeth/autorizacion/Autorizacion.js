import React, { Component } from 'react';
import './Autorizacion.css';
import firebaseConf from '../../../Firebase';
import ListComponent from './ListComponent';

export default class Autorizacion extends Component {
  constructor(){
    super();
    this.state = {
      nuevo: '',
      lista: [
        {
          id: 1,
          name: 'preuba',
          done: false
        },
      ]
    }
  }

  listenForItems = (itemsRef) => {
    itemsRef.on('value', (snap) => {
      var lista = [];
      snap.forEach((child) => {
        lista.push({
          vale: child.val().vale,
          cheque: child.val().cheque,
          cantidad: child.val().cantidad,
          cantidadc: child.val().cantidadc,
          cantidadr: child.val().cantidadr,
          concepto: child.val().concepto,
          oficioS: child.val().oficioS,
          area: child.val().area,
          turno: child.val().turno,
          personaR: child.val().personaR,
          estatus: child.val().estatus,
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
    const itemsRef = firebaseConf.database().ref('vales/');
    this.listenForItems(itemsRef);
  }

  update = (item) => {
    let updates = {};
    updates['vales/' + item.id] = {
      vale: item.vale,
      cheque: item.cheque,
      cantidad: item.cantidad,
      concepto: item.concepto,
      oficioS: item.oficioS,
      area: item.area,
      turno: item.turno,
      personaR: item.personaR,
      cantidadc: item.cantidadc,
      cantidadr: item.cantidadr,
      estatus: 'Autorizado'
    };
    firebaseConf.database().ref().update(updates);
  }

  render() {
    return (
      <div className='banco-back'>
        <div className='site-banco'>
          <p className='site-banco-s'><b>Autorización</b></p>
        </div>
        <div className='banco-container'>
          <ListComponent
            lista={this.state.lista}
            update={this.update}
          />
        </div>
      </div>
    )
  }
}
