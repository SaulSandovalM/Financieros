import React, { Component } from 'react'
import './Oficios.css'
import ReactToPrint from 'react-to-print'
import firebase from '../../../Firebase'
import { NumberAsString } from '../fondos/NumerosLetras.js'

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
        <div className='site-pf'>
          <p className='site-pf-s'><b>Oficios</b></p>
        </div>
        <div style={{ zIndex: '3', background: 'white', width: '100%', position: 'absolute', height: '90vh', marginTop: '15px' }}>
          <div className='m-f'>
            <div className='fr-con'>
              <p className='fr-b'><b>Fondo Revolvente</b></p>
            </div>
            <div className='fcc-i'>
              <p className='fimpre'>Solicitud Programatica</p>
              <ReactToPrint
                trigger={() => <buttom className='b-imp'>imprimir</buttom>}
                content={() => this.holi}
              />
            </div>
            <div className='fcc-i'>
              <p className='fimpre'>Reembolso de FR</p>
              <button className='b-imp'>Imprimir</button>
            </div>
            <div className='fcc-i'>
              <p className='fimpre'>Recibo Global</p>
              <button className='b-imp'>Imprimir</button>
            </div>
            <div className='fcc-i'>
              <p className='fimpre'>Leyenda Alusivas</p>
              <button className='b-imp'>Imprimir</button>
            </div>
          </div>

          <div className='m-f'>
            <div className='fr-con'>
              <p className='fr-b'><b>Pago Programatica</b></p>
            </div>
            <div className='fcc-i'>
              <p className='fimpre'>Solicitud Programatica</p>
              <button className='b-imp'>Imprimir</button>
            </div>
            <div className='fcc-i'>
              <p className='fimpre'>Oficio Presentación</p>
              <button className='b-imp'>Imprimir</button>
            </div>
            <div className='fcc-i'>
              <p className='fimpre'>Leyenda Alusivas</p>
              <button className='b-imp'>Imprimir</button>
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

        <div className='subdad' ref={el => (this.holi = el)} style={{ zIndex: '2', position: 'absolute' }}>
          <div className='bueno'>
            <p>Bueno por: {this.state.fondo.importe}</p>
          </div>
          <div className='recibi'>
            <p>
              Recibí   de la  Secretaría  de  Finanzas Públicas  del  Gobierno  del  Estado de Hidalgo la cantidad de:
              $ {this.state.fondo.importe} ({(NumberAsString(this.state.fondo.importe))})
            </p>
          </div>
          <div className='concepto'>
            <p>Por {this.state.fondo.tipo_doc}</p>
          </div>
          <div className='fecha'>
            <p>Pachuca de Soto, Hgo a {today}</p>
          </div>
          <div className='refe'>
            <p>DIRECTOR GENERAL DE<br />ADMINISTRACIÓN Y FINANZAS</p>
          </div>
          <div className='firma-dad'>
            <div className='firma-raya'>
              <p>MTRO. LEÓN MAXIMILIANO HERNÁNDEZ VALDÉS<br />R.F.C.: HEVL-750104</p>
            </div>
          </div>
        </div>

        <div className='subdad' ref={el => (this.holi = el)} style={{ zIndex: '2', position: 'absolute' }}>
          <div className='bueno'>
            <p>Bueno por: {this.state.fondo.importe}</p>
          </div>
          <div className='recibi'>
            <p>
              Recibí   de la  Secretaría  de  Finanzas Públicas  del  Gobierno  del  Estado de Hidalgo la cantidad de:
              $ {this.state.fondo.importe} ({(NumberAsString(this.state.fondo.importe))})
            </p>
          </div>
          <div className='concepto'>
            <p>Por {this.state.fondo.tipo_doc}</p>
          </div>
          <div className='fecha'>
            <p>Pachuca de Soto, Hgo a {today}</p>
          </div>
          <div className='refe'>
            <p>DIRECTOR GENERAL DE<br />ADMINISTRACIÓN Y FINANZAS</p>
          </div>
          <div className='firma-dad'>
            <div className='firma-raya'>
              <p>MTRO. LEÓN MAXIMILIANO HERNÁNDEZ VALDÉS<br />R.F.C.: HEVL-750104</p>
            </div>
          </div>
        </div>

      </div>
    )
  }
}
