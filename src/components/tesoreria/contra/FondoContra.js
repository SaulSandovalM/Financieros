import React, { Component } from 'react'
import FondosDataService from './Service'

export default class FondosContra extends Component {
  constructor (props) {
    super(props)
    this.onChangeFondo = this.onChangeFondo.bind(this)
    this.onChangeFecha = this.onChangeFecha.bind(this)
    this.saveFondo = this.saveFondo.bind(this)
    this.newFondo = this.newFondo.bind(this)
    this.state = {
      fondo: '',
      fecha: '',
      published: false,
      submitted: false
    }
  }

  onChangeFondo (e) {
    this.setState({
      fondo: e.target.value
    })
  }

  onChangeFecha (e) {
    this.setState({
      fecha: e.target.value
    })
  }

  saveFondo () {
    let data = {
      fondo: this.state.fondo,
      fecha: this.state.fecha,
      published: false
    }
    FondosDataService.create(data)
      .then(() => {
        console.log('Created new item successfully!')
        this.setState({
          submitted: true
        })
      })
      .catch((e) => {
        console.log(e)
      })
  }

  newFondo () {
    this.setState({
      fondo: '',
      fecha: '',
      published: false,
      submitted: false
    })
  }

  render () {
    return (
      <div className='submit-form'>
        {this.state.submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <button className='btn btn-success' onClick={this.newFondo}>
              Add
            </button>
          </div>
        ) : (
          <div>
            <div className='form-group'>
              <label htmlFor='fondo'>Fondo</label>
              <input
                type='text'
                className='form-control'
                id='fondo'
                required
                value={this.state.fondo}
                onChange={this.onChangeFondo}
                name='fondo'
              />
            </div>

            <div className='form-group'>
              <label htmlFor='fecha'>Fecha</label>
              <input
                type='text'
                className='form-control'
                id='fecha'
                required
                value={this.state.fecha}
                onChange={this.onChangeFecha}
                name='fecha'
              />
            </div>
            <button onClick={this.saveFondo} className='btn btn-success'>
              Submit
            </button>
          </div>
        )}
      </div>
    )
  }
}
