import React, { Component } from 'react';
import './Vales.css';
import CurrencyFormat from 'react-currency-format';
import { Link } from 'react-router-dom';
import Popup from "reactjs-popup";

export default class RowComponent extends Component {
  constructor(props){
    super(props);
    this.state = {
      done: false,
      item: 'Atendido',
    };
  }

  render() {
    return (
      <div class='caja-inputs'>
        <div class='table-left'>
        </div>
        <div class='table-v-num'>
          <b>{this.props.item.vale}</b>
        </div>
        <div class='table-v-importe'>
          <b>{this.props.item.movimiento}</b>
        </div>
        <div class='table-v-fechae'>
          <b>{this.props.item.concepto}</b>
        </div>
        <div class='table-v-cantidad'>
          <div>
            <CurrencyFormat
              value={this.props.item.cantidad}
              displayType={'text'}
              thousandSeparator={true}
              prefix={'$ '}
              decimalSeparator={'.'} />
            .00
          </div>
        </div>
        <Link to="/Comprobacion" class='table-v-cantidad'>
          <button>Agregar Comprobación</button>
        </Link>
        <div class='table-right'>
        </div>

      </div>
    );
  }
}
