import React, { Component } from 'react';
import CurrencyFormat from 'react-currency-format';
import './Presupuesto.css';

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
      <div className='table-container-p'>
        <div className='table-left'>
        </div>
        <div className='table-clave-p'>
          <p>{this.props.item.clave}</p>
        </div>
        <div className='table-importe-p'>
          <div>
            <CurrencyFormat
              value={this.props.item.importe}
              displayType={'text'}
              thousandSeparator={true}
              prefix={' $'} />
            .00
          </div>
        </div>
        <div className='table-right'>
        </div>
      </div>
    );
  }
}
