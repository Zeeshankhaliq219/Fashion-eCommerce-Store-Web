import React, { useState } from 'react'
import { Divider, Input } from 'antd'
import EmailIcon from '@mui/icons-material/Email';
import 'scss/_auth.scss'
import { Link } from 'react-router-dom';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from 'config/Firebase';

export default function ForgotPassword() {
    const [state, setState] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    // handleSubmit
    const handleSubmit = (e) => {
        e.preventDefault()

        setIsLoading(true)
        sendPasswordResetEmail(auth, state)
            .then(() => {
                window.toastify("Please Check Your Email-address", "info")
                setIsLoading(false)
            })
            .catch((error) => {
                window.toastify(error.message, "error")
                setIsLoading(false)
            });
    }

    return (
        <div id="login-page">
            <div className="container ">
                <div className="row ">
                    <div className="col-11 col-sm-9 col-md-6 col-lg-4 ">
                        <div className="card rounded-4 text-center px-3  px-md-4">
                            <h1 className='mb-5 text-white'>Forgot Password</h1>
                            <form onSubmit={handleSubmit}>
                                <Input className='my-3 ' size='large' name='email' onChange={(e) => setState(e.target.value)} placeholder="Enter Email" prefix={<EmailIcon className='text-secondary fs-5' />} />
                                <button className='btn btn-success mt-4 text-white w-100 button-stylling' disabled={isLoading}>
                                    {isLoading
                                        ? <>
                                            <div className="spinner-grow spinner-grow-sm text-light" role="status"></div>
                                            <div className="spinner-grow spinner-grow-sm text-light mx-2" role="status"></div>
                                            <div className="spinner-grow spinner-grow-sm text-light" role="status"></div>
                                        </>
                                        : "RESET PASSWORD"
                                    }
                                </button>
                            </form>
                            <Divider className='text-white border-white mt-4'>OR</Divider>
                            <div className="row g-2">
                                <div className="col">
                                    <Link className='btn btn-outline-light btn-sm text-white w-100 auth-hover-effect' to='/auth/login'>LOGIN</Link>
                                </div>
                                <div className="col">
                                    <Link className='btn btn-outline-light btn-sm text-white w-100 auth-hover-effect' to='/auth/register'>REGISTER</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
