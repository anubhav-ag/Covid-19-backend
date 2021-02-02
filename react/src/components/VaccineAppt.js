import React, { Component } from 'react';
import './VaccineAppt.css';
import StepAppt from './StepAppt'
import Header from './Header'
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