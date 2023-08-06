import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Rate } from 'antd'

export default function ProductCards({ documentData }) {
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        if (documentData !== []) {
            setIsLoading(false)
        }
    }, [documentData])

    return (
        <>
        {/* is component mein just products ki list show ho rahi hai wahan sy data to filter wagaira kar k bs yaha pe props ki help sy pass kar k sirf show karwaye hn */}
            {!documentData.length ? <h3 className='fw-bold'>No items found yet</h3> : ""}
            {isLoading
                ? <div className=' text-center my-5'>
                    <div className="spinner-grow text-success" role="status"></div>
                    <div className="spinner-grow text-success mx-3" role="status"></div>
                    <div className="spinner-grow text-success" role="status"></div>
                </div>
                : <div className={`row row-cols-2 row-cols-md-3 row-cols-lg-4 g-2 g-md-3 pb-4 pt-3`} id='product-list-cards'>
                    {documentData.map((elements, i) => {
                        return <div className="col " key={i}>
                            <Link className='text-decoration-none text-dark' to={`/products/details/${elements.id}`}>
                                <div className="card border-white shadow rounded-4 overflow-hidden " >
                                    <div className="overflow-hidden">
                                        <img src={elements.thumbnail} className="card-img-top" alt="..." />
                                    </div>
                                    <div className="card-body px-2 px-lg-3">
                                        <div className="card-title text-success">{elements.title.length > 25 ? elements.title.slice(0, 25) + "..." : elements.title}</div>
                                        <h6 className="text-success">${elements.price}</h6>
                                        <Rate allowHalf value={elements.rating}/>
                                        <div className="stock-discount text-secondary mt-2">
                                            <div><b>stock</b>({elements.stock})</div>
                                            <div><b>discount: </b>{elements.discountPercentage}%</div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    })}
                </div>
            }
        </>
    )
}
