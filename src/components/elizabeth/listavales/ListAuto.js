import React, { Component } from 'react'
import './ListVales.css'
import RowAuto from './RowAuto'
import firebase from '../../../Firebase'

export default class ListAuto extends Component {
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
    return (
      <div>
        <div className='caja-inputs'>
          <div className='table-left' />
          <div className='table-v-num2'>
            <b># V</b>
          </div>
          <div className='table-v-num2'>
            <b># C</b>
          </div>
          <div className='table-v-num'>
            <b>AUTO</b>
          </div>
          <div className='table-v-num'>
            <b>COMP</b>
          </div>
          <div className='table-v-num'>
            <b>REEM/REIN</b>
          </div>
          <div className='table-v-num'>
            <b>CONC</b>
          </div>
          <div className='table-v-num'>
            <b>OS</b>
          </div>
          <div className='table-v-num'>
            <b>AREA</b>
          </div>
          <div className='table-v-num'>
            <b>TURNO</b>
          </div>
          <div className='table-v-num'>
            <b>FACTURA</b>
          </div>
          <div className='table-v-num'>
            <b>RECIBOS</b>
          </div>
          <div className='table-v-num'>
            <b>S/C</b>
          </div>
          <div className='table-v-num'>
            <b>FECHA</b>
          </div>
          <div className='table-v-num'>
            <b>AUTORIZO</b>
          </div>
          <div className='table-v-num'>
            <b>RECIBIO</b>
          </div>
          <div className='table-right' />
        </div>
        {
          this.props.lista.map(item =>
            <RowAuto
              key={item.id}
              item={item}
            />
          )
        }
      </div>
    )
  }
}
