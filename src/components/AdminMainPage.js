import { Navigate, useNavigate } from "react-router-dom";
import React from 'react';
import ReactDOM from 'react-dom'
import { useState, useEffect } from "react";
import "./../css/AdminMainPage.css"; 
import Popup from "./Popup";
import {useLocation} from "react-router-dom"
import HeaderAdmin from "./HeaderAdmin";
import UserListItem from "./UserListItem";

const AdminMainPage = () => {

    const [popup, setPopup] = useState({active: false, title: "", message: ""});
    const navigate = useNavigate();
    const {state} = useLocation();
    const adminUsername = state.adminUsername;
    const [usersList, setUsersList] = useState([]);

    useEffect(() => {
        const getUsers = async () => {
            await fetch(`http://localhost:8080/energyUtility/users`)
            .then(response => response.json())
            .then(body => {
                console.log(body);
                setUsersList(body);
            });
        }
    
        getUsers()
    }, []);

    const onNewUserClick = async (e) => {
        e.preventDefault();
        navigate('/admin/new-user', {
            state: {adminUsername: adminUsername}
        });
    }

    return(
        <div className='welcome-page'>
            <HeaderAdmin adminUsername={adminUsername}/>
            <label className='users-title'>Users</label>
            <div className = 'container'>
                {usersList.map((user) => (
                    <UserListItem 
                        user={user}
                        adminUsername={adminUsername}
                    />
                ))}
            </div>
            <button
                className='btn-new-user' 
                id='btn-new-user' 
                onClick={(e) => onNewUserClick(e)}>
                New User
            </button>
            <Popup 
                trigger={popup.active}
                setPopup={setPopup}
                title={popup.title}
                message={popup.message}
            />
    </div>
    )
}

export default AdminMainPage