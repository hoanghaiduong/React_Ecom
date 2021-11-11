import AdminPrivateRoute from 'AdminPrivateRoute';
import 'assets/styles/tailwind.css';
import Page403 from 'components/errors/403';
import Page404 from 'components/errors/404';
import AxiosConfig from 'config/Axios';
// Tailwind CSS Style Sheet
import Login from 'pages/frontend/auth/Login';
import Register from 'pages/frontend/auth/Register';
import PublicRoute from 'PublicRoute';
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";


export default function App() {
    const token_isset = localStorage.getItem('auth_token');
    AxiosConfig();

    return (
        <Router>
            <Switch>
                <AdminPrivateRoute path="/admin" name="Admin" />
                <Route path="/login"  >
                    {token_isset ? <Redirect to="/" /> : <Login />}
                </Route>
                <Route path="/register" >
                    {token_isset ? <Redirect to="/" /> : <Register />}
                </Route>
                <Route path="/403" name="FORBIDEN" component={Page403} />
                <Route path="/404" name="NOT_FOUND" component={Page404} />
                <PublicRoute path="/" name="Home" />
            </Switch>
        </Router>
    );
}

