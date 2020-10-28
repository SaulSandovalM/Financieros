import React, { Component } from 'react'
import './ListVales.css'
import RowN from './RowN'
import firebase from '../../../Firebase'
import Table from '@material-ui/core/Table'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'

export default class ListN extends Component {
  constructor (props) {
    super(props)
    this.state = {
      vales: []
    }
  }

  componentWillMount () {
    firebase.database().ref('vales/').on('child_added', snapshot => {
      this.setState({
        vales: this.state.vales.concat(snapshot.val())
      })
    })
  }

  render () {
    return (
      <div>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell className='table-v-num2'>
                  <b>Vale</b>
                </TableCell>
                <TableCell className='table-v-num2'>
                  <b>Cheque</b>
                </TableCell>
                <TableCell className='table-v-num'><b>Autorizado</b></TableCell>
                <TableCell className='table-v-num'><b>Comprovado</b></TableCell>
                <TableCell className='table-v-num'><b>Reintegro</b></TableCell>
                <TableCell className='table-v-num'><b>Concepto</b></TableCell>
                <TableCell className='table-v-num'><b>OS</b></TableCell>
                <TableCell className='table-v-num'><b>Area</b></TableCell>
                <TableCell className='table-v-num'><b>Turno</b></TableCell>
                <TableCell className='table-v-num'><b>Facturas</b></TableCell>
                <TableCell className='table-v-num'><b>Recibos</b></TableCell>
                <TableCell className='table-v-num'><b>S/C</b></TableCell>
                <TableCell className='table-v-num'><b>Fecha</b></TableCell>
                <TableCell className='table-v-num'><b>Recibio</b></TableCell>
                <TableCell className='table-v-num'><b>Autorizar</b></TableCell>
              </TableRow>
            </TableHead>
            {
              this.props.lista.map(item =>
                <RowN
                  key={item.id}
                  item={item}
                  update={this.props.update}
                />
              )
            }
          </Table>
        </TableContainer>
      </div>
    )
  }
}
