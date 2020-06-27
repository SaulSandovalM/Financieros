import React, { Component } from 'react';
import './ListVales.css';

export default class RowAuto extends Component {
  render() {
    var auto = this.props.item.estatus;
    return (
      <div>
        { auto === 'Autorizado' &&
          <div class='caja-inputs'>
            <div class='table-left'>
            </div>
            <div class='table-v-num2'>
              <b>{this.props.item.vale}</b>
            </div>
            <div class='table-v-num2'>
              <b>{this.props.item.cheque}</b>
            </div>
            <div class='table-v-num'>
              <b>{this.props.item.cantidad}</b>
            </div>
            <div class='table-v-num'>
              <b>{this.props.item.cantidadc}</b>
            </div>
            <div class='table-v-num'>
              <b>{this.props.item.cantidadr}</b>
            </div>
            <div class='table-v-re'>
              <b>{this.props.item.concepto}</b>
            </div>
            <div class='table-v-num'>
              <b>{this.props.item.oficioS}</b>
            </div>
            <div class='table-v-re'>
              <b>{this.props.item.area}</b>
            </div>
            <div class='table-v-num'>
              <b>{this.props.item.turno}</b>
            </div>
            <div class='table-v-num'>
              <b>{this.props.item.factura}</b>
            </div>
            <div class='table-v-num'>
              <b>{this.props.item.recibos}</b>
            </div>
            <div class='table-v-num'>
              <b>{this.props.item.sc}</b>
            </div>
            <div class='table-v-num'>
              <b>{this.props.item.reintegroT}</b>
            </div>
            <div class='table-v-num'>
              <b>{this.props.item.fecha}</b>
            </div>
            <div class='table-v-re'>
              <b>{this.props.item.autorizo}</b>
            </div>
            <div class='table-v-re'>
              <b>{this.props.item.personaR}</b>
            </div>
            <div class='table-right'>
            </div>
          </div>
        }
      </div>
    );
  }
}
