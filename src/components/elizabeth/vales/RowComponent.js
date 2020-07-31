import React, { Component } from 'react'
import './Vales.css'
import CurrencyFormat from 'react-currency-format'
import Popup from 'reactjs-popup'
import Dropzone from 'react-dropzone'
import firebase from '../../../Firebase'

export default class RowComponent extends Component {
  constructor (props) {
    super(props)
    this.state = {
      done: false,
      item: 'Atendido',
      pdf1: 0,
      pdf2: 0,
      pdf3: 0
    }
  }

  handleOnChange1 (event) {
    for (let i = 0; i < event.target.files.length; i++) {
      if (event.target.files[i].type === 'application/pdf') {
      }
      const file = event.target.files[i]
      const storageRef = firebase.storage().ref(`comprobacion/${file.name}`)
      const task = storageRef.put(file)
      task.on('state_changed', (snapshot) => {
        let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        this.setState({
          pdf1: percentage
        })
      }, (error) => {
        console.error(error.message)
      })
    }
  }

  handleOnChange2 (event) {
    for(let i = 0; i < event.target.files.length; i++)
    {
      const file = event.target.files[i]
      const storageRef = firebase.storage().ref(`comprobacion/${file.name}`)
      const task = storageRef.put(file)
      task.on('state_changed', (snapshot) => {
        let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        this.setState({
          pdf2: percentage
        })
      }, (error) => {
        console.error(error.message)
      })
    }

  }

  handleOnChange3 (event) {
    for(let i = 0; i < event.target.files.length; i++)
    {
      const file = event.target.files[i]
      const storageRef = firebase.storage().ref(`comprobacion/${file.name}`)
      const task = storageRef.put(file)
      task.on('state_changed', (snapshot) => {
        let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        this.setState({
          pdf3: percentage
        })
      }, (error) => {
        console.error(error.message)
      })
    }
  }

  render () {
    return (
      <div class='caja-inputs'>
        <div class='table-left'>
        </div>
        <div class='table-v-num'>
          <b>{this.props.item.vale}</b>
        </div>
        <div class='table-v-importe'>
          <b>{this.props.item.estatus}</b>
        </div>
        <div class='table-v-fechae'>
          <b>{this.props.item.concepto}</b>
        </div>
        <div class='table-v-cantidad'>
          <div>
            <CurrencyFormat
              value={this.props.item.cantidad}
              displayType={'text'}
              thousandSeparator={true}
              prefix={'$ '}
              decimalSeparator={'.'} />
            .00
          </div>
        </div>
         <div class = 'table-v-cantidad'>
          <Popup trigger = {<button>Comprobación</button>} modal>
          <div>
            <div className='comprobacion-container'>
              <div className='comprobacion-content'>
                <div className='comprobacion-card'>
                  <h1 className='comprobacion-h1'>Comprobaciones</h1>
                  <p className='comprobacion-p'>Selecciona la carga de evidencias de tus comprobaciones</p>
                  <div>
                    <p>XML:</p>
                    <Dropzone
                      style={{
                        position: 'relative',
                        width: '100%',
                        height: '30px',
                        borderWidth: '2px',
                        borderColor: 'rgb(102, 102, 102)',
                        borderStyle: 'solid',
                        borderRadius: '5px',
                        maxFiles: 5}}
                        accept='.xml' onChange={this.handleOnChange1.bind(this)}
                        >
                    </Dropzone>
                    <progress className='progress' value={this.state.pdf1} max='100'>
                      {this.state.pdf1} %
                    </progress>
                    <div className='dz-default dz-message' value={this.state.pdf1} max='100'>
                      Carga {this.state.pdf1} %</div>
                  </div>
                  <div>
                    <p>FACTURA:</p>
                    <Dropzone
                      style={{
                        position: 'relative',
                        width: '100%',
                        height: '30px',
                        borderWidth: '2px',
                        borderColor: 'rgb(102, 102, 102)',
                        borderStyle: 'solid',
                        borderRadius: '5px',
                        maxFiles: 5}}
                        accept='.pdf' onChange={this.handleOnChange2.bind(this)}
                        >
                    </Dropzone>
                    <progress className='progress' value={this.state.pdf2} max='100'>
                      {this.state.pdf2} %
                    </progress>
                    <div className='dz-default dz-message' value={this.state.pdf2} max='100'>
                      Carga {this.state.pdf2} %</div>
                  </div>
                  <div>
                    <p>RECIBO SIMPLE:</p>
                    <Dropzone
                      style={{
                        position: 'relative',
                        width: '100%',
                        height: '30px',
                        borderWidth: '2px',
                        borderColor: 'rgb(102, 102, 102)',
                        borderStyle: 'solid',
                        borderRadius: '5px',
                        maxFiles: 5}}
                        accept='.pdf' onChange={this.handleOnChange3.bind(this)}
                        >
                    </Dropzone>
                    <progress className='progress' value={this.state.pdf3} max='100'>
                      {this.state.pdf3} %
                    </progress>
                    <div className='dz-default dz-message' value={this.state.pdf3} max='100'>
                      Carga {this.state.pdf3} %</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          </Popup>
         </div>
        <div class='table-right'>
        </div>
      </div>
    )
  }
}
