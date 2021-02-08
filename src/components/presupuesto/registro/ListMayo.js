import React, { Component } from 'react'
import './Registro.css'
import RowMayo from './RowMayo'
import firebase from '../../../Firebase'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'

export default class ListMayo extends Component {
  constructor (props) {
    super(props)
    this.state = {
      presupuesto: []
    }
  }

  componentWillMount () {
    firebase.database().ref('presupuesto/').on('child_added', snapshot => {
      this.setState({
        presupuesto: this.state.presupuesto.concat(snapshot.val())
      })
    })
  }

  render () {
    return (
      <div>
        <TableContainer component={Paper}>
          <Table size='small'>
            <TableHead>
              <TableRow>
                <TableCell className='table-meses-up'>
                  <b>Up</b>
                </TableCell>
                <TableCell className='table-meses-proy'>
                  <b>Proyecto</b>
                </TableCell>
                <TableCell className='table-meses-par'>
                  <b>Partida</b>
                </TableCell>
                <TableCell className='table-meses-par'>
                  <b>Rubro</b>
                </TableCell>
                <TableCell className='table-meses-con'>
                  <b>Concepto</b>
                </TableCell>
                <TableCell className='table-meses-mes'>
                  <b>Mes</b>
                </TableCell>
                <TableCell className='table-meses-asig'>
                  <b>Asignado</b>
                </TableCell>
                <TableCell className='table-meses-gas'>
                  <b>Gasto</b>
                </TableCell>
                <TableCell className='table-meses-saldo'>
                  <b>Saldo</b>
                </TableCell>
                <TableCell className='table-meses-dis'>
                  <b>Disponible</b>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {
                this.props.lista.map(item =>
                  <RowMayo
                    key={item.id}
                    item={item}
                  />
                )
              }
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    )
  }
}
