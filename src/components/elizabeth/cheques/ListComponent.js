import React, { Component } from 'react';
import './Cheques.css';
import RowComponent from './RowComponent';
import firebase from '../../../Firebase';

export default class ListComponent extends Component {
  constructor (props) {
   super(props);
   this.state = {
     cheques: [],
   };
 }

  componentWillMount () {
    firebase.database().ref('cheques/').on('child_added', snapshot => {
      this.setState({
        cheques: this.state.cheques.concat(snapshot.val())
      });
    });
  }

  render() {
    return (
      <div>
        <div class='cheques-inputs'>
          <div class='table-left'>
          </div>
          <div class='table-c-num'>
            <b>#</b>
          </div>
          <div class='table-c-importe'>
            <b>FECHA DE EMISION</b>
          </div>
          <div class='table-c-fechae'>
            <b>FECHA DE COBRO</b>
          </div>
          <div class='table-c-fechae'>
            <b>IMPORTE</b>
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
