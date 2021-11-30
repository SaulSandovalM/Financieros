// importaciones necesarias
import React, { Component } from 'react'
import firebase from '../../../Firebase'
import Fab from '@material-ui/core/Fab'
import SaveIcon from '@material-ui/icons/Save'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import PropTypes from 'prop-types'
import MaskedInput from 'react-text-mask'
import NumberFormat from 'react-number-format'
import './Fondos.css'
import { Link } from 'react-router-dom'

export default class Fondos extends Component {
  constructor (props) {
    super(props)
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
      desc: ' ',
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
      otherOficio: ' ',
      baneficiarioc: [
        {
          id: 1,
          name: 'prueba',
          done: false
        }
      ],
      comprometidosp: '',
      oficios: '',
      anexof: '',
    }
  }

  componentDidMount () {
    const itemsRef = firebase.database().ref('fondos/')
    this.listenForItems(itemsRef)
    const itemsRefBeneficiario = firebase.database().ref('beneficiario/').orderByChild('nombre')
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
      snap.forEach((child) => {
        fondos.push({
          fondo: child.val().fondo,
          tipo_doc: child.val().tipo_doc,
          fecha: child.val().fecha,
          realizo: child.val().realizo,
          id: child.key
        })
      })
      this.setState({
        fondos: fondos
      })
    })
  }

  crearFondo (e) {
    e.preventDefault()
    const params = {
      fondo: this.inputFondo.value,
      fecha: this.inputFecha.value,
      tipo_doc: this.inputTipoDoc.value,
      oficio_aut: this.inputOficioAut.value,
      otherOficio: this.inputOtherOficio.value,
      no_oficio: this.inputNoOficio.value,
      importe: ' ',
      beneficiario: ' ',
      desc: ' ',
      numCompro: ' ',
      realizo: this.state.realizo,
      anexof: this.inputAnexof.value ? this.inputAnexof.value : ' ',
      // datos no obligatorios
      no_lici: this.inputNoLici.value,
      requisicion: this.inputRequisicion.value,
      pedido: this.inputPedido.value,
      poliza: this.inputPoliza.value,
      cfe: this.inputCfe.value,
      nscfe: this.inputNscfe.value,
      observaciones: this.inputObservaciones.value,
      comprometido: [''],
      cpa: [''],
      numCheque: ' ',
      fechaContra: ' ',
      numContra: ' ',
      fechaDepo: ' ',
      cuentaPagar: ' ',
      cuentaPagarPara: ' ',
      sujetoContable: ' '
    }
    if (params.fondo && params.fecha && params.tipo_doc && params.oficio_aut &&
      params.no_oficio && params.importe && params.desc && params.beneficiario &&
      params.numCompro && params.realizo && params.no_lici && params.requisicion &&
      params.pedido && params.poliza && params.cfe && params.nscfe && params.observaciones &&
      params.fechaContra && params.numContra && params.fechaDepo && params.cuentaPagar &&
      params.cuentaPagarPara && params.sujetoContable && params.comprometido && params.cpa && params.anexof) {
      firebase.database().ref('fondos').push(params).then(() => {
        alert('Tu solicitud fue enviada.')
        //this.incrementFondo()
        this.order()
      }).catch(() => {
        alert('Tu solicitud no puede ser enviada')
      })
    } else {
      alert('Por favor llene el formulario')
    }
  }

  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value
    this.setState(state)
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

  incrementFondo = () => {
    const wishRef = firebase.database().ref('fondo/3q4t5w63q4fw3563')
    wishRef.once('value').then(snapshot => {
      let updatedWish = snapshot.val()
      this.setState({
        fondo: updatedWish.num
      })
      updatedWish.num = updatedWish.num + 1
      wishRef.set(updatedWish)
    })
  }

  order = () => {
    var prueba
    firebase.database().ref('fondos').limitToLast(1).on('child_added', function(childSnapshot) {
      prueba = childSnapshot.key
    })
    this.setState({
      comprometidosp: prueba
    })
    this.props.history.push(`/Comprometidos/${this.state.comprometidosp}`);
  }

  crearBeneficiario (e) {
    e.preventDefault()
    const params = {
      nombre: this.state.nombre
    }
    this.setState({
      nombre: ''
    })
    if (params.nombre) {
      firebase.database().ref('beneficiario').push(params).then(() => {
        alert('Tu solicitud fue enviada.')
      }).catch(() => {
        alert('Tu solicitud no puede ser enviada')
      })
    } else {
      alert('Por favor llene el formulario')
    }
  }

  beneficiario2 = ['', 'Mtro.León Maximiliano Hernández Valdés']
  tipo_doc = ['','Pago Directo', 'Fondo Revolvente', 'Gasto a Comprobar']
  tipo_doc2 = ['','Pago Directo']
  tipo_doc3 = ['','Fondo Revolvente']

  render () {
    const { fondo, fecha, tipo_doc, oficio_aut, no_oficio, no_lici,
      realizo, requisicion, pedido, poliza, cfe, nscfe,
      observaciones, anexof, otherOficio } = this.state
    const newArray = ['']
    const myObj = {}

    this.state.oficio.filter(el => {
      if (!(el in myObj) && el.oficio !== undefined) {
        myObj[el + 1] = true
        newArray.push(el)
      }
    })
    const aarr = []
    newArray.map(item => {
      return aarr.push(item.oficio)
    })
    let result = aarr.filter((item,index)=>{
      return aarr.indexOf(item) === index
    })

    console.log(this.state.realizo)

    return (
      <div>
        <form className='form-fondo' onSubmit={this.crearFondo.bind(this)}>
          <Grid className='grid-w'>
            <Grid className='grid-w2'>
              <Paper className='paper-p'>
                <div className='div-con-f'>Buscador de Fondos</div>
                <div className='head-search'>
                  <div className='inp-sea-cont'>
                    <p className='inp-p-t'>Num. Fondo</p>
                  </div>
                  <div className='inp-sea-cont'>
                    <p className='inp-p-t'>Tipo de Doc.</p>
                  </div>
                  <div className='inp-sea-cont'>
                    <p className='inp-p-t'>Fecha</p>
                  </div>
                  <div className='inp-sea-cont'>
                    <p className='inp-p-t'>Nombre R.</p>
                  </div>
                  <div className='inp-sea-cont'>
                    <p className='inp-p-t'>Editar F.</p>
                  </div>
                  <div className='inp-sea-cont'>
                    <p className='inp-p-t'>Editar C.</p>
                  </div>
                  <div className='inp-sea-cont'>
                    <p className='inp-p-t'>Oficios</p>
                  </div>
                </div>
                <div className='head-search'>
                  <div className='inp-sea-cont'>
                    <input
                      style={{ width: '85%' }}
                      className='field'
                      name='searchF'
                      value={this.state.searchF}
                      onChange={this.onChange}
                    />
                  </div>
                  <div className='cont-w-data'>
                    {this.state.fondos.map(fondos =>
                      <div className='cont-map-fondo'>
                        {(this.state.searchF === fondos.fondo &&
                          ((fondos.tipo_doc === 'Pago Directo' &&
                            (this.state.realizo === 'KARINA' ||
                              this.state.realizo === 'LILIA' ||
                              this.state.realizo === 'CENELY' ||
                              this.state.realizo === 'HECTOR' ||
                              this.state.realizo === 'MIGUEL' ||
                              this.state.realizo === 'LAURA' ||
                              this.state.realizo === 'TERESA' ||
                              this.state.realizo === 'MARCOS' ||
                              this.state.realizo === 'ELOY' ||
                              this.state.realizo === 'MARTHA' ||
                              this.state.realizo === 'LIZBETH'
                            )
                          )
                          ||
                          (fondos.tipo_doc === 'Fondo Revolvente' &&
                            (this.state.realizo === 'TERESA' ||
                              this.state.realizo === 'MARCOS' ||
                              this.state.realizo === 'ELOY' ||
                              this.state.realizo === 'MARTHA' ||
                              this.state.realizo === 'MIGUEL' ||
                              this.state.realizo === 'LIZBETH'
                            )
                          ))
                        ) &&
                          <div className='cont-map-data'>
                            <div className='data-w-search'>
                              <p className='data-m-f'>{fondos.tipo_doc}</p>
                            </div>
                            <div className='editar-option'>
                              <p className='data-m-f'>{fondos.fecha}</p>
                            </div>
                            <div className='data-w-search'>
                              <p className='data-m-f'>{fondos.realizo}</p>
                            </div>
                            <div className='data-w-search'>
                              <Link className='data-m-f' to={`/FondoE/${fondos.id}`}>Editar</Link>
                            </div>
                            <div className='data-w-search'>
                              <Link className='data-m-f' to={`/Comprometidos/${fondos.id}`}>Editar</Link>
                            </div>
                            <div className='data-w-search'>
                              <Link className='data-m-f' to={`/Oficios/${fondos.id}`}>Imprimir</Link>
                            </div>
                          </div>
                        }
                      </div>
                    )}
                  </div>
                </div>
              </Paper>
            </Grid>
            <Grid className='grid-w2'>
              <Paper className='paper-pm'>
                <div className='div-con-f'>Fondos</div>
                <div className='div-f2'>
                  <div className='div-con'>
                    <p className='p-label'>Fondo</p>
                    <input
                      className='field'
                      id='fondo'
                      name='fondo'
                      value={fondo}
                      onChange={this.onChange}
                      ref={fondo => this.inputFondo = fondo}
                      required
                    />
                  </div>
                  <div className='div-con'>
                    <p className='p-label'>Fecha</p>
                    <input
                      className='field'
                      id='fecha'
                      name='fecha'
                      value={fecha}
                      onChange={this.onChange}
                      ref={fecha => this.inputFecha = fecha}
                      required
                    />
                  </div>
                </div>
                <div className='div-f2'>
                  <div className='div-con'>
                    <p className='p-label'>Tipo de Documento</p>
                    {(realizo === 'MIGUEL' || realizo === 'ELOY' || realizo === 'TERESA' || realizo === 'MARTHA' || realizo === 'LIZBETH') &&
                      <select
                        className='select-f'
                        id='tipo_doc'
                        name='tipo_doc'
                        value={tipo_doc}
                        onChange={this.onChange}
                        ref={tipo_doc => this.inputTipoDoc = tipo_doc}
                        required
                      >
                        {this.tipo_doc.map((x,y) =>
                          <option name={y}>{x}</option>
                        )}
                      </select>
                    }
                    {(realizo === 'MARCOS') &&
                      <select
                        className='select-f'
                        id='tipo_doc'
                        name='tipo_doc'
                        value={tipo_doc}
                        onChange={this.onChange}
                        ref={tipo_doc => this.inputTipoDoc = tipo_doc}
                        required
                      >
                        {this.tipo_doc3.map((x,y) =>
                          <option name={y}>{x}</option>
                        )}
                      </select>
                    }
                    {(realizo === 'KARINA' || realizo === 'LILIA' || realizo === 'CENELY' || realizo === 'HECTOR' || realizo === 'OMAR' || realizo === 'LAURA') &&
                      <select
                        className='select-f'
                        id='tipo_doc'
                        name='tipo_doc'
                        value={tipo_doc}
                        onChange={this.onChange}
                        ref={tipo_doc => this.inputTipoDoc = tipo_doc}
                        required
                      >
                        {this.tipo_doc2.map((x,y) =>
                          <option name={y}>{x}</option>
                        )}
                      </select>
                    }
                  </div>
                  <div className='div-conn'>
                    <div style={{ width: '60%' }}>
                      <p className='p-label'>Oficio de Autorización</p>
                      <select
                        className='select-f'
                        id='oficio_aut'
                        name='oficio_aut'
                        value={oficio_aut}
                        onChange={this.onChange}
                        ref={oficio_aut => this.inputOficioAut = oficio_aut}
                        required
                      >
                      {result.map(data =>
                        <option name={data}>{data}</option>
                      )}
                      </select>
                    </div>
                    <div style={{ width: '40%' }}>
                      <p className='p-label'>Ingrese Oficio</p>
                      <input
                        className='input-ext'
                        maxLength={18}
                        id='otherOficio'
                        name='otherOficio'
                        value={otherOficio}
                        onChange={this.onChange}
                        ref={otherOficio => this.inputOtherOficio = otherOficio}
                      />
                    </div>
                  </div>
                </div>
                <div className='div-f2'>
                  <div className='div-con'>
                    <p className='p-label'>Numero de Oficio</p>
                    <input
                      className='field'
                      id='no_oficio'
                      name='no_oficio'
                      value={no_oficio}
                      onChange={this.onChange}
                      ref={no_oficio => this.inputNoOficio = no_oficio}
                      required
                    />
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
                        value={anexof}
                        onChange={this.onChange}
                        ref={anexof => this.inputAnexof = anexof}
                        required={tipo_doc === 'Pago Directo' ? true : false}
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
                    {(realizo === 'KARINA' || realizo === 'LILIA' || realizo === 'CENELY' || realizo === 'HECTOR' || realizo === 'OMAR' || realizo === 'LAURA') ?
                      <input
                        className='field'
                        id='no_lici'
                        name='no_lici'
                        value={no_lici}
                        onChange={this.onChange}
                        disabled
                        ref={no_lici => this.inputNoLici = no_lici}
                      />
                      :
                      <input
                        className='field'
                        id='no_lici'
                        name='no_lici'
                        value={no_lici}
                        onChange={this.onChange}
                        ref={no_lici => this.inputNoLici = no_lici}
                      />
                    }
                  </div>
                  <div className='div-con'>
                    <p className='p-label'>Requisición</p>
                    {(realizo === 'KARINA' || realizo === 'LILIA' || realizo === 'CENELY' || realizo === 'HECTOR' || realizo === 'OMAR' || realizo === 'LAURA') ?
                      <input
                        className='field'
                        id='requisicion'
                        name='requisicion'
                        value={requisicion}
                        onChange={this.onChange}
                        disabled
                        ref={requisicion => this.inputRequisicion = requisicion}
                      />
                      :
                      <input
                        className='field'
                        id='requisicion'
                        name='requisicion'
                        value={requisicion}
                        onChange={this.onChange}
                        ref={requisicion => this.inputRequisicion = requisicion}
                      />
                    }
                  </div>
                </div>
                <div className='div-f2'>
                  <div className='div-con'>
                    <p className='p-label'>Pedido</p>
                    {(realizo === 'KARINA' || realizo === 'LILIA' || realizo === 'CENELY' || realizo === 'HECTOR' || realizo === 'OMAR' || realizo === 'LAURA') ?
                      <input
                        className='field'
                        id='pedido'
                        name='pedido'
                        value={pedido}
                        onChange={this.onChange}
                        disabled
                        ref={pedido => this.inputPedido = pedido}
                      />
                      :
                      <input
                        className='field'
                        id='pedido'
                        name='pedido'
                        value={pedido}
                        onChange={this.onChange}
                        ref={pedido => this.inputPedido = pedido}
                      />
                    }
                  </div>
                  <div className='div-con'>
                    <p className='p-label'>Poliza</p>
                    {(realizo === 'KARINA' || realizo === 'LILIA' || realizo === 'CENELY' || realizo === 'HECTOR' || realizo === 'OMAR' || realizo === 'LAURA') ?
                      <input
                        className='field'
                        id='poliza'
                        name='poliza'
                        value={poliza}
                        onChange={this.onChange}
                        disabled
                        ref={poliza => this.inputPoliza = poliza}
                      />
                      :
                      <input
                        className='field'
                        id='poliza'
                        name='poliza'
                        value={poliza}
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
                    {(realizo === 'KARINA' || realizo === 'LILIA' || realizo === 'CENELY' || realizo === 'HECTOR' || realizo === 'OMAR' || realizo === 'LAURA') ?
                      <input
                        className='field'
                        id='cfe'
                        name='cfe'
                        value={cfe}
                        onChange={this.onChange}
                        disabled
                        ref={cfe => this.inputCfe = cfe}
                      />
                      :
                      <input
                        className='field'
                        id='cfe'
                        name='cfe'
                        value={cfe}
                        onChange={this.onChange}
                        ref={cfe => this.inputCfe = cfe}
                      />
                    }
                  </div>
                  <div className='div-con'>
                    <p className='p-label'>Numero de Servicio CFE</p>
                    {(realizo === 'KARINA' || realizo === 'LILIA' || realizo === 'CENELY' || realizo === 'HECTOR' || realizo === 'OMAR' || realizo === 'LAURA') ?
                      <input
                        className='field'
                        id='nscfe'
                        name='nscfe'
                        value={nscfe}
                        onChange={this.onChange}
                        disabled
                        ref={nscfe => this.inputNscfe = nscfe}
                      />
                      :
                      <input
                        className='field'
                        id='nscfe'
                        name='nscfe'
                        value={nscfe}
                        onChange={this.onChange}
                        ref={nscfe => this.inputNscfe = nscfe}
                      />
                    }
                  </div>
                </div>
                <div className='div-cfe' style={{ width: '100%' }}>
                  <p className='p-label'>Observaciones</p>
                  {(realizo === 'KARINA' || realizo === 'LILIA' || realizo === 'CENELY' || realizo === 'HECTOR' || realizo === 'OMAR' || realizo === 'LAURA') ?
                    <textarea
                      className='field'
                      id='observaciones'
                      name='observaciones'
                      value={observaciones}
                      onChange={this.onChange}
                      disabled
                      ref={observaciones => this.inputObservaciones = observaciones}
                    />
                    :
                    <textarea
                      className='field'
                      id='observaciones'
                      name='observaciones'
                      value={observaciones}
                      onChange={this.onChange}
                      ref={observaciones => this.inputObservaciones = observaciones}
                    />
                  }
                </div>
              </Paper>
            </Grid>
          </Grid>
          <div className='div-content-fab'>
            {!this.state.comprometidosp &&
              <Fab color='primary' aria-label='add' type='submit'>
                <SaveIcon />
              </Fab>
            }
          </div>
        </form>
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
