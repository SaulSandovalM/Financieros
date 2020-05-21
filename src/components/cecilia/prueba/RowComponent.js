import React, { Component } from 'react';
import './Prueba.css';

export default class RowComponent extends Component {
  constructor(props){
    super(props);
    this.state = {
      done: false,
      item: '',
    };
  }

   update = () => {
     this.props.update(this.props.item);
   }

  render() {
    return (
      <div>
      <div className="products-al">
        <div className="data-table">{this.props.item.nombre} {this.props.item.apellidop} {this.props.item.apellidom}</div>
        <div className="data-table">{this.props.item.placas}</div>
        <div className="data-table">{this.props.item.modelo}</div>
        <div className="data-table">{this.props.item.color}</div>
        <div className="data-table">{this.props.item.hora}</div>
        <div className="data-table">
          {this.props.item.status}
          <input value={(this.props.item.hora * this.props.item.fecha)} />
          <button onClick={this.update}>porcentaje</button>
        </div>
      </div>
      </div>
    );
  }
}
