import React, { Component } from 'react'
import './Fondor.css'
import RowComponent from './RowComponent'
import firebase from '../../../Firebase'
import Paper from '@material-ui/core/Paper'
import TableContainer from '@material-ui/core/TableContainer'
import Table from '@material-ui/core/Table'

export default class ListComponent extends Component {
  constructor (props) {
    super(props)
    this.state = {
      presupuesto: []
    }
  }

  componentWillMount () {
    firebase.database().ref('presupuesto/').on('child_added', snapshot => {
      this.setState({
        presupuesto: this.state.presupuesto.concat(snapshot.val())
      })
    })
  }

  render () {
    return (
      <div style={{ margin: '30px' }}>
        <TableContainer component={Paper}>
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
