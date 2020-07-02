import React, { Component } from 'react';
import './Archivos.css';
import firebase from '../../../Firebase';
import ListComponent from './ListComponent';

export default class Archivos extends Component {
  render() {
    return (
      <div className='pf-container'>
        <div className='site-pf'>
          <p className='site-pf-s'><b>Archivos</b></p>

        </div>
        <div>
              <p> Visualizacion de Archivos</p>
        </div>
        <div>
          {/*<ListComponent
            lista={this.state.lista}
          />*/}
        </div>
      </div>
    )
  }
}
