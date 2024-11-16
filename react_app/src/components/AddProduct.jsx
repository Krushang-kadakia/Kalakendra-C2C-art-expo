import { useEffect, useState } from "react";
import Header from "./Header";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Categories from "./CategoriesList";
function AddProduct(){
    
    const navigate=useNavigate()
    
    const[artname,setartname]=useState('');
    const[artcategory,setartcategory]=useState('');
    const[artimage,setartimage]=useState('');
    const[artimage2,setartimage2]=useState('');
    const[artprice,setartprice]=useState('');
    const[artdescription,setartdescription]=useState('');
    

    useEffect(()=>{
        if(!localStorage.getItem('token'))
        {
            navigate('/login')
        }
    },[])

    const handleApi=()=>{

        // navigator.geolocation.getCurrentPosition((position)=>{

            const formData=new FormData();

            formData.append('artname',artname);
            formData.append('artcategory',artcategory);
            formData.append('artimage',artimage);
            formData.append('artimage2',artimage2);
            formData.append('artprice',artprice);
            formData.append('artdescription',artdescription);
            formData.append('userId',localStorage.getItem('userId'));
            // formData.append('userlatitude', position.coords.latitude);
            // formData.append('userlongitude', position.coords.longitude);

            
            const url='http://localhost:4000/add-product';
            axios.post(url,formData)
            .then((res)=>{
                if(res.data.message)
                {
                    alert(res.data.message);
                    navigate('/')
                }
            })
            .catch((err)=>{
                alert('Server error'+err)
            })
        // })
        
    }
    return(
        <div>
            <Header/>
            
            <div className="p-5">

                <h2 className="mb-3">ADD YOUR ART WORK HERE</h2>
                
                <label className="mt-3">Art Name</label>
                <input className="form-control mb-3" type="text" value={artname}
                onChange={(e)=>{setartname(e.target.value)}}/>
                
                <label className="mt-3">Art Category</label>
                <select className="form-control mb-3" value={artcategory}
                onChange={(e)=>{setartcategory(e.target.value)}}>
                    
                    {
                        Categories && Categories.length>0 
                        && Categories.map((item,index)=>{
                            return(
                            <option key={'option'+index}>{item}</option>
                        )})
                    }
                </select>
                
                <label className="mt-3">Art Image 1</label>
                <input className="form-control mb-3" type="file" 
                onChange={(e)=>{setartimage(e.target.files[0])}}/>

                <label className="mt-3">Art Image 2</label>
                <input className="form-control mb-3" type="file" 
                onChange={(e)=>{setartimage2(e.target.files[0])}}/>
                
                <label className="mt-3">Art Price</label>
                <input className="form-control mb-3" type="text" value={artprice}
                onChange={(e)=>{setartprice(e.target.value)}}/>
                
                <label className="mt-3">Art Description</label>
                <input className="form-control mb-3" type="text" value={artdescription}
                onChange={(e)=>{setartdescription(e.target.value)}}/>
                
                
                <button onClick={handleApi} className="btn btn-primary mt-3"> SUBMIT </button>
            </div>
            
        </div>
    )
}

export default AddProduct;