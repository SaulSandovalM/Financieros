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
      fileName: '',
      oficioS: '',
      oficioA: '',
      excel: '',
      image: ''
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
          image: child.val().image,
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
    const itemsRef = firebase.database().ref('pictures/');
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
