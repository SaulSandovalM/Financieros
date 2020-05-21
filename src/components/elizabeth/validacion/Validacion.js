import React, { Component } from 'react';
import firebase from '../../../Firebase';
import Dropzone from 'react-dropzone';
import csv from 'csv';

export default class Validacion extends Component {
  constructor () {
    super()
    this.state = {
      pdf: 0,
    }
  }

  handleOnChange (event) {
    const file = event.target.files[0]
    const storageRef = firebase.storage().ref(`validacion/${file.name}`)
    const task = storageRef.put(file)
    task.on('state_changed', (snapshot) => {
      let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      this.setState({
        pdf: percentage
      })
    }, (error) => {
      console.error(error.message)
    })
  }

  render() {

    const fontSize = 5;

    return (
      <div>
        <div className='presupuesto-container'>
          <div className='presupuesto-content'>
            <div className='presupuesto-card'>
              <h1 className='presupuesto-h1'>Aqui puedes subir<br/>los documentos para validar vales</h1>
              <p className='presupuesto-p'>Agrega los pdfs correspondientes de los vales</p>
              <div>
                <p>Recibo Simple:</p>
                <Dropzone
                  style={{
                    position: 'relative',
                    width: '100%',
                    height: '30px',
                    borderWidth: '2px',
                    borderColor: 'rgb(102, 102, 102)',
                    borderStyle: 'solid',
                    borderRadius: '5px'}}
                    accept=".pdf" onChange={this.handleOnChange.bind(this)}>
                </Dropzone>
                <progress value={this.state.pdf} max='100'>
                  {this.state.pdf} %
                </progress>
              </div>
              <div>
                <p>Comprobado:</p>
                <Dropzone
                  style={{
                    position: 'relative',
                    width: '100%',
                    height: '30px',
                    borderWidth: '2px',
                    borderColor: 'rgb(102, 102, 102)',
                    borderStyle: 'solid',
                    borderRadius: '5px'}}
                    accept=".pdf" onChange={this.handleOnChange.bind(this)}>
                </Dropzone>
              </div>
              <div>
                <p>Factura:</p>
                <Dropzone
                  style={{
                    position: 'relative',
                    width: '100%',
                    height: '30px',
                    borderWidth: '2px',
                    borderColor: 'rgb(102, 102, 102)',
                    borderStyle: 'solid',
                    borderRadius: '5px'}}
                    accept=".pdf" onChange={this.handleOnChange.bind(this)}>
                </Dropzone>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
