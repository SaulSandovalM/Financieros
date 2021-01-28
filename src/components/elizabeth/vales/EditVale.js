import React, { useState } from 'react'
import { useList } from 'react-firebase-hooks/database'
import ValesDataService from './ValeService'
import Vale from './Vale'

const EditVale = () => {
  const [currentVale, setCurrentVale] = useState(null)
  const [currentIndex, setCurrentIndex] = useState(-1)
  const [tutorials, loading, error] = useList(ValesDataService.getAll())
  const refreshList = () => {
    setCurrentVale(null)
    setCurrentIndex(-1)
  }
  const setActiveVale = (tutorial, index) => {
    const { vale, cheque, cantidad, cantidadc, cantidadr, concepto, oficioS, area, turno, personaR, factura, recibos, sc, fecha, autorizo, estatus } = tutorial.val()
    setCurrentVale({
      key: tutorial.key,
      vale,
      cheque,
      cantidad,
      cantidadc,
      cantidadr,
      concepto,
      oficioS,
      area,
      turno,
      personaR,
      factura,
      recibos,
      sc,
      fecha,
      autorizo,
      estatus
    })
    setCurrentIndex(index)
  }
  const filterData = tutorials.filter(
    (vales) => {
      return vales.vale.indexOf('Fondo Revolvente') !== -1
    }
  )

  return (
    <div style={{ padding: '60px 15px 15px 15px' }}>
      <div>
        {error && <strong>Error: {error}</strong>}
        {loading && <span>Cargando...</span>}
        <ul
          style={{
            height: '100px',
            overflow: 'scroll',
            textOverflow: 'ellipsis',
            webkitLineClamp: 1,
            webkitBoxOrient: 'vertical'
          }}
        >
          {!loading &&
            tutorials &&
            tutorials.map((tutorial, index) => (
              <li
                className={'list-group-item ' + (index === currentIndex ? 'active' : '')}
                onClick={() => setActiveVale(tutorial, index)}
                key={index}
              >
                {tutorial.val().vale}
              </li>
            ))}
        </ul>
      </div>
      <div className='col-md-6'>
        {currentVale ? (
          <Vale tutorial={currentVale} refreshList={refreshList} />
        ) : (
          <div>
            <br />
            <p>Por favor selecciona un vale...</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default EditVale
