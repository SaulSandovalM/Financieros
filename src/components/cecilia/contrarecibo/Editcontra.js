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
      sujetoContable: ''
    }
  }

  componentDidMount () {
    const ref = firebase.firestore().collection('fondos').doc(this.props.match.params.id).collection('contrarecibo').doc()
    ref.get().then((doc) => {
      if (doc.exists) {
        const contra = doc.data();
        this.setState({
          key: doc.id,
          title: contra.title,
          fechaContra: contra.fechaContra,
          numContra: contra.numContra,
          fechaDepo: contra.fechaDepo,
          cuentaPagar: contra.cuentaPagar,
          cuentaPagarPara: contra.cuentaPagarPara,
          beneficiario: contra.beneficiario,
          sujetoContable: contra.sujetoContable
        });
      } else {
        console.log('No hay documento');
      }
    });
  }

  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState({ contra: state });
  }

  onSubmit = (e) => {
    e.preventDefault()
    const { fechaContra, numContra, fechaDepo, cuentaPagar, cuentaPagarPara, beneficiario, sujetoContable } = this.state
    const updateRef = firebase.firestore().collection('fondos').doc(this.props.match.params.id).collection('contrarecibo').doc()
    updateRef.set({
      fechaContra,
      numContra,
      fechaDepo,
      cuentaPagar,
      cuentaPagarPara,
      beneficiario,
      sujetoContable
    }).then((docRef) => {
      this.setState({
        fechaContra: '',
        numContra: '',
        fechaDepo: '',
        cuentaPagar: '',
        cuentaPagarPara: '',
        beneficiario: '',
        sujetoContable: ''
      })
    })
    .catch((error) => {
      console.error('Error: ', error)
    })
    alert('Tu solicitud fue enviada.')
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
                  <p className='fimpre'>Fecha Contrarecibo:</p>
                  <input
                    name='fechaContra'
                    value={this.state.fechaContra}
                    onChange={this.onChange}
                    ref='fechaContra'
                  />
                </div>
                <div className='fcc-i'>
                  <p className='fimpre'>No. Contrarecibo:</p>
                  <input
                    name='numContra'
                    value={this.state.numContra}
                    onChange={this.onChange}
                    ref='numContra'
                  />
                </div>
                <div className='fcc-i'>
                  <p className='fimpre'>Fecha Deposito:</p>
                  <input
                    name='fechaDepo'
                    value={this.state.fechaDepo}
                    onChange={this.onChange}
                    ref='fechaDepo'
                  />
                </div>
                <div className='fcc-i'>
                  <p className='fimpre'>Cuenta por Pagar:</p>
                  <input
                    name='cuentaPagar'
                    value={this.state.cuentaPagar}
                    onChange={this.onChange}
                    ref='cuentaPagar'
                  />
                </div>
                <div className='fcc-i'>
                  <p className='fimpre'>Cuenta por Pagar Para:</p>
                  <input
                    name='cuentaPagarPara'
                    value={this.state.cuentaPagarPara}
                    onChange={this.onChange}
                    ref='cuentaPagarPara'
                  />
                </div>
                <div className='fcc-i'>
                  <p className='fimpre'>Beneficiario/Proveedor:</p>
                  <input
                    name='beneficiario'
                    value={this.state.beneficiario}
                    onChange={this.onChange}
                    ref='beneficiario'
                  />
                </div>
                <div className='fcc-i'>
                  <p className='fimpre'>Sujeto Contable:</p>
                  <input
                    name='sujetoContable'
                    value={this.state.sujetoContable}
                    onChange={this.onChange}
                    ref='sujetoContable'
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
