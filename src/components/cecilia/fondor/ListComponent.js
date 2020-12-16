import React, { Component } from 'react'
import './Fondor.css'
import RowCompoBanco from './RowCompoBanco'
import firebase from '../../../Firebase'
import TextField from '@material-ui/core/TextField'
import Table from '@material-ui/core/Table'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'

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
      ogasto: this.inputPartida.value,
      importe: this.inputImporte.value,
      rubro: this.inputRubro.value,
      archivo: this.state.archivo,
      numContra: this.inputNumContra.value
    }
    this.setState({
      up: this.inputUp.value,
      ogasto: this.inputPartida.value,
      importe: this.inputImporte.value,
      rubro: this.inputRubro.value,
      archivo: this.state.archivo,
      numContra: this.inputNumContra.value
    })
    if (params.up && params.ogasto && params.importe && params.rubro && params.archivo) {
      var f = parseInt(params.importe)
      const statsRef = firebase.firestore().collection('banco').doc('--stats--')
      const increment = firebase.firestore.FieldValue.increment(f)
      const batch = firebase.firestore().batch()
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

  render () {
    return (
      <div style={{ marginTop: '61px' }}>
        <div>
          <div>
            <div className='p-container-fondor' style={{ background: '#f4f4f4', padding: '30px' }}>
              <div className='inputs-container-fr' ref='contactForm'>
                <div className='inputs-col-fr-t'>
                  <div className='inputs-row-fr-2' style={{ width: '60%' }}>
                    <div className='p-container-ifr3'>
                      <TextField
                        label='Up'
                        id='up'
                        required
                        value={this.state.search}
                        onChange={this.updateSeacrh.bind(this)}
                        ref={up => this.inputUp = up}
                      />
                    </div>
                    <div className='p-container-ifr3'>
                      <TextField
                        label='Partida'
                        id='partida'
                        required
                        value={this.state.search2}
                        onChange={this.updateSeacrh2.bind(this)}
                        ref={partida => this.inputPartida = partida}
                      />
                    </div>
                    <div className='p-container-ifr3'>
                      <TextField
                        label='Rubro'
                        id='rubro'
                        required
                        value={this.state.search3}
                        onChange={this.updateSeacrh3.bind(this)}
                        ref={rubro => this.inputRubro = rubro}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div style={{ margin: '30px' }}>
          <TableContainer component={Paper}>
            <Table size='small'>
              <TableHead>
                <TableRow>
                  <TableCell className='table-up-p-frn-a'>
                    <b>Up</b>
                  </TableCell>
                  <TableCell className='table-up-p-frn-p'>
                    <b>Partida</b>
                  </TableCell>
                  <TableCell className='table-up-p-frn-p'>
                    <b>Rubro</b>
                  </TableCell>
                  <TableCell className='mes-t'>
                    <b>Enero</b>
                  </TableCell>
                  <TableCell className='mes-t'>
                    <b>Febrero</b>
                  </TableCell>
                  <TableCell className='mes-t'>
                    <b>Marzo</b>
                  </TableCell>
                  <TableCell className='mes-t'>
                    <b>Abril</b>
                  </TableCell>
                  <TableCell className='mes-t'>
                    <b>Mayo</b>
                  </TableCell>
                  <TableCell className='mes-t'>
                    <b>Junio</b>
                  </TableCell>
                  <TableCell className='mes-t'>
                    <b>Julio</b>
                  </TableCell>
                  <TableCell className='mes-t'>
                    <b>Agosto</b>
                  </TableCell>
                  <TableCell className='mes-t'>
                    <b>Septiembre</b>
                  </TableCell>
                  <TableCell className='mes-t'>
                    <b>Octubre</b>
                  </TableCell>
                  <TableCell className='mes-t'>
                    <b>Noviembre</b>
                  </TableCell>
                  <TableCell className='mes-t'>
                    <b>Diciembre</b>
                  </TableCell>
                  <TableCell className='mes-t'>
                    <b>Estatus</b>
                  </TableCell>
                </TableRow>
              </TableHead>
              {
                this.props.listaB.map(item =>
                  <RowCompoBanco
                    key={item.id}
                    item={item}
                    update={this.props.update}
                    search={this.state.search}
                    search2={this.state.search2}
                    search3={this.state.search3}
                  />
                )
              }
            </Table>
          </TableContainer>
        </div>
      </div>
    )
  }
}
