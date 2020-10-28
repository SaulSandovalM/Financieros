import React, { Component } from 'react'
import './Arqueo.css'

export default class RowComponent extends Component {
  constructor (props) {
    super(props)
    this.state = {
      done: false,
      item: 'Atendido'
    }
  }

  render () {
    const mil = parseInt(this.props.item.can1000)
    const quinientos = parseInt(this.props.item.can500)
    const docientos = parseInt(this.props.item.can200)
    const cien = parseInt(this.props.item.can100)
    const cincuenta = parseInt(this.props.item.can50)
    const veinte = parseInt(this.props.item.can20)
    const diez = parseInt(this.props.item.can10)
    const cinco = parseInt(this.props.item.can5)
    const dos = parseInt(this.props.item.can2)
    const uno = parseInt(this.props.item.can1)
    const punto = parseInt(this.props.item.can0)
    const total = mil + quinientos + docientos + cien + cincuenta +
              veinte + diez + cinco + dos + uno + punto
    const thousand = 1000 * mil
    const fivehundred = 500 * quinientos
    const twohundred = 200 * docientos
    const onehundred = 100 * cien
    const fiveteen = 50 * cincuenta
    const twenti = 20 * veinte
    const ten = 10 * diez
    const five = 5 * cinco
    const two = 2 * dos
    const one = 1 * uno
    const point = 0.5 * punto
    const res = thousand + fivehundred + twohundred + onehundred + fiveteen +
            twenti + ten + five + two + one + point

    return (
      <div style={{ width: '100%' }}>
        <div className='data-arqueo'>
          <div className='title-arqueo'>
            <p className='p-mar-arqueo'>1000</p>
          </div>
          <div className='title-arqueo'>
            <p className='p-mar-arqueo'>{mil}</p>
          </div>
          <div className='title-arqueo'>
            <p className='p-mar-arqueo'>$ {thousand}</p>
          </div>
        </div>
        <div className='data-arqueo'>
          <div className='title-arqueo'>
            <p className='p-mar-arqueo'>500</p>
          </div>
          <div className='title-arqueo'>
            <p className='p-mar-arqueo'>{quinientos}</p>
          </div>
          <div className='title-arqueo'>
            <p className='p-mar-arqueo'>$ {fivehundred}</p>
          </div>
        </div>
        <div className='data-arqueo'>
          <div className='title-arqueo'>
            <p className='p-mar-arqueo'>200</p>
          </div>
          <div className='title-arqueo'>
            <p className='p-mar-arqueo'>{docientos}</p>
          </div>
          <div className='title-arqueo'>
            <p className='p-mar-arqueo'>$ {twohundred}</p>
          </div>
        </div>
        <div className='data-arqueo'>
          <div className='title-arqueo'>
            <p className='p-mar-arqueo'>100</p>
          </div>
          <div className='title-arqueo'>
            <p className='p-mar-arqueo'>{cien}</p>
          </div>
          <div className='title-arqueo'>
            <p className='p-mar-arqueo'>$ {onehundred}</p>
          </div>
        </div>
        <div className='data-arqueo'>
          <div className='title-arqueo'>
            <p className='p-mar-arqueo'>50</p>
          </div>
          <div className='title-arqueo'>
            <p className='p-mar-arqueo'>{cincuenta}</p>
          </div>
          <div className='title-arqueo'>
            <p className='p-mar-arqueo'>$ {fiveteen}</p>
          </div>
        </div>
        <div className='data-arqueo'>
          <div className='title-arqueo'>
            <p className='p-mar-arqueo'>20</p>
          </div>
          <div className='title-arqueo'>
            <p className='p-mar-arqueo'>{veinte}</p>
          </div>
          <div className='title-arqueo'>
            <p className='p-mar-arqueo'>$ {twenti}</p>
          </div>
        </div>
        <div className='data-arqueo'>
          <div className='title-arqueo'>
            <p className='p-mar-arqueo'>10</p>
          </div>
          <div className='title-arqueo'>
            <p className='p-mar-arqueo'>{diez}</p>
          </div>
          <div className='title-arqueo'>
            <p className='p-mar-arqueo'>$ {ten}</p>
          </div>
        </div>
        <div className='data-arqueo'>
          <div className='title-arqueo'>
            <p className='p-mar-arqueo'>5</p>
          </div>
          <div className='title-arqueo'>
            <p className='p-mar-arqueo'>{cinco}</p>
          </div>
          <div className='title-arqueo'>
            <p className='p-mar-arqueo'>$ {five}</p>
          </div>
        </div>
        <div className='data-arqueo'>
          <div className='title-arqueo'>
            <p className='p-mar-arqueo'>2</p>
          </div>
          <div className='title-arqueo'>
            <p className='p-mar-arqueo'>{dos}</p>
          </div>
          <div className='title-arqueo'>
            <p className='p-mar-arqueo'>$ {two}</p>
          </div>
        </div>
        <div className='data-arqueo'>
          <div className='title-arqueo'>
            <p className='p-mar-arqueo'>1</p>
          </div>
          <div className='title-arqueo'>
            <p className='p-mar-arqueo'>{uno}</p>
          </div>
          <div className='title-arqueo'>
            <p className='p-mar-arqueo'>$ {one}</p>
          </div>
        </div>
        <div className='data-arqueo'>
          <div className='title-arqueo'>
            <p className='p-mar-arqueo'>0.5</p>
          </div>
          <div className='title-arqueo'>
            <p className='p-mar-arqueo'>{punto}</p>
          </div>
          <div className='title-arqueo'>
            <p className='p-mar-arqueo'>$ {point}</p>
          </div>
        </div>
        <div className='data-arqueo'>
          <div className='title-arqueo'>
            <b className='p-mar-arqueo'>Total</b>
          </div>
          <div className='title-arqueo'>
            <p className='p-mar-arqueo'>{total}</p>
          </div>
          <div className='title-arqueo'>
            <p className='p-mar-arqueo'>$ {res}</p>
          </div>
        </div>
      </div>
    )
  }
}
