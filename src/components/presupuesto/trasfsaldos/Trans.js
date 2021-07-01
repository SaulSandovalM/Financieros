import React, { Component } from 'react'
import './Trans.css'
import firebase from '../../../Firebase'
import ListComponent from './ListComponent'
import ListReduccion from './ListReduccion'
import TextField from '@material-ui/core/TextField'
import Alert from '@material-ui/lab/Alert'
import PropTypes from 'prop-types'
import MaskedInput from 'react-text-mask'
import NumberFormat from 'react-number-format'

export default class Trans extends Component {
  constructor () {
    super()
    this.state = {
      pdf: 0,
      file: '',
      lista: [
        {
          id: 1,
          name: 'preuba',
          done: false
        }
      ],
      listaB: [
        {
          id: 1,
          name: 'preuba',
          done: false
        }
      ],
      up: '',
      par: '',
      rubro: '',
      archivo: '',
      importe: '',
      contador: {},
      alert: false,
      presupuesto: [],
      search: '',
      search2: '',
      search3: '',
      impoene: 0,
      impofeb: 0,
      impomar: 0,
      impoabr: 0,
      impomay: 0,
      impojun: 0,
      impojul: 0,
      impoago: 0,
      imposep: 0,
      impooct: 0,
      imponov: 0,
      impodic: 0,
      gasene: 0,
      gasfeb: 0,
      gasmar: 0,
      gasabr: 0,
      gasmay: 0,
      gasjun: 0,
      gasjul: 0,
      gasago: 0,
      gassep: 0,
      gasoct: 0,
      gasnov: 0,
      gasdic: 0,
      oficio: ''
    }
  }

  componentWillMount () {
    firebase.database().ref('presupuesto/').on('child_added', snapshot => {
      this.setState({
        presupuesto: this.state.presupuesto.concat(snapshot.val())
      })
    })
  }

  updateSeacrh (event) {
    this.setState({ search: event.target.value.substr(0, 20) })
  }

  updateSeacrh2 (event) {
    this.setState({ search2: event.target.value.substr(0, 20) })
  }

  updateSeacrh3 (event) {
    this.setState({ search3: event.target.value.substr(0, 20) })
  }

  handleUploads (event) {
    const file = event.target.files[0]
    const storageRef = firebase.storage().ref(`presupuesto/${file.name}`)
    const task = storageRef.put(file)
    this.setState({
      file: `${file.name}`
    })
    task.on('state_changed', (snapshot) => {
      const percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      this.setState({
        pdf: percentage
      })
    }, error => {
      console.error(error.message)
    }, () => storageRef.getDownloadURL().then(url => {
      const record = url
      this.setState({
        archivo: record
      })
    }))
  }

  componentDidMount () {
    const itemsRefBanco = firebase.database().ref('presupuesto/')
    this.listenForItemsBanco(itemsRefBanco)
  }

  listenForItemsBanco = (itemsRefBanco) => {
    itemsRefBanco.on('value', (snap) => {
      var listaB = []
      snap.forEach((child) => {
        listaB.push({
          año: child.val().año,
          rm: child.val().rm,
          ur: child.val().ur,
          up: child.val().up,
          rubro: child.val().rubro,
          tg: child.val().tg,
          ogasto: child.val().ogasto,
          npro: child.val().npro,
          f: child.val().f,
          fu: child.val().fu,
          sf: child.val().sf,
          eje: child.val().eje,
          s: child.val().s,
          prog: child.val().prog,
          sp: child.val().sp,
          min: child.val().min,
          obj: child.val().obj,
          proy: child.val().proy,
          est: child.val().est,
          obra: child.val().obra,
          ben: child.val().ben,
          eg: child.val().eg,
          mi: child.val().mi,
          pr: child.val().pr,
          ped: child.val().ped,
          itrans: child.val().itrans,
          igest: child.val().igest,
          la: child.val().la,
          ods: child.val().ods,
          et: child.val().et,
          ff: child.val().ff,
          of: child.val().of,
          np: child.val().np,
          cpa: child.val().cpa,
          ene: child.val().ene,
          gasene: child.val().gasene,
          ampene: child.val().ampene,
          feb: child.val().feb,
          gasfeb: child.val().gasfeb,
          ampfeb: child.val().ampfeb,
          mar: child.val().mar,
          gasmar: child.val().gasmar,
          ampmar: child.val().ampmar,
          abr: child.val().abr,
          gasabr: child.val().gasabr,
          ampabr: child.val().ampabr,
          may: child.val().may,
          gasmay: child.val().gasmay,
          ampmay: child.val().ampmay,
          jun: child.val().jun,
          gasjun: child.val().gasjun,
          ampjun: child.val().ampjun,
          jul: child.val().jul,
          gasjul: child.val().gasjul,
          ampjul: child.val().ampjul,
          ago: child.val().ago,
          gasago: child.val().gasago,
          ampago: child.val().ampago,
          sep: child.val().sep,
          gassep: child.val().gassep,
          ampsep: child.val().ampsep,
          oct: child.val().oct,
          gasoct: child.val().gasoct,
          ampoct: child.val().ampoct,
          nov: child.val().nov,
          gasnov: child.val().gasnov,
          ampnov: child.val().ampnov,
          dic: child.val().dic,
          gasdic: child.val().gasdic,
          ampdic: child.val().ampdic,
          total: child.val().total,
          ampliacion: child.val().ampliacion,
          reduccion: child.val().reduccion,
          transferencia: child.val().transferencia,
          oficio: child.val().oficio,
          id: child.key
        })
      })
      this.setState({
        listaB: listaB
      })
    })
  }

  handleChange (event) {
    this.setState({ [event.target.name]: event.target.value })
  }

  updateR = (item) => {
    let updates = {}
    updates['presupuesto/' + item.id] = {
      año: item.año,
      rm: item.rm,
      ur: item.ur,
      up: item.up,
      rubro: item.rubro,
      tg: item.tg,
      ogasto: item.ogasto,
      npro: item.npro,
      f: item.f,
      fu: item.fu,
      sf: item.sf,
      eje: item.eje,
      s: item.s,
      prog: item.prog,
      sp: item.sp,
      min: item.min,
      obj: item.obj,
      proy: item.proy,
      est: item.est,
      obra: item.obra,
      ben: item.ben,
      eg: item.eg,
      mi: item.mi,
      pr: item.pr,
      pd: item.pd,
      itrans: item.itrans,
      igest: item.igest,
      la: item.la,
      ods: item.ods,
      et: item.et,
      ff: item.ff,
      of: item.of,
      np: item.np,
      cpa: item.cpa,
      ene: item.ene - (!parseInt(this.state.impoene) ? 0 : parseInt(this.state.impoene)),
      gasene: parseFloat(this.state.impoene),
      ampene: item.ampene,
      feb: item.feb - (!parseInt(this.state.impofeb) ? 0 : parseInt(this.state.impofeb)),
      gasfeb: parseFloat(this.state.impofeb),
      ampfeb: item.ampfeb,
      mar: item.mar - (!parseInt(this.state.impomar) ? 0 : parseInt(this.state.impomar)),
      gasmar: parseFloat(this.state.impomar),
      ampmar: item.ampmar,
      abr: item.abr - (!parseInt(this.state.impoabr) ? 0 : parseInt(this.state.impoabr)),
      gasabr: parseFloat(this.state.impoabr),
      ampabr: item.ampabr,
      may: item.may - (!parseInt(this.state.impomay) ? 0 : parseInt(this.state.impomay)),
      gasmay: parseFloat(this.state.impomay),
      ampmay: item.ampmay,
      jun: item.jun - (!parseInt(this.state.impojun) ? 0 : parseInt(this.state.impojun)),
      gasjun: parseFloat(this.state.impojun),
      ampjun: item.ampjun,
      jul: item.jul - (!parseInt(this.state.impojul) ? 0 : parseInt(this.state.impojul)),
      gasjul: parseFloat(this.state.impojul),
      ampjul: item.ampjul,
      ago: item.ago - (!parseInt(this.state.impoago) ? 0 : parseInt(this.state.impoago)),
      gasago: parseFloat(this.state.impoago),
      ampago: item.ampago,
      sep: item.sep - (!parseInt(this.state.imposep) ? 0 : parseInt(this.state.imposep)),
      gassep: parseFloat(this.state.imposep),
      ampsep: item.ampsep,
      oct: item.oct - (!parseInt(this.state.impooct) ? 0 : parseInt(this.state.impooct)),
      gasoct: parseFloat(this.state.impooct),
      ampoct: item.ampoct,
      nov: item.nov - (!parseInt(this.state.imponov) ? 0 : parseInt(this.state.imponov)),
      gasnov: parseFloat(this.state.imponov),
      ampnov: item.ampnov,
      dic: item.dic - (!parseInt(this.state.impodic) ? 0 : parseInt(this.state.impodic)),
      gasdic: parseFloat(this.state.impodic),
      ampdic: item.ampdic,
      total: item.total,
      ampliacion: item.ampliacion,
      reduccion: item.reduccion,
      transferencia: 'T/R',
      oficio: this.state.oficio,
      oficioA: this.state.oficio,
      archivo: this.state.archivo
    }
    firebase.database().ref().update(updates)
    alert('Tu solicitud fue enviada.')
  }

  updateA = (item) => {
    let updates = {}
    updates['presupuesto/' + item.id] = {
      año: item.año,
      rm: item.rm,
      ur: item.ur,
      up: item.up,
      rubro: item.rubro,
      tg: item.tg,
      ogasto: item.ogasto,
      npro: item.npro,
      f: item.f,
      fu: item.fu,
      sf: item.sf,
      eje: item.eje,
      s: item.s,
      prog: item.prog,
      sp: item.sp,
      min: item.min,
      obj: item.obj,
      proy: item.proy,
      est: item.est,
      obra: item.obra,
      ben: item.ben,
      eg: item.eg,
      mi: item.mi,
      pr: item.pr,
      pd: item.pd,
      itrans: item.itrans,
      igest: item.igest,
      la: item.la,
      ods: item.ods,
      et: item.et,
      ff: item.ff,
      of: item.of,
      np: item.np,
      cpa: item.cpa,
      ene: item.ene + (!parseInt(this.state.impoene) ? 0 : parseInt(this.state.impoene)),
      gasene: parseFloat(this.state.impoene),
      ampene: item.ampene,
      feb: item.feb + (!parseInt(this.state.impofeb) ? 0 : parseInt(this.state.impofeb)),
      gasfeb: parseFloat(this.state.impofeb),
      ampfeb: item.ampfeb,
      mar: item.mar + (!parseInt(this.state.impomar) ? 0 : parseInt(this.state.impomar)),
      gasmar: parseFloat(this.state.impomar),
      ampmar: item.ampmar,
      abr: item.abr + (!parseInt(this.state.impoabr) ? 0 : parseInt(this.state.impoabr)),
      gasabr: parseFloat(this.state.impoabr),
      ampabr: item.ampabr,
      may: item.may + (!parseInt(this.state.impomay) ? 0 : parseInt(this.state.impomay)),
      gasmay: parseFloat(this.state.impomay),
      ampmay: item.ampmay,
      jun: item.jun + (!parseInt(this.state.impojun) ? 0 : parseInt(this.state.impojun)),
      gasjun: parseFloat(this.state.impojun),
      ampjun: item.ampjun,
      jul: item.jul + (!parseInt(this.state.impojul) ? 0 : parseInt(this.state.impojul)),
      gasjul: parseFloat(this.state.impojul),
      ampjul: item.ampjul,
      ago: item.ago + (!parseInt(this.state.impoago) ? 0 : parseInt(this.state.impoago)),
      gasago: parseFloat(this.state.impoago),
      ampago: item.ampago,
      sep: item.sep + (!parseInt(this.state.imposep) ? 0 : parseInt(this.state.imposep)),
      gassep: parseFloat(this.state.imposep),
      ampsep: item.ampsep,
      oct: item.oct + (!parseInt(this.state.impooct) ? 0 : parseInt(this.state.impooct)),
      gasoct: parseFloat(this.state.impooct),
      ampoct: item.ampoct,
      nov: item.nov + (!parseInt(this.state.imponov) ? 0 : parseInt(this.state.imponov)),
      gasnov: parseFloat(this.state.imponov),
      ampnov: item.ampnov,
      dic: item.dic + (!parseInt(this.state.impodic) ? 0 : parseInt(this.state.impodic)),
      gasdic: parseFloat(this.state.impodic),
      ampdic: item.ampdic,
      total: item.total,
      ampliacion: item.ampliacion,
      reduccion: 'Ampliacion',
      transferencia: item.transferencia,
      saldo: 'Saldo',
      oficioA: this.state.oficio,
      archivo: this.state.archivo
    }
    firebase.database().ref().update(updates)
    alert('Tu solicitud fue enviada.')
  }

  render () {
    return (
      <div className='pf-container'>
        <div className='p-container-fr' style={{ paddingTop: '60px' }}>
          <div className='p-margin-row'>
            <p className='p-title-size'>
              - Agrega el documento de solicitud/autorización para la reducción
            </p>
          </div>
          <div className='p-row'>
            <div className='p-container-ifra' style={{ marginRight: '20px' }}>
              <TextField
                type='file'
                label='Archivo Pdf'
                required
                onChange={this.handleUploads.bind(this)}
              />
              {this.state.pdf === 100 &&
                <div className='alert-cont'>
                  <Alert severity='success' variant='filled'>Se han subido los archivos!</Alert>
                </div>
              }
            </div>
          </div>
        </div>
        <div>
          <div>
            <div className='p-container-fondor'>
              <div className='p-margin-fr'>
                <p className='p-title-size-fr'>
                  - Ingresa los datos correspondientes para hacer la ampliación/reducción
                </p>
              </div>
              <div className='cale-f'>
                <div className='cal-cont'>
                  <TextField
                    label='Enero'
                    id='impoene'
                    name='impoene'
                    InputProps={{
                      inputComponent: NumberFormatCustom
                    }}
                    required
                    onChange={this.handleChange.bind(this)}
                    ref={impoene => this.inputImpoene = impoene}
                  />
                </div>
                <div className='cal-cont'>
                  <TextField
                    label='Febrero'
                    id='impofeb'
                    name='impofeb'
                    InputProps={{
                      inputComponent: NumberFormatCustom
                    }}
                    required
                    onChange={this.handleChange.bind(this)}
                    ref={impofeb => this.inputImpofeb = impofeb}
                  />
                </div>
                <div className='cal-cont'>
                  <TextField
                    label='Marzo'
                    id='impomar'
                    name='impomar'
                    InputProps={{
                      inputComponent: NumberFormatCustom
                    }}
                    required
                    onChange={this.handleChange.bind(this)}
                    ref={impomar => this.inputImpomar = impomar}
                  />
                </div>
                <div className='cal-cont'>
                  <TextField
                    label='Abril'
                    id='impoabr'
                    name='impoabr'
                    InputProps={{
                      inputComponent: NumberFormatCustom
                    }}
                    required
                    onChange={this.handleChange.bind(this)}
                    ref={impoabr => this.inputImpoabr = impoabr}
                  />
                </div>
                <div className='cal-cont'>
                  <TextField
                    label='Mayo'
                    id='impomay'
                    name='impomay'
                    InputProps={{
                      inputComponent: NumberFormatCustom
                    }}
                    required
                    onChange={this.handleChange.bind(this)}
                    ref={impomay => this.inputImpomay = impomay}
                  />
                </div>
                <div className='cal-cont'>
                  <TextField
                    label='Junio'
                    id='impojun'
                    name='impojun'
                    InputProps={{
                      inputComponent: NumberFormatCustom
                    }}
                    required
                    onChange={this.handleChange.bind(this)}
                    ref={impojun => this.inputImpojun = impojun}
                  />
                </div>
                <div className='cal-cont'>
                  <TextField
                    label='Julio'
                    id='impojul'
                    name='impojul'
                    InputProps={{
                      inputComponent: NumberFormatCustom
                    }}
                    required
                    onChange={this.handleChange.bind(this)}
                    ref={impojul => this.inputImpojul = impojul}
                  />
                </div>

                <div className='cal-cont'>
                  <TextField
                    label='Agosto'
                    id='impoago'
                    name='impoago'
                    InputProps={{
                      inputComponent: NumberFormatCustom
                    }}
                    required
                    onChange={this.handleChange.bind(this)}
                    ref={impoago => this.inputImpoago = impoago}
                  />
                </div>
                <div className='cal-cont'>
                  <TextField
                    label='Septiembre'
                    id='imposep'
                    name='imposep'
                    InputProps={{
                      inputComponent: NumberFormatCustom
                    }}
                    required
                    onChange={this.handleChange.bind(this)}
                    ref={imposep => this.inputImposep = imposep}
                  />
                </div>
                <div className='cal-cont'>
                  <TextField
                    label='Octubre'
                    id='impooct'
                    name='impooct'
                    InputProps={{
                      inputComponent: NumberFormatCustom
                    }}
                    required
                    onChange={this.handleChange.bind(this)}
                    ref={impooct => this.inputImpooct = impooct}
                  />
                </div>
                <div className='cal-cont'>
                  <TextField
                    label='Novimbre'
                    id='imponov'
                    name='imponov'
                    InputProps={{
                      inputComponent: NumberFormatCustom
                    }}
                    required
                    onChange={this.handleChange.bind(this)}
                    ref={imponov => this.inputImponov = imponov}
                  />
                </div>
                <div className='cal-cont'>
                  <TextField
                    label='Diciembre'
                    id='impodic'
                    name='impodic'
                    InputProps={{
                      inputComponent: NumberFormatCustom
                    }}
                    required
                    onChange={this.handleChange.bind(this)}
                    ref={impodic => this.inputImpodic = impodic}
                  />
                </div>
              </div>
              <div className='inputs-container-fr'>
                <div className='inputs-col-fr'>
                  <div className='inputs-row-fr-2'>
                    <div className='no' />
                    <div className='p-container-ifr2'>
                      <TextField
                        label='Oficio de autorización'
                        id='oficio'
                        name='oficio'
                        required
                        style={{zIndex: '3'}}
                        onChange={this.handleChange.bind(this)}
                        ref={oficio => this.inputOficio = oficio}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='space-table-am'>
          <ListComponent
            listaB={this.state.listaB}
            updateR={this.updateR}
            updateA={this.updateA}
          />
        </div>
        <div className='space-table2-am'>
          <ListReduccion
            listaB={this.state.listaB}
          />
        </div>
      </div>
    )
  }
}

function TextMaskCustom(props) {
  const { inputRef, ...other } = props;

  return (
    <MaskedInput
      {...other}
      ref={(ref) => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
      placeholderChar={'\u2000'}
      showMask
    />
  );
}

TextMaskCustom.propTypes = {
  inputRef: PropTypes.func.isRequired,
};

function NumberFormatCustom(props) {
  const { inputRef, onChange, ...other } = props;

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
        });
      }}
      thousandSeparator
      isNumericString
      prefix='$'
    />
  );
}

NumberFormatCustom.propTypes = {
  inputRef: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
}
