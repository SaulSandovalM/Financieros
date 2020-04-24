import React, { Component } from 'react';
import './Comprometidos.css';
import firebase from '../../Firebase';
import { Link } from 'react-router-dom';

class TablaComprometidos extends Component {
  constructor() {
    super();
    this.ref = firebase.firestore().collection('fondos');
    this.unsubscribe = null;
    this.state = {
      fondos: [],
    };
  }

  onCollectionUpdate = (querySnapshot) => {
    const fondos = [];
    querySnapshot.forEach((doc) => {
      const { fondo, fecha, tipo_doc, oficio_aut, no_oficio, no_aut, no_lici, importe, desc, importe_l, beneficiario, realizo } = doc.data();
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

    let admin;
    if (email == 'administrador@procu.com') {
      admin = 'ADMIN';
    } else if (email == 'nayra@procu.com') {
      admin = 'NAYRA';
    } else if (email == 'laura@procu.com') {
      admin = 'LAURA';
    } else if (email == 'miguel@procu.com') {
      admin = 'MIGUEL';
    } else if (email == 'teresa@procu.com') {
      admin = 'TERESA';
    } else if (email == 'marcos@procu.com') {
      admin = 'MARCOS';
    } else if (email == 'eloy@procu.com') {
      admin = 'ELOY';
    } else if (email == 'karina@procu.com') {
      admin = 'KARINA';
    } else if (email == 'martha@procu.com') {
      admin = 'MARTHA';
    } else if (email == 'lilia@procu.com') {
      admin = 'LILIA';
    } else if (email == 'cenely@procu.com') {
      admin = 'CENELY';
    } else if (email == 'hector@procu.com') {
      admin = 'HECTOR';
    }

    return (
      <div className="cent-compro">
        <div className="App">
          <h2 className="title" style={{fontFamily: 'Arial'}}>Comprometidos</h2>
          <div className="products-al">
            <div className="a-row-t">Fondos</div>
            <div className="a-row-t">Fecha</div>
            <div className="a-row-t">Nombre Realizo</div>
            <div className="a-row-t">Tipo de documento</div>
            <div className="a-row-t">Importe</div><div className="a-row-t"></div>
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
                    <Link to={`/edit/${fondos.key}`}>Ver</Link>
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
