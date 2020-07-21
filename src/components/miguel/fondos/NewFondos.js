import React, { Component } from 'react';
import './Fondos.css';
import firebase from '../../../Firebase';
import { NumberAsString } from './NumerosLetras.js';
import { DropDownList } from '@progress/kendo-react-dropdowns';
import '@progress/kendo-theme-default/dist/all.css';

export default class Fondos extends Component {
  constructor (props) {
    super(props);
    this.ref = firebase.firestore().collection('fondos');
    this.state = {
      fondo: '',
      fecha: '',
      tipo_doc: '',
      oficio_aut: '',
      no_oficio: '',
      no_lici: '',
      importe: '',
      desc: '',
      beneficiario: '',
      realizo: '',
      fondos: [],
      allowCustom: true,
      value: '',
      suggest: '',
      key: '',
      contador: {},
      isHidden: 1
    }
  }

  toggleHidden1() {
    this.setState({
      isHidden: 1
    })
  }
  toggleHidden2() {
    this.setState({
      isHidden: 2
    })
  }
  toggleHidden3() {
    this.setState({
      isHidden: 3
    })
  }
  toggleHidden4() {
    this.setState({
      isHidden: 4
    })
  }
  toggleHidden5() {
    this.setState({
      isHidden: 5
    })
  }
  //options
  tipo_doc = ['Pago Directo', 'Fondo Revolvente', 'Gasto a Comprobar', 'Cancelado'];
  tipo_doc2 = ['Fondo Revolvente', 'Pago Directo'];
  tipo_doc3 = ['Pago Directo'];

  render() {

    const allowCustom = this.state.allowCustom;
    const { tipo_doc, oficio_aut, no_oficio, no_lici, importe, desc, beneficiario } = this.state;
    console.log(this.state.isHidden);

    return (
      <div className='zz'>
        <div className='n-f-c'>
          <button className='b-s-f' onClick={this.toggleHidden1.bind(this)}>Registro de Fondos</button>
          <button className='b-s-f' onClick={this.toggleHidden2.bind(this)}>Comprometido</button>
          <button className='b-s-f' onClick={this.toggleHidden3.bind(this)}>Oficios</button>
          <button className='b-s-f' onClick={this.toggleHidden4.bind(this)}>Contrarecibos</button>
          <button className='b-s-f' onClick={this.toggleHidden5.bind(this)}>Complemento de Pago</button>
        </div>

        {this.state.isHidden === 1 &&
          <div className='m-f'>
          <form>
            <div className='f-f-c-w'>
              <div className='f-f'>
                <div className='f-f2'>
                  <p className='fp'>Fondo</p>
                  <input className='f-b-s'/>
                </div>
              </div>
              <div className='f-f'>
                <div className='f-f2'>
                  <p className='fp'>Fecha</p>
                  <input type='date' className='f-b-s'/>
                </div>
              </div>
              <div className='f-f'>
                <div className='f-f2'>
                  <p className='fp'>Tipo de Documento</p>
                  <DropDownList
                    suggest={true}
                    style={{
                      borderColor: 'rgba(0,0,0,0.42)',
                      background: 'white',
                      height: '28px',
                      color: 'black',
                      position: 'static'
                    }}
                    data={this.tipo_doc}
                    allowCustom={allowCustom}
                    name='tipo_doc'
                    value={tipo_doc}
                    onChange={this.onChange}
                    required
                    ref='tipo_doc'
                  />
                </div>
              </div>
              <div className='f-f'>
                <div className='f-f2'>
                  <p className='fp'>No. de Oficio</p>
                  <input className='f-b-s'/>
                </div>
              </div>
              <div className='f-f'>
                <div className='f-f2'>
                  <p className='fp'>No. de Licitación</p>
                  <input className='f-b-s'/>
                </div>
              </div>
              <div className='f-f'>
                <div className='f-f2'>
                  <p className='fp'>Importe</p>
                  <input className='f-b-s'/>
                </div>
              </div>
              <div className='f-f'>
                <div className='f-ff'>
                  <p className='fpb'>Importe letra</p>
                  <input className='f-b-s'/>
                </div>
              </div>
              <div className='f-f'>
                <div className='f-ff'>
                  <p className='fpb'>Beneficiario</p>
                  <DropDownList
                    suggest={true}
                    style={{
                      borderColor: 'rgba(0,0,0,0.42)',
                      background: 'white',
                      height: '28px',
                      color: 'black',
                      position: 'static',
                    }}
                    data={this.tipo_doc}
                    allowCustom={allowCustom}
                    name='tipo_doc'
                    value={tipo_doc}
                    onChange={this.onChange}
                    required
                    ref='tipo_doc'
                  />
                </div>
              </div>
              <div className='f-f'>
                <div className='f-ff'>
                  <p className='fpb'>Descripcción</p>
                  <input className='f-b-s'/>
                </div>
              </div>
            </div>
            <div className='l-f-c'>
              <div className='f-l-w'>
                <div className='l-w'>
                  <p className='lp'>Licitación</p>
                </div>
                <div className='f-f3'>
                  <p className='lp'>Requisición Pedido</p>
                  <input className='f-l-s'/>
                </div>
                <div className='f-f3'>
                  <p className='lp'>Número de Comprobantes</p>
                  <input className='f-l-s'/>
                </div>
                <div className='f-f3'>
                  <p className='lp'>Número CFDI</p>
                  <input className='f-l-s'/>
                </div>
                <div className='f-f3'>
                  <p className='lp'>Poliza Comprometido</p>
                  <input className='f-l-s'/>
                </div>
              </div>
              <div className='f-l-w'>
                <div className='l-w'>
                  <p className='lp'>Pago CFE</p>
                </div>
                <div className='f-f3'>
                  <p className='lp'>Cta CFE</p>
                  <input className='f-l-s'/>
                </div>
                <div className='f-f3'>
                  <p className='lp'>No Servicio CFE</p>
                  <input className='f-l-s'/>
                </div>
                <div className='f-f3'>
                  <p className='lp'>Observaciones</p>
                  <input className='f-l-s'/>
                </div>
                <div className='f-f3'>
                  <div className='c-f-s'>
                    <div className='c-f-s2'>
                      <input type='checkbox' />
                      <p className='fpc'>Fondo Revolvente</p>
                    </div>
                    <div className='c-f-s2'>
                      <input type='checkbox' />
                      <p className='fpc'>Pago Directo</p>
                    </div>
                    <div className='c-f-s2'>
                      <input type='checkbox' />
                      <p className='fpc'>Pago a Proveedor por Requisición</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>}

        {this.state.isHidden === 2 &&
          <div className='com-com'>
          <div className='fcc'>
            <div className='fc-w'>
              <div className='f-c-c'>
                <p className='fc'>Partida</p>
                <input className='ci'/>
              </div>
              <div className='f-c-c'>
                <p className='fc'>Unidad Presupuestal</p>
                <input className='ci'/>
              </div>
              <div className='f-c-c'>
                <p className='fc'>No. de Proyecto</p>
                <input className='ci'/>
              </div>
              <div className='f-c-c'>
                <p className='fc'>Municipio</p>
                <input className='ci'/>
              </div>
              <div className='f-c-c'>
                <p className='fc'>Area</p>
                <input className='ci'/>
              </div>
            </div>

            <div className='axc'>
              <div className='cx'>

              </div>
              <div className='cx'>

              </div>
            </div>
          </div>

          <div className='table-fc'>
            <div className='tfc'>
              Partida
            </div>
            <div className='tfc'>
              Unidad P
            </div>
            <div className='tfc'>
              No. de Proyecto
            </div>
            <div className='tfc'>
              Importe
            </div>
            <div className='tfc'>
              ISR
            </div>
            <div className='tfc'>
              Total
            </div>
            <div className='tfc'>
              Fecha
            </div>
          </div>
        </div>
      }

        {this.state.isHidden === 3 &&
          <div>
          <div className='m-f'>
            <div className='fr-con'>
              <p className='fr-b'><b>Fondo Revolvente</b></p>
            </div>
            <div className='fcc-i'>
              <p className='fimpre'>Solicitud Programatica</p>
              <button className='b-imp'>Imprimir</button>
            </div>
            <div className='fcc-i'>
              <p className='fimpre'>Oficio Presentación</p>
              <button className='b-imp'>Imprimir</button>
            </div>
            <div className='fcc-i'>
              <p className='fimpre'>Recibo Global</p>
              <button className='b-imp'>Imprimir</button>
            </div>
            <div className='fcc-i'>
              <p className='fimpre'>Leyenda Alusivas</p>
              <button className='b-imp'>Imprimir</button>
            </div>
          </div>

          <div className='m-f'>
            <div className='fr-con'>
              <p className='fr-b'><b>Pago Programatica</b></p>
            </div>
            <div className='fcc-i'>
              <p className='fimpre'>Solicitud Programatica</p>
              <button className='b-imp'>Imprimir</button>
            </div>
            <div className='fcc-i'>
              <p className='fimpre'>Oficio Presentación</p>
              <button className='b-imp'>Imprimir</button>
            </div>
            <div className='fcc-i'>
              <p className='fimpre'>Leyenda Alusivas</p>
              <button className='b-imp'>Imprimir</button>
            </div>
          </div>

          <div className='m-f'>
            <div className='fr-con'>
              <p className='fr-b'><b>Gastos a Comprobar</b></p>
            </div>
            <div className='fcc-i'>
              <p className='fimpre'>Oficio Presentación</p>
              <button className='b-imp'>Imprimir</button>
            </div>
            <div className='fcc-i'>
              <p className='fimpre'>Solicitud Programatica</p>
              <button className='b-imp'>Imprimir</button>
            </div>
            <div className='fcc-i'>
              <p className='fimpre'>Leyendas Alusivas al Gasto</p>
              <button className='b-imp'>Imprimir</button>
            </div>
          </div>

        </div>
      }

        {this.state.isHidden === 4 &&
          <div>
          <div className='m-f'>
            <div className='fcc-i'>
              <p className='fimpre'>Fecha Contrarecibo:</p>
              <input />
            </div>
            <div className='fcc-i'>
              <p className='fimpre'>No. Contrarecibo:</p>
              <input />
            </div>
            <div className='fcc-i'>
              <p className='fimpre'>Fecha Deposito:</p>
              <input />
            </div>
            <div className='fcc-i'>
              <p className='fimpre'>Cuenta por Pagar:</p>
              <input />
            </div>
            <div className='fcc-i'>
              <p className='fimpre'>Beneficiario/Proveedor:</p>
              <input />
            </div>
            <div className='fcc-i'>
              <p className='fimpre'>Sujeto Contable:</p>
              <input />
            </div>
            <div className='fcc-i'>
              <p className='fimpre'>Solicitud Programatica:</p>
              <input />
            </div>
            <div className='fcc-i'>
              <p className='fimpre'>Monto:</p>
              <input />
            </div>
            <div className='fcc-i'>
              <p className='fimpre'>CPA:</p>
              <input />
            </div>
          </div>
        </div>}

      </div>
    )
  }
}
