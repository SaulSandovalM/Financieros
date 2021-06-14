import React, { Component } from 'react'
import './Oficios.css'
import ReactToPrint from 'react-to-print'
import firebase from '../../../Firebase'
import { NumberAsString } from '../fondos/NumerosLetras'
import logo2 from '../../../img/logo.jpg'
import lpgjh from '../../../img/logo-PGJH.jpg'
// import sus from '../../../img/veda.png'
import CurrencyFormat from 'react-currency-format'
import Popup from 'reactjs-popup'

export default class Oficios extends Component {
  constructor (props) {
    super(props)
    var URLactual = window.location
    this.unsubscribe = null
    this.state = {
      fondo: {},
      comprometidos: [
        {
          id: 1,
          name: 'prueba',
          done: false
        }
      ],
      importe: '',
      no_oficio: '',
      up: '',
      desc: '',
      urlfire: String(URLactual).substr(-20),
      mostrar: false,
      fondos: [],
      nombre: ''
    }
  }

  listenFondo = (itemsRefFondo) => {
    itemsRefFondo.on('value', (snap) => {
      const firebasedata = snap.val()
      this.setState({
        fondo: firebasedata
      })
    })
  }

  listenComprometidos = (itemsRefComprometidos) => {
    itemsRefComprometidos.on('value', (snap) => {
      const firebasedata = snap.val()
      this.setState({
        comprometidos: firebasedata
      })
    })
  }

  componentDidMount () {
    const itemsRefFondo = firebase.database().ref(`fondos/${this.state.urlfire}`)
    this.listenFondo(itemsRefFondo)
    const itemsRefComprometidos = firebase.database().ref(`fondos/${this.state.urlfire}/comprometido`)
    this.listenComprometidos(itemsRefComprometidos)
    const itemsRef = firebase.database().ref(`/fondos/${this.state.urlfire}`)
    this.listenForItems(itemsRef)
  }

  listenForItems = (itemsRef) => {
    itemsRef.on('value', (snap) => {
      var fondos = []
      fondos.push({
        fondo: snap.val().fondo,
        fecha: snap.val().fecha,
        tipo_doc: snap.val().tipo_doc,
        oficio_aut: snap.val().oficio_aut,
        no_oficio: snap.val().no_oficio,
        importe: snap.val().importe,
        beneficiario: snap.val().beneficiario,
        desc: snap.val().desc,
        no_proyecto: snap.val().no_proyecto,
        numCompro: snap.val().numCompro,
        realizo: snap.val().realizo,
        no_lici: snap.val().no_lici,
        requisicion: snap.val().requisicion,
        pedido: snap.val().pedido,
        poliza: snap.val().poliza,
        cfe: snap.val().cfe,
        nscfe: snap.val().nscfe,
        observaciones: snap.val().observaciones,
        comprometido: snap.val().comprometido,
        cpa: snap.val().cpa,
        numCheque: snap.val().numCheque,
        fechaContra: snap.val().fechaContra,
        numContra: snap.val().numContra,
        fechaDepo: snap.val().fechaDepo,
        cuentaPagar: snap.val().cuentaPagar,
        cuentaPagarPara: snap.val().cuentaPagarPara,
        sujetoContable: snap.val().sujetoContable,
        id: snap.key
      })
      this.setState({
        fondos: fondos
      })
    })
  }

  render () {
    var today = new Date()
    var meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
    var diasSemana = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']
    var f = new Date()
    today = diasSemana[f.getDay()] + ', ' + f.getDate() + ' de ' + meses[f.getMonth()] + ' de ' + f.getFullYear()
    const totalImporte = []
    this.state.comprometidos.map(comprometidos => (
      comprometidos ?
        totalImporte.push(parseFloat(comprometidos.total))
      : null
    ))
    const totalRetencion = []
    this.state.comprometidos.map(comprometidos => (
      comprometidos ?
        totalRetencion.push(parseFloat(comprometidos.isr))
      : null
    ))
    const reducer = (a, b) => a + b
    var cad = []
    var proyectof = []
    let noProyect = this.state.no_proyecto
    for (var i in noProyect) {
      cad.push( String(noProyect[i]) )
      let proyect = String(cad[i])
      var proy = proyect.split(' ')[0]
      proyectof.push(proy)
    }

    var prueba = new Array(20)
    for (let i = parseInt(this.state.comprometidos.length); i < 20; i++) {
      prueba[i] = i
    }

    var nombreDesa = this.state.comprometidos.map(comprometidos => comprometidos.up)

    const total1 = [0]
    this.state.comprometidos.map(item =>
      item.total !== undefined ?
        total1.push(parseFloat(item.total))
      : null
    )
    const tt = (a, b) => a + b
    var ttotal = total1.reduce(tt).toFixed(2)

    // consumo de numero de comprobantes
    const compro = [0]
    this.state.comprometidos.map(item => item.comprobantes !== undefined ? compro.push(item.comprobantes.length) : null)
    const numcom = (a, b) => a + b
    var finalC = compro.reduce(numcom)

    return (
      <div className='oficios-container'>
        <div className='oficios-section-content'>
          {this.state.fondo.tipo_doc === 'Fondo Revolvente' && this.state.fondo.no_lici === ' ' &&
            <div className='m-f'>
              <p><b>Fondo Revolvente</b></p>
              <div>
                <p>Solicitud Programatica</p>
                <ReactToPrint
                  trigger={() => <buttom className='btn-imp-of'>Imprimir</buttom>}
                  content={() => this.sp}
                />
              </div>
              <div>
                <p>Reembolso de FR</p>
                <ReactToPrint
                  trigger={() => <buttom className='btn-imp-of'>Imprimir</buttom>}
                  content={() => this.rfr}
                />
              </div>
              <div>
                <p>Recibo Global</p>
                <ReactToPrint
                  trigger={() => <buttom className='btn-imp-of'>Imprimir</buttom>}
                  content={() => this.rec}
                />
              </div>
              <div>
                <p>Formato E</p>
                <ReactToPrint
                  trigger={() => <buttom className='btn-imp-of'>Imprimir</buttom>}
                  content={() => this.la}
                />
              </div>
              <div>
                <p>Anexo F</p>
                <ReactToPrint
                  trigger={() => <buttom className='btn-imp-of'>Imprimir</buttom>}
                  content={() => this.anex}
                />
              </div>
            </div>
          }
          {this.state.fondo.no_lici !== ' ' &&
            <div className='m-f'>
              <p><b>Pago Provedor por Requisición</b></p>
              <div>
                <p>Solicitud Programatica</p>
                <ReactToPrint
                  trigger={() => <buttom className='btn-imp-of'>Imprimir</buttom>}
                  content={() => this.sp}
                />
              </div>
              <div>
                <p>Solicitud de PPR</p>
                <ReactToPrint
                  trigger={() => <buttom className='btn-imp-of'>Imprimir</buttom>}
                  content={() => this.ofi}
                />
              </div>
              <div>
                <p>Formato E</p>
                <ReactToPrint
                  trigger={() => <buttom className='btn-imp-of'>Imprimir</buttom>}
                  content={() => this.la}
                />
              </div>
              <div>
                <p>Anexo F</p>
                <ReactToPrint
                  trigger={() => <buttom className='btn-imp-of'>Imprimir</buttom>}
                  content={() => this.anex}
                />
              </div>
            </div>
          }
          {this.state.fondo.tipo_doc === 'Pago Directo' && this.state.fondo.no_lici === ' ' &&
            <div className='m-f'>
              <p><b>Pago Proveedor</b></p>
              <div>
                <p>Oficio Pago Proveedor</p>
                <ReactToPrint
                  trigger={() => <buttom className='btn-imp-of'>Imprimir</buttom>}
                  content={() => this.opp}
                />
              </div>
              <div>
                <p>Solicitud Programatica</p>
                <ReactToPrint
                  trigger={() => <buttom className='btn-imp-of'>Imprimir</buttom>}
                  content={() => this.sp}
                />
              </div>
              <div>
                <p>Formato E</p>
                <ReactToPrint
                  trigger={() => <buttom className='btn-imp-of'>Imprimir</buttom>}
                  content={() => this.la}
                />
                <Popup
                    trigger={<buttom className='btn-imp-of'>Imprimir</buttom>}
                    modal
                    style={{ height: '500px' }}
                    closeOnDocumentClick>
                    <div style={{ height: '100%', overflow: 'scroll' }}>
                      <ReactToPrint
                        trigger={() =>
                          <div className='c-b-i'>
                            <buttom className='btn-imp-of'>Imprimir</buttom>
                          </div>
                          }
                        content={() => this.la}
                      />
                      <div className='formatoe-container' ref={el => (this.la = el)}>
                        {this.state.comprometidos.map(comprometidos =>
                          comprometidos.up ?
                            <div className='lll'>
                              <div className='lll-content'>
                                <div className='title-ga'>
                                  <div className='ofie-img1'>
                                    <img className='pgjh' src={lpgjh} alt='' style={{ width: 'auto' }} />
                                  </div>
                                  <div className='ofie-text'>
                                    <p className='text-titulo-ga'>PROCURADURÍA GENERAL DE JUSTICA DE HIDALGO</p>
                                    <p className='text-titulo-ga'>{comprometidos.area}</p>
                                    <p className='text-titulo-ga'>{comprometidos.partida}</p>
                                  </div>
                                  <div className='ofie-img-cont'>
                                    <div className='ofie-img2'>
                                      <img className='img2' src={logo2} alt='' />
                                    </div>
                                  </div>
                                </div>
                                <div className='faderinpo'>
                                  <div className='contenedor-ga'>
                                    <div className='contenedor-1'>
                                      <div className='interno-ga2'>
                                        <p className='text-gai'>Gasto a Comprobar</p>
                                        <input className='input-gai' type='checkbox' disabled />
                                      </div>
                                      <div className='interno-ga2'>
                                        <p className='text-gai'>Comprobacion de Gastos</p>
                                        <input className='input-gai' type='checkbox' disabled />
                                      </div>
                                      <div className='interno-ga2'>
                                        <p className='text-gai'>Validación de Objeto de Gastos</p>
                                        <input className='input-gai' type='checkbox' disabled />
                                      </div>
                                      <div className='interno-ga2'>
                                        <p className='text-gai'>Transferencia</p>
                                        <input className='input-gai' type='checkbox' disabled />
                                      </div>
                                    </div>
                                    <div className='contenedor-1'>
                                      <div className='interno-ga2'>
                                        <p className='text-gai'>Creación de Fondo Revolvente</p>
                                        <input className='input-gai' type='checkbox' disabled />
                                      </div>
                                      <div className='interno-ga2'>
                                        <p className='text-gai'>Fondo Revolvente</p>
                                        <input className='input-gai' type='checkbox' disabled />
                                      </div>
                                      <div className='interno-ga2'>
                                        <p className='text-gai'>Cancelacion de Fondo Revolvente</p>
                                        <input className='input-gai' type='checkbox' disabled />
                                      </div>
                                    </div>
                                    <div className='contenedor-1'>
                                      <div className='interno-ga2'>
                                        <p className='text-gai'>Viaticos Anticipados</p>
                                        <input className='input-gai' type='checkbox' disabled />
                                      </div>
                                      <div className='interno-ga2'>
                                        <p className='text-gai'>Viaticos Devengados</p>
                                        <input className='input-gai' type='checkbox' disabled />
                                      </div>
                                      <div className='interno-ga2'>
                                        <p className='text-gai'>Viaticos al Extranjero</p>
                                        <input className='input-gai' type='checkbox' disabled />
                                      </div>
                                      <div className='interno-ga2'>
                                        <p className='text-gai'>Comprobación de Viáticos</p>
                                        <input className='input-gai' type='checkbox' disabled />
                                      </div>
                                    </div>
                                    <div className='contenedor-1'>
                                      <div className='interno-ga2'>
                                        <p className='text-gai'>Anticipo a Proveedor</p>
                                        <input className='input-gai' type='checkbox' disabled />
                                      </div>
                                      <div className='interno-ga2'>
                                        <p className='text-gai'>Remanente de Pago a Proveedor</p>
                                        <input className='input-gai' type='checkbox' disabled />
                                      </div>
                                      <div className='interno-ga2'>
                                        <p className='text-gai'>Pago a Proveedor</p>
                                        <input className='input-gai' type='checkbox' checked />
                                      </div>
                                      <div className='interno-ga2'>
                                        <p className='text-gai'>Anticipo de Pago a Proveedor por Requisición</p>
                                        <input className='input-gai' type='checkbox' disabled />
                                      </div>
                                      <div className='interno-ga2'>
                                        <p className='text-gai'>Remanente de Pago a Proveedor por Requisición</p>
                                        <input className='input-gai' type='checkbox' disabled />
                                      </div>
                                      <div className='interno-ga2'>
                                        <p className='text-gai'>Proveedor por Requisición</p>
                                        <input className='input-gai' type='checkbox' disabled />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div>
                                  <div>
                                    <div className='ofie-header-blue'>
                                      <div className='alltabla-ga ga1'>
                                        Folio de factura
                                      </div>
                                      <div className='alltabla-ga ga2'>
                                        Importe
                                      </div>
                                      <div className='alltabla-ga ga3'>
                                        Leyenda alusiva al gasto
                                      </div>
                                    </div>
                                    {comprometidos.comprobantes !== undefined ?
                                      <div>
                                        {comprometidos.comprobantes.map(item =>
                                          <div className='ofie-comprobantes-conta'>
                                            <div className='ofie-header-blue'>
                                              <div className='all-tab-f all-tab-of1'>
                                                {item.uuid}
                                              </div>
                                              <div className='all-tab-f all-tab-of2'>
                                                <CurrencyFormat
                                                  style={{ fontSize: '12px' }}
                                                  value={(parseFloat(item.total) + parseFloat(item.isr)).toFixed(2)}
                                                  displayType='text'
                                                  thousandSeparator
                                                  prefix=' $ '
                                                />
                                              </div>
                                                <input
                                                  className='all-tab-f all-tab-of3'
                                                  name='descripcion'
                                                  value='perro'
                                                />
                                            </div>
                                          </div>
                                        )}
                                      </div>
                                    : null}
                                    <div className='ofie-total-cont'>
                                      <div className='all-tab-f2 all-tab-of1' style={{ textAlign: 'right' }}>
                                        TOTAL:
                                      </div>
                                      <div className='all-tab-f2 all-tab-of2'>
                                        {comprometidos.isr === '0.00' ?
                                          <CurrencyFormat
                                            style={{ fontSize: '12px' }}
                                            value={comprometidos.total}
                                            displayType='text'
                                            thousandSeparator
                                            prefix=' $ '
                                          />
                                          : null
                                        }
                                        {comprometidos.isr !== '0.00' && comprometidos.isr ?
                                          <CurrencyFormat
                                            style={{ fontSize: '12px' }}
                                            value={(parseFloat(totalImporte) + parseFloat(totalRetencion)).toFixed(2)}
                                            displayType='text'
                                            thousandSeparator
                                            prefix=' $ '
                                          />
                                          : null
                                        }
                                      </div>
                                      <div className='all-tab-f2 all-tab-of3'
                                        style={{
                                          borderRight: '1px solid white',
                                          borderBottom: '1px solid white'
                                        }}
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          : null
                        )}
                      </div>
                    </div>
                  </Popup>
              </div>
              <div>
                <p>Anexo F</p>
                <ReactToPrint
                  trigger={() => <buttom className='btn-imp-of'>Imprimir</buttom>}
                  content={() => this.anex}
                />
              </div>
            </div>
          }
        </div>

        {/* Formato E */}
        {/* <div className='formatoe-container' ref={el => (this.la = el)}>
          {this.state.comprometidos.map(comprometidos =>
            comprometidos.up ?
              <div className='lll'>
                <div className='lll-content'>
                  <div className='title-ga'>
                    <div className='ofie-img1'>
                      <img className='pgjh' src={lpgjh} alt='' style={{ width: 'auto' }} />
                    </div>
                    <div className='ofie-text'>
                      <p className='text-titulo-ga'>PROCURADURÍA GENERAL DE JUSTICA DE HIDALGO</p>
                      <p className='text-titulo-ga'>{comprometidos.area}</p>
                      <p className='text-titulo-ga'>{comprometidos.partida}</p>
                    </div>
                    <div className='ofie-img-cont'>
                      <div className='ofie-img2'>
                        <img className='img2' src={logo2} alt='' />
                      </div>
                    </div>
                  </div>
                  <div className='faderinpo'>
                    <div className='contenedor-ga'>
                      <div className='contenedor-1'>
                        <div className='interno-ga2'>
                          <p className='text-gai'>Gasto a Comprobar</p>
                          <input className='input-gai' type='checkbox' disabled />
                        </div>
                        <div className='interno-ga2'>
                          <p className='text-gai'>Comprobacion de Gastos</p>
                          <input className='input-gai' type='checkbox' disabled />
                        </div>
                        <div className='interno-ga2'>
                          <p className='text-gai'>Validación de Objeto de Gastos</p>
                          <input className='input-gai' type='checkbox' disabled />
                        </div>
                        <div className='interno-ga2'>
                          <p className='text-gai'>Transferencia</p>
                          <input className='input-gai' type='checkbox' disabled />
                        </div>
                      </div>
                      <div className='contenedor-1'>
                        <div className='interno-ga2'>
                          <p className='text-gai'>Creación de Fondo Revolvente</p>
                          <input className='input-gai' type='checkbox' disabled />
                        </div>
                        <div className='interno-ga2'>
                          <p className='text-gai'>Fondo Revolvente</p>
                          <input className='input-gai' type='checkbox' disabled />
                        </div>
                        <div className='interno-ga2'>
                          <p className='text-gai'>Cancelacion de Fondo Revolvente</p>
                          <input className='input-gai' type='checkbox' disabled />
                        </div>
                      </div>
                      <div className='contenedor-1'>
                        <div className='interno-ga2'>
                          <p className='text-gai'>Viaticos Anticipados</p>
                          <input className='input-gai' type='checkbox' disabled />
                        </div>
                        <div className='interno-ga2'>
                          <p className='text-gai'>Viaticos Devengados</p>
                          <input className='input-gai' type='checkbox' disabled />
                        </div>
                        <div className='interno-ga2'>
                          <p className='text-gai'>Viaticos al Extranjero</p>
                          <input className='input-gai' type='checkbox' disabled />
                        </div>
                        <div className='interno-ga2'>
                          <p className='text-gai'>Comprobación de Viáticos</p>
                          <input className='input-gai' type='checkbox' disabled />
                        </div>
                      </div>
                      <div className='contenedor-1'>
                        <div className='interno-ga2'>
                          <p className='text-gai'>Anticipo a Proveedor</p>
                          <input className='input-gai' type='checkbox' disabled />
                        </div>
                        <div className='interno-ga2'>
                          <p className='text-gai'>Remanente de Pago a Proveedor</p>
                          <input className='input-gai' type='checkbox' disabled />
                        </div>
                        <div className='interno-ga2'>
                          <p className='text-gai'>Pago a Proveedor</p>
                          <input className='input-gai' type='checkbox' checked />
                        </div>
                        <div className='interno-ga2'>
                          <p className='text-gai'>Anticipo de Pago a Proveedor por Requisición</p>
                          <input className='input-gai' type='checkbox' disabled />
                        </div>
                        <div className='interno-ga2'>
                          <p className='text-gai'>Remanente de Pago a Proveedor por Requisición</p>
                          <input className='input-gai' type='checkbox' disabled />
                        </div>
                        <div className='interno-ga2'>
                          <p className='text-gai'>Proveedor por Requisición</p>
                          <input className='input-gai' type='checkbox' disabled />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div>
                      <div className='ofie-header-blue'>
                        <div className='alltabla-ga ga1'>
                          Folio de factura
                        </div>
                        <div className='alltabla-ga ga2'>
                          Importe
                        </div>
                        <div className='alltabla-ga ga3'>
                          Leyenda alusiva al gasto
                        </div>
                      </div>
                      {comprometidos.comprobantes !== undefined ?
                        <div>
                          {comprometidos.comprobantes.map(item =>
                            <div className='ofie-comprobantes-conta'>
                              <div className='ofie-header-blue'>
                                <div className='all-tab-f all-tab-of1'>
                                  {item.uuid}
                                </div>
                                <div className='all-tab-f all-tab-of2'>
                                  <CurrencyFormat
                                    style={{ fontSize: '12px' }}
                                    value={(parseFloat(item.total) + parseFloat(item.isr)).toFixed(2)}
                                    displayType='text'
                                    thousandSeparator
                                    prefix=' $ '
                                  />
                                </div>
                                <div className='all-tab-f all-tab-of3'>
                                  {item.descripcion}
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      : null}
                      <div className='ofie-total-cont'>
                        <div className='all-tab-f2 all-tab-of1' style={{ textAlign: 'right' }}>
                          TOTAL:
                        </div>
                        <div className='all-tab-f2 all-tab-of2'>
                          {comprometidos.isr === '0.00' ?
                            <CurrencyFormat
                              style={{ fontSize: '12px' }}
                              value={comprometidos.total}
                              displayType='text'
                              thousandSeparator
                              prefix=' $ '
                            />
                            : null
                          }
                          {comprometidos.isr !== '0.00' && comprometidos.isr ?
                            <CurrencyFormat
                              style={{ fontSize: '12px' }}
                              value={(parseFloat(totalImporte) + parseFloat(totalRetencion)).toFixed(2)}
                              displayType='text'
                              thousandSeparator
                              prefix=' $ '
                            />
                            : null
                          }
                        </div>
                        <div className='all-tab-f2 all-tab-of3'
                          style={{
                            borderRight: '1px solid white',
                            borderBottom: '1px solid white'
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            : null
          )}
        </div> */}

        {/* fondo revolvente */}
        <div className='pppdf-subdad' ref={el => (this.rfr = el)}>
          <div className='header-ofi'>
            <div className='header-ofi-cont'>
              <div className='sp-cont'>
                <img className='pgjh comple' src={lpgjh} alt='' />
              </div>
              <img className='img-sp' src={logo2} alt='' />
            </div>
          </div>
          <div className='sp-direc'>
            <p>Dirección General de Administracción y Finanzas</p>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'column', width: '100%', height: '75%' }}>
            <div>
              <div className='no-oficio-sp'>
                <p>
                  Oficio No: PGJ/DGAyF/{this.state.fondo.no_oficio}/2021
                  <br />Pachuca de Soto, Hidalgo a {today}
                  <br />Asunto: Reembolso de Fondo Revolvente
                </p>
              </div>
              <div className='prensente-sp'>
                <p>
                  <b>
                    L.A.E. CÉSAR ALBERTO GONZÁLEZ LÓPEZ
                    <br />SUBSECRETARIO DE EGRESOS DE LA
                    <br />SECRETARÍA DE FIANAZAS PÚBLICAS
                    <br />PRESENTE
                  </b>
                </p>
              </div>
              <div className='añadido-sp'>
                <p>
                  <b>
                    AT´N.: L.C.P. KARINA BARRIOS VELÁZQUEZ
                    <br />DIRECTORA GENERAL DE CONTABILIDAD
                    <br />GUBERNAMENTAL
                  </b>
                </p>
              </div>
              <div className='texto-ofi-sp'>
                <p>
                  Por medio del presente me permito enviar a usted, documentación amparada
                  con {finalC} comprobantes, por un total de
                  <CurrencyFormat value={ttotal} displayType='text' thousandSeparator prefix=' $ ' /> ({(NumberAsString(ttotal))}),
                  con una retención por <CurrencyFormat value={(totalRetencion.reduce(reducer)).toFixed(2)} displayType='text' thousandSeparator prefix=' $ ' /> para
                  un importe total a pagar de <CurrencyFormat value={parseFloat(ttotal) - (totalRetencion.reduce(reducer)).toFixed(2)} displayType='text' thousandSeparator prefix=' $ ' /> para
                  el trámite de Reembolso de Fondo Revolvente, con cargo al
                  proyecto{this.state.comprometidos.map(item => item.proy ? ', ' + item.proy : null)}
                  {this.state.comprometidos.map(item => item.np ? ', ' + item.np : null)} otorgado
                  en el oficio de autorización {this.state.fondo.oficio_aut} del
                  Ejercicio 2021, a la Procuraduria General de Justicia del estado de Hidalgo.
                </p>
                <p>Sin otro particular, le envío un cordial y afectuoso saludo.</p>
              </div>
            </div>
            <div>
              <div className='atte-sp'>
                <p className='atte-text-sp'>
                  <b>ATENTAMENTE<br />EL DIRECTOR GENERAL</b>
                </p>
              </div>
              <div className='firma-sp'>
                <div className='firma-raya-sp'>
                  <p><b>MTRO. LEÓN MAXIMILIANO HERNÁNDEZ VALDÉS</b></p>
                </div>
              </div>
            </div>
          </div>
          <div className='footer-sp'>
            <div className='footer-content-sp'>
              <div>
                <p className='foot-text'>C.C.P...- Expediente<br />Minutario<br />LMHV/NRL/macht</p>
              </div>
              <div className='foot-num'>
                <p className='foot-num-t'>No. de Fondo {this.state.fondo.fondo}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Recibo */}
        <div className='pppdf-subdad' ref={el => (this.rec = el)}>
          <div className='header-ofi'>
            <div className='header-ofi-cont'>
              <div className='sp-cont'>
                <img className='pgjh comple' src={lpgjh} alt='' />
              </div>
              <img className='img-sp' src={logo2} alt='' />
            </div>
          </div>
          <div className='sp-direc'>
            <p>Dirección General de Administracción y Finanzas</p>
          </div>
          <div style={{ height: '75%', display: 'flex', flexDirection: 'column' }}>
            <div style={{ height: '100%', display: 'flex', justifyContent: 'space-between', flexDirection: 'column' }}>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <p>RECIBO</p>
              </div>
              <div className='bueno' style={{ paddingTop: '0' }}>
                <p className='texto-de-pdf'>
                  Bueno por:
                  <CurrencyFormat
                    value={this.state.fondo.importe}
                    displayType='text'
                    thousandSeparator
                    prefix=' $ '
                  />
                </p>
              </div>
              <div>
                <p className='texto-de-pdf' style={{ textAlign: 'justify', lineHeight: '35px' }}>
                  Recibí de la Secretaría de Finanzas Públicas del Gobierno del Estado
                  de Hidalgo la cantidad de
                  <CurrencyFormat
                    value={ttotal}
                    displayType='text'
                    thousandSeparator
                    prefix=' $ '
                  /> ({( NumberAsString(ttotal) )})
                  por concepto de Reposición de Fondo Revolvente, que se aplicarán
                  en {this.state.fondo.desc}
                </p>
              </div>
              <div className='fecha'>
                <p className='texto-de-pdf'>
                  Pachuca de Soto, Hidalgo a {today}
                </p>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ bottom: '0' }}>
                  <div className='refe'>
                    <p className='texto-de-pdf'>
                      DIRECTOR GENERAL DE<br />ADMINISTRACIÓN Y FINANZAS
                    </p>
                  </div>
                  <div className='firma-dad-r'>
                    <div className='firma-raya-r'>
                      <p className='texto-de-pdf' style={{ textAlign: 'center' }}>
                        MTRO. LEÓN MAXIMILIANO HERNÁNDEZ VALDÉS<br />R.F.C.: HEVL-750104
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div style={{ bottom: '0', position: 'fixed', height: '100px', width: '80%' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'row' }}>
                  <p style={{ color: 'black', fontSize: '12px' }} />
                  <div style={{ display: 'flex', justifyContent: 'flex-end', flexDirection: 'column' }}>
                    <p style={{ fontSize: '12px' }}>No. de Fondo {this.state.fondo.fondo}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Pago Provedor por Requisición */}
        <div className='pppdf-subdad' ref={el => (this.ofi = el)}>
          <div className='header-ofi'>
            <div className='header-ofi-cont'>
              <div className='sp-cont'>
                <img className='pgjh comple' src={lpgjh} alt='' />
              </div>
              <img className='img-sp' src={logo2} alt='' />
            </div>
          </div>
          <div className='sp-direc'>
            <p>Dirección General de Administracción y Finanzas</p>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'column', width: '100%', height: '75%' }}>
            <div>
              <div className='no-oficio-sp'>
                <p>
                  Oficio No: PGJ/DGAyF/{this.state.fondo.no_oficio}/2021
                  <br />Pachuca de Soto, Hidalgo a {today}
                  <br />Asunto Pago a Proveedor
                </p>
              </div>
              <div className='prensente-sp'>
                <p>
                  <b>
                    L.A.E. CÉSAR ALBERTO GONZÁLEZ LÓPEZ
                    <br />SUBSCRETARIO DE EGRESOS DE LA
                    <br />SECRETARÍA DE FINANZAS PÚBLICAS
                    <br />PRESENTE
                  </b>
                </p>
              </div>
              <div className='añadido-sp'>
                <p>
                  <b>
                    AT´N.: L.C.P. KARINA BARRIOS VELÁZQUEZ
                    <br />DIRECTORA GENERAL DE CONTABILIDAD
                    <br />GUBERNAMENTAL
                  </b>
                </p>
              </div>
              <div className='texto-ofi-sp'>
                <p>
                  Por medio de presente me permito enviar a Usted documentación por
                  un importe total de <CurrencyFormat
                    value={this.state.fondo.importe}
                    displayType='text'
                    thousandSeparator
                    prefix=' $ '
                  /> ({(NumberAsString(this.state.fondo.importe))}),
                  cantidad amparada con CFDI No
                  {this.state.comprometidos.map(comprometidos =>
                    comprometidos.comprobantes !== undefined ?
                      comprometidos.comprobantes.map(item =>
                        ', ' + item.uuid.slice(31)
                      )
                    : null
                  )},
                  número de requisición {this.state.fondo.requisicion}
                  asi como la poliza de afectacion presupuestal al momento del comprometido
                  num {this.state.fondo.poliza} que emita la Dirección
                  General de Compras Publicas; para que se efectue el tramite de pago
                  a favor del proveedor {this.state.fondo.beneficiario} para la compra
                  y/o prestación de servicios
                  {/* preguntar */}
                  con cargo al proyecto {this.state.comprometidos.map(item => item.proy ? ', ' + item.proy : null)} y
                  a los recursos otorgados con oficio de autorización {this.state.fondo.oficio_aut}
                  del Ejercicio 2021, a la Procuraduria General de Justicia del Estado.
                </p>
                <p>Sin otro particular, le envio un cordial y afectuoso saludo.</p>
              </div>
            </div>
            <div>
              <div className='atte-sp'>
                <p className='atte-text-sp'>
                  <b>ATENTAMENTE<br />EL DIRECTOR GENERAL</b>
                </p>
              </div>
              <div className='firma-sp'>
                <div className='firma-raya-sp'>
                  <p><b>MTRO. LEÓN MAXIMILIANO HERNÁNDEZ VALDÉS</b></p>
                </div>
              </div>
            </div>
          </div>
          <div className='footer-sp'>
            <div className='footer-content-sp'>
              <div>
                <p className='foot-text'>C.C.P...- Expediente<br />Minutario<br />LMHV/NRL/macht</p>
              </div>
              <div className='foot-num'>
                <p className='foot-num-t'>No. de Fondo {this.state.fondo.fondo}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Pago Provedor */}
        <div className='pppdf-subdad' ref={el => (this.opp = el)}>
          <div className='header-ofi'>
            <div className='header-ofi-cont'>
              <div className='sp-cont'>
                <img className='pgjh comple' src={lpgjh} alt='' />
              </div>
              <img className='img-sp' src={logo2} alt='' />
            </div>
          </div>
          <div className='sp-direc'>
            <p>Dirección General de Administracción y Finanzas</p>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'column', width: '100%', height: '75%' }}>
            <div>
              <div className='no-oficio-sp'>
                <p>
                  Oficio No: PGJ/DGAyF/{this.state.fondo.no_oficio}/2021
                  <br />Pachuca de Soto, Hidalgo a {today}
                  <br />Asunto Pago a Proveedor
                </p>
              </div>
              <div className='prensente-sp'>
                <p>
                  <b>
                    L.A.E. CÉSAR ALBERTO GONZÁLEZ LÓPEZ
                    <br />SUBSCRETARIO DE EGRESOS DE LA
                    <br />SECRETARÍA DE FINANZAS PÚBLICAS
                    <br />PRESENTE
                  </b>
                </p>
              </div>
              <div className='añadido-sp'>
                <p>
                  <b>
                    AT´N.: L.C.P. KARINA BARRIOS VELÁZQUEZ
                    <br />Directora General de Contabilidad
                    <br />DIRECTORA GENERAL DE CONTABILIDADental
                    <br />GUBERNAMENTAL
                  </b>
                </p>
              </div>
              <div className='texto-ofi-sp'>
                <p>
                  Por este medio me permito enviar a Usted documentación por un importe total de
                  <CurrencyFormat
                    value={parseFloat(this.state.fondo.importe).toFixed(2)}
                    displayType='text'
                    thousandSeparator
                    prefix=' $ '
                  /> ({(NumberAsString(this.state.fondo.importe))}),
                  cantidad amparada con los comprobantes No
                  {this.state.comprometidos.map(comprometidos =>
                    comprometidos.comprobantes !== undefined ?
                      comprometidos.comprobantes.map(item =>
                        ', ' + item.uuid.substr(0, 8)
                      )
                    : null
                  )}, para el trámite de pago a favor del proveedor {this.state.fondo.beneficiario}, por
                  la/el servicio {this.state.fondo.desc}, con
                  cargo al proyecto{this.state.comprometidos.map(item => item.proy ? ', ' + item.proy : null)}
                  {this.state.comprometidos.slice(0, 2).map(item => item.np ? ', ' + item.np : null)} y
                  a los recursos otorgados con el oficio de autorización {this.state.fondo.oficio_aut}, del
                  Ejercicio 2021 a la Procuraduria General de Justicia del Estado de Hidalgo.
                </p>
                <p>Sin otro particular, le envio un cordial y afectuoso saludo.</p>
              </div>
            </div>
            <div>
              <div className='atte-sp'>
                <p className='atte-text-sp'>
                  <b>ATENTAMENTE<br />EL DIRECTOR GENERAL</b>
                </p>
              </div>
              <div className='firma-sp'>
                <div className='firma-raya-sp'>
                  <p><b>MTRO. LEÓN MAXIMILIANO HERNÁNDEZ VALDÉS</b></p>
                </div>
              </div>
            </div>
          </div>
          <div className='footer-sp'>
            <div className='footer-content-sp'>
              <div>
                <p className='foot-text'>C.C.P...- Expediente<br />Minutario<br />LMHV/NRL/macht</p>
              </div>
              <div className='foot-num'>
                <p className='foot-num-t'>No. de Fondo {this.state.fondo.fondo}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Solicitud Programatica */}
        <div className='sp-container' ref={el => (this.sp = el)}>
          <div className='sp-imgs'>
            <div className='title-so-o'>
              <img className='pgjh' src={lpgjh} alt='' style={{ width: 'auto' }} />
              <p>SOLICITUD PROGRAMÁTICA DEL GASTO</p>
              <img className='ims' src={logo2} alt='' />
            </div>
          </div>
          <div className='fadera'>
            <div className='contenedor-soi'>
              <div className='contenedor-1'>
                <div className='interno'>
                  <p className='text-soi'>Gastos a Comprobar</p>
                  <input className='input-so' type='checkbox' />
                </div>
                <div className='interno'>
                  <p className='text-soi'>Comprobación de Gastos</p>
                  <input className='input-so' type='checkbox' />
                </div>
                <div className='interno'>
                  <p className='text-soi'>Validación del Objeto del Gasto</p>
                  <input className='input-so' type='checkbox' />
                </div>
                <div className='interno'>
                  <p className='text-soi'>Transferencias</p>
                  <input className='input-so' type='checkbox' />
                </div>
              </div>
              <div className='contenedor-1'>
                <div className='interno'>
                  <p className='text-soi'>Creación de Fondo Revolvente</p>
                  <input className='input-so' type='checkbox' />
                </div>
                <div className='interno'>
                  <p className='text-soi'>Fondo Revolvente</p>
                  {this.state.fondo.tipo_doc === 'Fondo Revolvente' ?
                    <input className='input-so' type='checkbox' checked /> :
                    <input className='input-so' type='checkbox' />
                  }
                </div>
                <div className='interno'>
                  <p className='text-soi'>Cancelacion de Fondo Revolvente</p>
                  <input className='input-so' type='checkbox' />
                </div>
              </div>
              <div className='contenedor-1'>
                <div className='interno'>
                  <p className='text-soi'>Viaticos Anticipados</p>
                  <input className='input-so' type='checkbox' />
                </div>
                <div className='interno'>
                  <p className='text-soi'>Viaticos Denegados</p>
                  <input className='input-so' type='checkbox'/>
                </div>
                <div className='interno'>
                  <p className='text-soi'>Viaticos al Extrangero</p>
                  <input className='input-so' type='checkbox'/>
                </div>
                <div className='interno'>
                  <p className='text-soi'>Comprobación de Viaticos</p>
                  <input className='input-so' type='checkbox' />
                </div>
              </div>
              <div className='contenedor-1'>
                <div className='interno'>
                  <p className='text-soi'>Anticipo a Proveedor</p>
                  <input className='input-so' type='checkbox' />
                </div>
                <div className='interno'>
                  <p className='text-soi'>Remanente de Pago a Proveedor</p>
                  <input className='input-so' type='checkbox' />
                </div>
                <div className='interno'>
                  <p className='text-soi'>Pago a Proveedor</p>
                  {this.state.fondo.tipo_doc === 'Pago Directo' && this.state.fondo.no_lici === ' ' ?
                    <input className='input-so' type='checkbox' checked /> :
                    <input className='input-so' type='checkbox' />
                  }
                </div>
              </div>
              <div className='contenedor-1'>
                <div className='interno'>
                  <p className='text-soi'>Anticipo a pago a Proveedor por Requisición</p>
                  <input className='input-so' type='checkbox' />
                </div>
                <div className='interno'>
                  <p className='text-soi'>Remanente de pago a Proveedor por Requisición</p>
                  <input className='input-so' type='checkbox' />
                </div>
                <div className='interno'>
                  <p className='text-soi'>Pago a Proveedor por Requisición</p>
                  {this.state.fondo.tipo_doc === 'Pago Directo' && this.state.fondo.no_lici !== ' ' ?
                    <input className='input-so' type='checkbox' checked /> :
                    <input className='input-so' type='checkbox' />
                  }
                </div>
              </div>
            </div>
          </div>
          <div className='padre-lineas'>
            <div className='lineas-so'>
              <div className='internos'>
                <p className='text-intei'>Beneficiario:</p>
                <p className='bene-i'>{this.state.fondo.beneficiario}</p>
              </div>
              <div className='internos'>
                <p className='text-intei'>Organo Superior:</p>
                <p className='bene-i'>Procuraduria General de Justicia del Estado</p>
              </div>
              <div className='internos'>
                <p className='text-intei'>Unidad Presupuestal:</p>
                {this.state.comprometidos.map(comprometidos =>
                  <p className='bene-i'>
                    {comprometidos.area ?
                      this.state.comprometidos.length === 1 ?
                        (comprometidos.up === '01' && 'Procuraduría General de Justicia') ||
                        (comprometidos.up === '02' && 'Subprocuraduría de Procedimientos Penales Región Oriente') ||
                        (comprometidos.up === '03' && 'Fiscalía Especializada para la atención de Delitos cometidos contra la Libertad de Expresión, Periodistas y Personas defensoras de los Derechos Humanos') ||
                        (comprometidos.up === '04' && 'Dirección General para la Atención de los Asuntos del Sistema Tradicional') ||
                        (comprometidos.up === '05' && 'Fiscalía Especializada en Delitos Electorales') ||
                        (comprometidos.up === '06' && 'Subprocuraduría de Derechos Humanos y Servicios a la Comunidad') ||
                        (comprometidos.up === '07' && 'Centro de Justicia Restaurativa Penal Poniente') ||
                        (comprometidos.up === '08' && 'Fiscalía para la Atención de Delitos de Género') ||
                        (comprometidos.up === '09' && 'Visitaduría General') ||
                        (comprometidos.up === '10' && 'Dirección General de Servicios Periciales') ||
                        (comprometidos.up === '11' && 'Centro de Operación Estratégica') ||
                        (comprometidos.up === '12' && 'Unidad Especializada en el Combate al Secuestro') ||
                        (comprometidos.up === '13' && 'Dirección General de Administración y Finanzas') ||
                        (comprometidos.up === '14' && 'Fiscalía Especializada para la atención de los Delitos de Trata de Personas') ||
                        (comprometidos.up === '15' && 'Subprocuraduría de Procedimientos Penales Región Poniente') ||
                        (comprometidos.up === '16' && 'Centro de Atención Temprana Poniente') ||
                        (comprometidos.up === '17' && 'Dirección General de Investigación y Litigación Poniente') ||
                        (comprometidos.up === '18' && 'Dirección General de la Policía Investigadora') ||
                        (comprometidos.up === '20' && 'Centro de Atención Temprana Oriente') ||
                        (comprometidos.up === '21' && 'Centro de Justicia Restaurativa Penal Oriente') ||
                        (comprometidos.up === '22' && 'Dirección General de Investigación y Litigación Oriente') ||
                        (comprometidos.up === '23' && 'Fiscalía Especializada en Delitos de Corrupción') ||
                        (comprometidos.up === '24' && 'Fiscalía de Desaparición Forzada y Desaparición por Terceros')
                      :
                        ''
                      :
                        (nombreDesa[1] === '01' && 'Procuraduría General de Justicia') ||
                        (nombreDesa[1] === '02' && 'Subprocuraduría de Procedimientos Penales Región Oriente') ||
                        (nombreDesa[1] === '03' &&'Fiscalía Especializada para la atención de Delitos cometidos contra la Libertad de Expresión, Periodistas y Personas defensoras de los Derechos Humanos') ||
                        (nombreDesa[1] === '04' && 'Dirección General para la Atención de los Asuntos del Sistema Tradicional') ||
                        (nombreDesa[1] === '05' && 'Fiscalía Especializada en Delitos Electorales') ||
                        (nombreDesa[1] === '06' && 'Subprocuraduría de Derechos Humanos y Servicios a la Comunidad') ||
                        (nombreDesa[1] === '07' && 'Centro de Justicia Restaurativa Penal Poniente') ||
                        (nombreDesa[1] === '08' && 'Fiscalía para la Atención de Delitos de Género') ||
                        (nombreDesa[1] === '09' && 'Visitaduría General') ||
                        (nombreDesa[1] === '10' && 'Dirección General de Servicios Periciales') ||
                        (nombreDesa[1] === '11' && 'Centro de Operación Estratégica') ||
                        (nombreDesa[1] === '12' && 'Unidad Especializada en el Combate al Secuestro') ||
                        (nombreDesa[1] === '13' && 'Dirección General de Administración y Finanzas') ||
                        (nombreDesa[1] === '14' && 'Fiscalía Especializada para la atención de los Delitos de Trata de Personas') ||
                        (nombreDesa[1] === '15' && 'Subprocuraduría de Procedimientos Penales Región Poniente') ||
                        (nombreDesa[1] === '16' && 'Centro de Atención Temprana Poniente') ||
                        (nombreDesa[1] === '17' && 'Dirección General de Investigación y Litigación Poniente') ||
                        (nombreDesa[1] === '18' && 'Dirección General de la Policía Investigadora') ||
                        (nombreDesa[1] === '20' && 'Centro de Atención Temprana Oriente') ||
                        (nombreDesa[1] === '21' && 'Centro de Justicia Restaurativa Penal Oriente') ||
                        (nombreDesa[1] === '22' && 'Dirección General de Investigación y Litigación Oriente') ||
                        (nombreDesa[1] === '23' && 'Fiscalía Especializada en Delitos de Corrupción') ||
                        (nombreDesa[1] === '24' && 'Fiscalía de Desaparición Forzada y Desaparición por Terceros')
                    }
                  </p>
                )}
              </div>
            </div>
            <div className='folio'>
              <p className='text-folio'>No. Folio</p>
              <p className='fs-if'>{this.state.fondo.fondo}</p>
            </div>
          </div>
          <div className='sp-table-cont'>
            <div className='tabla-so'>
              <table>
                <tr>
                  <td className='all-tablai'>Año</td>
                  <td className='all-tablai'>Ramo</td>
                  <td className='all-tablai'>OS</td>
                  <td className='all-tablai'>UP</td>
                  <td className='all-tablai'>Rubro de Ingreso</td>
                  <td className='all-tablai'>TG</td>
                  <td className='all-tablai'>Objeto de un Gasto</td>
                  <td className='all-tablai'>Finalidad</td>
                  <td className='all-tablai'>Funcion</td>
                  <td className='all-tablai'>Subfunción</td>
                  <td className='all-tablai'>Eje</td>
                  <td className='all-tablai'>Sect</td>
                  <td className='all-tablai'>Prog</td>
                  <td className='all-tablai'>Subp</td>
                  <td className='all-tablai'>Obj</td>
                  <td className='all-tablai'>Proyecto</td>
                  <td className='all-tablai'>Ext</td>
                  <td className='all-tablai'>Ben</td>
                  <td className='all-tablai'>E Geo</td>
                  <td className='dg-tabla all-tablai' style={{ textAlign: 'left' }}>
                    Descripcion del objeto de Gasto
                  </td>
                  <td className='monto-tabla all-tablai'>Monto</td>
                </tr>
                {this.state.comprometidos.map(comprometidos =>
                  comprometidos.area ?
                  <tr>
                    <td className='all-tablai'>
                      {comprometidos.año}
                    </td>
                    <td className='all-tablai'>
                      {comprometidos.ramo}
                    </td>
                    <td className='all-tablai'>
                      {comprometidos.ur}
                    </td>
                    <td className='all-tablai'>
                      {comprometidos.up}
                    </td>
                    <td className='all-tablai'>
                      {comprometidos.rubro}
                    </td>
                    <td className='all-tablai'>
                      {comprometidos.tg}
                    </td>
                    <td className='all-tablai'>
                      {comprometidos.partida}
                    </td>
                    <td className='all-tablai'>
                      {comprometidos.f}
                    </td>
                    <td className='all-tablai'>
                      {comprometidos.fu}
                    </td>
                    <td className='all-tablai'>
                      {comprometidos.sf}
                    </td>
                    <td className='all-tablai'>
                      {comprometidos.eje}
                    </td>
                    <td className='all-tablai'>
                      {comprometidos.s}
                    </td>
                    <td className='all-tablai'>
                      {comprometidos.prog}
                    </td>
                    <td className='all-tablai'>
                      {comprometidos.sp}
                    </td>
                    <td className='all-tablai'>
                      {comprometidos.obj}
                    </td>
                    <td className='all-tablai'>
                      {comprometidos.proy}
                    </td>
                    <td className='all-tablai'>
                      {comprometidos.est}
                    </td>
                    <td className='all-tablai'>
                      {comprometidos.ben}
                    </td>
                    <td className='all-tablai'>
                      {comprometidos.eg}
                    </td>
                    <td className='all-tablai' style={{ textAlign: 'left', width: '100px' }}>
                      <div className='pru-over'>
                        {comprometidos.npro}
                      </div>
                    </td>
                    <td className='all-tablai' style={{ textAlign: 'right' }}>
                      <CurrencyFormat
                        value={(parseFloat(comprometidos.total) + parseFloat(comprometidos.isr)).toFixed(2)}
                        displayType='text'
                        thousandSeparator
                        prefix=' $ '
                      />
                    </td>
                  </tr> : null
                )}
                {prueba.map(item =>
                  <tr>
                    <td className='all-tablai' />
                    <td className='all-tablai' />
                    <td className='all-tablai' />
                    <td className='all-tablai' />
                    <td className='all-tablai' />
                    <td className='all-tablai' />
                    <td className='all-tablai' />
                    <td className='all-tablai' />
                    <td className='all-tablai' />
                    <td className='all-tablai' />
                    <td className='all-tablai' />
                    <td className='all-tablai' />
                    <td className='all-tablai' />
                    <td className='all-tablai' />
                    <td className='all-tablai' />
                    <td className='all-tablai' />
                    <td className='all-tablai' />
                    <td className='all-tablai' />
                    <td className='all-tablai' />
                    <td className='all-tablai' />
                    <td className='all-tablai' />
                  </tr>
                )}
                {this.state.comprometidos.map(comprometidos =>
                  comprometidos.isr !== '0.00' && comprometidos.isr ?
                  <tr>
                    <td className='all-tablai' />
                    <td className='all-tablai' />
                    <td className='all-tablai' />
                    <td className='all-tablai' />
                    <td className='all-tablai' />
                    <td className='all-tablai' />
                    <td className='all-tablai' />
                    <td className='all-tablai' />
                    <td className='all-tablai' />
                    <td className='all-tablai' />
                    <td className='all-tablai' />
                    <td className='all-tablai' />
                    <td className='all-tablai' />
                    <td className='all-tablai' />
                    <td className='all-tablai' />
                    <td className='all-tablai' />
                    <td className='all-tablai' />
                    <td className='all-tablai' />
                    <td className='all-tablai' />
                    <td className='all-tablai' style={{ textAlign: 'left' }}>SUBTOTAL</td>
                    <td className='all-tablai' style={{ textAlign: 'right' }}>
                      <CurrencyFormat
                        value={(parseFloat(totalImporte) + parseFloat(totalRetencion)).toFixed(2)}
                        displayType='text'
                        thousandSeparator
                        prefix=' $ '
                      />
                    </td>
                  </tr>
                  : null
                )}
                <tr>
                  <td className='all-tablai border-color' />
                  <td className='all-tablai border-color' />
                  <td className='all-tablai border-color' />
                  <td className='all-tablai border-color' />
                  <td className='all-tablai border-color' />
                  <td className='all-tablai border-color' />
                  <td className='all-tablai border-color' />
                  <td className='all-tablai border-color' />
                  <td className='all-tablai border-color' />
                  <td className='all-tablai border-color' />
                  <td className='all-tablai border-color' />
                  <td className='all-tablai border-color' />
                  <td className='all-tablai border-color' />
                  <td className='all-tablai border-color' />
                  <td className='all-tablai border-color' />
                  <td className='all-tablai border-color' />
                  <td className='all-tablai border-color' />
                  <td className='all-tablai border-color' />
                  <td className='all-tablai border-color' />
                  <td className='all-tablai text-rete'>RETENCION</td>
                  <td className='all-tablai' style={{ textAlign: 'right' }}>
                    <CurrencyFormat
                      value={(totalRetencion.reduce(reducer)).toFixed(2)}
                      displayType='text'
                      thousandSeparator
                      prefix=' $ '
                    />
                  </td>
                </tr>
                <tr>
                  <td className='all-tablai border-color' />
                  <td className='all-tablai border-color' />
                  <td className='all-tablai border-color' />
                  <td className='all-tablai border-color' />
                  <td className='all-tablai border-color' />
                  <td className='all-tablai border-color' />
                  <td className='all-tablai border-color' />
                  <td className='all-tablai border-color' />
                  <td className='all-tablai border-color' />
                  <td className='all-tablai border-color' />
                  <td className='all-tablai border-color' />
                  <td className='all-tablai border-color' />
                  <td className='all-tablai border-color' />
                  <td className='all-tablai border-color' />
                  <td className='all-tablai border-color' />
                  <td className='all-tablai border-color' />
                  <td className='all-tablai border-color' />
                  <td className='all-tablai border-color' />
                  <td className='all-tablai border-color' />
                  <td className='all-tablai border-color text-rete'>TOTAL</td>
                  <td className='all-tablai' style={{ textAlign: 'right' }}>
                    <CurrencyFormat
                      value={(totalImporte.reduce(reducer)).toFixed(2)}
                      displayType='text'
                      thousandSeparator
                      prefix=' $ '
                    />
                  </td>
                </tr>
              </table>
            </div>
          </div>
          <div className='sp-footer'>
            <div className='obs-sopadre2'>
              <div className='obs-so'>
                <p className='text-osb'>Cuenta CFE</p>
                <div className='input-cfe' />
                <div style={{ display: 'flex'}}>
                  <p className='text-osb'>No servicio CFE</p>
                  <div className='input-cfe' />
                </div>
              </div>
            </div>
            <div className='obs-sopadre'>
              <div className='obs-so'>
                <p className='text-osb'>Observaciones</p>
                <div className='input-obs' />
                <div className='obs-so2'>
                  <p className='text-osb'>Solicitud</p>
                  <input className='obs-input' />
                </div>
              </div>
            </div>
            <div className='padre-firmas'>
              <div className='firmas'>
                <p className='text-firmas'>Elaboro</p>
              </div>
              <div className='firmas'>
                <p className='text-firmas'>Reviso</p>
              </div>
            </div>
          </div>
        </div>

        {/* Anexo F */}
        <div className='pppdf-subdad' ref={el => (this.anex = el)}>
          <div className='header-ofi'>
            <div className='header-ofi-cont'>
              <div className='sp-cont'>
                <img className='pgjh comple' src={lpgjh} alt='' />
              </div>
              <img className='img-sp' src={logo2} alt='' />
            </div>
          </div>
          <div className='sp-direc'>
            <p>Dirección General de Administracción y Finanzas</p>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'column', width: '100%', height: '75%' }}>
            <div>
              <div className='no-oficio-sp'>
                <p>
                  Oficio No: PGJ/DGAyF/{this.state.fondo.anexof}/2021
                  <br />Pachuca de Soto, Hidalgo a {today}
                  <br />Asunto: Constancia de entera satisfación de bienes o servicios
                </p>
              </div>
              <div className='prensente-sp'>
                <p>
                  <b>
                    L.A.E. CÉSAR ALBERTO GONZÁLEZ LÓPEZ
                    <br />SUBSCRETARIO DE EGRESOS DE LA
                    <br />SECRETARÍA DE FINANZAS PÚBLICAS
                    <br />PRESENTE
                  </b>
                </p>
              </div>
              <div className='añadido-sp'>
                <p>
                  <b>
                    AT´N.: L.C.P. KARINA BARRIOS VELÁZQUEZ
                    <br />DIrectora General de Contabilidad
                    <br />DIRECTORA GENERAL DE CONTABILIDADental
                    <br />GUBERNAMENTAL
                  </b>
                </p>
              </div>
              <div className='texto-ofi-sp'>
                <p>
                  Por medio del presente informo a Usted, que se ha concluido el contrato
                  por la prestación de servicios  con el proveedor {this.state.fondo.beneficiario},
                  de los recuersos autorizados al proyecto{this.state.comprometidos.map(item => item.proy ? ', ' + item.proy : null)},
                  asignado a la Unidad Presupuestal {this.state.comprometidos.map(comprometidos =>
                    comprometidos.area ?
                      this.state.comprometidos.length === 1 ?
                      (comprometidos.up === '01' && 'Procuraduría General de Justicia') ||
                      (comprometidos.up === '02' && 'Subprocuraduría de Procedimientos Penales Región Oriente') ||
                      (comprometidos.up === '03' && 'Fiscalía Especializada para la atención de Delitos cometidos contra la Libertad de Expresión, Periodistas y Personas defensoras de los Derechos Humanos') ||
                      (comprometidos.up === '04' && 'Dirección General para la Atención de los Asuntos del Sistema Tradicional') ||
                      (comprometidos.up === '05' && 'Fiscalía Especializada en Delitos Electorales') ||
                      (comprometidos.up === '06' && 'Subprocuraduría de Derechos Humanos y Servicios a la Comunidad') ||
                      (comprometidos.up === '07' && 'Centro de Justicia Restaurativa Penal Poniente') ||
                      (comprometidos.up === '08' && 'Fiscalía para la Atención de Delitos de Género') ||
                      (comprometidos.up === '09' && 'Visitaduría General') ||
                      (comprometidos.up === '10' && 'Dirección General de Servicios Periciales') ||
                      (comprometidos.up === '11' && 'Centro de Operación Estratégica') ||
                      (comprometidos.up === '12' && 'Unidad Especializada en el Combate al Secuestro') ||
                      (comprometidos.up === '13' && 'Dirección General de Administración y Finanzas') ||
                      (comprometidos.up === '14' && 'Fiscalía Especializada para la atención de los Delitos de Trata de Personas') ||
                      (comprometidos.up === '15' && 'Subprocuraduría de Procedimientos Penales Región Poniente') ||
                      (comprometidos.up === '16' && 'Centro de Atención Temprana Poniente') ||
                      (comprometidos.up === '17' && 'Dirección General de Investigación y Litigación Poniente') ||
                      (comprometidos.up === '18' && 'Dirección General de la Policía Investigadora') ||
                      (comprometidos.up === '20' && 'Centro de Atención Temprana Oriente') ||
                      (comprometidos.up === '21' && 'Centro de Justicia Restaurativa Penal Oriente') ||
                      (comprometidos.up === '22' && 'Dirección General de Investigación y Litigación Oriente') ||
                      (comprometidos.up === '23' && 'Fiscalía Especializada en Delitos de Corrupción') ||
                      (comprometidos.up === '24' && 'Fiscalía de Desaparición Forzada y Desaparición por Terceros') : ''
                     :
                     (nombreDesa[1] === '01' && 'Procuraduría General de Justicia') ||
                     (nombreDesa[1] === '02' && 'Subprocuraduría de Procedimientos Penales Región Oriente') ||
                     (nombreDesa[1] === '03' && 'Fiscalía Especializada para la atención de Delitos cometidos contra la Libertad de Expresión, Periodistas y Personas defensoras de los Derechos Humanos') ||
                     (nombreDesa[1] === '04' && 'Dirección General para la Atención de los Asuntos del Sistema Tradicional') ||
                     (nombreDesa[1] === '05' && 'Fiscalía Especializada en Delitos Electorales') ||
                     (nombreDesa[1] === '06' && 'Subprocuraduría de Derechos Humanos y Servicios a la Comunidad') ||
                     (nombreDesa[1] === '07' && 'Centro de Justicia Restaurativa Penal Poniente') ||
                     (nombreDesa[1] === '08' && 'Fiscalía para la Atención de Delitos de Género') ||
                     (nombreDesa[1] === '09' && 'Visitaduría General') ||
                     (nombreDesa[1] === '10' && 'Dirección General de Servicios Periciales') ||
                     (nombreDesa[1] === '11' && 'Centro de Operación Estratégica') ||
                     (nombreDesa[1] === '12' && 'Unidad Especializada en el Combate al Secuestro') ||
                     (nombreDesa[1] === '13' && 'Dirección General de Administración y Finanzas') ||
                     (nombreDesa[1] === '14' && 'Fiscalía Especializada para la atención de los Delitos de Trata de Personas') ||
                     (nombreDesa[1] === '15' && 'Subprocuraduría de Procedimientos Penales Región Poniente') ||
                     (nombreDesa[1] === '16' && 'Centro de Atención Temprana Poniente') ||
                     (nombreDesa[1] === '17' && 'Dirección General de Investigación y Litigación Poniente') ||
                     (nombreDesa[1] === '18' && 'Dirección General de la Policía Investigadora') ||
                     (nombreDesa[1] === '20' && 'Centro de Atención Temprana Oriente') ||
                     (nombreDesa[1] === '21' && 'Centro de Justicia Restaurativa Penal Oriente') ||
                     (nombreDesa[1] === '22' && 'Dirección General de Investigación y Litigación Oriente') ||
                     (nombreDesa[1] === '23' && 'Fiscalía Especializada en Delitos de Corrupción') ||
                     (nombreDesa[1] === '24' && 'Fiscalía de Desaparición Forzada y Desaparición por Terceros')
                  )};
                  por lo que hago constar que he recibido el(los) entregable(s) a mi
                  entera satisfacción, el (los) cual(es) es susceptible de ser medible
                  y verificable, además de que cumple con los requerimientos pactados,
                  en el contrato en cuanto a objeto, precio y tiempo de entrega; quedando
                  bajo mi resguardo para cualquier aclaración o presentación ante los
                  órganos fiscalizadores.
                </p>
              </div>
            </div>
            <div>
              <div className='atte-sp'>
                <p className='atte-text-sp'>
                  <b>ATENTAMENTE<br />EL DIRECTOR GENERAL</b>
                </p>
              </div>
              <div className='firma-sp'>
                <div className='firma-raya-sp'>
                  <p><b>MTRO. LEÓN MAXIMILIANO HERNÁNDEZ VALDÉS</b></p>
                </div>
              </div>
            </div>
          </div>
          <div className='footer-sp'>
            <div className='footer-content-sp'>
              <div>
                <p className='foot-text'>C.C.P...- Expediente<br />Minutario<br />LMHV/NRL/macht</p>
              </div>
              <div className='foot-num'>
                <p className='foot-num-t'>No. de Fondo {this.state.fondo.fondo}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Diciembre */}
        <div className='pppdf-subdad' ref={el => (this.cgc = el)} style={{ zIndex: '2', position: 'absolute' }}>
          <div className='fondo-procu'>
            <img className='ime' src={logo2} alt='' />
          </div>
          <div className='no-oficio'>
            <p>
              <b>Oficio No: </b>
              PGI/DGAyF/{this.state.no_oficio}/2021<br />
              Pachuca de Soto, Hidalgo a {today}<br />
              <b>Asunto </b>
              Solicitud de Pago Proveedor por Requisicón
            </p>
          </div>
          <div className='prensente'>
            <p>
              <b>
                Lic. César Alberto González López
                <br />SUBSCRETARIO DE EGRESOS DE LA
                <br />SECRETARÍA DE FINANZAS PÚBLICASs
                <br />PRESENTE
              </b>
            </p>
          </div>
          <div className='añadido'>
            <p>
              <b>AT'N: L.C.P. Karina Barrios Velázquez
                <br />Directora General de Contabilidad
                <br />DIRECTORA GENERAL DE CONTABILIDAD
                <br />GUBERNAMENTAL
              </b>
            </p>
          </div>
          <div className='texto-ofi_ppp'>
            <p>
              Por medio del presente me permito enviar a Usted, la documentación comprobatoria para
              amortización de adeudos, por un importe total de $ {this.state.importe}, ({NumberAsString(this.state.importe)}),
              integrado de la siguiente forma: comprobantes $______________, (importe con letra), reintegro: $_____________, (importe con letra),
              anexando copia original del recibo oficial No. otorgado por caja general, de fecha
              del recibo, correspondiente al proyecto clave y nombre del proyecto, otorgado en el oficio de
              autorización {this.state.no_oficio}.
            </p>
            <p>
              Lo anterior con la finalidad de amortizar en su totalidad el contra-recibo No. con el que se otorgaron
              los gastos a comprobar para llevar a cabo xxxxxxxxxxx, de fecha del contra-recibo de dichos gastos,
              a nombre de nombre del administrativo o persona a favor de quien se le otorgaron los recursos
              correspondientes.
            </p>
            <p>Sin otro particular por el momento, reciba un cordial saludo</p>
          </div>
          <div className='atte'>
            <p>
              Atentamente
              <br />
              Director General
            </p>
          </div>
          <div className='firma-dad'>
            <div className='firma-raya'>
              <p className='mtro'>MTRO. LEÓN MAXIMILIANO HERNÁNDEZ VALDÉS</p>
            </div>
          </div>
          <div className='ccp'>
            <p className='text-b'>C.C.P...- Expedien<br />Minutario<br />LMHV/NRL/macht</p>
          </div>
        </div>

      </div>
    )
  }
}
