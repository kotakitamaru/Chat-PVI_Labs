import React, {useContext, useState} from "react";
import { AuthContext} from '../../authContext';
import {useForm} from "react-hook-form";

function LoginPage() {
    const { isAuthenticated, userId, login, logout } = useContext(AuthContext);


    const {register,handleSubmit,setValue} = useForm();

    const Login = (data) => {
        if(!(data.username &&  data.password))
        {
            alert("Please fill all fields");
            return;
        }
        const tempData = {
            username: data.username,
            password: data.password
        }
        fetch("https://pvi-lab-server.onrender.com/auth/login/",{
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
                console.log(data);
                if(data.isSuccess) {
                    login(data._id);
                    window.location.href = "/";
                }
                else
                    alert(data.message);
            });

    }

    return !isAuthenticated?<div className="container" style={{marginTop:"15%",width:"50%",marginRight:"35%"}}>
            <form className="row g-3" onSubmit={handleSubmit(Login)}>
                <div className="col-12">
                    <label htmlFor="username" className="form-label">Username</label>
                    <input type="text" className="form-control" id="username" placeholder="pro100s0lev01" {...register("username")}/>
                </div>
                <div className="col-12">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" placeholder="Qwer1234..." {...register("password")}/>
                </div>
                <div className="col-12" style={{position:"relative"}}>
                    <button type="submit" className="btn btn-outline-dark">Sign in</button>
                    <a href="registration" className="link-dark" style={{position:"absolute", right:0}}>Create new account</a>
                </div>
            </form>
        </div>: window.location.href="/";
}

export default LoginPage;
