import React, { Component } from 'react'
import './Fondor.css'
import firebase from '../../../Firebase'
import ListComponent from './ListComponent'
import ListFr from './ListFr'
import CurrencyFormat from 'react-currency-format'
import Dropzone from 'react-dropzone'

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
        }
      ],
      listaB: [
        {
          id: 1,
          name: 'preuba',
          done: false
        }
      ],
      up: '',
      par: '',
      rubro: '',
      archivo: '',
      importe: '',
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
      })
    })
  }

  updateSeacrh (event) {
    this.setState({ search: event.target.value.substr(0, 20) })
  }

  updateSeacrh2 (event) {
    this.setState({ search2: event.target.value.substr(0, 20) })
  }

  updateSeacrh3 (event) {
    this.setState({ search3: event.target.value.substr(0, 20) })
  }

  handleUploads (event) {
    const file = event.target.files[0]
    const storageRef = firebase.storage().ref(`fondoRevolvente/${file.name}`)
    const task = storageRef.put(file)
    this.setState({
      file: `${file.name}`
    })
    task.on('state_changed', (snapshot) => {
      const percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      this.setState({
        pdf: percentage
      })
    }, error => {
      console.error(error.message)
    }, () => storageRef.getDownloadURL().then(url => {
      const record = url
      this.setState({
        archivo: record
      })
    }))
  }

  componentDidMount () {
    const itemsRefBanco = firebase.database().ref('presupuesto/')
    this.listenForItemsBanco(itemsRefBanco)
    this.consumo()
  }

  listenForItemsBanco = (itemsRefBanco) => {
    itemsRefBanco.on('value', (snap) => {
      var listaB = []
      snap.forEach((child) => {
        listaB.push({
          abr: child.val().abr,
          ago: child.val().ago,
          año: child.val().año,
          ben: child.val().ben,
          cpa: child.val().cpa,
          dic: child.val().dic,
          gasdic: child.val().gasdic,
          eg: child.val().eg,
          eje: child.val().eje,
          ene: child.val().ene,
          est: child.val().est,
          et: child.val().et,
          f: child.val().f,
          feb: child.val().feb,
          ff: child.val().ff,
          fu: child.val().fu,
          igest: child.val().igest,
          itrans: child.val().itrans,
          jul: child.val().jul,
          jun: child.val().jun,
          la: child.val().la,
          mar: child.val().mar,
          may: child.val().may,
          mi: child.val().mi,
          nov: child.val().nov,
          np: child.val().np,
          obj: child.val().obj,
          obra: child.val().obra,
          oct: child.val().oct,
          ods: child.val().ods,
          of: child.val().of,
          ogasto: child.val().ogasto,
          ped: child.val().ped,
          pr: child.val().pr,
          prog: child.val().prog,
          proy: child.val().proy,
          rm: child.val().rm,
          rubro: child.val().rubro,
          s: child.val().s,
          sep: child.val().sep,
          sf: child.val().sf,
          sp: child.val().sp,
          tg: child.val().tg,
          total: child.val().total,
          up: child.val().up,
          ur: child.val().ur,
          estatus: child.val().estatus,
          done: child.val().done,
          id: child.key
        })
      })
      this.setState({
        listaB: listaB
      })
    })
  }

  consumo = () => {
    const ref = firebase.firestore().collection('banco').doc('--stats--')
    ref.get().then((doc) => {
      if (doc.exists) {
        this.setState({
          contador: doc.data(),
          key: doc.id,
          isLoading: true
        })
      } else {
        console.log('No hay documento!')
      }
    })
  }

  resetForm () {
    this.refs.contactForm.reset()
  }

  handleChange (event) {
    this.setState({ [event.target.name]: event.target.value })
  }

  update = (item) => {
    let updates = {}
    updates['presupuesto/' + item.id] = {
      abr: item.abr,
      ago: item.ago,
      año: item.año,
      ben: item.ben,
      cpa: item.cpa,
      dic: item.dic - this.state.importe,
      gasdic: this.state.importe,
      eg: item.eg,
      eje: item.eje,
      ene: item.ene,
      est: item.est,
      et: item.et,
      f: item.f,
      feb: item.feb,
      ff: item.ff,
      fu: item.fu,
      igest: item.igest,
      itrans: item.itrans,
      jul: item.jul,
      jun: item.jun,
      la: item.la,
      mar: item.mar,
      may: item.may,
      mi: item.mi,
      nov: item.nov,
      np: item.np,
      obj: item.obj,
      obra: item.obra,
      oct: item.oct,
      ods: item.ods,
      of: item.of,
      ogasto: item.ogasto,
      ped: item.ped,
      pr: item.pr,
      prog: item.prog,
      proy: item.proy,
      rm: item.rm,
      rubro: item.rubro,
      s: item.s,
      sep: item.sep,
      sf: item.sf,
      sp: item.sp,
      tg: item.tg,
      total: item.total,
      up: item.up,
      ur: item.ur,
      estatus: 'FR'
    }
    firebase.database().ref().update(updates)
    var f = parseInt(this.state.importe)
    const statsRef = firebase.firestore().collection('banco').doc('--stats--')
    const increment = firebase.firestore.FieldValue.increment(f)
    const batch = firebase.firestore().batch()
    batch.set(statsRef, { storyCount: increment }, { merge: true })
    batch.commit()
    alert('Tu solicitud fue enviada.')
    setInterval(this.consumo, 1000)
  }

  render () {
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
                  displayType='text'
                  thousandSeparator
                  prefix=' $'
                />
              </p>
            </div>
          </div>
          <div className='p-row'>
            <div className='p-container-ifr' style={{ marginRight: '20px' }}>
              <p className='p-title-margin-fr'>Archivo Pdf</p>
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
                accept='.pdf' onChange={this.handleUploads.bind(this)}
              >
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
          <div>
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
                    <div className='no' />
                    <div className='p-container-ifr2'>
                      <p className='p-title-margin-fr'>Importe</p>
                      <input
                        className='input-style-fr'
                        id='importe'
                        name='importe'
                        required
                        style={{zIndex: '3'}}
                        onChange={this.handleChange.bind(this)}
                        ref={importe => this.inputImporte = importe}
                      />
                    </div>
                    <div className='p-container-ifr2'>
                      <p className='p-title-margin-fr'>Num de Contrarecibo</p>
                      <input
                        className='input-style-fr'
                        id='numContra'
                        style={{zIndex: '3'}}
                        ref={numContra => this.inputNumContra = numContra}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='space-table'>
          <ListComponent
            listaB={this.state.listaB}
            update={this.update}
          />
        </div>
        <div className='space-table2'>
          <ListFr
            listaB={this.state.listaB}
          />
        </div>
      </div>
    )
  }
}
