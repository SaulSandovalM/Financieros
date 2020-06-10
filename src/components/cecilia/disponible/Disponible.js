import React, { Component } from 'react';
import './Disponible.css';
import firebase from '../../../Firebase';

export default class Disponible extends Component {
  render() {
    return (
      <div className='pf-container'>
        <div className='site-pf'>
          <p className='site-pf-s'><b>Disponibilidad por Partida</b></p>
        </div>
      </div>
    )
  }
}
