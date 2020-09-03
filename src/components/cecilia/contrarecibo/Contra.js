import React, { Component } from 'react'
import './Contra.css'
import firebase from '../../../Firebase'
import { Link } from 'react-router-dom'
import CurrencyFormat from 'react-currency-format'

export default class Fondos extends Component {
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
      const { fondo, tipo_doc, importe, beneficiario } = doc.data();
      fondos.push({
        key: doc.id,
        doc,
        fondo,
        tipo_doc,
        importe,
        beneficiario
      });
    });
    this.setState({
      fondos
   });
  }

  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
  }

  render () {
    return (
      <div className='contra-container-fc'>
        <div className='site-pf'>
          <p className='site-pf-s'><b>Contrarecibo</b></p>
        </div>
        <div className='back-a' />
        <div className='mar-con'>
          {this.state.fondos.map(fondos =>
            <div>
              <div className='banco-inputs-list'>
                <div className='table-left' />
                <div className='table-banco-titlef'>
                  <div className='table-no-rows'>
                    <p className='p-banco-map-f'>{fondos.fondo}</p>
                    <p className='p-banco-map-t'>{fondos.tipo_doc}</p>
                    <p className='p-banco-map-b'>{fondos.beneficiario}</p>
                    <p className='p-banco-map'>
                      <CurrencyFormat
                        value={fondos.importe}
                        displayType='text'
                        thousandSeparator
                        prefix=' $ '
                      />
                    </p>
                    <Link to={`/Editcontra/${fondos.key}`} className='p-banco-map'>Agregar Contrarecibo</Link>
                  </div>
                </div>
                <div className='table-right' />
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }
}
