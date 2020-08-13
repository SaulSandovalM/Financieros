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




        <div className='pppdf-subdad' style={{ zIndex: '2', position: 'absolute' }} ref={el => (this.rfr = el)}>
          <div className='fondo-procu'>
            <img className='ime' src={logo2} alt='' />
          </div>
          <div className='no-oficio'>
            <p>
              <b>Oficio No:</b> PGI/DGAyF/ {this.state.fondo.no_oficio}
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
              Por medio de presente me permito enviar a Usted documentación amparada con número de
              comprobantes 'No.____', por un total de $,
              para el trámite de Reembolso de Fondo Revolvente, con cargo al proyecto {/* {this.state.comprometido.no_proyecto} y {this.state.fondo.no_proyec} */},
              otorgado en el oficio de autorización número de oficio {this.state.fondo.oficio_aut} a la Procuraduría General de Justicia del Estado de Hidalgo.
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
              Bueno por: {this.state.fondo.importe}
            </p>
          </div>
          <div className='recibi'>
            <p className='texto-de-pdf' style={{ textAlign: 'justify' }}>
              Recibí de la Secretaría de Finanzas Públicas  del  Gobierno  del  Estado de Hidalgo la cantidad de
            </p>
          </div>
          <div className='concepto'>
            <p className='texto-de-pdf'>
              Por {this.state.fondo.tipo_doc}
            </p>
          </div>
          <div className='fecha'>
            <p className='texto-de-pdf'>
              Pachuca de Soto, Hgo a {today}
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




        <div ref={el => (this.rec = el)} style={{ zIndex: '2', position: 'absolute' }}>
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
