import React, { Component } from 'react';
import firebase from '../../Firebase';
import CurrencyFormat from 'react-currency-format';
import './Fondos.css';

class Fondos extends Component {
  constructor() {
    super();
    this.ref = firebase.firestore().collection('fondos');
    this.state = {
      fondo: '',
      fecha: '',
      tipo_doc: '',
      oficio_aut: '',
      no_oficio: '',
      no_lici: '',
      importe: '',
      desc: '',
      importe_l: '',
      beneficiario: '',
      realizo: '',
    };
  }

  cancelCourse(){
    this.refs.fondo.value="";
    this.refs.fecha.value="";
    this.refs.tipo_doc.value="";
    this.refs.oficio_aut.value="";
    this.refs.no_oficio.value="";
    this.refs.no_lici.value="";
    this.refs.importe.value="";
    this.refs.desc.value="";
    this.refs.importe_l.value="";
    this.refs.beneficiario.value="";
    this.refs.realizo.value="";
  }

  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState(state);
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { fondo, fecha, tipo_doc, oficio_aut, no_oficio, no_lici, importe, desc, importe_l, beneficiario, realizo } = this.state;

    this.ref.add({
      fondo,
      fecha,
      tipo_doc,
      oficio_aut,
      no_oficio,
      no_lici,
      importe,
      desc,
      importe_l,
      beneficiario,
      realizo
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
        importe_l: '',
        beneficiario: '',
        realizo: ''
      });
      this.props.history.push("/")
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
  }

  render() {
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
    console.log(today);
    const { fondo, fecha, tipo_doc, oficio_aut, no_oficio, no_lici, importe, desc, importe_l, beneficiario, realizo } = this.state;
    return (
      <div className="space-nav">
        <h2 className="title">Registro de fondos</h2>
        <form className="fondos-back" onSubmit={this.onSubmit}>
          <div className="fondos-container">
          {/*seccion 1*/}
            <div className="form-container">
              <div className="form-content">
                <label for="fondo" className="itc">Fondo:</label>
                <input type="number" className="border-m" name="fondo" value={fondo} onChange={this.onChange} ref="fondo" required/>
              </div>
              <div className="form-content">
                <label for="fecha" className="itc">Fecha:</label>
                <input type="date" className="border-m" min={today} max={today} name="fecha" value={fecha} onChange={this.onChange} ref="fecha" required/>
              </div>
            </div>
            {/*seccion 2*/}
            <div className="form-container">
              <div className="form-content">
                <label for="tipo_doc" className="itc">Tipo de documento:</label>
                <select name="tipo_doc" className="border-m" value={tipo_doc} onChange={this.onChange} ref="tipo_doc" required>
                  <option name="tipo_doc"></option>
                  <option name="tipo_doc">Pago Directo</option>
                  <option name="tipo_doc">Fondo Revolvente</option>
                  <option name="tipo_doc">Gasto a Comprobar</option>
                  <option name="tipo_doc">Reembolso de Gastos</option>
                  <option name="tipo_doc">Cancelado</option>
                </select>
              </div>
              <div className="form-content">
                <label for="oficio_aut" className="itc">Oficio de Autorizacion:</label>
                <select name="oficio_aut" className="border-m" value={oficio_aut} onChange={this.onChange} ref="oficio_aut" required>
                  <option name="oficio_aut"></option>
                  <option name="oficio_aut">SFP-CPF-01-0020/2020</option>
                  <option name="oficio_aut">SFP-CPF-01-0010/2020</option>
                  <option name="oficio_aut">SFP-CPF-01-0724/2020</option>
                  <option name="oficio_aut">SFP-CPF-01-0681/2020</option>
                  <option name="oficio_aut">SFP-CPF-01-DFDP-0949/2020</option>
                </select>
              </div>
            </div>
            {/*seccion 3*/}
            <div className="form-container">
              <div className="form-content">
                <label for="no_oficio" className="itc">No. de Oficio:</label>
                <input type="number" className="border-m" name="no_oficio" value={no_oficio} onChange={this.onChange} ref="no_oficio" required/>
              </div>
              <div className="form-content">
                <label for="no_lici" className="itc">No. de Licitacion:</label>
                <input type="number" className="border-m" name="no_lici" value={no_lici} onChange={this.onChange} ref="no_lici" required/>
              </div>
            </div>
            {/*seccion 4*/}
            <div className="form-container">
              <div className="form-content-5">
                <label for="importe" className="itc">Importe:</label>
                <CurrencyFormat thousandSeparator={true} prefix={'$'} className="border-m" name="importe" value={importe} onChange={this.onChange} ref="importe" required />
              </div>
              <div className="form-content-5">
                <label for="importe_l" className="itc">Importe letra:</label>
                <input className="input-b" name="importe_l" value={importe_l} onChange={this.onChange} required ref="importe_l"/>
              </div>
            </div>
            {/*seccion 5*/}
            <div className="form-container">
              <div className="form-content-5">
                <label for="beneficiario" className="itc">Beneficiario:</label>
                <select className="border-m" name="beneficiario" value={beneficiario} onChange={this.onChange} required ref="beneficiario">
                  <option name="beneficiario"></option>
                  <option name="beneficiario">Operadora Omx Sa De C.V.</option>
                  <option name="beneficiario">AASI INNOVACIONES SA DE CV</option>
                  <option name="beneficiario">Abigail Santillán Moreno</option>
                  <option name="beneficiario">Abraham Andrade Ortiz</option>
                  <option name="beneficiario">Abraham Peña Pérez</option>
                  <option name="beneficiario">Acabados Decorativos De La Huasteca S.A. De C.V</option>
                  <option name="beneficiario">Aceites Y Combustibles Los Ángeles S.A De C.V</option>
                  <option name="beneficiario">Aceros Damarin S.A De C.V.</option>
                  <option name="beneficiario">Adarick Vite Aranda</option>
                  <option name="beneficiario">Administradora De Centros Comerciales Santa Fe S.A. De C.V.</option>
                  <option name="beneficiario">ADOLFO PAZ RIANCHO</option>
                  <option name="beneficiario">Adrián Guevara Rivera</option>
                  <option name="beneficiario">Adrián Guillermo Cueto Hernández</option>
                  <option name="beneficiario">Adriana Ávila Rodríguez</option>
                  <option name="beneficiario">ADVANCED ENGINE REBUIDING SA DE CV</option>
                  <option name="beneficiario">Aeropuertos Y Servicios Auxiliares</option>
                  <option name="beneficiario">Aerovías De México Sa De C.V.</option>
                  <option name="beneficiario">Agaturismo S.A De C.V</option>
                  <option name="beneficiario">Aianeli S.A. De C.V.</option>
                  <option name="beneficiario">Aianeli S.A. De C.V.4</option>
                  <option name="beneficiario">Alberto Alfonso Galindo Galindo</option>
                  <option name="beneficiario">Alberto Severino Jaén Olivas</option>
                  <option name="beneficiario">Aldo Ramírez Cerón</option>
                  <option name="beneficiario">Aldo Román Mendoza García</option>
                  <option name="beneficiario">Alejandra López Alvarado</option>
                  <option name="beneficiario">Alex Steak S.A. De C.V.</option>
                  <option name="beneficiario">Alfredo Edmundo Galindo Pérez</option>
                  <option name="beneficiario">Alfredo Laris Hernández</option>
                  <option name="beneficiario">Alheli Paredes Licona</option>
                  <option name="beneficiario">ALMA GABRIELA MENDOZA ROJAS</option>
                  <option name="beneficiario">Alma Rosa Basilio Garfias</option>
                  <option name="beneficiario">ALUMINIO GARCIA</option>{/*  <---  */}
                  <option name="beneficiario">Aluminio García</option>
                  <option name="beneficiario">Álvaro Samperio Le-Vinson</option>
                  <option name="beneficiario">Ana Fernanda Zapata Santana</option>
                  <option name="beneficiario">Ana Fernanda Zpata Santana</option>{/*  <---  */}
                  <option name="beneficiario">Ana Laura Zacatenco Luna</option>
                  <option name="beneficiario">Ana María Hernández López</option>
                  <option name="beneficiario">Ana Perla Margarita Mendoza Espino</option>
                  <option name="beneficiario">Andrade Bertoloni Arturo</option>
                  <option name="beneficiario">Andrés Guillen Hernández</option>
                  <option name="beneficiario">Andrés Téllez Pino</option>
                  <option name="beneficiario">Ángela Pérez Prado</option>
                  <option name="beneficiario">Angélica González Sánchez</option>
                  <option name="beneficiario">Angélica Morales Avilés</option>
                  <option name="beneficiario">Angélica Sánchez Martínez</option>
                  <option name="beneficiario">Antojitos La Finca</option>
                  <option name="beneficiario">Antonio Lugo Rosas</option>
                  <option name="beneficiario">Aquilino Edgar Herrera Rodríguez</option>
                  <option name="beneficiario">Araceli Pérez Jarillo</option>
                  <option name="beneficiario">Arellano Miranda Elizabeth</option>
                  <option name="beneficiario">Arlan José Chávez Lara</option>
                  <option name="beneficiario">Arlette Macías Escorcia</option>
                  <option name="beneficiario">Armando Miguel Carpio López</option>
                  <option name="beneficiario">Arnulfo Ramírez Cerón</option>
                  <option name="beneficiario">Arturo Cano García</option>
                  <option name="beneficiario">Arturo Flores Meléndez</option>
                  <option name="beneficiario">Arturo Tinajero Jaimes</option>
                  <option name="beneficiario">Aseca, S. A. de C. V.</option>
                  <option name="beneficiario">Autobuses Coordinados Zimapan Valles</option>
                  <option name="beneficiario">Autobuses De Oriente Ado S.A De C.V</option>
                  <option name="beneficiario">Autobuses De Primera Clase</option>
                  <option name="beneficiario">Autobuses Estrella Blanca S.A. De C.V.</option>
                  <option name="beneficiario">Autobuses Estrella Blanca Sa De C.V.</option> {/*  <---  */}
                  <option name="beneficiario">Autobuses Mexico-Zamapan Valle Flecha Roja S.A.</option>
                  <option name="beneficiario">Autobuses Valle Mezquital S.,A. De C.V.</option>
                  <option name="beneficiario">Autógena De Hidalgo S.A. De C.V.</option>
                  <option name="beneficiario">Autogena de Hidalgo, S. A. de C. V.</option> {/*  <---  */}
                  <option name="beneficiario">Autopista Arco Norte Sa De C.V.</option>
                  <option name="beneficiario">Autopistas Arco Norte S.A. De C.V.</option>
                  <option name="beneficiario">Autos Pullman Sa De C.V.</option>
                  <option name="beneficiario">Autoservicio Jocaran de Progreso, S.A. de C.V.</option>
                  <option name="beneficiario">Autoservicio Jocaran S.A de C.V</option>
                  <option name="beneficiario">Autotransportes De Hidalgo .S.A De C.V.</option>
                  <option name="beneficiario">Autotransportes Del Valle Del Mezquital S.A. De C.V</option>
                  <option name="beneficiario">Autovía Necaxa-Tihuatlan Sa De C.V.</option>
                  <option name="beneficiario">Autozone De México, S. De R.L. De C.V.</option>
                  <option name="beneficiario">Banco Mercantil Del Norte S.A. De C.V.</option>
                  <option name="beneficiario">Basualdo Rojo Honey</option>
                  <option name="beneficiario">Beatriz Montaño Jarillo</option>
                  <option name="beneficiario">Beatriz Penélope Isleim Castorena Cortes</option>
                  <option name="beneficiario">Bensaa S.A. De C.V.</option>
                  <option name="beneficiario">Berenice Soto Hernández</option>
                  <option name="beneficiario">Bianca Ofelia Galarza Trejo</option>
                  <option name="beneficiario">Blanca Trejo Bautista</option>
                  <option name="beneficiario">Brenda Alemon Hernández</option>
                  <option name="beneficiario">Brenda Leticia Rangel Lugo</option>
                  <option name="beneficiario">Brenda Minelly López López</option>
                  <option name="beneficiario">Burger La Fiesta</option>
                  <option name="beneficiario">C FRANK ALEXANDER VEYTIA VIEJO</option>
                  <option name="beneficiario">C. ADOLFO PAZ RIANCHO</option>
                  <option name="beneficiario">C. ALEJANDRA FONSECA RINCON</option>
                  <option name="beneficiario">C. CARLOS HAUA BULOS</option>
                  <option name="beneficiario">C. CLAUDIA RAMIREZ LOPEZ</option>
                  <option name="beneficiario">C. EFREN RODRIGUEZ RAMIREZ</option>
                  <option name="beneficiario">C. ELIZABETH ARELLANO MIRANDA</option>
                  <option name="beneficiario">C. ERIKA JAZMIN RESENDIZ TREJO</option>
                  <option name="beneficiario">C. FRANK ALEXANDER VEYTIA VIEJO</option>
                  <option name="beneficiario">C. INES CRUZ HUNTER</option>
                  <option name="beneficiario">C. JAVIER SANTA CRUZ GARCIA</option>
                  <option name="beneficiario">C. JOSE LUIS MAGAÑA CABRERA</option>
                  <option name="beneficiario">C. JOSE LUIS ZACATENCO LOPEZ</option>
                  <option name="beneficiario">C. JOSE SOLIS GONZALEZ</option>
                  <option name="beneficiario">C. LETICIA SAAVEDRA NESBAID</option>
                  <option name="beneficiario">C. LUIS EDUARDO NAHLE PASCUAL</option>
                  <option name="beneficiario">C. MARIA DEL ROSARIO GOMEZ URBINA</option>
                  <option name="beneficiario">C. RUSSEL BARRADAZ SANCHEZ</option>
                  <option name="beneficiario">C. SAUL SALINAS GONZALEZ</option>
                  <option name="beneficiario">C. SILVERIO GONZALEZ CUCA</option>
                  <option name="beneficiario">C. WENCESLAO SANCHEZ ESTRADA</option>
                  <option name="beneficiario">C.LETICIA SAAVEDRA NESBAID</option>
                  <option name="beneficiario">Cadena Comercial Oxxo Sa De C.V.</option>
                  <option name="beneficiario">Cadena Comercial Oxxo, Sa De C.V.</option> {/*  <---  */}
                  <option name="beneficiario">Café Estaciones</option>
                  <option name="beneficiario">CAMINO REAL</option>
                  <option name="beneficiario">CAMINOS Y PUENTES FEDERALES</option>
                  <option name="beneficiario">Caminos Y Puentes Federales De Ingresos Y Servicios Conexos</option>
                  <option name="beneficiario">CAR WASH LA CUBETA DIGITAL</option>
                  <option name="beneficiario">CARBU EXPRESS, S.A. DE C.V.</option>
                  <option name="beneficiario">CARLOS ANTONIO MORALES GARZA</option>
                  <option name="beneficiario">CARLOS ANTONIO QUINTO RIOS</option>
                  <option name="beneficiario">Carlos Antonio Quinto Ríos</option> {/*  <---  */}
                  <option name="beneficiario">CARLOS CELIO ESQUIVEL</option>
                  <option name="beneficiario">Carlos Daniel Ortiz Chavez</option>
                  <option name="beneficiario">CARLOS GODINEZ PEREZ</option>
                  <option name="beneficiario">Carlos Godínez Pérez</option> {/*  <---  */}
                  <option name="beneficiario">Carlos Haua Bulos</option>
                  <option name="beneficiario">Carlos Luis Gómez Arguelles</option>
                  <option name="beneficiario">Carlos Martin Torres Juárez</option>
                  <option name="beneficiario">Carlos Primitivo Vega Valle</option>
                  <option name="beneficiario">Carreteras Del Pacifico</option>
                  <option name="beneficiario">Caseta Metlapil</option>
                  <option name="beneficiario">Caseta Miradores</option>
                  <option name="beneficiario">Catalina Martínez Guerrero</option>
                  <option name="beneficiario">Cecapiem S.A De C.V</option>
                  <option name="beneficiario">Cele Filiberto Martínez Cordero</option>
                  <option name="beneficiario">Celia Esparza Loreto</option>
                  <option name="beneficiario">Centro De Copiado</option>
                  <option name="beneficiario">CENTRO DE VERIFICACIÓN TAKECHI, S. A. de C. V.</option>
                  <option name="beneficiario">Cerrajería Aranda</option>
                  <option name="beneficiario">Cerrajería Móvil El Saucillo</option>
                  <option name="beneficiario">Cerro De Biznagas S,A De C.V</option>
                  <option name="beneficiario">CFE SUMNISTRADOR DE SERVICIOS BASICOS</option>
                  <option name="beneficiario">City Club</option>
                  <option name="beneficiario">Claudia Corte Herrera</option>
                  <option name="beneficiario">Claudia Judith Flores Leyva</option>
                  <option name="beneficiario">Claudia Mota Rojas</option>
                  <option name="beneficiario">CLAUDIA RAMIREZ LOPEZ</option>
                  <option name="beneficiario">Claudia Ramírez López</option> {/*  <---  */}
                  <option name="beneficiario">Cocina Económica La Güerita</option>
                  <option name="beneficiario">Cocina Económica La Parroquia</option>
                  <option name="beneficiario">Cocina Tradicional Campestre De 1981</option>
                  <option name="beneficiario">Coel S.A De C.V.</option>
                  <option name="beneficiario">Com. De Agua Pot. Alcant. Y San. Del Mpio De Huichapan</option>
                  <option name="beneficiario">COMBUSTIBLES BENTAN, S.A. DE C.V.</option>
                  <option name="beneficiario">Combustibles De Pachuca S.A. De C.V.</option>
                  <option name="beneficiario">Combustibles Rumloc S.A. De C.V.</option>
                  <option name="beneficiario">COMERCIAL MEXICANA</option>
                  <option name="beneficiario">COMERCIAL MIURA S.A. DE C.V. (SISTEMA DE VIGILANCIA)</option>
                  <option name="beneficiario">Comercializadora Farmacéutica De Chiapas Sapi De C.V.</option>
                  <option name="beneficiario">COMERCIALIZADORA Y DISTRIBUIDORA BRIME SA DE CV</option>
                  <option name="beneficiario">Comisión Bancaria</option>
                  <option name="beneficiario">Comisión De Agua De Actopan</option>
                  <option name="beneficiario">Comisión De Agua De Actopan Hgo</option>
                  <option name="beneficiario">Comisión De Agua De Tula De Allende</option>
                  <option name="beneficiario">Comisión De Agua De Zimapan</option>
                  <option name="beneficiario">Comisión De Agua Huichapan</option>
                  <option name="beneficiario">Comisión De Agua Ixmiquilpan</option>
                  <option name="beneficiario">Comisión De Agua Mixquiahuala De Juárez</option>
                  <option name="beneficiario">Comisión De Agua Pachuca</option>
                  <option name="beneficiario">Comisión De Agua Potable Y Alcantarillado Del Municipio De Mixquiahuala De</option>
                  <option name="beneficiario">Comisión De Agua Potable, Alcantarillado Y Saneamiento Del Municipio De Ixmiquilpan, Hgo</option>
                  <option name="beneficiario">Comisión De Agua Potable, Alcantarillado Y Saneamiento Del Municipio De Zimapan, Hgo</option>
                  <option name="beneficiario">Comisión De Agua Y Alcantarillado De Sistemas Intermunicipales</option>
                  <option name="beneficiario">Comisión De Agua Y Alcantarillado Del Municipio De Actopan Hidalgo</option>
                  <option name="beneficiario">Comisión De Agua Y Alcantarillado Del Municipio De Tula De Allende</option>
                  <option name="beneficiario">Comisión Federal De Electricidad</option>
                  <option name="beneficiario">Compañía Santa María S.A. De C.V.</option>
                  <option name="beneficiario">Concesionaria Autopista Perote-Xalapa.</option>
                  <option name="beneficiario">Concesionaria De Vías Troncales S.A De C.V.</option>
                  <option name="beneficiario">Concesionaria Mexiquense S.A De C.V.</option>
                  <option name="beneficiario">Concesionaria Mexiquense Sa De C.V.</option> {/*  <---  */}
                  <option name="beneficiario">Concesiones Y Promociones Malibran</option>
                  <option name="beneficiario">Conexiones Y Mangueras De Pachuca S.A. De C V.</option>
                  <option name="beneficiario">Consultora Informática</option>
                  <option name="beneficiario">CONTEXPRESS S DE RL DE C.V.</option>
                  <option name="beneficiario">Copias Neo S.A. De C.V.</option>
                  <option name="beneficiario">Copicentro Pachuca</option>
                  <option name="beneficiario">Corporativo Farmacias Mas S.A. De C.V.</option>
                  <option name="beneficiario">Corporativo Yunes Márquez S.A. De C.V.</option>
                  <option name="beneficiario">Corte Herrera Claudia</option>
                  <option name="beneficiario">Cortesía En Viajes S. De R.L. De C.V.</option>
                  <option name="beneficiario">CRIMELAB S.A. DE C.V.</option>
                  <option name="beneficiario">Cristina González Cantera</option>
                  <option name="beneficiario">Curso "El Delito De Feminicidio"</option>
                  <option name="beneficiario">Cutberto Rodríguez Álvarez</option>
                  <option name="beneficiario">Cynper S.A De C.V.</option>
                  <option name="beneficiario">China Town</option>
                  <option name="beneficiario">Dagoberto Mendoza Morales</option>
                  <option name="beneficiario">Daniel García Luna</option>
                  <option name="beneficiario">Daniel Becerra Castañeda</option>
                  <option name="beneficiario">Daniel García Luna</option> {/*  <---  */}
                  <option name="beneficiario">Daniel López Carrasco</option>
                  <option name="beneficiario">Daniel Miramontes Flores</option>
                  <option name="beneficiario">Daniel Zarate Santiago</option>
                  <option name="beneficiario">David Adrián Martínez Santiago</option>
                  <option name="beneficiario">David Richard Uribe</option>
                  <option name="beneficiario">De C.V.</option>  {/*  <---  */}
                  <option name="beneficiario">De Tula De Allende, Hgo.</option>
                  <option name="beneficiario">Delia Serrano Morales</option>
                  <option name="beneficiario">Deportes Pachuca S.A. De C.V.</option>
                  <option name="beneficiario">Desarrollo Hotelero De Plaza Pachuca Sa</option>
                  <option name="beneficiario">DEVSOFT S.A. DE C.V.</option>
                  <option name="beneficiario">Dhl Exprés México S.A. De C.V.</option>
                  <option name="beneficiario">Diana Araceli Zaldívar Cruz</option>
                  <option name="beneficiario">Diana Gálvez Mendoza</option>
                  <option name="beneficiario">Diego Alberto Acevedo De La Rosa</option>
                  <option name="beneficiario">Diego Alberto Espinosa Islas</option>
                  <option name="beneficiario">Dilia Ramos Montaño</option>
                  <option name="beneficiario">DISTRIBUCIONES MOGU SA DE CV</option>
                  <option name="beneficiario">Distribuidora De Abarrotes Y Semillas De Pachuca S.A. De C.V.</option>
                  <option name="beneficiario">Distribuidora De Alimentos Th, S.A. De C.V.</option>
                  <option name="beneficiario">Distribuidora Del Manual Moderno S.A. De C.V.</option>
                  <option name="beneficiario">Distribuidora El Manual Moderno S.A. De C.V.</option>
                  <option name="beneficiario">Distribuidora Fragoso</option>
                  <option name="beneficiario">Domínguez Díaz Daniel</option>
                  <option name="beneficiario">Drícela Austria Serna</option>
                  <option name="beneficiario">Drivecare, S. A. de C. V.</option>
                  <option name="beneficiario">Dulce María Calva Sánchez</option>
                  <option name="beneficiario">Edgar Aquilino Herrera Rodríguez</option>
                  <option name="beneficiario">Edgar Dante Rosas Islas</option>
                  <option name="beneficiario">EDGAR MENDOZA CERON</option>
                  <option name="beneficiario">Edgar Rabindranath Valdespino Zubieta</option>
                  <option name="beneficiario">Edith Rojas Camacho</option>
                  <option name="beneficiario">Edmundo Alfredo Galindo Pérez</option>
                  <option name="beneficiario">Edson Aguilar Romero</option>
                  <option name="beneficiario">El Palacio De Hierro S.A. De C.V.</option>
                  <option name="beneficiario">El Parador De San José</option>
                  <option name="beneficiario">El Pelón Dulcerías</option>
                  <option name="beneficiario">el rincon de periban</option>
                  <option name="beneficiario">El Rincón De Periban</option> {/*  <---  */}
                  <option name="beneficiario">Elda Ceseña Banquera</option>
                  <option name="beneficiario">Eléctrica Ángeles</option>
                  <option name="beneficiario">Eléctrica Barba S.A. De C.V.</option>
                  <option name="beneficiario">Electro pura S. De R.L. De C.V.</option>
                  <option name="beneficiario">Electropura S. De R.L. De C.V.</option> {/*  <---  */}
                  <option name="beneficiario">Elfego Baltazar  Piña Verde</option>
                  <option name="beneficiario">Eli Rodríguez Del Ángel</option>
                  <option name="beneficiario">Elideth Sarahi Dorantes López</option>
                  <option name="beneficiario">Elisa Ramírez Escamilla</option>
                  <option name="beneficiario">Eliseo Martínez Ballesteros</option>
                  <option name="beneficiario">Eliu Morales Fragoso</option>
                  <option name="beneficiario">ELIZABETH ARELLANO MIRANDA</option>
                  <option name="beneficiario">Elizabeth Salinas Aguilar</option>
                  <option name="beneficiario">Elizabeth Troncoso Escamilla</option>
                  <option name="beneficiario">Eloísa Camargo Hernández</option>
                  <option name="beneficiario">Elsa Patricia Rodríguez Reyes</option>
                  <option name="beneficiario">EMILIO PRIETO PEREZ</option>
                  <option name="beneficiario">Emilio Prieto Pérez</option> {/*  <---  */}
                  <option name="beneficiario">Emmanuel Ceseña Barquera</option>
                  <option name="beneficiario">Envasadoras De Aguas En México S. De R.L. De C.V. (Bonafont)</option>
                  <option name="beneficiario">Eric Salvador Rosas Villa</option>
                  <option name="beneficiario">Erick Jovanni Flores Varela</option>
                  <option name="beneficiario">Erick Mendoza Hernández</option>
                  <option name="beneficiario">Erick Salvador Rosas Villa</option>
                  <option name="beneficiario">Erika Cruz Pérez</option>
                  <option name="beneficiario">ERIKA JAZMIN RESENDIZ TREJO</option>
                  <option name="beneficiario">Ernesto Skewes López</option>
                  <option name="beneficiario">Esli Domínguez Trejo</option>
                  <option name="beneficiario">Especialistas En Alta Cocina S.A. De C.V. (Wings)</option>
                  <option name="beneficiario">Esperanza González Díaz</option>
                  <option name="beneficiario">Espinosa Ostos Blanca Deyanira</option>
                  <option name="beneficiario">Estación Acevedo S. De R.L.</option>
                  <option name="beneficiario">Estación De Servicio Ana S.A. De C.V.</option>
                  <option name="beneficiario">Estación De Servicio Ariel S.A De C.V</option>
                  <option name="beneficiario">Estación de Servicio EMAJUFH S.A de C.V</option>
                  <option name="beneficiario">Estacion de Servicio EMAJUFH, S.A. de C.V.</option> {/*  <---  */}
                  <option name="beneficiario">Estación De Servicio La Mora</option>
                  <option name="beneficiario">Estación De Servicios Gesa S.A. De C.V.</option>
                  <option name="beneficiario">Estación Real De La Plata S.A De C.V.</option>
                  <option name="beneficiario">Estación Santa María La Providencia S.A De C.V.</option>
                  <option name="beneficiario">Estación Valle Dorado S.A. De C.V.</option>
                  <option name="beneficiario">Estacionamiento La Posta</option>
                  <option name="beneficiario">Esteban Leopoldo Cartelazo Islas</option>
                  <option name="beneficiario">ESTEBAN LEOPOLDO CASTELAZO ISLAS</option> {/*  <---  */}
                  <option name="beneficiario">Eugenia Vite Silvestre</option>
                  <option name="beneficiario">Eva Pérez Hernández</option>
                  <option name="beneficiario">Eva Rivera Samitez</option>
                  <option name="beneficiario">Fabián Bernardo Moreno Gómez</option>
                  <option name="beneficiario">FABIOLA GONZALEZ OROZCO</option>
                  <option name="beneficiario">Fabiola Santillán García</option>
                  <option name="beneficiario">Farmacias Guadalajara S.A. De C.V.</option>
                  <option name="beneficiario">Farum Servicios .S.A De C.V.</option>
                  <option name="beneficiario">FEJSA COMPUTACION Y OFICINAS DE PACHUCA SA DE CV</option>
                  <option name="beneficiario">FELIPE JIMENEZ GUTIERREZ</option>
                  <option name="beneficiario">Felipe Jiménez Gutiérrez</option> {/*  <---  */}
                  <option name="beneficiario">Felipe Simón Olvera Castelán</option>
                  <option name="beneficiario">Felisa Lugo Chavero</option>
                  <option name="beneficiario">Feliz Ernesto Reyes Molina</option>
                  <option name="beneficiario">Fernando Hidalgo Vergara</option>
                  <option name="beneficiario">Ferre hogar</option>
                  <option name="beneficiario">Ferretería Y Plomería Casa Martínez</option>
                  <option name="beneficiario">Fideicomiso Autopistas Y Puentes Del Golfo Centro</option>
                  <option name="beneficiario">Fierros Y Laminas De Pachuca S.A. De C.V .</option>
                  <option name="beneficiario">Fiesta Inn Pachuca</option>
                  <option name="beneficiario">Filiberto Barrera Dávila</option>
                  <option name="beneficiario">Flor Eugenia Vargas Herrera</option>
                  <option name="beneficiario">Fondo Nacional De Infraestructura</option>
                  <option name="beneficiario">FORLAC STORE SA DE CV</option>
                  <option name="beneficiario">Francisca Quiroz Uribe</option>
                  <option name="beneficiario">Francisco Raúl García Bolio</option>
                  <option name="beneficiario">Francisco Ventura Martínez</option>
                  <option name="beneficiario">Fuente De Sodas Chino´S</option>
                  <option name="beneficiario">Gabriel López Hernández</option>
                  <option name="beneficiario">Gabriela Romero Campos</option>
                  <option name="beneficiario">García Moreno Víctor Manual</option>
                  <option name="beneficiario">Garza Gas De Hidalgo S.A. De C.V.</option>
                  <option name="beneficiario">Gas De Provincia Sa De C.V.</option>
                  <option name="beneficiario">Gas Fast S.A. De C.V.</option>
                  <option name="beneficiario">Gas Imperial De Axapusco S.A. De C.V.</option>
                  <option name="beneficiario">Gasamake S.A. De C.V.</option>
                  <option name="beneficiario">Gasolineria Agua Blanca S.A. De C.V.</option>
                  <option name="beneficiario">Gasolineria Rodjaq S.A. De C.V.</option>
                  <option name="beneficiario">Gasomer S.A De C.V</option>
                  <option name="beneficiario">Gastrosur S.A De C.V</option> {/*  <---  */}
                  <option name="beneficiario">Genaro Oswaldo Márquez Gutiérrez</option>
                  <option name="beneficiario">GERMA MANTENIMIENTO Y DISEÑO S.A DE C.V</option>
                  <option name="beneficiario">Gertell Combustibles S.A De C.V</option>
                  <option name="beneficiario">Gibran Copca Chávez</option>
                  <option name="beneficiario">Gilberto Bárcenas López</option>
                  <option name="beneficiario">Gilberto Espinosa Ramírez</option>
                  <option name="beneficiario">Gloríela Islas Sosa</option>
                  <option name="beneficiario">Gobierno Del Df Curso Delito De Feminicidio</option>
                  <option name="beneficiario">Gobierno Del Estado De Veracruz</option>
                  <option name="beneficiario">González Islas Bernardo</option>
                  <option name="beneficiario">Graciela Moreno Arce</option>
                  <option name="beneficiario">Graciela Moreno Rodríguez</option>
                  <option name="beneficiario">Graciela Taide Quiroz Gutiérrez</option>
                  <option name="beneficiario">Grupo Autopistas Nacionales S.A. De C.V.</option>
                  <option name="beneficiario">Grupo Autopistas Nacionales, Sa De C.V.</option> {/*  <---  */}
                  <option name="beneficiario">GRUPO BEKIM EMPRESARIAL S DE RL DE C.V</option>
                  <option name="beneficiario">Grupo Cravioto Distribuciones S.A De C.V</option>
                  <option name="beneficiario">Grupo Estrella Blanca S.A. De C.V.</option>
                  <option name="beneficiario">GRUPO GALUME S.A. DE C.V.</option>
                  <option name="beneficiario">Grupo Helen Gasolinera Excelencia y Calidad S.A de C.V</option>
                  <option name="beneficiario">Grupo O Port S.A De C.V.</option>
                  <option name="beneficiario">Grupo Parisina S.A. De C.V.</option>
                  <option name="beneficiario">Grupo Suzuka Argenta S.A. De C.V.</option>
                  <option name="beneficiario">Guadalupe Hernández Escamilla</option>
                  <option name="beneficiario">Guillermo Harold Barría García</option>
                  <option name="beneficiario">Gustavo Said Gonzalez Tapia</option>
                  <option name="beneficiario">Gustavo Trejo Montalvo</option>
                  <option name="beneficiario">Gutiérrez Rodríguez Juan Ramón</option>
                  <option name="beneficiario">Guy Jesús Quijano Austria</option>
                  <option name="beneficiario">H. Roberto Aguilar Galindo</option>
                  <option name="beneficiario">Hacienda Yextho</option>
                  <option name="beneficiario">Hacobo Flores Pérez</option>
                  <option name="beneficiario">Héctor Santos González Reyes</option>
                  <option name="beneficiario">Heriberto Padilla Contreras</option>
                  <option name="beneficiario">Herlaz Sistemas De Comunicación S.A De C.V</option>
                  <option name="beneficiario">HERLAZ SISTEMAS DE COMUNICACIÓN SA DE CV</option>
                  <option name="beneficiario">Herlaz Sistemas De Comunicación, Sa De C.V.</option> {/*  <---  */}
                  <option name="beneficiario">Hermelinda Peña Hernández</option>
                  <option name="beneficiario">Hernández Valencia Rosalía</option>
                  <option name="beneficiario">Herrera Motors De Hidalgo S.A. De C.V.</option>
                  <option name="beneficiario">HERRERA MOTORS DE HIDALGO SA DE CV</option>
                  <option name="beneficiario">Hidalgo Restaurant Platillos Regionales</option>
                  <option name="beneficiario">Hidrocarburos Hidalgo S,.A De C.V</option>
                  <option name="beneficiario">Hidrocarburos Santa Catarina S.A. De C.V.</option>
                  <option name="beneficiario">Hidrosina Plus S.A. De C.V.</option>
                  <option name="beneficiario">Hilda Lorena Torres Guerrero</option>
                  <option name="beneficiario">Home Depot México S De R.L. De C.V.</option>
                  <option name="beneficiario">Hotel Y Restaurante Tezoli</option>
                  <option name="beneficiario">Hoteles Eco turísticos Mexicanos S.A. De C.V.</option>
                  <option name="beneficiario">Hoteles Sheraton S. De R.L. De C.V.</option>
                  <option name="beneficiario">Huichapan Hgo.</option>
                  <option name="beneficiario">Impulsora De Transportes Mexicanos S.A De C.V</option>
                  <option name="beneficiario">Industrias Long Meng S. De R.L. Mi</option>
                  <option name="beneficiario">INES CRUZ HUNTER</option> {/*  <---  */}
                  <option name="beneficiario">Ing. Rogelio Alberto Téllez Rojo</option>
                  <option name="beneficiario">Ingrid Minerva Rodríguez Vera</option>
                  <option name="beneficiario">Interhidalguenses</option>
                  <option name="beneficiario">Irving Ortiz Flores</option>
                  <option name="beneficiario">Isidro Granados Guerra</option>
                  <option name="beneficiario">Israel Islas Castañeda</option>
                  <option name="beneficiario">Iván Ramírez Hernández</option>
                  <option name="beneficiario">Ivonne Munguía Becerra</option>
                  <option name="beneficiario">J. Irais González García</option>
                  <option name="beneficiario">Jacobo Flores Pérez</option>
                  <option name="beneficiario">Jaime Zapata Venegas</option>
                  <option name="beneficiario">Janeth Olvera Salinas</option>
                  <option name="beneficiario">Jaqueline Gálvez De La Peña</option>
                  <option name="beneficiario">Javier González Mejía</option>
                  <option name="beneficiario">JAVIER LEO CUEVAS</option>
                  <option name="beneficiario">Javier Rodríguez Robles</option>
                  <option name="beneficiario">JAVIER SANTA CRUZ GARCIA</option>
                  <option name="beneficiario">Javier Santacruz García</option>
                  <option name="beneficiario">Jessica Denisse Zuñiga Rosales</option>
                  <option name="beneficiario">Jesús Elías Salinas Baños</option>
                  <option name="beneficiario">Jesús Ríos Islas</option>
                  <option name="beneficiario">Joao Israel Villegas Trejo</option>
                  <option name="beneficiario">Joaquín Escobar Baños</option>
                  <option name="beneficiario">Johanna Beatriz Hidalgo Hernández</option>
                  <option name="beneficiario">Jorge Erick Piña Vite</option>
                  <option name="beneficiario">Jorge Vargas Martínez</option>
                  <option name="beneficiario">Jose Alfonso López Rubio</option>
                  <option name="beneficiario">José Alfredo Elizalde Hernández</option>
                  <option name="beneficiario">José Antonio Calderón López</option>
                  <option name="beneficiario">José Antonio Jiménez Rodríguez</option>
                  <option name="beneficiario">JOSE ANTONIO SILVA MORENO</option>
                  <option name="beneficiario">José Armando Reyes Samperio</option>
                  <option name="beneficiario">José Augusto Fuentes Marín</option>
                  <option name="beneficiario">José Carlos Vargas Bonetta</option>
                  <option name="beneficiario">José De Jesús Franco Solís</option>
                  <option name="beneficiario">José De Jesús López Peña</option>
                  <option name="beneficiario">José González Beltrána</option>
                  <option name="beneficiario">José Guadalupe Sánchez Guerrero</option>
                  <option name="beneficiario">Jose Ivan Gutierrez Najera</option>
                  <option name="beneficiario">José Jaime Acosta Castro</option>
                  <option name="beneficiario">José Juan Moreno Valle</option>
                  <option name="beneficiario">José Luis Hernández Rosales</option>
                  <option name="beneficiario">José Luis Hidalgo López</option>
                  <option name="beneficiario">JOSE LUIS MAGAÑA CABRERA</option>
                  <option name="beneficiario">José Luis Salinas Elizalde</option>
                  <option name="beneficiario">José Luis Serrano Arroyo</option>
                  <option name="beneficiario">JOSE LUIS ZACATENCO LOPEZ</option>
                  <option name="beneficiario">José Luis Zacatenco López</option>  {/*  <---  */}
                  <option name="beneficiario">José Manuel Hernández Hernández</option>
                  <option name="beneficiario">JOSE NERI ISLAS MARTINEZ</option>
                  <option name="beneficiario">José Román Cárdenas Pizano</option>
                  <option name="beneficiario">JOSE ROMAN PIZANO CARDENAS</option>
                  <option name="beneficiario">JOSE SOLIS GONZALEZ</option>
                  <option name="beneficiario">José Solís González</option> {/*  <---  */}
                  <option name="beneficiario">Josselin Sixto Ruiz</option>
                  <option name="beneficiario">Juan Alberto Peralta Vázquez</option>
                  <option name="beneficiario">Juan Carlos Ángeles Baltazar</option>
                  <option name="beneficiario">Juan Carlos Salinas Rodríguez</option>
                  <option name="beneficiario">Juan Carlos Vergara Bonneta</option>
                  <option name="beneficiario">Juan Gustavo Perez Gónzalez</option>
                  <option name="beneficiario">Juan Hernández Olvera</option>
                  <option name="beneficiario">Juan Iv Rodríguez Sánchez</option>
                  <option name="beneficiario">Juan Leticia Elizalde Zendejas</option>
                  <option name="beneficiario">Juan Manuel García Guzmán</option>
                </select>
              </div>
              <div className="form-content-5">
                <label for="realizo" className="itc">Realizo:</label>
                <select className="border-m" name="realizo" value={realizo} onChange={this.onChange} required ref="realizo">
                  <option name="realizo"></option>
                  <option name="realizo">ELOY</option>
                  <option name="realizo">HECTOR</option>
                  <option name="realizo">LILIANA</option>
                  <option name="realizo">MIGUEL</option>
                  <option name="realizo">TERISITA</option>
                </select>
              </div>
            </div>
            {/*seccion 6*/}
            <div className="form-container">
              <div className="form-content-desc">
                <label for="desc" className="itc">Descripcion:</label>
                <textarea type="text" className="border-m" name="desc" value={desc} onChange={this.onChange} required ref="desc"/>
              </div>
            </div>
            <div className="form-container-last">
              <div className="botones">
                <button className="bt-s2" type='submit'>Guadar</button>
                <button className="bt-s3" onClick={this.cancelCourse.bind(this)}>Cancelar</button>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default Fondos;
