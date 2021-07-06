import React, { Component } from 'react'
import firebase from '../../../Firebase'
import ListComponent from './ListComponent'
import './ArchivosPago.css'
import Dropzone from 'react-dropzone'
import TextField from '@material-ui/core/TextField'
import CurrencyFormat from 'react-currency-format'
import Fab from '@material-ui/core/Fab'
import CheckIcon from '@material-ui/icons/Check'

export default class ArchivosPago extends Component {
  constructor(props) {
    super(props)
    var user = firebase.auth().currentUser
    var email
    if (user != null) {
      email = user.email
    }
    let admin
    if (email === 'candy@procuraduria.com') {
      admin = 'CANDY'
    } else if (email === 'angel@procuraduria.com') {
      admin = 'ANGEL'
    } else if (email === 'danya@procuraduria.com') {
      admin = 'DANYA'
    }
    var today = new Date()
    var dd = today.getDate()
    var mm = today.getMonth() + 1
    var yyyy = today.getFullYear()
    if (dd < 10) {
      dd = '0' + dd
    }
    if (mm < 10) {
      mm = '0' + mm
    }
    today = dd + '/' + mm + '/' + yyyy
    this.state = {
      lista: [
        {
          id: 1,
          name: 'Prueba',
          done: false
        },
      ],
      alert: false,
      xml: 0,
      xmlL: 0,
      pdf2: 0,
      filefactura: [],
      xmlC: [],
      xmlLoading: 0,
      fechaE: today,
      partida: '',
      up: '',
      total: [0],
      contador: [],
      numContra: '',
      datos: [],
      adqui: ' ',
      presupuesto: [
        {
          id: 1,
          name: 'prueba',
          done: false
        }
      ],
      realizo: admin
    }
  }

  handleOnChange1 (event) {
    const Total = this.state.total
    var contador = this.state.contador
    var datosXml = this.state.datos
    for (var i = 0; i < event.target.files.length; i++) {
      contador.push(i)
      const file = event.target.files[i]
      const xmlp = file
      var reader = new FileReader()
      const par = this.state.partida
      const up = this.state.up
      const numfolio = this.state.numFolio
      reader.onload = function (event) {
        var XMLParser = require('react-xml-parser')
        var xml = new XMLParser().parseFromString(event.target.result)
        const data = {
          'total': xml.attributes['Total'] ? xml.attributes['Total'] : 'No encuentra total',
          'subtotal': xml.attributes['SubTotal'] ? xml.attributes['SubTotal'] : (parseFloat(xml.attributes['Total']) + parseFloat(xml.children['3'].attributes['TotalImpuestosRetenidos'] ? xml.children['3'].attributes['TotalImpuestosRetenidos'] : 0)) - parseFloat(xml.children['3'].attributes['TotalImpuestosTrasladados']),
          'folio': xml.attributes['Folio'] ? xml.attributes['Folio'] : '0',
          'serie': xml.attributes['Serie'] ? xml.attributes['Serie'] : '0',
          'nombre': xml.children['1'].attributes['Nombre'] ? xml.children['1'].attributes['Nombre'] : 'No encuentra Nombre',
          'importe': xml.attributes['SubTotal'] ? xml.attributes['SubTotal'] : (parseFloat(xml.attributes['Total']) + (xml.children['3'].attributes['TotalImpuestosRetenidos'] ? xml.children['3'].attributes['TotalImpuestosRetenidos'] : 0)) - parseFloat(xml.children['3'].attributes['TotalImpuestosTrasladados']),
          'iva': xml.children['3'].attributes['TotalImpuestosTrasladados'] ? xml.children['3'].attributes['TotalImpuestosTrasladados'] : 0,
          'isr': xml.children['3'].attributes['TotalImpuestosRetenidos'] ? xml.children['3'].attributes['TotalImpuestosRetenidos'] : 0,
          'fecha': xml.getElementsByTagName('tfd:TimbreFiscalDigital')[0].attributes['FechaTimbrado'],
          'uuid': xml.getElementsByTagName('tfd:TimbreFiscalDigital')[0].attributes['UUID'] ? xml.getElementsByTagName('tfd:TimbreFiscalDigital')[0].attributes['UUID'] : xmlp.name.slice(0, -4),
          'descripcion': xml.children['2'].children['0'].attributes['Descripcion'],
          'estatus': 'sin asignar',
          'tipo': 'directo',
          'partida': par,
          'up': up,
          'numfolio': numfolio
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
        console.log(datosXml.push(data))
        Total.push(parseFloat(data.total))
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

  componentDidMount () {
    const itemsPresupuesto = firebase.database().ref('presupuesto/')
    this.listenForPresupuesto(itemsPresupuesto)
    const itemsRefValidacion = firebase.database().ref('xmlPagoDirecto')
    this.listenValidacion(itemsRefValidacion)
  }

  resetForm () {
    this.refs.contactForm.reset()
  }

  handleInput (event) {
    const state = this.state
    state[event.target.name] = event.target.value
    this.setState(state)
  }

  listenForPresupuesto = (itemsPresupuesto) => {
    itemsPresupuesto.on('value', (snap) => {
      var presupuesto = []
      snap.forEach((child) => {
        presupuesto.push({
          año: child.val().año,
          rm: child.val().rm,
          ur: child.val().ur,
          up: child.val().up,
          rubro: child.val().rubro,
          tg: child.val().tg,
          ogasto: child.val().ogasto,
          npro: child.val().npro,
          f: child.val().f,
          fu: child.val().fu,
          sf: child.val().sf,
          eje: child.val().eje,
          s: child.val().s,
          prog: child.val().prog,
          sp: child.val().sp,
          min: child.val().min,
          obj: child.val().obj,
          proy: child.val().proy,
          est: child.val().est,
          obra: child.val().obra,
          ben: child.val().ben,
          eg: child.val().eg,
          mi: child.val().mi,
          pr: child.val().pr,
          pd: child.val().pd,
          itrans: child.val().itrans,
          igest: child.val().igest,
          la: child.val().la,
          ods: child.val().ods,
          et: child.val().et,
          ff: child.val().ff,
          of: child.val().of,
          np: child.val().np,
          cpa: child.val().cpa,
          ene: child.val().ene,
          gasene: child.val().gasene,
          feb: child.val().feb,
          gasfeb: child.val().gasfeb,
          mar: child.val().mar,
          gasmar: child.val().gasmar,
          abr: child.val().abr,
          gasabr: child.val().gasabr,
          may: child.val().may,
          gasmay: child.val().gasmay,
          jun: child.val().jun,
          gasjun: child.val().gasjun,
          jul: child.val().jul,
          gasjul: child.val().gasjul,
          ago: child.val().ago,
          gasago: child.val().gasago,
          sep: child.val().sep,
          gassep: child.val().gassep,
          oct: child.val().oct,
          gasoct: child.val().gasoct,
          nov: child.val().nov,
          gasnov: child.val().gasnov,
          dic: child.val().dic,
          gasdic: child.val().gasdic,
          total: child.val().total,
          ampliacion: child.val().ampliacion,
          reduccion: child.val().reduccion,
          transferencia: child.val().transferencia,
          estatus: child.val().estatus,
          id: child.key
        })
      })
      this.setState({
        presupuesto: presupuesto
      })
    })
  }

  listenValidacion = (itemsRefValidacion) => {
    itemsRefValidacion.on('value', (snap) => {
      var validacion = []
      snap.forEach((child) => {
        validacion.push({
          NumFacturas: child.val().NumFacturas,
          Fondo: child.val().Fondo,
          FechaI: child.val().FechaI,
          Contrarecibo: child.val().Contrarecibo,
          FechaP: child.val().FechaP,
          Devolucion: child.val().Devolucion,
          Total: child.val().Total,
          TipoPerona: child.val().TipoPersona,
          NumContra: child.val().numContra,
          Adquisicion: child.val().Adquisicion,
          Xml: child.val().Xml,
          xmlC: child.val().xmlC,
          filefactura: child.val().filefactura,
          realizo: child.val().realizo,
          folio: child.val().folio,
          id: child.key
        })
      })
      this.setState({
        listaValidacion: validacion
      })
    })
  }

  sendMessage (e) {
    e.preventDefault()
    const tota = (a, b) => a + b
    const Total2 = this.state.total.reduce(tota)
    const params = {
      NumFacturas: this.state.contador.length,
      Fondo: ' ',
      FechaI: this.state.fechaE,
      Contrarecibo: ' ',
      FechaP: ' ',
      Devolucion: ' ',
      Total: Total2,
      TipoPerona: this.inputTipoPersona.value,
      NumContra: this.state.numContrato,
      Adquisicion: this.state.adqui,
      Xml: this.state.datos,
      xmlC: this.state.xmlC,
      filefactura: this.state.filefactura,
      realizo: this.state.realizo,
      folio: this.state.numFolio
    }
    console.log(params)
    this.setState({
      xmlC: [{ url: '', nombre: '' }],
      filefactura: [{ url: '', nombre: '' }],
      contador: [],
      total: [0],
      datos: []
    })
    if (params.NumFacturas && params.Fondo && params.FechaI
      && params.Contrarecibo && params.FechaP && params.Devolucion
      && params.Total && params.TipoPerona && params.NumContra && params.Adquisicion
      && params.Xml && params.xmlC && params.filefactura && params.realizo && params.folio) {
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
    const { fechaE } = this.state

    let presupuestop = this.state.presupuesto.map(item => {
      return item.ogasto
    })
    let resultp = presupuestop.filter((item, index) => {
      return presupuestop.indexOf(item) === index
    })
    let presupuestou = this.state.presupuesto.map(item => {
      return (this.state.partida === item.ogasto) && item.up
    })
    let resultu = presupuestou.filter((item, index) => {
      return presupuestou.indexOf(item) === index
    })
    let presupuestor = this.state.presupuesto.map(item => {
      return (this.state.partida === item.ogasto && this.state.up === item.up) && item.np
    })
    let resultr = presupuestor.filter((item, index) => {
      return presupuestor.indexOf(item) === index
    })
    let presupuesto = this.state.presupuesto.map(item => {
      return (this.state.partida === item.ogasto && this.state.up === item.up) && item.jun
    })
    let result = presupuesto.filter((item, index) => {
      return presupuesto.indexOf(item) === index
    })
    let dispo = result[1] === false ? result[0] : result[1]

    return (
      <div className='container-valeslist'>
        <div className='margin-f-a'>
          <div className='p-container-validacion'>
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
              <p className='p-title-size-valeslist'>
                - Selecciona la carga de evidencias de tus comprobaciones
              </p>
              <div>
                <p className='p-banco'><b>CANTIDAD DISPONIBLE</b></p>
                <p className='cantidad-add-banco'>
                  MXN
                  <CurrencyFormat
                    value={dispo}
                    displayType='text'
                    thousandSeparator
                    prefix=' $'
                  />
                </p>
              </div>
            </div>
            <div className='inputs-container-valeslist' style={{ width: '60%' }}>
              <div className='inputs-valeslist'>
                <div className='inputs-row-valeslist'>
                  <form style={{ display: 'flex', width: '100%', flexDirection: 'column' }} onSubmit={this.sendMessage.bind(this)} ref='contactForm'>
                    <div style={{ width: '100%', display: 'flex' }}>
                      <div className='p-container-validacion'>
                        <p style={{ margin: '0px', color: 'grey', fontSize: '12px' }}>Partida</p>
                        <select
                          style={{
                            width: '100%',
                            height: '34px',
                            background: '#f4f4f4',
                            border: '2px solid rgb(102, 102, 102)',
                            borderRadius: '5px'
                          }}
                          id='partida'
                          name='partida'
                          ref={partida => this.inputPartida = partida}
                          onChange={this.handleInput.bind(this)}
                          value={this.state.partida}
                        >
                          {resultp.map((x,y) =>
                            <option name={y}>{x}</option>
                          )}
                        </select>
                      </div>
                      <div className='p-container-validacion'>
                        <p style={{ margin: '0px', color: 'grey', fontSize: '12px' }}>Up</p>
                        <select
                          style={{
                            width: '100%',
                            height: '34px',
                            background: '#f4f4f4',
                            border: '2px solid rgb(102, 102, 102)',
                            borderRadius: '5px'
                          }}
                          id='up'
                          name='up'
                          ref='up'
                          onChange={this.handleInput.bind(this)}
                          value={this.state.up}
                        >
                          {resultu.map((x,y) =>
                            <option name={y}>{x}</option>
                          )}
                        </select>
                      </div>
                      {(this.state.up && this.state.partida && this.state.numFolio) &&
                        <div className='p-container-validacion'>
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
                      }
                      {(this.state.up && this.state.partida && this.state.numFolio) &&
                        <div className='p-container-validacion'>
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
                      }
                    </div>
                    <div className='p-container-validacion'>
                      <p style={{ margin: '0px', color: 'grey', fontSize: '12px' }}>Nombre de partida</p>
                      <select
                        style={{
                          width: '100%',
                          height: '34px',
                          background: '#f4f4f4',
                          border: '2px solid rgb(102, 102, 102)',
                          borderRadius: '5px'
                        }}
                      >
                        {resultr.map((x,y) =>
                          <option name={y}>{x}</option>
                        )}
                      </select>
                    </div>
                    <div style={{ width: '100%', display: 'flex', marginTop: '20px' }}>
                      <div className='p-container-validacion'>
                        <p style={{ margin: '0px', color: 'grey', fontSize: '12px' }}>Tipo de persona</p>
                        <select
                          style={{
                            width: '100%',
                            height: '34px',
                            background: '#f4f4f4',
                            border: '2px solid rgb(102, 102, 102)',
                            borderRadius: '5px'
                          }}
                          id='TipoPersona'
                          name='TipoPersona'
                          value={this.state.TipoPersona}
                          ref={TipoPersona => this.inputTipoPersona = TipoPersona}
                        >
                          <option>Fisica</option>
                          <option>Moral</option>
                        </select>
                      </div>
                      <div className='p-container-validacion'>
                        <TextField
                          label='Fecha de Envio'
                          id='fechaE'
                          name='fechaE'
                          value={fechaE}
                          disabled
                          onChange={this.handleInput.bind(this)}
                          ref={fechaE => this.inputImporte = fechaE}
                        />
                      </div>
                      <div className='p-container-validacion'>
                        <TextField
                          label='Numero de contrato'
                          id='numContrato'
                          name='numContrato'
                          value={this.state.numContrato}
                          onChange={this.handleInput.bind(this)}
                          ref={numContrato => this.inputNumContrato = numContrato}
                        />
                      </div>
                      <div className='p-container-validacion'>
                        <TextField
                          label='Numero de Folio'
                          id='numFolio'
                          name='numFolio'
                          value={this.state.numFolio}
                          onChange={this.handleInput.bind(this)}
                          ref={numFolio => this.inputNumFolio = numFolio}
                        />
                      </div>
                      <div className='p-container-validacion'>
                        <p style={{ margin: '0px', color: 'grey', fontSize: '12px' }}>Programa Anual de Adquisiciones</p>
                        <input
                          type='checkbox'
                          id='adqui'
                          name='adqui'
                          value={this.state.adqui}
                          onChange={this.handleInput}
                        />
                      </div>
                    </div>
                    <div className='div-content-fab-com'>
                      <Fab color='primary' style={{ background: 'green' }} type='submit'>
                        <CheckIcon />
                      </Fab>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='title-tb-valeslist'>
          <div className='caja-valeslist'>
            <ListComponent listaValidacion={this.state.listaValidacion} />
          </div>
        </div>
      </div>
    )
  }
}
