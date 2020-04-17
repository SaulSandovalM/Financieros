import React, { Component } from 'react';
import firebase from '../../Firebase';
import './Analitico.css';
import { Link } from 'react-router-dom';

class Analitico extends Component {
  constructor() {
    super();
    this.ref = firebase.firestore().collection('fondos');
    this.unsubscribe = null;
    this.state = {
      fondos: []
    };
  }

  onCollectionUpdate = (querySnapshot) => {
    const fondos = [];
    querySnapshot.forEach((doc) => {
      const { fondo, fecha, tipo_doc, oficio_aut, no_oficio, no_aut, no_lici, importe, desc, importe_l, beneficiario, realizo} = doc.data();
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
    return (
      <div className="cent-ana">
        <div className="App">
          <h2 className="title" style={{fontFamily: 'Arial'}}>Analitico</h2>
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
                <div className="products-al">
                  <div className="a-row">{fondos.fondo}</div>
                  <div className="a-row">{fondos.fecha}</div>
                  <div className="a-row">{fondos.realizo}</div>
                  <div className="a-row">{fondos.tipo_doc}</div>
                  <div className="a-row">{fondos.importe}</div>
                  <div className="a-row vista">
                    <Link to={`/edita/${fondos.key}`}>Ver</Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Analitico;
