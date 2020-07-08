import React from 'react';
import ReactDOM from 'react-dom';
import MultiStep from 'react-multistep';
import './Fondos.css';
import Fondos from './Fondos';
import Fondo from './Fondo';
// import StepTwo from './stepTwo'
// import StepThree from './stepThree'
// import StepFour from './stepFour'

const steps = [
  { component: <Fondos /> },
  { component: <Fondo /> },
  // { component: <StepThree /> },
  // { component: <StepFour /> }
]

const Fmain = () => (
  <div>
    <MultiStep steps={steps} />
  </div>
)

export default Fmain;
