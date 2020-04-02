import React, { Component } from 'react';
import firebase from '../../Firebase';
import CurrencyFormat from 'react-currency-format';
import './Fondos.css';

class Fondos extends Component {
  constructor() {
    super();
    this.ref = firebase.firestore().collection('fondos');
    this.units = ['CERO PESOS 00/100 M.N.', 'UN PESOS 00/100 M.N.', 'DOS PESOS 00/100 M.N.', 'TRES PESOS 00/100 M.N.', 'CUATRO PESOS 00/100 M.N.', 'CINCO PESOS 00/100 M.N.',
                  'SEIS PESOS 00/100 M.N.', 'SIETE PESOS 00/100 M.N.', 'OCHO PESOS 00/100 M.N.', 'NUEVE PESOS 00/100 M.N.'];
    this.tenToSixteen = ['DIEZ PESOS 00/100 M.N.', 'ONCE PESOS 00/100 M.N.', 'DOCE PESOS 00/100 M.N.', 'TRECE PESOS 00/100 M.N.', 'CATORCE PESOS 00/100 M.N.', 'QUINCE PESOS 00/100 M.N.', 'DIECISEIS PESOS 00/100 M.N.'];
    this.tens = ['treinta', 'cuarenta', 'cincuenta', 'sesenta', 'setenta', 'ochenta', 'noventa'];
    this.elMessage = document.getElementById('message');
    this.addListener();
    this.state = {
      fondo: '',
      fecha: '',
      tipo_doc: '',
      oficio_aut: '',
      no_oficio: '',
      no_aut: '',
      no_lici: '',
      importe: '',
      desc: '',
      importe_l: '',
      beneficiario: 'Mtro. León Maximiliano Hernández Valdez',
      realizo: '',
    };
  }

  addListener() {
      let elInput = document.getElementById('field-number');
      if(elInput) {
        elInput.addEventListener('keyup', () => {
            if (elInput.value !== '') {
                this.convertToText(elInput.value);
            } else {
                this.elMessage.innerText = '';
            }
        });
      }
  }

  convertToText(number) {
      number = this.deleteZerosLeft(number);
      if (!this.validateNumber(number)) {
          this.elMessage.innerText = 'cantidades positivas';
          return;
      }
      this.elMessage.innerText = this.getName(number);
  }

  // Elimina los ceros a la izquierda
  deleteZerosLeft(number) {
      let i = 0;
      let isZero = true;
      for (i = 0; i < number.length; i++) {
          if (number.charAt(i) != 0) {
              isZero = false;
              break;
          }
      }
      return isZero ? '0' : number.substr(i);
  }

  validateNumber(number) {
      // Validar que la cadena sea un número y que no esté vacía
      if (isNaN(number) || number === '') {
          return false;
      }
      // Validar que no tenga punto decimal
      if (number.indexOf('.') >= 0) {
          return false;
      }
      // Validar que el número no sea negativo
      if (number.indexOf('-') >= 0) {
          return false;
      }
      return true;
  }

  getName(number) {
      number = this.deleteZerosLeft(number);

      if (number.length === 1) {
          return this.getUnits(number);
      }
      if (number.length === 2) {
          return this.getTens(number);
      }
      if (number.length === 3) {
          return this.getHundreds(number);
      }
      if (number.length < 7) {
          return this.getThousands(number);
      }
      if (number.length < 13) {
          return this.getPeriod(number, 6, 'MILLON PESOS 00/100 M.N.');
      }
      if (number.length < 19) {
          return this.getPeriod(number, 12, 'BILLON DE 00/100 M.N.)');
      }
      return 'N. MUY GRANDE.';
  }

  getUnits(number) {
      let numberInt = parseInt(number);
      return this.units[numberInt];
  }

  getTens(number) {
      // Obtener las unidades
      let units = number.charAt(1);

      if (number < 17) {
          return this.tenToSixteen[number - 10];
      }
      if (number < 20) {
          return 'DIECI' + this.getUnits(units);
      }
      // Nombres especiales
      switch (number) {
          case '20':
              return 'VEINTE PESOS 00/100 M.N.';
          case '22':
              return 'VEINTIDOS 00/100 M.N.';
          case '23':
              return 'VEINTITRES 00/100 M.N. ';
          case '26':
              return 'VEINTISEIS 00/100 M.N.';
      }
      if (number < 30) {
          return 'VEINTI' + this.getUnits(units);
      }
      let name = this.tens[number.charAt(0) - 3];
      if (units > 0) {
          name += ' y ' + this.getUnits(units);
      }
      return name;
  }

  getHundreds(number) {
      let name = '';
      // Obtener las centenas
      let hundreds = number.charAt(0);
      // Obtener las decenas y unidades
      let tens = number.substr(1);

      if (number == 100) {
          return 'CIEN  00/100 M.N.';
      }
      // Nombres especiales
      switch(hundreds) {
          case '1':
              name = 'CIENTO  ';
              break;
          case '5':
              name = 'QUINIENTOS';
              break;
          case '7':
              name = 'SETECIENTOS';
              break;
          case '9':
              name = 'NOVECIENTOS';
      }
      if (name === '') {
          name = this.getUnits(hundreds) + 'CIENTOS';
      }
      if (tens > 0) {
          name += ' ' + this.getName(tens);
      }
      return name;
  }

  getThousands(number) {
      let name = ' UN MIL 00/100 M.N.';
      // Obtener cuantos dígitos están en los miles
      let thousandsLength = number.length - 3;
      // Obtener los miles
      let thousands = number.substr(0, thousandsLength);
      // Obtener las centenas, decenas y unidades
      let hundreds = number.substr(thousandsLength);

      if (thousands > 1) {
          // Se reemplaza la palabra uno por un en numeros como 21000, 31000, 41000, etc.
          name = this.getName(thousands).replace('UN', 'UN') + 'MIL ';
      }
      if (hundreds > 0) {
          name += ' ' + this.getName(hundreds);
      }
      return name;
  }

  // Obtiene periodos, por ejemplo: millones, billones, etc.
  getPeriod(number, digitsToTheRight, periodName) {
      let name = 'UN ' + periodName;
      // Obtener cuantos dígitos están dentro del periodo
      let periodLength = number.length - digitsToTheRight;
      // Obtener los dítos del periodo
      let periodDigits = number.substr(0, periodLength);
      // Obtener los digitos previos al periodo
      let previousDigits = number.substr(periodLength);

      if (periodDigits > 1) {
          name = this.getName(periodDigits).replace('UNO', 'UN') + ' ' + periodName.replace('ó', 'o') + 'es';
      }
      if (previousDigits > 0) {
          name += ' ' + this.getName(previousDigits);
      }
      return name;
  }

  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState(state);
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { fondo, fecha, tipo_doc, oficio_aut, no_oficio, no_aut, no_lici, importe, desc, importe_l, beneficiario, realizo } = this.state;

    this.ref.add({
      fondo,
      fecha,
      tipo_doc,
      oficio_aut,
      no_oficio,
      no_aut,
      no_lici,
      importe,
      desc,
      importe_l,
      beneficiario,
      realizo
    }).then((docRef) => {
      this.setState({
        fondo: '',
        fecha: '',
        tipo_doc: '',
        oficio_aut: '',
        no_oficio: '',
        no_aut: '',
        no_lici: '',
        importe: '',
        desc: '',
        importe_l: '',
        beneficiario: '',
        realizo: ''
      });
      this.props.history.push("/")
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
  }

  render() {
    const { fondo, fecha, tipo_doc, oficio_aut, no_oficio, no_aut, no_lici, importe, desc, importe_l, beneficiario, realizo } = this.state;
    return (
      <div className="space-nav">
        <h2 className="title">Registro de fondos</h2>
        <form className="fondos-back" onSubmit={this.onSubmit}>
          <div className="fondos-container">
            <div className="form-container">
              <div className="form-content">
                <label for="fondo" className="itc">Fondo:</label>
                <input type="number" className="border-m" name="fondo" value={fondo} onChange={this.onChange} required/>
              </div>
              <div className="form-content">
                <label for="fecha" className="itc">Fecha:</label>
                <input type="date" className="border-m" name="fecha" value={fecha} onChange={this.onChange} required/>
              </div>
              <div className="form-content">
                <label for="tipo_doc" className="itc">Tipo de documento:</label>
                <select name="tipo_doc" className="border-m" value={tipo_doc} onChange={this.onChange} required>
                  <option name="tipo_doc"></option>
                  <option name="tipo_doc">Pago Directo</option>
                  <option name="tipo_doc">Fondo Revolvente</option>
                  <option name="tipo_doc">Gasto a Comprobar</option>
                  <option name="tipo_doc">Reembolso de Gastos</option>
                  <option name="tipo_doc">Cancelado</option>
                </select>
              </div>
              <div className="form-content">
                <label for="oficio_aut" className="itc">Oficio de Autorizacion:</label>
                <select name="oficio_aut" className="border-m" value={oficio_aut} onChange={this.onChange} required>
                  <option name="oficio_aut"></option>
                  <option name="oficio_aut">SFP-CPF-01-0020/2020</option>
                  <option name="oficio_aut">SFP-CPF-01-0010/2020</option>
                  <option name="oficio_aut">SFP-CPF-01-0724/2020</option>
                  <option name="oficio_aut">SFP-CPF-01-0681/2020</option>
                  <option name="oficio_aut">SFP-CPF-01-DFDP-0949/2020</option>
                </select>
              </div>
            </div>
            {/*seccion 2*/}
            <div className="form-container">
              <div className="form-content">
                <label for="no_oficio" className="itc">No. de Oficio:</label>
                <input type="number" className="border-m" name="no_oficio" value={no_oficio} onChange={this.onChange} required/>
              </div>
              <div className="form-content">
                <label for="no_aut" className="itc">No. de Autorizacion:</label>
                <input type="number" className="border-m" name="no_aut" value={no_aut} onChange={this.onChange} required/>
              </div>
              <div className="form-content">
                <label for="no_lici" className="itc">No. de Licitacion:</label>
                <input type="number" className="border-m" name="no_lici" value={no_lici} onChange={this.onChange} required/>
              </div>
              <div className="form-content hide">
                <p>Fondos</p>
                <input type=""/>
              </div>
            </div>
            {/*seccion 3*/}
            <div className="form-container">
              <div className="form-content-5">
                <label for="importe" className="itc">Importe:</label>
                <CurrencyFormat thousandSeparator={true} prefix={'$'} className="border-m" name="importe" value={importe} onChange={this.onChange} required />
              </div>
              <div className="form-content-5">
                <label for="importe_l" className="itc">Importe letra:</label>
                <input className="input-b" name="importe_l" value={importe_l} onChange={this.onChange} required/>
              </div>
            </div>
            {/*seccion 4*/}
            <div className="form-container">
              <div className="form-content-5">
                <label for="beneficiario" className="itc">Beneficiario:</label>
                <input type="text" className="border-m" name="beneficiario" value={beneficiario} onChange={this.onChange} required/>
              </div>
              <div className="form-content-5">
                <label for="realizo" className="itc">Realizo:</label>
                <select className="border-m" name="realizo" value={realizo} onChange={this.onChange} required>
                  <option name="realizo"></option>
                  <option name="realizo">ELOY</option>
                  <option name="realizo">HECTOR</option>
                  <option name="realizo">LILIANA</option>
                  <option name="realizo">MIGUEL</option>
                  <option name="realizo">TERISITA</option>
                </select>
              </div>
            </div>
            {/*seccion 5*/}
            <div className="form-container">
              <div className="form-content-desc">
                <label for="desc" className="itc">Descripcion:</label>
                <textarea type="text" className="border-m" name="desc" value={desc} onChange={this.onChange} required/>
              </div>
            </div>
            {/*Seccion 9*/}
            <div>
              <label for="field-number">número:</label>
              <input type="text" id='field-number' autocomplete="off" />
              <p id="message"></p>
            </div>
            <div className="form-container-last">
              <div className="botones">
                <button className="bt-s1" type='submit'>+</button>
                <button className="bt-s2" type='submit'>Guadar</button>
                <button className="bt-s3">Cancelar</button>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default Fondos;
