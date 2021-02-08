import React, { Component } from 'react'
import './Saldos.css'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'

export default class Saldos extends Component {
  render () {
    return (
      <div className='saldo-container'>
        <div className='table-content'>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell className='table-data-sd'>N.C</TableCell>
                  <TableCell className='table-data-sd'>N.C.P</TableCell>
                  <TableCell className='table-data-sd'>F.E.C</TableCell>
                  <TableCell className='table-data-sd'>C.P.P.P</TableCell>
                  <TableCell className='table-data-sd'>T.B</TableCell>
                  <TableCell className='table-data-sd'>N.B</TableCell>
                  <TableCell className='table-data-sd'>T.R</TableCell>
                  <TableCell className='table-data-sd'>T.P</TableCell>
                  <TableCell className='table-data-sd'>N.P.F.M</TableCell>
                  <TableCell className='table-data-sd'>RFC</TableCell>
                  <TableCell className='table-data-sd'>CFDI</TableCell>
                  <TableCell className='table-data-sd'>UUID</TableCell>
                  <TableCell className='table-data-sd'>I.I</TableCell>
                  <TableCell className='table-data-sd'>T.P</TableCell>
                  <TableCell className='table-data-sd'>N.T</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell className='table-data-s'>abc</TableCell>
                  <TableCell className='table-data-s'>abc</TableCell>
                  <TableCell className='table-data-s'>abc</TableCell>
                  <TableCell className='table-data-s'>abc</TableCell>
                  <TableCell className='table-data-s'>abc</TableCell>
                  <TableCell className='table-data-s'>abc</TableCell>
                  <TableCell className='table-data-s'>abc</TableCell>
                  <TableCell className='table-data-s'>abc</TableCell>
                  <TableCell className='table-data-s'>abc</TableCell>
                  <TableCell className='table-data-s'>abc</TableCell>
                  <TableCell className='table-data-s'>abc</TableCell>
                  <TableCell className='table-data-s'>abc</TableCell>
                  <TableCell className='table-data-s'>abc</TableCell>
                  <TableCell className='table-data-s'>abc</TableCell>
                  <TableCell className='table-data-s'>abc</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    )
  }
}
