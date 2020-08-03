import React, { Component } from 'react'
import './Fondor.css'

export default class RowComponent extends Component {
  constructor (props) {
    super(props)
    this.state = {
      done: false
    }
  }

  onhandleUpdate = () => {
    this.props.update(this.props.item)
  }

  render () {
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
            <button onClick={this.onhandleUpdate}>Autorizar</button>
          </div>
        </div>
      </div>
    )
  }
}
