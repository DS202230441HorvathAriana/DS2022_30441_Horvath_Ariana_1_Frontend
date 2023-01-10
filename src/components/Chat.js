import React from 'react';
import { useState, useEffect } from "react";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import "./../css/Chat.css";

export default function Chat({ msgList, sendMessage, username }) {
  const [open, setOpen] = useState(false);

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  function handler() {
    var msg = window.msgTextArea.value;
    sendMessage(msg);
    window.msgTextArea.value = "";
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
        setOpen(false);
        return;
    }
    
    setOpen(false);
  };

  const handleChangeMessage = (event) => {
      if (event.target.value !== "") {
          setOpen(true);
          return;
      } else 
        setOpen(false);
      return;
  }

  return (
    <div className="chat">
      <div className="chat-header">
        <h3>Chat Messages</h3>
      </div>
      <div className="chat-list">
        {msgList?.map((chat, i) => (
          <ChatCard chat={chat} key={i} />
        ))}
      </div>
      <div className="chat-input">
        <div style={{ flex: "3 1 90%" }}>
          <textarea id="msgTextArea" onChange={handleChangeMessage}/>
        </div>
        <div
          style={{
            paddingLeft: "5px",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          <button onClick={handler}>Send</button>
        </div>
      </div>
      <Snackbar open={open} onClose={handleClose}>
        <Alert onClose={handleClose} severity="info" sx={{ width: '100%' }}>            
          {username} is typing...
        </Alert>
      </Snackbar>
    </div>
  );
}

function ChatCard({ chat }) {
  return (
    <>
      <div style={{ fontSize: "9px", marginLeft: "4px", paddingLeft: "8px" }}>
        <span>{chat?.from}</span>
      </div>
      <div
        className={
          chat?.mine ? "chatcard chatcard-mine" : "chatcard chatcard-friend"
        }
      >
        <div className="chatcard-msg">
          <span>{chat?.msg}</span>
        </div>
        <div className="chatcard-time">
          <span>{chat?.time}</span>
        </div>
      </div>
    </>
  );
}