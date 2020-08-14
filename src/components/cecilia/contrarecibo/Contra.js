import React, { Component } from 'react'
import './Contra.css'
import firebase from '../../../Firebase'

export default class Fondos extends Component {
  constructor (props) {
    super(props)
    this.state = {
      alert: false,
      fechaC: '',
      noC: '',
      fechaD: '',
      cuantaP: '',
      bene_pro: '',
      sujetoC: ''
    }
  }

  resetForm () {
    this.refs.contactForm.reset()
  }

  sendMessage () {
    const params = {
      fechaC: this.inputFechaC.value,
      noC: this.inputNoC.value,
      fechaD: this.inputFechaD.value,
      cuantaP: this.inputCuentaP.value,
      bene_pro: this.inputBene.value,
      sujetoC: this.inputSujetoC.value
    }
    this.setState({
      fechaC: this.inputFechaC.value,
      noC: this.inputNoC.value,
      fechaD: this.inputFechaD.value,
      cuantaP: this.inputCuentaP.value,
      bene_pro: this.inputBene.value,
      sujetoC: this.inputSujetoC.value
    })
    if (params.fecha) {
      firebase.database().ref('vales').push(params).then(() => {
        alert('Tu solicitud fue enviada.')
      }).catch(() => {
        alert('Tu solicitud no puede ser enviada')
      })
      this.resetForm()
    } else {
      alert('Por favor llene el formulario')
    }
  }

  render () {
    return (
      <div className='contra-container'>
        <div>
          <div className='m-f'>
            <div className='fcc-i'>
              <p className='fimpre'>Fecha Contrarecibo:</p>
              <input />
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
            {/* <div className='fcc-i'>
              <p className='fimpre'>Solicitud Programatica:</p>
              <input />
            </div>
            <div className='fcc-i'>
              <p className='fimpre'>Monto:</p>
              <input />
            </div>
            <div className='fcc-i'>
              <p className='fimpre'>CPA:</p>
              <input />
            </div> */}
          </div>
        </div>
      </div>
    )
  }
}
