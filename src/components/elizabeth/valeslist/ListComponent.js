import React, { Component } from 'react'
import './Valeslist.css'
import RowComponent from './RowComponent'
import firebase from '../../../Firebase'
import Table from '@material-ui/core/Table'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'

export default class ListComponent extends Component {
  constructor (props) {
    super(props)
    this.state = {
      vales: [],
      autorizados: false,
      noautorizados: false,
      pendientes: false,
      auto: ''
    }
  }

  componentWillMount () {
    firebase.database().ref('vales/').on('child_added', snapshot => {
      this.setState({
        vales: this.state.vales.concat(snapshot.val())
      })
    })
  }

  toggleCheckAuto () {
    this.setState({
      autorizados: !this.state.autorizados,
      auto: 'Autorizado'
    })
  }

  toggleCheckNoAuto () {
    this.setState({
      noautorizados: !this.state.noautorizados
    })
  }

  toggleCheckPendientes () {
    this.setState({
      pendientes: !this.state.pendientes
    })
  }

  render () {
    // const filterData = this.props.lista.filter(val => {
    //   return val.concepto.indexOf(this.state.auto) !== -1
    // })
    const filterData = this.state.vales.filter(
      (vales) => {
        return vales.concepto.indexOf(this.state.auto) !== -1
      }
    )

    return (
      <div>
        <FormGroup row>
          <FormControlLabel
            control={<Checkbox checked={this.state.autorizados} onChange={this.toggleCheckAuto.bind(this)} name='autorizados' />}
            label='autorizados'
          />
          <FormControlLabel
            control={<Checkbox checked={this.state.noautorizados} onChange={this.toggleCheckNoAuto.bind(this)} name='noautorizados' />}
            label='No Autorizados'
          />
          <FormControlLabel
            control={<Checkbox checked={this.state.pendientes} onChange={this.toggleCheckPendientes.bind(this)} name='pendientes' />}
            label='Pendientes'
          />
        </FormGroup>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell className='border-icon' />
                <TableCell className='table-v-num'><b>Vales</b></TableCell>
                <TableCell className='table-v-num'><b>Cheques</b></TableCell>
                <TableCell className='table-v-num'><b>Autorizado</b></TableCell>
                <TableCell className='table-v-num'><b>Comprobado</b></TableCell>
                <TableCell className='table-v-num'><b>Rein/Reem</b></TableCell>
                <TableCell className='table-v-num'><b>Concepto</b></TableCell>
                <TableCell className='table-v-num'><b>Oficio S</b></TableCell>
                <TableCell className='table-v-num'><b>Área</b></TableCell>
                <TableCell className='table-v-num'><b>Turno</b></TableCell>
                <TableCell className='table-v-num'><b>Facturas</b></TableCell>
                <TableCell className='table-v-num'><b>Recibos</b></TableCell>
                <TableCell className='table-v-num'><b>S/C</b></TableCell>
                <TableCell className='table-v-num'><b>Fecha</b></TableCell>
                <TableCell className='table-v-num'><b>Autorizo</b></TableCell>
                <TableCell className='table-v-num'><b>Estatus</b></TableCell>
                <TableCell className='table-v-num'><b>Comprobantes</b></TableCell>
              </TableRow>
            </TableHead>
            {
              filterData.map(item =>
                <RowComponent
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
