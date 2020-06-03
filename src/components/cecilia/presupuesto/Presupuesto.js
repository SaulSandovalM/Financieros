import React, { Component } from 'react';
import './Presupuesto.css';
import firebase from '../../../Firebase';
import ListComponent from './ListComponent';
import CurrencyFormat from 'react-currency-format';
import csv from 'csv';
import Dropzone from 'react-dropzone';

export default class Presupuesto extends Component {
  constructor () {
    super()
    this.state = {
      pdf: 0,
      lista: [
        {
          id: 1,
          name: 'preuba',
          done: false
        },
      ],
      ingresos: '',
      importe: '',
      proyecto: '',
      clave: '',
      contador: {}
    }
  }

  handleUpload (event) {
    const file = event.target.files[0]
    const storageRef = firebase.storage().ref(`presupuesto-fr/${file.name}`)
    const task = storageRef.put(file)
    task.on('state_changed', (snapshot) => {
      let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      this.setState({
        pdf: percentage
      })
    }, (error) => {
      console.error(error.message)
    })
  }

  onDrop(files) {
    this.setState({ files });
    var file = files[0];
    const reader = new FileReader();
    reader.onload = () => {
      csv.parse(reader.result, (err, data) => {
        var userList = [];
        for (var i = 0; i < data.length; i++) {
          const rm = data[i][0];
          const os = data[i][1];
          const up = data[i][2];
          const rubro = data[i][3];
          const tg = data[i][4];
          const ogasto = data[i][5];
          const f = data[i][6];
          const fu = data[i][7];
          const sf = data[i][8];
          const eje = data[i][9];
          const s = data[i][10];
          const prog = data[i][11];
          const sp = data[i][12];
          const obj = data[i][13];
          const proy = data[i][14];
          const est = data[i][15];
          const obra = data[i][16];
          const ben = data[i][17];
          const eg = data[i][18];
          const mi = data[i][19];
          const pr = data[i][20];
          const pb = data[i][21];
          const dp = data[i][22];
          const indi = data[i][23];
          const meta = data[i][24];
          const la = data[i][25];
          const ods = data[i][26];
          const et = data[i][27];
          const ff = data[i][28];
          const of = data[i][29];
          const np = data[i][30];
          const cpa = data[i][31];
          const dig = data[i][32];
          const par = data[i][33];
          const ene = data[i][34];
          const feb = data[i][35];
          const mar = data[i][36];
          const abr = data[i][37];
          const may = data[i][38];
          const jun = data[i][39];
          const jul = data[i][40];
          const ago = data[i][41];
          const sep = data[i][42];
          const oct = data[i][43];
          const nov = data[i][44];
          const dic = data[i][45];
          const total = data[i][46];
          const presupuesto = {
            "rm": rm, "os": os, "up": up, "rubro": rubro, "tg": tg, "ogasto": ogasto,
            "f": f, "fu": fu, "sf": sf, "eje": eje, "s": s, "prog": prog, "sp": sp,
            "obj": obj, "proy": proy, "est": est, "obra": obra, "ben": ben, "eg": eg,
            "mi": mi, "pr": pr, "pb": pb, "dp": dp, "indi": indi, "meta": meta,
            "la": la, "ods": ods, "et": et, "ff": ff, "of": of, "np": np, "cpa": cpa,
            "dig": dig, "par": par, "ene": ene, "feb": feb, "mar": mar, "abr": abr,
            "may": may, "jun": jun, "jul": jul, "ago": ago, "sep": sep, "oct": oct,
            "nov": nov, "dic": dic, "total": total
          };
          userList.push(presupuesto);
          fetch('https://financieros-78cb0.firebaseio.com/presupuesto.json', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(presupuesto)
          })
        };
      });
    };
    reader.readAsBinaryString(file);
  }

  listenForItems = (itemsRef) => {
    itemsRef.on('value', (snap) => {
      var lista = [];
      snap.forEach((child) => {
        lista.push({
          ingresos: child.val().ingresos,
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
      ingresos: this.inputIngresos.value,
      importe: this.inputImporte.value,
      proyecto: this.inputProyecto.value,
      clave: this.inputClave.value,
    };
    this.setState({
      ingresos: this.inputIngresos.value,
      importe: this.inputImporte.value,
      proyecto: this.inputProyecto.value,
      clave: this.inputClave.value,
    })
    if ( params.ingresos && params.importe && params.proyecto && params.clave) {
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
          <p className='site-pf-s'><b>Presupuesto y Fondo Revolvente</b></p>
        </div>
        <div className='p-container'>
          <div className='p-margin'>
            <p className='p-title-size'>- Aqui puedes subir tu presupuesto anual</p>
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
                accept=".pdf" onChange={this.handleUpload.bind(this)}>
              </Dropzone>
            </div>
            <div className='p-container-i'>
              <p className='p-title-margin'>Archivo Cvs</p>
              <Dropzone
                style={{
                  position: 'ab',
                  width: '100%',
                  height: '29px',
                  borderWidth: '1px',
                  borderColor: '#a9a9a9',
                  borderStyle: 'solid',
                  background: 'white'
                }}
                accept=".csv" onDropAccepted={this.onDrop.bind(this)}>
              </Dropzone>
            </div>
          </div>
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
                accept=".pdf" onChange={this.handleUpload.bind(this)}>
              </Dropzone>
            </div>
          </div>
        </div>
        <form onSubmit={this.sendMessage.bind(this)} ref='contactForm'>
          <div className='p-container'>
            <div className='p-margin-f'>
              <p className='p-title-size'>
                - Ingresa los datos que correspondan con el documento de autorización del fondo revolvente
              </p>
            </div>
            <div className='p-row2'>
              <div className='p-container-i2' style={{marginRight: '20px'}}>
                <p className='p-title-margin2'>R. de Ingresos</p>
                <input
                  className='input-h'
                  id='ingresos'
                  ref={ingresos => this.inputIngresos = ingresos}
                  placeholder='Aprovechamientos por Cooperaciones'
                  required
                />
              </div>
              <div className='p-container-i2' >
                <p className='p-title-margin2'>Importe</p>
                <input
                  className='input-h'
                  id='importe'
                  ref={importe => this.inputImporte = importe}
                  placeholder='$ 704,874.00'
                  required
                />
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
        <div className='space-table'>
          <ListComponent
            lista={this.state.lista}
          />
        </div>
      </div>
    )
  }
}
