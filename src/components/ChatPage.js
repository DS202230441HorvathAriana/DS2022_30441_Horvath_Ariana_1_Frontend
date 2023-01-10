import Chat from "./Chat";
import UsersList from "./UsersList";
import "./../css/ChatPage.css";
import { ChatMessage, ReceiveMsgRequest, Empty } from "./../chat_pb";
import { useEffect, useState } from "react";
import { User, JoinResponse } from "./../chat_pb";
import { ChatServiceClient } from "./../chat_grpc_web_pb";
import { useLocation } from "react-router-dom";
import HeaderAdmin from "./HeaderAdmin";
import HeaderClient from "./HeaderClient";

const client = new ChatServiceClient("http://localhost:8080", null, null);

export default function ChatPage() {
  const [users, setUsers] = useState([]);
  const [msgList, setMsgList] = useState([]);
  const {state} = useLocation();
  const username = state.username;

  useEffect(() => {
    const user = new User();
    user.setId(Date.now());
    user.setName(username);

    client.join(user, null, (err, response) => {
      if (err) return console.log(err);
      const error = response.getError();
      const msg = response.getMsg();

      if (error === 1) {
        return;
      }
      window.localStorage.setItem("username", username.toString());
    });

    const strRq = new ReceiveMsgRequest();
    strRq.setUser(username);

    var chatStream = client.receiveMsg(strRq, {});
    chatStream.on("data", (response) => {
      const from = response.getFrom();
      const msg = response.getMsg();
      const time = response.getTime();

      if (from === username) {
        setMsgList((oldArray) => [
          ...oldArray,
          { from, msg, time, mine: true },
        ]);
      } else {
        setMsgList((oldArray) => [...oldArray, { from, msg, time }]);
      }
    });

    chatStream.on("status", function (status) {
      console.log(status.code, status.details, status.metadata);
    });

    chatStream.on("end", () => {
      console.log("Stream ended.");
    });
  }, []);

  useEffect(() => {
    getAllUsers();
  }, []);

  function getAllUsers() {
    client.getAllUsers(new Empty(), null, (err, response) => {
      let usersList = response?.getUsersList() || [];
      usersList = usersList
        .map((user) => {
          return {
            id: user.array[0],
            name: user.array[1],
          };
        })
        .filter((u) => u.name !== username);
      setUsers(usersList);
    });
  }

  function sendMessage(message) {
    const msg = new ChatMessage();
    msg.setMsg(message);
    msg.setFrom(username);
    msg.setTime(new Date().toLocaleString());

    client.sendMsg(msg, null, (err, response) => {
      console.log(response);
    });
  }

  return (
    <div>
    {state.role ? <HeaderAdmin adminUsername={username}/> : <HeaderClient clientUsername={username}/>}
    <div className="container">
      <main className="main">
        <div className="chatpage">
          <div className="userslist-section">
            <div
              style={{ paddingBottom: "4px", borderBottom: "1px solid darkgray" }}
            >
              <div>
                <button onClick={getAllUsers}>REFRESH</button>
              </div>
              <div>
                <span>
                  Logged in as <b>{username}</b>
                </span>
              </div>
            </div>
            <UsersList users={users} />
          </div>
          <div className="chatpage-section">
            <Chat msgList={msgList} sendMessage={sendMessage} username={username}/>
          </div>
        </div>
      </main>
    </div>
    </div>
  );
}