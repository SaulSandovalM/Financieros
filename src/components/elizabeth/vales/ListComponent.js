import React, { Component } from 'react';
import './Vales.css';
import RowComponent from './RowComponent';
import firebase from '../../../Firebase';

export default class ListComponent extends Component {
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
          <div class='table-v-num'>
            <b>#</b>
          </div>
          <div class='table-v-importe'>
            <b>AUTORIZACION</b>
          </div>
          <div class='table-v-fechae'>
            <b>AREA</b>
          </div>
          <div class='table-v-area'>
            <b>CONCEPTO</b>
          </div>
          <div class='table-v-cantidad'>
            <b>CANTIDAD</b>
          </div>
          <div class='table-v-cheque'>
            <b>COMPROBACION</b>
          </div>
          <div class='table-v-cheque'>
            <b>CHEQUE</b>
          </div>
          <div class='table-v-edit'>
            <b>EDITAR</b>
          </div>
          <div class='table-right'>
          </div>
        </div>
        {
          this.props.lista.map(item =>
            <RowComponent
              key={item.id}
              item={item}
            />
          )
        }
      </div>
    );
  }
}
