import React, { Component } from 'react'
import FondosDataService from './Service'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Alert from '@material-ui/lab/Alert'

export default class FondosComponent extends Component {
  constructor (props) {
    super(props)
    this.onChangeCheque = this.onChangeCheque.bind(this)
    this.updatePublished = this.updatePublished.bind(this)
    this.updateFondo = this.updateFondo.bind(this)
    this.state = {
      currentFondos: {
        id: null,
        fondo: '',
        fecha: '',
        published: false
      },
      message: ''
    }
  }

  static getDerivedStateFromProps (nextProps, prevState) {
    const { fondo } = nextProps
    if (prevState.currentFondos.id !== fondo.id) {
      return {
        currentFondos: fondo,
        message: ''
      }
    }
    return prevState.currentFondos
  }

  componentDidMount () {
    this.setState({
      currentFondos: this.props.fondo
    })
  }

  onChangeCheque (e) {
    const numCheque = e.target.value
    this.setState((prevState) => ({
      currentFondos: {
        ...prevState.currentFondos,
        numCheque: numCheque
      }
    }))
  }

  updatePublished (status) {
    FondosDataService.update(this.state.currentFondos.id, {
      published: status
    })
      .then(() => {
        this.setState((prevState) => ({
          currentFondos: {
            ...prevState.currentFondos,
            published: status
          }
        }))
      })
      .catch((e) => {
        console.log(e)
      })
  }

  updateFondo () {
    const data = {
      numCheque: this.state.currentFondos.numCheque
    }
    FondosDataService.update(this.state.currentFondos.id, data).then(() => {
      this.setState({
        message: 'El fondo se ha actualizado!'
      })
    }).catch((e) => {
      console.log(e)
    })
  }

  render () {
    const { currentFondos } = this.state

    return (
      <div className='fondos-cont-contra'>
        {currentFondos ? (
          <div>
            <form>
              <TextField
                id='numCheque'
                value={currentFondos.numCheque}
                onChange={this.onChangeCheque}
                label='Numero de Cheque'
              />
              <h4>Información de Fondo</h4>
              <div className='div-textf'>
                <TextField
                  style={{ width: '46%' }}
                  value={currentFondos.fondo}
                  label='Fondo'
                />
                <TextField
                  style={{ width: '46%' }}
                  value={currentFondos.fecha}
                  label='Fecha'
                />
              </div>
              <div className='div-textf'>
                <TextField
                  style={{ width: '46%' }}
                  value={currentFondos.tipo_doc}
                  label='Tipo de Documento'
                />
                <TextField
                  style={{ width: '46%' }}
                  value={currentFondos.oficio_aut}
                  label='Oficio de Autorización'
                />
              </div>
              <div className='div-textf'>
                <TextField
                  style={{ width: '46%' }}
                  value={currentFondos.no_oficio}
                  label='No. de Oficio'
                />
                <TextField
                  style={{ width: '46%' }}
                  value={currentFondos.importe}
                  label='Importe'
                />
              </div>
              <div className='div-textf'>
                <TextField
                  style={{ width: '46%' }}
                  value={currentFondos.beneficiario}
                  label='Beneficiario'
                />
                <TextField
                  style={{ width: '46%' }}
                  value={currentFondos.desc}
                  label='Descripción'
                />
              </div>
              <div className='div-textf'>
                <TextField
                  style={{ width: '46%' }}
                  value={currentFondos.no_proyecto}
                  label='No. de Proyecto'
                />
                <TextField
                  style={{ width: '46%' }}
                  value={currentFondos.realizo}
                  label='Realizo'
                />
              </div>
            </form>
            <div className='div-btn-c'>
              <Button
                type='submit'
                color='primary'
                variant='contained'
                style={{ backgroud: 'green' }}
                onClick={this.updateFondo}
              >
                Asignar Vale
              </Button>
            </div>
            <div className='alert-cont'>
              <Alert severity='success' variant='filled'>Su ha asignado el Cheque!</Alert>
            </div>
          </div>
        ) : (
          <div className='alert-cont'>
            <Alert severity='error' variant='filled'>Error al cargar!</Alert>
          </div>
        )}
      </div>
    )
  }
}
