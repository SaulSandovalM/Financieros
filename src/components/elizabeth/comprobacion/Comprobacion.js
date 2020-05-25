import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import csv from 'csv';
import firebase from '../../../Firebase';
import xhr from 'ajax';
import ActiveXObject from 'ajax';
import xmlhttp from 'ajax';
import open from 'jquery';
import xml from './datos.xml';

export default class Excel extends Component {
  constructor () {
    super()
    this.state = {
      pdf1: 0,
      pdf2: 0,
      pdf3: 0
    //  csv: 0
    }
  }

  handleOnChange (event) {
    const file = event.target.files[0]
    const storageRef = firebase.storage().ref(`pdfs/${file.name}`)
    const task = storageRef.put(file)
    task.on('state_changed', (snapshot) => {
      let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      this.setState({
        pdf1: percentage,
        pdf2: percentage,
        pdf3: percentage
      })
    }, (error) => {
      console.error(error.message)
    })
  }

/*  onDrop(files) {
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
          const ben = data[i][16];
          const eg = data[i][17];
          const mi = data[i][18];
          const pr = data[i][19];
          const pb = data[i][20];
          const dp = data[i][21];
          const indi = data[i][22];
          const la = data[i][23];
          const ods = data[i][24];
          const et = data[i][25];
          const ff = data[i][26];
          const of = data[i][27];
          const np = data[i][28];
          const cpa = data[i][29];
          const ene = data[i][30];
          const feb = data[i][31];
          const mar = data[i][32];
          const abr = data[i][33];
          const may = data[i][34];
          const jun = data[i][35];
          const jul = data[i][36];
          const ago = data[i][37];
          const sep = data[i][38];
          const oct = data[i][39];
          const nov = data[i][40];
          const dic = data[i][41];
          const total = data[i][42];
          const presupuesto = {
            "rm": rm, "os": os, "up": up, "rubro": rubro, "tg": tg, "ogasto": ogasto,
            "f": f, "fu": fu, "sf": sf, "eje": eje, "s": s, "prog": prog, "sp": sp,
            "obj": obj, "proy": proy, "est": est, "ben": ben, "eg": eg, "mi": mi,
            "pr": pr, "pb": pb, "dp": dp, "indi": indi, "la": la, "ods": ods, "et": et,
            "ff": ff, "of": of, "np": np, "cpa": cpa, "ene": ene, "feb": feb, "mar": mar,
            "abr": abr, "may": may, "jun": jun, "jul": jul, "ago": ago, "sep": sep,
            "oct": oct, "nov": nov, "dic": dic, "total": total
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
  }*/


  render() {
    const fontSize = 5;

    function ejecutarAjax()
    {
      var resultado = document.getElementById("info");
      var arr = [];

      if(window.XMLHttpRequest) {
        const xhr = new XMLHttpRequest();
      }
      else {
        const xhr = new ActiveXObject("Microsoft.XMLHTTP");
      }

      xhr.onreadystatechange = function(){
        if(xhr.readyState === 4 && xmlhttp.status === 200){
          if(xhr.responseXML !== null)
          {
            arr[0] = xhr.responseXML.getElementsByTagName("nombre").item(0);
            arr[1] = xhr.responseXML.getElementsByTagName("apellido").item(0);
            arr[2] = xhr.responseXML.getElementsByTagName("edad").item(0);
            arr[3] = xhr.responseXML.getElementsByTagName("salario").item(0);

            resultado.innerHTML = arr[0].firstChild.nodeValue + ""+
                                  arr[1].firstChild.nodeValue;

          }
        }
      }
      xhr.open("GET", "datos.xml", true);
      xhr.send();
    }

    return (
      <div>
        <div class='presupuesto-container'>
          <div class='presupuesto-content'>
            <div class='presupuesto-card'>
              <h1 class='presupuesto-h1'>Comprobaciones</h1>
              <p class='presupuesto-p'>Selecciona la carga de evidencias de tus comprobaciones</p>
              <button onClick = {ejecutarAjax}>Mostrar información</button><br/><br/>
              <div id="info"></div>
              <div>
                <p>Facturas:</p>
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
                    accept=".pdf" onChange={this.handleOnChange.bind(this)}>
                </Dropzone>
                <progress class='progress' value={this.state.pdf1} max='100'>
                  {this.state.pdf1} %
                </progress>
                <div class="dz-default dz-message" value={this.state.pdf1} max='100'>
                  Carga {this.state.pdf1} %</div>

              </div>

              <div>
                <p>Recibo:</p>
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
                    accept=".pdf" onChange={this.handleOnChange.bind(this)}>
                </Dropzone>
                <progress class='progress' value={this.state.pdf2} max='100'>
                  {this.state.pdf2} %
                </progress>
                <div class="dz-default dz-message" value={this.state.pdf2} max='100'>
                  Carga {this.state.pdf2} %</div>
              </div>
              <div>
                <p>Reintegro:</p>
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
                    accept=".pdf" onChange={this.handleOnChange.bind(this)}>
                </Dropzone>
                <progress class='progress' value={this.state.pdf3} max='100'>
                  {this.state.pdf3} %
                </progress>
                <div class="dz-default dz-message" value={this.state.pdf3} max='100'>
                  Carga {this.state.pdf3} %</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
