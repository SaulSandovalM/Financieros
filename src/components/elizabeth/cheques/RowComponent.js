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
      <div className='cheques-inputs'>
        <div className='table-left'>
        </div>
        <div className='table-c-num'>
          <p>{this.props.item.numCheque}</p>
        </div>
        <div className='table-c-importe'>
          <p>{this.props.item.dirigido}</p>
        </div>
        <div className='table-c-fechae'>
          <div className='row-update'>
            <p className='p-update'>{this.props.item.fechaC}</p>
          </div>
        </div>
        <div className='table-c-bene'>
          <p>{this.props.item.fechaE}</p>
        </div>
        <div className='table-c-fechae'>
          <div>
            <CurrencyFormat
              value={this.props.item.importe}
              displayType={'text'}
              thousandSeparator={true}
              prefix={'$ '}
              decimalSeparator={'.'} />
          </div>
        </div>
        <div className='table-c-fechae'>
          <div className='row-update'>
            <p>{this.props.item.fileUpdate}</p>
          </div>
        </div>
        <div className='table-c-fechae'>
          <div className='row-update'>
            <button onClick={this.update}>Actualizar</button>
          </div>
        </div>
        <div className='table-right'>
        </div>
      </div>
    );
  }
}
