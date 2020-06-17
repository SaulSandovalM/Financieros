import React, { Component } from 'react';
import './Archivos.css';
import RowComponent from './RowComponent';
import firebase from '../../../Firebase';

export default class ListComponent extends Component {
  constructor (props) {
   super(props);
   this.state = {
     pictures: [],
   };
 }

  componentWillMount () {
    firebase.database().ref('pictures/').on('child_added', snapshot => {
      this.setState({
        pictures: this.state.pictures.concat(snapshot.val())
      });
    });
  }

  render() {
    return (
      <div>
        <div className='archivos-container'>
          <div className='table-left'>
          </div>
          <div className='table-archivos'>
            <p className='p-archivos'>Nombre del Archivo</p>
          </div>
          <div className='table-archivos'>
            <p className='p-archivos'>Oficio Solicitud</p>
          </div>
          <div className='table-archivos'>
            <p className='p-archivos'>Oficio Autroización</p>
          </div>
          <div className='table-archivos'>
            <p className='p-archivos'>Excel</p>
          </div>
          <div className='table-right'>
          </div>
        </div>
        {
          this.props.lista.map(item =>
            <RowComponent
              key={item.id}
              item={item}
            />
          )
        }
      </div>
    );
  }
}
