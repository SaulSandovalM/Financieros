import React, { Component } from 'react'
import Dropzone from 'react-dropzone'
import csv from 'csv'
import firebase from '../../../Firebase'
import './Presupuesto.css'

export default class Excel extends Component {
  constructor () {
    super()
    this.state = {
      pdf: 0,
      csv: 0,
      fileNameE: '',
      excel: '',
      fileNameS: '',
      oficioS: '',
      tipo: 'Carga de Presupuesto Inicial'
    }
  }

  onDrop (files) {
    this.setState({ files })
    var fileNameE = files[0]
    const reader = new FileReader()
    reader.onload = () => {
      csv.parse(reader.result, (err, data) => {
        var userList = []
        for (var i = 0; i < data.length; i++) {
          const año = data[i][0]
          const rm = data[i][1]
          const ur = data[i][2]
          const up = data[i][3]
          const rubro = data[i][4]
          const tg = data[i][5]
          const ogasto = data[i][6]
          const npro = data[i][7]
          const f = data[i][8]
          const fu = data[i][9]
          const sf = data[i][10]
          const eje = data[i][11]
          const s = data[i][12]
          const prog = data[i][13]
          const sp = data[i][14]
          const obj = data[i][15]
          const proy = data[i][16]
          const est = data[i][17]
          const obra = data[i][18]
          const ben = data[i][19]
          const eg = data[i][20]
          const mi = data[i][21]
          const pr = data[i][22]
          const ped = data[i][23]
          const itrans = data[i][24]
          const igest = data[i][25]
          const la = data[i][26]
          const ods = data[i][27]
          const et = data[i][28]
          const ff = data[i][29]
          const of = data[i][30]
          const np = data[i][31]
          const cpa = data[i][32]
          const ene = data[i][33]
          const feb = data[i][34]
          const mar = data[i][35]
          const abr = data[i][36]
          const may = data[i][37]
          const jun = data[i][38]
          const jul = data[i][39]
          const ago = data[i][40]
          const sep = data[i][41]
          const oct = data[i][42]
          const nov = data[i][43]
          const dic = data[i][44]
          const total = data[i][45]
          const presupuesto = {
            'año': año, 'rm': rm, 'ur': ur, 'up': up, 'rubro': rubro, 'tg': tg,
            'ogasto': ogasto, 'npro': npro, 'f': f, 'fu': fu, 'sf': sf, 'eje': eje,
            's': s, 'prog': prog, 'sp': sp, 'obj': obj, 'proy': proy, 'est': est,
            'obra': obra, 'ben': ben, 'eg': eg, 'mi': mi, 'pr': pr, 'ped': ped,
            'itrans': itrans, 'igest': igest, 'la': la, 'ods': ods, 'et': et,
            'ff': ff, 'of': of, 'np': np, 'cpa': cpa, 'ene': ene, 'feb': feb,
            'mar': mar, 'abr': abr, 'may': may, 'jun': jun, 'jul': jul,
            'ago': ago, 'sep': sep, 'oct': oct, 'nov': nov, 'dic': dic, 'total': total
          }
          userList.push(presupuesto)
          fetch('https://financieros-78cb0.firebaseio.com/presupuesto.json', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(presupuesto)
          })
        }
      })
    }
    reader.readAsBinaryString(fileNameE)
    const storageRef = firebase.storage().ref(`presupuesto/${fileNameE.name}`)
    const task = storageRef.put(fileNameE)
    this.setState({
      fileNameE: `${fileNameE.name}`
    })
    task.on('state_changed', snapshot => {
      const percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      this.setState({
        csv: percentage
      })
    }, error => {
      console.error(error.message)
    }, () => storageRef.getDownloadURL().then(url => {
      const record = url
      this.setState({
        excel: record
      })
    }))
  }

  handleUpload (event) {
    const file = event.target.files[0]
    const storageRef = firebase.storage().ref(`presupuesto/${file.name}`)
    const task = storageRef.put(file)
    this.setState({
      fileNameS: `${file.name}`
    })
    task.on('state_changed', snapshot => {
      const percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      this.setState({
        pdf: percentage
      })
    }, error => {
      console.error(error.message)
    }, () => storageRef.getDownloadURL().then(url => {
      const record = url
      this.setState({
        oficioS: record
      })
    }))
  }

  sendMessage (e) {
    e.preventDefault()
    const params = {
      fileNameE: this.state.fileNameE,
      excel: this.state.excel,
      fileNameS: this.state.fileNameS,
      oficioS: this.state.oficioS,
      tipo: this.state.tipo
    }
    this.setState({
      fileNameE: this.state.fileNameE,
      excel: this.state.excel,
      fileNameS: this.state.fileNameS,
      oficioS: this.state.oficioS,
      tipo: this.state.tipo
    })
    if (params.fileNameE && params.excel && params.fileNameS && params.oficioS && params.tipo) {
      firebase.database().ref('archivos-presupuesto').push(params).then(() => {
        alert('Tu solicitud fue enviada.')
      }).catch(() => {
        alert('Tu solicitud no puede ser enviada')
      })
      this.setState({
        fileNameE: '',
        fileNameS: ''
      })
    } else {
      alert('Por favor llene el formulario')
    }
  }

  render () {
    return (
      <div>
        <form className='presupuesto-container' onSubmit={this.sendMessage.bind(this)} ref='contactForm'>
          <div className='presupuesto-content'>
            <div className='presupuesto-card'>
              <h1 className='presupuesto-h1'>Aqui puedes subir<br />tu presupuesto anual </h1>
              <p className='presupuesto-p'>Traspasa tu información de Excel para poder usar el sistema</p>
              <div>
                <p>Archivo CSV:</p>
                <Dropzone
                  style={{
                    position: 'relative',
                    width: '100%',
                    height: '30px',
                    borderWidth: '2px',
                    borderColor: 'rgb(102, 102, 102)',
                    borderStyle: 'solid',
                    borderRadius: '5px'
                  }}
                  accept='.csv' onDropAccepted={this.onDrop.bind(this)}
                >
                  <div className='filename'>
                    <p className='file-hid'>{this.state.fileNameE}</p>
                  </div>
                </Dropzone>
                <progress className='progress' value={this.state.csv} max='100'>
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
                    borderRadius: '5px'
                  }}
                  accept='.pdf' onChange={this.handleUpload.bind(this)}
                >
                  <div className='filename'>
                    <p className='file-hid'>{this.state.fileNameS}</p>
                  </div>
                </Dropzone>
                <progress className='progress' value={this.state.pdf} max='100'>
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
