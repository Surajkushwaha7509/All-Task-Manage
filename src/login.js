import React from 'react'
import { useState, useEffect } from 'react';
import swal from 'sweetalert';
import { Link } from 'react-router-dom';

const Mylogin = () => {
    let [ emailid , pickemailid ] = useState("");
    let [ password , pickpassword ] = useState("");
    let [ message , updatemessage ] = useState(" Enter Your Login Details");

    const login = () =>{

        let formstatus = true;

        // Email Validation
        var epatern = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        if ( !epatern.test(emailid) )
        {
            formstatus = false;
        }

        // Password Validation
        if (password === "" )
        {
            formstatus = false;
        }

        // Check all fields
        if ( formstatus === false )
        {
            swal( "Invalid Input " , "Please Fill the Required Fields..." , "warning" );
        }

        else{
            updatemessage("Please wait Validation ");
            let url = "http://localhost:5000/admin/edit";
            let input = { 
                "emailid" : emailid,
                "password" : password
            }
            let postdsta = {
                headers : {'Content-Type' : 'application/json'},
                method : "POST",
                body : JSON.stringify(input)
            }

            fetch(url, postdsta)
            .then(response=>response.json())
            .then(userArray=>{
                if(userArray.length == 0 ){
                    updatemessage("Invalid or Not Exist ! ");
                }
                else{
                    updatemessage(" Success : Redirecting... ");
                    localStorage.setItem("usertoken", userArray[0].id);
                    localStorage.setItem("User Name", userArray[0].username);
                    window.location.reload();
                }
            })
        }
    }
    
  return (
    <div className='container mt-5'>
        <div className='row'>
            <div className='col-lg-1'></div>
            <div className='col-lg-10'>
                <div className='p-4 rounded shadow-lg'>
                    <h3 className='text-center text-primary mb-4'> Admin Login </h3>
                    <p className='text-center text-danger'>{message}</p>
                    <div className='mb-3'>
                        <strong> Email ID </strong>
                        <input type='email' className='form-control mt-2' placeholder='Enter Email ID'
                        onChange={suraj=>pickemailid(suraj.target.value)}/>
                    </div>
                    <div className='mb-3'>
                        <strong> Password </strong>
                        <input type='password' className='form-control mt-2' placeholder='Enter Password'
                        onChange={suraj=>pickpassword(suraj.target.value)}/>
                    </div>
                    <div className='text-center'>
                        <button className='btn btn-danger'
                        onClick={login}> Login </button>
                    </div>
                </div>
            </div>
            <div className='col-lg-1'></div>
        </div>
    </div>
  )
}

export default Mylogin;
