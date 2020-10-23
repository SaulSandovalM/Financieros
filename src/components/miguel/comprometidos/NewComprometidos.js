import React, { Component } from 'react'
import './Comprometidos.css'
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
import AddIcon from '@material-ui/icons/Add';
import Box from '@material-ui/core/Box'
import Collapse from '@material-ui/core/Collapse'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import Checkbox from '@material-ui/core/Checkbox'
import Divider from '@material-ui/core/Divider'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'

export default class NewComprometidos extends Component {
  constructor () {
    super()
    this.state = {
      open: false
    }
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick () {
    this.setState(state => ({
      open: !state.open
    }))
  }

  render () {
    const { open } = this.state

    return (
      <div>
        <div>
          <Grid container spacing={3} justify='center' alignItems='center'>
            <Grid item xs>
              <Card>
                <CardHeader title='Sin Asignar' />
                <Divider />
                <List dense component='div' role='list'>
                  <ListItem role='listitem' button>
                    <ListItemIcon>
                      <Checkbox
                        tabIndex={-1}
                        disableRipple
                      />
                    </ListItemIcon>
                    <ListItemText>
                      Perro
                    </ListItemText>
                  </ListItem>
                  <ListItem />
                </List>
              </Card>
            </Grid>
            <Grid item>
              <Grid container direction='column' alignItems='center'>
                <Button
                  variant='outlined'
                  size='small'
                  aria-label='move selected right'
                >
                  &gt;
                </Button>
                <Button
                  variant='outlined'
                  size='small'
                  aria-label='move selected left'
                >
                  &lt;
                </Button>
              </Grid>
            </Grid>
            <Grid item xs>
              <Card>
                <CardHeader title='Asignados' />
                <Divider />
                <List dense component='div' role='list'>
                  <ListItem role='listitem' button>
                    <ListItemIcon>
                      <Checkbox
                        tabIndex={-1}
                        disableRipple
                      />
                    </ListItemIcon>
                    <ListItemText>
                      Gato
                    </ListItemText>
                  </ListItem>
                  <ListItem />
                </List>
              </Card>
            </Grid>
          </Grid>
        </div>
        <div>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper className='paper-content'>
                <TableHead>
                  <TableRow>
                    <TableCell className='border-icon' />
                    <TableCell
                      className='border-table'
                      style={{ fontWeight: 'bold' }}
                    >
                      Partida
                    </TableCell>
                    <TableCell
                      className='border-table'
                      style={{ fontWeight: 'bold' }}
                    >
                      Unidad Presupuestal
                    </TableCell>
                    <TableCell
                      className='border-table'
                      style={{ fontWeight: 'bold' }}
                    >
                      Rubro
                    </TableCell>
                    <TableCell
                      className='border-table'
                      style={{ fontWeight: 'bold' }}
                    >
                      Importe
                    </TableCell>
                    <TableCell
                      className='border-table'
                      style={{ fontWeight: 'bold' }}
                    >
                      Iva
                    </TableCell>
                    <TableCell
                      className='border-table'
                      style={{ fontWeight: 'bold' }}
                    >
                      Isr
                    </TableCell>
                    <TableCell
                      className='border-table'
                      style={{ fontWeight: 'bold' }}
                    >
                      Total
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableRow style={{ width: '100%' }}>
                  <TableCell className='border-icon'>
                    <IconButton size='small' className='border-des'>
                      <AddIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell className='border-table'>
                    <FormControl style={{ width: '100%' }}>
                      <Select>
                        <MenuItem value={10}>211002</MenuItem>
                        <MenuItem value={20}>211003</MenuItem>
                        <MenuItem value={30}>212001</MenuItem>
                      </Select>
                    </FormControl>
                  </TableCell>
                  <TableCell className='border-table'>
                    <FormControl style={{ width: '100%' }}>
                      <Select>
                        <MenuItem value={10}>01</MenuItem>
                        <MenuItem value={20}>02</MenuItem>
                        <MenuItem value={30}>04</MenuItem>
                      </Select>
                    </FormControl>
                  </TableCell>
                  <TableCell className='border-table'>
                    <FormControl style={{ width: '100%' }}>
                      <Select>
                        <MenuItem value={10}>2589512</MenuItem>
                        <MenuItem value={20}>7896541</MenuItem>
                        <MenuItem value={30}>3216548</MenuItem>
                      </Select>
                    </FormControl>
                  </TableCell>
                  <TableCell className='border-table'>$ 1500.00</TableCell>
                  <TableCell className='border-table'>$ 20.00</TableCell>
                  <TableCell className='border-table'>$ 0.00</TableCell>
                  <TableCell className='border-table'>$ 1520.00</TableCell>
                </TableRow>
                <TableRow style={{ width: '100%' }}>
                  <TableCell className='border-icon'>
                    <IconButton size='small' className='border-des' onClick={this.handleClick}>
                      {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                  </TableCell>
                  <TableCell className='border-table'>211002</TableCell>
                  <TableCell className='border-table'>13</TableCell>
                  <TableCell className='border-table'>9513578</TableCell>
                  <TableCell className='border-table'>$ 1500.00</TableCell>
                  <TableCell className='border-table'>$ 20.00</TableCell>
                  <TableCell className='border-table'>$ 0.00</TableCell>
                  <TableCell className='border-table'>$ 1520.00</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6} className='border-des'>
                    <Collapse in={open} timeout='auto' unmountOnExit>
                      <Box margin={1}>
                        <Typography variant='h6' gutterBottom component='div'>
                          Detalle
                        </Typography>
                        <Table size='small' aria-label='purchases'>
                          <TableHead>
                            <TableRow>
                              <TableCell>Date</TableCell>
                              <TableCell>Customer</TableCell>
                              <TableCell align='right'>Amount</TableCell>
                              <TableCell align='right'>Total price ($)</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            <TableRow>
                              <TableCell component='th' scope='row'>
                                2020
                              </TableCell>
                              <TableCell>182476</TableCell>
                              <TableCell align='right'>283746</TableCell>
                              <TableCell align='right'>
                                $ 1000
                              </TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </Box>
                    </Collapse>
                  </TableCell>
                </TableRow>
              </Paper>
            </Grid>
          </Grid>
        </div>
      </div>
    )
  }
}
