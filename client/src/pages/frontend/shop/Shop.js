import React, { useEffect, useState } from 'react'
import ProductsList from 'pages/frontend/product/ProductsList/index'
import Background from 'components/common/Background'
import 'scss/_shop.scss'
import { Link } from 'react-router-dom'
export default function Shop() {
    const [data, setData] = useState([])

    useEffect(() => {
        fetch('https://dummyjson.com/products?limit=70&skip=10&select=title,price,brand,category,description,discountPercentage,rating,stock,thumbnail,images')
            .then(res => res.json())
            .then(data => {
                let documents = data.products
                const uniqueArray = Object.values(
                    documents.reduce((acc, obj) => {
                        acc[obj.category] = obj;
                        return acc;
                    }, {})
                );
                setData(uniqueArray)
            });
    }, [])
    
    return (
        <>
            <Background title={"Shop"} pageTitle={"Shop"} />
            <div className="container my-5" id='shop-page'>
                <h2 className='fw-bold text-success mb-4'>Categories</h2>
                {!data.length
                    ? <div className=' text-center my-5'>
                        <div className="spinner-grow text-success" role="status"></div>
                        <div className="spinner-grow text-success mx-3" role="status"></div>
                        <div className="spinner-grow text-success" role="status"></div>
                    </div>
                    : <div className="row row-cols-3 row-cols-md-4 row-cols-lg-6 g-2 g-lg-3">
                        {data.map((item, i) => {
                            return <div className="col" key={i}>
                                <Link to={`/products/${item.category}`}>
                                    <div className="card ">
                                        <div className="overlay-layer"></div>
                                        <img src={item.thumbnail} alt="" />
                                        <p>{item.category}</p>
                                    </div>
                                </Link>
                            </div>
                        })}

                    </div>
                }

            </div>
            <ProductsList padding="pt-0" />
        </>
    )
}
