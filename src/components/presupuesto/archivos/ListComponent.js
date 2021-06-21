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
import Toolbar from '@material-ui/core/Toolbar'
import Divider from '@material-ui/core/Divider'

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
        <TableContainer component={Paper} className='lolover'>
          <Toolbar style={{ background: 'white', paddingLeft: '16px' }}>
            <div style={{ fontSize: '18px', fontWeight: '600' }}>Historial</div>
          </Toolbar>
          <Divider />
          <Table size='small'>
            <TableHead>
              <TableRow>
                <TableCell className='table-arch'>
                  <div>Oficio Solicitud</div>
                </TableCell>
                <TableCell className='table-arch'>
                  <div>Oficio Autorización</div>
                </TableCell>
                <TableCell className='table-arch'>
                  <div>Excel</div>
                </TableCell>
                <TableCell className='table-arch'>
                  <div>Tipo de Movimiento</div>
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
