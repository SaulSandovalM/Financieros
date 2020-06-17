import React, { Component } from 'react';
import './Fondor.css';
import RowComponent from './RowComponent';
import firebase from '../../../Firebase';

export default class ListComponent extends Component {
  constructor (props) {
   super(props);
   this.state = {
     banco: [],
   };
 }

  componentWillMount () {
    firebase.database().ref('banco/').on('child_added', snapshot => {
      this.setState({
        banco: this.state.banco.concat(snapshot.val())
      });
    });
  }

  render() {
    return (
      <div>
        <div class='table-container-p'>
          <div class='table-left'>
          </div>
          <div class='table-up-p-fr'>
            <b>UP</b>
          </div>
          <div class='table-up-p-fr'>
            <b>PARTIDA</b>
          </div>
          <div class='table-up-p-fr'>
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
