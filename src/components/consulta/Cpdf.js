import React, { Component} from 'react';
import './Consulta.css';
import ReactToPrint from 'react-to-print';
import firebase from '../../Firebase';
import { NumberAsString } from '../fondos/NumerosLetras.js';
import clausula from '../../img/clausula.png';
import programa from '../../img/programalogo.png';
import boton from '../../img/boton.svg';
import boton2 from '../../img/circle-vol-1circle (1).svg';


class Cpdf extends Component{
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     fondo: {},
  //     key: ''
  //   };
  // }
  //
  // componentDidMount() {
  //   const ref = firebase.firestore().collection('fondos').doc(this.props.match.params.id);
  //   ref.get().then((doc) => {
  //     if (doc.exists) {
  //       this.setState({
  //         fondo: doc.data(),
  //         key: doc.id,
  //         isLoading: false
  //       });
  //     } else {
  //       console.log("No such document!");
  //     }
  //   });
  // }

render(){
  return(





<div className='cpdf-dad'>
        <div className='cpdf-subdad'> {/*ref={el => (this.holi= el) }*/}



                    <div class='fondo-procu'>
                    <img class="ime" src={programa}/>
                          <p>
                          Fondo: PROCURADURÍA GENERAL DE JUSTICIA DEL ESTADO <br/>
                          Sub: Fondo: N/A<br/>
                          Unidad Administrativa: DIRECCIÓN GENERAL DE ADMINISTRACIÓN Y FINANZAS<br/>
                          Area Generadora: DIRECCION DE RECURSOS FINANCIEROS
                          </p>

                    </div>
                    <div class="acomodar">
                              <div class='seccion-de'>
                                        <p>
                                        Sección: 5C. Recursos Financieros
                                        <br/>Serie: 5C.3 Gastos y Egresos por Partida Presupuestal
                                        <br/>Sub-serie: N/A
                                        <br/>Código: PGJH-09.1*5C.
                                        </p>
                              </div>

                              <div class='asunto-iz'>
                                <p>
                                Asunto: Fondos Revolventes
                                <br/>y/o Pagos Directos
                                </p>
                              </div>
                    </div>

                    <div class='acomodar-2'>


                                <div class="texto-ofi">
                                            <p>
                                            Fecha de apertura:{/*{this.state.}*/}
                                            <br/>fecha de Cierre
                                            <br/>fecha de contrarecibo
                                            <br/>
                                            </p>

                                </div>
                                <div class="num.exp">
                                            <p>Numero de Expediente:{/*{this.state.}*/}
                                            <br/>PGJH-09.1*5C.3/  Fondo 2020</p>


                                   <div class="pru">



                                        <div clas="pru-1">
                                            <p>
                                            <br/>Numero de Hojas:{/*{this.state.}*/}
                                            </p>
                                        </div>

                                        <div class="pru-2">
                                        <p>
                                            <br/>Num. Hojas :{/*{this.state.}*/}
                                            </p>
                                    </div>


                                    </div>
                              </div>
                        </div>
                        <div class="fundamento">

                        </div>


                        <div class="clausula">

                                              <p class="t-funda">Fundamento legal</p>
                                              <p class="cons">
                                              Costitucion Politica de los Estados Unidos Mexicanos, articulo 6 fraccion I y II, 8°Costitucions politica de los
                                              esatdos de Hidalgo; articulo 4 bis 17, 18, 19, 20, 21 89, 90 y 91. Ley Organica de Ministerio Publico del  Estado de Hidalgo, articulo  74 fracciones I, II, V, VI, IX, XIV,  Y XXX.
                                              Ley de transpariencia y Acceso a la  Informacion  Publica Gubernamental para el Estado de Hidalgo articulo 5 fraccion X, 6, 19, 20, 21, 22 fraccion XIV, XVI, XVII Y XX.
                                              Ley de Responsabilidades de los Servidores Publicos para el Estado de Hidalgo, articulos 42 y 47 fraccion II y III. Codigo Fiscal  de la Federacion de articulos 30, 67.
                                              Ley de los Archivos del Estado de Hidalgo articulos 2, 3, 4 fraccion X, 9 y 31. Reglamento de la Ley de los Archivos del Estado de Hidalgo articulo 21 fraccion I.
                                              </p>

                        </div>



        <div class="cajas">
                  <div class="cajas-valor1">
                              <p class="t-cajas">Valor documento primario</p>
                              <p class="t-cajas">
                              Administrativo<img className='svg'src={boton} alt=''/></p>
                              <p class="t-cajas">Fiscal<img className='svg' src={boton} alt=''/></p>
                              <p class="t-cajas">Legal<img className='svg' src={boton2} alt=''/></p>

                    </div>

                  <div class="cajas-valor2">
                              <p class="t-cajas">Valor Documental secundario</p>
                              <p class="t-cajas">Informativo<img className='svg' src={boton} alt=''/></p>
                              <p class="t-cajas">Evidencial<img className='svg' src={boton} alt=''/></p>
                              <p class="t-cajas">Testimonial<img className='svg' src={boton2} alt=''/></p>
                      </div>

                      <div class="cajas-valor3">
                              <p class="t-cajas">Clasificacion de la informacion</p>
                              <p class="t-cajas">Publica<img className='svg' src={boton} alt=''/></p>
                              <p class="t-cajas">Reservada<img className='svg' src={boton2} alt=''/></p>
                              <p class="t-cajas">Cofindencial<img className='svg' src={boton2} alt=''/></p>
                      </div>
              </div>

      <div class="contenedor">
          <div class="obser">
                    <div class="ubi">
                          <p class="ubi-t">Ubicacion Fisica del Expediente<br/>Archivo tramite de la procuraduria General de Justicia, Caja No.</p>
                    </div>
                    <div class="vigencia">
                                <p class="vig-t">Vigencia Documental</p>
                          <div class="vigencia2">
                                <p class="vig-t">En Tramite 1 Años</p>
                                <p class="vig-t">concentracion 4 años           </p>
                                <p class="vig-t">    Total de Años</p>
                                </div>
                    </div>
      </div>

          <div class="cuadro">
                              <p>Observaciones</p>
          </div>

          </div>

          <div class="final">
                          <div class="destino">
                                <div class= "df">
                                          <p> Destino Final</p>

                                </div>

                            <div class="df-t">
                            <p class="t-cajas">Baja<img className='svg' src={boton2} alt=''/></p>
                            <p class="t-cajas">Archivo historico<img className='svg' src={boton2} alt=''/></p>
                            <p class="t-cajas">Muestreo<img className='svg' src={boton} alt=''/></p>
                           </div>
          </div>

          <div class="fe-consulta">
          <div class= "df">
                    <p>Fechas de Consulta</p>

          </div>
          <p class="t-caja">1 dd mm aa</p>
          <p class="t-caja">2 dd mm aa</p>
          <p class="t-caja">3 dd mm aa</p>

                </div>

          </div>
</div>
</div>
)
}
}

export default Cpdf
