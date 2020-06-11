import React, { Component } from 'react';
import './Registro.css';
import RowComponent from './RowComponent';
import firebase from '../../../Firebase';

export default class ListComponent extends Component {
  constructor (props) {
   super(props);
   this.state = {
     presupuesto: [],
   };
 }

  componentWillMount () {
    firebase.database().ref('presupuesto/').on('child_added', snapshot => {
      this.setState({
        presupuesto: this.state.presupuesto.concat(snapshot.val())
      });
    });
  }

  updateSearch(event) {
    this.setState({search: event.target.value.substr(0,26)});
  }

  render() {

    let filterData = this.state.presupuesto.filter(
      (presupuesto) => {
        return presupuesto.ene.indexOf(this.state.search) !== -1;
      }
    );

    return (
      <div>
        <input value={this.state.search} onChange={this.updateSearch.bind(this)}/>
        <div className='meses-container'>
          <div className='table-left'>
          </div>
          <div className='table-meses-up'>
            <p className='p-meses'>UNIDAD</p>
          </div>
          <div className='table-meses-proy'>
            <p className='p-meses'>PROYECTO</p>
          </div>
          <div className='table-meses-par'>
            <p className='p-meses'>PARTIDA</p>
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
            <p className='p-meses'>DISPONIBILIDAD</p>
          </div>
          <div className='table-right'>
          </div>
        </div>
        {
          filterData.map(item =>
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
