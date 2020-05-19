import React, { Component } from 'react';
import CurrencyFormat from 'react-currency-format';
import './Seleccion.css';

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
        <div class='tabla-pp'>
        </div>
        <div class='tabla-p'>
          <p>{this.props.item.up}</p>
        </div>
        <div class='tabla-p1-banco'>
          <p>{this.props.item.partida}</p>
        </div>
        <div class='tabla-p2-select'>
          <p>{this.props.item.proyecto}</p>
        </div>
        <div class='tabla-p3-select'>
          <p>{this.props.item.np}</p>
        </div>
        <div class='tabla-p4'>
          <CurrencyFormat
            value={this.props.item.monto}
            displayType={'text'}
            thousandSeparator={true}
            prefix={' $'}
            decimalSeparator={'.'} />
        </div>
        <div class='tabla-p5'>
          <p>{this.props.item.porcentaje} %</p>
        </div>
        <div class='tabla-pp2'>
        </div>
      </div>
    );
  }
}
