import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import csv from 'csv';
import firebase from '../../../Firebase';
import './Altas.css';

export default class Altas extends Component {
  constructor () {
    super()
    this.state = {
      pdf: 0
    }
  }

  handleOnChange (event) {
    const file = event.target.files[0]
    const storageRef = firebase.storage().ref(`Altas/${file.name}`)
    const task = storageRef.put(file)
    task.on('state_changed', (snapshot) => {
      let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      this.setState({
        pdf: percentage
      })
    }, (error) => {
      console.error(error.message)
    })
  }

  onDrop(files) {
    this.setState({ files });
    var file = files[0];
    const reader = new FileReader();
    reader.onload = () => {
      csv.parse(reader.result, (err, data) => {
        var userList = [];
        for (var i = 0; i < data.length; i++) {
          const rm = data[i][0];
          const os = data[i][1];
          const up = data[i][2];
          const rubro = data[i][3];
          const presupuesto = { "rm": rm, "os": os, "up": up, "rubro": rubro };
          userList.push(presupuesto);
          fetch('https://financieros-78cb0.firebaseio.com/presupuesto.json', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(presupuesto)
          })
        };
      });
    };
    reader.readAsBinaryString(file);
  }

  render() {
    const fontSize = 5;

    return (
      <div>
        <div class='presupuesto-container'>
          <div class='presupuesto-content'>
            <div class='presupuesto-card'>
              <h1 class='presupuesto-h1'>Aqui puedes subir<br/>tus oficios de alta</h1>
              <p class='presupuesto-p'>Por favor agrege los oficio de autorización correspondientes</p>
              <div>
                <p>Oficio Solicitud:</p>
                <Dropzone
                  style={{
                    position: 'relative',
                    width: '100%',
                    height: '30px',
                    borderWidth: '2px',
                    borderColor: 'rgb(102, 102, 102)',
                    borderStyle: 'solid',
                    borderRadius: '5px'}}
                    accept=".pdf" onChange={this.handleOnChange.bind(this)}>
                </Dropzone>
                {/*<progress class='progress' value={this.state.pdf} max='100'>
                  {this.state.pdf} %
                </progress>*/}
              </div>
              <div>
                <p>Oficio Autorización:</p>
                <Dropzone
                  style={{
                    position: 'relative',
                    width: '100%',
                    height: '30px',
                    borderWidth: '2px',
                    borderColor: 'rgb(102, 102, 102)',
                    borderStyle: 'solid',
                    borderRadius: '5px'}}
                    accept=".pdf" onChange={this.handleOnChange.bind(this)}>
                </Dropzone>
                {/*<progress class='progress' value={this.state.pdf} max='100'>
                  {this.state.pdf} %
                </progress>*/}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
