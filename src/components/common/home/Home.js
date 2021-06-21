import React, { Component } from 'react'
// importaciones necesarias
import CurrencyFormat from 'react-currency-format'
// Material design
// css
import firebase from '../../../Firebase'
import './Home.css'

export default class Common extends Component {
  render () {
    var user = firebase.auth().currentUser
    var email

    if (user != null) {
      email = user.email
    }

    let admin
    if (email === 'administrador@procu.com') {
      admin = 'ADMIN'
    } else if (email === 'cecilia@procuraduria.com') {
      admin = 'Cecilia'
    } else if (email === 'alfredo@procuraduria.com') {
      admin = 'Alfredo'
    } else if (email === 'nayra@procuraduria.com') {
      admin = 'Nayra'
    } else if (email === 'lizbeth@procuraduria.com') {
      admin = 'Lizbeth'
    } else if (email === 'miguel@procuraduria.com') {
      admin = 'Miguel'
    } else if (email === 'teresa@procuraduria.com') {
      admin = 'Teresa'
    } else if (email === 'marcos@procuraduria.com') {
      admin = 'Marcos'
    } else if (email === 'eloy@procuraduria.com') {
      admin = 'Eloy'
    } else if (email === 'karina@procuraduria.com') {
      admin = 'Karina'
    } else if (email === 'martha@procuraduria.com') {
      admin = 'Martha'
    } else if (email === 'lilia@procuraduria.com') {
      admin = 'Lilia'
    } else if (email === 'cenely@procuraduria.com') {
      admin = 'Cenely'
    } else if (email === 'hector@procuraduria.com') {
      admin = 'Hector'
    } else if (email === 'omar@procuraduria.com') {
      admin = 'Omar'
    } else if (email === 'elizabeth@procuraduria.com') {
      admin = 'Eli'
    } else if (email === 'juan@procuraduria.com') {
      admin = 'Juan'
    } else if (email === 'validacion@procuraduria.com') {
      admin = 'Validación' // hkV4l1d4c10n
    }
    console.log(admin)

    return (
      <div className='home-container'>
        <div className='home-over'>
          <div className='home-over-font'>VISTA GENERAL</div>
          <div className='home-usuario-font'>Buenos dias {admin}</div>
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
                    prefix=' $'
                  />
                </div>
                Afectacion Presupuestal
              </div>
            </div>
            <div>
              Ver toda la actividad
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
                    prefix=' $'
                  />
                </div>
                Afectacion Presupuestal
              </div>
            </div>
            <div style={{ display: 'flex' }}>
              <div>Ver toda la actividad</div>
            </div>
          </div>
        </div>
        {/*  */}
        <div className='home-cards-content'>
          <div className='home-card-tl'>
            Left
          </div>
          <div className='home-card-tr'>
            Right
          </div>
        </div>
      </div>
    )
  }
}
