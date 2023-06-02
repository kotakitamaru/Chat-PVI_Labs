import React, {useContext, useEffect, useState} from "react";
import { AuthContext} from '../../authContext';
import {Container , Dropdown, Button, Modal} from 'react-bootstrap';
import {useForm} from "react-hook-form";
function Chat({socket,room}) {
    const [currentMessage,setCurrentMessage] = useState("");
    const { isAuthenticated, userId, login, logout } = useContext(AuthContext);
    const {register,handleSubmit,setValue} = useForm();
    const [username,setUsername] = useState(null);
    const [messageList, setMessageList] = useState([]);
    const [currentRoom, setCurrentRoom] = useState(undefined);
    const [show, setShow] = useState(false);
    const modalClose = () => {
        setShow(false);
    }
    const modalShow = () => setShow(true);

    fetch("https://pvi-lab-server.onrender.com/auth/" + userId)
        .then(response =>
            response.json())
        .then(data => {
                setUsername(data.username);
        });
    const sendMessage = async () => {
        if(currentMessage === "" || !username)
            return;
        const messageData = {
            authorId: userId,
            room: room,
            author: username,
            message: currentMessage,
            date: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes(),
        }

        await socket.emit("send_message", messageData);
    };

    useEffect(() => {
        socket.on("recieve_message",(data) => {
            setMessageList(list => [...list,data]);
        });
    }, [socket])

    useEffect(()=>{
        fetch("https://pvi-lab-server.onrender.com/chat/oneRoom/" + room)
            .then(response => {
                if (response)
                    return response.json();
            })
            .then(data => {
                console.log(data);
                if (data) {
                    setCurrentRoom(data);
                    setMessageList(() => data.messages);
                }
            })
    },[]);

    const addMember = (data)=>{
        const dataToSend = {
            room: currentRoom._id,
            username: data.secondMemberUsername
        }
        fetch("https://pvi-lab-server.onrender.com/chat/addUser",{
            method: "POST",
            mode: 'cors',
            body: JSON.stringify(dataToSend),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(response=> response && response.json())
            .then(data => (data && data.message) && alert(data.message));
        //data.secondMemberUsername
    }



    return (<>
            <Modal show={show} onHide={modalClose}>
                <form onSubmit={handleSubmit(addMember)}>
                    <Modal.Body>
                        <div className="col-12 mt-2">
                            <label htmlFor="secondMember" className="form-label">Member username</label>
                            <input type="text" className="form-control" id="secondMember" {...register("secondMemberUsername")}/>
                        </div>
                    </Modal.Body>

                    <Modal.Footer style={{padding:"5px"}}>
                        <button className="btn btn-outline-danger sm"  type="reset" onClick={modalClose}>Cancel</button>
                        <button className="btn btn-outline-dark sm"  type="submit">Add member</button>
                    </Modal.Footer>
                </form>
            </Modal>
            <div className="card" style={{height: "550px"}}>
            <div className="card-header d-flex justify-content-between align-items-center p-3">
                <h5 className="mb-0">Chat messages
                    {(currentRoom && currentRoom.users) && <Dropdown style={{position: "absolute", right: "10px", top: "10px"}}>

                        <Dropdown.Toggle variant="outline-black" id="dropdown-basic">
                            Members
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item style={{width: "auto", paddingBottom:"10px", borderBottom:"gray solid 1px"}}
                            onClick={modalShow}>Add member</Dropdown.Item>
                            <br/>
                            {(currentRoom && currentRoom.users) && currentRoom.users.map((x) => {

                                return <Dropdown.Item style={{width: "auto"}}>{x.username}<p
                                    className="small text-muted">{x.firstName + " " + x.lastName}</p></Dropdown.Item>
                            })
                            }
                        </Dropdown.Menu>

                    </Dropdown>}
                </h5>
            </div>
            <div className="card-body" id="chat" data-mdb-perfect-scrollbar="true" style={{position: "relative", height: "400px", overflowY:"auto"}}>
                {
                    messageList && messageList.map((data)=> {
                        return data.author !== username ?
                            <div className="d-flex flex-row justify-content-start mb-4">
                                <div>
                                    <p className="small ms-3 rounded-3" style={{marginBottom:"0", fontSize:"10px"}}>
                                        {data.author}
                                    </p>
                                    <p className="small p-2 ms-3 mb-1 rounded-3" style={{backgroundColor: "#f5f6f7"}}>
                                        {data.message}
                                    </p>
                                    <p className="small ms-3 mb-3 rounded-3 text-muted">
                                        {data.date}
                                    </p>
                                </div>
                            </div>:
                            <div className = "d-flex flex-row justify-content-end" >
                                <div>
                                    <p className=" d-flex justify-content-end me-3 rounded-3" style={{marginBottom:"0", fontSize:"10px"}}>
                                        {data.author}
                                    </p>
                                    <p className = "small p-2 me-3 mb-1 text-white rounded-3 bg-primary" >
                                        {data.message}
                                    </p>
                                    <p className="small me-3 mb-3 rounded-3 text-muted d-flex justify-content-end">
                                        {data.date}
                                    </p>
                                </div>
                            </div>
                    })
                }
            </div>

            <div className="card-footer d-flex">
                <div className="input-group mb-3">
                    <input type="text" className="form-control" placeholder="Enter your message"
                           onChange={(e)=>setCurrentMessage(e.target.value)}
                           aria-label="Recipient's username" aria-describedby="button-addon2"/>
                        <button className="btn btn-outline-secondary" type="button"  onClick={() => sendMessage()} id="button-addon2">Send</button>
                </div>
            </div>
        </div>
        </>
    );
}
export default Chat;