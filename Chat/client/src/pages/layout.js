import React, {useContext} from "react";
import TopBar from "./topBar"
import "./studentsPage/studentStyles.css";
import { AuthContext} from '../authContext';

const location = window.location.pathname;
console.log(location);
const Layout = ({ children }) => {
    const { isAuthenticated, userId, login, logout } = useContext(AuthContext);
    return <React.Fragment>
            <TopBar />
            <div className="row">
                {isAuthenticated &&
                    <nav id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block sidebar collapse"
                         style={{paddingTop: 100 + "px", paddingLeft: 50 + "px"}}>
                        <nav className="nav flex-sm-column" style={{paddingTop: 7 + "%", paddingLeft: 2 + "%"}}>
                            <a className="nav-link" href=""
                               style={{fontWeight: location == '/dashboard' ? "bold" : "normal", color: "black"}}>Dashboard</a>
                            <a className="nav-link" href="students"
                               style={{fontWeight: location == '/students' ? "bold" : "normal", color: "black"}}>Students</a>
                            <a className="nav-link" href=""
                               style={{fontWeight: location == '/tasks' ? "bold" : "normal", color: "black"}}>Tasks</a>
                        </nav>
                    </nav>}
            <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">{children}</main>
        </div>
        </React.Fragment>
}

export default Layout;