import React, { Component } from 'react'
import firebase from '../../../Firebase'
import { Link } from 'react-router-dom'

export default class Show extends Component {
  constructor (props) {
    super(props)
    this.state = {
      fondos: {},
      key: ''
    }
  }

  componentDidMount () {
    const ref = firebase.firestore().collection('fondos').doc(this.props.match.params.id)
    ref.get().then((doc) => {
      if (doc.exists) {
        this.setState({
          fondos: doc.data(),
          key: doc.id,
          isLoading: false
        })
      } else {
        console.log('No hay documento!')
      }
    })
  }

  render () {
    return (
      <div>
        <div>
          <div>
            <dl>
              <dt>Description:</dt>
              <dd>{this.state.fondos.fondo}</dd>
            </dl>
            <Link to={`/Editcontra/${this.state.key}`} class='btn btn-success'>Edit</Link>
          </div>
        </div>
      </div>
    )
  }
}
