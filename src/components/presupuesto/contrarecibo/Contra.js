import React, { Component } from 'react'
import './Contra.css'
import firebase from '../../../Firebase'
import CurrencyFormat from 'react-currency-format'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import { Link } from 'react-router-dom'

export default class Contra extends Component {
  constructor (props) {
    super(props)
    this.state = {
      lista: []
    }
  }

  componentDidMount() {
    const itemsRefFondos = firebase.database().ref('fondos/').orderByChild('fondo')
    this.listenFondos(itemsRefFondos)
  }

  listenFondos = (itemsRefFondos) => {
    itemsRefFondos.on('value', (snap) => {
      var lista = []
      snap.forEach((child) => {
        lista.push({
          fondo: child.val().fondo,
          tipo_doc: child.val().tipo_doc,
          no_lici: child.val().no_lici,
          importe: child.val().importe,
          beneficiario: child.val().beneficiario,
          realizo: child.val().realizo,
          numCheque: child.val().numCheque,
          fechaContra: child.val().fechaContra,
          fechaDepo: child.val().fechaDepo,
          numContra: child.val().numContra,
          id: child.key
        })
      })
      this.setState({
        lista: lista
      })
    })
  }

  render () {
    return (
      <div className='contrarecibo-container'>
        <TableContainer component={Paper}>
          <Table size='small'>
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
                <TableCell className='table-same'>
                  <b>Contrarecibo</b>
                </TableCell>
                <TableCell className='table-same'>
                  <b>Fecha de Deposito</b>
                </TableCell>
                <TableCell className='table-same'>
                  <b># Cheque</b>
                </TableCell>
                <TableCell className='table-same'>
                  <b>Estatus</b>
                </TableCell>
                <TableCell className='table-same'>
                  <b>Agregar Contrarecibo</b>
                </TableCell>
              </TableRow>
            </TableHead>
            {this.state.lista.map(fondos =>
              <TableBody>
                <TableCell component='th' scope='row' className='table-num-f'>
                  {fondos.fondo}
                </TableCell>
                <TableCell component='th' scope='row' className='table-tipo'>
                  {fondos.tipo_doc}
                </TableCell>
                <TableCell component='th' scope='row' className='table-bene'>
                  {fondos.beneficiario}
                </TableCell>
                <TableCell component='th' scope='row' className='table-same'>
                  <CurrencyFormat
                    value={fondos.importe}
                    displayType='text'
                    thousandSeparator
                    prefix=' $ '
                  />
                </TableCell>
                <TableCell component='th' scope='row' className='table-same'>
                  {fondos.numContra}
                </TableCell>
                <TableCell component='th' scope='row' className='table-same'>
                  {fondos.fechaDepo}
                </TableCell>
                <TableCell component='th' scope='row' className='table-same'>
                  {fondos.numCheque}
                </TableCell>
                <TableCell component='th' scope='row' className='table-same'>
                  {fondos.fechaContra !== ' ' &&
                    <p style={{margin: '0'}}>
                      Contrarecibo Agregado
                    </p>
                  }
                </TableCell>
                <TableCell component='th' scope='row' className='table-same'>
                  <Link className='link-edit' to={`/Editcontra/${fondos.id}`}>
                    Agregar Contrarecibo
                  </Link>
                </TableCell>
              </TableBody>
            )}
          </Table>
        </TableContainer>
      </div>
    )
  }
}
