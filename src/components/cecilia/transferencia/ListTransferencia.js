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

export default class ListComponent extends Component {
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
              <RowComponent
                key={item.id}
                item={item}
              />
            )
          }
        </Table>
      </TableContainer>
    )
  }
}
