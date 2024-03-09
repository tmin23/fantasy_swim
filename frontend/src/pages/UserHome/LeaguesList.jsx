import React from 'react';
import { MDBContainer,
MDBBtn,
MDBRow,
MDBCol,
MDBCard,
MDBCardBody,
MDBCardTitle,
MDBCardText,
} from "mdb-react-ui-kit";

import Button from '@mui/material/Button'

export default function LeaguesList() {
    return (
        <MDBContainer style={{marginTop: "10px", marginLeft:"0px"}} id="leagues">
            <MDBRow className='mt-100'>
                <MDBCol col='6'>
                    league 1
                </MDBCol>
                <MDBCol col='6'>
                    league 2
                </MDBCol>
            </MDBRow>
            <MDBRow className='mt-100'>
                <MDBCol col='6'>
                    league 3
                </MDBCol>
                <MDBCol col='6'>
                    league 4
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    );
}