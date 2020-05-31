import React, { Component } from 'react';
import './Presupuesto.css';
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
          <p>{this.props.item.up}</p>
        </div>
        <div class='table-c-importe'>
          <p>{this.props.item.ogasto}</p>
        </div>
        <div class='table-c-fechae'>
          <p>{this.props.item.np}</p>
        </div>
        <div class='table-c-fechae'>
          <div>
            <CurrencyFormat
              value={this.props.item.dic}
              displayType={'text'}
              thousandSeparator={true}
              prefix={' $'}
            />
            .00
          </div>
        </div>
        <div class='table-right'>
        </div>
      </div>
    );
  }
}
