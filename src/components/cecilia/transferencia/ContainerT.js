import React, { Component } from 'react'
import './Transferencia.css'
import Transferencia from './Transferencia'
import Transferenciad from './Transferenciad'
import ListTransferencia from './ListTransferencia'
import firebase from '../../../Firebase'

export default class ContainerT extends Component {
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

  render () {
    return (
      <div>
        <Transferencia />
        <Transferenciad />
        <div className='pf-container-f' style={{ paddingTop: '50px' }}>
          <div className='p-container-fondor'>
            <div className='p-margin-fr'>
              <p className='p-title-size-fr'>
                - Lista de Trasferencias
              </p>
            </div>
          </div>
        </div>
        <div className='table-container-fr'>
          <div className='table-left' />
          <div className='table-up-p-frn'>
            <b>UP</b>
          </div>
          <div className='table-up-p-frn'>
            <b>PARTIDA</b>
          </div>
          <div className='table-up-p-frn'>
            <b>RUBRO</b>
          </div>
          <div className='table-up-p-frn'>
            <b>IMPORTE</b>
          </div>
          <div className='table-cpa'>
            <b>CPA</b>
          </div>
          <div className='table-up-p-frn'>
            <b>ESTATUS</b>
          </div>
          <div className='table-right' />
        </div>
        <div className='pf-container-f'>
          <div className='space-table2'>
            <ListTransferencia
              listaB={this.state.listaB}
            />
          </div>
        </div>
      </div>
    )
  }
}
