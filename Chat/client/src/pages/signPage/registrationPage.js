import React, {useContext, useState} from "react";
import { AuthContext} from '../../authContext';
import {useForm} from "react-hook-form";

function LoginPage() {
    const {register,handleSubmit,setValue} = useForm();
    const { isAuthenticated, userId, login, logout } = useContext(AuthContext);
    const createAccount = (data) => {
        if(!(data.firstName && data.lastName && data.password && data.passwordRpt))
        {
            alert("Please fill all fields");
            return;
        }
        if(data.password !== data.passwordRpt)
        {
            alert("Passwords are not the same");
            return;
        }

        fetch("http://localhost:3001/auth/sameName/" + data.username)
            .then(response =>
                response.json())
            .then(result => {
                console.log(result);
                if(!result.isUnique)
                {
                    alert(result.message);
                    return;
                }

                const tempData = {
                    firstName: data.firstName,
                    lastName: data.lastName,
                    password: data.password,
                    username: data.username
                }
                fetch("http://localhost:3001/auth/createAccount",{
                    method: 'POST',
                    mode:'cors',
                    body: JSON.stringify(tempData),
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                })
                    .then(response =>
                        response.json())
                    .then(data => {
                        login(data._id);
                    });
            });


    }


    return !isAuthenticated?<div className="container" style={{marginTop:"10%",width:"50%",marginRight:"35%"}}>
            <form className="row g-3" onSubmit={handleSubmit(createAccount)}>
                <div className="col-md-6">
                    <label htmlFor="inputFirstName" className="form-label">First Name</label>
                    <input type="text" className="form-control" id="inputFirstName" placeholder="Name" {...register("firstName")}/>
                </div>
                <div className="col-md-6">
                    <label htmlFor="inputLastName" className="form-label">Last Name</label>
                    <input type="text" className="form-control" id="inputLastName" placeholder="Surname" {...register("lastName")}/>
                </div>
                <div className="col-12">
                    <label htmlFor="username" className="form-label">Username</label>
                    <input type="text" className="form-control" id="username" placeholder="pro100s0lev01"{...register("username")}/>
                </div>
                <div className="col-12">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" placeholder="Qwer1234..."{...register("password")}/>
                </div>
                <div className="col-12">
                    <label htmlFor="rptpassword" className="form-label">Repeat Password</label>
                    <input type="password" className="form-control" id="rptpassword" placeholder="Qwer1234..."{...register("passwordRpt")}/>
                </div>
                <div className="col-12" style={{position:"relative"}}>
                    <button type="submit" className="btn btn-outline-dark">Sign up</button>
                    <a href="login" className="link-dark" style={{position:"absolute", right:0}}>Already have an account?</a>
                </div>
            </form>
        </div>: window.location.href="/";
}

export default LoginPage;
