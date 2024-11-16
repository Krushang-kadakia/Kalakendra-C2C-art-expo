import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "./Header";
import './ProductDetail.css';
function ProductDetail(){

    const [product,setproduct]=useState()
    const [user,setuser]=useState()
    const p= useParams();
    
    useEffect(()=>{
        const url='http://localhost:4000/get-product/'+p.productId;
        axios.get(url)
        .then((res)=>{
            console.log(res.data.product)
            if(res.data.product){
                setproduct(res.data.product);
            }
        })
        .catch((err)=>{
            alert('Server Error')
        })
    },[p.productId])

    const handleContact=(addedBy)=>{
        // console.log('id',addedBy)
        const url='http://localhost:4000/get-user/'+addedBy;
        axios.get(url)
        .then((res)=>{
            console.log(res.data.user)
            if(res.data.user){
                setuser(res.data.user)
            }
        })
        .catch((err)=>{
            alert('Server Error')
        })
    }
    
    return(
        <>
            <Header/>
            <h5 className="heading5">ART WORK DETAILS</h5>
            <div className="center-align"> 
                {product && <div className="d-flex justify-content-between flex-wrap"> 
                    <div className="center-align">
                        <p className="m-2">{product.artname}</p>
                        <p className="m-2">{product.artcategory}</p>
                        <div className="image-container">
                            <img width="600px" height="600px" src={'http://localhost:4000/'+product.artimage} alt="" />
                            <img width="600px" height="600px" src={'http://localhost:4000/'+product.artimage2} alt="" />
                        </div>
                        <br />
                        <h3 className="m-2 price-text">Rs.{ product.artprice }/-</h3>
                        <p className="m-2 text-success">{product.artdescription}</p>
                        {product.addedBy && 
                        <button onClick={()=>handleContact(product.addedBy)}>CONTACT ARTIST</button>}    
                        {user && user.username && <h4>{user.username}</h4>} 
                        {user && user.mobile && <h4>{user.mobile}</h4>} 
                        {user && user.email && <h4>{user.email}</h4>}                    
                    </div>
                </div>}
            </div>
        </>
    )
}
export default ProductDetail;


