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
    if (email == 'administrador@procu.com') {
      admin = 'ADMIN';
    } else if (email == 'hector@procu.com') {
      admin = 'HECTOR';
    } else if (email == 'maguel@procu.com') {
      admin = 'MIGUEL';
    } else if (email == 'liliana@procu.com') {
      admin = 'LILIANA';
    } else if (email == 'liliana@procu.com') {
      admin = 'LILIANA';
    } else if (email == 'liliana@procu.com') {
      admin = 'LILIANA';
    } else if (email == 'liliana@procu.com') {
      admin = 'LILIANA';
    } else if (email == 'liliana@procu.com') {
      admin = 'LILIANA';
    } else if (email == 'liliana@procu.com') {
      admin = 'LILIANA';
    } else if (email == 'liliana@procu.com') {
      admin = 'LILIANA';
    } else if (email == 'liliana@procu.com') {
      admin = 'LILIANA';
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
                      <Link to={`/Pppdf/${fondos.key}`}>Ver</Link>
                    }
                    { fondos.tipo_doc === 'Fondo Revolvente' &&
                      <Link to={`/Frpdf/${fondos.key}`}>Ver</Link>
                    }
                    { fondos.tipo_doc === 'Gasto a Comprobar' &&
                      <Link to={`/Pdf/${fondos.key}`}>Ver</Link>
                    }
                    { fondos.tipo_doc === 'Reembolso de Gastos' &&
                      <Link to={`/Cpdf/${fondos.key}`}>Ver</Link>
                    }
                    { fondos.tipo_doc === 'Cancelado' &&
                      <Link to={`/Pdf/${fondos.key}`}>Ver</Link>
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
