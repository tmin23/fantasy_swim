import React, {useState} from 'react'
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

import './LoginSignup.css' 

const LoginSignup = () => {

    const navigate = useNavigate();
    const [inputValue, setInputValue] = useState({
        username: "",
        password: "",
    });

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
        console.log(inputValue.username);
        console.log(inputValue.password);

        const formData = {
            username: inputValue.username,
            password: inputValue.password
        };
        console.log(JSON.stringify(formData));

        try {
            const response = await fetch('http://localhost:8080/api/users/login', {
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
        
        // Resets input values if login fails
        setInputValue({
            ...inputValue,
            username: "",
            password: "",
        })
    }


    return (
    <MDBContainer className = 'my-5 gradient-form'>
        <MDBRow>
            <MDBCol col = '6' className = 'mb-5'>
                <div className = 'd-flex flex-column ms-5'>
                    <div className = 'text-center'>
                        <img src = {swimcloudlogo} style = {{width: '185px'}} alt = 'logo'/>
                        <h4 className = 'mt-1 mb-5 pb-1'>We are Fantasy Swimming</h4>
                    </div>

                    <p>Please login to your account</p>

                    <MDBInput wrapperClass='mb-4' label="username" name='username' autoFocus value={inputValue.username} onChange={handleOnChange}/>
                    <MDBInput wrapperClass='mb-4' label="password" name='password' type="password" value={inputValue.password} onChange={handleOnChange}/>

                    <div className = 'text-center pt-1 mb-5 pb-1'>
                        
                        <MDBBtn className = 'mb-4 w-100 gradient-custom-2' type="submit" onClick = {handleSubmit}>Sign in</MDBBtn>

                        
                        <a className ='text-muted' href = '#!'>Forgot password?</a>
                    </div>

                    <div className = 'd-flex flex-row align-item-center justify-content-center pb-4 mb-4'>
                        <p className = 'mb-0'>Don't have an account?</p>
                        <Link to="/Signup">
                            <MDBBtn outline className ='mx-2' color = 'danger'>Make Account</MDBBtn>
                        </Link>
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

