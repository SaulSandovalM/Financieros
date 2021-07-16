import React, { Component } from 'react'
import firebase from '../../../Firebase'
import Fab from '@material-ui/core/Fab'
import CheckIcon from '@material-ui/icons/Check'
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'

export default class ContraValidacion extends Component {
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

  componentDidMount() {
    const itemsRefVal = firebase.database().ref(`xmlPagoDirecto/${this.state.urlfire}`).orderByChild('FechaI')
    itemsRefVal.on('value', (snapshot) => {
      let updatedWish = snapshot.val()
      console.log(updatedWish)
      this.setState({
        Fondo: updatedWish.Fondo,
        FechaI: updatedWish.FechaI,
        Contrarecibo: updatedWish.Contrarecibo,
        FechaP: updatedWish.FechaP,
        Devolucion: updatedWish.Devolucion,
        Total: updatedWish.Total,
        TipoPersona: updatedWish.TipoPersona,
        NumContra: updatedWish.NumContra,
        Adquisicion: updatedWish.Adquisicion,
        Xml: updatedWish.Xml,
        xmlC: updatedWish.xmlC,
        filefactura: updatedWish.filefactura,
        realizo: updatedWish.realizo,
        folio: updatedWish.folio,
        id: updatedWish.key
      })
    })
  }

  update () {
    let updates = {}
    updates[`xmlPagoDirecto/${this.state.urlfire}`] = {
      Fondo: this.state.Fondo,
      FechaI: this.state.FechaI,
      Contrarecibo: this.state.Contrarecibo,
      FechaP: this.state.FechaP,
      Devolucion: this.state.Devolucion,
      Total: this.state.Total,
      TipoPersona: this.state.TipoPersona,
      NumContra: this.state.NumContra,
      Adquisicion: this.state.Adquisicion,
      Xml: this.state.Xml,
      xmlC: this.state.xmlC,
      filefactura: this.state.filefactura,
      realizo: this.state.realizo,
      folio: this.state.folio,
      fechaContra: this.state.fechaContra,
      fechaDepo: this.state.fechaDepo,
      fechaIngre: this.state.fechaIngre,
      folioIngreso: this.state.folioIngreso
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
    return (
      <form className='editcontra-container'>
        <div style={{ marginTop: '60px' }}>
          <Grid item xs={12} style={{ marginTop: '20px' }}>
            <Paper style={{ padding: '20px' }}>
              <div style={{ marginBottom: '15px' }}><b>Agregar Contrarecibo</b></div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <TextField
                  style={{ marginBottom: '15px' }}
                  type='date'
                  label='Fecha de contrarecibo'
                  name='fechaContra'
                  onChange={this.onChange}
                  value={this.state.fechaContra}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <TextField
                  style={{ marginBottom: '15px' }}
                  label='Numero de contrarecibo'
                  name='Contrarecibo'
                  onChange={this.onChange}
                  value={this.state.Contrarecibo}
                />
                <TextField
                  style={{ marginBottom: '15px' }}
                  type='date'
                  label='Fecha de deposito'
                  name='fechaDepo'
                  onChange={this.onChange}
                  value={this.state.fechaDepo}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <TextField
                  style={{ marginBottom: '15px' }}
                  type='date'
                  label='Fecha de ingreso'
                  name='fechaIngre'
                  onChange={this.onChange}
                  value={this.state.fechaIngre}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <TextField
                  style={{ marginBottom: '15px' }}
                  label='Folio de ingreso'
                  name='folioIngreso'
                  onChange={this.onChange}
                  value={this.state.folioIngreso}
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
