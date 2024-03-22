import React from 'react';
import { Box } from '@mui/material';
import {
    MDBBtn,
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBInput
  }
  from 'mdb-react-ui-kit';
import swimcloudlogo from "../Assets/swimcloud.png";
import { Link } from 'react-router-dom';
import Header from '../../components/Header';

export default function App() {
    return (
        <>
            <Header />

            <MDBContainer style={{width: "500px"}} className = 'my-5 gradient-form'>
            <MDBRow>
                <MDBCol col = '6' className = 'mb-5'>
                    <div className = 'd-flex flex-column ms-5'>
                        <div className = 'text-center'>
                            <img src = {swimcloudlogo} style = {{width: '185px'}} alt = 'logo'/>
                            <h4 className = 'mt-1 mb-5 pb-1'>We are Fantasty Swimming</h4>
                        </div>

                        <p style = {{margin: "auto", paddingBottom: "3%"}}>Register an account</p>

                        <MDBInput wrapperClass='mb-4' label = 'Username' id = 'form1' type = 'email'/>
                        <MDBInput wrapperClass='mb-4' label = 'Password' id = 'form2' type = 'password'/>
                        <MDBInput wrapperClass='mb-4' label = 'Confirm Password' id = 'form3' type = 'password'/>

                        <div className = 'text-center pt-1 mb-5 pb-1'>
                            <Link to="/UserHome">
                                <MDBBtn className = 'mb-4 w-100 gradient-custom-2'>Register</MDBBtn>
                            </Link>
                    
                        </div>

                    </div>
                </MDBCol>
            </MDBRow>
            </MDBContainer>
        </>
    );
}