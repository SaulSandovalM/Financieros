import React, { Component } from 'react';
import './Arqueo.css';
import firebase from '../../../Firebase';
import Popup from "reactjs-popup";
import ListComponent from './ListComponent';

export default class Arqueo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lista: [
        {
          id: 1,
          name: 'preuba',
          done: false
        },
      ],
      form: [],
      alert: false,
      alertData: {},
      can1000: '',
      can500: '',
      can200: '',
      can100: '',
      can50: '',
      can20: '',
      can10: '',
      can5: '',
      can2: '',
      can1: '',
      can0: '',
      arqueo: [],
      fecha: ''
    };
  }

  listenForItems = (itemsRef) => {
    itemsRef.on('value', (snap) => {
      var lista = [];
      snap.forEach((child) => {
        lista.push({
          can1000: child.val().can1000,
          can500: child.val().can500,
          can200: child.val().can200,
          can100: child.val().can100,
          can50: child.val().can50,
          can20: child.val().can20,
          can10: child.val().can10,
          can5: child.val().can5,
          can2: child.val().can2,
          can1: child.val().can1,
          can0: child.val().can0,
          fecha: child.val().fecha,
          done: child.val().done,
          id: child.key
        });
      });
      this.setState({
        lista: lista
      });
    });
  }

  componentDidMount() {
    const itemsRef = firebase.database().ref('arqueo/').limitToLast(1);
    this.listenForItems(itemsRef);
  }

  componentWillMount () {
    firebase.database().ref('arqueo').on('child_added', snapshot => {
      this.setState({
        arqueo: this.state.arqueo.concat(snapshot.val())
      });
    });
  }

  resetForm() {
    this.refs.contactForm.reset();
  }

  sendMessage(e) {
    e.preventDefault();
    const params = {
      can1000: this.inputCan1000.value,
      can500: this.inputCan500.value,
      can200: this.inputCan200.value,
      can100: this.inputCan100.value,
      can50: this.inputCan50.value,
      can20: this.inputCan20.value,
      can10: this.inputCan10.value,
      can5: this.inputCan5.value,
      can2: this.inputCan2.value,
      can1: this.inputCan1.value,
      can0: this.inputCan0.value,
      fecha: this.state.fecha
    };
    this.setState({
      can1000: this.inputCan1000.value,
      can500: this.inputCan500.value,
      can200: this.inputCan200.value,
      can100: this.inputCan100.value,
      can50: this.inputCan50.value,
      can20: this.inputCan20.value,
      can10: this.inputCan10.value,
      can5: this.inputCan5.value,
      can2: this.inputCan2.value,
      can1: this.inputCan1.value,
      can0: this.inputCan0.value,
      fecha: this.state.fecha
    })
    if ( params.can1000 && params.can500 && params.can200 && params.can100
          && params.can50 && params.can20 && params.can10 && params.can5
          && params.can2 && params.can1 && params.can0 && params.fecha ) {
      firebase.database().ref('arqueo').push(params).then(() => {
        alert('Tu solicitud fue enviada.');
      }).catch(() => {
        alert('Tu solicitud no puede ser enviada');
      });
      this.resetForm();
    } else {
      alert('Por favor llene el formulario');
    };
  }

  updateSearch(event) {
    this.setState({search: event.target.value.substr(0,20)});
  }

  render() {

    // let filterData = this.state.arqueo.filter(
    //   (arqueo) => {
    //     return arqueo.fecha.indexOf(this.state.search) !== -1;
    //   }
    // );

    var today = new Date(),
    date = today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear() ;
    this.state.fecha = today;

    return (
      <div className='pf-container'>
        <div className='site-pf'>
          <p className='site-pf-s'><b>Arqueo</b></p>
        </div>
        <div className='arqueo-container'>
          <div className='arqueo-content'>
            <div className='table-arqueo'>
              <div className='table-left'>
              </div>
              <div className='title-arqueo'>
                <p className='p-mar-arqueo'><b>DENOMINACION</b></p>
              </div>
              <div className='title-arqueo'>
                <p className='p-mar-arqueo'><b>CANTIDAD</b></p>
              </div>
              <div className='title-arqueo'>
                <p className='p-mar-arqueo'><b>DENOMINACIÓN</b></p>
              </div>
              <div className='table-right'>
              </div>
            </div>
            <div>
              <ListComponent
                lista={this.state.lista}
              />
            </div>
          </div>

          {/*<div className='arqueo-col'>
            <div className='arqueo-content2'>
              <div className='table-arqueo'>
                <div className='tipo-arqueo'>
                </div>
                <div className='table-left'>
                </div>
                <div className='title-arqueo2'>
                  <p className='p-mar-arqueo'><b>ARQUEO</b></p>
                </div>
                <div className='title-arqueo2'>
                  <p className='p-mar-arqueo'><b>TEÓRICO</b></p>
                </div>
                <div className='title-arqueo2'>
                  <p className='p-mar-arqueo'><b>DIFERENCIA</b></p>
                </div>
                <div className='table-right'>
                </div>
              </div>

              <div className='data-arqueo'>
                <div className='tipo-arqueo'>
                  Efectivo
                </div>
                <div className='table-left'>
                </div>
                <div className='title-arqueo'>
                  <p className='p-mar-arqueo'>$</p>
                </div>
                <div className='title-arqueo'>
                  <p className='p-mar-arqueo'>$</p>
                </div>
                <div className='title-arqueo'>
                  <p className='p-mar-arqueo'>$</p>
                </div>
                <div className='table-right'>
                </div>
              </div>
              <div className='data-arqueo'>
                <div className='tipo-arqueo'>
                  Vales
                </div>
                <div className='table-left'>
                </div>
                <div className='title-arqueo'>
                  <p className='p-mar-arqueo'>$</p>
                </div>
                <div className='title-arqueo'>
                  <p className='p-mar-arqueo'>$</p>
                </div>
                <div className='title-arqueo'>
                  <p className='p-mar-arqueo'>$</p>
                </div>
                <div className='table-right'>
                </div>
              </div>
              <div className='data-arqueo'>
                <div className='tipo-arqueo'>
                  Arqueo Total
                </div>
                <div className='table-left'>
                </div>
                <div className='title-arqueo'>
                  <p className='p-mar-arqueo'>$</p>
                </div>
                <div className='title-arqueo'>
                  <p className='p-mar-arqueo'>$</p>
                </div>
                <div className='title-arqueo'>
                  <p className='p-mar-arqueo'>$</p>
                </div>
                <div className='table-right'>
                </div>
              </div>
            </div>
          </div>*/}
        </div>

        <div className='botones-arqueo'>
          <Popup
            trigger={<button className='margin-buton-ar'>Agregar</button>}
            modal
            closeOnDocumentClick>
            <form onSubmit={this.sendMessage.bind(this)} className='arqueo-container' ref='contactForm'>
              <div className='arqueo-content-pop'>
                <div className='table-arqueo-pop'>
                  <div className='table-left'>
                  </div>
                  <div className='title-arqueo'>
                    <p className='p-mar-arqueo'><b>DENOMINACION</b></p>
                  </div>
                  <div className='title-arqueo'>
                    <p className='p-mar-arqueo'><b>CANTIDAD</b></p>
                  </div>
                  <div className='title-arqueo'>
                    <p className='p-mar-arqueo'><b>DENOMINACIÓN</b></p>
                  </div>
                  <div className='table-right'>
                  </div>
                </div>
                <div className='data-arqueo-pop'>
                  <div className='table-left'>
                  </div>
                  <div className='title-arqueo'>
                    <p className='p-mar-arqueo'>1000</p>
                  </div>
                  <div className='title-arqueo'>
                    <p className='p-mar-arqueo'>
                      <input
                        id='can1000'
                        required
                        ref={can1000 => this.inputCan1000 = can1000}
                      />
                    </p>
                  </div>
                  <div className='title-arqueo'>
                    <p className='p-mar-arqueo'>$</p>
                  </div>
                  <div className='table-right'>
                  </div>
                </div>
                <div className='data-arqueo-pop'>
                  <div className='table-left'>
                  </div>
                  <div className='title-arqueo'>
                    <p className='p-mar-arqueo'>500</p>
                  </div>
                  <div className='title-arqueo'>
                    <p className='p-mar-arqueo'>
                      <input
                        id='can500'
                        required
                        ref={can500 => this.inputCan500 = can500}
                      />
                    </p>
                  </div>
                  <div className='title-arqueo'>
                    <p className='p-mar-arqueo'>$</p>
                  </div>
                  <div className='table-right'>
                  </div>
                </div>
                <div className='data-arqueo-pop'>
                  <div className='table-left'>
                  </div>
                  <div className='title-arqueo'>
                    <p className='p-mar-arqueo'>200</p>
                  </div>
                  <div className='title-arqueo'>
                    <p className='p-mar-arqueo'>
                      <input
                        id='can200'
                        required
                        ref={can200 => this.inputCan200 = can200}
                      />
                    </p>
                  </div>
                  <div className='title-arqueo'>
                    <p className='p-mar-arqueo'>$</p>
                  </div>
                  <div className='table-right'>
                  </div>
                </div>
                <div className='data-arqueo-pop'>
                  <div className='table-left'>
                  </div>
                  <div className='title-arqueo'>
                    <p className='p-mar-arqueo'>100</p>
                  </div>
                  <div className='title-arqueo'>
                    <p className='p-mar-arqueo'>
                      <input
                        id='can100'
                        required
                        ref={can100 => this.inputCan100 = can100}
                      />
                    </p>
                  </div>
                  <div className='title-arqueo'>
                    <p className='p-mar-arqueo'>$</p>
                  </div>
                  <div className='table-right'>
                  </div>
                </div>
                <div className='data-arqueo-pop'>
                  <div className='table-left'>
                  </div>
                  <div className='title-arqueo'>
                    <p className='p-mar-arqueo'>50</p>
                  </div>
                  <div className='title-arqueo'>
                    <p className='p-mar-arqueo'>
                      <input
                        id='can50'
                        required
                        ref={can50 => this.inputCan50 = can50}
                      />
                    </p>
                  </div>
                  <div className='title-arqueo'>
                    <p className='p-mar-arqueo'>$</p>
                  </div>
                  <div className='table-right'>
                  </div>
                </div>
                <div className='data-arqueo-pop'>
                  <div className='table-left'>
                  </div>
                  <div className='title-arqueo'>
                    <p className='p-mar-arqueo'>20</p>
                  </div>
                  <div className='title-arqueo'>
                    <p className='p-mar-arqueo'>
                      <input
                        id='can20'
                        required
                        ref={can20 => this.inputCan20 = can20}
                      />
                    </p>
                  </div>
                  <div className='title-arqueo'>
                    <p className='p-mar-arqueo'>$</p>
                  </div>
                  <div className='table-right'>
                  </div>
                </div>
                <div className='data-arqueo-pop'>
                  <div className='table-left'>
                  </div>
                  <div className='title-arqueo'>
                    <p className='p-mar-arqueo'>10</p>
                  </div>
                  <div className='title-arqueo'>
                    <p className='p-mar-arqueo'>
                      <input
                        id='can10'
                        required
                        ref={can10 => this.inputCan10 = can10}
                      />
                    </p>
                  </div>
                  <div className='title-arqueo'>
                    <p className='p-mar-arqueo'>$</p>
                  </div>
                  <div className='table-right'>
                  </div>
                </div>
                <div className='data-arqueo-pop'>
                  <div className='table-left'>
                  </div>
                  <div className='title-arqueo'>
                    <p className='p-mar-arqueo'>5</p>
                  </div>
                  <div className='title-arqueo'>
                    <p className='p-mar-arqueo'>
                      <input
                        id='can5'
                        required
                        ref={can5 => this.inputCan5 = can5}
                      />
                    </p>
                  </div>
                  <div className='title-arqueo'>
                    <p className='p-mar-arqueo'>$</p>
                  </div>
                  <div className='table-right'>
                  </div>
                </div>
                <div className='data-arqueo-pop'>
                  <div className='table-left'>
                  </div>
                  <div className='title-arqueo'>
                    <p className='p-mar-arqueo'>2</p>
                  </div>
                  <div className='title-arqueo'>
                    <p className='p-mar-arqueo'>
                      <input
                        id='can2'
                        required
                        ref={can2 => this.inputCan2 = can2}
                      />
                    </p>
                  </div>
                  <div className='title-arqueo'>
                    <p className='p-mar-arqueo'>$</p>
                  </div>
                  <div className='table-right'>
                  </div>
                </div>
                <div className='data-arqueo-pop'>
                  <div className='table-left'>
                  </div>
                  <div className='title-arqueo'>
                    <p className='p-mar-arqueo'>1</p>
                  </div>
                  <div className='title-arqueo'>
                    <p className='p-mar-arqueo'>
                      <input
                        id='can1'
                        required
                        ref={can1 => this.inputCan1 = can1}
                      />
                    </p>
                  </div>
                  <div className='title-arqueo'>
                    <p className='p-mar-arqueo'>$</p>
                  </div>
                  <div className='table-right'>
                  </div>
                </div>
                <div className='data-arqueo-pop'>
                  <div className='table-left'>
                  </div>
                  <div className='title-arqueo'>
                    <p className='p-mar-arqueo'>0.5</p>
                  </div>
                  <div className='title-arqueo'>
                    <p className='p-mar-arqueo'>
                      <input
                        id='can0'
                        required
                        ref={can0 => this.inputCan0 = can0}
                      />
                    </p>
                  </div>
                  <div className='title-arqueo'>
                    <p className='p-mar-arqueo'>$</p>
                  </div>
                  <div className='table-right'>
                  </div>
                </div>
              </div>
              <div>
                <button type='submit' className='input-sc boton-g'>Agregar</button>
              </div>
            </form>
          </Popup>
        </div>

        <div className='p-container-ifr2'>
          <p className='p-title-margin-fr'>Buscador</p>
          <input
            className='input-style-fr'
            type="text"
            value={this.state.search}
            onChange={this.updateSearch.bind(this)}
          />
        </div>

        <div className='table-arqueo-search'>
          <div className='table-arqueo-content'>
            <div className='table-left'>
            </div>
            <div className='title-arqueo-se'>
              <p className='p-mar-arqueo'><b>1000</b></p>
            </div>
            <div className='title-arqueo-se'>
              <p className='p-mar-arqueo'><b>500</b></p>
            </div>
            <div className='title-arqueo-se'>
              <p className='p-mar-arqueo'><b>200</b></p>
            </div>
            <div className='title-arqueo-se'>
              <p className='p-mar-arqueo'><b>100</b></p>
            </div>
            <div className='title-arqueo-se'>
              <p className='p-mar-arqueo'><b>50</b></p>
            </div>
            <div className='title-arqueo-se'>
              <p className='p-mar-arqueo'><b>20</b></p>
            </div>
            <div className='title-arqueo-se'>
              <p className='p-mar-arqueo'><b>10</b></p>
            </div>
            <div className='title-arqueo-se'>
              <p className='p-mar-arqueo'><b>5</b></p>
            </div>
            <div className='title-arqueo-se'>
              <p className='p-mar-arqueo'><b>2</b></p>
            </div>
            <div className='title-arqueo-se'>
              <p className='p-mar-arqueo'><b>1</b></p>
            </div>
            <div className='title-arqueo-se'>
              <p className='p-mar-arqueo'><b>0.5</b></p>
            </div>
            <div className='table-right'>
            </div>
          </div>
        </div>
      
      </div>
    )
  }
}
