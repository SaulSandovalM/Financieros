import React, { Component } from 'react'
import firebase from '../../../Firebase'
import ListComponent from './ListComponent'
import './Pasa.css'
import TextField from '@material-ui/core/TextField'
import Checkbox from '@material-ui/core/Checkbox'

export default class Pasa extends Component {
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
      filer: '',
      filexml: ['No hay datos cargados'],
      filex: ['No hay datos cargados'],
      filefactura: [{ url: '', nombre: '' }],
      filef: [{ url: '', nombre: '' }],
      recibosList: [{ folio: 'Recibo', nombre: '', importe: '', iva: '0', isr: '0', fecha: '', estatus: '', subtotal: '0', total: '0', uuid: 'Recibo' }],
      autorizados: false,
      noautorizados: false,
      pendientes: false,
      obs: '',
      opened: false,
      pasa: true
    }
    this.toggleBox = this.toggleBox.bind(this)
  }

  toggleBox() {
    const { opened } = this.state;
    this.setState({
      opened: !opened,
    });
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

  pasa = (item) => {
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
      obs: this.state.obs,
      fechaP: item.fechaP,
      rein: item.rein,
      pasa: this.state.pasa ? this.state.pasa : this.state.cantidad
    }
    firebase.database().ref().update(updates)
    alert('Tu solicitud fue enviada.')
    this.resetForm()
  }

  handleInputChange = (e, index) => {
    const { name, value } = e.target
    const list = [...this.state.recibosList]
    list[index][name] = value
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

  toggleCheckAuto (event) {
    this.setState({
      pasa: !this.state.pasa
    })
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
                      <TextField
                        label='Cantidad'
                        name='cantidad'
                        value={this.state.cantidad}
                        onChange={this.handleChange.bind(this)}
                      />
                    </div>
                    <div className='p-container-valeslist'>
                    <Checkbox
                      name='pasa'
                      checked={this.state.pasa}
                      onChange={this.toggleCheckAuto.bind(this)}
                    />
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='title-tb-valeslist'>
          <div className='caja-valeslist'>
            <ListComponent
              lista={this.state.lista}
              pasa={this.pasa}
            />
          </div>
        </div>
      </div>
    )
  }
}
