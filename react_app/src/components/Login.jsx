import { Link,useNavigate } from "react-router-dom";
import Header from "./Header";
import { useState } from "react";
import axios from "axios";
import './Login.css';
function Login(){
    const navigate = useNavigate();

    const[ username,setusername]=useState('');
    const[ password,setpassword]=useState('');

    const handleApi=()=>{
        
        const url='http://localhost:4000/login';
        const data={username,password};
        axios.post(url,data)
        .then((res)=>{console.log(res.data)
            if(res.data.message)
            {
                // alert(res.data.message);
                if(res.data.token)
                {
                    localStorage.setItem('token',res.data.token);
                    localStorage.setItem('userId',res.data.userId);
                    navigate("/");
                }
                
            }
        })
        .catch((err)=>{console.log(err) 
            alert('Server Error')
        })
    }

    return(
        <div>
            <Header/>
            <div className="p-3 m-3">
                
                <div className="login-container">
                    <h3 className="heading">Welcome to Login page</h3>
                    <br />
                    <br />
                    <h6 className="heading">USERNAME</h6>
                    <input className="form-control" type="text" value={username} onChange={(e)=>{
                        setusername(e.target.value)
                    }}/>
                    <br />
                    <h6 className="heading">PASSWORD</h6>
                    <input className="form-control" type="text" value={password} onChange={(e)=>{
                        setpassword(e.target.value)
                    }} />
                    <br />
                    <button className="btn btn-primary" onClick={handleApi}>LOGIN</button>
                    <Link to='/signup'>SIGN UP</Link>
                </div>
            </div>
        </div>
    )
}

export default Login;
