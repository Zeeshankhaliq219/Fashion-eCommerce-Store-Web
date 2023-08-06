import React, { useEffect, useState } from 'react'
import { useAuthContext } from 'context/AuthContext'
import { useNavigate, useParams } from 'react-router-dom'
import Auth from 'pages/auth/Login'
import { doc, serverTimestamp, setDoc } from 'firebase/firestore/lite'
import { firestore } from 'config/Firebase'
import moment from 'moment'


const initialValue = {
    first_name: "",
    middle_name: "",
    last_name: "",
    email: "",
    phone: "",
    address: "",
    payment_method: "",

}
export default function CheckOut() {
    const [inputValue, setInputValue] = useState(initialValue)
    const [documents, setDocuments] = useState([])
    const [idsToRemove, setIdsToRemove] = useState([])

    const [isLoading, setIsLoading] = useState(false)
    const { productId, source } = useParams()
    const { user, isAuthenticated } = useAuthContext()
    const navigate = useNavigate()

    useEffect(() => {
        window.scrollTo(0, 0)
        gettingData()
    }, [])

    useEffect(() => {
        let array = []
        documents.forEach(element => {
            array.push(element.id)
            setIdsToRemove(array)
        });
    }, [documents])


    const gettingData = () => {
        // yahan pe is function mein b dynamically data show ho ga neechy itni conditions lagany ka maqsad ye hai k 
        // hum checkout puri website mein 3 jaga sy kar sakty hn 
        // 1-cart waly page pe ya to one by one kar k ek ek product ko checkout kar sakty hn
        // 2-cart waly page pe he sb profucts ko ek sath b checkout kar sakty hn
        // 3-product ki detail waly page pe b direct checkout kar sakty hn laki detail waly page pe ye problem aye gi to products hum
        // localstorage ki cart wali key sy ni get kar sakty q k user ny checkout direct karna hai bgair cart mein product store kiye to hum ye karyn gy k 
        // detail waly page pe jb user checkout pe click kary ga to temporary tor pe ek new key local storage main "buy-now" k name sy karwayn gy phr jb
        // user order place kar dy ga to wo wala product is localstorage sy b delete ho jaye ga 

        var split = productId.split(",")
        // yahan pe useparams sy get kiye huye data ko split karny ka maqsad ye hai k jb hum cart sy sb products ko ek he br main checkout
        // karyn gy to wahan sy ek sy ziada ids get hon gi array ki form mein phr array mein sy sari ids one by one kar k get kar k usay 
        // neechy html ki form mein enter karwayn gy phr yahan si place order kar k order place ho jaye ga or data ab localstorage main ni bal k
        // firestore mein jaye ga

        if (split.length === 1 && source === "buyNow") {
            let buyNowLocalStorage = JSON.parse(localStorage.getItem("buy-now"))
            let data = buyNowLocalStorage.filter((item) => {
                return item.id == split;
            })
            setDocuments(data)
        } else if (split.length === 1 && source === undefined) {
            let cartLocalStorage = JSON.parse(localStorage.getItem("cart"))
            let data = cartLocalStorage.filter((item) => {
                return item.id == split;
            })
            setDocuments(data)
        } else {
            let cartLocalStorage = JSON.parse(localStorage.getItem("cart"))
            setDocuments(cartLocalStorage)
        }

    }

    // handle change
    const handleChange = e => {
        setInputValue(s => ({ ...s, [e.target.name]: e.target.value }))
    }

    const handleSubmit = () => {
        var { first_name, middle_name, last_name, email, phone, address, payment_method } = inputValue;
        first_name = first_name.trim();
        middle_name = middle_name.trim();
        last_name = last_name.trim();
        email = email.trim();
        phone = phone.trim();
        address = address.trim();


        if (first_name.length < 3) {
            return window.toastify("Please enter first name correctly", "error")
        }
        var validRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (!email.match(validRegex)) {
            return window.toastify("Please enter email correctly", "error")
        }
        if (phone.length < 11) {
            return window.toastify("Please enter phone number correctly", "error")
        }
        if (address.length < 10) {
            return window.toastify("Please enter address correctly", "error")
        }
        if (!payment_method.length) {
            return window.toastify("Please select payment method", "error")
        }


        let fullName = first_name + " " + middle_name + " " + last_name;

        let newData = {
            fullName, email, phone, address, payment_method,
            order_data: documents,
            order_Id: Math.random().toString().slice(2),
            dateCreated: moment().format('MMMM Do YYYY, h:mm:ss a'),
            total_price: documents.reduce((a, v) => a = a + v.price, 0) + 10,
            createdBy: {
                email: user.email,
                uid: user.uid
            }
        }


        setDataInFirestore(newData)
    }

    // setDataInFirestore
    const setDataInFirestore = async (get) => {
        if (!documents.length) {
            return window.toastify("No Products Added Yet", "error")

        } else {
            let buyNowLocalStorage = JSON.parse(localStorage.getItem("buy-now"))
            setIsLoading(true);
            await setDoc(doc(firestore, "Orders", window.getRandomId()), get)
                .then(() => {
                    setIsLoading(false)
                    window.toastify("Order Placed Successfully", "success")
                    const updatedArray = buyNowLocalStorage.filter(obj => !idsToRemove.includes(obj.id));
                    localStorage.setItem("buy-now", JSON.stringify(updatedArray))
                    navigate(`/my-orders/order-detail/${get.order_Id}`)
                })
        }
    }


    return (
        <>
            {isAuthenticated === false
                ? <Auth />
                : <div className="bg-light">
                    <div className="container" style={{ paddingTop: "150px ", paddingBottom: "100px" }}>
                        <div className="row gx-2 gx-lg-3">
                            <div className="col ">
                                <div className="card shadow-lg rounded-4 border-0 p-3 p-md-4">
                                    <h3 className='fw-bold'>Payment Details</h3>
                                    <section className='mt-4 '>
                                        <div className="row row-cols-1 row-cols-md-3 g-2">
                                            <div className="col">
                                                <label htmlFor="first-name" className="form-label text-success ">First Name <span className="text-danger">*</span></label>
                                                <input type="text" id='first-name' name='first_name' onChange={handleChange} className="form-control py-2" placeholder="E.g. Muhammad" />
                                            </div>
                                            <div className="col">
                                                <label htmlFor="middle-name" className="form-label text-success">Middle Name</label>
                                                <input type="text" id='middle-name' name='middle_name' onChange={handleChange} className="form-control py-2" placeholder="E.g. usman" />
                                            </div>
                                            <div className="col">
                                                <label htmlFor="last-name" className="form-label text-success">Last Name</label>
                                                <input type="text" id='last-name' name='last_name' onChange={handleChange} className="form-control py-2" placeholder="E.g. arif" />
                                            </div>
                                        </div>

                                        <div className="row row-cols-1 row-cols-sm-2 g-2 my-2 my-sm-4">
                                            <div className="col">
                                                <label htmlFor="email-address" className="form-label text-success">Enter email address <span className="text-danger">*</span></label>
                                                <input type="email" id='email-address' name='email' onChange={handleChange} className="form-control py-2" placeholder="E.g. abc@gmail.com" />
                                            </div>
                                            <div className="col">
                                                <label htmlFor="phone" className="form-label text-success">Enter phone number <span className="text-danger">*</span></label>
                                                <input type="tel" id='phone' name='phone' onChange={handleChange} className="form-control py-2" placeholder="E.g. +923001212112" />
                                            </div>
                                        </div>

                                        <div className="row g-2 my-2 my-sm-4">
                                            <div className="col">
                                                <label htmlFor="address" className="form-label text-success">Permanent address <span className="text-danger">*</span></label>
                                                <textarea className="form-control" id="address" name='address' onChange={handleChange} rows="3" placeholder="E.g. obert Robertson, 1234 NW Bobcat Lane, St. Robert, MO 65584-5678"></textarea>
                                            </div>
                                        </div>
                                    </section><hr />
                                    {/* payment methods */}
                                    <h3 className='fw-bold mb-4'>Payment Methods</h3>
                                    <section>
                                        <div className="form-check d-flex align-items-center">
                                            <input className="form-check-input" type="radio" name="payment_method" onChange={handleChange} id="flexRadioDefault1" value="jazzcash" />
                                            <label className="form-check-label ps-2" htmlFor="flexRadioDefault1"><img src="https://upload.wikimedia.org/wikipedia/en/b/b4/JazzCash_logo.png" width="80px" alt="" /></label>
                                        </div>
                                        <div className="form-check d-flex my-3 align-items-center">
                                            <input className="form-check-input" type="radio" name="payment_method" onChange={handleChange} id="flexRadioDefault2" value="easypaisa" />
                                            <label className="form-check-label ps-2" htmlFor="flexRadioDefault2"><img src="https://i.brecorder.com/primary/2022/05/629549f637bc4.jpg" width="80px" alt="" /></label>
                                        </div>
                                        <div className="form-check d-flex my-3 align-items-center">
                                            <input className="form-check-input" type="radio" name="payment_method" onChange={handleChange} id="flexRadioDefault3" value="paypal" />
                                            <label className="form-check-label ps-2" htmlFor="flexRadioDefault3"><img src="https://cdn.pixabay.com/photo/2015/05/26/09/37/paypal-784403_1280.png" width="80px" alt="" /></label>
                                        </div>
                                    </section>
                                    <div className="text-danger">Fields marked with an asterisk (*) are required.</div>
                                </div>
                            </div>


                            <div className="col-12 col-md-5 col-lg-4 mt-3 mt-md-0">
                                <div className="card shadow-lg rounded-4 border-0 p-3 pt-0">
                                    {documents.map((items, i) => {
                                        return <div className='row mt-3 ps-2 ' key={i}>
                                            <div className="col  p-0">
                                                <div className="position-relative ">
                                                    <img src={items.thumbnail} className='rounded' width="100%" height="80px" alt="" />
                                                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-circle bg-light text-dark border border-secondary p-1 " style={{ fontSize: 10 }}>
                                                        {items.quantity}
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="col-7">
                                                <div className="">{items.title}</div>
                                                <div className="text-secondary " style={{ fontSize: 13 }}>Discount:{items.discountPercentage}%</div>
                                            </div>
                                            <div className="col-2 text-end">
                                                <div className="">${items.price}</div>
                                            </div>
                                        </div>
                                    })}

                                    <hr />
                                    <div className='py-3'>
                                        <div className="d-flex justify-content-between">
                                            <div className="text-secondary">Subtotal</div>
                                            <div className='fw-bold'>${documents.reduce((a, v) => a = a + v.price, 0)}</div>
                                        </div>
                                        <div className="mt-3 d-flex justify-content-between">
                                            <div className="text-secondary">Shipping</div>
                                            <div className='fw-bold'>$10</div>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="mb-3 d-flex justify-content-between">
                                        <p className='text-secondary'>Total</p>
                                        <h5 className='fw-bold'>${documents.reduce((a, v) => a = a + v.price, 0) + 10}</h5>
                                    </div>
                                    <button className='btn btn-success text-white button-stylling' onClick={handleSubmit} disabled={isLoading}>
                                        {isLoading === true
                                            ? <>
                                                <div className="spinner-grow spinner-grow-sm text-light" role="status"></div>
                                                <div className="spinner-grow spinner-grow-sm text-light mx-2" role="status"></div>
                                                <div className="spinner-grow spinner-grow-sm text-light" role="status"></div>
                                            </>
                                            : "Place Order"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }

        </>
    )
}
