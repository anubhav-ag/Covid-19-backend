import React, { Component } from 'react';
import './StepAppt.css'

import {  Steps, Divider  } from 'antd';

const { Step } = Steps;

class StepAppt extends Component {
  state = {
    current: 0,
  };

  onChange = current => {
    console.log('onChange:', current);
    this.setState({ current });
  };

  render() {
    const { current } = this.state;

    return (
      <>
        <Steps current={current} onChange={this.onChange}>
          <Step title="Step 1" description="Choose an available day for your appointment." />
          <Step title="Step 2" description="Choose an available time for your appointment." />
          <Step title="Step 3" description="Confirm your contact information and we will send you a reminder." />
        </Steps>

      </>
    );
  }
}


export default StepAppt;