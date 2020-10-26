import React, { Component } from 'react'
import './Reduccion.css'
import RowCompoReduccion from './RowCompoReduccion'
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

  updateSeacrh (event) {
    this.setState({ search: event.target.value.substr(0, 2) })
  }

  updateSeacrh2 (event) {
    this.setState({ search2: event.target.value.substr(0, 7) })
  }

  updateSeacrh3 (event) {
    this.setState({ search3: event.target.value.substr(0, 7) })
  }

  handleChange (event) {
    this.setState({ [event.target.name]: event.target.value })
  }

  render () {
    return (
      <div>
        <div>
          <div>
            <div className='p-container-fondor' style={{ background: '#f4f4f4', padding: '30px' }}>
              <div className='p-margin-fr'>
                <p className='p-title-size-fr' />
              </div>
              <div className='inputs-container-fr' ref='contactForm'>
                <div className='inputs-col-fr'>
                  <div className='inputs-row-fr-2' style={{ width: '61%' }}>
                    <div className='p-container-ifr3'>
                      <TextField
                        label='Up'
                        id='up'
                        required
                        value={this.state.search}
                        onChange={this.updateSeacrh.bind(this)}
                      />
                    </div>
                    <div className='p-container-ifr3'>
                      <TextField
                        label='Partida'
                        id='partida'
                        required
                        value={this.state.search2}
                        onChange={this.updateSeacrh2.bind(this)}
                      />
                    </div>
                    <div className='p-container-ifr3'>
                      <TextField
                        label='Rubro'
                        id='rubro'
                        required
                        value={this.state.search3}
                        onChange={this.updateSeacrh3.bind(this)}
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
                  <TableCell className='table-up-p-frn-p'>
                    <b>Importe</b>
                  </TableCell>
                  <TableCell className='table-cpa-a'>
                    <b>Cpa</b>
                  </TableCell>
                  <TableCell className='table-up-p-frn-p'>
                    <b>Estatus</b>
                  </TableCell>
                </TableRow>
              </TableHead>
              {
                this.props.listaB.map(item =>
                  <RowCompoReduccion
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
