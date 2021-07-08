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
import Dropzone from 'react-dropzone'
import { Link } from 'react-router-dom'
import ListComponentE from './ListComponentE'

export default class ComprometidoE extends Component {
  constructor (props) {
    super(props)
    var user = firebase.auth().currentUser
    var email
    if (user != null) {
      email = user.email
    }
    let admin
    if (email === 'nayra@procuraduria.com') {
      admin = 'NAYRA'
    } else if (email === 'laura@procuraduria.com') {
      admin = 'LAURA'
    } else if (email === 'miguel@procuraduria.com') {
      admin = 'MIGUEL'
    } else if (email === 'teresa@procuraduria.com') {
      admin = 'TERESA'
    } else if (email === 'marcos@procuraduria.com') {
      admin = 'MARCOS'
    } else if (email === 'eloy@procuraduria.com') {
      admin = 'ELOY'
    } else if (email === 'karina@procuraduria.com') {
      admin = 'KARINA'
    } else if (email === 'martha@procuraduria.com') {
      admin = 'MARTHA'
    } else if (email === 'lilia@procuraduria.com') {
      admin = 'LILIA'
    } else if (email === 'cenely@procuraduria.com') {
      admin = 'CENELY'
    } else if (email === 'hector@procuraduria.com') {
      admin = 'HECTOR'
    } else if (email === 'omar@procuraduria.com') {
      admin = 'OMAR'
    } else if (email === 'lizbeth@procuraduria.com') {
      admin = 'LIZBETH'
    }
    var URLactual = window.location
    this.unsubscribe = null
    this.state = {
      open: false,
      checked: [],
      right: [],
      empty: [0],
      xml: [],
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
      iva: '',
      realizo: admin,
      isr: '',
      contra: [],
      uuid: 'NA',
      nombre: 'NA',
      folio: 'NA',
      subtotal: 'NA',
      // recibo
      importer: 0,
      ivar: 0,
      isrr: 0,
      idP: '',
      ids: '',
      urlfire: String(URLactual).substr(-20),
      fondos: [],
      searchF: '',
      actualizarComprometidos: [],
      presupuestoConsumo: [],
      menu: false,
      mes: '',
      guardar: false
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

  listenForXmlR = (itemsRefXml) => {
    itemsRefXml.on('value', (snap) => {
      var xml = []
      snap.forEach((child) => {
        xml.push({
          nombre: child.val().nombre,
          fecha: child.val().fecha,
          folio: child.val().folio,
          importe: child.val().importe,
          isr: child.val().isr,
          iva: child.val().iva,
          subtotal: child.val().subtotal,
          total: child.val().total,
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
          año: child.val().año,
          ramo: child.val().rm,
          ur: child.val().ur,
          up: child.val().up,
          rubro: child.val().rubro,
          tg: child.val().tg,
          npro: child.val().npro,
          np: child.val().np,
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
          ben: child.val().ben,
          eg: child.val().eg,
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

  componentDidMount () {
    const itemsRefXml = firebase.database().ref('xml/')
    this.listenForXmlR(itemsRefXml)
    const itemsRef = firebase.database().ref('presupuesto/')
    this.listenForItems(itemsRef)
    const itemsRefFondos = firebase.database().ref(`fondos/${this.state.urlfire}/comprometido`)
    this.listenFondos(itemsRefFondos)
    const itemsRefFondo = firebase.database().ref('fondos/')
    this.listenForItemFondo(itemsRefFondo)
  }

  listenForItemFondo = (itemsRefFondo) => {
    itemsRefFondo.on('value', (snap) => {
      var fondos = []
      snap.forEach((child) => {
        fondos.push({
          fondo: child.val().fondo,
          tipo_doc: child.val().tipo_doc,
          importe: child.val().importe,
          realizo: child.val().realizo,
          id: child.key
        })
      })
      this.setState({
        fondos: fondos
      })
    })
  }

  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value
    this.setState(state)
  }

  upsearch (event) {
    this.setState({ search: event.target.value })
  }

  updateSearch (event) {
    this.setState({ partida: event.target.value })
  }

  updateSearch2 (event) {
    this.setState({ up: event.target.value })
  }

  updateSearch3 (event) {
    this.setState({ rubro: event.target.value })
  }

  updateSearch5 (event) {
    this.setState({ area: event.target.value })
  }

  updateSearch6 (event) {
    this.setState({ mes: event.target.value })
  }

  handleOnChange1 (event) {
    for (var i = 0; i < event.target.files.length; i++) {
      const file = event.target.files[i]
      const xmlp = file
      var reader = new FileReader()
      reader.onload = function (event) {
        var XMLParser = require('react-xml-parser')
        var xml = new XMLParser().parseFromString(event.target.result)
        let data = {
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

  handleOnChange2 (event) {
    for (var i = 0; i < event.target.files.length; i++) {
      const file = event.target.files[i]
      const xmlp = file
      var reader = new FileReader()
      reader.onload = function (event) {
        var XMLParser = require('react-xml-parser')
        var xml = new XMLParser().parseFromString(event.target.result)
        let data = {
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
          'tipo': 'directo'
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
      ene: item.ene,
      gasene: item.gasene,
      feb: item.feb,
      gasfeb: item.gasfeb,
      mar: item.mar,
      gasmar: item.gasmar,
      abr: item.abr,
      gasabr: item.gasabr,
      may: item.may,
      gasmay: item.gasmay,
      jun: item.jun,
      gasjun: item.gasjun,
      jul: item.jul,
      gasjul: item.gasjul,
      ago: item.ago,
      gasago: item.gasago,
      sep: item.sep,
      gassep: item.gassep,
      oct: item.oct ,
      gasoct: item.gasoct,
      nov: item.nov,
      gasnov: item.gasnov,
      dic: item.dic,
      gasdic: item.gasdic,
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
          presupuestoid: item.id
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
          fecha: change.fecha,
          folio: change.folio,
          importe: change.importe,
          isr: change.isr,
          iva: change.iva,
          subtotal: change.subtotal,
          total: change.total,
          uuid: change.uuid,
          estatus: 'asignado',
          tipo: change.tipo
        }
    })
    firebase.database().ref('xml').update(prueba)
    .catch((error) => {
      console.error('Error: ', error)
    })
    this.setState({
      right: []
    })
    alert('Tu solicitud fue enviada.')
  }

  partida = ['','211001','211002','212001','212002','214001','215001','216001',
    '217001','221001','221002','246001','246002','247001','249001','251001','253001',
    '254001','255001','256001','261001','271001','272001','275001','291001','292001',
    '311001','312001','313001','317001','318001','323002','334001','336001','336002',
    '338001','351001','352001','355001','357001','358001','359001','361002','372001',
    '375001','392006','394001']
  rubro = ['','1501010','3101010','4301050']
  up = ['','01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','20','21','22','23','24']
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
  mes = ['', 'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto',
    'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']

  removeComprometido = (id, item) => {
    //consumo comprometido total
    const totalRef = firebase.database().ref(`fondos/${this.state.urlfire}/comprometido/`)
    totalRef.on('value', (snap) => {
      var consumoComprometidos = []
      snap.forEach((child) => {
        consumoComprometidos.push({
          partida: child.val().partida,
          presupuestal: child.val().presupuestal,
          area: child.val().area,
          fecha: child.val().fecha,
          importe_comp: child.val().importe_comp,
          iva: child.val().iva,
          isr: child.val().isr,
          total: child.val().total,
          año: child.val().año,
          ramo: child.val().ramo,
          ur: child.val().ur,
          up: child.val().up,
          rubro: child.val().rubro,
          tg: child.val().tg,
          npro: child.val().npro,
          np: child.val().np,
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
          ben: child.val().ben,
          eg: child.val().eg,
          comprobantes: child.val().comprobantes,
          presupuestoid: child.val().presupuestoid,
          id: child.key
        })
      })
      this.setState({
        actualizarComprometidos: consumoComprometidos[id].total
      })
    })
    // consumo de presupuesto
    const presupuestoRef = firebase.database().ref(`presupuesto/`)
    presupuestoRef.on('value', (snap) => {
      var presupuesto = []
      snap.forEach((child) => {
        if (item.presupuestoid === child.key) {
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
        }
      })
      this.setState({
        presupuestoConsumo: presupuesto
      })
    })
    console.log(this.state.mes)
    if (this.state.presupuestoConsumo.length === 1) {
      var pruebaIndice = this.state.presupuestoConsumo[0]
      let updates = {}
      updates['presupuesto/' + item.presupuestoid] = {
        año: pruebaIndice.año,
        rm: pruebaIndice.rm,
        ur: pruebaIndice.ur,
        up: pruebaIndice.up,
        rubro: pruebaIndice.rubro,
        tg: pruebaIndice.tg,
        ogasto: pruebaIndice.ogasto,
        npro: pruebaIndice.npro,
        f: pruebaIndice.f,
        fu: pruebaIndice.fu,
        sf: pruebaIndice.sf,
        eje: pruebaIndice.eje,
        s: pruebaIndice.s,
        prog: pruebaIndice.prog,
        sp: pruebaIndice.sp,
        min: pruebaIndice.min,
        obj: pruebaIndice.obj,
        proy: pruebaIndice.proy,
        est: pruebaIndice.est,
        obra: pruebaIndice.obra,
        ben: pruebaIndice.ben,
        eg: pruebaIndice.eg,
        mi: pruebaIndice.mi,
        pr: pruebaIndice.pr,
        pd: pruebaIndice.pd,
        itrans: pruebaIndice.itrans,
        igest: pruebaIndice.igest,
        la: pruebaIndice.la,
        ods: pruebaIndice.ods,
        et: pruebaIndice.et,
        ff: pruebaIndice.ff,
        of: pruebaIndice.of,
        np: pruebaIndice.np,
        cpa: pruebaIndice.cpa,
        ene: this.state.mes === 'Enero' ? pruebaIndice.ene + parseFloat(this.state.actualizarComprometidos) : pruebaIndice.ene,
        gasene: this.state.mes === 'Enero' ? pruebaIndice.gasene - parseFloat(this.state.actualizarComprometidos) : pruebaIndice.gasene,
        feb: this.state.mes === 'Febrero' ? pruebaIndice.feb + parseFloat(this.state.actualizarComprometidos) : pruebaIndice.feb,
        gasfeb: this.state.mes === 'Febrero' ? pruebaIndice.gasfeb - parseFloat(this.state.actualizarComprometidos) : pruebaIndice.gasfeb,
        mar: this.state.mes === 'Marzo' ? pruebaIndice.mar + parseFloat(this.state.actualizarComprometidos) : pruebaIndice.mar,
        gasmar: this.state.mes === 'Marzo' ? pruebaIndice.gasmar - parseFloat(this.state.actualizarComprometidos) : pruebaIndice.gasmar,
        abr: this.state.mes === 'Abril' ? pruebaIndice.abr + parseFloat(this.state.actualizarComprometidos) : pruebaIndice.abr,
        gasabr: this.state.mes === 'Abril' ? pruebaIndice.gasabr - parseFloat(this.state.actualizarComprometidos) : pruebaIndice.gasabr,
        may: this.state.mes === 'Mayo' ? pruebaIndice.may + parseFloat(this.state.actualizarComprometidos) : pruebaIndice.may,
        gasmay: this.state.mes === 'Mayo' ? pruebaIndice.gasmay - parseFloat(this.state.actualizarComprometidos) : pruebaIndice.gasmay,
        jun: this.state.mes === 'Junio' ? pruebaIndice.jun + parseFloat(this.state.actualizarComprometidos) : pruebaIndice.jun,
        gasjun: this.state.mes === 'Junio' ? pruebaIndice.gasjun - parseFloat(this.state.actualizarComprometidos) : pruebaIndice.gasjun,
        jul: this.state.mes === 'Julio' ? pruebaIndice.jul + parseFloat(this.state.actualizarComprometidos) : pruebaIndice.jul,
        gasjul: this.state.mes === 'Julio' ? pruebaIndice.gasjul - parseFloat(this.state.actualizarComprometidos) : pruebaIndice.gasjul,
        ago: this.state.mes === 'Agosto' ? pruebaIndice.ago + parseFloat(this.state.actualizarComprometidos) : pruebaIndice.ago,
        gasago: this.state.mes === 'Agosto' ? pruebaIndice.gasago - parseFloat(this.state.actualizarComprometidos) : pruebaIndice.gasago,
        sep: this.state.mes === 'Septiembre' ? pruebaIndice.sep + parseFloat(this.state.actualizarComprometidos) : pruebaIndice.sep,
        gassep: this.state.mes === 'Septiembre' ? pruebaIndice.gassep - parseFloat(this.state.actualizarComprometidos) : pruebaIndice.gassep,
        oct: this.state.mes === 'Octubre' ? pruebaIndice.oct + parseFloat(this.state.actualizarComprometidos) : pruebaIndice.oct,
        gasoct: this.state.mes === 'Octubre' ? pruebaIndice.gasoct - parseFloat(this.state.actualizarComprometidos) : pruebaIndice.gasoct,
        nov: this.state.mes === 'Noviembre' ? pruebaIndice.nov + parseFloat(this.state.actualizarComprometidos) : pruebaIndice.nov,
        gasnov: this.state.mes === 'Noviembre' ? pruebaIndice.gasnov - parseFloat(this.state.actualizarComprometidos) : pruebaIndice.gasnov,
        dic: this.state.mes === 'Diciembre' ? pruebaIndice.dic + parseFloat(this.state.actualizarComprometidos) : pruebaIndice.dic,
        gasdic: this.state.mes === 'Diciembre' ? pruebaIndice.gasdic - parseFloat(this.state.actualizarComprometidos) : pruebaIndice.gasdic,
        total: pruebaIndice.total,
        ampliacion: pruebaIndice.ampliacion,
        reduccion: pruebaIndice.reduccion,
        transferencia: pruebaIndice.transferencia
      }
      alert('Se ha actualizado el presupuesto')
      firebase.database().ref().update(updates)
      alert('Se ha borrado la afectacion de la partida')
      firebase.database().ref(`fondos/${this.state.urlfire}/comprometido/${id}`).remove()
    }
  }

  render () {
    var user = firebase.auth().currentUser
    var email
    if (user != null) {
      email = user.email
    }
    let admin
    if (email === 'miguel@procuraduria.com') {
      admin = 'MIGUEL'
    } else if (email === 'teresa@procuraduria.com') {
      admin = 'TERESA'
    } else if (email === 'marcos@procuraduria.com') {
      admin = 'MARCOS'
    } else if (email === 'eloy@procuraduria.com') {
      admin = 'ELOY'
    } else if (email === 'karina@procuraduria.com') {
      admin = 'KARINA'
    } else if (email === 'martha@procuraduria.com') {
      admin = 'MARTHA'
    } else if (email === 'lilia@procuraduria.com') {
      admin = 'LILIA'
    } else if (email === 'cenely@procuraduria.com') {
      admin = 'CENELY'
    } else if (email === 'hector@procuraduria.com') {
      admin = 'HECTOR'
    } else if (email === 'omar@procuraduria.com') {
      admin = 'OMAR'
    } else if (email === 'lizbeth@procuraduria.com') {
      admin = 'LIZBETH'
    }

    function not (a, b) {
      return a.filter((value) => b.indexOf(value) === -1)
    }

    function intersection (a, b) {
      return a.filter((value) => b.indexOf(value) !== -1)
    }

    const { checked, right } = this.state
    const left = this.state.xml

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
        return ( ( (xml.folio.indexOf(this.state.search) !== -1) ||
          (xml.nombre.indexOf(this.state.search) !== -1) ||
          (xml.fecha.indexOf(this.state.search) !== -1) ) &&
          xml.estatus !== 'asignado' && xml.tipo === 'revolvente')
      }
    )

    const filterData2 = this.state.xml.filter(
      (xml) => {
        return ( ( (xml.folio.indexOf(this.state.search) !== -1) ||
          (xml.nombre.indexOf(this.state.search) !== -1) ||
          (xml.fecha.indexOf(this.state.search) !== -1) ) &&
          xml.estatus !== 'asignado' && xml.tipo === 'directo')
      }
    )

    const array1 = this.state.right

    if (Object.keys(array1).length !== 0) {
      const totalImporteImporte = []
      right.map(items => (
        totalImporteImporte.push(parseFloat(items.subtotal))
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
            {admin === 'MIGUEL' || admin === 'TERESA' || admin === 'ELOY' || admin === 'MARTHA' || admin === 'MARCOS' || admin === 'LIZBETH' ?
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
                  <ListItemText className='list-align-i' primary={value.folio} />
                  {value.folio === 'Recibo' ?
                    <ListItemText className='list-align-i' primary={'$ ' + value.importe} />
                    :
                    <ListItemText className='list-align-i' primary={'$ ' + value.total} />
                  }
                  <ListItemText className='list-align' primary={String(value.fecha).substr(0, 10)} />
                  <ListItemText className='list-align2' primary={value.nombre} />
                </ListItem>
              )
            }) : null}
            {admin === 'KARINA' || admin === 'OMAR' || admin === 'LILIA' || admin === 'HECTOR' || admin === 'CENELY' ?
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
                  <ListItemText className='list-align-i' primary={value.folio} />
                  {value.folio === 'Recibo' ?
                    <ListItemText className='list-align-i' primary={'$ ' + value.importe} />
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
                  <ListItemText className='list-align-i' primary={value.folio} />
                  {value.folio === 'Recibo' ?
                    <ListItemText className='list-align-i' primary={'$ ' + value.importe} />
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
            {/* <Grid className='grid-w2'>
              <Paper className='paper-p'>
                <div className='div-con-f'>Buscador de Fondos</div>
                <div className='head-search'>
                  <div className='inp-sea-cont'>
                    <p className='inp-p-t'>Num. Fondo</p>
                  </div>
                  <div className='inp-sea-cont'>
                    <p className='inp-p-t'>Tipo de Doc.</p>
                  </div>
                  <div className='inp-sea-cont'>
                    <p className='inp-p-t'>Importe</p>
                  </div>
                  <div className='inp-sea-cont'>
                    <p className='inp-p-t'>Nombre R.</p>
                  </div>
                  <div className='inp-sea-cont'>
                    <p className='inp-p-t'>Editar F.</p>
                  </div>
                  <div className='inp-sea-cont'>
                    <p className='inp-p-t'>Editar C.</p>
                  </div>
                  <div className='inp-sea-cont'>
                    <p className='inp-p-t'>Oficios</p>
                  </div>
                </div>
                <div className='head-search'>
                  <div className='inp-sea-cont'>
                    <input
                      style={{ width: '85%' }}
                      className='field'
                      name='searchF'
                      value={this.state.searchF}
                      onChange={this.onChange}
                    />
                  </div>
                  <div className='cont-w-data'>
                    {this.state.fondos.map(fondos =>
                      <div className='cont-map-fondo'>
                        {(this.state.searchF === fondos.fondo && (fondos.realizo === this.state.realizo || this.state.realizo === 'MIGUEL')) &&
                          <div className='cont-map-data'>
                            <div className='data-w-search'>
                              <p className='data-m-f'>{fondos.tipo_doc}</p>
                            </div>
                            <div className='editar-option'>
                              <CurrencyFormat
                                value={fondos.importe}
                                displayType='text'
                                prefix=' $ '
                                thousandSeparator
                                decimalSeparator='.'
                              />
                            </div>
                            <div className='data-w-search'>
                              <p className='data-m-f'>{fondos.realizo}</p>
                            </div>
                            <div className='data-w-search'>
                              <Link className='data-m-f' to={`/FondoE/${fondos.id}`}>Editar</Link>
                            </div>
                            <div className='data-w-search'>
                              <Link className='data-m-f' to={`/ComprometidoE/${fondos.id}`}>Editar</Link>
                            </div>
                            <div className='data-w-search'>
                              <Link className='data-m-f' to={`/Oficios/${fondos.id}`}>Imprimir</Link>
                            </div>
                          </div>
                        }
                      </div>
                    )}
                  </div>
                </div>
              </Paper>
            </Grid> */}
            <Grid item xs style={{ width: '50%' }}>
              <div className='div-into-data'>
                <div className='recibo-container'>
                  Buscador
                  <input
                    className='input-compro'
                    value={this.state.search}
                    onChange={this.upsearch.bind(this)}
                    placeholder='Ingresa el Folio / Nombre'
                  />
                </div>
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
              <div style={{ height: '54px' }}/>
              {customListRight('Choices', right)}
            </Grid>
          </Grid>
        </div>

        <p>Selecciona el mes a afectar</p>
        <select
          style={{ width: 'auto', height: '30px', marginBottom: '15px' }}
          id='mes'
          name='mes'
          value={this.state.mes}
          onChange={this.updateSearch6.bind(this)}
          required
        >
          {this.mes.map((x,y) =>
            <option name={y}>{x}</option>
          )}
        </select>

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
              <TableBody className='table-row-c'>
                <TableCell className='border-icon' />
                <TableCell className='border-table2'>
                  <select
                    className='select-compro'
                    name='partida'
                    ref='partida'
                    onChange={this.updateSearch.bind(this)}
                    required
                    value={this.state.partida}
                  >
                    {this.partida.map((x,y) =>
                      <option name={y}>{x}</option>
                    )}
                  </select>
                </TableCell>
                <TableCell className='border-table2'>
                  <select
                    className='select-compro'
                    name='presupuestal'
                    ref='presupuestal'
                    onChange={this.updateSearch2.bind(this)}
                    required
                    value={this.state.up}
                  >
                    {this.up.map((x,y) =>
                      <option name={y}>{x}</option>
                    )}
                  </select>
                </TableCell>
                <TableCell className='border-table2'>
                  <select
                    className='select-compro'
                    name='rubro'
                    ref='rubro'
                    onChange={this.updateSearch3.bind(this)}
                    required
                    value={this.state.rubro}
                  >
                    {this.rubro.map((x,y) =>
                      <option name={y}>{x}</option>
                    )}
                  </select>
                </TableCell>
                <TableCell className='border-table-area'>
                  <select
                    className='select-compro'
                    name='area'
                    ref='area'
                    value={this.state.area}
                    onChange={this.updateSearch5.bind(this)}
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
              {this.state.comprometidosDos !== undefined ? this.state.comprometidosDos.map(comprometido =>
                comprometido.partida && this.state.mes ?
                  <ListComponentE
                    key={comprometido.id}
                    comprometido={comprometido}
                    removeComprometido={this.removeComprometido}
                  />
                : null
              ): null }
            </Paper>
          </Grid>
        </Grid>
        <div style={{ height: '80px' }} />
        <div className='div-content-fab-com'>
          <Fab
            color='primary'
            style={{ background: '#3f51b5' }}
            variant='extended'
          >
            <AddIcon style={{ marginRight: '6px' }} />
            {(admin === 'MIGUEL' || admin === 'MARTHA' || admin === 'ELOY' || admin === 'TERESA' || admin === 'MARCOS' || admin === 'LIZBETH') &&
              <Dropzone
                style={{
                  width: '100%',
                  height: '100%',
                }}
                accept='.xml'
                onChange={this.handleOnChange1.bind(this)}
              >
                Agregar XML
              </Dropzone>
            }
            {(admin === 'KARINA' || admin === 'HECTOR' || admin === 'OMAR' || admin === 'CENELY' || admin === 'LILIA') &&
              <Dropzone
                style={{
                  width: '100%',
                  height: '100%',
                }}
                accept='.xml'
                onChange={this.handleOnChange2.bind(this)}
              >
                Agregar XML
              </Dropzone>
            }
          </Fab>
          <Link to={`/Oficios/${this.state.urlfire}`} style={{ textDecoration: 'none' }}>
            <Fab
              color='primary'
              style={{ background: 'green' }}
              variant='extended'
            >
              <CheckIcon style={{ marginRight: '6px' }} />
              Finalizar
            </Fab>
          </Link>
        </div>
      </div>
    )
  }
}
