import React, { Component } from 'react';
import './Disponible.css';
import RowComponent from './RowComponent';
import firebase from '../../../Firebase';

export default class ListComponent extends Component {
  constructor (props) {
    super(props);
    this.state = {
      presupuesto: [],
      search: ''
    };
  }

  componentWillMount () {
    firebase.database().ref('presupuesto/').on('child_added', snapshot => {
      this.setState({
        presupuesto: this.state.presupuesto.concat(snapshot.val())
      });
    });
  }

  updateSeacrh(event) {
    this.setState({search: event.target.value.substr(0,20)})
  }

  render() {

    let filterData = this.state.presupuesto.filter(
      (presupuesto) => {
        return presupuesto.up.indexOf(this.state.search) !== -1;
      }
    );

    return (
      <div>
        <div className='p-container-dis'>
          <p className='p-title-margin-fr'>Ingresa la Unidad Presupuestal a buscar</p>
          <input
            className='input-style-fr'
            value={this.state.search}
            onChange={this.updateSeacrh.bind(this)}
          />
        </div>
        <div>
          <div className='meses-container'>
            <div className='table-left'>
            </div>
            <div className='table-dis-up'>
              <p className='p-meses'>UNIDAD</p>
            </div>
            <div className='table-dis-up'>
              <p className='p-meses'>RUBRO</p>
            </div>
            <div className='table-dis-up'>
              <p className='p-meses'>PARTIDA</p>
            </div>
            <div className='table-dis-up'>
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
      </div>
    );
  }
}
