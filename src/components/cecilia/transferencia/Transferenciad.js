import React, { Component } from 'react'
import './Transferencia.css'
import firebase from '../../../Firebase'
import ListComponent from './ListComponent'
import ListTransferencia from './ListTransferencia'
import Dropzone from 'react-dropzone'

export default class Transferencia extends Component {
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
    const storageRef = firebase.storage().ref(`presupuesto/${file.name}`)
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
  }

  listenForItemsBanco = (itemsRefBanco) => {
    itemsRefBanco.on('value', (snap) => {
      var listaB = []
      snap.forEach((child) => {
        listaB.push({
          abr: child.val().abr,
          gasabr: child.val().gasabr,
          ago: child.val().ago,
          gasago: child.val().gasago,
          año: child.val().año,
          ben: child.val().ben,
          cpa: child.val().cpa,
          dic: child.val().dic,
          gasdic: child.val().gasdic,
          eg: child.val().eg,
          eje: child.val().eje,
          ene: child.val().ene,
          gasene: child.val().gasene,
          est: child.val().est,
          et: child.val().et,
          f: child.val().f,
          feb: child.val().feb,
          gasfeb: child.val().gasfeb,
          ff: child.val().ff,
          fu: child.val().fu,
          igest: child.val().igest,
          itrans: child.val().itrans,
          jul: child.val().jul,
          gasjul: child.val().gasjul,
          jun: child.val().jun,
          gasjun: child.val().gasjun,
          la: child.val().la,
          mar: child.val().mar,
          gasmar: child.val().gasmar,
          may: child.val().may,
          gasmay: child.val().gasmay,
          mi: child.val().mi,
          nov: child.val().nov,
          gasnov: child.val().gasnov,
          np: child.val().np,
          obj: child.val().obj,
          obra: child.val().obra,
          oct: child.val().oct,
          gasoct: child.val().gasoct,
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
          gassep: child.val().gassep,
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

  handleChange (event) {
    this.setState({ [event.target.name]: event.target.value })
  }

  update = (item) => {
    let updates = {}
    updates['presupuesto/' + item.id] = {
      abr: item.abr,
      gasabr: item.gasabr,
      ago: item.ago,
      gasago: item.gasago,
      año: item.año,
      ben: item.ben,
      cpa: item.cpa,
      dic: item.dic,
      gasdic: item.gasdic,
      eg: item.eg,
      eje: item.eje,
      ene: item.ene,
      gasene: item.gasene,
      est: item.est,
      et: item.et,
      f: item.f,
      feb: item.feb,
      gasfeb: item.gasfeb,
      ff: item.ff,
      fu: item.fu,
      igest: item.igest,
      itrans: item.itrans,
      jul: item.jul,
      gasjul: item.gasjul,
      jun: item.jun,
      gasjun: item.gasjun,
      la: item.la,
      mar: item.mar,
      gasmar: item.gasmar,
      may: item.may,
      gasmay: item.gasmay,
      mi: item.mi,
      nov: item.nov,
      gasnov: item.gasnov,
      np: item.np,
      obj: item.obj,
      obra: item.obra,
      oct: item.oct,
      gasoct: item.gasoct,
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
      sep: item.sep + parseInt(this.state.importe),
      gassep: this.state.importe,
      sf: item.sf,
      sp: item.sp,
      tg: item.tg,
      total: item.total,
      up: item.up,
      ur: item.ur,
      estatus: 'Transferencia'
    }
    firebase.database().ref().update(updates)
    alert('Tu solicitud fue enviada.')
  }

  render () {
    return (
      <div className='pf-container-f' style={{marginTop: '60px'}}>
        <div>
          <div>
            <div className='p-container-fondor'>
              <div className='p-margin-fr'>
                <p className='p-title-size-fr'>
                  - Busca los datos para hacer tu transferencia/adición
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
      </div>
    )
  }
}
