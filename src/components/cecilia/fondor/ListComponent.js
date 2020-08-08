import React, { Component } from 'react'
import './Fondor.css'
import RowCompoBanco from './RowCompoBanco'
import firebase from '../../../Firebase'

export default class ListComponent extends Component {
  constructor (props) {
    super(props)
    this.state = {
      presupuesto: [],
      importe: ''
    }
  }

  componentWillMount () {
    firebase.database().ref('presupuesto/').on('child_added', snapshot => {
      this.setState({
        presupuesto: this.state.presupuesto.concat(snapshot.val())
      })
    })
  }

  resetForm () {
    this.refs.contactForm.reset()
  }

  updateSeacrh (event) {
    this.setState({ search: event.target.value.substr(0, 2) })
  }

  updateSeacrh2 (event) {
    this.setState({ search2: event.target.value.substr(0, 7) })
  }

  updateSeacrh3 (event) {
    this.setState({ search3: event.target.value.substr(0, 7) })
  }

  sendMessage (e) {
    e.preventDefault()
    const params = {
      up: this.inputUp.value,
      par: this.inputPartida.value,
      importe: this.inputImporte.value,
      rubro: this.inputRubro.value,
      archivo: this.state.archivo,
      numContra: this.inputNumContra.value
    }
    this.setState({
      up: this.inputUp.value,
      par: this.inputPartida.value,
      importe: this.inputImporte.value,
      rubro: this.inputRubro.value,
      archivo: this.state.archivo,
      numContra: this.inputNumContra.value
    })
    if (params.up && params.par && params.importe && params.rubro && params.archivo) {
      var f = parseInt(params.importe)
      const statsRef = firebase.firestore().collection('banco').doc('--stats--')
      const increment = firebase.firestore.FieldValue.increment(f)
      const batch = firebase.firestore().batch()
      const storyRef = firebase.firestore().collection('banco').doc(`${Math.random()}`)
      batch.set(storyRef, { title: 'Se agredo un fondo' })
      batch.set(statsRef, { storyCount: increment }, { merge: true })
      batch.commit()
      firebase.database().ref('banco').push(params).then(() => {
        alert('Tu solicitud fue enviada.')
      }).catch(() => {
        alert('Tu solicitud no puede ser enviada')
      })
      this.resetForm()
      setInterval(this.consumo, 1000)
    } else {
      alert('Por favor llene el formulario')
    }
  }

  handleChange (event) {
    this.setState({ [event.target.name]: event.target.value })
  }

  getPresu = () => {
    const { listaB } = this.props.listaB
    const filterPres = listaB.filter(
      (presupuesto) => {
        return presupuesto.up.indexOf(this.state.search) !== -1 && presupuesto.par.indexOf(this.state.search2) >= 0 && presupuesto.rubro.indexOf(this.state.search3) >= 0
      }
    )
    return filterPres.map(item =>
      <RowCompoBanco
        key={item.id}
        item={item}
        update={this.props.update}
      />
    )
  };


  render () {
    const filterData = this.state.presupuesto.filter(
      (presupuesto) => {
        return presupuesto.up.indexOf(this.state.search) !== -1 && presupuesto.par.indexOf(this.state.search2) >= 0 && presupuesto.rubro.indexOf(this.state.search3) >= 0
      }
    )

    return (
      <div>
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
                        name='importe'
                        required
                        onChange={this.handleChange.bind(this)}
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
        </div>
        <div className='table-container-p'>
          <div className='table-left' />
          <div className='table-up-p-frn'>
            <b>Up</b>
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
            <button onClick={this.update}>Agregar</button>
          </div>
          <div className='table-right' />
        </div>
        {/*
          this.props.listaB.map(item =>
            <RowCompoBanco
              key={item.id}
              item={item}
              update={this.props.update}
            />
          )
        */}
        {
          this.props.listaB.map(item =>
            <RowCompoBanco
              key={item.id}
              item={item}
              update={this.props.update}
            />
          )
        }
      </div>
    )
  }
}
