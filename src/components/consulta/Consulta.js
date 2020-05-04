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

    var user = firebase.auth().currentUser;
    var email;

    if (user != null) {
      email = user.email;
    }
    console.log(email);

    let admin;
    if (email === 'administrador@procu.com') {
      admin = 'ADMIN';
    } else if (email === 'nayra@procu.com') {
      admin = 'NAYRA';
    } else if (email === 'laura@procu.com') {
      admin = 'LAURA';
    } else if (email === 'miguel@procu.com') {
      admin = 'MIGUEL';
    } else if (email === 'teresa@procu.com') {
      admin = 'TERESA';
    } else if (email === 'marcos@procu.com') {
      admin = 'MARCOS';
    } else if (email === 'eloy@procu.com') {
      admin = 'ELOY';
    } else if (email === 'karina@procu.com') {
      admin = 'KARINA';
    } else if (email === 'martha@procu.com') {
      admin = 'MARTHA';
    } else if (email === 'lilia@procu.com') {
      admin = 'LILIA';
    } else if (email === 'cenely@procu.com') {
      admin = 'CENELY';
    } else if (email === 'hector@procu.com') {
      admin = 'HECTOR';
    } else if (email === 'miau@procu.com') {
      admin = 'MAO';
    } else if (email === 'omar@procu.com') {
      admin = 'OMAR';
    } else if (email === 'fer@procu.com') {
      admin = 'FERNANDA';
    }
    console.log(admin)

    return (
      <div className="cent-consul">
        <div className="App">
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
                {fondos.realizo === admin &&
                  <div className="products-al">
                    <div className="a-row">{fondos.fondo}</div>
                    <div className="a-row">{fondos.fecha}</div>
                    <div className="a-row">{fondos.realizo}</div>
                    <div className="a-row">{fondos.tipo_doc}</div>
                    <div className="a-row">{fondos.importe}</div>
                    <div className="a-row vista">
                    { fondos.tipo_doc === 'Pago Directo' &&
                      <Link to={`/Pdf/${fondos.key}`}>Ver</Link>
                    }
                    { fondos.tipo_doc === 'Fondo Revolvente' &&
                    <div >
                      <Link class="archivos" to={`/Pppdf/${fondos.key}`}>Pago Proveedor  </Link>
                      <br/>
                      <Link class="archivos"  to={`/Pdf/${fondos.key}`}>Recibo</Link>
                      </div>
                    }
                    </div>
                </div>
                }
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default TablaComprometidos;
