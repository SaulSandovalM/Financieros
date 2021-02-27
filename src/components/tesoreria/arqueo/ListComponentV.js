import React, { Component } from 'react'
import './Arqueo.css'
import RowComponentV from './RowComponentV'
import firebase from '../../../Firebase'

export default class ListComponent extends Component {
  constructor (props) {
    super(props)
    this.state = {
      vales: []
    }
  }

  componentWillMount () {
    firebase.database().ref('vales/').on('child_added', snapshot => {
      this.setState({
        vales: this.state.vales.concat(snapshot.val())
      })
    })
  }

  render () {
    var fechaSelect = this.props.fechaSelect
    
    return (
      <div>
        {
          this.props.listaVales.map(item =>
            <RowComponentV
              key={item.id}
              item={item}
              fechaSelect={fechaSelect}
            />
          )
        }
      </div>
    )
  }
}
