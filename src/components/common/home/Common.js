import React, { Component } from 'react'
// importaciones necesarias
import CurrencyFormat from 'react-currency-format'
// Material design
import ArrowForwardIcon from '@material-ui/icons/ArrowForward'
import Divider from '@material-ui/core/Divider'
// css
import './Common.css'

export default class Common extends Component {
  render () {
    return (
      <div className='home-container'>
        <div className='home-over'>
          <div className='home-over-font'>VISTA GENERAL</div>
          <div className='home-usuario-font'>Buenos dias Usuario</div>
          <div>Esto es lo que está sucediendo con tu presupuesto</div>
        </div>
        <div className='home-cards-content'>
          <div className='home-card'>
            <div className='home-grafic-content'>
              <div className='home-grafica'>
                Grafica
              </div>
              <div className='home-text-graf'>
                <div className='home-money-size'>
                  <CurrencyFormat
                    value={299}
                    displayType='text'
                    thousandSeparator
                    prefix=' $ '
                  /> MXN
                </div>
                Afectacion Presupuestal
              </div>
            </div>
            <div>
              Ver toda la actividad <ArrowForwardIcon />
            </div>
          </div>
          <div className='home-card'>
            <div className='home-grafic-content'>
              <div className='home-grafica'>
                Grafica
              </div>
              <div className='home-text-graf'>
                <div className='home-money-size'>
                  <CurrencyFormat
                    value={299}
                    displayType='text'
                    thousandSeparator
                    prefix=' $ '
                  /> MXN
                </div>
                Afectacion Presupuestal
              </div>
            </div>
            <Divider />
            <div style={{ display: 'flex' }}>
              <div style={{ marginTop: '2px' }}>Ver toda la actividad</div>
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', width: 'auto' }}>
                <ArrowForwardIcon />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
