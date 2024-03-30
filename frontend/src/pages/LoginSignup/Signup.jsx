import React, { useState } from 'react';
import {
    MDBBtn,
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBInput
  }
  from 'mdb-react-ui-kit';
import swimcloudlogo from "../Assets/swimcloud.png";
import { Link, useNavigate } from 'react-router-dom';
import Header from '../../components/HeaderLogin';

export default function App() {
    const navigate = useNavigate();

    const [inputValue, setInputValue] = useState({
        username: "",
        password: "",
        passwordConfirmation: ""
    })

    function handleOnChange(e) {
        const { name, value } = e.target;
        setInputValue({
            ...inputValue,
            [name]: value
        });
    }

    // Can make these alerts look nicer later
    function handleError(err) {
        alert(err);
    }
    function handleSuccess(msg) {
        alert(msg);
    }

    async function handleSubmit(e) {
        e.preventDefault();

        const formData = {
            username: inputValue.username,
            password: inputValue.password,
            passwordConfirmation: inputValue.passwordConfirmation
        };
        console.log(JSON.stringify(formData));

        try {
            const response = await fetch('http://localhost:8080/api/users/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'    
            },
            credentials: 'include',
            body: JSON.stringify(formData)
        });

        let res = await response.json();

        if(res.success) {
            handleSuccess(res.message);
            navigate("/");
        } else {
            handleError(res.message);
            
        }
        
        } catch (error) {
            console.log(error);
        }
        
        // Resets input values if signup fails
        setInputValue({
            ...inputValue,
            username: "",
            password: "",
            passwordConfirmation: ""
        })
    }



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

                        <MDBInput wrapperClass='mb-4' value={inputValue.username} autoFocus label = 'Username' name="username" type = 'username' onChange={handleOnChange}/>
                        <MDBInput wrapperClass='mb-4' value={inputValue.password} label = 'Password' name="password" type = 'password' onChange={handleOnChange}/>
                        <MDBInput wrapperClass='mb-4' value={inputValue.passwordConfirmation} label = 'Confirm Password' name="passwordConfirmation" type = 'password' onChange={handleOnChange}/>

                        <div className = 'text-center pt-1 mb-5'>
                            <MDBBtn className = 'mb-4 w-100 gradient-custom-2' onClick={handleSubmit}>Register</MDBBtn>
                            <Link to="/Login">
                                <MDBBtn className = 'mb-4 w-100 gradient-custom-2'>Have an account?</MDBBtn>
                            </Link>
                        </div>
                    </div>
                </MDBCol>
            </MDBRow>
            </MDBContainer>
        </>
    );
}