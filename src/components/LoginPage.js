import { Navigate, useNavigate } from "react-router-dom";
import React from 'react';
import ReactDOM from 'react-dom'
import { useState } from "react";
import "./../css/LoginPage.css"; 
import Popup from "./Popup";

const LoginPage = () => {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [role] = useState("CLIENT")
    const [popup, setPopup] = useState({active: false, title: "", message: ""});
    const navigate = useNavigate()

    const validateInputSignUp = async () => {
        if(!username) {
            setPopup({active: true, title: "Oops!", 
                message: "Username can't be empty"})
            return false
        }
        if(!password) {
            setPopup({active: true, title: "Oops!", 
                message: "Password can't be empty"})
            return false
        }
        return true
    }

    const registerClient = async(customer) => {
        fetch('http://arianahorvath30441backend.germanywestcentral.azurecontainer.io:8080/energyUtility/users', {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                "Content-type": "application/json"
            },
            body: JSON.stringify(customer)
        })
        .then(response => response.json())
        .then(body => {
            if (body.success === false) {
                
                setPopup({active: true, title: "Oops!", message: body.message});
            }
            else {
                setPopup({active: true, title: "Yaay!", message: body.message});
            }
        });
    }

    const loginUser = async(customer) => {
        await fetch('http://arianahorvath30441backend.germanywestcentral.azurecontainer.io:8080/energyUtility/user', {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(customer)
        })
        .then(response => response.json())
        .then(body => {
            if (body.success === false) {
                
                setPopup({active: true, title: "Oops!", message: body.message});
            }
            else {
                if (body.message === "CLIENT") {
                    navigate('/client', {
                        state: {clientUsername: customer.username}
                    });
                } else {
                    navigate('/admin', {
                        state: {adminUsername: customer.username}
                    });
                }
            }
        });
    }

    const onRegisterClick = async (e) => {
        e.preventDefault()

        let notEmpty = await validateInputSignUp();
        if (notEmpty){
            registerClient({username, password, role});
        }
    }

    const onLoginClick = async (e) => {
        e.preventDefault()
        
        let notEmpty = await validateInputSignUp();
        if (notEmpty){
            loginUser({username, password, role});
        }
    }

    return(
        <div className='welcome-page'>
            <div className='welcome-texts'>
                <p className='logo-text-welcome-page'>Energy Utility Platform</p>
            </div>
            <form className="login-customer-form">
                <div className="user-data">
                    <label className="user-data-label">Username:</label>
                    <input
                        className="user-data-input" 
                        type="text" 
                        placeholder="Your username"
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)} 
                    />
                </div>
                <div className="user-data">
                    <label className="user-data-label">Password:</label>
                    <input
                    className="user-data-input" 
                        type="password" 
                        placeholder="Your password"
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                    />
                </div>
                
                <button 
                    className='btn-login' 
                    id='btn-login' 
                    type='submit'
                    onClick={(e) => onLoginClick(e)}
                >
                    Login        
                </button>  
                <button 
                    className='btn-login' 
                    id='btn-register' 
                    onClick={(e) => onRegisterClick(e)}
                >
                    Register as Client      
                </button>
            </form>

            <Popup 
                trigger={popup.active}
                setPopup={setPopup}
                title={popup.title}
                message={popup.message}
            />
    </div>
    )
}

export default LoginPage