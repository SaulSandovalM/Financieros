import React, { Component } from 'react';
import './ListVales.css';
import RowN from './RowN';
import firebase from '../../../Firebase';

export default class ListN extends Component {
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
            <b>AUTO</b>
          </div>
          <div class='table-v-num'>
            <b>COMP</b>
          </div>
          <div class='table-v-num'>
            <b>REEM/REIN</b>
          </div>
          <div class='table-v-num'>
            <b>CONC</b>
          </div>
          <div class='table-v-num'>
            <b>OS</b>
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
            <b>FECHA</b>
          </div>
          <div class='table-v-num'>
            <b>AUTORIZO</b>
          </div>
          <div class='table-v-num'>
            <b>RECIBIO</b>
          </div>
          <div class='table-right'>
          </div>
        </div>
        {
          this.props.lista.map(item =>
            <RowN
              key={item.id}
              item={item}
            />
          )
        }
      </div>
    );
  }
}
