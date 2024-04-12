import React from 'react';
import { MDBContainer,
MDBNavbar,
MDBNavbarBrand,
MDBNavbarItem,
MDBDropdown,
MDBDropdownMenu,
MDBDropdownToggle,
MDBDropdownItem } from "mdb-react-ui-kit";
import swimcloudlogo from "../pages/Assets/swimcloud.png"
import {Link} from 'react-router-dom'
import '../pages/LoginSignup/LoginSignup.css'

export default function App({username, onLogout}) {
    return (
      <MDBNavbar expand='lg' light style={{ backgroundColor: '#1E88E5', width: '100%' }}>
        <MDBContainer fluid>
          <MDBNavbarBrand href='#'>
            <img
              src={swimcloudlogo}
              height='40'
              alt='logo'
              loading='lazy'
            />
            <span class ="fw-bold">Fantasy Swimming</span>
          </MDBNavbarBrand>
            
        </MDBContainer>
      </MDBNavbar>
    );
}