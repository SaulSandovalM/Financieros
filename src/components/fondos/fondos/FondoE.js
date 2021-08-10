// importaciones necesarias
import React, { Component } from 'react'
import firebase from '../../../Firebase'
import Fab from '@material-ui/core/Fab'
import CheckIcon from '@material-ui/icons/Check'
import CloseIcon from '@material-ui/icons/Close'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import PropTypes from 'prop-types'
import MaskedInput from 'react-text-mask'
import NumberFormat from 'react-number-format'
import './Fondos.css'

export default class FondoE extends Component {
  constructor (props) {
    super(props)
    var URLactual = window.location
    var user = firebase.auth().currentUser
    var email
    if (user != null) {
      email = user.email
    }
    let admin
    if (email === 'nayra@procuraduria.com') {
      admin = 'NAYRA'
    } else if (email === 'laura@procuraduria.com') {
      admin = 'LAURA'
    } else if (email === 'miguel@procuraduria.com') {
      admin = 'MIGUEL'
    } else if (email === 'teresa@procuraduria.com') {
      admin = 'TERESA'
    } else if (email === 'marcos@procuraduria.com') {
      admin = 'MARCOS'
    } else if (email === 'eloy@procuraduria.com') {
      admin = 'ELOY'
    } else if (email === 'karina@procuraduria.com') {
      admin = 'KARINA'
    } else if (email === 'martha@procuraduria.com') {
      admin = 'MARTHA'
    } else if (email === 'lilia@procuraduria.com') {
      admin = 'LILIA'
    } else if (email === 'cenely@procuraduria.com') {
      admin = 'CENELY'
    } else if (email === 'hector@procuraduria.com') {
      admin = 'HECTOR'
    } else if (email === 'omar@procuraduria.com') {
      admin = 'OMAR'
    } else if (email === 'lizbeth@procuraduria.com') {
      admin = 'LIZBETH'
    }
    var today = new Date()
    var dd = today.getDate()
    var mm = today.getMonth() + 1
    var yyyy = today.getFullYear()
    if (dd < 10) {
      dd = '0' + dd
    }
    if (mm < 10) {
      mm = '0' + mm
    }
    today = dd + '/' + mm + '/' + yyyy
    this.ref = firebase.firestore().collection('fondos')
    this.state = {
      fondo: '',
      fecha: today,
      tipo_doc: '',
      oficio_aut: '',
      no_oficio: '',
      no_lici: ' ',
      importe: '',
      desc: '',
      beneficiario: '',
      realizo: admin,
      requisicion: ' ',
      pedido: ' ',
      no_proyecto: [],
      poliza: ' ',
      cfe: ' ',
      nscfe: ' ',
      observaciones: ' ',
      fondos: [],
      value: '',
      key: '',
      contador: {},
      f: '',
      searchF: '',
      nombre: '',
      oficio: [],
      baneficiarioc: [
        {
          id: 1,
          name: 'prueba',
          done: false
        }
      ],
      comprometidosp: '',
      urlfire: String(URLactual).substr(-20),
      anexof: '',
      oficios: '',
    }
  }

  componentDidMount () {
    const itemsRef = firebase.database().ref(`/fondos/${this.state.urlfire}`)
    this.listenForItems(itemsRef)
    const itemsRefBeneficiario = firebase.database().ref('beneficiario/')
    this.listenBeneficiario(itemsRefBeneficiario)
    var wishRef = firebase.database().ref('fondo/3q4t5w63q4fw3563')
    wishRef.on('value', (snapshot) => {
      let updatedWish = snapshot.val()
      this.setState({
        fondo: updatedWish.num
      })
      wishRef.set(updatedWish)
    })
    const itemsRefPre = firebase.database().ref('oficios/')
    this.listenForItemsP(itemsRefPre)
  }

  listenForItems = (itemsRef) => {
    itemsRef.on('value', (snap) => {
      var fondos = []
      fondos.push({
        fondo: snap.val().fondo,
        fecha: snap.val().fecha,
        tipo_doc: snap.val().tipo_doc,
        oficio_aut: snap.val().oficio_aut,
        no_oficio: snap.val().no_oficio,
        importe: snap.val().importe,
        beneficiario: snap.val().beneficiario,
        desc: snap.val().desc,
        numCompro: snap.val().numCompro,
        realizo: snap.val().realizo,
        no_lici: snap.val().no_lici,
        requisicion: snap.val().requisicion,
        pedido: snap.val().pedido,
        poliza: snap.val().poliza,
        cfe: snap.val().cfe,
        nscfe: snap.val().nscfe,
        observaciones: snap.val().observaciones,
        comprometido: snap.val().comprometido,
        cpa: snap.val().cpa,
        numCheque: snap.val().numCheque,
        fechaContra: snap.val().fechaContra,
        numContra: snap.val().numContra,
        fechaDepo: snap.val().fechaDepo,
        cuentaPagar: snap.val().cuentaPagar,
        cuentaPagarPara: snap.val().cuentaPagarPara,
        sujetoContable: snap.val().sujetoContable,
        anexof: snap.val().anexof,
        id: snap.key
      })
      this.setState({
        fondos: fondos
      })
    })
  }

  listenBeneficiario = (itemsRefBeneficiario) => {
    itemsRefBeneficiario.on('value', (snap) => {
      var baneficiarioc = []
      snap.forEach((child) => {
        baneficiarioc.push({
          nombre: child.val().nombre,
          id: child.key
        })
      })
      this.setState({
        baneficiarioc: baneficiarioc
      })
    })
  }

  listenForItemsP = (itemsRefPre) => {
    itemsRefPre.on('value', (snap) => {
      var oficio = []
      snap.forEach((child) => {
        oficio.push({
          oficio: child.val().oficio,
          id: child.key
        })
      })
      this.setState({
        oficio: oficio
      })
    })
  }

  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value
    this.setState(state)
  }

  update = () => {
    let updates = {}
    let item = this.state.urlfire
    updates['fondos/' + item] = {
      fondo: this.state.fondos[0].fondo,
      fecha: this.state.fondos[0].fecha,
      tipo_doc: this.state.tipo_doc ? this.state.tipo_doc : this.state.fondos[0].tipo_doc,
      oficio_aut: this.state.oficio_aut ? this.state.oficio_aut : this.state.fondos[0].oficio_aut,
      no_oficio: this.state.no_oficio ? this.state.no_oficio : this.state.fondos[0].no_oficio,
      importe: this.state.importe ? this.state.importe : this.state.fondos[0].importe,
      beneficiario: this.state.beneficiario ? this.state.beneficiario :this.state.fondos[0].beneficiario,
      desc: this.state.desc ? this.state.desc : this.state.fondos[0].desc,
      numCompro: this.state.numCompro ? this.state.numCompro : this.state.fondos[0].numCompro,
      realizo: this.state.fondos[0].realizo,
      no_lici: this.state.no_lici ? this.state.no_lici : this.state.fondos[0].no_lici,
      requisicion: this.state.requisicion ? this.state.requisicion : this.state.fondos[0].requisicion,
      pedido: this.state.pedido ? this.state.pedido : this.state.fondos[0].pedido,
      poliza: this.state.poliza ? this.state.poliza : this.state.fondos[0].poliza,
      cfe: this.state.cfe ? this.state.cfe : this.state.fondos[0].cfe,
      nscfe: this.state.nscfe ? this.state.nscfe : this.state.fondos[0].nscfe,
      observaciones: this.state.observaciones ? this.state.observaciones : this.state.fondos[0].observaciones,
      comprometido: this.state.fondos[0].comprometido,
      cpa: this.state.fondos[0].cpa,
      numCheque: this.state.numCheque ? this.state.numCheque : this.state.fondos[0].numCheque,
      fechaContra: this.state.fechaContra ? this.state.fechaContra : this.state.fondos[0].fechaContra,
      numContra: this.state.numContra ? this.state.numContra : this.state.fondos[0].numContra,
      fechaDepo: this.state.fechaDepo ? this.state.fechaDepo : this.state.fondos[0].fechaDepo,
      cuentaPagar: this.state.cuentaPagar ? this.state.cuentaPagar : this.state.fondos[0].cuentaPagar,
      cuentaPagarPara: this.state.cuentaPagarPara ? this.state.cuentaPagarPara : this.state.fondos[0].cuentaPagarPara,
      sujetoContable: this.state.sujetoContable ? this.state.sujetoContable : this.state.fondos[0].sujetoContable,
      anexof: this.state.anexof ? this.state.anexof : this.state.fondos[0].anexof
    }
    firebase.database().ref().update(updates)
    alert('Se ha actualizado el fondo')
  }

  cancel = () => {
    let updates = {}
    let item = this.state.urlfire
    updates['fondos/' + item] = {
      fondo: this.state.fondos[0].fondo,
      fecha: this.state.fondos[0].fecha,
      tipo_doc: this.state.tipo_doc ? this.state.tipo_doc : this.state.fondos[0].tipo_doc,
      oficio_aut: this.state.oficio_aut ? this.state.oficio_aut : this.state.fondos[0].oficio_aut,
      no_oficio: this.state.no_oficio ? this.state.no_oficio : this.state.fondos[0].no_oficio,
      importe: this.state.importe ? this.state.importe : this.state.fondos[0].importe,
      beneficiario: this.state.beneficiario ? this.state.beneficiario :this.state.fondos[0].beneficiario,
      desc: this.state.desc ? this.state.desc : this.state.fondos[0].desc,
      numCompro: this.state.numCompro ? this.state.numCompro : this.state.fondos[0].numCompro,
      realizo: this.state.fondos[0].realizo,
      no_lici: this.state.no_lici ? this.state.no_lici : this.state.fondos[0].no_lici,
      requisicion: this.state.requisicion ? this.state.requisicion : this.state.fondos[0].requisicion,
      pedido: this.state.pedido ? this.state.pedido : this.state.fondos[0].pedido,
      poliza: this.state.poliza ? this.state.poliza : this.state.fondos[0].poliza,
      cfe: this.state.cfe ? this.state.cfe : this.state.fondos[0].cfe,
      nscfe: this.state.nscfe ? this.state.nscfe : this.state.fondos[0].nscfe,
      observaciones: this.state.observaciones ? this.state.observaciones : this.state.fondos[0].observaciones,
      comprometido: this.state.fondos[0].comprometido,
      cpa: this.state.fondos[0].cpa,
      numCheque: this.state.numCheque ? this.state.numCheque : this.state.fondos[0].numCheque,
      fechaContra: this.state.fechaContra ? this.state.fechaContra : this.state.fondos[0].fechaContra,
      numContra: this.state.numContra ? this.state.numContra : this.state.fondos[0].numContra,
      fechaDepo: this.state.fechaDepo ? this.state.fechaDepo : this.state.fondos[0].fechaDepo,
      cuentaPagar: this.state.cuentaPagar ? this.state.cuentaPagar : this.state.fondos[0].cuentaPagar,
      cuentaPagarPara: this.state.cuentaPagarPara ? this.state.cuentaPagarPara : this.state.fondos[0].cuentaPagarPara,
      sujetoContable: this.state.sujetoContable ? this.state.sujetoContable : this.state.fondos[0].sujetoContable,
      anexof: this.state.anexof ? this.state.anexof : this.state.fondos[0].anexof
    }
    firebase.database().ref().update(updates)
    alert('Se ha actualizado el fondo')
  }

  render() {
    const { realizo } = this.state
    const newArray = ['']
    const myObj = {}

    this.state.oficio.forEach(el => {
      if (!(el in myObj)) {
        myObj[el + 1] = true
        newArray.push(el)
      }
    })

    return (
      <div>
        {this.state.fondo &&
          <form className='form-fondo'>
            <div className='grid-w'>
              <Grid className='grid-w2'>
                <Paper className='paper-pm'>
                  <div className='div-con-f'>Fondo</div>
                  <div className='div-f2'>
                    <div className='div-con'>
                      <p className='p-label'>Fondo</p>
                      <input
                        className='field'
                        value={this.state.fondos[0].fondo}
                        name='fondo'
                        ref='fondo'
                        required
                      />
                    </div>
                    <div className='div-con'>
                      <p className='p-label'>Fecha</p>
                      <input
                        className='field'
                        required
                        value={this.state.fondos[0].fecha}
                      />
                    </div>
                  </div>
                  <div className='div-f2'>
                    <div className='div-con'>
                      <p className='p-label'>Numero de Oficio</p>
                      <input
                        className='field'
                        name='no_oficio'
                        required
                        value={this.state.no_oficio ? this.state.no_oficio : this.state.fondos[0].no_oficio}
                        onChange={this.onChange}
                        ref='no_oficio'
                      />
                    </div>
                    <div className='div-con'>
                      <p className='p-label'>Oficio de Autorización</p>
                      <select
                        className='select-f'
                        value={this.state.oficio_aut ? this.state.oficio_aut : this.state.fondos[0].oficio_aut}
                        onChange={this.onChange}
                        name='oficio_aut'
                        required
                      >
                      {newArray.map(data =>
                        <option name={data}>{data.oficio}</option>
                      )}
                      </select>
                    </div>
                  </div>
                  <div className='div-f2'>
                    <div style={{ width: '99%' }}>
                      <div>
                        <p className='p-label'>Oficio Anexo F</p>
                        <input
                          style={{ width: '100%' }}
                          className='field'
                          id='anexof'
                          name='anexof'
                          onChange={this.onChange}
                          required
                          value={this.state.anexof ? this.state.anexof : this.state.fondos[0].anexof}
                          ref='anexof'
                        />
                      </div>
                    </div>
                  </div>
                </Paper>
              </Grid>
              <Grid className='grid2-cont'>
                <Paper className='paper-p'>
                  <div className='div-con-f'>Licitación</div>
                  <div className='div-f2'>
                    <div className='div-con'>
                      <p className='p-label'>Numero de Licitación</p>
                      {(realizo === 'KARINA' || realizo === 'LILIA' || realizo === 'CENELY' || realizo === 'HECTOR' || realizo === 'OMAR') ?
                        <input
                          className='field'
                          id='no_lici'
                          name='no_lici'
                          value={this.state.no_lici ? this.state.no_lici : this.state.fondos[0].no_lici}
                          onChange={this.onChange}
                          disabled
                          ref={no_lici => this.inputNoLici = no_lici}
                        />
                        :
                        <input
                          className='field'
                          id='no_lici'
                          name='no_lici'
                          value={this.state.no_lici ? this.state.no_lici : this.state.fondos[0].no_lici}
                          onChange={this.onChange}
                          ref={no_lici => this.inputNoLici = no_lici}
                        />
                      }
                    </div>
                    <div className='div-con'>
                      <p className='p-label'>Requisición</p>
                      {(realizo === 'KARINA' || realizo === 'LILIA' || realizo === 'CENELY' || realizo === 'HECTOR' || realizo === 'OMAR') ?
                        <input
                          className='field'
                          id='requisicion'
                          name='requisicion'
                          value={this.state.requisicion ? this.state.requisicion : this.state.fondos[0].requisicion}
                          onChange={this.onChange}
                          disabled
                          ref={requisicion => this.inputRequisicion = requisicion}
                        />
                        :
                        <input
                          className='field'
                          id='requisicion'
                          name='requisicion'
                          value={this.state.requisicion ? this.state.requisicion : this.state.fondos[0].requisicion}
                          onChange={this.onChange}
                          ref={requisicion => this.inputRequisicion = requisicion}
                        />
                      }
                    </div>
                  </div>
                  <div className='div-f2'>
                    <div className='div-con'>
                      <p className='p-label'>Pedido</p>
                      {(realizo === 'KARINA' || realizo === 'LILIA' || realizo === 'CENELY' || realizo === 'HECTOR' || realizo === 'OMAR') ?
                        <input
                          className='field'
                          id='pedido'
                          name='pedido'
                          value={this.state.pedido ? this.state.pedido : this.state.fondos[0].pedido}
                          onChange={this.onChange}
                          disabled
                          ref={pedido => this.inputPedido = pedido}
                        />
                        :
                        <input
                          className='field'
                          id='pedido'
                          name='pedido'
                          value={this.state.pedido ? this.state.pedido : this.state.fondos[0].pedido}
                          onChange={this.onChange}
                          ref={pedido => this.inputPedido = pedido}
                        />
                      }
                    </div>
                    <div className='div-con'>
                      <p className='p-label'>Poliza</p>
                      {(realizo === 'KARINA' || realizo === 'LILIA' || realizo === 'CENELY' || realizo === 'HECTOR' || realizo === 'OMAR') ?
                        <input
                          className='field'
                          id='poliza'
                          name='poliza'
                          value={this.state.poliza ? this.state.poliza : this.state.fondos[0].poliza}
                          onChange={this.onChange}
                          disabled
                          ref={poliza => this.inputPoliza = poliza}
                        />
                        :
                        <input
                          className='field'
                          id='poliza'
                          name='poliza'
                          value={this.state.poliza ? this.state.poliza : this.state.fondos[0].poliza}
                          onChange={this.onChange}
                          ref={poliza => this.inputPoliza = poliza}
                        />
                      }
                    </div>
                  </div>
                </Paper>
                <Paper className='paper-pm'>
                  <div className='div-con-f'>Pago CFE</div>
                  <div className='div-f2'>
                    <div className='div-con'>
                      <p className='p-label'>Cta CFE</p>
                      {(realizo === 'KARINA' || realizo === 'LILIA' || realizo === 'CENELY' || realizo === 'HECTOR' || realizo === 'OMAR') ?
                        <input
                          className='field'
                          id='cfe'
                          name='cfe'
                          value={this.state.cfe ? this.state.cfe : this.state.fondos[0].cfe}
                          onChange={this.onChange}
                          disabled
                          ref={cfe => this.inputCfe = cfe}
                        />
                        :
                        <input
                          className='field'
                          id='cfe'
                          name='cfe'
                          value={this.state.cfe ? this.state.cfe : this.state.fondos[0].cfe}
                          onChange={this.onChange}
                          ref={cfe => this.inputCfe = cfe}
                        />
                      }
                    </div>
                    <div className='div-con'>
                      <p className='p-label'>Numero de Servicio CFE</p>
                      {(realizo === 'KARINA' || realizo === 'LILIA' || realizo === 'CENELY' || realizo === 'HECTOR' || realizo === 'OMAR') ?
                        <input
                          className='field'
                          id='nscfe'
                          name='nscfe'
                          value={this.state.nscfe ? this.state.nscfe : this.state.fondos[0].nscfe}
                          onChange={this.onChange}
                          disabled
                          ref={nscfe => this.inputNscfe = nscfe}
                        />
                        :
                        <input
                          className='field'
                          id='nscfe'
                          name='nscfe'
                          value={this.state.nscfe ? this.state.nscfe : this.state.fondos[0].nscfe}
                          onChange={this.onChange}
                          ref={nscfe => this.inputNscfe = nscfe}
                        />
                      }
                    </div>
                  </div>
                  <div className='div-cfe' style={{ width: '100%' }}>
                    <p className='p-label'>Observaciones</p>
                    {(realizo === 'KARINA' || realizo === 'LILIA' || realizo === 'CENELY' || realizo === 'HECTOR' || realizo === 'OMAR') ?
                      <textarea
                        className='field'
                        id='observaciones'
                        name='observaciones'
                        value={this.state.observaciones ? this.state.observaciones : this.state.fondos[0].observaciones}
                        onChange={this.onChange}
                        disabled
                        ref={observaciones => this.inputObservaciones = observaciones}
                      />
                      :
                      <textarea
                        className='field'
                        id='observaciones'
                        name='observaciones'
                        value={this.state.observaciones ? this.state.observaciones : this.state.fondos[0].observaciones}
                        onChange={this.onChange}
                        ref={observaciones => this.inputObservaciones = observaciones}
                      />
                    }
                  </div>
                </Paper>
              </Grid>
              <div className='div-content-fabr'>
                <Fab color='primary' aria-label='add' style={{ background: 'red' }} onClick={this.cancel}>
                  <CloseIcon />
                </Fab>
              </div>
              <div className='div-content-fab'>
                <Fab color='primary' aria-label='add' style={{ background: 'green' }} onClick={this.update}>
                  <CheckIcon />
                </Fab>
              </div>
            </div>
          </form>
        }
      </div>
    )
  }
}

function TextMaskCustom(props) {
  const { inputRef, ...other } = props

  return (
    <MaskedInput
      {...other}
      ref={(ref) => {
        inputRef(ref ? ref.inputElement : null)
      }}
      mask={['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
      placeholderChar={'\u2000'}
      showMask
    />
  )
}

TextMaskCustom.propTypes = {
  inputRef: PropTypes.func.isRequired,
}

function NumberFormatCustom(props) {
  const { inputRef, onChange, ...other } = props

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        })
      }}
      thousandSeparator
      isNumericString
      prefix='$'
    />
  )
}

NumberFormatCustom.propTypes = {
  inputRef: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
}
