import React, { Component } from 'react';
import './Prueba.css';
import firebaseConf from '../../../Firebase';
import ListComponent from './ListComponent';

export default class Prueba extends Component {
  constructor(props){
    super(props);
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
          nombre: child.val().nombre,
          apellidop: child.val().apellidop,
          apellidom: child.val().apellidom,
          placas: child.val().placas,
          modelo: child.val().modelo,
          color: child.val().color,
          telefono: child.val().telefono,
          fecha: child.val().fecha,
          hora: child.val().hora,
          status: child.val().status,
          marca: child.val().marca,
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
    const itemsRef = firebaseConf.database().ref('agenda-cita/');
    this.listenForItems(itemsRef);
  }

  update = (item) => {
    let updates = {};
    updates['agenda-cita/' + item.id] = {
      status: (this.props.item.hora * this.props.item.fecha),
      nombre: item.nombre,
      apellidop: item.apellidop,
      apellidom: item.apellidom,
      placas: item.placas,
      modelo: item.modelo,
      color: item.color,
      fecha: item.fecha,
      hora: item.hora,
      marca: item.marca,
    };
    firebaseConf.database().ref().update(updates);
  }

  render() {
    return (
      <div className="App" style={{height: '100vh'}}>
        <ListComponent
            lista={this.state.lista}
            update={this.update}
        />
      </div>
    );
  }
}
