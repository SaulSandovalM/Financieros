import React, { Component } from 'react';
import CurrencyFormat from 'react-currency-format';
import './Presupuesto.css';
import firebase from '../../../Firebase';

export default class RowComponent extends Component {
  constructor(props){
    super(props);
    this.state = {
      done: false,
      item: 'Atendido'
    };
  }

  update = () => {
    this.props.update(this.props.item);
  }

  render() {
    return (
      <div className='table-container-p'>
        <div className='table-left'>
        </div>
        <div className='table-clave-p'>
          <p>{this.props.item.cpa}</p>
        </div>
        <div className='table-importe-p'>
          <div>
            <CurrencyFormat
              value={this.props.item.dic}
              displayType={'text'}
              thousandSeparator={true}
              prefix={' $'} />
            .00
            <button onClick={this.update}>Agregar</button>
          </div>
        </div>
        <div className='table-right'>
        </div>
      </div>
    );
  }
}
