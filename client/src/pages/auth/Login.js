import React, { useEffect, useState } from 'react'
import { Divider, Input } from 'antd'
import EmailIcon from '@mui/icons-material/Email';
import HttpsIcon from '@mui/icons-material/Https';
import 'scss/_auth.scss'
import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from 'context/AuthContext';
import axios from 'axios';

const initialState = {
    email: "",
    password: ""
}
export default function Login({ warningText }) {
    const [state, setState] = useState(initialState)
    const [isLoading, setIsLoading] = useState(false)
    const { setIsAuthenticated } = useAuthContext()
    const navigate = useNavigate()
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    // handle change function
    const handleChange = (e) => {
        const { name, value } = e.target;
        setState(s => ({ ...s, [name]: value }))
    }

    // handleSubmit
    const handleSubmit = async (e) => {
        e.preventDefault()
        let { email, password } = state;
        email = email.trim();
        password = password.trim();

        if (!email) {
            return window.toastify("Please Enter valid email-address", "error")
        } else {
            setIsLoading(true)
            let data = { email, password }
            try {
                await axios.post("http://localhost:5000/api/users/login", data)
                    .then((res) => {
                        localStorage.setItem('user', JSON.stringify(res.data))
                        setIsAuthenticated(true)
                        setIsLoading(false)
                        navigate('/dashboard')
                    })
            } catch (error) {
                window.toastify(error.response.data.error, "error")
                setIsLoading(false)
            }
        }

    }

    return (
        <div id="login-page">
            <div className="container ">
                <h5 className='text-warning text-center my-3'>{warningText}</h5>
                <div className="row ">
                    <div className="col-11 col-sm-9 col-md-6 col-lg-4 ">
                        <div className="card rounded-4 text-center px-3  px-md-4">
                            <h1 className='mb-5 text-white'>Login</h1>
                            <form onSubmit={handleSubmit}>
                                <Input className='my-3 ' size='large' name='email' onChange={handleChange} placeholder="Enter Email" prefix={<EmailIcon className='text-secondary fs-5' />} required />
                                <Input.Password size='large' name='password' onChange={handleChange} placeholder="Input password" required prefix={<HttpsIcon className='text-secondary fs-5' />} />
                                <div className='text-start my-3'>
                                    <Link className='text-white text-decoration-none' to='/auth/forgot-password'>Forgot Password?</Link>
                                </div>
                                <button className='btn btn-success mt-4 text-white w-100 button-stylling' disabled={isLoading}>
                                    {isLoading
                                        ? <>
                                            <div className="spinner-grow spinner-grow-sm text-light" role="status"></div>
                                            <div className="spinner-grow spinner-grow-sm text-light mx-2" role="status"></div>
                                            <div className="spinner-grow spinner-grow-sm text-light" role="status"></div>
                                        </>
                                        : "LOGIN"
                                    }
                                </button>
                            </form>
                            <Divider className='text-white border-white mt-4'>Don't have account?</Divider>
                            <Link className='btn btn-outline-light btn-sm text-white w-100 auth-hover-effect' to='/auth/register'>REGISTER</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
