import React, { Component } from 'react'
import './Trans.css'
import RowComponent from './RowComponent'
import firebase from '../../../Firebase'
import Paper from '@material-ui/core/Paper'
import TableContainer from '@material-ui/core/TableContainer'
import Table from '@material-ui/core/Table'
import TextField from '@material-ui/core/TextField'

export default class ListComponent extends Component {
  constructor (props) {
    super(props)
    this.state = {
      presupuesto: [],
      search: ''
    }
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

  render () {
    // const filterData = this.props.listaB.filter(
    //   (presupuesto) => {
    //     return presupuesto.up.indexOf(this.state.search) !== -1
    //   }
    // )

    return (
      <div style={{ margin: '30px' }}>
        <TableContainer component={Paper}>
          <TextField
            style={{ width: '100%' }}
            label='Ingresa el numero de Oficio'
            value={this.state.search}
            onChange={this.updateSeacrh.bind(this)}
          />
          <Table size='small'>
            {
              this.props.listaB.map(item =>
                <RowComponent
                  key={item.id}
                  item={item}
                />
              )
            }
          </Table>
        </TableContainer>
      </div>
    )
  }
}
