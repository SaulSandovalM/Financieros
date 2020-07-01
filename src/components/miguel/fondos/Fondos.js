import React, { Component } from 'react';
import './Fondos.css';
import firebase from '../../../Firebase';
import { NumberAsString } from './NumerosLetras.js';

export default class Archivos extends Component {
  constructor () {
    super()
    this.state = {
      contador: {},
      nFondo: '',
      fecha: '',
      tDoc: '',
      oAuto: '',
      nOficio: '',
      nLici: '',
      importe: '',
      iLetra: '',
      beneficiario: '',
      descripcion: '',
      realizo: ''
    }
  }

  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState(state);
  }

  resetForm() {
    this.refs.contactForm.reset();
  }

  sendMessage(e) {
    e.preventDefault();
    const params = {
      nFondo: this.inputnFondo.value,
      fecha: this.inputFecha.value,
      tDoc: this.inputtDoc.value,
      oAuto: this.inputoAuto.value,
      nOficio: this.inputnOficio.value,
      nLici: this.inputnLici.value,
      importe: this.inputImporte.value,
      iLetra: this.inputiLetra.value,
      beneficiario: this.inputBeneficiario.value,
      descripcion: this.inputDescripcion.value,
      realizo: this.inputRealizo.value
    };
    this.setState({
      nFondo: this.inputnFondo.value,
      fecha: this.inputFecha.value,
      tDoc: this.inputtDoc.value,
      oAuto: this.inputoAuto.value,
      nOficio: this.inputnOficio.value,
      nLici: this.inputnLici.value,
      importe: this.inputImporte.value,
      iLetra: this.inputiLetra.value,
      beneficiario: this.inputBeneficiario.value,
      descripcion: this.inputDescripcion.value,
      realizo: this.inputRealizo.value
    })
    if ( params.nFondo && params.fecha && params.tDoc && params.oAuto && params.nOficio &&
        params.nLici && params.importe && params.iLetra && params.beneficiario && params.descripcion && params.realizo ) {
      firebase.database().ref('fondos').push(params).then(() => {
        alert('Tu solicitud fue enviada.');
      }).catch(() => {
        alert('Tu solicitud no puede ser enviada');
      });
      this.resetForm();
      setInterval(this.consumo, 1000);
    } else {
      alert('Por favor llene el formulario');
    };
  }

  componentDidMount() {
    this.consumo();
  }

  consumo = () => {
    const ref = firebase.firestore().collection('fondos').doc('--stats--');
    ref.get().then((doc) => {
      if (doc.exists) {
        this.setState({
          contador: doc.data(),
          key: doc.id,
          isLoading: false
        });
      } else {
        console.log('No hay nada!');
      }
    })
  }

  render() {

    var user = firebase.auth().currentUser;
    var email;
    if (user != null) {
      email = user.email;
    }
    let admin;
    if (email === 'administrador@procu.com') {
      admin = 'ADMIN';
    } else if (email === 'nayra@procu.com') {
      admin = 'NAYRA';
    } else if (email === 'laura@procu.com') {
      admin = 'LAURA';
    } else if (email === 'miguel@procu.com') {
      admin = 'MIGUEL';
    } else if (email === 'teresa@procu.com') {
      admin = 'TERESA';
    } else if (email === 'marcos@procu.com') {
      admin = 'MARCOS';
    } else if (email === 'eloy@procu.com') {
      admin = 'ELOY';
    } else if (email === 'karina@procu.com') {
      admin = 'KARINA';
    } else if (email === 'martha@procu.com') {
      admin = 'MARTHA';
    } else if (email === 'lilia@procu.com') {
      admin = 'LILIA';
    } else if (email === 'cenely@procu.com') {
      admin = 'CENELY';
    } else if (email === 'hector@procu.com') {
      admin = 'HECTOR';
    } else if (email === 'omar@procu.com') {
      admin = 'OMAR';
    }
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1;
    var yyyy = today.getFullYear();
    if ( dd < 10 ){
      dd = '0' + dd
    }
    if ( mm < 10 ){
      mm = '0' + mm
    }
    today = yyyy + '-' + mm + '-' + dd;
    const { nFondo, fecha, tDoc, oAuto, nOficio, nLici, importe, iLetra, beneficiario, descripcion, realizo } = this.state;

    return (
      <div className='pf-container'>
        <div className='site-pf'>
          <p className='site-pf-s'><b>Fondos 2020</b></p>
        </div>
        <div className='space-fm' />
        <form className="fondos-back" onSubmit={this.onSubmit}>
          <div className='p-container-fondo'>
            <p className='p-title-margin-fondo'>Num. de Fondo</p>
            <input
              className='input-style-fr'
              id='nFondo'
              value={this.state.contador.nFondo}
              required
              ref={nFondo => this.inputnFondo = nFondo}
            />
          </div>
          <div className='p-container-fondo'>
            <p className='p-title-margin-fondo'>Fecha</p>
            <input
              type='date'
              className='input-style-fr'
              id='fecha'
              required
              ref={fecha => this.inputFecha = fecha}
            />
          </div>
          <div className='p-container-fondo'>
            <p className='p-title-margin-fondo'>Tipo de documento</p>
            <select
              className='input-style-fr'
              required
              ref={tDoc => this.inputtDoc = tDoc}>
              <option id='tDoc'>Pago Directo</option>
              <option id='tDoc'>Fondo Revolvente</option>
              <option id='tDoc'>Gasto a Comprobar</option>
              <option id='tDoc'>Cancelado</option>
            </select>
          </div>
          <div className='p-container-fondo'>
            <p className='p-title-margin-fondo'>Oficio de Autorización</p>
            <select
              className='input-style-fr'
              required
              ref={oAuto => this.inputoAuto = oAuto}>
              <option id='oAuto'>SFP-CPF-01-0020/2020</option>
              <option id='oAuto'>SFP-CPF-01-0010/2020</option>
              <option id='oAuto'>SFP-CPF-01-0724/2020</option>
              <option id='oAuto'>SFP-CPF-01-0681/2020</option>
              <option id='oAuto'>SFP-CPF-01-DFDP-0949/2020</option>
            </select>
          </div>
          <div className='p-container-fondo'>
            <p className='p-title-margin-fondo'>Num. de Oficio</p>
            <input
              className='input-style-fr'
              id='nOficio'
              required
              ref={nOficio => this.inputnOficio = nOficio}
            />
          </div>
          <div className='p-container-fondo'>
            <p className='p-title-margin-fondo'>Num. de Licitación</p>
            <input
              className='input-style-fr'
              id='nLici'
              required
              ref={nLici => this.inputnLici = nLici}
            />
          </div>
          <div className='p-container-fondo'>
            <p className='p-title-margin-fondo'>Importe</p>
            <input
              className='input-style-fr'
              id='importe'
              name='importe'
              value={importe}
              onChange={this.onChange}
              required
              ref={importe => this.inputImporte = importe}
            />
          </div>
          <div className='p-container-fondo'>
            <p className='p-title-margin-fondo'>Importe Letra</p>
            <input
              className='input-style-fr'
              name='iLetra'
              onChange={this.onChange}
              value={(NumberAsString(importe))}
              required
              ref='iLetra'
            />
          </div>
          <div className='p-container-fondo'>
            <p className='p-title-margin-fondo'>Beneficiario</p>
            <select
              className='input-style-fr'
              required
              ref={beneficiario => this.inputBeneficiario = beneficiario}>
              <option id='beneficiario'>Mtro.León Maximiliano Hernández Valdés</option>
              <option id='beneficiario'>Operadora Omx Sa De CV</option>
              <option id='beneficiario'>AASI INNOVACIONES SA DE CV</option>
              <option id='beneficiario'>Abigail Santillán Moreno</option>
              <option id='beneficiario'>Abraham Andrade Ortiz</option>
              <option id='beneficiario'>Abraham Peña Pérez</option>
              <option id='beneficiario'>Acabados Decorativos De La Huasteca SA De CV</option>
              <option id='beneficiario'>Aceites Y Combustibles Los Ángeles SA De CV</option>
              <option id='beneficiario'>Aceros Damarin SA De CV</option>
              <option id='beneficiario'>Adarick Vite Aranda</option>
              <option id='beneficiario'>Administradora De Centros Comerciales Santa Fe SA De CV</option>
              <option id='beneficiario'>ADOLFO PAZ RIANCHO</option>
              <option id='beneficiario'>Adrián Guevara Rivera</option>
              <option id='beneficiario'>Adrián Guillermo Cueto Hernández</option>
              <option id='beneficiario'>Adriana Ávila Rodríguez</option>
              <option id='beneficiario'>MOTOR AVANZADO REBUIDING SA DE CV</option>
              <option id='beneficiario'>Aeropuertos Y Servicios Auxiliares</option>
              <option id='beneficiario'>Aerovías De México Sa De CV</option>
              <option id='beneficiario'>Agaturismo SA De CV</option>
              <option id='beneficiario'>Aianeli SA De CV</option>
              <option id='beneficiario'>Aianeli SA De CV4</option>
              <option id='beneficiario'>Alberto Alfonso Galindo Galindo</option>
              <option id='beneficiario'>Alberto Severino Jaén Olivas</option>
              <option id='beneficiario'>Aldo Ramírez Cerón</option>
              <option id='beneficiario'>Aldo Román Mendoza García</option>
              <option id='beneficiario'>Alejandra López Alvarado</option>
              <option id='beneficiario'>Alex Steak SA De CV</option>
              <option id='beneficiario'>Alfredo Edmundo Galindo Pérez</option>
              <option id='beneficiario'>Alfredo Laris Hernández</option>
              <option id='beneficiario'>Alheli Paredes Licona</option>
              <option id='beneficiario'>Alma Gabriela Mendoza Rojas</option>
              <option id='beneficiario'>Alma Rosa Basilio Garfias</option>
              <option id='beneficiario'>Aluminio García</option>
              <option id='beneficiario'>Álvaro Samperio Le-Vinson</option>
              <option id='beneficiario'>Ana Fernanda Zapata Santana</option>
              <option id='beneficiario'>Ana Fernanda Zpata Santana</option>
              <option id='beneficiario'>Ana Laura Zacatenco Luna</option>
              <option id='beneficiario'>Ana María Hernández López</option>
              <option id='beneficiario'>Ana Perla Margarita Mendoza Espino</option>
              <option id='beneficiario'>Andrade Bertoloni Arturo</option>
              <option id='beneficiario'>Andrés Guillen Hernández</option>
              <option id='beneficiario'>Andrés Téllez Pino</option>
              <option id='beneficiario'>Ángela Pérez Prado</option>
              <option id='beneficiario'>Angélica González Sánchez</option>
              <option id='beneficiario'>Angélica Morales Avilés</option>
              <option id='beneficiario'>Angélica Sánchez Martínez</option>
              <option id='beneficiario'>Antojitos La Finca</option>
              <option id='beneficiario'>Antonio Lugo Rosas</option>
              <option id='beneficiario'>Aquilino Edgar Herrera Rodríguez</option>
              <option id='beneficiario'>Araceli Pérez Jarillo</option>
              <option id='beneficiario'>Arellano Miranda Elizabeth</option>
              <option id='beneficiario'>Arlan José Chávez Lara</option>
              <option id='beneficiario'>Arlette Macías Escorcia</option>
              <option id='beneficiario'>Armando Miguel Carpio López</option>
              <option id='beneficiario'>Arnulfo Ramírez Cerón</option>
              <option id='beneficiario'>Arturo Cano García</option>
              <option id='beneficiario'>Arturo Flores Meléndez</option>
              <option id='beneficiario'>Arturo Tinajero Jaimes</option>
              <option id='beneficiario'>Aseca, SA de CV</option>
              <option id='beneficiario'>Autobuses Coordinados Zimapan Valles</option>
              <option id='beneficiario'>Autobuses De Oriente Ado SA De CV</option>
              <option id='beneficiario'>Autobuses De Primera Clase</option>
              <option id='beneficiario'>Autobuses Estrella Blanca SA De CV</option>
              <option id='beneficiario'>Autobuses Estrella Blanca Sa De CV</option>
              <option id='beneficiario'>Autobuses México-Zamapan Valle Flecha Roja SA</option>
              <option id='beneficiario'>Autobuses Valle Mezquital S., A. De CV</option>
              <option id='beneficiario'>Autógena De Hidalgo SA De CV</option>
              <option id='beneficiario'>Autogena de Hidalgo, SA de CV</option>
              <option id='beneficiario'>Autopista Arco Norte Sa De CV</option>
              <option id='beneficiario'>Autopistas Arco Norte SA De CV</option>
              <option id='beneficiario'>Autos Pullman Sa De CV</option>
              <option id='beneficiario'>Autoservicio Jocaran de Progreso, SA de CV</option>
              <option id='beneficiario'>Autoservicio Jocaran SA de CV</option>
              <option id='beneficiario'>Autotransportes De Hidalgo .SA De CV</option>
              <option id='beneficiario'>Autotransportes Del Valle Del Mezquital SA De CV</option>
              <option id='beneficiario'>Autovía Necaxa-Tihuatlan Sa De CV</option>
              <option id='beneficiario'>Autozone De México, S. De RL De CV</option>
              <option id='beneficiario'>Banco Mercantil Del Norte SA De CV</option>
              <option id='beneficiario'>Basualdo Rojo Honey</option>
              <option id='beneficiario'>Beatriz Montaño Jarillo</option>
              <option id='beneficiario'>Beatriz Penélope Isleim Castorena Cortes</option>
              <option id='beneficiario'>Bensaa SA De CV</option>
              <option id='beneficiario'>Berenice Soto Hernández</option>
              <option id='beneficiario'>Bianca Ofelia Galarza Trejo</option>
              <option id='beneficiario'>Blanca Trejo Bautista</option>
              <option id='beneficiario'>Brenda Alemon Hernández</option>
              <option id='beneficiario'>Brenda Leticia Rangel Lugo</option>
              <option id='beneficiario'>Brenda Minelly López López</option>
              <option id='beneficiario'>Burger La Fiesta</option>
              <option id='beneficiario'>C Frank Alexander Veytia ViejoIEJO</option>
              <option id='beneficiario'>C. Adolfo Paz Riancho</option>
              <option id='beneficiario'>C. Alejandra Fonseca Rincon</option>
              <option id='beneficiario'>C. Carlos Haua Bulos</option>
              <option id='beneficiario'>C. Claudi Ramirez Lopez</option>
              <option id='beneficiario'>C. Efren Rodriguez Ramierez</option>
              <option id='beneficiario'>C. Elizabeth Arellano Miranda</option>
              <option id='beneficiario'>C. Erika Jazimin Resendiz Trejo</option>
              <option id='beneficiario'>C. Frank Alexander Veytia Viejo</option>
              <option id='beneficiario'>C. Ines Cruz Hunter</option>
              <option id='beneficiario'>C. Javier Santa Cruz Garcia</option>
              <option id='beneficiario'>C. Jose Luis Magaña Cabrera</option>
              <option id='beneficiario'>C. Jose Luis Zacatenco Lopez</option>
              <option id='beneficiario'>C. Jose solis Gonzalez</option>
              <option id='beneficiario'>C. Leticia Saavedra Nesbaid</option>
              <option id='beneficiario'>C. Luis Eduardo Nahle Pascual</option>
              <option id='beneficiario'>C. Maria De Rosario Gomez Urbina</option>
              <option id='beneficiario'>C. Russel Barradaz Sanchez</option>
              <option id='beneficiario'>C. Saul Salinas Gonzalez</option>
              <option id='beneficiario'>C. Silverio Gonzalez Cuca</option>
              <option id='beneficiario'>C. Wencesñap Sanchez Estrada</option>
              <option id='beneficiario'>C.Lesticia Saavedra Nesbaid</option>
              <option id='beneficiario'>Cadena Comercial Oxxo Sa De CV</option>
              <option id='beneficiario'>Cadena Comercial Oxxo, Sa De CV</option>
              <option id='beneficiario'>Café Estaciones</option>
              <option id='beneficiario'>CAMINO REAL</option>
              <option id='beneficiario'>CAMINOS Y PUENTES FEDERALES</option>
              <option id='beneficiario'>Caminos Y Puentes Federales De Ingresos Y Servicios Conexos</option>
              <option id='beneficiario'>LAVADO DE COCHES LA CUBETA DIGITAL</option>
              <option id='beneficiario'>CARBU EXPRESS, SA DE CV</option>
              <option id='beneficiario'>CARLOS ANTONIO MORALES GARZA</option>
              <option id='beneficiario'>CARLOS ANTONIO QUINTO RIOS</option>
              <option id='beneficiario'>Carlos Antonio Quinto Ríos</option>
              <option id='beneficiario'>CARLOS CELIO ESQUIVEL</option>
              <option id='beneficiario'>Carlos Daniel Ortiz Chavez</option>
              <option id='beneficiario'>Carlos Godinez Perez</option>
              <option id='beneficiario'>Carlos Godínez Pérez</option>
              <option id='beneficiario'>Carlos Haua Bulos</option>
              <option id='beneficiario'>Carlos Luis Gómez Arguelles</option>
              <option id='beneficiario'>Carlos Martin Torres Juárez</option>
              <option id='beneficiario'>Carlos Primitivo Vega Valle</option>
              <option id='beneficiario'>Carreteras Del Pacifico</option>
              <option id='beneficiario'>Caseta Metlapil</option>
              <option id='beneficiario'>Caseta Miradores</option>
              <option id='beneficiario'>Catalina Martínez Guerrero</option>
              <option id='beneficiario'>Cecapiem SA De CV</option>
              <option id='beneficiario'>Cele Filiberto Martínez Cordero</option>
              <option id='beneficiario'>Celia Esparza Loreto</option>
              <option id='beneficiario'>Centro De Copiado</option>
              <option id='beneficiario'>Centro de verificación De Verificación Takechi ​​SA de CV</option>
              <option id='beneficiario'>Cerrajería Aranda</option>
              <option id='beneficiario'>Cerrajería Móvil El Saucillo</option>
              <option id='beneficiario'>Cerro De Biznagas S, A De CV</option>
              <option id='beneficiario'>CFE Suministridor De Servicios BasicosS</option>
              <option id='beneficiario'>City Club</option>
              <option id='beneficiario'>Claudia Corte Herrera</option>
              <option id='beneficiario'>Claudia Judith Flores Leyva</option>
              <option id='beneficiario'>Claudia Mota Rojas</option>
              <option id='beneficiario'>Claudia Ramierez Lopez</option>
              <option id='beneficiario'>Claudia Ramírez López</option>
              <option id='beneficiario'>Cocina Económica La Güerita</option>
              <option id='beneficiario'>Cocina Económica La Parroquia</option>
              <option id='beneficiario'>Cocina Tradicional Campestre De 1981</option>
              <option id='beneficiario'>Coel SA De CV</option>
              <option id='beneficiario'>Com. De Agua Pot. Alcant Y san. Del Mpio De Huichapan</option>
              <option id='beneficiario'>Combustibles Bentan SA DE CV</option>
              <option id='beneficiario'>Combustibles De Pachuca SA De CV</option>
              <option id='beneficiario'>Combustibles Rumloc SA De CV</option>
              <option id='beneficiario'>Comercial Mexicana</option>
              <option id='beneficiario'>Comercial Miura SA DE CV (Sistema De Vigilancia)</option>
              <option id='beneficiario'>Comercializadora Farmacéutica De Chiapas Sapi De CV</option>
              <option id='beneficiario'>Comercializadora Y Distribuidora Brime SA De CV</option>
              <option id='beneficiario'>Comisión Bancaria</option>
              <option id='beneficiario'>Comisión De Agua De Actopan</option>
              <option id='beneficiario'>Comisión De Agua De Actopan Hgo</option>
              <option id='beneficiario'>Comisión De Agua De Tula De Allende</option>
              <option id='beneficiario'>Comisión De Agua De Zimapan</option>
              <option id='beneficiario'>Comisión De Agua Huichapan</option>
              <option id='beneficiario'>Comisión De Agua Ixmiquilpan</option>
              <option id='beneficiario'>Comisión De Agua Mixquiahuala De Juárez</option>
              <option id='beneficiario'>Comisión De Agua Pachuca</option>
              <option id='beneficiario'>Comisión De Agua Potable Y Alcantarillado Del Municipio De Mixquiahuala De Juarez</option>
              <option id='beneficiario'>Comisión De Agua Potable, Alcantarillado Y Saneamiento Del Municipio De Ixmiquilpan, Hgo</option>
              <option id='beneficiario'>Comisión De Agua Potable, Alcantarillado Y Saneamiento Del Municipio De Zimapan, Hgo</option>
              <option id='beneficiario'>Comisión de Agua y Alcantarillado De Sistemas Intermunicipales</option>
              <option id='beneficiario'>Comisión De Agua Y Alcantarillado Del Municipio De Actopan Hidalgo</option>
              <option id='beneficiario'>Comisión De Agua Y Alcantarillado Del Municipio De Tula De Allende</option>
              <option id='beneficiario'>Comisión Federal De Electricidad</option>
              <option id='beneficiario'>Compañía Santa María SA De CV</option>
              <option id='beneficiario'>Concesionaria Autopista Perote-Xalapa.</option>
              <option id='beneficiario'>Concesionaria De Vías Troncales SA De CV</option>
              <option id='beneficiario'>Concesionaria Mexiquense SA De CV</option>
              <option id='beneficiario'>Concesiones Y Promociones Malibran</option>
              <option id='beneficiario'>Conexiones Y Mangueras De Pachuca SA De C V.</option>
              <option id='beneficiario'>Consultora Informática</option>
              <option id='beneficiario'>CONTEXPRESS S DE RL DE CV</option>
              <option id='beneficiario'>Copias Neo SA De CV</option>
              <option id='beneficiario'>Copicentro Pachuca</option>
              <option id='beneficiario'>Corporativo Farmacias Mas SA De CV</option>
              <option id='beneficiario'>Corporativo Yunes Márquez SA De CV</option>
              <option id='beneficiario'>Corte Herrera Claudia</option>
              <option id='beneficiario'>Cortesía En Viajes S. De RL De CV</option>
              <option id='beneficiario'>CRIMELAB SA DE CV</option>
              <option id='beneficiario'>Cristina González Cantera</option>
              <option id='beneficiario'>Curso 'El Delito De Feminicidio'</option>
              <option id='beneficiario'>Cutberto Rodríguez Álvarez</option>
              <option id='beneficiario'>Cynper SA De CV</option>
              <option id='beneficiario'>China Town</option>
              <option id='beneficiario'>Dagoberto Mendoza Morales</option>
              <option id='beneficiario'>Daniel García Luna</option>
              <option id='beneficiario'>Daniel Becerra Castañeda</option>
              <option id='beneficiario'>Daniel García Luna</option>
              <option id='beneficiario'>Daniel López Carrasco</option>
              <option id='beneficiario'>Daniel Miramontes Flores</option>
              <option id='beneficiario'>Daniel Zarate Santiago</option>
              <option id='beneficiario'>David Adrián Martínez Santiago</option>
              <option id='beneficiario'>David Richard Uribe</option>
              <option id='beneficiario'>De Tula De Allende, Hgo.</option>
              <option id='beneficiario'>Delia Serrano Morales</option>
              <option id='beneficiario'>Deportes Pachuca SA De CV</option>
              <option id='beneficiario'>Desarrollo Hotelero De Plaza Pachuca Sa</option>
              <option id='beneficiario'>DEVSOFT SA DE CV</option>
              <option id='beneficiario'>Dhl Exprés México SA De CV</option>
              <option id='beneficiario'>Diana Araceli Zaldívar Cruz</option>
              <option id='beneficiario'>Diana Gálvez Mendoza</option>
              <option id='beneficiario'>Diego Alberto Acevedo De La Rosa</option>
              <option id='beneficiario'>Diego Alberto Espinosa Islas</option>
              <option id='beneficiario'>Dilia Ramos Montaño</option>
              <option id='beneficiario'>Distribuciones Mogu SA DE CV</option>
              <option id='beneficiario'>Distribuidora De Abarrotes Y Semillas De Pachuca SA De CV</option>
              <option id='beneficiario'>Distribuidora De Alimentos Th, SA De CV</option>
              <option id='beneficiario'>Distribuidora Del Manual Moderno SA De CV</option>
              <option id='beneficiario'>Distribuidora El Manual Moderno SA De CV</option>
              <option id='beneficiario'>Distribuidora Fragoso</option>
              <option id='beneficiario'>Domínguez Díaz Daniel</option>
              <option id='beneficiario'>Drícela Austria Serna</option>
              <option id='beneficiario'>Drivecare, SA de CV</option>
              <option id='beneficiario'>Dulce María Calva Sánchez</option>
              <option id='beneficiario'>Edgar Aquilino Herrera Rodríguez</option>
              <option id='beneficiario'>Edgar Dante Rosas Islas</option>
              <option id='beneficiario'>Edgar Mendoza Ceron</option>
              <option id='beneficiario'>Edgar Rabindranath Valdespino Zubieta</option>
              <option id='beneficiario'>Edith Rojas Camacho</option>
              <option id='beneficiario'>Edmundo Alfredo Galindo Pérez</option>
              <option id='beneficiario'>Edson Aguilar Romero</option>
              <option id='beneficiario'>El Palacio De Hierro SA De CV</option>
              <option id='beneficiario'>El Parador De San José</option>
              <option id='beneficiario'>El Pelón Dulcerías</option>
              <option id='beneficiario'>el rincon de periban</option>
              <option id='beneficiario'>El Rincón De Periban</option>
              <option id='beneficiario'>Elda Ceseña Banquera</option>
              <option id='beneficiario'>Eléctrica Ángeles</option>
              <option id='beneficiario'>Eléctrica Barba SA De CV</option>
              <option id='beneficiario'>Electro pura S. De RL De CV</option>
              <option id='beneficiario'>Electropura S. De RL De CV</option>
              <option id='beneficiario'>Elfego Baltazar Piña Verde</option>
              <option id='beneficiario'>Eli Rodríguez Del Ángel</option>
              <option id='beneficiario'>Elideth Sarahi Dorantes López</option>
              <option id='beneficiario'>Elisa Ramírez Escamilla</option>
              <option id='beneficiario'>Eliseo Martínez Ballesteros</option>
              <option id='beneficiario'>Eliu Morales Fragoso</option>
              <option id='beneficiario'>Elizabeth Arellano Miranda</option>
              <option id='beneficiario'>Elizabeth Salinas Aguilar</option>
              <option id='beneficiario'>Elizabeth Troncoso Escamilla</option>
              <option id='beneficiario'>Eloísa Camargo Hernández</option>
              <option id='beneficiario'>Elsa Patricia Rodríguez Reyes</option>
              <option id='beneficiario'>Emilio Prieto Perez</option>
              <option id='beneficiario'>Emilio Prieto Pérez</option>
              <option id='beneficiario'>Emmanuel Ceseña Barquera</option>
              <option id='beneficiario'>Envasadoras De Aguas En México S. De RL De CV (Bonafont)</option>
              <option id='beneficiario'>Eric Salvador Rosas Villa</option>
              <option id='beneficiario'>Erick Jovanni Flores Varela</option>
              <option id='beneficiario'>Erick Mendoza Hernández</option>
              <option id='beneficiario'>Erick Salvador Rosas Villa</option>
              <option id='beneficiario'>Erika Cruz Pérez</option>
              <option id='beneficiario'>ERIKA JAZMIN RESENDIZ TREJO</option>
              <option id='beneficiario'>Ernesto Skewes López</option>
              <option id='beneficiario'>Esli Domínguez Trejo</option>
              <option id='beneficiario'>Especialistas en Alta Cocina SA De CV (Wings)</option>
              <option id='beneficiario'>Esperanza González Díaz</option>
              <option id='beneficiario'>Espinosa Ostos Blanca Deyanira</option>
              <option id='beneficiario'>Estación Acevedo S. De RL</option>
              <option id='beneficiario'>Estación De Servicio Ana SA De CV</option>
              <option id='beneficiario'>Estación De Servicio Ariel SA De CV</option>
              <option id='beneficiario'>Estación de Servicio EMAJUFH SA de CV</option>
              <option id='beneficiario'>Estación De Servicio La Mora</option>
              <option id='beneficiario'>Estación De Servicios Gesa SA De CV</option>
              <option id='beneficiario'>Estación Real De La Plata SA De CV</option>
              <option id='beneficiario'>Estación Santa María La Providencia SA De CV</option>
              <option id='beneficiario'>Estación Valle Dorado SA De CV</option>
              <option id='beneficiario'>Estacionamiento La Posta</option>
              <option id='beneficiario'>Esteban Leopoldo Cartelazo Islas</option>
              <option id='beneficiario'>Esteban Leopoldo Castelazo Islas</option>
              <option id='beneficiario'>Eugenia Vite Silvestre</option>
              <option id='beneficiario'>Eva Pérez Hernández</option>
              <option id='beneficiario'>Eva Rivera Samitez</option>
              <option id='beneficiario'>Fabián Bernardo Moreno Gómez</option>
              <option id='beneficiario'>FABIOLA GONZALEZ OROZCO</option>
              <option id='beneficiario'>Fabiola Santillán García</option>
              <option id='beneficiario'>Farmacias Guadalajara SA De CV</option>
              <option id='beneficiario'>Farum Servicios SA De CV</option>
              <option id='beneficiario'>Fejsa Computaion Y Oficinas De Pachuca SA De CV</option>
              <option id='beneficiario'>FELIPE JIMENEZ GUTIERREZ</option>
              <option id='beneficiario'>Felipe Jiménez Gutiérrez</option>
              <option id='beneficiario'>Felipe Simón Olvera Castelán</option>
              <option id='beneficiario'>Felisa Lugo Chavero</option>
              <option id='beneficiario'>Feliz Ernesto Reyes Molina</option>
              <option id='beneficiario'>Fernando Hidalgo Vergara</option>
              <option id='beneficiario'>Ferre hogar</option>
              <option id='beneficiario'>Ferretería Y Plomería Casa Martínez</option>
              <option id='beneficiario'>Fideicomiso Autopistas Y Puentes Del Golfo Centro</option>
              <option id='beneficiario'>Fierros Y Laminas De Pachuca SA De CV.</option>
              <option id='beneficiario'>Fiesta Inn Pachuca</option>
              <option id='beneficiario'>Filiberto Barrera Dávila</option>
              <option id='beneficiario'>Flor Eugenia Vargas Herrera</option>
              <option id='beneficiario'>Fondo Nacional De Infraestructura</option>
              <option id='beneficiario'>Forlac Store SA De CV</option>
              <option id='beneficiario'>Francisca Quiroz Uribe</option>
              <option id='beneficiario'>Francisco Raúl García Bolio</option>
              <option id='beneficiario'>Francisco Ventura Martínez</option>
              <option id='beneficiario'>Fuente De Sodas Chino´S</option>
              <option id='beneficiario'>Gabriel López Hernández</option>
              <option id='beneficiario'>Gabriela Romero Campos</option>
              <option id='beneficiario'>Manual García Moreno Víctor</option>
              <option id='beneficiario'>Garza Gas De Hidalgo SA De CV</option>
              <option id='beneficiario'>Gas De Provincia Sa De CV</option>
              <option id='beneficiario'>Gas Fast SA De CV</option>
              <option id='beneficiario'>Gas Imperial De Axapusco SA De CV</option>
              <option id='beneficiario'>Gasamake SA De CV</option>
              <option id='beneficiario'>Gasolineria Agua Blanca SA De CV</option>
              <option id='beneficiario'>Gasolineria Rodjaq SA De CV</option>
              <option id='beneficiario'>Gasomer SA De CV</option>
              <option id='beneficiario'>Gastrosur SA De CV</option>
              <option id='beneficiario'>Genaro Oswaldo Márquez Gutiérrez</option>
              <option id='beneficiario'>Germa Mantenimiento Y Diseño SA De CV</option>
              <option id='beneficiario'>Gertell Combustibles SA De CV</option>
              <option id='beneficiario'>Gibran Copca Chávez</option>
              <option id='beneficiario'>Gilberto Bárcenas López</option>
              <option id='beneficiario'>Gilberto Espinosa Ramírez</option>
              <option id='beneficiario'>Gloríela Islas Sosa</option>
              <option id='beneficiario'>Gobierno Del Df Curso Delito De Feminicidio</option>
              <option id='beneficiario'>Gobierno del Estado de Veracruz</option>
              <option id='beneficiario'>González Islas Bernardo</option>
              <option id='beneficiario'>Graciela Moreno Arce</option>
              <option id='beneficiario'>Graciela Moreno Rodríguez</option>
              <option id='beneficiario'>Graciela Taide Quiroz Gutiérrez</option>
              <option id='beneficiario'>Grupo Autopistas Nacionales SA De CV</option>
              <option id='beneficiario'>Grupo Autopistas Nacionales, Sa De CV</option>
              <option id='beneficiario'>Grupo Bekim Empresarial S DE RL DE CV</option>
              <option id='beneficiario'>Grupo Cravioto Distribuciones SA De CV</option>
              <option id='beneficiario'>Grupo Estrella Blanca SA De CV</option>
              <option id='beneficiario'>Grupo Galume SA De CV</option>
              <option id='beneficiario'>Grupo Helen Gasolinera Excelencia y Calidad SA de CV</option>
              <option id='beneficiario'>Grupo O Port SA De CV</option>
              <option id='beneficiario'>Grupo Parisina SA De CV</option>
              <option id='beneficiario'>Grupo Suzuka Argenta SA De CV</option>
              <option id='beneficiario'>Guadalupe Hernández Escamilla</option>
              <option id='beneficiario'>Guillermo Harold Barría García</option>
              <option id='beneficiario'>Gustavo Said Gonzalez Tapia</option>
              <option id='beneficiario'>Gustavo Trejo Montalvo</option>
              <option id='beneficiario'>Gutiérrez Rodríguez Juan Ramón</option>
              <option id='beneficiario'>Guy Jesús Quijano Austria</option>
              <option id='beneficiario'>H. Roberto Aguilar Galindo</option>
              <option id='beneficiario'>Hacienda Yextho</option>
              <option id='beneficiario'>Hacobo Flores Pérez</option>
              <option id='beneficiario'>Héctor Santos González Reyes</option>
              <option id='beneficiario'>Heriberto Padilla Contreras</option>
              <option id='beneficiario'>Herlaz Sistemas de Comunicación SA De CV</option>
              <option id='beneficiario'>HERLAZ SISTEMAS DE COMUNICACIÓN SA DE CV</option>
              <option id='beneficiario'>Herlaz Sistemas De Comunicación, Sa De CV</option>
              <option id='beneficiario'>Hermelinda Peña Hernández</option>
              <option id='beneficiario'>Hernández Valencia Rosalía</option>
              <option id='beneficiario'>Herrera Motors De Hidalgo SA De CV</option>
              <option id='beneficiario'>Herrera Motors De Hidalgo SA De CV</option>
              <option id='beneficiario'>Restaurante Hidalgo Platillos Regionales</option>
              <option id='beneficiario'>Hidrocarburos Hidalgo S, .A De CV</option>
              <option id='beneficiario'>Hidrocarburos Santa Catarina SA De CV</option>
              <option id='beneficiario'>Hidrosina Plus SA De CV</option>
              <option id='beneficiario'>Hilda Lorena Torres Guerrero</option>
              <option id='beneficiario'>Home Depot México S De RL De CV</option>
              <option id='beneficiario'>Hotel Y Restaurante Tezoli</option>
              <option id='beneficiario'>Hoteles Eco turísticos Mexicanos SA De CV</option>
              <option id='beneficiario'>Hoteles Sheraton S. De RL De CV</option>
              <option id='beneficiario'>Huichapan Hgo</option>
              <option id='beneficiario'>Impulsora De Transportes Mexicanos SA De CV</option>
              <option id='beneficiario'>Industrias Long Meng S. De RL Mi</option>
              <option id='beneficiario'>Ines Cruz Hunter</option>
              <option id='beneficiario'>Ing. Rogelio Alberto Téllez Rojo</option>
              <option id='beneficiario'>Ingrid Minerva Rodríguez Vera</option>
              <option id='beneficiario'>Interhidalguenses</option>
              <option id='beneficiario'>Irving Ortiz Flores</option>
              <option id='beneficiario'>Isidro Granados Guerra</option>
              <option id='beneficiario'>Israel Islas Castañeda</option>
              <option id='beneficiario'>Iván Ramírez Hernández</option>
              <option id='beneficiario'>Ivonne Munguía Becerra</option>
              <option id='beneficiario'>J. Irais González García</option>
              <option id='beneficiario'>Jacobo Flores Pérez</option>
              <option id='beneficiario'>Jaime Zapata Venegas</option>
              <option id='beneficiario'>Janeth Olvera Salinas</option>
              <option id='beneficiario'>Jaqueline Gálvez De La Peña</option>
              <option id='beneficiario'>Javier González Mejía</option>
              <option id='beneficiario'>JAVIER LEO CUEVAS</option>
              <option id='beneficiario'>Javier Rodríguez Robles</option>
              <option id='beneficiario'>Javier Santa Cruz Garcia</option>
              <option id='beneficiario'>Javier Santacruz García</option>
              <option id='beneficiario'>Jessica Denisse Zuñiga Rosales</option>
              <option id='beneficiario'>Jesús Elías Salinas Baños</option>
              <option id='beneficiario'>Jesús Ríos Islas</option>
              <option id='beneficiario'>Joao Israel Villegas Trejo</option>
              <option id='beneficiario'>Joaquín Escobar Baños</option>
              <option id='beneficiario'>Johanna Beatriz Hidalgo Hernández</option>
              <option id='beneficiario'>Jorge Erick Piña Vite</option>
              <option id='beneficiario'>Jorge Vargas Martínez</option>
              <option id='beneficiario'>Jose Alfonso López Rubio</option>
              <option id='beneficiario'>José Alfredo Elizalde Hernández</option>
              <option id='beneficiario'>José Antonio Calderón López</option>
              <option id='beneficiario'>José Antonio Jiménez Rodríguez</option>
              <option id='beneficiario'>JOSE ANTONIO SILVA MORENO</option>
              <option id='beneficiario'>José Armando Reyes Samperio</option>
              <option id='beneficiario'>José Augusto Fuentes Marín</option>
              <option id='beneficiario'>José Carlos Vargas Bonetta</option>
              <option id='beneficiario'>José De Jesús Franco Solís</option>
              <option id='beneficiario'>José De Jesús López Peña</option>
              <option id='beneficiario'>José González Beltrána</option>
              <option id='beneficiario'>José Guadalupe Sánchez Guerrero</option>
              <option id='beneficiario'>Jose Ivan Gutierrez Najera</option>
              <option id='beneficiario'>José Jaime Acosta Castro</option>
              <option id='beneficiario'>José Juan Moreno Valle</option>
              <option id='beneficiario'>José Luis Hernández Rosales</option>
              <option id='beneficiario'>José Luis Hidalgo López</option>
              <option id='beneficiario'>JOSE LUIS MAGAÑA CABRERA</option>
              <option id='beneficiario'>José Luis Salinas Elizalde</option>
              <option id='beneficiario'>José Luis Serrano Arroyo</option>
              <option id='beneficiario'>JOSE LUIS ZACATENCO LOPEZ</option>
              <option id='beneficiario'>José Luis Zacatenco López</option>
              <option id='beneficiario'>José Manuel Hernández Hernández</option>
              <option id='beneficiario'>JOSE NERI ISLAS MARTINEZ</option>
              <option id='beneficiario'>José Román Cárdenas Pizano</option>
              <option id='beneficiario'>Jose Roman Pizano Caredenas</option>
              <option id='beneficiario'>Jose Solis Gonzalez</option>
              <option id='beneficiario'>José Solís Gonzále</option>
              <option id='beneficiario'>Josselin Sixto Ruiz</option>
              <option id='beneficiario'>Juan Alberto Peralta Vázquez</option>
              <option id='beneficiario'>Juan Carlos Ángeles Baltazar</option>
              <option id='beneficiario'>Juan Carlos Salinas Rodríguez</option>
              <option id='beneficiario'>Juan Carlos Vergara Bonneta</option>
              <option id='beneficiario'>Juan Gustavo Perez Gónzalez</option>
              <option id='beneficiario'>Juan Hernández Olvera</option>
              <option id='beneficiario'>Juan Iv Rodríguez Sánchez</option>
              <option id='beneficiario'>Juan Leticia Elizalde Zendejas</option>
              <option id='beneficiario'>Juan Manuel García Guzmán</option>
              <option id='beneficiario'>Juan Manuel García Guzmán</option>
              <option id='beneficiario'>Juan Manuel García Hernández</option>
              <option id='beneficiario'>Juan Manuel Lugo Nacif</option>
              <option id='beneficiario'>Juan Manuel Zaldívar Chiapa</option>
              <option id='beneficiario'>Juan Rafael Canales Ángeles</option>
              <option id='beneficiario'>Juan Ramón Gutiérrez Rodríguez</option>
              <option id='beneficiario'>Juan Ramón Vázquez Cruz</option>
              <option id='beneficiario'>Juana Magdalena Ambrosio Vargas</option>
              <option id='beneficiario'>Juana María Escamilla Vázquez</option>
              <option id='beneficiario'>Juana Vargas López</option>
              <option id='beneficiario'>Juárez Hidalgo</option>
              <option id='beneficiario'>Judith M. Luna Mejía</option>
              <option id='beneficiario'>Julieta García Esquivel</option>
              <option id='beneficiario'>Julio Alberto Santillán García</option>
              <option id='beneficiario'>Julio Cesar Salinas González</option>
              <option id='beneficiario'>Julio Rosales Reyes</option>
              <option id='beneficiario'>Julissa Ortiz Barrera</option>
              <option id='beneficiario'>Juventino Pérez Lemoine</option>
              <option id='beneficiario'>Jv Renta</option>
              <option id='beneficiario'>Karen Alina Overa Santos</option>
              <option id='beneficiario'>Karen Judith Márquez Espinoza</option>
              <option id='beneficiario'>Karla Carolina Rivera Escalona</option>
              <option id='beneficiario'>Karla Lizzett Flores Rodríguez</option>
              <option id='beneficiario'>Karla Yadira Hernández Hernández</option>
              <option id='beneficiario'>Kemuel SA De CV</option>
              <option id='beneficiario'>Miguel Oscar De La Vega Bezies</option>
              <option id='beneficiario'>La Braza Arracheras</option>
              <option id='beneficiario'>La Casa Del Juego</option>
              <option id='beneficiario'>La Cubeta Digital</option>
              <option id='beneficiario'>La Flor De Michoacán</option>
              <option id='beneficiario'>La Luz Roja</option>
              <option id='beneficiario'>Laboratorio Coahuila SA De CV</option>
              <option id='beneficiario'>Latanst SA De CV</option>
              <option id='beneficiario'>Latitud 5 Estrellas SA De CV</option>
              <option id='beneficiario'>Laura Cristina Berber Vicaña</option>
              <option id='beneficiario'>Laura Piña Serrano</option>
              <option id='beneficiario'>Laureano Campa Zúñiga</option>
              <option id='beneficiario'>Lazcano Ortiz Beatriz</option>
              <option id='beneficiario'>Lenin Alejandro Castañeda Baños</option>
              <option id='beneficiario'>Leticia Ignacio Mejía</option>
              <option id='beneficiario'>Leticia Saavedra Nesbaid</option>
              <option id='beneficiario'>Lilia Lugo Mejía</option>
              <option id='beneficiario'>Liliana Flores Rossette</option>
              <option id='beneficiario'>Liliana Yazmin Franco Castro</option>
              <option id='beneficiario'>Linda Crystal García Doniz</option>
              <option id='beneficiario'>Liz Arely Castelán Bautista</option>
              <option id='beneficiario'>Liza Angélica Islas Rivera</option>
              <option id='beneficiario'>Lizbeth Pizana Olvera</option>
              <option id='beneficiario'>Lonchería María Isabel</option>
              <option id='beneficiario'>Los Cazadores</option>
              <option id='beneficiario'>Los Negritos Restaurant Bar</option>
              <option id='beneficiario'>Lucero Pérez González</option>
              <option id='beneficiario'>Luis Alberto Ávila Osorio</option>
              <option id='beneficiario'>Luis Angel Mayen Garcia</option>
              <option id='beneficiario'>Luis Ángel Mayen García</option>
              <option id='beneficiario'>Luis Martínez Mejía</option>
              <option id='beneficiario'>Luis Serfain Henkel Castañeda</option>
              <option id='beneficiario'>Luis Vargas Trejos</option>
              <option id='beneficiario'>Luisa Lagarde Vásquez</option>
              <option id='beneficiario'>Llanterama Hidalguense SA De CV</option>
              <option id='beneficiario'>Ma. Elena Lugo Chavero</option>
              <option id='beneficiario'>Ma. Guadalupe Vite Carlos</option>
              <option id='beneficiario'>Macaria Pérez Guerrero</option>
              <option id='beneficiario'>Maderia Rual SA De CV</option>
              <option id='beneficiario'>Maderería Rual SA De CV</option>
              <option id='beneficiario'>Mangueras, Herramientas Y Equipos SA De CV</option>
              <option id='beneficiario'>Manuel Alejandro Calva Hinojosa</option>
              <option id='beneficiario'>anuel Felix Durán Pérez</option>
              <option id='beneficiario'>Manuel Félix Duran Pérez</option>
              <option id='beneficiario'>Manuel García Guzmán</option>
              <option id='beneficiario'>Maquiladora Espani SA De CV</option>
              <option id='beneficiario'>Marcela Cerón Díaz</option>
              <option id='beneficiario'>Marcelo Ángeles Tivo</option>
              <option id='beneficiario'>Marco Antonio Hernández Gómez</option>
              <option id='beneficiario'>Marco Antonio Hernández Monroy</option>
              <option id='beneficiario'>Marco Antonio López Hernández</option>
              <option id='beneficiario'>Marco Antonio Reyes Hernández</option>
              <option id='beneficiario'>María Alejandra Trejo García</option>
              <option id='beneficiario'>María Catalina Martínez Guerrero</option>
              <option id='beneficiario'>María Cecilia Hernández Castillo</option>
              <option id='beneficiario'>María Concepción Hernández Aragón</option>
              <option id='beneficiario'>María Del Carmen Quintero Bautista</option>
              <option id='beneficiario'>María Del Mar Reyes Pérez Tagle</option>
              <option id='beneficiario'>María Del Rosario González Martínez</option>
              <option id='beneficiario'>María Del Socorro Chávez González</option>
              <option id='beneficiario'>María Erika Ángeles De Haro</option>
              <option id='beneficiario'>María Guadalupe Dávila Hernández</option>
              <option id='beneficiario'>María Guadalupe González Vargas</option>
              <option id='beneficiario'>María Guadalupe Salguero Hernández</option>
              <option id='beneficiario'>María Isabel Teniente Llanos</option>
              <option id='beneficiario'>María José Granillo Granillo</option>
              <option id='beneficiario'>María Leticia Aldana Ugalde</option>
              <option id='beneficiario'>María Luisa Martínez Ortega</option>
              <option id='beneficiario'>María Ramírez Alvarado</option>
              <option id='beneficiario'>María Sofía Escalante Reyes</option>
              <option id='beneficiario'>María Teresa Oliver León</option>
              <option id='beneficiario'>María Trinidad Hernández Rodríguez</option>
              <option id='beneficiario'>Maribel Castro Ángeles</option>
              <option id='beneficiario'>Maribel Olvera Avilés</option>
              <option id='beneficiario'>Maribel Santos Bretado</option>
              <option id='beneficiario'>Mario Luis Zacatenco Viornery</option>
              <option id='beneficiario'>Mario Rodríguez González</option>
              <option id='beneficiario'>Marisarcos Del Distrito Federal SA De CV</option>
              <option id='beneficiario'>Marisol Rivera Vazquez</option>
              <option id='beneficiario'>Marisol Rivera Vázquez</option>
              <option id='beneficiario'>Marlen Pelcastre Nochebuena</option>
              <option id='beneficiario'>Marlen Pérez Cervantes</option>
              <option id='beneficiario'>Marressa Yuzim Picazo Cabrera</option>
              <option id='beneficiario'>Martin Márquez Loyola</option>
              <option id='beneficiario'>Martin Vivar Cazañas</option>
              <option id='beneficiario'>Mary Carmen Ramírez Ríos</option>
              <option id='beneficiario'>Materiales Azulejos Sanitarios Y Ferretería SA De CV</option>
              <option id='beneficiario'>Materiales Hermanos Roldan SA De CV</option>
              <option id='beneficiario'>Materiales Para Construcción SA De CV</option>
              <option id='beneficiario'>Mauro Francisco López Castillo</option>
              <option id='beneficiario'>Mayra Pérez Nájera</option>
              <option id='beneficiario'>Mayra Santa Madrigal Limón</option>
              <option id='beneficiario'>Megapapelera Nixa</option>
              <option id='beneficiario'>Melo Cordero Leticia</option>
              <option id='beneficiario'>Mendoza Tovar Palmira</option>
              <option id='beneficiario'>Meneses Lozada Martin</option>
              <option id='beneficiario'>Mercedes Citlalli Mendoza Meza</option>
              <option id='beneficiario'>Mi Casa</option>
              <option id='beneficiario'>Microvisa Mg Sa De CV</option>
              <option id='beneficiario'>MICROVISA MG SA DE CV</option>
              <option id='beneficiario'>Microvisa SA De CV</option>
              <option id='beneficiario'>Miguel Alejandro Flores Gomez</option>
              <option id='beneficiario'>Miguel Ángel Aguilar Hernández</option>
              <option id='beneficiario'>Miguel Ángel Chávez Trejo</option>
              <option id='beneficiario'>Miguel Ángel Martínez Montiel</option>
              <option id='beneficiario'>Miguel Angel Perez Gonzalez</option>
              <option id='beneficiario'>Miguel Odon Olvera Pérez</option>
              <option id='beneficiario'>Miguel Oscar De La Vega Bezies</option>
              <option id='beneficiario'>Miguel Reyes Valdovinos</option>
              <option id='beneficiario'>Minerva Cruz Licona</option>
              <option id='beneficiario'>Mirage Perisur</option>
              <option id='beneficiario'>Modesta López Canales</option>
              <option id='beneficiario'>Modesta Vázquez Carmona</option>
              <option id='beneficiario'>Mofles González</option>
              <option id='beneficiario'>Multiproductos de Leon SA De CV</option>
              <option id='beneficiario'>Mundo De Mangueras Y Conexiones</option>
              <option id='beneficiario'>Mundo Tool México SA De CV</option>
              <option id='beneficiario'>Nadia Luisa Gavioto Romero</option>
              <option id='beneficiario'>Nallely Roldan Sosa</option>
              <option id='beneficiario'>Nami Pachuca, SA de CV</option>
              <option id='beneficiario'>Nancy Herrera Romero</option>
              <option id='beneficiario'>Nancy Jaramillo Díaz</option>
              <option id='beneficiario'>Narciso Ortiz Velázquez</option>
              <option id='beneficiario'>Nayelhi Chávez Rodríguez</option>
              <option id='beneficiario'>Nayeli Alejandro Calva Hinojosa</option>
              <option id='beneficiario'>Nikzor Travel Sa De CV</option>
              <option id='beneficiario'>Noé Olivia Ramírez Trejo</option>
              <option id='beneficiario'>Noé Olvera Meza</option>
              <option id='beneficiario'>Noel Chávez Martínez</option>
              <option id='beneficiario'>Norma Salinas Alcántara</option>
              <option id='beneficiario'>Novedades Gastronómicas Reforma S. De RLL De CV</option>
              <option id='beneficiario'>Nueva Wal Mart De México, S. De RL De CV</option>
              <option id='beneficiario'>Obed Hernández Carreto</option>
              <option id='beneficiario'>Odt</option>
              <option id='beneficiario'>Office Depot De México SA De CV</option>
              <option id='beneficiario'>Omaña Servicio A Equipo SA De CV</option>
              <option id='beneficiario'>Omar Daniel Hernández García</option>
              <option id='beneficiario'>Omar Guadalupe Cano Fragoso</option>
              <option id='beneficiario'>Omar Pacheco Cortes Rangel</option>
              <option id='beneficiario'>Operadora Omx SA De CV</option>
              <option id='beneficiario'>Operadora Parador De San Javier SA De CV</option>
              <option id='beneficiario'>Operadora Vips S De RL De CV</option>
              <option id='beneficiario'>Oscar Cruz Pérez</option>
              <option id='beneficiario'>Oscar Felipe Serrano Cruz</option>
              <option id='beneficiario'>Oscar Flores Rivera</option>
              <option id='beneficiario'>Oscar Leopoldo Guasso Soto</option>
              <option id='beneficiario'>Ovni Bus SA De CV</option>
              <option id='beneficiario'>Pablo Espinosa Acuña</option>
              <option id='beneficiario'>Pachua-Actopan Ixmiquilpan SA De CV</option>
              <option id='beneficiario'>Pai</option>
              <option id='beneficiario'>Panadería Y Pastelería Geo SA De CV</option>
              <option id='beneficiario'>Paola Romero Guerrero</option>
              <option id='beneficiario'>Paquetexpress</option>
              <option id='beneficiario'>Parrin SA De CV</option>
              <option id='beneficiario'>Patricia Montejo Reyes</option>
              <option id='beneficiario'>Paxair De México SA De CV</option>
              <option id='beneficiario'>Pedro Acosta Rodríguez</option>
              <option id='beneficiario'>Pedro Angel Cabrera Angeles</option>
              <option id='beneficiario'>Pedro Ángel Cabrera Ángeles</option>
              <option id='beneficiario'>Pérez Hernández Javier</option>
              <option id='beneficiario'>Pérez Licona Eduardo</option>
              <option id='beneficiario'>Perkin-Elmer De Meico SA</option>
              <option id='beneficiario'>Pétreos Las Glorias SA De CV</option>
              <option id='beneficiario'>Petreos Las Glorias, SA de CV</option>
              <option id='beneficiario'>Pétreos Sol SA De CV</option>
              <option id='beneficiario'>Petreos Sol, SA de CV</option>
              <option id='beneficiario'>Pinturas En General</option>
              <option id='beneficiario'>Plásticos Jang</option>
              <option id='beneficiario'>Policía Industrial Bancaria del Estado de Hidalgo, SA de CV</option>
              <option id='beneficiario'>Plomoelectrica DE Hhidalgo SA De CV</option>
              <option id='beneficiario'>Posadas De Latinoamerica SA De CV</option>
              <option id='beneficiario'>Pr0ocomex Pachuca SA De CV</option>
              <option id='beneficiario'>PR0OCOMEX PACHUCA SADE CV</option>
              <option id='beneficiario'>Presidencia Municipal</option>
              <option id='beneficiario'>Procomex De Pachuca SA De CV</option>
              <option id='beneficiario'>Promogas SA De CV</option>
              <option id='beneficiario'>Promotora De Autopistas Del Pacifico .SA De. CV</option>
              <option id='beneficiario'>Promotora De Desarrollo Hidalguense SA De SV</option>
              <option id='beneficiario'>Promotora Y Administrador De Carreteras SA De CV</option>
              <option id='beneficiario'>Proyectos Y Construcciones Téllez-Islas</option>
              <option id='beneficiario'>Quintero Vega Irma Lilia</option>
              <option id='beneficiario'>Quiroz Nava Rodrigo</option>
              <option id='beneficiario'>Radio Shack De México SA De CV</option>
              <option id='beneficiario'>Rafael De Jesús Aguirre Ramos</option>
              <option id='beneficiario'>Rafael Herrera Tanco</option>
              <option id='beneficiario'>Rafael Medina Ugalde</option>
              <option id='beneficiario'>Ramírez Arce Mónica</option>
              <option id='beneficiario'>Ramón Ensatiga Morales</option>
              <option id='beneficiario'>Raúl Badillo Ramírez</option>
              <option id='beneficiario'>Raúl Rivera Rodríguez</option>
              <option id='beneficiario'>Raúl Téllez Romero</option>
              <option id='beneficiario'>Rebeca Rangel Copca</option>
              <option id='beneficiario'>Relleno Sanitario</option>
              <option id='beneficiario'>Rembolso De Gasto Arrendamiento Huejutla</option>
              <option id='beneficiario'>Descanso. Mirage Guerrero</option>
              <option id='beneficiario'>Restaurante La Nacional</option>
              <option id='beneficiario'>Restaurante La Vega</option>
              <option id='beneficiario'>Restaurante Quetos</option>
              <option id='beneficiario'>Restaurante California SA De CV</option>
              <option id='beneficiario'>Restaurante Colonial</option>
              <option id='beneficiario'>Restaurante Familiar El Parador De San José</option>
              <option id='beneficiario'>Restaurante Genisa SA De CV</option>
              <option id='beneficiario'>Restaurante Gorditas La Guerra</option>
              <option id='beneficiario'>Restaurante Mirage SA De CV</option>
              <option id='beneficiario'>Restaurante Terrassa De Mirage</option>
              <option id='beneficiario'>Restaurantes California SA De CV</option>
              <option id='beneficiario'>Restaurantes Toks SA De CV</option>
              <option id='beneficiario'>Restaurantes Tu Lunch Sa De CV</option>
              <option id='beneficiario'>Reyes Benítez Karla Leticia</option>
              <option id='beneficiario'>Reyna Meneses Domínguez</option>
              <option id='beneficiario'>Rhema Publicidad</option>
              <option id='beneficiario'>Ricardo Jorge Gonzales Cortes</option>
              <option id='beneficiario'>Ricardo Lázaro Ludlow Zavaleta</option>
              <option id='beneficiario'>Roberto Carlos López Mercado</option>
              <option id='beneficiario'>Roberto González Hernández</option>
              <option id='beneficiario'>Roberto Octavio Tripp Resendiz</option>
              <option id='beneficiario'>Roberto Rodríguez Aguilar</option>
              <option id='beneficiario'>Roberto Rodríguez Romero</option>
              <option id='beneficiario'>Rodolfo García Flores</option>
              <option id='beneficiario'>Rodrigo Quiroz Guerrero</option>
              <option id='beneficiario'>Rodríguez García Edgar Fernando</option>
              <option id='beneficiario'>Rodríguez Rendón Jesús</option>
              <option id='beneficiario'>Rodríguez Reyes Humberto</option>
              <option id='beneficiario'>Roesp Asociados SA De CV</option>
              <option id='beneficiario'>Rogelio L. Moreno Arce</option>
              <option id='beneficiario'>Rogelio Leopoldo Moreno Arce</option>
              <option id='beneficiario'>Romel</option>
              <option id='beneficiario'>Romero Hoyos Ana María</option>
              <option id='beneficiario'>Rosa María Lara Téllez</option>
              <option id='beneficiario'>Russel Barradaz Sanchez</option>
              <option id='beneficiario'>Sabas Hernández Sánchez</option>
              <option id='beneficiario'>Salvador Eric Rosas Villas</option>
              <option id='beneficiario'>Salvador Espinosa Arellano</option>
              <option id='beneficiario'>Sanborn Hermanos SA</option>
              <option id='beneficiario'>Sandra De Elías Vichis</option>
              <option id='beneficiario'>Santos De La Paz SA De CV</option>
              <option id='beneficiario'>Saúl Salinas González</option>
              <option id='beneficiario'>Scden Sa De CV</option>
              <option id='beneficiario'>SCDEN SA DE CV</option>
              <option id='beneficiario'>Sergio Antonio Hernández Suárez</option>
              <option id='beneficiario'>Sergio Antonio Priego Reséndiz</option>
              <option id='beneficiario'>Sergio Ashane Bulos</option>
              <option id='beneficiario'>Sergio Baca Olivo</option>
              <option id='beneficiario'>Sergio Fernando González Cruz</option>
              <option id='beneficiario'>Sergio Jesús Reyes Trejo</option>
              <option id='beneficiario'>Sergio Piña Delgado</option>
              <option id='beneficiario'>Sergio Rivera Chapa</option>
              <option id='beneficiario'>Servicio Acapulco Diamante SA De CV</option>
              <option id='beneficiario'>Servicio También SA De CV</option>
              <option id='beneficiario'>Servicio Apan, SA de CV</option>
              <option id='beneficiario'>Servicio Cúpula SA De CV</option>
              <option id='beneficiario'>Servicio El Once SA De CV</option>
              <option id='beneficiario'>Servicio Huichapan SA De CV</option>
              <option id='beneficiario'>Servicio Jacala SA De CV</option>
              <option id='beneficiario'>Servicio Jacala, SA de CV</option>
              <option id='beneficiario'>Servicio La Fuente SA De CV</option>
              <option id='beneficiario'>Servicio La Loma SA De CV</option>
              <option id='beneficiario'>Servicio Lara SA De CV</option>
              <option id='beneficiario'>Servicio Lara. SA de CV</option>
              <option id='beneficiario'>Servicio Los Cues, SA de CV</option>
              <option id='beneficiario'>Servicio Molango SA de CV</option>
              <option id='beneficiario'>Servicio Monteverde SA De CV</option>
              <option id='beneficiario'>Servicio Parador Santa Bárbara SA de CV</option>
              <option id='beneficiario'>Servicio Postal Mexicano</option>
              <option id='beneficiario'>Servicio Rangel SA De CV</option>
              <option id='beneficiario'>Servicio Rangel, SA de CV</option>
              <option id='beneficiario'>SERVICIO SIOLEN</option>
              <option id='beneficiario'>Servicio Técnico De Hidalgo SA De CV</option>
              <option id='beneficiario'>SERVICIO TEOCALCO SA DE CV</option>
              <option id='beneficiario'>Servicio Toda SA De CV</option>
              <option id='beneficiario'>Servicio Toda, SA de CV</option>
              <option id='beneficiario'>SERVICIO XO SA. DE CV</option>
              <option id='beneficiario'>Servicio Zacualtipan SA de CV</option>
              <option id='beneficiario'>Servicio Zacualtipán SA De CV</option>
              <option id='beneficiario'>Servicio Zacualtipan, SA de CV</option>
              <option id='beneficiario'>SERVICIOS AUTOMOTRICES DE IXMIQUILPAN SACV</option>
              <option id='beneficiario'>SERVICIOS DE INGENIERIA NOAR SA DE CV</option>
              <option id='beneficiario'>Servicios Energéticos de Tizayuca, SA de CV</option>
              <option id='beneficiario'>Servicios Fayad Sa De CV</option>
              <option id='beneficiario'>Servicios Fayad, SA de CV</option>
              <option id='beneficiario'>Servigilga SA De CV</option>
              <option id='beneficiario'>SERVIPROGRESO SA DE CV</option>
              <option id='beneficiario'>Silverio Gonzalez Cuca</option>
              <option id='beneficiario'>Socorro García Ibarra</option>
              <option id='beneficiario'>Socorro Guadalupe Gómez Martínez</option>
              <option id='beneficiario'>Socorro Reséndiz Mancera</option>
              <option id='beneficiario'>Sofía Moedano Flores</option>
              <option id='beneficiario'>Solano Gudiño María Elena</option>
              <option id='beneficiario'>Soluciones Hidraiulicas Arum SAS De CV</option>
              <option id='beneficiario'>Sonia Amparo Mota Olguín</option>
              <option id='beneficiario'>Sotero Palacios Hernández</option>
              <option id='beneficiario'>Sotero Vega Ana</option>
              <option id='beneficiario'>Soto Arriaga Faustina</option>
              <option id='beneficiario'>Sue Ivalu Castillo Asuna</option>
              <option id='beneficiario'>Sumigas SA De CV</option>
              <option id='beneficiario'>Súper Papelera SA De CV</option>
              <option id='beneficiario'>Súper Servicio Meta SA De CV</option>
              <option id='beneficiario'>Súper Servicio Rodríguez SA De CV</option>
              <option id='beneficiario'>Supplyco SA De CV</option>
              <option id='beneficiario'>Susana Peláez Lara</option>
              <option id='beneficiario'>Tahití Silvia Mayorga González</option>
              <option id='beneficiario'>Tania Gema Estrada Alamilla</option>
              <option id='beneficiario'>Tania Vargar Sanchez</option>
              <option id='beneficiario'>Tapia Hernández Luz</option>
              <option id='beneficiario'>Taquería El Mesón De Los Ángeles</option>
              <option id='beneficiario'>Taquería No Que No</option>
              <option id='beneficiario'>Tarifa Promocional Xalapa- Veracruz</option>
              <option id='beneficiario'>TEQUIMEC S DE RL DE CV</option>
              <option id='beneficiario'>Teresa Berenice Tovar Martínez</option>
              <option id='beneficiario'>Teresa Del Niño Jesús Carbajal</option>
              <option id='beneficiario'>Teresa Martínez Martínez</option>
              <option id='beneficiario'>Teresa Salgado García</option>
              <option id='beneficiario'>Tiendas Comercial Mexicana SA De CV</option>
              <option id='beneficiario'>Tiendas Chedrahui SA De CV</option>
              <option id='beneficiario'>Tiendas Soriana SA De CV</option>
              <option id='beneficiario'>Tiendas Soriana Sa De CV</option>
              <option id='beneficiario'>Tintorería Del Norte Del Jardín Colon SA De CV</option>
              <option id='beneficiario'>Tintorerías Gofer SA De CV</option>
              <option id='beneficiario'>Tlapalería Acosta</option>
              <option id='beneficiario'>Tomás Alejandro Herrera Pérez</option>
              <option id='beneficiario'>Tomás Daniel Montes Silverio</option>
              <option id='beneficiario'>Tomasa Villegas Lazcano</option>
              <option id='beneficiario'>Transportes Tepehuas</option>
              <option id='beneficiario'>Trico Pachuca SA De CV</option>
              <option id='beneficiario'>Urbanos Y Suburbanos De Tula SA De CV</option>
              <option id='beneficiario'>Valores Energéticos SA De CV</option>
              <option id='beneficiario'>Valle De Mixquiahuala</option>
              <option id='beneficiario'>Vanguardia Gastronómica Presidente SA De CV</option>
              <option id='beneficiario'>Verificación Ambiental De Hidalgo SACV</option>
              <option id='beneficiario'>Verónica Pérez Reyes</option>
              <option id='beneficiario'>VESALIUS SA DE CV</option>
              <option id='beneficiario'>Vianey Vega Maldonado</option>
              <option id='beneficiario'>Viaticum Valdespino SA De CV</option>
              <option id='beneficiario'>Vicente Ruiz Tapia</option>
              <option id='beneficiario'>Víctor Gerardo Zúñiga Aguirre</option>
              <option id='beneficiario'>Víctor Hernández Gómez</option>
              <option id='beneficiario'>Víctor Hugo Gallardo Garduño</option>
              <option id='beneficiario'>Víctor Hugo Morgado Calva</option>
              <option id='beneficiario'>VINIMED SA DE CV</option>
              <option id='beneficiario'>Violeta Belen González Tapia</option>
              <option id='beneficiario'>Vulcanizador Y Seccionadora</option>
              <option id='beneficiario'>El Chacón</option>
              <option id='beneficiario'>Vulcanizadora</option>
              <option id='beneficiario'>Juan C. Doria</option>
              <option id='beneficiario'>Vymec Fuego SA De CV</option>
              <option id='beneficiario'>Wenceslao Sanchez Estrada</option>
              <option id='beneficiario'>Xochil Zenteno Velasco</option>
              <option id='beneficiario'>Yadira Del Carmen Sánchez Nanduca</option>
              <option id='beneficiario'>Yahiti Silvia Mayorga González</option>
              <option id='beneficiario'>Yamil Hernández García</option>
              <option id='beneficiario'>Yessenia Zamora Soto</option>
              <option id='beneficiario'>Yolanda Aragón Quiroz</option>
              <option id='beneficiario'>Yolanda Felicitas Tenorio Vargas</option>
              <option id='beneficiario'> Yolanda Samperio Delgadillo</option>
              <option id='beneficiario'>Yuridia Laguna Peña</option>
              <option id='beneficiario'>Zehidy Ortiz Granillo</option>
              <option id='beneficiario'>Zoila Ángeles Tello</option>
              <option id='beneficiario'>Zulema Anahí Contreras Vizzuet</option>
            </select>
          </div>
          <div className='p-container-fondo'>
            <p className='p-title-margin-fondo'>Descripcción</p>
            <input className='input-style-fr'
              id='descripcion'
              required
              ref={descripcion => this.inputDescripcion = descripcion}
            />
          </div>
          <div className='p-container-fondo'>
            <p className='p-title-margin-fondo'>Realizo</p>
            <input className='input-style-fr'
              id='realizo'
              required
              ref={realizo => this.inputRealizo = realizo}
            />
          </div>
          <button
            className="bt-s2"
            type='submit'
            onClick={() => this.setState({
              realizo: this.state.realizo = admin,
              fondo: this.state.fondo = this.state.contador.storyCount
            })}
            style={{fontFamily: 'Arial'}}>
            Guadar
          </button>
        </form>
      </div>
    )
  }
}
