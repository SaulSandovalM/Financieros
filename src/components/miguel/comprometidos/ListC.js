import React, { Component } from 'react'
import './Comprometidos.css'
import RowC from './RowC'
import firebase from '../../../Firebase'

export default class List extends Component {
  constructor (props) {
    super(props)
    this.state = {
      presupuesto: []
    }
  }

  componentWillMount () {
    firebase.database().ref('presupuesto/').on('child_added', snapshot => {
      this.setState({
        presupuesto: this.state.presupuesto.concat(snapshot.val())
      })
    })
  }

  render () {
    return (
      <div>
        {
          this.props.presupuesto.map(item =>
            <RowC
              key={item.id}
              item={item}
              update={this.props.update}
              partida={this.state.partida}
              up={this.state.up}
              rubro={this.state.rubro}
            />
          ).reverse()
        }
      </div>
    )
  }
}
