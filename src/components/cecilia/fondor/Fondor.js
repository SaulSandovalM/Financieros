import React, { Component } from 'react';
import './Fondor.css';
import firebase from '../../../Firebase';
import RowComponent from './RowComponent';
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
      par: '',
      rubro: '',
      archivo: '',
      dic: '',
      contador: {},
      alert: false,
      presupuesto: [],
      search: '',
      search2: '',
      search3: ''
    }
  }

  componentWillMount () {
    firebase.database().ref('presupuesto/').on('child_added', snapshot => {
      this.setState({
        presupuesto: this.state.presupuesto.concat(snapshot.val())
      });
    });
  }

  updateSeacrh(event) {
    this.setState({search: event.target.value.substr(0,20)})
  }

  updateSeacrh2(event) {
    this.setState({search2: event.target.value.substr(0,20)})
  }

  updateSeacrh3(event) {
    this.setState({search3: event.target.value.substr(0,20)})
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

  componentDidMount() {
    const itemsRef = firebase.database().ref('presupuesto/').limitToLast(1);
    this.listenForItems(itemsRef);
    this.consumo();
  }

  listenForItems = (itemsRef) => {
    itemsRef.on('value', (snap) => {
      var lista = [];
      snap.forEach((child) => {
        lista.push({
          up: child.val().up,
          par: child.val().par,
          importe: child.val().importe,
          rubro: child.val().rubro,
          archivo: child.val().archivo,
          cpa: child.val().cpa,
          done: child.val().done,
          id: child.key
        });
      });
      this.setState({
        lista: lista
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
          isLoading: true
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
      par: this.inputPartida.value,
      importe: this.inputImporte.value,
      rubro: this.inputRubro.value,
      archivo: this.state.archivo,
      numContra: this.inputNumContra.value
    };
    this.setState({
      up: this.inputUp.value,
      par: this.inputPartida.value,
      importe: this.inputImporte.value,
      rubro: this.inputRubro.value,
      archivo: this.state.archivo,
      numContra: this.inputNumContra.value
    })
    if ( params.up && params.par && params.importe && params.rubro && params.archivo ) {
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
      setInterval(this.consumo, 1000);
    } else {
      alert('Por favor llene el formulario');
    };
  }

  render() {

    let filterData = this.state.presupuesto.filter(
      (presupuesto) => {
        return presupuesto.par.indexOf(this.state.search) !== -1 && presupuesto.up.indexOf(this.state.search2) >= 0 && presupuesto.rubro.indexOf(this.state.search3) >= 0;
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
        <div>
          <form onSubmit={this.sendMessage.bind(this)} ref='contactForm'>
            <div className='p-container-fondor'>
              <div className='p-margin-fr'>
                <p className='p-title-size-fr'>
                  - Ingresa los datos que correspondan con el documento
                    de autorización del fondo revolvente
                </p>
              </div>
              <div className='inputs-container-fr'>
                <div className='inputs-col-fr'>
                  <div className='inputs-row-fr-2'>
                    <div className='p-container-ifr2'>
                      <p className='p-title-margin-fr'>Up</p>
                      <input
                        className='input-style-fr'
                        id='up'
                        required
                        value={this.state.search}
                        onChange={this.updateSeacrh.bind(this)}
                        ref={up => this.inputUp = up}
                      />
                    </div>
                    <div className='p-container-ifr2'>
                      <p className='p-title-margin-fr'>Partida</p>
                      <input
                        className='input-style-fr'
                        id='partida'
                        required
                        value={this.state.search2}
                        onChange={this.updateSeacrh2.bind(this)}
                        ref={partida => this.inputPartida = partida}
                      />
                    </div>
                    <div className='p-container-ifr2'>
                      <p className='p-title-margin-fr'>Rubro</p>
                      <input
                        className='input-style-fr'
                        id='rubro'
                        required
                        value={this.state.search3}
                        onChange={this.updateSeacrh3.bind(this)}
                        ref={rubro => this.inputRubro = rubro}
                      />
                    </div>
                    <div className='p-container-ifr2'>
                      <p className='p-title-margin-fr'>Importe</p>
                      <input
                        className='input-style-fr'
                        id='importe'
                        required
                        ref={importe => this.inputImporte = importe}
                      />
                    </div>
                    <div className='p-container-ifr2'>
                      <p className='p-title-margin-fr'>Num de Contrarecibo</p>
                      <input
                        className='input-style-fr'
                        id='numContra'
                        required
                        ref={numContra => this.inputNumContra = numContra}
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
          {this.state.search && this.state.search2 && this.state.search3 &&
            <div>
              {
                filterData.map(item =>
                  <RowComponent
                    key={item.id}
                    item={item}
                  />
                )
              }
            </div>
          }
        </div>
      </div>
    )
  }
}
