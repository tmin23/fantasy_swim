import React from 'react'
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

import './LoginSignup.css' 

const LoginSignup = () => {
  return (
    <MDBContainer className = 'my-5 gradient-form'>
        <MDBRow>
            <MDBCol col = '6' className = 'mb-5'>
                <div className = 'd-flex flex-column ms-5'>
                    <div className = 'text-center'>
                        <img src = {swimcloudlogo} style = {{width: '185px'}} alt = 'logo'/>
                        <h4 className = 'mt-1 mb-5 pb-1'>We are Fantasty Swimming</h4>
                    </div>

                    <p>Please login to your account</p>

                    <MDBInput wrapperClass='mb-4' label = 'Email address' id = 'form1' type = 'email'/>
                    <MDBInput wrapperClass='mb-4' label = 'Password' id = 'form2' type = 'password'/>

                    <div className = 'text-center pt-1 mb-5 pb-1'>
                        <Link to="/UserHome">
                            <MDBBtn className = 'mb-4 w-100 gradient-custom-2'>Sign in</MDBBtn>
                        </Link>
                        <a className ='text-muted' href = '#!'>Forgot password?</a>
                    </div>

                    <div className = 'd-flex flex-row align-item-center justify-content-center pb-4 mb-4'>
                        <p className = 'mb-0'>Don't have an account?</p>
                        <MDBBtn outline className ='mx-2' color = 'danger'>You STUIPID MAKE AN ACCOUNT</MDBBtn>
                    </div>
                </div>
            </MDBCol>

            <MDBCol col = '6' className = 'mb-5'>
                <div className='d-flex flex-column justify-content-center gradient-custom-2 h-100 mb-4'>

                    <div className='text-white px-3 py-4 p-md-5 mx-md-4'>
                        <h4 class = 'mb-4'>We are more than just a knock off Fantasy Football</h4>
                        <p class = 'small mb-0'>We have taken the Mike Dowds idea and 
                        turned the liberty league championships in to gambling process. 
                        Since Divion 3 athletes do not get paid for swimming we must make 
                        our money somehow.</p>
                    </div>

                </div>
            </MDBCol>
        </MDBRow>
    </MDBContainer>
  )
}

export default LoginSignup

