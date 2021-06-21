import React, { Component } from 'react'
import './Common.css'

export default class Common extends Component {
  render () {
    return (
      <div className='common'>
        <div className='common-container'>
          <div className='common-content'>
            <p className='common-p'>
              Bienvenido a Financieros
            </p>
          </div>
          <div className='common-content'>
            <p className='common-s'>
              Dirigete al menu para ir a la seccion que desees
            </p>
          </div>
        </div>
      </div>
    )
  }
}
