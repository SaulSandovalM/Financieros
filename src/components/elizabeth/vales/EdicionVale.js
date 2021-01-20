import React, { Component } from 'react'
import firebase from '../../../Firebase'
import './Vales.css'
import ReactToPrint from 'react-to-print'
import logovale from '../../../img/logovale.png'
import logoh from '../../../img/logoh.png'
import ListEdit from './ListEdit'

export default class EdicionVale extends Component {
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
      estatus: ''
    }
  }

  handleChange (event) {
    this.setState({ [event.target.name]: event.target.value })
  }

  componentDidMount () {
    const itemsRef = firebase.database().ref('vales/')
    this.listenForItems(itemsRef)
  }

  listenForItems = (itemsRef) => {
    itemsRef.on('value', (snap) => {
      var lista = []
      snap.forEach((child) => {
        lista.push({
          vale: child.val().vale.toString(),
          cheque: child.val().cheque,
          cantidad: child.val().cantidad,
          cantidadc: child.val().cantidadc,
          cantidadr: child.val().cantidadr,
          reembolso: child.val().reembolso,
          concepto: child.val().concepto,
          oficioS: child.val().oficioS,
          area: child.val().area,
          turno: child.val().turno,
          personaR: child.val().personaR,
          estatus: child.val().estatus,
          factura: child.val().factura,
          recibos: child.val().recibos,
          sc: child.val().sc,
          fecha: child.val().fecha,
          autorizo: child.val().autorizo,
          done: child.val().done,
          id: child.key
        })
        console.log(lista)
      })
      this.setState({
        lista: lista
      })
    })
  }

  update = (item) => {
    let updates = {}
    updates['vales/' + item.id] = {
      // filexml: item.filexml,
      // filefactura: item.filefactura,
      // filerecibo: item.filerecibo,
      area: this.inputArea.value,
      autorizo: this.inputAutorizo.value,
      cantidad: this.inputCantidad.value,
      cantidadc: this.inputCantidadc.value,
      cantidadr: this.inputCantidadr.value,
      cheque: this.inputCheque.value,
      concepto: this.inputConcepto.value,
      estatus: item.estatus,
      factura: this.inputFactura.value,
      fecha: this.inputFecha.value,
      oficioS: this.inputOficio.value,
      personaR: this.inputPersona.value,
      recibos: this.inputRecibos.value,
      sc: this.inputSC.value,
      turno: this.inputTurno.value,
      vale: this.inputVale.value
    }
    firebase.database().ref().update(updates)
    alert('Tu solicitud fue enviada.')
  }


  render () {
    return (
      <div className='container-back-v' style={{ paddingTop: '100px' }}>
        <form>
          <div className='margin-vale'>
            <div className='vale-title-container' style={{ marginTop: '80px' }}>
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
                    className='input-che'
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
                    className='input-che'
                    id='vale'
                    required
                    name='vale'
                    onChange={this.handleChange.bind(this)}
                    value={this.state.vale}
                    ref={vale => this.inputVale = vale}
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
                      className='input-w'
                      required
                      name='area'
                      ref={area => this.inputArea = area}>
                      <option id='area'>Procuraduría General de Justicia</option>
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
                      <option id='area'> - Dirección de Cordinacion de Calidad</option>
                      <option id='area'> - Dirección de Archivo</option>
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
                <input
                  type='date'
                  className='b-fecha-i'
                  name='fecha'
                  value={this.state.fecha}
                  onChange={this.handleChange.bind(this)}
                  required
                  ref={fecha => this.inputFecha = fecha}
                />
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
                  requiredr
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
        </form>
        <ListEdit
          lista={this.state.lista}
          update={this.update}
        />
      </div>
    )
  }
}
