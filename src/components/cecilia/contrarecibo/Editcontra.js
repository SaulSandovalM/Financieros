import React, { Component } from 'react'
import firebase from '../../../Firebase'
import { Link } from 'react-router-dom'

export default class Edit extends Component {
  constructor (props) {
    super(props)
    this.unsubscribe = null
    this.state = {
      key: '',
      beneficiario: '',
      cfe: '',
      desc: '',
      fecha: '',
      fondo: '',
      importe: '',
      ncomprobantes: '',
      no_lici: '',
      no_oficio: '',
      nscfe: '',
      numCompro: '',
      observaciones: '',
      oficio_aut: '',
      pedido: '',
      poliza: '',
      realizo: '',
      requisicion: '',
      tipo_doc: ''
    }
  }

  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value
    this.setState({fondoe:state})
  }

  onSubmit = (e) => {
    e.preventDefault()
    const { beneficiario } = this.state
    const updateRef = firebase.firestore().collection('fondos').doc(this.props.match.params.id).collection('contrarecibo').doc()
    updateRef.set({
      beneficiario
    }).then((docRef) => {
      this.setState({
        beneficiario: ''
      })
    })
    .catch((error) => {
      console.error('Error: ', error)
    })
    alert('Tu solicitud fue enviada.')
  }

  render () {
    return (
      <div>
        <div>
          <div>
            <h3>
              Agregar Contrarecibo
            </h3>
          </div>
          <div>
            <form onSubmit={this.onSubmit}>
              <div className='m-f'>
                <div className='fcc-i'>
                  <p className='fimpre'>Fecha Contrarecibo:</p>
                  <input
                    name='beneficiario'
                    value={this.state.beneficiario}
                    onChange={this.onChange}
                    ref='beneficiario'
                  />
                </div>
                <div className='fcc-i'>
                  <p className='fimpre'>No. Contrarecibo:</p>
                  <input />
                </div>
                <div className='fcc-i'>
                  <p className='fimpre'>Fecha Deposito:</p>
                  <input />
                </div>
                <div className='fcc-i'>
                  <p className='fimpre'>Cuenta por Pagar:</p>
                  <input />
                </div>
                <div className='fcc-i'>
                  <p className='fimpre'>Beneficiario/Proveedor:</p>
                  <input />
                </div>
                <div className='fcc-i'>
                  <p className='fimpre'>Sujeto Contable:</p>
                  <input />
                </div>
              </div>
              <button type='submit'>Submit</button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}
