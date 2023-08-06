import React, { useEffect, useState } from 'react'
import Background from 'components/common/Background'
import 'scss/_contact.scss'
import Contributors from '../home/Contributors'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore/lite'
import { auth, firestore } from 'config/Firebase'
import { useAuthContext } from 'context/AuthContext'
import { useNavigate } from 'react-router-dom'

const initialState = {
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    country: "",
    subject: "",
    description: ""
}
export default function Contact() {
    const [value, setValue] = useState(initialState)
    const [isLoading, setIsLoading] = useState(false)
    const { isAuthenticated } = useAuthContext()
    const navigate = useNavigate()

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    // handleChange
    const handleChange = (e) => {
        const { name, value } = e.target;
        setValue(s => ({ ...s, [name]: value }))
    }

    // handleSubmit
    const handleSubmit = (e) => {
        e.preventDefault()
        var { email, first_name, last_name, subject, description, phone, country } = value
        first_name = first_name.trim()
        last_name = last_name.trim()
        subject = subject.trim()
        description = description.trim()
        phone = phone.trim()

        var validRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (first_name.length < 3) {
            return window.toastify("please Type Minimum 3 characters in First Name", "error")
        }
        if (email.match(validRegex) == null) {
            return window.toastify("please Type Email Correctly", "error")
        }
        if (phone.length < 11) {
            return window.toastify("please Type Phone Number Correctly", "error")
        }
        if (country === "") {
            return window.toastify("please Select Country", "error")
        }
        if (subject.length < 3) {
            return window.toastify("please Type Minimum 3 characters in Subject", "error")
        }
        if (description.length < 10) {
            return window.toastify("please Type Minimum 10 characters in Description", "error")
        }

        if (isAuthenticated === false) {
            navigate("/auth/login")
        } else {
            let newData = {
                first_name, last_name, email, phone, country, subject, description,
                dateCreated: serverTimestamp(),
                createdBy: {
                    userEmail: auth.currentUser.email,
                    uid: auth.currentUser.uid,
                }
            }
            storeDataInFirestore(newData)
        }
    }

    const storeDataInFirestore = async (get) => {
        setIsLoading(true)
        try {
            await addDoc(collection(firestore, "Contact-Us"), get);
            window.toastify("Submitted SuccessFully", "success")
        } catch (e) {
            window.toastify(e.message, "error")
        }
        setIsLoading(false)

    }

    return (
        <>
            <Background title={"Contact"} pageTitle={"Contact"} />
            <div id='contact-page' >
                <div className="inner">
                    <div className="container " >
                        <div className="row">
                            <div className="col-12 col-lg-4 py-4 py-lg-0">
                                <h2>Contact Us</h2>
                                <p>Fill out your information and an Asana representative will reach out to you. </p>
                            </div>
                            <div className="col-12 col-lg-8 mt-0 mt-lg-5 pb-4 pb-lg-0">
                                <div className="card border-0 shadow-lg p-3 p-sm-4">
                                    <form onSubmit={handleSubmit}>
                                        <div className="row g-3 g-md-4 row-cols-1 row-cols-sm-2">
                                            <div className="col ">
                                                <label htmlFor="first-name" className="form-label">First Name <span className="text-danger">*</span></label>
                                                <input type="text" className="form-control py-3" name='first_name' id="first-name" onChange={handleChange} placeholder="e.g. Zeeshan" />
                                            </div>
                                            <div className="col ">
                                                <label htmlFor="last-name" className="form-label">Last Name</label>
                                                <input type="text" className="form-control py-3" id="last-name" name='last_name' onChange={handleChange} placeholder="e.g. Khaliq" />
                                            </div>
                                            <div className="col ">
                                                <label htmlFor="email-address" className="form-label">Email address <span className="text-danger">*</span></label>
                                                <input type="email" className="form-control py-3" id="email-address" name='email' onChange={handleChange} placeholder="name@example.com" />
                                            </div>
                                            <div className="col ">
                                                <label htmlFor="phone-number" className="form-label">Phone Number</label>
                                                <input type="tel" className="form-control py-3" id="phone-number" name='phone' onChange={handleChange} placeholder="+923157472389" />
                                            </div>
                                            <div className="col ">
                                                <label htmlFor="countries" className="form-label">Country <span className="text-danger">*</span></label>
                                                <select className="form-select py-3" id='countries' name='country' onChange={handleChange} aria-label="Default select example">
                                                    <option value="">Select Country</option>
                                                    <option value="Pakistan">Pakistan</option>
                                                    <option value="India">India</option>
                                                    <option value="Australia">Australia</option>
                                                    <option value="NewZealand">New Zealand</option>
                                                </select>
                                            </div>
                                            <div className="col ">
                                                <label htmlFor="subject" className="form-label">Subject <span className="text-danger">*</span></label>
                                                <input type="text" className="form-control py-3" id="subject" name='subject' onChange={handleChange} placeholder="Please Enter Subject" />
                                            </div>
                                        </div>
                                        <div className="row mt-4">
                                            <div className="col">
                                                <label htmlFor="description" className="form-label">What would you like to discuss? <span className="text-danger">*</span></label>
                                                <textarea className="form-control" name='description' onChange={handleChange} id="description" rows="4"></textarea>
                                            </div>
                                        </div>
                                        <button className='btn btn-success button-stylling text-white px-5 py-2 my-3' disabled={isLoading}>
                                            {isLoading ? <>
                                                <div className="spinner-grow spinner-grow-sm text-light" role="status"></div>
                                                <div className="spinner-grow spinner-grow-sm text-light mx-2" role="status"></div>
                                                <div className="spinner-grow spinner-grow-sm text-light" role="status"></div>
                                            </> : "SUBMIT"
                                            }
                                        </button>
                                        <p className="text-danger">Fields marked with an asterisk (*) are required.</p>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container">
                <Contributors />
            </div>
        </>
    )
}
