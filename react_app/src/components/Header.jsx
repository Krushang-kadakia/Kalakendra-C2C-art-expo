import './Header.css'
import { Link, useNavigate } from 'react-router-dom';
import {FaSearch} from "react-icons/fa";
import { useState } from 'react';
function Header(props)
{
    const [showOver,setshowOver]=useState(false)
    
    const navigate=useNavigate()
    
    const handleLogout=()=>{
        localStorage.removeItem('token');
        localStorage.removeItem('userId');

        navigate('/login');
    }

    // let locations=[
        
    //     {
    //         "latitude":28.6139,
    //         "longitude":77.22090,
    //         "placeName":"New Delhi, Delhi"                                    
    //     },
    //     {
    //         "latitude":19.0760,
    //         "longitude":72.8777,
    //         "placeName":"Mumbai, Maharashtra"
    //     },
    // ]
    return(
        <div className='header-container d-flex justify-content-between'>
            <div className="header">
                <Link className='links' to='/'>HOME </Link>
                {/* <select value='' onChange={(e)=>{localStorage.setItem('userLoc',e.target.value)}}>
                    {
                        locations.map((item,index)=>{
                            return(
                                <option key={index} value={`${item.latitude},${item.longitude}`}>{item.placeName}</option>
                            )
                        })
                    }
                </select> */}
                <input className="search" type="text" 
                value={props && props.search} 
                onChange={(e)=>props.handlesearch && props.handlesearch(e.target.value)}
                />
                <button className='search-btn' onClick={()=>props.handleClick && props.handleClick()}><FaSearch/></button>
                
                <span className='mt-3'></span>
                
                
            </div>
            <div>
                <div onClick={()=>{
                    setshowOver(!showOver)
                }} style={{
                    display:'flex', 
                    justifyContent:'center',
                    fontSize:'15px',
                    alignItems:'center', 
                    background:'#002f34',
                    color:'#fff',
                    width:'150px',
                    height:'40px',
                    borderRadius:'10%',
                    }}>
                    MORE OPTIONS
                </div>
    
                {showOver && <div style={{
                    width:'200px',
                    background:'#002f34',
                    position:'absolute',
                    top:'0',
                    right:'0',
                    zIndex:1,
                    marginTop:'50px',
                    marginRight:'50px',
                    color:'red',
                    fontSize:'15px',
                    borderRadius:'5px',
                    minHeight:'25px'
                }}>
                    <div>
                        {
                        !!localStorage.getItem('token') && 
                        <Link to="/add-product">
                            <button className="logout-btn">ADD ART WORK</button>
                        </Link>
                        }
                    </div>
                    <div>
                        {
                        !!localStorage.getItem('token') && 
                        <Link to="/liked-products">
                            <button className="logout-btn">LIKED ART WORKS</button>
                        </Link>
                        }
                    </div>
                    <div>
                        {
                        !!localStorage.getItem('token') && 
                        <Link to="/my-products">
                            <button className="logout-btn">MY ART WORKS</button>
                        </Link>
                        }
                    </div>
                    <div>
                        {
                        !localStorage.getItem('token') ?
                        <Link to="/login">LOGIN</Link>:
                        <button className="logout-btn" onClick={handleLogout}>LOGOUT</button>
                        }
                    </div>
                </div> }
            </div>
        </div>
    )
}

export default Header;