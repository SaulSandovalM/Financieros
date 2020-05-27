import React, { Component } from 'react';
import './Presupuesto.css';
import firebase from '../../../Firebase';
import ListComponent from './ListComponent';
import CurrencyFormat from 'react-currency-format';
import csv from 'csv';
import Dropzone from 'react-dropzone';

export default class Presupuesto extends Component {
  constructor (props) {
    super(props)
    this.state = {
      pdf: 0,
      lista: [
        {
          id: 1,
          name: 'preuba',
          done: false
        },
      ],
      ingresos: '',
      importe: '',
      proyecto: '',
      clave: '',
      contador: {}
    }
  }

  handleUpload (event) {
    const file = event.target.files[0]
    const storageRef = firebase.storage().ref(`presupuesto-fr/${file.name}`)
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

  listenForItems = (itemsRef) => {
    itemsRef.on('value', (snap) => {
      var lista = [];
      snap.forEach((child) => {
        lista.push({
          rm: child.val().rm,
          os: child.val().os,
          up: child.val().up,
          rubro: child.val().rubro,
          tg: child.val().tg,
          ogasto: child.val().ogasto,
          f: child.val().f,
          fu: child.val().fu,
          sf: child.val().sf,
          eje: child.val().eje,
          s: child.val().s,
          prog: child.val().prog,
          sp: child.val().sp,
          obj: child.val().obj,
          proy: child.val().proy,
          est: child.val().est,
          obra: child.val().obra,
          ben: child.val().ben,
          eg: child.val().eg,
          mi: child.val().mi,
          pr: child.val().pr,
          pb: child.val().pb,
          dp: child.val().dp,
          indi: child.val().indi,
          meta: child.val().meta,
          la: child.val().la,
          ods: child.val().ods,
          et: child.val().et,
          ff: child.val().ff,
          of: child.val().of,
          np: child.val().np,
          cpa: child.val().cpa,
          dig: child.val().dig,
          par: child.val().par,
          ene: child.val().ene,
          feb: child.val().feb,
          mar: child.val().mar,
          abr: child.val().abr,
          may: child.val().may,
          jun: child.val().jun,
          jul: child.val().jul,
          ago: child.val().ago,
          sep: child.val().sep,
          oct: child.val().oct,
          nov: child.val().nov,
          dic: child.val().dic,
          total: child.val().total,
          cpa: child.val().cpa,
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
    const itemsRef = firebase.database().ref('presupuesto/');
    this.listenForItems(itemsRef);
    this.consumo();
  }

  consumo = () => {
    const ref = firebase.firestore().collection('banco').doc('--stats--');
    ref.get().then((doc) => {
      if (doc.exists) {
        this.setState({
          contador: doc.data(),
          key: doc.id,
          isLoading: false
        });
      } else {
        console.log("No hay documento!");
      }
    })
  }

  showAlert(type, message) {
    this.setState({
      alert: true,
      alertData: {type, message}
    });
    setTimeout(() => {
      this.setState({alert: false});
    }, 6000);
  }

  resetForm() {
    this.refs.contactForm.reset();
  }

  sendMessage(e) {
    e.preventDefault();
    const params = {
      ingresos: this.inputIngresos.value,
      importe: this.inputImporte.value,
      proyecto: this.inputProyecto.value,
      clave: this.inputClave.value,
    };
    this.setState({
      ingresos: this.inputIngresos.value,
      importe: this.inputImporte.value,
      proyecto: this.inputProyecto.value,
      clave: this.inputClave.value,
    })
    if ( params.ingresos && params.importe && params.proyecto && params.clave ) {
      var f = parseInt(params.importe);
      const statsRef = firebase.firestore().collection('banco').doc('--stats--');
      const increment = firebase.firestore.FieldValue.increment(f);
      const batch = firebase.firestore().batch();
      const storyRef = firebase.firestore().collection('banco').doc(`${Math.random()}`);
      batch.set(storyRef, { title: 'Se Creo Fondo Revolvente', cantidad: f });
      batch.set(statsRef, { storyCount: increment }, { merge: true });
      batch.commit();
      firebase.database().ref('banco').push(params).then(() => {
        this.showAlert('success', 'Tu solicitud fue enviada.');
      }).catch(() => {
        this.showAlert('danger', 'Tu solicitud no puede ser enviada');
      });
      this.resetForm();
    } else {
      this.showAlert('warning', 'Por favor llene el formulario');
    };
  }

  update = (item) => {
    let updates = {};
    updates['presupuesto/' + item.id] = {
      rm: item.rm,
      os: item.os,
      up: item.up,
      rubro: item.rubro,
      tg: item.tg,
      ogasto: item.ogasto,
      f: item.f,
      fu: item.fu,
      sf: item.sf,
      eje: item.eje,
      s: item.s,
      prog: item.prog,
      sp: item.sp,
      obj: item.obj,
      proy: item.proy,
      est: item.est,
      obra: item.obra,
      ben: item.ben,
      eg: item.eg,
      mi: item.mi,
      pr: item.pr,
      pb: item.pb,
      dp: item.dp,
      indi: item.indi,
      meta: item.meta,
      la: item.la,
      ods: item.ods,
      et: item.et,
      ff: item.ff,
      of: item.of,
      np: item.np,
      cpa: item.cpa,
      dig: item.dig,
      par: item.par,
      ene: item.ene,
      feb: item.feb,
      mar: item.mar,
      abr: item.abr,
      may: item.may,
      jun: item.jun,
      jul: item.jul,
      ago: item.ago,
      sep: item.sep,
      oct: item.oct,
      nov: item.nov,
      dic: this.inputImporte.value,
      total: item.total,
    };
    firebase.database().ref().update(updates);
  }

  render() {
    return (
      <div className='pf-container'>
        <div className='site-pf'>
          <p className='site-pf-s'><b>Presupuesto y Fondo Revolvente</b></p>
        </div>
        <div className='p-container'>
          <div className='p-margin'>
            <p className='p-title-size'>- Aqui puedes subir tu presupuesto anual</p>
          </div>
          <div className='p-row'>
            <div className='p-container-i' style={{marginRight: '20px'}}>
              <p className='p-title-margin'>Archivo Pdf</p>
              <Dropzone
                style={{
                  position: 'ab',
                  width: '100%',
                  height: '29px',
                  borderWidth: '1px',
                  borderColor: '#a9a9a9',
                  borderStyle: 'solid',
                  background: 'white',
                }}
                accept=".pdf" onChange={this.handleUpload.bind(this)}>
              </Dropzone>
            </div>
            <div className='p-container-i'>
              <p className='p-title-margin'>Archivo Cvs</p>
              <Dropzone
                style={{
                  position: 'ab',
                  width: '100%',
                  height: '29px',
                  borderWidth: '1px',
                  borderColor: '#a9a9a9',
                  borderStyle: 'solid',
                  background: 'white'
                }}
                accept=".csv" onDropAccepted={this.onDrop.bind(this)}>
              </Dropzone>
            </div>
          </div>
        </div>
        <div className='p-container-fr'>
          <div className='p-margin-row'>
            <p className='p-title-size'>
              - Agrega el documento de autorización de fondo revolvente
            </p>
            <div>
              <p class='p-banco'><b>PORCENTAJE AGREGADO</b></p>
              <p class='cantidad-add-banco'>
                MXN
                <CurrencyFormat
                  value={this.state.contador.storyCount}
                  displayType={'text'}
                  thousandSeparator={true}
                  prefix={' $'} />
                .00
              </p>
            </div>
          </div>
          <div className='p-row'>
            <div className='p-container-i' style={{marginRight: '20px'}}>
              <p className='p-title-margin'>Archivo Pdf</p>
              <Dropzone
                style={{
                  position: 'ab',
                  width: '100%',
                  height: '29px',
                  borderWidth: '1px',
                  borderColor: '#a9a9a9',
                  borderStyle: 'solid',
                  background: 'white',
                }}
                accept=".pdf" onChange={this.handleUpload.bind(this)}>
              </Dropzone>
            </div>
          </div>
        </div>
        <form /*onSubmit={this.sendMessage.bind(this)}*/ ref='contactForm'>
          <div className='p-container'>
            <div className='p-margin-f'>
              <p className='p-title-size'>
                - Ingresa los datos que correspondan con el documento de autorización del fondo revolvente
              </p>
            </div>
            <div className='p-row2'>
              <div className='p-container-i2' style={{marginRight: '20px'}}>
                <p className='p-title-margin2'>R. de Ingresos</p>
                <input
                  className='input-h'
                  id='ingresos'
                  ref={ingresos => this.inputIngresos = ingresos}
                  placeholder='Aprovechamientos por Cooperaciones'
                  required
                />
              </div>
              <div className='p-container-i2' >
                <p className='p-title-margin2'>Importe</p>
                <input
                  className='input-h'
                  id='importe'
                  ref={importe => this.inputImporte = importe}
                  placeholder='$ 704,874.00'
                  required
                />
              </div>
            </div>
            <div className='p-col'>
              <div className='p-container-i3' >
                <p className='p-title-margin2'>Proyecto</p>
                <select className='input-h-s' ref={proyecto => this.inputProyecto = proyecto} required>
                  <option id='proyecto'>Atención y seguimiento a peticiones recibidas en el despacho del procurador</option>
                  <option id='proyecto'>Casos penales de la región oriente concluidos</option>
                  <option id='proyecto'>Delitos cometidos en contra de la Libertad de expresión, periodistas y personas defensoras de los Derechos Humanos para una procuración de justicia resueltos y/o concluidos</option>
                  <option id='proyecto'>Averiguaciones Previas del sistema Tradicional  concluidas</option>
                  <option id='proyecto'>Casos penales resueltos en materia de delitos electorales</option>
                  <option id='proyecto'>Casos penales determinados,concluidos o resueltos en delitos que atenten contra la mujer y la figura de la familia</option>
                  <option id='proyecto'>Acuerdos reparatorios y/o juntas restaurativas generados atraves de los mecanismos alternativos de solucion de controversias en la región poniente</option>
                  <option id='proyecto'>Resolución.conclusión o determinación de los casos penales con motivo de los delitos de feminicidio realizada</option>
                  <option id='proyecto'>Quejas y denuncias atendidas con la legalidad en las actividades realizadas por las y los servidores públicos vigiladas</option>
                  <option id='proyecto'>Intervenciones periciales a autoridades de procuración de justicia para una correcta integración del expediente en casos penales entregados</option>
                  <option id='proyecto'>Resolución de los casos penales del delito de narcomenudeo, realizadas</option>
                  <option id='proyecto'>Casos penales por delito de secuestro y extorsión determinados,concluidos y/o resueltos</option>
                  <option id='proyecto'>Gestión administrativa,financiera,de informática,de calidad y de planeación estratégica realizada</option>
                  <option id='proyecto'>Casos penales de los delitos de trata de personas, lenocinio y delitos conexos determinados y/o resueltos</option>
                  <option id='proyecto'>Casos penales de la región poniente concluidos</option>
                  <option id='proyecto'>Atenciones ciudadanas en los módulos de atención temprana en la región poniente brindadas</option>
                  <option id='proyecto'>Determinación de la carpetas de investigación en las unidades de investigación de la región poniente</option>
                  <option id='proyecto'>Acciones de investigación ejecutadas</option>
                  <option id='proyecto'>Atenciones ciudadanas en los módulos de atención temprana dela región oriente brindadas</option>
                  <option id='proyecto'>Acuerdos reparatorios y/o juntas restaurativas firmados y cumplidos a través de los mecanismos alternativos de solución de controversias en la región oriente</option>
                  <option id='proyecto'>Determinación en las carpetas de investigación en las unidades de investigación de la región oriente</option>
                  <option id='proyecto'>Carpetas de investigación determinadas, concluidas o resueltas por delitos de corrupción realizadas</option>
                  <option id='proyecto'>Casos penales determinados, concluidos o resueltos de delitos en materia de desaparición forzada de personas cometidos por particulares.delitos vinculados y de personas no localizados realizados</option>
                  <option id='proyecto'>Partida Centralizada</option>
                  <option id='proyecto'>Intervenciones periciales a autoridades de procuración de justicia para una correcta integración del expediente en casos penales entregados</option>
                </select>
              </div>
              <div className='p-container-i3' >
                <p className='p-title-margin2'>Clave</p>
                  <select className='input-h-s' ref={clave => this.inputClave = clave} required>
                    <option id='clave'>26-30-01-6201010-01-211002-1-02-02-404-00-E0018-01-002-AU001-001-B07-85000-00-00-D5-C5-0194-00-01-PF-01-01</option>
                    <option id='clave'>26-30-01-6201010-01-221001-1-02-02-404-00-E0018-01-002-AU001-001-B07-85000-00-00-D5-C5-0194-00-01-PF-01-01</option>
                    <option id='clave'>26-30-01-6201010-01-221002-1-02-02-404-00-E0018-01-002-AU001-001-B07-85000-00-00-D5-C5-0194-00-01-PF-01-01</option>
                    <option id='clave'>26-30-01-6201010-01-253001-1-02-02-404-00-E0018-01-002-AU001-001-B07-85000-00-00-D5-C5-0194-00-01-PF-01-01</option>
                    <option id='clave'>26-30-01-6201010-01-261001-1-02-02-404-00-E0018-01-002-AU001-001-B07-85000-00-00-D5-C5-0194-00-01-PF-01-01</option>
                    <option id='clave'>26-30-01-6201010-01-318001-1-02-02-404-00-E0018-01-002-AU001-001-B07-85000-00-00-D5-C5-0194-00-01-PF-01-01</option>
                    <option id='clave'>26-30-01-6201010-01-334001-1-02-02-404-00-E0018-01-002-AU001-001-B07-85000-00-00-D5-C5-0194-00-01-PF-01-01</option>
                    <option id='clave'>26-30-01-6201010-01-338001-1-02-02-404-00-E0018-01-002-AU001-001-B07-85000-00-00-D5-C5-0194-00-01-PF-01-01</option>
                    <option id='clave'>26-30-01-6201010-01-355001-1-02-02-404-00-E0018-01-002-AU001-001-B07-85000-00-00-D5-C5-0194-00-01-PF-01-01</option>
                    <option id='clave'>26-30-01-6201010-01-372001-1-02-02-404-00-E0018-01-002-AU001-001-B07-85000-00-00-D5-C5-0194-00-01-PF-01-01</option>
                    <option id='clave'>26-30-01-6201010-01-375001-1-02-02-404-00-E0018-01-002-AU001-001-B07-85000-00-00-D5-C5-0194-00-01-PF-01-01</option>
                  </select>

{/*26-30-02-6201010-01-211002-1-02-02-404-00-E0018-04-003-AU003-001-B07-86000-00-00-D5-G4-0180-00-04-PC-01-01
26-30-02-6201010-01-212001-1-02-02-404-00-E0018-04-003-AU003-001-B07-86000-00-00-D5-G4-0180-00-04-PC-01-01
26-30-02-6201010-01-261001-1-02-02-404-00-E0018-04-003-AU003-001-B07-86000-00-00-D5-G4-0180-00-04-PC-01-01
26-30-02-6201010-01-318001-1-02-02-404-00-E0018-04-003-AU003-001-B07-86000-00-00-D5-G4-0180-00-04-PC-01-01
26-30-02-6201010-01-338001-1-02-02-404-00-E0018-04-003-AU003-001-B07-86000-00-00-D5-G4-0180-00-04-PC-01-01
26-30-02-6201010-01-355001-1-02-02-404-00-E0018-04-003-AU003-001-B07-86000-00-00-D5-G4-0180-00-04-PC-01-01
26-30-02-6201010-01-372001-1-02-02-404-00-E0018-04-003-AU003-001-B07-86000-00-00-D5-G4-0180-00-04-PC-01-01
26-30-02-6201010-01-375001-1-02-02-404-00-E0018-04-003-AU003-001-B07-86000-00-00-D5-G4-0180-00-04-PC-01-01

26-30-03-6201010-01-211002-1-02-02-404-00-E0018-02-001-AU004-001-K01-85000-00-00-D5-00-0314-00-03-PC-01-01
26-30-03-6201010-01-261001-1-02-02-404-00-E0018-02-001-AU004-001-K01-85000-00-00-D5-00-0314-00-03-PC-01-01
26-30-03-6201010-01-355001-1-02-02-404-00-E0018-02-001-AU004-001-K01-85000-00-00-D5-00-0314-00-03-PC-01-01
26-30-03-6201010-01-375001-1-02-02-404-00-E0018-02-001-AU004-001-K01-85000-00-00-D5-00-0314-00-03-PC-01-01

26-30-04-6201010-01-221002-1-02-02-404-00-E0018-04-003-AU005-001-B07-85000-00-00-D5-G4-0143-00-04-PC-01-01
26-30-04-6201010-01-261001-1-02-02-404-00-E0018-04-003-AU005-001-B07-85000-00-00-D5-G4-0143-00-04-PC-01-01
26-30-04-6201010-01-318001-1-02-02-404-00-E0018-04-003-AU005-001-B07-85000-00-00-D5-G4-0143-00-04-PC-01-01
26-30-04-6201010-01-338001-1-02-02-404-00-E0018-04-003-AU005-001-B07-85000-00-00-D5-G4-0143-00-04-PC-01-01
26-30-04-6201010-01-355001-1-02-02-404-00-E0018-04-003-AU005-001-B07-85000-00-00-D5-G4-0143-00-04-PC-01-01
26-30-04-6201010-01-375001-1-02-02-404-00-E0018-04-003-AU005-001-B07-85000-00-00-D5-G4-0143-00-04-PC-01-01

26-30-05-6201010-01-261001-1-02-02-404-00-E0018-02-001-AU006-001-B07-85000-00-00-D5-00-0428-00-04-PC-01-01
26-30-05-6201010-01-355001-1-02-02-404-00-E0018-02-001-AU006-001-B07-85000-00-00-D5-00-0428-00-04-PC-01-01
26-30-05-6201010-01-361002-1-02-02-404-00-E0018-02-001-AU006-001-B07-85000-00-00-D5-00-0428-00-04-PC-01-01
26-30-05-6201010-01-375001-1-02-02-404-00-E0018-02-001-AU006-001-B07-85000-00-00-D5-00-0428-00-04-PC-01-01

26-30-06-6201010-01-261001-1-02-02-404-00-E0018-02-001-AU007-001-K01-85000-00-00-D5-00-0409-00-03-PC-01-01
26-30-06-6201010-01-338001-1-02-02-404-00-E0018-04-004-AU007-001-K01-85000-00-00-D5-00-0409-00-03-PC-01-01
26-30-06-6201010-01-355001-1-02-02-404-00-E0018-04-004-AU007-001-K01-85000-00-00-D5-00-0409-00-03-PC-01-01
26-30-06-6201010-01-361002-1-02-02-404-00-E0018-04-004-AU007-001-K01-85000-00-00-D5-00-0409-00-03-PC-01-01
26-30-06-6201010-01-375001-1-02-02-404-00-E0018-04-004-AU007-001-K01-85000-00-00-D5-00-0409-00-03-PC-01-01

26-30-07-6201010-01-211002-1-02-02-404-00-E0018-04-003-AU008-001-B07-86000-00-00-D5-G4-0148-00-04-PC-01-01
26-30-07-6201010-01-212001-1-02-02-404-00-E0018-04-003-AU008-001-B07-86000-00-00-D5-G4-0148-00-04-PC-01-01
26-30-07-6201010-01-261001-1-02-02-404-00-E0018-04-003-AU008-001-B07-86000-00-00-D5-G4-0148-00-04-PC-01-01
26-30-07-6201010-01-355001-1-02-02-404-00-E0018-04-003-AU008-001-B07-86000-00-00-D5-G4-0148-00-04-PC-01-01
26-30-07-6201010-01-375001-1-02-02-404-00-E0018-04-003-AU008-001-B07-86000-00-00-D5-G4-0148-00-04-PC-01-01

26-30-08-6201010-01-211002-1-02-02-404-00-E0018-02-001-AU009-001-B05-85000-00-00-D5-00-0424-00-04-PC-01-01
26-30-08-6201010-01-261001-1-02-02-404-00-E0018-02-001-AU009-001-B05-85000-00-00-D5-00-0424-00-04-PC-01-01
26-30-08-6201010-01-272001-1-02-02-404-00-E0018-02-001-AU009-001-B05-85000-00-00-D5-00-0424-00-04-PC-01-01
26-30-08-6201010-01-318001-1-02-02-404-00-E0018-02-001-AU009-001-B05-85000-00-00-D5-00-0424-00-04-PC-01-01
26-30-08-6201010-01-334001-1-02-02-404-00-E0018-02-001-AU009-001-B05-85000-00-00-D5-00-0424-00-04-PC-01-01
26-30-08-6201010-01-355001-1-02-02-404-00-E0018-02-001-AU009-001-B05-85000-00-00-D5-00-0424-00-04-PC-01-01
26-30-08-6201010-01-361002-1-02-02-404-00-E0018-02-001-AU009-001-B05-85000-00-00-D5-00-0424-00-04-PC-01-01
26-30-08-6201010-01-375001-1-02-02-404-00-E0018-02-001-AU009-001-B05-85000-00-00-D5-00-0424-00-04-PC-01-01
26-30-08-6201010-01-381001-1-02-02-404-00-E0018-02-001-AU009-001-B05-85000-00-00-D5-00-0424-00-04-PC-01-01

26-30-09-6201010-01-261001-1-02-02-404-00-E0018-01-002-AU010-001-B07-85000-00-00-D5-C5-0196-00-01-PF-01-01
26-30-09-6201010-01-355001-1-02-02-404-00-E0018-01-002-AU010-001-B07-85000-00-00-D5-C5-0196-00-01-PF-01-01
26-30-09-6201010-01-375001-1-02-02-404-00-E0018-02-002-AU010-001-K01-85000-00-00-D5-C5-0196-00-01-PF-01-01

26-30-10-4302030-01-211001-1-02-02-404-00-E0018-03-001-AU011-001-B07-85000-00-00-D5-C5-093-00-06-PF -01-01
26-30-10-4302030-01-212001-1-02-02-404-00-E0018-03-001-AU011-001-B07-85000-00-00-D5-C5-093-00-06-PF-01-01
26-30-10-4302030-01-212002-1-02-02-404-00-E0018-03-001-AU011-001-B07-85000-00-00-D5-C5-093-00-06-PF-01-01
26-30-10-4302030-01-214001-1-02-02-404-00-E0018-03-001-AU011-001-B07-85000-00-00-D5-C5-093-00-06-PF -01-01
26-30-10-4302030-01-217001-1-02-02-404-00-E0018-03-001-AU011-001-B07-85000-00-00-D5-C5-093-00-06-PF-01-01
26-30-10-4302030-01-221002-1-02-02-404-00-E0018-03-001-AU011-001-B07-85000-00-00-D5-C5-093-00-06-PF -01-01
26-30-10-4302030-01-249001-1-02-02-404-00-E0018-03-001-AU011-001-B07-85000-00-00-D5-C5-093-00-06-PF-01-01
26-30-10-4302030-01-251001-1-02-02-404-00-E0018-03-001-AU011-001-B07-85000-00-00-D5-C5-093-00-06-PF -01-01
26-30-10-4302030-01-253001-1-02-02-404-00-E0018-03-001-AU011-001-B07-85000-00-00-D5-C5-093-00-06-PF-01-01
26-30-10-4302030-01-254001-1-02-02-404-00-E0018-03-001-AU011-001-B07-85000-00-00-D5-C5-093-00-06-PF -01-01
26-30-10-4302030-01-255001-1-02-02-404-00-E0018-03-001-AU011-001-B07-85000-00-00-D5-C5-093-00-06-PF-01-01
26-30-10-4302030-01-256001-1-02-02-404-00-E0018-03-001-AU011-001-B07-85000-00-00-D5-C5-093-00-06-PF -01-01
26-30-10-4302030-01-261001-1-02-02-404-00-E0018-03-001-AU011-001-B07-85000-00-00-D5-C5-093-00-06-PF-01-01
26-30-10-4302030-01-271001-1-02-02-404-00-E0018-03-001-AU011-001-B07-85000-00-00-D5-C5-093-00-06-PF -01-01
26-30-10-4302030-01-272001-1-02-02-404-00-E0018-03-001-AU011-001-B07-85000-00-00-D5-C5-093-00-06-PF-01-01
26-30-10-4302030-01-275001-1-02-02-404-00-E0018-03-001-AU011-001-B07-85000-00-00-D5-C5-093-00-06-PF -01-01
26-30-10-4302030-01-291001-1-02-02-404-00-E0018-03-001-AU011-001-B07-85000-00-00-D5-C5-093-00-06-PF-01-01
26-30-10-4302030-01-312001-1-02-02-404-00-E0018-03-001-AU011-001-B07-85000-00-00-D5-C5-093-00-06-PF -01-01
26-30-10-4302030-01-334001-1-02-02-404-00-E0018-03-001-AU011-001-B07-85000-00-00-D5-C5-093-00-06-PF-01-01
26-30-10-4302030-01-338001-1-02-02-404-00-E0018-03-001-AU011-001-B07-85000-00-00-D5-C5-093-00-06-PF -01-01
26-30-10-4302030-01-355001-1-02-02-404-00-E0018-03-001-AU011-001-B07-85000-00-00-D5-C5-093-00-06-PF-01-01
26-30-10-4302030-01-357001-1-02-02-404-00-E0018-03-001-AU011-001-B07-85000-00-00-D5-C5-093-00-06-PF -01-01
26-30-10-4302030-01-358001-1-02-02-404-00-E0018-03-001-AU011-001-B07-85000-00-00-D5-C5-093-00-06-PF-01-01
26-30-10-4302030-01-361002-1-02-02-404-00-E0018-03-001-AU011-001-B07-85000-00-00-D5-C5-093-00-06-PF -01-01
26-30-10-4302030-01-372001-1-02-02-404-00-E0018-03-001-AU011-001-B07-85000-00-00-D5-C5-093-00-06-PF-01-01
26-30-10-4302030-01-375001-1-02-02-404-00-E0018-03-001-AU011-001-B07-85000-00-00-D5-C5-093-00-06-PF -01-01
26-30-10-4302030-01-394001-1-02-02-404-00-E0018-03-001-AU011-001-B07-85000-00-00-D5-C5-093-00-06-PF-01-01

26-30-11-6201010-01-211002-1-02-02-404-00-E0018-02-001-AU012-001-B07-85000-00-00-D5-00-0573-00-03-PC-01-01
26-30-11-6201010-01-221002-1-02-02-404-00-E0018-02-001-AU012-001-B07-85000-00-00-D5-00-0573-00-03-PC-01-01
26-30-11-6201010-01-251001-1-02-02-404-00-E0018-02-001-AU012-001-B07-85000-00-00-D5-00-0573-00-03-PC-01-01
26-30-11-6201010-01-261001-1-02-02-404-00-E0018-02-001-AU012-001-B07-85000-00-00-D5-00-0573-00-03-PC-01-01
26-30-11-6201010-01-318001-1-02-02-404-00-E0018-02-001-AU012-001-B07-85000-00-00-D5-00-0573-00-03-PC-01-01
26-30-11-6201010-01-355001-1-02-02-404-00-E0018-02-001-AU012-001-B07-85000-00-00-D5-00-0573-00-03-PC-01-01
26-30-11-6201010-01-375001-1-02-02-404-00-E0018-02-001-AU012-001-B07-85000-00-00-D5-00-0573-00-03-PC-01-01

26-30-12-4302030-01-261001-1-02-02-404-00-E0018-02-001-AU013-001-K01-85000-00-00-D5-00-0421-00-03-PC-01-01
26-30-12-4302030-01-338001-1-02-02-404-00-E0018-02-001-AU013-001-K01-85000-00-00-D5-00-0421-00-03-PC-01-01
26-30-12-4302030-01-355001-1-02-02-404-00-E0018-02-001-AU013-001-K01-85000-00-00-D5-00-0421-00-03-PC-01-01
26-30-12-4302030-01-375001-1-02-02-404-00-E0018-02-001-AU013-001-K01-85000-00-00-D5-00-0421-00-03-PC-01-01
26-30-12-6201010-01-221002-1-02-02-404-00-E0018-02-001-AU013-001-K01-85000-00-00-D5-00-0421-00-03-PC-01-01
26-30-12-6201010-01-338001-1-02-02-404-00-E0018-02-001-AU013-001-K01-85000-00-00-D5-00-0421-00-03-PC-01-01

26-30-13-4302030-01-211001-1-02-02-404-00-E0018-01-002-AU014-001-B07-85000-00-00-D5-C5-0183-00-01-PF-01-01
26-30-13-4302030-01-211002-1-02-02-404-00-E0018-01-002-AU014-001-B07-85000-00-00-D5-C5-0183-00-01-PF-01-01
26-30-13-4302030-01-212001-1-02-02-404-00-E0018-01-002-AU014-001-B07-85000-00-00-D5-C5-0183-00-01-PF-01-01
26-30-13-4302030-01-214001-1-02-02-404-00-E0018-01-002-AU014-001-B07-85000-00-00-D5-C5-0183-00-01-PF-01-01
26-30-13-4302030-01-215001-1-02-02-404-00-E0018-01-002-AU014-001-B07-85000-00-00-D5-C5-0183-00-01-PF-01-01
26-30-13-4302030-01-216001-1-02-02-404-00-E0018-01-002-AU014-001-B07-85000-00-00-D5-C5-0183-00-01-PF-01-01
26-30-13-4302030-01-217001-1-02-02-404-00-E0018-01-002-AU014-001-B07-85000-00-00-D5-C5-0183-00-01-PF-01-01
26-30-13-4302030-01-221002-1-02-02-404-00-E0018-01-002-AU014-001-B07-85000-00-00-D5-C5-0183-00-01-PF-01-01
26-30-13-4302030-01-246001-1-02-02-404-00-E0018-01-002-AU014-001-B07-85000-00-00-D5-C5-0183-00-01-PF-01-01
26-30-13-4302030-01-247001-1-02-02-404-00-E0018-01-002-AU014-001-B07-85000-00-00-D5-C5-0183-00-01-PF-01-01
26-30-13-4302030-01-249001-1-02-02-404-00-E0018-01-002-AU014-001-B07-85000-00-00-D5-C5-0183-00-01-PF-01-01
26-30-13-4302030-01-261001-1-02-02-404-00-E0018-01-002-AU014-001-B07-85000-00-00-D5-C5-0183-00-01-PF-01-01
26-30-13-4302030-01-291001-1-02-02-404-00-E0018-01-002-AU014-001-B07-85000-00-00-D5-C5-0183-00-01-PF-01-01
26-30-13-4302030-01-292001-1-02-02-404-00-E0018-01-002-AU014-001-B07-85000-00-00-D5-C5-0183-00-01-PF-01-01
26-30-13-4302030-01-311001-1-02-02-404-00-E0018-01-002-AU014-001-B07-85000-00-00-D5-C5-0183-00-01-PF-01-01
26-30-13-4302030-01-312001-1-02-02-404-00-E0018-01-002-AU014-001-B07-85000-00-00-D5-C5-0183-00-01-PF-01-01
26-30-13-4302030-01-313001-1-02-02-404-00-E0018-01-002-AU014-001-B07-85000-00-00-D5-C5-0183-00-01-PF-01-01
26-30-13-4302030-01-318001-1-02-02-404-00-E0018-01-002-AU014-001-B07-85000-00-00-D5-C5-0183-00-01-PF-01-01
26-30-13-4302030-01-323002-1-02-02-404-00-E0018-01-002-AU014-001-B07-85000-00-00-D5-C5-0183-00-01-PF-01-01
26-30-13-4302030-01-327001-1-02-02-404-00-E0018-01-002-AU014-001-B07-85000-00-00-D5-C5-0183-00-01-PF-01-01
26-30-13-4302030-01-336001-1-02-02-404-00-E0018-01-002-AU014-001-B07-85000-00-00-D5-C5-0183-00-01-PF-01-01
26-30-13-4302030-01-338001-1-02-02-404-00-E0018-01-002-AU014-001-B07-85000-00-00-D5-C5-0183-00-01-PF-01-01
26-30-13-4302030-01-341001-1-02-02-404-00-E0018-01-002-AU014-001-B07-85000-00-00-D5-C5-0183-00-01-PF-01-01
26-30-13-4302030-01-351001-1-02-02-404-00-E0018-01-002-AU014-001-B07-85000-00-00-D5-C5-0183-00-01-PF-01-01
26-30-13-4302030-01-352001-1-02-02-404-00-E0018-01-002-AU014-001-B07-85000-00-00-D5-C5-0183-00-01-PF-01-01
26-30-13-4302030-01-355001-1-02-02-404-00-E0018-01-002-AU014-001-B07-85000-00-00-D5-C5-0183-00-01-PF-01-01
26-30-13-4302030-01-357001-1-02-02-404-00-E0018-01-002-AU014-001-B07-85000-00-00-D5-C5-0183-00-01-PF-01-01
26-30-13-4302030-01-358001-1-02-02-404-00-E0018-01-002-AU014-001-B07-85000-00-00-D5-C5-0183-00-01-PF-01-01
26-30-13-4302030-01-359001-1-02-02-404-00-E0018-01-002-AU014-001-B07-85000-00-00-D5-C5-0183-00-01-PF-01-01
26-30-13-4302030-01-361002-1-02-02-404-00-E0018-01-002-AU014-001-B07-85000-00-00-D5-C5-0183-00-01-PF-01-01
26-30-13-4302030-01-371001-1-02-02-404-00-E0018-01-002-AU014-001-B07-85000-00-00-D5-C5-0183-00-01-PF-01-01
26-30-13-4302030-01-372001-1-02-02-404-00-E0018-01-002-AU014-001-B07-85000-00-00-D5-C5-0183-00-01-PF-01-01
26-30-13-4302030-01-375001-1-02-02-404-00-E0018-01-002-AU014-001-B07-85000-00-00-D5-C5-0183-00-01-PF-01-01
26-30-13-4302030-01-392006-1-02-02-404-00-E0018-01-002-AU014-001-B07-85000-00-00-D5-C5-0183-00-01-PF-01-01

26-30-14-4305010-01-261001-1-02-02-404-00-E0018-02-001-AU015-001-K01-85000-00-00-D5-00-0419-00-03-PC-01-01
26-30-14-4305010-01-355001-1-02-02-404-00-E0018-02-001-AU015-001-K01-85000-00-00-D5-00-0419-00-03-PC-01-01
26-30-14-4305010-01-375001-1-02-02-404-00-E0018-02-001-AU015-001-K01-85000-00-00-D5-00-0419-00-03-PC-01-01

26-30-15-4305010-01-211002-1-02-02-404-00-E0018-04-003-AU016-001-B07-86000-00-00-D5-G4-0179-00-04-PC-01-01
26-30-15-4305010-01-212001-1-02-02-404-00-E0018-04-003-AU016-001-B07-86000-00-00-D5-G4-0179-00-04-PC-01-01
26-30-15-4305010-01-261001-1-02-02-404-00-E0018-04-003-AU016-001-B07-86000-00-00-D5-G4-0179-00-04-PC-01-01
26-30-15-4305010-01-318001-1-02-02-404-00-E0018-04-003-AU016-001-B07-86000-00-00-D5-G4-0179-00-04-PC-01-01
26-30-15-4305010-01-338001-1-02-02-404-00-E0018-04-003-AU016-001-B07-86000-00-00-D5-G4-0179-00-04-PC-01-01
26-30-15-4305010-01-355001-1-02-02-404-00-E0018-04-003-AU016-001-B07-86000-00-00-D5-G4-0179-00-04-PC-01-01
26-30-15-4305010-01-372001-1-02-02-404-00-E0018-04-003-AU016-001-B07-86000-00-00-D5-G4-0179-00-04-PC-01-01
26-30-15-4305010-01-375001-1-02-02-404-00-E0018-04-003-AU016-001-B07-86000-00-00-D5-G4-0179-00-04-PC-01-01

26-30-16-4305010-01-211002-1-02-02-404-00-E0018-04-003-AU017-001-B07-85000-00-00-D5-G4-0182-00-04-PC-01-01
26-30-16-4305010-01-212001-1-02-02-404-00-E0018-04-003-AU017-001-B07-85000-00-00-D5-G4-0182-00-04-PC-01-01
26-30-16-4305010-01-261001-1-02-02-404-00-E0018-04-003-AU017-001-B07-85000-00-00-D5-G4-0182-00-04-PC-01-01
26-30-16-4305010-01-355001-1-02-02-404-00-E0018-04-003-AU017-001-B07-85000-00-00-D5-G4-0182-00-04-PC-01-01
26-30-16-4305010-01-375001-1-02-02-404-00-E0018-04-003-AU017-001-B07-85000-00-00-D5-G4-0182-00-04-PC-01-01
26-30-16-4305010-01-392006-1-02-02-404-00-E0018-04-003-AU017-001-B07-85000-00-00-D5-G4-0182-00-04-PC-01-01

26-30-17-4302030-01-261001-1-02-02-404-00-E0018-04-003-AU018-001-B07-86000-00-00-D5-G4-0152-00-04-PC-01-01
26-30-17-4302030-01-355001-1-02-02-404-00-E0018-04-003-AU018-001-B07-86000-00-00-D5-G4-0152-00-04-PC-01-01
26-30-17-4305010-01-355001-1-02-02-404-00-E0018-04-003-AU018-001-B07-86000-00-00-D5-G4-0152-00-04-PC-01-01
26-30-17-4305010-01-212001-1-02-02-404-00-E0018-04-003-AU018-001-B07-86000-00-00-D5-G4-0152-00-04-PC-01-01
26-30-17-4305010-01-375001-1-02-02-404-00-E0018-04-003-AU018-001-B07-86000-00-00-D5-G4-0152-00-04-PC-01-01

26-30-18-4302030-01-211002-1-02-02-404-00-E0018-03-004-AU019-001-B07-85000-00-00-D5-00-0151-00-01-PC-01-01
26-30-18-4302030-01-212001-1-02-02-404-00-E0018-03-004-AU019-001-B07-85000-00-00-D5-00-0151-00-01-PC-01-01
26-30-18-4302030-01-221002-1-02-02-404-00-E0018-03-004-AU019-001-B07-85000-00-00-D5-00-0151-00-01-PC-01-01
26-30-18-4302030-01-261001-1-02-02-404-00-E0018-03-004-AU019-001-B07-85000-00-00-D5-00-0151-00-01-PC-01-01
26-30-18-6109020-01-261001-2-02-02-405-01-E0018-03-004-AU019-001-B07-85000-00-00-D5-00-0151-00-01-PC-01-01
26-30-18-6901010-01-261001-3-02-02-406-02-E0018-03-004-AU019-001-B07-85000-00-00-D5-00-0151-00-01-PC-01-01
26-30-18-4302030-01-355001-4-02-02-407-03-E0018-03-004-AU019-001-B07-85000-00-00-D5-00-0151-00-01-PC-01-01
26-30-18-4302030-01-375001-1-02-02-404-00-E0018-03-004-AU019-001-B07-85000-00-00-D5-00-0151-00-01-PC-01-01
26-30-18-4302030-01-392006-1-02-02-404-00-E0018-03-004-AU019-001-B07-85000-00-00-D5-00-0151-00-01-PC-01-01
26-30-18-4302030-01-394001-1-02-02-404-00-E0018-03-004-AU019-001-B07-85000-00-00-D5-00-0151-00-01-PC-01-01

26-30-20-4302030-01-211001-1-02-02-404-00-E0018-04-003-AU021-001-B07-86000-00-00-D5-G4-0163-00-04-PC-01-01
26-30-20-4302030-01-211002-1-02-02-404-00-E0018-04-003-AU021-001-B07-86000-00-00-D5-G4-0163-00-04-PC-01-01
26-30-20-4302030-01-212001-1-02-02-404-00-E0018-04-003-AU021-001-B07-86000-00-00-D5-G4-0163-00-04-PC-01-01
26-30-20-4302030-01-214001-1-02-02-404-00-E0018-04-003-AU021-001-B07-86000-00-00-D5-G4-0163-00-04-PC-01-01
26-30-20-4302030-01-221002-1-02-02-404-00-E0018-04-003-AU021-001-B07-86000-00-00-D5-G4-0163-00-04-PC-01-01
26-30-20-4302030-01-261001-1-02-02-404-00-E0018-04-003-AU021-001-B07-86000-00-00-D5-G4-0163-00-04-PC-01-01
26-30-20-4302030-01-355001-1-02-02-404-00-E0018-04-003-AU021-001-B07-86000-00-00-D5-G4-0163-00-04-PC-01-01
26-30-20-4302030-01-375001-1-02-02-404-00-E0018-04-003-AU021-001-B07-86000-00-00-D5-G4-0163-00-04-PC-01-01

26-30-21-4302030-01-211001-1-02-02-404-00-E0018-04-003-AU022-001-B07-86000-00-00-D5-G4-0147-00-04-PC-01-01
26-30-21-4302030-01-211002-1-02-02-404-00-E0018-04-003-AU022-001-B07-86000-00-00-D5-G4-0147-00-04-PC-01-01
26-30-21-4302030-01-212001-1-02-02-404-00-E0018-04-003-AU022-001-B07-86000-00-00-D5-G4-0147-00-04-PC-01-01
26-30-21-4302030-01-214001-1-02-02-404-00-E0018-04-003-AU022-001-B07-86000-00-00-D5-G4-0147-00-04-PC-01-01
26-30-21-4302030-01-261001-1-02-02-404-00-E0018-04-003-AU022-001-B07-86000-00-00-D5-G4-0147-00-04-PC-01-01
26-30-21-4302030-01-355001-1-02-02-404-00-E0018-04-003-AU022-001-B07-86000-00-00-D5-G4-0147-00-04-PC-01-01
26-30-21-4302030-01-375001-1-02-02-404-00-E0018-04-003-AU022-001-B07-86000-00-00-D5-G4-0147-00-04-PC-01-01
26-30-21-4302030-01-392006-1-02-02-404-00-E0018-04-003-AU022-001-B07-86000-00-00-D5-G4-0147-00-04-PC-01-01

26-30-22-4302030-01-211001-1-02-02-404-00-E0018-04-003-AU023-001-B07-86000-00-00-D5-G4-0158-00-04-PC-01-01
26-30-22-4302030-01-212001-1-02-02-404-00-E0018-04-003-AU023-001-B07-86000-00-00-D5-G4-0158-00-04-PC-01-01
26-30-22-4302030-01-214001-1-02-02-404-00-E0018-04-003-AU023-001-B07-86000-00-00-D5-G4-0158-00-04-PC-01-01
26-30-22-4302030-01-221002-1-02-02-404-00-E0018-04-003-AU023-001-B07-86000-00-00-D5-G4-0158-00-04-PC-01-01
26-30-22-4302030-01-261001-1-02-02-404-00-E0018-04-003-AU023-001-B07-86000-00-00-D5-G4-0158-00-04-PC-01-01
26-30-22-4302030-01-355001-1-02-02-404-00-E0018-04-003-AU023-001-B07-86000-00-00-D5-G4-0158-00-04-PC-01-01
26-30-22-4302030-01-375001-1-02-02-404-00-E0018-04-003-AU023-001-B07-86000-00-00-D5-G4-0158-00-04-PC-01-01

26-30-23-4302030-01-211001-1-02-02-404-00-E0018-02-001-AU024-001-B07-85000-00-00-D5-C5-0614-00-03-PE-01-01
26-30-23-4302030-01-211002-1-02-02-404-00-E0018-02-001-AU024-001-B07-85000-00-00-D5-C5-0614-00-03-PE-01-01
26-30-23-4302030-01-212001-1-02-02-404-00-E0018-02-001-AU024-001-B07-85000-00-00-D5-C5-0614-00-03-PE-01-01
26-30-23-4302030-01-214001-1-02-02-404-00-E0018-02-001-AU024-001-B07-85000-00-00-D5-C5-0614-00-03-PE-01-01
26-30-23-4302030-01-215001-1-02-02-404-00-E0018-02-001-AU024-001-B07-85000-00-00-D5-C5-0614-00-03-PE-01-01
26-30-23-4302030-01-216001-1-02-02-404-00-E0018-02-001-AU024-001-B07-85000-00-00-D5-C5-0614-00-03-PE-01-01
26-30-23-4302030-01-261001-1-02-02-404-00-E0018-02-001-AU024-001-B07-85000-00-00-D5-C5-0614-00-03-PE-01-01
26-30-23-4302030-01-283001-1-02-02-404-00-E0018-02-001-AU024-001-B07-85000-00-00-D5-C5-0614-00-03-PE-01-01
26-30-23-4302030-01-311001-1-02-02-404-00-E0018-02-001-AU024-001-B07-85000-00-00-D5-C5-0614-00-03-PE-01-01
26-30-23-4302030-01-313001-1-02-02-404-00-E0018-02-001-AU024-001-B07-85000-00-00-D5-C5-0614-00-03-PE-01-01
26-30-23-4302030-01-318001-1-02-02-404-00-E0018-02-001-AU024-001-B07-85000-00-00-D5-C5-0614-00-03-PE-01-01
26-30-23-4302030-01-323002-1-02-02-404-00-E0018-02-001-AU024-001-B07-85000-00-00-D5-C5-0614-00-03-PE-01-01
26-30-23-4302030-01-334001-1-02-02-404-00-E0018-02-001-AU024-001-B07-85000-00-00-D5-C5-0614-00-03-PE-01-01
26-30-23-4302030-01-338001-1-02-02-404-00-E0018-02-001-AU024-001-B07-85000-00-00-D5-C5-0614-00-03-PE-01-01
26-30-23-4302030-01-355001-1-02-02-404-00-E0018-02-001-AU024-001-B07-85000-00-00-D5-C5-0614-00-03-PE-01-01
26-30-23-4302030-01-372001-1-02-02-404-00-E0018-02-001-AU024-001-B07-85000-00-00-D5-C5-0614-00-03-PE-01-01
26-30-23-4302030-01-375001-1-02-02-404-00-E0018-02-001-AU024-001-B07-85000-00-00-D5-C5-0614-00-03-PE-01-01
26-30-23-4302030-01-392006-1-02-02-404-00-E0018-02-001-AU024-001-B07-85000-00-00-D5-C5-0614-00-03-PE-01-01
26-30-23-4302030-01-394001-1-02-02-404-00-E0018-02-001-AU024-001-B07-85000-00-00-D5-C5-0614-00-03-PE-01-01

26-30-24-4302030-01-211001-1-02-02-404-00-E0018-02-001-AU026-001-K01-85000-00-00-D5-G4-0783-00-04-PF-01-01
26-30-24-4302030-01-211002-1-02-02-404-00-E0018-02-001-AU026-001-K01-85000-00-00-D5-G4-0783-00-04-PF-01-01
26-30-24-4302030-01-212001-1-02-02-404-00-E0018-02-001-AU026-001-K01-85000-00-00-D5-G4-0783-00-04-PF-01-01
26-30-24-4302030-01-214001-1-02-02-404-00-E0018-02-001-AU026-001-K01-85000-00-00-D5-G4-0783-00-04-PF-01-01
26-30-24-4302030-01-216001-1-02-02-404-00-E0018-02-001-AU026-001-K01-85000-00-00-D5-G4-0783-00-04-PF-01-01
26-30-24-4302030-01-261001-1-02-02-404-00-E0018-02-001-AU026-001-K01-85000-00-00-D5-G4-0783-00-04-PF-01-01
26-30-24-4302030-01-275001-1-02-02-404-00-E0018-02-001-AU026-001-K01-85000-00-00-D5-G4-0783-00-04-PF-01-01
26-30-24-4302030-01-311001-1-02-02-404-00-E0018-02-001-AU026-001-K01-85000-00-00-D5-G4-0783-00-04-PF-01-01
26-30-24-4302030-01-313001-1-02-02-404-00-E0018-02-001-AU026-001-K01-85000-00-00-D5-G4-0783-00-04-PF-01-01
26-30-24-4302030-01-318001-1-02-02-404-00-E0018-02-001-AU026-001-K01-85000-00-00-D5-G4-0783-00-04-PF-01-01
26-30-24-4302030-01-323002-1-02-02-404-00-E0018-02-001-AU026-001-K01-85000-00-00-D5-G4-0783-00-04-PF-01-01
26-30-24-4302030-01-338001-1-02-02-404-00-E0018-02-001-AU026-001-K01-85000-00-00-D5-G4-0783-00-04-PF-01-01
26-30-24-4302030-01-351001-1-02-02-404-00-E0018-02-001-AU026-001-K01-85000-00-00-D5-G4-0783-00-04-PF-01-01
26-30-24-4302030-01-355001-1-02-02-404-00-E0018-02-001-AU026-001-K01-85000-00-00-D5-G4-0783-00-04-PF-01-01
26-30-24-4302030-01-372001-1-02-02-404-00-E0018-02-001-AU026-001-K01-85000-00-00-D5-G4-0783-00-04-PF-01-01
26-30-24-4302030-01-375001-1-02-02-404-00-E0018-02-001-AU026-001-K01-85000-00-00-D5-G4-0783-00-04-PF-01-01
26-30-24-4302030-01-392006-1-02-02-404-00-E0018-02-001-AU026-001-K01-85000-00-00-D5-G4-0783-00-04-PF-01-01
26-30-23-4302030-01-394001-1-02-02-404-00-E0018-02-001-AU026-001-K01-85000-00-00-D5-G4-0783-00-04-PF-01-01

25-29-04-4302030-01-311001-1-08-05-107-00-E0017-02-005-AID11-001-B07-85000
25-29-04-4302030-01-313001-1-08-05-107-00-E0017-02-005-AID11-001-B07-85000

26-30-10-4304010-01-261001-1-02-02-404-00-E0018-03-001-AU011-001-B07-85000-00-00-D5-C5-093-00-06-PF-01-01
26-30-10-4304010-01-291001-1-02-02-404-00-E0018-03-001-AU011-001-B07-85000-00-00-D5-C5-093-00-06-PF-01-01
26-30-10-4304010-01-329001-1-02-02-404-00-E0018-03-001-AU011-001-B07-85000-00-00-D5-C5-093-00-06-PF -01-01
26-30-10-4304010-01-375001-1-02-02-404-00-E0018-03-001-AU011-001-B07-85000-00-00-D5-C5-093-00-06-PF -01-01*/}

              </div>
            </div>
          </div>
          <div className='button-row-s'>
            <button type='submit' class='input-sc boton-g'>Agregar</button>
          </div>
        </form>
        <div className='space-table'>
          <ListComponent
            lista={this.state.lista}
            update={this.update}
          />
        </div>
      </div>
    )
  }
}
