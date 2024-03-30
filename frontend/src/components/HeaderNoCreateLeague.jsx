import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from "react-cookie";
import { MDBContainer,
MDBNavbar,
MDBNavbarBrand,
MDBNavbarItem,
MDBDropdown,
MDBDropdownMenu,
MDBDropdownToggle,
MDBDropdownItem,
MDBBtn } from "mdb-react-ui-kit";
import swimcloudlogo from "../pages/Assets/swimcloud.png"
import {Link} from 'react-router-dom'
import '../pages/LoginSignup/LoginSignup.css'

export default function App({username, onLogout}) {

  return (
    <MDBNavbar expand='lg' light style={{ backgroundColor: '#1E88E5' }}>
      <MDBContainer fluid>
        <MDBNavbarBrand href='/'>
          <img
            src={swimcloudlogo}
            height='40'
            alt='logo'
            loading='lazy'
          />
          <span className ="fw-bold">Fantasy Swimming</span>
        </MDBNavbarBrand>

        <MDBDropdown>
          <MDBDropdownToggle tag='a' className='nav-link' role='button'>
            {username}
          </MDBDropdownToggle>
          <MDBDropdownMenu>
            <MDBDropdownItem link onClick={onLogout}>Logout</MDBDropdownItem>
          </MDBDropdownMenu>
        </MDBDropdown>
          
      </MDBContainer>
    </MDBNavbar>
  );
}