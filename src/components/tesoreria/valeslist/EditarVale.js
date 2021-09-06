import React, { Component } from 'react'
import './Valeslist.css'
import firebase from '../../../Firebase'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import AttachMoneyIcon from '@material-ui/icons/AttachMoney'
import InputAdornment from '@material-ui/core/InputAdornment'
import RemoveIcon from '@material-ui/icons/Remove'

export default class EditarVale extends Component {
  constructor (props) {
    super(props)
    var URLactual = window.location
    this.state = {
      vales: [
        {
          id: 1,
          name: 'preuba',
          done: false
        }
      ],
      beneficiario: [],
      urlfire: String(URLactual).substr(-20)
    }
  }

  componentDidMount () {
    const itemsRef = firebase.database().ref(`vales/${this.state.urlfire}/recibosList`)
    this.listenForItems(itemsRef)
    const itemsRefPre = firebase.database().ref('beneficiario/').orderByChild('nombre')
    this.listenForBeneficiario(itemsRefPre)
  }

  listenForItems = (itemsRef) => {
    itemsRef.on('value', (snap) => {
      var vales = []
      snap.forEach((child) => {
        vales.push({
          estatus: child.val().estatus,
          fecha: child.val().fecha,
          folio: child.val().folio,
          importe: child.val().importe,
          isr: child.val().isr,
          iva: child.val().iva,
          nombre: child.val().nombre,
          subtotal: child.val().subtotal,
          tipo: child.val().tipo,
          total: child.val().total,
          uuid: child.val().uuid,
          id: child.key
        })
      })
      this.setState({
        vales: vales
      })
    })
  }

  listenForBeneficiario = (itemsRefPre) => {
    itemsRefPre.on('value', (snap) => {
      var beneficiario = []
      snap.forEach((child) => {
        beneficiario.push({
          nombre: child.val().nombre,
          id: child.key
        })
      })
      this.setState({
        beneficiario: beneficiario
      })
    })
  }

  handleInputChange = (e, index) => {
    const { name, value } = e.target
    const list = [...this.state.vales]
    list[index][name] = value.toUpperCase()
    this.setState({
      vales: list
    })
  }

  update = () => {
    firebase.database().ref(`vales/${this.state.urlfire}/recibosList`).update(this.state.vales)
    this.state.vales.forEach(element => firebase.database().ref('xml').push(element))
    alert('Recibos Actualizados')
  }

  render () {
    const newArray = ['']
    const myObj = {}
    this.state.beneficiario.filter(el => {
      if (!(el in myObj) && el.nombre !== undefined) {
        myObj[el + 1] = true
        newArray.push(el)
      }
    })
    const aarr = []
    newArray.map(item => {
      return aarr.push(item.nombre)
    })
    let result = aarr.filter((item,index)=>{
      return aarr.indexOf(item) === index
    })

    const sumaVale = [0]
    this.state.vales !== undefined && this.state.vales.map(item => (
      sumaVale.push(parseFloat(item.subtotal))
    ))
    const canti = (a, b) => a + b
    var canti2 = sumaVale.reduce(canti)

    console.log(this.state.vales)

    return (
      <div>
        <div>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '20px' }}>
              <h3>Editar Recibos</h3>
            </div>
            <div>
              {this.state.vales.map((x, i) =>
                <div key={i} style={{ display: 'flex', justifyContent: 'center' }}>
                  <TextField
                    label='Recibo'
                    name='folio'
                    value={x.folio}
                    disabled
                    onChange={e => this.handleInputChange(e, i)}
                    style={{ width: '15%', marginRight: '1%' }}
                  />
                  <select
                    label='Nombre'
                    name='nombre'
                    value={x.nombre}
                    onChange={e => this.handleInputChange(e, i)}
                    style={{ width: '15%', marginRight: '1%' }}
                  >
                    {result.map(data =>
                      <option name={data}>{data}</option>
                    )}
                  </select>
                  <TextField
                    label='subtotal'
                    name='subtotal'
                    type='number'
                    value={x.subtotal}
                    onChange={e => this.handleInputChange(e, i)}
                    style={{ width: '15%', marginRight: '1%' }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <AttachMoneyIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                  <TextField
                    label='Fecha'
                    type='date'
                    name='fecha'
                    InputLabelProps={{
                      shrink: true,
                    }}
                    value={x.fecha}
                    onChange={e => this.handleInputChange(e, i)}
                    style={{ width: '15%', marginRight: '1%' }}
                  />
                  {/* <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    {this.state.vales.recibosList.length !== 1 &&
                      <button
                        className='btn-remove-r'
                        onClick={() => this.handleRemoveClick(i)}>
                        -
                      </button>
                    }
                    {this.state.vales.recibosList.length - 1 === i &&
                      <button
                        className='btn-add-r'
                        onClick={this.handleAddClick}>
                        +
                      </button>
                    }
                  </div> */}
                </div>
              )}
              <div style={{ display: 'flex', justifyContent: 'center' }}>{canti2}</div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '30px' }}>
              <Button
                variant='contained'
                color='primary'
                onClick={this.update}
              >
                Actualizar
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
