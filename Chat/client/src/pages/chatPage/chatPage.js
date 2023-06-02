import Chat from './Chat';
import io from 'socket.io-client';
import React, {useState, useEffect, useContext} from "react";
import {useSearchParams} from "react-router-dom";
import {AuthContext} from "../../authContext";
import {useForm} from "react-hook-form";


function ChatPage() {
    const {register,handleSubmit,setValue} = useForm();
    const { isAuthenticated, userId, login, logout } = useContext(AuthContext);
    const socket = io.connect('https://pvi-lab-server.onrender.com');
    const [searchParams, setSearchParams] = useSearchParams();

    const joinRoom = async () => {
        await socket.emit("join_room", room);
    }

    const [room,setRoom] = useState(searchParams.get("room"));


    useEffect( ()=> {
        joinRoom(room);
    },[room]);

    const [chatRooms, setChatRooms] = useState([]);
    const fetchChatRooms = () => {
        fetch("https://pvi-lab-server.onrender.com/chat/rooms/" + userId)
            .then(response => {
                return response.json();
            })
            .then(data => {
                setChatRooms(data);
                console.log(chatRooms.length > 0 ? chatRooms : "Дані ще не завантажені");
            })
    }
        useEffect(()=>{
            fetchChatRooms();
        },[]);


    const createRoom = (formData) => {
        fetch("https://pvi-lab-server.onrender.com/auth/"+userId+"/"+formData.secondMember)
            .then(response => {
                console.log(response);
                return response.json();
            })
            .then(data => {
                console.log(data);
                if(data.message)
                    throw new Error("User not found");
                return fetch("https://pvi-lab-server.onrender.com/chat/rooms", {
                    method: 'POST',
                    mode: 'cors',
                    body: JSON.stringify({users: data, name: formData.roomName}),
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                }).then(response => {
                    return response.json();
                }).then(res => {
                    if(res.message)
                        alert(res.message);
                });
            }).then(res =>
            res.json())
            .then(roomdata => window.location.href = "?room=" + roomdata._id)
            .catch(err => alert(err.message));
    }


    const [isFormVisible,setFormVisible] = useState(false);

  return (<>
      <form id="addRoomForm" onSubmit={handleSubmit(createRoom)}>
          <div className="overlay" id = "add-student-overlay" style={{display: isFormVisible?"block":"none", zIndex:9999}}>
              <div className="card" style={{height:"auto", width:"50%", marginTop:"10%", marginLeft:"25%"}}>
                  <h5 className="card-header">Add new room</h5>
                  <div className="row mt-3" style={{width:"80%", marginLeft:"10%"}}>
                      <div className="col-12">
                          <label htmlFor="roomName" className="form-label">Room name</label>
                          <input type="text" className="form-control" id="roomName" {...register("roomName")}/>
                      </div>
                      <div className="col-12 mt-2">
                          <label htmlFor="secondMember" className="form-label">Second member</label>
                          <input type="text" className="form-control" id="secondMember" {...register("secondMember")}/>
                      </div>
                      <div className="col-10 text-end mt-3">
                          <button type="reset" className="btn btn-outline-danger" onClick={()=>setFormVisible(false)}>
                              Cancel
                          </button>
                      </div>
                      <div className="col-2 text-end mt-3 pb-3">
                          <button type="submit" className="btn btn-outline-dark">
                              Ok
                          </button>
                      </div>
                  </div>
              </div>
          </div>
      </form>


        <div className="row" style={{marginTop:"2%"}}>
          <div className="col-3">
              <div className="card" style={{height:"550px"}}>
                  <div className="card-header d-flex justify-content-between align-items-center p-3">
                      <h5 className="mb-0">Chat Rooms</h5>
                      <button className="btn btn-outline-dark" onClick={()=> setFormVisible(true)}>+</button>
                  </div>
                  <div className="card-body p-0" data-mdb-perfect-scrollbar="true" style={{position: "relative", overflowY:"auto"}}>
                      <div className="list-group" style={{width:"100%",padding:"0", borderRadius:0}}>
                          {chatRooms.map(chatRoom =>
                              <button id={chatRoom._id} type="button" className={"list-group-item list-group-item-action" +
                              (room === chatRoom._id?" active":"")}
                                      onClick={() => {
                                  window.location.href="?room=" + chatRoom._id;
                              }}>{chatRoom.name}
                              </button>
                          )}
                      </div>
                  </div>
              </div>
          </div>
          <div className="col-7">
            <Chat room={room} socket={socket}/>
          </div>
        </div>
      </>
  );
}

export default ChatPage;
