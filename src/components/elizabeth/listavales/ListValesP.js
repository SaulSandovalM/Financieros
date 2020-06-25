import React, { Component } from 'react';
import firebase from '../../../Firebase';
import ListComponent from './ListComponent';
import './ListVales.css';
import ReactToPrint from 'react-to-print';
import logovale from '../../../img/logovale.png';
import logoh from '../../../img/logoh.png';

export default class ListValesP extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lista: [
        {
          id: 1,
          name: 'preuba',
          done: false
        },
      ],
      form: [],
      alert: false,
      alertData: {},
      vale: '',
      cheque: '',
      cantidad: '',
      cantidadc: '',
      cantidadr: '',
      concepto: '',
      oficioS: '',
      area: '',
      turno: '',
      personaR: '',
      autorizo: '',
      factura: '',
      recibos: '',
      sc: '',
      reintegroT: '',
      estatus: 'Pendiente',
      fecha: '',
      contador: {},
      isHidden: true,
    };
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
          factura: child.val().factura,
          recibos: child.val().recibos,
          sc: child.val().sc,
          reintegroT: child.val().reintegroT,
          autorizo: child.val().autorizo,
          fecha: child.val().fecha,
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
    const itemsRef = firebase.database().ref('vales/');
    this.listenForItems(itemsRef);
  }

  componentWillMount() {
    let formRef = firebase.database().ref('vales').orderByKey().limitToLast(1);
    formRef.on('child_added', snapshot => {
      const { vale, cheque, cantidad, cantidadc, cantidadr, concepto, oficioS, area, turno, personaR, estatus, autorizo, fecha } = snapshot.val();
      const data = { vale, cheque, cantidad, cantidadc, cantidadr, concepto, oficioS, area, turno, personaR, estatus, autorizo, fecha };
      this.setState({ form: [data].concat(this.state.form) });
    });
  }

  render() {
    return (
      <div class='container-back'>
        <div class='site'>
          <p class='site-s'><b>Vales Pendientes</b></p>
        </div>
        <div class='caja-w' style={{marginTop: '40px', marginBottom: '40px'}}>
          <div class='caja-col'>
            <ListComponent
              lista={this.state.lista}
            />
          </div>
        </div>
      </div>
    )
  }
}
