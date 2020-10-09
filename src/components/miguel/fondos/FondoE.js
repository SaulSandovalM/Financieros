import React, { Component } from 'react'
import firebase from '../../../Firebase'
import { NumberAsString } from './NumerosLetras'
import { DropDownList } from '@progress/kendo-react-dropdowns'

export default class FondoE extends Component {
  constructor(props) {
    super(props)
    this.state = {
      key: '',
      fondo: '',
      fecha: '',
      tipo_doc: '',
      oficio_aut: '',
      no_oficio: '',
      no_lici: '',
      importe: '',
      desc: '',
      beneficiario: '',
      requisicion: '',
      pedido: '',
      ncomprobantes: '',
      poliza: '',
      cfe: '',
      nscfe: '',
      observaciones: '',
      numCompro: '',
      allowCustom: true,
    }
  }

  componentDidMount() {
    const ref = firebase.firestore().collection('fondos').doc(this.props.match.params.id)
    ref.get().then((doc) => {
      if (doc.exists) {
        const fondo = doc.data()
        this.setState({
          key: doc.id,
          fondo: fondo.fondo,
          fecha: fondo.fecha,
          tipo_doc: fondo.tipo_doc,
          oficio_aut: fondo.oficio_aut,
          no_oficio: fondo.no_oficio,
          no_lici: fondo.no_lici,
          importe: fondo.importe,
          desc: fondo.desc,
          beneficiario: fondo.beneficiario,
          requisicion: fondo.requisicion,
          pedido: fondo.pedido,
          ncomprobantes: fondo.ncomprobantes,
          poliza: fondo.poliza,
          cfe: fondo.cfe,
          nscfe: fondo.nscfe,
          observaciones: fondo.observaciones,
          numCompro: fondo.numCompro
        })
      } else {
        console.log('No such document!')
      }
    })
  }

  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value
    this.setState({board:state})
  }

  onSubmit = (e) => {
    e.preventDefault()
    const { fondo, fecha, tipo_doc, oficio_aut, no_oficio, no_lici, importe, desc,
            beneficiario, requisicion, pedido, ncomprobantes, poliza, cfe, nscfe,
            observaciones, numCompro } = this.state
    const updateRef = firebase.firestore().collection('fondos').doc(this.state.key)
    updateRef.set({
      fondo,
      fecha,
      tipo_doc,
      oficio_aut,
      no_oficio,
      no_lici,
      importe,
      desc,
      beneficiario,
      requisicion,
      pedido,
      ncomprobantes,
      poliza,
      cfe,
      nscfe,
      observaciones,
      numCompro
    }).then((docRef) => {
      this.setState({
        fondo: '',
        fecha: '',
        tipo_doc: '',
        oficio_aut: '',
        no_oficio: '',
        no_lici: '',
        importe: '',
        desc: '',
        beneficiario: '',
        requisicion: '',
        pedido: '',
        ncomprobantes: '',
        poliza: '',
        cfe: '',
        nscfe: '',
        observaciones: '',
        numCompro: ''
      })
      this.props.history.push('/Fondos')
    })
    .catch((error) => {
      console.error('Error al agregar documento: ', error)
    })
  }

  render() {
    const allowCustom = this.state.allowCustom

    return (
      <div className='zz'>
        <div className='m-f'>
          <h2 className='ed-f-h'>EDICION DE FONDO</h2>
          <form onSubmit={this.onSubmit}>
            <div className='f-f-c-w'>
              <div className='f-f'>
                <div className='f-f2'>
                  <p className='fp'>Fondo</p>
                  <input
                    className='f-b-s'
                    value={this.state.fondo}
                    required
                  />
                </div>
              </div>
              <div className='f-f'>
                <div className='f-f2'>
                  <p className='fp'>Fecha</p>
                  <input
                    className='f-b-s'
                    required
                    value={this.state.fecha}
                  />
                </div>
              </div>
              <div className='f-f'>
                <div className='f-f2'>
                  <p className='fp'>Tipo de Documento</p>
                    <DropDownList
                      suggest
                      style={{
                        borderColor: 'rgba(0,0,0,0.42)',
                        background: 'white',
                        height: '28px',
                        color: 'black',
                        position: 'static'
                      }}
                      data={this.tipo_doc}
                      allowCustom={allowCustom}
                      name='tipo_doc'
                      value={this.state.tipo_doc}
                      onChange={this.onChange}
                      required
                      ref='tipo_doc'
                    />
                </div>
              </div>
              <div className='f-f'>
                <div className='f-f2'>
                  <p className='fp'>Oficio de Autorización</p>
                  <DropDownList
                    suggest
                    style={{
                      borderColor: 'rgba(0,0,0,0.42)',
                      background: 'white',
                      height: '28px',
                      color: 'black',
                      position: 'static'
                    }}
                    data={this.oficio_aut}
                    allowCustom={allowCustom}
                    name='oficio_aut'
                    value={this.state.oficio_aut}
                    onChange={this.onChange}
                    required
                    ref='oficio_aut'
                  />
                </div>
              </div>
              <div className='f-f'>
                <div className='f-f2'>
                  <p className='fp'>No. de Oficio</p>
                  <input
                    className='f-b-s'
                    name='no_oficio'
                    value={this.state.no_oficio}
                    onChange={this.onChange}
                    required
                    ref='no_oficio'
                  />
                </div>
              </div>
              <div className='f-f'>
                <div className='f-f2'>
                  <p className='fp'>Importe</p>
                  <input
                    className='f-b-s'
                    name='importe'
                    value={this.state.importe}
                    onChange={this.onChange}
                    required
                    ref='importe'
                  />
                </div>
              </div>
              <div className='f-f'>
                <div className='f-ff'>
                  <p className='fpb'>Importe letra</p>
                  <input
                    className='f-b-s'
                    onChange={this.onChange}
                    value={(NumberAsString(this.state.importe))}
                  />
                </div>
              </div>
              <div className='f-f'>
                <div className='f-ff'>
                  <p className='fpb'>Beneficiario</p>
                  <DropDownList
                    suggest
                    style={{
                      borderColor: 'rgba(0,0,0,0.42)',
                      background: 'white',
                      height: '28px',
                      color: 'black',
                      position: 'static'
                    }}
                    data={this.beneficiario}
                    allowCustom={allowCustom}
                    name='beneficiario'
                    value={this.state.beneficiario}
                    onChange={this.onChange}
                    required
                    ref='beneficiario'
                  />
                </div>
              </div>
              <div className='f-f'>
                <div className='f-ff'>
                  <p className='fpb'>Descripción</p>
                  <input
                    className='f-b-s'
                    id='desc'
                    name='desc'
                    value={this.state.desc}
                    onChange={this.onChange}
                    required
                    ref='desc'
                  />
                </div>
              </div>
              <div className='f-f'>
                <div className='f-ff'>
                  <p className='fpb'>Num de Comprobantes</p>
                  <input
                    className='f-b-s'
                    id='numCompro'
                    name='numCompro'
                    value={this.state.ncomprobantes}
                    onChange={this.onChange}
                    required
                    ref='numCompro'
                  />
                </div>
              </div>
            </div>

            {/*<div className='l-f-c'>
              <div className='f-l-w'>
                <div className='l-w'>
                  <p className='lp'>Licitación</p>
                </div>
                <div className='f-f3'>
                  <p className='lp'>No. de Licitación</p>
                  <input
                    className='f-l-s'
                    id='no_lici'
                    name='no_lici'
                    value={this.state.no_lici}
                    onChange={this.onChange}
                    ref='no_lici'
                  />
                </div>
                <div className='f-f3'>
                  <p className='lp'>Requisición</p>
                  <input
                    className='f-l-s'
                    id='requisicion'
                    name='requisicion'
                    value={this.state.requisicion}
                    onChange={this.onChange}
                    ref='requisicion'
                  />
                </div>
                <div className='f-f3'>
                  <p className='lp'>Pedido</p>
                  <input
                    className='f-l-s'
                    id='pedido'
                    name='pedido'
                    value={this.state.pedido}
                    onChange={this.onChange}
                    ref='pedido'
                  />
                </div>
                <div className='f-f3'>
                  <p className='lp'>Poliza Comprometido</p>
                  <input
                    className='f-l-s'
                    id='poliza'
                    name='poliza'
                    value={this.state.poliza}
                    onChange={this.onChange}
                    ref='poliza'
                  />
                </div>
              </div>
              <div className='f-l-w'>
                <div className='l-w'>
                  <p className='lp'>Pago CFE</p>
                </div>
                <div className='f-f3'>
                  <p className='lp'>Cta CFE</p>
                  <input
                    className='f-l-s'
                    id='cfe'
                    name='cfe'
                    value={this.state.cfe}
                    onChange={this.onChange}
                    ref='cfe'
                  />
                </div>
                <div className='f-f3'>
                  <p className='lp'>No Servicio CFE</p>
                  <input
                    className='f-l-s'
                    id='nscfe'
                    name='nscfe'
                    value={this.state.nscfe}
                    onChange={this.onChange}
                    ref='nscfe'
                  />
                </div>
                <div className='f-f3'>
                  <p className='lp'>Observaciones</p>
                  <input
                    className='f-l-s'
                    id='observaciones'
                    name='observaciones'
                    value={this.state.observaciones}
                    onChange={this.onChange}
                    ref='observaciones'
                  />
                </div>
              </div>
            </div>*/}

            <div className='button-row-s'>
              <button onClick={this.perro} className='input-sc boton-g'>Guardar</button>
            </div>
          </form>
        </div>
      </div>
    )
  }
}
