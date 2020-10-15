import React, { Component } from 'react'
import './Comprometidos.css'
import RowComponent from './RowComponent'
import firebase from '../../../Firebase'
import { DropDownList } from '@progress/kendo-react-dropdowns'
import '@progress/kendo-theme-default/dist/all.css'

export default class ListComponent extends Component {
  constructor (props) {
    super(props)
    this.state = {
      presupuesto: [],
      importe: ''
    }
  }

  componentWillMount () {
    firebase.database().ref('presupuesto/').on('child_added', snapshot => {
      this.setState({
        presupuesto: this.state.presupuesto.concat(snapshot.val())
      })
    })
  }

  resetForm () {
    this.refs.contactForm.reset()
  }

  updateSeacrh (event) {
    this.setState({ search: event.target.value.substr(0, 20) })
  }

  updateSeacrh2 (event) {
    this.setState({ search2: event.target.value.substr(0, 7) })
  }

  handleChange (event) {
    this.setState({ [event.target.name]: event.target.value })
  }

  partida = ['211001', '211002', '212001', '212002', '214001', '214002', '215001', '216001', '217001', '221001', '221002', '246001', '251001', '253001', '254001', '255001', '261001', '271001', '272001', '291001', '292001', '311001', '313001', '318001', '323002', '334001', '338001', '341001', '351001', '352001', '353001', '355001', '357001', '358001', '361002', '372001', '375001', '381001', '392006', '394001', '218002', '312001', '371001', '247001', '249001', '359001', '336001', '275001', '211003', '541001', '515001', '339001']
  up = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '20', '21', '22', '23', '24']

  render () {
    const allowCustom = this.state.allowCustom

    return (
      <div>
        <div style={{zIndex: '5', marginTop: '-190px'}}>
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
                required
                ref='partida'
                value={this.state.search}
                onChange={this.updateSeacrh.bind(this)}
              />
            </div>
            <div className='f-c-c'>
              <p className='fc'>U. Presupuestal</p>
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
                name='presupuestal'
                value={this.state.search2}
                onChange={this.updateSeacrh2.bind(this)}
                required
                ref='presupuestal'
              />
            </div>
          </div>
        </div>
        <div className='table-fc' style={{marginTop: '350px'}}>
          <div className='tfc'>
            Partida
          </div>
          <div className='tfc'>
            Unidad P
          </div>
          <div className='tfc'>
            Rubro
          </div>
          <div className='tfc'>
            Importe
          </div>
          <div className='tfc'>
            Isr
          </div>
          <div className='tfc'>
            Iva
          </div>
          <div className='tfc'>
            Total
          </div>
        </div>
        {
          this.props.listaB.map(item =>
            <RowComponent
              key={item.id}
              item={item}
              update={this.props.update}
              search={this.state.search}
              search2={this.state.search2}
            />
          )
        }
      </div>
    )
  }
}
