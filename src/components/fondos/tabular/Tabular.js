import React, { Component } from 'react'
import firebase from '../../../Firebase'
import './Tabular.css'
import Table from '@material-ui/core/Table'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import TableBody from '@material-ui/core/TableBody'
import history from '../../../history'
import CurrencyFormat from 'react-currency-format'

export default class Tabular extends Component {
  constructor() {
    super()
    this.state = {
      lista: []
    }
  }

  componentDidMount() {
    const itemsRefFondos = firebase.database().ref('fondos/').orderByChild('fecha')
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

  render() {
    return (
      <div className='cent-compro'>
        <TableContainer component={Paper}>
          <Table size='small'>
            <TableHead>
              <TableRow>
                <TableCell className='table-tab'>
                  <b>Fondos</b>
                </TableCell>
                <TableCell className='table-tab'>
                  <b>Nombre Realizo</b>
                </TableCell>
                <TableCell className='table-tab'>
                  <b>Tipo de documento</b>
                </TableCell>
                <TableCell className='table-tab'>
                  <b>Importe</b>
                </TableCell>
                <TableCell className='table-tab'>
                  <b>Tabular</b>
                </TableCell>
                <TableCell className='table-tab'>
                  <b>Tabular Individual</b>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.lista.map(fondos =>
                <TableRow>
                  <TableCell className='table-tab'>
                    <div className='click-arch'>
                      {fondos.fondo}
                    </div>
                  </TableCell>
                  <TableCell className='table-tab'>
                    <div className='click-arch'>
                      {fondos.realizo}
                    </div>
                  </TableCell>
                  <TableCell className='table-tab'>
                    <div className='click-arch'>
                      {fondos.tipo_doc}
                    </div>
                  </TableCell>
                  <TableCell className='table-tab'>
                    <CurrencyFormat
                      style={{ fontSize: '12px' }}
                      value={fondos.importe}
                      displayType='text'
                      thousandSeparator
                      prefix=' $ '
                    />
                  </TableCell>
                  <TableCell className='table-tab'>
                    <div onClick={() => history.push(`/TabularGlobal/${fondos.id}`)}>Ver</div>
                  </TableCell>
                  <TableCell className='table-tab'>
                    <div onClick={() => history.push(`/TabularIndividual/${fondos.id}`)}>Ver</div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    )
  }
}
