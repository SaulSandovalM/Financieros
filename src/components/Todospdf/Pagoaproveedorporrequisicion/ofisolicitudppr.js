import React, { Component} from 'react';
import './Consulta.css';
import ReactToPrint from 'react-to-print';
import firebase from '../../../Firebase';
import { NumberAsString } from '../fondos/NumerosLetras.js';
import logo2 from  '../../../img/logo.jpg';

class Frpdf extends Component{
  constructor(props) {
    super(props);
    this.state = {
      fondo: {},
      key: ''
    };
  }

  componentDidMount() {
    const ref = firebase.firestore().collection('fondos').doc(this.props.match.params.id);
    ref.get().then((doc) => {
      if (doc.exists) {
        this.setState({
          fondo: doc.data(),
          key: doc.id,
          isLoading: false
        });
      } else {
        console.log('No hay documento');
      }
    });
  }

  render(){

    var today = new Date();
    var meses =  [ 'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre' ];
    var diasSemana = [ 'Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado'];
    var f = new Date();
    today = diasSemana[f.getDay()] + ', ' + f.getDate() + ' de ' + meses[f.getMonth()] + ' de ' + f.getFullYear();

    return(
      <div className='pppdf-dad'>
        <div className='pppdf-subdad' ref={el => (this.holi= el)}>
          <div class='fondo-procu'>
            <img class='ime' src={logo2} alt=''/>
          </div>
          <div class='no-oficio'>
            <p><b>Oficio No:</b> PGI/DGAyF/ {this.state.fondo.no_oficio}
            <br/> Pachuca de Soto, Hidalgo a {today}
            <br/><b>Asunto </b>Solicitud de Pago Proveedor por Requisicón</p>
          </div>
          <div class='prensente'>
            <p><b>Lic. César Alberto González López
            <br/>Subsecretario de Egresos de la
            <br/> Secretaría de Finanzas Públicas
            <br/>Presente</b></p>
          </div>
          <div class='añadido'>
            <p><b>AT'N: L.C.P. Karina Barrios Velázquez
            <br/>Directora General de Contabilidad
            <br/>Gubernamental</b></p>
          </div>
          <div class='texto-ofi_ppp'>
            <p> Por medio de presente me permito enviar a Usted documentación por un numero total de
            $ {this.state.fondo.importe} ({(NumberAsString(this.state.fondo.importe))}), amparada con CFDI No______, numero de
            prequisición_______ pedido/contrato ___________, asi como la poliza de afectacion,
            presumpuestal al momento del comprometido num________ que se emite la Direccion General de
            Compras Publicas; para que se efectúe el tramite de pago  a favro del proveedor ___________________
            , por la (compra o presentacion de servicios  xxxxxxxxxxx, con cargo
            al proyecto (clave y nombre del proyecto) y de lso recursos otorgados con el oficio de autorización
            (numero de oficio), numero de oficio a la secretaria de _______________________________.</p>
            <p>Sin otro particular por el momento, reciba un cordial saludo</p>
          </div>
          <div class='atte'>
            <p> Atentamente
            <br/>Director General</p>
          </div>
          <div class='firma-dad'>
            <div class='firma-raya'>
              <p class='mtro'>MTRO. LEÓN MAXIMILIANO HERNÁNDEZ VALDÉS</p>
            </div>
          </div>
          <div class='ccp'>
            <p class='text'>C.C.P...- Expedien<br/>Minutario<br/>LMHV/NRL/macht</p>
          </div>
        </div>
        <ReactToPrint
          trigger={() => <buttom class='bont_imprimir'>imprimir</buttom>}
          content={()=> this.holi}
        />
      </div>
    )
  }
}

export default Frpdf
