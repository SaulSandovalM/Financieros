import React, { Component } from 'react'
import './Tabular.css'
import ReactToPrint from 'react-to-print'
import firebase from '../../../Firebase'
import history from '../../../history'

export default class Tabular extends Component {
  constructor (props) {
    super(props)
    this.state = {
      comprometidos: [
        {
          id: 1,
          name: 'Cargando ...',
          done: false
        }
      ]
    }
  }

  componentDidMount () {
    var dir = history.location.pathname.slice(15)
    const itemsRefComprometidos = firebase.database().ref(`fondos/${dir}/comprometido`)
    this.listenComprometidos(itemsRefComprometidos)
  }

  listenComprometidos = (itemsRefComprometidos) => {
    itemsRefComprometidos.on('value', (snap) => {
      const firebasedata = snap.val()
      this.setState({
        comprometidos: firebasedata
      })
    })
  }

  render () {
    const totalImporte = []
    this.state.comprometidos.map(comprometidos =>
      comprometidos ?
        totalImporte.push(parseFloat(comprometidos.importe_comp))
      : null
    )
    const reducer = (a, b) => a + b

    return (
      <div style={{ margin: '80px' }}>
        <ReactToPrint
          trigger={() => <buttom className='b-imp'>Imprimir</buttom>}
          content={() => this.componentRef}
        />
        <div className='tab-container' ref={el => (this.componentRef = el)}>
          <div className='tab-content'>
            <div className='tab-border'>
              <div className='tab-title'>
                <div>
                  <p className='tab-p-m'>PROCURADURÍA GENERAL DE JUSTICIA</p>
                  <p className='tab-p-m'>DIRECCIÓN GENERAL DE ADMINISTRACIÓN Y FINANZAS</p>
                  <p className='tab-p-m'>DIRECCIÓN DE RECURSOS FINANCIEROS</p>
                </div>
              </div>
              <div className='tab-tabular-content'>
                <div>
                  <p className='tab-p-m'>TABULAR</p>
                  <div className='tab-tabular'>
                    <div className='tab-pui-content'>
                      <div className='tab-pui'>
                        <p className='tab-p-m'>PARTIDA</p>
                      </div>
                      <div className='tab-pui'>
                        <p className='tab-p-m'>U.P.</p>
                      </div>
                      <div className='tab-pui'>
                        <p className='tab-p-m'>IMPORTE</p>
                      </div>
                    </div>
                  </div>
                  <div>
                    {this.state.comprometidos.map(comprometidos =>
                      comprometidos.up ?
                      <div key='' className='tab-tabular'>
                        <div className='tab-pui-content'>
                          <div className='tab-pui'>
                            <p className='tab-p-m'>{comprometidos.partida}</p>
                          </div>
                          <div className='tab-pui'>
                            <p className='tab-p-m'>{comprometidos.presupuestal}</p>
                          </div>
                          <div className='tab-pui-border'>
                            <p className='tab-p-m'>$</p>
                            <p className='tab-p-m'>{comprometidos.importe_comp}</p>
                          </div>
                        </div>
                      </div> : null
                    )}
                  </div>
                </div>
                <div className='tab-tabular'>
                  <div className='tab-pui-content'>
                    <div className='tab-pui'>
                      <p className='tab-p-m'>TOTAL</p>
                    </div>
                    <div className='tab-pui' />
                    <div className='tab-pui-border'>
                      <p className='tab-p-m'>$</p>
                      <p className='tab-p-m'>{(totalImporte.reduce(reducer)).toFixed(2)}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
