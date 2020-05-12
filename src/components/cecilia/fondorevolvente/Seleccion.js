import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import csv from 'csv';
import firebase from '../../../Firebase';
import './Altas.css';
import ListComponent from './ListComponent';
import ListComponent2 from './ListComponent2';



export default class Seleccion extends Component {
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
      numero: '',
      monto: '',
      fechaC: '',
      fechaE: '',
      estatus: '',
      usuario: '',
      banco: '',
      contador: {},
    };
  }

  listenForItems = (itemsRef) => {
    itemsRef.on('value', (snap) => {
      var lista = [];
      snap.forEach((child) => {
        lista.push({
          numero: child.val().numero,
          monto: child.val().monto,
          fechaC: child.val().fechaC,
          fechaE: child.val().fechaE,
          estatus: child.val().estatus,
          usuario: child.val().usuario,
          banco: child.val().banco,
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
    const itemsRef = firebase.database().ref('Caja/');
    this.listenForItems(itemsRef);
    this.consumo();
    setInterval(this.consumo, 500);
  }

  componentWillMount() {
    let formRef = firebase.database().ref('Caja').orderByKey().limitToLast(6);
    formRef.on('child_added', snapshot => {
      const { numero, monto, fechaC, fechaE, estatus, usuario, banco } = snapshot.val();
      const data = { numero, monto, fechaC, fechaE, estatus, usuario, banco };
      this.setState({ form: [data].concat(this.state.form) });
    });
  }

  consumo = () => {
    const ref = firebase.firestore().collection('Caja').doc('--stats--');
    ref.get().then((doc) => {
      if (doc.exists) {
        this.setState({
          contador: doc.data(),
          key: doc.id,
          isLoading: false
        });
      } else {
        console.log("No such document!");
      }
    })
  }


  render() {
    return (
      <div class='container-back'>
        <div class='site'>
          <p class='site-s'><b>Selección</b></p>
        </div>


        <div class="cat-partida">
              <p class="text-p-partida" style={{fontFamily: 'Arial'}}><b>Partida </b> </p>
              <div className="tabla-edit-c"> {/*select*/}
                <select name="presupuestal" onChange={this.onChange} ref="presupuestal" className="input-edi">
                  <option name="presupuestal"></option>
                  <option name="presupuestal">2</option>
                  <option name="presupuestal">3</option>
                  <option name="presupuestal">4</option>
                  <option name="presupuestal">5</option>
                  <option name="presupuestal">6</option>
                  <option name="presupuestal">7</option>
                  <option name="presupuestal">8</option>
                  <option name="presupuestal">9</option>
                  <option name="presupuestal">10</option>
                  <option name="presupuestal">11</option>
                  <option name="presupuestal">12</option>
                  <option name="presupuestal">13</option>
                  <option name="presupuestal">14</option>
                  <option name="presupuestal">15</option>
                  <option name="presupuestal">16</option>
                  <option name="presupuestal">17</option>
                  <option name="presupuestal">18</option>
                  <option name="presupuestal">20</option>
                  <option name="presupuestal">21</option>
                  <option name="presupuestal">22</option>
                  <option name="presupuestal">23</option>
                  <option name="presupuestal">24</option>
                </select>
              </div>
        </div>


        <div class='caja-w'>
            <div class='caja-col'>
                  <ListComponent
                  lista={this.state.lista}
                  />
           </div>
        </div>


        <div class='caja-w'>
          <div class='caja-col'>
                <ListComponent2
                lista={this.state.lista}
                />
          </div>
            </div>



        <div class='caja-w'>
            <div class='caja-col'>
                  <ListComponent2
                  lista={this.state.lista}
                  />
           </div>
      </div>

        </div>



    )
  }
}
