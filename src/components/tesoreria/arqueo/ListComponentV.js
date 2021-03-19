import React, { Component } from 'react'
import './Arqueo.css'
import RowComponentV from './RowComponentV'
import firebase from '../../../Firebase'
import CurrencyFormat from 'react-currency-format'

export default class ListComponent extends Component {
  constructor (props) {
    super(props)
    this.state = {
      vales: []
    }
  }

  componentWillMount () {
    firebase.database().ref('vales/').on('child_added', snapshot => {
      this.setState({
        vales: this.state.vales.concat(snapshot.val())
      })
    })
  }

  render () {
    var fechaSelect = this.props.fechaSelect
    var diaAnterior = this.props.diaAnterior

    const actual2 = [0]
    this.props.listaVales.map(items => (
      items.rein === fechaSelect ? actual2.push(parseFloat(items.cantidadr)) : null
    ))
    const reducerCantidad = (a, b) => a + b
    var lol = actual2.reduce(reducerCantidad)
    var perro = diaAnterior - lol

    return (
      <div>
        {
          this.props.listaVales.map(item =>
            <RowComponentV
              key={item.id}
              item={item}
              fechaSelect={fechaSelect}
            />
          )
        }
        <div style={{ width: '100%' }}>
          <div className='tabla-arq'>
            <div className='tb-1'>
              <p className='tb-nr' />
            </div>
            <div className='tb-1'>
              <p className='tb-nr' />
            </div>
            <div className='tb-1'>
              <CurrencyFormat
                value={perro}
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  marginTop: '5px',
                  fontSize: '12px',
                  fontWeight: 'bold'
                }}
                displayType='text'
                thousandSeparator
                prefix='$ '
              />
            </div>
            <div className='tb-1'>
              <p className='tb-nr' />
            </div>
            <div className='tb-2'>
              <p
                className='tb-nr'
                style={{ fontWeight: 'bold', fontSize: '11px' }}
              >
                {this.props.before}
              </p>
            </div>
            <div className='tb-3'>
              <p className='tb-nr' />
            </div>
          </div>
        </div>
      </div>
    )
  }
}
