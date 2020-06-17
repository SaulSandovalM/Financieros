import React, { Component } from 'react';
import './Registro.css';
import ListComponent from './ListComponent';
import ListFebrero from './ListFebrero';
import ListMarzo from './ListMarzo';
import ListAbril from './ListAbril';
import ListMayo from './ListMayo';
import ListJunio from './ListJunio';
import ListJulio from './ListJulio';
import ListAgosto from './ListAgosto';
import ListSeptiembre from './ListSeptiembre';
import ListOctubre from './ListOctubre';
import ListNoviembre from './ListNoviembre';
import ListDiciembre from './ListDiciembre';
import firebase from '../../../Firebase';

export default class Registro extends Component {
  constructor () {
    super()
    this.state = {
      lista: [
        {
          id: 1,
          name: 'preuba',
          done: false
        },
      ],
      mes: '',
      up: '',
      proy: '',
      ogasto: '',
      np: '',
      ene: '',
      feb: '',
      mar: '',
      abr: '',
      may: '',
      jun: '',
      jul: '',
      ago: '',
      sep: '',
      nov: '',
      dic: ''
    }
  }

  componentDidMount() {
    const itemsRef = firebase.database().ref('presupuesto/').orderByChild('up');
    this.listenForItems(itemsRef);
  }

  listenForItems = (itemsRef) => {
    itemsRef.on('value', (snap) => {
      var lista = [];
      snap.forEach((child) => {
        lista.push({
          up: child.val().up,
          proy: child.val().proy,
          ogasto: child.val().ogasto,
          np: child.val().np,
          ene: child.val().ene,
          feb: child.val().feb,
          mar: child.val().mar,
          abr: child.val().abr,
          may: child.val().may,
          jun: child.val().jun,
          jul: child.val().jul,
          ago: child.val().ago,
          sep: child.val().sep,
          nov: child.val().nov,
          dic: child.val().dic,
          done: child.val().done,
          id: child.key
        });
      });
      this.setState({
        lista: lista
      });
    });
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value})
  }

  render() {

    const toInputUppercase = e => {
      e.target.value = ("" + e.target.value).toUpperCase();
    };

    return (
      <div className='pf-container'>
        <div className='site-pf'>
          <p className='site-pf-s'><b>Registro de Fondos 2020</b></p>
        </div>
        <div className='date-container'>
          <p className='p-title-size'><b>- Seleccione el mes para buscar</b></p>
        </div>
        <input
          name='mes'
          onChange={this.handleChange.bind(this)}
          value={this.state.mes}
          onInput={toInputUppercase}
        />
        {this.state.mes === 'ENERO' &&
          <div>
            <ListComponent
              lista={this.state.lista}
            />
          </div>
        }
        {this.state.mes === 'FEBRERO' &&
          <div>
            <ListFebrero
              lista={this.state.lista}
            />
          </div>
        }
        {this.state.mes === 'MARZO' &&
          <div>
            <ListMarzo
              lista={this.state.lista}
            />
          </div>
        }
        {this.state.mes === 'ABRIL' &&
          <div>
            <ListAbril
              lista={this.state.lista}
            />
          </div>
        }
        {this.state.mes === 'MAYO' &&
          <div>
            <ListMayo
              lista={this.state.lista}
            />
          </div>
        }
        {this.state.mes === 'JUNIO' &&
          <div>
            <ListJunio
              lista={this.state.lista}
            />
          </div>
        }
        {this.state.mes === 'JULIO' &&
          <div>
            <ListJulio
              lista={this.state.lista}
            />
          </div>
        }
        {this.state.mes === 'AGOSTO' &&
          <div>
            <ListAgosto
              lista={this.state.lista}
            />
          </div>
        }
        {this.state.mes === 'SEPTIEMBRE' &&
          <div>
            <ListSeptiembre
              lista={this.state.lista}
            />
          </div>
        }
        {this.state.mes === 'OCTUBRE' &&
          <div>
            <ListOctubre
              lista={this.state.lista}
            />
          </div>
        }
        {this.state.mes === 'NOVIEMBRE' &&
          <div>
            <ListNoviembre
              lista={this.state.lista}
            />
          </div>
        }
        {this.state.mes === 'DICIEMBRE' &&
          <div>
            <ListDiciembre
              lista={this.state.lista}
            />
          </div>
        }
      </div>
    )
  }
}
