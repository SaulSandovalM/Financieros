import React, { Component } from 'react';
import './Prueba.css';
import RowComponent from './RowComponent';
import firebaseConf from '../../../Firebase';

export default class ListComponent extends Component {
  constructor (props) {
   super(props);
   this.state = {
     agendaCita: [],
   };
 }

  componentWillMount () {
    firebaseConf.database().ref('agenda-cita/').on('child_added', snapshot => {
      this.setState({
        agendaCita: this.state.agendaCita.concat(snapshot.val())
      });
    });
  }

  render() {
    return (
      <div className="App" style={{height: '100vh'}}>
        <h1>Citas</h1>
        <div className="products-al">
          <div className="col-table">Nombre</div>
          <div className="col-table">Placas</div>
          <div className="col-table">Modelo</div>
          <div className="col-table">Color</div>
          <div className="col-table">Fecha/Hora</div>
          <div className="col-table">Estatus</div>
        </div>
        {
          this.props.lista.map(item =>
            <RowComponent
              key={item.id}
              item={item}
              update={this.props.update}
            />
          )
        }
      </div>
    );
  }
}
