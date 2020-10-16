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
      iva: '',
      realizo: '',
      tipo_doc: '',
      importe: '',
      partida: '',
      no_oficio: '',
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
          name: 'Cargando Datos ... ',
          done: false
        }
      ],
      listaAsi: [
        {
          id: 1,
          name: 'Cargando Datos ... ',
          done: false
        }
      ],
      listaPago: [
        {
          id: 1,
          name: 'Cargando Datos ... ',
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
          var data = [xml.attributes['Fecha'], xml.attributes['Total']]
          fetch(xml).then(res => res.text()).then(xml => {
            fetch('https://financieros-78cb0.firebaseio.com/xmlP.json', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(data)
                })
            })
        }
        reader.readAsText(xml)
      }
    }
  }

  listenForItems = (itemsRef) => {
    itemsRef.on('value', (snap) => {
      var listaSin = []
      snap.forEach((child) => {
        listaSin.push({
          name: child.val().name,
          fecha: child.val().fecha,
          importe: child.val().importe,
          usoCFDI: child.val().usoCFDI,
          estatus: child.val().estatus,
          done: child.val().done,
          id: child.key
        })
      })
      this.setState({
        listaSin: listaSin
      })
    })
  }

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
      const { partida, presupuestal, importe_comp } = doc.data()
      comprometidos.push({
        key: doc.id,
        doc,
        partida,
        presupuestal,
        importe_comp,
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
    const itemsRef = firebase.database().ref('xml/')
    this.listenForItems(itemsRef)
    const itemsRefAsi = firebase.database().ref('xml2/')
    this.listenForItemsAsi(itemsRefAsi)
    const itemsRefPago = firebase.database().ref('xmlP/')
    this.listenForItemsPago(itemsRefPago)
  }

  updateAsi = (item) => {
    let updates = {}
    updates['xml/' + item.id] = {
      folio: item.folio,
      fecha: item.fecha,
      importe: item.importe,
      usoCFDI: item.usoCFDI,
      estatus: 'Asignado'
    }
    firebase.database().ref().update(updates)
    firebase.database().ref('xml2/' + item.id).remove()
  }

  updatePago = (item) => {
    let updates = {}
    updates['xmlP/' + item.id] = {
      Fecha: item.Fecha,
      importe: item.importe,
      estatus: 'Asignado'
    }
    firebase.database().ref().update(updates)
    firebase.database().ref('xmlP/' + item.id).remove()
  }

  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value
    this.setState({ fondos: state })
  }

  partida = ['211001', '211002', '212001', '212002', '214001', '214002', '215001', '216001', '217001', '221001', '221002', '246001', '251001', '253001', '254001', '255001', '261001', '271001', '272001', '291001', '292001', '311001', '313001', '318001', '323002', '334001', '338001', '341001', '351001', '352001', '353001', '355001', '357001', '358001', '361002', '372001', '375001', '381001', '392006', '394001', '218002', '312001', '371001', '247001', '249001', '359001', '336001', '275001', '211003', '541001', '515001', '339001']
  up = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '20', '21', '22', '23', '24']
  municipio = ['Acatlán', 'Acaxochitlán', 'Actopan', 'Agua Blanca de Iturbide','Ajacuba','Alfajayucan','Almoloya','Apan','El Arenal','Atitalaquia','Atlapexco','Atotonilco el Grande','Atotonilco de Tula','Calnali','Cardonal','Cuautepec de Hinojosa','Chapantongo','Chapulhuacán','Chilcuautla','Eloxochitlán','Emiliano Zapata','Epazoyucan','Franciso I. Madero','Huasca de Ocampo','Huautla','Huazalingo','Huehuetla','Huejutla de Reyes','Huichapan','Ixmiquilpan','Jacala de Ledezma','Jaltocán','Juárez Hidalgo','Lolotla','Metepec','San Agustín Metzquititlán','Metztitlán','Mineral del Chico','Mineral del Monte','La Misión','Mixquiahuala de Juárez','Molango de Escamilla','Nicolás Flores','Nopala de Villagrán','Omitlán de Juárez','San Felipe Orizatlán','Pacula','Pachuca de Soto','Pisaflores','Progreso de Obregón','Mineral de la Reforma','San Agustín Tlaxiaca','San Bartolo Tutotepec','San Salvador','Santiago de Anaya','Santiago Tulantepec de Lugo Guerrero','Singuilucan','Tasquillo','Tecozautla','Tenango de Doria','Tepeapulco','Tepehuacán de Guerrero','Tepeji del Río de Ocampo','Tepetitlán','Tetepango','Villa de Tezontepec','Tezontepec de Aldama','Tianguistengo','Tizayuca','Tlahuelilpan','Tlahuiltepa','Tlanalapa','Tlanchinol','Tlaxcoapan','Tolcayuca','Tula de Allende','Tulancingo de Bravo','Xochiatipan','Xochicoatlán','Yahualica','Zacualtipán de Ángeles','Zapotlán de Juárez','Zempoala','Zimapán']
  area = ['Procuraduría General de Justicia','Subprocuraduría de Procedimientos Penales Región Oriente','Fiscalía Especializada para la atención de Delitos cometidos contra la Libertad de Expresión', 'Periodistas y Personas defensoras de los Derechos Humanos','Dirección General para la Atención de los Asuntos del Sistema Tradicional','Fiscalia de Delitos Electorales','Subprocuraduría de Derechos Humanos y Servicios a la Comunidad','Centro de Justicia Restaurativa Penal Poniente','Fiscalía para la Atención de Delitos de Género','Visitaduría General','Dirección General de Servicios Periciales','Centro de Operación Estratégica','Unidad Especializada en el Combate al Secuestro','Dirección General de Administración y Finanzas','Fiscalía Especializada para la atención de los Delitos de Trata de Personas','Subprocuraduría de Procedimientos Penales Región Poniente','Centro de Atención Temprana Poniente','Dirección General de Investigación y Litigación Poniente','Dirección General de la Policía Investigadora','Centro de Atención Temprana Oriente','Centro de Justicia Restaurativa Penal Oriente','Dirección General de Investigación y Litigación Oriente','Dirección General de Recursos Materiales y Servicios','Fiscalía Especializada en Delitos de Corrupción','Fiscalía Especializada en Materia de Desaparición Forzada de Personas',]

  listenForItemsBanco = (itemsRefBanco) => {
    itemsRefBanco.on('value', (snap) => {
      var listaB = []
      snap.forEach((child) => {
        listaB.push({
          año: child.val().año,
          rm: child.val().rm,
          ur: child.val().ur,
          up: child.val().up,
          rubro: child.val().rubro,
          tg: child.val().tg,
          ogasto: child.val().ogasto,
          npro: child.val().npro,
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
          ped: child.val().ped,
          itrans: child.val().itrans,
          igest: child.val().igest,
          la: child.val().la,
          ods: child.val().ods,
          et: child.val().et,
          ff: child.val().ff,
          of: child.val().of,
          np: child.val().np,
          cpa: child.val().cpa,
          ene: child.val().ene,
          gasene: child.val().gasene,
          feb: child.val().feb,
          gasfeb: child.val().gasfeb,
          mar: child.val().mar,
          gasmar: child.val().gasmar,
          abr: child.val().abr,
          gasabr: child.val().gasabr,
          may: child.val().may,
          gasmay: child.val().gasmay,
          jun: child.val().jun,
          gasjun: child.val().gasjun,
          jul: child.val().jul,
          gasjul: child.val().gasjul,
          ago: child.val().ago,
          gasago: child.val().gasago,
          sep: child.val().sep,
          gassep: child.val().gassep,
          oct: child.val().oct,
          gasoct: child.val().gasoct,
          nov: child.val().nov,
          gasnov: child.val().gasnov,
          dic: child.val().dic,
          gasdic: child.val().gasdic,
          total: child.val().total,
          ampliacion: child.val().ampliacion,
          reduccion: child.val().reduccion,
          trasferencia: child.val().trasferencia,
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

  update = (item) => {
    let updates = {}
    updates['presupuesto/' + item.id] = {
      año: item.año,
      rm: item.rm,
      ur: item.ur,
      up: item.up,
      rubro: item.rubro,
      tg: item.tg,
      ogasto: item.ogasto,
      npro: item.npro,
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
      ped: item.ped,
      itrans: item.itrans,
      igest: item.igest,
      la: item.la,
      ods: item.ods,
      et: item.et,
      ff: item.ff,
      of: item.of,
      np: item.np,
      cpa: item.cpa,
      ene: item.ene,
      gasene: item.gasene,
      feb: item.feb,
      gasfeb: item.gasfeb,
      mar: item.mar,
      gasmar: item.gasmar,
      abr: item.abr,
      gasabr: item.gasabr,
      may: item.may,
      gasmay: item.gasmay,
      jun: item.jun,
      gasjun: item.gasjun,
      jul: item.jul,
      gasjul: item.gasjul,
      ago: item.ago,
      gasago: item.gasago,
      sep: item.sep,
      gassep: item.gassep,
      oct: item.oct - parseInt(this.state.total),
      gasoct: item.gasoct + parseInt(this.state.total),
      nov: item.nov,
      gasnov: item.gasnov,
      dic: item.dic,
      gasdic: item.gasdic,
      total: item.total,
      ampliacion: item.ampliacion,
      reduccion: item.reduccion,
      trasferencia: item.trasferencia
    }
    firebase.database().ref().update(updates)
    const { municipio, area, totalr, fechar } = this.state
    const updateRef = firebase.firestore().collection('fondos').doc(this.props.match.params.id).collection('comprometidos').doc()
    updateRef.set({
      partida: item.ogasto,
      presupuestal: item.up,
      municipio,
      area,
      fecha: fechar,
      importe_comp: totalr,
      año: item.año,
      ramo: item.rm,
      ur: item.ur,
      up: item.up,
      rubro: item.rubro,
      tg: item.tg,
      npro: item.npro,
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
    }).then((docRef) => {
      this.setState({
        partida: '',
        presupuestal: '',
        municipio: '',
        area: '',
        importe_comp: ''
      })
    })
    .catch((error) => {
      console.error('Error: ', error)
    })
    alert('Tu solicitud fue enviada.')
  }

  cambio = () => {
    this.props.history.push(`/Oficios/${this.state.idP}`)
  }

  cambioxml() {
    this.setState({
      viewxml: 1
    })
  }

  cambiorecibo() {
    this.setState({
      viewxml: 0
    })
  }

  render() {
    var user = firebase.auth().currentUser
    var email
    if (user != null) {
      email = user.email
    }
    let admin
    if (email === 'administrador@procu.com') {
      admin = 'ADMIN'
    } else if (email === 'nayra@procu.com') {
      admin = 'NAYRA'
    } else if (email === 'laura@procu.com') {
      admin = 'LAURA'
    } else if (email === 'miguel@procu.com') {
      admin = 'MIGUEL'
    } else if (email === 'teresa@procu.com') {
      admin = 'TERESA'
    } else if (email === 'marcos@procu.com') {
      admin = 'MARCOS'
    } else if (email === 'eloy@procu.com') {
      admin = 'ELOY'
    } else if (email === 'karina@procu.com') {
      admin = 'KARINA'
    } else if (email === 'martha@procu.com') {
      admin = 'MARTHA'
    } else if (email === 'lilia@procu.com') {
      admin = 'LILIA'
    } else if (email === 'cenely@procu.com') {
      admin = 'CENELY'
    } else if (email === 'hector@procu.com') {
      admin = 'HECTOR'
    } else if (email === 'omar@procu.com') {
      admin = 'OMAR'
    } else if (email === 'miau@procu.com') {
      admin = 'MAURICIO'
    }
    const allowCustom = this.state.allowCustom
    const { municipio, area, importer, iva, isr, totalr, fechar } = this.state

    const totalImporte = []
    this.state.listaAsi.map(item => (
      totalImporte.push(item.importe)
    ))
    const reducer = (a, b) => a + b
    this.state.total = totalImporte.reduce(reducer)

    return (
      <div className='compro-container' style={{marginTop: '80px'}}>
        <button onClick={this.cambioxml.bind(this)} style={{width: '100px'}}>Ocultar Recibo</button>
        <button onClick={this.cambiorecibo.bind(this)} style={{width: '100px'}}>Agregar Recibo</button>

        {this.state.viewxml === 0 &&
          <div style={{ marginLeft: '500px', position: 'absolute', marginTop: '-45px'}}>
            <p style={{ fontWeight: 'bold', fontSize: '16px'}}>Recibo</p>
            <div style={{display: 'flex', margin: '10px', height: '25px'}}>
              <p style={{width: '100px', margin: '0'}}>importe</p>
              <input
                name='importe'
                onChange={this.onChange}
                required
                value={importer}
                ref='importe'
              />
            </div>
            <div style={{display: 'flex', margin: '10px', height: '25px'}}>
              <p style={{width: '100px', margin: '0'}}>iva</p>
              <input
                name='iva'
                onChange={this.onChange}
                required
                value={iva}
                ref='iva'
              />
            </div>
            <div style={{display: 'flex', margin: '10px', height: '25px'}}>
              <p style={{width: '100px', margin: '0'}}>isr</p>
              <input
                name='isr'
                onChange={this.onChange}
                required
                value={isr}
                ref='isr'
              />
            </div>
            <div style={{display: 'flex', margin: '10px', height: '25px'}}>
              <p style={{width: '100px', margin: '0'}}>Total</p>
              <input
                name='total'
                onChange={this.onChange}
                required
                value={totalr}
                ref='total'
              />
            </div>
            <div style={{display: 'flex', margin: '10px', height: '25px'}}>
              <p style={{width: '100px', margin: '0'}}>fecha</p>
              <input
                name='total'
                onChange={this.onChange}
                required
                value={fechar}
                ref='total'
              />
            </div>
          </div>
        }

        <div className='fcc2'>
          <div className='fc-w'>
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
          <div style={{display: 'flex', width: '100%'}}>
            <div className='axc' style={{ marginTop: '105px', display: 'flex' }}>
              <div className='cx2'>
              {admin === 'ADMIN' ?
                <Dropzone
                  style={{
                    width: '100%',
                    height: '100%',
                    borderWidth: '1px',
                    borderColor: 'rgb(102, 102, 102)',
                    borderStyle: 'solid',
                    borderRadius: '1px',
                    maxFiles: 5,
                    background: 'white',
                    position: 'static',
                    placeholder: 'Agregar'
                  }}
                  accept='.xml' onChange={this.handleOnChange1.bind(this)}
                >
                  <div className='filename'>
                    <p className='file-hid'>{this.state.filex}</p>
                  </div>
                </Dropzone>
                :
                <XmlComp />
              }
              </div>
              <div className='cx2'>
                {admin === 'ADMIN' ?
                  <div className='asi-l'>
                    <Listp
                      listaPago={this.state.listaPago}
                      updatePago={this.updatePago}
                    />
                  </div>
                  :
                  <div className='asi-l'>
                    <List
                      listaAsi={this.state.listaAsi}
                      updateAsi={this.updateAsi}
                    />
                  </div>
                }
              </div>
            </div>
          </div>
        </div>

        <div style={{marginTop: '-408px'}}>
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
                <div className='tabla-edit-c'>{' $ ' + comprometidos.iva}</div>
                <div className='tabla-edit-c'>{' $ ' + comprometidos.importe_comp}</div>
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

class List extends Component {
  constructor (props) {
    super(props)
    this.state = {
      xml: []
    }
  }

  componentWillMount () {
    firebase.database().ref('xml2/').on('child_added', snapshot => {
      this.setState({
        xml: this.state.xml.concat(snapshot.val())
      })
    })
  }

  render () {
    return (
      <div>
        {
          this.props.listaAsi.map(item =>
            <Row
              key={item.id}
              item={item}
              updateAsi={this.props.updateAsi}
            />
          )
        }
      </div>
    )
  }
}

class Row extends Component {
  constructor (props) {
    super(props)
    this.state = {
      done: false,
      item: 'Atendido'
    }
  }

  updateAsi = () => {
    this.props.updateAsi(this.props.item)
  }

  render () {
    return (
      <div>
        <div className='xml-inputs-list'>
          <div className='w-xml'>
            <p>{this.props.item.folio}</p>
          </div>
          <div className='w-xml'>
            <p>{this.props.item.fecha}</p>
          </div>
          <div className='w-xml'>
            <p>{this.props.item.importe}</p>
          </div>
          <div className='w-xml'>
            <p>{this.props.item.usoCFD}</p>
          </div>
          <div className='w-xml' style={{ padding: '10px' }}>
            <button onClick={this.updateAsi}> - </button>
          </div>
        </div>
      </div>
    )
  }
}

class Listp extends Component {
  constructor (props) {
    super(props)
    this.state = {
      xml: []
    }
  }

  componentWillMount () {
    firebase.database().ref('xmlP/').on('child_added', snapshot => {
      this.setState({
        xml: this.state.xml.concat(snapshot.val())
      })
    })
  }

  render () {
    return (
      <div>
        {
          this.props.listaPago.map(item =>
            <Rowp
              key={item.id}
              item={item}
              updatePago={this.props.updatePago}
            />
          )
        }
      </div>
    )
  }
}

class Rowp extends Component {
  constructor (props) {
    super(props)
    this.state = {
      done: false,
      item: 'Atendido'
    }
  }

  updatePago = () => {
    this.props.updatePago(this.props.item)
  }

  render () {
    return (
      <div>
        <div className='xml-inputs-list'>
          <div className='w-xml'>
            <p>{this.props.item.folio}</p>
          </div>
          <div className='w-xml'>
            <p>{this.props.item.fecha}</p>
          </div>
          <div className='w-xml'>
            <p>{this.props.item.importe}</p>
          </div>
          <div className='w-xml'>
            <p>{this.props.item.usoCFD}</p>
          </div>
          <div className='w-xml' style={{ padding: '10px' }}>
            <button onClick={this.updatePago}> - </button>
          </div>
        </div>
      </div>
    )
  }
}
