// src/pages/LoginPage.tsx

import React from "react";
import SinglePageLog from "../components/SinglePageLog";

const LoginPage: React.FC = () => {
    return (
        <SinglePageLog
            title="Log In"
            login={true}
            description="Don't have an account? Sign up here."
            navText="Sign Up"
            hidePassword={true}
        />
    );
};

export default LoginPage;
