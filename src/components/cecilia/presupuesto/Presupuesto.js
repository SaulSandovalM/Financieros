import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import csv from 'csv';
import firebase from '../../../Firebase';
import './Presupuesto.css';

export default class Excel extends Component {
  constructor () {
    super()
    this.state = {
      pdf: 0,
      csv: 0,
      fileNameE: '',
      excel: '',
      fileNameS: '',
      oficioA: '',
      tipo: 'Carga de Presupuesto Inicial'
    }
  }

  onDrop(files) {
    this.setState({ files });
    var fileNameE = files[0];
    // const reader = new FileReader();
    // reader.onload = () => {
    //   csv.parse(reader.result, (err, data) => {
    //     var userList = [];
    //     for (var i = 0; i < data.length; i++) {
    //       const rm = data[i][0];
    //       const os = data[i][1];
    //       const up = data[i][2];
    //       const rubro = data[i][3];
    //       const tg = data[i][4];
    //       const ogasto = data[i][5];
    //       const f = data[i][6];
    //       const fu = data[i][7];
    //       const sf = data[i][8];
    //       const eje = data[i][9];
    //       const s = data[i][10];
    //       const prog = data[i][11];
    //       const sp = data[i][12];
    //       const obj = data[i][13];
    //       const proy = data[i][14];
    //       const est = data[i][15];
    //       const ben = data[i][16];
    //       const eg = data[i][17];
    //       const mi = data[i][18];
    //       const pr = data[i][19];
    //       const pb = data[i][20];
    //       const dp = data[i][21];
    //       const indi = data[i][22];
    //       const la = data[i][23];
    //       const ods = data[i][24];
    //       const et = data[i][25];
    //       const ff = data[i][26];
    //       const of = data[i][27];
    //       const np = data[i][28];
    //       const cpa = data[i][29];
    //       const ene = data[i][30];
    //       const feb = data[i][31];
    //       const mar = data[i][32];
    //       const abr = data[i][33];
    //       const may = data[i][34];
    //       const jun = data[i][35];
    //       const jul = data[i][36];
    //       const ago = data[i][37];
    //       const sep = data[i][38];
    //       const oct = data[i][39];
    //       const nov = data[i][40];
    //       const dic = data[i][41];
    //       const total = data[i][42];
    //       const presupuesto = {
    //         "rm": rm, "os": os, "up": up, "rubro": rubro, "tg": tg, "ogasto": ogasto,
    //         "f": f, "fu": fu, "sf": sf, "eje": eje, "s": s, "prog": prog, "sp": sp,
    //         "obj": obj, "proy": proy, "est": est, "ben": ben, "eg": eg, "mi": mi,
    //         "pr": pr, "pb": pb, "dp": dp, "indi": indi, "la": la, "ods": ods, "et": et,
    //         "ff": ff, "of": of, "np": np, "cpa": cpa, "ene": ene, "feb": feb, "mar": mar,
    //         "abr": abr, "may": may, "jun": jun, "jul": jul, "ago": ago, "sep": sep,
    //         "oct": oct, "nov": nov, "dic": dic, "total": total
    //       };
    //       userList.push(presupuesto);
    //       fetch('https://financieros-78cb0.firebaseio.com/presupuesto.json', {
    //         method: 'POST',
    //         headers: {
    //           'Accept': 'application/json',
    //           'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify(presupuesto)
    //       })
    //     };
    //   });
    // };
    // reader.readAsBinaryString(fileNameE);
    const storageRef = firebase.storage().ref(`presupuesto/${fileNameE.name}`);
    const task = storageRef.put(fileNameE);
    this.setState({
      fileNameE: `${fileNameE.name}`
    })
    task.on('state_changed', snapshot => {
      let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      this.setState({
        csv: percentage
      })
    }, error => {
      console.error(error.message);
    }, () =>  storageRef.getDownloadURL().then(url =>  {
      const record = url;
      this.setState({
        excel: record
      });
    }));
  }

  handleUpload (event) {
    const file = event.target.files[0];
    const storageRef = firebase.storage().ref(`presupuesto/${file.name}`);
    const task = storageRef.put(file);
    this.setState({
      fileNameS: `${file.name}`
    })
    task.on('state_changed', snapshot => {
      let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      this.setState({
        pdf: percentage
      })
    }, error => {
      console.error(error.message);
    }, () =>  storageRef.getDownloadURL().then(url =>  {
      const record = url;
      this.setState({
        archivo: record
      });
    }));
  }

  sendMessage(e) {
    e.preventDefault();
    const params = {
      fileNameE: this.state.fileNameE,
      excel: this.state.excel,
      fileNameS: this.state.fileNameS,
      archivo: this.state.archivo
    };
    this.setState({
      archivo: this.state.archivo
    })
    if ( params.archivo ) {
      firebase.database().ref('archivos-presupuesto').push(params).then(() => {
        alert('Tu solicitud fue enviada.');
      }).catch(() => {
        alert('Tu solicitud no puede ser enviada');
      });
    } else {
      alert('Por favor llene el formulario');
    };
  }

  render() {
    return (
      <div>
        <form class='presupuesto-container' onSubmit={this.sendMessage.bind(this)} ref='contactForm'>
          <div class='presupuesto-content'>
            <div class='presupuesto-card'>
              <h1 class='presupuesto-h1'>Aqui puedes subir<br/>tu presupuesto anual </h1>
              <p class='presupuesto-p'>Traspasa tu información de Excel para poder usar el sistema</p>
              <div>
                <p>Archivo:</p>
                <Dropzone
                  style={{
                    position: 'relative',
                    width: '100%',
                    height: '30px',
                    borderWidth: '2px',
                    borderColor: 'rgb(102, 102, 102)',
                    borderStyle: 'solid',
                    borderRadius: '5px'}}
                    accept=".csv" onDropAccepted={this.onDrop.bind(this)}>
                    <div className='filename'>
                      <p className='file-hid'>{this.state.file2}</p>
                    </div>
                </Dropzone>
                <progress class='progress' value={this.state.csv} max='100'>
                  {this.state.csv} %
                </progress>
              </div>
              <div>
                <p>Presupuesto:</p>
                <Dropzone
                  style={{
                    position: 'relative',
                    width: '100%',
                    height: '30px',
                    borderWidth: '2px',
                    borderColor: 'rgb(102, 102, 102)',
                    borderStyle: 'solid',
                    borderRadius: '5px'}}
                    accept=".pdf" onChange={this.handleUpload.bind(this)}>
                    <div className='filename'>
                      <p className='file-hid'>{this.state.file}</p>
                    </div>
                </Dropzone>
                <progress class='progress' value={this.state.pdf} max='100'>
                  {this.state.pdf} %
                </progress>
              </div>
              <div className='button-pres'>
                <button type='submit' className='button-sty'>Guardar</button>
              </div>
            </div>
          </div>
        </form>
      </div>
    )
  }
}
