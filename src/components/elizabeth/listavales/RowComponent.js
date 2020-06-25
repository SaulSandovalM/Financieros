import React, { Component } from 'react';
import './ListVales.css';
import CurrencyFormat from 'react-currency-format';
import Popup from 'reactjs-popup';
import Dropzone from 'react-dropzone';
import firebase from '../../../Firebase';

export default class RowComponent extends Component {
  constructor(props){
    super(props);
    this.state = {
      done: false,
      item: 'Atendido',
      pdf1: 0,
      pdf2: 0,
      pdf3: 0
    };
  }

  handleOnChange1 (event) {
    for(let i = 0; i < event.target.files.length; i++)
    {
      if (event.target.files[i].type === 'application/pdf') {
        //Se envia el archivo sin procesar;
        //firebase.database().ref('xml').push(NewXml)
      }
      const file = event.target.files[i]
      const storageRef = firebase.storage().ref(`comprobacion/${file.name}`)
      const task = storageRef.put(file)
      task.on('state_changed', (snapshot) => {
        let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        this.setState({
          pdf1: percentage
        })
      }, (error) => {
        console.error(error.message)
      })
    }
  }

  handleOnChange2 (event) {
    for(let i = 0; i < event.target.files.length; i++)
    {
      const file = event.target.files[i]
      const storageRef = firebase.storage().ref(`comprobacion/${file.name}`)
      const task = storageRef.put(file)
      task.on('state_changed', (snapshot) => {
        let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        this.setState({
          pdf2: percentage
        })
      }, (error) => {
        console.error(error.message)
      })
    }

  }

  handleOnChange3 (event) {
    for(let i = 0; i < event.target.files.length; i++)
    {
      const file = event.target.files[i]
      const storageRef = firebase.storage().ref(`comprobacion/${file.name}`)
      const task = storageRef.put(file)
      task.on('state_changed', (snapshot) => {
        let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        this.setState({
          pdf3: percentage
        })
      }, (error) => {
        console.error(error.message)
      })
    }
  }

  render() {

  var auto = this.props.item.estatus;

    return (
      <div>
        { auto === 'Pendiente' &&
          <div class='caja-inputs'>
            <div class='table-left'>
            </div>
            <div class='table-v-num2'>
              <b>{this.props.item.vale}</b>
            </div>
            <div class='table-v-num2'>
              <b>{this.props.item.cheque}</b>
            </div>
            <div class='table-v-num'>
              <b>{this.props.item.cantidad}</b>
            </div>
            <div class='table-v-num'>
              <b>{this.props.item.cantidadc}</b>
            </div>
            <div class='table-v-num'>
              <b>{this.props.item.cantidadr}</b>
            </div>
            <div class='table-v-num'>
              <b>{this.props.item.concepto}</b>
            </div>
            <div class='table-v-num'>
              <b>{this.props.item.oficioS}</b>
            </div>
            <div class='table-v-num'>
              <b>{this.props.item.area}</b>
            </div>
            <div class='table-v-num'>
              <b>{this.props.item.turno}</b>
            </div>
            <div class='table-v-num'>
              <b>{this.props.item.factura}</b>
            </div>
            <div class='table-v-num'>
              <b>{this.props.item.recibos}</b>
            </div>
            <div class='table-v-num'>
              <b>{this.props.item.sc}</b>
            </div>
            <div class='table-v-num'>
              <b>{this.props.item.reintegroT}</b>
            </div>
            <div class='table-v-num'>
              <b>{this.props.item.fecha}</b>
            </div>
            <div class='table-v-re'>
              <b>{this.props.item.autorizo}</b>
            </div>
            <div class='table-v-num'>
              <b>{this.props.item.personaR}</b>
            </div>
            <div class='table-right'>
            </div>
          </div>
        }
      </div>
    );
  }
}
