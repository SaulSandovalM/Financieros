import React, { Component } from 'react';
import './Archivos.css';

export default class RowComponent extends Component {
  constructor(props){
    super(props);
    this.state = {
      done: false,
      item: 'Atendido',

    };
  }
  render() {
    return (

      <div>
      <div className='archivos-container-row'>
        <div className='table-left'>
        </div>

        <div class='table-archivos'>
        <p>{this.props.item.ofis}</p>
        </div>

        <div class='table-archivos'>
        <p>{this.props.item.ofia}</p>
        </div>
        <div class='table-archivos'>
        <p>{this.props.item.excel}</p>
        </div>
      </div>
      </div>
    );
  }
}
