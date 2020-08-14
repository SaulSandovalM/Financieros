import React, { Component } from 'react'
import '../Fondos.css'
import RowComponent from './RowComponent'
import firebase from '../../../../Firebase'

export default class ListComponent extends Component {
  constructor (props) {
    super(props)
    this.state = {
      xml: []
    }
  }

  componentWillMount () {
    firebase.database().ref('xml/').on('child_added', snapshot => {
      this.setState({
        xml: this.state.xml.concat(snapshot.val())
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
              update={this.props.update}
            />
          )
        }
      </div>
    )
  }
}
