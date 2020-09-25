import React, { Component } from 'react'
import './pdfs.css'
import ReactToPrint from 'react-to-print'
import firebase from '../../../../Firebase'

export default class TabularIndi extends Component {
  constructor (props) {
    super(props)
    this.unsubscribe = null
    this.state = {
      comprometidos: [
        {
          id: 1,
          name: 'Cargando ...',
          done: false
        }
      ],
    }
  }

  componentDidMount() {
    const updateRef = firebase.firestore().collection('fondos').doc(this.props.match.params.id).collection('comprometidos')
    this.unsubscribe = updateRef.onSnapshot(this.onCollectionUpdate)
  }

  onCollectionUpdate = (querySnapshot) => {
    const comprometidos = []
    querySnapshot.forEach((doc) => {
      const { partida, presupuestal, no_proyecto, importe_comp } = doc.data()
      comprometidos.push({
        key: doc.id,
        doc,
        partida,
        presupuestal,
        no_proyecto,
        importe_comp,
      })
    })
    this.setState({
      comprometidos
   })
  }

  render () {
    const totalImporte = []
    this.state.comprometidos.map(comprometidos => (
      totalImporte.push(comprometidos.importe_comp)
    ))
    const reducer = (a, b) => a + b

    return (
      <div style={{margin: '80px'}}>
        <ReactToPrint
          trigger={() => <buttom className='b-imp'>Imprimir</buttom>}
          content={() => this.componentRef}
        />
        <div ref={el => (this.componentRef = el)}>
        {this.state.comprometidos.map(comprometidos =>
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
                          <div className='tab-pui-border'>
                            <p className='tab-p-m'>$</p>
                            <p className='tab-p-m'>{comprometidos.importe_comp}</p>
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
                        <p className='tab-p-m'>{comprometidos.importe_comp}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        </div>
      </div>
    )
  }
}
