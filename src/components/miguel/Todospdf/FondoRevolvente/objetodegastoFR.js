import React, { Component } from 'react'
import './pdfs.css'
import lpgjh from '../../../../img/logo_hgo.png'
import programa from '../../../../img/logo.jpg'

export default class Gasto extends Component {
  render () {
    return (
      <div>
        <div />
        <div className='title-so'>
          <img className='pgjh' src={lpgjh} alt='' />
          <p>SOLICITUD PROGRAMÁTICA DEL GASTO</p>
          <img className='ims' src={programa} alt='' />
        </div>
        <div className='fadera'>
          <div className='contenedor-so'>
            <div className='contenedor-1'>
              <div className='interno'>
                <p className='text-so'>Gasto a Comprobar</p>
                <input className='input-so' />
              </div>
              <div className='interno'>
                <p className='text-so'>Comprobación de gasto</p>
                <input className='input-so' />
              </div>
            </div>
            <div className='contenedor-1'>
              <div className='interno'>
                <p className='text-so'>Creación de fondo Revolvente</p>
                <input className='input-so' />
              </div>
              <div className='interno'>
                <p className='text-so'>Fondo Revolvente</p>
                <input className='input-so' />
              </div>
              <div className='interno'>
                <p className='text-so'>Cancelacion de Fondo Revolvente</p>
                <input className='input-so' />
              </div>
            </div>
            <div className='contenedor-1'>
              <div className='interno'>
                <p className='text-so'>Viaticos Anticipados</p>
                <input className='input-so' />
              </div>
              <div className='interno'>
                <p className='text-so'>Viaticos Denegados</p>
                <input className='input-so' />
              </div>
              <div className='interno'>
                <p className='text-so'>Comprobación de viaticos</p>
                <input className='input-so' />
              </div>
              <div className='interno'>
                <p className='text-so'>Viaticos al Extrangero</p>
                <input className='input-so' />
              </div>
            </div>
            <div className='contenedor-1'>
              <div className='interno'>
                <p className='text-so'>Validación de Objeto del gasto</p>
                <input className='input-so' />
              </div>
              <div className='interno'>
                <p className='text-so'>Pago a Proveedores</p>
                <input className='input-so' />
              </div>
              <div className='interno'>
                <p className='text-so'>Pago a Proveedores por Requisición</p>
                <input className='input-so' />
              </div>
              <div className='interno'>
                <p className='text-so'>Transferencias</p>
                <input className='input-so' />
              </div>
            </div>
          </div>
        </div>
        <div className='padre-lineas'>
          <div className='lineas-so'>
            <div className='internos'>
              <p className='text-inte'>Beneficiario:</p>
              <input className='input-so2' />
            </div>
            <div className='internos'>
              <p className='text-inte2'>Organo Superior:</p>
              <input className='input-so2' />
            </div>
            <div className='internos'>
              <p className='text-inte3'>undiad Presupuestal:</p>
              <input className='input-so2' />
            </div>
          </div>
          <div className='folio'>
            <p className='text-folio'>No. Folio</p>
            <input className='input-so3' />
          </div>
        </div>
        <div>
          <div>
            <div className='tabla-so'>
              <table>
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
                  <td className='dg-tabla all-tabla'>Descripcion del objeto de Gasto</td>
                  <td className='monto-tabla all-tabla'>Monto</td>
                </tr>
                <tr>
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                </tr>
                <tr>
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                </tr>
                <tr>
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                </tr>
                <tr>
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                </tr>
                <tr>
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                </tr>
                <tr>
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                </tr>
                <tr>
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                </tr>
                <tr>
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                </tr>
                <tr>
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                </tr>
                <tr>
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                </tr>
                <tr>
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                </tr>
                <tr>
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                </tr>
                <tr>
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                </tr>
                <tr>
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                </tr>
                <tr>
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                </tr>
                <tr>
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                </tr>
                <tr>
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                </tr>
                <tr>
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                </tr>
                <tr>
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                </tr>
                <tr>
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                </tr>
                <tr>
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                </tr>
                <tr>
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                  <td className='all-tabla' />
                </tr>
                <tr>
                  <td className='all-tabla border-color' />
                  <td className='all-tabla border-color' />
                  <td className='all-tabla border-color' />
                  <td className='all-tabla border-color' />
                  <td className='all-tabla border-color' />
                  <td className='all-tabla border-color' />
                  <td className='all-tabla border-color' />
                  <td className='all-tabla border-color' />
                  <td className='all-tabla border-color' />
                  <td className='all-tabla border-color' />
                  <td className='all-tabla border-color' />
                  <td className='all-tabla border-color' />
                  <td className='all-tabla border-color' />
                  <td className='all-tabla  border-color' />
                  <td className='all-tabla  border-color' />
                  <td className='all-tabla  border-color' />
                  <td className='all-tabla  border-color' />
                  <td className='all-tabla  border-color' />
                  <td className='all-tabla border-color2 text-rete'>RETENCION</td>
                  <td className='all-tabla' />
                </tr>
                <tr>
                  <td className='all-tabla border-color' />
                  <td className='all-tabla border-color' />
                  <td className='all-tabla border-color' />
                  <td className='all-tabla border-color' />
                  <td className='all-tabla border-color' />
                  <td className='all-tabla border-color' />
                  <td className='all-tabla border-color' />
                  <td className='all-tabla border-color' />
                  <td className='all-tabla border-color' />
                  <td className='all-tabla border-color' />
                  <td className='all-tabla border-color' />
                  <td className='all-tabla border-color' />
                  <td className='all-tabla border-color' />
                  <td className='all-tabla border-color' />
                  <td className='all-tabla border-color' />
                  <td className='all-tabla border-color' />
                  <td className='all-tabla border-color' />
                  <td className='all-tabla border-color' />
                  <td className='all-tabla border-color text-rete'>Total</td>
                  <td className='all-tabla' />
                </tr>
              </table>
            </div>
          </div>
        </div>
        <div className='obs-sopadre'>
          <div className='obs-so'>
            <p className='text-osb'>Observaciones</p>
            <input className='input-obs' />
            <div className='obs-so2'>
              <p className='text-osb'> No. De Solicitud</p>
              <input />
            </div>
          </div>
        </div>
        <div className='padre-firmas'>
          <div className='firmas'>
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
