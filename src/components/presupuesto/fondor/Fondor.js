import React, { Component } from 'react'
import './Fondor.css'
import firebase from '../../../Firebase'
import ListComponent from './ListComponent'
import ListFr from './ListFr'
import CurrencyFormat from 'react-currency-format'
import TextField from '@material-ui/core/TextField'
import Alert from '@material-ui/lab/Alert'
import PropTypes from 'prop-types'
import MaskedInput from 'react-text-mask'
import NumberFormat from 'react-number-format'

export default class Fondor extends Component {
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
      numContra: '',
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
      gasdic: 0
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
    const storageRef = firebase.storage().ref(`fondoRevolvente/${file.name}`)
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

  handleChangeI (event) {
    this.setState({ [event.target.name]: event.target.value })
  }

  componentDidMount () {
    const itemsRefBanco = firebase.database().ref('presupuesto/')
    this.listenForItemsBanco(itemsRefBanco)
    this.consumo()
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
          estatus: child.val().estatus,
          done: child.val().done,
          id: child.key
        })
      })
      this.setState({
        listaB: listaB
      })
    })
  }

  consumo = () => {
    const ref = firebase.firestore().collection('banco').doc('--stats--')
    ref.get().then((doc) => {
      if (doc.exists) {
        this.setState({
          contador: doc.data(),
          key: doc.id,
          isLoading: true
        })
      } else {
        console.log('No hay documento!')
      }
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
      ene: item.ene - parseInt(this.state.impoene),
      gasene: item.gasene,
      feb: item.feb - parseInt(this.state.impofeb),
      gasfeb: item.gasfeb,
      mar: item.mar - parseInt(this.state.impomar),
      gasmar: item.gasmar,
      abr: item.abr - parseInt(this.state.impoabr),
      gasabr: item.gasabr,
      may: item.may - parseInt(this.state.impomay),
      gasmay: item.gasmay,
      jun: item.jun - parseInt(this.state.impojun),
      gasjun: item.gasjun,
      jul: item.jul - parseInt(this.state.impojul),
      gasjul: item.gasjul,
      ago: item.ago - parseInt(this.state.impoago),
      gasago: item.gasago,
      sep: item.sep - parseInt(this.state.imposep),
      gassep: item.gassep,
      oct: item.oct - parseInt(this.state.impooct),
      gasoct: item.gasoct,
      nov: item.nov - parseInt(this.state.imponov),
      gasnov: item.gasnov,
      dic: item.dic - parseInt(this.state.impodic),
      gasdic: item.gasdic,
      total: item.total,
      ampliacion: item.ampliacion,
      reduccion: item.reduccion,
      transferencia: item.transferencia,
      oficio: this.state.archivo,
      estatus: 'FR',
      numContra: this.state.numContra
    }
    firebase.database().ref().update(updates)
    const sum =
        parseInt(this.state.impoene) + parseInt(this.state.impofeb) + parseInt(this.state.impomar)
      + parseInt(this.state.impoabr) + parseInt(this.state.impomay) + parseInt(this.state.impojun)
      + parseInt(this.state.impojul) + parseInt(this.state.impoago) + parseInt(this.state.imposep)
      + parseInt(this.state.impooct) + parseInt(this.state.imponov) + parseInt(this.state.impodic)
    var f = sum
    const statsRef = firebase.firestore().collection('banco').doc('--stats--')
    const increment = firebase.firestore.FieldValue.increment(f)
    const batch = firebase.firestore().batch()
    batch.set(statsRef, { storyCount: increment }, { merge: true })
    batch.commit()
    alert('Tu solicitud fue enviada.')
    setInterval(this.consumo, 1000)
  }

  render () {
    return (
      <div>
        <div className='p-container-fr'>
          <div className='p-margin-row'>
            <p className='p-title-size'>
              - Agrega el documento de autorización de fondo revolvente
            </p>
            <div>
              <p className='p-banco'><b>PORCENTAJE AGREGADO</b></p>
              <p className='cantidad-add-banco'>
                <CurrencyFormat
                  value={parseFloat(this.state.contador.storyCount).toFixed(2)}
                  displayType='text'
                  thousandSeparator
                  prefix=' $'
                />
              </p>
            </div>
          </div>
          <div className='p-row'>
            <div className='p-container-ifr' style={{ marginRight: '20px' }}>
              <TextField
                type='file'
                label='Archivo Pdf'
                required
                onChange={this.handleUploads.bind(this)}
              />
              {this.state.pdf === 100 &&
                <div className='alert-cont'>
                  <Alert severity='success' variant='filled'>
                    Se han subido los archivos!
                  </Alert>
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
                  - Ingresa los datos que correspondan con el documento
                    de autorización del fondo revolvente
                </p>
              </div>
              <div className='cale-f'>
                <div className='cal-cont'>
                  <TextField
                    label='Enero'
                    id='impoene'
                    name='impoene'
                    required
                    defaultValue={this.state.gasene}
                    InputProps={{
                      inputComponent: NumberFormatCustom
                    }}
                    onChange={this.handleChange.bind(this)}
                    ref={impoene => this.inputImpoene = impoene}
                  />
                </div>
                <div className='cal-cont'>
                  <TextField
                    label='Febrero'
                    id='impofeb'
                    name='impofeb'
                    required
                    defaultValue={this.state.gasfeb}
                    InputProps={{
                      inputComponent: NumberFormatCustom
                    }}
                    onChange={this.handleChange.bind(this)}
                    ref={impofeb => this.inputImpofeb = impofeb}
                  />
                </div>
                <div className='cal-cont'>
                  <TextField
                    label='Marzo'
                    id='impomar'
                    name='impomar'
                    required
                    defaultValue={this.state.gasmar}
                    InputProps={{
                      inputComponent: NumberFormatCustom
                    }}
                    onChange={this.handleChange.bind(this)}
                    ref={impomar => this.inputImpomar = impomar}
                  />
                </div>
                <div className='cal-cont'>
                  <TextField
                    label='Abril'
                    id='impoabr'
                    name='impoabr'
                    required
                    defaultValue={this.state.gasabr}
                    InputProps={{
                      inputComponent: NumberFormatCustom
                    }}
                    onChange={this.handleChange.bind(this)}
                    ref={impoabr => this.inputImpoabr = impoabr}
                  />
                </div>
                <div className='cal-cont'>
                  <TextField
                    label='Mayo'
                    id='impomay'
                    name='impomay'
                    required
                    defaultValue={this.state.gasmay}
                    InputProps={{
                      inputComponent: NumberFormatCustom
                    }}
                    onChange={this.handleChange.bind(this)}
                    ref={impomay => this.inputImpomay = impomay}
                  />
                </div>
                <div className='cal-cont'>
                  <TextField
                    label='Junio'
                    id='impojun'
                    name='impojun'
                    required
                    defaultValue={this.state.gasjun}
                    InputProps={{
                      inputComponent: NumberFormatCustom
                    }}
                    onChange={this.handleChange.bind(this)}
                    ref={impojun => this.inputImpojun = impojun}
                  />
                </div>
                <div className='cal-cont'>
                  <TextField
                    label='Julio'
                    id='impojul'
                    name='impojul'
                    required
                    defaultValue={this.state.gasjul}
                    InputProps={{
                      inputComponent: NumberFormatCustom
                    }}
                    onChange={this.handleChange.bind(this)}
                    ref={impojul => this.inputImpojul = impojul}
                  />
                </div>

                <div className='cal-cont'>
                  <TextField
                    label='Agosto'
                    id='impoago'
                    name='impoago'
                    required
                    defaultValue={this.state.gasago}
                    InputProps={{
                      inputComponent: NumberFormatCustom
                    }}
                    onChange={this.handleChange.bind(this)}
                    ref={impoago => this.inputImpoago = impoago}
                  />
                </div>
                <div className='cal-cont'>
                  <TextField
                    label='Septiembre'
                    id='imposep'
                    name='imposep'
                    required
                    defaultValue={this.state.gassep}
                    InputProps={{
                      inputComponent: NumberFormatCustom
                    }}
                    onChange={this.handleChange.bind(this)}
                    ref={imposep => this.inputImposep = imposep}
                  />
                </div>
                <div className='cal-cont'>
                  <TextField
                    label='Octubre'
                    id='impooct'
                    name='impooct'
                    required
                    defaultValue={this.state.gasoct}
                    InputProps={{
                      inputComponent: NumberFormatCustom
                    }}
                    onChange={this.handleChange.bind(this)}
                    ref={impooct => this.inputImpooct = impooct}
                  />
                </div>
                <div className='cal-cont'>
                  <TextField
                    label='Novimbre'
                    id='imponov'
                    name='imponov'
                    required
                    defaultValue={this.state.gasnov}
                    InputProps={{
                      inputComponent: NumberFormatCustom
                    }}
                    onChange={this.handleChange.bind(this)}
                    ref={imponov => this.inputImponov = imponov}
                  />
                </div>
                <div className='cal-cont'>
                  <TextField
                    label='Diciembre'
                    id='impodic'
                    name='impodic'
                    required
                    defaultValue={this.state.gasdic}
                    InputProps={{
                      inputComponent: NumberFormatCustom
                    }}
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
                        label='Numero de Contrarecibo'
                        id='numContra'
                        name='numContra'
                        required
                        style={{zIndex: '3'}}
                        onChange={this.handleChange.bind(this)}
                        ref={numContra => this.inputNumContra = numContra}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='space-table' style={{ background: '#f4f4f4'}}>
          <ListComponent
            listaB={this.state.listaB}
            update={this.update}
          />
        </div>
        <div className='space-table2' style={{ background: '#f4f4f4'}}>
          <ListFr
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
