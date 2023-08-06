import React, { useEffect, useState } from 'react'
import ProductCards from './ProductCards';
import { useLocation } from 'react-router-dom';
import { Rate } from 'antd';

export default function MainComponents({ category, more_category }) {
    const [documents, setDocuments] = useState([])
    const [brands, setBrands] = useState([])
    const [data, setData] = useState([])
    const [newData, setNewData] = useState([])
    const [checkbox, setCheckBOx] = useState([])
    const [dummyToggle, setDummyToggle] = useState(false)
    const location = useLocation()


    useEffect(() => {
        gettingData()
    }, [brands.length, more_category])

    useEffect(() => {
        window.scrollTo(0, 0);
        // ye neechy waly function sy sary products jo "documents" state mein get ho rahy hn un mein sy sirf brands get kar k sidebar pe show karwany hn
        // agr hum wese he array ki form mein karwa dyn to kafi brands same hony ki wja sy repeat ho jaty is liye ye function use kia is 
        // sy agr 2 br b same brand aye to ek he br show ho ga 
        const uniqueArray = Object.values(
            documents.reduce((acc, obj) => {
                acc[obj.brand] = obj;
                return acc;
            }, {})
        );
        setNewData(uniqueArray)
    }, [documents])

    const gettingData = async () => {
        // is function mein hmyn dynamic data show ho ga like jb hum navbar pe search sy products get karty hn to hmyn search sy show hoty hn
        // view more pe click karyn to total products show ho rahy hn sirf is functions ki help sy. 
        // hum Link ki madad sy agr ek category mein search likh k agy koi or category pass karyn to wo ye first wali search wali api sy get kary ga

        // agr to 2no categories exist karti hn or pehli category search ki ni hai to pehli condition false ho jaye gi or else mein jaye ga
        // wahan phr condition lagy gi agr to 2no categories ni hn to phr total products k liye alag api sy get kary ga 

        // agr ye condition b false hoti hai to end waly else pe jaye ga phr agr ek b category hui ya 2no b hui to 2no ko merge kar k ap ko
        // products show kar dy ga

        if (location.pathname.includes("/products/search")) {
            fetch(`https://dummyjson.com/products/search?q=${more_category}`)
                .then(res => res.json())
                .then(data => {
                    let allData = data.products
                    setDocuments(allData)
                    if (!brands.length) {
                        setData(allData);
                    } else {
                        let filltered = allData.filter((obj) => brands.includes(obj.brand));
                        setData(filltered);
                    }
                });
        } else {
            if (category == undefined && more_category == undefined) {
                fetch(`https://dummyjson.com/products?limit=40&skip=10&select=title,price,brand,category,description,discountPercentage,rating,stock,thumbnail,images`)
                    .then(res => res.json())
                    .then(data => {
                        let allData = data.products
                        setDocuments(allData)
                        if (!brands.length) {
                            setData(allData);
                        } else {
                            let filltered = allData.filter((obj) => brands.includes(obj.brand));
                            setData(filltered);
                        }
                    });
            } else {
                try {
                    const [response1, response2] = await Promise.all([
                        fetch(`https://dummyjson.com/products/category/${category}`),
                        fetch(`https://dummyjson.com/products/category/${more_category}`)
                    ])
                    let data1 = await response1.json();
                    let data2 = await response2.json();
                    // Merge the data from both APIs
                    const merged = [...data1.products, ...data2.products];
                    setDocuments(merged)
                    if (!brands.length) {
                        setData(merged);
                    } else {
                        let filltered = merged.filter((obj) => brands.includes(obj.brand));
                        setData(filltered);
                    }
                } catch (error) {
                    console.error('Error fetching data:', error.message);
                }
            }

        }
    }

    // this function is used for brand filter
    const handleBrand = (vale, itemId) => {
        if (checkbox.includes(itemId) === true) {
            const index = checkbox.indexOf(itemId);
            checkbox.splice(index, 1)
            const valueindex = brands.indexOf(vale);
            brands.splice(valueindex, 1)
            setDummyToggle(!dummyToggle)
        } else {
            setBrands([...brands, vale])
            setCheckBOx([...checkbox, itemId])
        }
    }

    // handleRating
    const handleRating = (value) => {
        let filltered = documents.filter((elements) => {
            return elements.rating >= value
        })
        setData(filltered)
        setDummyToggle(!dummyToggle)

    }

    // handleClearFilters
    const handleClearFilters = () => {
        setBrands([])
        setCheckBOx([])
        setDummyToggle(!dummyToggle)
    }


    return (

        <div className="row" id='filter-section'>
            <div className="col-3 col-lg-2 px-2 d-none d-md-block " style={{ height: "590px", overflowY: "auto", position: "sticky", top: 150 }}>
                <div className="text-end">
                    <button className='btn btn-outline-success btn-sm' onClick={handleClearFilters}>Clear Filters</button>
                </div>
                {/* brand filter */}
                <h5 className='ps-3 mt-4'>Brands</h5>
                <div style={{ maxHeight: 400, overflowY: "auto", marginTop: 12 }}>
                    <ul className="list-group  mb-5 " >
                        {newData.map((item, i) => {
                            return <li className="list-group-item border-0 text-secondary " key={i}>
                                <input type="checkbox" className='me-2' checked={checkbox.includes(item.id)} onChange={() => handleBrand(item.brand, item.id)} />
                                {item.brand}
                            </li>
                        })}
                    </ul>
                </div>
                {/* star rating filter*/}
                <h5 className='ps-3 mt-3'>Ratings</h5>
                <ul className="list-group mb-5 " >
                    {[5, 4, 3, 2, 1].map((val, i) => <li className="btn btn-link btn-sm mb-1" key={i} onClick={() => handleRating(val)}><Rate allowHalf value={val} /></li>)}

                </ul>
            </div>



            <div className="col">
                <div className="d-block d-sm-flex justify-content-between py-2 py-md-0">
                    {brands.length ? <div className="text-secondary pt-2 pb-3">{data.length} filterd items found</div> : <div className="text-secondary pt-2 pb-3">{documents.length} items found on this keyword</div>}
                    <div>
                        <button className="btn btn-outline-success btn-sm px-5 rounded-pill d-block d-md-none" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample">Filters</button>
                    </div>

                    <div className="offcanvas offcanvas-start bg-light" tabIndex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
                        <div className="d-flex justify-content-between align-items-center px-3 pt-4">
                            <button className='btn btn-outline-success btn-sm' onClick={handleClearFilters}>Clear Filters</button>
                            <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                        </div>
                        <h5 className='ps-3 mt-4'>Brands</h5>
                        <div style={{ maxHeight: 400, overflowY: "auto", marginTop: 12 }}>
                            <ul className="list-group px-2 mb-5 " >
                                {newData.map((item, i) => {
                                    return <li className="list-group-item  border-0" key={i}>
                                        <input type="checkbox" className='me-2' checked={checkbox.includes(item.id)} onChange={() => handleBrand(item.brand, item.id)} />
                                        {item.brand}
                                    </li>
                                })}
                            </ul>
                        </div>
                        {/* star rating filter*/}
                        <h5 className='ps-3 mt-3'>Ratings</h5>
                        <ul className="list-group mb-5 " >
                            {[5, 4, 3, 2, 1].map((val, i) => <li className="btn btn-link btn-sm mb-1" key={i} onClick={() => handleRating(val)}><Rate allowHalf value={val} /></li>)}
                        </ul>
                    </div>
                </div>
                <ProductCards documentData={data} />
            </div>
        </div>
    )
}
