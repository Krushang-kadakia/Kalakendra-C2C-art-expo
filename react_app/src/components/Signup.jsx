import { Link } from "react-router-dom";
import Header from "./Header";
import { useState } from "react";
import axios from "axios";
import './Login.css';

function Signup(){

    const[ mobile,setmobile]=useState('');
    const[ email,setemail]=useState('');
    const[ username,setusername]=useState('');
    const[ password,setpassword]=useState('');
    
    const handleApi=()=>{
        
        const url='http://localhost:4000/signup';
        const data={mobile,email,username,password};
        axios.post(url,data)
        .then((res)=>{console.log(res.data)
            if(res.data.message)
            {
                alert(res.data.message);
            }
        })
        .catch((err)=>{console.log(err) 
            alert(err)
        })
    }

    return(
        <div>
            <Header/>
            
            <div className="p-3 m-3">
                <div className="login-container">
                    <h3 className="heading">Welcome to signup page</h3>
                    <br />
                    <br />
                    <h6 className="heading" >MOBILE NUMBER</h6>
                    <input className="form-control" type="text" value={mobile} onChange={(e)=>{
                        setmobile(e.target.value)
                    }}/>
                    <br />
                    <h6 className="heading" >EMAIL ID</h6>
                    <input className="form-control" type="text" value={email} onChange={(e)=>{
                        setemail(e.target.value)
                    }}/>
                    <br />
                    <h6 className="heading" >USERNAME</h6>
                    <input className="form-control" type="text" value={username} onChange={(e)=>{
                        setusername(e.target.value)
                    }}/>
                    <br />
                    <h6 className="heading" >PASSWORD</h6>
                    <input className="form-control" type="text" value={password} onChange={(e)=>{
                        setpassword(e.target.value)
                    }} />
                    <br />
                    <button className="btn btn-primary" onClick={handleApi}>SIGNUP</button>
                    <Link to='/login'>LOGIN</Link>
                </div>
            </div>
        </div>
    )
}
export default Signup;