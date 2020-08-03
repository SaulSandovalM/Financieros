import React, { Component } from 'react'
import './Disponible.css'

export default class RowComponent extends Component {
  constructor (props) {
    super(props)
    this.state = {
      done: false,
      item: 'Atendido'
    }
  }

  render () {
    return (
      <div className='meses-container-row'>
        <div className='table-left' />
        <div className='table-dis-up'>
          <p className='p-h-dis2'>{this.props.item.up}</p>
        </div>
        <div className='table-dis-up'>
          <p className='p-h-dis2'>{this.props.item.rubro}</p>
        </div>
        <div className='table-dis-up'>
          <p className='p-h-dis2'>{this.props.item.par}</p>
        </div>
        <div className='table-dis-up'>
          <p className='p-h-dis2'>{this.props.item.ene}</p>
        </div>
        <div className='table-dis-up'>
          <p className='p-h-dis2'>{this.props.item.feb}</p>
        </div>
        <div className='table-dis-up'>
          <p className='p-h-dis2'>{this.props.item.mar}</p>
        </div>
        <div className='table-dis-up'>
          <p className='p-h-dis2'>{this.props.item.abr}</p>
        </div>
        <div className='table-dis-up'>
          <p className='p-h-dis2'>{this.props.item.may}</p>
        </div>
        <div className='table-dis-up'>
          <p className='p-h-dis2'>{this.props.item.jun}</p>
        </div>
        <div className='table-dis-up'>
          <p className='p-h-dis2'>{this.props.item.jul}</p>
        </div>
        <div className='table-dis-up'>
          <p className='p-h-dis2'>{this.props.item.ago}</p>
        </div>
        <div className='table-dis-up'>
          <p className='p-h-dis2'>{this.props.item.sep}</p>
        </div>
        <div className='table-dis-up'>
          <p className='p-h-dis2'>{this.props.item.oct}</p>
        </div>
        <div className='table-dis-up'>
          <p className='p-h-dis2'>{this.props.item.nov}</p>
        </div>
        <div className='table-dis-up'>
          <p className='p-h-dis2'>{this.props.item.dic}</p>
        </div>
        <div className='table-dis-up'>
          <p className='p-h-dis2'>{this.props.item.dic}</p>
        </div>
        <div className='table-right' />
      </div>
    )
  }
}
