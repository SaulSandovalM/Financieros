import React, { Component } from 'react'
import firebase from '../../../Firebase'

export default class Edit extends Component {
  constructor (props) {
    super(props)
    this.state = {
      key: '',
      fechaContra: '',
      numContra: '',
      fechaDepo: '',
      cuentaPagar: '',
      cuentaPagarPara: '',
      beneficiario: '',
      sujetoContable: '',
      desc: '',
      fecha: '',
      fondo: '',
      importe: '',
      no_lici: '',
      no_oficio: '',
      oficio_aut: '',
      realizo: '',
      tipo_doc: ''
    }
  }

  componentDidMount() {
    const ref = firebase.firestore().collection('fondos').doc(this.props.match.params.id);
    ref.get().then((doc) => {
      if (doc.exists) {
        const fondoD = doc.data();
        this.setState({
          key: doc.id,
          beneficiario: fondoD.beneficiario,
          cfe: fondoD.cfe,
          desc: fondoD.desc,
          fecha: fondoD.fecha,
          fondo: fondoD.fondo,
          importe: fondoD.improte,
          ncomprobantes: fondoD.ncomprobantes,
          no_lici: fondoD.no_lici,
          no_oficio: fondoD.no_oficio,
          nscfe: fondoD.nscfe,
          numCompro: fondoD.numCompro,
          observaciones: fondoD.observaciones,
          oficio_aut: fondoD.oficio_aut,
          pedido: fondoD.pedido,
          poliza: fondoD.poliza,
          realizo: fondoD.realizo,
          requisicion: fondoD.requisicion,
          tipo_doc: fondoD.tipo_doc,
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
      beneficiario,
      cfe,
      desc,
      fecha,
      fondo,
      importe,
      ncomprobantes,
      no_lici,
      no_oficio,
      nscfe,
      numCompro,
      observaciones,
      oficio_aut,
      pedido,
      poliza,
      realizo,
      requisicion,
      tipo_doc,
      fechaContra,
      numContra,
      fechaDepo,
      cuentaPagar,
      cuentaPagarPara,
      sujetoContable } = this.state
    const updateRef = firebase.firestore().collection('fondos').doc(this.state.key)
    updateRef.set({
      beneficiario,
      cfe,
      desc,
      fecha,
      fondo,
      importe,
      ncomprobantes,
      no_lici,
      no_oficio,
      nscfe,
      numCompro,
      observaciones,
      oficio_aut,
      pedido,
      poliza,
      realizo,
      requisicion,
      tipo_doc,
      fechaContra,
      numContra,
      fechaDepo,
      cuentaPagar,
      cuentaPagarPara,
      sujetoContable,
      estatus: 'Contrarecibo'
    }).then((docRef) => {
      this.setState({
        beneficiario: '',
        cfe: '',
        desc: '',
        fecha: '',
        fondo: '',
        importe: '',
        ncomprobantes: '',
        no_lici: '',
        no_oficio: '',
        nscfe: '',
        numCompro: '',
        observaciones: '',
        oficio_aut: '',
        pedido: '',
        poliza: '',
        realizo: '',
        requisicion: '',
        tipo_doc: '',
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
    return (
      <div>
        <div className='container-all'>
          <div>
            <h3>
              Agregar Contrarecibo
            </h3>
          </div>
          <div>
            <form onSubmit={this.onSubmit}>
              <div>
                <div className='fcc-i'>
                  <p className='fimpre'>Cfe:</p>
                  <input
                    name='cfe'
                    onChange={this.onChange}
                    value={this.state.cfe}
                    disabled
                  />
                </div>
                <div className='fcc-i'>
                  <p className='fimpre'>Descripción:</p>
                  <input
                    name='desc'
                    onChange={this.onChange}
                    value={this.state.desc}
                    disabled
                  />
                </div>
                <div className='fcc-i'>
                  <p className='fimpre'>Fecha:</p>
                  <input
                    name='fecha'
                    onChange={this.onChange}
                    value={this.state.fecha}
                    disabled
                  />
                </div>
                <div className='fcc-i'>
                  <p className='fimpre'>Fondo:</p>
                  <input
                    name='fondo'
                    onChange={this.onChange}
                    value={this.state.fondo}
                    disabled
                  />
                </div>
                <div className='fcc-i'>
                  <p className='fimpre'>Importe:</p>
                  <input
                    name='importe'
                    onChange={this.onChange}
                    value={this.state.importe}
                    disabled
                  />
                </div>
                <div className='fcc-i'>
                  <p className='fimpre'>Num. Comprobantes:</p>
                  <input
                    name='ncomprobantes'
                    onChange={this.onChange}
                    value={this.state.ncomprobantes}
                    disabled
                  />
                </div>
                <div className='fcc-i'>
                  <p className='fimpre'>No. Licitación:</p>
                  <input
                    name='no_lici'
                    onChange={this.onChange}
                    value={this.state.no_lici}
                    disabled
                  />
                </div>
                <div className='fcc-i'>
                  <p className='fimpre'>No. Oficio:</p>
                  <input
                    name='no_oficio'
                    onChange={this.onChange}
                    value={this.state.no_oficio}
                    disabled
                  />
                </div>
                <div className='fcc-i'>
                  <p className='fimpre'>No. de Servicio:</p>
                  <input
                    name='nscfe'
                    onChange={this.onChange}
                    value={this.state.nscfe}
                    disabled
                  />
                </div>
                <div className='fcc-i'>
                  <p className='fimpre'>Num. Comprobantes:</p>
                  <input
                    name='numCompro'
                    onChange={this.onChange}
                    value={this.state.numCompro}
                    disabled
                  />
                </div>
                <div className='fcc-i'>
                  <p className='fimpre'>Observaciones:</p>
                  <input
                    name='observaciones'
                    onChange={this.onChange}
                    value={this.state.observaciones}
                    disabled
                  />
                </div>
                <div className='fcc-i'>
                  <p className='fimpre'>Oficio Autorización:</p>
                  <input
                    name='oficio_aut'
                    onChange={this.onChange}
                    value={this.state.oficio_aut}
                    disabled
                  />
                </div>
                <div className='fcc-i'>
                  <p className='fimpre'>Pedido:</p>
                  <input
                    name='pedido'
                    onChange={this.onChange}
                    value={this.state.pedido}
                    disabled
                  />
                </div>
                <div className='fcc-i'>
                  <p className='fimpre'>Poliza:</p>
                  <input
                    name='poliza'
                    onChange={this.onChange}
                    value={this.state.poliza}
                    disabled
                  />
                </div>
                <div className='fcc-i'>
                  <p className='fimpre'>Realizo:</p>
                  <input
                    name='realizo'
                    onChange={this.onChange}
                    value={this.state.realizo}
                    disabled
                  />
                </div>
                <div className='fcc-i'>
                  <p className='fimpre'>Requisición:</p>
                  <input
                    name='requisicion'
                    onChange={this.onChange}
                    value={this.state.requisicion}
                    disabled
                  />
                </div>
                <div className='fcc-i'>
                  <p className='fimpre'>Tipo Documento:</p>
                  <input
                    name='tipo_doc'
                    onChange={this.onChange}
                    value={this.state.tipo_doc}
                    disabled
                  />
                </div>
                <div className='fcc-i'>
                  <p className='fimpre'>Fecha de Contrarecibo:</p>
                  <input
                    name='fechaContra'
                    onChange={this.onChange}
                    value={this.state.fechaContra}
                  />
                </div>
                <div className='fcc-i'>
                  <p className='fimpre'>Num. de Contrarecibo:</p>
                  <input
                    name='numContra'
                    onChange={this.onChange}
                    value={this.state.numContra}
                  />
                </div>
                <div className='fcc-i'>
                  <p className='fimpre'>Fecha de Deposito:</p>
                  <input
                    name='fechaDepo'
                    onChange={this.onChange}
                    value={this.state.fechaDepo}
                  />
                </div>
                <div className='fcc-i'>
                  <p className='fimpre'>Cuenta por Pagar:</p>
                  <input
                    name='cuentaPagar'
                    onChange={this.onChange}
                    value={this.state.cuentaPagar}
                  />
                </div>
                <div className='fcc-i'>
                  <p className='fimpre'>Cuenta por Pagar Para:</p>
                  <input
                    name='cuentaPagarPara'
                    onChange={this.onChange}
                    value={this.state.cuentaPagarPara}
                  />
                </div>
                <div className='fcc-i'>
                  <p className='fimpre'>Sujeto Contable:</p>
                  <input
                    name='sujetoContable'
                    onChange={this.onChange}
                    value={this.state.sujetoContable}
                  />
                </div>
                <div className='fcc-i'>
                  <p className='fimpre'>Beneficiario:</p>
                  <input
                    value={this.state.beneficiario}
                    name='beneficiario'
                    onChange={this.onChange}
                  />
                </div>
              </div>
              <div className='cont-but'>
                <button type='submit' className='but-g'>Guardar</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}
