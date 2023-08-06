import React, { useEffect, useState } from 'react'
import Background from 'components/common/Background'
import 'scss/_myOrders.scss'
import { Link } from 'react-router-dom'
import { collection, getDocs, query, where } from 'firebase/firestore/lite'
import { firestore } from 'config/Firebase'
import { useAuthContext } from 'context/AuthContext'
import Auth from 'pages/auth/Login'

export default function MyOrders() {
    const [documents, setDocuments] = useState([])
    const [display, setDisplay] = useState("none")
    const { user, isAuthenticated } = useAuthContext()

    useEffect(() => {
        window.scrollTo(0, 0);

        if (user.email !== undefined) {
            gettingData()
        }
    }, [user.email])

    useEffect(() => {
        setInterval(() => setDisplay("block"), 5000);
    }, [])

    // getting Data
    const gettingData = async () => {
        var array = []
        try {
            const q = query(collection(firestore, "Orders"), where("createdBy.email", "==", user.email));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                array.push(doc.data())
                setDocuments(array)
            });
        } catch (error) {
            window.toastify(error.message, "error")
        }
    }

    return (
        <>
            {isAuthenticated === false
                ? <Auth warningText="⚠ You are not logged in. Please Login to see this page" />
                : <>
                    <Background title={"Orders"} pageTitle={"Orders"} />
                    <div className="container " id='myOrder-page'>
                        <h2 className='fw-bold text-success my-4'>My Orders</h2>
                        {!documents.length
                            ? <div className='text-center my-5'>
                                <div className=' mb-3'>
                                    <div className="spinner-grow text-success" role="status"></div>
                                    <div className="spinner-grow text-success mx-3" role="status"></div>
                                    <div className="spinner-grow text-success" role="status"></div>
                                </div>
                                <div className={`d-${display}`}>No Items Found</div>
                            </div>
                            : <>
                                <div className="text-secondary">{documents.length} Items found</div>
                                {documents.map((items, i) => {
                                    return <div className="row rounded  mt-3 shadow" key={i}>
                                        <div className="col-3 col-sm-2 col-md-1 py-2">
                                            <img src={items.order_data[0] !== undefined ? items.order_data[0].thumbnail : ""} className='myOrder-img' width="100%" height="80px" alt="" />
                                        </div>
                                        <div className="col ">
                                            <div className="row">
                                                <div className="col-12 col-sm-4">
                                                    {items.order_data.map((data, i) => {
                                                        return <div key={i}>{i + 1}- {data.title.length > 15 ? data.title.slice(0, 15) + "..." : data.title}</div>
                                                    })}
                                                </div>
                                                <div className="col-12 col-sm-4 my-3">
                                                    <div className="text-success">Order ID: <span className='text-dark'>{items.order_Id}</span></div>
                                                </div>
                                                <div className="col text-success my-2 d-flex d-sm-block d-md-flex  justify-content-between">
                                                    <div >In Progress</div>
                                                    <Link className='text-success' to={`/my-orders/order-detail/${items.order_Id}`}>View Details</Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                })}
                            </>
                        }

                    </div>
                </>

            }

        </>
    )
}
