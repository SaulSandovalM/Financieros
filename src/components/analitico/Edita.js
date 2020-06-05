 import React, { Component } from 'react';
import firebase from '../../Firebase';
import './Analitico.css';
import { DropDownList } from '@progress/kendo-react-dropdowns';

class Edita extends Component {

  partida = ["SFP-CPF-01-0020/2020", "SFP-CPF-01-0010/2020", "SFP-CPF-01-0724/2020", "SFP-CPF-01-0681/2020", "SFP-CPF-01-DFDP-0949/2020"];
  proveedor = ["Mtro.León Maximiliano Hernández Valdés", "Operadora Omx Sa De CV","AASI INNOVACIONES SA DE CV","Abigail Santillán Moreno","Abraham Andrade Ortiz","Abraham Peña Pérez","Acabados Decorativos De La Huasteca SA De CV","Aceites Y Combustibles Los Ángeles SA De CV","Aceros Damarin SA De CV","Adarick Vite Aranda","Administradora De Centros Comerciales Santa Fe SA De CV","ADOLFO PAZ RIANCHO","Adrián Guevara Rivera","Adrián Guillermo Cueto Hernández","Adriana Ávila Rodríguez","MOTOR AVANZADO REBUIDING SA DE CV","Aeropuertos Y Servicios Auxiliares","Aerovías De México Sa De CV","Agaturismo SA De CV","Aianeli SA De CV","Aianeli SA De CV4","Alberto Alfonso Galindo Galindo","Alberto Severino Jaén Olivas","Aldo Ramírez Cerón","Aldo Román Mendoza García","Alejandra López Alvarado","Alex Steak SA De CV","Alfredo Edmundo Galindo Pérez","Alfredo Laris Hernández","Alheli Paredes Licona","Alma Gabriela Mendoza Rojas","Alma Rosa Basilio Garfias","Aluminio García","Álvaro Samperio Le-Vinson","Ana Fernanda Zapata Santana","Ana Fernanda Zpata Santana","Ana Laura Zacatenco Luna","Ana María Hernández López","Ana Perla Margarita Mendoza Espino","Andrade Bertoloni Arturo","Andrés Guillen Hernández","Andrés Téllez Pino","Ángela Pérez Prado","Angélica González Sánchez","Angélica Morales Avilés","Angélica Sánchez Martínez","Antojitos La Finca","Antonio Lugo Rosas","Aquilino Edgar Herrera Rodríguez","Araceli Pérez Jarillo","Arellano Miranda Elizabeth","Arlan José Chávez Lara","Arlette Macías Escorcia","Armando Miguel Carpio López","Arnulfo Ramírez Cerón","Arturo Cano García","Arturo Flores Meléndez","Arturo Tinajero Jaimes","Aseca, SA de CV","Autobuses Coordinados Zimapan Valles","Autobuses De Oriente Ado SA De CV","Autobuses De Primera Clase","Autobuses Estrella Blanca SA De CV","Autobuses Estrella Blanca Sa De CV","Autobuses México-Zamapan Valle Flecha Roja SA","Autobuses Valle Mezquital S., A. De CV","Autógena De Hidalgo SA De CV","Autogena de Hidalgo, SA de CV ","Autopista Arco Norte Sa De CV","Autopistas Arco Norte SA De CV","Autos Pullman Sa De CV","Autoservicio Jocaran de Progreso, SA de CV","Autoservicio Jocaran SA de CV","Autotransportes De Hidalgo .SA De CV","Autotransportes Del Valle Del Mezquital SA De CV","Autovía Necaxa-Tihuatlan Sa De CV","Autozone De México, S. De RL De CV","Banco Mercantil Del Norte SA De CV","Basualdo Rojo Honey","Beatriz Montaño Jarillo","Beatriz Penélope Isleim Castorena Cortes","Bensaa SA De CV","Berenice Soto Hernández","Bianca Ofelia Galarza Trejo","Blanca Trejo Bautista","Brenda Alemon Hernández","Brenda Leticia Rangel Lugo","Brenda Minelly López López","Burger La Fiesta","C Frank Alexander Veytia ViejoIEJO","C. Adolfo Paz Riancho","C. Alejandra Fonseca Rincon","C. Carlos Haua Bulos","C. Claudi Ramirez Lopez","C. Efren Rodriguez Ramierez","C. Elizabeth Arellano Miranda","C. Erika Jazimin Resendiz Trejo","C. Frank Alexander Veytia Viejo","C. Ines Cruz Hunter","C. Javier Santa Cruz Garcia","C. Jose Luis Magaña Cabrera","C. Jose Luis Zacatenco Lopez","C. Jose solis Gonzalez","C. Leticia Saavedra Nesbaid","C. Luis Eduardo Nahle Pascual","C. Maria De Rosario Gomez Urbina","C. Russel Barradaz Sanchez","C. Saul Salinas Gonzalez","C. Silverio Gonzalez Cuca","C. Wencesñap Sanchez Estrada","C.Lesticia Saavedra Nesbaid","Cadena Comercial Oxxo Sa De CV","Cadena Comercial Oxxo, Sa De CV","Café Estaciones","CAMINO REAL","CAMINOS Y PUENTES FEDERALES","Caminos Y Puentes Federales De Ingresos Y Servicios Conexos","LAVADO DE COCHES LA CUBETA DIGITAL","CARBU EXPRESS, SA DE CV","CARLOS ANTONIO MORALES GARZA","CARLOS ANTONIO QUINTO RIOS","Carlos Antonio Quinto Ríos","CARLOS CELIO ESQUIVEL","Carlos Daniel Ortiz Chavez","Carlos Godinez Perez","Carlos Godínez Pérez","Carlos Haua Bulos","Carlos Luis Gómez Arguelles","Carlos Martin Torres Juárez","Carlos Primitivo Vega Valle","Carreteras Del Pacifico","Caseta Metlapil","Caseta Miradores","Catalina Martínez Guerrero","Cecapiem SA De CV","Cele Filiberto Martínez Cordero","Celia Esparza Loreto","Centro De Copiado","Centro de verificación De Verificación Takechi ​​SA de CV","Cerrajería Aranda","Cerrajería Móvil El Saucillo","Cerro De Biznagas S, A De CV","CFE Suministridor De Servicios BasicosS","City Club","Claudia Corte Herrera","Claudia Judith Flores Leyva","Claudia Mota Rojas","Claudia Ramierez Lopez","Claudia Ramírez López","Cocina Económica La Güerita","Cocina Económica La Parroquia","Cocina Tradicional Campestre De 1981","Coel SA De CV","Com. De Agua Pot. Alcant Y san. Del Mpio De Huichapan","Combustibles Bentan SA DE CV","Combustibles De Pachuca SA De CV","Combustibles Rumloc SA De CV","Comercial Mexicana","Comercial Miura SA DE CV (Sistema De Vigilancia)","Comercializadora Farmacéutica De Chiapas Sapi De CV","Comercializadora Y Distribuidora Brime SA De CV","Comisión Bancaria","Comisión De Agua De Actopan","Comisión De Agua De Actopan Hgo","Comisión De Agua De Tula De Allende","Comisión De Agua De Zimapan","Comisión De Agua Huichapan","Comisión De Agua Ixmiquilpan","Comisión De Agua Mixquiahuala De Juárez","Comisión De Agua Pachuca","Comisión De Agua Potable Y Alcantarillado Del Municipio De Mixquiahuala De Juarez","Comisión De Agua Potable, Alcantarillado Y Saneamiento Del Municipio De Ixmiquilpan, Hgo","Comisión De Agua Potable, Alcantarillado Y Saneamiento Del Municipio De Zimapan, Hgo","Comisión de Agua y Alcantarillado De Sistemas Intermunicipales","Comisión De Agua Y Alcantarillado Del Municipio De Actopan Hidalgo","Comisión De Agua Y Alcantarillado Del Municipio De Tula De Allende","Comisión Federal De Electricidad","Compañía Santa María SA De CV","Concesionaria Autopista Perote-Xalapa.","Concesionaria De Vías Troncales SA De CV","Concesionaria Mexiquense SA De CV","Concesiones Y Promociones Malibran","Conexiones Y Mangueras De Pachuca SA De C V.","Consultora Informática","CONTEXPRESS S DE RL DE CV","Copias Neo SA De CV","Copicentro Pachuca","Corporativo Farmacias Mas SA De CV","Corporativo Yunes Márquez SA De CV","Corte Herrera Claudia","Cortesía En Viajes S. De RL De CV","CRIMELAB SA DE CV","Cristina González Cantera","Curso 'El Delito De Feminicidio'","Cutberto Rodríguez Álvarez","Cynper SA De CV","China Town","Dagoberto Mendoza Morales","Daniel García Luna","Daniel Becerra Castañeda","Daniel García Luna","Daniel López Carrasco","Daniel Miramontes Flores","Daniel Zarate Santiago","David Adrián Martínez Santiago","David Richard Uribe","De Tula De Allende, Hgo.","Delia Serrano Morales","Deportes Pachuca SA De CV","Desarrollo Hotelero De Plaza Pachuca Sa","DEVSOFT SA DE CV","Dhl Exprés México SA De CV","Diana Araceli Zaldívar Cruz","Diana Gálvez Mendoza","Diego Alberto Acevedo De La Rosa","Diego Alberto Espinosa Islas","Dilia Ramos Montaño","Distribuciones Mogu SA DE CV","Distribuidora De Abarrotes Y Semillas De Pachuca SA De CV","Distribuidora De Alimentos Th, SA De CV","Distribuidora Del Manual Moderno SA De CV","Distribuidora El Manual Moderno SA De CV","Distribuidora Fragoso","Domínguez Díaz Daniel","Drícela Austria Serna","Drivecare, SA de CV","Dulce María Calva Sánchez","Edgar Aquilino Herrera Rodríguez","Edgar Dante Rosas Islas","Edgar Mendoza Ceron","Edgar Rabindranath Valdespino Zubieta","Edith Rojas Camacho","Edmundo Alfredo Galindo Pérez","Edson Aguilar Romero","El Palacio De Hierro SA De CV","El Parador De San José","El Pelón Dulcerías","el rincon de periban","El Rincón De Periban","Elda Ceseña Banquera","Eléctrica Ángeles","Eléctrica Barba SA De CV","Electro pura S. De RL De CV","Electropura S. De RL De CV","Elfego Baltazar Piña Verde","Eli Rodríguez Del Ángel","Elideth Sarahi Dorantes López","Elisa Ramírez Escamilla","Eliseo Martínez Ballesteros","Eliu Morales Fragoso","Elizabeth Arellano Miranda","Elizabeth Salinas Aguilar","Elizabeth Troncoso Escamilla","Eloísa Camargo Hernández","Elsa Patricia Rodríguez Reyes","Emilio Prieto Perez","Emilio Prieto Pérez","Emmanuel Ceseña Barquera","Envasadoras De Aguas En México S. De RL De CV (Bonafont)","Eric Salvador Rosas Villa","Erick Jovanni Flores Varela","Erick Mendoza Hernández","Erick Salvador Rosas Villa","Erika Cruz Pérez","ERIKA JAZMIN RESENDIZ TREJO","Ernesto Skewes López","Esli Domínguez Trejo","Especialistas en Alta Cocina SA De CV (Wings)","Esperanza González Díaz","Espinosa Ostos Blanca Deyanira","Estación Acevedo S. De RL","Estación De Servicio Ana SA De CV","Estación De Servicio Ariel SA De CV","Estación de Servicio EMAJUFH SA de CV","Estación De Servicio La Mora","Estación De Servicios Gesa SA De CV","Estación Real De La Plata SA De CV","Estación Santa María La Providencia SA De CV","Estación Valle Dorado SA De CV","Estacionamiento La Posta","Esteban Leopoldo Cartelazo Islas","Esteban Leopoldo Castelazo Islas","Eugenia Vite Silvestre","Eva Pérez Hernández","Eva Rivera Samitez","Fabián Bernardo Moreno Gómez","FABIOLA GONZALEZ OROZCO","Fabiola Santillán García","Farmacias Guadalajara SA De CV","Farum Servicios SA De CV","Fejsa Computaion Y Oficinas De Pachuca SA De CV","FELIPE JIMENEZ GUTIERREZ","Felipe Jiménez Gutiérrez","Felipe Simón Olvera Castelán","Felisa Lugo Chavero","Feliz Ernesto Reyes Molina","Fernando Hidalgo Vergara","Ferre hogar","Ferretería Y Plomería Casa Martínez","Fideicomiso Autopistas Y Puentes Del Golfo Centro","Fierros Y Laminas De Pachuca SA De CV.","Fiesta Inn Pachuca","Filiberto Barrera Dávila","Flor Eugenia Vargas Herrera","Fondo Nacional De Infraestructura","Forlac Store SA De CV","Francisca Quiroz Uribe","Francisco Raúl García Bolio","Francisco Ventura Martínez","Fuente De Sodas Chino´S","Gabriel López Hernández","Gabriela Romero Campos","Manual García Moreno Víctor","Garza Gas De Hidalgo SA De CV","Gas De Provincia Sa De CV","Gas Fast SA De CV","Gas Imperial De Axapusco SA De CV","Gasamake SA De CV","Gasolineria Agua Blanca SA De CV","Gasolineria Rodjaq SA De CV","Gasomer SA De CV","Gastrosur SA De CV","Genaro Oswaldo Márquez Gutiérrez","Germa Mantenimiento Y Diseño SA De CV","Gertell Combustibles SA De CV","Gibran Copca Chávez","Gilberto Bárcenas López","Gilberto Espinosa Ramírez","Gloríela Islas Sosa","Gobierno Del Df Curso Delito De Feminicidio","Gobierno del Estado de Veracruz","González Islas Bernardo","Graciela Moreno Arce","Graciela Moreno Rodríguez","Graciela Taide Quiroz Gutiérrez","Grupo Autopistas Nacionales SA De CV","Grupo Autopistas Nacionales, Sa De CV","Grupo Bekim Empresarial S DE RL DE CV","Grupo Cravioto Distribuciones SA De CV","Grupo Estrella Blanca SA De CV","Grupo Galume SA De CV","Grupo Helen Gasolinera Excelencia y Calidad SA de CV","Grupo O Port SA De CV","Grupo Parisina SA De CV","Grupo Suzuka Argenta SA De CV","Guadalupe Hernández Escamilla","Guillermo Harold Barría García","Gustavo Said Gonzalez Tapia","Gustavo Trejo Montalvo","Gutiérrez Rodríguez Juan Ramón","Guy Jesús Quijano Austria","H. Roberto Aguilar Galindo","Hacienda Yextho","Hacobo Flores Pérez","Héctor Santos González Reyes","Heriberto Padilla Contreras","Herlaz Sistemas de Comunicación SA De CV","HERLAZ SISTEMAS DE COMUNICACIÓN SA DE CV","Herlaz Sistemas De Comunicación, Sa De CV","Hermelinda Peña Hernández","Hernández Valencia Rosalía","Herrera Motors De Hidalgo SA De CV","Herrera Motors De Hidalgo SA De CV","Restaurante Hidalgo Platillos Regionales","Hidrocarburos Hidalgo S, .A De CV","Hidrocarburos Santa Catarina SA De CV","Hidrosina Plus SA De CV","Hilda Lorena Torres Guerrero","Home Depot México S De RL De CV","Hotel Y Restaurante Tezoli","Hoteles Eco turísticos Mexicanos SA De CV","Hoteles Sheraton S. De RL De CV","Huichapan Hgo","Impulsora De Transportes Mexicanos SA De CV","Industrias Long Meng S. De RL Mi","Ines Cruz Hunter","Ing. Rogelio Alberto Téllez Rojo","Ingrid Minerva Rodríguez Vera","Interhidalguenses","Irving Ortiz Flores","Isidro Granados Guerra","Israel Islas Castañeda","Iván Ramírez Hernández","Ivonne Munguía Becerra","J. Irais González García","Jacobo Flores Pérez","Jaime Zapata Venegas","Janeth Olvera Salinas","Jaqueline Gálvez De La Peña","Javier González Mejía","JAVIER LEO CUEVAS","Javier Rodríguez Robles","Javier Santa Cruz Garcia","Javier Santacruz García","Jessica Denisse Zuñiga Rosales","Jesús Elías Salinas Baños","Jesús Ríos Islas","Joao Israel Villegas Trejo","Joaquín Escobar Baños","Johanna Beatriz Hidalgo Hernández","Jorge Erick Piña Vite","Jorge Vargas Martínez","Jose Alfonso López Rubio","José Alfredo Elizalde Hernández","José Antonio Calderón López","José Antonio Jiménez Rodríguez","JOSE ANTONIO SILVA MORENO","José Armando Reyes Samperio","José Augusto Fuentes Marín","José Carlos Vargas Bonetta","José De Jesús Franco Solís","José De Jesús López Peña","José González Beltrána","José Guadalupe Sánchez Guerrero","Jose Ivan Gutierrez Najera","José Jaime Acosta Castro","José Juan Moreno Valle","José Luis Hernández Rosales","José Luis Hidalgo López","JOSE LUIS MAGAÑA CABRERA","José Luis Salinas Elizalde","José Luis Serrano Arroyo","JOSE LUIS ZACATENCO LOPEZ","José Luis Zacatenco López","José Manuel Hernández Hernández","JOSE NERI ISLAS MARTINEZ","José Román Cárdenas Pizano","Jose Roman Pizano Caredenas","Jose Solis Gonzalez","José Solís Gonzále","Josselin Sixto Ruiz","Juan Alberto Peralta Vázquez","Juan Carlos Ángeles Baltazar","Juan Carlos Salinas Rodríguez","Juan Carlos Vergara Bonneta","Juan Gustavo Perez Gónzalez","Juan Hernández Olvera","Juan Iv Rodríguez Sánchez","Juan Leticia Elizalde Zendejas","Juan Manuel García Guzmán","Juan Manuel García Guzmán","Juan Manuel García Hernández","Juan Manuel Lugo Nacif","Juan Manuel Zaldívar Chiapa","Juan Rafael Canales Ángeles","Juan Ramón Gutiérrez Rodríguez","Juan Ramón Vázquez Cruz","Juana Magdalena Ambrosio Vargas","Juana María Escamilla Vázquez","Juana Vargas López","Juárez Hidalgo","Judith M. Luna Mejía","Julieta García Esquivel","Julio Alberto Santillán García","Julio Cesar Salinas González","Julio Rosales Reyes","Julissa Ortiz Barrera","Juventino Pérez Lemoine","Jv Renta","Karen Alina Overa Santos","Karen Judith Márquez Espinoza","Karla Carolina Rivera Escalona","Karla Lizzett Flores Rodríguez","Karla Yadira Hernández Hernández","Kemuel SA De CV","Miguel Oscar De La Vega Bezies","La Braza Arracheras","La Casa Del Juego","La Cubeta Digital","La Flor De Michoacán","La Luz Roja","Laboratorio Coahuila SA De CV","Latanst SA De CV","Latitud 5 Estrellas SA De CV","Laura Cristina Berber Vicaña","Laura Piña Serrano","Laureano Campa Zúñiga","Lazcano Ortiz Beatriz","Lenin Alejandro Castañeda Baños","Leticia Ignacio Mejía","Leticia Saavedra Nesbaid","Lilia Lugo Mejía","Liliana Flores Rossette","Liliana Yazmin Franco Castro","Linda Crystal García Doniz","Liz Arely Castelán Bautista","Liza Angélica Islas Rivera","Lizbeth Pizana Olvera","Lonchería María Isabel","Los Cazadores","Los Negritos Restaurant Bar","Lucero Pérez González","Luis Alberto Ávila Osorio","Luis Angel Mayen Garcia","Luis Ángel Mayen García","Luis Martínez Mejía","Luis Serfain Henkel Castañeda","Luis Vargas Trejos","Luisa Lagarde Vásquez","Llanterama Hidalguense SA De CV","Ma. Elena Lugo Chavero","Ma. Guadalupe Vite Carlos","Macaria Pérez Guerrero","Maderia Rual SA De CV","Maderería Rual SA De CV","Mangueras, Herramientas Y Equipos SA De CV","Manuel Alejandro Calva Hinojosa","Manuel Felix Durán Pérez","Manuel Félix Duran Pérez","Manuel García Guzmán","Maquiladora Espani SA De CV","Marcela Cerón Díaz","Marcelo Ángeles Tivo","Marco Antonio Hernández Gómez","Marco Antonio Hernández Monroy","Marco Antonio López Hernández","Marco Antonio Reyes Hernández","María Alejandra Trejo García","María Catalina Martínez Guerrero","María Cecilia Hernández Castillo","María Concepción Hernández Aragón","María Del Carmen Quintero Bautista","María Del Mar Reyes Pérez Tagle","María Del Rosario González Martínez","María Del Socorro Chávez González","María Erika Ángeles De Haro","María Guadalupe Dávila Hernández","María Guadalupe González Vargas","María Guadalupe Salguero Hernández","María Isabel Teniente Llanos","María José Granillo Granillo","María Leticia Aldana Ugalde","María Luisa Martínez Ortega","María Ramírez Alvarado","María Sofía Escalante Reyes","María Teresa Oliver León","María Trinidad Hernández Rodríguez","Maribel Castro Ángeles","Maribel Olvera Avilés","Maribel Santos Bretado","Mario Luis Zacatenco Viornery","Mario Rodríguez González","Marisarcos Del Distrito Federal SA De CV","Marisol Rivera Vazquez","Marisol Rivera Vázquez","Marlen Pelcastre Nochebuena","Marlen Pérez Cervantes","Marressa Yuzim Picazo Cabrera","Martin Márquez Loyola","Martin Vivar Cazañas","Mary Carmen Ramírez Ríos","Materiales Azulejos Sanitarios Y Ferretería SA De CV","Materiales Hermanos Roldan SA De CV","Materiales Para Construcción SA De CV","Mauro Francisco López Castillo","Mayra Pérez Nájera","Mayra Santa Madrigal Limón","Megapapelera Nixa","Melo Cordero Leticia","Mendoza Tovar Palmira","Meneses Lozada Martin","Mercedes Citlalli Mendoza Meza","Mi Casa","Microvisa Mg Sa De CV","MICROVISA MG SA DE CV","Microvisa SA De CV","Miguel Alejandro Flores Gomez","Miguel Ángel Aguilar Hernández","Miguel Ángel Chávez Trejo","Miguel Ángel Martínez Montiel","Miguel Angel Perez Gonzalez","Miguel Odon Olvera Pérez","Miguel Oscar De La Vega Bezies","Miguel Reyes Valdovinos","Minerva Cruz Licona","Mirage Perisur","Modesta López Canales","Modesta Vázquez Carmona","Mofles González","Multiproductos de Leon SA De CV","Mundo De Mangueras Y Conexiones","Mundo Tool México SA De CV","Nadia Luisa Gavioto Romero","Nallely Roldan Sosa","Nami Pachuca, SA de CV","Nancy Herrera Romero","Nancy Jaramillo Díaz","Narciso Ortiz Velázquez","Nayelhi Chávez Rodríguez","Nayeli Alejandro Calva Hinojosa","Nikzor Travel Sa De CV","Noé Olivia Ramírez Trejo","Noé Olvera Meza","Noel Chávez Martínez","Norma Salinas Alcántara","Novedades Gastronómicas Reforma S. De RLL De CV","Nueva Wal Mart De México, S. De RL De CV","Obed Hernández Carreto","Odt","Office Depot De México SA De CV","Omaña Servicio A Equipo SA De CV","Omar Daniel Hernández García","Omar Guadalupe Cano Fragoso","Omar Pacheco Cortes Rangel","Operadora Omx SA De CV","Operadora Parador De San Javier SA De CV","Operadora Vips S De RL De CV","Oscar Cruz Pérez","Oscar Felipe Serrano Cruz","Oscar Flores Rivera","Oscar Leopoldo Guasso Soto","Ovni Bus SA De CV","Pablo Espinosa Acuña","Pachua-Actopan Ixmiquilpan SA De CV","Pai","Panadería Y Pastelería Geo SA De CV","Paola Romero Guerrero","Paquetexpress","Parrin SA De CV","Patricia Montejo Reyes","Paxair De México SA De CV","Pedro Acosta Rodríguez","Pedro Angel Cabrera Angeles","Pedro Ángel Cabrera Ángeles","Pérez Hernández Javier","Pérez Licona Eduardo","Perkin-Elmer De Meico SA","Pétreos Las Glorias SA De CV","Petreos Las Glorias, SA de CV","Pétreos Sol SA De CV","Petreos Sol, SA de CV","Pinturas En General","Plásticos Jang","Policía Industrial Bancaria del Estado de Hidalgo, SA de CV","Plomoelectrica DE Hhidalgo SA De CV","Posadas De Latinoamerica SA De CV","Pr0ocomex Pachuca SA De CV","PR0OCOMEX PACHUCA SADE CV","Presidencia Municipal","Procomex De Pachuca SA De CV","Promogas SA De CV","Promotora De Autopistas Del Pacifico .SA De. CV","Promotora De Desarrollo Hidalguense SA De SV","Promotora Y Administrador De Carreteras SA De CV","Proyectos Y Construcciones Téllez-Islas","Quintero Vega Irma Lilia","Quiroz Nava Rodrigo","Radio Shack De México SA De CV","Rafael De Jesús Aguirre Ramos","Rafael Herrera Tanco","Rafael Medina Ugalde","Ramírez Arce Mónica","Ramón Ensatiga Morales","Raúl Badillo Ramírez","Raúl Rivera Rodríguez","Raúl Téllez Romero","Rebeca Rangel Copca","Relleno Sanitario","Rembolso De Gasto Arrendamiento Huejutla","Descanso. Mirage Guerrero","Restaurante La Nacional","Restaurante La Vega","Restaurante Quetos","Restaurante California SA De CV","Restaurante Colonial","Restaurante Familiar El Parador De San José","Restaurante Genisa SA De CV","Restaurante Gorditas La Guerra","Restaurante Mirage SA De CV","Restaurante Terrassa De Mirage","Restaurantes California SA De CV","Restaurantes Toks SA De CV","Restaurantes Tu Lunch Sa De CV","Reyes Benítez Karla Leticia","Reyna Meneses Domínguez","Rhema Publicidad","Ricardo Jorge Gonzales Cortes","Ricardo Lázaro Ludlow Zavaleta","Roberto Carlos López Mercado","Roberto González Hernández","Roberto Octavio Tripp Resendiz","Roberto Rodríguez Aguilar","Roberto Rodríguez Romero","Rodolfo García Flores","Rodrigo Quiroz Guerrero","Rodríguez García Edgar Fernando","Rodríguez Rendón Jesús","Rodríguez Reyes Humberto","Roesp Asociados SA De CV","Rogelio L. Moreno Arce","Rogelio Leopoldo Moreno Arce","Romel","Romero Hoyos Ana María","Rosa María Lara Téllez","Russel Barradaz Sanchez","Sabas Hernández Sánchez","Salvador Eric Rosas Villas","Salvador Espinosa Arellano","Sanborn Hermanos SA","Sandra De Elías Vichis","Santos De La Paz SA De CV","Saúl Salinas González","Scden Sa De CV","SCDEN SA DE CV","Sergio Antonio Hernández Suárez","Sergio Antonio Priego Reséndiz","Sergio Ashane Bulos","Sergio Baca Olivo","Sergio Fernando González Cruz","Sergio Jesús Reyes Trejo","Sergio Piña Delgado","Sergio Rivera Chapa","Servicio Acapulco Diamante SA De CV","Servicio También SA De CV","Servicio Apan, SA de CV","Servicio Cúpula SA De CV","Servicio El Once SA De CV","Servicio Huichapan SA De CV","Servicio Jacala SA De CV","Servicio Jacala, SA de CV","Servicio La Fuente SA De CV","Servicio La Loma SA De CV","Servicio Lara SA De CV","Servicio Lara. SA de CV","Servicio Los Cues, SA de CV","Servicio Molango SA de CV","Servicio Monteverde SA De CV","Servicio Parador Santa Bárbara SA de CV","Servicio Postal Mexicano","Servicio Rangel SA De CV","Servicio Rangel, SA de CV","SERVICIO SIOLEN","Servicio Técnico De Hidalgo SA De CV","SERVICIO TEOCALCO SA DE CV","Servicio Toda SA De CV","Servicio Toda, SA de CV","SERVICIO XO SA. DE CV","Servicio Zacualtipan SA de CV","Servicio Zacualtipán SA De CV","Servicio Zacualtipan, SA de CV","SERVICIOS AUTOMOTRICES DE IXMIQUILPAN SACV","SERVICIOS DE INGENIERIA NOAR SA DE CV","Servicios Energéticos de Tizayuca, SA de CV","Servicios Fayad Sa De CV","Servicios Fayad, SA de CV","Servigilga SA De CV","SERVIPROGRESO SA DE CV","Silverio Gonzalez Cuca","Socorro García Ibarra","Socorro Guadalupe Gómez Martínez","Socorro Reséndiz Mancera","Sofía Moedano Flores","Solano Gudiño María Elena","Soluciones Hidraiulicas Arum SAS De CV","Sonia Amparo Mota Olguín","Sotero Palacios Hernández","Sotero Vega Ana","Soto Arriaga Faustina","Sue Ivalu Castillo Asuna","Sumigas SA De CV","Súper Papelera SA De CV","Súper Servicio Meta SA De CV","Súper Servicio Rodríguez SA De CV","Supplyco SA De CV","Susana Peláez Lara","Tahití Silvia Mayorga González","Tania Gema Estrada Alamilla","Tania Vargar Sanchez","Tapia Hernández Luz","Taquería El Mesón De Los Ángeles","Taquería No Que No","Tarifa Promocional Xalapa- Veracruz","TEQUIMEC S DE RL DE CV","Teresa Berenice Tovar Martínez","Teresa Del Niño Jesús Carbajal","Teresa Martínez Martínez","Teresa Salgado García","Tiendas Comercial Mexicana SA De CV","Tiendas Chedrahui SA De CV","Tiendas Soriana SA De CV","Tiendas Soriana Sa De CV","Tintorería Del Norte Del Jardín Colon SA De CV","Tintorerías Gofer SA De CV","Tlapalería Acosta","Tomás Alejandro Herrera Pérez","Tomás Daniel Montes Silverio","Tomasa Villegas Lazcano","Transportes Tepehuas","Trico Pachuca SA De CV","Urbanos Y Suburbanos De Tula SA De CV","Valores Energéticos SA De CV","Valle De Mixquiahuala","Vanguardia Gastronómica Presidente SA De CV","Verificación Ambiental De Hidalgo SACV","Verónica Pérez Reyes","VESALIUS SA DE CV","Vianey Vega Maldonado","Viaticum Valdespino SA De CV","Vicente Ruiz Tapia","Víctor Gerardo Zúñiga Aguirre","Víctor Hernández Gómez","Víctor Hugo Gallardo Garduño","Víctor Hugo Morgado Calva","VINIMED SA DE CV","Violeta Belen González Tapia","Vulcanizador Y Seccionadora", "El Chacón","Vulcanizadora", "Juan C. Doria" ,"Vymec Fuego SA De CV","Wenceslao Sanchez Estrada","Xochil Zenteno Velasco","Yadira Del Carmen Sánchez Nanduca","Yahiti Silvia Mayorga González","Yamil Hernández García","Yessenia Zamora Soto","Yolanda Aragón Quiroz","Yolanda Felicitas Tenorio Vargas","Yolanda Samperio Delgadillo","Yuridia Laguna Peña","Zehidy Ortiz Granillo","Zoila Ángeles Tello","Zulema Anahí Contreras Vizzuet"];
  oficio_aut = ["SFP-CPF-01-0020/2020", "SFP-CPF-01-0010/2020", "SFP-CPF-01-0724/2020", "SFP-CPF-01-0681/2020", "SFP-CPF-01-DFDP-0949/2020"];
  municipios =["Pachuca de Soto","Acatlán","Acaxochitlán", "Actopan", "Agua Blanca", "Ajacuba", "Alfajayucan", "Almoloya", "Apan", "Atitalaquia", "Atlapexco", "Atotonilco de Tula", "Atotonilco el Grande", "Calnali", "Cardonal", "Chapantongo", "Chapulhuacán", "Chilcuautla", "Cuautepec de Hinojosa", "El Arenal", "Eloxochitlan", "Emiliano Zapata", "Epazoyucan", "Francisco I. Madero", "Huasca de Ocampo", "Huautla", "Huazalingo", "Huehuetla", "Huejutla de Reyes", "Huichapan", "Ixmiquilpan",
   "Jacala de Ledezma", "Jaltocán", "Juárez Hidalgo", "La Misión", "Lolotla", "Metepec", "Metztitlán", "Mineral de la Reforma", "Mineral del Chico", "Mineral del Monte", "Mixquiahuala de Juárez", "Molango", "Nicolás Flores", "Nopala de Villagrán", "Omitlán de Juárez", "Pacula", "Pisaflores", "Progreso de Obregón", "San Agustín Metzquititlán", "San Agustín Tlaxiaca", "San Bartolo Tutotepec", "San Felipe Orizatlán", "San Salvador", "Santiago de Anaya", "Santiago Tulantepec de Lugo Guerrero"];
  area = ["Procuraduría General de Justicia", "Subprocuraduría de Procedimientos Penales Región Oriente", "Fiscalía Especializada para la atención de Delitos cometidos contra la Libertad de Expresión, Periodistas y Personas defensoras de los Derechos Humanos", "Dirección General para la Atención de los Asuntos del Sistema Tradicional", "Fiscalia de Delitos Electorales", "Subprocuraduría de Derechos Humanos y Servicios a la Comunidad", "Centro de Justicia Restaurativa Penal Poniente", "Fiscalía para la Atención de Delitos de Género", "Visitaduría General", "Dirección General de Servicios Periciales", "Centro de Operación Estratégica", "Unidad Especializada en el Combate al Secuestro", "Dirección General de Administración y Finanzas", "Fiscalía Especializada para la atención de los Delitos de Trata de Personas", "Subprocuraduría de Procedimientos Penales Región Poniente", "Centro de Atención Temprana Poniente", "Dirección General de Investigación y Litigación Poniente", "Centro de Atenció Temprana Oriente", "Centro de Justicia Restaurativa Penal Oriente", "Dirección General de Investigación y Litigación Oriente", "Dirección General de Recursos Materiales y Servicios", "Fiscalía Especializada en Delitos de Corrupción", "Fiscalía Especializada en Materia de Desaparición Forzada de Personas", "Dirección General de la Policía Investigadora"];

  constructor(props) {
    super(props);
    this.unsubscribe = null;
    this.state = {
      key: '',
      fondo: '',
      fecha: '',
      realizo: '',
      tipo_doc: '',
      importe: '',
      nfactura: '',
      fechaa: '',
      proveedor: '',
      partida: '',
      importea: '',
      isr: '',
      iva: '',
      total: '',
      municipio: '',
      area: '',
      analitico: []
    };
  }

  onCollectionUpdate = (querySnapshot) => {
    const analitico = [];
    querySnapshot.forEach((doc) => {
      const { nfactura, fechaa, proveedor, partida, importea, isr, iva, total, municipio, area } = doc.data();
      analitico.push({
        key: doc.id,
        doc, // DocumentSnapshot
        nfactura,
        fechaa,
        proveedor,
        partida,
        importea,
        isr,
        iva,
        total,
        municipio,
        area,
      });
    });
    this.setState({
      analitico
   });
  }

  componentDidMount() {
    const ref = firebase.firestore().collection('fondos').doc(this.props.match.params.id);
    const updateRef = firebase.firestore().collection('fondos').doc(this.props.match.params.id).collection('analitico');

    this.unsubscribe = updateRef.onSnapshot(this.onCollectionUpdate);
    ref.get().then((doc) => {
      if (doc.exists) {
        const fondos = doc.data();
        this.setState({
          key: doc.id,
          fondo: fondos.fondo,
          fecha: fondos.fecha,
          realizo: fondos.realizo,
          tipo_doc: fondos.tipo_doc,
          importe: fondos.importe,
          nfactura: fondos.nfactura,
          fechaa: fondos.fechaa,
          proveedor: fondos.proveedor,
          partida: fondos.partida,
          importea: fondos.importea,
          isr: fondos.isr,
          iva: fondos.iva,
          total: fondos.total,
          municipio: fondos.minicipio,
          area: fondos.area
        });
      } else {
        console.log("No se encuentra documento");
      }
    });
  }

  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState({fondos:state});
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { nfactura, fechaa, proveedor, partida, importea, isr, iva, total, municipio, area } = this.state;

    const updateRef = firebase.firestore().collection('fondos').doc(this.props.match.params.id).collection('analitico').doc();
    updateRef.set({
      nfactura,
      fechaa,
      proveedor,
      partida,
      importea,
      isr,
      iva,
      total,
      municipio,
      area,
    }).then((docRef) => {
      this.setState({
        nfactura: '',
        fechaa: '',
        proveedor: '',
        partida: '',
        importea: '',
        isr: '',
        iva: '',
        total: '',
        municipio: '',
        area: '',
      });
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
    const { nfactura, fechaa, proveedor, partida, importea, isr, iva, municipio, area } = this.state;

    var impo = parseInt(importea);
    var isri = parseInt(isr);
    var ivam = parseInt(iva);
    const tot = impo + isri + ivam;

    return (
      <div className="cent-ana-e">
        <div style={{width: '90%'}}>
        <h2 className="title" style={{fontFamily: 'Arial'}}>Analitico de Fondos</h2>
        <div className="edit-row-a title p-top">
          <label for="fondo" className="tipo-tw" style={{fontFamily: 'Arial'}}>Fondos:</label>
          <input name="fondo" value={this.state.fondo} onChange={this.onChange} className="height-ct" disabled/>
        </div>
        <div className="edit-row-a title">
          <label for="fecha" className="tipo-tw" style={{fontFamily: 'Arial'}}>Fecha:</label>
          <input name="fecha" value={this.state.fecha} onChange={this.onChange} className="height-ct" disabled/>
        </div>
        <div className="edit-row-a title">
          <label for="realizo" className="tipo-tw" style={{fontFamily: 'Arial'}}>Nombre Realizo:</label>
          <input name="realizo" value={this.state.realizo} onChange={this.onChange} className="height-ct" disabled/>
        </div>
        <div className="edit-row-a title">
          <label for="tipo_doc" className="tipo-tw" style={{fontFamily: 'Arial'}}>Tipo de Documento:</label>
          <input name="tipo_doc" value={this.state.tipo_doc} onChange={this.onChange} className="height-ct" disabled/>
        </div>
        <div className="edit-row-a title">
          <label for="importe" className="tipo-tw" style={{fontFamily: 'Arial'}}>Importe:</label>
          <input name="importe" value={this.state.importe} onChange={this.onChange} className="height-ct" disabled/>
        </div>

        <div className="tab-ana">
          <div className="prin">
            No Factura
          </div>
          <div className="same">
            Fecha
          </div>
          <div className="prin">
            Proveedor
          </div>
          <div className="same">
            Partida
          </div>
          <div className="same">
            Importe
          </div>
          <div className="same">
            Isr
          </div>
          <div className="same">
            Iva
          </div>
          <div className="same">
            Total
          </div>
          <div className="same">
            Municipio
          </div>
          <div className="prin">
            Area
          </div>
        </div>

        <div>
          {this.state.analitico.map(analitico =>
            <div>
              <div className="tab-ana-con">
                <div className="prin-2">{analitico.nfactura}</div>
                <div className="same-2">{analitico.fechaa}</div>
                <div className="prin-2">{analitico.proveedor}</div>
                <div className="same-2">{analitico.partida}</div>
                <div className="same-2">$ {analitico.importea}.00</div>
                <div className="same-2">$ {analitico.isr}.00</div>
                <div className="same-2">$ {analitico.iva}.00</div>
                <div className="same-2">$ {analitico.total}.00</div>
                <div className="same-2">{analitico.municipio}</div>
                <div className="prin-2">{analitico.area}</div>
              </div>
            </div>
          )}
        </div>

        <form onSubmit={this.onSubmit} className="add-tab-a">
          <div className="tab-ana2">
            <div className="prin-2">
              <input className="inp-ana" name="nfactura" value={nfactura} onChange={this.onChange} ref="nfactura" required/>
            </div>
            <div className="same-2">
              <input className="inp-ana" type="date" name="fechaa" value={fechaa} onChange={this.onChange} ref="fechaa" required/>
            </div>
            <div className="prin-2">
              <DropDownList style={{width: '100%', borderColor: 'rgba(0,0,0,0.42)', height: '25px'}} data={this.proveedor} name="proveedor" value={proveedor} onChange={this.onChange} required ref="proveedor"/>
            </div>
            <div className="same-2">
              <select className="inp-ana" name="partida" value={partida} onChange={this.onChange} required ref="partida" >
                <option name="partida"></option>
                <option name="partida">211001</option>
                <option name="partida">211002</option>
                <option name="partida">212001</option>
                <option name="partida">212002</option>
                <option name="partida">214001</option>
                <option name="partida">214002</option>
                <option name="partida">215001</option>
                <option name="partida">216001</option>
                <option name="partida">217001</option>
                <option name="partida">221001</option>
                <option name="partida">221002</option>
                <option name="partida">246001</option>
                <option name="partida">251001</option>
                <option name="partida">253001</option>
                <option name="partida">254001</option>
                <option name="partida">255001</option>
                <option name="partida">261001</option>
                <option name="partida">271001</option>
                <option name="partida">272001</option>
                <option name="partida">291001</option>
                <option name="partida">292001</option>
                <option name="partida">311001</option>
                <option name="partida">313001</option>
                <option name="partida">318001</option>
                <option name="partida">323002</option>
                <option name="partida">334001</option>
                <option name="partida">338001</option>
                <option name="partida">341001</option>
                <option name="partida">351001</option>
                <option name="partida">352001</option>
                <option name="partida">353001</option>
                <option name="partida">355001</option>
                <option name="partida">357001</option>
                <option name="partida">358001</option>
                <option name="partida">361002</option>
                <option name="partida">372001</option>
                <option name="partida">375001</option>
                <option name="partida">381001</option>
                <option name="partida">392006</option>
                <option name="partida">394001</option>
                <option name="partida">218002</option>
                <option name="partida">312001</option>
                <option name="partida">371001</option>
                <option name="partida">247001</option>
                <option name="partida">249001</option>
                <option name="partida">359001</option>
                <option name="partida">336001</option>
                <option name="partida">275001</option>
                <option name="partida">211003</option>
                <option name="partida">541001</option>
                <option name="partida">515001</option>
                <option name="partida">339001</option>
              </select>
            </div>
            <div className="same-2">
              <input className="inp-ana" name="importea" value={importea} onChange={this.onChange} ref="importea" required/>
            </div>
            <div className="same-2">
              <input className="inp-ana" name="isr" value={isr} onChange={this.onChange} ref="isr" required/>
            </div>
            <div className="same-2">
              <input className="inp-ana" name="iva" value={iva} onChange={this.onChange} ref="iva" required/>
            </div>
            <div className="same-2">
              <input className="inp-ana" name="total" value={tot} onChange={this.onChange} required ref="total"/>
            </div>
            <div className="same-2">
              <input className="inp-ana" name="municipio" value={municipio} onChange={this.onChange} required ref="municipio"/>
            </div>
            <div className="prin-2">
              <input className="inp-ana" name="area" value={area} onChange={this.onChange} required ref="area"/>
            </div>
          </div>
          <div className="form-container-last">
            <div className="botones">
              <button
                className="bt-s2"
                type='submit'
                onClick={() => this.setState({ total: this.state.total = tot })}>
                Guadar
              </button>
            </div>
          </div>
        </form>

        </div>
      </div>
    );
  }
}

export default Edita;
