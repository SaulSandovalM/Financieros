import React, { Component} from 'react';
import './Caratula.css';
import ReactToPrint from 'react-to-print';
import boton from '../../img/cua.png';
import boton2 from '../../img/cua2.png';
import programa from '../../img/logo_hgo.png';
import logo2 from  '../../img/logo.jpg';
import footer from '../../img/footer.png';

class Cpdf extends Component{
  constructor(props) {
    super(props);
    this.state = {
      hojas: ''
    };
  }
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
  //       console.log('No such document!');
  //     }
  //   });
  // }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value})
  }

  render(){
    return(
      <div className='cpdf-dad2'>
        <div className='cpdf-subdad2' ref={el => (this.holi= el)} >
          <div className='fondo-procus'>
            <img className='ims' src={programa} alt=''/>
            <img className='im' src={logo2} alt=''/>
          </div>
          <div className='procu'>
            <p className='text'>
              Fondo: PROCURADURÍA GENERAL DE JUSTICIA DEL ESTADO <br/>
              Sub: Fondo: N/A<br/>
              Unidad Administrativa: DIRECCIÓN GENERAL DE ADMINISTRACIÓN Y FINANZAS<br/>
              Area Generadora: DIRECCIÓN DE RECURSOS FINANCIEROS
            </p>
          </div>
          <div className='acomodar'>
            <div className='seccion-de'>
              <p  className='text'>
                Sección: 5C. Recursos Financieros
                <br/>Serie: 5C.3 Gastos y Egresos por Partida Presupuestal
                <br/>Sub-serie: N/A
                <br/>Código: PGJH-09.1*5C.
              </p>
            </div>
            <div className='asunto-iz'>
              <p className='text-2'>
              Asunto: Publicaciones e Impresoras Institucionales Procuraduría General de Justicia
              <br/>y/o Pagos Directos
              </p>
            </div>
          </div>
          <div className='acomodar-2'>
            <div className='texto-ofi'>
              <p  className='text'>Fecha de Apertura:{/*{this.state.}*/}</p>
              <p  className='text'>Fecha de Cierre:{/*{this.state.}*/}</p>
            </div>
            <div className='num-exp'>
              <p className='text-2'>Número de Expediente:{/*{this.state.}*/}
                <br/>PGJH-09.1*5C.3/  Fondo 2020
                <br/>Número de hojas:
                <input
                  className='hojas'
                  name='hojas'
                  onChange={this.handleChange.bind(this)}
                  value={this.state.hojas}
                />
              </p>
            </div>
          </div>
          <div className='fundamento'>
          </div>
          <div className='clausula'>
            <p className='cons'>
            <b className='negritas'>Fundamento legal </b>
             Costitución Politíca de los Estados Unidos Mexicanos, artículo 6 fracción I y II, 8° Costitución politica del
            Estados de Hidalgo, artículo 4 ter 89, 90 y 91. Ley Organica de Ministerio Público del Estado de Hidalgo, artículo 17 y 27 fracciones I, 36.
            Ley de transpariencia y Acceso a la  Información  Publica Gubernamental para el Estado de Hidalgo artículo 5 fracción X, 6, 22 fracciones XVIII y XIX.
            36 fracción I, Ley de Responsabilidades de los Servidores Públicos del Estado de Hidalgo, artículos 47. Ley de Archivos del Estado de Hidalgo artículos 2, 3, 4, fracción X, 9 y 31.
            Reglamento de la Ley de los Archivos del Estado de Hidalgo artículo 2 fracción I.
            </p>
          </div>
          <div className='cajas'>
            <div className='cajas-valor1'>
              <p className='t-cajass'>Valor Documento Primario</p>
              <p className='t-cajas'>Administrativo<img className='svg'src={boton2} alt=''/></p>
              <p className='t-cajas'>Fiscal <img className='svg' src={boton} alt=''/></p>
              <p className='t-cajas'>Legal<img className='svg' src={boton} alt=''/></p>
            </div>
            <div className='cajas-valor2'>
              <p className='t-cajass'>Valor Documental Secundario</p>
              <p className='t-cajas'>Informativo <img className='svg' src={boton2} alt=''/></p>
              <p className='t-cajas'>Evidencial<img className='svg' src={boton} alt=''/></p>
              <p className='t-cajas'>Testimonial<img className='svg' src={boton} alt=''/></p>
            </div>
            <div className='cajas-valor3'>
              <p className='t-cajass'>Clasificación de la Información</p>
              <p className='t-cajas'>Pública<img className='svg' src={boton2} alt=''/></p>
              <p className='t-cajas'>Reservada<img className='svg' src={boton} alt=''/></p>
              <p className='t-cajas'>Cofindencial<img className='svg' src={boton} alt=''/></p>
            </div>
          </div>
          <div className='contenedor'>
            <div className='obser'>
              <div className='vigencia'>
                <p className='vig-t'>Vigencia Documental</p>
                <div className='vigencia2'>
                  <p className='vig-t'>En Tramite 1 Años</p>
                  <p className='vig-t'>Concentracion 4 años</p>
                  <p className='vig-t'>Total de Años</p>
                </div>
              </div>
              <div className='ubi'>
                <p className='ubi-t'>Ubicacion Fisica del Expediente<br/>Archivo tramite de la Procuraduria General de Justicia, Archivo Inv. N 00167758</p>
              </div>
            </div>
            <div className='cuadro'>
              <p className='ubi-t2'>Observaciones</p>
            </div>
          </div>
          <div className='final'>
            <div className='destino'>
              <div className= 'df'>
                <p className='t-caja'> Destino Final</p>
              </div>
              <div className='df-t'>
                <p className='t-cajas'>
                  Baja
                  <img className='svg' src={boton} alt=''/>
                </p>
                <p className='t-cajas'>
                  Archivo historico
                  <img className='svg' src={boton} alt=''/>
                </p>
                <p className='t-cajas'>
                  Muestreo
                  <img className='svg' src={boton2} alt=''/>
                </p>
             </div>
          </div>
          <div className='fe-consulta'>
            <div className= 'df'>
              <p className='t-caja'>Fecha(s) de Consulta</p>
            </div>
            <p className='t-caja'>1 dd mm aa</p>
            <p className='t-caja'>2 dd mm aa</p>
            <p className='t-caja'>3 dd mm aa</p>
          </div>
        </div>
        <img className='footer' src={footer} alt=''/>
      </div>

      {this.state.hojas &&
        <ReactToPrint
          trigger={() => <buttom className='bont_imprimir'>imprimir</buttom>}
          content={()=> this.holi}
        />
      }
    </div>
    )
  }
}

export default Cpdf
