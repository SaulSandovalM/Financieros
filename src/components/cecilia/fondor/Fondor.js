import React, { Component } from 'react';
import './Fondor.css';
import firebase from '../../../Firebase';
import ListComponent from './ListComponent';
import CurrencyFormat from 'react-currency-format';
import { NumericTextBox } from '@progress/kendo-react-inputs';
import Dropzone from 'react-dropzone';
import '@progress/kendo-theme-material/dist/all.css';

export default class Fondor extends Component {
  constructor () {
    super()
    this.state = {
      pdf: 0,
      file: '',
      lista: [
        {
          id: 1,
          name: 'preuba',
          done: false
        },
      ],
      importe: '',
      proyecto: '',
      clave: '',
      contador: {}
    }
  }

  handleUploads (event) {
    const file = event.target.files[0]
    const storageRef = firebase.storage().ref(`presupuesto-fr/${file.name}`)
    const task = storageRef.put(file)
    this.setState({
      file: `${file.name}`
    })
    task.on('state_changed', (snapshot) => {
      let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      this.setState({
        pdf: percentage
      })
    }, (error) => {
      console.error(error.message)
    })
  }

  listenForItems = (itemsRef) => {
    itemsRef.on('value', (snap) => {
      var lista = [];
      snap.forEach((child) => {
        lista.push({
          importe: child.val().importe,
          proyecto: child.val().proyecto,
          clave: child.val().clave,
          done: child.val().done,
          id: child.key
        });
      });
      this.setState({
        lista: lista
      });
    });
  }

  componentDidMount() {
    const itemsRef = firebase.database().ref('banco/');
    this.listenForItems(itemsRef);
    this.consumo();
  }

  consumo = () => {
    const ref = firebase.firestore().collection('banco').doc('--stats--');
    ref.get().then((doc) => {
      if (doc.exists) {
        this.setState({
          contador: doc.data(),
          key: doc.id,
          isLoading: false
        });
      } else {
        console.log("No hay documento!");
      }
    })
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

  sendMessage(e) {
    e.preventDefault();
    const params = {
      importe: this.inputImporte.value,
      proyecto: this.inputProyecto.value,
      clave: this.inputClave.value,
    };
    this.setState({
      importe: this.inputImporte.value,
      proyecto: this.inputProyecto.value,
      clave: this.inputClave.value,
    })
    if ( params.importe && params.proyecto && params.clave) {
      var f = parseInt(params.importe);
      const statsRef = firebase.firestore().collection('banco').doc('--stats--');
      const increment = firebase.firestore.FieldValue.increment(f);
      const batch = firebase.firestore().batch();
      const storyRef = firebase.firestore().collection('banco').doc(`${Math.random()}`);
      batch.set(storyRef, { title: 'Se agredo un fondo' });
      batch.set(statsRef, { storyCount: increment }, { merge: true });
      batch.commit();
      firebase.database().ref('banco').push(params).then(() => {
        this.showAlert('success', 'Tu solicitud fue enviada.');
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
      <div className='pf-container'>
        <div className='site-pf'>
          <p className='site-pf-s'><b>Fondo Revolvente</b></p>
        </div>
        <div className='p-container-fr'>
          <div className='p-margin-row'>
            <p className='p-title-size'>
              - Agrega el documento de autorización de fondo revolvente
            </p>
            <div>
              <p class='p-banco'><b>PORCENTAJE AGREGADO</b></p>
              <p class='cantidad-add-banco'>
                MXN
                <CurrencyFormat
                  value={this.state.contador.storyCount}
                  displayType={'text'}
                  thousandSeparator={true}
                  prefix={' $'} />
                .00
              </p>
            </div>
          </div>
          <div className='p-row'>
            <div className='p-container-i' style={{marginRight: '20px'}}>
              <p className='p-title-margin'>Archivo Pdf</p>
              <Dropzone
                style={{
                  position: 'ab',
                  width: '100%',
                  height: '29px',
                  borderWidth: '1px',
                  borderColor: '#a9a9a9',
                  borderStyle: 'solid',
                  background: 'white',
                }}
                accept=".pdf" onChange={this.handleUploads.bind(this)}>
                <div className='filename'>
                  {this.state.file}
                </div>
              </Dropzone>
              <progress className='progress' value={this.state.pdf} max='100'>
                {this.state.pdf} %
              </progress>
            </div>
          </div>
        </div>
        {/*{this.state.pdf === 100 &&*/}
          <form onSubmit={this.sendMessage.bind(this)} ref='contactForm'>
            <div className='p-container'>
              <div className='p-margin-f'>
                <p className='p-title-size'>
                  - Ingresa los datos que correspondan con el documento
                    de autorización del fondo revolvente
                </p>
              </div>
              <div className='p-row2'>
                <div className='p-container-i2' >
                  <p className='p-title-margin2'>Importe</p>
                  <div className='ui-kendo'>
                    <NumericTextBox
                      format="c2"
                      min={0}
                      width='100%'
                      spinners={false}
                      id='importe'
                      ref={importe => this.inputImporte = importe}
                      placeholder='$ 704,874.00'
                      required
                    />
                  </div>
                </div>
              </div>
              <div className='p-col'>
                <div className='p-container-i3' >
                  <p className='p-title-margin2'>Proyecto</p>
                  <input
                    className='input-h'
                    id='proyecto'
                    ref={proyecto => this.inputProyecto = proyecto}
                    placeholder='ACCIONES DE INVESTIGACION EJECUTIVAS'
                    required
                  />
                </div>
                <div className='p-container-i3' >
                  <p className='p-title-margin2'>Clave</p>
                  <input
                    className='input-h'
                    id='clave'
                    ref={clave => this.inputClave = clave}
                    placeholder='26-30-01-6201010-01-253001-1-02-02-404-00-E0018-01-002-AU001-001-B07-85000-00-00-D5-C5-0194-00-01-PF-01-01'
                  />
                </div>
              </div>
            </div>
            <div className='button-row-s'>
              <button type='submit' class='input-sc boton-g'>Agregar</button>
            </div>
          </form>
        {/*}*/}
        <div className='space-table'>
          <ListComponent
            lista={this.state.lista}
          />
        </div>
      </div>
    )
  }
}
