import React, { Component } from 'react'
import './Transferencia.css'
import firebase from '../../../Firebase'
import ListComponent from './ListComponent'
import TextField from '@material-ui/core/TextField'
import PropTypes from 'prop-types'
import MaskedInput from 'react-text-mask'
import NumberFormat from 'react-number-format'

export default class Transferencia extends Component {
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
          obj: child.val().obj,
          proy: child.val().proy,
          est: child.val().est,
          obra: child.val().obra,
          ben: child.val().ben,
          eg: child.val().eg,
          mi: child.val().mi,
          pr: child.val().pr,
          pd: child.val().pd,
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
          feb: child.val().feb,
          gasfeb: child.val().gasfeb,
          mar: child.val().mar,
          gasmar: child.val().gasmar,
          abr: child.val().abr,
          gasabr: child.val().gasabr,
          may: child.val().may,
          gasmay: child.val().gasmay,
          jun: child.val().jun,
          gasjun: child.val().gasjun,
          jul: child.val().jul,
          gasjul: child.val().gasjul,
          ago: child.val().ago,
          gasago: child.val().gasago,
          sep: child.val().sep,
          gassep: child.val().gassep,
          oct: child.val().oct,
          gasoct: child.val().gasoct,
          nov: child.val().nov,
          gasnov: child.val().gasnov,
          dic: child.val().dic,
          gasdic: child.val().gasdic,
          total: child.val().total,
          ampliacion: child.val().ampliacion,
          reduccion: child.val().reduccion,
          transferencia: child.val().transferencia,
          oficio: child.val().oficio,
          done: child.val().done,
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

  update = (item) => {
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
      ene: item.ene + parseInt(this.state.impoene),
      gasene: item.gasene,
      feb: item.feb + parseInt(this.state.impofeb),
      gasfeb: item.gasfeb,
      mar: item.mar + parseInt(this.state.impomar),
      gasmar: item.gasmar,
      abr: item.abr + parseInt(this.state.impoabr),
      gasabr: item.gasabr,
      may: item.may + parseInt(this.state.impomay),
      gasmay: item.gasmay,
      jun: item.jun + parseInt(this.state.impojun),
      gasjun: item.gasjun,
      jul: item.jul + parseInt(this.state.impojul),
      gasjul: item.gasjul,
      ago: item.ago + parseInt(this.state.impoago),
      gasago: item.gasago,
      sep: item.sep + parseInt(this.state.imposep),
      gassep: item.gassep,
      oct: item.oct + parseInt(this.state.impooct),
      gasoct: item.gasoct,
      nov: item.nov + parseInt(this.state.imponov),
      gasnov: item.gasnov,
      dic: item.dic + parseInt(this.state.impodic),
      gasdic: item.gasdic,
      total: item.total,
      ampliacion: item.ampliacion,
      reduccion: item.reduccion,
      transferencia: 'T/R',
      oficio: this.state.oficio
    }
    firebase.database().ref().update(updates)
    alert('Tu solicitud fue enviada.')
  }

  render () {
    return (
      <div className='pf-container-f' style={{paddingTop: '60px'}}>
        <div>
          <div>
            <div className='p-container-fondor'>
              <div className='p-margin-fr'>
                <p className='p-title-size-fr'>
                  - Ingresa los datos correspondientes para hacer la transferencia/ampliación
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
                        style={{ zIndex: '3', marginTop: '20px' }}
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
        <div className='space-table-t'>
          <ListComponent
            listaB={this.state.listaB}
            update={this.update}
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
