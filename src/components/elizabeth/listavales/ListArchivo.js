import React, { Component } from 'react'
import './ListVales.css'
import RowArchivo from './RowArchivo'
import firebase from '../../../Firebase'

export default class ListArchivo extends Component {
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
            <b className='table-h'>AUTO</b>
          </div>
          <div className='table-v-num'>
            <b className='table-h'>COMP</b>
          </div>
          <div className='table-v-num'>
            <b className='table-h'>REEM/REIN</b>
          </div>
          <div className='table-v-num'>
            <b className='table-h'>CONC</b>
          </div>
          <div className='table-v-num'>
            <b className='table-h'>OS</b>
          </div>
          <div className='table-v-num'>
            <b className='table-h'>AREA</b>
          </div>
          <div className='table-v-num'>
            <b className='table-h'>TURNO</b>
          </div>
          <div className='table-v-num'>
            <b className='table-h'>S/C</b>
          </div>
          <div className='table-v-num'>
            <b className='table-h'>FECHA</b>
          </div>
          <div className='table-v-num'>
            <b className='table-h'>AUTOR</b>
          </div>
          <div className='table-v-num'>
            <b className='table-h'>RECIBO</b>
          </div>
          <div className='table-v-num'>
            <b className='table-h'>EDITAR</b>
          </div>
          <div className='table-v-num'>
            <b className='table-h'>COMP</b>
          </div>
          <div className='table-right' />
        </div>
        {
          this.props.lista.map(item =>
            <RowArchivo
              key={item.id}
              item={item}
              update={this.props.update}
            />
          )
        }
      </div>
    )
  }
}
