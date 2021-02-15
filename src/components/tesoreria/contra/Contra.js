import React, { Component } from 'react'
import './Contra.css'
import firebase from '../../../Firebase'
import FechaContraList from './FechaContraList'

export default class Contra2 extends Component {
  constructor(props) {
    super(props)
    this.ref = firebase.firestore().collection('fondos').orderBy('fondo', 'desc')
    this.unsubscribe = null
    this.state = {
      fondos: [],
      searchF: ''
    }
  }

  onCollectionUpdate = (querySnapshot) => {
    const fondos = []
    querySnapshot.forEach((doc) => {
      const { fondo, tipo_doc, importe, beneficiario, fechaContra, numContra, fechaDepo, numCheque } = doc.data()
      fondos.push({
        key: doc.id,
        doc,
        fondo,
        tipo_doc,
        importe,
        beneficiario,
        fechaContra,
        numContra,
        fechaDepo,
        numCheque
      })
    })
    this.setState({
      fondos
   })
  }

  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate)
  }

  handleChange (event) {
    this.setState({ [event.target.name]: event.target.value })
  }

  render () {
    const filterData = this.state.fondos.filter(
      (fondos) => {
        return fondos.tipo_doc.indexOf('Fondo Revolvente') !== -1
      }
    )

    return (
      <div className='contra-container'>
        <FechaContraList />
      </div>
    )
  }
}
