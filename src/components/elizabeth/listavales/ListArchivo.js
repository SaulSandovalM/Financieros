import React, { Component } from 'react'
import './ListVales.css'
import RowArchivo from './RowArchivo'
import firebase from '../../../Firebase'
import Table from '@material-ui/core/Table'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'

export default class ListArchivo extends Component {
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
                <TableCell className='table-v-num'><b>Vales</b></TableCell>
                <TableCell className='table-v-num'><b>Cheques</b></TableCell>
                <TableCell className='table-v-num'><b>Autorizado</b></TableCell>
                <TableCell className='table-v-num'><b>Comprobado</b></TableCell>
                <TableCell className='table-v-num'><b>Rein/Rem</b></TableCell>
                <TableCell className='table-v-num'><b>Concepto</b></TableCell>
                <TableCell className='table-v-num'><b>OS</b></TableCell>
                <TableCell className='table-v-num'><b>Área</b></TableCell>
                <TableCell className='table-v-num'><b>Turno</b></TableCell>
                <TableCell className='table-v-num'><b>S/C</b></TableCell>
                <TableCell className='table-v-num'><b>Fecha</b></TableCell>
                <TableCell className='table-v-num'><b>Recibo</b></TableCell>
                <TableCell className='table-v-num'><b>Estatus</b></TableCell>
                <TableCell className='table-v-num'><b>Comprobantes</b></TableCell>
              </TableRow>
            </TableHead>
            {
              this.props.lista.map(item =>
                <RowArchivo
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
