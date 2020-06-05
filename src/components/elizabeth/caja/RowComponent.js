import React, { Component } from 'react';
import './Caja.css';
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
      <div className='cheques-inputs'>
        <div className='table-left'>
        </div>
        <div className='table-c-num'>
          <p>{this.props.item.numCheque}</p>
        </div>
        <div className='table-c-importe'>
          <div>
            <CurrencyFormat
              value={this.props.item.importe}
              displayType={'text'}
              thousandSeparator={true}
              prefix={' $'}
            />
            .00
          </div>
        </div>
        <div className='table-c-fechae'>
          <p>{this.props.item.fechaE}</p>
        </div>
        <div className='table-c-fechae'>
          <p>{this.props.item.fechaC}</p>
        </div>
        <div className='table-right'>
        </div>
      </div>
    );
  }
}
