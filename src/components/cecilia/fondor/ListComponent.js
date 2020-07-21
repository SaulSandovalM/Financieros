import React, { Component } from 'react';
import './Fondor.css';
import RowComponent from './RowComponent';
import firebase from '../../../Firebase';

export default class ListComponent extends Component {
  constructor (props) {
   super(props);
   this.state = {
     presupuesto: [],
     search: '',
     search2: '',
     nameFilter : '',
    genreFilter : ','
   };
 }

  componentWillMount () {
    firebase.database().ref('presupuesto/').on('child_added', snapshot => {
      this.setState({
        presupuesto: this.state.presupuesto.concat(snapshot.val())
      });
    });
  }

  updateSeacrh(event) {
    this.setState({search: event.target.value.substr(0,20)})
  }

  updateSeacrh2(event) {
    this.setState({search2: event.target.value.substr(0,20)})
  }

  setMovieState = (e) => {
  let searchField = e.target.value;
  this.setState(()=>{
    return({
      nameFilter : searchField
    })
  })
}

setGenreState = (e) => {
  const genreFilter = e.target.value;
  if(genreFilter === 'All'){
    this.setState(()=>{
      return({genreFilter : ','})
    })
  }else{
    this.setState(()=>{
      return({genreFilter})
    })
  }
}

  render() {

    let filterData = this.state.presupuesto.filter(
      (presupuesto) => {
        return presupuesto.par.indexOf(this.state.search) !== -1;
      }
    );

    // const presupuestoList = this.state.presupuesto.map((presupuesto , i) => {
    //   if(presupuesto.revenue !== "" && presupuesto.up.indexOf(this.state.nameFilter) >-1  && presupuesto.par.indexOf(this.state.genreFilter) >= 0){
    //     return(
    //       <RowComponent presupuesto={presupuesto} key={i}/>
    //     )
    //   }else{
    //     return <tr key={i}></tr>;
    //   }
    // })

    return (
      <div>
        <input
          className='input-style-fr'
          value={this.state.search}
          onChange={this.updateSeacrh.bind(this)}
        />
        <input
          className='input-style-fr'
          value={this.state.search2}
          onChange={this.updateSeacrh2.bind(this)}
        />
        <div class='table-container-p'>
          <div class='table-left'>
          </div>
          <div class='table-up-p-frn2'>
            <b>UP</b>
          </div>
          <div class='table-up-p-frn2'>
            <b>PARTIDA</b>
          </div>
          <div class='table-up-p-frn2'>
            <b>RUBRO</b>
          </div>
          <div class='table-up-p-fr'>
            <b>CPA</b>
          </div>
          <div class='table-up-p-frn'>
            <b>IMPORTE</b>
          </div>
          <div class='table-right'>
          </div>
        </div>
        {
          filterData.map(item =>
            <RowComponent
              key={item.id}
              item={item}
            />
          )
        }


      </div>
    );
  }
}
