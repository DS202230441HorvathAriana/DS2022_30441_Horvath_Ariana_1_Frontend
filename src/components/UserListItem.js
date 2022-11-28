import React from 'react'
import "./../css/UserListItem.css"; 
import { useNavigate } from 'react-router-dom';
import Popup from "./Popup";
import { useState, useEffect } from "react";

const UserListItem = ({user, adminUsername}) => {

    const navigate = useNavigate();
    const [popup, setPopup] = useState({active: false, title: "", message: ""});
    const onUpdateClick = async (e) => {
        e.preventDefault()
        navigate('/admin/edit-user',{
            state: {user: user, adminUsername: adminUsername}
        });
    }
    const onDeleteClick = async (e) => {
        e.preventDefault()
        fetch(`http://arianahorvath30441backend.germanywestcentral.azurecontainer.io:8080/energyUtility/users/${user.username}`, {
            method: "DELETE",
            headers: {
                'Accept': 'application/json',
                "Content-type": "application/json"
            }
        })
        .then(response => response.json())
        .then(body => {
            if (body.success === false) {
                setPopup({active: true, title: "Oops!", message: body.message});
            }
            else {
                window.location.reload(false);
            }
        });
    }
    return (
        <ul className='user'>
            <li className='user-component'>
                <div>
                    <h3 className='user-component'>{user.username}</h3>
                </div>
            </li>
            <li className='user-component'>
                <div>
                    <p className='role-component'><b>Role:  </b>{user.role} </p>
                </div>
            </li>
            <button 
                className='btn' 
                id='btn-delete' 
                onClick={(e) => onDeleteClick(e)}>
                Delete      
            </button>
            <button 
                className='btn' 
                id='btn-update' 
                onClick={(e) => onUpdateClick(e)}>
                Edit      
            </button>
            <Popup 
                trigger={popup.active}
                setPopup={setPopup}
                title={popup.title}
                message={popup.message}
            />
        </ul>
    )
}

export default UserListItem