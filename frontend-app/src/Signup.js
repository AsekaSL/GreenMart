import { useState } from "react";

function Signup({ setPassStyle, signUp, passStyle }) {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [conformPass, setConformPass] = useState('');
    
    return(
        <div className="sign-container">
               <div className="sign-box-container signup-container">
                    <div className="login-name">
                        Sign Up
                    </div>
                    <input value={name} placeholder="Name" type="text" onChange={(e) => setName(e.target.value)} />
                    <input value={email} placeholder="Email" type="text" onChange={(e) => setEmail(e.target.value)}/>
                    <input value={pass} placeholder="Enter Password" type="password" onChange={(e) => setPass(e.target.value)}/>
                    <input value={conformPass} placeholder="Conform Password" type="password" onChange={(e) => setConformPass(e.target.value)}/>
                    <div className="sign-container-button">
                    <div className="wrong-tip" style={passStyle}  >Wrong password or Name , Please try again</div>
                        <button className="register-button" onClick={() => {
                            if(pass == conformPass) {
                                signUp({name, email, pass})
                            }else{
                                setPassStyle({display: "initial"});
                            }
                        }}>
                            Register
                        </button>
                    </div>
                </div>
        </div>
    );
}
export default Signup;