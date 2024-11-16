import { useEffect, useState } from "react";
import Header from "./Header";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Categories from "./Categories";
import { FaHeart} from 'react-icons/fa'
import './Home.css';
function Home(){
    
    const navigate=useNavigate()

    const [products,setproducts]=useState([]);
    const [likedproducts, setlikedproducts] = useState([]);
    const [cproducts,setcproducts]=useState([]);
    const [search,setsearch]=useState('');
    const [issearch, setissearch]=useState(false);
    const[refresh, setrefresh]=useState(false);

    // useEffect(()=>{
    //     if(!localStorage.getItem('token'))
    //     {
    //         navigate('/login')
    //     }
    // },[])

    useEffect(()=>{
        const url='http://localhost:4000/get-products';
        axios.get(url)
        .then((res)=>{
            if(res.data.products)
            {
                setproducts(res.data.products);
            }
        })
        .catch((err)=>{
            alert('Server Error')
        })

        const url2='http://localhost:4000/liked-products';
        let data = { userId: localStorage.getItem('userId') }

        axios.post(url2,data)
        .then((res)=>{
            if(res.data.products)
            {
                setlikedproducts(res.data.products);
            }
        })
        .catch((err)=>{
            alert('Server Error')
        })
    },[refresh])

    const handlesearch=(value)=>{
        setsearch(value);
    }

    const handleClick=()=>{
        const url='http://localhost:4000/search?search=' + search;
        axios.get(url)
        .then((res)=>{
            setcproducts(res.data.products);
            setissearch(true);
        })
        .catch((err)=>{
            alert('Server Error');
        })
        // let filteredProducts=products.filter((item)=>{
        //     if(item.artname.toLowerCase().includes(search.toLowerCase()) || 
        //     item.artdescription.toLowerCase().includes(search.toLowerCase()) || 
        //     item.artcategory.toLowerCase().includes(search.toLowerCase()))
        //     {
        //         return item
        //     }
        // })
        // setcproducts(filteredProducts)
    }

    const handleCategory=(value)=>{
        let filteredProducts=products.filter((item,index)=>{
            if(item.artcategory==value)
            {
                return item;
            }
        })
        setcproducts(filteredProducts)
    }
    const handleLike=(productId,e)=>{
        //console.log(productId)
        e.stopPropagation();
        let userId=localStorage.getItem('userId');
        if(!userId)
        {
            alert('Please Login/Signup first to like products.')
            return;
        }
        const data={userId,productId}
        const url='http://localhost:4000/like-products';
        axios.post(url,data)
        .then((res)=>{
            // console.log(res);
            if(res.data.message)
            {
                alert('Added to liked products');
                setrefresh(!refresh);
            }
        })
        .catch((err)=>{
            alert('Server Error');
        })
    }

    const handleRemoveLike=(productId,e)=>{
        //console.log(productId)
        e.stopPropagation();
        let userId=localStorage.getItem('userId');
        if(!userId)
        {
            alert('Please Login/Signup first to like products.')
            return;
        }
        const data={userId,productId}
        const url='http://localhost:4000/remove-like-products';
        axios.post(url,data)
        .then((res)=>{
            // console.log(res);
            if(res.data.message)
            {
                alert('Removed from liked products');
                setrefresh(!refresh);
            }
        })
        .catch((err)=>{
            alert('Server Error');
        })
    }

    const handleProduct=(id)=>{
        navigate('/product/'+id)
    }

    return(
        <div>

            <Header search={search} handlesearch={handlesearch} handleClick={handleClick}/>
            <Categories handleCategory={handleCategory}/>

            {issearch && cproducts && 
            <h5 className="heading5">
                SEARCHED ARTWORK 
                <br />
                <button className="clear-btn" onClick={()=>setissearch(false)}>CLEAR</button>
            </h5>}
            {issearch && cproducts && cproducts.length==0 && <h6 className="heading5">NO ARTWORK FOUND</h6>}
            {issearch && <div className="d-flex justify-content-center flex-wrap">
                {cproducts && products.length>0 && 
                    cproducts.map((item,index)=>{
                    return (
                        <div onClick={()=>handleProduct(item._id)} key={item._id } className="card m-3 hover-effect">
                            <div  className="icon-container">
                                {
                                    likedproducts.find((likedItem)=>likedItem._id == item._id)?
                                    <FaHeart onClick={(e)=> handleRemoveLike(item._id,e)} className="red-icons"/>:
                                    <FaHeart onClick={(e)=> handleLike(item._id,e)} className="icons"/>
                                }
                            </div>
                            <p className="m-2">{ item.artname }</p> 
                            <p className="m-2">{ item.artcategory }</p>
                            <img width="300px" height="300px" src={'http://localhost:4000/'+item.artimage} alt=" art image " />
                            <h3 className="m-2 price-text">Rs.{ item.artprice }/-</h3>
                            <p className="m-2 text-success">{ item.artdescription}</p>

                        </div>
                    )
                })}
            </div>}
            
            {/* {!issearch && <h5 className="heading5">ALL ART WORK</h5>} */}
            {!issearch && <div className="d-flex justify-content-center flex-wrap">
                {products && products.length>0 && 
                    products.map((item,index)=>{
                    return (
                        <div onClick={()=>handleProduct(item._id)} key={item._id } className="card m-3 hover-effect">
                            <div className="icon-container">                            
                                {
                                    likedproducts.find((likedItem)=>likedItem._id == item._id)?
                                    <FaHeart onClick={(e)=>handleRemoveLike(item._id,e)}className="red-icons"/>:
                                    <FaHeart onClick={(e)=>handleLike(item._id,e)} className="icons"/>
                                }
                            </div>
                            <p className="m-2">{ item.artname }</p> 
                            <p className="m-2">{ item.artcategory }</p>
                            <img width="300px" height="300px" src={'http://localhost:4000/'+item.artimage} alt=" art image " />
                            <h3 className="m-2 price-text">Rs.{ item.artprice }/-</h3>
                            <p className="m-2 text-success">{ item.artdescription}</p>

                        </div>
                    )
                })}
            </div>}

            
        </div>
    )
}

export default Home;