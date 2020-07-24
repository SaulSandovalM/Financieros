import React, { Component } from 'react';
import firebase from '../../../Firebase';
import './Caja.css';
import CurrencyFormat from 'react-currency-format';
import moment from 'moment';

export default class Caja extends Component {
  constructor(props) {
    super(props);
    this.unsubscribe = null;
    this.state = {
      contador: {},
      title: '',
      no: '',
      personaR: '',
      cantidad: '',
      movimientos: [],
      buscador: '',
      fecha: '',
      isHidden: false,
    };
  }

  toggleHidden() {
    this.setState({
      isHidden: true
    })
  }

  toggleHidden2() {
    this.setState({
      isHidden: false
    })
  }

  onCollectionUpdate = (querySnapshot) => {
    const movimientos = [];
    querySnapshot.forEach((doc) => {
      const { title, no, personaR, cantidad, fecha } = doc.data();
      movimientos.push({
        key: doc.id,
        doc,
        title,
        no,
        personaR,
        cantidad,
        fecha
      });
    });
    this.setState({
      movimientos
   });
  }

  ptm() {
    var startDate = this.state.fecha;
    var endDate = this.state.fecha;
    this.ref = firebase.firestore().collection('caja').orderBy('fecha').startAt(startDate).endAt(endDate);
  }


  componentDidMount() {
    var startDate = this.state.fecha;
    var endDate = this.state.fecha;
    this.ref = firebase.firestore().collection('caja').orderBy('fecha').startAt(startDate).endAt(endDate);
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
    this.consumo();
  }

  consumo = () => {
    const ref = firebase.firestore().collection('caja').doc('--stats--');
    ref.get().then((doc) => {
      if (doc.exists) {
        this.setState({
          contador: doc.data(),
          key: doc.id,
          isLoading: false
        });
      } else {
        console.log("No hay nada!");
      }
    })
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value})
  }

  render() {

    var today = new Date();
    var meses =  [ '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12' ];
    var f = new Date();
    today = f.getDate() + '-' + meses[f.getMonth()] + '-' + f.getFullYear();
    this.state.fecha = today;

    var diasEntreFechas = function(desde, hasta) {
    	var dia_actual = desde;
      var fechas = [];
    	while (dia_actual.isSameOrBefore(hasta)) {
      	fechas.push(dia_actual.format('DD-MM-YYYY'));
     		dia_actual.add(1, 'days');
    	}
    	return fechas;
    };

    var desde = moment(this.state.fecha1);
    var hasta = moment("2020-07-23");
    var results = diasEntreFechas(desde, hasta);
    console.log(this.state.buscador);

    return (
      <div className='container-back'>
        <div className='site'>
          <p className='site-s'><b>Caja</b></p>
        </div>
        <div>
          <div className='caja-container'>
            <div className='caja-inputs'>
              <div className='disponible-banco'>
                <div>
                  <p className='cantidad-banco'>
                    MXN
                    <CurrencyFormat
                      value={this.state.contador.storyCount}
                      displayType={'text'}
                      thousandSeparator={true}
                      prefix={' $'}
                      decimalSeparator={'.'} />
                    .00
                  </p>
                </div>
              </div>
            </div>
            <div className='p-container-banco'>
              <p className='p-title-margin-ba'>BUSCADOR</p>
              <input
                className='input-style-banco'
                value={this.state.buscador}
                name='buscador'
                onChange={this.handleChange.bind(this)}
              />
              <input
                className='input-style-banco'
                value={this.state.fecha2}
                name='fecha2'
                onChange={this.handleChange.bind(this)}
              />
            </div>
            <div className='space-table-b' />
            <div className='table-c-p'>
            <div className='banco-inputs-list2'>
              <div className='table-left'>
              </div>
              <div className='table-caja-title'>
                <div className='table-no-row'>
                  <b className='p-banco-map'>MOVIMIENTO REALIZADO</b>
                </div>
              </div>
              <div className='table-caja-fecha'>
                <div className='table-no-row'>
                  <b className='p-banco-map'>FECHA</b>
                </div>
              </div>
              <div className='table-banco-mov'>
                <div className='table-no-row'>
                  <b className='p-banco-map'>CANTIDAD</b>
                </div>
              </div>
              <div className='table-right'>
              </div>
            </div>
          </div>
          <button className='b-s-f' onClick={this.toggleHidden.bind(this)}>ver</button>
          <button className='b-s-f' onClick={this.ptm}>buscar</button>
          {this.state.isHidden &&
          <div className='color-s'>
            {this.state.movimientos.map(movimientos =>
              <div>
                  <div className='banco-inputs-list'>
                    <div className='table-left'>
                    </div>
                    <div className='table-caja-title'>
                      <div className='table-caja-row'>
                        <p className='p-banco-map'>{movimientos.title}</p>
                        <p className='p-banco-map'>{movimientos.no}</p>
                        <p className='p-banco-map'>{movimientos.personaR}</p>
                      </div>
                    </div>
                    <div className='table-caja-fecha'>
                      <div className='table-no-row'>
                        <b className='p-banco-map'>{movimientos.fecha}</b>
                      </div>
                    </div>
                    <div className='table-banco-mov'>
                      <div>
                        <CurrencyFormat
                          value={movimientos.cantidad}
                          displayType={'text'}
                          thousandSeparator={true}
                          prefix={' $'}
                        />
                      </div>
                    </div>
                    <div className='table-right'>
                    </div>
                  </div>
              </div>
            )}
            </div>
          }
          </div>
          {results}
        </div>
      </div>
    )
  }
}
