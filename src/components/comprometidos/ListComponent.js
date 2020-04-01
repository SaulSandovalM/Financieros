import React, { Component } from 'react';
import './Comprometidos.css';
import RowComponent from './RowComponent';
import firebaseConf from '../../Firebase';
import {Link} from 'react-router-dom';

class ListComponent extends Component {
  constructor (props) {
   super(props);
   this.state = {
     comprometidos: [],
   };

   console.log(this.props.update)
 }

  componentWillMount () {
    firebaseConf.database().ref('comprometidos/').on('child_added', snapshot => {
      this.setState({
        comprometidos: this.state.comprometidos.concat(snapshot.val())
      });
    });
  }

  render() {
    return (
      <div className="App" style={{height: '100vh'}}>
        <h1>Comprometidos</h1>
        {/*<Link to='/Search' style={{textDecoration: 'none'}}>
          <p>Buscar por Folio</p>
        </Link>*/}
        <div className="products-al">
          <div className="a-row-t">Fondos</div>
          <div className="a-row-t">Fecha</div>
          <div className="a-row-t">Nombre Realizo</div>
          <div className="a-row-t">Tipo de documento</div>
          <div className="a-row-t">Importe</div>
          <div className="a-row-t">Comprometido</div>
          <div className="a-row-t">Imprimir</div>
        </div>
        {
          this.props.lista.map(item =>
            <RowComponent
              key={item.id}
              item={item}
              update={this.props.update}
            />
          )
        }
      </div>
    );
  }
}

export default ListComponent;
