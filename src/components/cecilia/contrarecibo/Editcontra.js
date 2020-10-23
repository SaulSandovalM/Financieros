import React, { Component } from 'react'
import firebase from '../../../Firebase'
import Fab from '@material-ui/core/Fab'
import CheckIcon from '@material-ui/icons/Check'
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import Alert from '@material-ui/lab/Alert';

export default class Edit extends Component {
  constructor (props) {
    super(props)
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
      numProy: '',
      realizo: '',
      no_lici: '',
      requisicion: '',
      pedido: '',
      ncomprobantes: '',
      poliza: '',
      cfe: '',
      nscfe: '',
      observaciones: '',
    }
  }

  componentDidMount() {
    const ref = firebase.firestore().collection('fondos').doc(this.props.match.params.id);
    ref.get().then((doc) => {
      if (doc.exists) {
        const fondoD = doc.data();
        this.setState({
          key: doc.id,
          fondo: fondoD.fondo,
          fecha: fondoD.fecha,
          tipo_doc: fondoD.tipo_doc,
          oficio_aut: fondoD.oficio_aut,
          no_oficio: fondoD.no_oficio,
          importe: fondoD.importe,
          beneficiario: fondoD.beneficiario,
          desc: fondoD.desc,
          numProy: fondoD.numProy,
          realizo: fondoD.realizo,
          no_lici: fondoD.no_lici,
          requisicion: fondoD.requisicion,
          pedido: fondoD.pedido,
          poliza: fondoD.poliza,
          cfe: fondoD.cfe,
          nscfe: fondoD.nscfe,
          observaciones: fondoD.observaciones,
          fechaContra: fondoD.fechaContra,
          numContra: fondoD.numContra,
          fechaDepo: fondoD.fechaContra,
          cuentaPagar: fondoD.cuentaPagar,
          cuentaPagarPara: fondoD.cuentaPagarPara,
          sujetoContable: fondoD.sujetoContable
        });
      } else {
        console.log('No hay documento!');
      }
    });
  }

  onChange = (e) => {
   const state = this.state
   state[e.target.name] = e.target.value;
   this.setState({ fondoD: state });
 }

  onSubmit = (e) => {
    e.preventDefault()
    const {
      fondo,
      fecha,
      tipo_doc,
      oficio_aut,
      no_oficio,
      importe,
      beneficiario,
      desc,
      numProy,
      realizo,
      no_lici,
      requisicion,
      pedido,
      poliza,
      cfe,
      nscfe,
      observaciones,
      fechaContra,
      numContra,
      fechaDepo,
      cuentaPagar,
      cuentaPagarPara,
      sujetoContable } = this.state
    const updateRef = firebase.firestore().collection('fondos').doc(this.state.key)
    updateRef.set({
      fondo,
      fecha,
      tipo_doc,
      oficio_aut,
      no_oficio,
      importe,
      beneficiario,
      desc,
      numProy,
      realizo,
      no_lici,
      requisicion,
      pedido,
      poliza,
      cfe,
      nscfe,
      observaciones,
      fechaContra,
      numContra,
      fechaDepo,
      cuentaPagar,
      cuentaPagarPara,
      sujetoContable,
      estatus: 'Contrarecibo'
    }).then((docRef) => {
      this.setState({
        fondo: '',
        fecha: '',
        tipo_doc: '',
        oficio_aut: '',
        no_oficio: '',
        importe: '',
        beneficiario: '',
        desc: '',
        numProy: '',
        realizo: '',
        no_lici: '',
        requisicion: '',
        pedido: '',
        poliza: '',
        cfe: '',
        nscfe: '',
        observaciones: '',
        fechaContra: '',
        numContra: '',
        fechaDepo: '',
        cuentaPagar: '',
        cuentaPagarPara: '',
        sujetoContable: ''
      })
    })
    .catch((error) => {
      console.error('Error: ', error)
    })
    alert('Se ha agregado el contrarecibo.')
    this.props.history.push('/Contra')
  }

  render () {
    console.log(this.state.realizo)
    return (
      <form onSubmit={this.onSubmit} className='editcontra-container'>
        <div style={{marginTop: '60px'}}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper style={{ padding: '20px', display: 'flex', justifyContent: 'space-between' }}>
                <div style={{ width: '48%' }}>
                  <div style={{ marginBottom: '15px' }}><b>Fondo</b></div>
                  <div>
                    perro
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column'  }}>
                    <TextField
                      style={{ marginBottom: '15px' }}
                      label='Fondo'
                      name='fondo'
                      value={this.state.fondo}
                    />
                    <TextField
                      style={{ marginBottom: '15px' }}
                      label='Fecha'
                      name='fecha'
                      value={this.state.fecha}
                    />
                    <TextField
                      style={{ marginBottom: '15px' }}
                      label='Tipo de Documento'
                      name='tipo_doc'
                      value={this.state.tipo_doc}
                    />
                    <TextField
                      style={{ marginBottom: '15px' }}
                      label='Oficio de Autorización'
                      name='oficio_aut'
                      value={this.state.oficio_aut}
                    />
                    <TextField
                      style={{ marginBottom: '15px' }}
                      label='No. de Oficio'
                      name='no_oficio'
                      value={this.state.no_oficio}
                    />
                    <TextField
                      style={{ marginBottom: '15px' }}
                      label='Importe'
                      name='importe'
                      value={'$ ' + this.state.importe}
                    />
                    <TextField
                      style={{ marginBottom: '15px' }}
                      label='Beneficiario'
                      name='beneficiario'
                      value={this.state.beneficiario}
                    />
                    <TextField
                      style={{ marginBottom: '15px' }}
                      label='Descripción'
                      name='desc'
                      value={this.state.desc}
                    />
                    <TextField
                      style={{ marginBottom: '15px' }}
                      label='No. de Proyecto'
                      name='numProy'
                      value={this.state.numProy}
                    />
                    <TextField
                      label='Realizo'
                      name='realizo'
                      value={this.state.realizo}
                    />
                  </div>
                </div>
                <div style={{ width: '48%' }}>
                  <div style={{ marginBottom: '15px' }}><b>Licitación</b></div>
                  <TextField
                    className='field'
                    style={{ marginBottom: '15px' }}
                    label='No. de Licitación'
                    name='no_lici'
                    value={this.state.no_lici}
                  />
                  <TextField
                    className='field'
                    style={{ marginBottom: '15px' }}
                    label='Requisición'
                    name='requisicion'
                    value={this.state.requisicion}
                  />
                  <TextField
                    className='field'
                    style={{ marginBottom: '15px' }}
                    label='Pedido'
                    name='pedido'
                    value={this.state.pedido}
                  />
                  <TextField
                    className='field'
                    style={{ marginBottom: '15px' }}
                    label='Poliza Comprometido'
                    name='poliza'
                    value={this.state.poliza}
                  />
                  <div style={{ marginBottom: '15px', marginTop: '30px' }}><b>Pago CFE</b></div>
                  <TextField
                    className='field'
                    style={{ marginBottom: '15px' }}
                    label='Cta CFE'
                    name='cfe'
                    value={this.state.cfe}
                  />
                  <TextField
                    className='field'
                    style={{ marginBottom: '15px' }}
                    label='No Servicio CFE'
                    name='nscfe'
                    value={this.state.nscfe}
                  />
                  <TextField
                    className='field'
                    style={{ marginBottom: '15px' }}
                    label='Observaciones'
                    name='observaciones'
                    value={this.state.observaciones}
                  />
                </div>
              </Paper>
            </Grid>
          </Grid>
          <Grid item xs={12} style={{ marginTop: '20px' }}>
            <Paper style={{ padding: '20px' }}>
              <div style={{ marginBottom: '15px' }}>Agregar Contrarecibo</div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <TextField
                  style={{ marginBottom: '15px' }}
                  label='Fecha de Contrarecibo'
                  name='fondo'
                  onChange={this.onChange}
                  value={this.state.fechaContra}
                  required
                />
                <TextField
                  style={{ marginBottom: '15px' }}
                  label='Numero de Contrarecibo'
                  name='fecha'
                  onChange={this.onChange}
                  value={this.state.numContra}
                  required
                />
                <TextField
                  style={{ marginBottom: '15px' }}
                  label='Fecha de Deposito'
                  name='tipo_doc'
                  onChange={this.onChange}
                  value={this.state.fechaDepo}
                  required
                />
                <TextField
                  style={{ marginBottom: '15px' }}
                  label='Cuenta por Pagar'
                  name='oficio_aut'
                  onChange={this.onChange}
                  value={this.state.cuentaPagar}
                  required
                />
                <TextField
                  style={{ marginBottom: '15px' }}
                  label='Cuenta por Pagar Para'
                  name='no_oficio'
                  onChange={this.onChange}
                  value={this.state.cuentaPagarPara}
                  required
                />
                <TextField
                  label='Sujeto Contable'
                  name='importe'
                  onChange={this.onChange}
                  value={this.state.sujetoContable}
                  required
                />
              </div>
            </Paper>
          </Grid>
          <div className='div-content-fab'>
            <Fab
              color='primary'
              aria-label='add'
              style={{ background: 'green' }}
              type='submit'
            >
              <CheckIcon />
            </Fab>
          </div>
        </div>
      </form>
    )
  }
}
