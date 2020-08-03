import React, { Component} from 'react';
import './pdfs.css';
import ReactToPrint from 'react-to-print';
import firebase from '../../../Firebase';

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
            <br/><b>Asunto </b>  Reembolso de Fondo Revolvente</p>
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
            <p> Por medio de presente me permito enviar a Usted documentación amparada con número de
            comprobantes 'No.____', por un total de $,
            para el trámite de Reembolso de Fondo Revolvente, con cargo al proyecto {/*{this.state.comprometido.no_proyecto} y {this.state.fondo.no_proyec}*/},
            otorgado en el oficio de autorización número de oficio {this.state.fondo.oficio_aut} a la Procuraduría General de Justicia del Estado de Hidalgo.</p>
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
