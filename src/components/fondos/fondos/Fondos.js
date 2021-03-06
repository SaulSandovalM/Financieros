import React, { Component } from 'react'
import firebase from '../../../Firebase'
import { NumberAsString } from './NumerosLetras'
import Fab from '@material-ui/core/Fab'
import CheckIcon from '@material-ui/icons/Check'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import PropTypes from 'prop-types'
import MaskedInput from 'react-text-mask'
import NumberFormat from 'react-number-format'
import './Fondos.css'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import Chip from '@material-ui/core/Chip'
import CurrencyFormat from 'react-currency-format'
import { Link } from 'react-router-dom'

export default class Fondos extends Component {
  constructor(props) {
    super(props)
    var user = firebase.auth().currentUser
    var email
    if (user != null) {
      email = user.email
    }
    let admin
    if (email === 'administrador@procu.com') {
      admin = 'ADMIN'
    } else if (email === 'nayra@procuraduria.com') {
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
    this.unsubscribe = null
    this.state = {
      fondo: '',
      fecha: today,
      tipo_doc: '',
      oficio_aut: '',
      no_oficio: '',
      no_lici: '',
      importe: '',
      desc: '',
      beneficiario: '',
      realizo: admin,
      requisicion: '',
      pedido: '',
      no_proyecto: [],
      poliza: '',
      cfe: '',
      nscfe: '',
      observaciones: '',
      numProy: '',
      fondos: [],
      value: '',
      key: '',
      contador: {},
      f: '',
      personName: [],
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
    }
  }

  onCollectionUpdate = (querySnapshot) => {
    const fondos = []
    querySnapshot.forEach((doc) => {
      const {
        fondo,
        tipo_doc,
        importe,
        fecha,
        realizo,
        contrarecibo
      } = doc.data()
      fondos.push({
        key: doc.id,
        doc,
        fondo,
        tipo_doc,
        importe,
        realizo,
        fecha,
        contrarecibo
      })
    })
    this.setState({
      fondos
    })
  }

  onCollectionGet = (querySnapshot) => {
    const fondos = []
    querySnapshot.forEach((doc) => {
      const {
        fondo,
        tipo_doc,
        importe,
        fecha,
        realizo,
        contrarecibo
      } = doc.data()
      fondos.push({
        key: doc.id,
        doc,
        fondo,
        tipo_doc,
        importe,
        realizo,
        fecha,
        contrarecibo
      })
    })
    this.setState({
      fondos
    })
  }

  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value
    this.setState(state)
  }

  onSubmit = (e) => {
    e.preventDefault()
    const {
      fondo,
      fecha,
      tipo_doc,
      oficio_aut,
      no_oficio,
      no_lici,
      importe,
      desc,
      beneficiario,
      realizo,
      requisicion,
      pedido,
      no_proyecto,
      poliza,
      cfe,
      nscfe,
      observaciones,
      numCompro
    } = this.state
    this.ref.add({
        fondo,
        fecha,
        tipo_doc,
        oficio_aut,
        no_oficio,
        no_lici,
        importe,
        desc,
        beneficiario,
        realizo,
        requisicion,
        pedido,
        no_proyecto,
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
          realizo: '',
          requisicion: '',
          pedido: '',
          no_proyecto: [],
          poliza: '',
          cfe: '',
          nscfe: '',
          observaciones: '',
          numCompro: ''
        })
        this.incrementFondo()
        this.order()
      })
      .catch((error) => {
        console.error('Error al guardar: ', error)
      })
  }

  listenForItems = (itemsRef) => {
    itemsRef.on('value', (snap) => {
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
          of: child.val().of,
          id: child.key
        })
      })
      this.setState({
        oficio: oficio
      })
    })
  }

  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate)
    var wishRef = firebase.database().ref('fondo/3q4t5w63q4fw3563')
    wishRef.on('value', (snapshot) => {
      let updatedWish = snapshot.val()
      this.setState({
        fondo: updatedWish.num
      })
      wishRef.set(updatedWish)
    })
    const itemsRef = firebase.database().ref('beneficiario/')
    this.listenForItems(itemsRef)
    // Consumo de Oficios
    const itemsRefPre = firebase.database().ref('presupuesto/')
    this.listenForItemsP(itemsRefPre)
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
    firebase.firestore().collection('fondos').orderBy('fondo', 'desc').limit(1).get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          this.setState({
            f: doc.id
          })
          console.log(this.state.f)
          this.props.history.push(`/Comprometidos/${this.state.f}`)
        })
      })
      .catch(err => {
        console.log('Error getting documents', err)
      })
  }

  handleChange (event) {
    this.setState({ [event.target.name]: event.target.value })
  }

  sendName (e) {
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
  tipo_doc = ['','Pago Directo', 'Fondo Revolvente', 'Gasto a Comprobar', 'Cancelado', 'Licitación']
  tipo_doc2 = ['','Fondo Revolvente', 'Pago Directo']
  tipo_doc3 = ['','Pago Directo']
  tipo_doc4 = ['','Fondo Revolvente']
  no_proyecto = [
    '',
    'AU001, Atención y seguimiento a peticiones recibidas en el despacho del procurador atendidas, up: 01',
    'AU002, Casos penales de la región oriente resueltas, up: 02',
    'AU003, Delitos cometidos en contra de la libertad de expresión, periodistas y personas defensoras de los derechos humanos investigados, up: 03',
    'AU004, Averiguaciones previas del sistema tradicional concluidas, up: 04',
    'AU005, Casos penales en materia de delitos electorales resueltos, up: 05',
    'AU006, Casos penales determinados, concluidos o resueltos en delitos que atenten contra la mujer y la familia, up: 06',
    'AU007, Acuerdos reparatorios generados a través de la aplicación de los mecanismos alternativos de solución de controversias en materia penal en la región poniente, up: 07',
    'AU008, Investigación y supervisión de los casos penales con motivo de feminicidio, up: 08',
    'AU009, Quejas y denuncias por la posible comisión de conductas indebidas en las que incurran las y los servidores públicos atendidas, up: 09',
    'AU010, Intervenciones periciales a autoridades de procuración de justicia para una correcta integración del expediente en casos penales entregados, up: 10',
    'AU011, Casos penales del delito de narcomenudeo resueltos, up: 11',
    'AU012, Casos penales atendidos por los delitos de secuestro y extorsión, up: 12',
    'AU013, Gestión administrativa de recursos humanos,financiera, materiales, de informática, de archivo, de calidad, de aportaciones federales, planeación estratégica realizada, up: 13',
    'AU014, Determinación y/o resolución de los casos penales de los delitos de trata de personas, lenocinio y delitos conexos, up: 14',
    'AU015, Casos penales de la región poniente resueltas, up: 15',
    'AU016, Atenciones ciudadanas en los módulos de atención temprana en la región poniente brindadas, up: 16',
    'AU017, Determinación en las carpetas de investigación en las unidades de investigación de la regiones poniente, up: 17',
    'AU018, Investigación policial ejecutada, up: 18',
    'AU019, Atenciones ciudadanas en los módulos de atención temprana en la región poniente brindadas, up: 20',
    'AU020, Acuerdos reparatorios generados a traves de la aplicación de los mecanismos alternativos de solución de controversias en materia penal en la región oriente, up: 21',
    'AU021, Determinación en las carpetas de investigación en las unidades de investigación de la regiones oriente, up: 22',
    'AU022, Delitos de corrupción resueltos, up: 23',
    'AU023, Casos penales determinados, concluidos o resueltos de delitos en materia de desaparición forzada de personas cometidos por particulares, delitos vinculados y de personas no localizadas realizados, up: 24',
    'A1D11, Centralizada'
  ]

  render() {
    const { tipo_doc, oficio_aut, importe, beneficiario, no_proyecto, realizo, fecha } = this.state
    const newArray = ['']
    const myObj = {}

    this.state.oficio.forEach(el => {
      if (!(el in myObj)) {
        myObj[el] = true
        newArray.push(el)
      }
    })

    return (
      <div>
        <form className='form-fondo' onSubmit={this.onSubmit}>
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
                    <p className='inp-p-t'>Importe</p>
                  </div>
                  <div className='inp-sea-cont'>
                    <p className='inp-p-t'>Nompre R.</p>
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
                      onChange={this.handleChange.bind(this)}
                    />
                  </div>
                  <div className='cont-w-data'>
                    {this.state.fondos.map(fondos =>
                      <div className='cont-map-fondo'>
                        {parseInt(this.state.searchF, 10) === fondos.fondo &&
                          <div className='cont-map-data'>
                            <div className='data-w-search'>
                              <p className='data-m-f'>{fondos.tipo_doc}</p>
                            </div>
                            <div className='editar-option'>
                              <CurrencyFormat
                                value={fondos.importe}
                                displayType='text'
                                prefix=' $ '
                                thousandSeparator
                                decimalSeparator='.'
                              />
                            </div>
                            <div className='data-w-search'>
                              <p className='data-m-f'>{fondos.realizo}</p>
                            </div>
                            <div className='data-w-search'>
                              <Link className='data-m-f' to={`/FondoE/${fondos.key}`}>Editar</Link>
                            </div>
                            <div className='data-w-search'>
                              <Link className='data-m-f' to={`/Comprometidos/${fondos.key}`}>Editar</Link>
                            </div>
                            <div className='data-w-search'>
                              <Link className='data-m-f' to={`/Oficios/${fondos.key}`}>Imprimir</Link>
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
                      value={this.state.fondo}
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
                      value={fecha}
                    />
                  </div>
                </div>
                <div className='div-f2'>
                  <div className='div-con'>
                    <p className='p-label'>Tipo de Documento</p>
                    {(realizo === 'MIGUEL' || realizo === 'ELOY' || realizo === 'TERESA' || realizo === 'MARTHA') &&
                      <select
                        className='select-f'
                        value={tipo_doc}
                        onChange={this.onChange}
                        name='tipo_doc'
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
                        value={tipo_doc}
                        onChange={this.onChange}
                        name='tipo_doc'
                        required
                      >
                        {this.tipo_doc4.map((x,y) =>
                          <option name={y}>{x}</option>
                        )}
                      </select>
                    }
                    {(realizo === 'KARINA' || realizo === 'LILIA' || realizo === 'CENELY' || realizo === 'HECTOR' || realizo === 'OMAR') &&
                      <select
                        className='select-f'
                        value={tipo_doc}
                        onChange={this.onChange}
                        name='tipo_doc'
                        required
                      >
                        {this.tipo_doc3.map((x,y) =>
                          <option name={y}>{x}</option>
                        )}
                      </select>
                    }
                  </div>
                  <div className='div-con'>
                    <p className='p-label'>Oficio de Autorización</p>
                    <select
                      className='select-f'
                      value={oficio_aut}
                      onChange={this.onChange}
                      name='oficio_aut'
                      required
                    >
                    {newArray.map(data =>
                      <option name={data}>{data.of}</option>
                    )}
                    </select>
                  </div>
                </div>
                <div className='div-f2'>
                  <div className='div-con'>
                    <p className='p-label'>Numero de Oficio</p>
                    <input
                      className='field'
                      name='no_oficio'
                      onChange={this.onChange}
                      required
                      ref='no_oficio'
                    />
                  </div>
                  <div className='div-con'>
                    <TextField
                      label='Importe'
                      value={importe}
                      onChange={this.onChange}
                      id='importe'
                      name='importe'
                      InputProps={{
                        inputComponent: NumberFormatCustom
                      }}
                      required
                      ref={importe => this.inputImporte = importe}
                    />
                  </div>
                </div>
                <div className='div-f2'>
                  <div className='div-con'>
                    <p className='p-label'>Importe Letra</p>
                    <input
                      className='field'
                      name='no_oficio'
                      onChange={this.onChange}
                      value={(NumberAsString(importe))}
                      required
                      ref='no_oficio'
                    />
                  </div>
                  {tipo_doc === 'Fondo Revolvente' ?
                    <div className='div-con'>
                      <p className='p-label'>Beneficiario</p>
                      <select
                        className='select-f'
                        value={beneficiario}
                        onChange={this.onChange}
                        name='beneficiario'
                      >
                        {this.beneficiario2.map((x,y) =>
                          <option name={y}>{x}</option>
                        )}
                      </select>
                    </div>
                    :
                    <div className='div-con'>
                      <p className='p-label'>Beneficiario</p>
                      <select
                        className='select-f'
                        value={beneficiario}
                        onChange={this.onChange}
                        name='beneficiario'
                      >
                        {this.state.baneficiarioc.map(data =>
                          <option name={data}>{data.nombre}</option>
                        )}
                      </select>
                    </div>
                  }
                </div>
                <div className='div-f2'>
                  <div className='div-con'>
                    <p className='p-label'>Descripción</p>
                    <input
                      className='field'
                      id='desc'
                      name='desc'
                      onChange={this.onChange}
                      required
                      ref='desc'
                    />
                  </div>
                  {realizo === 'MIGUEL' &&
                    <div className='add-bene'>
                      <div className='content-bf'>
                        <p className='p-label'>Agregar Beneficiario</p>
                        <input
                          className='field'
                          id='nombre'
                          name='nombre'
                          onChange={this.onChange}
                          value={this.state.nombre}
                        />
                      </div>
                      <button className='btn-add-bf' onClick={this.sendName.bind(this)}>
                          +
                      </button>
                    </div>
                  }
                </div>
                <div className='div-f2'>
                  <div className='fondo-w-c'>
                    <div>
                      <FormControl className='fondo-w-c'>
                        <InputLabel>Proyecto</InputLabel>
                        <Select
                          style={{ height: 'auto' }}
                          multiple
                          value={no_proyecto}
                          onChange={this.onChange}
                          name='no_proyecto'
                          input={<Input id='select-multiple-chip' />}
                          renderValue={(selected) => (
                            <div>
                              {selected.map((value) => (
                                <Chip key={value} label={value} style={{ display: 'flex', flexWrap: 'wrap' }}/>
                              ))}
                            </div>
                          )}
                          MenuProps={MenuProps}
                        >
                          {this.no_proyecto.map((name) => (
                            <MenuItem key={name} value={name}>
                              {name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </div>
                  </div>
                </div>
                <div className='div-f2'>
                  <div style={{ width: '99%' }}>
                    <div>
                      <p className='p-label'>Numero de Comprobantes</p>
                      <input
                        style={{ width: '100%' }}
                        className='field'
                        id='numCompro'
                        name='numCompro'
                        onChange={this.onChange}
                        required
                        ref='numCompro'
                      />
                    </div>
                  </div>
                </div>
              </Paper>
            </Grid>
            {(realizo === 'MIGUEL' || realizo === 'TERESA' || realizo === 'MARCOS' || realizo === 'ELOY' || realizo === 'MARTHA') &&
            <Grid className='grid2-cont'>
              <Paper className='paper-p'>
                <div className='div-con-f'>Licitación</div>
                <div className='div-f2'>
                  <div className='div-con'>
                    <p className='p-label'>Numero de Licitación</p>
                    <input
                      className='field'
                      id='no_lici'
                      name='no_lici'
                      onChange={this.onChange}
                      ref='no_lici'
                    />
                  </div>
                  <div className='div-con'>
                    <p className='p-label'>Requisición</p>
                    <input
                      className='field'
                      id='requisicion'
                      name='requisicion'
                      onChange={this.onChange}
                      ref='requisicion'
                    />
                  </div>
                </div>
                <div className='div-f2'>
                  <div className='div-con'>
                    <p className='p-label'>Pedido</p>
                    <input
                      className='field'
                      id='pedido'
                      name='pedido'
                      onChange={this.onChange}
                      ref='pedido'
                    />
                  </div>
                  <div className='div-con'>
                    <p className='p-label'>Poliza</p>
                    <input
                      className='field'
                      id='poliza'
                      name='poliza'
                      onChange={this.onChange}
                      ref='poliza'
                    />
                  </div>
                </div>
              </Paper>
              <Paper className='paper-pm'>
                <div className='div-con-f'>Pago CFE</div>
                <div className='div-f2'>
                  <div className='div-con'>
                    <p className='p-label'>Cta CFE</p>
                    <input
                      className='field'
                      id='cfe'
                      name='cfe'
                      onChange={this.onChange}
                      ref='cfe'
                    />
                  </div>
                  <div className='div-con'>
                    <p className='p-label'>Numero de Servicio CFE</p>
                    <input
                      className='field'
                      id='nscfe'
                      name='nscfe'
                      onChange={this.onChange}
                      ref='nscfe'
                    />
                  </div>
                </div>
                <div className='div-cfe' style={{ width: '100%' }}>
                  <p className='p-label'>Observaciones</p>
                  <textarea
                    className='field'
                    id='observaciones'
                    name='observaciones'
                    onChange={this.onChange}
                    ref='observaciones'
                  />
                </div>
              </Paper>
            </Grid>}
          </Grid>
          <div className='div-content-fab'>
            <Fab color='primary' aria-label='add' style={{ background: 'green' }} type='submit'>
              <CheckIcon />
            </Fab>
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

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
}
