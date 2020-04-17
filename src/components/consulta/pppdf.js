import React, { Component} from 'react';
import './Consulta.css';
import ReactToPrint from 'react-to-print';
import firebase from '../../Firebase';
import { NumberAsString } from '../fondos/NumerosLetras.js';

class Pppdf extends Component{
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
        console.log("No such document!");
      }
    });
  }

  render(){

    var today = new Date();
    var meses = new Array ("Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre");
    var diasSemana = new Array("Domingo","Lunes","Martes","Miércoles","Jueves","Viernes","Sábado");
    var f = new Date();
    today = diasSemana[f.getDay()] + ", " + f.getDate() + " de " + meses[f.getMonth()] + " de " + f.getFullYear();

    return(
      <div className='pppdf-dad'>
        <div className='pppdf-subdad' ref={el => (this.holi= el)}>
          <div class='direccion'>
            <p> Direccion General de Administración y Finanzas </p>
          </div>
          <div class="no-oficio">
            <p>Oficio No: PGI/DGAyF/ {this.state.fondo.no_oficio} /2020<br/> Pachuca de Soto, Hgo a {today}</p>
          </div>
          <div class='prensente'>
            <p>L.A.E. CESAR  ALBERTO GONALEZ LOPEZ
            <br/>SUBSECRETARIO DE EGRESOS DE LA
            <br/>SECRETARIA DE FINANZAS
            <br/> P  R  E  S  E  N  T E</p>
          </div>
          <div class='añadido'>
            <p>AT'N.: L.C.P. KARINA BARRIOS  VELZAZQUEZ
            <br/>DIRECTORA  GENERAL DE CONTABILIDAD
            <br/>GUBERNAMEENTAL</p>
          </div>
          <div class="texto-ofi">
            <p>Por este medio me permito remitir a usted, facturas a nombre de Beneficiario "{this.state.fondo.beneficiario}"
            para su correspondiente trámite de pago; el monto total de las facturas asciende a la cantidad de $ {this.state.fondo.importe} ({(NumberAsString(this.state.fondo.importe))}),
            por concepto de pago a proveedor, correspondiente a Gasto de Operación según oficio de autorización {this.state.fondo.oficio_aut} del Ejercicio 2020</p>
            <p>Sin otro particular, le envío un cordial y afectuoso saludo</p>
           </div>
           <div class="atte">
              <p> A T E N T A M E N T E
              <br/>EL DIRECTOR GENERAL</p>
           </div>
          <div class='firma-dad'>
            <div class='firma-raya'>
              <p>MTRO. LEÓN MAXIMILIANO HERNÁNDEZ VALDÉS</p>
            </div>
          </div>
          <div class="ccp">
            <p class="text">C.C.P...- Expedien<br/>Minutario<br/>LMHV/NRL/macht</p>
          </div>
        </div>
        <ReactToPrint
          trigger={() => <buttom class="bont_imprimir">imprimir</buttom>}
          content={()=> this.holi}
        />
      </div>
    )
  }
}

export default Pppdf
