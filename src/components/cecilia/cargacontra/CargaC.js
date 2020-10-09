import React, { Component } from 'react'
import Dropzone from 'react-dropzone'
import firebase from '../../../Firebase'
import './CargaC.css'
import Alert from '@material-ui/lab/Alert'

export default class Contra extends Component {
  constructor () {
    super()
    this.state = {
      pdf: 0,
      csv: 0,
      fileNameE: '',
      excel: '',
      fileNameS: '',
      oficioS: '',
      tipo: 'Carga de Presupuesto Inicial'
    }
  }

  handleUpload (event) {
    for (let i = 0; i < event.target.files.length; i++) {
      const file = event.target.files[i]
      const storageRef = firebase.storage().ref(`contrarecibo/${file.name}`)
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
  }

  render () {
    return (
      <div>
        {this.state.pdf === 100 &&
          <div className='alert-cont'>
            <Alert severity='success' variant='outlined'>Se han subido los archivos!</Alert>
          </div>
        }
        <form className='presupuesto-container'>
          <div className='presupuesto-content'>
            <div className='presupuesto-card'>
              <h1 className='presupuesto-h1'>Agrega los archivos <br />de contrarecibo</h1>
              <p className='presupuesto-p'>Empieza a subir tus escaneos del los contrarecibos para comprobación</p>
              <div>
                <p>Contrarecibo:</p>
                <Dropzone
                  style={{
                    position: 'relative',
                    width: '100%',
                    height: '30px',
                    borderWidth: '2px',
                    borderColor: 'rgb(102, 102, 102)',
                    borderStyle: 'solid',
                    borderRadius: '5px'
                  }}
                  accept='.pdf' onChange={this.handleUpload.bind(this)}
                />
                <progress className='progress' value={this.state.pdf} max='100'>
                  {this.state.pdf} %
                </progress>
              </div>
              <div className='button-pres'>
                <button type='submit' className='button-sty'>Guardar</button>
              </div>
            </div>
          </div>
        </form>
      </div>
    )
  }
}
