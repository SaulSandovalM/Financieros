import React, { Component } from 'react'
import './pdfs.css'
import ReactToPrint from 'react-to-print'
import firebase from '../../../../Firebase'
import logo2 from '../../../../img/logo.jpg'


export default class Comprobaciondegastocomprobar extends Component {
  constructor (props) {
    super(props)
    this.state = {
      fondo: {},
      key: ''
    }
  }



  render () {
    var today = new Date()
    var meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
    var diasSemana = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']
    var f = new Date()
    today = diasSemana[f.getDay()] + ', ' + f.getDate() + ' de ' + meses[f.getMonth()] + ' de ' + f.getFullYear()

    return (
      <div className='pppdf-dad'>
        <div className='pppdf-subdad' ref={el => (this.holi = el)}>
          <div className='fondo-procu'>
            <img className='ime' src={logo2} alt='' />
          </div>
          <div className='no-oficio'>
            <p>
              <b>Oficio No: </b>
              PGI/DGAyF/ <br />
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
              amortización de adeudos, por un importe total de $______________, (importe con letra), integrado de
              la siguiente forma: comprobantes $______________, (importe con letra), reintegro: $_____________,
              (importe con letra), anexando copia original del recibo oficial No. otorgado por caja general, de fecha
              del recibo, correspondiente al proyecto clave y nombre del proyecto, otorgado en el oficio de
              autorización número del ofidio.
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
            <p className='text'>C.C.P...- Expedien<br />Minutario<br />LMHV/NRL/macht</p>
          </div>
        </div>
        <ReactToPrint
          trigger={() => <buttom className='bont_imprimir'>imprimir</buttom>}
          content={() => this.holi}
        />
      </div>
    )
  }
}
