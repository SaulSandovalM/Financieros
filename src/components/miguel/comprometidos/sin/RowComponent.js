import React, { Component } from 'react'
import '../Comprometidos.css'
import Checkbox from '@material-ui/core/Checkbox'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemIcon from '@material-ui/core/ListItemIcon'

export default class RowComponent extends Component {
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
      <List dense component='div' role='list'>
        <ListItem role='listitem' button>
          <ListItemIcon>
            <Checkbox
              tabIndex={-1}
              disableRipple
            />
          </ListItemIcon>
          <ListItemText>
            {this.props.item.folio}
          </ListItemText>
        </ListItem>
      </List>
    )
  }
}
