import React, { Component } from 'react';
import './Comprometidos.css';
import firebaseConf from '../../Firebase';
import ListComponent from './ListComponent';

class TablaComprometidos extends Component {
  constructor(){
    super();
    this.state = {
      nuevo: '',
      lista: [
        {
          id: 1,
          name: 'preuba',
          done: false
        },
      ]
    }
  }

  listenForItems = (itemsRef) => {
    itemsRef.on('value', (snap) => {
      var lista = [];
      snap.forEach((child) => {
        lista.push({
          fondo: child.val().fondo,
          fecha: child.val().fecha,
          tipo_doc: child.val().tipo_doc,
          oficio_aut: child.val().oficio_aut,
          no_oficio: child.val().no_oficio,
          no_aut: child.val().no_aut,
          no_lici: child.val().no_lici,
          importe: child.val().importe,
          desc: child.val().desc,
          importe_l: child.val().importe_l,
          beneficiario: child.val().beneficiario,
          realizo: child.val().realizo,
          numero: child.val().numero,
          num_conver: child.val().num_conver,
          id: child.key
        });
      });
      this.setState({
        lista: lista
      });
    });
  }

  componentDidMount() {
    const itemsRef = firebaseConf.database().ref('fondos/');
    this.listenForItems(itemsRef);
  }

  update = (item) => {
    let updates = {};
    updates['comprometidos/' + item.id] = {
      fondo: item.fondo,
      fecha: item.fecha,
      tipo_doc: item.tipo_doc,
      oficio_aut: item.oficio_aut,
      no_oficio: item.no_oficio,
      no_aut: item.no_aut,
      no_lici: item.no_lici,
      importe: item.importe,
      desc: item.desc,
      importe_l: item.importe_l,
      beneficiario: item.beneficiario,
      realizo: item.realizo,
      numero: item.numero,
      num_conver: item.num_conver,
    };
    firebaseConf.database().ref().update(updates);
  }

  render() {
    return (
      <div className="a-container">
        <ListComponent
          lista={this.state.lista}
          update={this.update}
        />
      </div>
    );
  }
}

export default TablaComprometidos;
