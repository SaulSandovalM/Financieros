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
  municipio = ['Acatlán', 'Acaxochitlán', 'Actopan', 'Agua Blanca de Iturbide','Ajacuba','Alfajayucan','Almoloya','Apan','El Arenal','Atitalaquia','Atlapexco','Atotonilco el Grande','Atotonilco de Tula','Calnali','Cardonal','Cuautepec de Hinojosa','Chapantongo','Chapulhuacán','Chilcuautla','Eloxochitlán','Emiliano Zapata','Epazoyucan','Franciso I. Madero','Huasca de Ocampo','Huautla','Huazalingo','Huehuetla','Huejutla de Reyes','Huichapan','Ixmiquilpan','Jacala de Ledezma','Jaltocán','Juárez Hidalgo','Lolotla','Metepec','San Agustín Metzquititlán','Metztitlán','Mineral del Chico','Mineral del Monte','La Misión','Mixquiahuala de Juárez','Molango de Escamilla','Nicolás Flores','Nopala de Villagrán','Omitlán de Juárez','San Felipe Orizatlán','Pacula','Pachuca de Soto','Pisaflores','Progreso de Obregón','Mineral de la Reforma','San Agustín Tlaxiaca','San Bartolo Tutotepec','San Salvador','Santiago de Anaya','Santiago Tulantepec de Lugo Guerrero','Singuilucan','Tasquillo','Tecozautla','Tenango de Doria','Tepeapulco','Tepehuacán de Guerrero','Tepeji del Río de Ocampo','Tepetitlán','Tetepango','Villa de Tezontepec','Tezontepec de Aldama','Tianguistengo','Tizayuca','Tlahuelilpan','Tlahuiltepa','Tlanalapa','Tlanchinol','Tlaxcoapan','Tolcayuca','Tula de Allende','Tulancingo de Bravo','Xochiatipan','Xochicoatlán','Yahualica','Zacualtipán de Ángeles','Zapotlán de Juárez','Zempoala','Zimapán']
  area = ['Procuraduría General de Justicia','Subprocuraduría de Procedimientos Penales Región Oriente','Fiscalía Especializada para la atención de Delitos cometidos contra la Libertad de Expresión', 'Periodistas y Personas defensoras de los Derechos Humanos','Dirección General para la Atención de los Asuntos del Sistema Tradicional','Fiscalia de Delitos Electorales','Subprocuraduría de Derechos Humanos y Servicios a la Comunidad','Centro de Justicia Restaurativa Penal Poniente','Fiscalía para la Atención de Delitos de Género','Visitaduría General','Dirección General de Servicios Periciales','Centro de Operación Estratégica','Unidad Especializada en el Combate al Secuestro','Dirección General de Administración y Finanzas','Fiscalía Especializada para la atención de los Delitos de Trata de Personas','Subprocuraduría de Procedimientos Penales Región Poniente','Centro de Atención Temprana Poniente','Dirección General de Investigación y Litigación Poniente','Dirección General de la Policía Investigadora','Centro de Atención Temprana Oriente','Centro de Justicia Restaurativa Penal Oriente','Dirección General de Investigación y Litigación Oriente','Dirección General de Recursos Materiales y Servicios','Fiscalía Especializada en Delitos de Corrupción','Fiscalía Especializada en Materia de Desaparición Forzada de Personas',]
  beneficiario = ['Mtro.León Maximiliano Hernández Valdés', 'Operadora Omx Sa De CV','AASI INNOVACIONES SA DE CV','Abigail Santillán Moreno','Abraham Andrade Ortiz','Abraham Peña Pérez','Acabados Decorativos De La Huasteca SA De CV','Aceites Y Combustibles Los Ángeles SA De CV','Aceros Damarin SA De CV','Adarick Vite Aranda','Administradora De Centros Comerciales Santa Fe SA De CV','ADOLFO PAZ RIANCHO','Adrián Guevara Rivera','Adrián Guillermo Cueto Hernández','Adriana Ávila Rodríguez','MOTOR AVANZADO REBUIDING SA DE CV','Aeropuertos Y Servicios Auxiliares','Aerovías De México Sa De CV','Agaturismo SA De CV','Aianeli SA De CV','Aianeli SA De CV4','Alberto Alfonso Galindo Galindo','Alberto Severino Jaén Olivas','Aldo Ramírez Cerón','Aldo Román Mendoza García','Alejandra López Alvarado','Alex Steak SA De CV','Alfredo Edmundo Galindo Pérez','Alfredo Laris Hernández','Alheli Paredes Licona','Alma Gabriela Mendoza Rojas','Alma Rosa Basilio Garfias','Aluminio García','Álvaro Samperio Le-Vinson','Ana Fernanda Zapata Santana','Ana Fernanda Zpata Santana','Ana Laura Zacatenco Luna','Ana María Hernández López','Ana Perla Margarita Mendoza Espino','Andrade Bertoloni Arturo','Andrés Guillen Hernández','Andrés Téllez Pino','Ángela Pérez Prado','Angélica González Sánchez','Angélica Morales Avilés','Angélica Sánchez Martínez','Antojitos La Finca','Antonio Lugo Rosas','Aquilino Edgar Herrera Rodríguez','Araceli Pérez Jarillo','Arellano Miranda Elizabeth','Arlan José Chávez Lara','Arlette Macías Escorcia','Armando Miguel Carpio López','Arnulfo Ramírez Cerón','Arturo Cano García','Arturo Flores Meléndez','Arturo Tinajero Jaimes','Aseca, SA de CV','Autobuses Coordinados Zimapan Valles','Autobuses De Oriente Ado SA De CV','Autobuses De Primera Clase','Autobuses Estrella Blanca SA De CV','Autobuses Estrella Blanca Sa De CV','Autobuses México-Zamapan Valle Flecha Roja SA','Autobuses Valle Mezquital S., A. De CV','Autógena De Hidalgo SA De CV','Autogena de Hidalgo, SA de CV ','Autopista Arco Norte Sa De CV','Autopistas Arco Norte SA De CV','Autos Pullman Sa De CV','Autoservicio Jocaran de Progreso, SA de CV','Autoservicio Jocaran SA de CV','Autotransportes De Hidalgo .SA De CV','Autotransportes Del Valle Del Mezquital SA De CV','Autovía Necaxa-Tihuatlan Sa De CV','Autozone De México, S. De RL De CV','Banco Mercantil Del Norte SA De CV','Basualdo Rojo Honey','Beatriz Montaño Jarillo','Beatriz Penélope Isleim Castorena Cortes','Bensaa SA De CV','Berenice Soto Hernández','Bianca Ofelia Galarza Trejo','Blanca Trejo Bautista','Brenda Alemon Hernández','Brenda Leticia Rangel Lugo','Brenda Minelly López López','Burger La Fiesta','C Frank Alexander Veytia ViejoIEJO','C. Adolfo Paz Riancho','C. Alejandra Fonseca Rincon','C. Carlos Haua Bulos','C. Claudi Ramirez Lopez','C. Efren Rodriguez Ramierez','C. Elizabeth Arellano Miranda','C. Erika Jazimin Resendiz Trejo','C. Frank Alexander Veytia Viejo','C. Ines Cruz Hunter','C. Javier Santa Cruz Garcia','C. Jose Luis Magaña Cabrera','C. Jose Luis Zacatenco Lopez','C. Jose solis Gonzalez','C. Leticia Saavedra Nesbaid','C. Luis Eduardo Nahle Pascual','C. Maria De Rosario Gomez Urbina','C. Russel Barradaz Sanchez','C. Saul Salinas Gonzalez','C. Silverio Gonzalez Cuca','C. Wencesñap Sanchez Estrada','C.Lesticia Saavedra Nesbaid','Cadena Comercial Oxxo Sa De CV','Cadena Comercial Oxxo, Sa De CV','Café Estaciones','CAMINO REAL','CAMINOS Y PUENTES FEDERALES','Caminos Y Puentes Federales De Ingresos Y Servicios Conexos','LAVADO DE COCHES LA CUBETA DIGITAL','CARBU EXPRESS, SA DE CV','CARLOS ANTONIO MORALES GARZA','CARLOS ANTONIO QUINTO RIOS','Carlos Antonio Quinto Ríos','CARLOS CELIO ESQUIVEL','Carlos Daniel Ortiz Chavez','Carlos Godinez Perez','Carlos Godínez Pérez','Carlos Haua Bulos','Carlos Luis Gómez Arguelles','Carlos Martin Torres Juárez','Carlos Primitivo Vega Valle','Carreteras Del Pacifico','Caseta Metlapil','Caseta Miradores','Catalina Martínez Guerrero','Cecapiem SA De CV','Cele Filiberto Martínez Cordero','Celia Esparza Loreto','Centro De Copiado','Centro de verificación De Verificación Takechi ​​SA de CV','Cerrajería Aranda','Cerrajería Móvil El Saucillo','Cerro De Biznagas S, A De CV','CFE Suministridor De Servicios BasicosS','City Club','Claudia Corte Herrera','Claudia Judith Flores Leyva','Claudia Mota Rojas','Claudia Ramierez Lopez','Claudia Ramírez López','Cocina Económica La Güerita','Cocina Económica La Parroquia','Cocina Tradicional Campestre De 1981','Coel SA De CV','Com. De Agua Pot. Alcant Y san. Del Mpio De Huichapan','Combustibles Bentan SA DE CV','Combustibles De Pachuca SA De CV','Combustibles Rumloc SA De CV','Comercial Mexicana','Comercial Miura SA DE CV (Sistema De Vigilancia)','Comercializadora Farmacéutica De Chiapas Sapi De CV','Comercializadora Y Distribuidora Brime SA De CV','Comisión Bancaria','Comisión De Agua De Actopan','Comisión De Agua De Actopan Hgo','Comisión De Agua De Tula De Allende','Comisión De Agua De Zimapan','Comisión De Agua Huichapan','Comisión De Agua Ixmiquilpan','Comisión De Agua Mixquiahuala De Juárez','Comisión De Agua Pachuca','Comisión De Agua Potable Y Alcantarillado Del Municipio De Mixquiahuala De Juarez','Comisión De Agua Potable, Alcantarillado Y Saneamiento Del Municipio De Ixmiquilpan, Hgo','Comisión De Agua Potable, Alcantarillado Y Saneamiento Del Municipio De Zimapan, Hgo','Comisión de Agua y Alcantarillado De Sistemas Intermunicipales','Comisión De Agua Y Alcantarillado Del Municipio De Actopan Hidalgo','Comisión De Agua Y Alcantarillado Del Municipio De Tula De Allende','Comisión Federal De Electricidad','Compañía Santa María SA De CV','Concesionaria Autopista Perote-Xalapa.','Concesionaria De Vías Troncales SA De CV','Concesionaria Mexiquense SA De CV','Concesiones Y Promociones Malibran','Conexiones Y Mangueras De Pachuca SA De C V.','Consultora Informática','CONTEXPRESS S DE RL DE CV','Copias Neo SA De CV','Copicentro Pachuca','Corporativo Farmacias Mas SA De CV','Corporativo Yunes Márquez SA De CV','Corte Herrera Claudia','Cortesía En Viajes S. De RL De CV','CRIMELAB SA DE CV','Cristina González Cantera','Curso','El Delito De Feminicidio','Cutberto Rodríguez Álvarez','Cynper SA De CV','China Town','Dagoberto Mendoza Morales','Daniel García Luna','Daniel Becerra Castañeda','Daniel García Luna','Daniel López Carrasco','Daniel Miramontes Flores','Daniel Zarate Santiago','David Adrián Martínez Santiago','David Richard Uribe','De Tula De Allende, Hgo.','Delia Serrano Morales','Deportes Pachuca SA De CV','Desarrollo Hotelero De Plaza Pachuca Sa','DEVSOFT SA DE CV','Dhl Exprés México SA De CV','Diana Araceli Zaldívar Cruz','Diana Gálvez Mendoza','Diego Alberto Acevedo De La Rosa','Diego Alberto Espinosa Islas','Dilia Ramos Montaño','Distribuciones Mogu SA DE CV','Distribuidora De Abarrotes Y Semillas De Pachuca SA De CV','Distribuidora De Alimentos Th, SA De CV','Distribuidora Del Manual Moderno SA De CV','Distribuidora El Manual Moderno SA De CV','Distribuidora Fragoso','Domínguez Díaz Daniel','Drícela Austria Serna','Drivecare, SA de CV','Dulce María Calva Sánchez','Edgar Aquilino Herrera Rodríguez','Edgar Dante Rosas Islas','Edgar Mendoza Ceron','Edgar Rabindranath Valdespino Zubieta','Edith Rojas Camacho','Edmundo Alfredo Galindo Pérez','Edson Aguilar Romero','El Palacio De Hierro SA De CV','El Parador De San José','El Pelón Dulcerías','el rincon de periban','El Rincón De Periban','Elda Ceseña Banquera','Eléctrica Ángeles','Eléctrica Barba SA De CV','Electro pura S. De RL De CV','Electropura S. De RL De CV','Elfego Baltazar Piña Verde','Eli Rodríguez Del Ángel','Elideth Sarahi Dorantes López','Elisa Ramírez Escamilla','Eliseo Martínez Ballesteros','Eliu Morales Fragoso','Elizabeth Arellano Miranda','Elizabeth Salinas Aguilar','Elizabeth Troncoso Escamilla','Eloísa Camargo Hernández','Elsa Patricia Rodríguez Reyes','Emilio Prieto Perez','Emilio Prieto Pérez','Emmanuel Ceseña Barquera','Envasadoras De Aguas En México S. De RL De CV (Bonafont)','Eric Salvador Rosas Villa','Erick Jovanni Flores Varela','Erick Mendoza Hernández','Erick Salvador Rosas Villa','Erika Cruz Pérez','ERIKA JAZMIN RESENDIZ TREJO','Ernesto Skewes López','Esli Domínguez Trejo','Especialistas en Alta Cocina SA De CV (Wings)','Esperanza González Díaz','Espinosa Ostos Blanca Deyanira','Estación Acevedo S. De RL','Estación De Servicio Ana SA De CV','Estación De Servicio Ariel SA De CV','Estación de Servicio EMAJUFH SA de CV','Estación De Servicio La Mora','Estación De Servicios Gesa SA De CV','Estación Real De La Plata SA De CV','Estación Santa María La Providencia SA De CV','Estación Valle Dorado SA De CV','Estacionamiento La Posta','Esteban Leopoldo Cartelazo Islas','Esteban Leopoldo Castelazo Islas','Eugenia Vite Silvestre','Eva Pérez Hernández','Eva Rivera Samitez','Fabián Bernardo Moreno Gómez','FABIOLA GONZALEZ OROZCO','Fabiola Santillán García','Farmacias Guadalajara SA De CV','Farum Servicios SA De CV','Fejsa Computaion Y Oficinas De Pachuca SA De CV','FELIPE JIMENEZ GUTIERREZ','Felipe Jiménez Gutiérrez','Felipe Simón Olvera Castelán','Felisa Lugo Chavero','Feliz Ernesto Reyes Molina','Fernando Hidalgo Vergara','Ferre hogar','Ferretería Y Plomería Casa Martínez','Fideicomiso Autopistas Y Puentes Del Golfo Centro','Fierros Y Laminas De Pachuca SA De CV.','Fiesta Inn Pachuca','Filiberto Barrera Dávila','Flor Eugenia Vargas Herrera','Fondo Nacional De Infraestructura','Forlac Store SA De CV','Francisca Quiroz Uribe','Francisco Raúl García Bolio','Francisco Ventura Martínez','Fuente De Sodas Chino´S','Gabriel López Hernández','Gabriela Romero Campos','Manual García Moreno Víctor','Garza Gas De Hidalgo SA De CV','Gas De Provincia Sa De CV','Gas Fast SA De CV','Gas Imperial De Axapusco SA De CV','Gasamake SA De CV','Gasolineria Agua Blanca SA De CV','Gasolineria Rodjaq SA De CV','Gasomer SA De CV','Gastrosur SA De CV','Genaro Oswaldo Márquez Gutiérrez','Germa Mantenimiento Y Diseño SA De CV','Gertell Combustibles SA De CV','Gibran Copca Chávez','Gilberto Bárcenas López','Gilberto Espinosa Ramírez','Gloríela Islas Sosa','Gobierno Del Df Curso Delito De Feminicidio','Gobierno del Estado de Veracruz','González Islas Bernardo','Graciela Moreno Arce','Graciela Moreno Rodríguez','Graciela Taide Quiroz Gutiérrez','Grupo Autopistas Nacionales SA De CV','Grupo Autopistas Nacionales, Sa De CV','Grupo Bekim Empresarial S DE RL DE CV','Grupo Cravioto Distribuciones SA De CV','Grupo Estrella Blanca SA De CV','Grupo Galume SA De CV','Grupo Helen Gasolinera Excelencia y Calidad SA de CV','Grupo O Port SA De CV','Grupo Parisina SA De CV','Grupo Suzuka Argenta SA De CV','Guadalupe Hernández Escamilla','Guillermo Harold Barría García','Gustavo Said Gonzalez Tapia','Gustavo Trejo Montalvo','Gutiérrez Rodríguez Juan Ramón','Guy Jesús Quijano Austria','H. Roberto Aguilar Galindo','Hacienda Yextho','Hacobo Flores Pérez','Héctor Santos González Reyes','Heriberto Padilla Contreras','Herlaz Sistemas de Comunicación SA De CV','HERLAZ SISTEMAS DE COMUNICACIÓN SA DE CV','Herlaz Sistemas De Comunicación, Sa De CV','Hermelinda Peña Hernández','Hernández Valencia Rosalía','Herrera Motors De Hidalgo SA De CV','Herrera Motors De Hidalgo SA De CV','Restaurante Hidalgo Platillos Regionales','Hidrocarburos Hidalgo S, .A De CV','Hidrocarburos Santa Catarina SA De CV','Hidrosina Plus SA De CV','Hilda Lorena Torres Guerrero','Home Depot México S De RL De CV','Hotel Y Restaurante Tezoli','Hoteles Eco turísticos Mexicanos SA De CV','Hoteles Sheraton S. De RL De CV','Huichapan Hgo','Impulsora De Transportes Mexicanos SA De CV','Industrias Long Meng S. De RL Mi','Ines Cruz Hunter','Ing. Rogelio Alberto Téllez Rojo','Ingrid Minerva Rodríguez Vera','Interhidalguenses','Irving Ortiz Flores','Isidro Granados Guerra','Israel Islas Castañeda','Iván Ramírez Hernández','Ivonne Munguía Becerra','J. Irais González García','Jacobo Flores Pérez','Jaime Zapata Venegas','Janeth Olvera Salinas','Jaqueline Gálvez De La Peña','Javier González Mejía','JAVIER LEO CUEVAS','Javier Rodríguez Robles','Javier Santa Cruz Garcia','Javier Santacruz García','Jessica Denisse Zuñiga Rosales','Jesús Elías Salinas Baños','Jesús Ríos Islas','Joao Israel Villegas Trejo','Joaquín Escobar Baños','Johanna Beatriz Hidalgo Hernández','Jorge Erick Piña Vite','Jorge Vargas Martínez','Jose Alfonso López Rubio','José Alfredo Elizalde Hernández','José Antonio Calderón López','José Antonio Jiménez Rodríguez','JOSE ANTONIO SILVA MORENO','José Armando Reyes Samperio','José Augusto Fuentes Marín','José Carlos Vargas Bonetta','José De Jesús Franco Solís','José De Jesús López Peña','José González Beltrána','José Guadalupe Sánchez Guerrero','Jose Ivan Gutierrez Najera','José Jaime Acosta Castro','José Juan Moreno Valle','José Luis Hernández Rosales','José Luis Hidalgo López','JOSE LUIS MAGAÑA CABRERA','José Luis Salinas Elizalde','José Luis Serrano Arroyo','JOSE LUIS ZACATENCO LOPEZ','José Luis Zacatenco López','José Manuel Hernández Hernández','JOSE NERI ISLAS MARTINEZ','José Román Cárdenas Pizano','Jose Roman Pizano Caredenas','Jose Solis Gonzalez','José Solís Gonzále','Josselin Sixto Ruiz','Juan Alberto Peralta Vázquez','Juan Carlos Ángeles Baltazar','Juan Carlos Salinas Rodríguez','Juan Carlos Vergara Bonneta','Juan Gustavo Perez Gónzalez','Juan Hernández Olvera','Juan Iv Rodríguez Sánchez','Juan Leticia Elizalde Zendejas','Juan Manuel García Guzmán','Juan Manuel García Guzmán','Juan Manuel García Hernández','Juan Manuel Lugo Nacif','Juan Manuel Zaldívar Chiapa','Juan Rafael Canales Ángeles','Juan Ramón Gutiérrez Rodríguez','Juan Ramón Vázquez Cruz','Juana Magdalena Ambrosio Vargas','Juana María Escamilla Vázquez','Juana Vargas López','Juárez Hidalgo','Judith M. Luna Mejía','Julieta García Esquivel','Julio Alberto Santillán García','Julio Cesar Salinas González','Julio Rosales Reyes','Julissa Ortiz Barrera','Juventino Pérez Lemoine','Jv Renta','Karen Alina Overa Santos','Karen Judith Márquez Espinoza','Karla Carolina Rivera Escalona','Karla Lizzett Flores Rodríguez','Karla Yadira Hernández Hernández','Kemuel SA De CV','Miguel Oscar De La Vega Bezies','La Braza Arracheras','La Casa Del Juego','La Cubeta Digital','La Flor De Michoacán','La Luz Roja','Laboratorio Coahuila SA De CV','Latanst SA De CV','Latitud 5 Estrellas SA De CV','Laura Cristina Berber Vicaña','Laura Piña Serrano','Laureano Campa Zúñiga','Lazcano Ortiz Beatriz','Lenin Alejandro Castañeda Baños','Leticia Ignacio Mejía','Leticia Saavedra Nesbaid','Lilia Lugo Mejía','Liliana Flores Rossette','Liliana Yazmin Franco Castro','Linda Crystal García Doniz','Liz Arely Castelán Bautista','Liza Angélica Islas Rivera','Lizbeth Pizana Olvera','Lonchería María Isabel','Los Cazadores','Los Negritos Restaurant Bar','Lucero Pérez González','Luis Alberto Ávila Osorio','Luis Angel Mayen Garcia','Luis Ángel Mayen García','Luis Martínez Mejía','Luis Serfain Henkel Castañeda','Luis Vargas Trejos','Luisa Lagarde Vásquez','Llanterama Hidalguense SA De CV','Ma. Elena Lugo Chavero','Ma. Guadalupe Vite Carlos','Macaria Pérez Guerrero','Maderia Rual SA De CV','Maderería Rual SA De CV','Mangueras, Herramientas Y Equipos SA De CV','Manuel Alejandro Calva Hinojosa','Manuel Felix Durán Pérez','Manuel Félix Duran Pérez','Manuel García Guzmán','Maquiladora Espani SA De CV','Marcela Cerón Díaz','Marcelo Ángeles Tivo','Marco Antonio Hernández Gómez','Marco Antonio Hernández Monroy','Marco Antonio López Hernández','Marco Antonio Reyes Hernández','María Alejandra Trejo García','María Catalina Martínez Guerrero','María Cecilia Hernández Castillo','María Concepción Hernández Aragón','María Del Carmen Quintero Bautista','María Del Mar Reyes Pérez Tagle','María Del Rosario González Martínez','María Del Socorro Chávez González','María Erika Ángeles De Haro','María Guadalupe Dávila Hernández','María Guadalupe González Vargas','María Guadalupe Salguero Hernández','María Isabel Teniente Llanos','María José Granillo Granillo','María Leticia Aldana Ugalde','María Luisa Martínez Ortega','María Ramírez Alvarado','María Sofía Escalante Reyes','María Teresa Oliver León','María Trinidad Hernández Rodríguez','Maribel Castro Ángeles','Maribel Olvera Avilés','Maribel Santos Bretado','Mario Luis Zacatenco Viornery','Mario Rodríguez González','Marisarcos Del Distrito Federal SA De CV','Marisol Rivera Vazquez','Marisol Rivera Vázquez','Marlen Pelcastre Nochebuena','Marlen Pérez Cervantes','Marressa Yuzim Picazo Cabrera','Martin Márquez Loyola','Martin Vivar Cazañas','Mary Carmen Ramírez Ríos','Materiales Azulejos Sanitarios Y Ferretería SA De CV','Materiales Hermanos Roldan SA De CV','Materiales Para Construcción SA De CV','Mauro Francisco López Castillo','Mayra Pérez Nájera','Mayra Santa Madrigal Limón','Megapapelera Nixa','Melo Cordero Leticia','Mendoza Tovar Palmira','Meneses Lozada Martin','Mercedes Citlalli Mendoza Meza','Mi Casa','Microvisa Mg Sa De CV','MICROVISA MG SA DE CV','Microvisa SA De CV','Miguel Alejandro Flores Gomez','Miguel Ángel Aguilar Hernández','Miguel Ángel Chávez Trejo','Miguel Ángel Martínez Montiel','Miguel Angel Perez Gonzalez','Miguel Odon Olvera Pérez','Miguel Oscar De La Vega Bezies','Miguel Reyes Valdovinos','Minerva Cruz Licona','Mirage Perisur','Modesta López Canales','Modesta Vázquez Carmona','Mofles González','Multiproductos de Leon SA De CV','Mundo De Mangueras Y Conexiones','Mundo Tool México SA De CV','Nadia Luisa Gavioto Romero','Nallely Roldan Sosa','Nami Pachuca, SA de CV','Nancy Herrera Romero','Nancy Jaramillo Díaz','Narciso Ortiz Velázquez','Nayelhi Chávez Rodríguez','Nayeli Alejandro Calva Hinojosa','Nikzor Travel Sa De CV','Noé Olivia Ramírez Trejo','Noé Olvera Meza','Noel Chávez Martínez','Norma Salinas Alcántara','Novedades Gastronómicas Reforma S. De RLL De CV','Nueva Wal Mart De México, S. De RL De CV','Obed Hernández Carreto','Odt','Office Depot De México SA De CV','Omaña Servicio A Equipo SA De CV','Omar Daniel Hernández García','Omar Guadalupe Cano Fragoso','Omar Pacheco Cortes Rangel','Operadora Omx SA De CV','Operadora Parador De San Javier SA De CV','Operadora Vips S De RL De CV','Oscar Cruz Pérez','Oscar Felipe Serrano Cruz','Oscar Flores Rivera','Oscar Leopoldo Guasso Soto','Ovni Bus SA De CV','Pablo Espinosa Acuña','Pachua-Actopan Ixmiquilpan SA De CV','Pai','Panadería Y Pastelería Geo SA De CV','Paola Romero Guerrero','Paquetexpress','Parrin SA De CV','Patricia Montejo Reyes','Paxair De México SA De CV','Pedro Acosta Rodríguez','Pedro Angel Cabrera Angeles','Pedro Ángel Cabrera Ángeles','Pérez Hernández Javier','Pérez Licona Eduardo','Perkin-Elmer De Meico SA','Pétreos Las Glorias SA De CV','Petreos Las Glorias, SA de CV','Pétreos Sol SA De CV','Petreos Sol, SA de CV','Pinturas En General','Plásticos Jang','Policía Industrial Bancaria del Estado de Hidalgo, SA de CV','Plomoelectrica DE Hhidalgo SA De CV','Posadas De Latinoamerica SA De CV','Pr0ocomex Pachuca SA De CV','PR0OCOMEX PACHUCA SADE CV','Presidencia Municipal','Procomex De Pachuca SA De CV','Promogas SA De CV','Promotora De Autopistas Del Pacifico .SA De. CV','Promotora De Desarrollo Hidalguense SA De SV','Promotora Y Administrador De Carreteras SA De CV','Proyectos Y Construcciones Téllez-Islas','Quintero Vega Irma Lilia','Quiroz Nava Rodrigo','Radio Shack De México SA De CV','Rafael De Jesús Aguirre Ramos','Rafael Herrera Tanco','Rafael Medina Ugalde','Ramírez Arce Mónica','Ramón Ensatiga Morales','Raúl Badillo Ramírez','Raúl Rivera Rodríguez','Raúl Téllez Romero','Rebeca Rangel Copca','Relleno Sanitario','Rembolso De Gasto Arrendamiento Huejutla','Descanso. Mirage Guerrero','Restaurante La Nacional','Restaurante La Vega','Restaurante Quetos','Restaurante California SA De CV','Restaurante Colonial','Restaurante Familiar El Parador De San José','Restaurante Genisa SA De CV','Restaurante Gorditas La Guerra','Restaurante Mirage SA De CV','Restaurante Terrassa De Mirage','Restaurantes California SA De CV','Restaurantes Toks SA De CV','Restaurantes Tu Lunch Sa De CV','Reyes Benítez Karla Leticia','Reyna Meneses Domínguez','Rhema Publicidad','Ricardo Jorge Gonzales Cortes','Ricardo Lázaro Ludlow Zavaleta','Roberto Carlos López Mercado','Roberto González Hernández','Roberto Octavio Tripp Resendiz','Roberto Rodríguez Aguilar','Roberto Rodríguez Romero','Rodolfo García Flores','Rodrigo Quiroz Guerrero','Rodríguez García Edgar Fernando','Rodríguez Rendón Jesús','Rodríguez Reyes Humberto','Roesp Asociados SA De CV','Rogelio L. Moreno Arce','Rogelio Leopoldo Moreno Arce','Romel','Romero Hoyos Ana María','Rosa María Lara Téllez','Russel Barradaz Sanchez','Sabas Hernández Sánchez','Salvador Eric Rosas Villas','Salvador Espinosa Arellano','Sanborn Hermanos SA','Sandra De Elías Vichis','Santos De La Paz SA De CV','Saúl Salinas González','Scden Sa De CV','SCDEN SA DE CV','Sergio Antonio Hernández Suárez','Sergio Antonio Priego Reséndiz','Sergio Ashane Bulos','Sergio Baca Olivo','Sergio Fernando González Cruz','Sergio Jesús Reyes Trejo','Sergio Piña Delgado','Sergio Rivera Chapa','Servicio Acapulco Diamante SA De CV','Servicio También SA De CV','Servicio Apan, SA de CV','Servicio Cúpula SA De CV','Servicio El Once SA De CV','Servicio Huichapan SA De CV','Servicio Jacala SA De CV','Servicio Jacala, SA de CV','Servicio La Fuente SA De CV','Servicio La Loma SA De CV','Servicio Lara SA De CV','Servicio Lara. SA de CV','Servicio Los Cues, SA de CV','Servicio Molango SA de CV','Servicio Monteverde SA De CV','Servicio Parador Santa Bárbara SA de CV','Servicio Postal Mexicano','Servicio Rangel SA De CV','Servicio Rangel, SA de CV','SERVICIO SIOLEN','Servicio Técnico De Hidalgo SA De CV','SERVICIO TEOCALCO SA DE CV','Servicio Toda SA De CV','Servicio Toda, SA de CV','SERVICIO XO SA. DE CV','Servicio Zacualtipan SA de CV','Servicio Zacualtipán SA De CV','Servicio Zacualtipan, SA de CV','SERVICIOS AUTOMOTRICES DE IXMIQUILPAN SACV','SERVICIOS DE INGENIERIA NOAR SA DE CV','Servicios Energéticos de Tizayuca, SA de CV','Servicios Fayad Sa De CV','Servicios Fayad, SA de CV','Servigilga SA De CV','SERVIPROGRESO SA DE CV','Silverio Gonzalez Cuca','Socorro García Ibarra','Socorro Guadalupe Gómez Martínez','Socorro Reséndiz Mancera','Sofía Moedano Flores','Solano Gudiño María Elena','Soluciones Hidraiulicas Arum SAS De CV','Sonia Amparo Mota Olguín','Sotero Palacios Hernández','Sotero Vega Ana','Soto Arriaga Faustina','Sue Ivalu Castillo Asuna','Sumigas SA De CV','Súper Papelera SA De CV','Súper Servicio Meta SA De CV','Súper Servicio Rodríguez SA De CV','Supplyco SA De CV','Susana Peláez Lara','Tahití Silvia Mayorga González','Tania Gema Estrada Alamilla','Tania Vargar Sanchez','Tapia Hernández Luz','Taquería El Mesón De Los Ángeles','Taquería No Que No','Tarifa Promocional Xalapa- Veracruz','TEQUIMEC S DE RL DE CV','Teresa Berenice Tovar Martínez','Teresa Del Niño Jesús Carbajal','Teresa Martínez Martínez','Teresa Salgado García','Tiendas Comercial Mexicana SA De CV','Tiendas Chedrahui SA De CV','Tiendas Soriana SA De CV','Tiendas Soriana Sa De CV','Tintorería Del Norte Del Jardín Colon SA De CV','Tintorerías Gofer SA De CV','Tlapalería Acosta','Tomás Alejandro Herrera Pérez','Tomás Daniel Montes Silverio','Tomasa Villegas Lazcano','Transportes Tepehuas','Trico Pachuca SA De CV','Urbanos Y Suburbanos De Tula SA De CV','Valores Energéticos SA De CV','Valle De Mixquiahuala','Vanguardia Gastronómica Presidente SA De CV','Verificación Ambiental De Hidalgo SACV','Verónica Pérez Reyes','VESALIUS SA DE CV','Vianey Vega Maldonado','Viaticum Valdespino SA De CV','Vicente Ruiz Tapia','Víctor Gerardo Zúñiga Aguirre','Víctor Hernández Gómez','Víctor Hugo Gallardo Garduño','Víctor Hugo Morgado Calva','VINIMED SA DE CV','Violeta Belen González Tapia','Vulcanizador Y Seccionadora', 'El Chacón','Vulcanizadora', 'Juan C. Doria' ,'Vymec Fuego SA De CV','Wenceslao Sanchez Estrada','Xochil Zenteno Velasco','Yadira Del Carmen Sánchez Nanduca','Yahiti Silvia Mayorga González','Yamil Hernández García','Yessenia Zamora Soto','Yolanda Aragón Quiroz','Yolanda Felicitas Tenorio Vargas','Yolanda Samperio Delgadillo','Yuridia Laguna Peña','Zehidy Ortiz Granillo','Zoila Ángeles Tello','Zulema Anahí Contreras Vizzuet']

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
                type='date'
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
