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
    var URLactual = window.location
    this.state = {
      open: false,
      urlfire: String(URLactual).substr(-20),
      presupuestoConsumo: [],
      xml: [],
      xml2: []
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
      console.log('trae el presupuesto')
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
      console.log('entra al if')
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
        ene: this.props.mes === 'Enero' ? pruebaIndice.ene + totalres : pruebaIndice.ene,
        gasene: this.props.mes === 'Enero' ? pruebaIndice.gasene - totalres : pruebaIndice.gasene,
        feb: this.props.mes === 'Febrero' ? pruebaIndice.feb + totalres : pruebaIndice.feb,
        gasfeb: this.props.mes === 'Febrero' ? pruebaIndice.gasfeb - totalres : pruebaIndice.gasfeb,
        mar: this.props.mes === 'Marzo' ? pruebaIndice.mar + totalres : pruebaIndice.mar,
        gasmar: this.props.mes === 'Marzo' ? pruebaIndice.gasmar - totalres : pruebaIndice.gasmar,
        abr: this.props.mes === 'Abril' ? pruebaIndice.abr + totalres : pruebaIndice.abr,
        gasabr: this.props.mes === 'Abril' ? pruebaIndice.gasabr - totalres : pruebaIndice.gasabr,
        may: this.props.mes === 'Mayo' ? pruebaIndice.may + totalres : pruebaIndice.may,
        gasmay: this.props.mes === 'Mayo' ? pruebaIndice.gasmay - totalres : pruebaIndice.gasmay,
        jun: this.props.mes === 'Junio' ? pruebaIndice.jun + totalres : pruebaIndice.jun,
        gasjun: this.props.mes === 'Junio' ? pruebaIndice.gasjun - totalres : pruebaIndice.gasjun,
        jul: this.props.mes === 'Julio' ? pruebaIndice.jul + totalres : pruebaIndice.jul,
        gasjul: this.props.mes === 'Julio' ? pruebaIndice.gasjul - totalres : pruebaIndice.gasjul,
        ago: this.props.mes === 'Agosto' ? pruebaIndice.ago + totalres : pruebaIndice.ago,
        gasago: this.props.mes === 'Agosto' ? pruebaIndice.gasago - totalres : pruebaIndice.gasago,
        sep: this.props.mes === 'Septiembre' ? pruebaIndice.sep + totalres : pruebaIndice.sep,
        gassep: this.props.mes === 'Septiembre' ? pruebaIndice.gassep - totalres : pruebaIndice.gassep,
        oct: this.props.mes === 'Octubre' ? pruebaIndice.oct + totalres : pruebaIndice.oct,
        gasoct: this.props.mes === 'Octubre' ? pruebaIndice.gasoct - totalres : pruebaIndice.gasoct,
        nov: this.props.mes === 'Noviembre' ? pruebaIndice.nov + totalres : pruebaIndice.nov,
        gasnov: this.props.mes === 'Noviembre' ? pruebaIndice.gasnov - totalres : pruebaIndice.gasnov,
        dic: this.props.mes === 'Diciembre' ? pruebaIndice.dic + totalres : pruebaIndice.dic,
        gasdic: this.props.mes === 'Diciembre' ? pruebaIndice.gasdic - totalres : pruebaIndice.gasdic,
        total: pruebaIndice.total,
        ampliacion: pruebaIndice.ampliacion,
        reduccion: pruebaIndice.reduccion,
        transferencia: pruebaIndice.transferencia
      }
      console.log('Se ha actualizado el presupuesto')
      // firebase.database().ref().update(updates)
      console.log('Se ha borrado la afectacion de la partida')
      let positionId = this.props.comprometido.id
      let fondoId = this.state.urlfire
      const presupuestoRef = firebase.database().ref(`fondos/${fondoId}/comprometido/${positionId}/comprobantes`)
      presupuestoRef.on('value', (snap) => {
        console.log('trae la factura')
        var factura = []
        snap.forEach((child) => {
          factura.push({
            id: child.val().id
          })
          this.setState({
            xml: factura
          })
        })
      })
      var idX = this.state.xml[0] !== undefined ? this.state.xml[0].id : ''
      console.log(idX)
      const xmlRef = firebase.database().ref('xml')
      xmlRef.on('value', (snap) => {
        var xml = []
        snap.forEach((child) => {
          if (idX === child.key) {
            xml.push({
              id: child.key,
              estatus: child.val().estatus,
              fecha: child.val().fecha,
              folio: child.val().folio,
              importe: child.val().importe,
              isr: child.val().isr,
              iva: child.val().iva,
              nombre: child.val().nombre,
              subtotal: child.val().subtotal,
              tipo: child.val().tipo,
              total: child.val().total,
              uuid: child.val().uuid
            })
            this.setState({
              xml2: xml
            })
            console.log(xml)
          }
        })
      })

        let updatesXml = {}
        updatesXml['xml/' + xmlIndice.id] = {
          estatus: xmlIndice.val().estatus,
          fecha: xmlIndice.val().fecha,
          folio: xmlIndice.val().folio,
          importe: xmlIndice.val().importe,
          isr: xmlIndice.val().isr,
          iva: xmlIndice.val().iva,
          nombre: xmlIndice.val().nombre,
          subtotal: xmlIndice.val().subtotal,
          tipo: xmlIndice.val().tipo,
          total: xmlIndice.val().total,
          uuid: xmlIndice.val().uuid
        }
        // firebase.database().ref().update(updatesXml)
      }
      // firebase.database().ref(`fondos/${fondoId}/comprometido/${positionId}`).remove()
      console.log('Se ha borrado la factura')
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
          <TableCell className='border-icon' onClick={() => this.removeFactura()}>
            <IconButton size='small' className='border-des'>
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
                          {item.nombre}
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
