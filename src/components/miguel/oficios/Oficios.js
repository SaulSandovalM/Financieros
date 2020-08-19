import React, { Component } from 'react'
import './Oficios.css'
import ReactToPrint from 'react-to-print'
import firebase from '../../../Firebase'
import { NumberAsString } from '../fondos/NumerosLetras'
import logo2 from '../../../img/logo.jpg'
import lpgjh from '../../../img/logo_hgo.png'
import CurrencyFormat from 'react-currency-format'

export default class Cpdf extends Component {
  constructor (props) {
    super(props)
    this.unsubscribe = null
    this.state = {
      fondo: {},
      key: '',
      comprometidos: [],
      total: '',
      fecha: '',
      importe: '',
      no_oficio: '',
      pressStatus: true
    }
  }

  componentDidMount () {
    const updateRef = firebase.firestore().collection('fondos').doc(this.props.match.params.id).collection('comprometidos')
    this.unsubscribe = updateRef.onSnapshot(this.onCollectionUpdate)
    const ref = firebase.firestore().collection('fondos').doc(this.props.match.params.id)
    ref.get().then((doc) => {
      if (doc.exists) {
        const fondos = doc.data()
        this.setState({
          key: doc.id,
          año: fondos.año,
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
          // fecha: fondos.fecha cambiar el valor
          numCompro: fondos.numCompro,
          importe: fondos.importe,
          no_oficio: fondos.no_oficio,
          desc: fondos.desc,
          beneficiario: fondos.beneficiario,
          requisicion: fondos.requisicion,
          pedido: fondos.pedido,
          fondo2: fondos.fondo
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
      const { año, ramo, os, up, rubro, tg, ogasto, f, fu, sf, eje, s, prog, obj, proy, est, ben, eg, importe_comp } = doc.data() // importe_comp, isr, total, fecha_comp
      comprometidos.push({
        key: doc.id,
        doc,
        año,
        ramo,
        os,
        up,
        rubro,
        tg,
        ogasto,
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
        importe_comp
        // isr,
        // total,
        // fecha_comp
      })
    })
    this.setState({
      comprometidos
    })
  }

  render () {
    var today = new Date()
    var meses = new Array ('Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre')
    var diasSemana = new Array ('Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado')
    var f = new Date()
    today = diasSemana[f.getDay()] + ', ' + f.getDate() + ' de ' + meses[f.getMonth()] + ' de ' + f.getFullYear()

    // const totalImporte = []
    // this.state.comprometidos.map(comprometidos => (
    //   totalImporte.push(comprometidos.importe_comp)
    // ))
    // console.log(totalImporte)
    // const reducer = (a, b) => a + b
    // this.state.total = totalImporte.reduce(reducer)

    console.log(this.state.pressStatus)

    return (
      <div>
        <div style={{ zIndex: '3', background: '#f4f4f4', width: '100%', position: 'absolute', height: '100vh' }}>
          <div className='m-f'>
            <div className='fr-con'>
              <p className='fr-b'><b>Fondo Revolvente</b></p>
            </div>
            <div className='fcc-i'>
              <p className='fimpre'>Solicitud Programatica</p>
              <ReactToPrint
                trigger={() => <buttom className='b-imp'>Imprimir</buttom>}
                content={() => this.ogfr}
              />
            </div>
            <div className='fcc-i'>
              <p className='fimpre'>Reembolso de FR</p>
              <ReactToPrint
                trigger={() => <buttom className='b-imp'>Imprimir</buttom>}
                content={() => this.rfr}
              />
            </div>
            <div className='fcc-i'>
              <p className='fimpre'>Recibo Global</p>
              <ReactToPrint
                trigger={() => <buttom className='b-imp'>Imprimir</buttom>}
                content={() => this.rec}
              />
            </div>
            <div className='fcc-i'>
              <p className='fimpre'>Leyenda Alusivas</p>
              <ReactToPrint
                trigger={() => <buttom className='b-imp'>Imprimir</buttom>}
                content={() => this.gas}
                onBeforeGetContent={() => this.setState({ pressStatus: false })}
                onAfterPrint={() => this.setState({ pressStatus: true })}
              />
            </div>
          </div>

          <div className='m-f'>
            <div className='fr-con'>
              <p className='fr-b'><b>Pago Provedor por Requisición</b></p>
            </div>
            <div className='fcc-i'>
              <p className='fimpre'>Solicitud Programatica</p>
              <ReactToPrint
                trigger={() => <buttom className='b-imp'>Imprimir</buttom>}
                content={() => this.sol}
              />
            </div>
            <div className='fcc-i'>
              <p className='fimpre'>Solicitud de PPR</p>
              <ReactToPrint
                trigger={() => <buttom className='b-imp'>Imprimir</buttom>}
                content={() => this.ofi}
              />
            </div>
            <div className='fcc-i'>
              <p className='fimpre'>Leyenda Alusivas</p>
              <ReactToPrint
                trigger={() => <buttom className='b-imp'>Imprimir</buttom>}
                content={() => this.gasto}
              />
            </div>
          </div>

          <div className='m-f'>
            <div className='fr-con'>
              <p className='fr-b'><b>Pago Proveedor</b></p>
            </div>
            <div className='fcc-i'>
              <p className='fimpre'>Oficio Pago Proveedor</p>
              <ReactToPrint
                trigger={() => <buttom className='b-imp'>Imprimir</buttom>}
                content={() => this.opp}
              />
            </div>
            <div className='fcc-i'>
              <p className='fimpre'>Solicitud Programatica</p>
              <ReactToPrint
                trigger={() => <buttom className='b-imp'>Imprimir</buttom>}
                content={() => this.sp}
              />
            </div>
            <div className='fcc-i'>
              <p className='fimpre'>Leyendas Alusivas</p>
              <ReactToPrint
                trigger={() => <buttom className='b-imp'>Imprimir</buttom>}
                content={() => this.la}
              />
            </div>
          </div>

          <div className='m-f'>
            <div className='fr-con'>
              <p className='fr-b'><b>Diciembre</b></p>
            </div>
            <div className='fcc-i'>
              <p className='fimpre'>Comprobacion de Gasto a Comprobar</p>
              <ReactToPrint
                trigger={() => <buttom className='b-imp'>Imprimir</buttom>}
                content={() => this.cgc}
              />
            </div>
            <div className='fcc-i'>
              <p className='fimpre'>Solicitud Programatica</p>
              <ReactToPrint
                trigger={() => <buttom className='b-imp'>Imprimir</buttom>}
                content={() => this.spd}
              />
            </div>
            <div className='fcc-i'>
              <p className='fimpre'>Leyendas Alusivas</p>
              <ReactToPrint
                trigger={() => <buttom className='b-imp'>Imprimir</buttom>}
                content={() => this.lap}
              />
            </div>
          </div>
        </div>

        {/* fondo revolvente */}
        <div ref={el => (this.ogfr = el)} style={{ zIndex: '2', position: 'absolute' }}>
          <div />
          <div className='title-so-o'>
            <img className='pgjh' src={lpgjh} alt='' />
            <p>SOLICITUD PROGRAMÁTICA DEL GASTO</p>
            <img className='ims' src={logo2} alt='' />
          </div>
          <div className='fadera'>
            <div className='contenedor-so'>
              <div className='contenedor-1'>
                <div className='interno'>
                  <p className='text-so'>Gasto a Comprobar</p>
                  <input className='input-so' type='checkbox' />
                </div>
                <div className='interno'>
                  <p className='text-so'>Comprobación de gasto</p>
                  <input className='input-so' type='checkbox' />
                </div>
              </div>
              <div className='contenedor-1'>
                <div className='interno'>
                  <p className='text-so'>Creación de fondo Revolvente</p>
                  <input className='input-so' type='checkbox' />
                </div>
                <div className='interno'>
                  <p className='text-so'>Fondo Revolvente</p>
                  <input className='input-so' type='checkbox' checked/>
                </div>
                <div className='interno'>
                  <p className='text-so'>Cancelacion de Fondo Revolvente</p>
                  <input className='input-so' type='checkbox'/>
                </div>
              </div>
              <div className='contenedor-1'>
                <div className='interno'>
                  <p className='text-so'>Viaticos Anticipados</p>
                  <input className='input-so' type='checkbox'/>
                </div>
                <div className='interno'>
                  <p className='text-so'>Viaticos Denegados</p>
                  <input className='input-so' type='checkbox'/>
                </div>
                <div className='interno'>
                  <p className='text-so'>Comprobación de viaticos</p>
                  <input className='input-so' type='checkbox'/>
                </div>
                <div className='interno'>
                  <p className='text-so'>Viaticos al Extrangero</p>
                  <input className='input-so' type='checkbox'/>
                </div>
              </div>
              <div className='contenedor-1'>
                <div className='interno'>
                  <p className='text-so'>Validación de Objeto del gasto</p>
                  <input className='input-so' type='checkbox'/>
                </div>
                <div className='interno'>
                  <p className='text-so'>Pago a Proveedores</p>
                  <input className='input-so' type='checkbox'/>
                </div>
                <div className='interno'>
                  <p className='text-so'>Pago a Proveedores por Requisición</p>
                  <input className='input-so' type='checkbox'/>
                </div>
                <div className='interno'>
                  <p className='text-so'>Transferencias</p>
                  <input className='input-so' type='checkbox'/>
                </div>
              </div>
            </div>
          </div>
          <div className='padre-lineas'>
            <div className='lineas-so'>
              <div className='internos'>
                <p className='text-inte'>Beneficiario:</p>
                <p className='bene-i'>{this.state.beneficiario}</p>
              </div>
              <div className='internos'>
                <p className='text-inte2'>Organo Superior:</p>
                <p className='bene-i'>Procuraduria General de Justicia del Estado</p>
              </div>
              <div className='internos'>
                <p className='text-inte3'>undiad Presupuestal:</p>
              </div>
            </div>
            <div className='folio'>
              <p className='text-folio'>No. Folio</p>
              <p className='fs-if'>{this.state.fondo2}</p>
            </div>
          </div>
          <div>
            <div>
              <div className='tabla-so'>
                <table>
                  <tr>
                    <td className='all-tabla'>Ramo</td>
                    <td className='all-tabla'>Año</td>
                    <td className='all-tabla'>OS</td>
                    <td className='all-tabla'>UP</td>
                    <td className='all-tabla'>Rubro de Ingreso</td>
                    <td className='all-tabla'>TG</td>
                    <td className='all-tabla'>Objeto de un Gasto</td>
                    <td className='all-tabla'>Finalidad</td>
                    <td className='all-tabla'>Funcion</td>
                    <td className='all-tabla'>Subfunción</td>
                    <td className='all-tabla'>Eje</td>
                    <td className='all-tabla'>Sect</td>
                    <td className='all-tabla'>Prog</td>
                    <td className='all-tabla'>Obj</td>
                    <td className='all-tabla'>Proyecto</td>
                    <td className='all-tabla'>Ext</td>
                    <td className='all-tabla'>Ben</td>
                    <td className='all-tabla'>E Geo</td>
                    <td className='dg-tabla all-tabla'>Descripcion del objeto de Gasto</td>
                    <td className='monto-tabla all-tabla'>Monto</td>
                  </tr>
                  {this.state.comprometidos.map(comprometidos =>
                    <tr>
                      <td className='all-tabla'>
                        {comprometidos.ramo}
                      </td>
                      <td className='all-tabla'>
                        {comprometidos.año}
                      </td>
                      <td className='all-tabla'>
                        {comprometidos.os}
                      </td>
                      <td className='all-tabla'>
                        {comprometidos.up}
                      </td>
                      <td className='all-tabla'>
                        {comprometidos.rubro}
                      </td>
                      <td className='all-tabla'>
                        {comprometidos.tg}
                      </td>
                      <td className='all-tabla'>
                        {comprometidos.ogasto}
                      </td>
                      <td className='all-tabla'>
                        {comprometidos.f}
                      </td>
                      <td className='all-tabla'>
                        {comprometidos.fu}
                      </td>
                      <td className='all-tabla'>
                        {comprometidos.sf}
                      </td>
                      <td className='all-tabla'>
                        {comprometidos.eje}
                      </td>
                      <td className='all-tabla'>
                        {comprometidos.s}
                      </td>
                      <td className='all-tabla'>
                        {comprometidos.prog}
                      </td>
                      <td className='all-tabla'>
                        {comprometidos.obj}
                      </td>
                      <td className='all-tabla'>
                        {comprometidos.proy}
                      </td>
                      <td className='all-tabla'>
                        {comprometidos.est}
                      </td>
                      <td className='all-tabla'>
                        {comprometidos.ben}
                      </td>
                      <td className='all-tabla'>
                        {comprometidos.eg}
                      </td>
                      <td className='all-tabla'>
                        {comprometidos.npar}
                      </td>
                      <td className='all-tabla'>
                        {comprometidos.importe_comp}
                      </td>
                    </tr>
                  )}
                  <tr>
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                  </tr>
                  <tr>
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                  </tr>
                  <tr>
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                  </tr>
                  <tr>
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                  </tr>
                  <tr>
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                  </tr>
                  <tr>
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                  </tr>
                  <tr>
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                  </tr>
                  <tr>
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                  </tr>
                  <tr>
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                  </tr>
                  <tr>
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                  </tr>
                  <tr>
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                  </tr>
                  <tr>
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                  </tr>
                  <tr>
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                  </tr>
                  <tr>
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                  </tr>
                  <tr>
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                  </tr>
                  <tr>
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                  </tr>
                  <tr>
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                  </tr>
                  <tr>
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                  </tr>
                  <tr>
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                  </tr>
                  <tr>
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                  </tr>
                  <tr>
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                  </tr>
                  <tr>
                    <td className='all-tabla border-color' />
                    <td className='all-tabla border-color' />
                    <td className='all-tabla border-color' />
                    <td className='all-tabla border-color' />
                    <td className='all-tabla border-color' />
                    <td className='all-tabla border-color' />
                    <td className='all-tabla border-color' />
                    <td className='all-tabla border-color' />
                    <td className='all-tabla border-color' />
                    <td className='all-tabla border-color' />
                    <td className='all-tabla border-color' />
                    <td className='all-tabla border-color' />
                    <td className='all-tabla border-color' />
                    <td className='all-tabla  border-color' />
                    <td className='all-tabla  border-color' />
                    <td className='all-tabla  border-color' />
                    <td className='all-tabla  border-color' />
                    <td className='all-tabla  border-color' />
                    <td className='all-tabla border-color2 text-rete'>RETENCION</td>
                    <td className='all-tabla' />
                  </tr>
                  <tr>
                    <td className='all-tabla border-color' />
                    <td className='all-tabla border-color' />
                    <td className='all-tabla border-color' />
                    <td className='all-tabla border-color' />
                    <td className='all-tabla border-color' />
                    <td className='all-tabla border-color' />
                    <td className='all-tabla border-color' />
                    <td className='all-tabla border-color' />
                    <td className='all-tabla border-color' />
                    <td className='all-tabla border-color' />
                    <td className='all-tabla border-color' />
                    <td className='all-tabla border-color' />
                    <td className='all-tabla border-color' />
                    <td className='all-tabla border-color' />
                    <td className='all-tabla border-color' />
                    <td className='all-tabla border-color' />
                    <td className='all-tabla border-color' />
                    <td className='all-tabla border-color' />
                    <td className='all-tabla border-color text-rete'>Total</td>
                    <td className='all-tabla' />
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
              <b>Oficio No:</b> PGI/DGAyF/ {this.state.no_oficio}/2020
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
            <p>
              Por medio de presente me permito enviar a Usted documentación amparada
              con {this.state.numCompro} de comprobantes por un total
              de $ {this.state.importe} ({(NumberAsString(this.state.importe))}),
              para el trámite de Reembolso de Fondo Revolvente, con cargo al
              proyecto {this.state.proy} {this.state.np}
              otorgado en el oficio de autorización {this.state.no_oficio} a la
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
                prefix=' $'
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
                prefix=' $'
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

        <div ref={el => (this.gas = el)} style={{ zIndex: '2', position: 'absolute', width: '100%' }}>
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
                  <p className='text-titulo-ga'>{comprometidos.ogasto}</p>
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

        {/* Pago Provedor por Requisición */}
        <div ref={el => (this.sol = el)} style={{ zIndex: '2', position: 'absolute'}}>
          <div className='title-so-o'>
            <img className='pgjh' src={lpgjh} alt='' />
            <p>SOLICITUD PROGRAMÁTICA DEL GASTO</p>
            <img className='ims' src={logo2} alt='' />
          </div>
          <div className='fadera'>
            <div className='contenedor-so'>
              <div className='contenedor-1'>
                <div className='interno'>
                  <p className='text-so'>Gasto a Comprobar</p>
                  <input className='input-so' type='checkbox' checked />
                </div>
                <div className='interno'>
                  <p className='text-so'>Comprobación de gasto</p>
                  <input className='input-so' />
                </div>
              </div>
              <div className='contenedor-1'>
                <div className='interno'>
                  <p className='text-so'>Creación de fondo Revolvente</p>
                  <input className='input-so' />
                </div>
                <div className='interno'>
                  <p className='text-so'>Fondo Revolvente</p>
                  <input className='input-so' />
                </div>
                <div className='interno'>
                  <p className='text-so'>Cancelacion de Fondo Revolvente</p>
                  <input className='input-so' />
                </div>
              </div>
              <div className='contenedor-1'>
                <div className='interno'>
                  <p className='text-so'>Viaticos Anticipados</p>
                  <input className='input-so' />
                </div>
                <div className='interno'>
                  <p className='text-so'>Viaticos Denegados</p>
                  <input className='input-so' />
                </div>
                <div className='interno'>
                  <p className='text-so'>Comprobación de viaticos</p>
                  <input className='input-so' />
                </div>
                <div className='interno'>
                  <p className='text-so'>Viaticos al Extrangero</p>
                  <input className='input-so' />
                </div>
              </div>
              <div className='contenedor-1'>
                <div className='interno'>
                  <p className='text-so'>Validación de Objeto del gasto</p>
                  <input className='input-so' />
                </div>
                <div className='interno'>
                  <p className='text-so'>Pago a Proveedores</p>
                  <input className='input-so' />
                </div>
                <div className='interno'>
                  <p className='text-so'>Pago a Proveedores por Requisición</p>
                  <input className='input-so' />
                </div>
                <div className='interno'>
                  <p className='text-so'>Transferencias</p>
                  <input className='input-so' />
                </div>
              </div>
            </div>
          </div>
          <div className='padre-lineas'>
            <div className='lineas-so'>
              <div className='internos'>
                <p className='text-inte'>Beneficiario:</p>
                <p className='bene-i'>{this.state.beneficiario}</p>
              </div>
              <div className='internos'>
                <p className='text-inte2'>Organo Superior:</p>
                <p className='bene-i'>Procuraduria General de Justicia del Estado</p>
              </div>
              <div className='internos'>
                <p className='text-inte3'>undiad Presupuestal:</p>
              </div>
            </div>
            <div className='folio'>
              <p className='text-folio'>No. Folio</p>
              <input className='input-so3' />
            </div>
          </div>
          <div>
            <div>
              <div className='tabla-so'>
                <table>
                  <tr>
                    <td className='all-tabla'>Ramo</td>
                    <td className='all-tabla'>Año</td>
                    <td className='all-tabla'>OS</td>
                    <td className='all-tabla'>UP</td>
                    <td className='all-tabla'>Rubro de Ingreso</td>
                    <td className='all-tabla'>TG</td>
                    <td className='all-tabla'>Objeto de un Gasto</td>
                    <td className='all-tabla'>Finalidad</td>
                    <td className='all-tabla'>Funcion</td>
                    <td className='all-tabla'>Subfunción</td>
                    <td className='all-tabla'>Eje</td>
                    <td className='all-tabla'>Sect</td>
                    <td className='all-tabla'>Prog</td>
                    <td className='all-tabla'>Obj</td>
                    <td className='all-tabla'>Proyecto</td>
                    <td className='all-tabla'>Ext</td>
                    <td className='all-tabla'>Ben</td>
                    <td className='all-tabla'>E Geo</td>
                    <td className='dg-tabla all-tabla'>Descripcion del objeto de Gasto</td>
                    <td className='monto-tabla all-tabla'>Monto</td>
                  </tr>
                  {this.state.comprometidos.map(comprometidos =>
                    <tr>
                      <td className='all-tabla'>
                        {comprometidos.ramo}
                      </td>
                      <td className='all-tabla'>
                        {comprometidos.año}
                      </td>
                      <td className='all-tabla'>
                        {comprometidos.os}
                      </td>
                      <td className='all-tabla'>
                        {comprometidos.up}
                      </td>
                      <td className='all-tabla'>
                        {comprometidos.rubro}
                      </td>
                      <td className='all-tabla'>
                        {comprometidos.tg}
                      </td>
                      <td className='all-tabla'>
                        {comprometidos.ogasto}
                      </td>
                      <td className='all-tabla'>
                        {comprometidos.f}
                      </td>
                      <td className='all-tabla'>
                        {comprometidos.fu}
                      </td>
                      <td className='all-tabla'>
                        {comprometidos.sf}
                      </td>
                      <td className='all-tabla'>
                        {comprometidos.eje}
                      </td>
                      <td className='all-tabla'>
                        {comprometidos.s}
                      </td>
                      <td className='all-tabla'>
                        {comprometidos.prog}
                      </td>
                      <td className='all-tabla'>
                        {comprometidos.obj}
                      </td>
                      <td className='all-tabla'>
                        {comprometidos.proy}
                      </td>
                      <td className='all-tabla'>
                        {comprometidos.est}
                      </td>
                      <td className='all-tabla'>
                        {comprometidos.ben}
                      </td>
                      <td className='all-tabla'>
                        {comprometidos.eg}
                      </td>
                      <td className='all-tabla' />
                      <td className='all-tabla'>
                        {comprometidos.importe_comp}
                      </td>
                    </tr>
                  )}
                  <tr>
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                  </tr>
                  <tr>
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                  </tr>
                  <tr>
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                  </tr>
                  <tr>
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                  </tr>
                  <tr>
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                  </tr>
                  <tr>
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                  </tr>
                  <tr>
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                  </tr>
                  <tr>
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                  </tr>
                  <tr>
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                  </tr>
                  <tr>
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                  </tr>
                  <tr>
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                  </tr>
                  <tr>
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                  </tr>
                  <tr>
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                  </tr>
                  <tr>
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                  </tr>
                  <tr>
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                  </tr>
                  <tr>
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                  </tr>
                  <tr>
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                  </tr>
                  <tr>
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                  </tr>
                  <tr>
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                  </tr>
                  <tr>
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                  </tr>
                  <tr>
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                  </tr>
                  <tr>
                    <td className='all-tabla border-color' />
                    <td className='all-tabla border-color' />
                    <td className='all-tabla border-color' />
                    <td className='all-tabla border-color' />
                    <td className='all-tabla border-color' />
                    <td className='all-tabla border-color' />
                    <td className='all-tabla border-color' />
                    <td className='all-tabla border-color' />
                    <td className='all-tabla border-color' />
                    <td className='all-tabla border-color' />
                    <td className='all-tabla border-color' />
                    <td className='all-tabla border-color' />
                    <td className='all-tabla border-color' />
                    <td className='all-tabla  border-color' />
                    <td className='all-tabla  border-color' />
                    <td className='all-tabla  border-color' />
                    <td className='all-tabla  border-color' />
                    <td className='all-tabla  border-color' />
                    <td className='all-tabla border-color2 text-rete'>RETENCION</td>
                    <td className='all-tabla' />
                  </tr>
                  <tr>
                    <td className='all-tabla border-color' />
                    <td className='all-tabla border-color' />
                    <td className='all-tabla border-color' />
                    <td className='all-tabla border-color' />
                    <td className='all-tabla border-color' />
                    <td className='all-tabla border-color' />
                    <td className='all-tabla border-color' />
                    <td className='all-tabla border-color' />
                    <td className='all-tabla border-color' />
                    <td className='all-tabla border-color' />
                    <td className='all-tabla border-color' />
                    <td className='all-tabla border-color' />
                    <td className='all-tabla border-color' />
                    <td className='all-tabla border-color' />
                    <td className='all-tabla border-color' />
                    <td className='all-tabla border-color' />
                    <td className='all-tabla border-color' />
                    <td className='all-tabla border-color' />
                    <td className='all-tabla border-color text-rete'>Total</td>
                    <td className='all-tabla' />
                  </tr>
                </table>
              </div>
            </div>
          </div>
          <div className='obs-sopadre'>
            <div className='obs-so'>
              <p className='text-osb'>Observaciones</p>
              <input className='input-obs' />
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
          <div class='fondo-procu'>
            <img class='ime' src={logo2} alt='' />
          </div>
          <div class='no-oficio'>
            <p>
              <b>Oficio No:</b> {/* PGI/DGAyF/ */}{this.state.no_oficio}
              <br /> Pachuca de Soto, Hidalgo a {today}
              <br /><b>Asunto </b>Solicitud de Pago Proveedor por Requisicón
            </p>
          </div>
          <div class='prensente'>
            <p>
              <b>
                Lic. César Alberto González López
                <br />Subsecretario de Egresos de la
                <br /> Secretaría de Finanzas Públicas
                <br />Presente
              </b>
            </p>
          </div>
          <div class='añadido'>
            <p>
              <b>
                AT'N: L.C.P. Karina Barrios Velázquez
                <br />Directora General de Contabilidad
                <br />Gubernamental
              </b>
            </p>
          </div>
          <div class='texto-ofi_ppp'>
            <p>
              Por medio de presente me permito enviar a Usted documentación por
              un importe total de $ {this.state.importe} ({(NumberAsString(this.state.importe))}),
              cantidad amparada con CFDI No {this.state.cfdi},
              número de requisición {this.state.requisicion} pedido/contrato {this.state.pedido},
              asi como la poliza de afectacion presupuestal al momento del comprometido
              núm. ________ que se emite la Direccion General de Compras Públicas;
              para que se efectúe el trámite de pago  a favor del proveedor {this.state.beneficiario},
              por la (compra o presentacion de servicios  xxxxxxxxxxx, con cargo
              al proyecto (clave y nombre del proyecto) y de los recursos otorgados
              con el oficio de autorización {this.state.no_oficio}, a la secretaria
              de _______________________________.
            </p>
            <p>Sin otro particular por el momento, reciba un cordial saludo</p>
          </div>
          <div class='atte'>
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

        <div ref={el => (this.gasto = el)} style={{ zIndex: '2', position: 'absolute', width: '100%' }}>
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
                  <p className='text-titulo-ga'>{comprometidos.ogasto}</p>
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

        {/* Pago Provedor */}
        <div className='pppdf-subdad' ref={el => (this.opp = el)} style={{ zIndex: '2', position: 'absolute' }}>
          <div className='fondo-procu'>
            <img className='ime' src={logo2} alt='' />
          </div>
          <div className='no-oficio'>
            <p>
              <b>Oficio No:</b> PGI/DGAyF/ {this.state.no_oficio}
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
              Por este medio me permito enviar a Usted documentación por un importe
              total de $ {this.state.importe} ({(NumberAsString(this.state.importe))}),
              cantidad amparada con los comprobantes No. {this.state.numCompro},
              para el trámite de pago a favor del proveedor {this.state.beneficiario},
              por la compra o prestación de  servicios {this.state.desc},
              con cargo al proyecto {/* {this.state.comprometido.no_proyecto} y {this.state.fondo.no_proyec} */}y a los recursos otorgados con el oficio de autorización {this.state.fondo.oficio_aut},
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
              <p align='right'> {this.state.fondo.fondo}</p>
            </div>
          </div>
        </div>

        <div ref={el => (this.sp = el)} style={{ zIndex: '2', position: 'absolute' }}>
          <div />
          <div className='title-so-o'>
            <img className='pgjh' src={lpgjh} alt='' />
            <p>SOLICITUD PROGRAMÁTICA DEL GASTO</p>
            <img className='ims' src={logo2} alt='' />
          </div>
          <div className='fadera'>
            <div className='contenedor-so'>
              <div className='contenedor-1'>
                <div className='interno'>
                  <p className='text-so'>Gasto a Comprobar</p>
                  <input className='input-so' />
                </div>
                <div className='interno'>
                  <p className='text-so'>Comprobación de gasto</p>
                  <input className='input-so' type='checkbox' checked />
                </div>
              </div>
              <div className='contenedor-1'>
                <div className='interno'>
                  <p className='text-so'>Creación de fondo Revolvente</p>
                  <input className='input-so' />
                </div>
                <div className='interno'>
                  <p className='text-so'>Fondo Revolvente</p>
                  <input className='input-so' />
                </div>
                <div className='interno'>
                  <p className='text-so'>Cancelacion de Fondo Revolvente</p>
                  <input className='input-so' />
                </div>
              </div>
              <div className='contenedor-1'>
                <div className='interno'>
                  <p className='text-so'>Viaticos Anticipados</p>
                  <input className='input-so' />
                </div>
                <div className='interno'>
                  <p className='text-so'>Viaticos Denegados</p>
                  <input className='input-so' />
                </div>
                <div className='interno'>
                  <p className='text-so'>Comprobación de viaticos</p>
                  <input className='input-so' />
                </div>
                <div className='interno'>
                  <p className='text-so'>Viaticos al Extrangero</p>
                  <input className='input-so' />
                </div>
              </div>
              <div className='contenedor-1'>
                <div className='interno'>
                  <p className='text-so'>Validación de Objeto del gasto</p>
                  <input className='input-so' />
                </div>
                <div className='interno'>
                  <p className='text-so'>Pago a Proveedores</p>
                  <input className='input-so' />
                </div>
                <div className='interno'>
                  <p className='text-so'>Pago a Proveedores por Requisición</p>
                  <input className='input-so' />
                </div>
                <div className='interno'>
                  <p className='text-so'>Transferencias</p>
                  <input className='input-so' />
                </div>
              </div>
            </div>
          </div>
          <div className='padre-lineas'>
            <div className='lineas-so'>
              <div className='internos'>
                <p className='text-inte'>Beneficiario:</p>
                <p className='bene-i'>{this.state.beneficiario}</p>
              </div>
              <div className='internos'>
                <p className='text-inte2'>Organo Superior:</p>
                <p className='bene-i'>Procuraduria General de Justicia del Estado</p>
              </div>
              <div className='internos'>
                <p className='text-inte3'>undiad Presupuestal:</p>
              </div>
            </div>
            <div className='folio'>
              <p className='text-folio'>No. Folio</p>
              <input className='input-so3' />
            </div>
          </div>
          <div>
            <div>
              <div className='tabla-so'>
                <table>
                  <tr>
                    <td className='all-tabla'>Ramo</td>
                    <td className='all-tabla'>Año</td>
                    <td className='all-tabla'>OS</td>
                    <td className='all-tabla'>UP</td>
                    <td className='all-tabla'>Rubro de Ingreso</td>
                    <td className='all-tabla'>TG</td>
                    <td className='all-tabla'>Objeto de un Gasto</td>
                    <td className='all-tabla'>Finalidad</td>
                    <td className='all-tabla'>Funcion</td>
                    <td className='all-tabla'>Subfunción</td>
                    <td className='all-tabla'>Eje</td>
                    <td className='all-tabla'>Sect</td>
                    <td className='all-tabla'>Prog</td>
                    <td className='all-tabla'>Obj</td>
                    <td className='all-tabla'>Proyecto</td>
                    <td className='all-tabla'>Ext</td>
                    <td className='all-tabla'>Ben</td>
                    <td className='all-tabla'>E Geo</td>
                    <td className='dg-tabla all-tabla'>Descripcion del objeto de Gasto</td>
                    <td className='monto-tabla all-tabla'>Monto</td>
                  </tr>
                  {this.state.comprometidos.map(comprometidos =>
                    <tr>
                      <td className='all-tabla'>
                        {comprometidos.ramo}
                      </td>
                      <td className='all-tabla'>
                        {comprometidos.año}
                      </td>
                      <td className='all-tabla'>
                        {comprometidos.os}
                      </td>
                      <td className='all-tabla'>
                        {comprometidos.up}
                      </td>
                      <td className='all-tabla'>
                        {comprometidos.rubro}
                      </td>
                      <td className='all-tabla'>
                        {comprometidos.tg}
                      </td>
                      <td className='all-tabla'>
                        {comprometidos.ogasto}
                      </td>
                      <td className='all-tabla'>
                        {comprometidos.f}
                      </td>
                      <td className='all-tabla'>
                        {comprometidos.fu}
                      </td>
                      <td className='all-tabla'>
                        {comprometidos.sf}
                      </td>
                      <td className='all-tabla'>
                        {comprometidos.eje}
                      </td>
                      <td className='all-tabla'>
                        {comprometidos.s}
                      </td>
                      <td className='all-tabla'>
                        {comprometidos.prog}
                      </td>
                      <td className='all-tabla'>
                        {comprometidos.obj}
                      </td>
                      <td className='all-tabla'>
                        {comprometidos.proy}
                      </td>
                      <td className='all-tabla'>
                        {comprometidos.est}
                      </td>
                      <td className='all-tabla'>
                        {comprometidos.ben}
                      </td>
                      <td className='all-tabla'>
                        {comprometidos.eg}
                      </td>
                      <td className='all-tabla' />
                      <td className='all-tabla'>
                        {comprometidos.importe_comp}
                      </td>
                    </tr>
                  )}
                  <tr>
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                  </tr>
                  <tr>
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                  </tr>
                  <tr>
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                  </tr>
                  <tr>
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                  </tr>
                  <tr>
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                  </tr>
                  <tr>
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                  </tr>
                  <tr>
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                  </tr>
                  <tr>
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                  </tr>
                  <tr>
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                  </tr>
                  <tr>
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                  </tr>
                  <tr>
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                  </tr>
                  <tr>
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                  </tr>
                  <tr>
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                  </tr>
                  <tr>
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                  </tr>
                  <tr>
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                  </tr>
                  <tr>
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                  </tr>
                  <tr>
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                  </tr>
                  <tr>
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                  </tr>
                  <tr>
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                  </tr>
                  <tr>
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                  </tr>
                  <tr>
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                  </tr>
                  <tr>
                    <td className='all-tabla border-color' />
                    <td className='all-tabla border-color' />
                    <td className='all-tabla border-color' />
                    <td className='all-tabla border-color' />
                    <td className='all-tabla border-color' />
                    <td className='all-tabla border-color' />
                    <td className='all-tabla border-color' />
                    <td className='all-tabla border-color' />
                    <td className='all-tabla border-color' />
                    <td className='all-tabla border-color' />
                    <td className='all-tabla border-color' />
                    <td className='all-tabla border-color' />
                    <td className='all-tabla border-color' />
                    <td className='all-tabla  border-color' />
                    <td className='all-tabla  border-color' />
                    <td className='all-tabla  border-color' />
                    <td className='all-tabla  border-color' />
                    <td className='all-tabla  border-color' />
                    <td className='all-tabla border-color2 text-rete'>RETENCION</td>
                    <td className='all-tabla' />
                  </tr>
                  <tr>
                    <td className='all-tabla border-color' />
                    <td className='all-tabla border-color' />
                    <td className='all-tabla border-color' />
                    <td className='all-tabla border-color' />
                    <td className='all-tabla border-color' />
                    <td className='all-tabla border-color' />
                    <td className='all-tabla border-color' />
                    <td className='all-tabla border-color' />
                    <td className='all-tabla border-color' />
                    <td className='all-tabla border-color' />
                    <td className='all-tabla border-color' />
                    <td className='all-tabla border-color' />
                    <td className='all-tabla border-color' />
                    <td className='all-tabla border-color' />
                    <td className='all-tabla border-color' />
                    <td className='all-tabla border-color' />
                    <td className='all-tabla border-color' />
                    <td className='all-tabla border-color' />
                    <td className='all-tabla border-color text-rete'>Total</td>
                    <td className='all-tabla' />
                  </tr>
                </table>
              </div>
            </div>
          </div>
          <div className='obs-sopadre'>
            <div className='obs-so'>
              <p className='text-osb'>Observaciones</p>
              <input className='input-obs' />
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

        <div ref={el => (this.la = el)} style={{ zIndex: '2', position: 'absolute', width: '100%' }}>
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
                  <p className='text-titulo-ga'>{comprometidos.ogasto}</p>
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
          <div>
            <p />
          </div>
          <div className='title-so'>
            <img className='pgjh' src={lpgjh} alt='' />
            <p>SOLICITUD PROGRAMÁTICA DEL GASTO</p>
            <img className='ims' src={logo2} alt='' />
          </div>
          <div className='fadera'>
            <div className='contenedor-so'>
              <div className='contenedor-1'>
                <div className='interno'>
                  <p className='text-so'>Gasto a Comprobar</p>
                  <input className='input-so' />
                </div>
                <div className='interno'>
                  <p className='text-so'>Comprobación de gasto</p>
                  <input className='input-so' />
                </div>
              </div>
              <div className='contenedor-1'>
                <div className='interno'>
                  <p className='text-so'>Creación de fondo Revolvente</p>
                  <input className='input-so' />
                </div>
                <div className='interno'>
                  <p className='text-so'>Fondo Revolvente</p>
                  <input className='input-so' />
                </div>
                <div className='interno'>
                  <p className='text-so'>Cancelacion de Fondo Revolvente</p>
                  <input className='input-so' />
                </div>
              </div>
              <div className='contenedor-1'>
                <div className='interno'>
                  <p className='text-so'>Viaticos Anticipados</p>
                  <input className='input-so' />
                </div>
                <div className='interno'>
                  <p className='text-so'>Viaticos Denegados</p>
                  <input className='input-so' />
                </div>
                <div className='interno'>
                  <p className='text-so'>Comprobación de viaticos</p>
                  <input className='input-so' />
                </div>
                <div className='interno'>
                  <p className='text-so'>Viaticos al Extrangero</p>
                  <input className='input-so' />
                </div>
              </div>
              <div className='contenedor-1'>
                <div className='interno'>
                  <p className='text-so'>Validación de Objeto del gasto</p>
                  <input className='input-so' />
                </div>
                <div className='interno'>
                  <p className='text-so'>Pago a Proveedores</p>
                  <input className='input-so' />
                </div>
                <div className='interno'>
                  <p className='text-so'>Pago a Proveedores por Requisición</p>
                  <input className='input-so' />
                </div>
                <div className='interno'>
                  <p className='text-so'>Transferencias</p>
                  <input className='input-so' />
                </div>
              </div>
            </div>
          </div>
          <div className='padre-lineas'>
            <div className='lineas-so'>
              <div className='internos'>
                <p className='text-inte'>Beneficiario:</p>
                <input className='input-so2' />
              </div>
              <div className='internos'>
                <p className='text-inte2'>Organo Superior:</p>
                <input className='input-so2' />
              </div>
              <div className='internos'>
                <p className='text-inte3'>undiad Presupuestal:</p>
                <input className='input-so2' />
              </div>
            </div>
            <div className='folio'>
              <p className='text-folio'>No. Folio</p>
              <input className='input-so3' />
            </div>
          </div>
          <div>
            <div>
              <div className='tabla-so'>
                <table>
                  <tr>
                    <td className='all-tabla'>Ramo</td>
                    <td className='all-tabla'>Año</td>
                    <td className='all-tabla'>OS</td>
                    <td className='all-tabla'>UP</td>
                    <td className='all-tabla'>Rubro de Ingreso</td>
                    <td className='all-tabla'>TG</td>
                    <td className='all-tabla'>Objeto de un Gasto</td>
                    <td className='all-tabla'>Finalidad</td>
                    <td className='all-tabla'>Funcion</td>
                    <td className='all-tabla'>Subfunción</td>
                    <td className='all-tabla'>Eje</td>
                    <td className='all-tabla'>Sect</td>
                    <td className='all-tabla'>Prog</td>
                    <td className='all-tabla'>Obj</td>
                    <td className='all-tabla'>Proyecto</td>
                    <td className='all-tabla'>Ext</td>
                    <td className='all-tabla'>Ben</td>
                    <td className='all-tabla'>E Geo</td>
                    <td className='dg-tabla all-tabla'>Descripcion del objeto de Gasto</td>
                    <td className='monto-tabla all-tabla'>Monto</td>
                  </tr>
                  <tr>
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                  </tr>
                  <tr>
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                  </tr>
                  <tr>
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                  </tr>
                  <tr>
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                  </tr>
                  <tr>
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                  </tr>
                  <tr>
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                  </tr>
                  <tr>
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                  </tr>
                  <tr>
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                  </tr>
                  <tr>
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                  </tr>
                  <tr>
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                  </tr>
                  <tr>
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                  </tr>
                  <tr>
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                  </tr>
                  <tr>
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                  </tr>
                  <tr>
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                  </tr>
                  <tr>
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                  </tr>
                  <tr>
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                  </tr>
                  <tr>
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                  </tr>
                  <tr>
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                  </tr>
                  <tr>
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                  </tr>
                  <tr>
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                  </tr>
                  <tr>
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                  </tr>
                  <tr>
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                    <td className='all-tabla' />
                  </tr>
                  <tr>
                    <td className='all-tabla border-color' />
                    <td className='all-tabla border-color' />
                    <td className='all-tabla border-color' />
                    <td className='all-tabla border-color' />
                    <td className='all-tabla border-color' />
                    <td className='all-tabla border-color' />
                    <td className='all-tabla border-color' />
                    <td className='all-tabla border-color' />
                    <td className='all-tabla border-color' />
                    <td className='all-tabla border-color' />
                    <td className='all-tabla border-color' />
                    <td className='all-tabla border-color' />
                    <td className='all-tabla border-color' />
                    <td className='all-tabla border-color' />
                    <td className='all-tabla border-color' />
                    <td className='all-tabla border-color' />
                    <td className='all-tabla border-color' />
                    <td className='all-tabla border-color' />
                    <td className='all-tabla border-color2 text-rete'>RETENCION</td>
                    <td className='all-tabla' />
                  </tr>
                  <tr>
                    <td className='all-tabla border-color' />
                    <td className='all-tabla border-color' />
                    <td className='all-tabla border-color' />
                    <td className='all-tabla border-color' />
                    <td className='all-tabla border-color' />
                    <td className='all-tabla border-color' />
                    <td className='all-tabla border-color' />
                    <td className='all-tabla border-color' />
                    <td className='all-tabla border-color' />
                    <td className='all-tabla border-color' />
                    <td className='all-tabla border-color' />
                    <td className='all-tabla border-color' />
                    <td className='all-tabla border-color' />
                    <td className='all-tabla border-color' />
                    <td className='all-tabla border-color' />
                    <td className='all-tabla border-color' />
                    <td className='all-tabla border-color' />
                    <td className='all-tabla border-color' />
                    <td className='all-tabla border-color text-rete'>Total</td>
                    <td className='all-tabla' />
                  </tr>
                </table>
              </div>
            </div>
          </div>
          <div className='obs-sopadre'>
            <div className='obs-so'>
              <p className='text-osb'>Observaciones</p>
              <input className='input-obs' />
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

        <div ref={el => (this.lap = el)} style={{ zIndex: '2', position: 'absolute', width: '100%' }}>
          <div>
            <div className='title-ga'>
              <div>
                <img className='pgjh' src={lpgjh} alt='' />
              </div>
              <div>
                <p className='text-titulo-ga'>ORGANO SUPERIOR</p>
                <p className='text-titulo-ga'>UNIDAD PRESUPUESTAL</p>
                <p className='text-titulo-ga'>OBJETO DE GASTO</p>
              </div>
              <div>
                <img className='ims' src={logo2} alt='' />
              </div>
            </div>
          </div>
          <div className='faderinp'>
            <div className='contenedor-ga'>
              <div className='contenedor-1 '>
                <div className='interno-ga'>
                  <p className='text-ga'>Gasto a Comprobar</p>
                  <input className='input-ga' />
                </div>
                <div className='interno-ga'>
                  <p className='text-ga'>Comprobacion de Gastos</p>
                  <input className='input-ga' />
                </div>
              </div>
              <div className='contenedor-1'>
                <div className='interno-ga'>
                  <p className='text-ga'>Creación de Fondo Revolvente</p>
                  <input className='input-ga' />
                </div>
                <div className='interno-ga'>
                  <p className='text-ga'>Fondo Revolvente</p>
                  <input className='input-ga' />
                </div>
                <div className='interno-ga'>
                  <p className='text-ga'>Cancelacion de Fondo Revolvente</p>
                  <input className='input-ga' />
                </div>
              </div>
              <div className='contenedor-1'>
                <div className='interno-ga'>
                  <p className='text-ga'>Viaticos Anticipados</p>
                  <input className='input-ga' />
                </div>
                <div className='interno-ga'>
                  <p className='text-ga'>Viaticos Devengados</p>
                  <input className='input-ga' />
                </div>
                <div className='interno-ga'>
                  <p className='text-ga'>Comprobación de Viáticos</p>
                  <input className='input-ga' />
                </div>
              </div>
              <div className='contenedor-1'>
                <div className='interno-ga'>
                  <p className='text-ga'>Pago a Proveedores</p>
                  <input className='input-ga' />
                </div>
                <div className='interno-ga'>
                  <p className='text-ga'>Transferencias</p>
                  <input className='input-ga' />
                </div>
              </div>
            </div>
          </div>
          <div className='fader-tabla'>
            <div className='tabla-ga'>
              <table className='tablagas'>
                <tr>
                  <td className='alltabla-ga '>FOLIO DE LA FACTURA</td>
                  <td className='alltabla-ga '>IMPORTE</td>
                  <td className='alltabla-ga '>LEYENDA ALUSIVA AL GASTO</td>
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

      </div>
    )
  }
}
