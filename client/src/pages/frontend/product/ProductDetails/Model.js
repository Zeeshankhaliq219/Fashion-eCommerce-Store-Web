import React from 'react'
import { Rate } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from 'context/AuthContext';

export default function Model({ data }) {
    const navigate = useNavigate()
    const { isAuthenticated } = useAuthContext()

    const handleBuyNow = () => {
        if (isAuthenticated === false) {
            navigate("/auth/login")
        } else {
            let buyNowLocalStorage = JSON.parse(localStorage.getItem("buy-now")) || []
            const isObjectExist = buyNowLocalStorage.find((item) => item.id === data.id);

            if (isObjectExist) {
                const updatedArray = buyNowLocalStorage.map((obj) => obj.id === data.id ? data : obj);
                localStorage.setItem("buy-now", JSON.stringify(updatedArray))
                navigate(`/check-out/${data.id}/buyNow`);
            } else {
                buyNowLocalStorage.push(data)
                localStorage.setItem("buy-now", JSON.stringify(buyNowLocalStorage))
                navigate(`/check-out/${data.id}/buyNow`);
            }
        }
    }

    return (
        <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-lg modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-body">
                        <div className="row">
                            <div className="col d-flex align-items-center">
                                <img src={data.thumbnail} className='w-100' height="250px" alt="" />
                            </div>
                            <div className="col-12 col-md-8 mt-4 mt-md-0">
                                <h4>{data.title}</h4>
                                <Rate allowHalf value={data.rating} />
                                <div className='text-secondary my-3'>{data.description}</div>
                                <div>Discount Percentage: <span className="text-secondary">{data.discountPercentage}%</span></div>
                                <div>Stock: <span className="text-secondary">{data.stock}</span></div>
                                <div>Category: <span className="text-secondary">{data.category}</span></div>
                                <div>Brand: <span className="text-secondary">{data.brand}</span></div>
                                <h5 className='text-success mt-3'>${data.price}</h5>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        {/* <Link type="button" className="btn btn-success text-white" to={`/check-out/${data.id}/buyNow`} onClick={handleBuyNow}>CheckOut</Link> */}
                        <button type="button" className="btn btn-success text-white" data-bs-dismiss="modal" onClick={handleBuyNow}>CheckOut</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
