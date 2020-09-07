import React, { Component } from 'react'
import './Disponible.css'
import CurrencyFormat from 'react-currency-format'

export default class RowComponent extends Component {
  constructor (props) {
    super(props)
    this.state = {
      done: false,
      item: 'Atendido'
    }
  }

  render () {
    const ene = parseInt(this.props.item.ene)
    const feb = parseInt(this.props.item.feb)
    const mar = parseInt(this.props.item.mar)
    const abr = parseInt(this.props.item.abr)
    const may = parseInt(this.props.item.may)
    const jun = parseInt(this.props.item.jun)
    const jul = parseInt(this.props.item.jul)
    const ago = parseInt(this.props.item.ago)
    const sep = parseInt(this.props.item.sep)
    const oct = parseInt(this.props.item.oct)
    const nov = parseInt(this.props.item.nov)
    const dic = parseInt(this.props.item.dic)

    return (
      <div className='meses-container-row'>
        <div className='table-dis-up-u'>
          <p className='p-h-dis2'>{this.props.item.up}</p>
        </div>
        <div className='table-dis-up-t'>
          <p className='p-h-dis2'>{this.props.item.rubro}</p>
        </div>
        <div className='table-dis-up-t'>
          <p className='p-h-dis2'>{this.props.item.ogasto}</p>
        </div>
        <div className='table-dis-up'>
          <p className='p-h-dis2'>
            <CurrencyFormat
              value={this.props.item.ene}
              displayType='text'
              thousandSeparator
              prefix='$ '
            />
          </p>
        </div>
        <div className='table-dis-up'>
          <p className='p-h-dis2'>
            <CurrencyFormat
              value={this.props.item.feb}
              displayType='text'
              thousandSeparator
              prefix='$ '
            />
          </p>
        </div>
        <div className='table-dis-up'>
          <p className='p-h-dis2'>
            <CurrencyFormat
              value={this.props.item.mar}
              displayType='text'
              thousandSeparator
              prefix='$ '
            />
          </p>
        </div>
        <div className='table-dis-up'>
          <p className='p-h-dis2'>
            <CurrencyFormat
              value={this.props.item.abr}
              displayType='text'
              thousandSeparator
              prefix='$ '
            />
          </p>
        </div>
        <div className='table-dis-up'>
          <p className='p-h-dis2'>
            <CurrencyFormat
              value={this.props.item.may}
              displayType='text'
              thousandSeparator
              prefix='$ '
            />
          </p>
        </div>
        <div className='table-dis-up'>
          <p className='p-h-dis2'>
            <CurrencyFormat
              value={this.props.item.jun}
              displayType='text'
              thousandSeparator
              prefix='$ '
            />
          </p>
        </div>
        <div className='table-dis-up'>
          <p className='p-h-dis2'>
            <CurrencyFormat
              value={this.props.item.jul}
              displayType='text'
              thousandSeparator
              prefix='$ '
            />
          </p>
        </div>
        <div className='table-dis-up'>
          <p className='p-h-dis2'>
            <CurrencyFormat
              value={this.props.item.ago}
              displayType='text'
              thousandSeparator
              prefix='$ '
            />
          </p>
        </div>
        <div className='table-dis-up'>
          <p className='p-h-dis2'>
            <CurrencyFormat
              value={this.props.item.sep}
              displayType='text'
              thousandSeparator
              prefix='$ '
            />
          </p>
        </div>
        <div className='table-dis-up'>
          <p className='p-h-dis2'>
            <CurrencyFormat
              value={this.props.item.oct}
              displayType='text'
              thousandSeparator
              prefix='$ '
            />
          </p>
        </div>
        <div className='table-dis-up'>
          <p className='p-h-dis2'>
            <CurrencyFormat
              value={this.props.item.nov}
              displayType='text'
              thousandSeparator
              prefix='$ '
            />
          </p>
        </div>
        <div className='table-dis-up'>
          <p className='p-h-dis2'>
            <CurrencyFormat
              value={this.props.item.dic}
              displayType='text'
              thousandSeparator
              prefix='$ '
            />
          </p>
        </div>
        <div className='table-dis-up'>
          <p className='p-h-dis2'>
            <CurrencyFormat
              value={ene + feb + mar + abr + may + jun + jul + ago + sep + oct + nov + dic}
              displayType='text'
              thousandSeparator
              prefix='$ '
            />
          </p>
        </div>
      </div>
    )
  }
}
