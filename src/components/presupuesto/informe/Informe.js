import React, { Component } from 'react'
import firebase from '../../../Firebase'
import Table from '@material-ui/core/Table'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import TableBody from '@material-ui/core/TableBody'
import XLSX from 'xlsx'

export default class Informe extends Component {
  constructor () {
    super()
    this.state = {
      fondos: []
    }
    this.handleFile = this.handleFile.bind(this)
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
          no_lici: child.val().no_lici,
          importe: child.val().importe,
          beneficiario: child.val().beneficiario,
          realizo: child.val().realizo,
          numCheque: child.val().numCheque,
          fechaContra: child.val().fechaContra,
          fechaDepo: child.val().fechaDepo,
          numContra: child.val().numContra,
          cuentaPagar: child.val().cuentaPagar,
          cuentaPagarPara: child.val().cuentaPagarPara,
          comprometido: child.val().comprometido,
          sujetoContable: child.val().sujetoContable,
          id: child.key
        })
      })
      this.setState({
        fondos: lista
      })
    })
  }

  handleFile () {
    const formato = [[
      'MES', 'AÑO', 'FONDO', 'TIPO DE PAGO', 'NUM. CONTRARECIBO', 'NUM CUENTA POR PAGAR',
      'FECHA DE CONTRARECIBO', 'NUMERO DE SUJETO CONTABLE', 'CUENTA POR PAGAR PARA',
      'RM', 'UR', 'UP', 'RUBRO', 'OGASTO', 'PROG', 'PROY', 'OBRA', 'TIPO BENEFICIARIO',
      'BENEFICIARIO', 'TOTAL RECURSO', 'TIPO PROVEEDOR', 'NOMBRE DE PERSONA', 'RFC',
      'FECHA DE CFDI', 'FOLIO', 'IMPORTE DE CFDI'
    ]]
    this.state.fondos.forEach((pres) => {
      const Mes = ' '
      const Año = 2021
      const Fondo = pres.fondo
      const TipodePago = pres.tipo_doc
      const NumContrarecibo = pres.numContra
      const NumCuentaporpagar = pres.cuentaPagar
      const FechadeContrarecibo = pres.fechaContra
      const NumdeSujetoContable = pres.sujetoContable
      const Cuentaporpagarpara = pres.cuentaPagarPara
      const Rm = [pres.comprometido.map(item => item['ramo'])]
      const Ur = [pres.comprometido.map(item => item['ur'])]
      const Up = [pres.comprometido.map(item => item['up'])]
      const Rubro = [pres.comprometido.map(item => item['rubro'])]
      const Ogasto = [pres.comprometido.map(item => item['partida'])]
      const Prog = [pres.comprometido.map(item => item['prog'])]
      const Proy = [pres.comprometido.map(item => item['proy'])]
      const Obra = [pres.comprometido.map(item => item['obra'])]
      // const TipodeBeneficiario = 'F/M'
      // const Beneficiario =
      // const TotalRecurso =
      // const TipodeProveedor = 'F/M'
      // const NombredelaPersona =
      // const RFC =
      // const FechadeCFDI =
      // const Folio =
      // const ImportedeCFDI =
      const presArray = [
        Mes, Año, Fondo, TipodePago, NumContrarecibo, NumCuentaporpagar,
        FechadeContrarecibo, NumdeSujetoContable, Cuentaporpagarpara, Rm,
        Ur, Up, Rubro, Ogasto, Prog, Proy, Obra
      ]
      formato.push(presArray)
    })
    const wb = XLSX.utils.book_new()
    const wsAll = XLSX.utils.aoa_to_sheet(formato)
    XLSX.utils.book_append_sheet(wb, wsAll, 'Presupuesto')
    XLSX.writeFile(wb, 'Formato.xlsx')
  }

  render () {
    console.log(
      this.state.fondos.map(fondos =>
        fondos.comprometido.map(item =>
          item['comprobantes'] !== undefined ?
            item['comprobantes'].map(data => data.folio)
            : null
        )
      )
    )

    return (
      <div style={{ marginTop: '80px', maxWidth: '100%' }}>
        <button
          variant='contained'
          color='primary'
          onClick={this.handleFile}
          style={{ background: '#092432' }}
        >
          EXPORTAR A EXCEL
        </button>
        <TableContainer component={Paper} style={{ maxWidth: '100%', height: '90vh' }}>
          <Table>
            <TableHead>
              <TableRow style={{ display: 'flex', flexDirection: 'row', top: '0', background: 'white', zIndex: '3', position: 'sticky' }}>
                <TableCell style={{ width: '100px' }}>Mes</TableCell>
                <TableCell style={{ width: '80px' }}>Año</TableCell>
                <TableCell style={{ width: '80px' }}>Fondo</TableCell>
                <TableCell style={{ width: '150px' }}>Tipo de Pago</TableCell>
                <TableCell style={{ width: '150px' }}>Num. Contrarecibo</TableCell>
                <TableCell style={{ width: '150px' }}>Num. Cuenta por pagar</TableCell>
                <TableCell style={{ width: '300px' }}>Fecha de Contrarecibo</TableCell>
                <TableCell style={{ width: '300px' }}>Num. de Sujeto Contable</TableCell>
                <TableCell style={{ width: '300px' }}>Cuenta por pagar para</TableCell>
                <TableCell style={{ width: '100px' }}>Rm</TableCell>
                <TableCell style={{ width: '100px' }}>Ur</TableCell>
                <TableCell style={{ width: '100px' }}>Up</TableCell>
                <TableCell style={{ width: '100px' }}>Rubro</TableCell>
                <TableCell style={{ width: '100px' }}>Ogasto</TableCell>
                <TableCell style={{ width: '100px' }}>Prog</TableCell>
                <TableCell style={{ width: '100px' }}>Proy</TableCell>
                <TableCell style={{ width: '100px' }}>Obra</TableCell>
                <TableCell style={{ width: '150px' }}>Tipo de Beneficiario</TableCell>
                <TableCell style={{ width: '300px' }}>Beneficiario</TableCell>
                <TableCell style={{ width: '300px' }}>Total Recurso</TableCell>
                <TableCell style={{ width: '150px' }}>Tipo de Proveedor</TableCell>
                <TableCell style={{ width: '300px' }}>Nombre de la Persona</TableCell>
                <TableCell style={{ width: '150px' }}>RFC</TableCell>
                <TableCell style={{ width: '300px' }}>Fecha de CFDI</TableCell>
                <TableCell style={{ width: '300px' }}>Folio</TableCell>
                <TableCell style={{ width: '300px' }}>Importe de CFDI</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.fondos.map(fondos =>
                <TableRow style={{ display: 'flex', flexDirection: 'row', top: '0', background: 'white', zIndex: '3', position: 'sticky' }}>
                  <TableCell style={{ width: '100px' }}>Mes</TableCell>
                  <TableCell style={{ width: '80px' }}>2021</TableCell>
                  <TableCell style={{ width: '80px' }}>{fondos.fondo}</TableCell>
                  <TableCell style={{ width: '150px' }}>{fondos.tipo_doc}</TableCell>
                  <TableCell style={{ width: '150px' }}>{fondos.numContra}</TableCell>
                  <TableCell style={{ width: '150px' }}>{fondos.cuentaPagar}</TableCell>
                  <TableCell style={{ width: '300px' }}>{fondos.fechaContra}</TableCell>
                  <TableCell style={{ width: '300px' }}>{fondos.sujetoContable}</TableCell>
                  <TableCell style={{ width: '300px' }}>{fondos.cuentaPagarPara}</TableCell>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    {fondos.comprometido.map((item, i) =>
                      <div style={{ display: 'flex' }}>
                        <TableCell style={{ width: '100px' }}>{item['ramo']}</TableCell>
                        <TableCell style={{ width: '100px' }}>{item['ur']}</TableCell>
                        <TableCell style={{ width: '100px' }}>{item['up']}</TableCell>
                        <TableCell style={{ width: '100px' }}>{item['rubro']}</TableCell>
                        <TableCell style={{ width: '100px' }}>{item['partida']}</TableCell>
                        <TableCell style={{ width: '100px' }}>{item['prog']}</TableCell>
                        <TableCell style={{ width: '100px' }}>{item['proy']}</TableCell>
                        <TableCell style={{ width: '100px' }}>{item['obra']}</TableCell>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                          {item['comprobantes'] !== undefined ?
                            item['comprobantes'].map(data =>
                              <div style={{ display: 'flex' }}>
                                <TableCell style={{ width: '150px' }}>F/M</TableCell>
                                <TableCell style={{ width: '300px' }}>{data.nombree}</TableCell>
                                <TableCell style={{ width: '300px' }}>{data.total}</TableCell>
                                <TableCell style={{ width: '150px' }}>F/M</TableCell>
                                <TableCell style={{ width: '300px' }}>{data.nombrer}</TableCell>
                                <TableCell style={{ width: '150px' }}>{data.rfc}</TableCell>
                                <TableCell style={{ width: '300px' }}>{data.fecha}</TableCell>
                                <TableCell style={{ width: '300px' }}>{data.uuid}</TableCell>
                                <TableCell style={{ width: '300px' }}>{data.total}</TableCell>
                              </div>
                            )
                            : null
                          }
                        </div>
                      </div>
                    )}
                  </div>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    )
  }
}
