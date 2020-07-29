import React, { Component, useEffect } from 'react';
import firebase from '../../../Firebase';
import ListArchivo from './ListArchivo';
import './ListVales.css';
import Dropzone from 'react-dropzone';
import example from './exa.xml';
import XMLParser from 'react-xml-parser';

export default class ListArchivosV extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lista: [
        {
          id: 1,
          name: 'preuba',
          done: false
        },
      ],
      alert: false,
      alertData: {},
      vale: '',
      cheque: '',
      cantidad: '',
      cantidadc: '',
      cantidadr: '',
      reembolso: '',
      concepto: '',
      oficioS: '',
      area: '',
      turno: '',
      personaR: '',
      factura: '',
      recibos: '',
      sc: '',
      fecha: '',
      autorizo: '',
      estatus: 'Pendiente',
      fecha: '',
      contador: {},
      isHidden: true,
      pdf1: 0,
      pdf2: 0,
      pdf3: 0,
      filex: '',
      filef: '',
      filer: '',
      filexml: '',
      filefactura: '',
      filerecibo: ''
    };
  }

  onDrop(files) {
    var fileNameE = files;
    console.log(fileNameE);
    fetch(fileNameE)
      .then(res => res.text())
      .then(data => {
        var xml = new XMLParser().parseFromString(data);
        console.log(xml);
        // fetch('https://financieros-78cb0.firebaseio.com/xml.json', {
        //   method: 'POST',
        //   headers: {
        //     'Accept': 'application/json',
        //     'Content-Type': 'application/json',
        //   },
        //   body: JSON.stringify(xml)
        // })
    })
  }

  handleOnChange1 (files) {
    // for(let i = 0; i < event.target.files.length; i++) {
    //   const storageRef = firebase.storage().ref(`comprobacion/${file.name}`)
    //   const task = storageRef.put(file)
    //   this.setState({
    //     filex: `${file.name}`
    //   })
    //   task.on('state_changed', (snapshot) => {
    //     let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
    //     this.setState({
    //       pdf1: percentage
    //     })
    //   }, error => {
    //     console.error(error.message);
    //   }, () =>  storageRef.getDownloadURL().then(url =>  {
    //     const record = url;
    //     this.setState({
    //       filexml: record
    //     });
    //   }));
    // }
  }

  handleOnChange2 (event) {
    for(let i = 0; i < event.target.files.length; i++)
    {
      const file = event.target.files[i]
      const storageRef = firebase.storage().ref(`comprobacion/${file.name}`)
      const task = storageRef.put(file)
      this.setState({
        filef: `${file.name}`
      })
      task.on('state_changed', (snapshot) => {
        let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        this.setState({
          pdf2: percentage
        })
      }, error => {
        console.error(error.message);
      }, () =>  storageRef.getDownloadURL().then(url =>  {
        const record = url;
        this.setState({
          filefactura: record
        });
      }));
    }
  }

  handleOnChange3 (event) {
    for(let i = 0; i < event.target.files.length; i++)
    {
      const file = event.target.files[i]
      const storageRef = firebase.storage().ref(`comprobacion/${file.name}`)
      const task = storageRef.put(file)
      this.setState({
        filer: `${file.name}`
      })
      task.on('state_changed', (snapshot) => {
        let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        this.setState({
          pdf3: percentage
        })
      }, error => {
        console.error(error.message);
      }, () =>  storageRef.getDownloadURL().then(url =>  {
        const record = url;
        this.setState({
          filerecibo: record
        });
      }));
    }
  }

  listenForItems = (itemsRef) => {
    itemsRef.on('value', (snap) => {
      var lista = [];
      snap.forEach((child) => {
        lista.push({
          vale: child.val().vale,
          cheque: child.val().cheque,
          cantidad: child.val().cantidad,
          cantidadc: child.val().cantidadc,
          cantidadr: child.val().cantidadr,
          reembolso: child.val().reembolso,
          concepto: child.val().concepto,
          oficioS: child.val().oficioS,
          area: child.val().area,
          turno: child.val().turno,
          personaR: child.val().personaR,
          estatus: child.val().estatus,
          factura: child.val().factura,
          recibos: child.val().recibos,
          sc: child.val().sc,
          fecha: child.val().fecha,
          autorizo: child.val().autorizo,
          done: child.val().done,
          id: child.key
        });
      });
      this.setState({
        lista: lista
      });
    });
  }

  componentDidMount() {
    const itemsRef = firebase.database().ref('vales/');
    this.listenForItems(itemsRef);
  }

  resetForm() {
    this.refs.contactForm.reset();
  }

  sendMessage(e) {
    e.preventDefault();
    const params = {
      xml: this.inputXml.value,
    };
    this.setState({
      xml: this.inputXml.value,
    })
    if ( params.xml ) {
      firebase.database().ref('xml').push(params).then(() => {
        alert('Tu solicitud fue enviada.');
      }).catch(() => {
        alert('Tu solicitud no puede ser enviada');
      });
      this.resetForm();
    } else {
      alert('Por favor llene el formulario');
    };
  }

  update = (item) => {
    let updates = {};
    updates['vales/' + item.id + '/comprobacion/'] = {
      filexml: this.state.filexml,
      filefactura: this.state.filefactura,
      filerecibo: this.state.filerecibo
    };
    firebase.database().ref().update(updates);
    alert('Tu solicitud fue enviada.');
  }

  render() {
    return (
      <div className='container-back'>
        <div className='site'>
          <p className='site-s'><b>Actualizacion de Archivos</b></p>
        </div>
        <form className='margin-f-a' onSubmit={this.sendMessage.bind(this)} ref='contactForm'>
          <div className='p-container-fondor'>
            <div className='p-margin-fr'>
              <p className='p-title-size-fr'>
                - Selecciona la carga de evidencias de tus comprobaciones
              </p>
            </div>
            <div className='inputs-container-fr'>
              <div className='inputs-col-ar'>
                <div className='inputs-row-fr-2'>
                  <div className='p-container-ar'>
                    <p className='p-title-margin-fr'>XML</p>
                    <Dropzone
                      style={{
                        position: 'relative',
                        width: '100%',
                        height: '30px',
                        borderWidth: '1px',
                        borderColor: 'rgb(102, 102, 102)',
                        borderStyle: 'solid',
                        borderRadius: '1px',
                        maxFiles: 5,
                        background: 'white',
                        position: 'static'
                      }}
                      accept=".xml" onChange={this.handleOnChange1.bind(this)}>
                      <div className='filename'>
                        <p className='file-hid'>{this.state.filex}</p>
                      </div>
                    </Dropzone>
                    <progress className='progress' value={this.state.pdf1} max='100'>
                      {this.state.pdf1} %
                    </progress>
                  </div>
                  <div className='p-container-ar'>
                    <p className='p-title-margin-fr'>FACTURA</p>
                    <Dropzone
                      style={{
                        position: 'relative',
                        width: '100%',
                        height: '30px',
                        borderWidth: '1px',
                        borderColor: 'rgb(102, 102, 102)',
                        borderStyle: 'solid',
                        borderRadius: '1px',
                        maxFiles: 5,
                        background: 'white',
                        position: 'static'
                      }}
                      accept=".pdf" onChange={this.handleOnChange2.bind(this)}>
                      <div className='filename'>
                        <p className='file-hid'>{this.state.filef}</p>
                      </div>
                    </Dropzone>
                    <progress className='progress' value={this.state.pdf2} max='100'>
                      {this.state.pdf2} %
                    </progress>
                  </div>
                  <div className='p-container-ar'>
                    <p className='p-title-margin-fr'>RECIBO</p>
                    <Dropzone
                      style={{
                        position: 'relative',
                        width: '100%',
                        height: '30px',
                        borderWidth: '1px',
                        borderColor: 'rgb(102, 102, 102)',
                        borderStyle: 'solid',
                        borderRadius: '1px',
                        maxFiles: 5,
                        background: 'white',
                        position: 'static'
                      }}
                      accept=".pdf" onChange={this.handleOnChange3.bind(this)}>
                      <div className='filename'>
                        <p className='file-hid'>{this.state.filer}</p>
                      </div>
                    </Dropzone>
                    <progress className='progress' value={this.state.pdf3} max='100'>
                      {this.state.pdf3} %
                    </progress>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
        <Dropzone
          style={{
            position: 'relative',
            width: '100%',
            height: '30px',
            borderWidth: '2px',
            borderColor: 'rgb(102, 102, 102)',
            borderStyle: 'solid',
            borderRadius: '5px'}}
            accept=".xml" onDropAccepted={this.onDrop.bind(this)}>
            <div className='filename'>
              <p className='file-hid'>{this.state.fileNameE}</p>
            </div>
        </Dropzone>
        <div className='caja-w' style={{marginTop: '40px', marginBottom: '40px'}}>
          <div className='caja-col'>
            <ListArchivo
              lista={this.state.lista}
              update={this.update}
            />
          </div>
        </div>
      </div>
    )
  }
}
