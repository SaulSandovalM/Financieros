import React, { Component} from 'react';
import ReactToPrintd from 'react-to-print';
import './Consulta.css';

class Pdf extends Component{
render(){
  return(

    <div className='dad'>
    <div class='subdad'>
            <div className='bueno'>
                          <p>Bueno por: $7000.00 </p>
            </div>
    <div class="recibi">
                        <p>Recibí   de la  Secretaría  de  Finanzas Públicas  del  Gobierno  del  Estado de Hidalgo la cantidad de </p>
    </div>
    <div class="monto">
                        <p>Monto</p><p>Letra</p>
    </div>
<div class='concepto'>
                        <p>Por concepto de Reposición de Fondo Revolvente.</p>
  </div>
<div class='fecha'>
                    <p>Pachuca, Hgo., a</p>
                    <p> Fecha</p>

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

    </div>
  )
}






}
export default Pdf
