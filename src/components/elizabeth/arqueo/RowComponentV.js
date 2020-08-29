import React, { Component } from 'react'
import './Arqueo.css'

export default class RowComponentV extends Component {
  constructor (props) {
    super(props)
    this.state = {
      done: false,
      item: 'Atendido'
    }
  }

  render () {
    var today = new Date()
    var meses = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']
    var f = new Date()
    today = f.getFullYear() + '-' + meses[f.getMonth()] + '-' + f.getDate()
    var fecha = this.props.item.fecha

    return (
      <div style={{ width: '100%' }}>
        {today === fecha &&
          <div className='tabla-arq'>
            <div className='tb-1'>
              <p className='tb-nr'>{this.props.item.vale}</p>
            </div>
            <div className='tb-1'>
              <p className='tb-nr'>{this.props.item.estatus}</p>
            </div>
            <div className='tb-1'>
              <p className='tb-nr'>{this.props.item.cantidad}</p>
            </div>
            <div className='tb-1'>
              <p className='tb-nr'>{this.props.item.fecha}</p>
            </div>
            <div className='tb-2'>
              <p className='tb-nr'>{this.props.item.concepto}</p>
            </div>
            <div className='tb-3'>
              <p className='tb-nr'>{this.props.item.personaR}</p>
            </div>
          </div>}
      </div>
    )
  }
}
