import React, { Component } from 'react'
import './Oficios.css'

export default class Cpdf extends Component {
  render () {
    return (
      <div>
        <div className='site-pf'>
          <p className='site-pf-s'><b>Oficios</b></p>
        </div>
        <div>
          <div className='m-f'>
            <div className='fr-con'>
              <p className='fr-b'><b>Fondo Revolvente</b></p>
            </div>
            <div className='fcc-i'>
              <p className='fimpre'>Solicitud Programatica</p>
              <button className='b-imp' onClick={() => this.props.history.push('/Pdf/IopOetql2iBVF1IAsFWd')}>Imprimir</button>
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
      </div>
    )
  }
}
