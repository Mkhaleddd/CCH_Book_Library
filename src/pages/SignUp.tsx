// src/pages/SignUpPage.tsx

import React from "react";
import SinglePageLog from "../components/SinglePageLog";

const SignUpPage: React.FC = () => {
    return (
        <SinglePageLog
            title="Sign Up"
            login={false}
            description="Already have an account? Log in here."
            navText="Log In"
            hidePassword={true}
        />
    );
};

export default SignUpPage;
