import React, { Component } from 'react'
import './Contra.css'
import Table from '@material-ui/core/Table'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableBody from '@material-ui/core/TableBody'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import CurrencyFormat from 'react-currency-format'
import TextField from '@material-ui/core/TextField'
import firebase from '../../../Firebase'
import Button from '@material-ui/core/Button'
import XLSX from 'xlsx'

export default class Contra2 extends Component {
  constructor (props) {
    super(props)
    this.state = {
      lista: [],
      search: '',
      numCheque: '',
      fechaContra: ''
    }
    this.handleExcel = this.handleExcel.bind(this)
  }

  handleExcel () {
    const fondos = [[ 'Fondo', 'Fecha', 'Tipo de Documento', 'Oficio de Autorizacion',
      'Numero de Oficio', 'Numero de Licitacion', 'Importe', 'Descripcion',
      'Beneficiario', 'Realizo', 'Requisicion', 'Pedido', 'Numero de Proyecto',
      'Poliza', 'CFE', 'Numero de Servicio de CFE', 'Observaciones', 'Numero de Contrarecibo',
      'Comprometidos', 'Numero de Cheque', 'Fecha de Contrarecibo']]
    this.state.lista.forEach((fondo) => {
      const fondoArray = [fondo.fondo, fondo.fecha, fondo.tipo_doc, fondo.oficio_aut,
        fondo.no_oficio, fondo.no_lici, fondo.importe, fondo.desc,fondo.beneficiario,
        fondo.realizo, fondo.requisicion, fondo.pedido, fondo.no_proyecto,
        fondo.poliza, fondo.cfe, fondo.nscfe, fondo.observaciones, fondo.numCompro,
        fondo.comprometido, fondo.numCheque, fondo.fechaContra]
      fondos.push(fondoArray)
    })
    const wb = XLSX.utils.book_new()
    const wsAll = XLSX.utils.aoa_to_sheet(fondos)
    XLSX.utils.book_append_sheet(wb, wsAll, 'Fondos')
    XLSX.writeFile(wb, 'Lista_Fondos.xlsx')
  }

  componentDidMount () {
    const itemsRefFondos = firebase.database().ref('fondos/').orderByChild('fondo')
    this.listenFondos(itemsRefFondos)
  }

  listenFondos = (itemsRefFondos) => {
    itemsRefFondos.on('value', (snap) => {
      var lista = []
      snap.forEach((child) => {
        lista.push({
          fondo: child.val().fondo,
          fecha: child.val().fecha,
          tipo_doc: child.val().tipo_doc,
          oficio_aut: child.val().oficio_aut,
          no_oficio: child.val().no_oficio,
          no_lici: child.val().no_lici,
          importe: child.val().importe,
          desc: child.val().desc,
          beneficiario: child.val().beneficiario,
          realizo: child.val().realizo,
          requisicion: child.val().requisicion,
          pedido: child.val().pedido,
          no_proyecto: child.val().no_proyecto,
          poliza: child.val().poliza,
          cfe: child.val().cfe,
          nscfe: child.val().nscfe,
          observaciones: child.val().observaciones,
          numCompro: child.val().numCompro,
          comprometido: child.val().comprometido,
          numCheque: child.val().numCheque,
          fechaContra: child.val().fechaContra,
          fechaDepo: child.val().fechaDepo,
          id: child.key
        })
      })
      this.setState({
        lista: lista
      })
    })
  }

  update = (item) => {
    let updates = {}
    updates['fondos/' + item.id] = {
      fondo: item.fondo,
      fecha: item.fecha,
      tipo_doc: item.tipo_doc,
      oficio_aut: item.oficio_aut,
      no_oficio: item.no_oficio,
      no_lici: item.no_lici,
      importe: item.importe,
      desc: item.desc,
      beneficiario: item.beneficiario,
      realizo: item.realizo,
      requisicion: item.requisicion,
      pedido: item.pedido,
      no_proyecto: item.no_proyecto,
      poliza: item.poliza,
      cfe: item.cfe,
      nscfe: item.nscfe,
      observaciones: item.observaciones,
      numCompro: item.numCompro,
      comprometido: item.comprometido,
      numCheque: this.state.numCheque,
      fechaContra: item.fechaContra,
      fechaDepo: this.state.fechaDepo
    }
    this.setState({
      numCheque: '',
      fechaContra: ''
    })
    firebase.database().ref().update(updates)
    alert('Tu solicitud fue enviada.')
  }

  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value
    this.setState(state)
  }

  render () {
    const filterData = this.state.lista.filter(
      (fondos) => {
        return fondos.fondo.indexOf(this.state.search) !== -1
      }
    )

    return (
      <div className='contrar-container'>
        <TableContainer component={Paper}>
          <div style={{ display: 'flex', width: '100%' }}>
            <TextField
              name='search'
              style={{ width: '250px', margin: '15px' }}
              label='Ingresa un numero de fondo'
              value={this.state.search}
              onChange={this.onChange.bind(this)}
            />
            <TextField
              name='numCheque'
              style={{ width: '250px', margin: '15px' }}
              label='Numero de Cheque'
              value={this.state.numCheque}
              onChange={this.onChange.bind(this)}
            />
            <TextField
              type='date'
              name='fechaDepo'
              style={{ width: '250px', margin: '15px' }}
              label='Fecha de Deposito'
              value={this.state.fechaDepo}
              onChange={this.onChange.bind(this)}
              InputLabelProps={{
                shrink: true
              }}
            />
            <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', width: '60px' }}>
              <Button
                variant='contained'
                style={{ background: 'green', color: 'white' }}
                onClick={this.handleExcel}
              >
                Excel
              </Button>
            </div>
          </div>
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
                    <b>Fecha de Deposito</b>
                  </TableCell>
                  <TableCell className='table-importe-c'>
                    <b>Fecha de Autorizacion</b>
                  </TableCell>
                  <TableCell className='table-importe-c'>
                    <b>Numero de Cheque</b>
                  </TableCell>
                  <TableCell className='table-importe-c'>
                    <b>Realizo</b>
                  </TableCell>
                  <TableCell component='th' scope='row' className='table-importe-c'>
                    <b>Importe</b>
                  </TableCell>
                  <TableCell component='th' scope='row' className='table-importe-c'>
                    <b>Estatus</b>
                  </TableCell>
                </TableRow>
              </TableHead>
              {filterData.map(item => (
                item.tipo_doc === 'Fondo Revolvente' ?
                  <TableBody>
                    <TableCell component='th' scope='row' className='table-num-fc'>
                      {item.fondo}
                    </TableCell>
                    <TableCell component='th' scope='row' className='table-tipo-c'>
                      {item.tipo_doc}
                    </TableCell>
                    <TableCell component='th' scope='row' className='table-bene-c'>
                      {item.beneficiario}
                    </TableCell>
                    <TableCell component='th' scope='row' className='table-num-fc'>
                      {item.fechaDepo}
                    </TableCell>
                    <TableCell component='th' scope='row' className='table-num-fc'>
                      {item.fechaContra}
                    </TableCell>
                    <TableCell component='th' scope='row' className='table-num-fc'>
                      {item.numCheque}
                    </TableCell>
                    <TableCell component='th' scope='row' className='table-num-fc'>
                      {item.realizo}
                    </TableCell>
                    <TableCell component='th' scope='row' className='table-importe-c'>
                      <CurrencyFormat
                        value={item.importe}
                        displayType='text'
                        thousandSeparator
                        prefix=' $ '
                      />
                    </TableCell>
                    <TableCell component='th' scope='row' className='table-num-fc'>
                      <Button
                        type='submit'
                        color='primary'
                        variant='contained'
                        onClick={() => this.update(item)}
                      >
                        Asignar Cheque
                      </Button>
                    </TableCell>
                  </TableBody> : null
              ))}
            </Table>
          </div>
        </TableContainer>
      </div>
    )
  }
}
