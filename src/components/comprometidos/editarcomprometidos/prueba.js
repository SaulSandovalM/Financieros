import React, { Component } from 'react';
import '../Comprometidos.css';
import {Link} from 'react-router-dom';

class Prueba extends Component {
  constructor(props){
     super(props);
     this.state = {
       item: 'Atendido',
     };
   }

   update = () => {
     this.props.update(this.props.item);
   }

  render() {
    return (
      <div>
        <div className="products-al">
          <div className="a-row">{this.props.item.fondo}</div>
          <div className="a-row">{this.props.item.fecha}</div>
          <div className="a-row">{this.props.item.realizo}</div>
          <div className="a-row">{this.props.item.tipo_doc}</div>
          <div className="a-row">{this.props.item.importe}</div>
          <div className="a-row">
            <Link to='/EditarComprometidos'>
              <button>Editar</button>
            </Link>
          </div>
          <div className="a-row"><button>Imprimir</button></div>
        </div>
      </div>
    );
  }
}

export default Prueba;
