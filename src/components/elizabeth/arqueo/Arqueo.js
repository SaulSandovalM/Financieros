import React, { Component } from 'react'
import './Arqueo.css'
import firebase from '../../../Firebase'
import Popup from 'reactjs-popup'
import ListComponent from './ListComponent'
import TextField from '@material-ui/core/TextField'

export default class Arqueo extends Component {
  constructor (props) {
    super(props)
    this.state = {
      lista: [
        {
          id: 1,
          name: 'preuba',
          done: false
        }
      ],
      form: [],
      alert: false,
      alertData: {},
      can1000: '0',
      can500: '0',
      can200: '0',
      can100: '0',
      can50: '0',
      can20: '0',
      can10: '0',
      can5: '0',
      can2: '0',
      can1: '0',
      can0: '0',
      arqueo: [],
      fecha: '',
      search: '',
      numCheque: ''
    }
  }

  listenForItems = (itemsRef) => {
    itemsRef.on('value', (snap) => {
      var lista = []
      snap.forEach((child) => {
        lista.push({
          can1000: child.val().can1000,
          can500: child.val().can500,
          can200: child.val().can200,
          can100: child.val().can100,
          can50: child.val().can50,
          can20: child.val().can20,
          can10: child.val().can10,
          can5: child.val().can5,
          can2: child.val().can2,
          can1: child.val().can1,
          can0: child.val().can0,
          fecha: child.val().fecha,
          numCheque: child.val().numCheque,
          total: child.val().total,
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
    const itemsRef = firebase.database().ref('arqueo/').limitToLast(1)
    this.listenForItems(itemsRef)
  }

  componentWillMount () {
    firebase.database().ref('arqueo').on('child_added', snapshot => {
      this.setState({
        arqueo: this.state.arqueo.concat(snapshot.val())
      })
    })
  }

  resetForm () {
    this.refs.contactForm.reset()
  }

  sendMessage (e) {
    e.preventDefault()
    const params = {
      can1000: this.inputCan1000.value,
      can500: this.inputCan500.value,
      can200: this.inputCan200.value,
      can100: this.inputCan100.value,
      can50: this.inputCan50.value,
      can20: this.inputCan20.value,
      can10: this.inputCan10.value,
      can5: this.inputCan5.value,
      can2: this.inputCan2.value,
      can1: this.inputCan1.value,
      can0: this.inputCan0.value,
      fecha: this.inputFecha.value,
      numCheque: this.inputCheque.value,
      total: this.state.total,
    }
    this.setState({
      can1000: this.inputCan1000.value,
      can500: this.inputCan500.value,
      can200: this.inputCan200.value,
      can100: this.inputCan100.value,
      can50: this.inputCan50.value,
      can20: this.inputCan20.value,
      can10: this.inputCan10.value,
      can5: this.inputCan5.value,
      can2: this.inputCan2.value,
      can1: this.inputCan1.value,
      can0: this.inputCan0.value,
      fecha: this.inputFecha.value,
      numCheque: this.inputCheque.value,
      total: this.inputTotal.value
    })
    if (params.can1000 && params.can500 && params.can200 && params.can100 &&
      params.can50 && params.can20 && params.can10 && params.can5 &&
      params.can2 && params.can1 && params.can0 && params.fecha
      && params.numCheque && params.total) {
      firebase.database().ref('arqueo').push(params).then(() => {
        alert('Tu solicitud fue enviada.')
      }).catch(() => {
        alert('Tu solicitud no puede ser enviada')
      })
      this.resetForm()
    } else {
      alert('Por favor llene el formulario')
    }
  }

  updateSearch (event) {
    this.setState({ search: event.target.value.substr(0, 20) })
  }

  handleChange (event) {
    this.setState({ [event.target.name]: event.target.value })
  }

  render () {
    const filterData = this.state.arqueo.filter(
      (arqueo) => {
        return arqueo.fecha.indexOf(this.state.search) !== -1
      }
    )

    var meses = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']
    var today = new Date()
    today = today.getFullYear() + '-' + meses[today.getMonth()] + '-' + today.getDate()
    var total = parseInt(this.state.can1000) + parseInt(this.state.can500) +
                parseInt(this.state.can200) + parseInt(this.state.can100) +
                parseInt(this.state.can50) + parseInt(this.state.can20) +
                parseInt(this.state.can10) + parseInt(this.state.can5) +
                parseInt(this.state.can2) + parseInt(this.state.can1) +
                parseInt(this.state.can0)
    var mil = parseInt(this.state.can1000) * 1000
    var quinientos = parseInt(this.state.can500) * 500
    var doscientos = parseInt(this.state.can200) * 200
    var cien = parseInt(this.state.can100) * 100
    var cincuenta = parseInt(this.state.can50) * 50
    var veinte = parseInt(this.state.can20) * 20
    var diez = parseInt(this.state.can10) * 10
    var cinco = parseInt(this.state.can5) * 5
    var dos = parseInt(this.state.can2) * 2
    var uno = parseInt(this.state.can1) * 1
    var punto = parseInt(this.state.can0) * 0.5
    var sumaT = mil + quinientos + doscientos + cien + cincuenta + veinte +
                diez + cinco + dos + uno + punto
    this.state.total = sumaT

    return (
      <div className='pf-container-a' style={{ marginTop: '40px' }}>
        <div className='arqueo-container'>
          <div className='arqueo-content'>
            <div className='table-arqueo'>
              <div className='title-arqueo'>
                <p className='p-mar-arqueo'><b>Denominación</b></p>
              </div>
              <div className='title-arqueo'>
                <p className='p-mar-arqueo'><b>Cantidad</b></p>
              </div>
              <div className='title-arqueo'>
                <p className='p-mar-arqueo'><b>Total</b></p>
              </div>
            </div>
            <div>
              <ListComponent
                lista={this.state.lista}
              />
            </div>
            <div className='botones-arqueo'>
              <Popup
                trigger={<button className='margin-buton-ar'>Actualizar</button>}
                modal
                closeOnDocumentClick>
                <form onSubmit={this.sendMessage.bind(this)} ref='contactForm' style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', height: '100%' }}>
                  <div className='cen-tit'>
                    <div className='title-ar'>
                      <b>AGREGA EL NUMERO DE CHEQUE PARA REALIZAR TU ARQUEO</b>
                      <input
                        id='numCheque'
                        ref={numCheque => this.inputCheque = numCheque} />
                    </div>
                  </div>
                  <div className='cen-tit' style={{display: 'none'}}>
                    <div className='title-ar'>
                      <b>AGREGA EL NUMERO DE CHEQUE PARA REALIZAR TU ARQUEO</b>
                      <input
                        id='fecha'
                        value={today}
                        ref={fecha => this.inputFecha = fecha} />
                    </div>
                  </div>
                  <div className='arqueo-content-pop'>
                    <div className='table-arqueo-pop'>

                      <div className='title-arqueo'>
                        <p className='p-mar-arqueo'><b>DENOMINACION</b></p>
                      </div>
                      <div className='title-arqueo'>
                        <p className='p-mar-arqueo'><b>CANTIDAD</b></p>
                      </div>
                      <div className='title-arqueo'>
                        <p className='p-mar-arqueo'><b>DENOMINACIÓN</b></p>
                      </div>
                    </div>
                    <div className='data-arqueo-pop'>
                      <div className='title-arqueo'>
                        <p className='p-mar-arqueo'>1000</p>
                      </div>
                      <div className='title-arqueo'>
                        <p className='p-mar-arqueo'>
                          <input
                            id='can1000'
                            name='can1000'
                            required
                            onChange={this.handleChange.bind(this)}
                            value={this.state.can1000}
                            ref={can1000 => this.inputCan1000 = can1000}
                          />
                        </p>
                      </div>
                      <div className='title-arqueo'>
                        <p className='p-mar-arqueo'>$ {mil}</p>
                      </div>
                    </div>
                    <div className='data-arqueo-pop'>
                      <div className='title-arqueo'>
                        <p className='p-mar-arqueo'>500</p>
                      </div>
                      <div className='title-arqueo'>
                        <p className='p-mar-arqueo'>
                          <input
                            id='can500'
                            name='can500'
                            required
                            onChange={this.handleChange.bind(this)}
                            value={this.state.can500}
                            ref={can500 => this.inputCan500 = can500}
                          />
                        </p>
                      </div>
                      <div className='title-arqueo'>
                        <p className='p-mar-arqueo'>$ {quinientos}</p>
                      </div>
                    </div>
                    <div className='data-arqueo-pop'>
                      <div className='title-arqueo'>
                        <p className='p-mar-arqueo'>200</p>
                      </div>
                      <div className='title-arqueo'>
                        <p className='p-mar-arqueo'>
                          <input
                            id='can200'
                            name='can200'
                            required
                            onChange={this.handleChange.bind(this)}
                            value={this.state.can200}
                            ref={can200 => this.inputCan200 = can200}
                          />
                        </p>
                      </div>
                      <div className='title-arqueo'>
                        <p className='p-mar-arqueo'>$ {doscientos}</p>
                      </div>
                    </div>
                    <div className='data-arqueo-pop'>
                      <div className='title-arqueo'>
                        <p className='p-mar-arqueo'>100</p>
                      </div>
                      <div className='title-arqueo'>
                        <p className='p-mar-arqueo'>
                          <input
                            id='can100'
                            name='can100'
                            required
                            onChange={this.handleChange.bind(this)}
                            value={this.state.can100}
                            ref={can100 => this.inputCan100 = can100}
                          />
                        </p>
                      </div>
                      <div className='title-arqueo'>
                        <p className='p-mar-arqueo'>$ {cien}</p>
                      </div>
                    </div>
                    <div className='data-arqueo-pop'>
                      <div className='title-arqueo'>
                        <p className='p-mar-arqueo'>50</p>
                      </div>
                      <div className='title-arqueo'>
                        <p className='p-mar-arqueo'>
                          <input
                            id='can50'
                            name='can50'
                            required
                            onChange={this.handleChange.bind(this)}
                            value={this.state.can50}
                            ref={can50 => this.inputCan50 = can50}
                          />
                        </p>
                      </div>
                      <div className='title-arqueo'>
                        <p className='p-mar-arqueo'>$ {cincuenta}</p>
                      </div>
                    </div>
                    <div className='data-arqueo-pop'>
                      <div className='title-arqueo'>
                        <p className='p-mar-arqueo'>20</p>
                      </div>
                      <div className='title-arqueo'>
                        <p className='p-mar-arqueo'>
                          <input
                            id='can20'
                            name='can20'
                            required
                            onChange={this.handleChange.bind(this)}
                            value={this.state.can20}
                            ref={can20 => this.inputCan20 = can20}
                          />
                        </p>
                      </div>
                      <div className='title-arqueo'>
                        <p className='p-mar-arqueo'>$ {veinte}</p>
                      </div>
                    </div>
                    <div className='data-arqueo-pop'>
                      <div className='title-arqueo'>
                        <p className='p-mar-arqueo'>10</p>
                      </div>
                      <div className='title-arqueo'>
                        <p className='p-mar-arqueo'>
                          <input
                            id='can10'
                            name='can10'
                            required
                            onChange={this.handleChange.bind(this)}
                            value={this.state.can10}
                            ref={can10 => this.inputCan10 = can10}
                          />
                        </p>
                      </div>
                      <div className='title-arqueo'>
                        <p className='p-mar-arqueo'>$ {diez}</p>
                      </div>
                    </div>
                    <div className='data-arqueo-pop'>

                      <div className='title-arqueo'>
                        <p className='p-mar-arqueo'>5</p>
                      </div>
                      <div className='title-arqueo'>
                        <p className='p-mar-arqueo'>
                          <input
                            id='can5'
                            name='can5'
                            required
                            onChange={this.handleChange.bind(this)}
                            value={this.state.can5}
                            ref={can5 => this.inputCan5 = can5}
                          />
                        </p>
                      </div>
                      <div className='title-arqueo'>
                        <p className='p-mar-arqueo'>$ {cinco}</p>
                      </div>
                    </div>
                    <div className='data-arqueo-pop'>
                      <div className='title-arqueo'>
                        <p className='p-mar-arqueo'>2</p>
                      </div>
                      <div className='title-arqueo'>
                        <p className='p-mar-arqueo'>
                          <input
                            id='can2'
                            name='can2'
                            required
                            onChange={this.handleChange.bind(this)}
                            value={this.state.can2}
                            ref={can2 => this.inputCan2 = can2}
                          />
                        </p>
                      </div>
                      <div className='title-arqueo'>
                        <p className='p-mar-arqueo'>$ {dos}</p>
                      </div>
                    </div>
                    <div className='data-arqueo-pop'>
                      <div className='title-arqueo'>
                        <p className='p-mar-arqueo'>1</p>
                      </div>
                      <div className='title-arqueo'>
                        <p className='p-mar-arqueo'>
                          <input
                            id='can1'
                            name='can1'
                            required
                            onChange={this.handleChange.bind(this)}
                            value={this.state.can1}
                            ref={can1 => this.inputCan1 = can1}
                          />
                        </p>
                      </div>
                      <div className='title-arqueo'>
                        <p className='p-mar-arqueo'>$ {uno}</p>
                      </div>
                    </div>
                    <div className='data-arqueo-pop'>
                      <div className='title-arqueo'>
                        <p className='p-mar-arqueo'>0.5</p>
                      </div>
                      <div className='title-arqueo'>
                        <p className='p-mar-arqueo'>
                          <input
                            id='can0'
                            name='can0'
                            required
                            onChange={this.handleChange.bind(this)}
                            value={this.state.can0}
                            ref={can0 => this.inputCan0 = can0}
                          />
                        </p>
                      </div>
                      <div className='title-arqueo'>
                        <p className='p-mar-arqueo'>$ {punto}</p>
                      </div>
                    </div>
                    <div className='data-arqueo-pop'>
                      <div className='title-arqueo'>
                        <p className='p-mar-arqueo'>Total</p>
                      </div>
                      <div className='title-arqueo'>
                        <p className='p-mar-arqueo'>
                          <input
                            id='total'
                            required
                            value={total}
                            ref={total => this.inputTotal = total}
                          />
                        </p>
                      </div>
                      <div className='title-arqueo'>
                        <p className='p-mar-arqueo'>$ {sumaT}</p>
                      </div>
                    </div>
                  </div>
                  <div className='botones-arqueo'>
                    <button type='submit' className='margin-buton-ar'>Actualizar</button>
                  </div>
                </form>
              </Popup>
            </div>
          </div>
          <div style={{ width: '65%', background: 'white', margin: '-45px -30px 0px 0px', padding: '90px 30px 30px 30px', height: '88vh' }}>
            <div className='p-container-ifr2'>
              <TextField
                type='date'
                label='Fecha'
                value={this.state.search} onChange={this.updateSearch.bind(this)}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </div>
            <div className='table-arqueo-search'>
              <div className='table-arqueo-content'>

                <div className='title-arqueo-se'>
                  <p className='p-mar-arqueo'><b>1000</b></p>
                </div>
                <div className='title-arqueo-se'>
                  <p className='p-mar-arqueo'><b>500</b></p>
                </div>
                <div className='title-arqueo-se'>
                  <p className='p-mar-arqueo'><b>200</b></p>
                </div>
                <div className='title-arqueo-se'>
                  <p className='p-mar-arqueo'><b>100</b></p>
                </div>
                <div className='title-arqueo-se'>
                  <p className='p-mar-arqueo'><b>50</b></p>
                </div>
                <div className='title-arqueo-se'>
                  <p className='p-mar-arqueo'><b>20</b></p>
                </div>
                <div className='title-arqueo-se'>
                  <p className='p-mar-arqueo'><b>10</b></p>
                </div>
                <div className='title-arqueo-se'>
                  <p className='p-mar-arqueo'><b>5</b></p>
                </div>
                <div className='title-arqueo-se'>
                  <p className='p-mar-arqueo'><b>2</b></p>
                </div>
                <div className='title-arqueo-se'>
                  <p className='p-mar-arqueo'><b>1</b></p>
                </div>
                <div className='title-arqueo-se'>
                  <p className='p-mar-arqueo'><b>0.5</b></p>
                </div>

              </div>
            </div>
            {
              filterData.map(arqueo => (
                <div className='table-arqueo-content'>
                  <div className='title-arqueo-se'>
                    <p className='p-mar-arqueo'>{arqueo.can1000}</p>
                  </div>
                  <div className='title-arqueo-se'>
                    <p className='p-mar-arqueo'>{arqueo.can500}</p>
                  </div>
                  <div className='title-arqueo-se'>
                    <p className='p-mar-arqueo'>{arqueo.can200}</p>
                  </div>
                  <div className='title-arqueo-se'>
                    <p className='p-mar-arqueo'>{arqueo.can100}</p>
                  </div>
                  <div className='title-arqueo-se'>
                    <p className='p-mar-arqueo'>{arqueo.can50}</p>
                  </div>
                  <div className='title-arqueo-se'>
                    <p className='p-mar-arqueo'>{arqueo.can20}</p>
                  </div>
                  <div className='title-arqueo-se'>
                    <p className='p-mar-arqueo'>{arqueo.can10}</p>
                  </div>
                  <div className='title-arqueo-se'>
                    <p className='p-mar-arqueo'>{arqueo.can5}</p>
                  </div>
                  <div className='title-arqueo-se'>
                    <p className='p-mar-arqueo'>{arqueo.can2}</p>
                  </div>
                  <div className='title-arqueo-se'>
                    <p className='p-mar-arqueo'>{arqueo.can1}</p>
                  </div>
                  <div className='title-arqueo-se'>
                    <p className='p-mar-arqueo'>{arqueo.can0}</p>
                  </div>
                </div>
              )).reverse()
            }
          </div>
        </div>
      </div>
    )
  }
}
