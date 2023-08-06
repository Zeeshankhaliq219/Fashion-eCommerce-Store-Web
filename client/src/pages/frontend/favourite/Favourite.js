import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { Rate } from 'antd';
import { useProductContext } from 'context/ProductContext';
import Background from 'components/common/Background';
import 'scss/_favourite.scss'

export default function Favourite() {
    const [items, setItems] = useState([]);
    const { changeCartItems, setChangeCartItems } = useProductContext()


    useEffect(() => {
        window.scrollTo(0, 0);
        gettingData()
    }, [])

    const gettingData = () => {
        let localStorageData = JSON.parse(localStorage.getItem("favourite")) || []
        setItems(localStorageData.map(item => ({ finalData: item, checked: false })))
    }

    const handleCheckboxChange = (index) => {
        console.log(index);
        const newItems = [...items];
        newItems[index].checked = !newItems[index].checked;
        setItems(newItems);
    }


    // handleDeleteItem
    const handleDeleteItem = (itemId) => {
        let previousData = JSON.parse(localStorage.getItem("favourite"))
        let filltered = previousData.filter((item) => {
            return item.id !== itemId
        })
        localStorage.setItem("favourite", JSON.stringify(filltered))
        gettingData()
        setChangeCartItems(!changeCartItems)

    }
    return (
        <>
            <Background pageTitle="Favourite" title="Favourite" />
            <div className="container my-5" id='favourite-section'>
                <div className="row">
                    <h2 className="fw-bold mb-4">Favourite Products</h2>
                    {!items.length
                        ? <div className="col text-success d-flex align-items-center justify-content-center">
                            <h4>No Items added yet</h4>
                        </div>
                        : <div className="col">
                            {items.map((item, i) => (
                                <div className="card mb-3 border-white shadow " key={i}>
                                    <div className="row g-0">
                                        <div className="col-12 col-sm-3 col-lg-2 d-flex align-items-center form-switch ps-0">
                                            <input type="checkbox" className='form-check-input mx-1 ' role="switch" checked={item.checked} onChange={() => handleCheckboxChange(i)} />
                                            <img src={item.finalData.thumbnail} className='py-2' width="85%" height="130px" alt="" />
                                        </div>
                                        <div className="col px-2 py-3 ps-3">
                                            <Link to={`/products/details/${item.finalData.id}`} className='details-link'>
                                                <h6 className='item-title'>{item.finalData.title}</h6>
                                                <Rate allowHalf value={item.finalData.rating} /> {item.finalData.rating}
                                            </Link>
                                            <div className="row row-cols-2 row-cols-md-3 row-cols-lg-5 mt-2">
                                                <div className=" col ">
                                                    <b>Brand: </b>{item.finalData.brand}
                                                </div>
                                                <div className=" col">
                                                    <b>Stock: </b>{item.finalData.stock}
                                                </div>
                                                <div className=" col my-3 mt-md-0 ">
                                                    <b>Discount: </b>{item.finalData.discountPercentage}%
                                                </div>
                                                <div className=" col my-3 mb-md-0 my-lg-0">
                                                    <h6 className="text-success"><span className='text-dark'>Discount: </span> ${item.finalData.price}</h6>
                                                </div>
                                                <div className=" col-12 col-md-2 my-0 mt-md-3 my-lg-0">
                                                    <button className={`btn btn-success btn-sm w-100 button-stylling text-white ${item.checked ? "visible" : "invisible"} `} onClick={() => handleDeleteItem(item.finalData.id)}>DELETE</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    }

                </div>
            </div>
        </>
    )
}
