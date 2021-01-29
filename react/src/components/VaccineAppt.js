import React, { Component } from 'react';
import { Layout, Menu, Card, Steps } from 'antd';
import './VaccineAppt.css';
import StepAppt from './StepAppt'
import axios from 'axios'

const { Header, Content, Footer } = Layout;

class VaccineAppt extends Component {

    
    render() {
        return (
            <div>   
              <Layout className="layout">
              <Header>
                <div className="" />
                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
                    <Menu.Item key="1">Home</Menu.Item>
                     <Menu.Item key="2">Vaccination</Menu.Item>
                    <Menu.Item key="3">More Info</Menu.Item>
                </Menu>
                </Header>

              <div className="site-card-border-less-wrapper">
                 {/* <Card title="Vaccination Booking" bordered={false} style={{ width: 300 }} /> */}
                    <StepAppt />
                </div>

                    <Footer style={{ textAlign: 'center' }}>Proudly brought to you by Alvin and Anuhbav ©2021</Footer>
                </Layout>       
            </div>
        )         
     }
}

 
export default VaccineAppt;