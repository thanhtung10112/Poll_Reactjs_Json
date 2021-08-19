import { result } from 'lodash';
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';

// const Login = (props) => {
function Login() {

    const [Username, setUsername] = useState('');
    const [Password, setPassword] = useState('');
    const history = useHistory();

    useEffect(() => {
        if (localStorage.getItem('user')) {
            history.push("/Dash")
        }
    }, [])

    async function LoginUser() {
        console.warn(Username, Password)
        let item = { Username, Password }
        let result = await fetch("http://localhost:3500/user", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Accept": 'application/json'
            },
            body: JSON.stringify(item)
        });
        result = await result.json();
        localStorage.setItem("user", JSON.stringify(result))
        history.push("/Dash")
    }

    return (
        <div className="bodys" >
            <div className="mt-20"></div>
            <div className="form" id="signin-form">
                <a href className="form-logo">
                    <h1 >Login</h1>
                </a>
                {/* <form > */}
                <div className="form-group">
                    <input type="text" className="form-input" placeholder="User Name" id="signin-email"
                        onChange={(e) => setUsername(e.target.value)} />
                </div>

                <div className="form-group">
                    <input type="password" className="form-input" placeholder="Password" id="signin-password"
                        onChange={(e) => setPassword(e.target.value)} />
                </div>


                <button className="form-btn" id="signin-btn"
                    onClick={LoginUser}>
                    Sign up
                </button>
                {/* </form> */}
            </div>
        </div>
    );
};

export default Login;