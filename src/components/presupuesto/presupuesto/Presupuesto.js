import React, { Component } from 'react'
import Dropzone from 'react-dropzone'
import csv from 'csv'
import firebase from '../../../Firebase'
import './Presupuesto.css'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'

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
          const f = data[i][7]
          const fu = data[i][8]
          const sf = data[i][9]
          const eje = data[i][10]
          const s = data[i][11]
          const prog = data[i][12]
          const sp = data[i][13]
          const obj = data[i][14]
          const proy = data[i][15]
          const est = data[i][16]
          const obra = data[i][17]
          const ben = data[i][18]
          const eg = data[i][19]
          const mi = data[i][20]
          const pr = data[i][21]
          const pd = data[i][22]
          const itrans = data[i][23]
          const min = data[i][24]
          const igest = data[i][25]
          const la = data[i][26]
          const ods = data[i][27]
          const et = data[i][28]
          const ff = data[i][29]
          const of = data[i][30]
          const np = data[i][31]
          const cpa = data[i][32]
          const ene = data[i][33]
          const gasene = data[i][34]
          const ampene = data[i][35]
          const feb = data[i][36]
          const gasfeb = data[i][37]
          const ampfeb = data[i][38]
          const mar = data[i][39]
          const gasmar = data[i][40]
          const ampmar = data[i][41]
          const abr = data[i][42]
          const gasabr = data[i][43]
          const ampabr = data[i][44]
          const may = data[i][45]
          const gasmay = data[i][46]
          const ampmay = data[i][47]
          const jun = data[i][48]
          const gasjun = data[i][49]
          const ampjun = data[i][50]
          const jul = data[i][51]
          const gasjul = data[i][52]
          const ampjul = data[i][53]
          const ago = data[i][54]
          const gasago = data[i][55]
          const ampago = data[i][56]
          const sep = data[i][57]
          const gassep = data[i][58]
          const ampsep = data[i][59]
          const oct = data[i][60]
          const gasoct = data[i][61]
          const ampoct = data[i][62]
          const nov = data[i][63]
          const gasnov = data[i][64]
          const ampnov = data[i][65]
          const dic = data[i][66]
          const gasdic = data[i][67]
          const ampdic = data[i][68]
          const total = data[i][69]
          const ampliacion = data[i][70]
          const reduccion = data[i][71]
          const transferencia = data[i][72]
          const npro = data[i][73]
          const presupuesto = {
            'año': año, 'rm': rm, 'ur': ur, 'up': up, 'rubro': rubro, 'tg': tg,
            'ogasto': ogasto, 'f': f, 'fu': fu, 'sf': sf, 'eje': eje,
            's': s, 'prog': prog, 'sp': sp, 'obj': obj, 'proy': proy, 'est': est,
            'obra': obra, 'ben': ben, 'eg': eg, 'mi': mi, 'pr': pr, 'pd': pd,
            'itrans': itrans, 'min': min, 'igest': igest, 'la': la, 'ods': ods,
            'et': et, 'ff': ff, 'of': of, 'np': np, 'cpa': cpa,
            'ene': parseFloat(ene), 'gasene': parseFloat(gasene), 'ampene': parseFloat(ampene),
            'feb': parseFloat(feb), 'gasfeb': parseFloat(gasfeb), 'ampfeb': parseFloat(ampfeb),
            'mar': parseFloat(mar), 'gasmar': parseFloat(gasmar), 'ampmar': parseFloat(ampmar),
            'abr': parseFloat(abr), 'gasabr': parseFloat(gasabr), 'ampabr': parseFloat(ampabr),
            'may': parseFloat(may), 'gasmay': parseFloat(gasmay), 'ampmay': parseFloat(ampmay),
            'jun': parseFloat(jun), 'gasjun': parseFloat(gasjun), 'ampjun': parseFloat(ampjun),
            'jul': parseFloat(jul), 'gasjul': parseFloat(gasjul), 'ampjul': parseFloat(ampjul),
            'ago': parseFloat(ago), 'gasago': parseFloat(gasago), 'ampago': parseFloat(ampago),
            'sep': parseFloat(sep), 'gassep': parseFloat(gassep), 'ampsep': parseFloat(ampsep),
            'oct': parseFloat(oct), 'gasoct': parseFloat(gasoct), 'ampoct': parseFloat(ampoct),
            'nov': parseFloat(nov), 'gasnov': parseFloat(gasnov), 'ampnov': parseFloat(ampnov),
            'dic': parseFloat(dic), 'gasdic': parseFloat(gasdic), 'ampdic': parseFloat(ampdic),
            'total': parseFloat(total),
            'ampliacion': ampliacion, 'reduccion': reduccion, 'transferencia': transferencia,
            'npro': npro
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
          fetch('https://financieros-78cb0.firebaseio.com/presupuestoValidacion.json', {
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
      <div style={{ padding: '24px', background: '#f4f4f4' }}>
        <form className='presupuesto-container' onSubmit={this.sendMessage.bind(this)} ref='contactForm'>
          <div className='presupuesto-content'>
            <div className='presupuesto-card'>
              <Typography variant='h4'><b>Aqui puedes subir<br />tu presupuesto anual</b></Typography>
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
                <Button
                  variant='contained'
                  color='primary'
                  style={{ background: '#092432' }}
                  type='submit'
                >
                  GUARDAR
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    )
  }
}
