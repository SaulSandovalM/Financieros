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

export default class NewComprometidos extends Component {
  constructor (props) {
    super(props)
    this.unsubscribe = null
    this.state = {
      open: false,
      allowCustom: true,
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
          name: 'preuba',
          done: false
        }
      ],
      comprometidos: [],
      search: '',
      total: '',
      contra: []
    }
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick () {
    this.setState(state => ({
      open: !state.open
    }))
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
          obj: child.val().obj,
          proy: child.val().proy,
          est: child.val().est,
          obra: child.val().obra,
          ben: child.val().ben,
          eg: child.val().eg,
          mi: child.val().mi,
          pr: child.val().pr,
          ped: child.val().ped,
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
          trasferencia: child.val().trasferencia,
          estatus: child.val().estatus,
          id: child.key
        })
      })
      this.setState({
        presupuesto: presupuesto
      })
    })
  }

  componentDidMount () {
    firebase.database().ref('xml/').on('child_added', snapshot => {
      this.setState({
        xml: this.state.xml.concat(snapshot.val())
      })
    })
    const itemsRef = firebase.database().ref('presupuesto/')
    this.listenForItems(itemsRef)
    const ref = firebase.firestore().collection('fondos').doc(this.props.match.params.id)
    const updateRef = firebase.firestore().collection('fondos').doc(this.props.match.params.id).collection('comprometidos')
    this.unsubscribe = updateRef.onSnapshot(this.onCollectionUpdate)
    ref.get().then((doc) => {
      if (doc.exists) {
        const fondos = doc.data()
        const idP = doc.id
        this.state.idP = idP
        this.setState({
          key: doc.id,
          fondo: fondos.fondo,
          fecha: fondos.fecha,
          realizo: fondos.realizo,
          tipo_doc: fondos.tipo_doc,
          importe: fondos.importe,
          partida: fondos.partida,
          presupuestal: fondos.presupuestal,
          importe_comp: fondos.importe_comp,
          isr: fondos.isr,
          total: fondos.total,
          fecha_comp: fondos.fecha_comp
        })
      } else {
        console.log('No se encuentra documento')
      }
    })
  }

  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value
    this.setState(state)
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

  onCollectionUpdate = (querySnapshot) => {
    const comprometidos = []
    querySnapshot.forEach((doc) => {
      const { partida, presupuestal, importe_comp, rubro, municipio, area, isr, iva } = doc.data()
      comprometidos.push({
        key: doc.id,
        doc,
        partida,
        presupuestal,
        importe_comp,
        rubro,
        municipio,
        area,
        isr,
        iva
      })
    })
    this.setState({
      comprometidos
   })
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
      obj: item.obj,
      proy: item.proy,
      est: item.est,
      obra: item.obra,
      ben: item.ben,
      eg: item.eg,
      mi: item.mi,
      pr: item.pr,
      ped: item.ped,
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
      trasferencia: item.trasferencia
    }
    firebase.database().ref().update(updates)
    console.log('hasta aqui funciona')
    const { municipio, area, total, fechar } = this.state
    const updateRef = firebase.firestore().collection('fondos').doc(this.props.match.params.id).collection('comprometidos').doc()
    updateRef.set({
      partida: item.ogasto,
      presupuestal: item.up,
      municipio,
      area,
      fecha: fechar,
      importe_comp: total,
      año: item.año,
      ramo: item.rm,
      ur: item.ur,
      up: item.up,
      rubro: item.rubro,
      tg: item.tg,
      npro: item.npro,
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
      eg: item.eg
    }).then((docRef) => {
      this.setState({
        partida: '',
        presupuestal: '',
        municipio: '',
        area: '',
        importe_comp: ''
      })
    })
    .catch((error) => {
      console.error('Error: ', error)
    })
    alert('Tu solicitud fue enviada.')
  }

  cambio = () => {
    this.props.history.push(`/Oficios/${this.state.idP}`)
  }

  partida = ['','211001','211002','212001','212002','214001','214002','215001','216001','217001','221001','221002','246001','251001','253001','254001','255001','261001','271001','272001','291001','292001','311001','313001','318001','323002','334001','338001','341001','351001','352001','353001','355001','357001','358001','361002','372001','375001','381001','392006','394001','218002','312001','371001','247001','249001','359001','336001','275001','211003','541001','515001','339001']
  rubro = ['','1501010','4302010','4303010','4303020','4306030','4501010','5106050','5106110','6106010','6106020','6901010','8103010','8402060']
  up = ['','01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','20','21','22','23','24']
  municipio = ['','Acatlán','Acaxochitlán','Actopan','Agua Blanca de Iturbide','Ajacuba','Alfajayucan','Almoloya','Apan','El Arenal','Atitalaquia','Atlapexco','Atotonilco el Grande','Atotonilco de Tula','Calnali','Cardonal','Cuautepec de Hinojosa','Chapantongo','Chapulhuacán','Chilcuautla','Eloxochitlán','Emiliano Zapata','Epazoyucan','Franciso I. Madero','Huasca de Ocampo','Huautla','Huazalingo','Huehuetla','Huejutla de Reyes','Huichapan','Ixmiquilpan','Jacala de Ledezma','Jaltocán','Juárez Hidalgo','Lolotla','Metepec','San Agustín Metzquititlán','Metztitlán','Mineral del Chico','Mineral del Monte','La Misión','Mixquiahuala de Juárez','Molango de Escamilla','Nicolás Flores','Nopala de Villagrán','Omitlán de Juárez','San Felipe Orizatlán','Pacula','Pachuca de Soto','Pisaflores','Progreso de Obregón','Mineral de la Reforma','San Agustín Tlaxiaca','San Bartolo Tutotepec','San Salvador','Santiago de Anaya','Santiago Tulantepec de Lugo Guerrero','Singuilucan','Tasquillo','Tecozautla','Tenango de Doria','Tepeapulco','Tepehuacán de Guerrero','Tepeji del Río de Ocampo','Tepetitlán','Tetepango','Villa de Tezontepec','Tezontepec de Aldama','Tianguistengo','Tizayuca','Tlahuelilpan','Tlahuiltepa','Tlanalapa','Tlanchinol','Tlaxcoapan','Tolcayuca','Tula de Allende','Tulancingo de Bravo','Xochiatipan','Xochicoatlán','Yahualica','Zacualtipán de Ángeles','Zapotlán de Juárez','Zempoala','Zimapán']
  area = ['','Procuraduría General de Justicia','Subprocuraduría de Procedimientos Penales Región Oriente','Fiscalía Especializada para la atención de Delitos cometidos contra la Libertad de Expresión', 'Periodistas y Personas defensoras de los Derechos Humanos','Dirección General para la Atención de los Asuntos del Sistema Tradicional','Fiscalia de Delitos Electorales','Subprocuraduría de Derechos Humanos y Servicios a la Comunidad','Centro de Justicia Restaurativa Penal Poniente','Fiscalía para la Atención de Delitos de Género','Visitaduría General','Dirección General de Servicios Periciales','Centro de Operación Estratégica','Unidad Especializada en el Combate al Secuestro','Dirección General de Administración y Finanzas','Fiscalía Especializada para la atención de los Delitos de Trata de Personas','Subprocuraduría de Procedimientos Penales Región Poniente','Centro de Atención Temprana Poniente','Dirección General de Investigación y Litigación Poniente','Dirección General de la Policía Investigadora','Centro de Atención Temprana Oriente','Centro de Justicia Restaurativa Penal Oriente','Dirección General de Investigación y Litigación Oriente','Dirección General de Recursos Materiales y Servicios','Fiscalía Especializada en Delitos de Corrupción','Fiscalía Especializada en Materia de Desaparición Forzada de Personas',]

  render () {
    var user = firebase.auth().currentUser
    var email
    if (user != null) {
      email = user.email
    }
    let admin
    if (email === 'administrador@procuraduria.com') {
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
    const { checked, right } = this.state
    const left = this.state.xml

    function not (a, b) {
      return a.filter((value) => b.indexOf(value) === -1)
    }

    function intersection (a, b) {
      return a.filter((value) => b.indexOf(value) !== -1)
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

    const customListLeft = (title, items) => (
      <div>
        <div className='recibo-container'>
          Buscador
          <input
            className='input-compro'
            value={this.state.search}
            onChange={this.upsearch.bind(this)}
            placeholder='Ingresa el folio a buscar'
          />
        </div>
        <Card className='card-compro'>
          <List dense component='div' role='list'>
            {filterData.map((value) => {
              return (
                <ListItem key={value.name} button onClick={handleToggle(value)}>
                  <ListItemIcon>
                    <Checkbox
                      checked={checked.indexOf(value) !== -1}
                      tabIndex={-1}
                      disableRipple
                    />
                  </ListItemIcon>
                  <ListItemText className='list-align' primary={value.folio} />
                  <ListItemText className='list-align' primary={'$ ' + value.importe} />
                  <ListItemText className='list-align' primary={'$ ' + value.iva} />
                  <ListItemText className='list-align' primary={'$ ' + value.isr} />
                </ListItem>
              )
            })}
            <ListItem />
          </List>
        </Card>
      </div>
    )

    const customListRight = (title, items) => (
      <div>
        <div className='recibo-container'>
          Agrega un Recibo
          <div className='recibo-content'>
            <button className='recibo-btn'> + </button>
            <input
              className='input-r'
              placeholder='Importe'
            />
            <input
              className='input-r'
              placeholder='Iva'
            />
            <input
              className='input-r'
              placeholder='Isr'
            />
            <input
              className='input-r'
              placeholder='Total'
            />
            <input
              className='input-r'
              placeholder='Fecha'
            />
          </div>
        </div>
        <Card className='card-compro'>
          <List dense component='div' role='list'>
            {items.map((value) => {
              return (
                <ListItem key={value.name} button onClick={handleToggle(value)}>
                  <ListItemIcon>
                    <Checkbox
                      checked={checked.indexOf(value) !== -1}
                      tabIndex={-1}
                      disableRipple
                    />
                  </ListItemIcon>
                  <ListItemText className='list-align' primary={value.folio} />
                  <ListItemText className='list-align' primary={'$ ' + value.importe} />
                  <ListItemText className='list-align' primary={'$ ' + value.iva} />
                  <ListItemText className='list-align' primary={'$ ' + value.isr} />
                </ListItem>
              )
            })}
            <ListItem />
          </List>
        </Card>
      </div>
    )

    const customListPago = (title, items) => (
      <div>
        <div className='recibo-container'>
          Agregar tus XML
          <Dropzone
            style={{
              width: '100%',
              height: '36px',
              borderWidth: '1px',
              borderColor: 'grey',
              borderStyle: 'solid',
              borderTop: '0',
              borderLeft: 0,
              borderRight: 0,
              maxFiles: 5,
              background: 'white',
              position: 'static',
              placeholder: 'Agregar'
            }}
            accept='.xml'
          />
        </div>
        <Card className='card-compro'>
          <List dense component='div' role='list'>
            {items.map((value) => {
              return (
                <ListItem key={value.name} button onClick={handleToggle(value)}>
                  <ListItemIcon>
                    <Checkbox
                      checked={checked.indexOf(value) !== -1}
                      tabIndex={-1}
                      disableRipple
                    />
                  </ListItemIcon>
                  <ListItemText className='list-align' primary={value.folio} />
                  <ListItemText className='list-align' primary={'$ ' + value.importe} />
                  <ListItemText className='list-align' primary={'$ ' + value.iva} />
                  <ListItemText className='list-align' primary={'$ ' + value.isr} />
                </ListItem>
              )
            })}
            <ListItem />
          </List>
        </Card>
      </div>
    )

    const filterData = this.state.xml.filter(
      (xml) => {
        return xml.folio.indexOf(this.state.search) !== -1
      }
    )

    const array1 = this.state.right

    if (Object.keys(array1).length !== 0) {
      const totalImporteImporte = []
      right.map(items => (
        totalImporteImporte.push(items.importe)
      ))
      const reducerImporte = (a, b) => a + b
      this.state.importe = totalImporteImporte.reduce(reducerImporte)

      const totalImporteIva = []
      right.map(items => (
        totalImporteIva.push(items.iva)
      ))
      const reducerIva = (a, b) => a + b
      this.state.iva = totalImporteIva.reduce(reducerIva)

      const totalImporteIsr = []
      right.map(items => (
        totalImporteIsr.push(items.isr)
      ))
      const reducerIsr = (a, b) => a + b
      this.state.isr = totalImporteIsr.reduce(reducerIsr)

      const total = this.state.importe + this.state.iva + this.state.isr
      const totalcompro = total
      this.state.total = totalcompro
      this.state.contra = right
    }

    console.log(this.state.presupuesto)

    return (
      <div className='div-compro-container'>
        <div>
          <Grid container spacing={3} justify='center' alignItems='center'>
            <Grid item xs>
              {admin === 'ELOY' || admin === 'MARCOS' || admin === 'KARINA' ?
                customListPago('Choices', left) :
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
            <Grid item xs>
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
                    <b>Partida</b>
                  </TableCell>
                  <TableCell className='border-table2'>
                    <b>Up</b>
                  </TableCell>
                  <TableCell className='border-table2'>
                    <b>Rubro</b>
                  </TableCell>
                  <TableCell className='border-table3'>
                    <b>Municipio</b>
                  </TableCell>
                  <TableCell className='border-table'>
                    <b>Area</b>
                  </TableCell>
                  <TableCell className='border-table2'>
                    <b>Importe</b>
                  </TableCell>
                  <TableCell className='border-table2'>
                    <b>Iva</b>
                  </TableCell>
                  <TableCell className='border-table2'>
                    <b>Isr</b>
                  </TableCell>
                  <TableCell className='border-table2'>
                    <b>Total</b>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody className='table-row-c'>
                {this.state.presupuesto.map(item =>
                  <div key={item.id} item={item}>
                  {this.state.partida === item.ogasto && this.state.up === item.up && this.state.rubro === item.rubro ?
                    <TableCell className='border-icon'>
                      <IconButton size='small' className='border-des' onClick={this.update}>
                        <AddIcon />
                      </IconButton>
                    </TableCell> : null
                  }
                  </div>
                )}
                <TableCell className='border-table2'>
                  <select
                    className='select-compro'
                    name='partida'
                    ref='partida'
                    value={this.state.partida}
                    onChange={this.updateSearch.bind(this)}
                    required
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
                    value={this.state.up}
                    onChange={this.updateSearch2.bind(this)}
                    required
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
                    value={this.state.rubro}
                    onChange={this.updateSearch3.bind(this)}
                    required
                  >
                    {this.rubro.map((x,y) =>
                      <option name={y}>{x}</option>
                    )}
                  </select>
                </TableCell>
                <TableCell className='border-table3'>
                  <select
                    className='select-compro'
                    name='municipio'
                    ref='municipio'
                    value={this.state.municipio}
                    onChange={this.updateSearch4.bind(this)}
                    required
                  >
                    {this.municipio.map((x,y) =>
                      <option name={y}>{x}</option>
                    )}
                  </select>
                </TableCell>
                <TableCell className='border-table'>
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
                  {this.state.importe ?
                    <CurrencyFormat
                      value={this.state.importe}
                      displayType='text'
                      prefix=' $ '
                      thousandSeparator
                      decimalSeparator='.'
                    /> :
                    <CurrencyFormat
                      value={0}
                      displayType='text'
                      prefix=' $ '
                      thousandSeparator
                      decimalSeparator='.'
                    />}
                </TableCell>
                <TableCell className='border-table2'>
                  {this.state.importe ?
                    <CurrencyFormat
                      value={this.state.iva}
                      displayType='text'
                      prefix=' $ '
                      thousandSeparator
                      decimalSeparator='.'
                    /> :
                    <CurrencyFormat
                      value={0}
                      displayType='text'
                      prefix=' $ '
                      thousandSeparator
                      decimalSeparator='.'
                    />
                  }
                </TableCell>
                <TableCell className='border-table2'>
                  {this.state.importe ?
                    <CurrencyFormat
                      value={this.state.isr}
                      displayType='text'
                      prefix=' $ '
                      thousandSeparator
                      decimalSeparator='.'
                    /> :
                    <CurrencyFormat
                      value={0}
                      displayType='text'
                      prefix=' $ '
                      thousandSeparator
                      decimalSeparator='.'
                    />
                  }
                </TableCell>
                <TableCell className='border-table2'>
                  {this.state.importe ?
                    <CurrencyFormat
                      value={this.state.total}
                      displayType='text'
                      prefix=' $ '
                      thousandSeparator
                      decimalSeparator='.'
                    /> :
                    <CurrencyFormat
                      value={0}
                      displayType='text'
                      prefix=' $ '
                      thousandSeparator
                      decimalSeparator='.'
                    />
                  }
                </TableCell>
              </TableBody>
              {this.state.comprometidos.map(comprometidos =>
                <TableRow key={comprometidos.name} className='table-row-c'>
                  <TableCell className='border-icon'>
                    <IconButton size='small' className='border-des'>
                      <CheckIcon style={{ color: 'green', cursor: 'auto' }} />
                    </IconButton>
                  </TableCell>
                  <TableCell className='border-table2'>
                    {comprometidos.partida}
                  </TableCell>
                  <TableCell className='border-table2'>
                    {comprometidos.presupuestal}
                  </TableCell>
                  <TableCell className='border-table2'>
                    {comprometidos.rubro}
                  </TableCell>
                  <TableCell className='border-table3'>
                    {comprometidos.municipio}
                  </TableCell>
                  <TableCell className='border-table'>
                    {comprometidos.area}
                  </TableCell>
                  <TableCell className='border-table2'>
                    {' $ ' + comprometidos.importe_comp}
                  </TableCell>
                  <TableCell className='border-table2'>
                    {' $ ' + comprometidos.iva}
                  </TableCell>
                  <TableCell className='border-table2'>
                    {' $ ' + comprometidos.isr}
                  </TableCell>
                  <TableCell className='border-table2'>
                    {' $ ' + (comprometidos.importe_comp + comprometidos.iva + comprometidos.isr)}
                  </TableCell>
                </TableRow>
              )}
            </Paper>
          </Grid>
        </Grid>
        <div className='div-content-fab'>
          <Fab
            color='primary'
            aria-label='add'
            style={{ background: 'green' }}
            onClick={this.cambio}
          >
            <CheckIcon />
          </Fab>
        </div>
      </div>
    )
  }
}
