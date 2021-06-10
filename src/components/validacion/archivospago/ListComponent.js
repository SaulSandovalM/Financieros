import React, { Component } from 'react'
import './ArchivosPago.css'
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
      xmlPagoDirecto: []
    }
  }

  componentWillMount () {
    firebase.database().ref('xmlPagoDirecto/').on('child_added', snapshot => {
      this.setState({
        xmlPagoDirecto: this.state.xmlPagoDirecto.concat(snapshot.val())
      })
    })
  }

  render () {
    return (
      <div>
        <TableContainer component={Paper} style={{ maxWidth: '100%', height: '69vh' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell className='table-v-num'><b>XML</b></TableCell>
                <TableCell className='table-v-num'><b>PDF</b></TableCell>
              </TableRow>
            </TableHead>
            {
              this.state.xmlPagoDirecto.map(item =>
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
