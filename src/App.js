import 'assets/styles/tailwind.css';
import AxiosConfig from 'config/Axios';
// Tailwind CSS Style Sheet
import Login from 'pages/frontend/auth/Login';
import Register from 'pages/frontend/auth/Register';
import Home from "pages/frontend/Home";
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import AdminPrivateRoute from './AdminPrivateRoute';
import Page403 from 'components/errors/403';
import Page404 from 'components/errors/404';
import Profile from 'pages/frontend/Profile';
import AboutUs from 'pages/frontend/AboutUs';
import ContactUs from 'pages/frontend/ContactUs';
import PublicRoute from 'PublicRoute';
export default function App() {
    const token_isset = localStorage.getItem('auth_token');
    AxiosConfig();

    return (
        <Router>
            <Switch>
                
                <PublicRoute path="/" name="Home" />
                <Route path="/login" >
                    {token_isset ? <Redirect to="/" /> : <Login />}
                </Route>
                <Route path="/register" >
                    {token_isset ? <Redirect to="/" /> : <Register />}
                </Route>
                <AdminPrivateRoute path="/admin" name="Admin" />
            </Switch>
        </Router>
    );
}

