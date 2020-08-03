import React, { Component } from 'react'
import firebase from '../../../../Firebase'
import lpgjh from '../../../../img/logo-PGJH.jpg'
import programa from '../../../../img/logo.jpg'

export default class Fond extends Component {
    render(){
      return(
        <div>
              <p> Hola mundo</p>
              <div>
              <img class="pgjh" src={lpgjh} alt=''/>
              <p> Solicitud Programática del Gasto</p>
              <img class="ims" src={programa} alt=''/>

              </div>
                <div>
                      <p> PROCURADURÍA GENERAL DE JUSTICIA </p>
                      <br/>
                      <p> </p>
                      <br/>
                      <p> </p>
                </div>

                <div>
                    <table>
                      <tr>
                        <th>Partida</th>
                        <th>U.P.</th>
                        <th>Importe</th>


                      </tr>
                      <tr>
                        <td>123654</td>
                        <td>25</td>
                        <td>$ 1.000.000.00</td>

                      </tr>
                      <tr>
                        <th>Total</th>
                        <td></td>
                        <td>$ 1.000.000.00</td>

                      </tr>

                    </table>




                </div>
      </div>

      )
    }
}
