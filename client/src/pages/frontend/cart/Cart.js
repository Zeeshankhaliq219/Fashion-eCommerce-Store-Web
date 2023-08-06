import React, { useEffect, useState } from 'react'
import { Rate } from 'antd'
import { Link } from 'react-router-dom';
import { useProductContext } from 'context/ProductContext';
import 'scss/_cart.scss'
import Background from 'components/common/Background'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

export default function Cart() {
    const [documents, setDocuments] = useState([])
    const { changeCartItems, setChangeCartItems } = useProductContext()

    useEffect(() => {
        window.scrollTo(0, 0);
        gettingData()
    }, [])

    const gettingData = () => {
        let localStorageData = JSON.parse(localStorage.getItem("cart"))
        if (localStorageData !== null) {
            setDocuments(localStorageData);
        }
    }


    const handleDeleteItem = (itemId) => {
        let previousData = JSON.parse(localStorage.getItem("cart"))
        let filltered = previousData.filter((item) => {
            return item.id !== itemId
        })
        localStorage.setItem("cart", JSON.stringify(filltered))
        gettingData()
        setChangeCartItems(!changeCartItems)
    }

    return (
        <>
            <Background pageTitle={"Cart"} title={"Cart"} />
            <div className="bg-light my-5" id='cart-page'>
                <div className="container">
                    <h2 className="fw-bold mb-4">Your Products</h2>
                    <div className="row g-2">
                        {!documents.length
                            ? <div className="col-12 col-md-8 text-success d-flex align-items-center justify-content-center">
                                <h4>No Items added yet</h4>
                            </div>
                            : <div className="col-12 col-md-8 ">
                                {documents.map((element, i) => {
                                    return <div className="card shadow border-0 px-2 mb-3" key={i}>
                                        <div className="row g-0">
                                            <div className="col-3 py-2">
                                                <img src={element.thumbnail} className='w-100' height="200px" alt="" />
                                            </div>
                                            <div className="col pb-2 px-2">
                                                <div style={{ width: "fit-content", cursor: "pointer", marginLeft: "auto" }} data-bs-toggle="modal" data-bs-target="#exampleModal">
                                                    <CloseOutlinedIcon className='fs-6' />
                                                </div>

                                                {/* modal */}
                                                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                                    <div className="modal-dialog">
                                                        <div className="modal-content">
                                                            <div className="modal-header">
                                                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                            </div>
                                                            <div className="modal-body">
                                                                <div className=" ">Are you sure you want to remove item?</div>
                                                            </div>
                                                            <div className="modal-footer">
                                                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                                <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={() => handleDeleteItem(element.id)} >Remove</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>




                                                <h6 className='d-none d-sm-block'>{element.title}</h6>
                                                <h6 className='d-block d-sm-none'>{element.title.length > 23 ? element.title.slice(0, 23) + '...' : element.title}</h6>
                                                <Rate allowHalf value={element.rating} />
                                                <div>Category: <b>{element.category}</b></div>
                                                <div>Stock: <b>{element.stock}</b></div>
                                                <hr />
                                                <div className="d-block d-sm-flex justify-content-between">
                                                    <div>Quantity: <b>{element.quantity}</b></div>
                                                    <h5 className='fw-bold text-success'>${element.price}</h5>
                                                    <Link className='btn btn-success btn-sm rounded-pill button-stylling checkout-button text-white shadow' to={`/check-out/${element.id}`}>CheckOut</Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                })}


                            </div>
                        }


                        {/* second column */}
                        <div className="col-12 col-md-4 total-price-column">
                            <div className="card bg-white shadow border-0 p-3">
                                <div className="d-flex justify-content-between">
                                    <h4>Total:</h4>
                                    <h4>${documents.reduce((a, v) => a = a + v.price, 0)}</h4>
                                </div><hr />
                                <Link className='btn btn-success text-white rounded-pill button-stylling' to={`/check-out/${documents.map((items, i) => items.id)}`}>CheckOut</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}
