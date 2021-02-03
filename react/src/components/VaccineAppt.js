import React, { Component } from 'react';
import './VaccineAppt.css';
import StepAppt from './StepAppt'
import Header from './Header'
// eslint-disable-next-line no-unused-vars
import axios from 'axios'



class VaccineAppt extends Component {

    
    render() {
        return (
         <div>   
             <Header />
             <StepAppt />
        </div>
        )         
     }
}

 
export default VaccineAppt;