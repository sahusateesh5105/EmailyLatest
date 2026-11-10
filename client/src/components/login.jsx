import React from 'react';
import LoginForm from "./LoginForm";

const Login = () =>{

    return(
        <div
         className="container center"
            style={{
                marginTop: "50px"
            }}
        >
            <LoginForm/>
            <h5>
                <a href="/auth/google">Login With Google</a>
            </h5>
            <h5>
                <a href="/auth/facebook">Login With facebook</a>
            </h5>
        </div>
    )

}

export default Login;