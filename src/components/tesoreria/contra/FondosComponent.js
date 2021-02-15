import React, { Component } from 'react'
import FondosDataService from './Service'
import TextField from '@material-ui/core/TextField'

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
          },
          message: 'Se ha publicado!'
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
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '100%' }}>
        {currentFondos ? (
          <div>
            <form>
              <TextField
                id='numCheque'
                onChange={this.onChangeCheque}
                value={currentFondos.numCheque}
                label='Numero de Cheque'
              />
            </form>
            <button
              type='submit'
              className='badge badge-success'
              onClick={this.updateFondo}
            >
              Asignar Vale
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <p>Por favor seleccione un fondo ... </p>
          </div>
        )}
      </div>
    )
  }
}
