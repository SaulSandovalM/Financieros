import React, { Component } from 'react';
import './index.css';

export default class Common extends Component {
  render() {
    return (
      <div class='common'>
        <div class='common-container'>
          <div class='common-content'>
            <p class='common-p'>Bienvenido a Financieros</p>
          </div>
          <div class='common-content'>
            <p class='common-s'>Dirigete al menu para ir a la seccion que desees</p>
          </div>
        </div>
      </div>
    )
  }
}
