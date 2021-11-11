
import axios from "axios";
import MasterLayout from "pages/admin/MasterLayout";
import React, { useEffect, useState } from "react";
import { Route, Redirect, useHistory } from "react-router-dom";
import Swal from "sweetalert2";
function AdminPrivateRoute({ ...rest }) {
    const [stateAuth, setStateAuth] = useState(true);
    const history = useHistory();
    useEffect(() => {
        axios.get('/api/checkingAuthenticated').then((res) => {
            const result = res.status;
            console.log(result)
            if (result === 200) {
                setStateAuth(true);
                console.log(stateAuth);
            }
            else if (result === 401) {
                setStateAuth(false);
                Swal.fire({ icon: 'warning', title: 'Không đủ quyền truy cập' }).then(() => { history.push('/login'); });

            }
        });
        return () => {
            setStateAuth(false);
        };
    }, []);
    axios.interceptors.response.use(undefined, function axiosRetryInterceptor(err) {
        if (err.response.status === 401) {
            Swal.showLoading()
            Swal.fire({ icon: 'error', title: 'Không được xác thực' })
            history.push('/');
        }
        return Promise.reject(err);
    });
    axios.interceptors.response.use(function (response) {
        return response;
    }, function (err) {
        if (err.response.status === 403) {
            Swal.fire('Không có quyền truy cập', err.response.data.message, 'warning');
            history.push('/403');
        }
        else if (err.response.status === 404) {
            Swal.fire({
                icon: 'error',
                title: 'Trang chuyển hướng không tồn tại !',
            })
            history.push('/404');
        }
        return Promise.reject(err);
    });

    return (
        <Route {...rest}
            render=
            {
                ({ props, location }) =>
                    stateAuth ? <MasterLayout {...props} /> : <Redirect to={{ pathname: '/login', state: { from: location } }} />
            }
        />
    );
}
export default AdminPrivateRoute;