import { Navigate, useNavigate, useLocation } from "react-router-dom";
import React from 'react';
import ReactDOM from 'react-dom'
import { useState } from "react";
import "./../css/NewUserPage.css"; 
import HeaderAdmin from "./HeaderAdmin";
import Popup from "./Popup";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';

const EditUserPage = () => {

    const {state} = useLocation()
    const [username, setUsername] = useState(state.user.username)
    const oldUsername = state.user.username;
    const adminUsername = state.adminUsername;
    const [password, setPassword] = useState("")
    const [role, setRole] = useState(state.user.role);
    const [popup, setPopup] = useState({active: false, title: "", message: ""});
    const navigate = useNavigate()
    
    const validateInput = async () => {
        if(!username) {
            setPopup({active: true, title: "Oops!", 
                message: "Username can't be empty"});
            return false;
        }
        return true;
    }

    const onSaveClick = async (e) => {
        e.preventDefault();
        let notEmpty = await validateInput();
        if (notEmpty) {
            fetch(`http://arianahorvath30441backend.germanywestcentral.azurecontainer.io:8080/energyUtility/users/${oldUsername}`, {
                method: "PUT",
                headers: {
                    'Accept': 'application/json',
                    "Content-type": "application/json"
                },
                body: JSON.stringify({username, password, role})
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
    }
   
    return(
        <div className='background'>
            <HeaderAdmin adminUsername={adminUsername}/>
            <div className='title'>
                <p className='title-text'>Edit User</p>
            </div>
            <form className="new-user-form">
                <div className="user-data">
                    <label className="user-data-label">Username:</label>
                    <input
                        className="user-data-input" 
                        type="text" 
                        placeholder="New username"
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)} 
                    />
                </div>
                <div className="user-data">
                    <label className="user-data-label">Password:</label>
                    <input
                        className="user-data-input" 
                        type="password" 
                        placeholder="New password"
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                    />
                </div>
                <div className="user-data">
                    <label className="user-data-label">Role:</label>
                    <FormControl>
                        <RadioGroup
                            aria-labelledby="demo-controlled-radio-buttons-group"
                            name="controlled-radio-buttons-group"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                        >
                            <FormControlLabel value="CLIENT" control={<Radio />} label="Client" />
                            <FormControlLabel value="ADMIN" control={<Radio />} label="Admin" />
                        </RadioGroup>
                    </FormControl>
                </div>
                <button 
                    className='btn-save' 
                    id='btn-save' 
                    type='submit'
                    onClick={(e) => onSaveClick(e)}
                >
                    Update        
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

export default EditUserPage