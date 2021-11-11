import React from "react";
import { Route } from 'react-router-dom'
import FrontendLayout from "pages/frontend/FrontendLayout";
export default function PublicRoute({ ...rest }) {
    return (
        <Route {...rest} render={(props) => <FrontendLayout {...props} />} />
    );
}