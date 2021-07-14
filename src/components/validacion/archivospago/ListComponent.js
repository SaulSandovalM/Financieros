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

  removeValidacion = (id, item) => {
    const objRef = firebase.database().ref('xmlPagoDirecto')
    objRef.on('value', (snap) => {
      var borrarObj = []
      snap.forEach((child) => {
        borrarObj.push({
          NumFacturas: child.val().NumFacturas,
          Fondo: child.val().Fondo,
          FechaI: child.val().FechaI,
          Contrarecibo: child.val().Contrarecibo,
          FechaP: child.val().FechaP,
          Devolucion: child.val().Devolucion,
          Total: child.val().Total,
          TipoPerona: child.val().TipoPersona,
          NumContra: child.val().numContra,
          Adquisicion: child.val().Adquisicion,
          Xml: child.val().Xml,
          xmlC: child.val().xmlC,
          filefactura: child.val().filefactura,
          realizo: child.val().realizo,
          folio: child.val().folio,
          id: child.key
        })
      })
    })
    firebase.database().ref(`xmlPagoDirecto/${item}/Xml/${id}`).remove()
    alert('Se ha borrado la factura')
  }

  render () {
    return (
      <div>
        <TableContainer component={Paper} style={{ maxWidth: '100%', height: '60vh' }}>
          <Table>
            <TableHead>
              <TableRow style={{ display: 'flex', flexDirection: 'row', top: '0', background: 'white' }}>
                <TableCell className='border-icon' style={{ width: '30px' }} />
                <TableCell className='table-validacion'><b>Facturas</b></TableCell>
                <TableCell className='table-validacion'><b>Fondo</b></TableCell>
                <TableCell className='table-validacion'><b>Fecha Ingreso</b></TableCell>
                <TableCell className='table-validacion'><b>Contrarecibo</b></TableCell>
                <TableCell className='table-validacion'><b>Fecha Pago</b></TableCell>
                <TableCell className='table-validacion'><b>Devolución</b></TableCell>
                <TableCell className='table-validacion'><b>Total</b></TableCell>
                <TableCell className='table-validacion'><b>Agregar Contrarecibo</b></TableCell>
              </TableRow>
            </TableHead>
            {this.props.listaValidacion !== undefined ?
              this.props.listaValidacion.map(item =>
                <RowComponent
                  key={item.id}
                  item={item}
                  removeValidacion={this.removeValidacion}
                />
              ) : ''}
          </Table>
        </TableContainer>
      </div>
    )
  }
}
