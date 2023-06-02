import React, {useContext, useState, useEffect} from "react";
import './studentsPage/studentStyles.css';
import profilePicture from './user.png'
import notificationIcon from './bell.png'
import { AuthContext} from '../authContext';
function TopBar()
{
    const { isAuthenticated, userId, login, logout } = useContext(AuthContext);

    const [userData,setUserData] = useState(isAuthenticated?fetch("https://pvi-lab-server.onrender.com/auth/" + userId)
        .then(response =>
            response.json())
        .then(data => {
            setUserData(data);
        }):null);

    useEffect(()=>{
        isAuthenticated&&fetch("https://pvi-lab-server.onrender.com/auth/" + userId)
            .then(response =>
                response.json())
            .then(data => {
                setUserData(data);
            });
    },[isAuthenticated])


    const logOut = () => {
        logout();
    }


    return <header style={{backgroundColor:"gray"}}>
                <a className ="col-md-1" href="/" style={{padding: 10,textDecoration: 'none', color: 'white', position: 'absolute'}}>CMS</a>
                <div className="text-end">
                    <ul className="menu">
                        <li className="menu-item">
                            <a href="" style={{position:'relative'}}><img className="notifications" src={notificationIcon}/><div className="circle"></div></a>
                            <ul className="drop-menu" style={{minWidth: 200 + 'px',left: -100 + 'px',zIndex: "9999"}}>
                                <li className="drop-menu-item">
                                    <a href="#"><img className="message-profile-pic"  alt="profile picture"src={profilePicture}/>Hello! How are you?</a>
                                </li>
                                <li className="drop-menu-item">
                                    <a href="#"><img className="message-profile-pic" alt="profile picture" src={profilePicture}/>:)</a>
                                </li>
                                <li className="drop-menu-item">
                                    <a href="#"><img className="message-profile-pic"  alt="profile picture"src={profilePicture}/>Hi! This is new message by me</a>
                                </li>
                            </ul>
                        </li>
                        <li className="menu-item">
                            <img className="profile-picture" alt="profile picture" src={profilePicture}/>
                            <label style={{color: 'white', marginTop: 12 + 'px', marginRight: 20 + 'px', fontSize: 'smaller'}}>
                                {
                                    isAuthenticated && userData != null?userData.firstName + " " + userData.lastName: "Guest"
                                }
                            </label>
                            <ul className="drop-menu" style={{minWidth: 75 + 'px',zIndex: "9999"}}>
                                {
                                    isAuthenticated? <><li className="drop-menu-item">
                                        <a href="#">Profile</a>
                                    </li>
                                    <li className="drop-menu-item">
                                        <a href="/chat">Chat</a>
                                    </li>
                                    <li className="drop-menu-item">
                                        <a href="/login" onClick={logOut}>Sign Out</a>
                                    </li> </>: <>
                                            <li className="drop-menu-item">
                                        <a href="/login">Login In</a>
                                    </li>
                                    <li className="drop-menu-item">
                                        <a href="/registration">Sign Up</a>
                                    </li></>
                                }
                            </ul>
                        </li>
                    </ul>
                </div>
            </header>
}

export default TopBar;