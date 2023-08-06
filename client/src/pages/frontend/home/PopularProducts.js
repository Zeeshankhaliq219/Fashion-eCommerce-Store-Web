import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import { Rate } from 'antd';
import { useProductContext } from 'context/ProductContext';
import { useAuthContext } from 'context/AuthContext';
import PrivateRoute from 'privateRouting/PrivateRoute';


export default function PopularProducts() {
    const [shoesData, setShoesData] = useState()
    const [furnitureData, setFurnitureData] = useState()
    const [shirtsData, setShirtsData] = useState()
    const { isAuthenticated } = useAuthContext()
    const { changeCartItems, setChangeCartItems } = useProductContext()
    const navigate = useNavigate();

    useEffect(() => {
        fetch('https://dummyjson.com/products/category/mens-shoes')
            .then(res => res.json())
            .then(data => {
                setShoesData(data.products)
            });

        fetch('https://dummyjson.com/products/category/furniture')
            .then(res => res.json())
            .then(data => {
                setFurnitureData(data.products)
            });

        fetch('https://dummyjson.com/products/category/mens-shirts')
            .then(res => res.json())
            .then(data => {
                setShirtsData(data.products)
            });
    }, [])

    // handle carts
    const handleCart = (data) => {
        let localStorageData = JSON.parse(localStorage.getItem("cart")) || []

        if (isAuthenticated === false) {
            navigate('/auth/login');
        } else {
            const isObjectExist = localStorageData.some((item) => item.id === data.id);
            if (!isObjectExist) {
                let newData = { ...data, quantity: 1 }
                localStorageData.push(newData)
                localStorage.setItem("cart", JSON.stringify(localStorageData))
                window.toastify("Item added successfully", "success")
                setChangeCartItems(!changeCartItems)

            } else {
                window.toastify("Item exists already", "error")
            }
        }
    }

    // handle favourite
    const handleFavourite = (data) => {
        if (isAuthenticated === false) {
            navigate('/auth/login');
        } else {
            let localStorageData = JSON.parse(localStorage.getItem("favourite")) || []
            const isObjectExist = localStorageData.some((item) => item.id === data.id);
            if (!isObjectExist) {
                localStorageData.push(data)
                localStorage.setItem("favourite", JSON.stringify(localStorageData))
                window.toastify("Item added successfully", "success")
                setChangeCartItems(!changeCartItems)

            } else {
                window.toastify("Item exists already", "error")
            }
        }
    }

    return (
        <div id='popularProducts-section'>
            <div className="row">
                <div className="col">
                    <h2 className='fw-bold text-center'>PRODUCTS YOU MAY LIKE</h2>
                    <p className='text-center text-secondary my-4 w-50 mx-auto'>Get your hands on the most sought-after products in the market. Shop now and experience the hype surrounding our top-selling items.</p>
                </div>
            </div>

            <div className="row g-3 g-lg-4 mt-4 row-cols-1 row-cols-md-2 row-cols-lg-3">
                <div className="col">
                    <div className="card rounded-4 overflow-hidden" >
                        <Link to={`/products/details/${shoesData == undefined ? "" : shoesData[0].id}`} className='card-image'>
                            <img src={shoesData == undefined ? "" : shoesData[0].thumbnail} className="card-img-top" alt="..." />
                        </Link>
                        <div className="card-body  text-center">
                            <Rate allowHalf value={shoesData == undefined ? 1 : shoesData[0].rating} />
                            <h5 className="card-title">{shoesData == undefined ? "" : shoesData[0].title}</h5>
                            <p className="card-text">{shoesData == undefined ? "" : shoesData[0].description}</p>
                            <button className="btn btn-success add-to-cart" onClick={() => handleCart(shoesData[0])}>Add to Cart</button>
                            <button className='btn btn-light  favourite' onClick={() => handleFavourite(shoesData[0])}><FavoriteBorderOutlinedIcon /></button>
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div className="card rounded-4 overflow-hidden" >
                        <Link to={`/products/details/${shoesData == undefined ? "" : shoesData[2].id}`} className='card-image'>
                            <img src={shoesData == undefined ? "" : shoesData[2].thumbnail} className="card-img-top" alt="..." />
                        </Link>
                        <div className="card-body  text-center">
                            <Rate allowHalf value={shoesData == undefined ? 1 : shoesData[2].rating} />
                            <h5 className="card-title">{shoesData == undefined ? "" : shoesData[2].title}</h5>
                            <p className="card-text">{shoesData == undefined ? "" : shoesData[2].description}</p>
                            <button className="btn btn-success add-to-cart" onClick={() => handleCart(shoesData[2])}>Add to Cart</button>
                            <button className='btn btn-light favourite' onClick={() => handleFavourite(shoesData[2])}><FavoriteBorderOutlinedIcon /></button>
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div className="card rounded-4 overflow-hidden" >
                        <Link to={`/products/details/${furnitureData == undefined ? "" : furnitureData[4].id}`} className='card-image'>
                            <img src={furnitureData == undefined ? "" : furnitureData[4].thumbnail} className="card-img-top" alt="..." />
                        </Link>
                        <div className="card-body  text-center">
                            <Rate allowHalf value={furnitureData == undefined ? 1 : furnitureData[4].rating} />
                            <h5 className="card-title">{furnitureData == undefined ? "" : furnitureData[4].title}</h5>
                            <p className="card-text">{furnitureData == undefined ? "" : furnitureData[4].description}</p>
                            <button className="btn btn-success add-to-cart" onClick={() => handleCart(furnitureData[4])}>Add to Cart</button>
                            <button className='btn btn-light  favourite' onClick={() => handleFavourite(furnitureData[4])}><FavoriteBorderOutlinedIcon /></button>
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div className="card rounded-4 overflow-hidden" >
                        <Link to={`/products/details/${furnitureData == undefined ? "" : furnitureData[1].id}`} className='card-image'>
                            <img src={furnitureData == undefined ? "" : furnitureData[1].thumbnail} className="card-img-top" alt="..." />
                        </Link>
                        <div className="card-body  text-center">
                            <Rate allowHalf value={furnitureData == undefined ? 1 : furnitureData[1].rating} />
                            <h5 className="card-title">{furnitureData == undefined ? "" : furnitureData[1].title}</h5>
                            <p className="card-text">{furnitureData == undefined ? "" : furnitureData[1].description}</p>
                            <button className="btn btn-success add-to-cart" onClick={() => handleCart(furnitureData[1])}>Add to Cart</button>
                            <button className='btn btn-light  favourite' onClick={() => handleFavourite(furnitureData[1])}><FavoriteBorderOutlinedIcon /></button>
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div className="card rounded-4 overflow-hidden" >
                        <Link to={`/products/details/${shirtsData == undefined ? "" : shirtsData[1].id}`} className='card-image'>
                            <img src={shirtsData == undefined ? "" : shirtsData[1].thumbnail} className="card-img-top" alt="..." />
                        </Link>
                        <div className="card-body  text-center">
                            <Rate allowHalf value={shirtsData == undefined ? 1 : shirtsData[1].rating} />
                            <h5 className="card-title">{shirtsData == undefined ? "" : shirtsData[1].title}</h5>
                            <p className="card-text">{shirtsData == undefined ? "" : shirtsData[1].description}</p>
                            <button className="btn btn-success add-to-cart" onClick={() => handleCart(shirtsData[1])}>Add to Cart</button>
                            <button className='btn btn-light  favourite' onClick={() => handleFavourite(shirtsData[1])}><FavoriteBorderOutlinedIcon /></button>
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div className="card rounded-4 overflow-hidden" >
                        <Link to={`/products/details/${shirtsData == undefined ? "" : shirtsData[2].id}`} className='card-image'>
                            <img src={shirtsData == undefined ? "" : shirtsData[2].thumbnail} className="card-img-top" alt="..." />
                        </Link>
                        <div className="card-body  text-center">
                            <Rate allowHalf value={shirtsData == undefined ? 1 : shirtsData[2].rating} />
                            <h5 className="card-title">{shirtsData == undefined ? "" : shirtsData[2].title}</h5>
                            <p className="card-text">{shirtsData == undefined ? "" : shirtsData[2].description}</p>
                            <button className="btn btn-success add-to-cart" onClick={() => handleCart(shirtsData[2])}>Add to Cart</button>
                            <button className='btn btn-light  favourite' onClick={() => handleFavourite(shirtsData[2])}><FavoriteBorderOutlinedIcon /></button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}
