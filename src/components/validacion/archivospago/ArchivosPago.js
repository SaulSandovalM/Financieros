import React, { Component } from 'react'
import firebase from '../../../Firebase'
import ListComponent from './ListComponent'
import './ArchivosPago.css'
import Dropzone from 'react-dropzone'

export default class ArchivosPago extends Component {
  constructor(props) {
    super(props)
    this.state = {
      lista: [
        {
          id: 1,
          name: 'preuba',
          done: false
        },
      ],
      alert: false,
      xml: 0,
      xmlL: 0,
      pdf2: 0,
      filefactura: [],
      xmlC: [],
      xmlLoading: 0
    }
  }

  handleOnChange1 (event) {
    for (var i = 0; i < event.target.files.length; i++) {
      const file = event.target.files[i]
      const xmlp = file
      var reader = new FileReader()
      reader.onload = function (event) {
        var XMLParser = require('react-xml-parser')
        var xml = new XMLParser().parseFromString(event.target.result)
        console.log(xml)
        const data = {
          'total': xml.attributes['Total'] ? xml.attributes['Total'] : 'No encuentra total',
          'subtotal': xml.attributes['SubTotal'] ? xml.attributes['SubTotal'] : (parseFloat(xml.attributes['Total']) + parseFloat(xml.children['3'].attributes['TotalImpuestosRetenidos'] ? xml.children['3'].attributes['TotalImpuestosRetenidos'] : 0)) - parseFloat(xml.children['3'].attributes['TotalImpuestosTrasladados']),
          'folio': xml.attributes['Folio'] ? xml.attributes['Folio'] : '0',
          'nombre': xml.children['1'].attributes['Nombre'] ? xml.children['1'].attributes['Nombre'] : 'No encuentra Nombre',
          'importe': xml.attributes['SubTotal'] ? xml.attributes['SubTotal'] : (parseFloat(xml.attributes['Total']) + (xml.children['3'].attributes['TotalImpuestosRetenidos'] ? xml.children['3'].attributes['TotalImpuestosRetenidos'] : 0)) - parseFloat(xml.children['3'].attributes['TotalImpuestosTrasladados']),
          'iva': xml.children['3'].attributes['TotalImpuestosTrasladados'] ? xml.children['3'].attributes['TotalImpuestosTrasladados'] : 0,
          'isr': xml.children['3'].attributes['TotalImpuestosRetenidos'] ? xml.children['3'].attributes['TotalImpuestosRetenidos'] : 0,
          'fecha': xml.getElementsByTagName('tfd:TimbreFiscalDigital')[0].attributes['FechaTimbrado'],
          'uuid': xml.getElementsByTagName('tfd:TimbreFiscalDigital')[0].attributes['UUID'] ? xml.getElementsByTagName('tfd:TimbreFiscalDigital')[0].attributes['UUID'] : xmlp.name.slice(0, -4),
          'estatus': 'sin asignar',
          'tipo': 'directo',
        }
        fetch(xml).then(res => res.text()).then(xml => {
          fetch('https://financieros-78cb0.firebaseio.com/xmlPago.json', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
          })
        })
      }
      reader.readAsText(xmlp)
      const storageRef = firebase.storage().ref(`validacion/${file.name}`)
      const task = storageRef.put(file)
      task.on('state_changed', (snapshot) => {
        let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        this.setState({
          xmlLoading: percentage
        })
      }, error => {
        console.error(error.message)
      }, () => storageRef.getDownloadURL().then(url =>  {
        this.setState({
          xmlC: [...this.state.xmlC, { url: url, nombre: file.name }],
        })
      }))
    }
  }

  handleOnChange2 (event) {
    for (let i = 0; i < event.target.files.length; i++) {
      const file = event.target.files[i]
      const storageRef = firebase.storage().ref(`validacion/${file.name}`)
      const task = storageRef.put(file)
      task.on('state_changed', (snapshot) => {
        let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        this.setState({
          pdf2: percentage
        })
      }, error => {
        console.error(error.message)
      }, () => storageRef.getDownloadURL().then(url =>  {
        this.setState({
          filefactura: [...this.state.filefactura, { url: url, nombre: file.name }],
        })
      }))
    }
  }

  listenForItems = (itemsRef) => {
    itemsRef.on('value', (snap) => {
      var lista = []
      snap.forEach((child) => {
        lista.push({
          xmlC: child.val().xmlC,
          filefactura: child.val().filefactura,
          id: child.key
        })
      })
      this.setState({
        lista: lista
      })
    })
  }

  componentDidMount () {
    const itemsRef = firebase.database().ref('xmlPagoDirecto/')
    this.listenForItems(itemsRef)
  }

  resetForm () {
    this.refs.contactForm.reset()
  }

  sendMessage (e) {
    e.preventDefault()
    const params = {
      xmlC: this.state.xmlC,
      filefactura: this.state.filefactura
    }
    this.setState({
      xmlC: [{ url: '', nombre: '' }],
      filefactura: [{ url: '', nombre: '' }],
    })
    if (params.xmlC && params.filefactura) {
      firebase.database().ref('xmlPagoDirecto').push(params).then(() => {
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
      <div className='container-valeslist'>
        <div className='margin-f-a'>
          <div className='p-container-valeslist'>
            <div className='p-margin-valeslist'>
              <p className='p-title-size-valeslist'>
                - Selecciona la carga de evidencias de tus comprobaciones
              </p>
            </div>
            <div className='inputs-container-valeslist'>
              <div className='inputs-valeslist'>
                <div className='inputs-row-valeslist'>
                  <form style={{ display: 'flex', width: '100%' }} onSubmit={this.sendMessage.bind(this)} ref='contactForm'>
                    <div className='p-container-valeslist'>
                      <p style={{ margin: '0px', color: 'grey', fontSize: '12px' }}>Agregar xml</p>
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
                        accept='.xml' onChange={this.handleOnChange1.bind(this)}
                      />
                      <progress className='progress' value={this.state.xmlLoading} max='100'>
                        {this.state.xmlLoading}
                      </progress>
                    </div>
                    <div className='p-container-valeslist'>
                      <p style={{ margin: '0px', color: 'grey', fontSize: '12px' }}>Agregar Pdf</p>
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
                        accept='.pdf' onChange={this.handleOnChange2.bind(this)}
                      />
                      <progress className='progress' value={this.state.pdf2} max='100'>
                        {this.state.pdf2}
                      </progress>
                    </div>
                    <button>Guardar</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='title-tb-valeslist'>
          <div className='caja-valeslist'>
            <ListComponent lista={this.state.lista} />
          </div>
        </div>
      </div>
    )
  }
}
