import { useEffect, useState } from "react";
import Header from "./Header";
import axios from "axios";


function MyProfile(){
    
    const[user,setuser]=useState({})
    
    useEffect(()=>{
        let url='http://localhost:4000/my-profile/'+localStorage.getItem('userId');
        axios.get(url)
        .then((res)=>{
            console.log(res.data)
            if(res.data.user){
                setuser(res.data.user);
            }
        })
        .catch((err)=>{
            alert('Server Error');
        })
    },[])
    
    return(
        <div>
            <Header/>
            <div className="m-3 p-3">
                <h4 className="text-center mt-4">USER PROFILE</h4>
                <table className="table table-dark table-striped table-bordered">
                    <thead>
                        <tr className="text-center">
                            <td>USERNAME</td>
                            <td>EMAIL ID</td>
                            <td>MOBILE</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="text-center">
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td>{user.mobile}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}
export default MyProfile;