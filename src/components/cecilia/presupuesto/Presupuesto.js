import React, { Component } from 'react';
import firebase from '../../../Firebase';
import Dropzone from 'react-dropzone';
import csv from 'csv';
import './Presupuesto.css';

export default class Excel extends Component {
  constructor () {
    super()
    this.state = {
      pdf: 0,
      csv: 0
    }
  }

  handleUpload (event) {
    const file = event.target.files[0]
    const storageRef = firebase.storage().ref(`pdfs/${file.name}`)
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
          const tg = data[i][4];
          const ogasto = data[i][5];
          const f = data[i][6];
          const fu = data[i][7];
          const sf = data[i][8];
          const eje = data[i][9];
          const s = data[i][10];
          const prog = data[i][11];
          const sp = data[i][12];
          const obj = data[i][13];
          const proy = data[i][14];
          const est = data[i][15];
          const obra = data[i][16];
          const ben = data[i][17];
          const eg = data[i][18];
          const mi = data[i][19];
          const pr = data[i][20];
          const pb = data[i][21];
          const dp = data[i][22];
          const indi = data[i][23];
          const meta = data[i][24];
          const la = data[i][25];
          const ods = data[i][26];
          const et = data[i][27];
          const ff = data[i][28];
          const of = data[i][29];
          const np = data[i][30];
          const cpa = data[i][31];
          const dig = data[i][32];
          const par = data[i][33];
          const ene = data[i][34];
          const feb = data[i][35];
          const mar = data[i][36];
          const abr = data[i][37];
          const may = data[i][38];
          const jun = data[i][39];
          const jul = data[i][40];
          const ago = data[i][41];
          const sep = data[i][42];
          const oct = data[i][43];
          const nov = data[i][44];
          const dic = data[i][45];
          const total = data[i][46];
          const presupuesto = {
            "rm": rm, "os": os, "up": up, "rubro": rubro, "tg": tg, "ogasto": ogasto,
            "f": f, "fu": fu, "sf": sf, "eje": eje, "s": s, "prog": prog, "sp": sp,
            "obj": obj, "proy": proy, "est": est, "obra": obra, "ben": ben, "eg": eg,
            "mi": mi, "pr": pr, "pb": pb, "dp": dp, "indi": indi, "meta": meta,
            "la": la, "ods": ods, "et": et, "ff": ff, "of": of, "np": np, "cpa": cpa,
            "dig": dig, "par": par, "ene": ene, "feb": feb, "mar": mar, "abr": abr,
            "may": may, "jun": jun, "jul": jul, "ago": ago, "sep": sep, "oct": oct,
            "nov": nov, "dic": dic, "total": total
          };
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
        <div className='presupuesto-container'>
          <div className='presupuesto-content'>
            <div className='presupuesto-card'>
              <h1 className='presupuesto-h1'>Aqui puedes subir<br/>tu presupuesto anual </h1>
              <p className='presupuesto-p'>Traspasa tu información de Excel para poder usar el sistema</p>
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
                </Dropzone>
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
                </Dropzone>
              </div>
              {/*<div className='button-pre'>
                <p className='button-p' onChange={this.handleOnChange.bind(this)}><b>Subir</b></p>
              </div>*/}
            </div>
          </div>
        </div>
      </div>
    )
  }
}
