import React, { Component } from 'react'
import './Oficios.css'
import ReactToPrint from 'react-to-print'
import firebase from '../../../Firebase'
import logo2 from '../../../img/logo.jpg'
import lpgjh from '../../../img/logo_hgo.png'

export default class Pdf extends Component {
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
      no_oficio: ''
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
    return (
      <div>
        <div ref={el => (this.gas = el)} style={{ zIndex: '2', position: 'absolute', width: '100%' }}>
          {this.state.comprometidos.map(comprometidos =>
            <div style={{ height: '100vh', zIndex: '2' }}>
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
        <ReactToPrint
          trigger={() => <buttom className='b-imp'>Imprimir</buttom>}
          content={() => this.gas}
        />
      </div>
    )
  }
}
