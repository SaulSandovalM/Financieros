import React, { Component } from 'react';
import './Fondor.css';
import RowComponent from './RowComponent';
import firebase from '../../../Firebase';

export default class ListComponent extends Component {
  constructor (props) {
   super(props);
   this.state = {
     presupuesto: [],
     search: '',
     search2: '',
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
        <input
          className='input-style-fr'
          value={this.state.search}
          onChange={this.updateSeacrh.bind(this)}
        />
        <div class='table-container-p'>
          <div class='table-left'>
          </div>
          <div class='table-up-p-frn2'>
            <b>UP</b>
          </div>
          <div class='table-up-p-frn2'>
            <b>PARTIDA</b>
          </div>
          <div class='table-up-p-frn2'>
            <b>RUBRO</b>
          </div>
          <div class='table-up-p-fr'>
            <b>CPA</b>
          </div>
          <div class='table-up-p-frn'>
            <b>IMPORTE</b>
          </div>
          <div class='table-right'>
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
