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
                  <p className='fimpre'>Beneficiario:</p>
                  <input
                    value={this.state.beneficiario}
                    name='beneficiario'
                    onChange={this.onChange}
                  />
                </div>
                <div className='fcc-i'>
                  <p className='fimpre'>Cfe:</p>
                  <input
                    name='cfe'
                    onChange={this.onChange}
                    value={this.state.cfe}
                  />
                </div>
                <div className='fcc-i'>
                  <p className='fimpre'>desc:</p>
                  <input
                    name='desc'
                    onChange={this.onChange}
                    value={this.state.desc}
                  />
                </div>
                <div className='fcc-i'>
                  <p className='fimpre'>fecha:</p>
                  <input
                    name='fecha'
                    onChange={this.onChange}
                    value={this.state.fecha}
                  />
                </div>
                <div className='fcc-i'>
                  <p className='fimpre'>fondo:</p>
                  <input
                    name='fondo'
                    onChange={this.onChange}
                    value={this.state.fondo}
                  />
                </div>
                <div className='fcc-i'>
                  <p className='fimpre'>importe:</p>
                  <input
                    name='importe'
                    onChange={this.onChange}
                    value={this.state.importe}
                  />
                </div>
                <div className='fcc-i'>
                  <p className='fimpre'>n comprobantes:</p>
                  <input
                    name='ncomprobantes'
                    onChange={this.onChange}
                    value={this.state.ncomprobantes}
                  />
                </div>
                <div className='fcc-i'>
                  <p className='fimpre'>no_lici:</p>
                  <input
                    name='no_lici'
                    onChange={this.onChange}
                    value={this.state.no_lici}
                  />
                </div>
                <div className='fcc-i'>
                  <p className='fimpre'>no_oficio:</p>
                  <input
                    name='no_oficio'
                    onChange={this.onChange}
                    value={this.state.no_oficio}
                  />
                </div>
                <div className='fcc-i'>
                  <p className='fimpre'>nscfe:</p>
                  <input
                    name='nscfe'
                    onChange={this.onChange}
                    value={this.state.nscfe}
                  />
                </div>
                <div className='fcc-i'>
                  <p className='fimpre'>numCompro:</p>
                  <input
                    name='numCompro'
                    onChange={this.onChange}
                    value={this.state.numCompro}
                  />
                </div>
                <div className='fcc-i'>
                  <p className='fimpre'>observaciones:</p>
                  <input
                    name='observaciones'
                    onChange={this.onChange}
                    value={this.state.observaciones}
                  />
                </div>
                <div className='fcc-i'>
                  <p className='fimpre'>oficio_aut:</p>
                  <input
                    name='oficio_aut'
                    onChange={this.onChange}
                    value={this.state.oficio_aut}
                  />
                </div>
                <div className='fcc-i'>
                  <p className='fimpre'>pedido:</p>
                  <input
                    name='pedido'
                    onChange={this.onChange}
                    value={this.state.pedido}
                  />
                </div>
                <div className='fcc-i'>
                  <p className='fimpre'>poliza:</p>
                  <input
                    name='poliza'
                    onChange={this.onChange}
                    value={this.state.poliza}
                  />
                </div>
                <div className='fcc-i'>
                  <p className='fimpre'>realizo:</p>
                  <input
                    name='realizo'
                    onChange={this.onChange}
                    value={this.state.realizo}
                  />
                </div>
                <div className='fcc-i'>
                  <p className='fimpre'>requisicion:</p>
                  <input
                    name='requisicion'
                    onChange={this.onChange}
                    value={this.state.requisicion}
                  />
                </div>
                <div className='fcc-i'>
                  <p className='fimpre'>tipo_doc:</p>
                  <input
                    name='tipo_doc'
                    onChange={this.onChange}
                    value={this.state.tipo_doc}
                  />
                </div>
                <div className='fcc-i'>
                  <p className='fimpre'>fechaContra:</p>
                  <input
                    name='fechaContra'
                    onChange={this.onChange}
                    value={this.state.fechaContra}
                  />
                </div>
                <div className='fcc-i'>
                  <p className='fimpre'>numContra:</p>
                  <input
                    name='numContra'
                    onChange={this.onChange}
                    value={this.state.numContra}
                  />
                </div>
                <div className='fcc-i'>
                  <p className='fimpre'>fechaDepo:</p>
                  <input
                    name='fechaDepo'
                    onChange={this.onChange}
                    value={this.state.fechaDepo}
                  />
                </div>
                <div className='fcc-i'>
                  <p className='fimpre'>cuentaPagar:</p>
                  <input
                    name='cuentaPagar'
                    onChange={this.onChange}
                    value={this.state.cuentaPagar}
                  />
                </div>
                <div className='fcc-i'>
                  <p className='fimpre'>cuentaPagarPara:</p>
                  <input
                    name='cuentaPagarPara'
                    onChange={this.onChange}
                    value={this.state.cuentaPagarPara}
                  />
                </div>
                <div className='fcc-i'>
                  <p className='fimpre'>sujetoContable:</p>
                  <input
                    name='sujetoContable'
                    onChange={this.onChange}
                    value={this.state.sujetoContable}
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
