import React, { Component } from 'react'
import firebase from '../../../../Firebase'
import './pdfs.css'
import { Link } from 'react-router-dom'
import Table from '@material-ui/core/Table'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import TableBody from '@material-ui/core/TableBody'

export default class TabularList extends Component {
  constructor() {
    super()
    this.ref = firebase.firestore().collection('fondos')
    this.unsubscribe = null
    this.state = {
      fondos: []
    }
  }

  onCollectionUpdate = (querySnapshot) => {
    const fondos = []
    querySnapshot.forEach((doc) => {
      const { fondo, fecha, tipo_doc, oficio_aut, no_oficio, no_aut, no_lici, importe, desc, importe_l, beneficiario, realizo } = doc.data()
      fondos.push({
        key: doc.id,
        doc, // DocumentSnapshot
        fondo,
        fecha,
        tipo_doc,
        oficio_aut,
        no_oficio,
        no_aut,
        no_lici,
        importe,
        desc,
        importe_l,
        beneficiario,
        realizo,
      })
    })
    this.setState({
      fondos
   })
  }

  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate)
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
              {this.state.fondos.map(fondos =>
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
                    $ {fondos.importe}
                  </TableCell>
                  <TableCell className='table-tab'>
                    <Link to={`/Tabular/${fondos.key}`}>Ver</Link>
                  </TableCell>
                  <TableCell className='table-tab'>
                    <Link to={`/TabularIndi/${fondos.key}`}>Ver</Link>
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
