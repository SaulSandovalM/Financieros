import React, { Component } from 'react';
import './Fondor.css';
import firebase from '../../../Firebase';
import ListComponent from './ListComponent';
import CurrencyFormat from 'react-currency-format';
import Dropzone from 'react-dropzone';

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
      up: '',
      partida: '',
      importe: '',
      rubro: '',
      archivo: '',
      contador: {},
      alert: false,
      searchR: [],
      search: '',
      newCantidad: ''
    }
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value})
  }

  updateSearch(event) {
    this.setState({search: event.target.value.substr(0,20)});
  }

  handleUploads (event) {
    const file = event.target.files[0]
    const storageRef = firebase.storage().ref(`fondoRevolvente/${file.name}`)
    const task = storageRef.put(file)
    this.setState({
      file: `${file.name}`
    })
    task.on('state_changed', (snapshot) => {
      let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      this.setState({
        pdf: percentage
      })
    }, error => {
      console.error(error.message);
    }, () =>  storageRef.getDownloadURL().then(url =>  {
      const record = url;
      this.setState({
        archivo: record
      });
    }));
  }

  listenForItems = (itemsRef) => {
    itemsRef.on('value', (snap) => {
      var lista = [];
      snap.forEach((child) => {
        lista.push({
          up: child.val().up,
          partida: child.val().partida,
          importe: child.val().importe,
          rubro: child.val().rubro,
          archivo: child.val().archivo,
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

  componentWillMount () {
    firebase.database().ref('presupuesto').on('child_added', snapshot => {
      this.setState({
        searchR: this.state.searchR.concat(snapshot.val())
      });
    });
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

  resetForm() {
    this.refs.contactForm.reset();
  }

  sendMessage(e) {
    e.preventDefault();
    const params = {
      up: this.inputUp.value,
      partida: this.inputPartida.value,
      importe: this.inputImporte.value,
      rubro: this.inputRubro.value,
      archivo: this.state.archivo
    };
    this.setState({
      up: this.inputUp.value,
      partida: this.inputPartida.value,
      importe: this.inputImporte.value,
      rubro: this.inputRubro.value,
      archivo: this.state.archivo
    })
    if ( params.up && params.partida && params.importe && params.rubro && params.archivo ) {
      var f = parseInt(params.importe);
      const statsRef = firebase.firestore().collection('banco').doc('--stats--');
      const increment = firebase.firestore.FieldValue.increment(f);
      const batch = firebase.firestore().batch();
      const storyRef = firebase.firestore().collection('banco').doc(`${Math.random()}`);
      batch.set(storyRef, { title: 'Se agredo un fondo' });
      batch.set(statsRef, { storyCount: increment }, { merge: true });
      batch.commit();
      firebase.database().ref('banco').push(params).then(() => {
        alert('Tu solicitud fue enviada.');
      }).catch(() => {
        alert('Tu solicitud no puede ser enviada');
      });
      this.resetForm();
    } else {
      alert('Por favor llene el formulario');
    };
  }

  update = (item) => {
    let updates = {};
    updates['presupuesto/' + item.id] = {
      rm: item.rm,
      os: item.os,
      up: item.up,
      rubro: item.rubro,
      tg: item.tg,
      ogasto: item.ogasto,
      f: item.f,
      fu: item.fu,
      sf: item.sf,
      eje: item.eje,
      s: item.s,
      prog: item.prog,
      sp: item.sp,
      obj: item.obj,
      proy: item.proy,
      est: item.est,
      ben: item.ben,
      eg: item.eg,
      mi: item.mi,
      pr: item.pr,
      pb: item.pb,
      dp: item.dp,
      indi: item.indi,
      la: item.la,
      ods: item.ods,
      et: item.et,
      ff: item.ff,
      of: item.of,
      np: item.np,
      cpa: item.cpa,
      ene: item.ene,
      feb: item.feb,
      mar: item.mar,
      abr: item.abr,
      may: item.may,
      jun: item.jun,
      jul: item.jul,
      ago: item.ago,
      sep: item.sep,
      oct: item.oct,
      nov: item.nov,
      dic: this.state.newCantidad,
      total: item.total,
    };
    firebase.database().ref().update(updates);
  }

  render() {

    let filterData = this.state.searchR.filter(
      (searchR) => {
        return searchR.up.indexOf(this.state.search) !== -1;
      }
    );

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
              <p className='p-banco'><b>PORCENTAJE AGREGADO</b></p>
              <p className='cantidad-add-banco'>
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
            <div className='p-container-ifr' style={{marginRight: '20px'}}>
              <p className='p-title-margin-fr'>Archivo Pdf</p>
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
                  <p className='file-hid'>{this.state.file}</p>
                </div>
              </Dropzone>
              <progress className='progress' value={this.state.pdf} max='100'>
                {this.state.pdf} %
              </progress>
            </div>
          </div>
        </div>
        <form onSubmit={this.sendMessage.bind(this)} ref='contactForm'>
          <div className='p-container-fondor'>
            <div className='p-margin-fr'>
              <p className='p-title-size-fr'>
                - Busca tu partida para crear tu fondo revolvente
              </p>
            </div>
            <div className='inputs-container-fr'>
              <div className='inputs-col-fr'>
                <div className='inputs-row-fr-2'>
                  <div className='p-container-ifr2'>
                    <p className='p-title-margin-fr'>Importe</p>
                    <input
                      className='input-style-fr'
                      id='importe'
                      required
                      ref={importe => this.inputImporte = importe}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='button-row-s'>
            <button type='submit' className='input-sc boton-g'>Agregar</button>
          </div>
        </form>
        <div>
          <input
            type="text"
            value={this.state.search}
            onChange={this.updateSearch.bind(this)}
          />
        </div>
        {
          filterData.map(searchR => (
            <div className='table-arqueo-content'>
              <div className='table-left'>
              </div>
              <div className='title-arqueo-se'>
                <p className='p-mar-arqueo'>{searchR.up}</p>
              </div>
              <div className='title-arqueo-se'>
                <p className='p-mar-arqueo'>{searchR.par}</p>
              </div>
              <div className='title-arqueo-se'>
                <p className='p-mar-arqueo'>{searchR.rubro}</p>
              </div>
              <div className='title-arqueo-se'>
                <p className='p-mar-arqueo'>{searchR.dic}</p>
              </div>
              <div className='title-arqueo-se'>
                <button onClick={this.update}>Actualizar</button>
              </div>
              <div className='table-right'>
              </div>
            </div>
          )).reverse()
        }
        <div>
          <input
            name='newCantidad'
            onChange={this.handleChange.bind(this)}
            value={this.state.newCantidad}
          />
        </div>
        {/*<div className='space-table'>
          <ListComponent
            lista={this.state.lista}
          />
        </div>*/}
      </div>
    )
  }
}
