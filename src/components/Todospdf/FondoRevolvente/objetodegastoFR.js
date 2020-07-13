import React, {Component} from 'react';
import css from './pdfs.css';
import lpgjh from '../../../img/logo-PGJH.jpg';
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
                        <p>No. Folio</p>
                        <input class='input-so3' />
                      </div>
                  </div>

          <div>
          <div>
           <div>
           <table>
           <tr>
           <td className='all-tabla'>Ramo</td>
           <td className='all-tabla'>Año</td>
           <td className='all-tabla'>OS</td>
           <td className='all-tabla'>UP</td>
           <td className='all-tabla'>Rubro de Ingreso</td>
           <td className='all-tabla'>Tipo de Gasto</td>
           <td className='all-tabla'>Objeto de un Gasto</td>
           <td className='all-tabla'>Finalidad</td>
           <td className='all-tabla'>Funcion</td>
           <td className='all-tabla'>Subfunción</td>
           <td className='all-tabla'>Eje Temático</td>
           <td className='all-tabla'>Sector</td>
           <td className='all-tabla'>Programa</td>
           <td className='all-tabla'>bjetivo</td>
           <td className='all-tabla'>Proyecto</td>
           <td className='all-tabla'>Extrategia</td>
           <td className='all-tabla'>Beneficiario</td>
           <td className='all-tabla'>Espacio Geografico</td>
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
           </tr><tr>
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




           </table>
           </div>
           </div>


          </div>
          <div>
          <p>Observaciones </p>
          <p> No. De Solicitud</p>
          </div>
          </div>



        )
      }
    }
