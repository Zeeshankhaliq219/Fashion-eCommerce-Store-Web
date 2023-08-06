import React from 'react'
import 'scss/_home.scss'
import shoes from 'assets/shoes-carousel.png'
import sofa from 'assets/sofacarousel.png'
import shirt from 'assets/shirtcarousel.png'
import { Link } from 'react-router-dom'

export default function Carousel() {
    return (
        <>
            <div id="carousel-background-image">
                <div className="container">
                    {/* data-bs-ride="carousel" */}
                    <div id="carouselExampleFade" className="carousel slide" data-bs-ride="carousel" >
                        <div className="carousel-indicators">
                            <button type="button" data-bs-target="#carouselExampleFade" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                            <button type="button" data-bs-target="#carouselExampleFade" data-bs-slide-to="1" aria-label="Slide 2"></button>
                            <button type="button" data-bs-target="#carouselExampleFade" data-bs-slide-to="2" aria-label="Slide 3"></button>
                        </div>
                        <div className="carousel-inner">
                            <div className="carousel-item active" data-bs-interval="8000">
                                <div className="row px-0 px-md-5 ">
                                    <div className="col-12 col-md-6 col-lg-4 px-4 px-md-0 ">
                                        <div className="text-white">
                                            <h1 className='fw-bold'>Nike New Collection!</h1>
                                            <p className='my-5'> Embrace natural movement and flexibility with Nike Free shoes. Designed to mimic barefoot running, these shoes provide a lightweight and flexible feel. Experience a liberating running experience with Nike Free!</p>
                                            <Link className='btn btn-success px-5 py-2 text-white button-stylling' to='/products'>View More</Link>
                                        </div>
                                    </div>
                                    <div className="col-12 col-md-6 col-lg-8 d-none d-md-block ">
                                        <img src={shoes} width='100%' className=" ms-auto carousel-img-active d-block " alt="..." />
                                    </div>
                                </div>
                            </div>
                            <div className="carousel-item " data-bs-interval="5000">
                                <div className="row px-0 px-md-5 ">
                                    <div className="col-12 col-md-6 col-lg-5 px-4 px-md-0">
                                        <div className="text-white">
                                            <h1 className='fw-bold'>Sofa New Collection!</h1>
                                            <p className='my-5'>Sink into comfort with our plush sofas, expertly crafted with premium materials and designed to provide unparalleled relaxation. Choose from a variety of styles, sizes, and upholstery options to suit your taste and living space.</p>
                                            <Link className='btn btn-success px-5 py-2 text-white button-stylling' to='/products'>View More</Link>
                                        </div>
                                    </div>
                                    <div className="col-12 col-md-6 col-lg-7 d-none d-md-block ">
                                        <img src={sofa} className=" ms-auto carousel-img d-block " alt="..." />
                                    </div>
                                </div>
                            </div>
                            <div className="carousel-item " data-bs-interval="5000">
                                <div className="row px-0 px-md-5 ">
                                    <div className="col-12 col-md-6 col-lg-5 px-4 px-md-0">
                                        <div className="text-white">
                                            <h1 className='fw-bold'>Shirt New Collection!</h1>
                                            <p className='my-5'>Our classic shirts are a must-have for any wardrobe. Timeless styles that exude elegance and sophistication. From crisp white button-downs to tailored plaid patterns, these shirts are versatile and suitable for any occasion.</p>
                                            <Link className='btn btn-success px-5 py-2 text-white button-stylling' to='/products'>View More</Link>
                                        </div>
                                    </div>
                                    <div className="col-12 col-md-6 col-lg-7 d-none d-md-block  ">
                                        <img src={shirt} className=" ms-auto carousel-img d-block " alt="..." />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
