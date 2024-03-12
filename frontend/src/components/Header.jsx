import React from 'react';
import { MDBContainer,
MDBNavbar,
MDBNavbarBrand,
MDBNavbarItem } from "mdb-react-ui-kit";
import swimcloudlogo from "../pages/Assets/swimcloud.png"
import {Link} from 'react-router-dom'

export default function App() {
    return (
      <MDBNavbar light bgColor='light'>
        <MDBContainer fluid>
          <MDBNavbarBrand href='../UserHome'>
            <img
              src={swimcloudlogo}
              height='40'
              alt='logo'
              loading='lazy'
            />
            <span class ="fw-bold">Fantasy Swimming</span>
          </MDBNavbarBrand>
        </MDBContainer>
        <div style= {{position: 'fixed', right: "30px"}}>
          <span>
            Profile info
          </span>
        </div>
      </MDBNavbar>
    );
}