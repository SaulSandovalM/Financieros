import React, { Component } from 'react';
import './ListVales.css';
import RowAuto from './RowAuto';
import firebase from '../../../Firebase';

export default class ListAuto extends Component {
  constructor (props) {
    super(props);
    this.state = {
      vales: [],
    };
  }

  componentWillMount () {
    firebase.database().ref('vales/').on('child_added', snapshot => {
      this.setState({
        vales: this.state.vales.concat(snapshot.val())
      });
    });
  }

  render() {
    return (
      <div>
        <div class='caja-inputs'>
          <div class='table-left'>
          </div>
          <div class='table-v-num2'>
            <b># V</b>
          </div>
          <div class='table-v-num2'>
            <b># C</b>
          </div>
          <div class='table-v-num'>
            <b>AUTORIZADO</b>
          </div>
          <div class='table-v-num'>
            <b>COMPROMETIDO</b>
          </div>
          <div class='table-v-num'>
            <b>REEMBOLSO</b>
          </div>
          <div class='table-v-num'>
            <b>CONCEPTO</b>
          </div>
          <div class='table-v-num'>
            <b>OFICIO S</b>
          </div>
          <div class='table-v-num'>
            <b>AREA</b>
          </div>
          <div class='table-v-num'>
            <b>TURNO</b>
          </div>
          <div class='table-v-num'>
            <b>FACTURA</b>
          </div>
          <div class='table-v-num'>
            <b>RECIBOS</b>
          </div>
          <div class='table-v-num'>
            <b>S/C</b>
          </div>
          <div class='table-v-num'>
            <b>REINTEGRO</b>
          </div>
          <div class='table-v-num'>
            <b>FECHA</b>
          </div>
          <div class='table-v-num'>
            <b>AUTORAZO</b>
          </div>
          <div class='table-v-num'>
            <b>RECIBIO</b>
          </div>
          <div class='table-right'>
          </div>
        </div>
        {
          this.props.lista.map(item =>
            <RowAuto
              key={item.id}
              item={item}
            />
          )
        }
      </div>
    );
  }
}