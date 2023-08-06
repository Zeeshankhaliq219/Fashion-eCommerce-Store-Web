import React from 'react'
import './_common.scss'
import { Link } from 'react-router-dom'

export default function Background({ pageTitle, title }) {
    return (
        <div id="background-section">
            <div className="container text-white ">
                <div className="row">
                    <div className="col">
                        <h1 className='fw-bold'>{pageTitle}</h1>
                        <h6> <Link className='text-white text-decoration-none' to='/'>Home</Link> / {title}</h6>
                    </div>
                </div>
            </div>
        </div>
    )
}
