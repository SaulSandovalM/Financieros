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

  handleOnChange1 (event) {
    console.log(event.target.files);
    const totalArchivos = event.target.files;
    //alert(totalArchivos);
    //const numbers = props.numbers;
    //const listArchivos = totalArchivos.map((archivo) => archivo.name);
    var arr = [];
    for (var i = 0; i < totalArchivos.length; i++) {
      const archivo = totalArchivos[i];
      console.log(archivo);

      var file = archivo;
      var reader  = new FileReader();
      reader.onloadend = function () {
        console.log("Enseguida sigue el archivo");
        console.log(reader.result);

        var XMLParser = require('react-xml-parser');
        var xml = new XMLParser().parseFromString(reader.result);
        console.log(xml);
        console.log('');
        console.log(xml.children[0]);
        console.log('');
        console.log(xml.children[0].attributes['Rfc']);
        /*
        Methods that are currently supported:
parseFromString(string): Returns an XML object as described in the example output that represents the input text.
toString(XML object): Returns text representation of an input XML.
getElementsByTagName(string): Returns all tags with the same name as the method's input string (case-insensitive). for all possible tags, use '*' as input.
        */
      }
      //reader.readAsDataURL(file);
      reader.readAsText(file);

      /*if(archivo.type == 'application/pdf'){
        alert('Archivo enviado');
      }
      else if(archivo.type == 'text/xml'){
        var XMLParser = require('react-xml-parser');
        var xml = new XMLParser().getElementsByTagName;    // Assume xmlText contains the example XML
        console.log(xml);
        console.log(xml.getElementsByTagName('Name'));
      }
      console.log(archivo.name);*/
    };
    //const listItem = numbers.map( (number) => <li key={number.toString()}>{number}</li> );
    //alert(nombreArchivos);
    // const file = event.target.files[0];

    /*const storageRef = firebase.storage().ref(`pdfs/${file.name}`)
    const task = storageRef.put(file)
    task.on('state_changed', (snapshot) => {
      let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      this.setState({
        pdf1: percentage
      })
    }, (error) => {
      console.error(error.message)
    })*/
  }

  handleOnChange2 (event) {
    const file = event.target.files[0]
    const storageRef = firebase.storage().ref(`pdfs/${file.name}`)
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

  handleOnChange3 (event) {
    const file = event.target.files[0]
    const storageRef = firebase.storage().ref(`pdfs/${file.name}`)
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
      <div>
        <div class='presupuesto-container'>
          <div class='presupuesto-content'>
            <div class='presupuesto-card'>
              <h1 class='presupuesto-h1'>Comprobaciones</h1>
              <p class='presupuesto-p'>Selecciona la carga de evidencias de tus comprobaciones</p>
              <button onClick = {xmlToJson}>Mostrar información</button><br/><br/>
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
                    accept=".xml" onChange={this.handleOnChange1.bind(this)}>
                </Dropzone>
                <progress class='progress' value={this.state.pdf1} max='100'>
                  {this.state.pdf1} %
                </progress>
                <div class="dz-default dz-message" value={this.state.pdf1} max='100'>
                  Carga {this.state.pdf1} %</div>

              </div>

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
                    accept=".pdf" onChange={this.handleOnChange2.bind(this)}>
                </Dropzone>
                <progress class='progress' value={this.state.pdf2} max='100'>
                  {this.state.pdf2} %
                </progress>
                <div class="dz-default dz-message" value={this.state.pdf2} max='100'>
                  Carga {this.state.pdf2} %</div>
              </div>
              <div>
                <p>Recibo Simple:</p>
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
                    accept=".pdf" onChange={this.handleOnChange3.bind(this)}>
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
