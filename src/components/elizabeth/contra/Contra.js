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

export default class Contra2 extends Component {
  constructor(props) {
    super(props)
    this.ref = firebase.firestore().collection('fondos').orderBy('fondo', 'desc')
    this.unsubscribe = null
    this.state = {
      fondos: []
    }
  }

  onCollectionUpdate = (querySnapshot) => {
    const fondos = []
    querySnapshot.forEach((doc) => {
      const { fondo, tipo_doc, importe, beneficiario, fechaContra, numContra, fechaDepo, numCheque } = doc.data()
      fondos.push({
        key: doc.id,
        doc,
        fondo,
        tipo_doc,
        importe,
        beneficiario,
        fechaContra,
        numContra,
        fechaDepo,
        numCheque
      })
    })
    this.setState({
      fondos
   })
  }

  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate)
  }

  render () {
    const filterData = this.state.fondos.filter(
      (fondos) => {
        return fondos.tipo_doc.indexOf('Fondo Revolvente') !== -1
      }
    )

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
                  <b>CR</b>
                </TableCell>
                <TableCell className='table-same'>
                  <b>Fecha de Pago</b>
                </TableCell>
                <TableCell className='table-same'>
                  <b>Num. Cheque</b>
                </TableCell>
                <TableCell className='table-same'>
                  <b>Estatus</b>
                </TableCell>
              </TableRow>
            </TableHead>
            {filterData.map(fondos =>
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
                  {fondos.fechaDepo}
                </TableCell>
                <TableCell component='th' scope='row' className='table-same'>
                  {fondos.fechaContra &&
                    <p style={{ margin: '0' }}>
                      Contrarecibo Agregado
                    </p>
                  }
                </TableCell>
              </TableBody>
            )}
          </Table>
        </TableContainer>
      </div>
    )
  }
}
