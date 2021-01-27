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
      lista: [
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
      isHidden: true,
      searchF: '',
      fechaP: ''
    }
  }

  toggleHidden () {
    this.setState({
      isHidden: !this.state.isHidden
    })
  }

  handleChange (event) {
    this.setState({ [event.target.name]: event.target.value })
  }

  componentDidMount () {
    this.unsubscribe = firebase.firestore().collection('caja').onSnapshot(this.onCollectionUpdate)
    this.consumo()
    this.consumoc()
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

  resetForm () {
    this.refs.contactForm.reset()
  }

  sendMessage () {
    const params = {
      vale: this.state.contador.storyCount,
      numVale: String(this.state.contador.storyCount),
      cheque: this.inputCheque.value,
      cantidad: this.inputCantidad.value,
      cantidadc: this.inputCantidadc.value,
      cantidadr: this.inputCantidadr.value,
      concepto: this.inputConcepto.value,
      oficioS: this.inputOficio.value,
      area: this.inputArea.value,
      turno: this.inputTurno.value,
      personaR: this.inputPersona.value,
      factura: this.inputFactura.value,
      recibos: this.inputRecibos.value,
      sc: this.inputSC.value,
      fecha: this.state.fecha,
      autorizo: this.inputAutorizo.value,
      estatus: this.state.estatus
    }
    this.setState({
      vale: this.state.contador.storyCount,
      cheque: this.inputCheque.value,
      cantidad: this.inputCantidad.value,
      cantidadc: this.inputCantidadc.value,
      cantidadr: this.inputCantidadr.value,
      concepto: this.inputConcepto.value,
      oficioS: this.inputOficio.value,
      area: this.inputArea.value,
      turno: this.inputTurno.value,
      personaR: this.inputPersona.value,
      factura: this.inputFactura.value,
      recibos: this.inputRecibos.value,
      sc: this.inputSC.value,
      fecha: this.state.fecha,
      autorizo: this.inputAutorizo.value,
      estatus: this.state.estatus
    })
    if (params.vale && params.cheque && params.cantidad && params.cantidadc &&
        params.cantidadr && params.concepto && params.oficioS && params.area &&
        params.turno && params.factura && params.recibos && params.sc &&
        params.autorizo && params.personaR && params.estatus && params.fecha &&
        params.numVale) {
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
      this.resetForm()
      setInterval(this.consumo, 1000)
    } else {
      alert('Por favor llene el formulario')
    }
  }

  render () {
    var today = new Date()
    var today2 = new Date()
    var meses = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
    var meses2 = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']
    var f = new Date()
    today = f.getDate() + '-' + meses[f.getMonth()] + '-' + f.getFullYear()
    today2 = f.getFullYear() + '-' + meses2[f.getMonth()] + '-' + f.getDate()
    this.state.fecha = today2

    return (
      <div className='container-back-v'>
        <form onSubmit={this.sendMessage.bind(this)} ref='contactForm'>
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
                  <div>
                    <p className='sub-c-p'>Ingrese el Fecha de Pago</p>
                    <input
                      style={{ width: '100%' }}
                      className='field'
                      name='fechaP'
                      value={this.state.fechaP}
                      onChange={this.handleChange.bind(this)}
                    />
                  </div>
                </Paper>
              </Grid>
            </Grid>
          </div>
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
                    onChange={this.handleChange.bind(this)}
                    value={this.state.cantidad}
                    required
                    ref={cantidad => this.inputCantidad = cantidad}
                  />
                  <input
                    className='input-b'
                    name='cantidadc'
                    onChange={this.handleChange.bind(this)}
                    value={this.state.cantidadc}
                    required
                    ref={cantidadc => this.inputCantidadc = cantidadc}
                  />
                  <input
                    className='input-b'
                    name='cantidadr'
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
                        className='input-w' required
                        ref={area => this.inputArea = area}>
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
                  <p className='b-fecha-i' style={{ fontSize: '15px' }}>{today}</p>
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
            <div className='boton-v'>
              <ReactToPrint
                trigger={() => <Button type='submit' variant='contained' style={{ background: 'green', color: 'white' }}>Imprimir y Guardar</Button>}
                content={() => this.vale}
                onAfterPrint={this.sendMessage.bind(this)}
              />
              <Button type='submit' variant='contained' color='primary'>
                Actualizar
              </Button>
              <Button type='submit' variant='contained' color='primary'>
                Imprimir
              </Button>
            </div>
            {/*:
            <div className='boton-v'>
              <p className='no-cant'>La cantidad es mayor a la disponible</p>
            </div>
          */}
        </form>
      </div>
    )
  }
}
