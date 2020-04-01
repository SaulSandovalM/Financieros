import React, { Component } from 'react';
import './Fondos.css';
import firebaseConf from '../../Firebase';

class Fondos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: [],
      alert: false,
      alertData: {},
      isHidden: true
    };
  }

  showAlert(type, message) {
    this.setState({
      alert: true,
      alertData: {type, message}
    });
    setTimeout(() => {
      this.setState({alert: false});
    }, 6000);
  }

  resetForm() {
    this.refs.contactForm.reset();
  }

  cancelCourse() {
    document.getElementById("create-course-form").reset();
  }

  componentWillMount() {
    let formRef = firebaseConf
      .database()
      .ref('fondos/')
      .orderByKey()
      .limitToLast(6);
    formRef.on('child_added', snapshot => {
      const {fondo, fecha, tipo_doc, oficio_aut, no_oficio, no_aut, no_lici, importe, desc, importe_l, beneficiario, realizo, numero, num_conver} = snapshot.val();
      const data = {fondo, fecha, tipo_doc, oficio_aut, no_oficio, no_aut, no_lici, importe, desc, importe_l, beneficiario, realizo, numero, num_conver};
      this.setState({form: [data].concat(this.state.form)});
    });
  }

  sendMessage(e) {
    e.preventDefault();
    const params = {
      fondo: this.inputFondo.value,
      fecha: this.inputFecha.value,
      tipo_doc: this.inputTipodoc.value,
      oficio_aut: this.inputOficioaut.value,
      no_oficio: this.inputNooficio.value,
      no_aut: this.inputNoaut.value,
      no_lici: this.inputNolici.value,
      importe: this.inputImporte.value,
      desc: this.inputDesc.value,
      importe_l: this.inputImportei.value,
      beneficiario: this.inputBeneficiario.value,
      realizo: this.inputRealizo.value,
      numero: this.inputNumero.value,
      num_conver: this.inputNumconver.value
    };
    if (params.fondo && params.fecha && params.tipo_doc && params.oficio_aut && params.no_oficio && params.no_aut && params.no_lici &&
        params.importe && params.desc && params.importe_l && params.beneficiario && params.realizo && params.numero && params.num_conver) {
      firebaseConf.database().ref('fondos/').push(params).then(() => {
        this.showAlert('success', 'Tu solicitud fue enviada, no olvides realizar tu pago antes de ir a tu cita.');
      }).catch(() => {
        this.showAlert('danger', 'Tu solicitud no puede ser enviada');
      });
      this.resetForm();
    } else {
      this.showAlert('warning', 'Por favor llene el formulario');
    };
  }

  render() {
    return (
      <div>
        <h2 className="title">Registro de fondos 2020</h2>
        <form className="fondos-back" onSubmit={this.sendMessage.bind(this)} ref='contactForm' id="create-course-form">
          <div className="fondos-container">
            <div className="form-container">
              <div className="form-content">
                <p>Fondos</p>
                <input
                  id='fondo'
                  required
                  ref={fondo => this.inputFondo = fondo}
                />
              </div>
              <div className="form-content">
                <p>Fecha</p>
                <input
                  type="date"
                  id='fecha'
                  required
                  ref={fecha => this.inputFecha = fecha}
                />
              </div>
              <div className="form-content">
                <p>Tipo de Documento</p>
                <input
                  id='tipo_doc'
                  required
                  ref={tipo_doc => this.inputTipodoc = tipo_doc}
                />
              </div>
              <div className="form-content">
                <p>Oficio de Autorización</p>
                <input
                  id='oficio_aut'
                  required
                  ref={oficio_aut => this.inputOficioaut = oficio_aut}
                />
              </div>
            </div>
            {/*seccion 2*/}
            <div className="form-container">
              <div className="form-content">
                <p>No. de Oficio</p>
                <input
                  id='no_oficio'
                  required
                  ref={no_oficio => this.inputNooficio = no_oficio}
                />
              </div>
              <div className="form-content">
                <p>No. de Autorización</p>
                <input
                  id='no_aut'
                  required
                  ref={no_aut => this.inputNoaut = no_aut}
                />
              </div>
              <div className="form-content">
                <p>No. de Licitación</p>
                <input
                  id='no_lici'
                  required
                  ref={no_lici => this.inputNolici = no_lici}
                />
              </div>
              <div className="form-content hide">
                <p>Fondos</p>
                <input/>
              </div>
            </div>
            {/*seccion 3*/}
            <div className="form-container">
              <div className="form-content-100">
                <p>Importe</p>
                <input
                  id='importe'
                  required
                  ref={importe => this.inputImporte = importe}
                />
              </div>
            </div>
            {/*seccion 4*/}
            <div className="form-container">
              <div className="form-content-50">
                <p>Descripción</p>
                <textarea
                  id='desc'
                  required
                  ref={desc => this.inputDesc = desc}
                />
              </div>
            </div>
            {/*seccion 5*/}
            <div className="form-container">
              <div className="form-content-100">
                <p>Importe Letra</p>
                <input
                  id='importe_l'
                  required
                  ref={importe_l => this.inputImportei = importe_l}
                />
              </div>
            </div>
            {/*seccion 6*/}
            <div className="form-container">
              <div className="form-content-100">
                <p>Beneficiario</p>
                <input
                  id='beneficiario'
                  required
                  ref={beneficiario => this.inputBeneficiario = beneficiario}
                />
              </div>
            </div>
            {/*seccion 7*/}
            <div className="form-container">
              <div className="form-content-50">
                <p>Realizo</p>
                <input
                  id='realizo'
                  required
                  ref={realizo => this.inputRealizo = realizo}
                />
              </div>
            </div>
            {/*Seccion 8 numero*/}
            <div className="form-container">
              <div className="form-content-100">
                <p>Número:</p>
                <input
                  id='numero'
                  required
                  ref={numero => this.inputNumero = numero}
                />
              </div>
            </div>
            {/*Seccion 9*/}
            <div className="form-container">
              <div className="form-content-100">
                <h3>Convertidor de números a letras</h3>
                <div className="conver">
                  <p>número</p>
                  <input
                    id='num_conver'
                    required
                    ref={num_conver => this.inputNumconver = num_conver}
                  />
                </div>
              </div>
            </div>
            {/*Seccion 10 botones*/}
            <div className="form-container">
              <div className="botones">
                <button style={{height: '30px', marginRight: '10px'}} type='submit'>+</button>
                <button style={{height: '30px', marginRight: '10px'}} type='submit'>Guadar</button>
                <button style={{height: '30px', marginRight: '10px'}} onClick={this.cancelCourse}>Cancelar</button>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default Fondos;
