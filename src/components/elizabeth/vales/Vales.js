import React, { Component } from 'react';
import firebase from '../../../Firebase';
import './Vales.css';

export default class Vales extends Component {
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
                      novale: '',
                      nocheque: '',
                      catidad: '',
                      concepto: '',
                      ofsolicitud: '',
                      turno: '',
                      recibo: '',
                      fechacreacion: '',
                      comprobante: '',
                      estatus: '',
                      factura: '',
                      direccion: '',
                      movimiento: '',
                      validacion: '',
                      precibe: '',
                      proveedor: '',
                      estatusv: '',
                      usuario: '',
                      autoriza: '',
                      contador: {},
                    };
                  }



            listenForItems = (itemsRef) => {
                    itemsRef.on('value', (snap) => {
                      var lista = [];
                      snap.forEach((child) => {
                        lista.push({
                    alert: child.val().alert ,
                alertData: child.val().alertData ,
                   novale: child.val().novale ,
                 nocheque: child.val().nocheque ,
                  catidad: child.val().catidad ,
                 concepto: child.val().concepto ,
              ofsolicitud: child.val().ofsolicitud ,
                    turno: child.val().turno ,
                   recibo: child.val().recibo ,
            fechacreacion: child.val().fechacreacion ,
              comprobante: child.val().comprobante ,
                  estatus: child.val().estatus ,
                  factura: child.val().factura ,
                direccion: child.val().direccion ,
               movimiento: child.val().movimiento ,
               validacion: child.val().validacion ,
                  precibe: child.val().precibe ,
                proveedor: child.val().proveedor ,
                 estatusv: child.val().estatusv ,
                  usuario: child.val().usuario ,
                 autoriza: child.val().autoriza ,

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
                    const itemsRef = firebase.database().ref('vales/');
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
                    let formRef = firebase.database().ref('vales').orderByKey().limitToLast(1);
                    formRef.on('child_added', snapshot => {
                      const { alert, alertData, novale, nocheque, catidad, concepto,
                              ofsolicitu,  turno, recibo, fechacreaco, comprobant,  estatus,
                              factura, direccion, movimiento, validacion, precibe, proveedor,
                              estatusv, usuario, autoriza } = snapshot.val();

                      const data = {alert, alertData, novale, nocheque, catidad, concepto,
                              ofsolicitu, turno, recibo, fechacreaco, comprobant,  estatus,
                              factura, direccion, movimiento, validacion, precibe, proveedor,
                              estatusv, usuario, autoriza};

                      this.setState({ form: [data].concat(this.state.form) });
                    });
                  }
                  sendMessage(e) {
                    e.preventDefault();

                  const params = {
                        alert: this.alert.value,
                        alertData: this.alertData.value,
                        novale: this.novale.value,
                        nocheque: this.nocheque.value,
                        catidad: this.catidad.value ,
                        concepto: this.concepto .value,
                        ofsolicitud: this.ofsolicitud.value ,
                        turno: this.turno.value,
                        recibo: this.recibo.value,
                        fechacreacion: this.fechacreacion.value ,
                        comprobante: this.comprobante.value ,
                        estatus: this.estatus.value,
                        factura: this.factura.value,
                        direccion: this.direccion.value,
                        movimiento: this.movimiento.value,
                        validacion: this.validacion.value,
                        precibe: this.precibe.value,
                        proveedor: this.proveedor.value,
                        estatusv: this.estatusv.value,
                        usuario: this.usuario.value,
                        autoriza: this.autoriza.value,

                   };
                   this.setState({
                        alert: this.alert.value,
                        alertData: this.alertData.value,
                        novale: this.novale.value,
                        nocheque: this.nocheque.value,
                        catidad: this.catidad.value ,
                        concepto: this.concepto .value,
                        ofsolicitud: this.ofsolicitud.value ,
                        turno: this.turno.value,
                        recibo: this.recibo.value,
                        fechacreacion: this.fechacreacion.value ,
                        comprobante: this.comprobante.value ,
                        estatus: this.estatus.value,
                        factura: this.factura.value,
                        direccion: this.direccion.value,
                        movimiento: this.movimiento.value,
                        validacion: this.validacion.value,
                        precibe: this.precibe.value,
                        proveedor: this.proveedor.value,
                        estatusv: this.estatusv.value,
                        usuario: this.usuario.value,
                        autoriza: this.autoriza.value,
                   })



                 if( params.alert && params.alertData && params.novale && params.nocheque && params.catidad && params.concepto &&
                     params.ofsolicitu &&  params.turno && params.recibo && params.fechacreaco && params.comprobant &&  params.estatus &&
                     params.factura && params.direccion && params.movimiento && params.validacion && params.precibe && params.proveedor &&
                     params.estatusv && params.usuario && params.autoriza) {

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



  render() {
    return (

      <div class='container-back'>
        <div class='site'>
          <p class='site-s'><b>Vales</b></p>
        </div>
        <div>
          <form class='caja-container' onSubmit={this.sendMessage.bind(this)} ref='contactForm'>
            <div class='caja-inputs'>
              <div class='caja-inputs-c'>
                <div class='input-row'>
                  <p class='p-caja'><b>Numero de Vale </b></p>
                  <input class='input-sc'
                          id='novale'
                          required
                          ref={novale => this.inputNovale  =novale}
                          />
                </div>
                &nbsp;
                <div class='input-row'>
                  <p class='p-caja'><b>Numero de Cheque</b></p>
                  <input id='nocheque'
                            class='input-sc'
                            required
                            ref={nocheque => this.inputNocheque  = nocheque}/>
                </div>
                  &nbsp;
                <div class='input-row'>
                  <p class='p-caja'><b>Cantidad</b></p>
                  <input class='input-sc'
                            id='Cantidad'
                            required
                            ref={cantidad => this.inputCantidad  = cantidad}/>
                </div>
                  &nbsp;
                <div class='input-row'>
                  <p class='p-caja'><b>Concepto</b></p>
                  <input class='input-sc'
                            id='concepto'
                            required
                            ref={concepto => this.inputConcepto = concepto}/>
                </div>
                  &nbsp;
                <div class='input-row'>
                  <p class='p-caja'><b>Oficio de solicitud</b></p>
                  <input class='input-sc'
                            id='ofsolicitud'
                            required
                            ref={ofsolicitud => this.inputOfsolicitud  = ofsolicitud}/>
                </div>
                  &nbsp;
                <div class='input-row'>
                  <p class='p-caja'><b>Turno</b></p>
                  <input class='input-sc'
                            id='turno'
                            required
                            ref={turno => this.inputTurno  = turno}/>
                </div>
                  &nbsp;
                <div class='input-row'>
                  <p class='p-caja'><b>Recibo</b></p>
                  <input class='input-sc'
                            id='recibo'
                            required
                            ref={recibo => this.inputRecibo  = recibo}/>
                </div>
                <div class='input-row'>
                  <p class='p-caja'><b>Fecha Creacion</b></p>
                  <input class='input-sc'
                            id='fechacreacion'
                            required
                            ref={fechacreacion => this.inputFechacreacion  = fechacreacion}/>
                </div>
                <div class='input-row'>
                  <p class='p-caja'><b>Comprobante</b></p>
                  <input class='input-sc'
                            id='comprobante'
                            required
                            ref={comprobante => this.inputComprobante = comprobante}/>
                </div>
                <div class='input-row'>
                  <p class='p-caja'><b>Estatus</b></p>
                  <input class='input-sc'
                            id='estatus'
                            required
                            ref={estatus => this.inputEstatus  = estatus}/>
                </div>
                <div class='input-row'>
                  <p class='p-caja'><b>Factura</b></p>
                  <input class='input-sc'
                            id='factura'
                            required
                            ref={factura => this.inputFactura  = factura}/>
                </div>
                <div class='input-row'>
                  <p class='p-caja'><b>Direccion</b></p>
                  <input class='input-sc'
                            id='direccion'
                            required
                            ref={direccion => this.inputDireccion  = direccion}/>
                </div>
                <div class='input-row'>
                  <p class='p-caja'><b>Movimiento</b></p>
                  <input class='input-sc'
                            id='movimiento'
                            required
                            ref={movimiento => this.inputMovimiento  = movimiento}/>
                </div>
                <div class='input-row'>
                  <p class='p-caja'><b>Validacion</b></p>
                  <input class='input-sc'
                            id='validacion'
                            required
                            ref={validacion => this.inpuValidaciont  = validacion}/>
                </div>
                <div class='input-row'>
                  <p class='p-caja'><b>Recibe</b></p>
                  <input class='input-sc'
                            id='precibe'
                            required
                            ref={precibe => this.inputPrecibe  = precibe}/>
                </div>
                <div class='input-row'>
                  <p class='p-caja'><b>Proveedor</b></p>
                  <input class='input-sc'
                            id='proveedor'
                            required
                            ref={proveedor => this.inputProveedor  = proveedor}/>
                </div>
                <div class='input-row'>
                  <p class='p-caja'><b>Estatus del vale</b></p>
                  <input class='input-sc'
                            id='estatusv'
                            required
                            ref={estatusv => this.inputEstatusv  =estatusv}/>
                </div>
                <div class='input-row'>
                  <p class='p-caja'><b>Usuario</b></p>
                  <input class='input-sc'
                            id='usuario'
                            required
                            ref={usuario => this.inputUsuario  =usuario}/>
                </div>
                <div class='input-row'>
                  <p class='p-caja'><b>Autoriza</b></p>
                  <input class='input-sc'
                            id='autoriza'
                            required
                            ref={autoriza => this.inputAutoriza  =autoriza}/>
                </div>
                <div class='input-row'>
                </div>
                <div class='input-row'>
                </div>
                <div class='input-row'>
                </div>
              </div>
              <div class='disponible'>
                <div>
                <div class='input-row-2'>
              <p style={{paddingLeft:"100px"}}></p>
              <button type='submit' class='boton-g' >Cargar</button>
              </div>

            </div>
          </div>
              </div>

          </form>

        </div>
      </div>



    /*  <div>
      <form>
            <div class='titulo'>
                  <h1> Vales</h1>
            </div>

            <div class='caja-cheque'>
            <div class="inputs-caja">

                <div class='cajas-cheques'>
                  <label class='p-caja'>Numero de Vale </label>
                        <input id='novale'
                                required
                                ref={novale => this.inputNovale  =novale}/>
              </div>

                <div class='cajas-cheques'>
                  <label class='p-caja'>Numero de Cheque</label>
                  <input id='nocheque'
                            required
                            ref={nocheque => this.inputNocheque  = nocheque}/>
                </div>

                <div class='cajas-cheques'>
                  <label class='p-caja'>Cantidad</label>
                  <input id='Cantidad'
                            required
                            ref={cantidad => this.inputCantidad  = cantidad}/>
                </div>

                <div class='cajas-cheques'>
                  <label class='p-caja'>Concepto</label>
                  <input id='concepto'
                            required
                            ref={concepto => this.inputConcepto = concepto}/>
                  </div>

                  <div class='cajas-cheques'>
                  <label class='p-caja'>Oficio de solicitud</label>
                  <input id='ofsolicitud'
                            required
                            ref={ofsolicitud => this.inputOfsolicitud  = ofsolicitud}/>
                  </div>

                  <div class='cajas-cheques'>
                  <label class='p-caja'>Turno</label>
                  <input id='turno'
                            required
                            ref={turno => this.inputTurno  = turno}/>
                  </div>

                  <div class='cajas-cheques'>
                  <label class='p-caja'>Recibo</label>
                  <input id='recibo'
                            required
                            ref={recibo => this.inputRecibo  = recibo}/>
                </div>

                  <div class='cajas-cheques'>
                  <label class='p-caja'>Fecha Creacion</label>
                  <input id='fechacreacion'
                            required
                            ref={fechacreacion => this.inputFechacreacion  = fechacreacion}/>
                  </div>

                  <div class='cajas-cheques'>
                  <label class='p-caja'>Comprobante</label>
                  <input id='comprobante'
                            required
                            ref={comprobante => this.inputComprobante = comprobante}/>
                  </div>

                  <div class='cajas-cheques'>
                  <label class='p-caja'>Estatus</label>
                  <input id='estatus'
                            required
                            ref={estatus => this.inputEstatus  = estatus}/>
                  </div>

                  <div class='cajas-cheques'>
                  <label class='p-caja'>Factura</label>
                  <input id='factura'
                            required
                            ref={factura => this.inputFactura  = factura}/>
                  </div>

                  <div class='cajas-cheques'>
                <label class='p-caja'>Direccion</label>
                  <input id='direccion'
                            required
                            ref={direccion => this.inputDireccion  = direccion}/>
                            </div>

                  <div class='cajas-cheques'>
                  <label class='p-caja'>movimiento</label>
                  <input id='movimiento'
                            required
                            ref={movimiento => this.inputMovimiento  = movimiento}/>
                            </div>

                  <div class='cajas-cheques'>
                  <label class='p-caja'>Validacion</label>
                  <input id='validacion'
                            required
                            ref={validacion => this.inpuValidaciont  = validacion}/>
                            </div>

                  <div class='cajas-cheques'>
                  <label class='p-caja'>Recibe</label>
                  <input id='precibe'
                            required
                            ref={precibe => this.inputPrecibe  = precibe}/>
                            </div>

                  <div class='cajas-cheques'>
                  <label class='p-caja'>Proveedor</label>
                  <input id='proveedor'
                            required
                            ref={proveedor => this.inputProveedor  = proveedor}/>
                            </div>

                  <div class='cajas-cheques'>
                  <label class='p-caja'>Estatus del vale</label>
                  <input id='estatusv'
                            required
                            ref={estatusv => this.inputEstatusv  =estatusv}/>
                            </div>

                  <div class='cajas-cheques'>
                  <label class='p-caja'>Usuario</label>
                  <input id='usuario'
                            required
                            ref={usuario => this.inputUsuario  =usuario}/>
                            </div>

                  <div class='cajas-cheques'>
                  <label class='p-caja'>Autoriza</label>
                  <input id='autoriza'
                            required
                            ref={autoriza => this.inputAutoriza  =autoriza}/>
                            </div>

                            </div>
                            </div>

                  <div style={{paddingLeft:"100px"}}>
                  <button type='submit' class='boton-g' >Cargar</button>

              </div>

      </form>
      </div>*/
    );
  }
}
