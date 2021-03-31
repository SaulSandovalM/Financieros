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
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp'
import Dropzone from 'react-dropzone'
import history from '../../../history'

export default class Comprometidos extends Component {
  constructor (props) {
    super(props)
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
      ids: ''
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

  listenForXml = (itemsRefXml) => {
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
          id: child.key
        })
      })
      this.setState({
        xml: xml
      })
    })
  }

  listenFondos = (itemsRefComprometidos) => {
    itemsRefComprometidos.on('value', (snap) => {
      const firebasedata = snap.val()
      this.setState({
        comprometidos: firebasedata.comprometido
      })
    })
  }

  componentDidMount () {
    const itemsRefXml = firebase.database().ref('xml/')
    this.listenForXml(itemsRefXml)
    const itemsRef = firebase.database().ref('presupuesto/')
    this.listenForItems(itemsRef)
    var dir = history.location.pathname.slice(15)
    const itemsRefComprometidos = firebase.database().ref(`fondos/${dir}`)
    this.listenFondos(itemsRefComprometidos)
  }

  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value
    this.setState(state)
  }

  handleChange (event) {
    this.setState({ [event.target.name]: event.target.value })
  }

  upsearch (event) {
    this.setState({ search: event.target.value.substr(0, 20) })
  }

  updateSearch (event) {
    this.setState({ partida: event.target.value.substr(0, 20) })
  }

  updateSearch2 (event) {
    this.setState({ up: event.target.value.substr(0, 7) })
  }

  updateSearch3 (event) {
    this.setState({ rubro: event.target.value.substr(0, 7) })
  }

  updateSearch4 (event) {
    this.setState({ municipio: event.target.value })
  }

  updateSearch5 (event) {
    this.setState({ area: event.target.value })
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
          'nombre': xml.children['0'].attributes['Nombre'],
          'importe': xml.children['2'].children['0'].attributes['Importe'],
          'iva': xml.children['3'].attributes['TotalImpuestosTrasladados'],
          'isr': xml.children['3'].attributes['TotalImpuestosRetenidos'] ? xml.children['3'].attributes['TotalImpuestosRetenidos'] : 0,
          'fecha': xml.children['4'].children['0'].attributes['FechaTimbrado'],
          'uuid': xml.children['4'].children['0'].attributes['UUID'],
          'estatus': 'sin asignar'
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
          'nombre': xml.children['0'].attributes['Nombre'],
          'importe': xml.children['2'].children['0'].attributes['Importe'],
          'iva': xml.children['3'].attributes['TotalImpuestosTrasladados'],
          'isr': xml.children['3'].attributes['TotalImpuestosRetenidos'] ? xml.children['3'].attributes['TotalImpuestosRetenidos'] : 0,
          'fecha': xml.children['4'].children['0'].attributes['FechaTimbrado'],
          'uuid': xml.children['4'].children['0'].attributes['UUID']
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
    // sacar el id
    const { area, total, iva, isr, importe } = this.state
    var dir = history.location.pathname.slice(15)
    const wishRef = firebase.database().ref(`fondos/${dir}`)
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
          comprobantes: this.state.contra
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
          estatus: 'asignado'
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

  cambio = () => {
    var dir = history.location.pathname.slice(15)
    this.props.history.push(`/Oficios/${dir}`)
  }

  partida = ['','211001','211002','212001','212002','214001','215001','216001','217001','221001','221002','246001','246002','247001','249001','251001','253001','254001','255001','256001','261001','271001','272001','275001','291001','292001','311001','312001','313001','317001','318001','323002','334001','336001','336002','338001','351001','352001','355001','357001','358001','359001','361002','372001','375001','392006','394001']
  rubro = ['','1501010','3101010','4301050']
  up = ['','01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','20','21','22','23','24']
  // municipio = ['','Acatlán','Acaxochitlán','Actopan','Agua Blanca de Iturbide','Ajacuba','Alfajayucan','Almoloya','Apan','El Arenal','Atitalaquia','Atlapexco','Atotonilco el Grande','Atotonilco de Tula','Calnali','Cardonal','Cuautepec de Hinojosa','Chapantongo','Chapulhuacán','Chilcuautla','Eloxochitlán','Emiliano Zapata','Epazoyucan','Franciso I. Madero','Huasca de Ocampo','Huautla','Huazalingo','Huehuetla','Huejutla de Reyes','Huichapan','Ixmiquilpan','Jacala de Ledezma','Jaltocán','Juárez Hidalgo','Lolotla','Metepec','San Agustín Metzquititlán','Metztitlán','Mineral del Chico','Mineral del Monte','La Misión','Mixquiahuala de Juárez','Molango de Escamilla','Nicolás Flores','Nopala de Villagrán','Omitlán de Juárez','San Felipe Orizatlán','Pacula','Pachuca de Soto','Pisaflores','Progreso de Obregón','Mineral de la Reforma','San Agustín Tlaxiaca','San Bartolo Tutotepec','San Salvador','Santiago de Anaya','Santiago Tulantepec de Lugo Guerrero','Singuilucan','Tasquillo','Tecozautla','Tenango de Doria','Tepeapulco','Tepehuacán de Guerrero','Tepeji del Río de Ocampo','Tepetitlán','Tetepango','Villa de Tezontepec','Tezontepec de Aldama','Tianguistengo','Tizayuca','Tlahuelilpan','Tlahuiltepa','Tlanalapa','Tlanchinol','Tlaxcoapan','Tolcayuca','Tula de Allende','Tulancingo de Bravo','Xochiatipan','Xochicoatlán','Yahualica','Zacualtipán de Ángeles','Zapotlán de Juárez','Zempoala','Zimapán']
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

  toggleOpen () {
    this.setState({
      open: !this.state.open
    })
  }

  render () {
    console.log(this.state.comprometidos)
    var user = firebase.auth().currentUser
    var email
    if (user != null) {
      email = user.email
    }
    let admin
    if (email === 'administrador@procu.com') {
      admin = 'ADMIN'
    } else if (email === 'nayra@procuraduria.com') {
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
          xml.estatus !== 'asignado' && xml.area !== 'Pago Directo')
      }
    )

    const filterData2 = this.state.xml.filter(
      (xml) => {
        return ( ( (xml.folio.indexOf(this.state.search) !== -1) ||
          (xml.nombre.indexOf(this.state.search) !== -1) ||
          (xml.fecha.indexOf(this.state.search) !== -1) ) &&
          xml.estatus !== 'asignado' && xml.area === 'Pago Directo')
      }
    )

    const array1 = this.state.right

    if (Object.keys(array1).length !== 0) {
      const totalImporteImporte = []
      right.map(items => (
        totalImporteImporte.push(parseFloat(items.importe))
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
      this.state.total = total.toFixed(2)
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
            {admin === 'MIGUEL' || admin === 'KARINA' || admin === 'HECTOR' || admin === 'LILIA' || admin === 'CENELY' || admin === 'OMAR' ?
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
                  <ListItemText className='list-align' primary={value.fecha} />
                  <ListItemText className='list-align2' primary={value.nombre} />
                </ListItem>
              )
            }) : null}
            {admin === 'ADMIN' ?
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
                  <ListItemText className='list-align' primary={value.fecha} />
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
                  <ListItemText className='list-align' primary={value.fecha} />
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
              {(admin === 'OMAR' || admin === 'MARCOS' || admin === 'KARINA' || admin === 'MIGUEL' || admin === 'TERESA' || admin === 'HECTOR' || admin === 'LILIA' || admin === 'CENELY' || admin === 'OMAR') &&
                customListLeft('Choices', left)
              }
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
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper className='paper-content'>
              <TableHead>
                <TableRow>
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
              {this.state.comprometidos.map(comprometidos =>
                comprometidos.partida ?
                <TableRow key={comprometidos.name} className='table-row-c'>
                  <TableCell className='border-table2'>
                    <div className='font-tb'>
                      {comprometidos.partida}
                    </div>
                  </TableCell>
                  <TableCell className='border-table2'>
                    <div className='font-tb'>
                      {comprometidos.presupuestal}
                    </div>
                  </TableCell>
                  <TableCell className='border-table2'>
                    <div className='font-tb'>
                      {comprometidos.rubro}
                    </div>
                  </TableCell>
                  <TableCell className='border-table-area'>
                    <div className='font-tb'>
                      {comprometidos.area}
                    </div>
                  </TableCell>
                  <TableCell className='border-table2'>
                    <CurrencyFormat
                      className='font-tb'
                      displayType='text'
                      prefix=' $ '
                      thousandSeparator
                      value={comprometidos.importe_comp}
                    />
                  </TableCell>
                  <TableCell className='border-table2'>
                    <CurrencyFormat
                      className='font-tb'
                      displayType='text'
                      prefix=' $ '
                      thousandSeparator
                      value={comprometidos.iva}
                    />
                  </TableCell>
                  <TableCell className='border-table2'>
                    <CurrencyFormat
                      className='font-tb'
                      displayType='text'
                      prefix=' $ '
                      thousandSeparator
                      value={comprometidos.isr}
                    />
                  </TableCell>
                  <TableCell className='border-table2'>
                    <CurrencyFormat
                      className='font-tb'
                      style={{ textAlign: 'center' }}
                      displayType='text'
                      prefix=' $ '
                      thousandSeparator
                      value={(parseInt(comprometidos.importe_comp) + parseInt(comprometidos.iva) - parseInt(comprometidos.isr))}
                    />
                  </TableCell>
                  <TableCell className='border-icon'>
                    <IconButton size='small' className='border-des' onClick={this.toggleOpen.bind(this)}>
                      {this.state.open ?
                        <KeyboardArrowUpIcon className='key-style' /> :
                        <KeyboardArrowDownIcon className='key-style' />
                      }
                    </IconButton>
                  </TableCell>
                </TableRow> : null
              )}
            </Paper>
          </Grid>
        </Grid>
        <div className='div-content-fab-com'>
          <Fab
            color='primary'
            style={{ background: '#3f51b5' }}
            variant='extended'
          >
            <AddIcon style={{ marginRight: '6px' }} />
            {(admin === 'MIGUEL' || admin === 'KARINA' || admin === 'HECTOR' || admin === 'OMAR' || admin === 'CENELY' || admin === 'LILIA') &&
              <Dropzone
                style={{
                  width: '100%',
                  height: '100%',
                }}
                accept='.xml' onChange={this.handleOnChange1.bind(this)}
              >
                Agregar XML
              </Dropzone>
            }
            {(admin === 'ADMIN') &&
              <Dropzone
                style={{
                  width: '100%',
                  height: '100%',
                }}
                accept='.xml' onChange={this.handleOnChange2.bind(this)}
              >
                Agregar XML
              </Dropzone>
            }
          </Fab>
          <Fab
            color='primary'
            style={{ background: 'green' }}
            onClick={this.cambio}
            variant='extended'
          >
            <CheckIcon style={{ marginRight: '6px' }} />
            Finalizar
          </Fab>
        </div>
      </div>
    )
  }
}
