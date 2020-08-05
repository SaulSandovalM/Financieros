import React, { Component } from 'react'
import './pdfs.css'
import ReactToPrint from 'react-to-print'
import firebase from '../../../../Firebase'

export default class Recibo extends Component {
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
    var meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
    var diasSemana = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']
    var f = new Date()
    today = diasSemana[f.getDay()] + ', ' + f.getDate() + ' de ' + meses[f.getMonth()] + ' de ' + f.getFullYear()

    return (
      <div className='fecha'>
        <div className='subdad' ref={el => (this.holi = el)}>
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
        <ReactToPrint
          trigger={() => <buttom className='bont_imprimir'>Imprimir</buttom>}
          content={() => this.holi}
        />
      </div>
    )
  }
}
