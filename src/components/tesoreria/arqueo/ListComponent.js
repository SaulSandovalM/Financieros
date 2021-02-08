import React, { Component } from 'react'
import './Arqueo.css'
import RowComponent from './RowComponent'
import firebase from '../../../Firebase'

export default class ListComponent extends Component {
  constructor (props) {
    super(props)
    this.state = {
      arqueo: []
    }
  }

  componentWillMount () {
    firebase.database().ref('arqueo/').on('child_added', snapshot => {
      this.setState({
        arqueo: this.state.arqueo.concat(snapshot.val())
      })
    })
  }

  render () {
    return (
      <div>
        {
          this.props.lista.map(item =>
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
