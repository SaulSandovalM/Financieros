import React, { Component } from 'react'
import firebase from '../../../Firebase'
import ListComponent from './ListComponent'
import './Valeslist.css'
import TextField from '@material-ui/core/TextField'
import Dropzone from 'react-dropzone'
import AddIcon from '@material-ui/icons/Add'
import RemoveIcon from '@material-ui/icons/Remove'
import Button from '@material-ui/core/Button'
import AttachMoneyIcon from '@material-ui/icons/AttachMoney'
import InputAdornment from '@material-ui/core/InputAdornment'

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
      xmlL: 0,
      pdf2: 0,
      filer: '',
      filexml: ['No hay datos cargados'],
      filex: ['No hay datos cargados'],
      filefactura: [{ url: '', nombre: '' }],
      xmlC: [{ url: '', nombre: '' }],
      filef: [{ url: '', nombre: '' }],
      recibosList: [{ folio: 'Recibo simple', nombre: '', importe: '0', iva: '0', isr: '0', fecha: '', estatus: '', subtotal: '0', total: '0', uuid: 'Recibo simple', tipo: 'revolvente' }],
      autorizados: false,
      noautorizados: false,
      pendientes: false,
      obs: '',
      opened: false,
      xmlLoading: 0,
      contador: 0,
      beneficiario: [],
      newnombre: ''
    }
    this.toggleBox = this.toggleBox.bind(this)
  }

  toggleBox() {
    const { opened } = this.state;
    this.setState({
      opened: !opened
    })
  }

  handleOnChange1 (event) {
    for (var i = 0; i < event.target.files.length; i++) {
      const file = event.target.files[i]
      const xmlp = file
      var reader = new FileReader()
      reader.onload = function (event) {
        var XMLParser = require('react-xml-parser')
        var xml = new XMLParser().parseFromString(event.target.result)
        const data = {
          'descuento': xml.attributes['Descuento'] ? xml.attributes['Descuento'] : 0,
          'total': xml.attributes['Total'] ? xml.attributes['Total'] : 'No encuentra total',
          'subtotal': xml.attributes['SubTotal'] ? xml.attributes['SubTotal'] : (parseFloat(xml.attributes['Total']) + parseFloat(xml.children['3'].attributes['TotalImpuestosRetenidos'] ? xml.children['3'].attributes['TotalImpuestosRetenidos'] : 0)) - parseFloat(xml.children['3'].attributes['TotalImpuestosTrasladados']),
          'folio': xml.attributes['Folio'] ? xml.attributes['Folio'] : '0',
          'nombre': xml.children['0'].attributes['Nombre'] ? xml.children['0'].attributes['Nombre'] : 'No encuentra Nombre',
          'nombrer': xml.children['1'].attributes['Nombre'] ? xml.children['1'].attributes['Nombre'] : 'No encuentra Nombre',
          'rfc': xml.children['0'].attributes['Rfc'] ? xml.children['0'].attributes['Rfc'] : 'No encuentra rfc',
          'importe': xml.attributes['SubTotal'] ? xml.attributes['SubTotal'] : (parseFloat(xml.attributes['Total']) + (xml.children['3'].attributes['TotalImpuestosRetenidos'] ? xml.children['3'].attributes['TotalImpuestosRetenidos'] : 0)) - parseFloat(xml.children['3'].attributes['TotalImpuestosTrasladados']),
          'iva': xml.children['3'].attributes['TotalImpuestosTrasladados'] ? xml.children['3'].attributes['TotalImpuestosTrasladados'] : 0,
          'isr': xml.children['3'].attributes['TotalImpuestosRetenidos'] ? xml.children['3'].attributes['TotalImpuestosRetenidos'] : 0,
          'fecha': xml.getElementsByTagName('tfd:TimbreFiscalDigital')[0].attributes['FechaTimbrado'],
          'uuid': xml.getElementsByTagName('tfd:TimbreFiscalDigital')[0].attributes['UUID'].toUpperCase() ? xml.getElementsByTagName('tfd:TimbreFiscalDigital')[0].attributes['UUID'].toUpperCase() : xmlp.name.slice(0, -4).toUpperCase(),
          'estatus': 'sin asignar',
          'tipo': 'revolvente'
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
      reader.readAsText(xmlp)
      const storageRef = firebase.storage().ref(`xml/${file.name}`)
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
    let i = 0
    let con
    for (i ; i < event.target.files.length; i++) {
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
        this.setState({
          filefactura: [...this.state.filefactura, { url: url, nombre: file.name }],
        })
      }))
      con = i + 1
      this.setState({
        contador: con
      })
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
          fechaF: child.val().fechaF,
          autorizo: child.val().autorizo,
          personaR: child.val().personaR,
          estatus: child.val().estatus,
          estatusC: child.val().estatusC,
          filefactura: child.val().filefactura,
          filef: child.val().filef,
          recibosList: child.val().recibosList,
          xmlC: child.val().xmlC ? child.val().xmlC : [{ url: '', nombre: '' }],
          obs: child.val().obs,
          fechaP: child.val().fechaP,
          rein: child.val().rein,
          pasa: child.val().pasa,
          id: child.key
        })
      })
      this.setState({
        lista: lista
      })
    })
  }

  listenForBeneficiario = (itemsRefPre) => {
    itemsRefPre.on('value', (snap) => {
      var beneficiario = []
      snap.forEach((child) => {
        beneficiario.push({
          nombre: child.val().nombre,
          id: child.key
        })
      })
      this.setState({
        beneficiario: beneficiario
      })
    })
  }

  componentDidMount () {
    const itemsRef = firebase.database().ref('vales/').orderByChild('vale')
    this.listenForItems(itemsRef)
    const itemsRefPre = firebase.database().ref('beneficiario/').orderByChild('nombre')
    this.listenForBeneficiario(itemsRefPre)
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

  add () {
    const params = {
      nombre: this.state.newnombre
    }
    this.setState({
      newnombre: ''
    })
    if (params.nombre) {
      firebase.database().ref('beneficiario').push(params).then(() => {
        alert('Se ha agregado la nueva persona')
      }).catch(() => {
        alert('Tu solicitud no puede ser enviada')
      })
    }
  }

  update = (item) => {
    let updates = {}
    console.log(updates['vales/' + item.id] = {
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
      fechaF: item.fechaF,
      autorizo: item.autorizo,
      personaR: item.personaR,
      estatus: item.estatus,
      estatusC: 'Comprobado',
      filefactura: this.state.filefactura ? this.state.filefactura : [0],
      filef: this.state.filef ? this.state.filef : [0],
      recibosList: this.state.recibosList ? this.state.recibosList : [0],
      xmlC: this.state.xmlC ? this.state.xmlC : [0],
      obs: item.obs,
      fechaP: item.fechaP,
      rein: item.rein,
      pasa: item.pasa
    })
    firebase.database().ref().update(updates)
    this.state.recibosList.forEach(element => firebase.database().ref('xml').push(element))
    alert('Tu solicitud fue enviada.')
    this.setState({
      filexml: ['No hay datos cargados'],
      filex: ['No hay datos cargados'],
      filefactura: [{ url: '', nombre: '' }],
      xmlC:  [{ url: '', nombre: '' }],
      filef: [{ url: '', nombre: '' }],
      recibosList: [{ folio: 'Recibo simple', nombre: '', importe: '0', iva: '0', isr: '0', fecha: '', estatus: '', subtotal: '0', total: '0', uuid: 'Recibo simple', tipo: 'revolvente' }],
      obs: '',
      pdf2: 0
    })
  }

  updateFacturas = (item) => {
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
      fechaF: item.fechaF,
      autorizo: item.autorizo,
      personaR: item.personaR,
      estatus: item.estatus,
      estatusC: 'Comprobado',
      filefactura: this.state.filefactura ? this.state.filefactura : [0],
      filef: item.filef,
      recibosList: item.recibosList,
      xmlC: this.state.xmlC ? this.state.xmlC : [0],
      obs: item.obs,
      fechaP: item.fechaP,
      rein: item.rein,
      pasa: item.pasa
    }
    firebase.database().ref().update(updates)
    // this.state.recibosList.forEach(element => firebase.database().ref('xml').push(element))
    alert('Tu solicitud fue enviada.')
    this.setState({
      filexml: ['No hay datos cargados'],
      filex: ['No hay datos cargados'],
      filefactura: [{ url: '', nombre: '' }],
      xmlC:  [{ url: '', nombre: '' }],
      filef: [{ url: '', nombre: '' }],
      recibosList: [{ folio: 'Recibo simple', nombre: '', importe: '0', iva: '0', isr: '0', fecha: '', estatus: '', subtotal: '0', total: '0', uuid: 'Recibo simple', tipo: 'revolvente' }],
      obs: '',
      pdf2: 0
    })
  }

  updateRecibos = (item) => {
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
      fechaF: item.fechaF,
      autorizo: item.autorizo,
      personaR: item.personaR,
      estatus: item.estatus,
      estatusC: 'Comprobado',
      filefactura: item.filefactura,
      filef: item.filef,
      recibosList: this.state.recibosList ? this.state.recibosList : [0],
      xmlC: item.xmlC,
      obs: item.obs,
      fechaP: item.fechaP,
      rein: item.rein,
      pasa: item.pasa
    }
    firebase.database().ref().update(updates)
    this.state.recibosList.forEach(element => firebase.database().ref('xml').push(element))
    alert('Tu solicitud fue enviada.')
    this.setState({
      filexml: ['No hay datos cargados'],
      filex: ['No hay datos cargados'],
      filefactura: [{ url: '', nombre: '' }],
      xmlC:  [{ url: '', nombre: '' }],
      filef: [{ url: '', nombre: '' }],
      recibosList: [{ folio: 'Recibo simple', nombre: '', importe: '0', iva: '0', isr: '0', fecha: '', estatus: '', subtotal: '0', total: '0', uuid: 'Recibo simple', tipo: 'revolvente' }],
      obs: '',
      pdf2: 0
    })
  }

  editarRecibos = (item) => {
    this.props.history.push(`/EditarVale/${item.id}`)
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
      fechaF: item.fechaF,
      autorizo: item.autorizo,
      personaR: item.personaR,
      estatus: item.estatus,
      estatusC: item.estatusC,
      filefactura: item.filefactura,
      filef: item.filef,
      recibosList: item.recibosList,
      xmlC: item.xmlC,
      obs: this.state.obs,
      fechaP: item.fechaP,
      rein: item.rein,
      pasa: item.pasa
    }
    firebase.database().ref().update(updates)
    alert('Tu solicitud fue enviada.')
    this.resetForm()
  }

  handleInputChange = (e, index) => {
    const { name, value } = e.target
    const list = [...this.state.recibosList]
    list[index][name] = value.toUpperCase()
    this.setState({
      recibosList: list
    })
  }

  handleRemoveClick = (index) => {
    const list = [...this.state.recibosList]
    list.splice(index, 1)
    this.setState({
      recibosList: list
    })
  }

  handleAddClick = () => {
    this.setState({
      recibosList: [
        ...this.state.recibosList,
        { folio: 'Recibo simple', nombre: '', importe: '0', iva: '0', isr: '0', fecha: '', estatus: '', subtotal: '0', total: '0', uuid: 'Recibo simple', tipo: 'revolvente' }
      ]
    })
  }

  render () {
    const newArray = ['']
    const myObj = {}
    this.state.beneficiario.filter(el => {
      if (!(el in myObj) && el.nombre !== undefined) {
        myObj[el + 1] = true
        newArray.push(el)
      }
    })
    const aarr = []
    newArray.map(item => {
      return aarr.push(item.nombre)
    })
    let result = aarr.filter((item,index)=>{
      return aarr.indexOf(item) === index
    })

    const sumaVale = [0]
    this.state.recibosList.map(item => (
      sumaVale.push(parseFloat(item.subtotal))
    ))
    const canti = (a, b) => a + b
    var canti2 = sumaVale.reduce(canti)
    console.log(canti2)

    return (
      <div className='container-valeslist'>
        <div className='margin-f-a'>
          <div className='p-container-valeslist2'>
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
                        {this.state.xmlLoading} %
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
                      {this.state.contador}
                    </div>
                    <div className='p-container-valeslist'>
                      <TextField
                        label='Observaciones'
                        name='obs'
                        value={this.state.obs}
                        onChange={this.handleChange.bind(this)}
                      />
                    </div>
                  </form>
                  <div className='p-container-valeslist'>
                    <TextField
                      label='Nuevo Nombre'
                      name='newnombre'
                      value={this.state.newnombre.toUpperCase()}
                      onChange={this.handleChange.bind(this)}
                    />
                    <button onClick={this.add.bind(this)}>+</button>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', width: '300px' }}>
                      <Button
                        variant='contained'
                        color='primary'
                        onClick={this.toggleBox}
                        startIcon={<AddIcon />}
                      >
                        Agregar Recibos
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {this.state.opened &&
          <div className='content-fixed'>
            <div className='box-modal'>
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '20px' }}>
                <h3>Agregar Recibos</h3>
              </div>
              <div>
                {this.state.recibosList.map((x, i) =>
                  <div key={i} style={{ display: 'flex', justifyContent: 'center' }}>
                    <TextField
                      label='Recibo'
                      name='folio'
                      value={x.folio}
                      disabled
                      onChange={e => this.handleInputChange(e, i)}
                      style={{ width: '15%', marginRight: '1%' }}
                    />
                    <select
                      label='Nombre'
                      name='nombre'
                      value={x.nombre}
                      onChange={e => this.handleInputChange(e, i)}
                      style={{ width: '15%', marginRight: '1%' }}
                    >
                      {result.map(data =>
                        <option name={data}>{data}</option>
                      )}
                    </select>
                    <TextField
                      label='subtotal'
                      name='subtotal'
                      type='number'
                      value={x.subtotal}
                      onChange={e => this.handleInputChange(e, i)}
                      style={{ width: '15%', marginRight: '1%' }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <AttachMoneyIcon />
                          </InputAdornment>
                        ),
                      }}
                    />
                    <TextField
                      label='Fecha'
                      type='date'
                      name='fecha'
                      InputLabelProps={{
                        shrink: true,
                      }}
                      value={x.fecha}
                      onChange={e => this.handleInputChange(e, i)}
                      style={{ width: '15%', marginRight: '1%' }}
                    />
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                      {this.state.recibosList.length !== 1 &&
                        <button
                          className='btn-remove-r'
                          onClick={() => this.handleRemoveClick(i)}>
                          -
                        </button>
                      }
                      {this.state.recibosList.length - 1 === i &&
                        <button
                          className='btn-add-r'
                          onClick={this.handleAddClick}>
                          +
                        </button>
                      }
                    </div>
                  </div>
                )}
                <div style={{ display: 'flex', justifyContent: 'center' }}>{canti2}</div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'center', marginTop: '30px' }}>
                <Button
                  variant='contained'
                  color='secondary'
                  onClick={this.toggleBox}
                  startIcon={<RemoveIcon />}
                >
                  Salir
                </Button>
              </div>
            </div>
          </div>
        }
        <div className='title-tb-valeslist'>
          <div className='caja-valeslist'>
            <ListComponent
              lista={this.state.lista}
              update={this.update}
              obs={this.obs}
              updateFacturas={this.updateFacturas}
              updateRecibos={this.updateRecibos}
              editarRecibos={this.editarRecibos}
            />
          </div>
        </div>
      </div>
    )
  }
}
