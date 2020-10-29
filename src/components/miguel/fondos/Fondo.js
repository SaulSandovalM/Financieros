import React, { Component } from 'react'
import firebase from '../../../Firebase'
import { NumberAsString } from './NumerosLetras'
import Fab from '@material-ui/core/Fab'
import CheckIcon from '@material-ui/icons/Check'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import './Fondos.css'

export default class Fondos extends Component {
  constructor (props) {
    super(props)
    this.ref = firebase.firestore().collection('fondos')
    this.unsubscribe = null
    this.state = {
      fondo: '',
      fecha: '',
      tipo_doc: '',
      oficio_aut: '',
      no_oficio: '',
      no_lici: '',
      importe: '',
      desc: '',
      beneficiario: '',
      realizo: '',
      requisicion: '',
      pedido: '',
      ncomprobantes: '',
      poliza: '',
      cfe: '',
      nscfe: '',
      observaciones: '',
      numProy: '',
      fondos: [],
      allowCustom: true,
      value: '',
      suggest: '',
      key: '',
      contador: {},
      f: '',
      searchF: ''
    }
  }

  onCollectionUpdate = (querySnapshot) => {
    const fondos = []
    querySnapshot.forEach((doc) => {
      const { fondo, tipo_doc, importe, fecha, contrarecibo } = doc.data()
      fondos.push({
        key: doc.id,
        doc,
        fondo,
        tipo_doc,
        importe,
        fecha,
        contrarecibo
      })
    })
    this.setState({
      fondos
   })
  }

  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value
    this.setState(state)
  }

  onSubmit = (e) => {
    e.preventDefault()
    const { fondo, fecha, tipo_doc, oficio_aut, no_oficio, no_lici, importe, desc,
            beneficiario, realizo, requisicion, pedido, ncomprobantes, poliza,
            cfe, nscfe, observaciones, numProy } = this.state
    this.ref.add({
      fondo,
      fecha,
      tipo_doc,
      oficio_aut,
      no_oficio,
      no_lici,
      importe,
      desc,
      beneficiario,
      realizo,
      requisicion,
      pedido,
      ncomprobantes,
      poliza,
      cfe,
      nscfe,
      observaciones,
      numProy
    }).then((docRef) => {
      this.setState({
        fondo: '',
        fecha: '',
        tipo_doc: '',
        oficio_aut: '',
        no_oficio: '',
        no_lici: '',
        importe: '',
        desc: '',
        beneficiario: '',
        realizo: '',
        requisicion: '',
        pedido: '',
        ncomprobantes: '',
        poliza: '',
        cfe: '',
        nscfe: '',
        observaciones: '',
        numProy: ''
      })
      const statsRef = firebase.firestore().collection('fondos').doc('--stats--')
      const increment = firebase.firestore.FieldValue.increment(1)
      const batch = firebase.firestore().batch()
      batch.set(statsRef, { nFondo: increment }, { merge: true })
      batch.commit()
      this.order()
      this.props.history.push(`/Comprometidos/${this.state.f}`)
    })
    .catch((error) => {
      console.error('Error al guardar: ', error)
    })
  }

  componentDidMount() {
    this.consumo()
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate)
  }

  consumo = () => {
    const ref = firebase.firestore().collection('fondos').doc('--stats--')
    ref.get().then((doc) => {
      if (doc.exists) {
        this.setState({
          contador: doc.data(),
          key: doc.id,
          isLoading: false
        })
        console.log(doc.data())
      } else {
        console.log('No hay nada!')
      }
    })
  }

  order = () => {
    firebase.firestore().collection('fondos').orderBy('fondo', 'desc').limit(1).get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        this.setState({
          f: doc.id
        })
        console.log(this.state.f)
      })
    })
    .catch(err => {
      console.log('Error getting documents', err)
    })
  }

  handleChange (event) {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleState(e) {
    this.setState({ fondo: e.target.value });
  }

  no_proyecto = ['AU001', 'AU002', 'AU003', 'AU004', 'AU005', 'AU007', 'AU009','AU010','AU011','AU012','AU014','AU015','AU016','AU017','AU018','AU019','AU020','AU021','AU023','AU024','AU025','AU026','AU027','A1D11']

  render () {
    var user = firebase.auth().currentUser
    var email
    if (user != null) {
      email = user.email
    }
    let admin
    if (email === 'administrador@procu.com') {
      admin = 'ADMIN'
    } else if (email === 'nayra@procuraduria.com') {
      admin = 'NAYRA'
    } else if (email === 'laura@procuraduria.com') {
      admin = 'LAURA'
    } else if (email === 'miguel@procuraduria.com') {
      admin = 'MIGUEL'
    } else if (email === 'teresa@procuraduria.com') {
      admin = 'TERESA'
    } else if (email === 'marcos@procuraduria.com') {
      admin = 'MARCOS'
    } else if (email === 'eloy@procuraduria.com') {
      admin = 'ELOY'
    } else if (email === 'karina@procuraduria.com') {
      admin = 'KARINA'
    } else if (email === 'martha@procuraduria.com') {
      admin = 'MARTHA'
    } else if (email === 'lilia@procuraduria.com') {
      admin = 'LILIA'
    } else if (email === 'cenely@procuraduria.com') {
      admin = 'CENELY'
    } else if (email === 'hector@procuraduria.com') {
      admin = 'HECTOR'
    } else if (email === 'omar@procuraduria.com') {
      admin = 'OMAR'
    }
    var today = new Date()
    var dd = today.getDate()
    var mm = today.getMonth() + 1
    var yyyy = today.getFullYear()
    if (dd < 10) {
      dd = '0' + dd
    }
    if (mm < 10) {
      mm = '0' + mm
    }
    today = dd + '/' + mm + '/' + yyyy
    const allowCustom = this.state.allowCustom
    const { tipo_doc, oficio_aut, importe, beneficiario, numProy } = this.state
    this.state.fecha = today
    this.state.realizo = admin

    return (
      <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
        <Grid  style={{ width: '70%' }}>
          <Grid style={{ width: '100%' }}>
            <Paper style={{padding: '20px'}}>
              <div style={{ marginBottom: '30px' }}>Fondos</div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <input
                  className='field'
                  style={{ marginBottom: '30px' }}
                  value={this.state.contador.nFondo}
                  required
                  name='fondo'
                  onChange={this.onChange}
                />
                <input
                  className='field'
                  style={{ marginBottom: '30px' }}
                  required
                  value={today}
                />
              </div>
              <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', marginBottom: '30px' }}>
                <div style={{ width: '46.2%' }}>
                  {admin === 'ADMIN' &&
                    <select style={{ background: 'white', fontSize: '1rem', textAlignLast: 'left', borderBottom: '1px solid grey', padding: '6px' }}>
                      <option></option>
                      <option value='Pago Directo'>Pago Directo</option>
                      <option value='Fondo Revolvente'>Fondo Revolvente</option>
                      <option value='Gasto a Comprobar'>Gasto a Comprobar</option>
                      <option value='Cancelado'>Cancelado</option>
                      <option value='Licitación'>Licitación</option>
                    </select>
                  }
                  {admin === 'LAURA' &&
                    <select style={{ background: 'white', fontSize: '1rem', textAlignLast: 'left', borderBottom: '1px solid grey', padding: '6px' }}>
                      <option></option>
                      <option value='Pago Directo'>Pago Directo</option>
                      <option value='Fondo Revolvente'>Fondo Revolvente</option>
                      <option value='Gasto a Comprobar'>Gasto a Comprobar</option>
                      <option value='Cancelado'>Cancelado</option>
                      <option value='Licitación'>Licitación</option>
                    </select>
                  }
                  {admin === 'MIGUEL' &&
                    <select style={{ background: 'white', fontSize: '1rem', textAlignLast: 'left', borderBottom: '1px solid grey', padding: '6px' }}>
                      <option></option>
                      <option value='Pago Directo'>Pago Directo</option>
                      <option value='Fondo Revolvente'>Fondo Revolvente</option>
                      <option value='Gasto a Comprobar'>Gasto a Comprobar</option>
                      <option value='Cancelado'>Cancelado</option>
                      <option value='Licitación'>Licitación</option>
                    </select>
                  }
                  {admin === 'TERESA' &&
                    <select style={{ background: 'white', fontSize: '1rem', textAlignLast: 'left', borderBottom: '1px solid grey', padding: '6px' }}>
                      <option></option>
                      <option value='Fondo Revolvente'>Fondo Revolvente</option>
                    </select>
                  }
                  {admin === 'MARCOS' &&
                    <select style={{ background: 'white', fontSize: '1rem', textAlignLast: 'left', borderBottom: '1px solid grey', padding: '6px' }}>
                      <option></option>
                      <option value='Fondo Revolvente'>Fondo Revolvente</option>
                    </select>
                  }
                  {admin === 'ELOY' &&
                    <select style={{ background: 'white', fontSize: '1rem', textAlignLast: 'left', borderBottom: '1px solid grey', padding: '6px' }}>
                      <option></option>
                      <option value='Pago Directo'>Pago Directo</option>
                      <option value='Fondo Revolvente'>Fondo Revolvente</option>
                    </select>
                  }
                  {admin === 'KARINA' &&
                    <select style={{ background: 'white', fontSize: '1rem', textAlignLast: 'left', borderBottom: '1px solid grey', padding: '6px' }}>
                      <option></option>
                      <option value='Pago Directo'>Pago Directo</option>
                    </select>
                  }
                  {admin === 'MARTHA' &&
                    <select style={{ background: 'white', fontSize: '1rem', textAlignLast: 'left', borderBottom: '1px solid grey', padding: '6px' }}>
                      <option></option>
                      <option value='Fondo Revolvente'>Fondo Revolvente</option>
                    </select>
                  }
                  {admin === 'LILIA' &&
                    <select style={{ background: 'white', fontSize: '1rem', textAlignLast: 'left', borderBottom: '1px solid grey', padding: '6px' }}>
                      <option></option>
                      <option value='Pago Directo'>Pago Directo</option>
                    </select>
                  }
                  {admin === 'CENELY' &&
                    <select style={{ background: 'white', fontSize: '1rem', textAlignLast: 'left', borderBottom: '1px solid grey', padding: '6px' }}>
                      <option></option>
                      <option value='Pago Directo'>Pago Directo</option>
                    </select>
                  }
                  {admin === 'HECTOR' &&
                    <select style={{ background: 'white', fontSize: '1rem', textAlignLast: 'left', borderBottom: '1px solid grey', padding: '6px' }}>
                      <option></option>
                      <option value='Pago Directo'>Pago Directo</option>
                    </select>
                  }
                  {admin === 'OMAR' &&
                    <select style={{ background: 'white', fontSize: '1rem', textAlignLast: 'left', borderBottom: '1px solid grey', padding: '6px' }}>
                      <option></option>
                      <option value='Pago Directo'>Pago Directo</option>
                    </select>
                  }
                </div>
                <div style={{ width: '46.2%' }}>
                  <select style={{ background: 'white', fontSize: '1rem', textAlignLast: 'left', borderBottom: '1px solid grey', padding: '6px' }}>
                    <option></option>
                    <option value='SFP-CPF-01-0020/2020'>SFP-CPF-01-0020/2020</option>
                    <option value='SFP-CPF-01-0010/2020'>SFP-CPF-01-0010/2020</option>
                    <option value='SFP-CPF-01-0724/2020'>SFP-CPF-01-0724/2020</option>
                    <option value='SFP-CPF-01-0681/2020'>SFP-CPF-01-0681/2020</option>
                    <option value='SFP-CPF-01-DFDP-0949/2020'>SFP-CPF-01-DFDP-0949/2020</option>
                  </select>
                </div>
              </div>
              <div style={{ marginBottom: '30px', display: 'flex', justifyContent: 'space-between' }}>
                <input
                  className='field'
                  name='no_oficio'
                  onChange={this.onChange}
                  required
                  ref='no_oficio'
                  placeholder='No oficio'
                />
                <input
                  className='field'
                  name='importe'
                  value={importe}
                  onChange={this.onChange}
                  required
                  ref='importe'
                  placeholder='Importe'
                />
              </div>
              <div style={{ marginBottom: '30px', display: 'flex', justifyContent: 'space-between' }}>
                <input
                  className='field'
                  name='no_oficio'
                  onChange={this.onChange}
                  value={(NumberAsString(importe))}
                  required
                  ref='no_oficio'
                  placeholder='No oficio'
                />
                <select style={{ background: 'white', fontSize: '1rem', textAlignLast: 'left', borderBottom: '1px solid grey', padding: '6px', width: '46%' }}>
                  <option></option>
                  <option value='Mtro.León Maximiliano Hernández Valdés'>Mtro.León Maximiliano Hernández Valdés</option>
                  <option value='Operadora Omx Sa De CV'>Operadora Omx Sa De CV</option>
                  <option value='AASI INNOVACIONES SA DE CV'>AASI INNOVACIONES SA DE CV</option>
                  <option value='Abigail Santillán Moreno'>Abigail Santillán Moreno</option>
                  <option value='Abraham Andrade Ortiz'>Abraham Andrade Ortiz</option>
                  <option value='Abraham Peña Pérez'>Abraham Peña Pérez</option>
                  <option value='Acabados Decorativos De La Huasteca SA De CV'>Acabados Decorativos De La Huasteca SA De CV</option>
                  <option value='Aceites Y Combustibles Los Ángeles SA De CV'>Aceites Y Combustibles Los Ángeles SA De CV</option>
                  <option value='Aceros Damarin SA De CV'>Aceros Damarin SA De CV</option>
                  <option value='Adarick Vite Aranda'>Adarick Vite Aranda</option>
                  <option value='Administradora De Centros Comerciales Santa Fe SA De CV'>Administradora De Centros Comerciales Santa Fe SA De CV</option>
                  <option value='ADOLFO PAZ RIANCHO'>ADOLFO PAZ RIANCHO</option>
                  <option value='Adrián Guevara Rivera'>Adrián Guevara Rivera</option>
                  <option value='Adrián Guillermo Cueto Hernández'>Adrián Guillermo Cueto Hernández</option>
                  <option value='Adriana Ávila Rodríguez'>Adriana Ávila Rodríguez</option>
                  <option value='MOTOR AVANZADO REBUIDING SA DE CV'>MOTOR AVANZADO REBUIDING SA DE CV</option>
                  <option value='Aeropuertos Y Servicios Auxiliares'>Aeropuertos Y Servicios Auxiliares</option>
                  <option value='Aerovías De México Sa De CV'>Aerovías De México Sa De CV</option>
                  <option value='Agaturismo SA De CV'>Agaturismo SA De CV</option>
                  <option value='Aianeli SA De CV'>Aianeli SA De CV</option>
                  <option value='Alberto Alfonso Galindo Galindo'>Alberto Alfonso Galindo Galindo</option>
                  <option value='Alberto Severino Jaén Olivas'>Alberto Severino Jaén Olivas</option>
                  <option value='Aldo Ramírez Cerón'>Aldo Ramírez Cerón</option>
                  <option value='Aldo Román Mendoza García'>Aldo Román Mendoza García</option>
                  <option value='Alejandra López Alvarado'>Alejandra López Alvarado</option>
                  <option value='Alex Steak SA De CV'>Alex Steak SA De CV</option>
                  <option value='Alfredo Edmundo Galindo Pérez'>Alfredo Edmundo Galindo Pérez</option>
                  <option value='Alfredo Laris Hernández'>Alfredo Laris Hernández</option>
                  <option value='Alheli Paredes Licona'>Alheli Paredes Licona</option>
                  <option value='Alma Gabriela Mendoza Rojas'>Alma Gabriela Mendoza Rojas</option>
                  <option value='Alma Rosa Basilio Garfias'>Alma Rosa Basilio Garfias</option>
                  <option value='Aluminio García'>Aluminio García</option>
                  <option value='Álvaro Samperio Le-Vinson'>Álvaro Samperio Le-Vinson</option>
                  <option value='Ana Fernanda Zapata Santana'>Ana Fernanda Zapata Santana</option>
                  <option value='Ana Laura Zacatenco Luna'>Ana Laura Zacatenco Luna</option>
                  <option value='Ana María Hernández López'>Ana María Hernández López</option>
                  <option value='Ana Perla Margarita Mendoza Espino'>Ana Perla Margarita Mendoza Espino</option>
                  <option value='Andrade Bertoloni Arturo'>Andrade Bertoloni Arturo</option>
                  <option value='Andrés Guillen Hernández'>Andrés Guillen Hernández</option>
                  <option value='Andrés Téllez Pino'>Andrés Téllez Pino</option>
                  <option value='Ángela Pérez Prado'>Ángela Pérez Prado</option>
                  <option value='Angélica González Sánchez'>Angélica González Sánchez</option>
                  <option value='Angélica Morales Avilés'>Angélica Morales Avilés</option>
                  <option value='Angélica Sánchez Martínez'>Angélica Sánchez Martínez</option>
                  <option value='Antojitos La Finca'>Antojitos La Finca</option>
                  <option value='Antonio Lugo Rosas'>Antonio Lugo Rosas</option>
                  <option value='Aquilino Edgar Herrera Rodríguez'>Aquilino Edgar Herrera Rodríguez</option>
                  <option value='Araceli Pérez Jarillo'>Araceli Pérez Jarillo</option>
                  <option value='Arellano Miranda Elizabeth'>Arellano Miranda Elizabeth</option>
                  <option value='Arlan José Chávez Lara'>Arlan José Chávez Lara</option>
                  <option value='Arlette Macías Escorcia'>Arlette Macías Escorcia</option>
                  <option value='Armando Miguel Carpio López'>Armando Miguel Carpio López</option>
                  <option value='Arnulfo Ramírez Cerón'>Arnulfo Ramírez Cerón</option>
                  <option value='Arturo Cano García'>Arturo Cano García</option>
                  <option value='Arturo Flores Meléndez'>Arturo Flores Meléndez</option>
                  <option value='Arturo Tinajero Jaimes'>Arturo Tinajero Jaimes</option>
                  <option value='Aseca, SA de CV'>Aseca, SA de CV</option>
                  <option value='Autobuses Coordinados Zimapan Valles'>Autobuses Coordinados Zimapan Valles</option>
                  <option value='Autobuses De Oriente Ado SA De CV'>Autobuses De Oriente Ado SA De CV</option>
                  <option value='Autobuses De Primera Clase'>Autobuses De Primera Clase</option>
                  <option value='Autobuses Estrella Blanca SA De CV'>Autobuses Estrella Blanca SA De CV</option>
                  <option value='Autobuses Estrella Blanca Sa De CV'>Autobuses Estrella Blanca Sa De CV</option>
                  <option value='Autobuses México-Zamapan Valle Flecha Roja SA'>Autobuses México-Zamapan Valle Flecha Roja SA</option>
                  <option value='Autobuses Valle Mezquital S., A. De CV'>Autobuses Valle Mezquital S., A. De CV</option>
                  <option value='Autógena De Hidalgo SA De CV'>Autógena De Hidalgo SA De CV</option>
                  <option value='Autogena de Hidalgo, SA de CV'>Autogena de Hidalgo, SA de CV</option>
                  <option value='Autopista Arco Norte Sa De CV'>Autopista Arco Norte Sa De CV</option>
                  <option value='Autopistas Arco Norte SA De CV'>Autopistas Arco Norte SA De CV</option>
                  <option value='Autos Pullman Sa De CV'>Autos Pullman Sa De CV</option>
                  <option value='Autoservicio Jocaran de Progreso, SA de CV'>Autoservicio Jocaran de Progreso, SA de CV</option>
                  <option value='Autoservicio Jocaran SA de CV'>Autoservicio Jocaran SA de CV</option>
                  <option value='Autotransportes De Hidalgo .SA De CV'>Autotransportes De Hidalgo .SA De CV</option>
                  <option value='Autotransportes Del Valle Del Mezquital SA De CV'>Autotransportes Del Valle Del Mezquital SA De CV</option>
                  <option value='Autovía Necaxa-Tihuatlan Sa De CV'>Autovía Necaxa-Tihuatlan Sa De CV</option>
                  <option value='Autozone De México, S. De RL De CV'>Autozone De México, S. De RL De CV</option>
                  <option value='Banco Mercantil Del Norte SA De CV'>Banco Mercantil Del Norte SA De CV</option>
                  <option value='Basualdo Rojo Honey'>Basualdo Rojo Honey</option>
                  <option value='Beatriz Montaño Jarillo'>Beatriz Montaño Jarillo</option>
                  <option value='Beatriz Penélope Isleim Castorena Cortes'>Beatriz Penélope Isleim Castorena Cortes</option>
                  <option value='Bensaa SA De CV'>Bensaa SA De CV</option>
                  <option value='Berenice Soto Hernández'>Berenice Soto Hernández</option>
                  <option value='Bianca Ofelia Galarza Trejo'>Bianca Ofelia Galarza Trejo</option>
                  <option value='Blanca Trejo Bautista'>Blanca Trejo Bautista</option>
                  <option value='Brenda Alemon Hernández'>Brenda Alemon Hernández</option>
                  <option value='Brenda Leticia Rangel Lugo'>Brenda Leticia Rangel Lugo</option>
                  <option value='Brenda Minelly López López'>Brenda Minelly López López</option>
                  <option value='Burger La Fiesta'>Burger La Fiesta</option>
                  <option value='C Frank Alexander Veytia ViejoIEJO'>C Frank Alexander Veytia ViejoIEJO</option>
                  <option value='C. Adolfo Paz Riancho'>C. Adolfo Paz Riancho</option>
                  <option value='C. Alejandra Fonseca Rincon'>C. Alejandra Fonseca Rincon</option>
                  <option value='C. Carlos Haua Bulos'>C. Carlos Haua Bulos</option>
                  <option value='C. Claudi Ramirez Lopez'>C. Claudi Ramirez Lopez</option>
                  <option value='C. Efren Rodriguez Ramierez'>C. Efren Rodriguez Ramierez</option>
                  <option value='C. Elizabeth Arellano Miranda'>C. Elizabeth Arellano Miranda</option>
                  <option value='C. Erika Jazimin Resendiz Trejo'>C. Erika Jazimin Resendiz Trejo</option>
                  <option value='C. Frank Alexander Veytia Viejo'>C. Frank Alexander Veytia Viejo</option>
                  <option value='C. Ines Cruz Hunter'>C. Ines Cruz Hunter</option>
                  <option value='C. Javier Santa Cruz Garcia'>C. Javier Santa Cruz Garcia</option>
                  <option value='C. Jose Luis Magaña Cabrera'>C. Jose Luis Magaña Cabrera</option>
                  <option value='C. Jose Luis Zacatenco Lopez'>C. Jose Luis Zacatenco Lopez</option>
                  <option value='C. Jose solis Gonzalez'>C. Jose solis Gonzalez</option>
                  <option value='C. Leticia Saavedra Nesbaid'>C. Leticia Saavedra Nesbaid</option>
                  <option value='C. Luis Eduardo Nahle Pascual'>C. Luis Eduardo Nahle Pascual</option>
                  <option value='C. Maria De Rosario Gomez Urbina'>C. Maria De Rosario Gomez Urbina</option>
                  <option value='C. Russel Barradaz Sanchez'>C. Russel Barradaz Sanchez</option>
                  <option value='C. Saul Salinas Gonzalez'>C. Saul Salinas Gonzalez</option>
                  <option value='C. Silverio Gonzalez Cuca'>C. Silverio Gonzalez Cuca</option>
                  <option value='C. Wencesñap Sanchez Estrada'>C. Wencesñap Sanchez Estrada</option>
                  <option value='C.Lesticia Saavedra Nesbaid'>C.Lesticia Saavedra Nesbaid</option>
                  <option value='Cadena Comercial Oxxo Sa De CV'>Cadena Comercial Oxxo Sa De CV</option>
                  <option value='Cadena Comercial Oxxo, Sa De CV'>Cadena Comercial Oxxo, Sa De CV</option>
                  <option value='Café Estaciones'>Café Estaciones</option>
                  <option value='CAMINO REAL'>CAMINO REAL</option>
                  <option value='CAMINOS Y PUENTES FEDERALES'>CAMINOS Y PUENTES FEDERALES</option>
                  <option value='Caminos Y Puentes Federales De Ingresos Y Servicios Conexos'>Caminos Y Puentes Federales De Ingresos Y Servicios Conexos</option>
                  <option value='LAVADO DE COCHES LA CUBETA DIGITAL'>LAVADO DE COCHES LA CUBETA DIGITAL</option>
                  <option value='CARBU EXPRESS, SA DE CV'>CARBU EXPRESS, SA DE CV</option>
                  <option value='CARLOS ANTONIO MORALES GARZA'>CARLOS ANTONIO MORALES GARZA</option>
                  <option value='CARLOS ANTONIO QUINTO RIOS'>CARLOS ANTONIO QUINTO RIOS</option>
                  <option value='Carlos Antonio Quinto Ríos'>Carlos Antonio Quinto Ríos</option>
                  <option value='CARLOS CELIO ESQUIVEL'>CARLOS CELIO ESQUIVEL</option>
                  <option value='Carlos Daniel Ortiz Chavez'>Carlos Daniel Ortiz Chavez</option>
                  <option value='Carlos Godinez Perez'>Carlos Godinez Perez</option>
                  <option value='Carlos Godínez Pérez'>Carlos Godínez Pérez</option>
                  <option value='Carlos Haua Bulos'>Carlos Haua Bulos</option>
                  <option value='Carlos Luis Gómez Arguelles'>Carlos Luis Gómez Arguelles</option>
                  <option value='Carlos Martin Torres Juárez'>Carlos Martin Torres Juárez</option>
                  <option value='Carlos Primitivo Vega Valle'>Carlos Primitivo Vega Valle</option>
                  <option value='Carreteras Del Pacifico'>Carreteras Del Pacifico</option>
                  <option value='Caseta Metlapil'>Caseta Metlapil</option>
                  <option value='Caseta Miradores'>Caseta Miradores</option>
                  <option value='Catalina Martínez Guerrero'>Catalina Martínez Guerrero</option>
                  <option value='Cecapiem SA De CV'>Cecapiem SA De CV</option>
                  <option value='Cele Filiberto Martínez Cordero'>Cele Filiberto Martínez Cordero</option>
                  <option value='Celia Esparza Loreto'>Celia Esparza Loreto</option>
                  <option value='Centro De Copiado'>Centro De Copiado</option>
                  <option value='Centro de verificación De Verificación Takechi ​​SA de CV'>Centro de verificación De Verificación Takechi ​​SA de CV</option>
                  <option value='Cerrajería Aranda'>Cerrajería Aranda</option>
                  <option value='Cerrajería Móvil El Saucillo'>Cerrajería Móvil El Saucillo</option>
                  <option value='Cerro De Biznagas S, A De CV'>Cerro De Biznagas S, A De CV</option>
                  <option value='CFE Suministridor De Servicios BasicosS'>CFE Suministridor De Servicios BasicosS</option>
                  <option value='City Club'>City Club</option>
                  <option value='Claudia Corte Herrera'>Claudia Corte Herrera</option>
                  <option value='Claudia Judith Flores Leyva'>Claudia Judith Flores Leyva</option>
                  <option value='Claudia Mota Rojas'>Claudia Mota Rojas</option>
                  <option value='Claudia Ramierez Lopez'>Claudia Ramierez Lopez</option>
                  <option value='Claudia Ramírez López'>Claudia Ramírez López</option>
                  <option value='Cocina Económica La Güerita'>Cocina Económica La Güerita</option>
                  <option value='Cocina Económica La Parroquia'>Cocina Económica La Parroquia</option>
                  <option value='Cocina Tradicional Campestre De 1981'>Cocina Tradicional Campestre De 1981</option>
                  <option value='Coel SA De CV'>Coel SA De CV</option>
                  <option value='Com. De Agua Pot. Alcant Y san. Del Mpio De Huichapan'>Com. De Agua Pot. Alcant Y san. Del Mpio De Huichapan</option>
                  <option value='Combustibles Bentan SA DE CV'>Combustibles Bentan SA DE CV</option>
                  <option value='Combustibles De Pachuca SA De CV'>Combustibles De Pachuca SA De CV</option>
                  <option value='Combustibles Rumloc SA De CV'>Combustibles Rumloc SA De CV</option>
                  <option value='Comercial Mexicana'>Comercial Mexicana</option>
                  <option value='Comercial Miura SA DE CV (Sistema De Vigilancia)'>Comercial Miura SA DE CV (Sistema De Vigilancia)</option>
                  <option value='Comercializadora Farmacéutica De Chiapas Sapi De CV'>Comercializadora Farmacéutica De Chiapas Sapi De CV</option>
                  <option value='Comercializadora Y Distribuidora Brime SA De CV'>Comercializadora Y Distribuidora Brime SA De CV</option>
                  <option value='Comisión Bancaria'>Comisión Bancaria</option>
                  <option value='Comisión De Agua De Actopan'>Comisión De Agua De Actopan</option>
                  <option value='Comisión De Agua De Actopan Hgo'>Comisión De Agua De Actopan Hgo</option>
                  <option value='Comisión De Agua De Tula De Allende'>Comisión De Agua De Tula De Allende</option>
                  <option value='Comisión De Agua De Zimapan'>Comisión De Agua De Zimapan</option>
                  <option value='Comisión De Agua Huichapan'>Comisión De Agua Huichapan</option>
                  <option value='Comisión De Agua Ixmiquilpan'>Comisión De Agua Ixmiquilpan</option>
                  <option value='Comisión De Agua Mixquiahuala De Juárez'>Comisión De Agua Mixquiahuala De Juárez</option>
                  <option value='Comisión De Agua Pachuca'>Comisión De Agua Pachuca</option>
                  <option value='Comisión De Agua Potable Y Alcantarillado Del Municipio De Mixquiahuala De Juarez'>Comisión De Agua Potable Y Alcantarillado Del Municipio De Mixquiahuala De Juarez</option>
                  <option value='Comisión De Agua Potable, Alcantarillado Y Saneamiento Del Municipio De Ixmiquilpan, Hgo'>Comisión De Agua Potable, Alcantarillado Y Saneamiento Del Municipio De Ixmiquilpan, Hgo</option>
                  <option value='Comisión De Agua Potable, Alcantarillado Y Saneamiento Del Municipio De Zimapan, Hgo'>Comisión De Agua Potable, Alcantarillado Y Saneamiento Del Municipio De Zimapan, Hgo</option>
                  <option value='Comisión de Agua y Alcantarillado De Sistemas Intermunicipales'>Comisión de Agua y Alcantarillado De Sistemas Intermunicipales</option>
                  <option value='Comisión De Agua Y Alcantarillado Del Municipio De Actopan Hidalgo'>Comisión De Agua Y Alcantarillado Del Municipio De Actopan Hidalgo</option>
                  <option value='Comisión De Agua Y Alcantarillado Del Municipio De Tula De Allende'>Comisión De Agua Y Alcantarillado Del Municipio De Tula De Allende</option>
                  <option value='Comisión Federal De Electricidad'>Comisión Federal De Electricidad</option>
                  <option value='Compañía Santa María SA De CV'>Compañía Santa María SA De CV</option>
                  <option value='Concesionaria Autopista Perote-Xalapa'>Concesionaria Autopista Perote-Xalapa</option>
                  <option value='Concesionaria De Vías Troncales SA De CV'>Concesionaria De Vías Troncales SA De CV</option>
                  <option value='Concesionaria Mexiquense SA De CV'>Concesionaria Mexiquense SA De CV</option>
                  <option value='Concesiones Y Promociones Malibran'>Concesiones Y Promociones Malibran</option>
                  <option value='Conexiones Y Mangueras De Pachuca SA De C V'>Conexiones Y Mangueras De Pachuca SA De C V</option>
                  <option value='Consultora Informática'>Consultora Informática</option>
                  <option value='CONTEXPRESS S DE RL DE CV'>CONTEXPRESS S DE RL DE CV</option>
                  <option value='Copias Neo SA De CV'>Copias Neo SA De CV</option>
                  <option value='Copicentro Pachuca'>Copicentro Pachuca</option>
                  <option value='Corporativo Farmacias Mas SA De CV'>Corporativo Farmacias Mas SA De CV</option>
                  <option value='Corporativo Yunes Márquez SA De CV'>Corporativo Yunes Márquez SA De CV</option>
                  <option value='Corte Herrera Claudia'>Corte Herrera Claudia</option>
                  <option value='Cortesía En Viajes S. De RL De CV'>Cortesía En Viajes S. De RL De CV</option>
                  <option value='CRIMELAB SA DE CV'>CRIMELAB SA DE CV</option>
                  <option value='Cristina González Cantera'>Cristina González Cantera</option>
                  <option value='Curso'>Curso</option>
                  <option value='El Delito De Feminicidio'>El Delito De Feminicidio</option>
                  <option value='Cutberto Rodríguez Álvarez'>Cutberto Rodríguez Álvarez</option>
                  <option value='Cynper SA De CV'>Cynper SA De CV</option>
                  <option value='China Town'>China Town</option>
                  <option value='Dagoberto Mendoza Morales'>Dagoberto Mendoza Morales</option>
                  <option value='Daniel García Luna'>Daniel García Luna</option>
                  <option value='Daniel Becerra Castañeda'>Daniel Becerra Castañeda</option>
                  <option value='Daniel López Carrasco'>Daniel López Carrasco</option>
                  <option value='Daniel Miramontes Flores'>Daniel Miramontes Flores</option>
                  <option value='Daniel Zarate Santiago'>Daniel Zarate Santiago</option>
                  <option value='David Adrián Martínez Santiago'>David Adrián Martínez Santiago</option>
                  <option value='David Richard Uribe'>David Richard Uribe</option>
                  <option value='De Tula De Allende, Hgo'>De Tula De Allende, Hgo</option>
                  <option value='Delia Serrano Morales'>Delia Serrano Morales</option>
                  <option value='Deportes Pachuca SA De CV'>Deportes Pachuca SA De CV</option>
                  <option value='Desarrollo Hotelero De Plaza Pachuca Sa'>Desarrollo Hotelero De Plaza Pachuca Sa</option>
                  <option value='DEVSOFT SA DE CV'>DEVSOFT SA DE CV</option>
                  <option value='Dhl Exprés México SA De CV'>Dhl Exprés México SA De CV</option>
                  <option value='Diana Araceli Zaldívar Cruz'>Diana Araceli Zaldívar Cruz</option>
                  <option value='Diana Gálvez Mendoza'>Diana Gálvez Mendoza</option>
                  <option value='Diego Alberto Acevedo De La Rosa'>Diego Alberto Acevedo De La Rosa</option>
                  <option value='Diego Alberto Espinosa Islas'>Diego Alberto Espinosa Islas</option>
                  <option value='Dilia Ramos Montaño'>Dilia Ramos Montaño</option>
                  <option value='Distribuciones Mogu SA DE CV'>Distribuciones Mogu SA DE CV</option>
                  <option value='Distribuidora De Abarrotes Y Semillas De Pachuca SA De CV'>Distribuidora De Abarrotes Y Semillas De Pachuca SA De CV</option>
                  <option value='Distribuidora De Alimentos Th, SA De CV'>Distribuidora De Alimentos Th, SA De CV</option>
                  <option value='Distribuidora Del Manual Moderno SA De CV'>Distribuidora Del Manual Moderno SA De CV</option>
                  <option value='Distribuidora El Manual Moderno SA De CV'>Distribuidora El Manual Moderno SA De CV</option>
                  <option value='Distribuidora Fragoso'>Distribuidora Fragoso</option>
                  <option value='Domínguez Díaz Daniel'>Domínguez Díaz Daniel</option>
                  <option value='Drícela Austria Serna'>Drícela Austria Serna</option>
                  <option value='Drivecare, SA de CV'>Drivecare, SA de CV</option>
                  <option value='Dulce María Calva Sánchez'>Dulce María Calva Sánchez</option>
                  <option value='Edgar Aquilino Herrera Rodríguez'>Edgar Aquilino Herrera Rodríguez</option>
                  <option value='Edgar Dante Rosas Islas'>Edgar Dante Rosas Islas</option>
                  <option value='Edgar Mendoza Ceron'>Edgar Mendoza Ceron</option>
                  <option value='Edgar Rabindranath Valdespino Zubieta'>Edgar Rabindranath Valdespino Zubieta</option>
                  <option value='Edith Rojas Camacho'>Edith Rojas Camacho</option>
                  <option value='Edmundo Alfredo Galindo Pérez'>Edmundo Alfredo Galindo Pérez</option>
                  <option value='Edson Aguilar Romero'>Edson Aguilar Romero</option>
                  <option value='El Palacio De Hierro SA De CV'>El Palacio De Hierro SA De CV</option>
                  <option value='El Parador De San José'>El Parador De San José</option>
                  <option value='El Pelón Dulcerías'>El Pelón Dulcerías</option>
                  <option value='El rincon de periban'>El rincon de periban</option>
                  <option value='El Rincón De Periban'>El Rincón De Periban</option>
                  <option value='Elda Ceseña Banquera'>Elda Ceseña Banquera</option>
                  <option value='Eléctrica Ángeles'>Eléctrica Ángeles</option>
                  <option value='Eléctrica Barba SA De CV'>Eléctrica Barba SA De CV</option>
                  <option value='Electro pura S. De RL De CV'>Electro pura S. De RL De CV</option>
                  <option value='Electropura S. De RL De CV'>Electropura S. De RL De CV</option>
                  <option value='Elfego Baltazar Piña Verde'>Elfego Baltazar Piña Verde</option>
                  <option value='Eli Rodríguez Del Ángel'>Eli Rodríguez Del Ángel</option>
                  <option value='Elideth Sarahi Dorantes López'>Elideth Sarahi Dorantes López</option>
                  <option value='Elisa Ramírez Escamilla'>Elisa Ramírez Escamilla</option>
                  <option value='Eliseo Martínez Ballesteros'>Eliseo Martínez Ballesteros</option>
                  <option value='Eliu Morales Fragoso'>Eliu Morales Fragoso</option>
                  <option value='Elizabeth Arellano Miranda'>Elizabeth Arellano Miranda</option>
                  <option value='Elizabeth Salinas Aguilar'>Elizabeth Salinas Aguilar</option>
                  <option value='Elizabeth Troncoso Escamilla'>Elizabeth Troncoso Escamilla</option>
                  <option value='Eloísa Camargo Hernández'>Eloísa Camargo Hernández</option>
                  <option value='Elsa Patricia Rodríguez Reyes'>Elsa Patricia Rodríguez Reyes</option>
                  <option value='Emilio Prieto Perez'>Emilio Prieto Perez</option>
                  <option value='Emilio Prieto Pérez'>Emilio Prieto Pérez</option>
                  <option value='Emmanuel Ceseña Barquera'>Emmanuel Ceseña Barquera</option>
                  <option value='Envasadoras De Aguas En México S. De RL De CV (Bonafont)'>Envasadoras De Aguas En México S. De RL De CV (Bonafont)</option>
                  <option value='Eric Salvador Rosas Villa'>Eric Salvador Rosas Villa</option>
                  <option value='Erick Jovanni Flores Varela'>Erick Jovanni Flores Varela</option>
                  <option value='Erick Mendoza Hernández'>Erick Mendoza Hernández</option>
                  <option value='Erick Salvador Rosas Villa'>Erick Salvador Rosas Villa</option>
                  <option value='Erika Cruz Pérez'>Erika Cruz Pérez</option>
                  <option value='ERIKA JAZMIN RESENDIZ TREJO'>ERIKA JAZMIN RESENDIZ TREJO</option>
                  <option value='Ernesto Skewes López'>Ernesto Skewes López</option>
                  <option value='Esli Domínguez Trejo'>Esli Domínguez Trejo</option>
                  <option value='Especialistas en Alta Cocina SA De CV (Wings)'>Especialistas en Alta Cocina SA De CV (Wings)</option>
                  <option value='Esperanza González Díaz'>Esperanza González Díaz</option>
                  <option value='Espinosa Ostos Blanca Deyanira'>Espinosa Ostos Blanca Deyanira</option>
                  <option value='Estación Acevedo S. De RL'>Estación Acevedo S. De RL</option>
                  <option value='Estación De Servicio Ana SA De CV'>Estación De Servicio Ana SA De CV</option>
                  <option value='Estación De Servicio Ariel SA De CV'>Estación De Servicio Ariel SA De CV</option>
                  <option value='Estación de Servicio EMAJUFH SA de CV'>Estación de Servicio EMAJUFH SA de CV</option>
                  <option value='Estación De Servicio La Mora'>Estación De Servicio La Mora</option>
                  <option value='Estación De Servicios Gesa SA De CV'>Estación De Servicios Gesa SA De CV</option>
                  <option value='Estación Real De La Plata SA De CV'>Estación Real De La Plata SA De CV</option>
                  <option value='Estación Santa María La Providencia SA De CV'>Estación Santa María La Providencia SA De CV</option>
                  <option value='Estación Valle Dorado SA De CV'>Estación Valle Dorado SA De CV</option>
                  <option value='Estacionamiento La Posta'>Estacionamiento La Posta</option>
                  <option value='Esteban Leopoldo Cartelazo Islas'>Esteban Leopoldo Cartelazo Islas</option>
                  <option value='Eugenia Vite Silvestre'>Eugenia Vite Silvestre</option>
                  <option value='Eva Pérez Hernández'>Eva Pérez Hernández</option>
                  <option value='Eva Rivera Samitez'>Eva Rivera Samitez</option>
                  <option value='Fabián Bernardo Moreno Gómez'>Fabián Bernardo Moreno Gómez</option>
                  <option value='FABIOLA GONZALEZ OROZCO'>FABIOLA GONZALEZ OROZCO</option>
                  <option value='Fabiola Santillán García'>Fabiola Santillán García</option>
                  <option value='Farmacias Guadalajara SA De CV'>Farmacias Guadalajara SA De CV</option>
                  <option value='Farum Servicios SA De CV'>Farum Servicios SA De CV</option>
                  <option value='Fejsa Computaion Y Oficinas De Pachuca SA De CV'>Fejsa Computaion Y Oficinas De Pachuca SA De CV</option>
                  <option value='FELIPE JIMENEZ GUTIERREZ'>FELIPE JIMENEZ GUTIERREZ</option>
                  <option value='Felipe Jiménez Gutiérrez'>Felipe Jiménez Gutiérrez</option>
                  <option value='Felipe Simón Olvera Castelán'>Felipe Simón Olvera Castelán</option>
                  <option value='Felisa Lugo Chavero'>Felisa Lugo Chavero</option>
                  <option value='Feliz Ernesto Reyes Molina'>Feliz Ernesto Reyes Molina</option>
                  <option value='Fernando Hidalgo Vergara'>Fernando Hidalgo Vergara</option>
                  <option value='Ferre hogar'>Ferre hogar</option>
                  <option value='Ferretería Y Plomería Casa Martínez'>Ferretería Y Plomería Casa Martínez</option>
                  <option value='Fideicomiso Autopistas Y Puentes Del Golfo Centro'>Fideicomiso Autopistas Y Puentes Del Golfo Centro</option>
                  <option value='Fierros Y Laminas De Pachuca SA De CV'>Fierros Y Laminas De Pachuca SA De CV</option>
                  <option value='Fiesta Inn Pachuca'>Fiesta Inn Pachuca</option>
                  <option value='Filiberto Barrera Dávila'>Filiberto Barrera Dávila</option>
                  <option value='Flor Eugenia Vargas Herrera'>Flor Eugenia Vargas Herrera</option>
                  <option value='Fondo Nacional De Infraestructura'>Fondo Nacional De Infraestructura</option>
                  <option value='Forlac Store SA De CV'>Forlac Store SA De CV</option>
                  <option value='Francisca Quiroz Uribe'>Francisca Quiroz Uribe</option>
                  <option value='Francisco Raúl García Bolio'>Francisco Raúl García Bolio</option>
                  <option value='Francisco Ventura Martínez'>Francisco Ventura Martínez</option>
                  <option value='Fuente De Sodas Chino´S'>Fuente De Sodas Chino´S</option>
                  <option value='Gabriel López Hernández'>Gabriel López Hernández</option>
                  <option value='Gabriela Romero Campos'>Gabriela Romero Campos</option>
                  <option value='Manual García Moreno Víctor'>Manual García Moreno Víctor</option>
                  <option value='Garza Gas De Hidalgo SA De CV'>Garza Gas De Hidalgo SA De CV</option>
                  <option value='Gas De Provincia Sa De CV'>Gas De Provincia Sa De CV</option>
                  <option value='Gas Fast SA De CV'>Gas Fast SA De CV</option>
                  <option value='Gas Imperial De Axapusco SA De CV'>Gas Imperial De Axapusco SA De CV</option>
                  <option value='Gasamake SA De CV'>Gasamake SA De CV</option>
                  <option value='Gasolineria Agua Blanca SA De CV'>Gasolineria Agua Blanca SA De CV</option>
                  <option value='Gasolineria Rodjaq SA De CV'>Gasolineria Rodjaq SA De CV</option>
                  <option value='Gasomer SA De CV'>Gasomer SA De CV</option>
                  <option value='Gastrosur SA De CV'>Gastrosur SA De CV</option>
                  <option value='Genaro Oswaldo Márquez Gutiérrez'>Genaro Oswaldo Márquez Gutiérrez</option>
                  <option value='Germa Mantenimiento Y Diseño SA De CV'>Germa Mantenimiento Y Diseño SA De CV</option>
                  <option value='Gertell Combustibles SA De CV'>Gertell Combustibles SA De CV</option>
                  <option value='Gibran Copca Chávez'>Gibran Copca Chávez</option>
                  <option value='Gilberto Bárcenas López'>Gilberto Bárcenas López</option>
                  <option value='Gilberto Espinosa Ramírez'>Gilberto Espinosa Ramírez</option>
                  <option value='Gloríela Islas Sosa'>Gloríela Islas Sosa</option>
                  <option value='Gobierno Del Df Curso Delito De Feminicidio'>Gobierno Del Df Curso Delito De Feminicidio</option>
                  <option value='Gobierno del Estado de Veracruz'>Gobierno del Estado de Veracruz</option>
                  <option value='González Islas Bernardo'>González Islas Bernardo</option>
                  <option value='Graciela Moreno Arce'>Graciela Moreno Arce</option>
                  <option value='Graciela Moreno Rodríguez'>Graciela Moreno Rodríguez</option>
                  <option value='Graciela Taide Quiroz Gutiérrez'>Graciela Taide Quiroz Gutiérrez</option>
                  <option value='Grupo Autopistas Nacionales SA De CV'>Grupo Autopistas Nacionales SA De CV</option>
                  <option value='Grupo Autopistas Nacionales, Sa De CV'>Grupo Autopistas Nacionales, Sa De CV</option>
                  <option value='Grupo Bekim Empresarial S DE RL DE CV'>Grupo Bekim Empresarial S DE RL DE CV</option>
                  <option value='Grupo Cravioto Distribuciones SA De CV'>Grupo Cravioto Distribuciones SA De CV</option>
                  <option value='Grupo Estrella Blanca SA De CV'>Grupo Estrella Blanca SA De CV</option>
                  <option value='Grupo Galume SA De CV'>Grupo Galume SA De CV</option>
                  <option value='Grupo Helen Gasolinera Excelencia y Calidad SA de CV'>Grupo Helen Gasolinera Excelencia y Calidad SA de CV</option>
                  <option value='Grupo O Port SA De CV'>Grupo O Port SA De CV</option>
                  <option value='Grupo Parisina SA De CV'>Grupo Parisina SA De CV</option>
                  <option value='Grupo Suzuka Argenta SA De CV'>Grupo Suzuka Argenta SA De CV</option>
                  <option value='Guadalupe Hernández Escamilla'>Guadalupe Hernández Escamilla</option>
                  <option value='Guillermo Harold Barría García'>Guillermo Harold Barría García</option>
                  <option value='Gustavo Said Gonzalez Tapia'>Gustavo Said Gonzalez Tapia</option>
                  <option value='Gustavo Trejo Montalvo'>Gustavo Trejo Montalvo</option>
                  <option value='Gutiérrez Rodríguez Juan Ramón'>Gutiérrez Rodríguez Juan Ramón</option>
                  <option value='Guy Jesús Quijano Austria'>Guy Jesús Quijano Austria</option>
                  <option value='H. Roberto Aguilar Galindo'>H. Roberto Aguilar Galindo</option>
                  <option value='Hacienda Yextho'>Hacienda Yextho</option>
                  <option value='Hacobo Flores Pérez'>Hacobo Flores Pérez</option>
                  <option value='Héctor Santos González Reyes'>Héctor Santos González Reyes</option>
                  <option value='Heriberto Padilla Contreras'>Heriberto Padilla Contreras</option>
                  <option value='Herlaz Sistemas de Comunicación SA De CV'>Herlaz Sistemas de Comunicación SA De CV</option>
                  <option value='Hermelinda Peña Hernández'>Hermelinda Peña Hernández</option>
                  <option value='Hernández Valencia Rosalía'>Hernández Valencia Rosalía</option>
                  <option value='Herrera Motors De Hidalgo SA De CV'>Herrera Motors De Hidalgo SA De CV</option>
                  <option value='Herrera Motors De Hidalgo SA De CV'>Herrera Motors De Hidalgo SA De CV</option>
                  <option value='Restaurante Hidalgo Platillos Regionales'>Restaurante Hidalgo Platillos Regionales</option>
                  <option value='Hidrocarburos Hidalgo SA De CV'>Hidrocarburos Hidalgo SA De CV</option>
                  <option value='Hidrocarburos Santa Catarina SA De CV'>Hidrocarburos Santa Catarina SA De CV</option>
                  <option value='Hidrosina Plus SA De CV'>Hidrosina Plus SA De CV</option>
                  <option value='Hilda Lorena Torres Guerrero'>Hilda Lorena Torres Guerrero</option>
                  <option value='Home Depot México S De RL De CV'>Home Depot México S De RL De CV</option>
                  <option value='Hotel Y Restaurante Tezoli'>Hotel Y Restaurante Tezoli</option>
                  <option value='Hoteles Eco turísticos Mexicanos SA De CV'>Hoteles Eco turísticos Mexicanos SA De CV</option>
                  <option value='Hoteles Sheraton S. De RL De CV'>Hoteles Sheraton S. De RL De CV</option>
                  <option value='Huichapan Hgo'>Huichapan Hgo</option>
                  <option value='Impulsora De Transportes Mexicanos SA De CV'>Impulsora De Transportes Mexicanos SA De CV</option>
                  <option value='Industrias Long Meng S. De RL Mi'>Industrias Long Meng S. De RL Mi</option>
                  <option value='Ines Cruz Hunter'>Ines Cruz Hunter</option>
                  <option value='Ing. Rogelio Alberto Téllez Rojo'>Ing. Rogelio Alberto Téllez Rojo</option>
                  <option value='Ingrid Minerva Rodríguez Vera'>Ingrid Minerva Rodríguez Vera</option>
                  <option value='Interhidalguenses'>Interhidalguenses</option>
                  <option value='Irving Ortiz Flores'>Irving Ortiz Flores</option>
                  <option value='Isidro Granados Guerra'>Isidro Granados Guerra</option>
                  <option value='Israel Islas Castañeda'>Israel Islas Castañeda</option>
                  <option value='Iván Ramírez Hernández'>Iván Ramírez Hernández</option>
                  <option value='Ivonne Munguía Becerra'>Ivonne Munguía Becerra</option>
                  <option value='J. Irais González García'>J. Irais González García</option>
                  <option value='Jacobo Flores Pérez'>Jacobo Flores Pérez</option>
                  <option value='Jaime Zapata Venegas'>Jaime Zapata Venegas</option>
                  <option value='Janeth Olvera Salinas'>Janeth Olvera Salinas</option>
                  <option value='Jaqueline Gálvez De La Peña'>Jaqueline Gálvez De La Peña</option>
                  <option value='Javier González Mejía'>Javier González Mejía</option>
                  <option value='JAVIER LEO CUEVAS'>JAVIER LEO CUEVAS</option>
                  <option value='Javier Rodríguez Robles'>Javier Rodríguez Robles</option>
                  <option value='Javier Santa Cruz Garcia'>Javier Santa Cruz Garcia</option>
                  <option value='Javier Santacruz García'>Javier Santacruz García</option>
                  <option value='Jessica Denisse Zuñiga Rosales'>Jessica Denisse Zuñiga Rosales</option>
                  <option value='Jesús Elías Salinas Baños'>Jesús Elías Salinas Baños</option>
                  <option value='Jesús Ríos Islas'>Jesús Ríos Islas</option>
                  <option value='Joao Israel Villegas Trejo'>Joao Israel Villegas Trejo</option>
                  <option value='Joaquín Escobar Baños'>Joaquín Escobar Baños</option>
                  <option value='Johanna Beatriz Hidalgo Hernández'>Johanna Beatriz Hidalgo Hernández</option>
                  <option value='Jorge Erick Piña Vite'>Jorge Erick Piña Vite</option>
                  <option value='Jorge Vargas Martínez'>Jorge Vargas Martínez</option>
                  <option value='Jose Alfonso López Rubio'>Jose Alfonso López Rubio</option>
                  <option value='José Alfredo Elizalde Hernández'>José Alfredo Elizalde Hernández</option>
                  <option value='José Antonio Calderón López'>José Antonio Calderón López</option>
                  <option value='José Antonio Jiménez Rodríguez'>José Antonio Jiménez Rodríguez</option>
                  <option value='JOSE ANTONIO SILVA MORENO'>JOSE ANTONIO SILVA MORENO</option>
                  <option value='José Armando Reyes Samperio'>José Armando Reyes Samperio</option>
                  <option value='José Augusto Fuentes Marín'>José Augusto Fuentes Marín</option>
                  <option value='José Carlos Vargas Bonetta'>José Carlos Vargas Bonetta</option>
                  <option value='José De Jesús Franco Solís'>José De Jesús Franco Solís</option>
                  <option value='José De Jesús López Peña'>José De Jesús López Peña</option>
                  <option value='José González Beltrána'>José González Beltrána</option>
                  <option value='José Guadalupe Sánchez Guerrero'>José Guadalupe Sánchez Guerrero</option>
                  <option value='Jose Ivan Gutierrez Najera'>Jose Ivan Gutierrez Najera</option>
                  <option value='José Jaime Acosta Castro'>José Jaime Acosta Castro</option>
                  <option value='José Juan Moreno Valle'>José Juan Moreno Valle</option>
                  <option value='José Luis Hernández Rosales'>José Luis Hernández Rosales</option>
                  <option value='José Luis Hidalgo López'>José Luis Hidalgo López</option>
                  <option value='JOSE LUIS MAGAÑA CABRERA'>JOSE LUIS MAGAÑA CABRERA</option>
                  <option value='José Luis Salinas Elizalde'>José Luis Salinas Elizalde</option>
                  <option value='José Luis Serrano Arroyo'>José Luis Serrano Arroyo</option>
                  <option value='JOSE LUIS ZACATENCO LOPEZ'>JOSE LUIS ZACATENCO LOPEZ</option>
                  <option value='José Luis Zacatenco López'>José Luis Zacatenco López</option>
                  <option value='José Manuel Hernández Hernández'>José Manuel Hernández Hernández</option>
                  <option value='JOSE NERI ISLAS MARTINEZ'>JOSE NERI ISLAS MARTINEZ</option>
                  <option value='José Román Cárdenas Pizano'>José Román Cárdenas Pizano</option>
                  <option value='Jose Roman Pizano Caredenas'>Jose Roman Pizano Caredenas</option>
                  <option value='Jose Solis Gonzalez'>Jose Solis Gonzalez</option>
                  <option value='Josselin Sixto Ruiz'>Josselin Sixto Ruiz</option>
                  <option value='Juan Alberto Peralta Vázquez'>Juan Alberto Peralta Vázquez</option>
                  <option value='Juan Carlos Ángeles Baltazar'>Juan Carlos Ángeles Baltazar</option>
                  <option value='Juan Carlos Salinas Rodríguez'>Juan Carlos Salinas Rodríguez</option>
                  <option value='Juan Carlos Vergara Bonneta'>Juan Carlos Vergara Bonneta</option>
                  <option value='Juan Gustavo Perez Gónzalez'>Juan Gustavo Perez Gónzalez</option>
                  <option value='Juan Hernández Olvera'>Juan Hernández Olvera</option>
                  <option value='Juan Iv Rodríguez Sánchez'>Juan Iv Rodríguez Sánchez</option>
                  <option value='Juan Leticia Elizalde Zendejas'>Juan Leticia Elizalde Zendejas</option>
                  <option value='Juan Manuel García Guzmán'>Juan Manuel García Guzmán</option>
                  <option value='Juan Manuel García Hernández'>Juan Manuel García Hernández</option>
                  <option value='Juan Manuel Lugo Nacif'>Juan Manuel Lugo Nacif</option>
                  <option value='Juan Manuel Zaldívar Chiapa'>Juan Manuel Zaldívar Chiapa</option>
                  <option value='Juan Rafael Canales Ángeles'>Juan Rafael Canales Ángeles</option>
                  <option value='Juan Ramón Gutiérrez Rodríguez'>Juan Ramón Gutiérrez Rodríguez</option>
                  <option value='Juan Ramón Vázquez Cruz'>Juan Ramón Vázquez Cruz</option>
                  <option value='Juana Magdalena Ambrosio Vargas'>Juana Magdalena Ambrosio Vargas</option>
                  <option value='Juana María Escamilla Vázquez'>Juana María Escamilla Vázquez</option>
                  <option value='Juana Vargas López'>Juana Vargas López</option>
                  <option value='Juárez Hidalgo'>Juárez Hidalgo</option>
                  <option value='Judith M. Luna Mejía'>Judith M. Luna Mejía</option>
                  <option value='Julieta García Esquivel'>Julieta García Esquivel</option>
                  <option value='Julio Alberto Santillán García'>Julio Alberto Santillán García</option>
                  <option value='Julio Cesar Salinas González'>Julio Cesar Salinas González</option>
                  <option value='Julio Rosales Reyes'>Julio Rosales Reyes</option>
                  <option value='Julissa Ortiz Barrera'>Julissa Ortiz Barrera</option>
                  <option value='Juventino Pérez Lemoine'>Juventino Pérez Lemoine</option>
                  <option value='Jv Renta'>Jv Renta</option>
                  <option value='Karen Alina Overa Santos'>Karen Alina Overa Santos</option>
                  <option value='Karen Judith Márquez Espinoza'>Karen Judith Márquez Espinoza</option>
                  <option value='Karla Carolina Rivera Escalona'>Karla Carolina Rivera Escalona</option>
                  <option value='Karla Lizzett Flores Rodríguez'>Karla Lizzett Flores Rodríguez</option>
                  <option value='Karla Yadira Hernández Hernández'>Karla Yadira Hernández Hernández</option>
                  <option value='Kemuel SA De CV'>Kemuel SA De CV</option>
                  <option value='Miguel Oscar De La Vega Bezies'>Miguel Oscar De La Vega Bezies</option>
                  <option value='La Braza Arracheras'>La Braza Arracheras</option>
                  <option value='La Casa Del Juego'>La Casa Del Juego</option>
                  <option value='La Cubeta Digital'>La Cubeta Digital</option>
                  <option value='La Flor De Michoacán'>La Flor De Michoacán</option>
                  <option value='La Luz Roja'>La Luz Roja</option>
                  <option value='Laboratorio Coahuila SA De CV'>Laboratorio Coahuila SA De CV</option>
                  <option value='Latanst SA De CV'>Latanst SA De CV</option>
                  <option value='Latitud 5 Estrellas SA De CV'>Latitud 5 Estrellas SA De CV</option>
                  <option value='Laura Cristina Berber Vicaña'>Laura Cristina Berber Vicaña</option>
                  <option value='Laura Piña Serrano'>Laura Piña Serrano</option>
                  <option value='Laureano Campa Zúñiga'>Laureano Campa Zúñiga</option>
                  <option value='Lazcano Ortiz Beatriz'>Lazcano Ortiz Beatriz</option>
                  <option value='Lenin Alejandro Castañeda Baños'>Lenin Alejandro Castañeda Baños</option>
                  <option value='Leticia Ignacio Mejía'>Leticia Ignacio Mejía</option>
                  <option value='Leticia Saavedra Nesbaid'>Leticia Saavedra Nesbaid</option>
                  <option value='Lilia Lugo Mejía'>Lilia Lugo Mejía</option>
                  <option value='Liliana Flores Rossette'>Liliana Flores Rossette</option>
                  <option value='Liliana Yazmin Franco Castro'>Liliana Yazmin Franco Castro</option>
                  <option value='Linda Crystal García Doniz'>Linda Crystal García Doniz</option>
                  <option value='Liz Arely Castelán Bautista'>Liz Arely Castelán Bautista</option>
                  <option value='Liza Angélica Islas Rivera'>Liza Angélica Islas Rivera</option>
                  <option value='Lizbeth Pizana Olvera'>Lizbeth Pizana Olvera</option>
                  <option value='Lonchería María Isabel'>Lonchería María Isabel</option>
                  <option value='Los Cazadores'>Los Cazadores</option>
                  <option value='Los Negritos Restaurant Bar'>Los Negritos Restaurant Bar</option>
                  <option value='Lucero Pérez González'>Lucero Pérez González</option>
                  <option value='Luis Alberto Ávila Osorio'>Luis Alberto Ávila Osorio</option>
                  <option value='Luis Angel Mayen Garcia'>Luis Angel Mayen Garcia</option>
                  <option value='Luis Ángel Mayen García'>Luis Ángel Mayen García</option>
                  <option value='Luis Martínez Mejía'>Luis Martínez Mejía</option>
                  <option value='Luis Serfain Henkel Castañeda'>Luis Serfain Henkel Castañeda</option>
                  <option value='Luis Vargas Trejos'>Luis Vargas Trejos</option>
                  <option value='Luisa Lagarde Vásquez'>Luisa Lagarde Vásquez</option>
                  <option value='Llanterama Hidalguense SA De CV'>Llanterama Hidalguense SA De CV</option>
                  <option value='Ma. Elena Lugo Chavero'>Ma. Elena Lugo Chavero</option>
                  <option value='Ma. Guadalupe Vite Carlos'>Ma. Guadalupe Vite Carlos</option>
                  <option value='Macaria Pérez Guerrero'>Macaria Pérez Guerrero</option>
                  <option value='Maderia Rual SA De CV'>Maderia Rual SA De CV</option>
                  <option value='Maderería Rual SA De CV'>Maderería Rual SA De CV</option>
                  <option value='Mangueras, Herramientas Y Equipos SA De CV'>Mangueras, Herramientas Y Equipos SA De CV</option>
                  <option value='Manuel Alejandro Calva Hinojosa'>Manuel Alejandro Calva Hinojosa</option>
                  <option value='Manuel Felix Durán Pérez'>Manuel Felix Durán Pérez</option>
                  <option value='Manuel Félix Duran Pérez'>Manuel Félix Duran Pérez</option>
                  <option value='Manuel García Guzmán'>Manuel García Guzmán</option>
                  <option value='Maquiladora Espani SA De CV'>Maquiladora Espani SA De CV</option>
                  <option value='Marcela Cerón Díaz'>Marcela Cerón Díaz</option>
                  <option value='Marcelo Ángeles Tivo'>Marcelo Ángeles Tivo</option>
                  <option value='Marco Antonio Hernández Gómez'>Marco Antonio Hernández Gómez</option>
                  <option value='Marco Antonio Hernández Monroy'>Marco Antonio Hernández Monroy</option>
                  <option value='Marco Antonio López Hernández'>Marco Antonio López Hernández</option>
                  <option value='Marco Antonio Reyes Hernández'>Marco Antonio Reyes Hernández</option>
                  <option value='María Alejandra Trejo García'>María Alejandra Trejo García</option>
                  <option value='María Catalina Martínez Guerrero'>María Catalina Martínez Guerrero</option>
                  <option value='María Cecilia Hernández Castillo'>María Cecilia Hernández Castillo</option>
                  <option value='María Concepción Hernández Aragón'>María Concepción Hernández Aragón</option>
                  <option value='María Del Carmen Quintero Bautista'>María Del Carmen Quintero Bautista</option>
                  <option value='María Del Mar Reyes Pérez Tagle'>María Del Mar Reyes Pérez Tagle</option>
                  <option value='María Del Rosario González Martínez'>María Del Rosario González Martínez</option>
                  <option value='María Del Socorro Chávez González'>María Del Socorro Chávez González</option>
                  <option value='María Erika Ángeles De Haro'>María Erika Ángeles De Haro</option>
                  <option value='María Guadalupe Dávila Hernández'>María Guadalupe Dávila Hernández</option>
                  <option value='María Guadalupe González Vargas'>María Guadalupe González Vargas</option>
                  <option value='María Guadalupe Salguero Hernández'>María Guadalupe Salguero Hernández</option>
                  <option value='María Isabel Teniente Llanos'>María Isabel Teniente Llanos</option>
                  <option value='María José Granillo Granillo'>María José Granillo Granillo</option>
                  <option value='María Leticia Aldana Ugalde'>María Leticia Aldana Ugalde</option>
                  <option value='María Luisa Martínez Ortega'>María Luisa Martínez Ortega</option>
                  <option value='María Ramírez Alvarado'>María Ramírez Alvarado</option>
                  <option value='María Sofía Escalante Reyes'>María Sofía Escalante Reyes</option>
                  <option value='María Teresa Oliver León'>María Teresa Oliver León</option>
                  <option value='María Trinidad Hernández Rodríguez'>María Trinidad Hernández Rodríguez</option>
                  <option value='Maribel Castro Ángeles'>Maribel Castro Ángeles</option>
                  <option value='Maribel Olvera Avilés'>Maribel Olvera Avilés</option>
                  <option value='Maribel Santos Bretado'>Maribel Santos Bretado</option>
                  <option value='Mario Luis Zacatenco Viornery'>Mario Luis Zacatenco Viornery</option>
                  <option value='Mario Rodríguez González'>Mario Rodríguez González</option>
                  <option value='Marisarcos Del Distrito Federal SA De CV'>Marisarcos Del Distrito Federal SA De CV</option>
                  <option value='Marisol Rivera Vazquez'>Marisol Rivera Vazquez</option>
                  <option value='Marlen Pelcastre Nochebuena'>Marlen Pelcastre Nochebuena</option>
                  <option value='Marlen Pérez Cervantes'>Marlen Pérez Cervantes</option>
                  <option value='Marressa Yuzim Picazo Cabrera'>Marressa Yuzim Picazo Cabrera</option>
                  <option value='Martin Márquez Loyola'>Martin Márquez Loyola</option>
                  <option value='Martin Vivar Cazañas'>Martin Vivar Cazañas</option>
                  <option value='Mary Carmen Ramírez Ríos'>Mary Carmen Ramírez Ríos</option>
                  <option value='Materiales Azulejos Sanitarios Y Ferretería SA De CV'>Materiales Azulejos Sanitarios Y Ferretería SA De CV</option>
                  <option value='Materiales Hermanos Roldan SA De CV'>Materiales Hermanos Roldan SA De CV</option>
                  <option value='Materiales Para Construcción SA De CV'>Materiales Para Construcción SA De CV</option>
                  <option value='Mauro Francisco López Castillo'>Mauro Francisco López Castillo</option>
                  <option value='Mayra Pérez Nájera'>Mayra Pérez Nájera</option>
                  <option value='Mayra Santa Madrigal Limón'>Mayra Santa Madrigal Limón</option>
                  <option value='Megapapelera Nixa'>Megapapelera Nixa</option>
                  <option value='Melo Cordero Leticia'>Melo Cordero Leticia</option>
                  <option value='Mendoza Tovar Palmira'>Mendoza Tovar Palmira</option>
                  <option value='Meneses Lozada Martin'>Meneses Lozada Martin</option>
                  <option value='Mercedes Citlalli Mendoza Meza'>Mercedes Citlalli Mendoza Meza</option>
                  <option value='Mi Casa'>Mi Casa</option>
                  <option value='Microvisa Mg Sa De CV'>Microvisa Mg Sa De CV</option>
                  <option value='MICROVISA MG SA DE CV'>MICROVISA MG SA DE CV</option>
                  <option value='Microvisa SA De CV'>Microvisa SA De CV</option>
                  <option value='Miguel Alejandro Flores Gomez'>Miguel Alejandro Flores Gomez</option>
                  <option value='Miguel Ángel Aguilar Hernández'>Miguel Ángel Aguilar Hernández</option>
                  <option value='Miguel Ángel Chávez Trejo'>Miguel Ángel Chávez Trejo</option>
                  <option value='Miguel Ángel Martínez Montiel'>Miguel Ángel Martínez Montiel</option>
                  <option value='Miguel Angel Perez Gonzalez'>Miguel Angel Perez Gonzalez</option>
                  <option value='Miguel Odon Olvera Pérez'>Miguel Odon Olvera Pérez</option>
                  <option value='Miguel Oscar De La Vega Bezies'>Miguel Oscar De La Vega Bezies</option>
                  <option value='Miguel Reyes Valdovinos'>Miguel Reyes Valdovinos</option>
                  <option value='Minerva Cruz Licona'>Minerva Cruz Licona</option>
                  <option value='Mirage Perisur'>Mirage Perisur</option>
                  <option value='Modesta López Canales'>Modesta López Canales</option>
                  <option value='Modesta Vázquez Carmona'>Modesta Vázquez Carmona</option>
                  <option value='Mofles González'>Mofles González</option>
                  <option value='Multiproductos de Leon SA De CV'>Multiproductos de Leon SA De CV</option>
                  <option value='Mundo De Mangueras Y Conexiones'>Mundo De Mangueras Y Conexiones</option>
                  <option value='Mundo Tool México SA De CV'>Mundo Tool México SA De CV</option>
                  <option value='Nadia Luisa Gavioto Romero'>Nadia Luisa Gavioto Romero</option>
                  <option value='Nallely Roldan Sosa'>Nallely Roldan Sosa</option>
                  <option value='Nami Pachuca, SA de CV'>Nami Pachuca, SA de CV</option>
                  <option value='Nancy Herrera Romero'>Nancy Herrera Romero</option>
                  <option value='Nancy Jaramillo Díaz'>Nancy Jaramillo Díaz</option>
                  <option value='Narciso Ortiz Velázquez'>Narciso Ortiz Velázquez</option>
                  <option value='Nayelhi Chávez Rodríguez'>Nayelhi Chávez Rodríguez</option>
                  <option value='Nayeli Alejandro Calva Hinojosa'>Nayeli Alejandro Calva Hinojosa</option>
                  <option value='Nikzor Travel Sa De CV'>Nikzor Travel Sa De CV</option>
                  <option value='Noé Olivia Ramírez Trejo'>Noé Olivia Ramírez Trejo</option>
                  <option value='Noé Olvera Meza'>Noé Olvera Meza</option>
                  <option value='Noel Chávez Martínez'>Noel Chávez Martínez</option>
                  <option value='Norma Salinas Alcántara'>Norma Salinas Alcántara</option>
                  <option value='Novedades Gastronómicas Reforma S. De RLL De CV'>Novedades Gastronómicas Reforma S. De RLL De CV</option>
                  <option value='Nueva Wal Mart De México, S. De RL De CV'>Nueva Wal Mart De México, S. De RL De CV</option>
                  <option value='Obed Hernández Carreto'>Obed Hernández Carreto</option>
                  <option value='Odt'>Odt</option>
                  <option value='Office Depot De México SA De CV'>Office Depot De México SA De CV</option>
                  <option value='Omaña Servicio A Equipo SA De CV'>Omaña Servicio A Equipo SA De CV</option>
                  <option value='Omar Daniel Hernández García'>Omar Daniel Hernández García</option>
                  <option value='Omar Guadalupe Cano Fragoso'>Omar Guadalupe Cano Fragoso</option>
                  <option value='Omar Pacheco Cortes Rangel'>Omar Pacheco Cortes Rangel</option>
                  <option value='Operadora Omx SA De CV'>Operadora Omx SA De CV</option>
                  <option value='Operadora Parador De San Javier SA De CV'>Operadora Parador De San Javier SA De CV</option>
                  <option value='Operadora Vips S De RL De CV'>Operadora Vips S De RL De CV</option>
                  <option value='Oscar Cruz Pérez'>Oscar Cruz Pérez</option>
                  <option value='Oscar Felipe Serrano Cruz'>Oscar Felipe Serrano Cruz</option>
                  <option value='Oscar Flores Rivera'>Oscar Flores Rivera</option>
                  <option value='Oscar Leopoldo Guasso Soto'>Oscar Leopoldo Guasso Soto</option>
                  <option value='Ovni Bus SA De CV'>Ovni Bus SA De CV</option>
                  <option value='Pablo Espinosa Acuña'>Pablo Espinosa Acuña</option>
                  <option value='Pachua-Actopan Ixmiquilpan SA De CV'>Pachua-Actopan Ixmiquilpan SA De CV</option>
                  <option value='Pai'>Pai</option>
                  <option value='Panadería Y Pastelería Geo SA De CV'>Panadería Y Pastelería Geo SA De CV</option>
                  <option value='Paola Romero Guerrero'>Paola Romero Guerrero</option>
                  <option value='Paquetexpress'>Paquetexpress</option>
                  <option value='Parrin SA De CV'>Parrin SA De CV</option>
                  <option value='Patricia Montejo Reyes'>Patricia Montejo Reyes</option>
                  <option value='Paxair De México SA De CV'>Paxair De México SA De CV</option>
                  <option value='Pedro Acosta Rodríguez'>Pedro Acosta Rodríguez</option>
                  <option value='Pedro Ángel Cabrera Ángeles'>Pedro Ángel Cabrera Ángeles</option>
                  <option value='Pérez Hernández Javier'>Pérez Hernández Javier</option>
                  <option value='Pérez Licona Eduardo'>Pérez Licona Eduardo</option>
                  <option value='Perkin-Elmer De Meico SA'>Perkin-Elmer De Meico SA</option>
                  <option value='Pétreos Las Glorias SA De CV'>Pétreos Las Glorias SA De CV</option>
                  <option value='Petreos Las Glorias, SA de CV'>Petreos Las Glorias, SA de CV</option>
                  <option value='Pétreos Sol SA De CV'>Pétreos Sol SA De CV</option>
                  <option value='Petreos Sol, SA de CV'>Petreos Sol, SA de CV</option>
                  <option value='Pinturas En General'>Pinturas En General</option>
                  <option value='Plásticos Jang'>Plásticos Jang</option>
                  <option value='Policía Industrial Bancaria del Estado de Hidalgo, SA de CV'>Policía Industrial Bancaria del Estado de Hidalgo, SA de CV</option>
                  <option value='Plomoelectrica DE Hhidalgo SA De CV'>Plomoelectrica DE Hhidalgo SA De CV</option>
                  <option value='Posadas De Latinoamerica SA De CV'>Posadas De Latinoamerica SA De CV</option>
                  <option value='Pr0ocomex Pachuca SA De CV'>Pr0ocomex Pachuca SA De CV</option>
                  <option value='PR0OCOMEX PACHUCA SADE CV'>PR0OCOMEX PACHUCA SADE CV</option>
                  <option value='Presidencia Municipal'>Presidencia Municipal</option>
                  <option value='Procomex De Pachuca SA De CV'>Procomex De Pachuca SA De CV</option>
                  <option value='Promogas SA De CV'>Promogas SA De CV</option>
                  <option value='Promotora De Autopistas Del Pacifico .SA De. CV'>Promotora De Autopistas Del Pacifico .SA De. CV</option>
                  <option value='Promotora De Desarrollo Hidalguense SA De SV'>Promotora De Desarrollo Hidalguense SA De SV</option>
                  <option value='Promotora Y Administrador De Carreteras SA De CV'>Promotora Y Administrador De Carreteras SA De CV</option>
                  <option value='Proyectos Y Construcciones Téllez-Islas'>Proyectos Y Construcciones Téllez-Islas</option>
                  <option value='Quintero Vega Irma Lilia'>Quintero Vega Irma Lilia</option>
                  <option value='Quiroz Nava Rodrigo'>Quiroz Nava Rodrigo</option>
                  <option value='Radio Shack De México SA De CV'>Radio Shack De México SA De CV</option>
                  <option value='Rafael De Jesús Aguirre Ramos'>Rafael De Jesús Aguirre Ramos</option>
                  <option value='Rafael Herrera Tanco'>Rafael Herrera Tanco</option>
                  <option value='Rafael Medina Ugalde'>Rafael Medina Ugalde</option>
                  <option value='Ramírez Arce Mónica'>Ramírez Arce Mónica</option>
                  <option value='Ramón Ensatiga Morales'>Ramón Ensatiga Morales</option>
                  <option value='Raúl Badillo Ramírez'>Raúl Badillo Ramírez</option>
                  <option value='Raúl Rivera Rodríguez'>Raúl Rivera Rodríguez</option>
                  <option value='Raúl Téllez Romero'>Raúl Téllez Romero</option>
                  <option value='Rebeca Rangel Copca'>Rebeca Rangel Copca</option>
                  <option value='Relleno Sanitario'>Relleno Sanitario</option>
                  <option value='Rembolso De Gasto Arrendamiento Huejutla'>Rembolso De Gasto Arrendamiento Huejutla</option>
                  <option value='Descanso. Mirage Guerrero'>Descanso. Mirage Guerrero</option>
                  <option value='Restaurante La Nacional'>Restaurante La Nacional</option>
                  <option value='Restaurante La Vega'>Restaurante La Vega</option>
                  <option value='Restaurante Quetos'>Restaurante Quetos</option>
                  <option value='Restaurante California SA De CV'>Restaurante California SA De CV</option>
                  <option value='Restaurante Colonial'>Restaurante Colonial</option>
                  <option value='Restaurante Familiar El Parador De San José'>Restaurante Familiar El Parador De San José</option>
                  <option value='Restaurante Genisa SA De CV'>Restaurante Genisa SA De CV</option>
                  <option value='Restaurante Gorditas La Guerra'>Restaurante Gorditas La Guerra</option>
                  <option value='Restaurante Mirage SA De CV'>Restaurante Mirage SA De CV</option>
                  <option value='Restaurante Terrassa De Mirage'>Restaurante Terrassa De Mirage</option>
                  <option value='Restaurantes California SA De CV'>Restaurantes California SA De CV</option>
                  <option value='Restaurantes Toks SA De CV'>Restaurantes Toks SA De CV</option>
                  <option value='Restaurantes Tu Lunch Sa De CV'>Restaurantes Tu Lunch Sa De CV</option>
                  <option value='Reyes Benítez Karla Leticia'>Reyes Benítez Karla Leticia</option>
                  <option value='Reyna Meneses Domínguez'>Reyna Meneses Domínguez</option>
                  <option value='Rhema Publicidad'>Rhema Publicidad</option>
                  <option value='Ricardo Jorge Gonzales Cortes'>Ricardo Jorge Gonzales Cortes</option>
                  <option value='Ricardo Lázaro Ludlow Zavaleta'>Ricardo Lázaro Ludlow Zavaleta</option>
                  <option value='Roberto Carlos López Mercado'>Roberto Carlos López Mercado</option>
                  <option value='Roberto González Hernández'>Roberto González Hernández</option>
                  <option value='Roberto Octavio Tripp Resendiz'>Roberto Octavio Tripp Resendiz</option>
                  <option value='Roberto Rodríguez Aguilar'>Roberto Rodríguez Aguilar</option>
                  <option value='Roberto Rodríguez Romero'>Roberto Rodríguez Romero</option>
                  <option value='Rodolfo García Flores'>Rodolfo García Flores</option>
                  <option value='Rodrigo Quiroz Guerrero'>Rodrigo Quiroz Guerrero</option>
                  <option value='Rodríguez García Edgar Fernando'>Rodríguez García Edgar Fernando</option>
                  <option value='Rodríguez Rendón Jesús'>Rodríguez Rendón Jesús</option>
                  <option value='Rodríguez Reyes Humberto'>Rodríguez Reyes Humberto</option>
                  <option value='Roesp Asociados SA De CV'>Roesp Asociados SA De CV</option>
                  <option value='Rogelio L. Moreno Arce'>Rogelio L. Moreno Arce</option>
                  <option value='Rogelio Leopoldo Moreno Arce'>Rogelio Leopoldo Moreno Arce</option>
                  <option value='Romel'>Romel</option>
                  <option value='Romero Hoyos Ana María'>Romero Hoyos Ana María</option>
                  <option value='Rosa María Lara Téllez'>Rosa María Lara Téllez</option>
                  <option value='Russel Barradaz Sanchez'>Russel Barradaz Sanchez</option>
                  <option value='Sabas Hernández Sánchez'>Sabas Hernández Sánchez</option>
                  <option value='Salvador Eric Rosas Villas'>Salvador Eric Rosas Villas</option>
                  <option value='Salvador Espinosa Arellano'>Salvador Espinosa Arellano</option>
                  <option value='Sanborn Hermanos SA'>Sanborn Hermanos SA</option>
                  <option value='Sandra De Elías Vichis'>Sandra De Elías Vichis</option>
                  <option value='Santos De La Paz SA De CV'>Santos De La Paz SA De CV</option>
                  <option value='Saúl Salinas González'>Saúl Salinas González</option>
                  <option value='Scden Sa De CV'>Scden Sa De CV</option>
                  <option value='SCDEN SA DE CV'>SCDEN SA DE CV</option>
                  <option value='Sergio Antonio Hernández Suárez'>Sergio Antonio Hernández Suárez</option>
                  <option value='Sergio Antonio Priego Reséndiz'>Sergio Antonio Priego Reséndiz</option>
                  <option value='Sergio Ashane Bulos'>Sergio Ashane Bulos</option>
                  <option value='Sergio Baca Olivo'>Sergio Baca Olivo</option>
                  <option value='Sergio Fernando González Cruz'>Sergio Fernando González Cruz</option>
                  <option value='Sergio Jesús Reyes Trejo'>Sergio Jesús Reyes Trejo</option>
                  <option value='Sergio Piña Delgado'>Sergio Piña Delgado</option>
                  <option value='Sergio Rivera Chapa'>Sergio Rivera Chapa</option>
                  <option value='Servicio Acapulco Diamante SA De CV'>Servicio Acapulco Diamante SA De CV</option>
                  <option value='Servicio También SA De CV'>Servicio También SA De CV</option>
                  <option value='Servicio Apan, SA de CV'>Servicio Apan, SA de CV</option>
                  <option value='Servicio Cúpula SA De CV'>Servicio Cúpula SA De CV</option>
                  <option value='Servicio El Once SA De CV'>Servicio El Once SA De CV</option>
                  <option value='Servicio Huichapan SA De CV'>Servicio Huichapan SA De CV</option>
                  <option value='Servicio Jacala SA De CV'>Servicio Jacala SA De CV</option>
                  <option value='Servicio Jacala, SA de CV'>Servicio Jacala, SA de CV</option>
                  <option value='Servicio La Fuente SA De CV'>Servicio La Fuente SA De CV</option>
                  <option value='Servicio La Loma SA De CV'>Servicio La Loma SA De CV</option>
                  <option value='Servicio Lara SA De CV'>Servicio Lara SA De CV</option>
                  <option value='Servicio Lara. SA de CV'>Servicio Lara. SA de CV</option>
                  <option value='Servicio Los Cues, SA de CV'>Servicio Los Cues, SA de CV</option>
                  <option value='Servicio Molango SA de CV'>Servicio Molango SA de CV</option>
                  <option value='Servicio Monteverde SA De CV'>Servicio Monteverde SA De CV</option>
                  <option value='Servicio Parador Santa Bárbara SA de CV'>Servicio Parador Santa Bárbara SA de CV</option>
                  <option value='Servicio Postal Mexicano'>Servicio Postal Mexicano</option>
                  <option value='Servicio Rangel SA De CV'>Servicio Rangel SA De CV</option>
                  <option value='Servicio Rangel, SA de CV'>Servicio Rangel, SA de CV</option>
                  <option value='SERVICIO SIOLEN'>SERVICIO SIOLEN</option>
                  <option value='Servicio Técnico De Hidalgo SA De CV'>Servicio Técnico De Hidalgo SA De CV</option>
                  <option value='SERVICIO TEOCALCO SA DE CV'>SERVICIO TEOCALCO SA DE CV</option>
                  <option value='Servicio Toda SA De CV'>Servicio Toda SA De CV</option>
                  <option value='Servicio Toda, SA de CV'>Servicio Toda, SA de CV</option>
                  <option value='SERVICIO XO SA. DE CV'>SERVICIO XO SA. DE CV</option>
                  <option value='Servicio Zacualtipan SA de CV'>Servicio Zacualtipan SA de CV</option>
                  <option value='Servicio Zacualtipán SA De CV'>Servicio Zacualtipán SA De CV</option>
                  <option value='Servicio Zacualtipan, SA de CV'>Servicio Zacualtipan, SA de CV</option>
                  <option value='SERVICIOS AUTOMOTRICES DE IXMIQUILPAN SACV'>SERVICIOS AUTOMOTRICES DE IXMIQUILPAN SACV</option>
                  <option value='SERVICIOS DE INGENIERIA NOAR SA DE CV'>SERVICIOS DE INGENIERIA NOAR SA DE CV</option>
                  <option value='Servicios Energéticos de Tizayuca, SA de CV'>Servicios Energéticos de Tizayuca, SA de CV</option>
                  <option value='Servicios Fayad Sa De CV'>Servicios Fayad Sa De CV</option>
                  <option value='Servicios Fayad, SA de CV'>Servicios Fayad, SA de CV</option>
                  <option value='Servigilga SA De CV'>Servigilga SA De CV</option>
                  <option value='SERVIPROGRESO SA DE CV'>SERVIPROGRESO SA DE CV</option>
                  <option value='Silverio Gonzalez Cuca'>Silverio Gonzalez Cuca</option>
                  <option value='Socorro García Ibarra'>Socorro García Ibarra</option>
                  <option value='Socorro Guadalupe Gómez Martínez'>Socorro Guadalupe Gómez Martínez</option>
                  <option value='Socorro Reséndiz Mancera'>Socorro Reséndiz Mancera</option>
                  <option value='Sofía Moedano Flores'>Sofía Moedano Flores</option>
                  <option value='Solano Gudiño María Elena'>Solano Gudiño María Elena</option>
                  <option value='Soluciones Hidraiulicas Arum SAS De CV'>Soluciones Hidraiulicas Arum SAS De CV</option>
                  <option value='Sonia Amparo Mota Olguín'>Sonia Amparo Mota Olguín</option>
                  <option value='Sotero Palacios Hernández'>Sotero Palacios Hernández</option>
                  <option value='Sotero Vega Ana'>Sotero Vega Ana</option>
                  <option value='Soto Arriaga Faustina'>Soto Arriaga Faustina</option>
                  <option value='Sue Ivalu Castillo Asuna'>Sue Ivalu Castillo Asuna</option>
                  <option value='Sumigas SA De CV'>Sumigas SA De CV</option>
                  <option value='Súper Papelera SA De CV'>Súper Papelera SA De CV</option>
                  <option value='Súper Servicio Meta SA De CV'>Súper Servicio Meta SA De CV</option>
                  <option value='Súper Servicio Rodríguez SA De CV'>Súper Servicio Rodríguez SA De CV</option>
                  <option value='Supplyco SA De CV'>Supplyco SA De CV</option>
                  <option value='Susana Peláez Lara'>Susana Peláez Lara</option>
                  <option value='Tahití Silvia Mayorga González'>Tahití Silvia Mayorga González</option>
                  <option value='Tania Gema Estrada Alamilla'>Tania Gema Estrada Alamilla</option>
                  <option value='Tania Vargar Sanchez'>Tania Vargar Sanchez</option>
                  <option value='Tapia Hernández Luz'>Tapia Hernández Luz</option>
                  <option value='Taquería El Mesón De Los Ángeles'>Taquería El Mesón De Los Ángeles</option>
                  <option value='Taquería No Que No'>Taquería No Que No</option>
                  <option value='Tarifa Promocional Xalapa- Veracruz'>Tarifa Promocional Xalapa- Veracruz</option>
                  <option value='TEQUIMEC S DE RL DE CV'>TEQUIMEC S DE RL DE CV</option>
                  <option value='Teresa Berenice Tovar Martínez'>Teresa Berenice Tovar Martínez</option>
                  <option value='Teresa Del Niño Jesús Carbajal'>Teresa Del Niño Jesús Carbajal</option>
                  <option value='Teresa Martínez Martínez'>Teresa Martínez Martínez</option>
                  <option value='Teresa Salgado García'>Teresa Salgado García</option>
                  <option value='Tiendas Comercial Mexicana SA De CV'>Tiendas Comercial Mexicana SA De CV</option>
                  <option value='Tiendas Chedrahui SA De CV'>Tiendas Chedrahui SA De CV</option>
                  <option value='Tiendas Soriana SA De CV'>Tiendas Soriana SA De CV</option>
                  <option value='Tiendas Soriana Sa De CV'>Tiendas Soriana Sa De CV</option>
                  <option value='Tintorería Del Norte Del Jardín Colon SA De CV'>Tintorería Del Norte Del Jardín Colon SA De CV</option>
                  <option value='Tintorerías Gofer SA De CV'>Tintorerías Gofer SA De CV</option>
                  <option value='Tlapalería Acosta'>Tlapalería Acosta</option>
                  <option value='Tomás Alejandro Herrera Pérez'>Tomás Alejandro Herrera Pérez</option>
                  <option value='Tomás Daniel Montes Silverio'>Tomás Daniel Montes Silverio</option>
                  <option value='Tomasa Villegas Lazcano'>Tomasa Villegas Lazcano</option>
                  <option value='Transportes Tepehuas'>Transportes Tepehuas</option>
                  <option value='Trico Pachuca SA De CV'>Trico Pachuca SA De CV</option>
                  <option value='Urbanos Y Suburbanos De Tula SA De CV'>Urbanos Y Suburbanos De Tula SA De CV</option>
                  <option value='Valores Energéticos SA De CV'>Valores Energéticos SA De CV</option>
                  <option value='Valle De Mixquiahuala'>Valle De Mixquiahuala</option>
                  <option value='Vanguardia Gastronómica Presidente SA De CV'>Vanguardia Gastronómica Presidente SA De CV</option>
                  <option value='Verificación Ambiental De Hidalgo SACV'>Verificación Ambiental De Hidalgo SACV</option>
                  <option value='Verónica Pérez Reyes'>Verónica Pérez Reyes</option>
                  <option value='VESALIUS SA DE CV'>VESALIUS SA DE CV</option>
                  <option value='Vianey Vega Maldonado'>Vianey Vega Maldonado</option>
                  <option value='Viaticum Valdespino SA De CV'>Viaticum Valdespino SA De CV</option>
                  <option value='Vicente Ruiz Tapia'>Vicente Ruiz Tapia</option>
                  <option value='Víctor Gerardo Zúñiga Aguirre'>Víctor Gerardo Zúñiga Aguirre</option>
                  <option value='Víctor Hernández Gómez'>Víctor Hernández Gómez</option>
                  <option value='Víctor Hugo Gallardo Garduño'>Víctor Hugo Gallardo Garduño</option>
                  <option value='Víctor Hugo Morgado Calva'>Víctor Hugo Morgado Calva</option>
                  <option value='VINIMED SA DE CV'>VINIMED SA DE CV</option>
                  <option value='Violeta Belen González Tapia'>Violeta Belen González Tapia</option>
                  <option value='Vulcanizador Y Seccionadora'>Vulcanizador Y Seccionadora</option>
                  <option value='El Chacón'>El Chacón</option>
                  <option value='Vulcanizadora'>Vulcanizadora</option>
                  <option value='Juan C. Doria'>Juan C. Doria</option>
                  <option value='Vymec Fuego SA De CV'>Vymec Fuego SA De CV</option>
                  <option value='Wenceslao Sanchez Estrada'>Wenceslao Sanchez Estrada</option>
                  <option value='Xochil Zenteno Velasco'>Xochil Zenteno Velasco</option>
                  <option value='Yadira Del Carmen Sánchez Nanduca'>Yadira Del Carmen Sánchez Nanduca</option>
                  <option value='Yahiti Silvia Mayorga González'>Yahiti Silvia Mayorga González</option>
                  <option value='Yamil Hernández García'>Yamil Hernández García</option>
                  <option value='Yessenia Zamora Soto'>Yessenia Zamora Soto</option>
                  <option value='Yolanda Aragón Quiroz'>Yolanda Aragón Quiroz</option>
                  <option value='Yolanda Felicitas Tenorio Vargas'>Yolanda Felicitas Tenorio Vargas</option>
                  <option value='Yolanda Samperio Delgadillo'>Yolanda Samperio Delgadillo</option>
                  <option value='Yuridia Laguna Peña'>Yuridia Laguna Peña</option>
                  <option value='Zehidy Ortiz Granillo'>Zehidy Ortiz Granillo</option>
                  <option value='Zoila Ángeles Tello'>Zoila Ángeles Tello</option>
                  <option value='Zulema Anahí Contreras Vizzuet'>Zulema Anahí Contreras Vizzuet</option>
                </select>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <input
                  className='field'
                  id='desc'
                  name='desc'
                  onChange={this.onChange}
                  required
                  ref='desc'
                  placeholder='descripcion'
                />
                <select style={{ background: 'white', fontSize: '1rem', textAlignLast: 'left', borderBottom: '1px solid grey', padding: '6px', width: '46%' }}>
                  <option></option>
                  <option value='AU001'>AU001</option>
                  <option value='AU002'>AU002</option>
                  <option value='AU003'>AU003</option>
                  <option value='AU004'>AU004</option>
                  <option value='AU005'>AU005</option>
                  <option value='AU007'>AU007</option>
                  <option value='AU009'>AU009</option>
                  <option value='AU010'>AU010</option>
                  <option value='AU011'>AU011</option>
                  <option value='AU012'>AU012</option>
                  <option value='AU014'>AU014</option>
                  <option value='AU015'>AU015</option>
                  <option value='AU016'>AU016</option>
                  <option value='AU017'>AU017</option>
                  <option value='AU018'>AU018</option>
                  <option value='AU019'>AU019</option>
                  <option value='AU020'>AU020</option>
                  <option value='AU021'>AU021</option>
                  <option value='AU023'>AU023</option>
                  <option value='AU024'>AU024</option>
                  <option value='AU025'>AU025</option>
                  <option value='AU026'>AU026</option>
                  <option value='AU027'>AU027</option>
                  <option value='A1D11'>A1D11</option>
                </select>
              </div>
            </Paper>
          </Grid>
          <Grid style={{ width: '100%', marginTop: '20px' }}>
            <Paper style={{ padding: '20px' }}>
              <div style={{ marginBottom: '15px' }}>Licitación</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '30px' }}>
                <input
                  className='field'
                  id='no_lici'
                  name='no_lici'
                  onChange={this.onChange}
                  ref='no_lici'
                />
                <input
                  className='field'
                  id='requisicion'
                  name='requisicion'
                  onChange={this.onChange}
                  ref='requisicion'
                />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <input
                  className='field'
                  id='pedido'
                  name='pedido'
                  onChange={this.onChange}
                  ref='pedido'
                />
                <input
                  className='field'
                  id='poliza'
                  name='poliza'
                  onChange={this.onChange}
                  ref='poliza'
                />
              </div>
            </Paper>
            <Paper style={{ padding: '20px', marginTop: '20px' }}>
              <div style={{ marginBottom: '15px' }}>Pago CFE</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '30px' }}>
                <input
                  className='field'
                  id='cfe'
                  name='cfe'
                  onChange={this.onChange}
                  ref='cfe'
                />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <input
                  className='field'
                  id='nscfe'
                  name='nscfe'
                  onChange={this.onChange}
                  ref='nscfe'
                />
                <input
                  className='field'
                  id='observaciones'
                  name='observaciones'
                  onChange={this.onChange}
                  ref='observaciones'
                />
              </div>
            </Paper>
          </Grid>
        </Grid>
        <div className='div-content-fab'>
          <Fab color='primary' aria-label='add' style={{ background: 'green' }}>
            <CheckIcon />
          </Fab>
        </div>
      </div>
    )
  }
}
