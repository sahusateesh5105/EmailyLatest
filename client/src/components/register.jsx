import React from "react";

import RegisterForm from './registerForm';
import { Link } from "react-router-dom";
const SignUp = () => {
    return(
        <div 
            className="container center"
            style={{
                marginTop: "50px"
            }}
        >
            <div>New User? please Sign Up !</div>
            <RegisterForm/>
            <div> Already a User? Login <Link to={'/login'}>Here</Link></div>
        </div>
    )
}

export default SignUp