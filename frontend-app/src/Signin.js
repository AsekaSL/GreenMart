import { useState } from "react";


function Signin({ setIsSign, login, passStyle }) {

   
    const [name, setName ] = useState('');
    const [pass, setPass] = useState('');

    return(
        <div className="sign-container">
                <div className="sign-box-container">
                    <div className="login-name">
                        Login
                    </div>
                    <input placeholder="Name" type="text" value={name} onChange={(e) => {setName(e.target.value)}}/>
                    <input placeholder="Password" type="password" value={pass} onChange={(e) => {setPass(e.target.value)}}/>
                    <div className="sign-container-button">
                        <button onClick={() => { login({name,pass})}}>
                            Login
                        </button>
                        <button onClick={() => {setIsSign(false)}}>
                            Sign Up
                        </button>
                    </div>
                    <div className="forget-pass">
                        Forget Password
                    </div>
                    <div className="wrong-tip" style={passStyle}>Wrong password or Name , Please try again</div>
                </div>
            </div>
    );
}

export default Signin;