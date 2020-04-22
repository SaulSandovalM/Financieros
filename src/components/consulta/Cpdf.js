import React, { Component} from 'react';
import './Consulta.css';
import ReactToPrint from 'react-to-print';
import firebase from '../../Firebase';
import { NumberAsString } from '../fondos/NumerosLetras.js';
import clausula from '../../img/clausula.png';
import boton from '../../img/cua.png';
import boton2 from '../../img/cua2.png';
import programa from '../../img/logo_hgo.png';
import logo2 from  '../../img/logo.jpg';
import footer from '../../img/footer.png';


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



                    <div class='fondo-procus'>
                    <img class="im" src={programa}/>
                      <img class="im" src={logo2}/>


                    </div>
                    <div class="procu">
                    <p class="text">
                    Fondo: PROCURADURÍA GENERAL DE JUSTICIA DEL ESTADO <br/>
                    Sub: Fondo: N/A<br/>
                    Unidad Administrativa: DIRECCIÓN GENERAL DE ADMINISTRACIÓN Y FINANZAS<br/>
                    Area Generadora: DIRECCION DE RECURSOS FINANCIEROS
                    </p>
                    </div>
                    <div class="acomodar">

                              <div class='seccion-de'>
                                        <p  class="text">
                                        Sección: 5C. Recursos Financieros
                                        <br/>Serie: 5C.3 Gastos y Egresos por Partida Presupuestal
                                        <br/>Sub-serie: N/A
                                        <br/>Código: PGJH-09.1*5C.
                                        </p>
                              </div>

                              <div class='asunto-iz'>
                                <p  class="text-2">
                                Asunto: Publicaciones e impresoras Institucionales procuraduria General de Justicia
                                <br/>y/o Pagos Directos
                                </p>
                              </div>
                    </div>

                    <div class='acomodar-2'>


                                <div class="texto-ofi">
                                            <p  class="text">
                                            Fecha de apertura:{/*{this.state.}*/}
                                            </p>
                                            <p  class="text">
                                            Fecha de Cierre:{/*{this.state.}*/}
                                            </p>

                                </div>
                                <div class="num-exp">
                                            <p class="text-2">Numero de Expediente:{/*{this.state.}*/}
                                            <br/>PGJH-09.1*5C.3/  Fondo 2020
                                            <br/>Numero de hojas:{/*{this.state.}*/}</p>
                              </div>
                        </div>
                        <div class="fundamento">

                        </div>


                        <div class="clausula">

                                              <p class="cons">
                                              <b class="negritas">Fundamento legal </b>
                                               Costitucion Politica de los Estados Unidos Mexicanos, articulo 6 fraccion I y II, 8°Costitucions politica de los
                                              esatdos de Hidalgo; articulo 4 bis 17, 18, 19, 20, 21 89, 90 y 91. Ley Organica de Ministerio Publico del  Estado de Hidalgo, articulo  74 fracciones I, II, V, VI, IX, XIV,  Y XXX.
                                              Ley de transpariencia y Acceso a la  Informacion  Publica Gubernamental para el Estado de Hidalgo articulo 5 fraccion X, 6, 19, 20, 21, 22 fraccion XIV, XVI, XVII Y XX.
                                              Ley de Responsabilidades de los Servidores Publicos para el Estado de Hidalgo, articulos 42 y 47 fraccion II y III. Codigo Fiscal  de la Federacion de articulos 30, 67.
                                              Ley de los Archivos del Estado de Hidalgo articulos 2, 3, 4 fraccion X, 9 y 31. Reglamento de la Ley de los Archivos del Estado de Hidalgo articulo 2 fraccion I.
                                              </p>

                        </div>



        <div class="cajas">
                  <div class="cajas-valor1">
                              <p class="t-cajass">Valor documento primario</p>
                              <p class="t-cajas">Administrativo<img className='svg'src={boton2} alt=''/></p>
                              <p class="t-cajas">Fiscal <img className='svg' src={boton} alt=''/></p>
                              <p class="t-cajas">Legal<img className='svg' src={boton} alt=''/></p>

                    </div>

                  <div class="cajas-valor2">
                              <p class="t-cajass">Valor Documental secundario</p>
                              <p class="t-cajas">Informativo <img className='svg' src={boton2} alt=''/></p>
                              <p class="t-cajas">Evidencial<img className='svg' src={boton} alt=''/></p>
                              <p class="t-cajas">Testimonial<img className='svg' src={boton} alt=''/></p>
                      </div>

                      <div class="cajas-valor3">
                              <p class="t-cajass">Clasificacion de la informacion</p>
                              <p class="t-cajas">Publica<img className='svg' src={boton2} alt=''/></p>
                              <p class="t-cajas">Reservada<img className='svg' src={boton} alt=''/></p>
                              <p class="t-cajas">Cofindencial<img className='svg' src={boton} alt=''/></p>
                      </div>
              </div>

      <div class="contenedor">
          <div class="obser">

                    <div class="vigencia">
                                <p class="vig-t">Vigencia Documental</p>
                          <div class="vigencia2">
                                <p class="vig-t">En Tramite 1 Años</p>
                                <p class="vig-t">concentracion 4 años           </p>
                                <p class="vig-t">Total de Años</p>
                                </div>
                    </div>
                    <div class="ubi">
                          <p class="ubi-t">Ubicacion Fisica del Expediente<br/>Archivo tramite de la procuraduria General de Justicia, Archivo Inv. N 00167758</p>
                    </div>
      </div>

          <div class="cuadro">
                              <p class="ubi-t2">Observaciones</p>
          </div>

          </div>

          <div class="final">
                          <div class="destino">
                                <div class= "df">
                                          <p class="t-caja"> Destino Final</p>

                                </div>

                            <div class="df-t">
                            <p class="t-cajas">Baja<img className='svg' src={boton} alt=''/></p>
                            <p class="t-cajas">Archivo historico<img className='svg' src={boton} alt=''/></p>
                            <p class="t-cajas">Muestreo<img className='svg' src={boton2} alt=''/></p>
                           </div>
          </div>

          <div class="fe-consulta">
          <div class= "df">
                    <p class="t-caja">Fecha(s) de Consulta</p>

          </div>
          <p class="t-caja">1 dd mm aa</p>
          <p class="t-caja">2 dd mm aa</p>
          <p class="t-caja">3 dd mm aa</p>

                </div>

          </div>

 <img className='footer' src={footer} alt=''/>



</div>

</div>
)
}
}

export default Cpdf
