import React, { Component } from 'react'
import './Oficios.css'
import ReactToPrint from 'react-to-print'
import firebase from '../../../Firebase'
import { NumberAsString } from '../fondos/NumerosLetras.js'
import logo2 from '../../../img/logo.jpg'
import lpgjh from '../../../img/logo_hgo.png'

export default class Cpdf extends Component {
  constructor (props) {
    super(props)
    this.state = {
      fondo: {},
      key: ''
    }
  }

  componentDidMount () {
    const ref = firebase.firestore().collection('fondos').doc(this.props.match.params.id)
    ref.get().then((doc) => {
      if (doc.exists) {
        this.setState({
          fondo: doc.data(),
          key: doc.id,
          isLoading: false
        })
      } else {
        console.log('No such document!')
      }
    })
  }

  render () {
    var today = new Date()
    var meses = new Array ('Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre')
    var diasSemana = new Array ('Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado')
    var f = new Date()
    today = diasSemana[f.getDay()] + ', ' + f.getDate() + ' de ' + meses[f.getMonth()] + ' de ' + f.getFullYear()

    return (
      <div>
        <div style={{ zIndex: '3', background: '#f4f4f4', width: '100%', position: 'absolute', height: '100%' }}>
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
              />
            </div>
          </div>

          <div className='m-f'>
            <div className='fr-con'>
              <p className='fr-b'><b>Pago Programatica</b></p>
            </div>
            <div className='fcc-i'>
              <p className='fimpre'>Solicitud Programatica</p>
              <ReactToPrint
                trigger={() => <buttom className='b-imp'>Imprimir</buttom>}
                content={() => this.sol}
              />
            </div>
            <div className='fcc-i'>
              <p className='fimpre'>Oficio Presentación</p>
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
              <p className='fr-b'><b>Gastos a Comprobar</b></p>
            </div>
            <div className='fcc-i'>
              <p className='fimpre'>Oficio Presentación</p>
              <button className='b-imp'>Imprimir</button>
            </div>
            <div className='fcc-i'>
              <p className='fimpre'>Solicitud Programatica</p>
              <button className='b-imp'>Imprimir</button>
            </div>
            <div className='fcc-i'>
              <p className='fimpre'>Leyendas Alusivas al Gasto</p>
              <button className='b-imp'>Imprimir</button>
            </div>
          </div>
        </div>













        <div ref={el => (this.ogfr = el)}>
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

      </div>
    )
  }
}
