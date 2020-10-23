import React, { Component } from 'react'
import './Oficios.css'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import marca from '../../../img/logoh.png'

export default class NewOficios extends Component {
  render () {
    return (
      <div>
        <Grid container spacing={3}>
          <Grid item xs>
            <Paper>
              <Card>
                <CardActionArea>
                  <CardMedia
                    style={{ height: '0', paddingTop: '100%' }}
                    image={marca}
                    title='Contemplative Reptile'
                  />
                  <CardContent>
                    <Typography gutterBottom variant='h5' component='h2'>
                      Oficio Pago Proveedor
                    </Typography>
                    <Typography variant='body2' color='textSecondary' component='p'>
                      Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                      across all continents except Antarctica
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Button size='small' color='primary'>
                    Imprimir
                  </Button>
                </CardActions>
              </Card>
            </Paper>
          </Grid>
          <Grid item xs>
            <Paper>
              <Card>
                <CardActionArea>
                  <CardMedia
                    style={{ height: '0', paddingTop: '100%'}}
                    image={marca}
                    title='Contemplative Reptile'
                  />
                  <CardContent>
                    <Typography gutterBottom variant='h5' component='h2'>
                      Oficio Pago Proveedor
                    </Typography>
                    <Typography variant='body2' color='textSecondary' component='p'>
                      Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                      across all continents except Antarctica
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Button size='small' color='primary'>
                    Imprimir
                  </Button>
                </CardActions>
              </Card>
            </Paper>
          </Grid>
          <Grid item xs>
            <Paper>
              <Card>
                <CardActionArea>
                  <CardMedia
                    style={{ height: '0', paddingTop: '100%'}}
                    image={marca}
                    title='Contemplative Reptile'
                  />
                  <CardContent>
                    <Typography gutterBottom variant='h5' component='h2'>
                      Oficio Pago Proveedor
                    </Typography>
                    <Typography variant='body2' color='textSecondary' component='p'>
                      Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                      across all continents except Antarctica
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Button size='small' color='primary'>
                    Imprimir
                  </Button>
                </CardActions>
              </Card>
            </Paper>
          </Grid>
        </Grid>
      </div>
    )
  }
}
