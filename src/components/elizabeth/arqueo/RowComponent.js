import React, { Component } from 'react';
import './Arqueo.css';

export default class RowComponent extends Component {
  constructor(props){
    super(props);
    this.state = {
      done: false,
      item: 'Atendido'
    };
  }

  render() {

    let mil = parseInt(this.props.item.can1000);
    let quinientos = parseInt(this.props.item.can500);
    let docientos = parseInt(this.props.item.can200);
    let cien = parseInt(this.props.item.can100);
    let cincuenta = parseInt(this.props.item.can50);
    let veinte = parseInt(this.props.item.can20);
    let diez = parseInt(this.props.item.can10);
    let cinco = parseInt(this.props.item.can5);
    let dos = parseInt(this.props.item.can2);
    let uno = parseInt(this.props.item.can1);
    let punto = parseInt(this.props.item.can0);
    let total = mil + quinientos + docientos + cien + cincuenta +
              veinte + diez + cinco + dos + uno + punto;
    let thousand = 1000 * mil;
    let fivehundred = 500 * quinientos;
    let twohundred = 200 * docientos;
    let onehundred = 100 * cien;
    let fiveteen = 50 * cincuenta;
    let twenti = 20 * veinte;
    let ten = 10 * diez;
    let five = 5 * cinco;
    let two = 2 * dos;
    let one = 1 * uno;
    let point = .5 * punto;
    let res = thousand + fivehundred + twohundred + onehundred + fiveteen +
            twenti + ten + five + two + one + point;

    return (
      <div style={{width: '100%'}}>
        <div className='data-arqueo'>
          <div className='table-left'>
          </div>
          <div className='title-arqueo'>
            <p className='p-mar-arqueo'>1000</p>
          </div>
          <div className='title-arqueo'>
            <p className='p-mar-arqueo'>{mil}</p>
          </div>
          <div className='title-arqueo'>
            <p className='p-mar-arqueo'>$ {thousand}</p>
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
            <p className='p-mar-arqueo'>{quinientos}</p>
          </div>
          <div className='title-arqueo'>
            <p className='p-mar-arqueo'>$ {fivehundred}</p>
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
            <p className='p-mar-arqueo'>{docientos}</p>
          </div>
          <div className='title-arqueo'>
            <p className='p-mar-arqueo'>$ {twohundred}</p>
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
            <p className='p-mar-arqueo'>{cien}</p>
          </div>
          <div className='title-arqueo'>
            <p className='p-mar-arqueo'>$ {onehundred}</p>
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
            <p className='p-mar-arqueo'>{cincuenta}</p>
          </div>
          <div className='title-arqueo'>
            <p className='p-mar-arqueo'>$ {fiveteen}</p>
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
            <p className='p-mar-arqueo'>{veinte}</p>
          </div>
          <div className='title-arqueo'>
            <p className='p-mar-arqueo'>$ {twenti}</p>
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
            <p className='p-mar-arqueo'>{diez}</p>
          </div>
          <div className='title-arqueo'>
            <p className='p-mar-arqueo'>$ {ten}</p>
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
            <p className='p-mar-arqueo'>{cinco}</p>
          </div>
          <div className='title-arqueo'>
            <p className='p-mar-arqueo'>$ {five}</p>
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
            <p className='p-mar-arqueo'>{dos}</p>
          </div>
          <div className='title-arqueo'>
            <p className='p-mar-arqueo'>$ {two}</p>
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
            <p className='p-mar-arqueo'>{uno}</p>
          </div>
          <div className='title-arqueo'>
            <p className='p-mar-arqueo'>$ {one}</p>
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
            <p className='p-mar-arqueo'>{punto}</p>
          </div>
          <div className='title-arqueo'>
            <p className='p-mar-arqueo'>$ {point}</p>
          </div>
          <div className='table-right'>
          </div>
        </div>
        <div className='data-arqueo'>
          <div className='table-left'>
          </div>
          <div className='title-arqueo'>
            <b className='p-mar-arqueo'>Total</b>
          </div>
          <div className='title-arqueo'>
            <p className='p-mar-arqueo'>{total}</p>
          </div>
          <div className='title-arqueo'>
            <p className='p-mar-arqueo'>$ {res}</p>
          </div>
          <div className='table-right'>
          </div>
        </div>
      </div>
    );
  }
}
