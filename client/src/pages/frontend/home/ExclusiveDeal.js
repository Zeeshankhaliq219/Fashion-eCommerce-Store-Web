import moment from 'moment/moment'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

export default function ExclusiveDeal() {
  const [time, setTime] = useState("")

  useEffect(() => {
    setInterval(() => setTime(moment().format('h:mm:ss a')), 1000);
  }, [])


  return (
    <div className="row gx-0" id='exclusiveDeal-section'>
      <div className="col">
        <div className="extra-layer d-flex align-items-center justify-content-center text-white">
          <div className="w-50 text-center">
            <h2 className='fw-bold'>The Exclusive Deal Will End at 12:00 p.m</h2>
            <p className='text-success'>30% OFF on All Orders</p>
            <h1 className='fw-bold my-4 time'>{time}</h1>
            <Link className='btn btn-success px-5 py-2 rounded-pill text-white button-stylling' to='/products'>Shop Now</Link>
          </div>
        </div>
      </div>
      <div className="col d-none d-md-block">
        <img src="https://www.copperberg.com/wp-content/uploads/2021/11/ecom.jpg" width="100%" height="100%" alt="" />
      </div>
    </div>
  )
}
