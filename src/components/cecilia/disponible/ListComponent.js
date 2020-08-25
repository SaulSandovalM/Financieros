import React, { Component } from 'react'
import './Disponible.css'
import RowComponent from './RowComponent'
import firebase from '../../../Firebase'
import XLSX from 'xlsx'

export default class ListComponent extends Component {
  constructor (props) {
    super(props)
    this.state = {
      presupuesto: [],
      search: ''
    }
    this.handleFile = this.handleFile.bind(this)
  }

  componentWillMount () {
    firebase.database().ref('presupuesto/').on('child_added', snapshot => {
      this.setState({
        presupuesto: this.state.presupuesto.concat(snapshot.val())
      })
    })
  }

  updateSeacrh (event) {
    this.setState({ search: event.target.value.substr(0, 20) })
  }

  handleFile () {
    const presupuesto = [['UP', 'PARTIDA', 'RUBRO', 'ENERO', 'FEBRERO', 'MARZO', 'ABRIL', 'MAYO', 'JUNIO', 'JULIO', 'AGOSTO', 'SEPTIEMBRE', 'OCTUBRE', 'NOVIEMBRE', 'DICIEMBRE', 'DISPONIBLE']]
    this.state.presupuesto.forEach((pres) => {
      const ene = parseInt(pres.ene)
      const feb = parseInt(pres.feb)
      const mar = parseInt(pres.mar)
      const abr = parseInt(pres.abr)
      const may = parseInt(pres.may)
      const jun = parseInt(pres.jun)
      const jul = parseInt(pres.jul)
      const ago = parseInt(pres.ago)
      const sep = parseInt(pres.sep)
      const oct = parseInt(pres.oct)
      const nov = parseInt(pres.nov)
      const dic = parseInt(pres.dic)
      const dis = ene + feb + mar + abr + may + jun + jul + ago + sep + oct + nov + dic
      const presArray = [pres.up, pres.ogasto, pres.rubro, pres.ene, pres.feb, pres.mar, pres.abr, pres.may, pres.jun, pres.jul, pres.ago, pres.sep, pres.oct, pres.nov, pres.dic, dis]
      presupuesto.push(presArray)
    })
    const wb = XLSX.utils.book_new()
    const wsAll = XLSX.utils.aoa_to_sheet(presupuesto)
    XLSX.utils.book_append_sheet(wb, wsAll, 'Presupuesto')
    XLSX.writeFile(wb, 'Disponible-Presupuesto.xlsx')
  }

  render () {
    const filterData = this.state.presupuesto.filter(
      (presupuesto) => {
        return presupuesto.up.indexOf(this.state.search) !== -1
      }
    )

    return (
      <div>
        <div className='p-container-dis'>
          <p className='p-title-margin-fr'>
            Ingresa la Unidad Presupuestal a buscar
          </p>
          <input
            className='input-style-fr'
            value={this.state.search}
            onChange={this.updateSeacrh.bind(this)}
          />
        </div>
        <div className='but-exc'>
          <button className='input-sc boton-g' onClick={this.handleFile}>
            Exportar a Excel
          </button>
        </div>
        <div>
          <div className='meses-container'>
            <div className='table-left' />
            <div className='table-dis-up'>
              <p className='p-h-dis'>UNIDAD</p>
            </div>
            <div className='table-dis-up'>
              <p className='p-h-dis'>RUBRO</p>
            </div>
            <div className='table-dis-up'>
              <p className='p-h-dis'>PARTIDA</p>
            </div>
            <div className='table-dis-up'>
              <p className='p-h-dis'>ENERO</p>
            </div>
            <div className='table-dis-up'>
              <p className='p-h-dis'>FEBRERO</p>
            </div>
            <div className='table-dis-up'>
              <p className='p-h-dis'>MARZO</p>
            </div>
            <div className='table-dis-up'>
              <p className='p-h-dis'>ABRIL</p>
            </div>
            <div className='table-dis-up'>
              <p className='p-h-dis'>MAYO</p>
            </div>
            <div className='table-dis-up'>
              <p className='p-h-dis'>JUNIO</p>
            </div>
            <div className='table-dis-up'>
              <p className='p-h-dis'>JULIO</p>
            </div>
            <div className='table-dis-up'>
              <p className='p-h-dis'>AGOSTO</p>
            </div>
            <div className='table-dis-up'>
              <p className='p-h-dis'>SEPTIEMBRE</p>
            </div>
            <div className='table-dis-up'>
              <p className='p-h-dis'>OCTUBRE</p>
            </div>
            <div className='table-dis-up'>
              <p className='p-h-dis'>NOVIEMBRE</p>
            </div>
            <div className='table-dis-up'>
              <p className='p-h-dis'>DICIEMBRE</p>
            </div>
            <div className='table-dis-up'>
              <p className='p-h-dis'>DISPONIBILIDAD</p>
            </div>
            <div className='table-right' />
          </div>
          {
            filterData.map(item =>
              <RowComponent
                key={item.id}
                item={item}
              />
            )
          }
        </div>
      </div>
    )
  }
}
