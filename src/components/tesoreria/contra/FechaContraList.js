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
import TextField from '@material-ui/core/TextField'

export default class FechaContraList extends Component {
  constructor (props) {
    super(props)
    this.refreshList = this.refreshList.bind(this)
    this.setActiveFondo = this.setActiveFondo.bind(this)
    this.onDataChange = this.onDataChange.bind(this)
    this.state = {
      fondos: [],
      currentFondos: null,
      currentIndex: -1,
      search: ''
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
        numfondo: data.numfondo,
        fecha: data.fecha,
        tipo_doc: data.tipo_doc,
        oficio_aut: data.oficio_aut,
        no_oficio: data.no_oficio,
        importe: data.importe,
        beneficiario: data.beneficiario,
        desc: data.desc,
        no_proyecto: data.no_proyecto,
        realizo: data.realizo,
        numCheque: data.numCheque
      })
    })
    this.setState({
      fondos: fondos
    })
  }

  refreshList () {
    this.setState({
      currentFondos: null,
      currentIndex: -1
    })
  }

  setActiveFondo (fondo, index) {
    this.setState({
      currentFondos: fondo,
      currentIndex: index
    })
  }

  updateSearch (event) {
    this.setState({ search: event.target.value.substr(0, 20) })
  }

  render () {
    const { fondos, currentFondos, currentIndex } = this.state
    const filterData = fondos.filter(
      (fondos) => {
        return fondos.numfondo.indexOf(this.state.search) !== -1
      }
    )

    return (
      <TableContainer component={Paper}>
        <TextField
          style={{ width: '250px', margin: '15px' }}
          label='Ingresa un numero de fondo'
          value={this.state.search}
          onChange={this.updateSearch.bind(this)}
        />
        <div className='div-hide'>
          <Table size='small' className='wt'>
            <TableHead>
              <TableRow>
                <TableCell className='table-num-fc'>
                  <b># Fondo</b>
                </TableCell>
                <TableCell className='table-tipo-c'>
                  <b>Tipo de Fondo</b>
                </TableCell>
                <TableCell className='table-bene-c'>
                  <b>Beneficiario</b>
                </TableCell>
                <TableCell className='table-importe-c'>
                  <b>Importe</b>
                </TableCell>
              </TableRow>
            </TableHead>
            {filterData.map((fondo, index) => (
              <TableBody
                key={index}
                onClick={() => this.setActiveFondo(fondo, index)}
                className={'tocuh-style' + (index === currentIndex ? 'active' : '')}
              >
                <TableCell component='th' scope='row' className='table-num-fc'>
                  {fondo.fondo}
                </TableCell>
                <TableCell component='th' scope='row' className='table-tipo-c'>
                  {fondo.tipo_doc}
                </TableCell>
                <TableCell component='th' scope='row' className='table-bene-c'>
                  {fondo.beneficiario}
                </TableCell>
                <TableCell component='th' scope='row' className='table-importe-c'>
                  <CurrencyFormat
                    value={fondo.importe}
                    displayType='text'
                    thousandSeparator
                    prefix=' $ '
                  />
                </TableCell>
              </TableBody>
            ))}
          </Table>
          <div className='div-con-compo'>
            {currentFondos ? (
              <FondosComponent
                fondo={currentFondos}
                refreshList={this.refreshList}
              />
            ) : (
              <div className='div-mesage'>
                <p className='tc'>Por favor selecciona el fondo... </p>
              </div>
            )}
          </div>
        </div>
      </TableContainer>
    )
  }
}
