import React, { Component } from 'react'
import firebase from '../../../Firebase'
import ListComponent from './ListComponent'
import './Valeslist.css'
import TextField from '@material-ui/core/TextField'
import Dropzone from 'react-dropzone'

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
      filer: '',
      filexml: ['No hay datos cargados'],
      filex: ['No hay datos cargados'],
      filefactura: [],
      filef: ['No hay datos cargados'],
      filerecibo: 0,
      autorizados: false,
      noautorizados: false,
      pendientes: false,
      obs: ''
    }
  }

  handleOnChange1 (event) {
    for (var i = 0; i < event.target.files.length; i++) {
      const file = event.target.files[0]
      var xml = file
      var reader = new FileReader()
      reader.onload = function (event) {
        var XMLParser = require('react-xml-parser')
        var xml = new XMLParser().parseFromString(event.target.result)
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
    for (let i = 0; i < event.target.files.length; i++) {
      const file = event.target.files[i]
      const storageRef = firebase.storage().ref(`comprobacion/${file.name}`)
      const task = storageRef.put(file)
      task.on('state_changed', (snapshot) => {
        let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        this.setState({
          pdf2: percentage
        })
      }, error => {
        console.error(error.message)
      }, () => storageRef.getDownloadURL().then(url =>  {
        let ruta = this.state.filefactura
        const record = url
        ruta += record + ','
        this.setState({
          filefactura: ruta.split(',')
        })
      }))
    }
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
          filex: child.val().filex,
          filexml: child.val().filexml,
          filefactura: child.val().filefactura,
          filef: child.val().filef,
          filerecibo: child.val().filerecibo,
          obs: child.val().obs,
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
      filexml: this.state.filexml ? this.state.filexml : [0],
      filex: this.state.filex ? this.state.filex : [0],
      filefactura: this.state.filefactura ? this.state.filefactura : [0],
      filef: this.state.filef ? this.state.filef : [0],
      filerecibo: this.state.filerecibo ? this.state.filerecibo : [0],
      obs: this.state.obs
    }
    firebase.database().ref().update(updates)
    alert('Tu solicitud fue enviada.')
    this.resetForm()
  }

  obs = (item) => {
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
      filexml: item.filexml,
      filex: item.filex,
      filefactura: item.filefactura,
      filef: item.filef,
      filerecibo: item.filerecibo,
      obs: this.state.obs
    }
    firebase.database().ref().update(updates)
    alert('Tu solicitud fue enviada.')
    this.resetForm()
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
                    <progress className='progress' value={this.state.xml} max='100'>
                      {this.state.xml} %
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
                      {this.state.pdf2} %
                    </progress>
                  </div>
                  <div className='p-container-valeslist'>
                    <TextField
                      label='Recibo'
                      type='number'
                      name='filerecibo'
                      onChange={this.handleChange.bind(this)}
                    />
                  </div>
                  <div className='p-container-valeslist'>
                    <TextField
                      label='Observaciones'
                      name='obs'
                      value={this.state.obs}
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
              obs={this.obs}
            />
          </div>
        </div>
      </div>
    )
  }
}
