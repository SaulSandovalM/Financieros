import React, { Component } from 'react'
import './Archivos.css'
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
    firebase.database().ref('archivos-presupuesto/').on('child_added', snapshot => {
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
                <TableCell className='table-arch'>
                  <b>Oficio Solicitud</b>
                </TableCell>
                <TableCell className='table-arch'>
                  <b>Oficio Autorización</b>
                </TableCell>
                <TableCell className='table-arch'>
                  <b>Excel</b>
                </TableCell>
                <TableCell className='table-arch'>
                  <b>Tipo de Movimiento</b>
                </TableCell>
              </TableRow>
            </TableHead>
            {
              this.props.lista.map(item =>
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
