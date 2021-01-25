import React, { useState, useRef } from 'react'
import ValeDataService from './ValeService'
import './Vales.css'
import logovale from '../../../img/logovale.png'
import logoh from '../../../img/logoh.png'
import Button from '@material-ui/core/Button'
import { useReactToPrint } from 'react-to-print'

const Vale = (props) => {
  const initialValeState = {
    key: null,
    vale: '',
    cheque: '',
    cantidad: '',
    cantidadc: '',
    cantidadr: '',
    concepto: '',
    oficioS: '',
    area: '',
    turno: '',
    personaR: '',
    factura: '',
    recibos: '',
    sc: ' ',
    fecha: '',
    autorizo: '',
    estatus: ''
  }
  const [currentVale, setCurrentVale] = useState(initialValeState)
  const { tutorial } = props
  if (currentVale.key !== tutorial.key) {
    setCurrentVale(tutorial)
  }
  const handleInputChange = (event) => {
    const { name, value } = event.target
    setCurrentVale({ ...currentVale, [name]: value })
  }
  const updateVale = () => {
    const data = {
      vale: currentVale.vale,
      cheque: currentVale.cheque,
      cantidad: currentVale.cantidad,
      cantidadc: currentVale.cantidadc,
      cantidadr: currentVale.cantidadr,
      concepto: currentVale.concepto,
      oficioS: currentVale.oficioS,
      area: currentVale.area,
      turno: currentVale.turno,
      personaR: currentVale.personaR,
      factura: currentVale.factura,
      recibos: currentVale.recibos,
      sc: currentVale.sc,
      fecha: currentVale.fecha,
      autorizo: currentVale.autorizo,
      estatus: currentVale.autorizo
    }
    ValeDataService.update(currentVale.key, data)
      .then(() => {
        alert('El vale se ha actualizado!')
      })
      .catch((e) => {
        console.log(e)
      })
  }
  const componentRef = useRef()
  const handlePrint = useReactToPrint({
    content: () => componentRef.current
  })

  return (
    <div>
      {currentVale ? (
        <div className='edit-form'>
          <form>
            <div className='margin-vale' ref={componentRef}>
              <div className='vale-title-container' style={{ marginTop: '80px' }}>
                <div className='vale-logo-container'>
                  <img className='logovale' src={logovale} alt='' />
                </div>
                <div className='vale-title-content'>
                  <p className='p-vale'>PROCURADURIA GENERAL DE JUSTICIA</p>
                  <p className='p-vale'>DIRECCION GENERAL DE ADMINISTRACION Y FINANZAS</p>
                  <p className='p-vale'>DIRECCION DE RECURSOS FINANCIEROS</p>
                </div>
                <div className='vale-num-container'>
                  <img className='logovale' src={logoh} alt='' />
                </div>
              </div>
              <div className='no-cv'>
                <div className='cv'>
                  <p className='p-cv'>
                    No. Cheque:
                    <input
                      className='input-che'
                      id='cheque'
                      name='cheque'
                      value={currentVale.cheque}
                      onChange={handleInputChange}
                      required
                    />
                  </p>
                  <p className='p-cv'>
                    No. Vale:
                    <input
                      className='input-che'
                      id='vale'
                      name='vale'
                      value={currentVale.vale}
                      onChange={handleInputChange}
                      required
                    />
                  </p>
                </div>
              </div>
              <div className='vale-pro-content'>
                <p className='p-vp'>VALE PROVISIONAL DE CAJA</p>
              </div>
              <div className='space-v' />
              <div className='mcc-content'>
                <div className='v-m'>
                  <p className='pmcc'>MOVIMIENTO</p>
                  <p className='p-bv'>
                    Autorizado
                  </p>
                  <p className='p-bv'>
                    Comprobado
                  </p>
                  <p className='p-bv'>
                    Reintegro/Reembolso
                  </p>
                </div>
                <div className='v-c'>
                  <p className='pmcc'>CANTIDAD</p>
                  <input
                    className='input-b'
                    id='cantidad'
                    name='cantidad'
                    value={currentVale.cantidad}
                    onChange={handleInputChange}
                    required
                  />
                  <input
                    className='input-b'
                    name='cantidadc'
                    id='cantidadc'
                    value={currentVale.cantidadc}
                    onChange={handleInputChange}
                    required
                  />
                  <input
                    className='input-b'
                    name='cantidadr'
                    id='cantidadr'
                    value={currentVale.cantidadr}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className='v-con'>
                  <p className='pmcc'>CONCEPTO</p>
                  <textarea
                    className='input-b-c'
                    name='concepto'
                    id='concepto'
                    value={currentVale.concepto}
                    onChange={handleInputChange}
                    required
                  />
                  <div className='oat-content'>
                    <div className='o-w'>
                      <p className='p-oat'>Oficio Solicitud</p>
                      <input
                        className='input-w'
                        name='oficioS'
                        id='oficioS'
                        value={currentVale.oficioS}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className='a-w'>
                      <p className='p-oat'>Área</p>
                      <select
                        className='input-w'
                        name='area'
                        id='area'
                        value={currentVale.area}
                        onChange={handleInputChange}
                        required
                      >
                        <option id='area'>Procuraduría General de Justicia</option>
                        <option id='area'>Subprocuraduría de Procedimientos Penales Región Oriente</option>
                        <option id='area'>Fiscalía Especializada para la atención de Delitos cometidos contra la Libertad de Expresión</option>
                        <option id='area'>Periodistas y Personas defensoras de los Derechos Humanos</option>
                        <option id='area'>Dirección General para la Atención de los Asuntos del Sistema Tradicional</option>
                        <option id='area'>Fiscalia de Delitos Electorales</option>
                        <option id='area'>Subprocuraduría de Derechos Humanos y Servicios a la Comunidad</option>
                        <option id='area'>Centro de Justicia Restaurativa Penal Poniente</option>
                        <option id='area'>Fiscalía para la Atención de Delitos de Género</option>
                        <option id='area'>Visitaduría General</option>
                        <option id='area'>Dirección General de Servicios Periciales</option>
                        <option id='area'>Centro de Operación Estratégica</option>
                        <option id='area'>Unidad Especializada en el Combate al Secuestro</option>
                        <option id='area'>Dirección General de Administración y Finanzas</option>
                        <option id='area'> - Dirección de Planeacion</option>
                        <option id='area'> - Dirección de Control y Validación</option>
                        <option id='area'> - Dirección de Informatica, Estadistica y Telecomunicaciones</option>
                        <option id='area'> - Dirección de Recursos Materiales</option>
                        <option id='area'> - Dirección de Recursos Humanos</option>
                        <option id='area'> - Dirección de Enlace FASP</option>
                        <option id='area'> - Dirección de Cordinacion de Calidad</option>
                        <option id='area'> - Dirección de Archivo</option>
                        <option id='area'>Fiscalía Especializada para la atención de los Delitos de Trata de Personas</option>
                        <option id='area'>Subprocuraduría de Procedimientos Penales Región Poniente</option>
                        <option id='area'>Centro de Atención Temprana Poniente</option>
                        <option id='area'>Dirección General de Investigación y Litigación Poniente</option>
                        <option id='area'>Dirección General de la Policía Investigadora</option>
                        <option id='area'>Centro de Atención Temprana Oriente</option>
                        <option id='area'>Centro de Justicia Restaurativa Penal Oriente</option>
                        <option id='area'>Dirección General de Investigación y Litigación Oriente</option>
                        <option id='area'>Dirección General de Recursos Materiales y Servicios</option>
                        <option id='area'>Fiscalía Especializada en Delitos de Corrupción</option>
                        <option id='area'>Fiscalía Especializada en Materia de Desaparición Forzada de Personas</option>
                      </select>
                    </div>
                    <div className='t-w'>
                      <p className='p-oat'>Turno</p>
                      <input
                        className='input-w'
                        name='turno'
                        id='turno'
                        value={currentVale.turno}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className='frsr-end'>
                <div className='frsr-w'>
                  <div className='div-4'>
                    <div className='frsr-w-b'>
                      <p className='p-oat'>Facturas</p>
                      <input
                        className='input-w'
                        name='factura'
                        id='factura'
                        value={currentVale.factura}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className='frsr-w-b' style={{ borderLeft: '0px' }}>
                      <p className='p-oat'>Recibos</p>
                      <input
                        className='input-w'
                        name='recibos'
                        id='recibos'
                        value={currentVale.recibos}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className='div-4'>
                    <div className='frsr-w-b'>
                      <p className='p-oat'>S/C</p>
                      <input
                        className='input-w'
                        name='sc'
                        id='sc'
                        value={currentVale.sc}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className='firma-content'>
                <div className='f-fecha'>
                  <input
                    type='date'
                    className='b-fecha-i'
                    name='fecha'
                    id='fecha'
                    value={currentVale.fecha}
                    required
                  />
                  <p className='font-size-f'>Fecha</p>
                </div>
                <div className='f-fecha'>
                  <select
                    className='b-auto'
                  >
                    <option id='autorizo'>L.C Nayra Ruiz Laguna</option>
                    <option id='autorizo'>Mtro.León Maximiliano Hernández Valdés</option>
                  </select>
                  <p className='font-size-f'>Autorizó</p>
                </div>
                <div className='f-fecha'>
                  <input
                    className='b-fecha-i'
                    name='personaR'
                    id='personaR'
                    value={currentVale.personaR}
                    onChange={handleInputChange}
                    required
                  />
                  <p className='font-size-f'>Recibió</p>
                </div>
              </div>
              <div className='last'>
                Me comprometo a entregar la comprobación que ampara el presente
                vale en un plazo no mayor  a 5 dias habiles posteriores a la fecha
                de recibido, de lo contrario reintegraré el recurso por la cantidad
                sin comprobar.
              </div>
            </div>
          </form>
          <div style={{ display: 'flex', width: '100%', justifyContent: 'flex-end' }}>
            <Button
              type='submit'
              variant='contained'
              color='primary'
              onClick={updateVale}
            >
              Actualizar
            </Button>
            <Button
              type='submit'
              variant='contained'
              color='primary'
              onClick={handlePrint}
            >
              Imprimir
            </Button>
          </div>
        </div>
      ) : (
        <div>
          <br />
          <p>Por favor selecciona un vale...</p>
        </div>
      )}
    </div>
  )
}

export default Vale
