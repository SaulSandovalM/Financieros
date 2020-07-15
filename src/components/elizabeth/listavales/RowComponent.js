import React, { Component } from 'react';
import './ListVales.css';

export default class RowComponent extends Component {
  render() {
    var auto = this.props.item.estatus;
    return (
      <div>
        { auto === 'Pendiente' &&
          <div class='caja-inputs'>
            <div class='table-left'>
            </div>
            <div class='table-v-num2'>
              <div>{this.props.item.vale}</div>
            </div>
            <div class='table-v-num2'>
              <div>{this.props.item.cheque}</div>
            </div>
            <div class='table-v-num'>
              <div>{this.props.item.cantidad}</div>
            </div>
            <div class='table-v-num'>
              <div>{this.props.item.cantidadc}</div>
            </div>
            <div class='table-v-num'>
              <div>{this.props.item.cantidadr}</div>
            </div>
            <div class='table-v-re'>
              <div>{this.props.item.concepto}</div>
            </div>
            <div class='table-v-num'>
              <div>{this.props.item.oficioS}</div>
            </div>
            <div class='table-v-re'>
              <div>{this.props.item.area}</div>
            </div>
            <div class='table-v-num'>
              <div>{this.props.item.turno}</div>
            </div>
            <div class='table-v-num'>
              <div>{this.props.item.factura}</div>
            </div>
            <div class='table-v-num'>
              <div>{this.props.item.recibos}</div>
            </div>
            <div class='table-v-num'>
              <div>{this.props.item.sc}</div>
            </div>
            <div class='table-v-num'>
              <div>{this.props.item.reintegroT}</div>
            </div>
            <div class='table-v-num'>
              <div>{this.props.item.fecha}</div>
            </div>
            <div class='table-v-re'>
              <div>{this.props.item.autorizo}</div>
            </div>
            <div class='table-v-re'>
              <div>{this.props.item.personaR}</div>
            </div>
            <div class='table-right'>
            </div>
          </div>
        }
      </div>
    );
  }
}
