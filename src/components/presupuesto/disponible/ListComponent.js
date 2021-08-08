import React, { Component } from 'react'
import './Disponible.css'
import RowComponent from './RowComponent'
import firebase from '../../../Firebase'
import XLSX from 'xlsx'
import TextField from '@material-ui/core/TextField'
import Table from '@material-ui/core/Table'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'

export default class ListComponent extends Component {
  constructor (props) {
    super(props)
    this.state = {
      presupuesto: [],
      search: ''
    }
    this.handleFile = this.handleFile.bind(this)
  }

  componentWillMount () {
    firebase.database().ref('presupuesto/').on('child_added', snapshot => {
      this.setState({
        presupuesto: this.state.presupuesto.concat(snapshot.val())
      })
    })
  }

  updateSeacrh (event) {
    this.setState({ search: event.target.value.substr(0, 20) })
  }

  handleFile () {
    const presupuesto = [['UP', 'RUBRO', 'PARTIDA', 'ENERO', 'FEBRERO', 'MARZO', 'ABRIL', 'MAYO', 'JUNIO', 'JULIO', 'AGOSTO', 'SEPTIEMBRE', 'OCTUBRE', 'NOVIEMBRE', 'DICIEMBRE', 'DISPONIBLE']]
    this.state.presupuesto.forEach((pres) => {
      const ene = parseInt(pres.ene)
      const feb = parseInt(pres.feb)
      const mar = parseInt(pres.mar)
      const abr = parseInt(pres.abr)
      const may = parseInt(pres.may)
      const jun = parseInt(pres.jun)
      const jul = parseInt(pres.jul)
      const ago = parseInt(pres.ago)
      const sep = parseInt(pres.sep)
      const oct = parseInt(pres.oct)
      const nov = parseInt(pres.nov)
      const dic = parseInt(pres.dic)
      const dis = ene + feb + mar + abr + may + jun + jul + ago + sep + oct + nov + dic
      const presArray = [pres.up, pres.rubro, pres.ogasto, pres.ene, pres.feb, pres.mar, pres.abr, pres.may, pres.jun, pres.jul, pres.ago, pres.sep, pres.oct, pres.nov, pres.dic, dis]
      presupuesto.push(presArray)
    })
    const wb = XLSX.utils.book_new()
    const wsAll = XLSX.utils.aoa_to_sheet(presupuesto)
    XLSX.utils.book_append_sheet(wb, wsAll, 'Presupuesto')
    XLSX.writeFile(wb, 'Disponible-Presupuesto.xlsx')
  }

  render () {
    const filterData = this.state.presupuesto.filter(
      (presupuesto) => {
        return presupuesto.up.indexOf(this.state.search) !== -1
      }
    )

    console.log(this.state.presupuesto)

    return (
      <div>
        <div className='p-container-dis'>
          <TextField
            style={{ width: '350px' }}
            label='Ingresa la Unidad Presupuestal a Buscar'
            value={this.state.search}
            onChange={this.updateSeacrh.bind(this)}
          />
          <Button
            variant='contained'
            color='primary'
            onClick={this.handleFile}
            style={{ background: '#092432' }}
          >
            EXPORTAR A EXCEL
          </Button>
        </div>
        <div>
          <TableContainer component={Paper}>
            <Table size='small'>
              <TableHead>
                <TableRow>
                  <TableCell className='table-num-dup'>
                    <b>Up</b>
                  </TableCell>
                  <TableCell className='table-num-d'>
                    <b>Rubro</b>
                  </TableCell>
                  <TableCell className='table-num-d'>
                    <b>Partida</b>
                  </TableCell>
                  <TableCell className='table-num-d'>
                    <b>Enero</b>
                  </TableCell>
                  <TableCell className='table-num-d'>
                    <b>Febrero</b>
                  </TableCell>
                  <TableCell className='table-num-d'>
                    <b>Marzo</b>
                  </TableCell>
                  <TableCell className='table-num-d'>
                    <b>Abril</b>
                  </TableCell>
                  <TableCell className='table-num-d'>
                    <b>Mayo</b>
                  </TableCell>
                  <TableCell className='table-num-d'>
                    <b>Junio</b>
                  </TableCell>
                  <TableCell className='table-num-d'>
                    <b>Julio</b>
                  </TableCell>
                  <TableCell className='table-num-d'>
                    <b>Agosto</b>
                  </TableCell>
                  <TableCell className='table-num-d'>
                    <b>Septiembre</b>
                  </TableCell>
                  <TableCell className='table-num-d'>
                    <b>Octubre</b>
                  </TableCell>
                  <TableCell className='table-num-d'>
                    <b>Noviembre</b>
                  </TableCell>
                  <TableCell className='table-num-d'>
                    <b>Diciembre</b>
                  </TableCell>
                  <TableCell className='table-num-d'>
                    <b>Disponible</b>
                  </TableCell>
                </TableRow>
              </TableHead>
              {
                filterData.map(item =>
                  <RowComponent
                    key={item.id}
                    item={item}
                  />
                )
              }
            </Table>
          </TableContainer>
        </div>
      </div>
    )
  }
}
