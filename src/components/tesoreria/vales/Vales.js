import React, { Component } from 'react'
import firebase from '../../../Firebase'
import './Vales.css'
import ReactToPrint from 'react-to-print'
import logovale from '../../../img/logovale.png'
import logoh from '../../../img/logoh.png'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'

export default class Vales extends Component {
  constructor (props) {
    super(props)
    this.unsubscribe = null
    this.state = {
      vales: [
        {
          id: 1,
          name: 'preuba',
          done: false
        }
      ],
      form: [],
      alert: false,
      alertData: {},
      vale: '',
      cheque: '',
      cantidad: '',
      cantidadc: '',
      cantidadr: '',
      concepto: '',
      oficioS: '',
      area: '',
      turno: '',
      personaR: '',
      factura: '',
      recibos: '',
      sc: ' ',
      fecha: '',
      autorizo: '',
      estatus: 'Pendiente',
      contador: {},
      contadorc: {},
      searchF: '',
      fechaP: '',
      fechaF: '',
      filexml: ['No hay datos cargados'],
      filex: ['No hay datos cargados'],
      filefactura: ['No hay datos cargados'],
      filef: ['No hay datos cargados'],
      recibosList: ['No hay datos cargados'],
      rein: ''
    }
  }

  handleChange (event) {
    this.setState({ [event.target.name]: event.target.value })
  }

  change = (e) => {
    const { name, value } = e.target
    this.setState({ [name]: value })
  }

  componentDidMount () {
    this.unsubscribe = firebase.firestore().collection('caja').onSnapshot(this.onCollectionUpdate)
    this.consumo()
    this.consumoc()
    const itemsRef = firebase.database().ref('vales/')
    this.listenForItems(itemsRef)
    var today = new Date()
    var today2 = new Date()
    var meses = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
    var meses2 = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']
    var f = new Date()
    today = f.getDate() + '-' + meses[f.getMonth()] + '-' + f.getFullYear()
    today2 = f.getFullYear() + '-' + meses2[f.getMonth()] + '-' + ('0' + f.getDate()).slice(-2)
    this.setState({
      fechaF: today
    })
    this.setState({
      fecha: today2
    })
  }

  componentWillMount () {
    firebase.database().ref('vales/').on('child_added', snapshot => {
      this.setState({
        vales: this.state.vales.concat(snapshot.val())
      })
    })
  }

  listenForItems = (itemsRef) => {
    itemsRef.on('value', (snap) => {
      var vales = []
      snap.forEach((child) => {
        vales.push({
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
          filefactura: child.val().filefactura,
          filef: child.val().filef,
          recibosList: child.val().recibosList,
          fechaP: child.val().fechaP,
          id: child.key
        })
      })
      this.setState({
        vales: vales
      })
    })
  }

  consumo = () => {
    const ref = firebase.firestore().collection('vales').doc('--stats--')
    ref.get().then((doc) => {
      if (doc.exists) {
        this.setState({
          contador: doc.data(),
          key: doc.id,
          isLoading: false
        })
      } else {
        console.log('No hay Documento')
      }
    })
  }

  onCollectionUpdate = (querySnapshot) => {
    const movimientos = []
    querySnapshot.forEach((doc) => {
      const { title, no, personaR, cantidad, fecha } = doc.data()
      movimientos.push({
        key: doc.id,
        doc,
        title,
        no,
        personaR,
        cantidad,
        fecha
      })
    })
    this.setState({
      movimientos
   })
  }

  consumoc = () => {
    const ref = firebase.firestore().collection('caja').doc('--stats--')
    ref.get().then((doc) => {
      if (doc.exists) {
        this.setState({
          contadorc: doc.data(),
          key: doc.id,
          isLoading: false
        })
      } else {
        console.log('No hay nada!')
      }
    })
  }

  sendMessage () {
    const params = {
      cheque: this.inputCheque.value,
      vale: this.state.contador.storyCount,
      cantidad: this.inputCantidad.value,
      cantidadc: this.inputCantidadc.value,
      cantidadr: this.inputCantidadr.value,
      concepto: this.inputConcepto.value,
      oficioS: this.inputOficio.value,
      area: this.inputArea.value,
      turno: this.inputTurno.value,
      factura: this.inputFactura.value,
      recibos: this.inputRecibos.value,
      sc: this.inputSC.value,
      fecha: this.state.fecha,
      fechaF: this.state.fechaF,
      autorizo: this.inputAutorizo.value,
      personaR: this.inputPersona.value,
      estatus: this.state.estatus,
      filefactura: this.state.filefactura,
      filef: this.state.filef,
      recibosList: this.state.recibosList
    }
    this.setState({
      vale: this.state.contador.storyCount,
      cheque: '',
      cantidad: '',
      cantidadc: '',
      cantidadr: '',
      concepto: '',
      oficioS: '',
      area: '',
      turno: '',
      personaR: '',
      factura: '',
      recibos: '',
      sc: '',
      fecha: this.state.fecha,
      fechaF: this.state.fechaF,
      autorizo: this.inputAutorizo.value,
      estatus: this.state.estatus
    })
    if (params.vale && params.cheque && params.cantidad && params.cantidadc &&
        params.cantidadr && params.concepto && params.oficioS && params.area &&
        params.turno && params.factura && params.recibos && params.sc &&
        params.autorizo && params.personaR && params.estatus && params.fecha && params.fechaF) {
      var f = parseInt(params.cantidadc)
      const statsRef = firebase.firestore().collection('caja').doc('--stats--')
      const increment = firebase.firestore.FieldValue.increment(-f)
      const batch = firebase.firestore().batch()
      const storyRef = firebase.firestore().collection('caja').doc(`${Math.random()}`)
      batch.set(storyRef, { title: 'Se Genero Un Vale # ', no: params.vale, personaR: params.personaR, cantidad: '-' + f, fecha: params.fecha })
      batch.set(statsRef, { storyCount: increment }, { merge: true })
      batch.commit()
      const statsRefs = firebase.firestore().collection('vales').doc('--stats--')
      const increments = firebase.firestore.FieldValue.increment(1)
      const batchs = firebase.firestore().batch()
      const storyRefs = firebase.firestore().collection('vales').doc(`${Math.random()}`)
      batchs.set(storyRefs, { title: 'Vale ', no: params.vale, personaR: params.personaR, cantidad: '-' + f })
      batchs.set(statsRefs, { storyCount: increments }, { merge: true })
      batchs.commit()
      firebase.database().ref('vales').push(params).then(() => {
        alert('Tu solicitud fue enviada.')
      }).catch(() => {
        alert('Tu solicitud no puede ser enviada')
      })
      setInterval(this.resetForm, 1000)
      setInterval(this.consumo, 1000)
    } else {
      alert('Por favor llene el formulario')
    }
  }

  update = (item) => {
    let updates = {}
    updates['vales/' + item.id] = {
      cheque: this.state.cheque ? this.state.cheque : item.cheque,
      vale: item.vale,
      cantidad: this.state.cantidad ? this.state.cantidad : item.cantidad,
      cantidadc: this.state.cantidadc ? this.state.cantidadc : item.cantidadc,
      cantidadr: this.state.cantidadr ? this.state.cantidadr : item.cantidadr,
      concepto: this.state.concepto ? this.state.concepto : item.concepto,
      oficioS: this.state.oficioS ? this.state.oficioS : item.oficioS,
      area: this.state.area ? this.state.area : item.area,
      turno: this.state.turno ? this.state.turno : item.turno,
      factura: this.state.factura ? this.state.factura : item.factura,
      recibos: this.state.recibos ? this.state.recibos : item.recibos,
      sc: this.state.sc ? this.state.sc : item.sc,
      fecha: item.fecha,
      fechaF: item.fechaF,
      autorizo: this.state.autorizo ? this.state.autorizo : item.autorizo,
      personaR: this.state.personaR ? this.state.personaR : item.personaR,
      estatus: item.estatus,
      filefactura: this.state.filefactura ? item.filefactura : this.state.filefactura,
      filef: this.state.filef ? this.state.filef : item.filef ,
      recibosList: this.state.recibosList ? item.recibosList : this.state.recibosList ,
      fechaP: this.state.fechaP,
      rein: this.state.rein
    }
    this.setState({
      fechaP: ''
    })
    firebase.database().ref().update(updates)
    alert('Tu solicitud fue enviada.')
  }

  cancel = (item) => {
    let updates = {}
    updates['vales/' + item.id] = {
      cheque: 'Cancelado',
      vale: item.vale,
      cantidad: 0,
      cantidadc: 0,
      cantidadr: 0,
      concepto: '',
      oficioS: '',
      area: '',
      turno: '',
      factura: '',
      recibos: '',
      sc: '',
      fecha: item.fecha,
      fechaF: item.fechaF,
      autorizo: this.state.autorizo ? this.state.autorizo : item.autorizo,
      personaR: this.state.personaR ? this.state.personaR : item.personaR,
      estatus: 'Cancelado',
      filexml: '',
      filex: '',
      filefactura: '',
      filef: '',
      recibosList: '',
      fechaP: ''
    }
    this.setState({
      fechaP: ''
    })
    firebase.database().ref().update(updates)
    alert('El cheque fue cancelado.')
  }

  render () {
    return (
      <div className='container-back-v'>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Grid className='grid-w-c'>
            <Grid className='grid-w2' style={{ marginTop: '100px' }}>
              <Paper className='paper-p-c'>
                <div>
                  <p className='sub-c-p'>Ingrese el Numero de Vale a buscar</p>
                  <input
                    style={{ width: '100%' }}
                    className='field'
                    name='searchF'
                    value={this.state.searchF}
                    onChange={this.handleChange.bind(this)}
                  />
                </div>
                <div style={{ width: '50%' }}>
                {this.state.vales.map(item =>
                  <div style={{ width: '100%' }}>
                    {parseInt(this.state.searchF) === item.vale &&
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div style={{ width: '46%' }}>
                          <p className='sub-c-p'>Ingrese la Fecha de Rein/Reem</p>
                          <input
                            type='date'
                            style={{ width: '100%' }}
                            id='rein'
                            className='field'
                            name='rein'
                            onChange={this.handleChange.bind(this)}
                            defaultValue={item.rein}
                          />
                        </div>
                        <div style={{ width: '46%' }}>
                          <p className='sub-c-p'>Ingrese la Fecha de Pago</p>
                          <input
                            type='date'
                            style={{ width: '100%' }}
                            id='fechaP'
                            className='field'
                            name='fechaP'
                            onChange={this.handleChange.bind(this)}
                            defaultValue={item.fechaP}
                          />
                        </div>
                      </div>
                    }
                  </div>
                )}
                </div>
              </Paper>
            </Grid>
          </Grid>
        </div>
        {this.state.searchF === '' &&
          <form onSubmit={this.sendMessage.bind(this)}>
            <div style={{ marginTop: '80px' }} ref={el => (this.vale = el)}>
              <div className='margin-vales'>
                <div className='vale-title-container'>
                  <div className='vale-logo-container'>
                    <img className='logovale' src={logovale} alt='' />
                  </div>
                  <div className='vale-title-content'>
                    <p className='p-vale'>PROCURADURIA GENERAL DE JUSTICIA</p>
                    <p className='p-vale'>DIRECCION GENERAL DE ADMINISTRACION Y FINANZAS</p>
                    <p className='p-vale'>DIRECCION DE RECURSOS FINANCIEROS</p>
                  </div>
                  <div className='vale-num-container'>
                    <img className='logovale' src={logoh} alt='' />
                  </div>
                </div>
                <div className='no-cv'>
                  <div className='cv'>
                    <p className='p-cv'>
                      No. Cheque:
                      <input
                        className='input-ches'
                        id='cheque'
                        required
                        name='cheque'
                        onChange={this.handleChange.bind(this)}
                        value={this.state.cheque}
                        ref={cheque => this.inputCheque = cheque}
                      />
                    </p>
                    <p className='p-cv'>
                      No. Vale:
                      <input
                        className='input-ches'
                        id='vale'
                        required
                        ref={vale => this.inputVale = vale}
                        value={this.state.contador.storyCount}
                      />
                    </p>
                  </div>
                </div>
                <div className='vale-pro-content'>
                  <p className='p-vp'>VALE PROVISIONAL DE CAJA</p>
                </div>
                <div className='space-v' />
                <div className='mcc-content'>
                  <div className='v-m'>
                    <p className='pmcc'>MOVIMIENTO</p>
                    <p className='p-bv'>
                      Autorizado
                    </p>
                    <p className='p-bv'>
                      Comprobado
                    </p>
                    <p className='p-bv'>
                      Reintegro/Reembolso
                    </p>
                  </div>
                  <div className='v-c'>
                    <p className='pmcc'>CANTIDAD</p>
                    <input
                      className='input-b'
                      name='cantidad'
                      type='number'
                      onChange={this.handleChange.bind(this)}
                      value={this.state.cantidad}
                      required
                      ref={cantidad => this.inputCantidad = cantidad}
                    />
                    <input
                      className='input-b'
                      name='cantidadc'
                      type='number'
                      onChange={this.handleChange.bind(this)}
                      value={this.state.cantidadc}
                      required
                      ref={cantidadc => this.inputCantidadc = cantidadc}
                    />
                    <input
                      className='input-b'
                      name='cantidadr'
                      type='number'
                      onChange={this.handleChange.bind(this)}
                      value={this.state.cantidadr}
                      required
                      ref={cantidadr => this.inputCantidadr = cantidadr}
                    />
                  </div>
                  <div className='v-con'>
                    <p className='pmcc'>CONCEPTO</p>
                    <textarea
                      className='input-b-c'
                      name='concepto'
                      onChange={this.handleChange.bind(this)}
                      value={this.state.concepto}
                      required
                      ref={concepto => this.inputConcepto = concepto}
                    />
                    <div className='oat-content'>
                      <div className='o-w'>
                        <p className='p-oat'>Oficio Solicitud</p>
                        <input
                          className='input-w'
                          name='oficioS'
                          onChange={this.handleChange.bind(this)}
                          value={this.state.oficioS}
                          required
                          ref={oficioS => this.inputOficio = oficioS}
                        />
                      </div>
                      <div className='a-w'>
                        <p className='p-oat'>Área</p>
                        <select
                          className='input-w'
                          required
                          name='area'
                          id='area'
                          defaultValue={this.state.area}
                          onChange={this.handleChange.bind(this)}
                          ref={area => this.inputArea = area}
                        >
                          <option id='area'>{this.state.area}</option>
                          <option id='area'>Despacho del Procurador</option>
                          <option id='area'>Subprocuraduría de Procedimientos Penales Región Oriente</option>
                          <option id='area'>Fiscalía Especializada para la atención de Delitos cometidos contra la Libertad de Expresión</option>
                          <option id='area'>Periodistas y Personas defensoras de los Derechos Humanos</option>
                          <option id='area'>Dirección General para la Atención de los Asuntos del Sistema Tradicional</option>
                          <option id='area'>Fiscalia de Delitos Electorales</option>
                          <option id='area'>Subprocuraduría de Derechos Humanos y Servicios a la Comunidad</option>
                          <option id='area'>Centro de Justicia Restaurativa Penal Poniente</option>
                          <option id='area'>Fiscalía para la Atención de Delitos de Género</option>
                          <option id='area'>Visitaduría General</option>
                          <option id='area'>Dirección General de Servicios Periciales</option>
                          <option id='area'>Centro de Operación Estratégica</option>
                          <option id='area'>Unidad Especializada en el Combate al Secuestro</option>
                          <option id='area'>Dirección General de Administración y Finanzas</option>
                          <option id='area'> - Dirección de Planeacion</option>
                          <option id='area'> - Dirección de Control y Validación</option>
                          <option id='area'> - Dirección de Informatica, Estadistica y Telecomunicaciones</option>
                          <option id='area'> - Dirección de Recursos Materiales</option>
                          <option id='area'> - Dirección de Recursos Humanos</option>
                          <option id='area'> - Dirección de Recursos Financieros</option>
                          <option id='area'> - Dirección de Enlace FASP</option>
                          <option id='area'> - Dirección de Coordinacion de Calidad</option>
                          <option id='area'> - Dirección de Archivo</option>
                          <option id='area'> - Oficialia de Partes</option>
                          <option id='area'>Fiscalía Especializada para la atención de los Delitos de Trata de Personas</option>
                          <option id='area'>Subprocuraduría de Procedimientos Penales Región Poniente</option>
                          <option id='area'>Centro de Atención Temprana Poniente</option>
                          <option id='area'>Dirección General de Investigación y Litigación Poniente</option>
                          <option id='area'>Dirección General de la Policía Investigadora</option>
                          <option id='area'>Centro de Atención Temprana Oriente</option>
                          <option id='area'>Centro de Justicia Restaurativa Penal Oriente</option>
                          <option id='area'>Dirección General de Investigación y Litigación Oriente</option>
                          <option id='area'>Dirección General de Recursos Materiales y Servicios</option>
                          <option id='area'>Fiscalía Especializada en Delitos de Corrupción</option>
                          <option id='area'>Fiscalía Especializada en Materia de Desaparición Forzada de Personas</option>
                        </select>
                      </div>
                      <div className='t-w'>
                        <p className='p-oat'>Turno</p>
                        <input
                          className='input-w'
                          name='turno'
                          onChange={this.handleChange.bind(this)}
                          value={this.state.turno}
                          required
                          ref={turno => this.inputTurno = turno}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className='frsr-end'>
                  <div className='frsr-w'>
                    <div className='div-4'>
                      <div className='frsr-w-b'>
                        <p className='p-oat'>Facturas</p>
                        <input
                          className='input-w'
                          name='factura'
                          onChange={this.handleChange.bind(this)}
                          value={this.state.factura}
                          ref={factura => this.inputFactura = factura}
                        />
                      </div>
                      <div className='frsr-w-b' style={{borderLeft: '0px'}}>
                        <p className='p-oat'>Recibos</p>
                        <input
                          className='input-w'
                          name='recibos'
                          onChange={this.handleChange.bind(this)}
                          value={this.state.recibos}
                          ref={recibos => this.inputRecibos = recibos}
                        />
                      </div>
                    </div>
                    <div className='div-4'>
                      <div className='frsr-w-b'>
                        <p className='p-oat'>S/C</p>
                        <input
                          className='input-w'
                          name='sc'
                          onChange={this.handleChange.bind(this)}
                          value={this.state.sc}
                          ref={sc => this.inputSC = sc}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className='firma-content'>
                  <div className='f-fecha'>
                    <p className='b-fecha-i' style={{ fontSize: '15px' }}>{this.state.fechaF}</p>
                    <p className='font-size-f'>Fecha</p>
                  </div>
                  <div className='f-fecha'>
                    <select
                      className='b-auto'
                      ref={autorizo => this.inputAutorizo = autorizo}>
                      <option id='autorizo'>L.C Nayra Ruiz Laguna</option>
                      <option id='autorizo'>Mtro.León Maximiliano Hernández Valdés</option>
                    </select>
                    <p className='font-size-f'>Autorizó</p>
                  </div>
                  <div className='f-fecha'>
                    <input
                      className='b-fecha-i'
                      name='personaR'
                      onChange={this.handleChange.bind(this)}
                      value={this.state.personaR}
                      required
                      ref={personaR => this.inputPersona = personaR}
                    />
                    <p className='font-size-f'>Recibió</p>
                  </div>
                </div>
                <div className='last'>
                  Me comprometo a entregar la comprobación que ampara el presente
                  vale en un plazo no mayor  a 5 dias habiles posteriores a la fecha
                  de recibido, de lo contrario reintegraré el recurso por la cantidad
                  sin comprobar.
                </div>
              </div>
            </div>
            {/*this.state.cantidad < this.state.contadorc.storyCount ?*/}
              <div className='boton-va'>
                <ReactToPrint
                  trigger={() => <Button variant='contained' style={{ background: 'green', color: 'white' }}>Guardar e Imprimir</Button>}
                  content={() => this.vale}
                  onAfterPrint={this.sendMessage.bind(this)}
                />
              </div>
              {/*:
              <div className='boton-v'>
                <p className='no-cant'>La cantidad es mayor a la disponible</p>
              </div>
            */}
          </form>
        }
        <div style={{ background: '#f4f4f4', zIndex: '50' }}>
          {this.state.vales.map(item =>
          <div>
            {parseInt(this.state.searchF) === item.vale &&
            <form onSubmit={this.sendMessage.bind(this)}>
              <div style={{ marginTop: '80px' }} ref={el => (this.vale = el)}>
                <div className='margin-vales'>
                  <div className='vale-title-container'>
                    <div className='vale-logo-container'>
                      <img className='logovale' src={logovale} alt='' />
                    </div>
                    <div className='vale-title-content'>
                      <p className='p-vale'>PROCURADURIA GENERAL DE JUSTICIA</p>
                      <p className='p-vale'>DIRECCION GENERAL DE ADMINISTRACION Y FINANZAS</p>
                      <p className='p-vale'>DIRECCION DE RECURSOS FINANCIEROS</p>
                    </div>
                    <div className='vale-num-container'>
                      <img className='logovale' src={logoh} alt='' />
                    </div>
                  </div>
                  <div className='no-cv'>
                    <div className='cv'>
                      <p className='p-cv'>
                        No. Cheque:
                        <input
                          className='input-ches'
                          id='cheque'
                          required
                          name='cheque'
                          onChange={this.handleChange.bind(this)}
                          defaultValue={item.cheque}
                        />
                      </p>
                      <p className='p-cv'>
                        No. Vale:
                        <input
                          className='input-ches'
                          id='vale'
                          required
                          value={item.vale}
                        />
                      </p>
                    </div>
                  </div>
                  <div className='vale-pro-content'>
                    <p className='p-vp'>VALE PROVISIONAL DE CAJA</p>
                  </div>
                  <div className='space-v' />
                  <div className='mcc-content'>
                    <div className='v-m'>
                      <p className='pmcc'>MOVIMIENTO</p>
                      <p className='p-bv'>
                        Autorizado
                      </p>
                      <p className='p-bv'>
                        Comprobado
                      </p>
                      <p className='p-bv'>
                        Reintegro/Reembolso
                      </p>
                    </div>
                    <div className='v-c'>
                      <p className='pmcc'>CANTIDAD</p>
                      <input
                        className='input-b'
                        name='cantidad'
                        type='number'
                        onChange={this.handleChange.bind(this)}
                        defaultValue={item.cantidad}
                        required
                      />
                      <input
                        className='input-b'
                        id='cantidadc'
                        type='number'
                        name='cantidadc'
                        onChange={this.handleChange.bind(this)}
                        defaultValue={item.cantidadc}
                        required
                      />
                      <input
                        className='input-b'
                        id='cantidadr'
                        type='number'
                        name='cantidadr'
                        onChange={this.handleChange.bind(this)}
                        defaultValue={item.cantidadr}
                        required
                      />
                    </div>
                    <div className='v-con'>
                      <p className='pmcc'>CONCEPTO</p>
                      <textarea
                        className='input-b-c'
                        id='concepto'
                        name='concepto'
                        onChange={this.handleChange.bind(this)}
                        defaultValue={item.concepto}
                        required
                      />
                      <div className='oat-content'>
                        <div className='o-w'>
                          <p className='p-oat'>Oficio Solicitud</p>
                          <input
                            className='input-w'
                            id='oficioS'
                            name='oficioS'
                            onChange={this.handleChange.bind(this)}
                            defaultValue={item.oficioS}
                            required
                          />
                        </div>
                        <div className='a-w'>
                          <p className='p-oat'>Área</p>
                          <select
                            className='input-w'
                            required
                            defaultValue={item.area}
                            id='area'
                            onChange={this.handleChange.bind(this)}
                            name='area'
                          >
                            <option id='area'>Despacho del Procurador</option>
                            <option id='area'>Subprocuraduría de Procedimientos Penales Región Oriente</option>
                            <option id='area'>Fiscalía Especializada para la atención de Delitos cometidos contra la Libertad de Expresión</option>
                            <option id='area'>Periodistas y Personas defensoras de los Derechos Humanos</option>
                            <option id='area'>Dirección General para la Atención de los Asuntos del Sistema Tradicional</option>
                            <option id='area'>Fiscalia de Delitos Electorales</option>
                            <option id='area'>Subprocuraduría de Derechos Humanos y Servicios a la Comunidad</option>
                            <option id='area'>Centro de Justicia Restaurativa Penal Poniente</option>
                            <option id='area'>Fiscalía para la Atención de Delitos de Género</option>
                            <option id='area'>Visitaduría General</option>
                            <option id='area'>Dirección General de Servicios Periciales</option>
                            <option id='area'>Centro de Operación Estratégica</option>
                            <option id='area'>Unidad Especializada en el Combate al Secuestro</option>
                            <option id='area'>Dirección General de Administración y Finanzas</option>
                            <option id='area'> - Dirección de Planeacion</option>
                            <option id='area'> - Dirección de Control y Validación</option>
                            <option id='area'> - Dirección de Informatica, Estadistica y Telecomunicaciones</option>
                            <option id='area'> - Dirección de Recursos Materiales</option>
                            <option id='area'> - Dirección de Recursos Humanos</option>
                            <option id='area'> - Dirección de Recursos Financieros</option>
                            <option id='area'> - Dirección de Enlace FASP</option>
                            <option id='area'> - Dirección de Coordinacion de Calidad</option>
                            <option id='area'> - Dirección de Archivo</option>
                            <option id='area'> - Oficialia de Partes</option>
                            <option id='area'>Fiscalía Especializada para la atención de los Delitos de Trata de Personas</option>
                            <option id='area'>Subprocuraduría de Procedimientos Penales Región Poniente</option>
                            <option id='area'>Centro de Atención Temprana Poniente</option>
                            <option id='area'>Dirección General de Investigación y Litigación Poniente</option>
                            <option id='area'>Dirección General de la Policía Investigadora</option>
                            <option id='area'>Centro de Atención Temprana Oriente</option>
                            <option id='area'>Centro de Justicia Restaurativa Penal Oriente</option>
                            <option id='area'>Dirección General de Investigación y Litigación Oriente</option>
                            <option id='area'>Dirección General de Recursos Materiales y Servicios</option>
                            <option id='area'>Fiscalía Especializada en Delitos de Corrupción</option>
                            <option id='area'>Fiscalía Especializada en Materia de Desaparición Forzada de Personas</option>
                          </select>
                        </div>
                        <div className='t-w'>
                          <p className='p-oat'>Turno</p>
                          <input
                            className='input-w'
                            id='turno'
                            name='turno'
                            onChange={this.handleChange.bind(this)}
                            defaultValue={item.turno}
                            required
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='frsr-end'>
                    <div className='frsr-w'>
                      <div className='div-4'>
                        <div className='frsr-w-b'>
                          <p className='p-oat'>Facturas</p>
                          <input
                            className='input-w'
                            id='factura'
                            name='factura'
                            onChange={this.handleChange.bind(this)}
                            defaultValue={item.factura}
                          />
                        </div>
                        <div className='frsr-w-b' style={{borderLeft: '0px'}}>
                          <p className='p-oat'>Recibos</p>
                          <input
                            className='input-w'
                            id='recibos'
                            name='recibos'
                            onChange={this.handleChange.bind(this)}
                            defaultValue={item.recibos}
                          />
                        </div>
                      </div>
                      <div className='div-4'>
                        <div className='frsr-w-b'>
                          <p className='p-oat'>S/C</p>
                          <input
                            className='input-w'
                            id='sc'
                            name='sc'
                            onChange={this.handleChange.bind(this)}
                            defaultValue={item.sc}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='firma-content'>
                    <div className='f-fecha'>
                      <p className='b-fecha-i' style={{ fontSize: '15px' }}>{item.fechaF}</p>
                      <p className='font-size-f'>Fecha</p>
                    </div>
                    <div className='f-fecha'>
                      <select
                        className='b-auto'
                        id='autorizo'
                        name='autorizo'
                        onChange={this.handleChange.bind(this)}
                        defaultValue={item.autorizo}>
                        <option id='autorizo'>L.C Nayra Ruiz Laguna</option>
                        <option id='autorizo'>Mtro.León Maximiliano Hernández Valdés</option>
                      </select>
                      <p className='font-size-f'>Autorizó</p>
                    </div>
                    <div className='f-fecha'>
                      <input
                        className='b-fecha-i'
                        id='personaR'
                        name='personaR'
                        onChange={this.handleChange.bind(this)}
                        defaultValue={item.personaR}
                        required
                      />
                      <p className='font-size-f'>Recibió</p>
                    </div>
                  </div>
                  <div className='last'>
                    Me comprometo a entregar la comprobación que ampara el presente
                    vale en un plazo no mayor  a 5 dias habiles posteriores a la fecha
                    de recibido, de lo contrario reintegraré el recurso por la cantidad
                    sin comprobar.
                  </div>
                </div>
              </div>
              {/*this.state.cantidad < this.state.contadorc.storyCount ?*/}
                <div className='boton-va'>
                  <ReactToPrint
                    trigger={() => <Button variant='contained' color='primary'>Actualizar e Imprimir</Button>}
                    content={() => this.vale}
                    onAfterPrint={() => this.update(item)}
                  />
                  <Button
                    variant='contained'
                    color='primary'
                    style={{ background: 'red', color: 'white' }}
                    onClick={() => this.cancel(item)}
                  >Cancelar</Button>
                  {/*<ReactToPrint
                    trigger={() => <Button variant='contained' style={{ background: 'green', color: 'white' }}>Guardar e Imprimir</Button>}
                    content={() => this.vale}
                    onAfterPrint={this.sendMessage.bind(this)}
                  />*/}
                </div>
                {/*:
                <div className='boton-v'>
                  <p className='no-cant'>La cantidad es mayor a la disponible</p>
                </div>
              */}
            </form>
            }
            </div>
          )}
        </div>
      </div>
    )
  }
}
