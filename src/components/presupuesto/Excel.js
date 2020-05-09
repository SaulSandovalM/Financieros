import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import csv from 'csv';
import firebase from '../../Firebase';

export default class Excel extends Component {
  constructor () {
    super()
    this.state = {
      uploadValue: 0,
    }
  }

  handleOnChange (event) {
    const file = event.target.files[0]
    const storageRef = firebase.storage().ref(`pdfs/${file.name}`)
    const task = storageRef.put(file)
    task.on('state_changed', (snapshot) => {
      let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      this.setState({
        uploadValue: percentage
      })
    }, (error) => {
      console.error(error.message)
    }, () => {
      // Upload complete
      this.setState({
        picture: task.snapshot.downloadURL
      })
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
      <div class='presupuesto-container'>
        <div class='presupuesto-content'>
          <div class='presupuesto-card'>
            <h1 class='presupuesto-h1'>Aqui puedes subir<br/>tu presupuesto anual </h1>
            <p class='presupuesto-p'>Traspasa tu información de Excel para poder usar el sistema</p>
          </div>
        </div>
      </div>


      /*<div align="center" oncontextmenu="return false">
        <br /><br /><br />
        <div class="dropzone">
          <Dropzone accept=".csv" onDropAccepted={this.onDrop.bind(this)}>
          </Dropzone>
          <br /><br /><br />
        </div>
        <h2>Subir tabla de presupuesto en formato <font size={fontSize} color="#00A4FF">CSV</font></h2>
      </div>*/
    )
  }
}
