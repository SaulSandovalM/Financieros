import React, { Component } from 'react';
import './Fondor.css';
import RowComponent from './RowComponent';
import firebase from '../../../Firebase';

export default class ListComponent extends Component {
  constructor (props) {
    super(props);
    this.state = {
      presupuesto: [],
      search: '',
      search2: '',
      search3: '',
    };
 }

  componentWillMount () {
    firebase.database().ref('presupuesto/').on('child_added', snapshot => {
      this.setState({
        presupuesto: this.state.presupuesto.concat(snapshot.val())
      });
    });
  }

  updateSeacrh(event) {
    this.setState({search: event.target.value.substr(0,20)})
  }

  updateSeacrh2(event) {
    this.setState({search2: event.target.value.substr(0,20)})
  }

  updateSeacrh3(event) {
    this.setState({search3: event.target.value.substr(0,20)})
  }

  sendMessage(e) {
    e.preventDefault();
    const params = {
      archivo: this.state.archivo,
      up: this.inputUp.value,
      par: this.inputPartida.value,
      rubro: this.inputRubro.value,
      importe: this.inputImporte.value,
    };
    this.setState({
      archivo: this.state.archivo,
      up: this.inputUp.value,
      par: this.inputPartida.value,
      rubro: this.inputRubro.value,
      importe: this.inputImporte.value,
    })
    if ( params.up && params.par && params.importe && params.rubro && params.archivo ) {
      var f = parseInt(params.importe);
      const statsRef = firebase.firestore().collection('banco').doc('--stats--');
      const increment = firebase.firestore.FieldValue.increment(f);
      const batch = firebase.firestore().batch();
      const storyRef = firebase.firestore().collection('banco').doc(`${Math.random()}`);
      batch.set(storyRef, { title: 'Se agredo un fondo' });
      batch.set(statsRef, { storyCount: increment }, { merge: true });
      batch.commit();
      firebase.database().ref('banco').push(params).then(() => {
        alert('Tu solicitud fue enviada.');
      }).catch(() => {
        alert('Tu solicitud no puede ser enviada');
      });
      this.resetForm();
      setInterval(this.consumo, 1000);
    } else {
      alert('Por favor llene el formulario');
    };
  }

  render() {

    let filterData = this.state.presupuesto.filter(
      (presupuesto) => {
        return presupuesto.par.indexOf(this.state.search) !== -1 && presupuesto.up.indexOf(this.state.search2) >= 0 && presupuesto.rubro.indexOf(this.state.search3) >= 0;
      }
    );

    return (
      
    );
  }
}
