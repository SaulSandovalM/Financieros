import React, { Component} from 'react';
import './Consulta.css';
import ReactToPrint from 'react-to-print';
import firebase from '../../Firebase';
import { NumberAsString } from '../fondos/NumerosLetras.js';

class Pdf extends Component{
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
      <div className='fecha'>
        <div class='subdad' ref={el => (this.holi= el)}>
          <div className='bueno'>
            <p class="texto-de-pdf">Bueno por: {this.state.fondo.importe}</p>
          </div>
          <div class="recibi">
            <p class="texto-de-pdf">Recibí   de la  Secretaría  de  Finanzas Públicas  del  Gobierno  del  Estado de Hidalgo la cantidad de:
             $ {this.state.fondo.importe} ({(NumberAsString(this.state.fondo.importe))})</p>
          </div>
          <div class="concepto">
            <p class="texto-de-pdf">Por {this.state.fondo.tipo_doc}</p>
          </div>
          <div class='fecha'>
            <p class="texto-de-pdf">Pachuca de Soto, Hgo a {today}</p>
          </div>
          <div class='refe'>
            <p class="texto-de-pdf">DIRECTOR GENERAL DE<br/>ADMINISTRACIÓN Y FINANZAS</p>
          </div>
          <div class='firma-dad-r'>
            <div class='firma-raya-r'>
              <p class="texto-de-pdf">MTRO. LEÓN MAXIMILIANO HERNÁNDEZ VALDÉS<br/>R.F.C.: HEVL-750104</p>
            </div>
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

export default Pdf
