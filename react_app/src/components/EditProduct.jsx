import { useEffect, useState } from "react";
import Header from "./Header";
import { useNavigate, Link, useParams } from "react-router-dom";
import axios from "axios";
import Categories from "./CategoriesList";
function EditProduct(){
    
    const navigate=useNavigate()
    
    const[artname,setartname]=useState('');
    const[artcategory,setartcategory]=useState('');
    const[artimage,setartimage]=useState('');
    const[artimage2,setartimage2]=useState('');
    const[artprice,setartprice]=useState('');
    const[artdescription,setartdescription]=useState('');
    const[oldartimage,setoldartimage]=useState('');
    const[oldartimage2,setoldartimage2]=useState('');

    const p = useParams()

    useEffect(()=>{
        if(!localStorage.getItem('token'))
        {
            navigate('/login')
        }
    },[])

    useEffect(()=>{
        const url='http://localhost:4000/get-product/'+p.productId;
        axios.get(url)
        .then((res)=>{
            console.log(res.data.product)
            if(res.data.product){
                let product = res.data.product
                setartname(product.artname);
                setartcategory(product.artcategory);
                setoldartimage(product.artimage);
                setoldartimage2(product.artimage2);
                setartprice(product.artprice);
                setartdescription(product.artdescription);

            }
        })
        .catch((err)=>{
            alert('Server Error')
        })
    },[p.productId])

    const handleApi=()=>{

        // navigator.geolocation.getCurrentPosition((position)=>{

            const formData=new FormData();

            formData.append('artid',p.productId)
            formData.append('artname',artname);
            formData.append('artcategory',artcategory);
            formData.append('artimage',artimage);
            formData.append('artimage2',artimage2);
            formData.append('artprice',artprice);
            formData.append('artdescription',artdescription);
            formData.append('userId',localStorage.getItem('userId'));
            // formData.append('userlatitude', position.coords.latitude);
            // formData.append('userlongitude', position.coords.longitude);

            
            const url='http://localhost:4000/edit-product';
            axios.post(url,formData)
            .then((res)=>{
                if(res.data.message)
                {
                    alert(res.data.message);
                    navigate('/my-products')
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

                <h2 className="mb-3">EDIT YOUR ART WORK HERE</h2>
                
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
                <input style={{width: '50%'}} className="form-control mb-3" type="file" 
                onChange={(e)=>{setartimage(e.target.files[0])}}/>
                <img src={"http://localhost:4000/"+oldartimage} alt="" width={150} height={200} />
                <br />

                <label className="mt-3">Art Image 2</label>
                <input style={{width: '50%'}} className="form-control mb-3" type="file" 
                onChange={(e)=>{setartimage2(e.target.files[0])}}/>
                <img src={"http://localhost:4000/"+oldartimage2} alt="" width={150} height={200} />
                <br />
                
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

export default EditProduct;