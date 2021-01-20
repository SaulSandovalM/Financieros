import React, { Component } from 'react'
import './Caratula.css'
import ReactToPrint from 'react-to-print'
import boton from '../../../img/cua.png'
import boton2 from '../../../img/cua2.png'
import programa from '../../../img/logovale.png'
import logo2 from '../../../img/logo.jpg'
import firebase from '../../../Firebase'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'

export default class Cpdf extends Component{
  constructor (props) {
    super(props)
    this.unsubscribe = null
    this.state = {
      comprometidos: [
        {
          id: 1,
          name: 'Cargando ...',
          done: false
        }
      ],
      searchF: ''
    }
  }

  componentDidMount() {
    const updateRef = firebase.firestore().collection('fondos')
    this.unsubscribe = updateRef.onSnapshot(this.onCollectionUpdate)
  }

  onCollectionUpdate = (querySnapshot) => {
    const comprometidos = []
    querySnapshot.forEach((doc) => {
      const { fondo, presupuestal, no_proyecto, importe_comp } = doc.data()
      comprometidos.push({
        key: doc.id,
        doc,
        fondo,
        presupuestal,
        no_proyecto,
        importe_comp,
      })
    })
    this.setState({
      comprometidos
   })
  }

  handleChange (event) {
    this.setState({ [event.target.name]: event.target.value })
  }

  render(){
    return(
      <div className='cpdf-dad2'>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Grid className='grid-w-c'>
            <Grid className='grid-w2' style={{ marginTop: '100px' }}>
              <Paper className='paper-p-c'>
                <div>
                  <p className='sub-c-p'>Ingrese el Numero de Fondo a buscar</p>
                  <input
                    style={{ width: '100%' }}
                    className='field'
                    name='searchF'
                    value={this.state.searchF}
                    onChange={this.handleChange.bind(this)}
                  />
                </div>
                <ReactToPrint
                  trigger={() => <buttom className='b-imp'>Imprimir</buttom>}
                  content={() => this.holi}
                />
              </Paper>
            </Grid>
          </Grid>
        </div>
        <div ref={el => (this.holi = el)} className='page-s'>
        {this.state.comprometidos.map(comprometidos =>
          <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', pageBreakBefore: 'always' }}>
            {parseInt(this.state.searchF, 10) === comprometidos.fondo &&
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
              <div className='cpdf-subdad-fi'>
                <div className='fondo-procus'>
                  <img className='ims' src={programa} alt='' />
                  <img className='im' src={logo2} alt='' />
                </div>
                <div className='procu'>
                  <p className='text-fr'>
                    Fondo: Procuraduría General de Justicia Del Estado de Hidalgo<br />
                    Subfondo: N/A<br />
                    Unidad Administrativa: Dirección General de Administración y Finanzas<br />
                    Area Generadora: Dirección de Recursos Financieros
                  </p>
                </div>
                <div className='acomodar'>
                  <div className='seccion-de'>
                    <p className='text'>
                      Sección: 5C. Recursos Financieros
                      <br />Serie: 5C.12 Asignación y Optimización de Recuersos
                      <br />Sub-serie: No Aplica
                      <br />Código: PGJH-09.1*5C.12
                    </p>
                  </div>
                  <div className='asunto-iz'>
                    <p className='text-22'>
                      Asunto:
                      <br />
                      Creación del Fondo Revolvente
                    </p>
                  </div>
                </div>
                <div className='acomodar-2'>
                  <div className='texto-ofi'>
                    <p className='text'>Fecha de Apertura:{/* {this.state.} */}</p>
                    <p className='text'>Fecha de Cierre:{/* {this.state.} */}</p>
                  </div>
                  <div className='num-exp'>
                    <p className='text-2'>Número de Expediente:
                      <br />PGJH-09.1*5C.{comprometidos.fondo}/2020
                      <br />Número de hojas:
                      <input
                        className='hojas'
                        name='hojas'
                        onChange={this.handleChange.bind(this)}
                        value={this.state.hojas}
                      />
                    </p>
                  </div>
                </div>
                <div className='fundamento' />
                <div className='clausula'>
                  <p className='cons'>
                    <p className='negritas'>Fundamento legal</p>
                    <br />
                    <p className='t-cara'>Costitución Politíca de los Estados Unidos Mexicanos, artículo
                    6 fracción I y II, 8° Costitución politica del Estados de Hidalgo,
                    artículo 4 ter 89, 90 y 91. Ley Organica de Ministerio Público
                    del Estado de Hidalgo, artículo 17 y 27 fracciones I, 36.
                    Ley de transpariencia y Acceso a la  Información  Publica
                    Gubernamental para el Estado de Hidalgo artículo 5 fracción
                    X, 6, 22 fracciones XVIII y XIX. 36 fracción I, Ley de
                    Responsabilidades de los Servidores Públicos del Estado de Hidalgo,
                    artículos 47. Ley de Archivos del Estado de Hidalgo artículos
                    2, 3, 4, fracción X, 9 y 31. Reglamento de la Ley de los Archivos
                    del Estado de Hidalgo artículo 2 fracción I.</p>
                  </p>
                </div>
                <div className='cajas'>
                  <div className='cajas-valor1'>
                    <p className='t-cajass'>Valor Documento Primario</p>
                    <p className='t-cajas'>
                      Administrativo
                      <img className='svg' src={boton2} alt='' />
                    </p>
                    <p className='t-cajas'>
                      Fiscal
                      <img className='svg' src={boton2} alt='' />
                    </p>
                    <p className='t-cajas'>
                      Legal
                      <img className='svg' src={boton} alt='' />
                    </p>
                  </div>
                  <div className='cajas-valor2'>
                    <p className='t-cajass'>Valor Documental Secundario</p>
                    <p className='t-cajas'>Informativo <img className='svg' src={boton2} alt='' /></p>
                    <p className='t-cajas'>Evidencial<img className='svg' src={boton2} alt='' /></p>
                    <p className='t-cajas'>Testimonial<img className='svg' src={boton} alt='' /></p>
                  </div>
                  <div className='cajas-valor3'>
                    <p className='t-cajass'>Clasificación de la Información</p>
                    <p className='t-cajas'>Pública<img className='svg' src={boton2} alt='' /></p>
                    <p className='t-cajas'>Reservada<img className='svg' src={boton} alt='' /></p>
                    <p className='t-cajas'>Cofindencial<img className='svg' src={boton} alt='' /></p>
                  </div>
                </div>
                <div className='contenedor'>
                  <div className='obser'>
                    <div className='vigencia'>
                      <p className='vig-t'>Vigencia Documental</p>
                      <div className='vigencia2'>
                        <p className='vig-t'>En Tramite 1 Años</p>
                        <p className='vig-t'>Concentracion 4 años</p>
                        <p className='vig-t'>Total 5 años</p>
                      </div>
                    </div>
                    <div className='ubi'>
                      <p className='ubi-t'>Ubicacion Fisica del Expediente<br />Archivo tramite de la Procuraduria General de Justicia</p>
                    </div>
                  </div>
                  <div className='cuadro'>
                    <p className='ubi-t2'>Observaciones</p>
                  </div>
                </div>
                <div className='final'>
                  <div className='destino'>
                    <div className='df'>
                      <p className='t-caja'> Destino Final</p>
                    </div>
                    <div className='df-t'>
                      <p className='t-cajas'>
                        Baja
                        <img className='svg' src={boton} alt='' />
                      </p>
                      <p className='t-cajas'>
                        Archivo historico
                        <img className='svg' src={boton} alt='' />
                      </p>
                      <p className='t-cajas'>
                        Muestreo
                        <img className='svg' src={boton2} alt='' />
                      </p>
                    </div>
                  </div>
                  <div className='fe-consulta'>
                    <div className='df'>
                      <p className='t-caja'>
                        Fecha(s) de Consulta
                        <p className='t-cajas' style={{ paddingLeft: '10px' }}>
                          1
                        </p>
                        <p className='t-cajas' style={{ paddingLeft: '10px' }}>
                          2
                        </p>
                        <p className='t-cajas' style={{ paddingLeft: '10px' }}>
                          3
                        </p>
                      </p>
                    </div>
                  </div>
                </div>
                <div className='footer' />
              </div>
            </div>
          }
          </div>
        )}
        </div>
      </div>
    )
  }
}
