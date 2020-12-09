import React, { Component } from 'react'
import './Transferencia.css'
import firebase from '../../../Firebase'
import ListComponent from './ListComponent'
import TextField from '@material-ui/core/TextField'
import Alert from '@material-ui/lab/Alert'
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
      search3: ''
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
          trasferencia: child.val().trasferencia,
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
      ped: item.ped,
      itrans: item.itrans,
      igest: item.igest,
      la: item.la,
      ods: item.ods,
      et: item.et,
      ff: item.ff,
      of: item.of,
      np: item.np,
      cpa: item.cpa,
      ene: item.ene,
      gasene: item.gasene,
      feb: item.feb,
      gasfeb: item.gasfeb,
      mar: item.mar,
      gasmar: item.gasmar,
      abr: item.abr,
      gasabr: item.gasabr,
      may: item.may,
      gasmay: item.gasmay,
      jun: item.jun,
      gasjun: item.gasjun,
      jul: item.jul,
      gasjul: item.gasjul,
      ago: item.ago,
      gasago: item.gasago,
      sep: parseInt(item.sep),
      gassep: item.gassep,
      oct: item.oct - parseInt(this.state.importe),
      gasoct: item.gasoct,
      nov: item.nov,
      gasnov: item.gasnov,
      dic: item.dic,
      gasdic: item.gasdic,
      total: item.total,
      ampliacion: item.ampliacion,
      reduccion: item.reduccion,
      transferencia: 'Transferencia'
    }
    firebase.database().ref().update(updates)
    alert('Tu solicitud fue enviada.')
  }

  render () {
    return (
      <div className='pf-container-f'>
        <div className='site-pf'>
          <p className='site-pf-s'><b>Transferencia</b></p>
        </div>
        <div className='p-container-fr'>
          <div className='p-margin-row'>
            <p className='p-title-size'>
              - Agrega el documento de solicitud/autorización para la Transferencia
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
                  - Busca los datos para hacer tu transferencia/reducción
                </p>
              </div>
              <div className='inputs-container-fr'>
                <div className='inputs-col-fr'>
                  <div className='inputs-row-fr-2'>
                    <div className='no' />
                    <div className='p-container-ifr2'>
                    <TextField
                      label='Importe'
                      id='importe'
                      name='importe'
                      InputProps={{
                        inputComponent: NumberFormatCustom
                      }}
                      required
                      style={{zIndex: '3'}}
                      onChange={this.handleChange.bind(this)}
                      ref={importe => this.inputImporte = importe}
                    />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='space-table'>
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
