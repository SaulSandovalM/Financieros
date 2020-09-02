import React, { Component } from 'react'
import './Reduccion.css'
import RowComponent from './RowComponent'
import firebase from '../../../Firebase'

export default class ListComponent extends Component {
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
      <div style={{ marginTop: '30px' }}>
        {
          this.props.listaB.map(item =>
            <RowComponent
              key={item.id}
              item={item}
            />
          )
        }
      </div>
    )
  }
}
