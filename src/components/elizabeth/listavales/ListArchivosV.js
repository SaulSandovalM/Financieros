import React, { Component } from 'react'
import firebase from '../../../Firebase'
import ListArchivo from './ListArchivo'
import './ListVales.css'
import TextField from '@material-ui/core/TextField'

export default class ListArchivosV extends Component {
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
      alertData: {},
      vale: '',
      cheque: '',
      cantidad: '',
      cantidadc: '',
      cantidadr: '',
      reembolso: '',
      concepto: '',
      oficioS: '',
      area: '',
      turno: '',
      personaR: '',
      factura: '',
      recibos: '',
      sc: '',
      fecha: '',
      autorizo: '',
      estatus: 'Pendiente',
      contador: {},
      isHidden: true,
      xml: 0,
      pdf2: 0,
      pdf3: 0,
      filex: '',
      filef: '',
      filer: '',
      filexml: '',
      filefactura: '',
      filerecibo: '',
      prueba: ''
    }
  }

  handleOnChange1 (event) {
    const file = event.target.files[0]
    const storageRef = firebase.storage().ref(`comprobacion/${file.name}`)
    const task = storageRef.put(file)
    this.setState({
      filex: `${file.name}`
    })
    task.on('state_changed', (snapshot) => {
      let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      this.setState({
        xml: percentage
      })
    }, error => {
      console.error(error.message)
    }, () =>  storageRef.getDownloadURL().then(url =>  {
      const record = url
      this.setState({
        filefactura: record
      })
    }))
    const files = event.target.files
    for (var i = 0; i < files.length; i++) {
      const file = files[i]
      var xml = file
      var reader = new FileReader()
      reader.onloadend = function () {
        var XMLParser = require('react-xml-parser')
        var xml = new XMLParser().parseFromString(reader.result)
        var data = [xml.attributes['Fecha'], xml.attributes['Total'], xml.attributes['Folio']]
        fetch(xml).then(res => res.text()).then(data => {
          fetch('https://financieros-78cb0.firebaseio.com/xml.json', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
              body: JSON.stringify(data)
          })
        })
      }
      reader.readAsText(xml)
    }
  }

  handleOnChange2 (event) {
    const file = event.target.files[0]
    const storageRef = firebase.storage().ref(`comprobacion/${file.name}`)
    const task = storageRef.put(file)
    this.setState({
      filef: `${file.name}`
    })
    task.on('state_changed', (snapshot) => {
      let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      this.setState({
        pdf2: percentage
      })
    }, error => {
      console.error(error.message)
    }, () =>  storageRef.getDownloadURL().then(url =>  {
      const record = url
      this.setState({
        filefactura: record
      })
    }))
  }

  handleOnChange3 (event) {
    const file = event.target.files[0]
    const storageRef = firebase.storage().ref(`comprobacion/${file.name}`)
    const task = storageRef.put(file)
    this.setState({
      filer: `${file.name}`
    })
    task.on('state_changed', (snapshot) => {
      const percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      this.setState({
        pdf3: percentage
      })
    }, error => {
      console.error(error.message)
    }, () => storageRef.getDownloadURL().then(url => {
      const record = url
      this.setState({
        filerecibo: record
      })
    }))
  }

  listenForItems = (itemsRef) => {
    itemsRef.on('value', (snap) => {
      var lista = []
      snap.forEach((child) => {
        lista.push({
          vale: child.val().vale,
          cheque: child.val().cheque,
          cantidad: child.val().cantidad,
          cantidadc: child.val().cantidadc,
          cantidadr: child.val().cantidadr,
          reembolso: child.val().reembolso,
          concepto: child.val().concepto,
          oficioS: child.val().oficioS,
          area: child.val().area,
          turno: child.val().turno,
          personaR: child.val().personaR,
          estatus: child.val().estatus,
          factura: child.val().factura,
          recibos: child.val().recibos,
          sc: child.val().sc,
          fecha: child.val().fecha,
          autorizo: child.val().autorizo,
          done: child.val().done,
          id: child.key
        })
      })
      this.setState({
        lista: lista
      })
    })
  }

  componentDidMount () {
    const itemsRef = firebase.database().ref('vales/')
    this.listenForItems(itemsRef)
  }

  resetForm () {
    this.refs.contactForm.reset()
  }

  handleChange (event) {
    this.setState({ [event.target.name]: event.target.value })
  }

  sendMessage (e) {
    e.preventDefault()
    const params = {
      xml: this.inputXml.value
    }
    this.setState({
      xml: this.inputXml.value
    })
    if (params.xml) {
      firebase.database().ref('xml').push(params).then(() => {
        alert('Tu solicitud fue enviada.')
      }).catch(() => {
        alert('Tu solicitud no puede ser enviada')
      })
      this.resetForm()
    } else {
      alert('Por favor llene el formulario')
    }
  }

  update = (item) => {
    let updates = {}
    updates['vales/' + item.id + '/comprobacion/'] = {
      filexml: this.state.filexml,
      filefactura: this.state.filefactura,
      filerecibo: this.state.filerecibo
    }
    firebase.database().ref().update(updates)
    alert('Tu solicitud fue enviada.')
  }

  render () {
    return (
      <div className='container-back' style={{ paddingTop: '60px' }}>
        <form className='margin-f-a' onSubmit={this.sendMessage.bind(this)} ref='contactForm'>
          <div className='p-container-fondor'>
            <div className='p-margin-fr'>
              <p className='p-title-size-fr'>
                - Selecciona la carga de evidencias de tus comprobaciones
              </p>
            </div>
            <div className='inputs-container-fr'>
              <div className='inputs-col-ar'>
                <div className='inputs-row-fr-2'>
                  <div className='p-container-ar'>
                    <TextField
                      label='Xml'
                      type='file'
                      onChange={this.handleOnChange1.bind(this)}
                    />
                    <progress className='progress' value={this.state.xml} max='100'>
                      {this.state.xml} %
                    </progress>
                  </div>
                  <div className='p-container-ar'>
                    <TextField
                      label='Factura'
                      type='file'
                      onChange={this.handleOnChange2.bind(this)}
                    />
                    <progress className='progress' value={this.state.pdf2} max='100'>
                      {this.state.pdf2} %
                    </progress>
                  </div>
                  <div className='p-container-ar'>
                    <TextField
                      label='Recibo'
                      type='number'
                      name='filerecibo'
                      value={this.state.filerecibo} onChange={this.handleChange.bind(this)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
        <div className='caja-w' style={{ marginTop: '40px' }}>
          <div className='caja-col'>
            <ListArchivo
              lista={this.state.lista}
              update={this.update}
            />
          </div>
        </div>
      </div>
    )
  }
}
