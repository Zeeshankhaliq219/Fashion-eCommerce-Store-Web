import React from 'react'
import Carousel from './Carousel'
import Services from './Services'
import ExclusiveDeal from './ExclusiveDeal'
import Collections from './Collections'
import Contributors from './Contributors'
import PopularProducts from './PopularProducts'

export default function index() {
    return (
        <>
            <Carousel />
            <div className="container">
                <Services />
                <Collections />
            </div>
            <div >
                <ExclusiveDeal />
            </div>
            <div className="container">
                <PopularProducts />
                <Contributors />
            </div>
        </>
    )
}
