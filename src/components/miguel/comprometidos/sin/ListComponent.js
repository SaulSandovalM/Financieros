import React, { Component } from 'react'
import '../Comprometidos.css'
import RowComponent from './RowComponent'
import firebase from '../../../../Firebase'

export default class ListComponent extends Component {
  constructor (props) {
    super(props)
    this.state = {
      xml: [],
      search: ''
    }
  }

  componentWillMount () {
    firebase.database().ref('xml/').on('child_added', snapshot => {
      this.setState({
        xml: this.state.xml.concat(snapshot.val())
      })
    })
  }

  updateSeacrh (event) {
    this.setState({ search: event.target.value.substr(0, 20) })
  }

  render () {
    const filterData = this.state.xml.filter(
      (xml) => {
        return xml.folio.indexOf(this.state.search) !== -1
      }
    )

    return (
      <div>
        <input
          value={this.state.search}
          onChange={this.updateSeacrh.bind(this)}
        />
        {
          filterData.map(item =>
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
