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
  return(

    <div className='fecha'>


    <div class='subdad' ref={el => (this.holi= el)}>

            <div className='bueno'>

                          <p>Bueno por: {this.state.fondo.importe}</p>
            </div>
    <div class="recibi">
                        <p>Recibí   de la  Secretaría  de  Finanzas Públicas  del  Gobierno  del  Estado de Hidalgo la cantidad de:
                         $ {this.state.fondo.importe} ({(NumberAsString(this.state.fondo.importe))})</p>
    </div>

<div class="concepto">
                        <p>Por {this.state.fondo.tipo_doc}</p>

  </div>
<div class='fecha'>

</div>

<div class='refe'>
                    <p>DIRECTOR GENERAL DE<br/>ADMINISTRACIÓN Y FINANZAS</p>



</div>
<div class='firma-dad'>
<div class='firma-raya'>

                        <p>MTRO. LEÓN MAXIMILIANO HERNÁNDEZ VALDÉS<br/>R.F.C.: HEVL-750104</p>

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
