import React, { Component } from 'react'
import './Comprometidos.css'
import firebase from '../../../Firebase'
import ListComponent from './ListComponent'
import { DropDownList } from '@progress/kendo-react-dropdowns'
import '@progress/kendo-theme-default/dist/all.css'
import XmlComp from './sin/XmlComp'
import Dropzone from 'react-dropzone'
import XMLParser from 'react-xml-parser'

export default class Comprometidos extends Component {
  constructor(props) {
    super(props)
    this.unsubscribe = null
    this.state = {
      key: '',
      fondo: '',
      fecha: '',
      realizo: '',
      tipo_doc: '',
      importe: '',
      partida: '',
      no_oficio: '',
      no_proyecto: '',
      municipio: '',
      area: '',
      importe_comp: '',
      isr: '',
      fecha_comp: '',
      comprometidos: [],
      total: '',
      idP: '',
      listaB: [
        {
          id: 1,
          name: 'preuba',
          done: false
        }
      ],
      // listaSin: [
      //   {
      //     id: 1,
      //     name: 'preuba',
      //     done: false
      //   },
      // ],
      listaAsi: [
        {
          id: 1,
          name: 'preuba',
          done: false
        }
      ],
      listaPago: [
        {
          id: 1,
          name: 'preuba',
          done: false
        }
      ]
    }
  }

  handleOnChange1 (event) {
    const files = event.target.files
    for (var i = 0; i < files.length; i++) {
      const file = files[i]
      var xml = file
      if (file.type === 'text/xml') {
        var reader = new FileReader()
        reader.onloadend = function () {
          var xml = new XMLParser().parseFromString(reader.result)
          fetch(xml).then(res => res.text()).then(data => {
            fetch('https://financieros-78cb0.firebaseio.com/xmlP.json', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(xml)
                })
            })
        }
        reader.readAsText(xml)
      }
    }
  }

  // listenForItems = (itemsRef) => {
  //   itemsRef.on('value', (snap) => {
  //     var listaSin = []
  //     snap.forEach((child) => {
  //       listaSin.push({
  //         name: child.val().name,
  //         fecha: child.val().fecha,
  //         importe: child.val().importe,
  //         usoCFDI: child.val().usoCFDI,
  //         estatus: child.val().estatus,
  //         done: child.val().done,
  //         id: child.key
  //       })
  //     })
  //     this.setState({
  //       listaSin: listaSin
  //     })
  //   })
  // }

  listenForItemsAsi = (itemsRefAsi) => {
    itemsRefAsi.on('value', (snap) => {
      var listaAsi = []
      snap.forEach((child) => {
        listaAsi.push({
          folio: child.val().folio,
          fecha: child.val().fecha,
          importe: child.val().importe,
          usoCFDI: child.val().usoCFDI,
          estatus: child.val().estatus,
          done: child.val().done,
          id: child.key
        })
      })
      this.setState({
        listaAsi: listaAsi
      })
    })
  }

  listenForItemsPago = (itemsRefPago) => {
    itemsRefPago.on('value', (snap) => {
      var listaPago = []
      snap.forEach((child) => {
        listaPago.push({
          folio: child.val().folio,
          fecha: child.val().fecha,
          importe: child.val().importe,
          usoCFDI: child.val().usoCFDI,
          estatus: child.val().estatus,
          done: child.val().done,
          id: child.key
        })
      })
      this.setState({
        listaPago: listaPago
      })
    })
  }

  onCollectionUpdate = (querySnapshot) => {
    const comprometidos = []
    querySnapshot.forEach((doc) => {
      const { partida, presupuestal, no_proyecto, importe_comp } = doc.data()
      comprometidos.push({
        key: doc.id,
        doc,
        partida,
        presupuestal,
        no_proyecto,
        importe_comp,
        // isr,
        // total,
        // fecha_comp
      })
    })
    this.setState({
      comprometidos
   })
  }

  componentDidMount() {
    const ref = firebase.firestore().collection('fondos').doc(this.props.match.params.id)
    const updateRef = firebase.firestore().collection('fondos').doc(this.props.match.params.id).collection('comprometidos')
    this.unsubscribe = updateRef.onSnapshot(this.onCollectionUpdate)
    ref.get().then((doc) => {
      if (doc.exists) {
        const fondos = doc.data()
        const idP = doc.id
        this.state.idP = idP
        this.setState({
          key: doc.id,
          fondo: fondos.fondo,
          fecha: fondos.fecha,
          realizo: fondos.realizo,
          tipo_doc: fondos.tipo_doc,
          importe: fondos.importe,
          partida: fondos.partida,
          presupuestal: fondos.presupuestal,
          no_proyecto: fondos.no_proyecto,
          importe_comp: fondos.importe_comp,
          isr: fondos.isr,
          total: fondos.total,
          fecha_comp: fondos.fecha_comp
        })
      } else {
        console.log('No se encuentra documento')
      }
    })
    const itemsRefBanco = firebase.database().ref('presupuesto/')
    this.listenForItemsBanco(itemsRefBanco)
    // const itemsRef = firebase.database().ref('xml/')
    // this.listenForItems(itemsRef)
    const itemsRefAsi = firebase.database().ref('xml2/')
    this.listenForItemsAsi(itemsRefAsi)
    const itemsRefPago = firebase.database().ref('xmlP/')
    this.listenForItemsPago(itemsRefPago)
  }

  // updateSin = (item) => {
  //   let updates = {}
  //   updates['xml2/' + item.id] = {
  //     folio: item.folio,
  //     fecha: item.fecha,
  //     importe: item.importe,
  //     usoCFDI: item.usoCFDI,
  //     estatus: 'Asignado'
  //   }
  //   firebase.database().ref().update(updates)
  // }

  updateAsi = (item) => {
    let updates = {}
    updates['xml/' + item.id] = {
      folio: item.folio,
      fecha: item.fecha,
      importe: item.importe,
      usoCFDI: item.usoCFDI,
      estatus: 'sin asignar'
    }
    firebase.database().ref().update(updates)
    firebase.database().ref('xml2/' + item.id).remove()
  }

  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value
    this.setState({fondos:state})
  }

  partida = ['211001', '211002', '212001', '212002', '214001', '214002', '215001', '216001', '217001', '221001', '221002', '246001', '251001', '253001', '254001', '255001', '261001', '271001', '272001', '291001', '292001', '311001', '313001', '318001', '323002', '334001', '338001', '341001', '351001', '352001', '353001', '355001', '357001', '358001', '361002', '372001', '375001', '381001', '392006', '394001', '218002', '312001', '371001', '247001', '249001', '359001', '336001', '275001', '211003', '541001', '515001', '339001']
  up = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '20', '21', '22', '23', '24']
  no_proyecto = ['U027 425', 'U029 425', 'U027 1208', 'U029 1208', 'U027 1860', 'U029 1860', 'U024 2686','U027 2686','U029 2686','U038 2514',]
  municipio = ['Acatlán', 'Acaxochitlán', 'Actopan', 'Agua Blanca de Iturbide','Ajacuba','Alfajayucan','Almoloya','Apan','El Arenal','Atitalaquia','Atlapexco','Atotonilco el Grande','Atotonilco de Tula','Calnali','Cardonal','Cuautepec de Hinojosa','Chapantongo','Chapulhuacán','Chilcuautla','Eloxochitlán','Emiliano Zapata','Epazoyucan','Franciso I. Madero','Huasca de Ocampo','Huautla','Huazalingo','Huehuetla','Huejutla de Reyes','Huichapan','Ixmiquilpan','Jacala de Ledezma','Jaltocán','Juárez Hidalgo','Lolotla','Metepec','San Agustín Metzquititlán','Metztitlán','Mineral del Chico','Mineral del Monte','La Misión','Mixquiahuala de Juárez','Molango de Escamilla','Nicolás Flores','Nopala de Villagrán','Omitlán de Juárez','San Felipe Orizatlán','Pacula','Pachuca de Soto','Pisaflores','Progreso de Obregón','Mineral de la Reforma','San Agustín Tlaxiaca','San Bartolo Tutotepec','San Salvador','Santiago de Anaya','Santiago Tulantepec de Lugo Guerrero','Singuilucan','Tasquillo','Tecozautla','Tenango de Doria','Tepeapulco','Tepehuacán de Guerrero','Tepeji del Río de Ocampo','Tepetitlán','Tetepango','Villa de Tezontepec','Tezontepec de Aldama','Tianguistengo','Tizayuca','Tlahuelilpan','Tlahuiltepa','Tlanalapa','Tlanchinol','Tlaxcoapan','Tolcayuca','Tula de Allende','Tulancingo de Bravo','Xochiatipan','Xochicoatlán','Yahualica','Zacualtipán de Ángeles','Zapotlán de Juárez','Zempoala','Zimapán']
  area = ['Procuraduría General de Justicia','Subprocuraduría de Procedimientos Penales Región Oriente','Fiscalía Especializada para la atención de Delitos cometidos contra la Libertad de Expresión', 'Periodistas y Personas defensoras de los Derechos Humanos','Dirección General para la Atención de los Asuntos del Sistema Tradicional','Fiscalia de Delitos Electorales','Subprocuraduría de Derechos Humanos y Servicios a la Comunidad','Centro de Justicia Restaurativa Penal Poniente','Fiscalía para la Atención de Delitos de Género','Visitaduría General','Dirección General de Servicios Periciales','Centro de Operación Estratégica','Unidad Especializada en el Combate al Secuestro','Dirección General de Administración y Finanzas','Fiscalía Especializada para la atención de los Delitos de Trata de Personas','Subprocuraduría de Procedimientos Penales Región Poniente','Centro de Atención Temprana Poniente','Dirección General de Investigación y Litigación Poniente','Dirección General de la Policía Investigadora','Centro de Atención Temprana Oriente','Centro de Justicia Restaurativa Penal Oriente','Dirección General de Investigación y Litigación Oriente','Dirección General de Recursos Materiales y Servicios','Fiscalía Especializada en Delitos de Corrupción','Fiscalía Especializada en Materia de Desaparición Forzada de Personas',]

  update = (item) => {
    let updates = {}
    updates['presupuesto/' + item.id] = {
      abr: item.abr,
      ago: item.ago,
      ben: item.ben,
      cpa: item.cpa,
      dic: item.dic,
      dig: item.dig,
      dp: item.dp,
      eg: item.eg,
      eje: item.eje,
      ene: item.ene,
      est: item.est,
      et: item.et,
      f: item.f,
      feb: item.feb,
      ff: item.ff,
      fu: item.fu,
      indi: item.indi,
      jul: item.jul,
      jun: item.jun,
      la: item.la,
      mar: item.mar,
      may: item.may,
      meta: item.meta,
      mi: item.mi,
      nov: item.nov,
      np: item.np,
      obj: item.obj,
      obra: item.obra,
      oct: item.oct,
      ods: item.ods,
      of: item.of,
      ogasto: item.ogasto,
      npar: item.npar,
      os: item.os,
      par: item.par,
      pb: item.pb,
      pr: item.pr,
      prog: item.prog,
      proy: item.proy,
      rm: item.rm,
      rubro: item.rubro,
      s: item.s,
      sep: item.sep,
      sf: item.sf,
      sp: item.sp,
      tg: item.tg,
      total: item.total,
      up: item.up,
      estatus: 'FR'
    }
    firebase.database().ref().update(updates)
    const { no_proyecto, municipio, area } = this.state //  isr, total, fecha_comp
    const updateRef = firebase.firestore().collection('fondos').doc(this.props.match.params.id).collection('comprometidos').doc()
    updateRef.set({
      partida: item.par,
      presupuestal: item.up,
      no_proyecto,
      municipio,
      area,
      importe_comp: this.state.total,
      // isr,
      // total,
      // fecha_comp
      año: '20',
      ramo: item.rm,
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
      ben: item.ben,
      eg: item.eg,
      npar: item.npar
    }).then((docRef) => {
      this.setState({
        partida: '',
        presupuestal: '',
        no_proyecto: '',
        municipio: '',
        area: '',
        importe_comp: ''
        // isr: '',
        // total: '',
        // fecha_comp: ''
      })
    })
    .catch((error) => {
      console.error('Error: ', error)
    })
    alert('Tu solicitud fue enviada.')
  }

  listenForItemsBanco = (itemsRefBanco) => {
    itemsRefBanco.on('value', (snap) => {
      var listaB = []
      snap.forEach((child) => {
        listaB.push({
          abr: child.val().abr,
          ago: child.val().ago,
          ben: child.val().ben,
          cpa: child.val().cpa,
          dic: child.val().dic,
          dig: child.val().dig,
          dp: child.val().dp,
          eg: child.val().eg,
          eje: child.val().eje,
          ene: child.val().ene,
          est: child.val().est,
          et: child.val().et,
          f: child.val().f,
          feb: child.val().feb,
          ff: child.val().ff,
          fu: child.val().fu,
          indi: child.val().indi,
          jul: child.val().jul,
          jun: child.val().jun,
          la: child.val().la,
          mar: child.val().mar,
          may: child.val().may,
          meta: child.val().meta,
          mi: child.val().mi,
          nov: child.val().nov,
          np: child.val().np,
          obj: child.val().obj,
          obra: child.val().obra,
          oct: child.val().oct,
          ods: child.val().ods,
          of: child.val().of,
          ogasto: child.val().ogasto,
          os: child.val().os,
          par: child.val().par,
          pb: child.val().pb,
          pr: child.val().pr,
          prog: child.val().prog,
          proy: child.val().proy,
          rm: child.val().rm,
          rubro: child.val().rubro,
          s: child.val().s,
          sep: child.val().sep,
          sf: child.val().sf,
          sp: child.val().sp,
          tg: child.val().tg,
          total: child.val().total,
          up: child.val().up,
          estatus: child.val().estatus,
          done: child.val().done,
          id: child.key
        })
      })
      this.setState({
        listaB: listaB
      })
    })
  }

  cambio = () => {
    this.props.history.push(`/Oficios/${this.state.idP}`)
  }

  render() {
    // var user = firebase.auth().currentUser
    // var email
    // if (user != null) {
    //   email = user.email
    // }
    // let admin
    // if (email === 'administrador@procu.com') {
    //   admin = 'ADMIN'
    // } else if (email === 'nayra@procu.com') {
    //   admin = 'NAYRA'
    // } else if (email === 'laura@procu.com') {
    //   admin = 'LAURA'
    // } else if (email === 'miguel@procu.com') {
    //   admin = 'MIGUEL'
    // } else if (email === 'teresa@procu.com') {
    //   admin = 'TERESA'
    // } else if (email === 'marcos@procu.com') {
    //   admin = 'MARCOS'
    // } else if (email === 'eloy@procu.com') {
    //   admin = 'ELOY'
    // } else if (email === 'karina@procu.com') {
    //   admin = 'KARINA'
    // } else if (email === 'martha@procu.com') {
    //   admin = 'MARTHA'
    // } else if (email === 'lilia@procu.com') {
    //   admin = 'LILIA'
    // } else if (email === 'cenely@procu.com') {
    //   admin = 'CENELY'
    // } else if (email === 'hector@procu.com') {
    //   admin = 'HECTOR'
    // } else if (email === 'omar@procu.com') {
    //   admin = 'OMAR'
    // } else if (email === 'miau@procu.com') {
    //   admin = 'MAURICIO'
    // }
    const allowCustom = this.state.allowCustom
    const { no_proyecto, municipio, area } = this.state

    const totalImporte = []
    this.state.listaAsi.map(item => (
      totalImporte.push(item.importe)
    ))
    const reducer = (a, b) => a + b
    this.state.total = totalImporte.reduce(reducer)

    // const totalImporteP = []
    // this.state.listaPago.map(item => (
    //   totalImporteP.push(item.importe)
    // ))
    // const reducer = (a, b) => a + b
    // this.state.total = totalImporteP.reduce(reducer)

    return (
      <div className='compro-container'>
        <div className='fcc'>
          <div className='fc-w' style={{ marginTop: '80px' }}>
            <div className='f-c-c'>
              <p className='fc'>No. de Proyecto</p>
              <DropDownList
                suggest
                style={{
                  borderColor: 'rgba(0,0,0,0.42)',
                  background: 'white',
                  height: '28px',
                  width: '100%',
                  color: 'black',
                  position: 'static',
                }}
                data={this.no_proyecto}
                allowCustom={allowCustom}
                name='no_proyecto'
                value={no_proyecto}
                onChange={this.onChange}
                required
                ref='no_proyecto'
              />
            </div>
            <div className='f-c-c'>
              <p className='fc'>Municipio</p>
              <DropDownList
                suggest
                style={{
                  borderColor: 'rgba(0,0,0,0.42)',
                  background: 'white',
                  height: '28px',
                  width: '100%',
                  color: 'black',
                  position: 'static',
                }}
                data={this.municipio}
                allowCustom={allowCustom}
                name='municipio'
                value={municipio}
                onChange={this.onChange}
                required
                ref='municipio'
              />
            </div>
            <div className='f-c-c'>
              <p className='fc'>Area</p>
              <DropDownList
                suggest
                style={{
                  borderColor: 'rgba(0,0,0,0.42)',
                  background: 'white',
                  height: '28px',
                  width: '100%',
                  color: 'black',
                  position: 'static',
                }}
                data={this.area}
                allowCustom={allowCustom}
                name='area'
                value={area}
                onChange={this.onChange}
                required
                ref='area'
              />
            </div>
          </div>

          <div className='axc'>
            <div className='cx'>
              <XmlComp />
              {/* <Dropzone
                style={{
                  width: '100%',
                  height: '100%',
                  borderWidth: '1px',
                  borderColor: 'rgb(102, 102, 102)',
                  borderStyle: 'solid',
                  borderRadius: '1px',
                  maxFiles: 5,
                  background: 'white',
                  position: 'static'
                }}
                accept='.xml' onChange={this.handleOnChange1.bind(this)}
              >
                <div className='filename'>
                  <p className='file-hid'>{this.state.filex}</p>
                </div>
              </Dropzone> */}
            </div>
            <div className='cx'>
              <div className='asi-l'>
                {
                  this.state.listaAsi.map(item =>
                    <div>
                      <div className='xml-inputs-list'>
                        <div className='w-xml'>
                          <p>{item.name}</p>
                        </div>
                        <div className='w-xml'>
                          <p>{item.fecha}</p>
                        </div>
                        <div className='w-xml'>
                          <p>{item.importe}</p>
                        </div>
                        <div className='w-xml'>
                          <p>{item.usoCFDI}</p>
                        </div>
                        <div className='w-xml' style={{ padding: '10px' }}>
                          <button onClick={this.updateAsi}> - </button>
                        </div>
                      </div>
                    </div>
                  )
                }
                {(totalImporte.reduce(reducer))}
              </div>
              {/* <div className='asi-l'>
                {
                  this.state.listaPago.map(item =>
                    <div>
                      <div className='xml-inputs-list'>
                        <div className='w-xml'>
                          <p>{item.name}</p>
                        </div>
                        <div className='w-xml'>
                          <p>{item.fecha}</p>
                        </div>
                        <div className='w-xml'>
                          <p>{item.importe}</p>
                        </div>
                        <div className='w-xml'>
                          <p>{item.usoCFDI}</p>
                        </div>
                        <div className='w-xml' style={{ padding: '10px' }}>
                          <button onClick={this.updateAsi}> - </button>
                        </div>
                      </div>
                    </div>
                  )
                }
                {(totalImporte.reduce(reducer))}
              </div> */}
            </div>
          </div>
        </div>
        <div>
          <ListComponent
            listaB={this.state.listaB}
            update={this.update}
          />
        </div>
        <div>
          {this.state.comprometidos.map(comprometidos =>
            <div>
              <div className='products-al'>
                <div className='tabla-edit-c'>{comprometidos.partida}</div>
                <div className='tabla-edit-c'>{comprometidos.presupuestal}</div>
                <div className='tabla-edit-c'>{comprometidos.no_proyecto}</div>
                <div className='tabla-edit-c'>{' $ ' + comprometidos.importe_comp}</div>
                <div className='tabla-edit-c'>{' $ ' + comprometidos.isr}</div>
                <div className='tabla-edit-c'>{' $ ' + comprometidos.total}</div>
                <div className='tabla-edit-c'>{comprometidos.importe_comp}</div>
              </div>
            </div>
          )}
        </div>
        <div className='left-b-f'>
          <button className='bt-s-f' onClick={this.cambio}>
            Comprometido Finalizado
          </button>
        </div>
      </div>
    )
  }
}
