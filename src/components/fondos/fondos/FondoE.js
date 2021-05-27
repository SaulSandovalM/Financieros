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
      anexof: ' '
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
    const itemsRefPre = firebase.database().ref('presupuesto/')
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
        no_proyecto: snap.val().no_proyecto,
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
          of: child.val().of,
          id: child.key
        })
      })
      this.setState({
        oficio: oficio
      })
    })
  }

  beneficiario2 = ['', 'Mtro. León Maximiliano Hernández Valdés']
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
      no_proyecto: this.state.no_proyecto.length === 0 ? this.state.fondos[0].no_proyecto : this.state.no_proyecto,
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
      anexof: this.state.anexof ? this.state.anexof : this.state.anexof[0].anexof
    }
    firebase.database().ref().update(updates)
    alert('Se ha actualizado el fondo')
  }

  render() {

    const { tipo_doc, realizo } = this.state
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
        {this.state.fondo &&
          <form className='form-fondo'>
            <div className='grid-w'>
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
                        {(this.state.searchF === fondos.fondo && (fondos.realizo === this.state.realizo || this.state.realizo === 'MIGUEL')) &&
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
                      <p className='p-label'>Tipo de Documento</p>
                      {(realizo === 'MIGUEL' || realizo === 'ELOY' || realizo === 'TERESA' || realizo === 'MARTHA' || realizo === 'LIZBETH') &&
                        <select
                          className='select-f'
                          value={
                            (this.state.fondos[0].tipo_doc && this.state.tipo_doc === '') ?
                              this.state.fondos[0].tipo_doc
                            :
                              this.state.tipo_doc
                          }
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
                          value={
                            (this.state.fondos[0].tipo_doc && this.state.tipo_doc === '') ?
                              this.state.fondos[0].tipo_doc
                            :
                              this.state.tipo_doc
                          }
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
                          value={
                            (this.state.fondos[0].tipo_doc && this.state.tipo_doc === '') ?
                              this.state.fondos[0].tipo_doc
                            :
                              this.state.tipo_doc
                          }
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
                        value={this.state.oficio_aut ? this.state.oficio_aut : this.state.fondos[0].oficio_aut}
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
                        required
                        value={this.state.no_oficio ? this.state.no_oficio : this.state.fondos[0].no_oficio}
                        onChange={this.onChange}
                        ref='no_oficio'
                      />
                    </div>
                    <div className='div-con'>
                      <TextField
                        label='Importe'
                        value={this.state.importe ? this.state.importe : this.state.fondos[0].importe}
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
                        value={(NumberAsString(this.state.importe ? this.state.importe : this.state.fondos[0].importe))}
                        required
                        ref='no_oficio'
                      />
                    </div>
                    {tipo_doc === 'Fondo Revolvente' ?
                      <div className='div-con'>
                        <p className='p-label'>Beneficiario</p>
                        <select
                          className='select-f'
                          value={this.state.beneficiario ? this.state.beneficiario : this.state.fondos[0].beneficiario}
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
                          value={this.state.beneficiario ? this.state.beneficiario : this.state.fondos[0].beneficiario}
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
                        value={this.state.desc ? this.state.desc : this.state.fondos[0].desc}
                      />
                    </div>
                  </div>
                  <div className='div-f2'>
                    <div className='fondo-w-c'>
                      <div>
                        <FormControl className='fondo-w-c'>
                          <InputLabel>Proyecto</InputLabel>
                          <Select
                            style={{ height: 'auto' }}
                            multiple
                            value={this.state.no_proyecto}
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
                          value={this.state.numCompro ? this.state.numCompro : this.state.fondos[0].numCompro}
                          ref='numCompro'
                        />
                      </div>
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
