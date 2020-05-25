import React, {Component} from 'react';
import firebase from '../../../../Firebase';
import css from './pdfs.css';

import lpgjh from '../../../../img/logo-PGJH.jpg';
import programa from '../../../../img/logo.jpg';

export default class Pdf3 extends Component{
    render(){
        return(
              <div>
                    <p>Hola mundo</p>
                    <div>
                    <img class="pgjh" src={lpgjh} alt=''/>
                    <p> Solicitud Programática del Gasto</p>
                    <img class="ims" src={programa} alt=''/>

                    </div>
                    <div>
                          <p>Gasto a Comprobar</p>
                          <input/>
                          <p>Comprobacion de Gastos</p>
                          <input/>
                          <p>Creación de Fondo Revolvente</p>
                          <input/>
                          <p>Fondo Revolvente</p>
                          <input/>
                          <p>Cancelacion de Fondo Revolvente</p>
                          <input/>
                          <p>Viaticos Anticipados</p>
                          <input/>
                          <p>Viaticos Devengados</p>
                          <input/>
                          <p>Comprobación de Viáticos</p>
                          <input/>
                          <p>Pago a Proveedores</p>
                          <input/>
                          <p>Transferencias</p>
                          <input/>

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
