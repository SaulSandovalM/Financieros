import React, { Component } from 'react'
import FondosDataService from './Service'
import FondosComponent from './FondosComponent'
import Table from '@material-ui/core/Table'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableBody from '@material-ui/core/TableBody'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import CurrencyFormat from 'react-currency-format'
import Button from '@material-ui/core/Button'

export default class FechaContraList extends Component {
  constructor (props) {
    super(props)
    this.refreshList = this.refreshList.bind(this)
    this.setActiveFondo = this.setActiveFondo.bind(this)
    this.onDataChange = this.onDataChange.bind(this)
    this.state = {
      fondos: [],
      currentFondos: null
    }
    this.unsubscribe = undefined
  }

  componentDidMount () {
    this.unsubscribe = FondosDataService.getAll().orderBy('fondo', 'asc').onSnapshot(this.onDataChange)
  }

  componentWillUnmount () {
    this.unsubscribe()
  }

  onDataChange (items) {
    let fondos = []
    items.forEach((item) => {
      let id = item.id
      let data = item.data()
      fondos.push({
        id: id,
        fondo: data.fondo,
        fecha: data.fecha,
        tipo_doc: data.tipo_doc,
        beneficiario: data.beneficiario,
        importe: data.importe
      })
    })

    this.setState({
      fondos: fondos
    })
  }

  refreshList () {
    this.setState({
      currentFondos: null
    })
  }

  setActiveFondo (fondo, index) {
    this.setState({
      currentFondos: fondo
    })
  }

  render () {
    const { fondos, currentFondos } = this.state

    return (
      <div>
        <TableContainer component={Paper}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Table size='small' style={{ width: '53%' }}>
              <TableHead>
                <TableRow>
                  <TableCell className='table-num-f'>
                    <b># Fondo</b>
                  </TableCell>
                  <TableCell className='table-tipo'>
                    <b>Tipo de Fondo</b>
                  </TableCell>
                  <TableCell className='table-bene'>
                    <b>Beneficiario</b>
                  </TableCell>
                  <TableCell className='table-same'>
                    <b>Importe</b>
                  </TableCell>
                  {/* <TableCell className='table-same'>
                    <b>CR</b>
                  </TableCell>
                  <TableCell className='table-same'>
                    <b>Fecha de Pago</b>
                  </TableCell>
                  <TableCell className='table-same'>
                    <b>Num. Cheque</b>
                  </TableCell> */}
                  <TableCell className='table-same'>
                    <b>Actualizar</b>
                  </TableCell>
                </TableRow>
              </TableHead>
              {fondos.map((fondo, index) => (
                <TableBody key={index}>
                  <TableCell component='th' scope='row' className='table-num-f'>
                    {fondo.fondo}
                  </TableCell>
                  <TableCell component='th' scope='row' className='table-tipo'>
                    {fondo.tipo_doc}
                  </TableCell>
                  <TableCell component='th' scope='row' className='table-bene'>
                    {fondo.beneficiario}
                  </TableCell>
                  <TableCell component='th' scope='row' className='table-same'>
                    <CurrencyFormat
                      value={fondo.importe}
                      displayType='text'
                      thousandSeparator
                      prefix=' $ '
                    />
                  </TableCell>
                  {/* <TableCell component='th' scope='row' className='table-same'>
                    {fondos.numContra}
                  </TableCell>
                  <TableCell component='th' scope='row' className='table-same'>
                    {fondos.fechaDepo}
                  </TableCell>
                  <TableCell component='th' scope='row' className='table-same'>
                    {fondos.fechaDepo}
                  </TableCell> */}
                  <TableCell component='th' scope='row' className='table-same'>
                    <Button
                      variant='contained'
                      color='primary'
                      onClick={() => this.setActiveFondo(fondo, index)}
                    >
                      Agregar
                    </Button>
                  </TableCell>
                </TableBody>
              ))}
            </Table>
            <div style={{ padding: '15px', width: '45%' }}>
              {currentFondos ? (
                <FondosComponent
                  fondo={currentFondos}
                  refreshList={this.refreshList}
                />
              ) : (
                <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '100%' }}>
                  <p style={{ textAlign: 'center' }}>Por favor selecciona el fondo... </p>
                </div>
              )}
            </div>
          </div>
        </TableContainer>
      </div>
    )
  }
}
