import React, { Component } from 'react'
import './Comprometidos.css'
import TableBody from '@material-ui/core/TableBody'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import IconButton from '@material-ui/core/IconButton'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp'
import CurrencyFormat from 'react-currency-format'
import Box from '@material-ui/core/Box'
import Collapse from '@material-ui/core/Collapse'
import Typography from '@material-ui/core/Typography'
import TableHead from '@material-ui/core/TableHead'
import firebase from '../../../Firebase'
import DeleteIcon from '@material-ui/icons/Delete'

export default class ListComponent extends Component {
  constructor (props) {
    super(props)
    var today = new Date()
    var dd = today.getDate()
    var mm = today.getMonth() + 1
    if (dd < 10) {
      dd = '0' + dd
    }
    if (mm < 10) {
      mm = '0' + mm
    }
    today = mm
    var URLactual = window.location
    this.state = {
      open: false,
      urlfire: String(URLactual).substr(-20),
      presupuestoConsumo: [],
      xml: [],
      xml2: [],
      mes: today
    }
  }

  toggleOpen () {
    this.setState({
      open: !this.state.open
    })
  }

  removeFactura = () => {
    let totalres = parseFloat(this.props.comprometido.total).toFixed(2)
    let presid = this.props.comprometido.presupuestoid
    const presupuestoRef = firebase.database().ref('presupuesto/')
    presupuestoRef.on('value', (snap) => {
      var presupuesto = []
      snap.forEach((child) => {
        if (presid === child.key) {
          presupuesto.push({
            año: child.val().año,
            rm: child.val().rm,
            ur: child.val().ur,
            up: child.val().up,
            rubro: child.val().rubro,
            tg: child.val().tg,
            ogasto: child.val().ogasto,
            npro: child.val().npro,
            f: child.val().f,
            fu: child.val().fu,
            sf: child.val().sf,
            eje: child.val().eje,
            s: child.val().s,
            prog: child.val().prog,
            sp: child.val().sp,
            min: child.val().min,
            obj: child.val().obj,
            proy: child.val().proy,
            est: child.val().est,
            obra: child.val().obra,
            ben: child.val().ben,
            eg: child.val().eg,
            mi: child.val().mi,
            pr: child.val().pr,
            pd: child.val().pd,
            itrans: child.val().itrans,
            igest: child.val().igest,
            la: child.val().la,
            ods: child.val().ods,
            et: child.val().et,
            ff: child.val().ff,
            of: child.val().of,
            np: child.val().np,
            cpa: child.val().cpa,
            ene: child.val().ene,
            gasene: child.val().gasene,
            ampene: child.val().ampene,
            feb: child.val().feb,
            gasfeb: child.val().gasfeb,
            ampfeb: child.val().ampfeb,
            mar: child.val().mar,
            gasmar: child.val().gasmar,
            ampmar: child.val().ampmar,
            abr: child.val().abr,
            gasabr: child.val().gasabr,
            ampabr: child.val().ampabr,
            may: child.val().may,
            gasmay: child.val().gasmay,
            ampmay: child.val().ampmay,
            jun: child.val().jun,
            gasjun: child.val().gasjun,
            ampjun: child.val().ampjun,
            jul: child.val().jul,
            gasjul: child.val().gasjul,
            ampjul: child.val().ampjul,
            ago: child.val().ago,
            gasago: child.val().gasago,
            ampago: child.val().ampago,
            sep: child.val().sep,
            gassep: child.val().gassep,
            ampsep: child.val().ampsep,
            oct: child.val().oct,
            gasoct: child.val().gasoct,
            ampoct: child.val().ampoct,
            nov: child.val().nov,
            gasnov: child.val().gasnov,
            ampnov: child.val().ampnov,
            dic: child.val().dic,
            gasdic: child.val().gasdic,
            ampdic: child.val().ampdic,
            total: child.val().total,
            ampliacion: child.val().ampliacion,
            reduccion: child.val().reduccion,
            transferencia: child.val().transferencia,
            estatus: child.val().estatus,
            id: child.key
          })
          this.setState({
            presupuestoConsumo: presupuesto
          })
        }
      })
    })
    if (this.state.presupuestoConsumo.length === 1) {
      var pruebaIndice = this.state.presupuestoConsumo[0]
      let updates = {}
      updates['presupuesto/' + presid] = {
        año: pruebaIndice.año,
        rm: pruebaIndice.rm,
        ur: pruebaIndice.ur,
        up: pruebaIndice.up,
        rubro: pruebaIndice.rubro,
        tg: pruebaIndice.tg,
        ogasto: pruebaIndice.ogasto,
        npro: pruebaIndice.npro,
        f: pruebaIndice.f,
        fu: pruebaIndice.fu,
        sf: pruebaIndice.sf,
        eje: pruebaIndice.eje,
        s: pruebaIndice.s,
        prog: pruebaIndice.prog,
        sp: pruebaIndice.sp,
        min: pruebaIndice.min,
        obj: pruebaIndice.obj,
        proy: pruebaIndice.proy,
        est: pruebaIndice.est,
        obra: pruebaIndice.obra,
        ben: pruebaIndice.ben,
        eg: pruebaIndice.eg,
        mi: pruebaIndice.mi,
        pr: pruebaIndice.pr,
        pd: pruebaIndice.pd,
        itrans: pruebaIndice.itrans,
        igest: pruebaIndice.igest,
        la: pruebaIndice.la,
        ods: pruebaIndice.ods,
        et: pruebaIndice.et,
        ff: pruebaIndice.ff,
        of: pruebaIndice.of,
        np: pruebaIndice.np,
        cpa: pruebaIndice.cpa,
        ene: this.state.mes === '01' ? pruebaIndice.ene + totalres : pruebaIndice.ene,
        gasene: this.state.mes === '01' ? pruebaIndice.gasene - totalres : pruebaIndice.gasene,
        ampene: pruebaIndice.ampene,
        feb: this.state.mes === '02' ? pruebaIndice.feb + totalres : pruebaIndice.feb,
        gasfeb: this.state.mes === '02' ? pruebaIndice.gasfeb - totalres : pruebaIndice.gasfeb,
        ampfeb: pruebaIndice.ampfeb,
        mar: this.state.mes === '03' ? pruebaIndice.mar + totalres : pruebaIndice.mar,
        gasmar: this.state.mes === '03' ? pruebaIndice.gasmar - totalres : pruebaIndice.gasmar,
        ampmar: pruebaIndice.ampmar,
        abr: this.state.mes === '04' ? pruebaIndice.abr + totalres : pruebaIndice.abr,
        gasabr: this.state.mes === '04' ? pruebaIndice.gasabr - totalres : pruebaIndice.gasabr,
        ampabr: pruebaIndice.ampabr,
        may: this.state.mes === '05' ? pruebaIndice.may + totalres : pruebaIndice.may,
        gasmay: this.state.mes === '05' ? pruebaIndice.gasmay - totalres : pruebaIndice.gasmay,
        ampmay: pruebaIndice.ampmay,
        jun: this.state.mes === '06' ? pruebaIndice.jun + totalres : pruebaIndice.jun,
        gasjun: this.state.mes === '06' ? pruebaIndice.gasjun - totalres : pruebaIndice.gasjun,
        ampjun: pruebaIndice.ampjun,
        jul: this.state.mes === '07' ? pruebaIndice.jul + totalres : pruebaIndice.jul,
        gasjul: this.state.mes === '07' ? pruebaIndice.gasjul - totalres : pruebaIndice.gasjul,
        ampjul: pruebaIndice.ampjul,
        ago: this.state.mes === '08' ? pruebaIndice.ago + totalres : pruebaIndice.ago,
        gasago: this.state.mes === '08' ? pruebaIndice.gasago - totalres : pruebaIndice.gasago,
        ampago: pruebaIndice.ampago,
        sep: this.state.mes === '09' ? pruebaIndice.sep + totalres : pruebaIndice.sep,
        gassep: this.state.mes === '09' ? pruebaIndice.gassep - totalres : pruebaIndice.gassep,
        ampsep: pruebaIndice.ampsep,
        oct: this.state.mes === '10' ? pruebaIndice.oct + totalres : pruebaIndice.oct,
        gasoct: this.state.mes === '10' ? pruebaIndice.gasoct - totalres : pruebaIndice.gasoct,
        ampoct: pruebaIndice.ampoct,
        nov: this.state.mes === '11' ? pruebaIndice.nov + totalres : pruebaIndice.nov,
        gasnov: this.state.mes === '11' ? pruebaIndice.gasnov - totalres : pruebaIndice.gasnov,
        ampnov: pruebaIndice.ampnov,
        dic: this.state.mes === '12' ? pruebaIndice.dic + totalres : pruebaIndice.dic,
        gasdic: this.state.mes === '12' ? pruebaIndice.gasdic - totalres : pruebaIndice.gasdic,
        ampdic: pruebaIndice.ampdic,
        total: pruebaIndice.total,
        ampliacion: pruebaIndice.ampliacion,
        reduccion: pruebaIndice.reduccion,
        transferencia: pruebaIndice.transferencia
      }
      alert('Se ha actualizado el presupuesto')
      firebase.database().ref().update(updates)
      let positionId = this.props.comprometido.id
      let fondoId = this.state.urlfire
      firebase.database().ref(`fondos/${fondoId}/comprometido/${positionId}`).remove()
      firebase.database().ref(`fondos/${fondoId}/cpa/${positionId}`).remove()
      alert('Se ha borrado la factura')
    }
  }

  render () {
    return (
      <TableBody>
        <TableRow>
          <TableCell className='border-icon'>
            <IconButton aria-label='expand row' size='small' className='border-des' onClick={this.toggleOpen.bind(this)}>
              {this.state.open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell className='border-table2'>
            <div className='font-tb'>
              {this.props.comprometido.partida}
            </div>
          </TableCell>
          <TableCell className='border-table2'>
            <div className='font-tb'>
              {this.props.comprometido.presupuestal}
            </div>
          </TableCell>
          <TableCell className='border-table2'>
            <div className='font-tb'>
              {this.props.comprometido.rubro}
            </div>
          </TableCell>
          <TableCell className='border-table-area'>
            <div className='font-tb'>
              {this.props.comprometido.area}
            </div>
          </TableCell>
          <TableCell className='border-table2'>
            <CurrencyFormat
              className='font-tb'
              displayType='text'
              prefix=' $ '
              thousandSeparator
              value={this.props.comprometido.importe_comp}
            />
          </TableCell>
          <TableCell className='border-table2'>
            <CurrencyFormat
              className='font-tb'
              displayType='text'
              prefix=' $ '
              thousandSeparator
              value={this.props.comprometido.iva}
            />
          </TableCell>
          <TableCell className='border-table2'>
            <CurrencyFormat
              className='font-tb'
              displayType='text'
              prefix=' $ '
              thousandSeparator
              value={this.props.comprometido.isr}
            />
          </TableCell>
          <TableCell className='border-table2'>
            <CurrencyFormat
              className='font-tb'
              style={{ textAlign: 'center' }}
              displayType='text'
              prefix=' $ '
              thousandSeparator
              value={this.props.comprometido.total}
            />
          </TableCell>
          <TableCell className='border-icon'>
            <IconButton size='small' className='border-des' onClick={() => this.removeFactura()}>
              <DeleteIcon style={{ color: 'red' }} />
            </IconButton>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell
            style={{
              paddingBottom: 0,
              paddingTop: 0,
              borderTop: 0,
              borderLeft: '0px solid #fff',
              borderRight: '0px solid #fff'
            }}
            colSpan={12}
          >
            <Collapse in={this.state.open} timeout='auto' unmountOnExit>
              <Box margin={1}>
                <Typography variant='h6' gutterBottom component='div'>
                  <div style={{ fontWeight: 'bold' }}>Facturas</div>
                </Typography>
                <TableHead>
                  <TableRow>
                    <TableCell className='border-icon'>
                      <IconButton aria-label='expand row' size='small' className='border-des' />
                    </TableCell>
                    <TableCell className='border-table2'>
                      <div className='font-tb'>
                        <div style={{ fontWeight: 'bold' }}>Folio</div>
                      </div>
                    </TableCell>
                    <TableCell className='border-table2'>
                      <div className='font-tb'>
                        <div style={{ fontWeight: 'bold' }}>Fecha</div>
                      </div>
                    </TableCell>
                    <TableCell className='border-table2'>
                      <div className='font-tb'>
                        <div style={{ fontWeight: 'bold' }}>Uid</div>
                      </div>
                    </TableCell>
                    <TableCell className='border-table-area'>
                      <div className='font-tb'>
                        <div style={{ fontWeight: 'bold' }}>Nombre</div>
                      </div>
                    </TableCell>
                    <TableCell className='border-table2'>
                      <div style={{ fontWeight: 'bold' }}>Importe</div>
                    </TableCell>
                    <TableCell className='border-table2'>
                      <div style={{ fontWeight: 'bold' }}>Iva</div>
                    </TableCell>
                    <TableCell className='border-table2'>
                      <div style={{ fontWeight: 'bold' }}>Isr</div>
                    </TableCell>
                    <TableCell className='border-table2'>
                      <div style={{ fontWeight: 'bold' }}>Total</div>
                    </TableCell>
                    <TableCell className='border-icon'>
                      <IconButton size='small' className='border-des' />
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {this.props.comprometido.comprobantes.map(item =>
                    <TableRow key={item}>
                      <TableCell className='border-icon'>
                        <IconButton aria-label='expand row' size='small' className='border-des' />
                      </TableCell>
                      <TableCell className='border-table2'>
                        <div className='font-tb'>
                          {item.folio}
                        </div>
                      </TableCell>
                      <TableCell className='border-table2'>
                        <div className='font-tb'>
                          {item.fecha.substr(0, 10)}
                        </div>
                      </TableCell>
                      <TableCell className='border-table2'>
                        <div className='font-tb'>
                          {item.uuid.substr(0, 8)}
                        </div>
                      </TableCell>
                      <TableCell className='border-table-area'>
                        <div className='font-tb'>
                          {item.id}
                        </div>
                      </TableCell>
                      <TableCell className='border-table2'>
                        <CurrencyFormat
                          className='font-tb'
                          displayType='text'
                          prefix=' $ '
                          thousandSeparator
                          value={parseFloat(item.subtotal).toFixed(2)}
                        />
                      </TableCell>
                      <TableCell className='border-table2'>
                        <CurrencyFormat
                          className='font-tb'
                          displayType='text'
                          prefix=' $ '
                          thousandSeparator
                          value={parseFloat(item.iva).toFixed(2)}
                        />
                      </TableCell>
                      <TableCell className='border-table2'>
                        <CurrencyFormat
                          className='font-tb'
                          displayType='text'
                          prefix=' $ '
                          thousandSeparator
                          value={parseFloat(item.isr).toFixed(2)}
                        />
                      </TableCell>
                      <TableCell className='border-table2'>
                        <CurrencyFormat
                          className='font-tb'
                          style={{ textAlign: 'center' }}
                          displayType='text'
                          prefix=' $ '
                          thousandSeparator
                          value={(parseFloat(item.subtotal) + parseFloat(item.iva) + parseFloat(item.isr)).toFixed(2)}
                        />
                      </TableCell>
                      <TableCell className='border-icon'>
                        <IconButton size='small' className='border-des' />
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </TableBody>
    )
  }
}
