import React, { Component } from 'react';
import './Presupuesto.css';
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

  updateSearch(event) {
    this.setState({search: event.target.value.substr(0,20)});
  }

  render() {

    let filterData = this.state.presupuesto.filter(
      (presupuesto) => {
        return presupuesto.cpa.indexOf(this.state.search) !== -1;
      }
    );

    return (
      <div>
        <div class='table-container-p'>
          <div class='table-left'>
          </div>
          <div class='table-clave-p'>
            <b>CLAVE</b>
          </div>
          <div class='table-importe-p'>
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
              update={this.props.update}
            />
          )
        }
      </div>
    );
  }
}
