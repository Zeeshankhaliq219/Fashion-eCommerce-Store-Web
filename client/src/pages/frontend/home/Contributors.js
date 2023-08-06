import React from 'react'
import Carousel from 'react-multi-carousel'
import one from 'assets/brands/one.png'
import two from 'assets/brands/two.png'
import three from 'assets/brands/three.png'
import four from 'assets/brands/four.png'
import five from 'assets/brands/five.png'
import six from 'assets/brands/six.png'
import seven from 'assets/brands/seven.png'

export default function Contributors() {
    const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 1024 },
            items: 4
        },
        desktop: {
            breakpoint: { max: 1024, min: 992 },
            items: 4
        },
        tablet: {
            breakpoint: { max: 992, min: 768 },
            items: 3
        },
        mobile: {
            breakpoint: { max: 768, min: 0 },
            items: 1
        }
    };

    return (
        <div className="row" id='contributors-section'>
            <div className="col">
                <Carousel className=' text-center' removeArrowOnDeviceType={["superLargeDesktop", "desktop", "tablet", "mobile"]} infinite={true} autoPlaySpeed={2500} autoPlay={true} responsive={responsive}>
                    <img src={one} width="250px" height="200px" draggable={false} alt="..." />
                    <img src={two} width="250px" height="200px" draggable={false} alt="..." />
                    <img src={three} width="250px" height="200px" draggable={false} alt="..." />
                    <img src={four} width="250px" height="200px" draggable={false} alt="..." />
                    <img src={five} width="250px" height="200px" draggable={false} alt="..." />
                    <img src={six} width="250px" height="200px" draggable={false} alt="..." />
                    <img src={seven} width="250px" height="200px" draggable={false} alt="..." />
                </Carousel>
            </div>
        </div>
    )
}
