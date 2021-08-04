import React, { Component } from 'react'
import './Tabular.css'
import ReactToPrint from 'react-to-print'
import firebase from '../../../Firebase'
import CurrencyFormat from 'react-currency-format'

export default class TabularIndi extends Component {
  constructor (props) {
    super(props)
    var URLactual = window.location
    this.unsubscribe = null
    this.state = {
      comprometidos: [
        {
          id: 1,
          name: 'Cargando ...',
          done: false
        }
      ],
      urlfire: String(URLactual).substr(-20)
    }
  }

  componentDidMount () {
    const itemsRefComprometidos = firebase.database().ref(`fondos/${this.state.urlfire}/comprometido`)
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
    return (
      <div style={{margin: '80px'}}>
        <ReactToPrint
          trigger={() => <buttom className='b-imp'>Imprimir</buttom>}
          content={() => this.componentRef}
        />
        <div ref={el => (this.componentRef = el)}>
        {this.state.comprometidos.map(comprometidos =>
          comprometidos.up ?
          <div className='tab-container'>
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
                      <div className='tab-tabular'>
                        <div className='tab-pui-content'>
                          <div className='tab-pui'>
                            <p className='tab-p-m'>{comprometidos.partida}</p>
                          </div>
                          <div className='tab-pui'>
                            <p className='tab-p-m'>{comprometidos.presupuestal}</p>
                          </div>
                          <div style={{ display: 'flex', flexDirection: 'column', width: '30%' }}>
                            {comprometidos.comprobantes !== undefined ?
                              comprometidos.comprobantes.sort((a, b) => a.folio - b.folio).map(item =>
                                <div className='tab-pui-border' style={{ width: '100%' }}>
                                  <p className='tab-p-m'>$</p>
                                  <CurrencyFormat
                                    style={{
                                      fontSize: '16px',
                                      margin: '1px',
                                      textAlign: 'center',
                                      fontWeight: 'bold'
                                    }}
                                    value={item.total}
                                    displayType='text'
                                    thousandSeparator
                                  />
                                </div>
                              ) : null
                            }
                          </div>
                        </div>
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
                        <p className='tab-p-m'>{comprometidos.total}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div> : null
        )}
        </div>
      </div>
    )
  }
}
