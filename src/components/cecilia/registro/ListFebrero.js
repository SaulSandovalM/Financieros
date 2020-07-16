import React, { Component } from 'react';
import './Registro.css';
import RowFebrero from './RowFebrero';
import firebase from '../../../Firebase';

export default class ListFebrero extends Component {
  constructor (props) {
    super(props);
    this.state = {
      presupuesto: []
    };
  }

  componentWillMount () {
    firebase.database().ref('presupuesto/').on('child_added', snapshot => {
      this.setState({
        presupuesto: this.state.presupuesto.concat(snapshot.val())
      });
    });
  }

  render() {
    return (
      <div>
        <div className='meses-container'>
          <div className='table-left'>
          </div>
          <div className='table-meses-up'>
            <p className='p-meses'>UP</p>
          </div>
          <div className='table-meses-proy'>
            <p className='p-meses'>PROY</p>
          </div>
          <div className='table-meses-par'>
            <p className='p-meses'>P</p>
          </div>
          <div className='table-meses-par'>
            <p className='p-meses'>R</p>
          </div>
          <div className='table-meses-con'>
            <p className='p-meses'>CONCEPTO</p>
          </div>
          <div className='table-meses-mes'>
            <p className='p-meses'>MES</p>
          </div>
          <div className='table-meses-asig'>
            <p className='p-meses'>ASIGNADO</p>
          </div>
          <div className='table-meses-gas'>
            <p className='p-meses'>GASTO</p>
          </div>
          <div className='table-meses-saldo'>
            <p className='p-meses'>SALDO</p>
          </div>
          <div className='table-meses-dis'>
            <p className='p-meses'>DISPONIBLE</p>
          </div>
          <div className='table-right'>
          </div>
        </div>
        {
          this.props.lista.map(item =>
            <RowFebrero
              key={item.id}
              item={item}
            />
          )
        }
      </div>
    );
  }
}
