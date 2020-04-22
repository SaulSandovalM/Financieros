import React, { Component } from "react";
import './Control.css'
import { Link } from 'react-router-dom';
import firebase from '../../Firebase';
import more from '../../img/add.png';

class ControlP extends Component {
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
      const { fondo, fecha, tipo_doc, importe, beneficiario, realizo } = doc.data();
      fondos.push({
        key: doc.id,
        doc, // DocumentSnapshot
        fondo,
        fecha,
        tipo_doc,
        importe,
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
      <div className="control-container">
        <div className="App">
          <h2 className="title" style={{fontFamily: 'Arial'}}>Control Presupuestal</h2>
          <div className="content-table">
            <div className="control-t2-c" style={{fontFamily: 'Arial'}}>Fecha</div>
            <div className="control-t2-c" style={{fontFamily: 'Arial'}}>Fondos</div>
            <div className="control-t2-c" style={{fontFamily: 'Arial'}}>Nombre</div>
            <div className="control-t2" style={{fontFamily: 'Arial'}}>Tipo de documento</div>
            <div className="control-t2-c" style={{fontFamily: 'Arial'}}>Importe</div>
            <div className="control-t2-c2" style={{fontFamily: 'Arial'}}>Benedificiario</div>
          </div>
          <div>
            {this.state.fondos.map(fondos =>
              <div className="content-table">
                <div className="control-t2-c-f" >{fondos.fecha}</div>
                <div className="control-t2-c-f">{fondos.fondo}</div>
                <div className="control-t2-c-f">{fondos.realizo}</div>
                <div className="control-t2-f">{fondos.tipo_doc}</div>
                <div className="control-t2-c-f">${fondos.importe}</div>
                <div className="control-t2-c2-f">{fondos.beneficiario}</div>
                <div className="control-mas">
                  <Link to={`/add/${fondos.key}`} className="control-mas-2">
                    <img className="add" src={more} alt=""/>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default ControlP;
