import React, { Component } from 'react';
import './Disponible.css';
import RowComponent from './RowComponent';
import firebase from '../../../Firebase';

export default class ListComponent extends Component {
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
            <p className='p-meses'>UNIDAD</p>
          </div>
          <div className='table-meses-proy'>
            <p className='p-meses'>PARTIDA</p>
          </div>
          <div className='table-meses-dis'>
            <p className='p-meses'>DISPONIBILIDAD</p>
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
