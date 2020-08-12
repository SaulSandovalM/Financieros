import React, { Component } from 'react'
import './Fondos.css'
import firebase from '../../../Firebase'
import { NumberAsString } from './NumerosLetras.js'
import { DropDownList } from '@progress/kendo-react-dropdowns'
import '@progress/kendo-theme-default/dist/all.css'
import XmlComp from './sin/XmlComp'
import XmlAsi from './asi/XmlAsi'

export default class Fondos extends Component {
  constructor (props) {
    super(props)
    this.ref = firebase.firestore().collection('fondos')
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
      fondos: [],
      allowCustom: true,
      value: '',
      suggest: '',
      key: '',
      contador: {},
      isHidden: 1,
      f: ''
    }
  }

  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value
    this.setState(state)
  }

  onSubmit = (e) => {
    e.preventDefault()
    const { fondo, fecha, tipo_doc, oficio_aut, no_oficio, no_lici, importe, desc, beneficiario, realizo } = this.state
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
      })
      const statsRef = firebase.firestore().collection('fondos').doc('--stats--')
      const increment = firebase.firestore.FieldValue.increment(1)
      const batch = firebase.firestore().batch()
      const storyRef = firebase.firestore().collection('fondos').doc(`${Math.random()}`)
      batch.set(storyRef, { title: 'Nuevo Fondo!' })
      batch.set(statsRef, { nFondo: increment }, { merge: true })
      batch.commit()
      this.perro()
      this.props.history.push(`/edit/${this.state.f}`)
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

  onCollectionUpdate = (querySnapshot) => {
    const fondos = []
    querySnapshot.forEach((doc) => {
      const { fondo, fecha, tipo_doc, oficio_aut, no_oficio, no_aut, no_lici, importe, desc, importe_l, beneficiario, realizo } = doc.data()
      fondos.push({
        key: doc.id,
        doc,
        fondo,
        fecha,
        tipo_doc,
        oficio_aut,
        no_oficio,
        no_aut,
        no_lici,
        importe,
        desc,
        importe_l,
        beneficiario,
        realizo,
      })
    })
    this.setState({
      fondos
   })
  }

  perro = () => {
    firebase.firestore().collection('fondos').orderBy('fondo', 'desc').limit(1).get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        const data = doc.data()
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

  toggleHidden1 () {
    this.setState({
      isHidden: 1
    })
  }

  toggleHidden2 () {
    this.setState({
      isHidden: 2
    })
  }

  toggleHidden3 () {
    this.setState({
      isHidden: 3
    })
  }

  toggleHidden4 () {
    this.setState({
      isHidden: 4
    })
  }

  toggleHidden5 () {
    this.setState({
      isHidden: 5
    })
  }

  beneficiario = ['Mtro.León Maximiliano Hernández Valdés', 'Operadora Omx Sa De CV','AASI INNOVACIONES SA DE CV','Abigail Santillán Moreno','Abraham Andrade Ortiz','Abraham Peña Pérez','Acabados Decorativos De La Huasteca SA De CV','Aceites Y Combustibles Los Ángeles SA De CV','Aceros Damarin SA De CV','Adarick Vite Aranda','Administradora De Centros Comerciales Santa Fe SA De CV','ADOLFO PAZ RIANCHO','Adrián Guevara Rivera','Adrián Guillermo Cueto Hernández','Adriana Ávila Rodríguez','MOTOR AVANZADO REBUIDING SA DE CV','Aeropuertos Y Servicios Auxiliares','Aerovías De México Sa De CV','Agaturismo SA De CV','Aianeli SA De CV','Aianeli SA De CV4','Alberto Alfonso Galindo Galindo','Alberto Severino Jaén Olivas','Aldo Ramírez Cerón','Aldo Román Mendoza García','Alejandra López Alvarado','Alex Steak SA De CV','Alfredo Edmundo Galindo Pérez','Alfredo Laris Hernández','Alheli Paredes Licona','Alma Gabriela Mendoza Rojas','Alma Rosa Basilio Garfias','Aluminio García','Álvaro Samperio Le-Vinson','Ana Fernanda Zapata Santana','Ana Fernanda Zpata Santana','Ana Laura Zacatenco Luna','Ana María Hernández López','Ana Perla Margarita Mendoza Espino','Andrade Bertoloni Arturo','Andrés Guillen Hernández','Andrés Téllez Pino','Ángela Pérez Prado','Angélica González Sánchez','Angélica Morales Avilés','Angélica Sánchez Martínez','Antojitos La Finca','Antonio Lugo Rosas','Aquilino Edgar Herrera Rodríguez','Araceli Pérez Jarillo','Arellano Miranda Elizabeth','Arlan José Chávez Lara','Arlette Macías Escorcia','Armando Miguel Carpio López','Arnulfo Ramírez Cerón','Arturo Cano García','Arturo Flores Meléndez','Arturo Tinajero Jaimes','Aseca, SA de CV','Autobuses Coordinados Zimapan Valles','Autobuses De Oriente Ado SA De CV','Autobuses De Primera Clase','Autobuses Estrella Blanca SA De CV','Autobuses Estrella Blanca Sa De CV','Autobuses México-Zamapan Valle Flecha Roja SA','Autobuses Valle Mezquital S., A. De CV','Autógena De Hidalgo SA De CV','Autogena de Hidalgo, SA de CV ','Autopista Arco Norte Sa De CV','Autopistas Arco Norte SA De CV','Autos Pullman Sa De CV','Autoservicio Jocaran de Progreso, SA de CV','Autoservicio Jocaran SA de CV','Autotransportes De Hidalgo .SA De CV','Autotransportes Del Valle Del Mezquital SA De CV','Autovía Necaxa-Tihuatlan Sa De CV','Autozone De México, S. De RL De CV','Banco Mercantil Del Norte SA De CV','Basualdo Rojo Honey','Beatriz Montaño Jarillo','Beatriz Penélope Isleim Castorena Cortes','Bensaa SA De CV','Berenice Soto Hernández','Bianca Ofelia Galarza Trejo','Blanca Trejo Bautista','Brenda Alemon Hernández','Brenda Leticia Rangel Lugo','Brenda Minelly López López','Burger La Fiesta','C Frank Alexander Veytia ViejoIEJO','C. Adolfo Paz Riancho','C. Alejandra Fonseca Rincon','C. Carlos Haua Bulos','C. Claudi Ramirez Lopez','C. Efren Rodriguez Ramierez','C. Elizabeth Arellano Miranda','C. Erika Jazimin Resendiz Trejo','C. Frank Alexander Veytia Viejo','C. Ines Cruz Hunter','C. Javier Santa Cruz Garcia','C. Jose Luis Magaña Cabrera','C. Jose Luis Zacatenco Lopez','C. Jose solis Gonzalez','C. Leticia Saavedra Nesbaid','C. Luis Eduardo Nahle Pascual','C. Maria De Rosario Gomez Urbina','C. Russel Barradaz Sanchez','C. Saul Salinas Gonzalez','C. Silverio Gonzalez Cuca','C. Wencesñap Sanchez Estrada','C.Lesticia Saavedra Nesbaid','Cadena Comercial Oxxo Sa De CV','Cadena Comercial Oxxo, Sa De CV','Café Estaciones','CAMINO REAL','CAMINOS Y PUENTES FEDERALES','Caminos Y Puentes Federales De Ingresos Y Servicios Conexos','LAVADO DE COCHES LA CUBETA DIGITAL','CARBU EXPRESS, SA DE CV','CARLOS ANTONIO MORALES GARZA','CARLOS ANTONIO QUINTO RIOS','Carlos Antonio Quinto Ríos','CARLOS CELIO ESQUIVEL','Carlos Daniel Ortiz Chavez','Carlos Godinez Perez','Carlos Godínez Pérez','Carlos Haua Bulos','Carlos Luis Gómez Arguelles','Carlos Martin Torres Juárez','Carlos Primitivo Vega Valle','Carreteras Del Pacifico','Caseta Metlapil','Caseta Miradores','Catalina Martínez Guerrero','Cecapiem SA De CV','Cele Filiberto Martínez Cordero','Celia Esparza Loreto','Centro De Copiado','Centro de verificación De Verificación Takechi ​​SA de CV','Cerrajería Aranda','Cerrajería Móvil El Saucillo','Cerro De Biznagas S, A De CV','CFE Suministridor De Servicios BasicosS','City Club','Claudia Corte Herrera','Claudia Judith Flores Leyva','Claudia Mota Rojas','Claudia Ramierez Lopez','Claudia Ramírez López','Cocina Económica La Güerita','Cocina Económica La Parroquia','Cocina Tradicional Campestre De 1981','Coel SA De CV','Com. De Agua Pot. Alcant Y san. Del Mpio De Huichapan','Combustibles Bentan SA DE CV','Combustibles De Pachuca SA De CV','Combustibles Rumloc SA De CV','Comercial Mexicana','Comercial Miura SA DE CV (Sistema De Vigilancia)','Comercializadora Farmacéutica De Chiapas Sapi De CV','Comercializadora Y Distribuidora Brime SA De CV','Comisión Bancaria','Comisión De Agua De Actopan','Comisión De Agua De Actopan Hgo','Comisión De Agua De Tula De Allende','Comisión De Agua De Zimapan','Comisión De Agua Huichapan','Comisión De Agua Ixmiquilpan','Comisión De Agua Mixquiahuala De Juárez','Comisión De Agua Pachuca','Comisión De Agua Potable Y Alcantarillado Del Municipio De Mixquiahuala De Juarez','Comisión De Agua Potable, Alcantarillado Y Saneamiento Del Municipio De Ixmiquilpan, Hgo','Comisión De Agua Potable, Alcantarillado Y Saneamiento Del Municipio De Zimapan, Hgo','Comisión de Agua y Alcantarillado De Sistemas Intermunicipales','Comisión De Agua Y Alcantarillado Del Municipio De Actopan Hidalgo','Comisión De Agua Y Alcantarillado Del Municipio De Tula De Allende','Comisión Federal De Electricidad','Compañía Santa María SA De CV','Concesionaria Autopista Perote-Xalapa.','Concesionaria De Vías Troncales SA De CV','Concesionaria Mexiquense SA De CV','Concesiones Y Promociones Malibran','Conexiones Y Mangueras De Pachuca SA De C V.','Consultora Informática','CONTEXPRESS S DE RL DE CV','Copias Neo SA De CV','Copicentro Pachuca','Corporativo Farmacias Mas SA De CV','Corporativo Yunes Márquez SA De CV','Corte Herrera Claudia','Cortesía En Viajes S. De RL De CV','CRIMELAB SA DE CV','Cristina González Cantera','Curso','El Delito De Feminicidio','Cutberto Rodríguez Álvarez','Cynper SA De CV','China Town','Dagoberto Mendoza Morales','Daniel García Luna','Daniel Becerra Castañeda','Daniel García Luna','Daniel López Carrasco','Daniel Miramontes Flores','Daniel Zarate Santiago','David Adrián Martínez Santiago','David Richard Uribe','De Tula De Allende, Hgo.','Delia Serrano Morales','Deportes Pachuca SA De CV','Desarrollo Hotelero De Plaza Pachuca Sa','DEVSOFT SA DE CV','Dhl Exprés México SA De CV','Diana Araceli Zaldívar Cruz','Diana Gálvez Mendoza','Diego Alberto Acevedo De La Rosa','Diego Alberto Espinosa Islas','Dilia Ramos Montaño','Distribuciones Mogu SA DE CV','Distribuidora De Abarrotes Y Semillas De Pachuca SA De CV','Distribuidora De Alimentos Th, SA De CV','Distribuidora Del Manual Moderno SA De CV','Distribuidora El Manual Moderno SA De CV','Distribuidora Fragoso','Domínguez Díaz Daniel','Drícela Austria Serna','Drivecare, SA de CV','Dulce María Calva Sánchez','Edgar Aquilino Herrera Rodríguez','Edgar Dante Rosas Islas','Edgar Mendoza Ceron','Edgar Rabindranath Valdespino Zubieta','Edith Rojas Camacho','Edmundo Alfredo Galindo Pérez','Edson Aguilar Romero','El Palacio De Hierro SA De CV','El Parador De San José','El Pelón Dulcerías','el rincon de periban','El Rincón De Periban','Elda Ceseña Banquera','Eléctrica Ángeles','Eléctrica Barba SA De CV','Electro pura S. De RL De CV','Electropura S. De RL De CV','Elfego Baltazar Piña Verde','Eli Rodríguez Del Ángel','Elideth Sarahi Dorantes López','Elisa Ramírez Escamilla','Eliseo Martínez Ballesteros','Eliu Morales Fragoso','Elizabeth Arellano Miranda','Elizabeth Salinas Aguilar','Elizabeth Troncoso Escamilla','Eloísa Camargo Hernández','Elsa Patricia Rodríguez Reyes','Emilio Prieto Perez','Emilio Prieto Pérez','Emmanuel Ceseña Barquera','Envasadoras De Aguas En México S. De RL De CV (Bonafont)','Eric Salvador Rosas Villa','Erick Jovanni Flores Varela','Erick Mendoza Hernández','Erick Salvador Rosas Villa','Erika Cruz Pérez','ERIKA JAZMIN RESENDIZ TREJO','Ernesto Skewes López','Esli Domínguez Trejo','Especialistas en Alta Cocina SA De CV (Wings)','Esperanza González Díaz','Espinosa Ostos Blanca Deyanira','Estación Acevedo S. De RL','Estación De Servicio Ana SA De CV','Estación De Servicio Ariel SA De CV','Estación de Servicio EMAJUFH SA de CV','Estación De Servicio La Mora','Estación De Servicios Gesa SA De CV','Estación Real De La Plata SA De CV','Estación Santa María La Providencia SA De CV','Estación Valle Dorado SA De CV','Estacionamiento La Posta','Esteban Leopoldo Cartelazo Islas','Esteban Leopoldo Castelazo Islas','Eugenia Vite Silvestre','Eva Pérez Hernández','Eva Rivera Samitez','Fabián Bernardo Moreno Gómez','FABIOLA GONZALEZ OROZCO','Fabiola Santillán García','Farmacias Guadalajara SA De CV','Farum Servicios SA De CV','Fejsa Computaion Y Oficinas De Pachuca SA De CV','FELIPE JIMENEZ GUTIERREZ','Felipe Jiménez Gutiérrez','Felipe Simón Olvera Castelán','Felisa Lugo Chavero','Feliz Ernesto Reyes Molina','Fernando Hidalgo Vergara','Ferre hogar','Ferretería Y Plomería Casa Martínez','Fideicomiso Autopistas Y Puentes Del Golfo Centro','Fierros Y Laminas De Pachuca SA De CV.','Fiesta Inn Pachuca','Filiberto Barrera Dávila','Flor Eugenia Vargas Herrera','Fondo Nacional De Infraestructura','Forlac Store SA De CV','Francisca Quiroz Uribe','Francisco Raúl García Bolio','Francisco Ventura Martínez','Fuente De Sodas Chino´S','Gabriel López Hernández','Gabriela Romero Campos','Manual García Moreno Víctor','Garza Gas De Hidalgo SA De CV','Gas De Provincia Sa De CV','Gas Fast SA De CV','Gas Imperial De Axapusco SA De CV','Gasamake SA De CV','Gasolineria Agua Blanca SA De CV','Gasolineria Rodjaq SA De CV','Gasomer SA De CV','Gastrosur SA De CV','Genaro Oswaldo Márquez Gutiérrez','Germa Mantenimiento Y Diseño SA De CV','Gertell Combustibles SA De CV','Gibran Copca Chávez','Gilberto Bárcenas López','Gilberto Espinosa Ramírez','Gloríela Islas Sosa','Gobierno Del Df Curso Delito De Feminicidio','Gobierno del Estado de Veracruz','González Islas Bernardo','Graciela Moreno Arce','Graciela Moreno Rodríguez','Graciela Taide Quiroz Gutiérrez','Grupo Autopistas Nacionales SA De CV','Grupo Autopistas Nacionales, Sa De CV','Grupo Bekim Empresarial S DE RL DE CV','Grupo Cravioto Distribuciones SA De CV','Grupo Estrella Blanca SA De CV','Grupo Galume SA De CV','Grupo Helen Gasolinera Excelencia y Calidad SA de CV','Grupo O Port SA De CV','Grupo Parisina SA De CV','Grupo Suzuka Argenta SA De CV','Guadalupe Hernández Escamilla','Guillermo Harold Barría García','Gustavo Said Gonzalez Tapia','Gustavo Trejo Montalvo','Gutiérrez Rodríguez Juan Ramón','Guy Jesús Quijano Austria','H. Roberto Aguilar Galindo','Hacienda Yextho','Hacobo Flores Pérez','Héctor Santos González Reyes','Heriberto Padilla Contreras','Herlaz Sistemas de Comunicación SA De CV','HERLAZ SISTEMAS DE COMUNICACIÓN SA DE CV','Herlaz Sistemas De Comunicación, Sa De CV','Hermelinda Peña Hernández','Hernández Valencia Rosalía','Herrera Motors De Hidalgo SA De CV','Herrera Motors De Hidalgo SA De CV','Restaurante Hidalgo Platillos Regionales','Hidrocarburos Hidalgo S, .A De CV','Hidrocarburos Santa Catarina SA De CV','Hidrosina Plus SA De CV','Hilda Lorena Torres Guerrero','Home Depot México S De RL De CV','Hotel Y Restaurante Tezoli','Hoteles Eco turísticos Mexicanos SA De CV','Hoteles Sheraton S. De RL De CV','Huichapan Hgo','Impulsora De Transportes Mexicanos SA De CV','Industrias Long Meng S. De RL Mi','Ines Cruz Hunter','Ing. Rogelio Alberto Téllez Rojo','Ingrid Minerva Rodríguez Vera','Interhidalguenses','Irving Ortiz Flores','Isidro Granados Guerra','Israel Islas Castañeda','Iván Ramírez Hernández','Ivonne Munguía Becerra','J. Irais González García','Jacobo Flores Pérez','Jaime Zapata Venegas','Janeth Olvera Salinas','Jaqueline Gálvez De La Peña','Javier González Mejía','JAVIER LEO CUEVAS','Javier Rodríguez Robles','Javier Santa Cruz Garcia','Javier Santacruz García','Jessica Denisse Zuñiga Rosales','Jesús Elías Salinas Baños','Jesús Ríos Islas','Joao Israel Villegas Trejo','Joaquín Escobar Baños','Johanna Beatriz Hidalgo Hernández','Jorge Erick Piña Vite','Jorge Vargas Martínez','Jose Alfonso López Rubio','José Alfredo Elizalde Hernández','José Antonio Calderón López','José Antonio Jiménez Rodríguez','JOSE ANTONIO SILVA MORENO','José Armando Reyes Samperio','José Augusto Fuentes Marín','José Carlos Vargas Bonetta','José De Jesús Franco Solís','José De Jesús López Peña','José González Beltrána','José Guadalupe Sánchez Guerrero','Jose Ivan Gutierrez Najera','José Jaime Acosta Castro','José Juan Moreno Valle','José Luis Hernández Rosales','José Luis Hidalgo López','JOSE LUIS MAGAÑA CABRERA','José Luis Salinas Elizalde','José Luis Serrano Arroyo','JOSE LUIS ZACATENCO LOPEZ','José Luis Zacatenco López','José Manuel Hernández Hernández','JOSE NERI ISLAS MARTINEZ','José Román Cárdenas Pizano','Jose Roman Pizano Caredenas','Jose Solis Gonzalez','José Solís Gonzále','Josselin Sixto Ruiz','Juan Alberto Peralta Vázquez','Juan Carlos Ángeles Baltazar','Juan Carlos Salinas Rodríguez','Juan Carlos Vergara Bonneta','Juan Gustavo Perez Gónzalez','Juan Hernández Olvera','Juan Iv Rodríguez Sánchez','Juan Leticia Elizalde Zendejas','Juan Manuel García Guzmán','Juan Manuel García Guzmán','Juan Manuel García Hernández','Juan Manuel Lugo Nacif','Juan Manuel Zaldívar Chiapa','Juan Rafael Canales Ángeles','Juan Ramón Gutiérrez Rodríguez','Juan Ramón Vázquez Cruz','Juana Magdalena Ambrosio Vargas','Juana María Escamilla Vázquez','Juana Vargas López','Juárez Hidalgo','Judith M. Luna Mejía','Julieta García Esquivel','Julio Alberto Santillán García','Julio Cesar Salinas González','Julio Rosales Reyes','Julissa Ortiz Barrera','Juventino Pérez Lemoine','Jv Renta','Karen Alina Overa Santos','Karen Judith Márquez Espinoza','Karla Carolina Rivera Escalona','Karla Lizzett Flores Rodríguez','Karla Yadira Hernández Hernández','Kemuel SA De CV','Miguel Oscar De La Vega Bezies','La Braza Arracheras','La Casa Del Juego','La Cubeta Digital','La Flor De Michoacán','La Luz Roja','Laboratorio Coahuila SA De CV','Latanst SA De CV','Latitud 5 Estrellas SA De CV','Laura Cristina Berber Vicaña','Laura Piña Serrano','Laureano Campa Zúñiga','Lazcano Ortiz Beatriz','Lenin Alejandro Castañeda Baños','Leticia Ignacio Mejía','Leticia Saavedra Nesbaid','Lilia Lugo Mejía','Liliana Flores Rossette','Liliana Yazmin Franco Castro','Linda Crystal García Doniz','Liz Arely Castelán Bautista','Liza Angélica Islas Rivera','Lizbeth Pizana Olvera','Lonchería María Isabel','Los Cazadores','Los Negritos Restaurant Bar','Lucero Pérez González','Luis Alberto Ávila Osorio','Luis Angel Mayen Garcia','Luis Ángel Mayen García','Luis Martínez Mejía','Luis Serfain Henkel Castañeda','Luis Vargas Trejos','Luisa Lagarde Vásquez','Llanterama Hidalguense SA De CV','Ma. Elena Lugo Chavero','Ma. Guadalupe Vite Carlos','Macaria Pérez Guerrero','Maderia Rual SA De CV','Maderería Rual SA De CV','Mangueras, Herramientas Y Equipos SA De CV','Manuel Alejandro Calva Hinojosa','Manuel Felix Durán Pérez','Manuel Félix Duran Pérez','Manuel García Guzmán','Maquiladora Espani SA De CV','Marcela Cerón Díaz','Marcelo Ángeles Tivo','Marco Antonio Hernández Gómez','Marco Antonio Hernández Monroy','Marco Antonio López Hernández','Marco Antonio Reyes Hernández','María Alejandra Trejo García','María Catalina Martínez Guerrero','María Cecilia Hernández Castillo','María Concepción Hernández Aragón','María Del Carmen Quintero Bautista','María Del Mar Reyes Pérez Tagle','María Del Rosario González Martínez','María Del Socorro Chávez González','María Erika Ángeles De Haro','María Guadalupe Dávila Hernández','María Guadalupe González Vargas','María Guadalupe Salguero Hernández','María Isabel Teniente Llanos','María José Granillo Granillo','María Leticia Aldana Ugalde','María Luisa Martínez Ortega','María Ramírez Alvarado','María Sofía Escalante Reyes','María Teresa Oliver León','María Trinidad Hernández Rodríguez','Maribel Castro Ángeles','Maribel Olvera Avilés','Maribel Santos Bretado','Mario Luis Zacatenco Viornery','Mario Rodríguez González','Marisarcos Del Distrito Federal SA De CV','Marisol Rivera Vazquez','Marisol Rivera Vázquez','Marlen Pelcastre Nochebuena','Marlen Pérez Cervantes','Marressa Yuzim Picazo Cabrera','Martin Márquez Loyola','Martin Vivar Cazañas','Mary Carmen Ramírez Ríos','Materiales Azulejos Sanitarios Y Ferretería SA De CV','Materiales Hermanos Roldan SA De CV','Materiales Para Construcción SA De CV','Mauro Francisco López Castillo','Mayra Pérez Nájera','Mayra Santa Madrigal Limón','Megapapelera Nixa','Melo Cordero Leticia','Mendoza Tovar Palmira','Meneses Lozada Martin','Mercedes Citlalli Mendoza Meza','Mi Casa','Microvisa Mg Sa De CV','MICROVISA MG SA DE CV','Microvisa SA De CV','Miguel Alejandro Flores Gomez','Miguel Ángel Aguilar Hernández','Miguel Ángel Chávez Trejo','Miguel Ángel Martínez Montiel','Miguel Angel Perez Gonzalez','Miguel Odon Olvera Pérez','Miguel Oscar De La Vega Bezies','Miguel Reyes Valdovinos','Minerva Cruz Licona','Mirage Perisur','Modesta López Canales','Modesta Vázquez Carmona','Mofles González','Multiproductos de Leon SA De CV','Mundo De Mangueras Y Conexiones','Mundo Tool México SA De CV','Nadia Luisa Gavioto Romero','Nallely Roldan Sosa','Nami Pachuca, SA de CV','Nancy Herrera Romero','Nancy Jaramillo Díaz','Narciso Ortiz Velázquez','Nayelhi Chávez Rodríguez','Nayeli Alejandro Calva Hinojosa','Nikzor Travel Sa De CV','Noé Olivia Ramírez Trejo','Noé Olvera Meza','Noel Chávez Martínez','Norma Salinas Alcántara','Novedades Gastronómicas Reforma S. De RLL De CV','Nueva Wal Mart De México, S. De RL De CV','Obed Hernández Carreto','Odt','Office Depot De México SA De CV','Omaña Servicio A Equipo SA De CV','Omar Daniel Hernández García','Omar Guadalupe Cano Fragoso','Omar Pacheco Cortes Rangel','Operadora Omx SA De CV','Operadora Parador De San Javier SA De CV','Operadora Vips S De RL De CV','Oscar Cruz Pérez','Oscar Felipe Serrano Cruz','Oscar Flores Rivera','Oscar Leopoldo Guasso Soto','Ovni Bus SA De CV','Pablo Espinosa Acuña','Pachua-Actopan Ixmiquilpan SA De CV','Pai','Panadería Y Pastelería Geo SA De CV','Paola Romero Guerrero','Paquetexpress','Parrin SA De CV','Patricia Montejo Reyes','Paxair De México SA De CV','Pedro Acosta Rodríguez','Pedro Angel Cabrera Angeles','Pedro Ángel Cabrera Ángeles','Pérez Hernández Javier','Pérez Licona Eduardo','Perkin-Elmer De Meico SA','Pétreos Las Glorias SA De CV','Petreos Las Glorias, SA de CV','Pétreos Sol SA De CV','Petreos Sol, SA de CV','Pinturas En General','Plásticos Jang','Policía Industrial Bancaria del Estado de Hidalgo, SA de CV','Plomoelectrica DE Hhidalgo SA De CV','Posadas De Latinoamerica SA De CV','Pr0ocomex Pachuca SA De CV','PR0OCOMEX PACHUCA SADE CV','Presidencia Municipal','Procomex De Pachuca SA De CV','Promogas SA De CV','Promotora De Autopistas Del Pacifico .SA De. CV','Promotora De Desarrollo Hidalguense SA De SV','Promotora Y Administrador De Carreteras SA De CV','Proyectos Y Construcciones Téllez-Islas','Quintero Vega Irma Lilia','Quiroz Nava Rodrigo','Radio Shack De México SA De CV','Rafael De Jesús Aguirre Ramos','Rafael Herrera Tanco','Rafael Medina Ugalde','Ramírez Arce Mónica','Ramón Ensatiga Morales','Raúl Badillo Ramírez','Raúl Rivera Rodríguez','Raúl Téllez Romero','Rebeca Rangel Copca','Relleno Sanitario','Rembolso De Gasto Arrendamiento Huejutla','Descanso. Mirage Guerrero','Restaurante La Nacional','Restaurante La Vega','Restaurante Quetos','Restaurante California SA De CV','Restaurante Colonial','Restaurante Familiar El Parador De San José','Restaurante Genisa SA De CV','Restaurante Gorditas La Guerra','Restaurante Mirage SA De CV','Restaurante Terrassa De Mirage','Restaurantes California SA De CV','Restaurantes Toks SA De CV','Restaurantes Tu Lunch Sa De CV','Reyes Benítez Karla Leticia','Reyna Meneses Domínguez','Rhema Publicidad','Ricardo Jorge Gonzales Cortes','Ricardo Lázaro Ludlow Zavaleta','Roberto Carlos López Mercado','Roberto González Hernández','Roberto Octavio Tripp Resendiz','Roberto Rodríguez Aguilar','Roberto Rodríguez Romero','Rodolfo García Flores','Rodrigo Quiroz Guerrero','Rodríguez García Edgar Fernando','Rodríguez Rendón Jesús','Rodríguez Reyes Humberto','Roesp Asociados SA De CV','Rogelio L. Moreno Arce','Rogelio Leopoldo Moreno Arce','Romel','Romero Hoyos Ana María','Rosa María Lara Téllez','Russel Barradaz Sanchez','Sabas Hernández Sánchez','Salvador Eric Rosas Villas','Salvador Espinosa Arellano','Sanborn Hermanos SA','Sandra De Elías Vichis','Santos De La Paz SA De CV','Saúl Salinas González','Scden Sa De CV','SCDEN SA DE CV','Sergio Antonio Hernández Suárez','Sergio Antonio Priego Reséndiz','Sergio Ashane Bulos','Sergio Baca Olivo','Sergio Fernando González Cruz','Sergio Jesús Reyes Trejo','Sergio Piña Delgado','Sergio Rivera Chapa','Servicio Acapulco Diamante SA De CV','Servicio También SA De CV','Servicio Apan, SA de CV','Servicio Cúpula SA De CV','Servicio El Once SA De CV','Servicio Huichapan SA De CV','Servicio Jacala SA De CV','Servicio Jacala, SA de CV','Servicio La Fuente SA De CV','Servicio La Loma SA De CV','Servicio Lara SA De CV','Servicio Lara. SA de CV','Servicio Los Cues, SA de CV','Servicio Molango SA de CV','Servicio Monteverde SA De CV','Servicio Parador Santa Bárbara SA de CV','Servicio Postal Mexicano','Servicio Rangel SA De CV','Servicio Rangel, SA de CV','SERVICIO SIOLEN','Servicio Técnico De Hidalgo SA De CV','SERVICIO TEOCALCO SA DE CV','Servicio Toda SA De CV','Servicio Toda, SA de CV','SERVICIO XO SA. DE CV','Servicio Zacualtipan SA de CV','Servicio Zacualtipán SA De CV','Servicio Zacualtipan, SA de CV','SERVICIOS AUTOMOTRICES DE IXMIQUILPAN SACV','SERVICIOS DE INGENIERIA NOAR SA DE CV','Servicios Energéticos de Tizayuca, SA de CV','Servicios Fayad Sa De CV','Servicios Fayad, SA de CV','Servigilga SA De CV','SERVIPROGRESO SA DE CV','Silverio Gonzalez Cuca','Socorro García Ibarra','Socorro Guadalupe Gómez Martínez','Socorro Reséndiz Mancera','Sofía Moedano Flores','Solano Gudiño María Elena','Soluciones Hidraiulicas Arum SAS De CV','Sonia Amparo Mota Olguín','Sotero Palacios Hernández','Sotero Vega Ana','Soto Arriaga Faustina','Sue Ivalu Castillo Asuna','Sumigas SA De CV','Súper Papelera SA De CV','Súper Servicio Meta SA De CV','Súper Servicio Rodríguez SA De CV','Supplyco SA De CV','Susana Peláez Lara','Tahití Silvia Mayorga González','Tania Gema Estrada Alamilla','Tania Vargar Sanchez','Tapia Hernández Luz','Taquería El Mesón De Los Ángeles','Taquería No Que No','Tarifa Promocional Xalapa- Veracruz','TEQUIMEC S DE RL DE CV','Teresa Berenice Tovar Martínez','Teresa Del Niño Jesús Carbajal','Teresa Martínez Martínez','Teresa Salgado García','Tiendas Comercial Mexicana SA De CV','Tiendas Chedrahui SA De CV','Tiendas Soriana SA De CV','Tiendas Soriana Sa De CV','Tintorería Del Norte Del Jardín Colon SA De CV','Tintorerías Gofer SA De CV','Tlapalería Acosta','Tomás Alejandro Herrera Pérez','Tomás Daniel Montes Silverio','Tomasa Villegas Lazcano','Transportes Tepehuas','Trico Pachuca SA De CV','Urbanos Y Suburbanos De Tula SA De CV','Valores Energéticos SA De CV','Valle De Mixquiahuala','Vanguardia Gastronómica Presidente SA De CV','Verificación Ambiental De Hidalgo SACV','Verónica Pérez Reyes','VESALIUS SA DE CV','Vianey Vega Maldonado','Viaticum Valdespino SA De CV','Vicente Ruiz Tapia','Víctor Gerardo Zúñiga Aguirre','Víctor Hernández Gómez','Víctor Hugo Gallardo Garduño','Víctor Hugo Morgado Calva','VINIMED SA DE CV','Violeta Belen González Tapia','Vulcanizador Y Seccionadora', 'El Chacón','Vulcanizadora', 'Juan C. Doria' ,'Vymec Fuego SA De CV','Wenceslao Sanchez Estrada','Xochil Zenteno Velasco','Yadira Del Carmen Sánchez Nanduca','Yahiti Silvia Mayorga González','Yamil Hernández García','Yessenia Zamora Soto','Yolanda Aragón Quiroz','Yolanda Felicitas Tenorio Vargas','Yolanda Samperio Delgadillo','Yuridia Laguna Peña','Zehidy Ortiz Granillo','Zoila Ángeles Tello','Zulema Anahí Contreras Vizzuet']
  oficio_aut = ['SFP-CPF-01-0020/2020', 'SFP-CPF-01-0010/2020', 'SFP-CPF-01-0724/2020', 'SFP-CPF-01-0681/2020', 'SFP-CPF-01-DFDP-0949/2020']
  tipo_doc = ['Pago Directo', 'Fondo Revolvente', 'Gasto a Comprobar', 'Cancelado', 'Licitación']
  tipo_doc2 = ['Fondo Revolvente', 'Pago Directo']
  tipo_doc3 = ['Pago Directo']
  partida = ['211001', '211002', '212001', '212002', '214001', '214002', '215001', '216001', '217001', '221001', '221002', '246001', '251001', '253001', '254001', '255001', '261001', '271001', '272001', '291001', '292001', '311001', '313001', '318001', '323002', '334001', '338001', '341001', '351001', '352001', '353001', '355001', '357001', '358001', '361002', '372001', '375001', '381001', '392006', '394001', '218002', '312001', '371001', '247001', '249001', '359001', '336001', '275001', '211003', '541001', '515001', '339001']
  up = ['2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '20', '21', '22', '23', '24']
  no_proyecto = ['U027 425', 'U029 425', 'U027 1208', 'U029 1208', 'U027 1860', 'U029 1860', 'U024 2686','U027 2686','U029 2686','U038 2514',]
  municipio = ['Acatlán', 'Acaxochitlán', 'Actopan', 'Agua Blanca de Iturbide','Ajacuba','Alfajayucan','Almoloya','Apan','El Arenal','Atitalaquia','Atlapexco','Atotonilco el Grande','Atotonilco de Tula','Calnali','Cardonal','Cuautepec de Hinojosa','Chapantongo','Chapulhuacán','Chilcuautla','Eloxochitlán','Emiliano Zapata','Epazoyucan','Franciso I. Madero','Huasca de Ocampo','Huautla','Huazalingo','Huehuetla','Huejutla de Reyes','Huichapan','Ixmiquilpan','Jacala de Ledezma','Jaltocán','Juárez Hidalgo','Lolotla','Metepec','San Agustín Metzquititlán','Metztitlán','Mineral del Chico','Mineral del Monte','La Misión','Mixquiahuala de Juárez','Molango de Escamilla','Nicolás Flores','Nopala de Villagrán','Omitlán de Juárez','San Felipe Orizatlán','Pacula','Pachuca de Soto','Pisaflores','Progreso de Obregón','Mineral de la Reforma','San Agustín Tlaxiaca','San Bartolo Tutotepec','San Salvador','Santiago de Anaya','Santiago Tulantepec de Lugo Guerrero','Singuilucan','Tasquillo','Tecozautla','Tenango de Doria','Tepeapulco','Tepehuacán de Guerrero','Tepeji del Río de Ocampo','Tepetitlán','Tetepango','Villa de Tezontepec','Tezontepec de Aldama','Tianguistengo','Tizayuca','Tlahuelilpan','Tlahuiltepa','Tlanalapa','Tlanchinol','Tlaxcoapan','Tolcayuca','Tula de Allende','Tulancingo de Bravo','Xochiatipan','Xochicoatlán','Yahualica','Zacualtipán de Ángeles','Zapotlán de Juárez','Zempoala','Zimapán']
  area = ['Procuraduría General de Justicia','Subprocuraduría de Procedimientos Penales Región Oriente','Fiscalía Especializada para la atención de Delitos cometidos contra la Libertad de Expresión', 'Periodistas y Personas defensoras de los Derechos Humanos','Dirección General para la Atención de los Asuntos del Sistema Tradicional','Fiscalia de Delitos Electorales','Subprocuraduría de Derechos Humanos y Servicios a la Comunidad','Centro de Justicia Restaurativa Penal Poniente','Fiscalía para la Atención de Delitos de Género','Visitaduría General','Dirección General de Servicios Periciales','Centro de Operación Estratégica','Unidad Especializada en el Combate al Secuestro','Dirección General de Administración y Finanzas','Fiscalía Especializada para la atención de los Delitos de Trata de Personas','Subprocuraduría de Procedimientos Penales Región Poniente','Centro de Atención Temprana Poniente','Dirección General de Investigación y Litigación Poniente','Dirección General de la Policía Investigadora','Centro de Atención Temprana Oriente','Centro de Justicia Restaurativa Penal Oriente','Dirección General de Investigación y Litigación Oriente','Dirección General de Recursos Materiales y Servicios','Fiscalía Especializada en Delitos de Corrupción','Fiscalía Especializada en Materia de Desaparición Forzada de Personas',]

  render () {
    // const totalImporte = []
    // this.state.listas.map(item => (
    //   totalImporte.push(item.importe)
    // ))
    // const reducer = (a, b) => a + b

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
    const { tipo_doc, oficio_aut, no_oficio, no_lici, importe, desc, beneficiario, partida, up, no_proyecto, municipio, area } = this.state
    this.state.fondo = this.state.contador.nFondo
    this.state.fecha = today
    this.state.realizo = admin

    return (
      <div className='zz'>
        <div className='n-f-c'>
          <button className='b-s-f' onClick={this.toggleHidden1.bind(this)}>Registro de Fondos</button>
          <button className='b-s-f' onClick={this.toggleHidden2.bind(this)}>Comprometido</button>
          <button className='b-s-f' onClick={this.toggleHidden3.bind(this)}>Oficios</button>
          <button className='b-s-f' onClick={this.toggleHidden4.bind(this)}>Contrarecibos</button>
          <button className='b-s-f' onClick={this.toggleHidden5.bind(this)}>Complemento de Pago</button>
        </div>

        {this.state.isHidden === 1 &&
          <div className='m-f'>
            <form onSubmit={this.onSubmit}>
              <div className='f-f-c-w'>
                <div className='f-f'>
                  <div className='f-f2'>
                    <p className='fp'>Fondo</p>
                    <input
                      className='f-b-s'
                      value={this.state.contador.nFondo}
                      required
                    />
                  </div>
                </div>
                <div className='f-f'>
                  <div className='f-f2'>
                    <p className='fp'>Fecha</p>
                    <input
                      className='f-b-s'
                      required
                      value={today}
                    />
                  </div>
                </div>
                <div className='f-f'>
                  <div className='f-f2'>
                    <p className='fp'>Tipo de Documento</p>
                    {admin === 'ADMIN' &&
                      <DropDownList
                        suggest
                        style={{
                          borderColor: 'rgba(0,0,0,0.42)',
                          background: 'white',
                          height: '28px',
                          color: 'black',
                          position: 'static'
                        }}
                        data={this.tipo_doc}
                        allowCustom={allowCustom}
                        name='tipo_doc'
                        value={tipo_doc}
                        onChange={this.onChange}
                        required
                        ref='tipo_doc'
                      />}
                    {admin === 'NAYRA' &&
                      <DropDownList
                        suggest
                        style={{
                          borderColor: 'rgba(0,0,0,0.42)',
                          background: 'white',
                          height: '28px',
                          color: 'black',
                          position: 'static'
                        }}
                        data={this.tipo_doc}
                        allowCustom={allowCustom}
                        name='tipo_doc'
                        value={tipo_doc}
                        onChange={this.onChange}
                        required
                        ref='tipo_doc'
                      />}
                    {admin === 'LAURA' &&
                      <DropDownList
                        suggest
                        style={{
                          borderColor: 'rgba(0,0,0,0.42)',
                          background: 'white',
                          height: '28px',
                          color: 'black',
                          position: 'static'
                        }}
                        data={this.tipo_doc}
                        allowCustom={allowCustom}
                        name='tipo_doc'
                        value={tipo_doc}
                        onChange={this.onChange}
                        required
                        ref='tipo_doc'
                      />}
                    {admin === 'MIGUEL' &&
                      <DropDownList
                        suggest
                        style={{
                          borderColor: 'rgba(0,0,0,0.42)',
                          background: 'white',
                          height: '28px',
                          color: 'black',
                          position: 'static'
                        }}
                        data={this.tipo_doc}
                        allowCustom={allowCustom}
                        name='tipo_doc'
                        value={tipo_doc}
                        onChange={this.onChange}
                        required
                        ref='tipo_doc'
                      />}
                    {admin === 'TERESA' &&
                      <DropDownList
                        suggest
                        style={{
                          borderColor: 'rgba(0,0,0,0.42)',
                          background: 'white',
                          height: '28px',
                          color: 'black',
                          position: 'static'
                        }}
                        data={this.tipo_doc}
                        allowCustom={allowCustom}
                        name='tipo_doc'
                        value={tipo_doc}
                        onChange={this.onChange}
                        required
                        ref='tipo_doc'
                      />}
                    {admin === 'MARCOS' &&
                      <DropDownList
                        suggest
                        style={{
                          borderColor: 'rgba(0,0,0,0.42)',
                          background: 'white',
                          height: '28px',
                          color: 'black',
                          position: 'static'
                        }}
                        data={this.tipo_doc}
                        allowCustom={allowCustom}
                        name='tipo_doc'
                        value={tipo_doc}
                        onChange={this.onChange}
                        required
                        ref='tipo_doc'
                      />}
                    {admin === 'ELOY' &&
                      <DropDownList
                        suggest
                        style={{
                          borderColor: 'rgba(0,0,0,0.42)',
                          background: 'white',
                          height: '28px',
                          color: 'black',
                          position: 'static'
                        }}
                        data={this.tipo_doc}
                        allowCustom={allowCustom}
                        name='tipo_doc'
                        value={tipo_doc}
                        onChange={this.onChange}
                        required
                        ref='tipo_doc'
                      />}
                    {admin === 'KARINA' &&
                      <DropDownList
                        suggest
                        style={{
                          borderColor: 'rgba(0,0,0,0.42)',
                          background: 'white',
                          height: '28px',
                          color: 'black',
                          position: 'static'
                        }}
                        data={this.tipo_doc}
                        allowCustom={allowCustom}
                        name='tipo_doc'
                        value={tipo_doc}
                        onChange={this.onChange}
                        required
                        ref='tipo_doc'
                      />}
                    {admin === 'MARTHA' &&
                      <DropDownList
                        suggest
                        style={{
                          borderColor: 'rgba(0,0,0,0.42)',
                          background: 'white',
                          height: '28px',
                          color: 'black',
                          position: 'static'
                        }}
                        data={this.tipo_doc}
                        allowCustom={allowCustom}
                        name='tipo_doc'
                        value={tipo_doc}
                        onChange={this.onChange}
                        required
                        ref='tipo_doc'
                      />}
                    {admin === 'LILIA' &&
                      <DropDownList
                        suggest
                        style={{
                          borderColor: 'rgba(0,0,0,0.42)',
                          background: 'white',
                          height: '28px',
                          color: 'black',
                          position: 'static'
                        }}
                        data={this.tipo_doc}
                        allowCustom={allowCustom}
                        name='tipo_doc'
                        value={tipo_doc}
                        onChange={this.onChange}
                        required
                        ref='tipo_doc'
                      />}
                    {admin === 'CENELY' &&
                      <DropDownList
                        suggest
                        style={{
                          borderColor: 'rgba(0,0,0,0.42)',
                          background: 'white',
                          height: '28px',
                          color: 'black',
                          position: 'static'
                        }}
                        data={this.tipo_doc}
                        allowCustom={allowCustom}
                        name='tipo_doc'
                        value={tipo_doc}
                        onChange={this.onChange}
                        required
                        ref='tipo_doc'
                      />}
                    {admin === 'HECTOR' &&
                      <DropDownList
                        suggest
                        style={{
                          borderColor: 'rgba(0,0,0,0.42)',
                          background: 'white',
                          height: '28px',
                          color: 'black',
                          position: 'static'
                        }}
                        data={this.tipo_doc}
                        allowCustom={allowCustom}
                        name='tipo_doc'
                        value={tipo_doc}
                        onChange={this.onChange}
                        required
                        ref='tipo_doc'
                      />}
                    {admin === 'OMAR' &&
                      <DropDownList
                        suggest
                        style={{
                          borderColor: 'rgba(0,0,0,0.42)',
                          background: 'white',
                          height: '28px',
                          color: 'black',
                          position: 'static'
                        }}
                        data={this.tipo_doc}
                        allowCustom={allowCustom}
                        name='tipo_doc'
                        value={tipo_doc}
                        onChange={this.onChange}
                        required
                        ref='tipo_doc'
                      />}
                  </div>
                </div>
                <div className='f-f'>
                  <div className='f-f2'>
                    <p className='fp'>Oficio de Autorización</p>
                    <DropDownList
                      suggest
                      style={{
                        borderColor: 'rgba(0,0,0,0.42)',
                        background: 'white',
                        height: '28px',
                        color: 'black',
                        position: 'static'
                      }}
                      data={this.oficio_aut}
                      allowCustom={allowCustom}
                      name='oficio_aut'
                      value={oficio_aut}
                      onChange={this.onChange}
                      required
                      ref='oficio_aut'
                    />
                  </div>
                </div>
                <div className='f-f'>
                  <div className='f-f2'>
                    <p className='fp'>No. de Oficio</p>
                    <input
                      className='f-b-s'
                      name='no_oficio'
                      onChange={this.onChange}
                      required
                      ref='no_oficio'
                    />
                  </div>
                </div>
                <div className='f-f'>
                  <div className='f-f2'>
                    <p className='fp'>No. de Licitación</p>
                    <input
                      className='f-b-s'
                      name='no_lici'
                      onChange={this.onChange}
                      required
                      ref='no_lici'
                    />
                  </div>
                </div>
                <div className='f-f'>
                  <div className='f-f2'>
                    <p className='fp'>Importe</p>
                    <input
                      className='f-b-s'
                      name='importe'
                      value={importe}
                      onChange={this.onChange}
                      required
                      ref='importe'
                    />
                  </div>
                </div>
                <div className='f-f'>
                  <div className='f-ff'>
                    <p className='fpb'>Importe letra</p>
                    <input
                      className='f-b-s'
                      onChange={this.onChange}
                      value={(NumberAsString(importe))}
                    />
                  </div>
                </div>
                <div className='f-f'>
                  <div className='f-ff'>
                    <p className='fpb'>Beneficiario</p>
                    <DropDownList
                      suggest
                      style={{
                        borderColor: 'rgba(0,0,0,0.42)',
                        background: 'white',
                        height: '28px',
                        color: 'black',
                        position: 'static'
                      }}
                      data={this.beneficiario}
                      allowCustom={allowCustom}
                      name='beneficiario'
                      value={beneficiario}
                      onChange={this.onChange}
                      required
                      ref='beneficiario'
                    />
                  </div>
                </div>
                <div className='f-f'>
                  <div className='f-ff'>
                    <p className='fpb'>Descripcción</p>
                    <input
                      className='f-b-s'
                      id='desc'
                      name='desc'
                      onChange={this.onChange}
                      required
                      ref='desc'
                    />
                  </div>
                </div>
              </div>
              <div className='l-f-c'>
                <div className='f-l-w'>
                  <div className='l-w'>
                    <p className='lp'>Licitación</p>
                  </div>
                  <div className='f-f3'>
                    <p className='lp'>Requisición Pedido</p>
                    <input className='f-l-s'/ >
                  </div>
                  <div className='f-f3'>
                    <p className='lp'>Número de Comprobantes</p>
                    <input className='f-l-s'/>
                  </div>
                  <div className='f-f3'>
                    <p className='lp'>Número CFDI</p>
                    <input className='f-l-s'/>
                  </div>
                  <div className='f-f3'>
                    <p className='lp'>Poliza Comprometido</p>
                    <input className='f-l-s'/>
                  </div>
                </div>
                <div className='f-l-w'>
                  <div className='l-w'>
                    <p className='lp'>Pago CFE</p>
                  </div>
                  <div className='f-f3'>
                    <p className='lp'>Cta CFE</p>
                    <input className='f-l-s'/>
                  </div>
                  <div className='f-f3'>
                    <p className='lp'>No Servicio CFE</p>
                    <input className='f-l-s'/>
                  </div>
                  <div className='f-f3'>
                    <p className='lp'>Observaciones</p>
                    <input className='f-l-s'/>
                  </div>
                </div>
              </div>
              <div className='button-row-s'>
                <button onClick={this.perro} className='input-sc boton-g'>Agregar</button>
              </div>
            </form>
          </div>}

        {this.state.isHidden === 2 &&
          <div className='com-com'>
            <form onSubmit={this.sendMessageCompro.bind(this)} ref='contactForm' className='fcc'>
              <div className='fc-w'>
                <div className='f-c-c'>
                  <p className='fc'>Partida</p>
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
                    data={this.partida}
                    allowCustom={allowCustom}
                    name='partida'
                    value={partida}
                    onChange={this.onChange}
                    required
                    ref={partida => this.inputPartida = partida}
                  />
                </div>
                <div className='f-c-c'>
                  <p className='fc'>Unidad Presupuestal</p>
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
                    data={this.up}
                    allowCustom={allowCustom}
                    name='up'
                    value={up}
                    onChange={this.onChange}
                    required
                    ref={up => this.inputUp = up}
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
                    ref={no_proyecto => this.inputNoProyecto = no_proyecto}
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
                    ref={municipio => this.inputMunicipio = municipio}
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
                    ref={area => this.inputArea = area}
                  />
                </div>
              </div>

              <div className='axc'>
                <div className='cx'>
                  <XmlComp />
                </div>
                <div className='cx'>
                  <XmlAsi />
                </div>
              </div>

              {/*<input
                value={(totalImporte.reduce(reducer))}
                name='total'
                onChange={this.onChange}
                ref={total => this.inputTotal = total}
              />*/}

              <div className='button-row-s'>
                <button type='submit' className='input-sc boton-g'>Agregar</button>
              </div>

            </form>

            <div className='table-fc'>
              <div className='tfc'>
                Partida
              </div>
              <div className='tfc'>
                Unidad P
              </div>
              <div className='tfc'>
                No. de Proyecto
              </div>
              <div className='tfc'>
                Importe
              </div>
              <div className='tfc'>
                ISR
              </div>
              <div className='tfc'>
                Total
              </div>
              <div className='tfc'>
                Fecha
              </div>
            </div>
          </div>}
// Fondo Revolvene
        {this.state.isHidden === 3 &&
          <div>
            <div className='m-f'>
              <div className='fr-con'>
                <p className='fr-b'><b>Fondo Revolvente</b></p>
              </div>
              <div className='fcc-i'>
                <p className='fimpre'>Solicitud Programatica</p>
                <button className='b-imp' onClick={() => this.props.history.push('/objetodegastoFR/IopOetql2iBVF1IAsFWd')}>Imprimir</button>
              </div>
              <div className='fcc-i'>
                <p className='fimpre'>Reembolso de FR</p>
                <button className='b-imp' onClick={() => this.props.history.push('/Rfr/IopOetql2iBVF1IAsFWd')}>Imprimir</button>
              </div>
              <div className='fcc-i'>
                <p className='fimpre'>Recibo Global FR</p>
                <button className='b-imp'onClick={() => this.props.history.push('/Recibo/IopOetql2iBVF1IAsFWd')}>Imprimir</button>
              </div>
              <div className='fcc-i'>
                <p className='fimpre'>Leyenda Alusivas  FR</p>
                <button className='b-imp' onClick={() => this.props.history.push('/Gasto/IopOetql2iBVF1IAsFWd')}>Imprimir</button>
              </div>
            </div>

            <div className='m-f'>
              <div className='fr-con'>
                <p className='fr-b' ><b>Pago Provedor por Requisición</b></p>
              </div>
              <div className='fcc-i'>
                <p className='fimpre'>Solicitud Programatica</p>
                <button className='b-imp' onClick={() => this.props.history.push('/Solicitudppr/IopOetql2iBVF1IAsFWd')}>Imprimir</button>
              </div>
              <div className='fcc-i'>
                <p className='fimpre'>Solicitud de PPR</p>
                <button className='b-imp' onClick={() => this.props.history.push('/ofisolicitudppr/IopOetql2iBVF1IAsFWd')}>Imprimir</button>
              </div>
              <div className='fcc-i'>
                <p className='fimpre'>Leyenda Alusivas</p>
                <button className='b-imp' onClick={() => this.props.history.push('/gastoppr/IopOetql2iBVF1IAsFWd')}>Imprimir</button>
              </div>
            </div>

            <div className='m-f'>
              <div className='fr-con'>
                <p className='fr-b' ><b>Gastos a Comprobar</b></p>
              </div>
              <div className='fcc-i'>
                <p className='fimpre'>Oficio Pago Proveedor</p>
                <button className='b-imp'onClick={() => this.props.history.push('/pagoproveedor/IopOetql2iBVF1IAsFWd')}>Imprimir</button>
              </div>
              <div className='fcc-i'>
                <p className='fimpre'>Solicitud Programatica</p>
                <button className='b-imp'onClick={() => this.props.history.push('/objetodegastoPP/IopOetql2iBVF1IAsFWd')}>Imprimir</button>
              </div>
              <div className='fcc-i'>
                <p className='fimpre'>Leyendas Alusivas al Gasto</p>
                <button className='b-imp'onClick={() => this.props.history.push('/Gastoprovee/IopOetql2iBVF1IAsFWd')}>Imprimir</button>
              </div>
            </div>


            <div className='m-f'>
              <div className='fr-con'>
                <p className='fr-b' ><b>Diciembre</b></p>
              </div>
              <div className='fcc-i'>
                <p className='fimpre'>Comprobacion de Gasto a Comprobar</p>
                <button className='b-imp'onClick={() => this.props.history.push('/comprobaciondegastocomprobar/IopOetql2iBVF1IAsFWd')}>Imprimir</button>
              </div>
              <div className='fcc-i'>
                <p className='fimpre'>Solicitud Programatica</p>
                <button className='b-imp'onClick={() => this.props.history.push('/objetodegastodiciembre/IopOetql2iBVF1IAsFWd')}>Imprimir</button>
              </div>
              <div className='fcc-i'>
                <p className='fimpre'>Leyendas Alusivas al Gasto</p>
                <button className='b-imp'onClick={() => this.props.history.push('/gastodiciembre/IopOetql2iBVF1IAsFWd')}>Imprimir</button>
              </div>
            </div>

            <div className='m-f'>
              <div className='fr-con'>
                <p className='fr-b' ><b>Caratula</b></p>
              </div>
              <div className='fcc-i'>
                <p className='fimpre'>Caratula</p>
                <button className='b-imp'onClick={() => this.props.history.push('/Caratula/IopOetql2iBVF1IAsFWd')}>Imprimir</button>
              </div>
            </div>

            <div className='m-f'>
              <div className='fr-con'>
                <p className='fr-b' ><b>Tabular</b></p>
              </div>
              <div className='fcc-i'>
                <p className='fimpre'>Tabular</p>
                <button className='b-imp'onClick={() => this.props.history.push('/Tabular/IopOetql2iBVF1IAsFWd')}>Imprimir</button>
              </div>
            </div>



          </div>}

        {this.state.isHidden === 4 &&
          <div>
            <div className='m-f'>
              <div className='fcc-i'>
                <p className='fimpre'>Fecha Contrarecibo:</p>
                <input />
              </div>
              <div className='fcc-i'>
                <p className='fimpre'>No. Contrarecibo:</p>
                <input />
              </div>
              <div className='fcc-i'>
                <p className='fimpre'>Fecha Deposito:</p>
                <input />
              </div>
              <div className='fcc-i'>
                <p className='fimpre'>Cuenta por Pagar:</p>
                <input />
              </div>
              <div className='fcc-i'>
                <p className='fimpre'>Beneficiario/Proveedor:</p>
                <input />
              </div>
              <div className='fcc-i'>
                <p className='fimpre'>Sujeto Contable:</p>
                <input />
              </div>
              <div className='fcc-i'>
                <p className='fimpre'>Solicitud Programatica:</p>
                <input />
              </div>
              <div className='fcc-i'>
                <p className='fimpre'>Monto:</p>
                <input />
              </div>
              <div className='fcc-i'>
                <p className='fimpre'>CPA:</p>
                <input />
              </div>
            </div>
          </div>}
      </div>
    )
  }
}
