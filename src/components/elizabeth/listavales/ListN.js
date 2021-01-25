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
import XLSX from 'xlsx'

export default class ListN extends Component {
  constructor (props) {
    super(props)
    this.state = {
      vales: []
    }
    this.handleExcel = this.handleExcel.bind(this)
  }

  componentWillMount () {
    firebase.database().ref('vales/').on('child_added', snapshot => {
      this.setState({
        vales: this.state.vales.concat(snapshot.val())
      })
    })
  }

  handleExcel () {
    const vales = [['#V', '#C', 'AUTORIZADO', 'COMPOBADO', 'REEM/REIN', 'CONCEPTO',
      'OFICIO S', 'AREA', 'TURNO', 'FACTURA', 'RECIBOS', 'S/C', 'FECHA', 'RECIBIO']]
    this.state.vales.forEach((vale) => {
      const valeArray = [vale.vale, vale.cheque, vale.cantidad, vale.cantidadc,
        vale.cantidadr, vale.concepto, vale.oficioS, vale.area,
        vale.turno, vale.factura, vale.recibos, vale.sc, vale.fecha,
        vale.personaR]
      vales.push(valeArray)
    })
    const wb = XLSX.utils.book_new()
    const wsAll = XLSX.utils.aoa_to_sheet(vales)
    XLSX.utils.book_append_sheet(wb, wsAll, 'Vales')
    XLSX.writeFile(wb, 'Vales_No_Autorizados.xlsx')
  }

  render () {
    return (
      <div>
        <div className='but-exc'>
          <button className='input-sc boton-g' onClick={this.handleExcel}>
            Exportar a Excel
          </button>
        </div>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell className='table-v-num2'><b>Vale</b></TableCell>
                <TableCell className='table-v-num2'><b>Cheque</b></TableCell>
                <TableCell className='table-v-num'><b>Autorizado</b></TableCell>
                <TableCell className='table-v-num'><b>Comprobado</b></TableCell>
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
