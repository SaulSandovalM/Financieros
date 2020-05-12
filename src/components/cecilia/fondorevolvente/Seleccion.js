import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import csv from 'csv';
import firebase from '../../../Firebase';
import './Altas.css';

export default class Seleccion extends Component {
  constructor () {
    super();
    this.state = {
      select: [],
      pdf: 0
    };
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

  componentWillMount () {
    firebase.database().ref('presupuesto').on('child_added', snapshot => {
      this.setState({
        select: this.state.select.concat(snapshot.val())
      });
    });
  }

  updateSearch(event) {
    this.setState({search: event.target.value.substr(0,20)});
  }

  render() {

    const fontSize = 5;

    let filterData = this.state.select.filter(
      (select) => {
        return select.ogasto.indexOf(this.state.search) !== -1;
      }
    );

    return (
      <div class='container-back'>
        <div class='site'>
          <p class='site-s'><b>Selección</b></p>
        </div>
        <div class='pdf-section'>
          <div class='pdf-s-content'>
            <div>
              <p>Oficio Solicitud:</p>
              <Dropzone
                style={{
                  position: '',
                  width: '100%',
                  height: '30px',
                  borderWidth: '2px',
                  borderColor: 'rgb(102, 102, 102)',
                  borderStyle: 'solid',
                  borderRadius: '5px'}}
                  accept=".pdf" onChange={this.handleOnChange.bind(this)}>
              </Dropzone>
            </div>
          </div>
          <div class='pdf-s-content2'>
            <div>
              <p>Oficio Autorización:</p>
              <Dropzone
                style={{
                  position: '',
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
        {/*<div className="App" style={{height: '100vh'}}>
          <h1>Citas</h1>
          <input type="text" value={this.state.search} onChange={this.updateSearch.bind(this)}/>
          {
            filterData.map(select => (
              <div className="products-al">
                <div className="data-table">{select.total}</div>
              </div>
            )).reverse()
          }
        </div>*/}
      </div>
    )
  }
}
