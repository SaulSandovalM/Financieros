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
                          <p>ORGANO SUPERIOR</p>
                          <p>UNIDAD PRESUPUESTAL</p>
                          <p>OBJETO DE GASTO</p>
                        </div>

                        <div>
                          <img className="ims" src={programa} alt=''/>
                        </div>
                   </div>
                </div>



                  <div className='faderinp'>
                    <div className='contenedor-ga'>

                        <div className='contenedor-1 '>
                          <div className='interno'>
                          <p>Gasto a Comprobar</p>
                          <input className='input-so'/>
                          </div>

                          <div className='interno'>
                          <p>Comprobacion de Gastos</p>
                          <input className='input-so'/>
                          </div>
                          </div>

                          <div className='contenedor-1'>
                          <div className='interno'>
                          <p>Creación de Fondo Revolvente</p>
                          <input className='input-so'/>
                          </div>
                          <div className='interno'>
                          <p>Fondo Revolvente</p>
                          <input className='input-so'/>
                          </div>
                          <div className='interno'>
                          <p>Cancelacion de Fondo Revolvente</p>
                          <input className='input-so'/>
                          </div>
                          </div>


                          <div className='contenedor-1'>
                          <div className='interno'>
                          <p>Viaticos Anticipados</p>
                          <input className='input-so'/>
                          </div>
                          <div className='interno'>
                          <p>Viaticos Devengados</p>
                          <input className='input-so'/>
                          </div>
                          <div className='interno'>
                          <p>Comprobación de Viáticos</p>
                          <input className='input-so'/>
                          </div>
                          </div>


                          <div className='contenedor-1'>
                          <div className='interno'>
                          <p>Pago a Proveedores</p>
                          <input className='input-so'/>
                          </div>
                          <div className='interno'>
                          <p>Transferencias</p>
                          <input className='input-so'/>
                          </div>
                          </div>

                    </div>
                  </div>
                    <div>
                        <table>
                          <tr>
                            <th>Folio de la Facctura</th>
                            <th>Importe</th>
                            <th>Leyenda alusiva al gasto</th>
                          </tr>
                          <tr>
                            <td>algo</td>
                            <td>algo</td>
                            <td>algo</td>
                          </tr>
                          <tr>
                            <td>algo</td>
                            <td>algo</td>
                          </tr>

                        </table>

                    </div>

              </div>


        )
    }
}
