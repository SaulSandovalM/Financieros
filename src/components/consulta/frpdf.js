import React, { Component} from 'react';
import './Consulta.css';
import ReactToPrint from 'react-to-print';
import firebase from '../../Firebase';
import { NumberAsString } from '../fondos/NumerosLetras.js';

class Frpdf extends Component{
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




    <div className='pppdf-dad'>
    <div className='pppdf-subdad'> {/*ref={el => (this.holi= el) }*/}
          <div class='direccion'>
                          <p> Direccion General de Administración y Finanzas </p>

            </div>
    <div class="no-oficio">
                        <p>Oficio No: PGI/DGAyF/ 41585fjhs-45{/*{this.state.}*/} /2020<br/> Pachuca, Hgo., a 15 de Abril 2020{/*{this.state.}*/}</p>
    </div>

<div class="fecha-pppdf">
                        <p></p>

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
                  <p>Por este conducto remito a usted, documentación original para su comprobación, por la cantidad de $ 7.315,00 (SIETE MIL  TRECIENTOS  QUINCE PESOS 00/100) {/*{this.state.}*/}
                  a nombre de "Comisión De Agua Potable, Alcantarillado Y Saneamiento Del Municipio De Ixmiquilpan, Hgo." {/*{this.state.}*/}


                  por concepto de Fondo Revolvente, correspondiente a Gasto de Operación según oficio de autorización OFICIO AUTORIZACION: 150/npd SSSY {/*{this.state.}*/}del Ejercicio 2020</p>
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
<p class="text">
C.C.P...- Expedien
<br/>Minutario
<br/>LMHV/NRL/macht</p>
</div>


    </div>
</div>
)
}
}

export default Frpdf
