import React, { Component} from 'react';
import './Consulta.css';
import ReactToPrint from 'react-to-print';
import firebase from '../../../Firebase';
import { NumberAsString } from '../fondos/NumerosLetras.js';
import logo2 from  '../../../img/logo.jpg';

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
      // const updateRef = firebase.firestore().collection('fondos').doc(this.props.match.params.id).collection('comprometidos').doc();
    ref.get().then((doc) => {
      if (doc.exists) {
        this.setState({
          fondo: doc.data(),
          key: doc.id,
          isLoading: false
        });
      } else {
        console.log('No hay docuemnto');
      }
    });
  }

  render(){

    var today = new Date();
    var meses = [ 'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    var f = new Date();
    today = f.getDate() + ' de ' + meses[f.getMonth()] + ' de ' + f.getFullYear();

    return(
      <div className='pppdf-dad'>
        <div className='pppdf-subdad' ref={el => (this.holi= el)}>
          <div className='fondo-procu'>
            <img className='ime' src={logo2} alt=''/>
          </div>
          <div className='no-oficio'>
            <p><b>Oficio No:</b> PGI/DGAyF/ {this.state.fondo.no_oficio}
            <br/> Pachuca de Soto, Hidalgo a {today}
            <br/><b>Asunto </b>Pago a Proveedor</p>
          </div>
          <div className='prensente'>
            <p><b>Lic. César Alberto González López
            <br/>Subsecretario de Egresos de la
            <br/> Secretaría de Finanzas Públicas
            <br/>Presente</b></p>
          </div>
          <div className='añadido'>
            <p><b>AT'N: L.C.P. Karina Barrios Velázquez
            <br/>Directora General de Contbilidad
            <br/>Gubernamental</b></p>
          </div>
          <div className='texto-ofi_ppp'>
            <p>Por este medio me permito enviar a Usted documentación por un importe total de $ {this.state.fondo.importe}
            ({(NumberAsString(this.state.fondo.importe))}), cantidad amparada con los comprobantes No._____,
            para el trámite de pago a favor del proveedor {this.state.fondo.beneficiario}, por la compra o prestación de  servicios  '{this.state.fondo.desc}',
            con cargo al proyecto {/*{this.state.comprometido.no_proyecto} y {this.state.fondo.no_proyec}*/}y a los recursos otorgados con el oficio de autorización {this.state.fondo.oficio_aut},
            a la Procuraduria General de Justicia del Estado de Hidalgo.</p>
            <p>Sin otro particular por el momento, reciba un cordial saludo</p>
          </div>
          <div>
            <div className='atte'>
              <p> Atentamente
              <br/>Director General</p>
            </div>
            <div className='firma-dad'>
              <div className='firma-raya'>
                <p className='mtro'>MTRO. LEÓN MAXIMILIANO HERNÁNDEZ VALDÉS</p>
              </div>
            </div>
          </div>
          <div className='pie'>
            <div className='ccp'>
              <p className='text'>C.C.P...- Expedien<br/>Minutario<br/>LMHV/NRL/macht</p>
            </div>
            <div>
              <p align='right'> {this.state.fondo.fondo}</p>
            </div>
          </div>
        </div>
        <ReactToPrint
          trigger={() => <buttom className='bont_imprimir'>imprimir</buttom>}
          content={()=> this.holi}
        />
      </div>
    )
  }
}

export default Pppdf
