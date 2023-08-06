import React from 'react'
import { Link } from 'react-router-dom'

export default function Collections() {
    return (
        <div className="row row-cols-1 row-cols-md-3" id='collections-section'>
            <div className="col ">
                <Link to='/products/womens-shoes/mens-shoes'>
                    <div className="card rounded-4 overflow-hidden border-0 ">
                        <div className="layer d-flex justify-content-end flex-column p-3 text-white">
                            <p>Collections</p>
                            <h4>Men & Women Shoes</h4>
                        </div>
                        <div className="card-img">
                            <img src="https://images.lululemon.com/is/image/lululemon/blissfeel2_ece_minkberry_mar23" width="100%" height="100%" alt="" />
                        </div>
                    </div>
                </Link>
            </div>
            <div className="col mt-4 mt-md-0">
                <Link to='/products/furniture'>
                    <div className="card rounded-4 overflow-hidden border-0 ">
                        <div className="layer d-flex justify-content-end flex-column p-3 text-white">
                            <p>Collections</p>
                            <h4>Furniture</h4>
                        </div>
                        <div className="card-img">
                            <img src="https://images.pexels.com/photos/4352247/pexels-photo-4352247.jpeg?cs=srgb&dl=pexels-maksim-goncharenok-4352247.jpg&fm=jpg" width="100%" height="100%" alt="" />
                        </div>
                    </div>
                </Link>
            </div>
            <div className="col mt-4 mt-md-0">
                <Link to='/products/mens-shirts'>
                    <div className="card rounded-4 overflow-hidden border-0 ">
                        <div className="layer d-flex justify-content-end flex-column p-3 text-white">
                            <p>Collections</p>
                            <h4>Men Shirts</h4>
                        </div>
                        <div className="card-img">
                            <img src="https://ae01.alicdn.com/kf/HTB1rfHme0fJ8KJjy0Feq6xKEXXaK.jpg?size=63547&height=1020&width=680&hash=c76ea71dc1b96f6c21c812b337b6243d" width="100%" height="100%" alt="" />
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    )
}
