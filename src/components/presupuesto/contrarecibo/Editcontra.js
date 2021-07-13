import React, { Component } from 'react'
import firebase from '../../../Firebase'
import Fab from '@material-ui/core/Fab'
import CheckIcon from '@material-ui/icons/Check'
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'

export default class Edit extends Component {
  constructor (props) {
    super(props)
    var URLactual = window.location
    this.state = {
      key: '',
      fondo: '',
      fecha: '',
      tipo_doc: '',
      oficio_aut: '',
      no_oficio: '',
      importe: '',
      beneficiario: '',
      desc: '',
      no_proyecto: [],
      realizo: '',
      no_lici: '',
      requisicion: '',
      pedido: '',
      ncomprobantes: '',
      poliza: '',
      cfe: '',
      nscfe: '',
      observaciones: '',
      fechaContra: '',
      numContra: '',
      fechaDepo: '',
      cuentaPagar: '',
      cuentaPagarPara: '',
      sujetoContable: '',
      comprometidos: [],
      urlfire: String(URLactual).substr(-20),
    }
  }

  listenComprometidos = (itemsRefComprometidos) => {
    itemsRefComprometidos.on('value', (snap) => {
      const firebasedata = snap.val()
      this.setState({
        comprometidos: firebasedata
      })
    })
  }

  componentDidMount() {
    const itemsRefFondos = firebase.database().ref(`fondos/${this.state.urlfire}`).orderByChild('fondo')
    itemsRefFondos.on('value', (snapshot) => {
      let updatedWish = snapshot.val()
      this.setState({
        ppp: updatedWish.cpa
      })
      this.setState({
        fondo: updatedWish.fondo,
        fecha: updatedWish.fecha,
        tipo_doc: updatedWish.tipo_doc,
        oficio_aut: updatedWish.oficio_aut,
        no_oficio: updatedWish.no_oficio,
        no_lici: updatedWish.no_lici,
        importe: updatedWish.importe,
        desc: updatedWish.desc,
        beneficiario: updatedWish.beneficiario,
        realizo: updatedWish.realizo,
        requisicion: updatedWish.requisicion,
        pedido: updatedWish.pedido,
        no_proyecto: updatedWish.no_proyecto ? updatedWish.no_proyecto : this.state.no_proyecto,
        poliza: updatedWish.poliza,
        cfe: updatedWish.cfe,
        nscfe: updatedWish.nscfe,
        observaciones: updatedWish.observaciones,
        numCompro: updatedWish.numCompro,
        comprometido: updatedWish.comprometido,
        numCheque: updatedWish.numCheque,
        fechaContra: updatedWish.fechaContra,
        fechaDepo: updatedWish.fechaDepo,
        numContra: updatedWish.numContra,
        cuentaPagar: updatedWish.cuentaPagar,
        cuentaPagarPara: updatedWish.cuentaPagarPara,
        sujetoContable: updatedWish.sujetoContable,
        cpa: updatedWish.cpa
      })
    })
    const itemsRefComprometidos = firebase.database().ref(`fondos/${this.state.urlfire}/comprometido`)
    this.listenComprometidos(itemsRefComprometidos)
  }

  update () {
    let updates = {}
    updates[`fondos/${this.state.urlfire}`] = {
      fondo: this.state.fondo,
      fecha: this.state.fecha,
      tipo_doc: this.state.tipo_doc,
      oficio_aut: this.state.oficio_aut,
      no_oficio: this.state.no_oficio,
      no_lici: this.state.no_lici,
      importe: this.state.importe,
      desc: this.state.desc,
      beneficiario: this.state.beneficiario,
      realizo: this.state.realizo,
      requisicion: this.state.requisicion,
      pedido: this.state.pedido,
      no_proyecto: this.state.no_proyecto,
      poliza: this.state.poliza,
      cfe: this.state.cfe,
      nscfe: this.state.nscfe,
      observaciones: this.state.observaciones,
      numCompro: this.state.numCompro,
      comprometido: this.state.comprometido,
      numCheque: this.state.numCheque,
      fechaContra: this.state.fechaContra,
      fechaDepo: this.state.fechaDepo,
      numContra: this.state.numContra,
      cuentaPagar: this.state.cuentaPagar,
      cuentaPagarPara: this.state.cuentaPagarPara,
      sujetoContable: this.state.sujetoContable,
      cpa: this.state.cpa
    }
    firebase.database().ref().update(updates)
    alert('Tu solicitud fue enviada.')
  }

  onChange = (e) => {
   const state = this.state
   state[e.target.name] = e.target.value
   this.setState({ fondoD: state })
 }

  render () {
    const total1 = [0]
    this.state.comprometidos.map(item =>
      item.total !== undefined ?
        total1.push(parseFloat(item.total))
      : null
    )
    const tt = (a, b) => a + b
    var ttotal = total1.reduce(tt).toFixed(2)

    return (
      <form className='editcontra-container'>
        <div style={{marginTop: '60px'}}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper style={{ padding: '20px', display: 'flex', justifyContent: 'space-between' }}>
                <div style={{ width: '48%' }}>
                  <div style={{ marginBottom: '15px' }}><b>Fondo</b></div>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <TextField
                      style={{ marginBottom: '15px' }}
                      label='Fondo'
                      name='fondo'
                      value={this.state.fondo}
                      disabled
                    />
                    <TextField
                      style={{ marginBottom: '15px' }}
                      label='Fecha'
                      name='fecha'
                      value={this.state.fecha}
                      disabled
                    />
                    <TextField
                      style={{ marginBottom: '15px' }}
                      label='Tipo de Documento'
                      name='tipo_doc'
                      value={this.state.tipo_doc}
                      disabled
                    />
                    <TextField
                      style={{ marginBottom: '15px' }}
                      label='Oficio de Autorización'
                      name='oficio_aut'
                      value={this.state.oficio_aut}
                      disabled
                    />
                    <TextField
                      style={{ marginBottom: '15px' }}
                      label='No. de Oficio'
                      name='no_oficio'
                      value={this.state.no_oficio}
                      disabled
                    />
                    <TextField
                      style={{ marginBottom: '15px' }}
                      label='Importe'
                      name='importe'
                      value={'$ ' + ttotal}
                      disabled
                    />
                    <TextField
                      style={{ marginBottom: '15px' }}
                      label='Beneficiario'
                      name='beneficiario'
                      value={this.state.beneficiario}
                      disabled
                    />
                    <TextField
                      style={{ marginBottom: '15px' }}
                      label='Descripción'
                      name='desc'
                      value={this.state.desc}
                      disabled
                    />
                    <TextField
                      label='Realizo'
                      name='realizo'
                      value={this.state.realizo}
                      disabled
                    />
                  </div>
                </div>
                <div style={{ width: '48%' }}>
                  <div style={{ marginBottom: '15px' }}><b>Licitación</b></div>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <TextField
                      style={{ marginBottom: '15px' }}
                      label='No. de Licitación'
                      name='no_lici'
                      value={this.state.no_lici}
                      disabled
                    />
                    <TextField
                      style={{ marginBottom: '15px' }}
                      label='Requisición'
                      name='requisicion'
                      value={this.state.requisicion}
                      disabled
                    />
                    <TextField
                      style={{ marginBottom: '15px' }}
                      label='Pedido'
                      name='pedido'
                      value={this.state.pedido}
                      disabled
                    />
                    <TextField
                      style={{ marginBottom: '15px' }}
                      label='Poliza Comprometido'
                      name='poliza'
                      value={this.state.poliza}
                      disabled
                    />
                    <div style={{ marginBottom: '15px', marginTop: '30px' }}><b>Pago CFE</b></div>
                    <TextField
                      style={{ marginBottom: '15px' }}
                      label='Cta CFE'
                      name='cfe'
                      value={this.state.cfe}
                      disabled
                    />
                    <TextField
                      style={{ marginBottom: '15px' }}
                      label='No Servicio CFE'
                      name='nscfe'
                      value={this.state.nscfe}
                      disabled
                    />
                    <TextField
                      style={{ marginBottom: '15px' }}
                      label='Observaciones'
                      name='observaciones'
                      value={this.state.observaciones}
                      disabled
                    />
                  </div>
                </div>
              </Paper>
            </Grid>
          </Grid>
          <Grid item xs={12} style={{ marginTop: '20px' }}>
            <Paper style={{ padding: '20px' }}>
              <div style={{ marginBottom: '15px' }}><b>Clave Presupuestal Armonizada</b></div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {this.state.cpa !== undefined ?
                  <div>
                    {this.state.cpa.map(item =>
                      <p>Clave Presupuestal: {item.presupuestal} / Cantidad Afectada: $ {item.cantidad}</p>
                    )}
                  </div> : null
                }
              </div>
            </Paper>
          </Grid>
          <Grid item xs={12} style={{ marginTop: '20px' }}>
            <Paper style={{ padding: '20px' }}>
              <div style={{ marginBottom: '15px' }}><b>Agregar Contrarecibo</b></div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <TextField
                  style={{ marginBottom: '15px' }}
                  type='date'
                  label='Fecha de Contrarecibo'
                  name='fechaContra'
                  onChange={this.onChange}
                  value={this.state.fechaContra}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <TextField
                  style={{ marginBottom: '15px' }}
                  label='Numero de Contrarecibo'
                  name='numContra'
                  onChange={this.onChange}
                  value={this.state.numContra}
                />
                <TextField
                  style={{ marginBottom: '15px' }}
                  type='date'
                  label='Fecha de Deposito'
                  name='fechaDepo'
                  onChange={this.onChange}
                  value={this.state.fechaDepo}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <TextField
                  style={{ marginBottom: '15px' }}
                  label='Cuenta por Pagar'
                  name='cuentaPagar'
                  onChange={this.onChange}
                  value={this.state.cuentaPagar}
                />
                <TextField
                  style={{ marginBottom: '15px' }}
                  label='Cuenta por Pagar Para'
                  name='cuentaPagarPara'
                  onChange={this.onChange}
                  value={this.state.cuentaPagarPara}
                />
                <TextField
                  style={{ marginBottom: '15px' }}
                  label='Sujeto Contable'
                  name='sujetoContable'
                  onChange={this.onChange}
                  value={this.state.sujetoContable}
                />
              </div>
            </Paper>
          </Grid>
          <div className='div-content-fab'>
            <Fab
              color='primary'
              aria-label='add'
              style={{ background: 'green' }}
              onClick={() => this.update()}
            >
              <CheckIcon />
            </Fab>
          </div>
        </div>
      </form>
    )
  }
}
