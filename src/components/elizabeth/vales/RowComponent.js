import React, { Component } from 'react';
import './Vales.css';
import CurrencyFormat from 'react-currency-format';
import { Link } from 'react-router-dom';
import Popup from "reactjs-popup";
import Dropzone from 'react-dropzone';
import csv from 'csv';
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

    function xmlToJson(xml) {

    // Create the return object
    var obj = {};

    if (xml.nodeType == 1) { // element
    // do attributes
    if (xml.attributes.length > 0) {
    obj["@attributes"] = {};
      for (var j = 0; j < xml.attributes.length; j++) {
        var attribute = xml.attributes.item(j);
        obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
      }
    }
    } else if (xml.nodeType == 3) { // text
    obj = xml.nodeValue;
    }

    // do children
    if (xml.hasChildNodes()) {
    for(var i = 0; i < xml.childNodes.length; i++) {
      var item = xml.childNodes.item(i);
      var nodeName = item.nodeName;
      if (typeof(obj[nodeName]) == "undefined") {
        obj[nodeName] = xmlToJson(item);
      } else {
        if (typeof(obj[nodeName].push) == "undefined") {
          var old = obj[nodeName];
          obj[nodeName] = [];
          obj[nodeName].push(old);
        }
        obj[nodeName].push(xmlToJson(item));
      }
    }
    }
    return obj;
    };

    return (
      <div class='caja-inputs'>
        <div class='table-left'>
        </div>
        <div class='table-v-num'>
          <b>{this.props.item.vale}</b>
        </div>
        <div class='table-v-importe'>
          <b>{this.props.item.estatus}</b>
        </div>
        <div class='table-v-fechae'>
          <b>{this.props.item.concepto}</b>
        </div>
        <div class='table-v-cantidad'>
          <div>
            <CurrencyFormat
              value={this.props.item.cantidad}
              displayType={'text'}
              thousandSeparator={true}
              prefix={'$ '}
              decimalSeparator={'.'} />
            .00
          </div>
        </div>
         <div class = 'table-v-cantidad'>
          <Popup trigger = {<button>Comprobación</button>} modal>
          <div>
            <div className='comprobacion-container'>
              <div className='comprobacion-content'>
                <div className='comprobacion-card'>
                  <h1 className='comprobacion-h1'>Comprobaciones</h1>
                  <p className='comprobacion-p'>Selecciona la carga de evidencias de tus comprobaciones</p>
                  <div>
                    <p>XML:</p>
                    <Dropzone
                      style={{
                        position: 'relative',
                        width: '100%',
                        height: '30px',
                        borderWidth: '2px',
                        borderColor: 'rgb(102, 102, 102)',
                        borderStyle: 'solid',
                        borderRadius: '5px',
                        maxFiles: 5}}
                        accept=".xml" onChange={this.handleOnChange1.bind(this)}
                        >
                    </Dropzone>
                    <progress className='progress' value={this.state.pdf1} max='100'>
                      {this.state.pdf1} %
                    </progress>
                    <div className="dz-default dz-message" value={this.state.pdf1} max='100'>
                      Carga {this.state.pdf1} %</div>
                  </div>
                  <div>
                    <p>FACTURA:</p>
                    <Dropzone
                      style={{
                        position: 'relative',
                        width: '100%',
                        height: '30px',
                        borderWidth: '2px',
                        borderColor: 'rgb(102, 102, 102)',
                        borderStyle: 'solid',
                        borderRadius: '5px',
                        maxFiles: 5}}
                        accept=".pdf" onChange={this.handleOnChange2.bind(this)}
                        >
                    </Dropzone>
                    <progress className='progress' value={this.state.pdf2} max='100'>
                      {this.state.pdf2} %
                    </progress>
                    <div className="dz-default dz-message" value={this.state.pdf2} max='100'>
                      Carga {this.state.pdf2} %</div>
                  </div>
                  <div>
                    <p>RECIBO SIMPLE:</p>
                    <Dropzone
                      style={{
                        position: 'relative',
                        width: '100%',
                        height: '30px',
                        borderWidth: '2px',
                        borderColor: 'rgb(102, 102, 102)',
                        borderStyle: 'solid',
                        borderRadius: '5px',
                        maxFiles: 5}}
                        accept=".pdf" onChange={this.handleOnChange3.bind(this)}
                        >
                    </Dropzone>
                    <progress className='progress' value={this.state.pdf3} max='100'>
                      {this.state.pdf3} %
                    </progress>
                    <div className="dz-default dz-message" value={this.state.pdf3} max='100'>
                      Carga {this.state.pdf3} %</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          </Popup>
         </div>
        <div class='table-right'>
        </div>

      </div>
    );
  }
}
