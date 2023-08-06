import React from 'react'
import LocalShippingTwoToneIcon from '@mui/icons-material/LocalShippingTwoTone';
import ChangeCircleTwoToneIcon from '@mui/icons-material/ChangeCircleTwoTone';
import SupportAgentTwoToneIcon from '@mui/icons-material/SupportAgentTwoTone';
import PaymentTwoToneIcon from '@mui/icons-material/PaymentTwoTone';

export default function Services() {
    return (
        <div className="row my-5" id='services-section'>
            <div className="col">
                <div className="card py-0 py-md-5 px-5 px-md-3 bg-dark text-light rounde border-0 shadow-lg">
                    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4">
                        <div className="col py-4 py-md-0 text-center border-end border-secondary ">
                            <LocalShippingTwoToneIcon className='fs-1 mb-3'/>
                            <h6>Free Delivery</h6>
                            <p className='text-secondary'>Free Delivery on All Orders</p>
                        </div>
                        <div className="col py-4 py-md-0 text-center border-end border-secondary  ">
                            <ChangeCircleTwoToneIcon className='fs-1 mb-3'/>
                            <h6>Return Policy</h6>
                            <p className='text-secondary'>Best Return Policies</p>
                        </div>
                        <div className="col py-4 py-md-0 text-center border-end border-secondary mt-0 mt-md-5 mt-lg-0 ">
                            <SupportAgentTwoToneIcon className='fs-1 mb-3'/>
                            <h6>24/7 Support</h6>
                            <p className='text-secondary'>Online Support available</p>
                        </div>
                        <div className="col py-4 py-md-0 text-center mt-0 mt-md-5 mt-lg-0 ">
                            <PaymentTwoToneIcon className='fs-1 mb-3'/>
                            <h6>Secure Payment</h6>
                            <p className='text-secondary'>100% secure payment</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
