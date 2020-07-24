import React, { Component } from 'react';
import CurrencyFormat from 'react-currency-format';
import './Fondor.css';

export default class RowComponent extends Component {
  constructor(props){
     super(props);
     this.state = {
       done: false
     };
   }

  render() {
    console.log(this.props.item.cpa);
    return (
      <div className='table-container-p'>
        <div className='inputs-container-fr'>
          <div className='inputs-col-fr'>
            <div className='inputs-row-fr-2'>
              <div className='p-container-ifrcpa'>
                <p className='p-title-margin-fr'>CPA</p>
                <input
                  className='input-style-fr'
                  required
                  defaultValue={this.props.item.cpa}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
