import React, { Component } from 'react';
import firebase from '../../Firebase';
import { AutoComplete } from '@progress/kendo-react-dropdowns';
import CurrencyFormat from 'react-currency-format';
import './Analitico.css';
import '@progress/kendo-theme-material/dist/all.css';

class Analitico extends Component {

  partida = ["SFP-CPF-01-0020/2020", "SFP-CPF-01-0010/2020", "SFP-CPF-01-0724/2020", "SFP-CPF-01-0681/2020", "SFP-CPF-01-DFDP-0949/2020"];
  proveedor = ["Pago Directo", "Fondo Revolvente", "Gasto a Comprobar", "Reembolso de Gastos", "Cancelado"];
  municipios =["Pachuca de Soto","Acatlán","Acaxochitlán", "Actopan", "Agua Blanca", "Ajacuba", "Alfajayucan", "Almoloya", "Apan", "Atitalaquia", "Atlapexco", "Atotonilco de Tula", "Atotonilco el Grande", "Calnali", "Cardonal", "Chapantongo", "Chapulhuacán", "Chilcuautla", "Cuautepec de Hinojosa", "El Arenal", "Eloxochitlan", "Emiliano Zapata", "Epazoyucan", "Francisco I. Madero", "Huasca de Ocampo", "Huautla", "Huazalingo", "Huehuetla", "Huejutla de Reyes", "Huichapan", "Ixmiquilpan",
   "Jacala de Ledezma", "Jaltocán", "Juárez Hidalgo", "La Misión", "Lolotla", "Metepec", "Metztitlán", "Mineral de la Reforma", "Mineral del Chico", "Mineral del Monte", "Mixquiahuala de Juárez", "Molango", "Nicolás Flores", "Nopala de Villagrán", "Omitlán de Juárez", "Pacula", "Pisaflores", "Progreso de Obregón", "San Agustín Metzquititlán", "San Agustín Tlaxiaca", "San Bartolo Tutotepec", "San Felipe Orizatlán", "San Salvador", "Santiago de Anaya", "Santiago Tulantepec de Lugo Guerrero"];
  area = ["Procuraduría General de Justicia", "Subprocuraduría de Procedimientos Penales Región Oriente", "Fiscalía Especializada para la atención de Delitos cometidos contra la Libertad de Expresión, Periodistas y Personas defensoras de los Derechos Humanos", "Dirección General para la Atención de los Asuntos del Sistema Tradicional", "Fiscalia de Delitos Electorales", "Subprocuraduría de Derechos Humanos y Servicios a la Comunidad", "Centro de Justicia Restaurativa Penal Poniente", "Fiscalía para la Atención de Delitos de Género", "Visitaduría General", "Dirección General de Servicios Periciales", "Centro de Operación Estratégica", "Unidad Especializada en el Combate al Secuestro", "Dirección General de Administración y Finanzas", "Fiscalía Especializada para la atención de los Delitos de Trata de Personas", "Subprocuraduría de Procedimientos Penales Región Poniente", "Centro de Atención Temprana Poniente", "Dirección General de Investigación y Litigación Poniente", "Centro de Atenció Temprana Oriente", "Centro de Justicia Restaurativa Penal Oriente", "Dirección General de Investigación y Litigación Oriente", "Dirección General de Recursos Materiales y Servicios", "Fiscalía Especializada en Delitos de Corrupción", "Fiscalía Especializada en Materia de Desaparición Forzada de Personas", "Dirección General de la Policía Investigadora"];

  constructor() {
    super();
    this.state = {
      nfactura: '',
      fecha: '',
      proveedor: '',
      partida: '',
      importe: '',
      isr: '',
      iva: '',
      total: '',
      municipio: '',
      area: '',
      fondos: [],
    };
  }

  cancelCourse(){
    this.refs.nfactura.value="";
    this.refs.fecha.value="";
    this.refs.proveedor.value="";
    this.refs.partida.value="";
    this.refs.importe.value="";
    this.refs.isr.value="";
    this.refs.iva.value="";
    this.refs.total.value="";
    this.refs.municipio.value="";
    this.refs.area.value="";
  }

  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState(state);
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { nfactura, fecha, proveedor, partida, importe, isr, iva, total, municipio, area } = this.state;

    this.ref.add({
      nfactura,
      fecha,
      proveedor,
      partida,
      importe,
      isr,
      iva,
      total,
      municipio,
      area
    }).then((docRef) => {
      this.setState({
        nfactura: '',
        fecha: '',
        proveedor: '',
        partida: '',
        importe: '',
        isr: '',
        iva: '',
        total: '',
        municipio: '',
        area: ''
      });
      this.props.history.push("/Analitico")
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
    const { nfactura, fecha, proveedor, partida, importe, isr, iva, total, municipio, area } = this.state;
    return (
      <div className="space-nav">
        <div>
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

        <form className="fondos-back p-top" onSubmit={this.onSubmit}>
          <div className="fondos-container">
          {/*seccion 1*/}
            <div className="form-container">
              <div className="form-content">
                <label for="nfactura" className="itc" style={{fontFamily: 'Arial'}}>N. de Factura:</label>
                <input style={{width: '100%', borderColor: 'rgba(0,0,0,0.42)'}}  type="text" className="border-m" name="nfactura" value={nfactura} onChange={this.onChange} ref="nfactura" required/>
              </div>
              <div className="form-content">
                <label for="fecha" className="itc" style={{fontFamily: 'Arial'}}>Fecha:</label>
                <input type="date" className="border-m"  name="fecha" value={fecha} onChange={this.onChange} ref="fecha" required/>
              </div>
            </div>
            {/*seccion   2 proveedor*/}
            <div className="form-container">
              <div className="form-content">
                <label for="proveedor" className="itc" style={{fontFamily: 'Arial'}}>Proveedor:</label>
                <AutoComplete style={{width: '100%', borderColor: 'rgba(0,0,0,0.42)'}} data={this.proveedor} name="proveedor" value={proveedor} onChange={this.onChange} required ref="proveedor"/>
              </div>

                {/*seccion   partida*/}
              <div className="form-content">
              <label for="partida" className="itc" style={{fontFamily: 'Arial'}}>Partida:</label>
              <AutoComplete style={{width: '100%', borderColor: 'rgba(0,0,0,0.42)'}} data={this.partida} name="partida"  value={partida} onChange={this.onChange} required ref="partida"/>
              </div>
            </div>
            {/*seccion 3*/}
            <div className="form-container">
              <div className="form-content">
                <label for="importe" className="itc" style={{fontFamily: 'Arial'}}>Importe:</label>
                <CurrencyFormat thousandSeparator={true} prefix={'$'} className="border-m" name="importe" value={importe} onChange={this.onChange} ref="importe" required />
              </div>
              <div className="form-content">
                <label for="isr" className="itc" style={{fontFamily: 'Arial'}}>Isr:</label>
                <CurrencyFormat thousandSeparator={true} prefix={'$'} className="border-m" name="isr" value={isr} onChange={this.onChange} ref="isr" required />
              </div>
            </div>
            {/*seccion 4*/}
            <div className="form-container">
              <div className="form-content-5">
                <label for="iva" className="itc" style={{fontFamily: 'Arial'}}>Iva:</label>
                <CurrencyFormat thousandSeparator={true} prefix={'$'} className="border-m" name="iva" value={iva} onChange={this.onChange} ref="iva" required />
              </div>
              <div className="form-content-5">
                <label for="total" className="itc" style={{fontFamily: 'Arial'}}>Total:</label>
                <input className="input-b" name="total" value={total} onChange={this.onChange} required ref="total"/>
              </div>
            </div>
            {/*seccion 5*/}
            <div className="form-container">
              <div className="form-content-5">
                <label for="municipio" className="itc" style={{fontFamily: 'Arial'}}>Municipio:</label>
                <AutoComplete style={{width: '100%', borderColor: 'rgba(0,0,0,0.42)' }}  data={this.municipios} name="municipio" value={municipio} onChange={this.onChange} required ref="municipio"/>
              </div>
              <div className="form-content-5">
                <label for="area" className="itc" style={{fontFamily: 'Arial'}}>Area:</label>
                <AutoComplete style={{width: '100%', borderColor: 'rgba(0,0,0,0.42)'}} data={this.area} name="area" value={area} onChange={this.onChange} required ref="area"/>

              </div>
            </div>
            <div className="form-container-last">
              <div className="botones">
                <button className="bt-s2" type='submit' style={{fontFamily: 'Arial'}}>Guadar</button>
                <button className="bt-s3" onClick={this.cancelCourse.bind(this)}>Cancelar</button>
              </div>
            </div>
          </div>
        </form>
        </div>
      </div>
    );
  }
}

export default Analitico;
