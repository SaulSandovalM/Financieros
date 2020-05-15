import React, { Component } from 'react';
import firebase from '../../../Firebase';
import './Cheques.css';



export default class Cheques extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nuevo: '',
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
      nocheques: '',
      importe: '',
      fechae: '',
      fechac: '',
      contador: {},
    };
  }
  listenForItems = (itemsRef) => {
    itemsRef.on('value', (snap) => {
      var lista = [];
      snap.forEach((child) => {
        lista.push({
          nocheques: child.val().nocheques,
          importe: child.val().importe,
          fechae: child.val().fechae,
          fechac: child.val().fechac,

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
    const itemsRef = firebase.database().ref('cheques/');
    this.listenForItems(itemsRef);
  }


  showAlert(type, message) {
    this.setState({
      alert: true,
      alertData: {type, message}
    });
    setTimeout(() => {
      this.setState({alert: false});
    }, 6000);
  }

  resetForm() {
    this.refs.contactForm.reset();
  }

  componentWillMount() {
    let formRef = firebase.database().ref('cheques').orderByKey().limitToLast(1);
    formRef.on('child_added', snapshot => {
      const { nocheques, importe, fechae, fechac } = snapshot.val();
      const data = { nocheques, importe, fechae, fechac };
      this.setState({ form: [data].concat(this.state.form) });
    });
  }

  sendMessage(e) {
    e.preventDefault();

    const params = {
      nocheques: this.inputNocheques.value,
      importe: this.inputImporte.importe,
      fechae: this.inputFechae.value,
      fechac: this.inputFechac.value,

   };
   this.setState({
     nocheques: this.inputNocheques.value,
     importe: this.inputUp.Importe,
     fechae: this.inputFechae.value,
     fechac: this.inputFechac.value,
   })

   if ( params.partida && params.importe && params.fechae && params.fechac) {
     var f = parseInt(params.importe);
     console.log(f);

     const statsRef = firebase.firestore().collection('banco').doc('--stats--');//banco no cambio

     const increment = firebase.firestore.FieldValue.increment(-f);

     const batch = firebase.firestore().batch();
     const storyRef = firebase.firestore().collection('banco').doc(`${Math.random()}`);
     batch.set(storyRef, { title: 'Nuevo Fondo!' });
     batch.set(statsRef, { storyCount: increment }, { merge: true });
     batch.commit();

     firebase.database().ref('banco').push(params).then(() => {
       this.showAlert('success', 'Tu solicitud fue enviada.');
     }).catch(() => {
       this.showAlert('danger', 'Tu solicitud no puede ser enviada');
     });
     this.resetForm();
   } else {
     this.showAlert('warning', 'Por favor llene el formulario');
   };
  }



  render (){
    return (

      <div class='container-back'>
      <form>
                    <div class='site'>
                            <p class='site-s'>Cheques</p>
                    </div>
                    <div class="text-1">
                    <p><b>Ingreso datos del Cheque</b></p>
                    </div>

                          <div class='caja-inputs'>
                          <div class='caja-inputs-c'>

                          <div class='input-row'>
                                                <p class='p-caja'># Cheque</p>
                                                <input
                                                  id='nocheques'
                                                  required
                                                  ref={nocheques => this.inputNocheques = nocheques} />

                          </div>

                          <div class='input-row'>
                                              <label class='p-caja'>Importe</label>
                                              <input
                                                id='importe'
                                                required
                                                ref={importe => this.inputImporte = importe} />
                          </div>

                          <div class='input-row'>
                                              <label class='p-caja'>Fecha de Emisión</label>
                                              <input
                                                id='fechae'
                                                required
                                                ref={fechae => this.inputFechae = fechae} />
                          </div>

                          <div class='input-row'>
                                            <label class='p-caja'>Fecha de Cobro</label>
                                            <input
                                              id='fechac'
                                              required
                                              ref={fechac => this.inputFechac = fechac} />
                          </div>



        </div>
        </div>




        <div>

        <div class='carga-cheque'>
        <p><b>Ingrese Comprobantes</b></p>
        </div>

        <div class='caja-inputs'>
        <div class='caja-inputs-c'>

            <div class='input-row'>
                      <label class='p-caja1'>Selecciona Archivo</label>

                          <input></input>

        </div>
        <div style={{paddingLeft:"100px"}}>
        <button type='submit' class='boton-g' >Cargar</button>
        </div>

        </div>
        </div>


        <div>
          <div class='input-row-2-2'>
            <p style={{marginTop: '4px'}}></p>
            <button type='submit' class='input-sc boton-g'>Guardar</button>
          </div>
        </div>




        <div>
          <button type='submit' class='input-sc boton-g'>Buscar</button>
        </div>


        </div>




  </form>

      </div>
    );
  }
}
