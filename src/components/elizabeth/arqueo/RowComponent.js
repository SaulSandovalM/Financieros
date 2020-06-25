import React, { Component } from 'react';
import './Arqueo.css';
import CurrencyFormat from 'react-currency-format';
import firebase from '../../../Firebase';

export default class RowComponent extends Component {
  constructor(props){
    super(props);
    this.state = {
      done: false,
      item: 'Atendido'
    };
  }

  render() {
    return (
      <div>
        <div className='data-arqueo'>
          <div className='table-left'>
          </div>
          <div className='title-arqueo'>
            <p className='p-mar-arqueo'>1000</p>
          </div>
          <div className='title-arqueo'>
            <p className='p-mar-arqueo'>{this.props.item.can1000}</p>
          </div>
          <div className='title-arqueo'>
            <p className='p-mar-arqueo'>$</p>
          </div>
          <div className='table-right'>
          </div>
        </div>
        <div className='data-arqueo'>
          <div className='table-left'>
          </div>
          <div className='title-arqueo'>
            <p className='p-mar-arqueo'>500</p>
          </div>
          <div className='title-arqueo'>
            <p className='p-mar-arqueo'>{this.props.item.can500}</p>
          </div>
          <div className='title-arqueo'>
            <p className='p-mar-arqueo'>$</p>
          </div>
          <div className='table-right'>
          </div>
        </div>
        <div className='data-arqueo'>
          <div className='table-left'>
          </div>
          <div className='title-arqueo'>
            <p className='p-mar-arqueo'>200</p>
          </div>
          <div className='title-arqueo'>
            <p className='p-mar-arqueo'>{this.props.item.can200}</p>
          </div>
          <div className='title-arqueo'>
            <p className='p-mar-arqueo'>$</p>
          </div>
          <div className='table-right'>
          </div>
        </div>
        <div className='data-arqueo'>
          <div className='table-left'>
          </div>
          <div className='title-arqueo'>
            <p className='p-mar-arqueo'>100</p>
          </div>
          <div className='title-arqueo'>
            <p className='p-mar-arqueo'>{this.props.item.can100}</p>
          </div>
          <div className='title-arqueo'>
            <p className='p-mar-arqueo'>$</p>
          </div>
          <div className='table-right'>
          </div>
        </div>
        <div className='data-arqueo'>
          <div className='table-left'>
          </div>
          <div className='title-arqueo'>
            <p className='p-mar-arqueo'>50</p>
          </div>
          <div className='title-arqueo'>
            <p className='p-mar-arqueo'>{this.props.item.can50}</p>
          </div>
          <div className='title-arqueo'>
            <p className='p-mar-arqueo'>$</p>
          </div>
          <div className='table-right'>
          </div>
        </div>
        <div className='data-arqueo'>
          <div className='table-left'>
          </div>
          <div className='title-arqueo'>
            <p className='p-mar-arqueo'>20</p>
          </div>
          <div className='title-arqueo'>
            <p className='p-mar-arqueo'>{this.props.item.can20}</p>
          </div>
          <div className='title-arqueo'>
            <p className='p-mar-arqueo'>$</p>
          </div>
          <div className='table-right'>
          </div>
        </div>
        <div className='data-arqueo'>
          <div className='table-left'>
          </div>
          <div className='title-arqueo'>
            <p className='p-mar-arqueo'>10</p>
          </div>
          <div className='title-arqueo'>
            <p className='p-mar-arqueo'>{this.props.item.can10}</p>
          </div>
          <div className='title-arqueo'>
            <p className='p-mar-arqueo'>$</p>
          </div>
          <div className='table-right'>
          </div>
        </div>
        <div className='data-arqueo'>
          <div className='table-left'>
          </div>
          <div className='title-arqueo'>
            <p className='p-mar-arqueo'>5</p>
          </div>
          <div className='title-arqueo'>
            <p className='p-mar-arqueo'>{this.props.item.can5}</p>
          </div>
          <div className='title-arqueo'>
            <p className='p-mar-arqueo'>$</p>
          </div>
          <div className='table-right'>
          </div>
        </div>
        <div className='data-arqueo'>
          <div className='table-left'>
          </div>
          <div className='title-arqueo'>
            <p className='p-mar-arqueo'>2</p>
          </div>
          <div className='title-arqueo'>
            <p className='p-mar-arqueo'>{this.props.item.can2}</p>
          </div>
          <div className='title-arqueo'>
            <p className='p-mar-arqueo'>$</p>
          </div>
          <div className='table-right'>
          </div>
        </div>
        <div className='data-arqueo'>
          <div className='table-left'>
          </div>
          <div className='title-arqueo'>
            <p className='p-mar-arqueo'>1</p>
          </div>
          <div className='title-arqueo'>
            <p className='p-mar-arqueo'>{this.props.item.can1}</p>
          </div>
          <div className='title-arqueo'>
            <p className='p-mar-arqueo'>$</p>
          </div>
          <div className='table-right'>
          </div>
        </div>
        <div className='data-arqueo'>
          <div className='table-left'>
          </div>
          <div className='title-arqueo'>
            <p className='p-mar-arqueo'>0.5</p>
          </div>
          <div className='title-arqueo'>
            <p className='p-mar-arqueo'>{this.props.item.can0}</p>
          </div>
          <div className='title-arqueo'>
            <p className='p-mar-arqueo'>$</p>
          </div>
          <div className='table-right'>
          </div>
        </div>
      </div>
    );
  }
}
