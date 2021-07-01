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
      alert: false,
      presupuesto: [],
      search: '',
      search2: '',
      search3: '',
      impoene: '',
      impofeb: '',
      impomar: '',
      impoabr: '',
      impomay: '',
      impojun: '',
      impojul: '',
      impoago: '',
      imposep: '',
      impooct: '',
      imponov: '',
      impodic: '',
      oficio: ''
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
          año: child.val().año,
          rm: child.val().rm,
          ur: child.val().ur,
          up: child.val().up,
          rubro: child.val().rubro,
          tg: child.val().tg,
          ogasto: child.val().ogasto,
          npro: child.val().npro,
          f: child.val().f,
          fu: child.val().fu,
          sf: child.val().sf,
          eje: child.val().eje,
          s: child.val().s,
          prog: child.val().prog,
          sp: child.val().sp,
          min: child.val().min,
          obj: child.val().obj,
          proy: child.val().proy,
          est: child.val().est,
          obra: child.val().obra,
          ben: child.val().ben,
          eg: child.val().eg,
          mi: child.val().mi,
          pr: child.val().pr,
          ped: child.val().ped,
          itrans: child.val().itrans,
          igest: child.val().igest,
          la: child.val().la,
          ods: child.val().ods,
          et: child.val().et,
          ff: child.val().ff,
          of: child.val().of,
          np: child.val().np,
          cpa: child.val().cpa,
          ene: child.val().ene,
          gasene: child.val().gasene,
          ampene: child.val().ampene,
          feb: child.val().feb,
          gasfeb: child.val().gasfeb,
          ampfeb: child.val().ampfeb,
          mar: child.val().mar,
          gasmar: child.val().gasmar,
          ampmar: child.val().ampmar,
          abr: child.val().abr,
          gasabr: child.val().gasabr,
          ampabr: child.val().ampabr,
          may: child.val().may,
          gasmay: child.val().gasmay,
          ampmay: child.val().ampmay,
          jun: child.val().jun,
          gasjun: child.val().gasjun,
          ampjun: child.val().ampjun,
          jul: child.val().jul,
          gasjul: child.val().gasjul,
          ampjul: child.val().ampjul,
          ago: child.val().ago,
          gasago: child.val().gasago,
          ampago: child.val().ampago,
          sep: child.val().sep,
          gassep: child.val().gassep,
          ampsep: child.val().ampsep,
          oct: child.val().oct,
          gasoct: child.val().gasoct,
          ampoct: child.val().ampoct,
          nov: child.val().nov,
          gasnov: child.val().gasnov,
          ampnov: child.val().ampnov,
          dic: child.val().dic,
          gasdic: child.val().gasdic,
          ampdic: child.val().ampdic,
          total: child.val().total,
          ampliacion: child.val().ampliacion,
          reduccion: child.val().reduccion,
          transferencia: child.val().transferencia,
          oficio: child.val().oficio,
          id: child.key
        })
      })
      this.setState({
        listaB: listaB
      })
    })
  }

  render () {
    return (
      <div style={{ background: '#f4f4f4', minHeight: '100vh' }}>
        <Transferencia />
        <Transferenciad />
        <div className='pf-container-f' style={{ paddingTop: '20px' }}>
          <div className='p-container-fondor'>
            <div className='p-margin-fr'>
              <p className='p-title-size-fr'>
                - Lista de Trasferencias
              </p>
            </div>
          </div>
        </div>
        <div style={{ margin: '0 30px 0 30px' }}>
          <ListTransferencia
            listaB={this.state.listaB}
          />
        </div>
      </div>
    )
  }
}
