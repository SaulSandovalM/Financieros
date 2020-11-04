import React, { Component } from 'react'
import './Comprometidos.css'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
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
import firebase from '../../../Firebase'
import CurrencyFormat from 'react-currency-format'

export default class NewComprometidos extends Component {
  constructor (props) {
    super(props)
    this.unsubscribe = null
    this.state = {
      open: false,
      allowCustom: true,
      checked: [],
      left: [0, 1, 2, 3],
      right: [4, 5, 6, 7],
      xml: [],
      partida: '',
      rubro: '',
      up: '',
      presupuesto: [],
    }
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick () {
    this.setState(state => ({
      open: !state.open
    }))
  }

  componentWillMount () {
    firebase.database().ref('xml/').on('child_added', snapshot => {
      this.setState({
        xml: this.state.xml.concat(snapshot.val())
      })
    })
    const itemsRef = firebase.database().ref('presupuesto/')
    this.listenForItems(itemsRef)
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
          done: child.val().done,
          id: child.key
        })
      })
      this.setState({
        presupuesto: presupuesto
      })
    })
  }

  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value
    this.setState(state)
  }

  updateSeacrh (event) {
    this.setState({ search: event.target.value.substr(0, 20) })
  }

  updateSeacrh2 (event) {
    this.setState({ search2: event.target.value.substr(0, 7) })
  }

  updateSeacrh3 (event) {
    this.setState({ search3: event.target.value.substr(0, 7) })
  }

  updateSeacrh4 (event) {
    this.setState({ search4: event.target.value.substr(0, 7) })
  }

  updateSeacrh5 (event) {
    this.setState({ search5: event.target.value.substr(0, 7) })
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
      oct: item.oct - parseInt(this.state.total),
      gasoct: item.gasoct + parseInt(this.state.total),
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
    const { municipio, area, totalr, fechar } = this.state
    const updateRef = firebase.firestore().collection('fondos').doc(this.props.match.params.id).collection('comprometidos').doc()
    updateRef.set({
      partida: item.ogasto,
      presupuestal: item.up,
      municipio,
      area,
      fecha: fechar,
      importe_comp: totalr,
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
      eg: item.eg,
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

  partida = ['211001', '211002', '212001', '212002', '214001', '214002', '215001', '216001', '217001', '221001', '221002', '246001', '251001', '253001', '254001', '255001', '261001', '271001', '272001', '291001', '292001', '311001', '313001', '318001', '323002', '334001', '338001', '341001', '351001', '352001', '353001', '355001', '357001', '358001', '361002', '372001', '375001', '381001', '392006', '394001', '218002', '312001', '371001', '247001', '249001', '359001', '336001', '275001', '211003', '541001', '515001', '339001']
  rubro = ['1501010', '4302010', '4303010', '4303020', '4306030', '451010', '5106050', '5106110', '6106010', '6106020', '6901010', '8103010', '8402060']
  up = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '20', '21', '22', '23', '24']
  municipio = ['Acatlán', 'Acaxochitlán', 'Actopan', 'Agua Blanca de Iturbide','Ajacuba','Alfajayucan','Almoloya','Apan','El Arenal','Atitalaquia','Atlapexco','Atotonilco el Grande','Atotonilco de Tula','Calnali','Cardonal','Cuautepec de Hinojosa','Chapantongo','Chapulhuacán','Chilcuautla','Eloxochitlán','Emiliano Zapata','Epazoyucan','Franciso I. Madero','Huasca de Ocampo','Huautla','Huazalingo','Huehuetla','Huejutla de Reyes','Huichapan','Ixmiquilpan','Jacala de Ledezma','Jaltocán','Juárez Hidalgo','Lolotla','Metepec','San Agustín Metzquititlán','Metztitlán','Mineral del Chico','Mineral del Monte','La Misión','Mixquiahuala de Juárez','Molango de Escamilla','Nicolás Flores','Nopala de Villagrán','Omitlán de Juárez','San Felipe Orizatlán','Pacula','Pachuca de Soto','Pisaflores','Progreso de Obregón','Mineral de la Reforma','San Agustín Tlaxiaca','San Bartolo Tutotepec','San Salvador','Santiago de Anaya','Santiago Tulantepec de Lugo Guerrero','Singuilucan','Tasquillo','Tecozautla','Tenango de Doria','Tepeapulco','Tepehuacán de Guerrero','Tepeji del Río de Ocampo','Tepetitlán','Tetepango','Villa de Tezontepec','Tezontepec de Aldama','Tianguistengo','Tizayuca','Tlahuelilpan','Tlahuiltepa','Tlanalapa','Tlanchinol','Tlaxcoapan','Tolcayuca','Tula de Allende','Tulancingo de Bravo','Xochiatipan','Xochicoatlán','Yahualica','Zacualtipán de Ángeles','Zapotlán de Juárez','Zempoala','Zimapán']
  area = ['Procuraduría General de Justicia','Subprocuraduría de Procedimientos Penales Región Oriente','Fiscalía Especializada para la atención de Delitos cometidos contra la Libertad de Expresión', 'Periodistas y Personas defensoras de los Derechos Humanos','Dirección General para la Atención de los Asuntos del Sistema Tradicional','Fiscalia de Delitos Electorales','Subprocuraduría de Derechos Humanos y Servicios a la Comunidad','Centro de Justicia Restaurativa Penal Poniente','Fiscalía para la Atención de Delitos de Género','Visitaduría General','Dirección General de Servicios Periciales','Centro de Operación Estratégica','Unidad Especializada en el Combate al Secuestro','Dirección General de Administración y Finanzas','Fiscalía Especializada para la atención de los Delitos de Trata de Personas','Subprocuraduría de Procedimientos Penales Región Poniente','Centro de Atención Temprana Poniente','Dirección General de Investigación y Litigación Poniente','Dirección General de la Policía Investigadora','Centro de Atención Temprana Oriente','Centro de Justicia Restaurativa Penal Oriente','Dirección General de Investigación y Litigación Oriente','Dirección General de Recursos Materiales y Servicios','Fiscalía Especializada en Delitos de Corrupción','Fiscalía Especializada en Materia de Desaparición Forzada de Personas',]

  render () {
    const { checked, left, right } = this.state

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

    const customList = (title, items) => (
      <Card className='card-compro'>
        <List dense component='div' role='list'>
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
                <ListItemText primary={value} />
              </ListItem>
            )
          })}
          <ListItem />
        </List>
      </Card>
    )

    const { partida, rubro, up } = this.state

    return (
      <div className='div-compro-container'>
        {/* this.state.xml.map(item =>
          <div>
            perro
          </div>
        ) */}
        <div>
          <Grid container spacing={3} justify='center' alignItems='center'>
            <Grid item xs>
              {customList('Choices', left)}
            </Grid>
            <Grid item>
              <Grid container direction='column' alignItems='center'>
                <Button
                  variant='outlined'
                  size='small'
                  onClick={handleCheckedRight}
                  disabled={leftChecked.length === 0}
                  aria-label='move selected right'
                >
                  &gt;
                </Button>
                <Button
                  variant='outlined'
                  size='small'
                  onClick={handleCheckedLeft}
                  disabled={rightChecked.length === 0}
                  aria-label='move selected left'
                >
                  &lt;
                </Button>
              </Grid>
            </Grid>
            <Grid item xs>
              {customList('Choices', right)}
            </Grid>
          </Grid>
        </div>
        <div>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper className='paper-content'>
                <TableHead>
                  <TableRow>
                    <TableCell className='border-icon' />
                    <TableCell className='border-table'>
                      <b>Partida</b>
                    </TableCell>
                    <TableCell className='border-table'>
                      <b>Up</b>
                    </TableCell>
                    <TableCell className='border-table'>
                      <b>Rubro</b>
                    </TableCell>
                    <TableCell className='border-table'>
                      <b>Municipio</b>
                    </TableCell>
                    <TableCell className='border-table'>
                      <b>Area</b>
                    </TableCell>
                    <TableCell className='border-table'>
                      <b>Importe</b>
                    </TableCell>
                    <TableCell className='border-table'>
                      <b>Iva</b>
                    </TableCell>
                    <TableCell className='border-table'>
                      <b>Isr</b>
                    </TableCell>
                    <TableCell className='border-table'>
                      <b>Total</b>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableRow className='table-row-c'>
                  {this.state.presupuesto.map(item =>
                    <div>
                    {this.state.search === item.ogasto && this.state.search2 === item.up && this.state.search3 === item.rubro ?
                      <TableCell className='border-icon'>
                        <IconButton size='small' className='border-des' onClick={this.update}>
                          <AddIcon />
                        </IconButton>
                      </TableCell> : null
                    }
                    </div>
                  )}
                  <TableCell className='border-table'>
                    <select
                      className='select-compro'
                      name='partida'
                      ref='partida'
                      value={this.state.search}
                      onChange={this.updateSeacrh.bind(this)}
                      required
                    >
                      {this.partida.map((x,y) =>
                        <option name={y}>{x}</option>
                      )}
                    </select>
                  </TableCell>
                  <TableCell className='border-table'>
                    <select
                      className='select-compro'
                      name='presupuestal'
                      ref='presupuestal'
                      value={this.state.search2}
                      onChange={this.updateSeacrh2.bind(this)}
                      required
                    >
                      {this.up.map((x,y) =>
                        <option name={y}>{x}</option>
                      )}
                    </select>
                  </TableCell>
                  <TableCell className='border-table'>
                    <select
                      className='select-compro'
                      name='rubro'
                      ref='rubro'
                      value={this.state.search3}
                      onChange={this.updateSeacrh3.bind(this)}
                      required
                    >
                      {this.rubro.map((x,y) =>
                        <option name={y}>{x}</option>
                      )}
                    </select>
                  </TableCell>
                  <TableCell className='border-table'>
                    <select
                      className='select-compro'
                      name='municipio'
                      ref='municipio'
                      value={this.state.search4}
                      onChange={this.updateSeacrh3.bind(this)}
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
                      value={this.state.search5}
                      onChange={this.updateSeacrh3.bind(this)}
                      required
                    >
                      {this.area.map((x,y) =>
                        <option name={y}>{x}</option>
                      )}
                    </select>
                  </TableCell>
                  <TableCell className='border-table'>
                    <CurrencyFormat
                      value={0}
                      displayType='text'
                      prefix=' $ '
                      thousandSeparator
                      decimalSeparator='.'
                    />
                  </TableCell>
                  <TableCell className='border-table'>
                    <CurrencyFormat
                      value={0}
                      displayType='text'
                      prefix=' $ '
                      thousandSeparator
                      decimalSeparator='.'
                    />
                  </TableCell>
                  <TableCell className='border-table'>
                    <CurrencyFormat
                      value={0}
                      displayType='text'
                      prefix=' $ '
                      thousandSeparator
                      decimalSeparator='.'
                    />
                  </TableCell>
                  <TableCell className='border-table'>
                    <CurrencyFormat
                      value={0}
                      displayType='text'
                      prefix=' $ '
                      thousandSeparator
                      decimalSeparator='.'
                    />
                  </TableCell>
                </TableRow>
                <TableRow className='table-row-c'>
                  <TableCell className='border-icon'>
                    <IconButton size='small' className='border-des'>
                      <CheckIcon style={{ color: 'green', cursor: 'auto' }}/>
                    </IconButton>
                  </TableCell>
                  <TableCell className='border-table'>211002</TableCell>
                  <TableCell className='border-table'>13</TableCell>
                  <TableCell className='border-table'>9513578</TableCell>
                  <TableCell className='border-table'>Pachuca</TableCell>
                  <TableCell className='border-table'>Informatica</TableCell>
                  <TableCell className='border-table'>$ 1500.00</TableCell>
                  <TableCell className='border-table'>$ 20.00</TableCell>
                  <TableCell className='border-table'>$ 0.00</TableCell>
                  <TableCell className='border-table'>$ 1520.00</TableCell>
                </TableRow>
              </Paper>
            </Grid>
          </Grid>
        </div>
      </div>
    )
  }
}
