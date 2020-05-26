import React, { Component } from 'react';
import './Vales.css';
import CurrencyFormat from 'react-currency-format';
import { Link } from 'react-router-dom';
import Popup from "reactjs-popup";
import Dropzone from 'react-dropzone';


export default class RowComponent extends Component {
  constructor(props){
    super(props);
    this.state = {
      done: false,
      item: 'Atendido',
    };
  }

  render() {
    return (
      <div class='caja-inputs'>
        <div class='table-left'>
        </div>
        <div class='table-v-num'>
          <b>{this.props.item.vale}</b>
        </div>
        <div class='table-v-importe'>
          <b>{this.props.item.movimiento}</b>
        </div>
        <div class='table-v-fechae'>
          <b>{this.props.item.concepto}</b>
        </div>
        <div class='table-v-cantidad'>
          <div>
            <CurrencyFormat
              value={this.props.item.cantidad}
              displayType={'text'}
              thousandSeparator={true}
              prefix={'$ '}
              decimalSeparator={'.'} />
            .00
          </div>
        </div>
         <div class = 'table-v-cantidad'>
          <Popup trigger = {<button>Comprobación</button>} modal>
          <div>
            <div className='presupuesto-container'>
              <div className='presupuesto-content'>
                <div className='presupuesto-card'>
                  <h1 className='presupuesto-h1'>Comprobaciones</h1>
                  <p className='presupuesto-p'>Selecciona la carga de evidencias de tus comprobaciones</p>
                  <button>Mostrar información</button><br/><br/>
                  <div id="info"></div>
                  <div>
                    <p>Facturas:</p>
                    <Dropzone
                      style={{
                        position: 'relative',
                        width: '100%',
                        height: '30px',
                        borderWidth: '2px',
                        borderColor: 'rgb(102, 102, 102)',
                        borderStyle: 'solid',
                        borderRadius: '5px',
                        maxFiles: 5}}
                        //accept=".xml" onChange={this.handleOnChange1.bind(this)}
                        >
                    </Dropzone>
                    //<progress className='progress' value={this.state.pdf1} max='100'>
                      //{this.state.pdf1} %
                    //</progress>
                    //<div className="dz-default dz-message" value={this.state.pdf1} max='100'>
                      //Carga {this.state.pdf1} %</div>
                  //</div>
                  <div>
                    <p>XML:</p>
                    <Dropzone
                      style={{
                        position: 'relative',
                        width: '100%',
                        height: '30px',
                        borderWidth: '2px',
                        borderColor: 'rgb(102, 102, 102)',
                        borderStyle: 'solid',
                        borderRadius: '5px',
                        maxFiles: 5}}
                        //accept=".pdf" onChange={this.handleOnChange2.bind(this)}
                        >
                    </Dropzone>
                    //<progress className='progress' value={this.state.pdf2} max='100'>
                      //{this.state.pdf2} %
                    //</progress>
                    //<div className="dz-default dz-message" value={this.state.pdf2} max='100'>
                      //Carga {this.state.pdf2} %</div>
                  //</div>
                  <div>
                    <p>Recibo Simple:</p>
                    <Dropzone
                      style={{
                        position: 'relative',
                        width: '100%',
                        height: '30px',
                        borderWidth: '2px',
                        borderColor: 'rgb(102, 102, 102)',
                        borderStyle: 'solid',
                        borderRadius: '5px',
                        maxFiles: 5}}
                        //accept=".pdf" onChange={this.handleOnChange3.bind(this)}
                        >
                    </Dropzone>
                    //<progress className='progress' value={this.state.pdf3} max='100'>
                      //{this.state.pdf3} %
                    //</progress>
                    //<div className="dz-default dz-message" value={this.state.pdf3} max='100'>
                      //Carga {this.state.pdf3} %</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          </Popup>
         </div>
        <div class='table-right'>
        </div>

      </div>
    );
  }
}
