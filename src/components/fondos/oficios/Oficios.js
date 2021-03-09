import React, { Component } from 'react'
import './Oficios.css'
import ReactToPrint from 'react-to-print'
import firebase from '../../../Firebase'
import { NumberAsString } from '../fondos/NumerosLetras'
import logo2 from '../../../img/logo.jpg'
import lpgjh from '../../../img/logo_hgo.png'
import CurrencyFormat from 'react-currency-format'
import Popup from 'reactjs-popup'

export default class Oficios extends Component {
  constructor (props) {
    super(props)
    this.unsubscribe = null
    this.state = {
      fondo: {},
      key: '',
      comprometidos: [
        {
          id: 1,
          name: 'prueba',
          done: false
        }
      ],
      total: '',
      fecha: '',
      importe: '',
      no_oficio: '',
      pressStatus: true,
      text: '',
      cfdi: '',
      up: '',
      perro: '',
      desc: '',
      hojas: 'Hola'
    }
  }

  componentDidMount () {
    const updateRef = firebase.firestore().collection('fondos').doc(this.props.match.params.id).collection('comprometidos').orderBy('up', 'asc')
    this.unsubscribe = updateRef.onSnapshot(this.onCollectionUpdate)
    const ref = firebase.firestore().collection('fondos').doc(this.props.match.params.id)
    ref.get().then((doc) => {
      if (doc.exists) {
        const fondos = doc.data()
        this.setState({
          key: doc.id,
          año: fondos.año,
          ur: fondos.ur,
          ramo: fondos.ramo,
          os: fondos.os,
          up: fondos.up,
          rubro: fondos.rubro,
          tg: fondos.tg,
          ogasto: fondos.ogasto,
          f: fondos.f,
          fu: fondos.fu,
          sf: fondos.sf,
          eje: fondos.eje,
          s: fondos.s,
          prog: fondos.prog,
          obj: fondos.obj,
          proy: fondos.proy,
          est: fondos.est,
          ben: fondos.ben,
          eg: fondos.eg,
          importe_comp: fondos.importe_comp,
          total: fondos.total,
          // fecha: fondos.fecha cambiar el valor
          numCompro: fondos.numCompro,
          importe: fondos.importe,
          no_oficio: fondos.no_oficio,
          oficio_aut: fondos.oficio_aut,
          no_proyecto: fondos.no_proyecto,
          cfdi: fondos.cfdi,
          desc: fondos.desc,
          beneficiario: fondos.beneficiario,
          requisicion: fondos.requisicion,
          pedido: fondos.pedido,
          fondo2: fondos.fondo,
          tipo_doc: fondos.tipo_doc,
          no_lici: fondos.no_lici
        })
      } else {
        console.log('No se encuentra documento')
      }
    })
    const refC = firebase.firestore().collection('fondos').doc(this.props.match.params.id).collection('comprometidos')
    refC.get().then((doc) => {
      if (doc.exists) {
        const comprometidos = doc.data()
        this.setState({
          key: doc.id,
          proy: comprometidos.proy,
          np: comprometidos.np
        })
      } else {
        console.log('No se encuentra documento')
      }
    })
  }

  onCollectionUpdate = (querySnapshot) => {
    const comprometidos = []
    querySnapshot.forEach((doc) => {
      const { año, ramo, up, rubro, tg, partida, npro, f, fu, sf, eje, s, prog,
              obj, proy, est, ben, eg, importe_comp, ur, total, no_proyecto,
              num_factura } = doc.data()
      comprometidos.push({
        key: doc.id,
        doc,
        año,
        ramo,
        up,
        rubro,
        tg,
        partida,
        npro,
        f,
        fu,
        sf,
        eje,
        s,
        prog,
        obj,
        proy,
        est,
        ben,
        eg,
        importe_comp,
        total,
        ur,
        no_proyecto,
        num_factura
      })
    })
    this.setState({
      comprometidos
    })
  }

  handleChange (event) {
    this.setState({ [event.target.name]: event.target.value })
  }

  render () {
    var today = new Date()
    var meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
    var diasSemana = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']
    var f = new Date()
    today = diasSemana[f.getDay()] + ', ' + f.getDate() + ' de ' + meses[f.getMonth()] + ' de ' + f.getFullYear()
    const totalImporte = []
    this.state.comprometidos.map(comprometidos => (
      totalImporte.push(comprometidos.total)
    ))
    const reducer = (a, b) => a + b

    const myListComprometidos = this.state.comprometidos.reduce((acumulador, valorActual) => {
      const elementoYaExiste = acumulador.find(elemento => elemento.up === valorActual.up)
      if (elementoYaExiste) {
        return acumulador.map((elemento) => {
          if (elemento.up === valorActual.up) {
            return {
              ...elemento,
              total: elemento.total + valorActual.total
            }
          }
          return elemento
        });
      }
      return [...acumulador, valorActual]
    }, [])

    var cad = []
    var proyectof = []
    let noProyect = this.state.no_proyecto
    for (var i in noProyect) {
      cad.push( String(noProyect[i]) )
      let proyect = String(cad[i])
      var proy = proyect.split(' ')[0]
      proyectof.push(proy)
    }

    return (
      <div>
        <div style={{ zIndex: '3', background: '#f4f4f4', width: '100%', position: 'fixed', height: '100vh' }}>
          {this.state.tipo_doc === 'Fondo Revolvente' &&
            <div className='m-f'>
              <div className='fr-con'>
                <p className='fr-b'><b>Fondo Revolvente</b></p>
              </div>
              <div className='fcc-i'>
                <p className='fimpre'>Solicitud Programatica</p>
                <ReactToPrint
                  trigger={() => <buttom className='btn-imp-of'>Imprimir</buttom>}
                  content={() => this.ogfr}
                />
              </div>
              <div className='fcc-i'>
                <p className='fimpre'>Reembolso de FR</p>
                <ReactToPrint
                  trigger={() => <buttom className='btn-imp-of'>Imprimir</buttom>}
                  content={() => this.rfr}
                />
              </div>
              <div className='fcc-i'>
                <p className='fimpre'>Recibo Global</p>
                <ReactToPrint
                  trigger={() => <buttom className='btn-imp-of'>Imprimir</buttom>}
                  content={() => this.rec}
                />
              </div>
              <div className='fcc-i'>
                <p className='fimpre'>Leyenda Alusivas</p>
                <Popup
                  trigger={<buttom className='btn-imp-of'>Imprimir</buttom>}
                  modal
                  closeOnDocumentClick>
                  <div ref={el => (this.gas = el)} style={{ zIndex: '2', width: '100%' }}>
                  {this.state.comprometidos.map(comprometidos =>
                  <div className='lll'>
                    <div style={{ width: '100%' }}>
                      <div className='title-ga'>
                        <div>
                          <img className='pgjh' src={lpgjh} alt='' />
                        </div>
                        <div>
                          <p className='text-titulo-ga'>PROCURADURÍA GENERAL DE JUSTICA DE HIDALGO</p>
                          <p className='text-titulo-ga'>{comprometidos.up}</p>
                          <p className='text-titulo-ga'>{comprometidos.partida}</p>
                        </div>
                        <div>
                          <img className='ims' src={logo2} alt='' />
                        </div>
                      </div>
                    </div>
                    <div className='faderinpo'>
                      <div className='contenedor-ga'>
                        <div className='contenedor-1 '>
                          <div className='interno-ga2'>
                            <p className='text-gai'>Gasto a Comprobar</p>
                            <input className='input-gai' type='checkbox' disabled />
                          </div>
                          <div className='interno-ga2'>
                            <p className='text-gai'>Comprobacion de Gastos</p>
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
                            <input className='input-gai' type='checkbox' checked />
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
                            <p className='text-gai'>Comprobación de Viáticos</p>
                            <input className='input-gai' type='checkbox' disabled />
                          </div>
                        </div>
                        <div className='contenedor-1'>
                          <div className='interno-ga2'>
                            <p className='text-gai'>Pago a Proveedores</p>
                            <input className='input-gai' type='checkbox' disabled />
                          </div>
                          <div className='interno-ga2'>
                            <p className='text-gai'>Transferencias</p>
                            <input className='input-gai' type='checkbox' disabled />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className='tabla-ga'>
                        <table className='tablagas'>
                          <tr>
                            <td className='alltabla-ga'>FOLIO DE LA FACTURA</td>
                            <td className='alltabla-ga'>IMPORTE</td>
                            <td className='alltabla-ga'>LEYENDA ALUSIVA AL GASTO</td>
                          </tr>
                          <tr>
                            <td className='all-tab-f'>{comprometidos.num_factura}</td>
                            <td className='all-tab-f'>
                              <CurrencyFormat
                                value={comprometidos.total}
                                displayType='text'
                                thousandSeparator
                                prefix=' $ '
                              />
                            </td>
                            <td className='all-tab-f td'>
                              <textarea
                                className='all-tab-l'
                                id='hojas'
                                name='hojas'
                                onChange={this.handleChange.bind(this)}
                                value={this.state.hojas}
                              />
                            </td>
                          </tr>
                          <tr>
                            <td className='text-total-ga'>TOTAL</td>
                            <td />
                          </tr>
                        </table>
                      </div>
                    </div>
                  </div>
                  )}
                  </div>
                  <ReactToPrint
                    trigger={() =>
                      <div className='c-b-i'>
                        <buttom className='btn-imp-of'>Imprimir</buttom>
                      </div>
                      }
                    content={() => this.gas}
                  />
                </Popup>
              </div>
            </div>
          }
          {this.state.no_lici &&
            <div className='m-f'>
              <div className='fr-con'>
                <p className='fr-b'><b>Pago Provedor por Requisición</b></p>
              </div>
              <div className='fcc-i'>
                <p className='fimpre'>Solicitud Programatica</p>
                <ReactToPrint
                  trigger={() => <buttom className='btn-imp-of'>Imprimir</buttom>}
                  content={() => this.sol}
                />
              </div>
              <div className='fcc-i'>
                <p className='fimpre'>Solicitud de PPR</p>
                <ReactToPrint
                  trigger={() => <buttom className='btn-imp-of'>Imprimir</buttom>}
                  content={() => this.ofi}
                />
              </div>
              <div className='fcc-i'>
                <p className='fimpre'>Leyenda Alusivas</p>
                <Popup
                  trigger={<buttom className='btn-imp-of'>Imprimir</buttom>}
                  modal
                  closeOnDocumentClick>
                  <div ref={el => (this.gasto = el)} style={{ zIndex: '2', width: '100%' }}>
                  {this.state.comprometidos.map((comprometidos, i) =>
                  <div className='lll'>
                    <div style={{ width: '100%' }}>
                      <div className='title-ga'>
                        <div>
                          <img className='pgjh' src={lpgjh} alt='' />
                        </div>
                        <div>
                          <p className='text-titulo-ga'>PROCURADURÍA GENERAL DE JUSTICA DE HIDALGO</p>
                          <p className='text-titulo-ga'>{comprometidos.up}</p>
                          <p className='text-titulo-ga'>{comprometidos.partida}</p>
                        </div>
                        <div>
                          <img className='ims' src={logo2} alt='' />
                        </div>
                      </div>
                    </div>
                    <div className='faderinpo'>
                      <div className='contenedor-ga'>
                        <div className='contenedor-1 '>
                          <div className='interno-ga2'>
                            <p className='text-gai'>Gasto a Comprobar</p>
                            <input className='input-gai' type='checkbox' disabled />
                          </div>
                          <div className='interno-ga2'>
                            <p className='text-gai'>Comprobacion de Gastos</p>
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
                            <p className='text-gai'>Comprobación de Viáticos</p>
                            <input className='input-gai' type='checkbox' disabled />
                          </div>
                        </div>
                        <div className='contenedor-1'>
                          <div className='interno-ga2'>
                            <p className='text-gai'>Pago a Proveedores</p>
                            <input className='input-gai' type='checkbox' disabled />
                          </div>
                          <div className='interno-ga2'>
                            <p className='text-gai'>Pago a Proveedore por Requisición</p>
                            <input className='input-gai' type='checkbox' checked />
                          </div>
                          <div className='interno-ga2'>
                            <p className='text-gai'>Transferencias</p>
                            <input className='input-gai' type='checkbox' disabled />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className='tabla-ga'>
                        <table className='tablagas'>
                          <tr>
                            <td className='alltabla-ga'>FOLIO DE LA FACTURA</td>
                            <td className='alltabla-ga'>IMPORTE</td>
                            <td className='alltabla-ga'>LEYENDA ALUSIVA AL GASTO</td>
                          </tr>
                          <tr>
                            <td className='all-tab-f'>{comprometidos.num_factura}</td>
                            <td className='all-tab-f'>
                              <CurrencyFormat
                                value={comprometidos.total}
                                displayType='text'
                                thousandSeparator
                                prefix=' $ '
                              />
                            </td>
                            <td className='all-tab-f td'>
                              <textarea
                                className='all-tab-l'
                                name={i}
                                onChange={this.handleChange.bind(this)}
                                value={this.state.i}
                              />
                            </td>
                          </tr>
                          <tr>
                            <td className='text-total-ga'>TOTAL</td>
                            <td />
                          </tr>
                        </table>
                      </div>
                    </div>
                  </div>
                  )}
                  <ReactToPrint
                    trigger={() =>
                      <div className='c-b-i'>
                        <buttom className='btn-imp-of'>Imprimir</buttom>
                      </div>
                    }
                    content={() => this.gasto}
                  />
                  </div>
                </Popup>
              </div>
            </div>
          }
          {!this.state.no_lici &&
            <div className='m-f'>
              <div className='fr-con'>
                <p className='fr-b'><b>Pago Proveedor</b></p>
              </div>
              <div className='fcc-i'>
                <p className='fimpre'>Oficio Pago Proveedor</p>
                <ReactToPrint
                  trigger={() => <buttom className='btn-imp-of'>Imprimir</buttom>}
                  content={() => this.opp}
                />
              </div>
              <div className='fcc-i'>
                <p className='fimpre'>Solicitud Programatica</p>
                <ReactToPrint
                  trigger={() => <buttom className='btn-imp-of'>Imprimir</buttom>}
                  content={() => this.sp}
                />
              </div>
              <div className='fcc-i'>
                <p className='fimpre'>Leyendas Alusivas</p>
                <Popup
                  trigger={<buttom className='btn-imp-of'>Imprimir</buttom>}
                  modal
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
                    <div ref={el => (this.la = el)} style={{ zIndex: '2', width: '100%', height: '100%' }}>
                    {myListComprometidos.map(comprometidos =>
                      <div className='lll'>
                        <div style={{ width: '100%' }}>
                          <div className='title-ga'>
                            <div>
                              <img className='pgjh' src={lpgjh} alt='' />
                            </div>
                            <div>
                              <p className='text-titulo-ga'>PROCURADURÍA GENERAL DE JUSTICA DE HIDALGO</p>
                                <p className='text-titulo-ga'>
                                  {(comprometidos.up === '01' &&
                                    'Atención y seguimiento a peticiones recibidas en el despacho del procurador atendidas')
                                    ||
                                    (comprometidos.up === '02' &&
                                    'Casos penales de la región oriente resueltas')
                                    ||
                                    (comprometidos.up === '03' &&
                                    'Delitos cometidos en contra de la libertad de expresión, periodistas y personas defensoras de los derechos humanos investigados')
                                    ||
                                    (comprometidos.up === '04' &&
                                    'Averiguaciones previas del sistema tradicional concluidas')
                                    ||
                                    (comprometidos.up === '05' &&
                                    'Casos penales en materia de delitos electorales resueltos')
                                    ||
                                    (comprometidos.up === '06' &&
                                    'Casos penales determinados, concluidos o resueltos en delitos que atenten contra la mujer y la familia')
                                    ||
                                    (comprometidos.up === '07' &&
                                    'Acuerdos reparatorios generados a través de la aplicación de los mecanismos alternativos de solución de controversias en materia penal en la región poniente')
                                    ||
                                    (comprometidos.up === '08' &&
                                    'Investigación y supervisión de los casos penales con motivo de feminicidio')
                                    ||
                                    (comprometidos.up === '09' &&
                                    'Quejas y denuncias por la posible comisión de conductas indebidas en las que incurran las y los servidores públicos atendidas')
                                    ||
                                    (comprometidos.up === '10' &&
                                    'Intervenciones periciales a autoridades de procuración de justicia para una correcta integración del expediente en casos penales entregados')
                                    ||
                                    (comprometidos.up === '11' &&
                                    'Casos penales del delito de narcomenudeo resueltos')
                                    ||
                                    (comprometidos.up === '12' &&
                                    'Casos penales atendidos por los delistos de secuentro y extorsión')
                                    ||
                                    (comprometidos.up === '13' &&
                                    'Gestión administrativa de recursos humanos,financiera, materiales, de informática, de archivo, de calidad, de aportaciones federales, planeación estratégica realizada')
                                    ||
                                    (comprometidos.up === '14' &&
                                    'Determinación y/o resolución de los casos penales de los delitos de trata de personas, lenocinio y delitos conexos')
                                    ||
                                    (comprometidos.up === '15' &&
                                    'Casos penales de la región poniente resueltas')
                                    ||
                                    (comprometidos.up === '16' &&
                                    'Atenciones ciudadanas en los módulos de atención temprana en la región poniente brindadas')
                                    ||
                                    (comprometidos.up === '17' &&
                                    'Determinación en las carpetas de investigación en las unidades de investigación de la regiones poniente')
                                    ||
                                    (comprometidos.up === '18' &&
                                    'Investigación policial ejecutada')
                                    ||
                                    (comprometidos.up === '20' &&
                                    'Atenciones ciudadanas en los módulos de atención temprana en la región poniente brindadas')
                                    ||
                                    (comprometidos.up === '21' &&
                                    'Acuerdos reparatorios generados a traves de la aplicación de los mecanismos alternativos de solución de controversias en materia penal en la región oriente')
                                    ||
                                    (comprometidos.up === '22' &&
                                    'Determinación en las carpetas de investigación en las unidades de investigación de la regiones oriente')
                                    ||
                                    (comprometidos.up === '23' &&
                                    'Delitos de corrupción resueltos')
                                    ||
                                    (comprometidos.up === '24' &&
                                    'Casos penales determinados, concluidos o resueltos de delitos en materia de desaparición forzada de personas cometidos por particulares, delitos vinculados y de personas no localizadas realizados')
                                  }
                                </p>
                              <p className='text-titulo-ga'>{comprometidos.partida}</p>
                            </div>
                            <div>
                              <img className='ims' src={logo2} alt='' />
                            </div>
                          </div>
                        </div>
                        <div className='faderinpo'>
                          <div className='contenedor-ga'>
                            <div className='contenedor-1 '>
                              <div className='interno-ga2'>
                                <p className='text-gai'>Gasto a Comprobar</p>
                                <input className='input-gai' type='checkbox' disabled />
                              </div>
                              <div className='interno-ga2'>
                                <p className='text-gai'>Comprobacion de Gastos</p>
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
                                <p className='text-gai'>Comprobación de Viáticos</p>
                                <input className='input-gai' type='checkbox' disabled />
                              </div>
                            </div>
                            <div className='contenedor-1'>
                              <div className='interno-ga2'>
                                <p className='text-gai'>Pago a Proveedores</p>
                                <input className='input-gai' type='checkbox' checked />
                              </div>
                              <div className='interno-ga2'>
                                <p className='text-gai'>Pago a Proveedore por Requisición</p>
                                <input className='input-gai' type='checkbox' disabled />
                              </div>
                              <div className='interno-ga2'>
                                <p className='text-gai'>Transferencias</p>
                                <input className='input-gai' type='checkbox' disabled />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div>
                          <div className='tabla-ga'>
                            <table className='tablagas'>
                              <tr>
                                <td className='alltabla-ga'>FOLIO DE LA FACTURA</td>
                                <td className='alltabla-ga'>IMPORTE</td>
                                <td className='alltabla-ga'>LEYENDA ALUSIVA AL GASTO</td>
                              </tr>
                              <tr>
                                <td className='all-tab-f'>{comprometidos.num_factura}</td>
                                <td className='all-tab-f'>
                                  <CurrencyFormat
                                    value={comprometidos.total}
                                    displayType='text'
                                    thousandSeparator
                                    prefix=' $ '
                                  />
                                </td>
                                <td className='all-tab-f td'>
                                  <textarea
                                    className='all-tab-l'
                                    type='text'
                                    name='hojas'
                                    onChange={this.handleChange.bind(this)}
                                    value={this.state.hojas}
                                  />
                                </td>
                              </tr>
                              <tr>
                                <td className='text-total-ga'>TOTAL</td>
                                <td />
                              </tr>
                            </table>
                          </div>
                        </div>
                      </div>
                    )}
                    </div>
                  </div>
                </Popup>
              </div>
            </div>
          }

          {/*<div className='m-f'>
            <div className='fr-con'>
              <p className='fr-b'><b>Diciembre</b></p>
            </div>
            <div className='fcc-i'>
              <p className='fimpre'>Comprobacion de Gasto a Comprobar</p>
              <ReactToPrint
                trigger={() => <buttom className='btn-imp-of'>Imprimir</buttom>}
                content={() => this.cgc}
              />
            </div>
            <div className='fcc-i'>
              <p className='fimpre'>Solicitud Programatica</p>
              <ReactToPrint
                trigger={() => <buttom className='btn-imp-of'>Imprimir</buttom>}
                content={() => this.spd}
              />
            </div>
            <div className='fcc-i'>
              <p className='fimpre'>Leyendas Alusivas</p>
              <Popup
                trigger={<buttom className='btn-imp-of'>Imprimir</buttom>}
                modal
                closeOnDocumentClick>
                <div ref={el => (this.lap = el)} style={{ zIndex: '2', width: '100%' }}>
                {this.state.comprometidos.map(comprometidos =>
                <div className='lll'>
                  <div style={{ width: '100%' }}>
                    <div className='title-ga'>
                      <div>
                        <img className='pgjh' src={lpgjh} alt='' />
                      </div>
                      <div>
                        <p className='text-titulo-ga'>PROCURADURÍA GENERAL DE JUSTICA DE HIDALGO</p>
                        <p className='text-titulo-ga'>{comprometidos.up}</p>
                        <p className='text-titulo-ga'>{comprometidos.dataF}</p>
                      </div>
                      <div>
                        <img className='ims' src={logo2} alt='' />
                      </div>
                    </div>
                  </div>
                  <div className='faderinpo'>
                    <div className='contenedor-ga'>
                      <div className='contenedor-1 '>
                        <div className='interno-ga2'>
                          <p className='text-gai'>Gasto a Comprobar</p>
                          <input className='input-gai' type='checkbox' disabled />
                        </div>
                        <div className='interno-ga2'>
                          <p className='text-gai'>Comprobacion de Gastos</p>
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
                          <p className='text-gai'>Comprobación de Viáticos</p>
                          <input className='input-gai' type='checkbox' disabled />
                        </div>
                      </div>
                      <div className='contenedor-1'>
                        <div className='interno-ga2'>
                          <p className='text-gai'>Pago a Proveedores</p>
                          <input className='input-gai' type='checkbox' checked />
                        </div>
                        <div className='interno-ga2'>
                          <p className='text-gai'>Pago a Proveedore por Requisición</p>
                          <input className='input-gai' type='checkbox' disabled />
                        </div>
                        <div className='interno-ga2'>
                          <p className='text-gai'>Transferencias</p>
                          <input className='input-gai' type='checkbox' disabled />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className='tabla-ga'>
                      <table className='tablagas'>
                        <tr>
                          <td className='alltabla-ga'>FOLIO DE LA FACTURA</td>
                          <td className='alltabla-ga'>IMPORTE</td>
                          <td className='alltabla-ga'>LEYENDA ALUSIVA AL GASTO</td>
                        </tr>
                        <tr>
                          <td className='all-tab-f'>{comprometidos.num_factura}</td>
                          <td className='all-tab-f'>{comprometidos.total}</td>
                          <td className='all-tab-f td'>
                            <input
                              className='all-tab-l'
                              type='text'
                              onKeyUp={this.handleChange.bind(this)}
                            />
                          </td>
                        </tr>
                        <tr>
                          <td className='text-total-ga'>TOTAL</td>
                          <td />
                        </tr>
                      </table>
                    </div>
                  </div>
                </div>
                )}
                <ReactToPrint
                  trigger={() =>
                    <div className='c-b-i'>
                      <buttom className='btn-imp-of'>Imprimir</buttom>
                    </div>
                    }
                  content={() => this.gas}
                />
                </div>
              </Popup>
            </div>
          </div>*/}
        </div>

        {/* fondo revolvente */}
        <div ref={el => (this.ogfr = el)} style={{ zIndex: '2', position: 'absolute' }}>
          <div className='title-so-o'>
            <img className='pgjh' src={lpgjh} alt='' />
            <p>SOLICITUD PROGRAMÁTICA DEL GASTO</p>
            <img className='ims' src={logo2} alt='' />
          </div>
          <div className='fadera'>
            <div className='contenedor-soi'>
              <div className='contenedor-1'>
                <div className='interno'>
                  <p className='text-soi'>Gasto a Comprobar</p>
                  <input className='input-so' type='checkbox' />
                </div>
                <div className='interno'>
                  <p className='text-soi'>Comprobación de gasto</p>
                  <input className='input-so' type='checkbox' />
                </div>
              </div>
              <div className='contenedor-1'>
                <div className='interno'>
                  <p className='text-soi'>Creación de fondo Revolvente</p>
                  <input className='input-so' type='checkbox' />
                </div>
                <div className='interno'>
                  <p className='text-soi'>Fondo Revolvente</p>
                  <input className='input-so' type='checkbox' checked/>
                </div>
                <div className='interno'>
                  <p className='text-soi'>Cancelacion de Fondo Revolvente</p>
                  <input className='input-so' type='checkbox'/>
                </div>
              </div>
              <div className='contenedor-1'>
                <div className='interno'>
                  <p className='text-soi'>Viaticos Anticipados</p>
                  <input className='input-so' type='checkbox'/>
                </div>
                <div className='interno'>
                  <p className='text-soi'>Viaticos Denegados</p>
                  <input className='input-so' type='checkbox'/>
                </div>
                <div className='interno'>
                  <p className='text-soi'>Comprobación de viaticos</p>
                  <input className='input-so' type='checkbox'/>
                </div>
                <div className='interno'>
                  <p className='text-soi'>Viaticos al Extrangero</p>
                  <input className='input-so' type='checkbox'/>
                </div>
              </div>
              <div className='contenedor-1'>
                <div className='interno'>
                  <p className='text-soi'>Validación de Objeto del gasto</p>
                  <input className='input-so' type='checkbox'/>
                </div>
                <div className='interno'>
                  <p className='text-soi'>Pago a Proveedores</p>
                  <input className='input-so' type='checkbox'/>
                </div>
                <div className='interno'>
                  <p className='text-soi'>Pago a Proveedores por Requisición</p>
                  <input className='input-so' type='checkbox'/>
                </div>
                <div className='interno'>
                  <p className='text-soi'>Transferencias</p>
                  <input className='input-so' type='checkbox'/>
                </div>
              </div>
            </div>
          </div>
          <div className='padre-lineas'>
            <div className='lineas-so'>
              <div className='internos'>
                <p className='text-intei'>Beneficiario:</p>
                <p className='bene-i'>{this.state.beneficiario}</p>
              </div>
              <div className='internos'>
                <p className='text-intei'>Organo Superior:</p>
                <p className='bene-i'>Procuraduria General de Justicia del Estado</p>
              </div>
              <div className='internos'>
                <p className='text-intei'>Unidad Presupuestal:</p>
                {this.state.comprometidos.map(comprometidos =>
                  <p className='bene-i'>{comprometidos.up}</p>
                )}
              </div>
            </div>
            <div className='folio'>
              <p className='text-folio'>No. Folio</p>
              <p className='fs-if'>{this.state.fondo2}</p>
            </div>
          </div>
          <div style={{ height: '60vh'}}>
            <div>
              <div className='tabla-so'>
                <table>
                  <tr>
                    <td className='all-tablai'>Ramo</td>
                    <td className='all-tablai'>Año</td>
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
                    <td className='all-tablai'>Obj</td>
                    <td className='all-tablai'>Proyecto</td>
                    <td className='all-tablai'>Ext</td>
                    <td className='all-tablai'>Ben</td>
                    <td className='all-tablai'>E Geo</td>
                    <td className='dg-tabla all-tablai'>Descripcion del objeto de Gasto</td>
                    <td className='monto-tabla all-tablai'>Monto</td>
                  </tr>
                  {this.state.comprometidos.map(comprometidos =>
                    <tr>
                      <td className='all-tablai'>
                        {comprometidos.ramo}
                      </td>
                      <td className='all-tablai'>
                        {comprometidos.año}
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
                      <td className='all-tablai'>
                        {comprometidos.npro}
                      </td>
                      <td className='all-tablai'>
                        <CurrencyFormat
                          value={comprometidos.total}
                          displayType='text'
                          thousandSeparator
                          prefix=' $ '
                        />
                      </td>
                    </tr>
                  )}
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
                  </tr>
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
                  </tr>
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
                  </tr>
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
                  </tr>
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
                  </tr>
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
                  </tr>
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
                  </tr>
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
                  </tr>
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
                  </tr>
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
                  </tr>
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
                  </tr>
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
                  </tr>
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
                  </tr>
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
                  </tr>
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
                  </tr>
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
                  </tr>
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
                  </tr>
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
                  </tr>
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
                  </tr>
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
                  </tr>
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
                    <td className='all-tablai  border-color' />
                    <td className='all-tablai  border-color' />
                    <td className='all-tablai  border-color' />
                    <td className='all-tablai  border-color' />
                    <td className='all-tablai  border-color' />
                    <td className='all-tablai border-color2 text-rete'>RETENCION</td>
                    <td className='all-tablai' />
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
                    <td className='all-tablai border-color text-rete'>Total</td>
                    <td className='all-tablai'>
                      <CurrencyFormat
                        value={(totalImporte.reduce(reducer))}
                        displayType='text'
                        thousandSeparator
                        prefix=' $ '
                      />
                    </td>
                  </tr>
                </table>
              </div>
            </div>
          </div>
          <div className='obs-sopadre'>
            <div className='obs-so'>
              <p className='text-osb'>Observaciones</p>
              <div className='input-obs' />
              <div className='obs-so2'>
                <p className='text-osb'> No. De Solicitud</p>
                <input />
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

        <div className='pppdf-subdad' style={{ zIndex: '2', position: 'absolute' }} ref={el => (this.rfr = el)}>
          <div className='fondo-procu'>
            <img className='ime' src={logo2} alt='' />
          </div>
          <div className='no-oficio'>
            <p>
              <b>Oficio No:</b> PGI/DGAyF/{this.state.no_oficio}/2020
              <br /> Pachuca de Soto, Hidalgo a {today}
              <br /><b>Asunto </b>  Reembolso de Fondo Revolvente
            </p>
          </div>
          <div className='prensente'>
            <p>
              <b>
                Lic. César Alberto González López
                <br />Subsecretario de Egresos de la
                <br /> Secretaría de Finanzas Públicas
                <br />Presente
              </b>
            </p>
          </div>
          <div className='añadido'>
            <p>
              <b>
                AT'N: L.C.P. Karina Barrios Velázquez
                <br />Directora General de Contabilidad
                <br />Gubernamental
              </b>
            </p>
          </div>
          <div className='texto-ofi_ppp'>
            <p style={{display: 'flex', flexDirection: 'row', }}>
              Por medio de presente me permito enviar a Usted documentación amparada
              con {this.state.numCompro} de comprobantes por un total
              de $ {this.state.importe} ({(NumberAsString(this.state.importe))}),
              para el trámite de Reembolso de Fondo Revolvente, con cargo al
              proyecto {this.state.proy} {this.state.comprometidos.slice(0, 1).map(comprometidos =>
                <div style={{margin: '0', whiteSpace: 'nowrap', display: 'flex'}}>
                  {comprometidos.no_proyecto}
                </div>
              )}otorgado en el oficio de autorización {this.state.no_oficio} a la
              Procuraduría General de Justicia del Estado de Hidalgo.
            </p>
            <p>Sin otro particular por el momento, reciba un cordial saludo</p>
          </div>
          <div className='atte'>
            <p>
              Atentamente <br />Director General
            </p>
          </div>
          <div className='firma-dad'>
            <div className='firma-raya'>
              <p className='mtro'>MTRO. LEÓN MAXIMILIANO HERNÁNDEZ VALDÉS</p>
            </div>
          </div>
          <div className='ccp'>
            <p className='text'>C.C.P...- Expedien<br />Minutario<br />LMHV/NRL/macht</p>
          </div>
        </div>

        <div className='subdad' ref={el => (this.rec = el)} style={{ zIndex: '2', position: 'absolute' }}>
          <div className='bueno'>
            <p className='texto-de-pdf'>
              Bueno por:
              <CurrencyFormat
                value={this.state.importe}
                displayType='text'
                thousandSeparator
                prefix=' $ '
              />
            </p>
          </div>
          <div className='recibi'>
            <p className='texto-de-pdf' style={{ textAlign: 'justify' }}>
              Recibí de la Secretaría de Finanzas Públicas del Gobierno del Estado
              de Hidalgo la cantidad de
              <CurrencyFormat
                value={this.state.importe}
                displayType='text'
                thousandSeparator
                prefix=' $ '
              />
              ({(NumberAsString(this.state.importe))})
              por concepto de Reposición de Fondo Revolvente, que se aplicarán
              en {this.state.desc}
            </p>
          </div>
          <div className='fecha'>
            <p className='texto-de-pdf'>
              Pachuca de Soto, Hidalgo a {today}
            </p>
          </div>
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

        <div ref={el => (this.gas2 = el)} style={{ zIndex: '2', position: 'absolute', width: '100%' }}>
          <div>
          {this.state.comprometidos.map(comprometidos =>
          <div className={ this.state.pressStatus ? 'nopass' : 'pass' }>
            <div style={{ width: '100%' }}>
              <div className='title-ga'>
                <div>
                  <img className='pgjh' src={lpgjh} alt='' />
                </div>
                <div>
                  <p className='text-titulo-ga'>PROCURADURÍA GENERAL DE JUSTICA DE HIDALGO</p>
                  <p className='text-titulo-ga'>{comprometidos.up}</p>
                  <p className='text-titulo-ga'>{comprometidos.partida}</p>
                </div>
                <div>
                  <img className='ims' src={logo2} alt='' />
                </div>
              </div>
            </div>
            <div className='faderinpo'>
              <div className='contenedor-ga'>
                <div className='contenedor-1 '>
                  <div className='interno-ga2'>
                    <p className='text-gai'>Gasto a Comprobar</p>
                    <input className='input-gai' type='checkbox' />
                  </div>
                  <div className='interno-ga2'>
                    <p className='text-gai'>Comprobacion de Gastos</p>
                    <input className='input-gai' type='checkbox' />
                  </div>
                </div>
                <div className='contenedor-1'>
                  <div className='interno-ga2'>
                    <p className='text-gai'>Creación de Fondo Revolvente</p>
                    <input className='input-gai' type='checkbox' />
                  </div>
                  <div className='interno-ga2'>
                    <p className='text-gai'>Fondo Revolvente</p>
                    <input className='input-gai' type='checkbox' checked />
                  </div>
                  <div className='interno-ga2'>
                    <p className='text-gai'>Cancelacion de Fondo Revolvente</p>
                    <input className='input-gai' type='checkbox' />
                  </div>
                </div>
                <div className='contenedor-1'>
                  <div className='interno-ga2'>
                    <p className='text-gai'>Viaticos Anticipados</p>
                    <input className='input-gai' type='checkbox' />
                  </div>
                  <div className='interno-ga2'>
                    <p className='text-gai'>Viaticos Devengados</p>
                    <input className='input-gai' type='checkbox' />
                  </div>
                  <div className='interno-ga2'>
                    <p className='text-gai'>Comprobación de Viáticos</p>
                    <input className='input-gai' type='checkbox' />
                  </div>
                </div>
                <div className='contenedor-1'>
                  <div className='interno-ga2'>
                    <p className='text-gai'>Pago a Proveedores</p>
                    <input className='input-gai' type='checkbox' />
                  </div>
                  <div className='interno-ga2'>
                    <p className='text-gai'>Transferencias</p>
                    <input className='input-gai' type='checkbox' />
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className='tabla-ga'>
                <table className='tablagas'>
                  <tr>
                    <td className='alltabla-ga'>FOLIO DE LA FACTURA</td>
                    <td className='alltabla-ga'>IMPORTE</td>
                    <td className='alltabla-ga'>LEYENDA ALUSIVA AL GASTO</td>
                  </tr>
                  <tr>
                    <td className='all-tab' />
                    <td className='all-tab' />
                    <td className='all-tab' />
                  </tr>
                  <tr>
                    <td className='all-tab' />
                    <td className='all-tab' />
                    <td className='all-tab' />
                  </tr>
                  <tr>
                    <td className='all-tab' />
                    <td className='all-tab' />
                    <td className='all-tab' />
                  </tr>
                  <tr>
                    <td className='all-tab' />
                    <td className='all-tab' />
                    <td className='all-tab' />
                  </tr>
                  <tr>
                    <td className='all-tab' />
                    <td className='all-tab' />
                    <td className='all-tab' />
                  </tr>
                  <tr>
                    <td className='all-tab text-total-ga'>TOTAL</td>
                    <td className='all-tab' />
                  </tr>
                </table>
              </div>
            </div>
          </div>
          )}
          </div>
        </div>

        {/* Pago Provedor por Requisición */}
        <div ref={el => (this.sol = el)} style={{ zIndex: '2', position: 'absolute' }}>
          <div className='title-so-o'>
            <img className='pgjh' src={lpgjh} alt='' />
            <p>SOLICITUD PROGRAMÁTICA DEL GASTO</p>
            <img className='ims' src={logo2} alt='' />
          </div>
          <div className='fadera'>
            <div className='contenedor-soi'>
              <div className='contenedor-1'>
                <div className='interno'>
                  <p className='text-soi'>Gasto a Comprobar</p>
                  <input className='input-so' type='checkbox' />
                </div>
                <div className='interno'>
                  <p className='text-soi'>Comprobación de gasto</p>
                  <input className='input-so' type='checkbox' />
                </div>
              </div>
              <div className='contenedor-1'>
                <div className='interno'>
                  <p className='text-soi'>Creación de fondo Revolvente</p>
                  <input className='input-so' type='checkbox' />
                </div>
                <div className='interno'>
                  <p className='text-soi'>Fondo Revolvente</p>
                  <input className='input-so' type='checkbox' />
                </div>
                <div className='interno'>
                  <p className='text-soi'>Cancelacion de Fondo Revolvente</p>
                  <input className='input-so' type='checkbox'/>
                </div>
              </div>
              <div className='contenedor-1'>
                <div className='interno'>
                  <p className='text-soi'>Viaticos Anticipados</p>
                  <input className='input-so' type='checkbox'/>
                </div>
                <div className='interno'>
                  <p className='text-soi'>Viaticos Denegados</p>
                  <input className='input-so' type='checkbox'/>
                </div>
                <div className='interno'>
                  <p className='text-soi'>Comprobación de viaticos</p>
                  <input className='input-so' type='checkbox'/>
                </div>
                <div className='interno'>
                  <p className='text-soi'>Viaticos al Extrangero</p>
                  <input className='input-so' type='checkbox'/>
                </div>
              </div>
              <div className='contenedor-1'>
                <div className='interno'>
                  <p className='text-soi'>Validación de Objeto del gasto</p>
                  <input className='input-so' type='checkbox'/>
                </div>
                <div className='interno'>
                  <p className='text-soi'>Pago a Proveedores</p>
                  <input className='input-so' type='checkbox'/>
                </div>
                <div className='interno'>
                  <p className='text-soi'>Pago a Proveedores por Requisición</p>
                  <input className='input-so' type='checkbox' checked/>
                </div>
                <div className='interno'>
                  <p className='text-soi'>Transferencias</p>
                  <input className='input-so' type='checkbox'/>
                </div>
              </div>
            </div>
          </div>
          <div className='padre-lineas'>
            <div className='lineas-so'>
              <div className='internos'>
                <p className='text-intei'>Beneficiario:</p>
                <p className='bene-i'>{this.state.beneficiario}</p>
              </div>
              <div className='internos'>
                <p className='text-intei'>Organo Superior:</p>
                <p className='bene-i'>Procuraduria General de Justicia del Estado</p>
              </div>
              <div className='internos'>
                <p className='text-intei'>Unidad Presupuestal:</p>
                {this.state.comprometidos.map(comprometidos =>
                  <p className='bene-i'>{comprometidos.up}</p>
                )}
              </div>
            </div>
            <div className='folio'>
              <p className='text-folio'>No. Folio</p>
              <p className='fs-if'>{this.state.fondo2}</p>
            </div>
          </div>
          <div style={{ height: '60vh'}}>
            <div>
              <div className='tabla-so'>
                <table>
                  <tr>
                    <td className='all-tablai' style={{ transform: 'rotate(90deg)', height: '170px'}}>Ramo</td>
                    <td className='all-tablai' style={{ transform: 'rotate(90deg)', height: '170px'}}>Año</td>
                    <td className='all-tablai' style={{ transform: 'rotate(90deg)', height: '170px'}}>OS</td>
                    <td className='all-tablai' style={{ transform: 'rotate(90deg)', height: '170px'}}>UP</td>
                    <td className='all-tablai' style={{ transform: 'rotate(90deg)', height: '170px'}}>Rubro de Ingreso</td>
                    <td className='all-tablai' style={{ transform: 'rotate(90deg)', height: '170px'}}>TG</td>
                    <td className='all-tablai' style={{ transform: 'rotate(90deg)', height: '170px'}}>Objeto de un Gasto</td>
                    <td className='all-tablai' style={{ transform: 'rotate(90deg)', height: '170px'}}>Finalidad</td>
                    <td className='all-tablai' style={{ transform: 'rotate(90deg)', height: '170px'}}>Funcion</td>
                    <td className='all-tablai' style={{ transform: 'rotate(90deg)', height: '170px'}}>Subfunción</td>
                    <td className='all-tablai' style={{ transform: 'rotate(90deg)', height: '170px'}}>Eje</td>
                    <td className='all-tablai' style={{ transform: 'rotate(90deg)', height: '170px'}}>Sect</td>
                    <td className='all-tablai' style={{ transform: 'rotate(90deg)', height: '170px'}}>Prog</td>
                    <td className='all-tablai' style={{ transform: 'rotate(90deg)', height: '170px'}}>Obj</td>
                    <td className='all-tablai' style={{ transform: 'rotate(90deg)', height: '170px'}}>Proyecto</td>
                    <td className='all-tablai' style={{ transform: 'rotate(90deg)', height: '170px'}}>Ext</td>
                    <td className='all-tablai' style={{ transform: 'rotate(90deg)', height: '170px'}}>Ben</td>
                    <td className='all-tablai' style={{ transform: 'rotate(90deg)', height: '170px'}}>E Geo</td>
                    <td className='dg-tabla all-tablai' style={{ transform: 'rotate(90deg)', height: '170px'}}>Descripcion del objeto de Gasto</td>
                    <td className='monto-tabla all-tablai' style={{ transform: 'rotate(90deg)', height: '170px'}}>Monto</td>
                  </tr>
                  {this.state.comprometidos.map(comprometidos =>
                    <tr>
                      <td className='all-tablai'>
                        {comprometidos.ramo}
                      </td>
                      <td className='all-tablai'>
                        {comprometidos.año}
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
                      <td className='all-tablai'>
                        {comprometidos.npro}
                      </td>
                      <td className='all-tablai'>
                        <CurrencyFormat
                          value={comprometidos.total}
                          displayType='text'
                          thousandSeparator
                          prefix=' $ '
                        />
                      </td>
                    </tr>
                  )}
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
                  </tr>
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
                  </tr>
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
                  </tr>
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
                  </tr>
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
                  </tr>
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
                  </tr>
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
                  </tr>
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
                  </tr>
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
                  </tr>
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
                  </tr>
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
                  </tr>
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
                  </tr>
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
                  </tr>
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
                  </tr>
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
                  </tr>
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
                  </tr>
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
                  </tr>
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
                  </tr>
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
                  </tr>
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
                  </tr>
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
                    <td className='all-tablai  border-color' />
                    <td className='all-tablai  border-color' />
                    <td className='all-tablai  border-color' />
                    <td className='all-tablai  border-color' />
                    <td className='all-tablai  border-color' />
                    <td className='all-tablai border-color2 text-rete'>RETENCION</td>
                    <td className='all-tablai' />
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
                    <td className='all-tablai border-color text-rete'>Total</td>
                    <td className='all-tablai'>
                      <CurrencyFormat
                        value={(totalImporte.reduce(reducer))}
                        displayType='text'
                        thousandSeparator
                        prefix=' $ '
                      />
                    </td>
                  </tr>
                </table>
              </div>
            </div>
          </div>
          <div className='obs-sopadre'>
            <div className='obs-so'>
              <p className='text-osb'>Observaciones</p>
              <div className='input-obs' />
              <div className='obs-so2'>
                <p className='text-osb'> No. De Solicitud</p>
                <input />
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

        <div className='pppdf-subdad' ref={el => (this.ofi = el)} style={{ zIndex: '2', position: 'absolute' }}>
          <div className='fondo-procu'>
            <img className='ime' src={logo2} alt='' />
          </div>
          <div className='no-oficio'>
            <p>
              <b>Oficio No:</b>PGI/DGAyF/{this.state.no_oficio}/2020
              <br /> Pachuca de Soto, Hidalgo a {today}
              <br /><b>Asunto </b>Solicitud de Pago Proveedor por Requisicón
            </p>
          </div>
          <div className='prensente'>
            <p>
              <b>
                Lic. César Alberto González López
                <br />Subsecretario de Egresos de la
                <br /> Secretaría de Finanzas Públicas
                <br />Presente
              </b>
            </p>
          </div>
          <div className='añadido'>
            <p>
              <b>
                AT'N: L.C.P. Karina Barrios Velázquez
                <br />Directora General de Contabilidad
                <br />Gubernamental
              </b>
            </p>
          </div>
          <div className='texto-ofi_ppp'>
            <p>
              Por medio de presente me permito enviar a Usted documentación por
              un importe total de $ {this.state.importe} ({(NumberAsString(this.state.importe))}),
              cantidad amparada con CFDI No {this.state.cfdi},
              número de requisición {this.state.requisicion} pedido/contrato {this.state.pedido},
              asi como la poliza de afectacion presupuestal al momento del comprometido
              núm. {this.state.no_lici} que se emite la Direccion General de Compras Públicas;
              para que se efectúe el trámite de pago  a favor del proveedor {this.state.beneficiario},
              por la compra o presentacion de servicios, con cargo
              al proyecto (clave y nombre del proyecto) y de los recursos otorgados
              con el oficio de autorización {this.state.no_oficio}, a la a la
              Procuraduría General de Justicia del Estado de Hidalgo.
            </p>
            <p>Sin otro particular por el momento, reciba un cordial saludo</p>
          </div>
          <div className='atte'>
            <p>
              Atentamente
              <br />Director General
            </p>
          </div>
          <div class='firma-dad'>
            <div class='firma-raya'>
              <p class='mtro'>MTRO. LEÓN MAXIMILIANO HERNÁNDEZ VALDÉS</p>
            </div>
          </div>
          <div class='ccp'>
            <p class='text'>C.C.P...- Expedien<br />Minutario<br />LMHV/NRL/macht</p>
          </div>
        </div>

        <div ref={el => (this.gast = el)} style={{ zIndex: '2', position: 'absolute', width: '100%' }}>
          {this.state.comprometidos.map(comprometidos =>
          <div style={{ height: '100vh', zIndex: '2', position: 'absolute', width: '100%' }}>
            <div style={{ width: '100%' }}>
              <div className='title-ga'>
                <div>
                  <img className='pgjh' src={lpgjh} alt='' />
                </div>
                <div>
                  <p className='text-titulo-ga'>PROCURADURÍA GENERAL DE JUSTICA DE HIDALGO</p>
                  <p className='text-titulo-ga'>{comprometidos.up}</p>
                  <p className='text-titulo-ga'>{comprometidos.partida}</p>
                </div>
                <div>
                  <img className='ims' src={logo2} alt='' />
                </div>
              </div>
            </div>
            <div className='faderinpo'>
              <div className='contenedor-ga'>
                <div className='contenedor-1 '>
                  <div className='interno-ga2'>
                    <p className='text-gai'>Gasto a Comprobar</p>
                    <input className='input-gai' type='checkbox' checked />
                  </div>
                  <div className='interno-ga2'>
                    <p className='text-gai'>Comprobacion de Gastos</p>
                    <input className='input-gai' type='checkbox' />
                  </div>
                </div>
                <div className='contenedor-1'>
                  <div className='interno-ga2'>
                    <p className='text-gai'>Creación de Fondo Revolvente</p>
                    <input className='input-gai' type='checkbox' />
                  </div>
                  <div className='interno-ga2'>
                    <p className='text-gai'>Fondo Revolvente</p>
                    <input className='input-gai' type='checkbox' />
                  </div>
                  <div className='interno-ga2'>
                    <p className='text-gai'>Cancelacion de Fondo Revolvente</p>
                    <input className='input-gai' type='checkbox' />
                  </div>
                </div>
                <div className='contenedor-1'>
                  <div className='interno-ga2'>
                    <p className='text-gai'>Viaticos Anticipados</p>
                    <input className='input-gai' type='checkbox' />
                  </div>
                  <div className='interno-ga2'>
                    <p className='text-gai'>Viaticos Devengados</p>
                    <input className='input-gai' type='checkbox' />
                  </div>
                  <div className='interno-ga2'>
                    <p className='text-gai'>Comprobación de Viáticos</p>
                    <input className='input-gai' type='checkbox' />
                  </div>
                </div>
                <div className='contenedor-1'>
                  <div className='interno-ga2'>
                    <p className='text-gai'>Pago a Proveedores</p>
                    <input className='input-gai' type='checkbox' />
                  </div>
                  <div className='interno-ga2'>
                    <p className='text-gai'>Transferencias</p>
                    <input className='input-gai' type='checkbox' />
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className='tabla-ga'>
                <table className='tablagas'>
                  <tr>
                    <td className='alltabla-ga'>FOLIO DE LA FACTURA</td>
                    <td className='alltabla-ga'>IMPORTE</td>
                    <td className='alltabla-ga'>LEYENDA ALUSIVA AL GASTO</td>
                  </tr>
                  <tr>
                    <td className='all-tab' />
                    <td className='all-tab' />
                    <td className='all-tab' />
                  </tr>
                  <tr>
                    <td className='all-tab' />
                    <td className='all-tab' />
                    <td className='all-tab' />
                  </tr>
                  <tr>
                    <td className='all-tab' />
                    <td className='all-tab' />
                    <td className='all-tab' />
                  </tr>
                  <tr>
                    <td className='all-tab' />
                    <td className='all-tab' />
                    <td className='all-tab' />
                  </tr>
                  <tr>
                    <td className='all-tab' />
                    <td className='all-tab' />
                    <td className='all-tab' />
                  </tr>
                  <tr>
                    <td className='all-tab text-total-ga'>TOTAL</td>
                    <td className='all-tab' />
                  </tr>
                </table>
              </div>
            </div>
          </div>
          )}
        </div>

        {/* Pago Provedor */}
        <div className='pppdf-subdad' ref={el => (this.opp = el)} style={{ zIndex: '2', position: 'absolute' }}>
          <div className='fondo-procu'>
            <img className='ime' src={logo2} alt='' />
          </div>
          <div className='no-oficio'>
            <p>
              <b>Oficio No:</b> PGI/DGAyF/{this.state.no_oficio}
              <br /> Pachuca de Soto, Hidalgo a {today}
              <br /><b>Asunto </b>Pago a Proveedor
            </p>
          </div>
          <div className='prensente'>
            <p>
              <b>
                Lic. César Alberto González López
                <br />Subsecretario de Egresos de la
                <br /> Secretaría de Finanzas Públicas
                <br />Presente
              </b>
            </p>
          </div>
          <div className='añadido'>
            <p>
              <b>
                AT'N: L.C.P. Karina Barrios Velázquez
                <br />Directora General de Contbilidad
                <br />Gubernamental
              </b>
            </p>
          </div>
          <div className='texto-ofi_ppp'>
            <p>
              Por este medio me permito enviar a Usted documentación por un importe total de
              <CurrencyFormat
                value={this.state.importe}
                displayType='text'
                thousandSeparator
                prefix=' $ '
              /> ({(NumberAsString(this.state.importe))}),
              cantidad amparada con los CFDI No. {this.state.cfdi},
              para el trámite de pago a favor del proveedor {this.state.beneficiario},
              por la compra o prestación de  servicios {this.state.desc},
              con cargo al proyecto {proyectof} y {this.state.no_proyec}
              y a los recursos otorgados con el oficio de autorización {this.state.oficio_aut},
              a la Procuraduria General de Justicia del Estado de Hidalgo.
            </p>
            <p>Sin otro particular por el momento, reciba un cordial saludo</p>
          </div>
          <div>
            <div className='atte'>
              <p>
                Atentamente<br />Director General
              </p>
            </div>
            <div className='firma-dad'>
              <div className='firma-raya'>
                <p className='mtro'>MTRO. LEÓN MAXIMILIANO HERNÁNDEZ VALDÉS</p>
              </div>
            </div>
          </div>
          <div className='pie'>
            <div className='ccp'>
              <p className='text'>C.C.P...- Expedien<br />Minutario<br />LMHV/NRL/macht</p>
            </div>
            <div>
              <p align='right'> {this.state.fondo2}</p>
            </div>
          </div>
        </div>

        <div ref={el => (this.sp = el)} style={{ zIndex: '2', position: 'absolute' }}>
        <div className='title-so-o'>
          <img className='pgjh' src={lpgjh} alt='' />
          <p>SOLICITUD PROGRAMÁTICA DEL GASTO</p>
          <img className='ims' src={logo2} alt='' />
        </div>
        <div className='fadera'>
          <div className='contenedor-soi'>
            <div className='contenedor-1'>
              <div className='interno'>
                <p className='text-soi'>Gasto a Comprobar</p>
                <input className='input-so' type='checkbox' />
              </div>
              <div className='interno'>
                <p className='text-soi'>Comprobación de gasto</p>
                <input className='input-so' type='checkbox' />
              </div>
            </div>
            <div className='contenedor-1'>
              <div className='interno'>
                <p className='text-soi'>Creación de fondo Revolvente</p>
                <input className='input-so' type='checkbox' />
              </div>
              <div className='interno'>
                <p className='text-soi'>Fondo Revolvente</p>
                <input className='input-so' type='checkbox' checked/>
              </div>
              <div className='interno'>
                <p className='text-soi'>Cancelacion de Fondo Revolvente</p>
                <input className='input-so' type='checkbox'/>
              </div>
            </div>
            <div className='contenedor-1'>
              <div className='interno'>
                <p className='text-soi'>Viaticos Anticipados</p>
                <input className='input-so' type='checkbox'/>
              </div>
              <div className='interno'>
                <p className='text-soi'>Viaticos Denegados</p>
                <input className='input-so' type='checkbox'/>
              </div>
              <div className='interno'>
                <p className='text-soi'>Comprobación de viaticos</p>
                <input className='input-so' type='checkbox'/>
              </div>
              <div className='interno'>
                <p className='text-soi'>Viaticos al Extrangero</p>
                <input className='input-so' type='checkbox'/>
              </div>
            </div>
            <div className='contenedor-1'>
              <div className='interno'>
                <p className='text-soi'>Validación de Objeto del gasto</p>
                <input className='input-so' type='checkbox'/>
              </div>
              <div className='interno'>
                <p className='text-soi'>Pago a Proveedores</p>
                <input className='input-so' type='checkbox'/>
              </div>
              <div className='interno'>
                <p className='text-soi'>Pago a Proveedores por Requisición</p>
                <input className='input-so' type='checkbox'/>
              </div>
              <div className='interno'>
                <p className='text-soi'>Transferencias</p>
                <input className='input-so' type='checkbox'/>
              </div>
            </div>
          </div>
        </div>
        <div className='padre-lineas'>
          <div className='lineas-so'>
            <div className='internos'>
              <p className='text-intei'>Beneficiario:</p>
              <p className='bene-i'>{this.state.beneficiario}</p>
            </div>
            <div className='internos'>
              <p className='text-intei'>Organo Superior:</p>
              <p className='bene-i'>Procuraduria General de Justicia del Estado</p>
            </div>
            <div className='internos'>
              <p className='text-intei'>Unidad Presupuestal:</p>
              {myListComprometidos.map(comprometidos =>
                <p className='bene-i'>
                  {myListComprometidos.length <= 1 ?
                    (comprometidos.up === '01' &&
                    'Atención y seguimiento a peticiones recibidas en el despacho del procurador atendidas')
                    ||
                    (comprometidos.up === '02' &&
                    'Casos penales de la región oriente resueltas')
                    ||
                    (comprometidos.up === '03' &&
                    'Delitos cometidos en contra de la libertad de expresión, periodistas y personas defensoras de los derechos humanos investigados')
                    ||
                    (comprometidos.up === '04' &&
                    'Averiguaciones previas del sistema tradicional concluidas')
                    ||
                    (comprometidos.up === '05' &&
                    'Casos penales en materia de delitos electorales resueltos')
                    ||
                    (comprometidos.up === '06' &&
                    'Casos penales determinados, concluidos o resueltos en delitos que atenten contra la mujer y la familia')
                    ||
                    (comprometidos.up === '07' &&
                    'Acuerdos reparatorios generados a través de la aplicación de los mecanismos alternativos de solución de controversias en materia penal en la región poniente')
                    ||
                    (comprometidos.up === '08' &&
                    'Investigación y supervisión de los casos penales con motivo de feminicidio')
                    ||
                    (comprometidos.up === '09' &&
                    'Quejas y denuncias por la posible comisión de conductas indebidas en las que incurran las y los servidores públicos atendidas')
                    ||
                    (comprometidos.up === '10' &&
                    'Intervenciones periciales a autoridades de procuración de justicia para una correcta integración del expediente en casos penales entregados')
                    ||
                    (comprometidos.up === '11' &&
                    'Casos penales del delito de narcomenudeo resueltos')
                    ||
                    (comprometidos.up === '12' &&
                    'Casos penales atendidos por los delistos de secuentro y extorsión')
                    ||
                    (comprometidos.up === '13' &&
                    'Gestión administrativa de recursos humanos,financiera, materiales, de informática, de archivo, de calidad, de aportaciones federales, planeación estratégica realizada')
                    ||
                    (comprometidos.up === '14' &&
                    'Determinación y/o resolución de los casos penales de los delitos de trata de personas, lenocinio y delitos conexos')
                    ||
                    (comprometidos.up === '15' &&
                    'Casos penales de la región poniente resueltas')
                    ||
                    (comprometidos.up === '16' &&
                    'Atenciones ciudadanas en los módulos de atención temprana en la región poniente brindadas')
                    ||
                    (comprometidos.up === '17' &&
                    'Determinación en las carpetas de investigación en las unidades de investigación de la regiones poniente')
                    ||
                    (comprometidos.up === '18' &&
                    'Investigación policial ejecutada')
                    ||
                    (comprometidos.up === '20' &&
                    'Atenciones ciudadanas en los módulos de atención temprana en la región poniente brindadas')
                    ||
                    (comprometidos.up === '21' &&
                    'Acuerdos reparatorios generados a traves de la aplicación de los mecanismos alternativos de solución de controversias en materia penal en la región oriente')
                    ||
                    (comprometidos.up === '22' &&
                    'Determinación en las carpetas de investigación en las unidades de investigación de la regiones oriente')
                    ||
                    (comprometidos.up === '23' &&
                    'Delitos de corrupción resueltos')
                    ||
                    (comprometidos.up === '24' &&
                    'Casos penales determinados, concluidos o resueltos de delitos en materia de desaparición forzada de personas cometidos por particulares, delitos vinculados y de personas no localizadas realizados')
                    :
                    ''
                  }
                </p>
              )}
            </div>
          </div>
          <div className='folio'>
            <p className='text-folio'>No. Folio</p>
            <p className='fs-if'>{this.state.fondo2}</p>
          </div>
        </div>
        <div style={{ height: '60vh'}}>
          <div>
            <div className='tabla-so'>
              <table>
                <tr>
                  <td className='all-tablai'>Ramo</td>
                  <td className='all-tablai'>Año</td>
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
                {myListComprometidos.map(comprometidos =>
                  <tr>
                    <td className='all-tablai'>
                      {comprometidos.ramo}
                    </td>
                    <td className='all-tablai'>
                      {comprometidos.año}
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
                    <td className='all-tablai' style={{ textAlign: 'left' }}>
                      {comprometidos.npro}
                    </td>
                    <td className='all-tablai'>
                      <CurrencyFormat
                        value={comprometidos.total}
                        displayType='text'
                        thousandSeparator
                        prefix=' $ '
                      />
                    </td>
                  </tr>
                )}
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
                </tr>
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
                </tr>
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
                </tr>
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
                </tr>
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
                </tr>
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
                </tr>
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
                </tr>
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
                </tr>
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
                </tr>
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
                </tr>
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
                </tr>
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
                </tr>
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
                </tr>
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
                </tr>
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
                </tr>
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
                </tr>
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
                </tr>
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
                </tr>
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
                </tr>
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
                </tr>
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
                  <td className='all-tablai  border-color' />
                  <td className='all-tablai  border-color' />
                  <td className='all-tablai  border-color' />
                  <td className='all-tablai  border-color' />
                  <td className='all-tablai  border-color' />
                  <td className='all-tablai border-color2 text-rete'>RETENCION</td>
                  <td className='all-tablai' />
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
                  <td className='all-tablai border-color text-rete'>Total</td>
                  <td className='all-tablai'>
                    <CurrencyFormat
                      value={(totalImporte.reduce(reducer))}
                      displayType='text'
                      thousandSeparator
                      prefix=' $ '
                    />
                  </td>
                </tr>
              </table>
            </div>
          </div>
        </div>
        <div className='obs-sopadre'>
          <div className='obs-so'>
            <p className='text-osb'>Observaciones</p>
            <div className='input-obs' />
            <div className='obs-so2'>
              <p className='text-osb'>No. De Solicitud</p>
              <input />
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

        {/*<div ref={el => (this.la = el)} style={{ zIndex: '2', position: 'absolute', width: '100%' }}>
          {this.state.comprometidos.map(comprometidos =>
          <div style={{ height: '100vh', zIndex: '2', position: 'absolute', width: '100%' }}>
            <div style={{ width: '100%' }}>
              <div className='title-ga'>
                <div>
                  <img className='pgjh' src={lpgjh} alt='' />
                </div>
                <div>
                  <p className='text-titulo-ga'>PROCURADURÍA GENERAL DE JUSTICA DE HIDALGO</p>
                  {myListComprometidos.map(comprometidos =>
                    <p className='text-titulo-ga'>
                      {myListComprometidos.length <= 1 ?
                        (comprometidos.up === '01' &&
                        'Atención y seguimiento a peticiones recibidas en el despacho del procurador atendidas')
                        ||
                        (comprometidos.up === '02' &&
                        'Casos penales de la región oriente resueltas')
                        ||
                        (comprometidos.up === '03' &&
                        'Delitos cometidos en contra de la libertad de expresión, periodistas y personas defensoras de los derechos humanos investigados')
                        ||
                        (comprometidos.up === '04' &&
                        'Averiguaciones previas del sistema tradicional concluidas')
                        ||
                        (comprometidos.up === '05' &&
                        'Casos penales en materia de delitos electorales resueltos')
                        ||
                        (comprometidos.up === '06' &&
                        'Casos penales determinados, concluidos o resueltos en delitos que atenten contra la mujer y la familia')
                        ||
                        (comprometidos.up === '07' &&
                        'Acuerdos reparatorios generados a través de la aplicación de los mecanismos alternativos de solución de controversias en materia penal en la región poniente')
                        ||
                        (comprometidos.up === '08' &&
                        'Investigación y supervisión de los casos penales con motivo de feminicidio')
                        ||
                        (comprometidos.up === '09' &&
                        'Quejas y denuncias por la posible comisión de conductas indebidas en las que incurran las y los servidores públicos atendidas')
                        ||
                        (comprometidos.up === '10' &&
                        'Intervenciones periciales a autoridades de procuración de justicia para una correcta integración del expediente en casos penales entregados')
                        ||
                        (comprometidos.up === '11' &&
                        'Casos penales del delito de narcomenudeo resueltos')
                        ||
                        (comprometidos.up === '12' &&
                        'Casos penales atendidos por los delistos de secuentro y extorsión')
                        ||
                        (comprometidos.up === '13' &&
                        'Gestión administrativa de recursos humanos,financiera, materiales, de informática, de archivo, de calidad, de aportaciones federales, planeación estratégica realizada')
                        ||
                        (comprometidos.up === '14' &&
                        'Determinación y/o resolución de los casos penales de los delitos de trata de personas, lenocinio y delitos conexos')
                        ||
                        (comprometidos.up === '15' &&
                        'Casos penales de la región poniente resueltas')
                        ||
                        (comprometidos.up === '16' &&
                        'Atenciones ciudadanas en los módulos de atención temprana en la región poniente brindadas')
                        ||
                        (comprometidos.up === '17' &&
                        'Determinación en las carpetas de investigación en las unidades de investigación de la regiones poniente')
                        ||
                        (comprometidos.up === '18' &&
                        'Investigación policial ejecutada')
                        ||
                        (comprometidos.up === '20' &&
                        'Atenciones ciudadanas en los módulos de atención temprana en la región poniente brindadas')
                        ||
                        (comprometidos.up === '21' &&
                        'Acuerdos reparatorios generados a traves de la aplicación de los mecanismos alternativos de solución de controversias en materia penal en la región oriente')
                        ||
                        (comprometidos.up === '22' &&
                        'Determinación en las carpetas de investigación en las unidades de investigación de la regiones oriente')
                        ||
                        (comprometidos.up === '23' &&
                        'Delitos de corrupción resueltos')
                        ||
                        (comprometidos.up === '24' &&
                        'Casos penales determinados, concluidos o resueltos de delitos en materia de desaparición forzada de personas cometidos por particulares, delitos vinculados y de personas no localizadas realizados')
                        :
                        ''
                      }
                    </p>
                  )}
                  <p className='text-titulo-ga'>{comprometidos.partida}</p>
                </div>
                <div>
                  <img className='ims' src={logo2} alt='' />
                </div>
              </div>
            </div>
            <div className='faderinpo'>
              <div className='contenedor-ga'>
                <div className='contenedor-1 '>
                  <div className='interno-ga2'>
                    <p className='text-gai'>Gasto a Comprobar</p>
                    <input className='input-gai' type='checkbox' />
                  </div>
                  <div className='interno-ga2'>
                    <p className='text-gai'>Comprobacion de Gastos</p>
                    <input className='input-gai' type='checkbox' checked />
                  </div>
                </div>
                <div className='contenedor-1'>
                  <div className='interno-ga2'>
                    <p className='text-gai'>Creación de Fondo Revolvente</p>
                    <input className='input-gai' type='checkbox' />
                  </div>
                  <div className='interno-ga2'>
                    <p className='text-gai'>Fondo Revolvente</p>
                    <input className='input-gai' type='checkbox' />
                  </div>
                  <div className='interno-ga2'>
                    <p className='text-gai'>Cancelacion de Fondo Revolvente</p>
                    <input className='input-gai' type='checkbox' />
                  </div>
                </div>
                <div className='contenedor-1'>
                  <div className='interno-ga2'>
                    <p className='text-gai'>Viaticos Anticipados</p>
                    <input className='input-gai' type='checkbox' />
                  </div>
                  <div className='interno-ga2'>
                    <p className='text-gai'>Viaticos Devengados</p>
                    <input className='input-gai' type='checkbox' />
                  </div>
                  <div className='interno-ga2'>
                    <p className='text-gai'>Comprobación de Viáticos</p>
                    <input className='input-gai' type='checkbox' />
                  </div>
                </div>
                <div className='contenedor-1'>
                  <div className='interno-ga2'>
                    <p className='text-gai'>Pago a Proveedores</p>
                    <input className='input-gai' type='checkbox' />
                  </div>
                  <div className='interno-ga2'>
                    <p className='text-gai'>Transferencias</p>
                    <input className='input-gai' type='checkbox' />
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className='tabla-ga'>
                <table className='tablagas'>
                  <tr>
                    <td className='alltabla-ga'>FOLIO DE LA FACTURA</td>
                    <td className='alltabla-ga'>IMPORTE</td>
                    <td className='alltabla-ga'>LEYENDA ALUSIVA AL GASTO</td>
                  </tr>
                  <tr>
                    <td className='all-tab' />
                    <td className='all-tab' />
                    <td className='all-tab' />
                  </tr>
                  <tr>
                    <td className='all-tab' />
                    <td className='all-tab' />
                    <td className='all-tab' />
                  </tr>
                  <tr>
                    <td className='all-tab' />
                    <td className='all-tab' />
                    <td className='all-tab' />
                  </tr>
                  <tr>
                    <td className='all-tab' />
                    <td className='all-tab' />
                    <td className='all-tab' />
                  </tr>
                  <tr>
                    <td className='all-tab' />
                    <td className='all-tab' />
                    <td className='all-tab' />
                  </tr>
                  <tr>
                    <td className='all-tab text-total-ga'>TOTAL</td>
                    <td className='all-tab' />
                  </tr>
                </table>
              </div>
            </div>
          </div>
          )}
        </div>*/}

        {/* Diciembre */}
        <div className='pppdf-subdad' ref={el => (this.cgc = el)} style={{ zIndex: '2', position: 'absolute' }}>
          <div className='fondo-procu'>
            <img className='ime' src={logo2} alt='' />
          </div>
          <div className='no-oficio'>
            <p>
              <b>Oficio No: </b>
              PGI/DGAyF/ {this.state.no_oficio}<br />
              Pachuca de Soto, Hidalgo a {today}<br />
              <b>Asunto </b>
              Solicitud de Pago Proveedor por Requisicón
            </p>
          </div>
          <div className='prensente'>
            <p>
              <b>
                Lic. César Alberto González López
                <br />Subsecretario de Egresos de la
                <br /> Secretaría de Finanzas Públicas
                <br />Presente
              </b>
            </p>
          </div>
          <div className='añadido'>
            <p>
              <b>AT'N: L.C.P. Karina Barrios Velázquez
                <br />Directora General de Contabilidad
                <br />Gubernamental
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

        <div ref={el => (this.spd = el)} style={{ zIndex: '2', position: 'absolute' }}>
        <div className='title-so-o'>
          <img className='pgjh' src={lpgjh} alt='' />
          <p>SOLICITUD PROGRAMÁTICA DEL GASTO</p>
          <img className='ims' src={logo2} alt='' />
        </div>
        <div className='fadera'>
          <div className='contenedor-soi'>
            <div className='contenedor-1'>
              <div className='interno'>
                <p className='text-soi'>Gasto a Comprobar</p>
                <input className='input-so' type='checkbox' />
              </div>
              <div className='interno'>
                <p className='text-soi'>Comprobación de gasto</p>
                <input className='input-so' type='checkbox' />
              </div>
            </div>
            <div className='contenedor-1'>
              <div className='interno'>
                <p className='text-soi'>Creación de fondo Revolvente</p>
                <input className='input-so' type='checkbox' />
              </div>
              <div className='interno'>
                <p className='text-soi'>Fondo Revolvente</p>
                <input className='input-so' type='checkbox' checked/>
              </div>
              <div className='interno'>
                <p className='text-soi'>Cancelacion de Fondo Revolvente</p>
                <input className='input-so' type='checkbox'/>
              </div>
            </div>
            <div className='contenedor-1'>
              <div className='interno'>
                <p className='text-soi'>Viaticos Anticipados</p>
                <input className='input-so' type='checkbox'/>
              </div>
              <div className='interno'>
                <p className='text-soi'>Viaticos Denegados</p>
                <input className='input-so' type='checkbox'/>
              </div>
              <div className='interno'>
                <p className='text-soi'>Comprobación de viaticos</p>
                <input className='input-so' type='checkbox'/>
              </div>
              <div className='interno'>
                <p className='text-soi'>Viaticos al Extrangero</p>
                <input className='input-so' type='checkbox'/>
              </div>
            </div>
            <div className='contenedor-1'>
              <div className='interno'>
                <p className='text-soi'>Validación de Objeto del gasto</p>
                <input className='input-so' type='checkbox'/>
              </div>
              <div className='interno'>
                <p className='text-soi'>Pago a Proveedores</p>
                <input className='input-so' type='checkbox'/>
              </div>
              <div className='interno'>
                <p className='text-soi'>Pago a Proveedores por Requisición</p>
                <input className='input-so' type='checkbox'/>
              </div>
              <div className='interno'>
                <p className='text-soi'>Transferencias</p>
                <input className='input-so' type='checkbox'/>
              </div>
            </div>
          </div>
        </div>
        <div className='padre-lineas'>
          <div className='lineas-so'>
            <div className='internos'>
              <p className='text-intei'>Beneficiario:</p>
              <p className='bene-i'>{this.state.beneficiario}</p>
            </div>
            <div className='internos'>
              <p className='text-intei'>Organo Superior:</p>
              <p className='bene-i'>Procuraduria General de Justicia del Estado</p>
            </div>
            <div className='internos'>
              <p className='text-intei'>Unidad Presupuestal:</p>
              {this.state.comprometidos.map(comprometidos =>
                <p className='bene-i'>{comprometidos.up}</p>
              )}
            </div>
          </div>
          <div className='folio'>
            <p className='text-folio'>No. Folio</p>
            <p className='fs-if'>{this.state.fondo2}</p>
          </div>
        </div>
        <div style={{ height: '60vh'}}>
          <div>
            <div className='tabla-so'>
              <table>
                <tr>
                  <td className='all-tablai'>Ramo</td>
                  <td className='all-tablai'>Año</td>
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
                  <td className='all-tablai'>Obj</td>
                  <td className='all-tablai'>Proyecto</td>
                  <td className='all-tablai'>Ext</td>
                  <td className='all-tablai'>Ben</td>
                  <td className='all-tablai'>E Geo</td>
                  <td className='dg-tabla all-tablai'>Descripcion del objeto de Gasto</td>
                  <td className='monto-tabla all-tablai'>Monto</td>
                </tr>
                {this.state.comprometidos.map(comprometidos =>
                  <tr>
                    <td className='all-tablai'>
                      {comprometidos.ramo}
                    </td>
                    <td className='all-tablai'>
                      {comprometidos.año}
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
                    <td className='all-tablai'>
                      {comprometidos.npro}
                    </td>
                    <td className='all-tablai'>
                      <CurrencyFormat
                        value={comprometidos.total}
                        displayType='text'
                        thousandSeparator
                        prefix=' $ '
                      />
                    </td>
                  </tr>
                )}
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
                </tr>
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
                </tr>
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
                </tr>
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
                </tr>
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
                </tr>
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
                </tr>
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
                </tr>
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
                </tr>
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
                </tr>
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
                </tr>
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
                </tr>
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
                </tr>
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
                </tr>
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
                </tr>
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
                </tr>
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
                </tr>
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
                </tr>
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
                </tr>
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
                </tr>
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
                </tr>
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
                  <td className='all-tablai  border-color' />
                  <td className='all-tablai  border-color' />
                  <td className='all-tablai  border-color' />
                  <td className='all-tablai  border-color' />
                  <td className='all-tablai  border-color' />
                  <td className='all-tablai border-color2 text-rete'>RETENCION</td>
                  <td className='all-tablai' />
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
                  <td className='all-tablai border-color text-rete'>Total</td>
                  <td className='all-tablai'>
                    <CurrencyFormat
                      value={(totalImporte.reduce(reducer))}
                      displayType='text'
                      thousandSeparator
                      prefix=' $ '
                    />
                  </td>
                </tr>
              </table>
            </div>
          </div>
        </div>
        <div className='obs-sopadre'>
          <div className='obs-so'>
            <p className='text-osb'>Observaciones</p>
            <div className='input-obs' />
            <div className='obs-so2'>
              <p className='text-osb'> No. De Solicitud</p>
              <input />
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

        <div ref={el => (this.lap = el)} style={{ zIndex: '2', position: 'absolute', width: '100%' }}>
          {this.state.comprometidos.map(comprometidos =>
            <div style={{ height: '100vh', zIndex: '2', position: 'absolute', width: '100%' }}>
              <div style={{ width: '100%' }}>
                <div className='title-ga'>
                  <div>
                    <img className='pgjh' src={lpgjh} alt='' />
                  </div>
                  <div>
                    <p className='text-titulo-ga'>PROCURADURÍA GENERAL DE JUSTICA DE HIDALGO</p>
                    <p className='text-titulo-ga'>{comprometidos.up}</p>
                    <p className='text-titulo-ga'>{comprometidos.partida}</p>
                  </div>
                  <div>
                    <img className='ims' src={logo2} alt='' />
                  </div>
                </div>
              </div>
              <div className='faderinpo'>
                <div className='contenedor-ga'>
                  <div className='contenedor-1 '>
                    <div className='interno-ga2'>
                      <p className='text-gai'>Gasto a Comprobar</p>
                      <input className='input-gai' type='checkbox' />
                    </div>
                    <div className='interno-ga2'>
                      <p className='text-gai'>Comprobacion de Gastos</p>
                      <input className='input-gai' type='checkbox' checked />
                    </div>
                  </div>
                  <div className='contenedor-1'>
                    <div className='interno-ga2'>
                      <p className='text-gai'>Creación de Fondo Revolvente</p>
                      <input className='input-gai' type='checkbox' />
                    </div>
                    <div className='interno-ga2'>
                      <p className='text-gai'>Fondo Revolvente</p>
                      <input className='input-gai' type='checkbox' />
                    </div>
                    <div className='interno-ga2'>
                      <p className='text-gai'>Cancelacion de Fondo Revolvente</p>
                      <input className='input-gai' type='checkbox' />
                    </div>
                  </div>
                  <div className='contenedor-1'>
                    <div className='interno-ga2'>
                      <p className='text-gai'>Viaticos Anticipados</p>
                      <input className='input-gai' type='checkbox' />
                    </div>
                    <div className='interno-ga2'>
                      <p className='text-gai'>Viaticos Devengados</p>
                      <input className='input-gai' type='checkbox' />
                    </div>
                    <div className='interno-ga2'>
                      <p className='text-gai'>Comprobación de Viáticos</p>
                      <input className='input-gai' type='checkbox' />
                    </div>
                  </div>
                  <div className='contenedor-1'>
                    <div className='interno-ga2'>
                      <p className='text-gai'>Pago a Proveedores</p>
                      <input className='input-gai' type='checkbox' />
                    </div>
                    <div className='interno-ga2'>
                      <p className='text-gai'>Transferencias</p>
                      <input className='input-gai' type='checkbox' />
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className='tabla-ga'>
                  <table className='tablagas'>
                    <tr>
                      <td className='alltabla-ga'>FOLIO DE LA FACTURA</td>
                      <td className='alltabla-ga'>IMPORTE</td>
                      <td className='alltabla-ga'>LEYENDA ALUSIVA AL GASTO</td>
                    </tr>
                    <tr>
                      <td className='all-tab' />
                      <td className='all-tab' />
                      <td className='all-tab' />
                    </tr>
                    <tr>
                      <td className='all-tab' />
                      <td className='all-tab' />
                      <td className='all-tab' />
                    </tr>
                    <tr>
                      <td className='all-tab' />
                      <td className='all-tab' />
                      <td className='all-tab' />
                    </tr>
                    <tr>
                      <td className='all-tab' />
                      <td className='all-tab' />
                      <td className='all-tab' />
                    </tr>
                    <tr>
                      <td className='all-tab' />
                      <td className='all-tab' />
                      <td className='all-tab' />
                    </tr>
                    <tr>
                      <td className='all-tab text-total-ga'>TOTAL</td>
                      <td className='all-tab' />
                    </tr>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>

      </div>
    )
  }
}
