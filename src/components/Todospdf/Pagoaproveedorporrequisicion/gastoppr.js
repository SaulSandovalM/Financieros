import React, {Component} from 'react';

import css from './pdfs.css';

import lpgjh from '../../../img/logo_hgo.png';
import programa from '../../../img/logo.jpg';

export default class Gasto extends Component{
    render(){
        return(
            <div>

                <div >
                    <div className='title-ga'>
                        <div>
                          <img className="pgjh" src={lpgjh} alt=''/>
                        </div>

                        <div>
                          <p className='text-titulo-ga'>ORGANO SUPERIOR</p>
                          <p className='text-titulo-ga'>UNIDAD PRESUPUESTAL</p>
                          <p className='text-titulo-ga'>OBJETO DE GASTO</p>
                        </div>

                        <div>
                          <img className="ims" src={programa} alt=''/>
                        </div>
                   </div>
                </div>



                  <div className='faderinp'>
                    <div className='contenedor-ga'>

                        <div className='contenedor-1 '>
                          <div className='interno-ga'>
                          <p className='text-ga'>Gasto a Comprobar</p>
                          <input className='input-ga'/>
                          </div>

                          <div className='interno-ga'>
                          <p className='text-ga'>Comprobacion de Gastos</p>
                          <input className='input-ga'/>
                          </div>
                          </div>

                          <div className='contenedor-1'>
                          <div className='interno-ga'>
                          <p className='text-ga'>Creación de Fondo Revolvente</p>
                          <input className='input-ga'/>
                          </div>
                          <div className='interno-ga'>
                          <p className='text-ga'>Fondo Revolvente</p>
                          <input className='input-ga'/>
                          </div>
                          <div className='interno-ga'>
                          <p className='text-ga'>Cancelacion de Fondo Revolvente</p>
                          <input className='input-ga'/>
                          </div>
                          </div>


                          <div className='contenedor-1'>
                          <div className='interno-ga'>
                          <p className='text-ga'>Viaticos Anticipados</p>
                          <input className='input-ga'/>
                          </div>
                          <div className='interno-ga'>
                          <p className='text-ga'>Viaticos Devengados</p>
                          <input className='input-ga'/>
                          </div>
                          <div className='interno-ga'>
                          <p className='text-ga'>Comprobación de Viáticos</p>
                          <input className='input-ga'/>
                          </div>
                          </div>


                          <div className='contenedor-1'>
                          <div className='interno-ga'>
                          <p className='text-ga'>Pago a Proveedores</p>
                          <input className='input-ga'/>
                          </div>
                          <div className='interno-ga'>
                          <p className='text-ga'>Transferencias</p>
                          <input className='input-ga'/>
                          </div>
                          </div>

                    </div>
                  </div>

                  <div className='fader-tabla'>
                    <div className='tabla-ga' >
                        <table  className='tablagas'>
                          <tr>
                            <td className='alltabla-ga '>FOLIO DE LA FACTURA</td>
                            <td className='alltabla-ga '>IMPORTE</td>
                            <td className='alltabla-ga '>LEYENDA ALUSIVA AL GASTO</td>
                          </tr>
                          <tr>
                            <td className='all-tab'></td>
                            <td className='all-tab'></td>
                            <td className='all-tab'></td>
                          </tr>
                          <tr>
                            <td className='all-tab'></td>
                            <td className='all-tab'></td>
                            <td className='all-tab'></td>
                          </tr>
                          <tr>
                            <td className='all-tab'></td>
                            <td className='all-tab'></td>
                            <td className='all-tab'></td>
                          </tr>
                          <tr>
                            <td className='all-tab'></td>
                            <td className='all-tab'></td>
                            <td className='all-tab'></td>
                          </tr>
                          <tr>
                            <td className='all-tab'></td>
                            <td className='all-tab'></td>
                            <td className='all-tab'></td>
                          </tr>
                          <tr>
                          <td className='all-tab text-total-ga'>TOTAL</td>
                          <td className='all-tab'></td>
                        </tr>


                        </table>
            </div>
                    </div>

              </div>


        )
    }
}
