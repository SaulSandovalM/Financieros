import React, { Component } from 'react'
import './Transferencia.css'
import RowComponent from './RowComponent'
import firebase from '../../../Firebase'
import Table from '@material-ui/core/Table'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import TableBody from '@material-ui/core/TableBody'
import IconButton from '@material-ui/core/IconButton'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp'
import Box from '@material-ui/core/Box'
import Collapse from '@material-ui/core/Collapse'
import Typography from '@material-ui/core/Typography'
import CurrencyFormat from 'react-currency-format'
import DeleteIcon from '@material-ui/icons/Delete'

export default class ListComponent extends Component {
  constructor (props) {
    super(props)
    this.state = {
      presupuesto: [],
      search: '',
      open: false
    }
  }

  componentWillMount () {
    firebase.database().ref('presupuesto/').orderByChild('up').on('child_added', snapshot => {
      this.setState({
        presupuesto: this.state.presupuesto.concat(snapshot.val())
      })
    })
  }

  updateSeacrh (event) {
    this.setState({ search: event.target.value.substr(0, 20) })
  }

  toggleOpen () {
    this.setState({
      open: !this.state.open
    })
  }

  render () {
    var filterData = this.props.listaB.filter(
      (item) => {
        return (item.oficio ? item.oficio.indexOf(this.state.search) !== -1 : null)
      }
    )

    var array = [
      {up: '1'},
      {up: '2'},
      {up: '3'}
    ]

    return (
      <div>
        <TableContainer component={Paper}>
          <div>
            <TextField
              style={{ width: '450px', margin: '10px' }}
              label='Ingresa el oficio a buscar'
              value={this.state.search}
              onChange={this.updateSeacrh.bind(this)}
            />
          </div>
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
                  <b>Saldo</b>
                </TableCell>
                <TableCell className='table-up-p-frn-p'>
                  <b>Ampliación</b>
                </TableCell>
                <TableCell className='table-up-p-frn-p'>
                  <b>Reducción</b>
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
              </TableRow>
            </TableHead>
            {
              filterData.map(item =>
                <RowComponent
                  key={item.id}
                  item={item}
                />
              )
            }
          </Table>
        </TableContainer>
      </div>
    )
  }
}
