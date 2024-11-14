import logo1 from './shopping.png';
import Signin from './Signin.js';
import Signup from './Signup.js';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function Welcome() {

    const navigate = useNavigate();

    const [isSign, setIsSign] = useState(true);
    const [passStyle, setPassStyle] = useState({display: "none"});
    const [profileId, setProfileId] = useState(0);

    const login = (data) => {
        axios.get(`http://localhost:3001/login?name=${data.name}&pass=${data.pass}`)
            .then(response => {
                if (response.data.id) {
                    navigate(`/shop`, {state: {id: response.data.id}});
                }else{
                    setPassStyle({display: "initial"});
                }
            })
            .catch(error => {
                console.log(error)
            });
    };

    const signUp = (data) => {
        console.log(data);
        axios.post('http://localhost:3001/signup', data)
            .then(response => {
                navigate('/shop',{state: {id: response.data.id}});
                
            })
            .catch(error => {
                console.log(error)
            });
    };

    return(
        <div className="welcome-box">
            <div className="info-container">
                <div className="info-mode">
                    <div className="info-title">
                        Green Mart
                    </div>
                    <div className="middle-title">
                        Local organic fruits, vegetables, and eco-friendly products 
                    </div>
                    <div className="bio-title">
                        A marketplace that promotes organic, sustainable, and ethical products, offering a variety of fresh organic produce, packaged goods, and health products.
                    </div>
                </div>
                <div className="picture-mode">
                    <div className="pic-info">
                        <p className="onlne-bio">
                            Colombo online shopping
                        </p>
                        <button className="free-button">
                            Sign up free
                        </button>
                    </div>
                    <img src={logo1} className="pic-shopping"/>
                </div>
            </div>
            {
                isSign ? <Signin passStyle={passStyle} login={login} setIsSign={(data) => setIsSign(data)}/> : <Signup passStyle={passStyle} setPassStyle={(data) => setPassStyle(data)} signUp={signUp} setIsSign={(data) => setIsSign(data)}/>
            }
            
        </div>
    );
}
export default Welcome;