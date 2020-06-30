import React, { Component } from 'react';
import './Fondos.css';
import firebase from '../../../Firebase';
import { NumberAsString } from './NumerosLetras.js';

export default class Archivos extends Component {
  render() {
    return (
      <div className='pf-container'>
        <div className='site-pf'>
          <p className='site-pf-s'><b>Fondos 2020</b></p>
        </div>
        <div className='space-fm' />
        <div>
          <div className='p-container-fondo'>
            <p className='p-title-margin-fondo'>Num. de Fondo</p>
            <input
              className='input-style-fr'
              id='up'
              required
              ref={up => this.inputUp = up}
            />
          </div>
          <div className='p-container-fondo'>
            <p className='p-title-margin-fondo'>Fecha</p>
            <input
              className='input-style-fr'
              id='up'
              required
              ref={up => this.inputUp = up}
            />
          </div>
          <div className='p-container-fondo'>
            <p className='p-title-margin-fondo'>Tipo de documento</p>
            <select className='input-style-fr'>
            </select>
          </div>
          <div className='p-container-fondo'>
            <p className='p-title-margin-fondo'>Oficio de Autorización</p>
            <input
              className='input-style-fr'
              id='up'
              required
              ref={up => this.inputUp = up}
            />
          </div>
          <div className='p-container-fondo'>
            <p className='p-title-margin-fondo'>Num. de Oficio</p>
            <input
              className='input-style-fr'
              id='up'
              required
              ref={up => this.inputUp = up}
            />
          </div>
          <div className='p-container-fondo'>
            <p className='p-title-margin-fondo'>Num. de Licitación</p>
            <input
              className='input-style-fr'
              id='up'
              required
              ref={up => this.inputUp = up}
            />
          </div>
          <div className='p-container-fondo'>
            <p className='p-title-margin-fondo'>Importe</p>
            <input
              className='input-style-fr'
              id='up'
              required
              ref={up => this.inputUp = up}
            />
          </div>
          <div className='p-container-fondo'>
            <p className='p-title-margin-fondo'>Importe Letra</p>
            <input
              className='input-style-fr'
              name="importe_l"
              onChange={this.onChange}
              required
              ref="importe_l"
            />
          </div>
          <div className='p-container-fondo'>
            <p className='p-title-margin-fondo'>Beneficiario</p>
            <select className='input-style-fr'>
            </select>
          </div>
          <div className='p-container-fondo'>
            <p className='p-title-margin-fondo'>Descripcción</p>
            <textarea className='input-style-fr'/>
          </div>
          <div className='p-container-fondo'>
            <p className='p-title-margin-fondo'>Realizo</p>
            <input className='input-style-fr'/>
          </div>
        </div>
      </div>
    )
  }
}
