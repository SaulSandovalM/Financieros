import React, { Component } from 'react'
import './ListVales.css'
import RowComponent from './RowComponent'
import firebase from '../../../Firebase'
import XLSX from 'xlsx'

export default class ListComponent extends Component {
  constructor (props) {
    super(props)
    this.state = {
      vales: []
    }
    this.handleExcel = this.handleExcel.bind(this)
  }

  componentWillMount () {
    firebase.database().ref('vales/').on('child_added', snapshot => {
      this.setState({
        vales: this.state.vales.concat(snapshot.val())
      })
    })
  }

  handleExcel () {
    const vales = [['#V', '#C', 'AUTORIZADO', 'COMPOBADO', 'REEM/REIN', 'CONCEPTO', 'OFICIO S', 'AREA', 'TURNO', 'FACTURA', 'RECIBOS', 'S/C', 'FECHA', 'AUTORIZA', 'RECIBIO']]
    this.state.vales.forEach((vale) => {
      const valeArray = [vale.vale, vale.cheque, vale.cantidad, vale.cantidadc, vale.cantidadr, vale.reembolso, vale.concepto, vale.oficioS, vale.area, vale.turno, vale.sc, vale.fecha, vale.autorizo, vale.personaR, vale.recibos]
      vales.push(valeArray)
    })
    const wb = XLSX.utils.book_new()
    const wsAll = XLSX.utils.aoa_to_sheet(vales)
    XLSX.utils.book_append_sheet(wb, wsAll, 'Vales')
    XLSX.writeFile(wb, 'Vales_No_Autorizados.xlsx')
  }

  render () {
    return (
      <div>
        <div className='but-exc'>
          <button className='input-sc boton-g' onClick={this.handleExcel}>
            Exportar a Excel
          </button>
        </div>
        <div class='caja-inputs'>
          <div class='table-left' />
          <div class='table-v-num2'>
            <b># V</b>
          </div>
          <div class='table-v-num2'>
            <b># C</b>
          </div>
          <div class='table-v-num'>
            <b>AUTO</b>
          </div>
          <div class='table-v-num'>
            <b>COMP</b>
          </div>
          <div class='table-v-num'>
            <b>REEM/REINT</b>
          </div>
          <div class='table-v-num'>
            <b>CONC</b>
          </div>
          <div class='table-v-num'>
            <b>OS</b>
          </div>
          <div class='table-v-num'>
            <b>AREA</b>
          </div>
          <div class='table-v-num'>
            <b>TURNO</b>
          </div>
          <div class='table-v-num'>
            <b>FACTURA</b>
          </div>
          <div class='table-v-num'>
            <b>RECIBOS</b>
          </div>
          <div class='table-v-num'>
            <b>S/C</b>
          </div>
          <div class='table-v-num'>
            <b>FECHA</b>
          </div>
          <div class='table-v-num'>
            <b>AUTORIZO</b>
          </div>
          <div class='table-v-num'>
            <b>RECIBIO</b>
          </div>
          <div class='table-right' />
        </div>
        {
          this.props.lista.map(item =>
            <RowComponent
              key={item.id}
              item={item}
            />
          )
        }
      </div>
    )
  }
}
