import React, { Component } from 'react'
import './Comprometidos.css'
import TableCell from '@material-ui/core/TableCell'
import IconButton from '@material-ui/core/IconButton'
import AddIcon from '@material-ui/icons/Add'

export default class RowC extends Component {
  constructor (props) {
    super(props)
    this.state = {
      done: false,
      item: 'Atendido'
    }
  }

  update = () => {
    this.props.update(this.props.item)
  }

  render () {
    return (
      <div>
        {this.state.partida === this.props.item.ogasto && this.state.up === this.props.item.up && this.state.rubro === this.props.item.rubro ?
          <TableCell className='border-icon'>
            <IconButton size='small' className='border-des' onClick={this.update}>
              <AddIcon />
            </IconButton>
          </TableCell>: null
        }
      </div>
    )
  }
}
