import React from 'react';
import { MDBContainer,
MDBNavbar,
MDBNavbarBrand } from "mdb-react-ui-kit";
import swimcloudlogo from "../pages/Assets/swimcloud.png"
import {Link} from 'react-router-dom'

export default function App() {
    return (
      <MDBNavbar light bgColor='light'>
        <MDBContainer fluid>
          {/* This errors but we need to where the navbar will bring us back to */}
          <Link to ='/LoginSignup'>
            <MDBNavbarBrand href='#'>
              <img
                src={swimcloudlogo}
                height='40'
                alt='logo'
                loading='lazy'
              />
              <span class ="fw-bold">Fantasy Swimming</span>
            </MDBNavbarBrand>
          </Link>
          
        </MDBContainer>
      </MDBNavbar>
    );
}