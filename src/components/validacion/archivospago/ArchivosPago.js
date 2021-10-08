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
      admin = 'VALIDACION2'
    } else if (email === 'danya@procuraduria.com') {
      admin = 'VALIDACION2'
    } else if (email === 'mario@procuraduria.com') {
      admin = 'VALIDACION3'
    } else if (email === 'hortensia@procuraduria.com') {
      admin = 'VALIDACION3'
    }
    var today = new Date()
    var today2 = new Date()
    var dd = today.getDate()
    var mm = today.getMonth() + 1
    var mm2 = today2.getMonth() + 1
    var yyyy = today.getFullYear()
    if (dd < 10) {
      dd = '0' + dd
    }
    if (mm < 10) {
      mm = '0' + mm
    }
    today = dd + '/' + mm + '/' + yyyy
    today2 = mm2
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
      realizo: admin,
      presupuesto: [
        {
          id: 1,
          name: 'prueba',
          done: false
        }
      ],
      idPresupuestal: [],
      mes: today2
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
          'descuento': xml.attributes['Descuento'] ? xml.attributes['Descuento'] : 0,
          'total': xml.attributes['Total'] ? xml.attributes['Total'] : 'No encuentra total',
          'subtotal': xml.attributes['SubTotal'] ? xml.attributes['SubTotal'] : (parseFloat(xml.attributes['Total']) + parseFloat(xml.children['3'].attributes['TotalImpuestosRetenidos'] ? xml.children['3'].attributes['TotalImpuestosRetenidos'] : 0)) - parseFloat(xml.children['3'].attributes['TotalImpuestosTrasladados']),
          'folio': xml.attributes['Folio'] ? xml.attributes['Folio'] : '0',
          'serie': xml.attributes['Serie'] ? xml.attributes['Serie'] : '0',
          'nombre': xml.children['0'].attributes['Nombre'] ? xml.children['0'].attributes['Nombre'] : 'No encuentra Nombre',
          'nombrer': xml.children['1'].attributes['Nombre'] ? xml.children['1'].attributes['Nombre'] : 'No encuentra Nombre',
          'rfc': xml.children['0'].attributes['Rfc'] ? xml.children['0'].attributes['Rfc'] : 'No encuentra rfc',
          'importe': xml.attributes['SubTotal'] ? xml.attributes['SubTotal'] : (parseFloat(xml.attributes['Total']) + (xml.children['3'].attributes['TotalImpuestosRetenidos'] ? xml.children['3'].attributes['TotalImpuestosRetenidos'] : 0)) - parseFloat(xml.children['3'].attributes['TotalImpuestosTrasladados']),
          'iva': xml.children['3'].attributes['TotalImpuestosTrasladados'] ? xml.children['3'].attributes['TotalImpuestosTrasladados'] : 0,
          'isr': xml.children['3'].attributes['TotalImpuestosRetenidos'] ? xml.children['3'].attributes['TotalImpuestosRetenidos'] : 0,
          'fecha': xml.getElementsByTagName('tfd:TimbreFiscalDigital')[0].attributes['FechaTimbrado'],
          'uuid': xml.getElementsByTagName('tfd:TimbreFiscalDigital')[0].attributes['UUID'] ? xml.getElementsByTagName('tfd:TimbreFiscalDigital')[0].attributes['UUID'] : xmlp.name.slice(0, -4),
          'descripcion': xml.getElementsByTagName('cfdi:Concepto')[0].attributes['Descripcion'],
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
    const itemsPresupuesto = firebase.database().ref('presupuestoValidacion/')
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
          f: child.val().f,
          fu: child.val().fu,
          sf: child.val().sf,
          eje: child.val().eje,
          s: child.val().s,
          prog: child.val().prog,
          sp: child.val().sp,
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
          min: child.val().min,
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
          ampene: child.val().ampene,
          feb: child.val().feb,
          gasfeb: child.val().gasfeb,
          ampfeb: child.val().ampfeb,
          mar: child.val().mar,
          gasmar: child.val().gasmar,
          ampmar: child.val().ampmar,
          abr: child.val().abr,
          gasabr: child.val().gasabr,
          ampabr: child.val().ampabr,
          may: child.val().may,
          gasmay: child.val().gasmay,
          ampmay: child.val().ampmay,
          jun: child.val().jun,
          gasjun: child.val().gasjun,
          ampjun: child.val().ampjun,
          jul: child.val().jul,
          gasjul: child.val().gasjul,
          ampjul: child.val().ampjul,
          ago: child.val().ago,
          gasago: child.val().gasago,
          ampago: child.val().ampago,
          sep: child.val().sep,
          gassep: child.val().gassep,
          ampsep: child.val().ampsep,
          oct: child.val().oct,
          gasoct: child.val().gasoct,
          ampoct: child.val().ampoct,
          nov: child.val().nov,
          gasnov: child.val().gasnov,
          ampnov: child.val().ampnov,
          dic: child.val().dic,
          gasdic: child.val().gasdic,
          ampdic: child.val().ampdic,
          total: child.val().total,
          ampliacion: child.val().ampliacion,
          reduccion: child.val().reduccion,
          transferencia: child.val().transferencia,
          npro: child.val().npro,
          estatus: child.val().estatus ? child.val().estatus : ' ',
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
          Fondo: child.val().Fondo,
          FechaI: child.val().FechaI,
          Contrarecibo: child.val().Contrarecibo,
          FechaP: child.val().FechaP,
          Devolucion: child.val().Devolucion,
          Total: child.val().Total,
          TipoPersona: child.val().TipoPersona,
          NumContra: child.val().NumContra,
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
    let updates = {}
    updates['presupuestoValidacion/' + this.state.idPresupuestal.id] = {
      año: this.state.idPresupuestal.año,
      rm: this.state.idPresupuestal.rm,
      ur: this.state.idPresupuestal.ur,
      up: this.state.idPresupuestal.up,
      rubro: this.state.idPresupuestal.rubro,
      tg: this.state.idPresupuestal.tg,
      ogasto: this.state.idPresupuestal.ogasto,
      f: this.state.idPresupuestal.f,
      fu: this.state.idPresupuestal.fu,
      sf: this.state.idPresupuestal.sf,
      eje: this.state.idPresupuestal.eje,
      s: this.state.idPresupuestal.s,
      prog: this.state.idPresupuestal.prog,
      sp: this.state.idPresupuestal.sp,
      obj: this.state.idPresupuestal.obj,
      proy: this.state.idPresupuestal.proy,
      est: this.state.idPresupuestal.est,
      obra: this.state.idPresupuestal.obra,
      ben: this.state.idPresupuestal.ben,
      eg: this.state.idPresupuestal.eg,
      mi: this.state.idPresupuestal.mi,
      pr: this.state.idPresupuestal.pr,
      pd: this.state.idPresupuestal.pd,
      itrans: this.state.idPresupuestal.itrans,
      min: this.state.idPresupuestal.min,
      igest: this.state.idPresupuestal.igest,
      la: this.state.idPresupuestal.la,
      ods: this.state.idPresupuestal.ods,
      et: this.state.idPresupuestal.et,
      ff: this.state.idPresupuestal.ff,
      of: this.state.idPresupuestal.of,
      np: this.state.idPresupuestal.np,
      cpa: this.state.idPresupuestal.cpa,
      ene: this.state.mes === '01' ? this.state.idPresupuestal.ene - parseFloat(Total2).toFixed(2) : this.state.idPresupuestal.ene,
      gasene: this.state.mes === '01' ? this.state.idPresupuestal.gasene - parseFloat(Total2).toFixed(2) : this.state.idPresupuestal.gasene,
      ampene: this.state.idPresupuestal.ampene,
      feb: this.state.mes === '02' ? this.state.idPresupuestal.feb - parseFloat(Total2).toFixed(2) : this.state.idPresupuestal.feb,
      gasfeb: this.state.mes === '02' ? this.state.idPresupuestal.gasfeb - parseFloat(Total2).toFixed(2) : this.state.idPresupuestal.gasfeb,
      ampfeb: this.state.idPresupuestal.ampfeb,
      mar: this.state.mes === '03' ? this.state.idPresupuestal.mar - parseFloat(Total2).toFixed(2) : this.state.idPresupuestal.mar,
      gasmar: this.state.mes === '03' ? this.state.idPresupuestal.gasmar - parseFloat(Total2).toFixed(2) : this.state.idPresupuestal.gasmar,
      ampmar: this.state.idPresupuestal.ampmar,
      abr: this.state.mes === '04' ? this.state.idPresupuestal.abr - parseFloat(Total2).toFixed(2) : this.state.idPresupuestal.abr,
      gasabr: this.state.mes === '04' ? this.state.idPresupuestal.gasabr - parseFloat(Total2).toFixed(2) : this.state.idPresupuestal.gasabr,
      ampabr: this.state.idPresupuestal.ampabr,
      may: this.state.mes === '05' ? this.state.idPresupuestal.may - parseFloat(Total2).toFixed(2) : this.state.idPresupuestal.may,
      gasmay: this.state.mes === '05' ? this.state.idPresupuestal.gasmay - parseFloat(Total2).toFixed(2) : this.state.idPresupuestal.gasmay,
      ampmay: this.state.idPresupuestal.ampmay,
      jun: this.state.mes === '06' ? this.state.idPresupuestal.jun - parseFloat(Total2).toFixed(2) : this.state.idPresupuestal.jun,
      gasjun: this.state.mes === '06' ? this.state.idPresupuestal.gasjun - parseFloat(Total2).toFixed(2) : this.state.idPresupuestal.gasjun,
      ampjun: this.state.idPresupuestal.ampjun,
      jul: this.state.mes === '07' ? this.state.idPresupuestal.jul - parseFloat(Total2).toFixed(2) : this.state.idPresupuestal.jul,
      gasjul: this.state.mes === '07' ? this.state.idPresupuestal.gasjul - parseFloat(Total2).toFixed(2) : this.state.idPresupuestal.gasjul,
      ampjul: this.state.idPresupuestal.ampjul,
      ago: this.state.mes === '08' ? this.state.idPresupuestal.ago - parseFloat(Total2).toFixed(2) : this.state.idPresupuestal.ago,
      gasago: this.state.mes === '08' ? this.state.idPresupuestal.gasago - parseFloat(Total2).toFixed(2) : this.state.idPresupuestal.gasago,
      ampago: this.state.idPresupuestal.ampago,
      sep: this.state.mes === '09' ? this.state.idPresupuestal.sep - parseFloat(Total2).toFixed(2) : this.state.idPresupuestal.sep,
      gassep: this.state.mes === '09' ? this.state.idPresupuestal.gassep - parseFloat(Total2).toFixed(2) : this.state.idPresupuestal.gassep,
      ampsep: this.state.idPresupuestal.ampsep,
      oct: this.state.mes === '10' ? this.state.idPresupuestal.oct - parseFloat(Total2).toFixed(2) : this.state.idPresupuestal.oct,
      gasoct: this.state.mes === '10' ? this.state.idPresupuestal.gasoct - parseFloat(Total2).toFixed(2) : this.state.idPresupuestal.gasoct,
      ampoct: this.state.idPresupuestal.ampago,
      nov: this.state.mes === '11' ? this.state.idPresupuestal.nov - parseFloat(Total2).toFixed(2) : this.state.idPresupuestal.nov,
      gasnov: this.state.mes === '11' ? this.state.idPresupuestal.gasnov - parseFloat(Total2).toFixed(2) : this.state.idPresupuestal.gasnov,
      ampnov: this.state.idPresupuestal.ampnov,
      dic: this.state.mes === '12' ? this.state.idPresupuestal.dic - parseFloat(Total2).toFixed(2) : this.state.idPresupuestal.dic,
      gasdic: this.state.mes === '12' ? this.state.idPresupuestal.gasdic - parseFloat(Total2).toFixed(2) : this.state.idPresupuestal.gasdic,
      ampdic: this.state.idPresupuestal.ampdic,
      total: this.state.idPresupuestal.total,
      ampliacion: this.state.idPresupuestal.ampliacion,
      reduccion: this.state.idPresupuestal.reduccion,
      transferencia: this.state.idPresupuestal.transferencia,
      npro: this.state.idPresupuestal.npro,
      estatus: this.state.idPresupuestal.estatus ? this.state.idPresupuestal.estatus : ' ',
    }
    firebase.database().ref().update(updates)
    const params = {
      Fondo: ' ',
      FechaI: this.state.fechaE,
      Contrarecibo: ' ',
      FechaP: ' ',
      Devolucion: ' ',
      Total: Total2,
      TipoPersona: this.inputTipoPersona.value,
      NumContra: this.state.numContrato,
      Adquisicion: this.state.adqui,
      Xml: this.state.datos,
      xmlC: this.state.xmlC,
      filefactura: this.state.filefactura,
      realizo: this.state.realizo,
      folio: this.state.numFolio
    }
    this.setState({
      xmlC: [{ url: '', nombre: '' }],
      filefactura: [{ url: '', nombre: '' }],
      contador: [],
      total: [0],
      datos: []
    })
    if (params.Fondo && params.FechaI && params.Contrarecibo && params.FechaP
      && params.Devolucion && params.Total && params.TipoPersona && params.NumContra
      && params.Adquisicion && params.Xml && params.xmlC && params.filefactura
      && params.realizo && params.folio) {
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
      return (this.state.partida === item.ogasto && this.state.up === item.up) && item.jul
    })
    let result = presupuesto.filter((item, index) => {
      return presupuesto.indexOf(item) === index
    })
    let dispo = result[1] === false ? result[0] : result[1]

    this.state.presupuesto.map(item => {
      let idPre = (this.state.partida === item.ogasto && this.state.up === item.up) && item
      if (idPre !== false) {
        this.state.idPresupuestal = idPre
      }
    })

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

            <div className='form-val-container'>
              <div className='form-val-content'>
                <div style={{ width: '18%' }}>
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
                <div style={{ width: '18%' }}>
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
                <div style={{ width: '18%' }}>
                  <TextField
                    label='Numero de contrato'
                    id='numContrato'
                    name='numContrato'
                    value={this.state.numContrato}
                    onChange={this.handleInput.bind(this)}
                    ref={numContrato => this.inputNumContrato = numContrato}
                  />
                </div>
                <div style={{ width: '18%' }}>
                  <TextField
                    label='Numero de Folio'
                    id='numFolio'
                    name='numFolio'
                    value={this.state.numFolio}
                    onChange={this.handleInput.bind(this)}
                    ref={numFolio => this.inputNumFolio = numFolio}
                  />
                </div>
                <div style={{ width: '18%' }}>
                  <p style={{ margin: '0px', color: 'grey', fontSize: '12px' }}>Adquisiciones</p>
                  <input
                    type='checkbox'
                    id='adqui'
                    name='adqui'
                    value={this.state.adqui}
                    onChange={this.handleInput}
                  />
                </div>
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
                    <div className='div-content-fab-val'>
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
            <ListComponent
              listaValidacion={this.state.listaValidacion}
              datos={this.state.datos} />
          </div>
        </div>
      </div>
    )
  }
}
