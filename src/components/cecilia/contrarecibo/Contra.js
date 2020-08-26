import React, { Component } from 'react'
import './Contra.css'
import firebase from '../../../Firebase'
import { Link } from 'react-router-dom'

export default class Fondos extends Component {
  constructor (props) {
    super(props)
    this.ref = firebase.firestore().collection('fondos')
    this.unsubscribe = null
    this.state = {
      fondos: []
    }
  }

  componentDidMount () {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate)
  }

  onCollectionUpdate = (querySnapshot) => {
    const fondos = []
    querySnapshot.forEach((doc) => {
      const { fondo } = doc.data()
      fondos.push({
        key: doc.id,
        doc,
        fondo
      })
    })
    this.setState({
      fondos
   })
  }

  render () {
    return (
      <div className='contra-container-fc'>
        <div className='site-pf'>
          <p className='site-pf-s'><b>Contrarecibo</b></p>
        </div>
        <div className='mar-con'>
          {this.state.fondos.map(fondos =>
            <div>
              <div className='banco-inputs-list'>
                <div className='table-left' />
                <div className='table-banco-titlef'>
                  <div className='table-no-row'>
                    <p className='p-banco-map'>{fondos.fondo}</p>
                    <Link to={`/show/${fondos.key}`}>Agregar</Link>
                  </div>
                </div>
                <div className='table-right' />
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }
}
