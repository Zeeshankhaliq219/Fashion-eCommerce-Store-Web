import React, { useEffect, useState } from 'react'
import { Rate } from 'antd'
import { Carousel } from 'react-responsive-carousel'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import 'scss/_productDetails.scss'
import { useProductContext } from 'context/ProductContext';
import Model from './Model';
import { useAuthContext } from 'context/AuthContext';

export default function ProductDetails() {
  const { id } = useParams()
  const [state, setState] = useState({})
  const [productImages, setProductImages] = useState([])
  const [counter, setCounter] = useState(1)
  const [totalPrice, setTotalPrice] = useState()
  const [dummyToggle, setDummyToggle] = useState(false)
  const { isAuthenticated } = useAuthContext()
  const { changeCartItems, setChangeCartItems } = useProductContext()
  const navigate = useNavigate()

  useEffect(() => {
    window.scrollTo(0, 0);
    // ye product ki detail wala component hai simple hum useparams sy id get kar k is neechy wali api sy data get karyn gy
    // q k id sb products ki unique ho gi to sirf ek he product show ho ga to ek product ko array mein store kawany ki koi zrurat ni hai
    //object ki form mein data get ho ga or aisy he bgair map kiye neechy design kiye huye html mein dynamically data enter kar dyn gy

    fetch(`https://dummyjson.com/products/${id}`)
      .then(res => res.json())
      .then(data => {
        setState(data)
        setTotalPrice(data.price)
        setProductImages(data.images);
      });

  }, [])

  useEffect(() => {
    setState({ ...state, quantity: counter })
  }, [dummyToggle])


  // handleCounter
  const handleCounter = (get) => {
    switch (get) {
      case "decrement":
        setCounter(counter === 1 ? counter : counter - 1)
        state.price = state.price === totalPrice ? state.price : state.price - totalPrice
        break;
      case "increment":
        setCounter(counter + 1)
        state.price = state.price + totalPrice
        break;

      default:
        setCounter(counter + 1)
        state.price = state.price + totalPrice
        break;
    }
    setDummyToggle(!dummyToggle)
  }



  // handle cart
  const handleCart = () => {
    if (isAuthenticated === false) {
      navigate('/auth/login')
    } else {
      let localStorageData = JSON.parse(localStorage.getItem("cart")) || []
      const isObjectExist = localStorageData.some((item) => item.id === state.id);
      if (!isObjectExist) {
        let newData = { ...state, quantity: counter }
        localStorageData.push(newData)
        localStorage.setItem("cart", JSON.stringify(localStorageData))
        window.toastify("Item added successfully", "success")
        setChangeCartItems(!changeCartItems)
      } else {
        window.toastify("Item Already Exists", "error")
      }
    }
  }

  // handle favourite
  const handleFavourite = () => {
    if (isAuthenticated === false) {
      navigate('/auth/login')
    } else {
      let localStorageData = JSON.parse(localStorage.getItem("favourite")) || []
      const isObjectExist = localStorageData.some((item) => item.id === state.id);
      if (!isObjectExist) {
        localStorageData.push(state)
        localStorage.setItem("favourite", JSON.stringify(localStorageData))
        window.toastify("Item added successfully", "success")
        setChangeCartItems(!changeCartItems)

      } else {
        window.toastify("Item exists already", "error")
      }
    }
  }

  return (
    <>
      <div className="container mb-5" id='product-details'>
        <div className="row row-cols-1 row-cols-md-2">
          <div className="col">
            <Carousel autoPlay thumbWidth={60} className='d-flex flex-column align-items-center' width="80%" dynamicHeight={false} infiniteLoop interval={3500} showArrows={false} showIndicators={false}>
              {productImages.map((item, i) => {
                return <div key={i} style={{ height: "400px" }}>
                  <img src={item} height="100%" />
                </div>
              })}
            </Carousel>
          </div>
          <div className="col d-flex flex-column justify-content-center px-3 px-md-4 px-lg-5 py-4">
            <h2 className='fw-bold'>{state.title}</h2>
            <div>
              <Rate allowHalf value={state.rating} />
              <span className='ms-2'>({state.rating})</span>
            </div>
            <h3 className='fw-bold my-4'>${state.price}</h3>
            <h6><span className="text-success">Category:</span> {state.category}</h6>
            <h6 className='my-2'><span className="text-success">Brand:</span> {state.brand}</h6>
            <p>{state.description}</p>

            <div className="d-flex my-4 price-quantity">
              <button className='btn btn-outline-secondary btn-sm  fw-bold' onClick={() => handleCounter("decrement")}>-</button>
              <span className='px-4'>{counter}</span>
              <button className='btn btn-outline-secondary btn-sm  fw-bold' onClick={() => handleCounter("increment")}>+</button>
            </div>

            <div className="row gx-2">
              <div className="col-5 ">
                <button className='btn btn-outline-success rounded-pill btn-sm py-2 details-add-to-cart w-100' title='Add to cart' onClick={handleCart}>ADD TO CART</button>
              </div>
              <div className="col-5 ">
                <button type="button" className="btn btn-success btn-sm py-2 rounded-pill button-stylling text-white w-100" title='Buy now' data-bs-toggle="modal" data-bs-target="#exampleModal">BUY NOW</button>
                <Model data={state} />
              </div>
              <div className="col-2 ">
                <button className='btn btn-success btn-sm text-white rounded-circle p-2 shadow' title='favourite' onClick={handleFavourite} ><FavoriteBorderOutlinedIcon /></button>
              </div>
            </div>
            <div className="mt-3 text-secondary">Share With Friends</div>
            <div className='text-secondary'>
              <FacebookIcon className='me-2' /><InstagramIcon className='me-2' /><TwitterIcon className='me-2' />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
