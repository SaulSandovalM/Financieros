import React, { Component } from 'react'
import './Comprometidos.css'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableBody from '@material-ui/core/TableBody'
import TableRow from '@material-ui/core/TableRow'
import IconButton from '@material-ui/core/IconButton'
import CheckIcon from '@material-ui/icons/Check'
import AddIcon from '@material-ui/icons/Add'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import Checkbox from '@material-ui/core/Checkbox'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import CurrencyFormat from 'react-currency-format'
import Fab from '@material-ui/core/Fab'
import firebase from '../../../Firebase'
import { Link } from 'react-router-dom'
import ListComponent from './ListComponent'
import Dropzone from 'react-dropzone'

export default class Comprometidos extends Component {
  constructor (props) {
    super(props)
    var URLactual = window.location
    this.state = {
      open: false,
      checked: [],
      right: [],
      xml: [],
      xml2: [],
      xmlP: [],
      partida: '',
      rubro: '',
      up: '',
      presupuesto: [
        {
          id: 1,
          name: 'prueba',
          done: false
        }
      ],
      comprometidos: [],
      search: '',
      total: '',
      importe: '',
      descuento: '',
      iva: '',
      isr: '',
      contra: [],
      uuid: 'NA',
      nombre: 'NA',
      folio: 'NA',
      subtotal: 'NA',
      // recibo
      urlfire: String(URLactual).substr(-20),
      sup: '',
      spartida: '',
      scantidad: '',
      tipoFondo: {},
      nombreXml: '',
      folioXml: '',
      fechaXml: ''
    }
  }

  listenForItems = (itemsRef) => {
    itemsRef.on('value', (snap) => {
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
          estatus: child.val().estatus,
          id: child.key
        })
      })
      this.setState({
        presupuesto: presupuesto
      })
    })
  }

  listenForXmlR = (itemsRefXml) => {
    itemsRefXml.on('value', (snap) => {
      var xml = []
      snap.forEach((child) => {
        xml.push({
          descuento: child.val().descuento ? child.val().descuento : 0,
          nombre: child.val().nombre,
          nombrer: child.val().nombrer ? child.val().nombrer : ' ',
          rfc: child.val().rfc ? child.val().rfc : ' ',
          total: child.val().total,
          subtotal: child.val().subtotal,
          folio: child.val().folio,
          importe: child.val().importe,
          iva: child.val().iva,
          isr: child.val().isr,
          fecha: child.val().fecha,
          uuid: child.val().uuid,
          estatus: child.val().estatus,
          tipo: child.val().tipo,
          id: child.key
        })
      })
      this.setState({
        xml: xml
      })
    })
  }

  listenForXmlR2 = (itemsRefXml2) => {
    itemsRefXml2.on('value', (snap) => {
      var xml = []
      snap.forEach((child) => {
        xml.push({
          descuento: child.val().descuento ? child.val().descuento : 0,
          nombre: child.val().nombre,
          nombrer: child.val().nombrer ? child.val().nombrer : ' ',
          rfc: child.val().rfc ? child.val().rfc : ' ',
          total: child.val().total,
          subtotal: child.val().subtotal,
          folio: child.val().folio,
          importe: child.val().importe,
          iva: child.val().iva,
          isr: child.val().isr,
          fecha: child.val().fecha,
          uuid: child.val().uuid,
          descripcion: child.val().descripcion,
          estatus: child.val().estatus,
          tipo: child.val().tipo,
          partida: child.val().partida,
          numfolio: child.val().numfolio,
          up: child.val().up,
          id: child.key
        })
      })
      this.setState({
        xml2: xml
      })
    })
  }

  listenFondos = (itemsRefFondos) => {
    itemsRefFondos.on('value', (snap) => {
      var comprometidosAgregados = []
      snap.forEach((child) => {
        comprometidosAgregados.push({
          partida: child.val().partida,
          presupuestal: child.val().presupuestal,
          area: child.val().area,
          fecha: child.val().fecha,
          importe_comp: child.val().importe_comp,
          iva: child.val().iva,
          isr: child.val().isr,
          total: child.val().total,
          up: child.val().up,
          rubro: child.val().rubro,
          npro: child.val().npro,
          np: child.val().np,
          proy: child.val().proy,
          comprobantes: child.val().comprobantes,
          presupuestoid: child.val().presupuestoid,
          id: child.key
        })
      })
      this.setState({
        comprometidosDos: comprometidosAgregados
      })
    })
  }

  listenFondo = (itemsRefFondo) => {
    itemsRefFondo.on('value', (snap) => {
      const firebasedata = snap.val()
      this.setState({
        tipoFondo: firebasedata
      })
    })
  }

  componentDidMount () {
    const itemsRefXml = firebase.database().ref('xml/')
    this.listenForXmlR(itemsRefXml)
    const itemsRefXml2 = firebase.database().ref('xml/')
    this.listenForXmlR2(itemsRefXml2)
    const itemsRef = firebase.database().ref('presupuesto/')
    this.listenForItems(itemsRef)
    const itemsRefFondos = firebase.database().ref(`fondos/${this.state.urlfire}/comprometido`)
    this.listenFondos(itemsRefFondos)
    const itemsRefFondo = firebase.database().ref(`fondos/${this.state.urlfire}`)
    this.listenFondo(itemsRefFondo)
  }

  handleInput (event) {
    const state = this.state
    state[event.target.name] = event.target.value.toUpperCase()
    this.setState(state)
  }

  update = (item) => {
    let updates = {}
    updates['presupuesto/' + item.id] = {
      año: item.año,
      rm: item.rm,
      ur: item.ur,
      up: item.up,
      rubro: item.rubro,
      tg: item.tg,
      ogasto: item.ogasto,
      npro: item.npro,
      f: item.f,
      fu: item.fu,
      sf: item.sf,
      eje: item.eje,
      s: item.s,
      prog: item.prog,
      sp: item.sp,
      min: item.min,
      obj: item.obj,
      proy: item.proy,
      est: item.est,
      obra: item.obra,
      ben: item.ben,
      eg: item.eg,
      mi: item.mi,
      pr: item.pr,
      pd: item.pd,
      itrans: item.itrans,
      igest: item.igest,
      la: item.la,
      ods: item.ods,
      et: item.et,
      ff: item.ff,
      of: item.of,
      np: item.np,
      cpa: item.cpa,
      ene: item.ene - parseFloat(this.state.total),
      gasene: item.gasene + parseFloat(this.state.total),
      ampene: item.ampene,
      feb: item.feb,
      gasfeb: item.gasfeb,
      ampfeb: item.ampfeb,
      mar: item.mar,
      gasmar: item.gasmar,
      ampmar: item.ampmar,
      abr: item.abr,
      gasabr: item.gasabr,
      ampabr: item.ampabr,
      may: item.may,
      gasmay: item.gasmay,
      ampmay: item.ampmay,
      jun: item.jun,
      gasjun: item.gasjun,
      ampjun: item.ampjun,
      jul: item.jul,
      gasjul: item.gasjul,
      ampjul: item.ampjul,
      ago: item.ago,
      gasago: item.gasago,
      ampago: item.ampago,
      sep: item.sep,
      gassep: item.gassep,
      ampsep: item.ampsep,
      oct: item.oct ,
      gasoct: item.gasoct,
      ampoct: item.ampago,
      nov: item.nov,
      gasnov: item.gasnov,
      ampnov: item.ampnov,
      dic: item.dic,
      gasdic: item.gasdic,
      ampdic: item.ampdic,
      total: item.total,
      ampliacion: item.ampliacion,
      reduccion: item.reduccion,
      transferencia: item.transferencia
    }
    firebase.database().ref().update(updates)
    const { area, total, iva, isr, importe } = this.state
    const wishRef = firebase.database().ref(`fondos/${this.state.urlfire}`)
    wishRef.once('value').then(snapshot => {
      var updatedWish = snapshot.val()
      updatedWish.beneficiario = this.state.contra[0].nombre
      updatedWish.comprometido.push(
        {
          partida: item.ogasto,
          presupuestal: item.up,
          area: area,
          fecha: updatedWish.fecha,
          importe_comp: importe,
          iva: iva,
          isr: isr,
          total: total,
          año: item.año,
          ramo: item.rm,
          ur: item.ur,
          up: item.up,
          rubro: item.rubro,
          tg: item.tg,
          npro: item.npro,
          np: item.np,
          f: item.f,
          fu: item.fu,
          sf: item.sf,
          eje: item.eje,
          s: item.s,
          prog: item.prog,
          sp: item.sp,
          obj: item.obj,
          proy: item.proy,
          est: item.est,
          ben: item.ben,
          eg: item.eg,
          comprobantes: this.state.contra,
          presupuestoid: item.id,
          obra: item.obra
        }
      )
      wishRef.update(updatedWish)
      updatedWish.cpa.push(
        {
          cantidad: total,
          presupuestal: item.cpa,
        }
      )
      wishRef.update(updatedWish)
    })
    // cambiar el estatus del xml/recibo
    var changes = this.state.contra
    var prueba = {}
    changes.forEach((change) => {
      prueba[change.id] =
        {
          nombre: change.nombre,
          nombrer: change.nombrer ? change.nombrer : ' ',
          rfc: change.rfc ? change.rfc : ' ',
          fecha: change.fecha,
          folio: change.folio,
          importe: change.importe,
          descuento: change.descuento,
          isr: change.isr,
          iva: change.iva,
          subtotal: change.subtotal,
          total: change.total,
          uuid: change.uuid,
          estatus: 'asignado',
          tipo: change.tipo ? change.tipo : ' ',
          serie: change.serie ? change.serie : ' ',
          descripcion: change.descripcion ? change.descripcion : ' ',
          partida: change.partida ? change.partida : ' ',
          up: change.up ? change.up : ' ',
          numfolio: change.numfolio ? change.numfolio : ' '
        }
    })
    firebase.database().ref('xml').update(prueba).catch((error) => {
      console.error('Error: ', error)
    })
    this.setState({
      right: []
    })
    alert('Tu solicitud fue enviada.')
  }

  area = [
    '',
    'Procuraduría General de Justicia',
    'Subprocuraduría de Procedimientos Penales Región Oriente',
    'Fiscalía Especializada para la atención de Delitos cometidos contra la Libertad de Expresión',
    'Periodistas y Personas defensoras de los Derechos Humanos',
    'Dirección General para la Atención de los Asuntos del Sistema Tradicional',
    'Fiscalia de Delitos Electorales',
    'Subprocuraduría de Derechos Humanos y Servicios a la Comunidad',
    'Centro de Justicia Restaurativa Penal Poniente',
    'Fiscalía para la Atención de Delitos de Género',
    'Visitaduría General',
    'Dirección General de Servicios Periciales',
    'Centro de Operación Estratégica',
    'Unidad Especializada en el Combate al Secuestro',
    'Dirección General de Administración y Finanzas',
    'Fiscalía Especializada para la atención de los Delitos de Trata de Personas',
    'Subprocuraduría de Procedimientos Penales Región Poniente',
    'Centro de Atención Temprana Poniente',
    'Dirección General de Investigación y Litigación Poniente',
    'Dirección General de la Policía Investigadora',
    'Centro de Atención Temprana Oriente',
    'Centro de Justicia Restaurativa Penal Oriente',
    'Dirección General de Investigación y Litigación Oriente',
    'Dirección General de Recursos Materiales y Servicios',
    'Fiscalía Especializada en Delitos de Corrupción',
    'Fiscalía Especializada en Materia de Desaparición Forzada de Personas'
  ]

  handleOnChange1 (event) {
    for (var i = 0; i < event.target.files.length; i++) {
      const file = event.target.files[i]
      const xmlp = file
      var reader = new FileReader()
      reader.onload = function (event) {
        var XMLParser = require('react-xml-parser')
        var xml = new XMLParser().parseFromString(event.target.result)
        let data = {
          'descuento': xml.attributes['Descuento'] ? xml.attributes['Descuento'] : 0,
          'total': xml.attributes['Total'] ? xml.attributes['Total'] : 'No encuentra total',
          'subtotal': xml.attributes['SubTotal'] ? xml.attributes['SubTotal'] : (parseFloat(xml.attributes['Total']) + parseFloat(xml.children['3'].attributes['TotalImpuestosRetenidos'] ? xml.children['3'].attributes['TotalImpuestosRetenidos'] : 0)) - parseFloat(xml.children['3'].attributes['TotalImpuestosTrasladados']),
          'folio': xml.attributes['Folio'] ? xml.attributes['Folio'] : '0',
          'nombre': xml.children['0'].attributes['Nombre'] ? xml.children['0'].attributes['Nombre'] : 'No encuentra Nombre',
          'importe': xml.attributes['SubTotal'] ? xml.attributes['SubTotal'] : (parseFloat(xml.attributes['Total']) + (xml.children['3'].attributes['TotalImpuestosRetenidos'] ? xml.children['3'].attributes['TotalImpuestosRetenidos'] : 0)) - parseFloat(xml.children['3'].attributes['TotalImpuestosTrasladados']),
          'iva': xml.children['3'].attributes['TotalImpuestosTrasladados'] ? xml.children['3'].attributes['TotalImpuestosTrasladados'] : 0,
          'isr': xml.children['3'].attributes['TotalImpuestosRetenidos'] ? xml.children['3'].attributes['TotalImpuestosRetenidos'] : 0,
          'fecha': xml.getElementsByTagName('tfd:TimbreFiscalDigital')[0].attributes['FechaTimbrado'],
          'uuid': xml.getElementsByTagName('tfd:TimbreFiscalDigital')[0].attributes['UUID'] ? xml.getElementsByTagName('tfd:TimbreFiscalDigital')[0].attributes['UUID'] : xmlp.name.slice(0, -4),
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
    }
  }

  render () {
    function not (a, b) {
      return a.filter((value) => b.indexOf(value) === -1)
    }

    function intersection (a, b) {
      return a.filter((value) => b.indexOf(value) !== -1)
    }

    const { checked, right } = this.state
    let left
    if (this.state.tipoFondo.tipo_doc === 'Fondo Revolvente') {
      left = this.state.xml
    } else {
      left = this.state.xml2
    }

    const leftChecked = intersection(checked, left)
    const rightChecked = intersection(checked, right)

    const handleToggle = (value) => () => {
      const currentIndex = checked.indexOf(value)
      const newChecked = [...checked]
      if (currentIndex === -1) {
        newChecked.push(value)
      } else {
        newChecked.splice(currentIndex, 1)
      }
      this.setState({ checked: newChecked })
    }

    const handleCheckedRight = () => {
      this.setState({ right: right.concat(leftChecked) })
      this.setState({ left: not(left, leftChecked) })
      this.setState({ checked: not(checked, leftChecked) })
    }

    const handleCheckedLeft = () => {
      this.setState({ left: left.concat(rightChecked) })
      this.setState({ right: not(right, rightChecked) })
      this.setState({ checked: not(checked, rightChecked) })
    }

    const filterData = this.state.xml.filter(
      (xml) => {
        return (
          xml.nombre !== undefined ?
          ((xml.uuid.indexOf(this.state.folioXml) !== -1) || (xml.nombre.indexOf(this.state.folioXml) !== -1)) && xml.estatus !== 'asignado' && xml.tipo === 'revolvente'
        : '')
      }
    )

    console.log(this.state.xml2.filter(
      (xml) => {
        return (
          xml.numfolio !== undefined ?
          ((xml.numfolio.indexOf('2010') !== -1))
          : null
        )
      }
    ))

    const xmlvali = []
    this.state.xml2.map(item =>
      item.numfolio ?
        item !== null ?
          xmlvali.push(item)
        : null
      : null
    )

    const filterData2 = xmlvali.filter(
      (xml) => {
        return (
          ((xml.numfolio.indexOf(this.state.search) !== -1)) && xml.estatus !== 'asignado' && xml.tipo === 'directo'
        )
      }
    )

    const array1 = this.state.right

    if (Object.keys(array1).length !== 0) {
      const partida = []
      right.map(items => (
        partida.push(items.partida)
      ))
      if (this.state.tipoFondo.tipo_doc === 'Pago Directo') {
        let resPartida = partida.filter((item, index) => {
          return partida.indexOf(item) === index
        })
        this.state.partida = resPartida.toString()
      }

      const up = []
      right.map(items => (
        up.push(items.up)
      ))
      if (this.state.tipoFondo.tipo_doc === 'Pago Directo') {
        let resUp = up.filter((item, index) => {
          return up.indexOf(item) === index
        })
        this.state.up = resUp.toString()
      }

      const totalImporteImporte = []
      right.map(items => (
        totalImporteImporte.push(parseFloat(items.subtotal) - parseFloat(items.descuento))
      ))
      const reducerImporte = (a, b) => a + b
      this.state.importe = totalImporteImporte.reduce(reducerImporte).toFixed(2)

      const totalImporteIva = []
      right.map(items => (
        totalImporteIva.push(parseFloat(items.iva))
      ))
      const reducerIva = (a, b) => a + b
      this.state.iva = totalImporteIva.reduce(reducerIva).toFixed(2)

      const totalImporteIsr = []
      right.map(items => (
        totalImporteIsr.push(parseFloat(items.isr))
      ))
      const reducerIsr = (a, b) => a + b
      this.state.isr = totalImporteIsr.reduce(reducerIsr).toFixed(2)

      const importe = parseFloat(this.state.importe)
      const iva = parseFloat(this.state.iva)
      const isr = parseFloat(this.state.isr)
      const total = importe + iva - isr
      this.state.total = parseFloat(total).toFixed(2)
      this.state.contra = right
    }

    const customListLeft = (title, items) => (
      <div>
        <Card className='card-compro'>
          <List dense component='div' role='list'
            style={{ display: 'flex', flexDirection: 'column', position: 'relative', top: '0', background: 'white' }}
          >
            <ListItem style={{ position: 'sticky', top: '0px', background: 'white', zIndex: '3' }}>
              <ListItemIcon />
              <ListItemText className='list-align-i'><b>Folio</b></ListItemText>
              <ListItemText className='list-align-i'><b>Total</b></ListItemText>
              <ListItemText className='list-align'><b>Fecha</b></ListItemText>
              <ListItemText className='list-align2'><b>Nombre</b></ListItemText>
            </ListItem>
            {this.state.tipoFondo.tipo_doc === 'Fondo Revolvente' && this.state.folioXml ?
            filterData.map((value) => {
              return (
                <ListItem key={value} button onClick={handleToggle(value)}>
                  <ListItemIcon>
                    <Checkbox
                      checked={checked.indexOf(value) !== -1}
                      tabIndex={-1}
                      disableRipple
                    />
                  </ListItemIcon>
                  <ListItemText className='list-align-i' primary={String(value.uuid).substr(0, 10)} />
                  {value.folio === 'Recibo simple' || value.uuid === 'Recibo simple' ?
                    <ListItemText className='list-align-i' primary={'$ ' + value.subtotal} />
                    :
                    <ListItemText className='list-align-i' primary={'$ ' + value.total} />
                  }
                  <ListItemText className='list-align' primary={String(value.fecha).substr(0, 10)} />
                  <ListItemText className='list-align2' primary={value.nombre} />
                </ListItem>
              )
            }) : null}
            {this.state.tipoFondo.tipo_doc === 'Pago Directo' ?
            filterData2.map((value) => {
              return (
                <ListItem key={value} button onClick={handleToggle(value)}>
                  <ListItemIcon>
                    <Checkbox
                      checked={checked.indexOf(value) !== -1}
                      tabIndex={-1}
                      disableRipple
                    />
                  </ListItemIcon>
                  <ListItemText className='list-align-i' primary={String(value.uuid).substr(-12)} />
                  {value.folio === 'Recibo simple' || value.uuid === 'Recibo simple' ?
                    <ListItemText className='list-align-i' primary={'$ ' + value.subtotal} />
                    :
                    <ListItemText className='list-align-i' primary={'$ ' + value.total} />
                  }
                  <ListItemText className='list-align' primary={value.fecha.substr(0, 10)} />
                  <ListItemText className='list-align2' primary={value.nombre} />
                </ListItem>
              )
            }) : null}
          </List>
        </Card>
      </div>
    )

    const customListRight = (title, items) => (
      <div>
        <Card className='card-compro'>
          <List dense component='div' role='list' style={{ display: 'flex', flexDirection: 'column', position: 'relative', top: '0', background: 'white' }}>
            <ListItem style={{ position: 'sticky', top: '0px', background: 'white', zIndex: '3' }}>
              <ListItemIcon />
              <ListItemText className='list-align-i'><b>Folio</b></ListItemText>
              <ListItemText className='list-align-i'><b>Total</b></ListItemText>
              <ListItemText className='list-align'><b>Fecha</b></ListItemText>
              <ListItemText className='list-align2'><b>Nombre</b></ListItemText>
            </ListItem>
            {items.map((value) => {
              return (
                <ListItem key={value} role='listitem' button onClick={handleToggle(value)}>
                  <ListItemIcon>
                    <Checkbox
                      checked={checked.indexOf(value) !== -1}
                      tabIndex={-1}
                      disableRipple
                    />
                  </ListItemIcon>
                  <ListItemText className='list-align-i' primary={String(value.folio).substr(0, 10)} />
                  {value.folio === 'Recibo' || value.uuid === 'Recibo simple' ?
                    <ListItemText className='list-align-i' primary={'$ ' + value.subtotal} />
                    :
                    <ListItemText className='list-align-i' primary={'$ ' + value.total} />
                  }
                  <ListItemText className='list-align' primary={value.fecha.substr(0, 10)} />
                  <ListItemText className='list-align2' primary={value.nombre} />
                </ListItem>
              )
            })}
          </List>
        </Card>
      </div>
    )

    let presupuestop = this.state.presupuesto.map(item => {
      return item.ogasto
    })
    let resultp = presupuestop.sort((a, b) => a.ogasto - b.ogasto).filter((item, index) => {
      return presupuestop.indexOf(item) === index
    })
    let presupuestou = this.state.presupuesto.map(item => {
      return (this.state.partida === item.ogasto) && item.up
    })
    let resultu = presupuestou.filter((item, index) => {
      return presupuestou.indexOf(item) === index
    })
    let presupuestor = this.state.presupuesto.map(item => {
      return (this.state.partida === item.ogasto && this.state.up === item.up) && item.rubro
    })
    let resultr = presupuestor.filter((item, index) => {
      return presupuestor.indexOf(item) === index
    })

    const sumatoria = [0]
    this.state.comprometidosDos !== undefined && this.state.comprometidosDos.map(comprometido => comprometido.partida &&
      comprometido.total > 0 ? sumatoria.push(parseFloat(comprometido.total)) : null
    )
    const tt4 = (a, b) => a + b
    var tcantidad4 = sumatoria.reduce(tt4).toFixed(2)

    return (
      <div className='div-compro-container'>
        <div>
          <Grid
            container
            spacing={1}
            justify='center'
            alignItems='center'
            style={{ display: 'flex', flexDirection: 'row', width: '100%' }}
          >
            <Grid item xs style={{ width: '50%' }}>
              <div className='div-into-data'>
                {this.state.tipoFondo.tipo_doc === 'Fondo Revolvente' &&
                  <div className='recibo-container'>
                    Buscador
                    <div className='search-div'>
                      <input
                        className='input-compro'
                        name='folioXml'
                        id='folioXml'
                        value={this.state.folioXml}
                        onChange={this.handleInput.bind(this)}
                        placeholder='Ingresa el Folio'
                      />
                    </div>
                  </div>
                }
                {this.state.tipoFondo.tipo_doc === 'Pago Directo' &&
                  <div className='recibo-container'>
                    Buscador
                    <div className='search-div'>
                      <input
                        className='input-compro'
                        name='search'
                        id='search'
                        value={this.state.search}
                        onChange={this.handleInput.bind(this)}
                        placeholder='Ingrese el numero de folio'
                      />
                    </div>
                  </div>
                }
              </div>
                {customListLeft('Choices', left)}
            </Grid>
            <Grid item>
              <Grid container direction='column' alignItems='center'>
                <Button
                  variant='outlined'
                  size='small'
                  onClick={handleCheckedRight}
                  disabled={leftChecked.length === 0}
                >
                  &gt;
                </Button>
                <Button
                  variant='outlined'
                  size='small'
                  onClick={handleCheckedLeft}
                  disabled={rightChecked.length === 0}
                >
                  &lt;
                </Button>
              </Grid>
            </Grid>
            <Grid item xs style={{ width: '50%' }}>
              <div style={{ height: '58px' }} />
              {customListRight('Choices', right)}
            </Grid>
          </Grid>
        </div>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper className='paper-content'>
              <TableHead>
                <TableRow>
                  <TableCell className='border-icon' />
                  <TableCell className='border-table2'>
                    <b className='font-tb'>Partida</b>
                  </TableCell>
                  <TableCell className='border-table2'>
                    <b className='font-tb'>Up</b>
                  </TableCell>
                  <TableCell className='border-table2'>
                    <b className='font-tb'>Rubro</b>
                  </TableCell>
                  <TableCell className='border-table-area'>
                    <b className='font-tb'>Area</b>
                  </TableCell>
                  <TableCell className='border-table2'>
                    <b className='font-tb'>Importe</b>
                  </TableCell>
                  <TableCell className='border-table2'>
                    <b className='font-tb'>Iva</b>
                  </TableCell>
                  <TableCell className='border-table2'>
                    <b className='font-tb'>Isr</b>
                  </TableCell>
                  <TableCell className='border-table2'>
                    <b className='font-tb'>Total</b>
                  </TableCell>
                  <TableCell className='border-icon' />
                </TableRow>
              </TableHead>
              {this.state.tipoFondo.tipo_doc === 'Fondo Revolvente' ?
                <TableBody className='table-row-c'>
                  <TableCell className='border-icon' />
                  <TableCell className='border-table2'>
                    <select
                      className='select-compro'
                      id='partida'
                      name='partida'
                      ref='partida'
                      onChange={this.handleInput.bind(this)}
                      required
                      value={this.state.partida}
                    >
                      {resultp.map((x,y) =>
                        <option name={y}>{x}</option>
                      )}
                  </select>
                  </TableCell>
                  <TableCell className='border-table2'>
                    <select
                      className='select-compro'
                      id='up'
                      name='up'
                      ref='up'
                      onChange={this.handleInput.bind(this)}
                      required
                      value={this.state.up}
                    >
                      {resultu.map((x,y) =>
                        <option name={y}>{x}</option>
                      )}
                  </select>
                  </TableCell>
                  <TableCell className='border-table2'>
                    <select
                      className='select-compro'
                      id='rubro'
                      name='rubro'
                      ref='rubro'
                      onChange={this.handleInput.bind(this)}
                      required
                      value={this.state.rubro}
                    >
                      {resultr.map((x,y) =>
                        <option name={y}>{x}</option>
                      )}
                    </select>
                  </TableCell>
                  <TableCell className='border-table-area'>
                    <select
                      className='select-compro'
                      id='area'
                      name='area'
                      ref='area'
                      onChange={this.handleInput.bind(this)}
                      required
                    >
                      {this.area.map((x,y) =>
                        <option name={y}>{x}</option>
                      )}
                    </select>
                  </TableCell>
                  <TableCell className='border-table2'>
                    {this.state.right.length > 0 ?
                      <CurrencyFormat
                        className='font-tb'
                        displayType='text'
                        prefix=' $ '
                        thousandSeparator
                        decimalSeparator='.'
                        value={this.state.importe}
                      /> :
                      <CurrencyFormat
                        className='font-tb'
                        displayType='text'
                        prefix=' $ '
                        thousandSeparator
                        decimalSeparator='.'
                        value={0}
                      />
                    }
                  </TableCell>
                  <TableCell className='border-table2'>
                    {this.state.right.length > 0 ?
                      <CurrencyFormat
                        className='font-tb'
                        displayType='text'
                        prefix=' $ '
                        thousandSeparator
                        decimalSeparator='.'
                        value={this.state.iva}
                      /> :
                      <CurrencyFormat
                        displayType='text'
                        prefix=' $ '
                        thousandSeparator
                        decimalSeparator='.'
                        value={0}
                      />
                    }
                  </TableCell>
                  <TableCell className='border-table2'>
                    {this.state.right.length > 0 ?
                      <CurrencyFormat
                        className='font-tb'
                        displayType='text'
                        prefix=' $ '
                        thousandSeparator
                        decimalSeparator='.'
                        value={this.state.isr}
                      /> :
                      <CurrencyFormat
                        className='font-tb'
                        displayType='text'
                        prefix=' $ '
                        thousandSeparator
                        decimalSeparator='.'
                        value={0}
                      />
                    }
                  </TableCell>
                  <TableCell className='border-table2'>
                    {this.state.right.length > 0 ?
                      <CurrencyFormat
                        className='font-tb'
                        displayType='text'
                        prefix=' $ '
                        thousandSeparator
                        decimalSeparator='.'
                        value={this.state.total}
                      /> :
                      <CurrencyFormat
                        className='font-tb'
                        displayType='text'
                        prefix=' $ '
                        thousandSeparator
                        decimalSeparator='.'
                        value={0}
                      />
                    }
                  </TableCell>
                  {this.state.presupuesto.map(item =>
                    <div>
                      {this.state.partida === item.ogasto && this.state.up === item.up && this.state.rubro === item.rubro ?
                        <TableCell className='border-icon' key={item.id} item={item}>
                          <IconButton size='small' className='border-des' onClick={() => this.update(item)}>
                            <AddIcon />
                          </IconButton>
                        </TableCell> : null
                      }
                    </div>
                  )}
                </TableBody>
                :
                <TableBody className='table-row-c'>
                  <TableCell className='border-icon' />
                  <TableCell className='border-table2'>
                    <input
                      className='select-compro'
                      id='partida'
                      name='partida'
                      ref='partida'
                      required
                      disabled
                      value={this.state.partida}
                    />
                  </TableCell>
                  <TableCell className='border-table2'>
                    <input
                      className='select-compro'
                      id='up'
                      name='up'
                      ref='up'
                      required
                      disabled
                      value={this.state.up}
                    />
                  </TableCell>
                  <TableCell className='border-table2'>
                    <select
                      className='select-compro'
                      id='rubro'
                      name='rubro'
                      ref='rubro'
                      onChange={this.handleInput.bind(this)}
                      required
                      value={this.state.rubro}
                    >
                      {resultr.map((x,y) =>
                        <option name={y}>{x}</option>
                      )}
                    </select>
                  </TableCell>
                  <TableCell className='border-table-area'>
                    <select
                      className='select-compro'
                      id='area'
                      name='area'
                      ref='area'
                      onChange={this.handleInput.bind(this)}
                      required
                    >
                      {this.area.map((x,y) =>
                        <option name={y}>{x}</option>
                      )}
                    </select>
                  </TableCell>
                  <TableCell className='border-table2'>
                    {this.state.right.length > 0 ?
                      <CurrencyFormat
                        className='font-tb'
                        displayType='text'
                        prefix=' $ '
                        thousandSeparator
                        decimalSeparator='.'
                        value={this.state.importe}
                      /> :
                      <CurrencyFormat
                        className='font-tb'
                        displayType='text'
                        prefix=' $ '
                        thousandSeparator
                        decimalSeparator='.'
                        value={0}
                      />
                    }
                  </TableCell>
                  <TableCell className='border-table2'>
                    {this.state.right.length > 0 ?
                      <CurrencyFormat
                        className='font-tb'
                        displayType='text'
                        prefix=' $ '
                        thousandSeparator
                        decimalSeparator='.'
                        value={this.state.iva}
                      /> :
                      <CurrencyFormat
                        displayType='text'
                        prefix=' $ '
                        thousandSeparator
                        decimalSeparator='.'
                        value={0}
                      />
                    }
                  </TableCell>
                  <TableCell className='border-table2'>
                    {this.state.right.length > 0 ?
                      <CurrencyFormat
                        className='font-tb'
                        displayType='text'
                        prefix=' $ '
                        thousandSeparator
                        decimalSeparator='.'
                        value={this.state.isr}
                      /> :
                      <CurrencyFormat
                        className='font-tb'
                        displayType='text'
                        prefix=' $ '
                        thousandSeparator
                        decimalSeparator='.'
                        value={0}
                      />
                    }
                  </TableCell>
                  <TableCell className='border-table2'>
                    {this.state.right.length > 0 ?
                      <CurrencyFormat
                        className='font-tb'
                        displayType='text'
                        prefix=' $ '
                        thousandSeparator
                        decimalSeparator='.'
                        value={this.state.total}
                      /> :
                      <CurrencyFormat
                        className='font-tb'
                        displayType='text'
                        prefix=' $ '
                        thousandSeparator
                        decimalSeparator='.'
                        value={0}
                      />
                    }
                  </TableCell>
                  {this.state.presupuesto.map(item =>
                    <div>
                      {this.state.partida === item.ogasto && this.state.up === item.up && this.state.rubro === item.rubro ?
                        <TableCell className='border-icon' key={item.id} item={item}>
                          <IconButton size='small' className='border-des' onClick={() => this.update(item)}>
                            <AddIcon />
                          </IconButton>
                        </TableCell> : null
                      }
                    </div>
                  )}
                </TableBody>
              }
              {this.state.comprometidosDos !== undefined ? this.state.comprometidosDos.map(comprometido =>
                comprometido.partida ?
                  <ListComponent
                    key={comprometido.id}
                    comprometido={comprometido}
                    newArray={right}
                    tipo={this.state.tipoFondo.tipo_doc}
                  />
                : null
              ): null }
              <TableBody>
                <TableRow>
                  <TableCell className='border-icon'>
                    <IconButton aria-label='expand row' size='small' className='border-des' />
                  </TableCell>
                  <TableCell className='border-table2'>
                    <div className='font-tb' />
                  </TableCell>
                  <TableCell className='border-table2'>
                    <div className='font-tb' />
                  </TableCell>
                  <TableCell className='border-table2'>
                    <div className='font-tb' />
                  </TableCell>
                  <TableCell className='border-table-area'>
                    <div className='font-tb' />
                  </TableCell>
                  <TableCell className='border-table2'>
                  </TableCell>
                  <TableCell className='border-table2'>
                  </TableCell>
                  <TableCell className='border-table2'>
                  </TableCell>
                  <TableCell className='border-table2'>
                    <CurrencyFormat
                      className='font-tb'
                      style={{ textAlign: 'center' }}
                      displayType='text'
                      prefix=' $ '
                      thousandSeparator
                      value={tcantidad4}
                    />
                  </TableCell>
                  <TableCell className='border-icon'>
                    <IconButton size='small' className='border-des' />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Paper>
          </Grid>
        </Grid>
        <div style={{ height: '80px' }} />
        <div className='div-content-fab-com'>
          {this.state.tipoFondo.tipo_doc === 'Fondo Revolvente' &&
            <Fab color='primary' style={{ background: '#3f51b5' }} variant='extended'>
              <AddIcon style={{ marginRight: '6px' }} />
                <Dropzone
                  style={{
                    width: '100%',
                    height: '100%',
                  }}
                  accept='.xml' onChange={this.handleOnChange1.bind(this)}
                >
                  Agregar XML
                </Dropzone>
            </Fab>
          }
          {this.state.comprometidosDos !== undefined && this.state.comprometidosDos.length >= 2 ?
            <Link to={`/Oficios/${this.state.urlfire}`} style={{ textDecoration: 'none' }}>
              <Fab color='primary' style={{ background: 'green' }} variant='extended'>
                <CheckIcon style={{ marginRight: '6px' }} />
                Finalizar
              </Fab>
            </Link> : ''
          }
        </div>
      </div>
    )
  }
}
