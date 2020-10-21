import React, { Component } from 'react'
import './Fondos.css'
import Navbar from './Navbar'
import Pestañas from './Pestañas'

export default class Fondos extends Component {
  render () {
    return (
      <div>
        <Navbar />
        <Pestañas />
      </div>
    )
  }
}
