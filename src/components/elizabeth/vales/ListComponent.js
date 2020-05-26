import React, { Component } from 'react';
import './Vales.css';
import RowComponent from './RowComponent';
import firebase from '../../../Firebase';

export default class ListComponent extends Component {
  constructor (props) {
    super(props);
    this.state = {
      vales: [],
    };
  }

  componentWillMount () {
    firebase.database().ref('vales/').on('child_added', snapshot => {
      this.setState({
        vales: this.state.vales.concat(snapshot.val())
      });
    });
  }

  render() {
    return (
      <div>
        <div class='caja-inputs'>
          <div class='table-left'>
          </div>
          <div class='table-c-num'>
            <b>#</b>
          </div>
          <div class='table-c-importe'>
            <b>MOVIMIENTO</b>
          </div>
          <div class='table-c-fechae'>
            <b>CONCEPTO</b>
          </div>
          <div class='table-c-fechae'>
            <b>CANTIDAD</b>
          </div>
          <div class='table-right'>
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
