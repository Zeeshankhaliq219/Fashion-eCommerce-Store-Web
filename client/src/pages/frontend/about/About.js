import React, { useEffect } from 'react'
import Background from 'components/common/Background'
import 'scss/_about.scss'

export default function About() {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    return (
        <>
            <Background title={"About"} pageTitle={"About"} />
            <div className="container py-5" id='about-page'>
                <div className="row">
                    <div className="col px-3 px-md-4 px-lg-5">
                        <h5 className='mb-4'>About Fashion web</h5>
                        <p>Welcome to Fashion Web, your ultimate destination for the latest fashion trends and style inspiration. We are passionate about bringing you the hottest and most sought-after fashion items from around the world. With our carefully curated collection, we aim to help you express your unique style and stay ahead of the fashion curve. At Trend Trove, we believe that fashion is more than just clothing—it's a form of self-expression and a way to showcase your individuality. We understand that everyone has their own fashion preferences and desires, which is why we offer a diverse range of styles to cater to every taste and occasion.</p>
                        <p>Our team of fashion enthusiasts works tirelessly to handpick each item in our collection. We keep a close eye on the latest trends, runway shows, and emerging designers to ensure that our offerings are always on point. From trendy streetwear to elegant evening wear, from casual staples to statement pieces, we have something for everyone. Quality is of utmost importance to us. We partner with reputable brands and designers who share our commitment to delivering exceptional craftsmanship and using premium materials. This ensures that you not only look good but also feel confident and comfortable in the clothes you choose from Trend Trove.</p>
                        <p>At Trend Trove, we understand that shopping should be a seamless and enjoyable experience. Our user-friendly website is designed to provide you with a hassle-free browsing and shopping journey. You can easily explore our extensive collection, filter your search based on your preferences, and find the perfect pieces to elevate your style.</p>
                        <p>Customer satisfaction is our top priority. We take pride in offering excellent customer service and ensuring that your shopping experience with us is nothing short of exceptional. Our dedicated support team is always ready to assist you with any queries or concerns you may have. Join us at Trend Trove and embark on a fashion-forward journey. Discover the latest trends, unleash your personal style, and create your own fashion story. Whether you're looking for a wardrobe update or a statement piece to turn heads, we've got you covered.</p>
                        <p style={{ textIndent: "0%" }}>Thank you for choosing Trend Trove. We appreciate your support and look forward to being your go-to fashion destination.</p>
                        <p>Happy shopping!</p>
                    </div>
                </div>
            </div>
        </>
    )
}
