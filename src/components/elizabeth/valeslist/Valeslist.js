import React, { Component } from 'react'
import firebase from '../../../Firebase'
import ListComponent from './ListComponent'
import './Valeslist.css'
import TextField from '@material-ui/core/TextField'

export default class Valeslist extends Component {
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
      xml: 0,
      pdf2: 0,
      pdf3: 0,
      filex: '',
      filef: '',
      filer: '',
      filexml: '0',
      filefactura: [],
      filerecibo: '0',
      autorizados: false,
      noautorizados: false,
      pendientes: false,
      chequea: ''
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
        filexml: record
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
        const data = {
          'total': xml.attributes['Total'],
          'subtotal': xml.attributes['SubTotal'] ? xml.attributes['SubTotal'] : 0,
          'folio': xml.attributes['Folio'] ? xml.attributes['Folio'] : '0',
          'Nombre': xml.children['0'].attributes['Nombre'],
          'importe': xml.children['2'].children['0'].attributes['Importe'],
          'iva': xml.children['3'].attributes['TotalImpuestosTrasladados'],
          'isr': xml.children['3'].attributes['TotalImpuestosRetenidos'] ? xml.children['3'].attributes['TotalImpuestosRetenidos'] : 0,
          'fecha': xml.children['4'].children['0'].attributes['FechaTimbrado'],
          'uuid': xml.children['4'].children['0'].attributes['UUID'],
        }
        fetch(xml).then(res => res.text()).then(xml => {
          fetch('https://financieros-78cb0.firebaseio.com/xml.json', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
              body: JSON.stringify(data),
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
      console.log(this.state.filefactura)
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
          cheque: child.val().cheque,
          vale: child.val().vale,
          cantidad: child.val().cantidad,
          cantidadc: child.val().cantidadc,
          cantidadr: child.val().cantidadr,
          concepto: child.val().concepto,
          oficioS: child.val().oficioS,
          area: child.val().area,
          turno: child.val().turno,
          factura: child.val().factura,
          recibos: child.val().recibos,
          sc: child.val().sc,
          fecha: child.val().fecha,
          autorizo: child.val().autorizo,
          personaR: child.val().personaR,
          estatus: child.val().estatus,
          filexml: child.val().filexml,
          filefactura: child.val().filefactura,
          filerecibo: child.val().filerecibo,
          id: child.key
        })
      })
      this.setState({
        lista: lista
      })
      console.log(this.state.lista)
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
    updates['vales/' + item.id] = {
      cheque: item.cheque,
      vale: item.vale,
      cantidad: item.cantidad,
      cantidadc: item.cantidadc,
      cantidadr: item.cantidadr,
      concepto: item.concepto,
      oficioS: item.oficioS,
      area: item.area,
      turno: item.turno,
      factura: item.factura,
      recibos: item.recibos,
      sc: item.sc,
      fecha: item.fecha,
      autorizo: item.autorizo,
      personaR: item.personaR,
      estatus: 'Comprobado',
      filexml: this.state.filexml,
      filefactura: this.state.filefactura,
      filerecibo: this.state.filerecibo,
    }
    firebase.database().ref().update(updates)
    alert('Tu solicitud fue enviada.')
  }

  render () {
    return (
      <div className='container-valeslist'>
        <form className='margin-f-a' onSubmit={this.sendMessage.bind(this)} ref='contactForm'>
          <div className='p-container-valeslist'>
            <div className='p-margin-valeslist'>
              <p className='p-title-size-valeslist'>
                - Selecciona la carga de evidencias de tus comprobaciones
              </p>
            </div>
            <div className='inputs-container-valeslist'>
              <div className='inputs-valeslist'>
                <div className='inputs-row-valeslist'>
                  <div className='p-container-valeslist'>
                    <TextField
                      label='Xml'
                      type='file'
                      onChange={this.handleOnChange1.bind(this)}
                    />
                    <progress className='progress-valeslist' value={this.state.xml} max='100'>
                      {this.state.xml} %
                    </progress>
                  </div>
                  <div className='p-container-valeslist'>
                    <TextField
                      label='Factura'
                      type='file'
                      onChange={this.handleOnChange2.bind(this)}
                    />
                    <progress className='progress-valeslist' value={this.state.pdf2} max='100'>
                      {this.state.pdf2} %
                    </progress>
                  </div>
                  <div className='p-container-valeslist'>
                    <TextField
                      label='Recibo'
                      type='number'
                      name='filerecibo'
                      value={this.state.filerecibo}
                      onChange={this.handleChange.bind(this)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
        <div className='title-tb-valeslist'>
          <div className='caja-valeslist'>
            <ListComponent
              lista={this.state.lista}
              update={this.update}
            />
          </div>
        </div>
      </div>
    )
  }
}
