import React, {Component} from 'react';
import css from './pdfs.css';
import lpgjh from '../../../img/logo_hgo.png';
import programa from '../../../img/logo.jpg';
export default class Gasto extends Component{
    render(){
        return(
          <div>
          <div><p>
          </p>
          </div>
          <div class='title-so'>

            <img class="pgjh" src={lpgjh} alt=''/>
            <p>SOLICITUD PROGRAMÁTICA DEL GASTO</p>
            <img class="ims" src={programa} alt=''/>

          </div>

        <div class='fadera'>
          <div class='contenedor-so'>
            <div class='contenedor-1'>
              <div class="interno">
                <p class="text-so">Gasto a Comprobar</p>
                <input class='input-so'/>
              </div>
              <div class="interno">
                  <p class="text-so">Comprobación de gasto</p>
                  <input class='input-so'/>
                  </div>
                 </div>

                 <div class='contenedor-1'>
                 <div class="interno">
                  <p class="text-so">Creación de fondo Revolvente</p>
                  <input class='input-so' />
                  </div>
                  <div class="interno">
                  <p class="text-so">Fondo Revolvente</p>
                  <input class='input-so'/>
                  </div>
                  <div class="interno">
                  <p class="text-so">Cancelacion de Fondo Revolvente</p>
                  <input class='input-so'/>
                  </div>
                  </div>

                  <div class='contenedor-1'>
                  <div class="interno">
                  <p class="text-so">Viaticos Anticipados</p>
                  <input class='input-so'/>
                  </div>
                  <div class="interno">
                  <p class="text-so">Viaticos Denegados</p>
                  <input class='input-so'/>
                  </div>
                  <div class="interno">
                  <p class="text-so">Comprobación de viaticos</p>
                  <input class='input-so'/>
                  </div>
                  <div class="interno">
                  <p class="text-so">Viaticos al Extrangero</p>
                  <input class='input-so'/>
                  </div>
                  </div>

                <div class='contenedor-1'>
                  <div class="interno">
                  <p class="text-so">Validación de Objeto del gasto</p>
                  <input class='input-so'/>
                  </div>
                  <div class="interno">
                  <p class="text-so">Pago a Proveedores</p>
                  <input class='input-so'/>
                  </div>
                  <div class="interno">
                  <p class="text-so">Pago a Proveedores por Requisición</p>
                  <input class='input-so'/>
                  </div>
                  <div class="interno">
                  <p class="text-so">Transferencias</p>
                  <input class='input-so'/>
                  </div>
                  </div>
                  </div>
                  </div>


                  <div class="padre-lineas">
                    <div class="lineas-so">
                          <div class='internos'>
                            <p class='text-inte'>Beneficiario:</p>
                              <input class='input-so2'/>
                          </div>
                          <div class='internos'>
                            <p class='text-inte2'>Organo Superior:</p>
                            <input class='input-so2' />
                          </div>
                          <div class='internos'>
                            <p class='text-inte3'>undiad Presupuestal:</p>
                            <input class='input-so2' />
                            </div>
                      </div>
                      <div class="folio">
                        <p className='text-folio'>No. Folio</p>
                        <input class='input-so3' />
                      </div>

                  </div>

          <div>
          <div>
           <div class="tabla-so">
           <table >
           <tr>
           <td className='all-tabla'>Ramo</td>
           <td className='all-tabla'>Año</td>
           <td className='all-tabla'>OS</td>
           <td className='all-tabla'>UP</td>
           <td className='all-tabla'>Rubro de Ingreso</td>
           <td className='all-tabla'>TG</td>
           <td className='all-tabla'>Objeto de un Gasto</td>
           <td className='all-tabla'>Finalidad</td>
           <td className='all-tabla'>Funcion</td>
           <td className='all-tabla'>Subfunción</td>
           <td className='all-tabla'>Eje</td>
           <td className='all-tabla'>Sect</td>
           <td className='all-tabla'>Prog</td>
           <td className='all-tabla'>Obj</td>
           <td className='all-tabla'>Proyecto</td>
           <td className='all-tabla'>Ext</td>
           <td className='all-tabla'>Ben</td>
           <td className='all-tabla'>E Geo</td>
           <td className='dg-tabla all-tabla '>Descripcion del objeto de Gasto</td>
           <td className='monto-tabla all-tabla'>Monto</td>
           </tr>

           <tr>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>

           </tr>

           <tr>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           </tr>

           <tr>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           </tr>

           <tr>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           </tr>

           <tr>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           </tr>

           <tr>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           </tr>
           <tr>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           </tr>
           <tr>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           </tr>
           <tr>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           </tr>
           <tr>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           </tr>

           <tr>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           </tr>


           <tr>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           </tr>
           <tr>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           </tr>
           <tr>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           </tr>
           <tr>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           </tr>
           <tr>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           </tr>
           <tr>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           </tr>
           <tr>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           </tr>
           <tr>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           </tr>
           <tr>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           </tr>


           <tr>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           </tr>
           <tr>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           <td className='all-tabla'></td>
           </tr>

           <tr>
           <td className='all-tabla  border-color'></td>
           <td className='all-tabla  border-color'></td>
           <td className='all-tabla  border-color'></td>
           <td className='all-tabla  border-color'></td>
           <td className='all-tabla  border-color'></td>
           <td className='all-tabla  border-color'></td>
           <td className='all-tabla  border-color'></td>
           <td className='all-tabla  border-color'></td>
           <td className='all-tabla  border-color'></td>
           <td className='all-tabla  border-color'></td>
           <td className='all-tabla  border-color'></td>
           <td className='all-tabla  border-color'></td>
           <td className='all-tabla  border-color'></td>
           <td className='all-tabla  border-color'></td>
           <td className='all-tabla  border-color'></td>
           <td className='all-tabla  border-color'></td>
           <td className='all-tabla  border-color'></td>
           <td className='all-tabla  border-color'></td>
           <td className='all-tabla border-color2'>RETENCION</td>
           <td className='all-tabla'></td>
           </tr>
           <tr>
           <td className='all-tabla  border-color'></td>
           <td className='all-tabla  border-color'></td>
           <td className='all-tabla  border-color'></td>
           <td className='all-tabla  border-color'></td>
           <td className='all-tabla  border-color'></td>
           <td className='all-tabla  border-color'></td>
           <td className='all-tabla  border-color'></td>
           <td className='all-tabla  border-color'></td>
           <td className='all-tabla  border-color'></td>
           <td className='all-tabla  border-color'></td>
           <td className='all-tabla  border-color'></td>
           <td className='all-tabla  border-color'></td>
           <td className='all-tabla  border-color'></td>
           <td className='all-tabla  border-color'></td>
           <td className='all-tabla  border-color'></td>
           <td className='all-tabla  border-color'></td>
           <td className='all-tabla  border-color'></td>
           <td className='all-tabla  border-color'></td>
           <td className='all-tabla  border-color' >Total</td>
           <td className='all-tabla'></td>
           </tr>
           </table>
           </div>
           </div>

          </div>
          <div className='obs-sopadre'>
          <div className='obs-so'>
          <p className='text-osb'>Observaciones </p>
          <input className='input-obs'/>
          <p className='text-osb'> No. De Solicitud</p>
          <input/>
          </div>
          </div>


          <div className='padre-firmas'>
          <div className='firmas' >
          <p className='text-firmas'>Elaboro</p>
          </div>
          <div className='firmas'>
          <p className='text-firmas'>Reviso</p>
          </div>
          </div>
          </div>



        )
      }
    }
