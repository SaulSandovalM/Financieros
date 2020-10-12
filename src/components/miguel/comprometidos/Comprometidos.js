import React, { Component } from 'react'
import './Comprometidos.css'
import firebase from '../../../Firebase'
import ListComponent from './ListComponent'
import { DropDownList } from '@progress/kendo-react-dropdowns'
import '@progress/kendo-theme-default/dist/all.css'

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
      importe_comp: 0,
      partida: '',
      no_oficio: '',
      no_proyecto: '',
      municipio: '',
      area: '',
      importe_total: '',
      isr: 0,
      iva: 0,
      fecha_comp: '',
      num_factura: '',
      fecha_compro :'',
      proveedor: '',
      comprometidos: [
        {
          id: 1,
          name: 'Cargando Datos ... ',
          done: false
        }
      ],
      total: '',
      idP: '',
      listaB: [
        {
          id: 1,
          name: 'Cargando Datos ... ',
          done: false
        }
      ]
    }
  }

  onCollectionUpdate = (querySnapshot) => {
    const comprometidos = []
    querySnapshot.forEach((doc) => {
      const { partida, presupuestal, no_proyecto, importe_comp, isr, iva, importe_total,
              num_factura, fecha_compro, proveedor } = doc.data()
      comprometidos.push({
        key: doc.id,
        doc,
        partida,
        presupuestal,
        no_proyecto,
        importe_comp,
        isr,
        iva,
        importe_total,
        num_factura,
        fecha_compro,
        proveedor
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
          key: doc.id
        })
      } else {
        console.log('No se encuentra documento')
      }
    })
    const itemsRefBanco = firebase.database().ref('presupuesto/')
    this.listenForItemsBanco(itemsRefBanco)
  }

  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value
    this.setState({ fondos: state })
  }

  partida = ['211001', '211002', '212001', '212002', '214001', '214002', '215001', '216001', '217001', '221001', '221002', '246001', '251001', '253001', '254001', '255001', '261001', '271001', '272001', '291001', '292001', '311001', '313001', '318001', '323002', '334001', '338001', '341001', '351001', '352001', '353001', '355001', '357001', '358001', '361002', '372001', '375001', '381001', '392006', '394001', '218002', '312001', '371001', '247001', '249001', '359001', '336001', '275001', '211003', '541001', '515001', '339001']
  up = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '20', '21', '22', '23', '24']
  no_proyecto = ['U027 425', 'U029 425', 'U027 1208', 'U029 1208', 'U027 1860', 'U029 1860', 'U024 2686','U027 2686','U029 2686','U038 2514',]
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
      oct: item.oct - parseInt(this.state.importe_total),
      gasoct: item.gasoct + parseInt(this.state.importe_total),
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
    const { no_proyecto, municipio, area, importe_comp, isr, iva, num_factura, fecha_compro, proveedor } = this.state
    const updateRef = firebase.firestore().collection('fondos').doc(this.props.match.params.id).collection('comprometidos').doc()
    updateRef.set({
      presupuestal: item.up,
      partida: item.ogasto,
      no_proyecto,
      municipio,
      area,
      importe_comp,
      isr,
      iva,
      num_factura,
      fecha_compro,
      proveedor,
      importe_total: this.state.importe_total,
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
      eg: item.eg
    }).then((docRef) => {
      this.setState({
        partida: '',
        presupuestal: '',
        no_proyecto: '',
        municipio: '',
        area: '',
        importe_comp: 0,
        isr: 0,
        iva: 0
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
    const { no_proyecto, municipio, area, importe_comp, isr, iva, num_factura, fecha_compro, proveedor } = this.state
    const importe_total = parseInt(this.state.importe_comp) + parseInt(this.state.isr) + parseInt(this.state.iva)
    this.state.importe_total = importe_total

    return (
      <div className='compro-container'>
        <div className='fcc'>
          <div className='fc-w'>
            <div className='f-c-c'>
              <p className='fc'>Importe</p>
              <input
                style={{height: '22px', width: '50%'}}
                name='importe_comp'
                value={importe_comp}
                onChange={this.onChange}
                required
                ref='importe_comp'
              />
            </div>
            <div className='f-c-c'>
              <p className='fc'>Iva</p>
              <input
                style={{ height: '22px', width: '50%' }}
                name='iva'
                value={iva}
                onChange={this.onChange}
                required
                ref='iva'
              />
            </div>
            <div className='f-c-c'>
              <p className='fc'>Isr</p>
              <input
                style={{ height: '22px', width: '50%' }}
                name='isr'
                value={isr}
                onChange={this.onChange}
                required
                ref='isr'
              />
            </div>
            <div className='f-c-c'>
              <p className='fc'>Total</p>
              <input
                style={{ height: '22px', width: '50%' }}
                name='importe_total'
                value={importe_total}
                required
                onChange={this.onChange}
                ref='importe_total'
              />
            </div>
            <div className='f-c-c'>
              <p className='fc'>Num de factura</p>
              <input
                style={{height: '22px', width: '50%'}}
                name='num_factura'
                value={num_factura}
                onChange={this.onChange}
                required
                ref='num_factura'
              />
            </div>
            <div className='f-c-c'>
              <p className='fc'>Fecha</p>
              <input
                style={{ height: '22px', width: '50%'}}
                name='fecha_compro'
                value={fecha_compro}
                onChange={this.onChange}
                required
                ref='fecha_compro'
              />
            </div>
            <div className='f-c-c'>
              <p className='fc'>Nom. Proveedor</p>
              <input
                style={{height: '22px', width: '50%'}}
                name='proveedor'
                value={proveedor}
                onChange={this.onChange}
                required
                ref='proveedor'
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
                <div className='tabla-edit-f'>{comprometidos.partida}</div>
                <div className='tabla-edit-f'>{comprometidos.presupuestal}</div>
                <div className='tabla-edit-f'>{comprometidos.no_proyecto}</div>
                <div className='tabla-edit-f'>{comprometidos.num_factura}</div>
                <div className='tabla-edit-f'>{comprometidos.fecha_compro}</div>
                <div className='tabla-edit-f'>{comprometidos.proveedor}</div>
                <div className='tabla-edit-f'>{' $ ' + comprometidos.importe_comp}</div>
                <div className='tabla-edit-f'>{' $ ' + comprometidos.isr}</div>
                <div className='tabla-edit-f'>{' $ ' + comprometidos.iva}</div>
                <div className='tabla-edit-f'>{' $ ' + comprometidos.importe_total}</div>
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
