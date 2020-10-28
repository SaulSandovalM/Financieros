import React, { Component } from 'react'
import firebase from '../../../Firebase'
import './Cheques.css'
import ListComponent from './ListComponent'
import CurrencyFormat from 'react-currency-format'
import TextField from '@material-ui/core/TextField'
import Alert from '@material-ui/lab/Alert'
import Button from '@material-ui/core/Button'

export default class Cheques extends Component {
  constructor (props) {
    super(props)
    this.state = {
      lista: [
        {
          id: 1,
          name: 'Prueba',
          done: false
        }
      ],
      form: [],
      alert: false,
      alertData: {},
      numCheque: '',
      importe: '',
      fechaE: '',
      dirigido: '',
      fechaC: '',
      archivo: '',
      contador: {},
      contadorCheques: {},
      file: '',
      pdf: 0,
      fileName: '',
      update: 0,
      fileUpdate: ''
    }
  }

  listenForItems = (itemsRef) => {
    itemsRef.on('value', (snap) => {
      var lista = []
      snap.forEach((child) => {
        lista.push({
          numCheque: child.val().numCheque,
          importe: child.val().importe,
          fechaE: child.val().fechaE,
          dirigido: child.val().dirigido,
          fechaC: child.val().fechaC,
          archivo: child.val().archivo,
          fileUpdate: child.val().fileUpdate,
          done: child.val().done,
          id: child.key
        })
      })
      this.setState({
        lista: lista
      })
    })
  }

  componentDidMount () {
    const itemsRef = firebase.database().ref('cheques/')
    this.listenForItems(itemsRef)
    this.consumob()
    this.consumoc()
  }

  consumob = () => {
    const ref = firebase.firestore().collection('banco').doc('--stats--')
    ref.get().then((doc) => {
      if (doc.exists) {
        this.setState({
          contador: doc.data(),
          key: doc.id,
          isLoading: false
        })
      } else {
        console.log('No hay documento')
      }
    })
  }

  consumoc = () => {
    const ref = firebase.firestore().collection('cheques').doc('--stats--')
    ref.get().then((doc) => {
      if (doc.exists) {
        this.setState({
          contadorCheques: doc.data(),
          key: doc.id,
          isLoading: false
        })
      } else {
        console.log('No hay documento')
      }
    })
  }

  showAlert (type, message) {
    this.setState({
      alert: true,
      alertData: { type, message }
    })
    setTimeout(() => {
      this.setState({ alert: false })
    }, 6000)
  }

  resetForm () {
    this.refs.contactForm.reset()
  }

  componentWillMount () {
    const formRef = firebase.database().ref('cheques').orderByKey().limitToLast(1)
    formRef.on('child_added', snapshot => {
      const { numCheque, importe, fechaE, dirigido, fechaC } = snapshot.val()
      const data = { numCheque, importe, fechaE, dirigido, fechaC }
      this.setState({ form: [data].concat(this.state.form) })
    })
  }

  handleUploads (event) {
    const file = event.target.files[0]
    const storageRef = firebase.storage().ref(`cheques/${file.name}`)
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

  updateUpload (event) {
    const file = event.target.files[0]
    const storageRef = firebase.storage().ref(`cheques/${file.name}`)
    const task = storageRef.put(file)
    this.setState({
      fileUpdate: `${file.name}`
    })
    task.on('state_changed', (snapshot) => {
      const percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      this.setState({
        update: percentage
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

  sendMessage (e) {
    e.preventDefault()
    const params = {
      numCheque: this.inputCheque.value,
      importe: this.inputImporte.value,
      fechaE: this.inputFechaE.value,
      dirigido: this.inputDirigido.value,
      fechaC: this.inputFechaC.value
    }
    this.setState({
      numCheque: this.inputCheque.value,
      importe: this.inputImporte.value,
      fechaE: this.inputFechaE.value,
      dirigido: this.inputDirigido.value,
      fechaC: this.inputFechaC.value
    })
    if (params.numCheque && params.importe && params.fechaE && params.dirigido && params.fechaC) {
      var f = parseInt(params.importe)
      const statsRefT = firebase.firestore().collection('caja').doc('--stats--')
      const increments = firebase.firestore.FieldValue.increment(f)
      const batchs = firebase.firestore().batch()
      const storyRefs = firebase.firestore().collection('caja').doc(`${Math.random()}`)
      batchs.set(storyRefs, { title: 'Aumento Caja', cantidad: '+' + f })
      batchs.set(statsRefT, { storyCount: increments }, { merge: true })
      batchs.commit()
      const statsRefc = firebase.firestore().collection('cheques').doc('--stats--')
      const incrementc = firebase.firestore.FieldValue.increment(1)
      const batchc = firebase.firestore().batch()
      const storyRefc = firebase.firestore().collection('cheques').doc(`${Math.random()}`)
      batchc.set(storyRefc, { title: 'Caja + y Banco -' })
      batchc.set(statsRefc, { storyCount: incrementc }, { merge: true })
      batchc.commit()
      const statsRef = firebase.firestore().collection('banco').doc('--stats--')
      const increment = firebase.firestore.FieldValue.increment(-f)
      const batch = firebase.firestore().batch()
      const storyRef = firebase.firestore().collection('banco').doc(`${Math.random()}`)
      batch.set(storyRef, { title: 'Cheque ', no: params.numCheque + ' ', dirigido: ' - ' + params.dirigido, cantidad: '-' + f })
      batch.set(statsRef, { storyCount: increment }, { merge: true })
      batch.commit()
      firebase.database().ref('cheques').push(params).then(() => {
        this.showAlert('success', 'Tu solicitud fue enviada.')
      }).catch(() => {
        this.showAlert('danger', 'Tu solicitud no puede ser enviada')
      })
      this.resetForm()
      setInterval(this.consumob, 1000)
      setInterval(this.consumoc, 1000)
    } else {
      this.showAlert('warning', 'Por favor llene el formulario')
    }
  }

  handleChange (event) {
    this.setState({ [event.target.name]: event.target.value })
  }

  update = (item) => {
    let updates = {}
    updates['cheques/' + item.id] = {
      numCheque: item.numCheque,
      importe: item.importe,
      fechaE: item.fechaE,
      dirigido: item.dirigido,
      fechaC: item.fechaC,
      archivo: this.state.archivo,
      fileUpdate: this.state.fileUpdate
    }
    firebase.database().ref().update(updates)
  }

  render () {
    console.log(this.state.importe)
    return (
      <div className='container-back-cheques'>
        <div className='site-cheques'>
          <p className='site-s-cheques'><b>Cheques</b></p>
        </div>
        <div>
          <form className='cheques-container' onSubmit={this.sendMessage.bind(this)} ref='contactForm'>
            <div className='cheques-inputs'>
              <div className='cheques-inputs-c'>
                <div className='input-row-cheque'>
                  <TextField
                    label='No. de Cheque'
                    id='numCheque'
                    required
                    ref={numCheque => this.inputCheque = numCheque}
                    value={this.state.contadorCheques.storyCount}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </div>
                <div className='input-row-cheque'>
                  <TextField
                    label='Importe'
                    type='number'
                    step='any'
                    id='importe'
                    name='importe'
                    required
                    onChange={this.handleChange.bind(this)}
                    value={this.state.importe}
                    ref={importe => this.inputImporte = importe}
                  />
                </div>
                <div className='input-row-cheque'>
                  <TextField
                    label='Fecha de Emisión'
                    type='date'
                    id='fechaE'
                    required
                    ref={fechaE => this.inputFechaE = fechaE}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </div>
                <div className='input-row-cheque'>
                  <TextField
                    label='Fecha de Cobro'
                    type='date'
                    id='fechaC'
                    required
                    ref={fechaC => this.inputFechaC = fechaC}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </div>
              </div>
              <div className='disponible-cheque'>
                <div>
                  <p className='p-cheque-dis'><b>DINERO DISPONIBLE</b></p>
                  <p className='cantidad-cheque'>
                    MXN
                    <CurrencyFormat
                      value={this.state.contador.storyCount}
                      displayType='text'
                      prefix=' $'
                      thousandSeparator
                      decimalSeparator='.'
                    />
                  </p>
                </div>
              </div>
            </div>
            <div className='cheque-inputs'>
              <div className='cheques-inputs-c'>
                <div className='input-row-cheque'>
                  <TextField
                    label='Beneficiario'
                    id='dirigido'
                    required
                    ref={dirigido => this.inputDirigido = dirigido}
                  />
                </div>
                <div className='input-row-cheque' />
              </div>
              <div className='disponible-cheque'>
                <div>
                  <div className='input-row-2-cheque'>
                    {this.state.contador.storyCount < this.state.importe ?
                      <p>El importe pasa la cantidad disponible</p>
                      :
                      <Button
                        variant='contained'
                        color='primary'
                        style={{ background: 'green' }}
                        type='submit'
                      >
                        GUARDAR
                      </Button>
                    }
                  </div>
                </div>
              </div>
            </div>
          </form>
          <div className='p-margin'>
            <p className='p-title-size'>- Movimientos</p>
          </div>
          <div style={{ width: '60%' }}>
            <TextField
              label='Actualizar Archivo'
              style={{ width: '100%' }}
              type='file'
              onChange={this.updateUpload.bind(this)}
              InputLabelProps={{
                shrink: true,
              }}
            />
            {this.state.update === 100 &&
              <div className='alert-cont'>
                <Alert variant="filled" severity="success">
                  Su archivo se ha cargado correctamente!
                </Alert>
              </div>
            }
          </div>
          <div className='cheques-w'>
            <div className='cheques-col'>
              <ListComponent
                lista={this.state.lista}
                update={this.update}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}
