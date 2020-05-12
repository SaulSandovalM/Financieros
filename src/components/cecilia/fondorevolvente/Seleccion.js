import React, { Component } from 'react';
import firebase from '../../../Firebase';
import './Altas.css';

export default class Seleccion extends Component {
  constructor () {
    super();
    this.state = {
      select: [],
    };
  }

  componentWillMount () {
    firebase.database().ref('presupuesto').on('child_added', snapshot => {
      this.setState({
        select: this.state.select.concat(snapshot.val())
      });
    });
  }

  updateSearch(event) {
    this.setState({search: event.target.value.substr(0,20)});
  }

  render() {

    let filterData = this.state.select.filter(
      (select) => {
        return select.ogasto.indexOf(this.state.search) !== -1;
      }
    );

    return (
      <div class='container-back'>
        <div class='site'>
          <p class='site-s'><b>Caja</b></p>
        </div>
        <div className="App" style={{height: '100vh'}}>
          <h1>Citas</h1>
          <input type="text" value={this.state.search} onChange={this.updateSearch.bind(this)}/>
          {
            filterData.map(select => (
              <div className="products-al">
                <div className="data-table">{select.total}</div>
              </div>
            )).reverse()
          }
        </div>
      </div>
    )
  }
}
