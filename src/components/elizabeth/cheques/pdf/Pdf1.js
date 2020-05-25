import React, {Component} from 'react';
import firebase from '../../../../Firebase';


import lpgjh from '../../../../img/logo-PGJH.jpg';
import programa from '../../../../img/logo.jpg';


export default class Pdf1 extends Component {
  render(){
          return(
            <div class='fader-1'>


            <div class='inicio'>
              <div class='titulos-p'>
            <img class="pgjh" src={lpgjh} alt=''/>
            <p> Solicitud Programática del Gasto</p>
            <img class="ims" src={programa} alt=''/>
            </div>
            </div>

            <div class='sub-1'>
                <div class='combo-1'>

                  <div class='uno'>
                  <p>Gasto a Comprobar</p>
                  <input class='input-1'/>
                  <p>Comprobacion de Gastos</p>
                  <input class='input-1'/>
                  </div>

                  <div class='uno'>
                  <p>Creación de Fondo Revolvente</p>
                  <input class='input-1'/>
                  <p>Fondo Revolvente</p>
                  <input class='input-1'/>
                  </div>

                  <div class='uno'>
                  <p>Cancelacion de Fondo Revolvente</p>
                  <input class='input-1'/>
                  <p>Viaticos Anticipados</p>
                  <input class='input-1'/>
                  </div>

                  <div class='uno'>
                  <p>Viaticos Devengados</p>
                  <input class='input-1'/>
                  <p>Comprobación de Viáticos</p>
                  <input class='input-1'/>
                  </div>

                  <div class='uno'>
                  <p >Pago a Proveedores</p>
                  <input class='input-1'/>
                  <p>Transferencias</p>
                  <input class='input-1'/>
                </div>
                </div>

            </div>
            <div class='texto-1'>
            <div>
                 <p> Beneficiario: León Maximiliano Hernández Valdés
                 <br/> Organo Superior Procuraduría General de Justicia del Estado
                 <br/>Unidad Presupuestal</p>
            </div>
            <div  class='text-2'>
                  <p class='texto-2'>No. Folio: </p>
            </div>
            </div>

            <div>
              <table>
                  <tr>
                      <th>Año</th>
                      <th>Ramo</th>
                      <th>OS</th>
                      <th>UP</th>
                      <th>Rubro de Ingreso</th>
                      <th>TG</th>
                      <th>Objeto de Gasto</th>
                      <th>Finalidad Funcion</th>
                      <th>Subf</th>
                      <th>Eje</th>
                      <th>Sect</th>
                      <th>Prog.</th>
                      <th>Subp</th>
                      <th>Obj</th>
                      <th>Proyecto</th>
                      <th>Est</th>
                      <th>Ben</th>
                      <th>E Geo</th>
                      <th>Descripcion del Objeto del Gasto</th>
                      <th></th>
                      <th></th>
                      <th>Monto</th>

                  </tr>
                  <tr>
                      <td></td>
                      <td>1</td>
                      <td>1</td>
                      <td>1</td>
                      <td>1</td>
                      <td>1</td>
                      <td>1</td>
                      <td>1</td>
                      <td>1</td>
                      <td>1</td>
                      <td>1</td>
                      <td>1</td>
                      <td>1</td>
                      <td>1</td>
                      <td>1</td>
                      <td>1</td>
                      <td>1</td>
                      <td>1</td>
                      <td>1</td>
                      <td> </td>
                      <td> </td>
                      <td> </td>
                </tr>
                <tr>
                    <td>1</td>
                    <td>1</td>
                    <td>1</td>
                    <td>1</td>
                    <td>1</td>
                    <td>1</td>
                    <td>1</td>
                    <td>1</td>
                    <td>1</td>
                    <td>1</td>
                    <td>1</td>
                    <td>1</td>
                    <td>1</td>
                    <td>1</td>
                    <td>1</td>
                    <td>1</td>
                    <td>1</td>
                    <td>1</td>
                    <td>1</td>
                    <td>1</td>
                    <td> </td>
                    <td> </td>
              </tr>
              <tr>
                  <td>1</td>
                  <td>1</td>
                  <td>1</td>
                  <td>1</td>
                  <td>1</td>
                  <td>1</td>
                  <td>1</td>
                  <td>1</td>
                  <td>1</td>
                  <td>1</td>
                  <td>1</td>
                  <td>1</td>
                  <td>1</td>
                  <td>1</td>
                  <td>1</td>
                  <td>1</td>
                  <td>1</td>
                  <td>1</td>
                  <td>1</td>
                  <td>1</td>
                  <td> </td>
                  <td> </td>
            </tr>
            <tr>
                <td>1</td>
                <td>1</td>
                <td>1</td>
                <td>1</td>
                <td>1</td>
                <td>1</td>
                <td>1</td>
                <td>1</td>
                <td>1</td>
                <td>1</td>
                <td>1</td>
                <td>1</td>
                <td>1</td>
                <td>1</td>
                <td>1</td>
                <td>1</td>
                <td>1</td>
                <td>1</td>
                <td>1</td>
                <td>1</td>
                <td> </td>
                <td> </td>
          </tr>
          <tr>
              <td>1</td>
              <td>1</td>
              <td>1</td>
              <td>1</td>
              <td>1</td>
              <td>1</td>
              <td>1</td>
              <td>1</td>
              <td>1</td>
              <td>1</td>
              <td>1</td>
              <td>1</td>
              <td>1</td>
              <td>1</td>
              <td>1</td>
              <td>1</td>
              <td>1</td>
              <td>1</td>
              <td>1</td>
              <td>1</td>
              <td>__________</td>
              <td>$ 1.000.000.00</td>
        </tr>
              </table>


              <div class='obs'>
                      <p> Observaciones:__________________________</p>
                      <p> No. De Solitud__________________________ </p>
              </div>
            </div>

            <div class='rev-1'>
            <p class='rev'>Elaboro</p>
            <p class='rev'>Reviso</p>
            </div>

            </div>
          )

  }
}
