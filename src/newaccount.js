import React from 'react'
import { useState, useEffect } from 'react';
import swal from "sweetalert";

const Newaccount = () => {
    let [ username , pickuser ] = useState("");
    let [ emailid , pickemailid ] = useState("");
    let [ password , pickpassword ] = useState("");
    let [ cpassword , pickcpassword ] = useState("");
    let [ message , updatemessage ] = useState(" Enter Your Login Details");

    const register = () =>{
        let formstatus = true;
        if (username === "" )
        {
            formstatus = false;
        }

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

        // confirm Password Validation
        if (cpassword === "" )
        {
            formstatus = false;
        }

        if ( password === cpassword )
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
            let url = "http://localhost:5000/admin/post";
            let input = { 
                "username" : username,
                "emailid" : emailid,
                "password" : password,
                "cpassword" : cpassword
            }
            let postdsta = {
                headers : {'Content-Type' : 'application/json'},
                method : "POST",
                body : JSON.stringify(input)
            }

            fetch(url, postdsta)
            .then(response=>response.json())
            .then(userArray=>{
                    updatemessage(" Success : Redirecting... ");
                    window.location.href="./login";
                })
        }
    }
    
  return (
    <div className='container mt-5'>
        <div className='row'>
            <div className='col-lg-1'></div>
            <div className='col-lg-10'>
                <div className='p-4 rounded shadow-lg'>
                    <h3 className='text-center text-primary mb-4'> Create New Account </h3>
                    <p className='text-center text-danger'>{message}</p>
                    <div className='mb-3'>
                        <strong> User Name </strong>
                        <input type='text' className='form-control mt-2' placeholder='Enter Email ID'
                        onChange={suraj=>pickuser(suraj.target.value)} required/>
                    </div>
                    <div className='mb-3'>
                        <strong> Email ID </strong>
                        <input type='email' className='form-control mt-2' placeholder='Enter Email ID'
                        onChange={suraj=>pickemailid(suraj.target.value)} required/>
                    </div>
                    <div className='mb-3'>
                        <strong> Password </strong>
                        <input type='password' className='form-control mt-2' placeholder='Enter Password'
                        onChange={suraj=>pickpassword(suraj.target.value)} required/>
                    </div>
                    <div className='mb-3'>
                        <strong> Confirm Password </strong>
                        <input type='password' className='form-control mt-2' placeholder='Enter Password'
                        onChange={suraj=>pickcpassword(suraj.target.value)} required/>
                    </div>
                    <div className='text-center'>
                        <button className='btn btn-primary'
                        onClick={register}> Register </button>
                    </div>
                </div>
            </div>
            <div className='col-lg-1'></div>
        </div>
    </div>
  )
}

export default Newaccount;
