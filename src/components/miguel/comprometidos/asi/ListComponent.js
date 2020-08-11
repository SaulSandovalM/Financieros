import React, { Component } from 'react'
import '../Comprometidos.css'
import RowComponent from './RowComponent'
import firebase from '../../../../Firebase'

export default class ListComponent extends Component {
  constructor (props) {
    super(props)
    this.state = {
      xml: [],
      total: []
    }
  }

  componentWillMount () {
    firebase.database().ref('xml2/').on('child_added', snapshot => {
      this.setState({
        xml: this.state.xml.concat(snapshot.val())
      })
    })
  }

  render () {
    const totalImporte = []
    this.props.lista.map(item => (
      totalImporte.push(item.importe)
    ))
    const reducer = (a, b) => a + b
    this.state.total = totalImporte

    return (
      <div>
        {
          this.props.lista.map(item =>
            <RowComponent
              key={item.id}
              item={item}
              update={this.props.update}
              total={this.state.total}
            />
          )
        }
        {(totalImporte.reduce(reducer))}
      </div>
    )
  }
}
