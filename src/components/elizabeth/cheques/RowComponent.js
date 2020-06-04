import React, { Component } from 'react';
import './Cheques.css';
import CurrencyFormat from 'react-currency-format';

export default class RowComponent extends Component {
  constructor(props){
     super(props);
     this.state = {
       done: false,
       item: 'Atendido',
     };
   }

  update = () => {
    this.props.update(this.props.item);
  }

  render() {
    return (
      <div class='cheques-inputs'>
        <div class='table-left'>
        </div>
        <div class='table-c-num'>
          <p>{this.props.item.numCheque}</p>
        </div>
        <div class='table-c-importe'>
          <p>{this.props.item.fechaE}</p>
        </div>
        <div class='table-c-fechae'>
          <div className='row-update'>
            <p className='p-update'>{this.props.item.fechaC}</p>
            <button className='update-b' onClick={this.update}>Actualizar</button>
          </div>
        </div>
        <div class='table-c-fechae'>
          <div>
            <CurrencyFormat
              value={this.props.item.importe}
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
