import React, { Component } from 'react';
import './Consulta.css';
import firebase from '../../Firebase';
import { Link } from 'react-router-dom';

class TablaComprometidos extends Component {
  constructor(props) {
  super(props);
  this.ref = firebase.firestore().collection('fondos');
  this.unsubscribe = null;
  this.state = {
    fondos: []
  };
}

onCollectionUpdate = (querySnapshot) => {
  const fondos = [];
  querySnapshot.forEach((doc) => {
    const { fondo, fecha, tipo_doc, oficio_aut, no_oficio, no_aut, no_lici, importe, desc, importe_l, beneficiario, realizo, numero, num_conver } = doc.data();
    fondos.push({
      key: doc.id,
      doc, // DocumentSnapshot
      fondo,
      fecha,
      tipo_doc,
      oficio_aut,
      no_oficio,
      no_aut,
      no_lici,
      importe,
      desc,
      importe_l,
      beneficiario,
      realizo,
      numero,
      num_conver
    });
  });
  this.setState({
    fondos
 });
}

componentDidMount() {
  this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
}

  render() {
    return (
      <div className="space-nav">
        <div className="App" style={{height: '100%'}}>
          <h2 className="title" style={{fontFamily: 'Arial'}}>Consulta</h2>
          <div className="products-al">
            <div className="a-row-t" style={{fontFamily: 'Arial'}}>Fondos</div>
            <div className="a-row-t" style={{fontFamily: 'Arial'}}>Fecha</div>
            <div className="a-row-t" style={{fontFamily: 'Arial'}}>Nombre Realizo</div>
            <div className="a-row-t" style={{fontFamily: 'Arial'}}>Tipo de documento</div>
            <div className="a-row-t" style={{fontFamily: 'Arial'}}>Importe</div><div className="a-row-t"></div>
          </div>
          <div>
            {this.state.fondos.map(fondos =>
              <div>
                <div className="products-al">
                  <div className="a-row">{fondos.fondo}</div>
                  <div className="a-row">{fondos.fecha}</div>
                  <div className="a-row">{fondos.realizo}</div>
                  <div className="a-row">{fondos.tipo_doc}</div>
                  <div className="a-row">{fondos.importe}</div>
                  <div className="a-row vista">
                    <Link to={`/Pdf/${fondos.key}`}>Ver</Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>



        <div class='subdad print-source' ref={el => (this.holi= el) }>

                <div className='bueno'>
                              <p>Bueno por: $7000.00 </p>
                </div>
        <div class="recibi">
                            <p>Recibí   de la  Secretaría  de  Finanzas Públicas  del  Gobierno  del  Estado de Hidalgo la cantidad de </p>
        </div>
        <div class="monto">
                            <p>Monto</p><p>Letra</p>
        </div>
    <div class="concepto">
                            <p>Por concepto de Reposición de Fbondo Revolvente.</p>
      </div>
    <div class='fecha'>
                        <p>Pachuca, Hgo., a</p>
                        <p>13 Abril de 2020</p>

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
    );
  }
}

export default TablaComprometidos;
