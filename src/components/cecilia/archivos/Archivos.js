import React, { Component } from 'react';
import './Archivos.css';
import firebase from '../../../Firebase';
import ListComponent from './ListComponent';

export default class Archivos extends Component {
  constructor(props) {
    super(props);
    this.ref = firebase.firestore().colection('archivos').orderBy('no');
    this.unsubscribe = null;
    this.state = {
      ofis: '',
      ofia: '',
      excel:'',
    };
  }

  onCollectionUpdate = (querySnapshot)=> {
    const movimientos = [];
    querySnapshot.forEach((doc) => {
      const { ofis, ofia, excel} = doc.data();
      movimientos.push({
        key: doc.id,
        ofis,
        ofia,
        excel
      });
    });
    this.setState({
      movimientos
    });
  }
  componentDidMount(){
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
    this.consumo();
  }
  consumo = () =>{
    const ref = firebase.firestore().collection('archivos').doc('--stats--');
    ref.get().then((doc) => {
      if (doc.exists) {
        this.setState({
          contador: doc.data(),
          key: doc.id,
          isLoading: false
        });
      } else {
        console.log("No hay nada!");
      }
    })
  }

  render() {
    return (
      <div className='pf-container'>
        <div className='site-pf'>
          <p className='site-pf-s'><b>Archivos</b></p>

        </div>
        <div>
              <p>Numero de oficio de Solicitud</p>
        </div>
        <div>
        <div className='archivos-container'>
          <div className='table-left'>
          </div>
          <div className='table-archivos'>
            <p className='p-archivos'>{/*{movimientos.ofis}*/}</p>
          </div>
          <div className='table-archivos'>
            <p className='p-archivos'>{/*{movimientos.ofia}*/}</p>
          </div>
          <div className='table-archivos'>
            <p className='p-archivos'>{/*{movimientos.excel}*/}</p>
          </div>
          <div className='table-right'>
          </div>
        </div>
        </div>
        <div>
          {<ListComponent
            lista={this.state.lista}
          />}
        </div>
      </div>
    )
  }
}
