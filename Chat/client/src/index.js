import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Layout from './pages/layout'
import StudentsPage from "./pages/studentsPage/studentsPage";
import ChatPage from "./pages/chatPage/chatPage";
import LoginPage from "./pages/signPage/loginPage";
import RegistrationPage from "./pages/signPage/registrationPage";
import "./pages/studentsPage/studentStyles.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import reportWebVitals from './reportWebVitals';
import { AuthProvider } from './authContext';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
  },
  {
    path: "students",
    element: <StudentsPage/>,
  },
  {
    path: "chat",
    element: <ChatPage/>,
  },
  {
      path: "login",
      element: <LoginPage/>,
  },
  {
      path: "registration",
      element: <RegistrationPage/>,
  },
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<div>
    <AuthProvider>
        <Layout>
            <RouterProvider router={router} />
        </Layout>
    </AuthProvider>
    </div>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
