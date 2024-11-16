import { useEffect, useState } from "react";
import Header from "./Header";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Categories from "./Categories";
import { FaHeart } from 'react-icons/fa';
import './Home.css';

function MyProducts() {
    const navigate = useNavigate();

    const [likedProducts, setLikedProducts] = useState([]); // For liked products
    const [allProducts, setAllProducts] = useState([]); // For all products
    const [filteredProducts, setFilteredProducts] = useState([]); // For filtered search results
    const [search, setSearch] = useState('');
    const [likedproducts, setlikedproducts] = useState([]);
    const[refresh, setrefresh]=useState(false);


    useEffect(() => {
        // Fetch liked products
        const fetchLikedProducts = () => {
            const url = 'http://localhost:4000/my-products';
            let data = { userId: localStorage.getItem('userId') }
            axios.post(url, data)
                .then((res) => {
                    if (res.data.products) {
                        setLikedProducts(res.data.products);
                    }
                })
                .catch((err) => {
                    alert('Server Error');
                });
                
        };

        // Fetch all products
        const fetchAllProducts = () => {
            const url = 'http://localhost:4000/get-products';
            axios.get(url)
                .then((res) => {
                    if (res.data.products) {
                        setAllProducts(res.data.products);
                    }
                })
                .catch((err) => {
                    alert('Server Error');
                });
        };
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
        fetchLikedProducts();
        fetchAllProducts();
    }, [refresh]);

    const handleSearch = (value) => {
        setSearch(value);
    }

    const handleClick = () => {
        let filtered = allProducts.filter((item) => {
            if (item.artname.toLowerCase().includes(search.toLowerCase()) ||
                item.artdescription.toLowerCase().includes(search.toLowerCase()) ||
                item.artcategory.toLowerCase().includes(search.toLowerCase())) {
                return item;
            }
        });
        setFilteredProducts(filtered);
    }

    const handleCategory = (value) => {
        let filtered = allProducts.filter((item) => {
            if (item.artcategory === value) {
                return item;
            }
        });
        setFilteredProducts(filtered);
    }

    const handleLike = (productId) => {
        let userId = localStorage.getItem('userId');
        const data = { userId, productId };
        const url = 'http://localhost:4000/like-products'; // Corrected the like URL

        axios.post(url, data)
            .then((res) => {
                if (res.data.message) {
                    alert('Added to liked products');
                }
            })
            .catch((err) => {
                alert('Server Error');
            });
    }
    const handleRemoveLike=(productId)=>{
        //console.log(productId)
        // e.stopPropagation();
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

    const handleDelete = (artId) => {
        const userId = localStorage.getItem('userId');
        
        if (!userId) {
            alert('Please Login/Signup first to delete products.');
            return;
        }
    
        const data = { artId, userId };
        const url = 'http://localhost:4000/delete-product';
    
        axios.post(url, data)
            .then((res) => {
                if (res.data.message) {
                    alert('Product deleted successfully');
                    setrefresh(!refresh); // Trigger refresh
                } else {
                    alert('Failed to delete product');
                }
            })
            .catch((err) => {
                alert('Server Error');
                console.error(err); // Optional: for debugging
            });
    };
    
    return (
        <div>
            <Header search={search} handleSearch={handleSearch} handleClick={handleClick} />
            <Categories handleCategory={handleCategory} />

            <h5 className="heading5">MY ARTWORK</h5>

            <div className="d-flex justify-content-center flex-wrap">
                {likedProducts && likedProducts.length > 0 ? 
                    likedProducts.map((item, index) => {
                        return (
                                <div key={item._id} className="card m-3 hover-effect">
                                <div className="icon-container">
                                {
                                    likedproducts.find((likedItem)=>likedItem._id == item._id)?
                                    <FaHeart onClick={()=> handleRemoveLike(item._id)} className="red-icons"/>:
                                    <FaHeart onClick={()=> handleLike(item._id)} className="icons"/>
                                }
                                </div>
                                <p className="m-2">{item.artname}</p>
                                <p className="m-2">{item.artcategory}</p>
                                <img width="300px" height="300px" src={'http://localhost:4000/' + item.artimage} alt="art image" />
                                <h3 className="m-2 price-text">Rs.{item.artprice}/-</h3>
                                <p className="m-2 text-success">{item.artdescription}</p>
                                <Link to={`/edit/${item._id}`}>Edit Details</Link>
                                <button onClick={()=>handleDelete(item._id)}>DELETE PRODUCT</button>
                            </div>
                        );
                    }) :
                    <p>No artworks added by you</p>
                }
            </div>

            <h5 className="heading5">ALL ART WORK</h5>

            <div className="d-flex justify-content-center flex-wrap">
                {filteredProducts.length > 0 ?
                    filteredProducts.map((item, index) => {
                        return (
                            <div key={item._id} className="card m-3 hover-effect">
                                <div className="icon-container">
                                {
                                    likedproducts.find((likedItem)=>likedItem._id == item._id)?
                                    <FaHeart onClick={()=> handleRemoveLike(item._id)} className="red-icons"/>:
                                    <FaHeart onClick={()=> handleLike(item._id)} className="icons"/>
                                }
                                </div>
                                <p className="m-2">{item.artname}</p>
                                <p className="m-2">{item.artcategory}</p>
                                <img width="300px" height="300px" src={'http://localhost:4000/' + item.artimage} alt="art image" />
                                <h3 className="m-2 price-text">Rs.{item.artprice}/-</h3>
                                <p className="m-2 text-success">{item.artdescription}</p>
                            </div>
                        );
                    }) :
                    allProducts.map((item, index) => {
                        return (
                            <div key={item._id} className="card m-3 hover-effect">
                                <div className="icon-container">
                                {
                                    likedproducts.find((likedItem)=>likedItem._id == item._id)?
                                    <FaHeart onClick={()=> handleRemoveLike(item._id)} className="red-icons"/>:
                                    <FaHeart onClick={()=> handleLike(item._id)} className="icons"/>
                                }
                                </div>
                                <p className="m-2">{item.artname}</p>
                                <p className="m-2">{item.artcategory}</p>
                                <img width="300px" height="300px" src={'http://localhost:4000/' + item.artimage} alt="art image" />
                                <h3 className="m-2 price-text">Rs.{item.artprice}/-</h3>
                                <p className="m-2 text-success">{item.artdescription}</p>
                            </div>
                        );
                    })
                }
            </div>
        </div>
    );
}

export default MyProducts;
