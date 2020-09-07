import React, { Component } from 'react'
import './Ampliacion.css'
import RowCompoAmpliacion from './RowCompoAmpliacion'
import firebase from '../../../Firebase'

export default class ListComponent extends Component {
  constructor (props) {
    super(props)
    this.state = {
      presupuesto: [],
      importe: ''
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
    this.setState({ search: event.target.value.substr(0, 2) })
  }

  updateSeacrh2 (event) {
    this.setState({ search2: event.target.value.substr(0, 7) })
  }

  updateSeacrh3 (event) {
    this.setState({ search3: event.target.value.substr(0, 7) })
  }

  handleChange (event) {
    this.setState({ [event.target.name]: event.target.value })
  }

  render () {
    return (
      <div>
        <div>
          <div>
            <div className='p-container-fondor' style={{ background: '#f4f4f4', padding: '30px' }}>
              <div className='p-margin-fr'>
                <p className='p-title-size-fr'>
                  - Busca los datos para hacer tu ampliación
                </p>
              </div>
              <div className='inputs-container-fr' ref='contactForm'>
                <div className='inputs-col-fr'>
                  <div className='inputs-row-fr-2' style={{ width: '60%' }}>
                    <div className='p-container-ifr3'>
                      <p className='p-title-margin-fr'>UP</p>
                      <input
                        className='input-style-fr'
                        id='up'
                        required
                        value={this.state.search}
                        onChange={this.updateSeacrh.bind(this)}
                      />
                    </div>
                    <div className='p-container-ifr3'>
                      <p className='p-title-margin-fr'>Partida</p>
                      <input
                        className='input-style-fr'
                        id='partida'
                        required
                        value={this.state.search2}
                        onChange={this.updateSeacrh2.bind(this)}
                      />
                    </div>
                    <div className='p-container-ifr3'>
                      <p className='p-title-margin-fr'>Rubro</p>
                      <input
                        className='input-style-fr'
                        id='rubro'
                        required
                        value={this.state.search3}
                        onChange={this.updateSeacrh3.bind(this)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='table-container-fr'>
          <div className='table-left' />
          <div className='table-up-p-frn-a'>
            <b>UP</b>
          </div>
          <div className='table-up-p-frn-p'>
            <b>PARTIDA</b>
          </div>
          <div className='table-up-p-frn-p'>
            <b>RUBRO</b>
          </div>
          <div className='table-up-p-frn-p'>
            <b>IMPORTE</b>
          </div>
          <div className='table-cpa-a'>
            <b>CPA</b>
          </div>
          <div className='table-up-p-frn-p'>
            <b>ESTATUS</b>
          </div>
          <div className='table-right' />
        </div>
        {
          this.props.listaB.map(item =>
            <RowCompoAmpliacion
              key={item.id}
              item={item}
              update={this.props.update}
              search={this.state.search}
              search2={this.state.search2}
              search3={this.state.search3}
            />
          )
        }
      </div>
    )
  }
}
