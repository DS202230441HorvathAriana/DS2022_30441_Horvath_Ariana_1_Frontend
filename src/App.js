import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import LoginPage from './components/LoginPage';
import ClientMainPage from './components/ClientMainPage';
import AdminMainPage from './components/AdminMainPage';
import NewUserPage from './components/NewUserPage';
import EditUserPage from './components/EditUserPage';
import DevicesPage from './components/DevicesPage';
import NewDevicePage from './components/NewDevicePage';
import EditDevicePage from './components/EditDevicePage';
import MyDevicePage from './components/MyDevicePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<LoginPage/>}/>
        <Route exact path="/client" element={<ClientMainPage/>}/>
        <Route exact path="/admin" element={<AdminMainPage/>}/>
        <Route exact path="/admin/new-user" element={<NewUserPage/>}/>
        <Route exact path="/admin/edit-user" element={<EditUserPage/>}/>
        <Route exact path="/admin/devices" element={<DevicesPage/>}/>
        <Route exact path="/admin/devices/new-device" element={<NewDevicePage/>}/>
        <Route exact path="/admin/devices/edit-device" element={<EditDevicePage/>}/>
        <Route exact path="/client/device" element={<MyDevicePage/>}/>
      </Routes>
    </Router>
  );
}

export default App;
