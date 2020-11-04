import React, { Component } from 'react'
import '../Comprometidos.css'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import IconButton from '@material-ui/core/IconButton'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp'
import AddIcon from '@material-ui/icons/Add'
import Box from '@material-ui/core/Box'
import Collapse from '@material-ui/core/Collapse'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
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
