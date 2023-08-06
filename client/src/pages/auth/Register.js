import React, { useState } from 'react'
import { Divider, Input } from 'antd'
import EmailIcon from '@mui/icons-material/Email';
import HttpsIcon from '@mui/icons-material/Https';
import PersonIcon from '@mui/icons-material/Person';
import 'scss/_auth.scss'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const initialState = {
    name: "",
    email: "",
    password: ""
}
export default function Register() {
    const [inputValue, setInputValue] = useState(initialState)
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()

    // handle change function
    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputValue(s => ({ ...s, [name]: value }))
    }

    // handleSubmit
    const handleSubmit = async (e) => {
        e.preventDefault()
        let { email, password, name } = inputValue;
        name = name.trim();
        email = email.trim();
        password = password.trim();

        if (name.length < 3) {
            return window.toastify("Please Enter Minimum 3 Characters in Name", "error")
        }
        if (password.length < 3) {
            return window.toastify("Please Enter Password Correctly", "error")
        }
        var validRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (email.match(validRegex)) {
            setIsLoading(true)
            let data = { name, email, password }

            try {
                await axios.post("http://localhost:5000/api/users/register", data)
                    .then((res) => {
                        setIsLoading(false)
                        navigate('/auth/login')
                    })
            } catch (error) {
                window.toastify(error.response.data.error, "error")
                setIsLoading(false)
            }
        } else {
            window.toastify("Please Enter valid email-address", "error")
        }
    }

    return (
        <div id="register-page">
            <div className="container ">
                <div className="row ">
                    <div className="col-11 col-sm-9 col-md-6 col-lg-4 ">
                        <div className="card rounded-4 text-center px-3  px-md-4">
                            <h1 className='mb-4 text-white'>Register</h1>
                            <form onSubmit={handleSubmit}>
                                <Input className='mt-3 ' size='large' name='name' onChange={handleChange} placeholder="Enter Full Name" prefix={<PersonIcon className='text-secondary fs-5' />} />
                                <Input className='my-3 ' size='large' name='email' onChange={handleChange} placeholder="Enter Email" prefix={<EmailIcon className='text-secondary fs-5' />} />
                                <Input.Password size='large' name='password' onChange={handleChange} placeholder="Input password" prefix={<HttpsIcon className='text-secondary fs-5' />} />
                                <button className='btn btn-success mt-4 text-white w-100 button-stylling' disabled={isLoading}>
                                    {isLoading
                                        ? <>
                                            <div className="spinner-grow spinner-grow-sm text-light" role="status"></div>
                                            <div className="spinner-grow spinner-grow-sm text-light mx-2" role="status"></div>
                                            <div className="spinner-grow spinner-grow-sm text-light" role="status"></div>
                                        </>
                                        : "REGISTER"
                                    }
                                </button>
                            </form>
                            <Divider className='text-white border-white mt-4'>Already have account?</Divider>
                            <Link className='btn btn-outline-light btn-sm text-white w-100 auth-hover-effect' to='/auth/login'>LOGIN</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
