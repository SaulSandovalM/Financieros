import React, { Component } from 'react';
import './Vales.css';
import CurrencyFormat from 'react-currency-format';

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
      <div class='cheques-inputs'>
        <div class='table-left'>
        </div>
        <div class='table-c-num'>
          <p>{this.props.item.vale}</p>
        </div>
        <div class='table-c-importe'>
          <p>{this.props.item.movimiento}</p>
        </div>
        <div class='table-c-fechae'>
          <p>{this.props.item.concepto}</p>
        </div>
        <div class='table-c-fechae'>
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
        <div class='table-right'>
        </div>
      </div>
    );
  }
}
