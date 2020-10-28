import React, { Component } from 'react'
import './Cheques.css'
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
      cheques: []
    }
  }

  componentWillMount () {
    firebase.database().ref('cheques/').on('child_added', snapshot => {
      this.setState({
        cheques: this.state.cheques.concat(snapshot.val())
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
                <TableCell className='table-c-num'><b>#</b></TableCell>
                <TableCell className='table-c-importe'><b>Beneficiario</b></TableCell>
                <TableCell className='table-c-bene'><b>Fecha de Cobro</b></TableCell>
                <TableCell className='table-c-bene'><b>Fecha de Emisión</b></TableCell>
                <TableCell className='table-c-fechae'><b>Importe</b></TableCell>
                <TableCell className='table-c-archivo'><b>Archivo</b></TableCell>
                <TableCell className='table-c-but' align='right'><b>Actualización</b></TableCell>
              </TableRow>
            </TableHead>
            {
              this.props.lista.map(item =>
                <RowComponent
                  key={item.id}
                  item={item}
                  update={this.props.update}
                />
              ).reverse()
            }
          </Table>
        </TableContainer>
      </div>
    )
  }
}
