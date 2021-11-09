import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import routes from "routes/Admin/routes";
import Sidebar from "components/admin/Sidebar";
import Footer from "components/admin/Footer";

const MasterLayout = () => {
    return (
        <>
            <Sidebar />
            <div className="md:ml-64">

                <Switch>
                    {routes.map((route, idx) => {//lọc qua các phần tử
                        return route.component &&
                            <Route
                                key={idx}
                                path={route.path}
                                exact={route.exact}
                                name={route.name}
                                render={(props) => (
                                    <route.component {...props} />
                                )}
                            />;
                    })}
                    {/* Tat ca Link co prefix la /admin mac dinh se vao /admin/dashboard */}
                    <Redirect from="/admin" to="/admin/dashboard" />
                </Switch>
                <Footer />
            </div>


        </>
    );
}
export default MasterLayout;